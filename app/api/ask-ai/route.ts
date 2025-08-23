/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { InferenceClient } from "@huggingface/inference";

import { MODELS, PROVIDERS } from "@/lib/providers";
import {
  DIVIDER,
  FOLLOW_UP_SYSTEM_PROMPT,
  MAX_REQUESTS_PER_IP,
  REPLACE_END,
  SEARCH_START,
} from "@/lib/prompts";
import MY_TOKEN_KEY from "@/lib/get-cookie-name";
import { GeminiClient, shouldUseDirectGeminiAPI } from "@/lib/gemini-client";

const ipAddresses = new Map();

export async function POST(request: NextRequest) {
  const authHeaders = await headers();
  const userToken = request.cookies.get(MY_TOKEN_KEY())?.value;

  const body = await request.json();
  const { prompt, provider, model, redesignMarkdown, html } = body;

  console.log('📝 Request received:', {
    hasPrompt: !!prompt,
    hasModel: !!model,
    hasProvider: !!provider,
    model: model,
    provider: provider
  });

  if (!model || (!prompt && !redesignMarkdown)) {
    console.log('❌ Missing required fields:', { model, prompt: !!prompt, redesignMarkdown: !!redesignMarkdown });
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

    // 🤖 Smart Gemini Model Selection
  // Auto-route to the best Gemini model based on prompt complexity
  let smartModel = model;
  
  if (prompt && (model.includes('gemini') || model.includes('gemma'))) {
    const promptText = prompt.toLowerCase();
    const wordCount = prompt.split(' ').length;
    const complexityIndicators = [
      'animation', 'interactive', 'complex', 'advanced', 'dashboard', 
      'chart', 'graph', 'database', 'api', 'responsive', 'mobile',
      'framework', 'library', 'state management', 'routing'
    ];
    
    const isComplex = complexityIndicators.some(indicator => 
      promptText.includes(indicator)
    ) || wordCount > 50;
    
    const isSimple = wordCount < 15 && (
      promptText.includes('button') || 
      promptText.includes('color') || 
      promptText.includes('text') ||
      promptText.includes('simple') ||
      promptText.includes('fix')
    );

    // Check if Google API is available
    const hasGoogleAPI = !!(process.env.google_api_key && process.env.google_api_key.length > 0);
    
    if (hasGoogleAPI) {
      // Smart routing with Google API - prefer Google models that work
      if (isSimple) {
        smartModel = 'google/gemma-2-3b-it'; // Fast for simple tasks
      } else if (isComplex) {
        smartModel = 'google/gemini-2.5-flash'; // Powerful for complex tasks
      } else {
        smartModel = 'google/gemini-2.5-flash-lite'; // Balanced default
      }
    } else {
      // Fallback to reliable models from supported providers
      console.log('⚠️ Google API not available, using reliable fallback models');
      if (isSimple) {
        smartModel = 'Meta-Llama-3.1-8B-Instruct'; // SambaNova fast model
      } else if (isComplex) {
        smartModel = 'Meta-Llama-3.1-70B-Instruct'; // SambaNova powerful model
      } else {
        smartModel = 'Meta-Llama-3.1-8B-Instruct'; // Reliable default
      }
    }
    
    console.log(`🤖 Smart routing: "${prompt.substring(0, 50)}..." → ${smartModel} (Google API: ${hasGoogleAPI})`);
  }

  const selectedModel = MODELS.find(
    (m) => m.value === smartModel || m.label === smartModel
  );
  if (!selectedModel) {
    return NextResponse.json(
      { ok: false, error: "Invalid model selected" },
      { status: 400 }
    );
  }

  if (!selectedModel.providers.includes(provider) && provider !== "auto") {
    return NextResponse.json(
      {
        ok: false,
        error: `The selected model does not support the ${provider} provider.`,
        openSelectProvider: true,
      },
      { status: 400 }
    );
  }

  let token = userToken;
  let billTo: string | null = null;

  /**
   * Handle local usage token, this bypass the need for a user token
   * and allows local testing without authentication.
   * This is useful for development and testing purposes.
   */
  if (process.env.HF_TOKEN && process.env.HF_TOKEN.length > 0) {
    token = process.env.HF_TOKEN;
  }

  const ip = authHeaders.get("x-forwarded-for")?.includes(",")
    ? authHeaders.get("x-forwarded-for")?.split(",")[1].trim()
    : authHeaders.get("x-forwarded-for");

  // Check if Google API is available for unlimited usage
  const hasGoogleAPI = !!(process.env.google_api_key && process.env.google_api_key.length > 0);
  const isGoogleModel = smartModel.includes('google/gemini') || smartModel.includes('google/gemma');

  if (!token && !(hasGoogleAPI && isGoogleModel)) {
    ipAddresses.set(ip, (ipAddresses.get(ip) || 0) + 1);
    if (ipAddresses.get(ip) > MAX_REQUESTS_PER_IP) {
      return NextResponse.json(
        {
          ok: false,
          openLogin: true,
          message: "Upgrade your account to continue using the service",
        },
        { status: 429 }
      );
    }

    token = process.env.DEFAULT_HF_TOKEN as string;
    billTo = "huggingface";
  } else if (hasGoogleAPI && isGoogleModel) {
    billTo = "google";
  }

  const DEFAULT_PROVIDER = PROVIDERS.groq;
  const selectedProvider =
    provider === "auto"
      ? PROVIDERS[selectedModel.autoProvider as keyof typeof PROVIDERS]
      : PROVIDERS[provider as keyof typeof PROVIDERS] ?? DEFAULT_PROVIDER;

  // Extract the actual model name for API calls (remove provider prefix if present)
  const getActualModelName = (modelValue: string) => {
    // If the model has a provider prefix like "hyperbolic/meta-llama/...", extract the actual model name
    if (modelValue.includes('/') && !modelValue.startsWith('meta-llama/') && !modelValue.startsWith('mistralai/') && !modelValue.startsWith('accounts/')) {
      const parts = modelValue.split('/');
      return parts.slice(1).join('/'); // Remove the provider prefix
    }
    return modelValue;
  };

  const actualModelName = getActualModelName(selectedModel.value);

  try {
    // Create a stream response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start the response
    const response = new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    (async () => {
      let completeResponse = "";
      try {
        // Check if we should use direct Gemini API
        if (shouldUseDirectGeminiAPI(smartModel) && process.env.google_api_key) {
          console.log(`🔗 Using direct Gemini API for ${smartModel}`);
          const geminiClient = new GeminiClient(process.env.google_api_key);
          
          // DIRECT HTML GENERATION PROMPT - NO EXPLANATIONS, ONLY CODE
          const enhancedSystemPrompt = `You are a web developer who ONLY generates complete HTML applications. You NEVER provide explanations, blueprints, or architectural descriptions.

CRITICAL RULES:
1. ALWAYS start your response with "<!DOCTYPE html>"
2. NEVER write explanations or text before the HTML code
3. NEVER use markdown code blocks (no \`\`\`html)
4. NEVER say "I cannot create" or give limitations
5. ALWAYS generate a COMPLETE, working HTML file
6. The HTML must be sophisticated with 1000+ lines of code
7. Include TailwindCSS, JavaScript animations, and modern design

MANDATORY OUTPUT FORMAT:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Application</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Advanced CSS with animations and gradients */
    </style>
</head>
<body>
    <!-- Sophisticated application with multiple sections -->
    <script>
        /* Advanced JavaScript with interactive features */
    </script>
</body>
</html>

Generate sophisticated applications with:
- Beautiful modern UI with gradients and animations
- Interactive components and real-time calculations
- Professional styling and responsive design
- Multiple features and comprehensive functionality
- Advanced JavaScript logic and state management
- Data visualization and user engagement features

REMEMBER: ONLY output HTML code, NO explanations or text!
\`- Advanced notification and feedback systems
- Performance monitoring and optimization features\``;

          // Use single completion for better control
          console.log('🧪 Testing with single completion first...');
          try {
            const singleResponse = await geminiClient.chatCompletion({
              model: smartModel,
              messages: [
                {
                  role: "system",
                  content: enhancedSystemPrompt,
                },
                {
                  role: "user",
                  content: redesignMarkdown
                    ? `Here is my current design as a markdown:\n\n${redesignMarkdown}\n\nNow, please create a new design based on this markdown.`
                    : html
                    ? `Here is my current HTML code:\n\n\`\`\`html\n${html}\n\`\`\` 

Now, please create an enhanced version based on this HTML.`
                    : `${prompt}

Please create a comprehensive, feature-rich application that includes:
- Beautiful, modern UI design with gradients and animations
- Complete functionality for all expected features
- Interactive elements and user engagement
- Data validation and error handling
- Responsive design for all devices
- Professional styling and visual effects
- Local storage for data persistence
- Export/sharing capabilities where relevant

Make this application production-ready and impressive in both design and functionality.`,
                },
              ],
              max_tokens: selectedProvider.max_tokens,
            });
            
            const responseContent = singleResponse.choices[0]?.message?.content || '';
            console.log('✅ Single completion response:', {
              length: responseContent.length,
              hasDoctype: responseContent.includes('<!DOCTYPE'),
              hasClosingHtml: responseContent.includes('</html>'),
              preview: responseContent.substring(0, 200)
            });
            
            if (responseContent) {
              await writer.write(encoder.encode(responseContent));
              completeResponse = responseContent;
            }
            
          } catch (geminiError) {
            console.error('❌ Gemini API error:', geminiError);
            throw geminiError;
          }
        } else {
          // Fallback to HuggingFace API
          console.log(`🔗 Using HuggingFace API for ${smartModel}`);
          
          // Use the same simple, direct prompt for consistency across providers  
          const enhancedSystemPrompt = `You are a web developer who ONLY generates complete HTML applications. You NEVER provide explanations, blueprints, or architectural descriptions.

CRITICAL RULES:
1. ALWAYS start your response with "<!DOCTYPE html>"
2. NEVER write explanations or text before the HTML code
3. NEVER use markdown code blocks (no \`\`\`html)
4. NEVER say "I cannot create" or give limitations
5. ALWAYS generate a COMPLETE, working HTML file
6. The HTML must be sophisticated with 1000+ lines of code
7. Include TailwindCSS, JavaScript animations, and modern design

MANDATORY OUTPUT FORMAT:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Application</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Advanced CSS with animations and gradients */
    </style>
</head>
<body>
    <!-- Sophisticated application with multiple sections -->
    <script>
        /* Advanced JavaScript with interactive features */
    </script>
</body>
</html>

Generate sophisticated applications with:
- Beautiful modern UI with gradients and animations
- Interactive components and real-time calculations
- Professional styling and responsive design
- Multiple features and comprehensive functionality
- Advanced JavaScript logic and state management
- Data visualization and user engagement features

REMEMBER: ONLY output HTML code, NO explanations or text!
\`- Advanced notification and feedback systems
- Performance monitoring and optimization features\``;

          const client = new InferenceClient(token);
          const chatCompletion = client.chatCompletionStream(
            {
              model: actualModelName,
              provider: selectedProvider.id as any,
              messages: [
                {
                  role: "system",
                  content: enhancedSystemPrompt,
                },
                {
                  role: "user",
                  content: redesignMarkdown
                    ? `Here is my current design as a markdown:\n\n${redesignMarkdown}\n\nNow, please create a new design based on this markdown.`
                    : html
                    ? `Here is my current HTML code:\n\n\`\`\`html\n${html}\n\`\`\`

Now, please create an enhanced version based on this HTML.`
                    : `Generate a complete HTML application for: ${prompt}

REQUIREMENTS:
- Start response with <!DOCTYPE html>
- Create sophisticated, interactive application
- Include beautiful modern design
- Add multiple features and animations
- Use TailwindCSS and JavaScript
- Make it fully functional and professional
- NO explanations, ONLY HTML code`,
                },
              ],
              max_tokens: selectedProvider.max_tokens,
            },
            billTo ? { billTo } : {}
          );

          while (true) {
            const { done, value } = await chatCompletion.next();
            if (done) {
              break;
            }

            const chunk = value.choices[0]?.delta?.content;
            if (chunk) {
              await writer.write(encoder.encode(chunk));
              completeResponse += chunk;
              
              // Enhanced logging for debugging
              if (completeResponse.length % 500 === 0) {
                console.log(`📝 Response length: ${completeResponse.length}, contains DOCTYPE: ${completeResponse.includes('<!DOCTYPE')}, contains </html>: ${completeResponse.includes('</html>')}`);
              }

              if (completeResponse.includes("</html>")) {
                console.log(`✅ Complete HTML received (${completeResponse.length} chars)`);
                break;
              }
            }
          }
        }
      } catch (error: any) {
        console.error('❌ AI API Error:', {
          message: error.message,
          model: smartModel,
          hasGoogleAPI: !!(process.env.google_api_key && process.env.google_api_key.length > 0),
          responseLength: completeResponse.length,
          hasDoctype: completeResponse.includes('<!DOCTYPE'),
          hasClosingHtml: completeResponse.includes('</html>')
        });
        
        if (error.message?.includes("exceeded your monthly included credits")) {
          await writer.write(
            encoder.encode(
              JSON.stringify({
                ok: false,
                openProModal: true,
                message: error.message,
              })
            )
          );
        } else {
          await writer.write(
            encoder.encode(
              JSON.stringify({
                ok: false,
                message:
                  error.message ||
                  "An error occurred while processing your request.",
              })
            )
          );
        }
      } finally {
        // Log final response statistics
        console.log(`📊 Final response stats:`, {
          length: completeResponse.length,
          hasDoctype: completeResponse.includes('<!DOCTYPE'),
          hasClosingHtml: completeResponse.includes('</html>'),
          model: smartModel,
          preview: completeResponse.substring(0, 200) + '...'
        });
        await writer?.close();
      }
    })();

    return response;
  } catch (error: any) {
    console.error('❌ Streaming error:', error.message);
    return NextResponse.json(
      {
        ok: false,
        openSelectProvider: true,
        message:
          error?.message || "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authHeaders = await headers();
  const userToken = request.cookies.get(MY_TOKEN_KEY())?.value;

  const body = await request.json();
  const { prompt, html, previousPrompt, provider, selectedElementHtml, model } =
    body;

  if (!prompt || !html) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  // 🤖 Smart Gemini Model Selection for Follow-ups
  let smartModel = model;
  
  if (prompt && (model.includes('gemini') || model.includes('gemma'))) {
    const promptText = prompt.toLowerCase();
    const wordCount = prompt.split(' ').length;
    const complexityIndicators = [
      'animation', 'interactive', 'complex', 'advanced', 'dashboard', 
      'chart', 'graph', 'database', 'api', 'responsive', 'mobile',
      'framework', 'library', 'state management', 'routing'
    ];
    
    const isComplex = complexityIndicators.some(indicator => 
      promptText.includes(indicator)
    ) || wordCount > 50;
    
    const isSimple = wordCount < 15 && (
      promptText.includes('button') || 
      promptText.includes('color') || 
      promptText.includes('text') ||
      promptText.includes('simple') ||
      promptText.includes('fix')
    );

    // Check if Google API is available
    const hasGoogleAPI = !!(process.env.google_api_key && process.env.google_api_key.length > 0);
    
    if (hasGoogleAPI) {
      // Smart routing with Google API
      if (isSimple) {
        smartModel = 'google/gemma-2-3b-it'; // Fast for simple edits
      } else if (isComplex) {
        smartModel = 'google/gemini-2.5-flash'; // Powerful for complex changes
      } else {
        smartModel = 'google/gemini-2.5-flash-lite'; // Balanced default
      }
    } else {
      // Fallback to reliable HuggingFace models for follow-ups
      console.log('⚠️ Google API not available for follow-up, using HuggingFace fallback');
      if (isSimple) {
        smartModel = 'meta-llama/Llama-3.2-3B-Instruct'; // Fast and reliable for HTML edits
      } else if (isComplex) {
        smartModel = 'microsoft/DialoGPT-large'; // Better for complex HTML modifications
      } else {
        smartModel = 'meta-llama/Llama-3.2-3B-Instruct'; // Reliable default for HTML edits
      }
    }
    
    console.log(`🤖 Smart follow-up routing: "${prompt.substring(0, 50)}..." → ${smartModel} (Google API: ${hasGoogleAPI})`);
  }

  const selectedModel = MODELS.find(
    (m) => m.value === smartModel || m.label === smartModel
  );
  if (!selectedModel) {
    return NextResponse.json(
      { ok: false, error: "Invalid model selected" },
      { status: 400 }
    );
  }

  let token = userToken;
  let billTo: string | null = null;

  /**
   * Handle local usage token, this bypass the need for a user token
   * and allows local testing without authentication.
   * This is useful for development and testing purposes.
   */
  if (process.env.HF_TOKEN && process.env.HF_TOKEN.length > 0) {
    token = process.env.HF_TOKEN;
  }

  const ip = authHeaders.get("x-forwarded-for")?.includes(",")
    ? authHeaders.get("x-forwarded-for")?.split(",")[1].trim()
    : authHeaders.get("x-forwarded-for");

  // Check if Google API is available for unlimited usage (PUT function)
  const hasGoogleAPI = !!(process.env.google_api_key && process.env.google_api_key.length > 0);
  const isGoogleModel = smartModel.includes('google/gemini') || smartModel.includes('google/gemma');

  if (!token && !(hasGoogleAPI && isGoogleModel)) {
    ipAddresses.set(ip, (ipAddresses.get(ip) || 0) + 1);
    if (ipAddresses.get(ip) > MAX_REQUESTS_PER_IP) {
      return NextResponse.json(
        {
          ok: false,
          openLogin: true,
          message: "Upgrade your account to continue using the service",
        },
        { status: 429 }
      );
    }

    token = process.env.DEFAULT_HF_TOKEN as string;
    billTo = "huggingface";
  } else if (hasGoogleAPI && isGoogleModel) {
    billTo = "google";
  }

  const DEFAULT_PROVIDER = PROVIDERS.groq;
  const selectedProvider =
    provider === "auto"
      ? PROVIDERS[selectedModel.autoProvider as keyof typeof PROVIDERS]
      : PROVIDERS[provider as keyof typeof PROVIDERS] ?? DEFAULT_PROVIDER;

  // Extract the actual model name for API calls (remove provider prefix if present)
  const getActualModelName = (modelValue: string) => {
    // If the model has a provider prefix like "hyperbolic/meta-llama/...", extract the actual model name
    if (modelValue.includes('/') && !modelValue.startsWith('meta-llama/') && !modelValue.startsWith('mistralai/') && !modelValue.startsWith('accounts/')) {
      const parts = modelValue.split('/');
      return parts.slice(1).join('/'); // Remove the provider prefix
    }
    return modelValue;
  };

  const actualModelName = getActualModelName(selectedModel.value);

  try {
    // Check if we should use direct Gemini API for follow-up requests
    let response;
    
    if (shouldUseDirectGeminiAPI(smartModel) && process.env.google_api_key) {
      console.log(`🔗 Using direct Gemini API for follow-up: ${smartModel}`);
      const geminiClient = new GeminiClient(process.env.google_api_key);
      
      response = await geminiClient.chatCompletion({
        model: smartModel,
        messages: [
          {
            role: "system",
            content: FOLLOW_UP_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: previousPrompt
              ? previousPrompt
              : "You are modifying the HTML file based on the user's request.",
          },
          {
            role: "assistant",
            content: `The current code is: \n\`\`\`html\n${html}\n\`\`\` ${
              selectedElementHtml
                ? `\n\nYou have to update ONLY the following element, NOTHING ELSE: \n\n\`\`\`html\n${selectedElementHtml}\n\`\`\``
                : ""
            }`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: selectedProvider.max_tokens,
      });
    } else {
      // Fallback to HuggingFace API
      console.log(`🔗 Using HuggingFace API for follow-up: ${smartModel}`);
      const client = new InferenceClient(token);
      
      response = await client.chatCompletion(
        {
          model: actualModelName,
          provider: selectedProvider.id as any,
          messages: [
            {
              role: "system",
              content: FOLLOW_UP_SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: previousPrompt
                ? previousPrompt
                : "You are modifying the HTML file based on the user's request.",
            },
            {
              role: "assistant",

              content: `The current code is: \n\`\`\`html\n${html}\n\`\`\` ${
                selectedElementHtml
                  ? `\n\nYou have to update ONLY the following element, NOTHING ELSE: \n\n\`\`\`html\n${selectedElementHtml}\n\`\`\``
                  : ""
              }`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: selectedProvider.max_tokens,
        },
        billTo ? { billTo } : {}
      );
    }

    const chunk = response.choices[0]?.message?.content;
    if (!chunk) {
      return NextResponse.json(
        { ok: false, message: "No content returned from the model" },
        { status: 400 }
      );
    }

    if (chunk) {
      const updatedLines: number[][] = [];
      let newHtml = html;
      let position = 0;
      let moreBlocks = true;

      while (moreBlocks) {
        const searchStartIndex = chunk.indexOf(SEARCH_START, position);
        if (searchStartIndex === -1) {
          moreBlocks = false;
          continue;
        }

        const dividerIndex = chunk.indexOf(DIVIDER, searchStartIndex);
        if (dividerIndex === -1) {
          moreBlocks = false;
          continue;
        }

        const replaceEndIndex = chunk.indexOf(REPLACE_END, dividerIndex);
        if (replaceEndIndex === -1) {
          moreBlocks = false;
          continue;
        }

        const searchBlock = chunk.substring(
          searchStartIndex + SEARCH_START.length,
          dividerIndex
        );
        const replaceBlock = chunk.substring(
          dividerIndex + DIVIDER.length,
          replaceEndIndex
        );

        if (searchBlock.trim() === "") {
          newHtml = `${replaceBlock}\n${newHtml}`;
          updatedLines.push([1, replaceBlock.split("\n").length]);
        } else {
          const blockPosition = newHtml.indexOf(searchBlock);
          if (blockPosition !== -1) {
            const beforeText = newHtml.substring(0, blockPosition);
            const startLineNumber = beforeText.split("\n").length;
            const replaceLines = replaceBlock.split("\n").length;
            const endLineNumber = startLineNumber + replaceLines - 1;

            updatedLines.push([startLineNumber, endLineNumber]);
            newHtml = newHtml.replace(searchBlock, replaceBlock);
          }
        }

        position = replaceEndIndex + REPLACE_END.length;
      }

      return NextResponse.json({
        ok: true,
        html: newHtml,
        updatedLines,
      });
    } else {
      return NextResponse.json(
        { ok: false, message: "No content returned from the model" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    if (error.message?.includes("exceeded your monthly included credits")) {
      return NextResponse.json(
        {
          ok: false,
          openProModal: true,
          message: error.message,
        },
        { status: 402 }
      );
    }
    return NextResponse.json(
      {
        ok: false,
        openSelectProvider: true,
        message:
          error.message || "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
