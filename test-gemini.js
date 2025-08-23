// Simple Google Gemini API Test
// Run this in a separate terminal to test the API key

const { GeminiClient } = require('./lib/gemini-client.js');

async function testGeminiAPI() {
  const apiKey = process.env.google_api_key;
  
  if (!apiKey || apiKey === 'your_google_gemini_api_key_here') {
    console.log('❌ No API key found. Please set the google_api_key environment variable.');
    return;
  }
  
  console.log('🔑 API Key found:', apiKey.substring(0, 10) + '...');
  
  try {
    const client = new GeminiClient(apiKey);
    
    console.log('📞 Testing single completion...');
    const response = await client.chatCompletion({
      model: 'google/gemini-2.5-flash-lite',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant. Respond with valid HTML.'
        },
        {
          role: 'user',
          content: 'Create a simple hello world HTML page'
        }
      ],
      max_tokens: 1000
    });
    
    console.log('✅ Response received:', {
      length: response.choices[0]?.message?.content?.length || 0,
      hasHtml: response.choices[0]?.message?.content?.includes('<html>') || false,
      preview: response.choices[0]?.message?.content?.substring(0, 200) + '...'
    });
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testGeminiAPI();
