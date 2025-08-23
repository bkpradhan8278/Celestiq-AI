export const PROVIDERS = {
  "openai": {
    name: "OpenAI",
    max_tokens: 128_000,
    id: "openai",
    baseUrl: "https://api.openai.com/v1",
  },
  "anthropic": {
    name: "Anthropic",
    max_tokens: 200_000,
    id: "anthropic",
    baseUrl: "https://api.anthropic.com/v1",
  },
  "fireworks": {
    name: "Fireworks AI",
    max_tokens: 32_768,
    id: "fireworks",
    baseUrl: "https://api.fireworks.ai/inference/v1",
  },
  "sambanova": {
    name: "SambaNova",
    max_tokens: 128_000,
    id: "sambanova",
    baseUrl: "https://api.sambanova.ai/v1",
  },
  "hyperbolic": {
    name: "Hyperbolic",
    max_tokens: 32_768,
    id: "hyperbolic",
    baseUrl: "https://api.hyperbolic.xyz/v1",
  },
  "nebius": {
    name: "Nebius AI",
    max_tokens: 32_768,
    id: "nebius",
    baseUrl: "https://api.studio.nebius.ai/v1",
  },
  "novita": {
    name: "Novita AI",
    max_tokens: 32_768,
    id: "novita",
    baseUrl: "https://api.novita.ai/v3/openai",
  },
  "cohere": {
    name: "Cohere",
    max_tokens: 128_000,
    id: "cohere",
    baseUrl: "https://api.cohere.ai/v1",
  },
  "huggingface": {
    name: "Hugging Face",
    max_tokens: 32_768,
    id: "huggingface",
    baseUrl: "https://api-inference.huggingface.co/models",
  },
  "replicate": {
    name: "Replicate",
    max_tokens: 32_768,
    id: "replicate",
    baseUrl: "https://api.replicate.com/v1",
  },
  "deepinfra": {
    name: "DeepInfra",
    max_tokens: 32_768,
    id: "deepinfra",
    baseUrl: "https://api.deepinfra.com/v1/openai",
  },
  "together": {
    name: "Together AI",
    max_tokens: 128_000,
    id: "together",
    baseUrl: "https://api.together.xyz/v1",
  },
  "perplexity": {
    name: "Perplexity",
    max_tokens: 32_768,
    id: "perplexity",
    baseUrl: "https://api.perplexity.ai",
  },
  "groq": {
    name: "Groq",
    max_tokens: 32_768,
    id: "groq",
    baseUrl: "https://api.groq.com/openai/v1",
  },
  "google": {
    name: "Google AI",
    max_tokens: 1_000_000,
    id: "google",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
  },
};

export const MODELS = [
  // OpenAI Models
  {
    value: "gpt-4o-mini",
    label: "GPT-4O Mini",
    providers: ["openai"],
    autoProvider: "openai",
    description: "Fast and efficient model for most tasks",
  },
  {
    value: "gpt-4o",
    label: "GPT-4O",
    providers: ["openai"],
    autoProvider: "openai",
    description: "Most advanced OpenAI model",
  },
  
  // Anthropic Models
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet",
    providers: ["anthropic"],
    autoProvider: "anthropic",
    description: "Most intelligent Claude model",
  },
  {
    value: "claude-3-haiku-20240307",
    label: "Claude 3 Haiku",
    providers: ["anthropic"],
    autoProvider: "anthropic",
    description: "Fast and lightweight Claude model",
  },
  
  // Groq Models
  {
    value: "llama-3.3-70b-versatile",
    label: "Llama 3.3 70B",
    providers: ["groq"],
    autoProvider: "groq",
    description: "High performance open-source model",
  },
  {
    value: "llama-3.1-8b-instant",
    label: "Llama 3.1 8B Instant",
    providers: ["groq"],
    autoProvider: "groq",
    description: "Ultra-fast smaller Llama model",
  },
  {
    value: "mixtral-8x7b-32768",
    label: "Mixtral 8x7B",
    providers: ["groq"],
    autoProvider: "groq",
    description: "Efficient mixture of experts model",
  },
  
  // Together AI Models
  {
    value: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    label: "Llama 3.1 70B Turbo",
    providers: ["together"],
    autoProvider: "together",
    description: "Ultra-fast Llama model with excellent coding abilities",
  },
  {
    value: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    label: "Llama 3.1 8B Turbo",
    providers: ["together"],
    autoProvider: "together",
    description: "Fast and efficient smaller model",
  },
  {
    value: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    label: "Mixtral 8x7B Instruct",
    providers: ["together"],
    autoProvider: "together",
    description: "High-quality mixture of experts model",
  },
  
  // SambaNova Models
  {
    value: "Meta-Llama-3.1-8B-Instruct",
    label: "Llama 3.1 8B (SambaNova)",
    providers: ["sambanova"],
    autoProvider: "sambanova",
    description: "Free tier Llama model on SambaNova",
  },
  {
    value: "Meta-Llama-3.1-70B-Instruct",
    label: "Llama 3.1 70B (SambaNova)",
    providers: ["sambanova"],
    autoProvider: "sambanova",
    description: "Large Llama model on SambaNova",
  },
  {
    value: "Meta-Llama-3.1-405B-Instruct",
    label: "Llama 3.1 405B (SambaNova)",
    providers: ["sambanova"],
    autoProvider: "sambanova",
    description: "Largest Llama model available",
  },
  
  // Fireworks AI Models
  {
    value: "accounts/fireworks/models/llama-v3p1-8b-instruct",
    label: "Llama 3.1 8B (Fireworks)",
    providers: ["fireworks"],
    autoProvider: "fireworks",
    description: "Fast inference Llama model",
  },
  {
    value: "accounts/fireworks/models/llama-v3p1-70b-instruct",
    label: "Llama 3.1 70B (Fireworks)",
    providers: ["fireworks"],
    autoProvider: "fireworks",
    description: "High-performance Llama model",
  },
  
  // Hyperbolic Models
  {
    value: "hyperbolic/meta-llama/Meta-Llama-3.1-8B-Instruct",
    label: "Llama 3.1 8B (Hyperbolic)",
    providers: ["hyperbolic"],
    autoProvider: "hyperbolic",
    description: "Serverless Llama model",
  },
  {
    value: "hyperbolic/meta-llama/Meta-Llama-3.1-70B-Instruct",
    label: "Llama 3.1 70B (Hyperbolic)",
    providers: ["hyperbolic"],
    autoProvider: "hyperbolic",
    description: "Large Llama model with fast inference",
  },
  
  // Novita AI Models
  {
    value: "novita/meta-llama/llama-3.1-8b-instruct",
    label: "Llama 3.1 8B (Novita)",
    providers: ["novita"],
    autoProvider: "novita",
    description: "Efficient Llama model on Novita",
  },
  {
    value: "novita/meta-llama/llama-3.1-70b-instruct",
    label: "Llama 3.1 70B (Novita)",
    providers: ["novita"],
    autoProvider: "novita",
    description: "Large Llama model on Novita",
  },
  
  // DeepInfra Models
  {
    value: "deepinfra/meta-llama/Meta-Llama-3.1-8B-Instruct",
    label: "Llama 3.1 8B (DeepInfra)",
    providers: ["deepinfra"],
    autoProvider: "deepinfra",
    description: "Open-source Llama model",
  },
  {
    value: "deepinfra/meta-llama/Meta-Llama-3.1-70B-Instruct",
    label: "Llama 3.1 70B (DeepInfra)",
    providers: ["deepinfra"],
    autoProvider: "deepinfra",
    description: "Large open-source model",
  },
  
  // Cohere Models
  {
    value: "command-r",
    label: "Command R",
    providers: ["cohere"],
    autoProvider: "cohere",
    description: "Cohere's instruction-following model",
  },
  {
    value: "command-r-plus",
    label: "Command R+",
    providers: ["cohere"],
    autoProvider: "cohere",
    description: "Enhanced Cohere model",
  },
  
  // Perplexity Models
  {
    value: "llama-3.1-sonar-small-128k-online",
    label: "Sonar Small (Perplexity)",
    providers: ["perplexity"],
    autoProvider: "perplexity",
    description: "Real-time web search + LLM",
  },
  {
    value: "llama-3.1-sonar-large-128k-online",
    label: "Sonar Large (Perplexity)",
    providers: ["perplexity"],
    autoProvider: "perplexity",
    description: "Advanced web search + LLM",
  },
  
  // Google Gemini Models
  {
    value: "google/gemini-2.5-flash-lite",
    label: "Gemini 2.5 Flash Lite",
    providers: ["google", "huggingface"],
    autoProvider: "huggingface",
    description: "Fast and efficient Gemini model",
  },
  {
    value: "google/gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    providers: ["google", "huggingface"],
    autoProvider: "huggingface",
    description: "Powerful Gemini model for complex tasks",
  },
  {
    value: "google/gemma-2-3b-it",
    label: "Gemma 2 3B Instruct",
    providers: ["google", "huggingface"],
    autoProvider: "huggingface",
    description: "Open-source Google model",
  },
  {
    value: "google/gemma-2-9b-it",
    label: "Gemma 2 9B Instruct",
    providers: ["google", "huggingface"],
    autoProvider: "huggingface",
    description: "Larger open-source Google model",
  },
  
  // DeepSeek Models
  {
    value: "deepseek-ai/DeepSeek-V3-0324",
    label: "DeepSeek V3",
    providers: ["deepinfra", "fireworks"],
    autoProvider: "deepinfra",
    description: "Advanced DeepSeek model for complex tasks",
  },
  {
    value: "deepseek-ai/deepseek-coder-33b-instruct",
    label: "DeepSeek Coder 33B",
    providers: ["deepinfra", "fireworks"],
    autoProvider: "deepinfra",
    description: "Specialized coding model",
  },
  
  // Qwen Models
  {
    value: "Qwen/Qwen2.5-Coder-32B-Instruct",
    label: "Qwen2.5 Coder 32B",
    providers: ["deepinfra", "fireworks"],
    autoProvider: "deepinfra",
    description: "Advanced Qwen coding model",
  },
  {
    value: "Qwen/Qwen2.5-72B-Instruct",
    label: "Qwen2.5 72B",
    providers: ["deepinfra", "together"],
    autoProvider: "deepinfra",
    description: "Large Qwen general model",
  },
];
