# AI Integration Setup Instructions

## Issue: AI Generated Code Not Showing in Preview

Your DeepSite application has a robust AI integration system, but it requires proper API configuration to work correctly.

## Root Cause Analysis

1. **Missing Google API Key**: The `.env.local` file contains placeholder values
2. **Fallback Issues**: When Google API is unavailable, the HuggingFace fallback isn't generating complete HTML
3. **Model Routing**: Smart model selection is working, but without proper API keys

## Solution Options

### Option 1: Set Up Google Gemini API (Recommended)

1. **Get Google API Key**:
   - Go to https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key

2. **Update Environment Variables**:
   ```bash
   # Edit .env.local file
   google_api_key=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Restart Development Server**:
   ```bash
   npm run dev
   ```

### Option 2: Configure HuggingFace Token

1. **Get HuggingFace Token**:
   - Go to https://huggingface.co/settings/tokens
   - Create a new token
   - Copy the token

2. **Update Environment Variables**:
   ```bash
   # Edit .env.local file
   HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   DEFAULT_HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## Testing the Fix

1. Open your application
2. Try creating a "todo app" or any simple request
3. Check the browser console for debug messages:
   - Look for "🤖 Smart routing:" messages
   - Look for "🔗 Using direct Gemini API" or "🔗 Using HuggingFace API"
   - Look for "🐛 DEBUG:" messages showing HTML processing

## Expected Behavior

- **With Google API**: Direct, fast responses with smart model routing
- **With HuggingFace**: Fallback system with reliable generation
- **Debug Logging**: Console shows which API is being used and HTML processing steps

## Current Debug Features

Your application already has comprehensive debug logging in place:
- API route selection logging
- HTML extraction logging  
- Model routing decisions
- Response processing steps

## Next Steps

1. Choose either Google or HuggingFace API setup
2. Update the `.env.local` file with real API keys
3. Restart the development server
4. Test with a simple prompt like "create a todo app"
5. Check browser console for debug output

The AI integration architecture is solid - it just needs proper API credentials to function correctly.
