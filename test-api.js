// Test API Configuration with Google Gemini
// Run this in the browser console to test your API setup

async function testGeminiApiConfiguration() {
  console.log('🔧 Testing DeepSite AI with Google Gemini API...');
  
  try {
    const response = await fetch('/api/ask-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': window.location.hostname,
      },
      body: JSON.stringify({
        prompt: 'Create a simple todo app with add, delete functionality and beautiful styling',
        provider: 'auto',
        model: 'google/gemini-2.5-flash-lite',
        html: '',
        redesignMarkdown: null
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ API Error:', errorData);
      return;
    }

    console.log('✅ API call initiated successfully - Google Gemini should be active!');
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let chunkCount = 0;
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      fullResponse += chunk;
      chunkCount++;
      
      // Log progress every 10 chunks
      if (chunkCount % 10 === 0) {
        console.log(`📝 Chunk ${chunkCount}: ${fullResponse.length} characters received...`);
      }
    }
    
    console.log('📊 Final Test Results:', {
      totalLength: fullResponse.length,
      totalChunks: chunkCount,
      hasDoctype: fullResponse.includes('<!DOCTYPE'),
      hasHtmlTag: fullResponse.includes('<html'),
      hasClosingHtml: fullResponse.includes('</html>'),
      hasTailwind: fullResponse.includes('tailwindcss'),
      hasInteractivity: fullResponse.includes('addEventListener') || fullResponse.includes('onclick'),
      preview: fullResponse.substring(0, 500) + '...'
    });
    
    if (fullResponse.includes('<!DOCTYPE') && fullResponse.includes('</html>')) {
      console.log('✅ SUCCESS: Complete HTML document generated with Google Gemini!');
      
      // Try to inject the HTML into a test div
      const testDiv = document.createElement('div');
      testDiv.innerHTML = fullResponse;
      console.log('🎯 Generated HTML elements:', testDiv.children.length);
      
    } else {
      console.log('⚠️ WARNING: Response may be incomplete or malformed');
    }
    
    return fullResponse;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Quick API status check
async function checkApiStatus() {
  console.log('🔍 Checking API status...');
  try {
    const response = await fetch('/api/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'test',
        provider: 'auto',
        model: 'google/gemini-2.5-flash-lite'
      })
    });
    
    console.log('API Response Status:', response.status);
    if (!response.ok) {
      const error = await response.json();
      console.log('API Error Details:', error);
    }
  } catch (error) {
    console.error('API Status Check Failed:', error);
  }
}

console.log('🚀 Google Gemini API Test Ready!');
console.log('Run: testGeminiApiConfiguration() to test AI generation');
console.log('Run: checkApiStatus() for quick status check');
