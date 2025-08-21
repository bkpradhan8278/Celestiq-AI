/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Google Gemini API Client
 * Handles direct API calls to Google's Gemini models
 */

export interface GeminiMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface GeminiRequest {
  model: string;
  messages: GeminiMessage[];
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export class GeminiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta";
  }

  /**
   * Convert OpenAI-style messages to Gemini format
   */
  private convertMessages(messages: GeminiMessage[]) {
    const systemMessage = messages.find(m => m.role === "system");
    const conversationMessages = messages.filter(m => m.role !== "system");

    const geminiMessages = conversationMessages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    return {
      systemInstruction: systemMessage ? {
        parts: [{ text: systemMessage.content }]
      } : undefined,
      contents: geminiMessages
    };
  }

  /**
   * Get the correct model name for Gemini API
   */
  private getModelName(modelValue: string): string {
    const modelMap: Record<string, string> = {
      "google/gemini-2.5-flash-lite": "gemini-1.5-flash",
      "google/gemini-2.5-flash": "gemini-1.5-pro",
      "google/gemma-2-3b-it": "gemini-1.5-flash",
      "google/gemma-2-9b-it": "gemini-1.5-flash",
    };

    return modelMap[modelValue] || "gemini-1.5-flash";
  }

  /**
   * Stream chat completion from Gemini API
   */
  async *streamChatCompletion(request: GeminiRequest) {
    const modelName = this.getModelName(request.model);
    const { systemInstruction, contents } = this.convertMessages(request.messages);

    const geminiRequest = {
      systemInstruction,
      contents,
      generationConfig: {
        maxOutputTokens: request.max_tokens || 2048,
        temperature: request.temperature || 0.7,
      },
    };

    const response = await fetch(
      `${this.baseUrl}/models/${modelName}:streamGenerateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiRequest),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim() && line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                yield {
                  choices: [{
                    delta: {
                      content: data.candidates[0].content.parts[0].text
                    }
                  }]
                };
              }
            } catch {
              // Skip malformed JSON
              continue;
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Single chat completion from Gemini API
   */
  async chatCompletion(request: GeminiRequest) {
    const modelName = this.getModelName(request.model);
    const { systemInstruction, contents } = this.convertMessages(request.messages);

    const geminiRequest = {
      systemInstruction,
      contents,
      generationConfig: {
        maxOutputTokens: request.max_tokens || 2048,
        temperature: request.temperature || 0.7,
      },
    };

    const response = await fetch(
      `${this.baseUrl}/models/${modelName}:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiRequest),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return {
      choices: [{
        message: {
          content
        }
      }]
    };
  }
}

/**
 * Check if we should use direct Gemini API or fallback to HuggingFace
 */
export function shouldUseDirectGeminiAPI(model: string): boolean {
  return !!(process.env.GOOGLE_API_KEY && 
         process.env.GOOGLE_API_KEY.length > 0 && 
         model.startsWith('google/'));
}
