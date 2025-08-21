# 🤖 App Builder - API Key Setup Guide

## Quick Setup: Google Gemini API Key

### 1. Get Your Free API Key

1. **Visit Google AI Studio**: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. **Sign in** with your Google account
3. **Click "Create API Key"**
4. **Copy** the generated API key (starts with `AIzaSy...`)

### 2. Add to Your App

1. **Open** the `.env.local` file in your project root
2. **Replace** `your_google_gemini_api_key_here` with your actual API key:
   ```
   # Example:
# google_api_key=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. **Save** the file
4. **Restart** your development server

### 3. That's It! 🎉

Your app will now use the direct Google Gemini API for:
- ✅ **Faster responses**
- ✅ **Better reliability**  
- ✅ **Latest Gemini models**
- ✅ **Higher rate limits**

## 🧠 Smart Model Routing

The app automatically selects the best Gemini model based on your prompt:

- **Simple tasks** (colors, buttons) → **Gemma 2-3B** (fast & free)
- **Complex tasks** (animations, dashboards) → **Gemini 2.5 Flash** (powerful)
- **Balanced tasks** → **Gemini 2.5 Flash Lite** (default)

## 🔄 Fallback System

If no Google API key is provided, the app automatically falls back to HuggingFace's inference API to ensure it always works.

## 🆓 Free Tier Limits

Google Gemini API offers generous free tier limits:
- **15 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

Perfect for development and moderate usage!

## 🔧 Environment Variables

```env
# Required for Gemini API
google_api_key=your_google_gemini_api_key_here

# Optional: HuggingFace fallback
HF_TOKEN=your_huggingface_token_here
DEFAULT_HF_TOKEN=your_default_huggingface_token_here
```

## ❓ Need Help?

If you encounter any issues:
1. Make sure your API key is valid
2. Check you haven't exceeded rate limits
3. Verify the `.env.local` file is in the project root
4. Restart your development server

Happy building! 🚀
