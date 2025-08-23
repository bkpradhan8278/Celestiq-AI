# 🤖 TapuAi-Web

A futuristic AI-powered website builder with stunning visual effects. Create beautiful, responsive websites using natural language prompts powered by multiple AI providers.

Built by **Bikram Pradhan** ✨

## 🚀 Features

- **AI-Powered Design**: Generate complete websites using natural language prompts
- **14 AI Providers**: OpenAI, Anthropic, Groq, Together AI, SambaNova, Fireworks AI, and more
- **Free Tier Support**: Many providers offer generous free tiers and credits
- **Real-time Preview**: See your changes instantly with futuristic wormhole backgrounds
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **User Authentication**: Secure login system with MongoDB
- **Project Management**: Save and manage multiple website projects

## 🎨 Visual Effects

Experience the future of web design with:
- **Wormhole Backgrounds**: Dynamic CSS-based wormhole effects with rotating energy rings
- **Particle Systems**: Floating particles and energy orbs for immersive experience
- **Smooth Animations**: Hardware-accelerated CSS animations for optimal performance
- **Futuristic UI**: Clean, modern interface with gradient effects

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **AI Providers**: 14 providers including OpenAI, Anthropic, Groq, SambaNova, Fireworks AI, Together AI, and more
- **Authentication**: Custom auth system with HuggingFace token support
- **Deployment**: Ready for Vercel, Railway, or any Node.js hosting

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database
- API keys for at least one of the supported providers:
  - OpenAI API key
  - Groq API key  
  - Together AI API key
  - HuggingFace token (optional)

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/app-builder.git
   cd app-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # AI Providers API Keys (add the ones you want to use)
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   FIREWORKS_API_KEY=your_fireworks_api_key
   SAMBANOVA_API_KEY=your_sambanova_api_key
   HYPERBOLIC_API_KEY=your_hyperbolic_api_key
   NEBIUS_API_KEY=your_nebius_api_key
   NOVITA_API_KEY=your_novita_api_key
   COHERE_API_KEY=your_cohere_api_key
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   REPLICATE_API_TOKEN=your_replicate_api_token
   DEEPINFRA_API_KEY=your_deepinfra_api_key
   TOGETHER_API_KEY=your_together_ai_api_key
   PERPLEXITY_API_KEY=your_perplexity_api_key
   GROQ_API_KEY=your_groq_api_key
   
   # HuggingFace (optional, for additional features)
   HF_TOKEN=your_huggingface_token
   DEFAULT_HF_TOKEN=your_default_hf_token
   
   # App Configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `OPENAI_API_KEY` | ⚠️ | OpenAI API key |
| `ANTHROPIC_API_KEY` | ⚠️ | Anthropic Claude API key |
| `FIREWORKS_API_KEY` | ⚠️ | Fireworks AI API key (free tier available) |
| `SAMBANOVA_API_KEY` | ⚠️ | SambaNova API key (free tier, no card required) |
| `HYPERBOLIC_API_KEY` | ⚠️ | Hyperbolic API key (free basic tier) |
| `NEBIUS_API_KEY` | ⚠️ | Nebius AI API key ($1 free credits) |
| `NOVITA_API_KEY` | ⚠️ | Novita AI API key ($10 free credits) |
| `COHERE_API_KEY` | ⚠️ | Cohere API key (free credits) |
| `HUGGINGFACE_API_KEY` | ⚠️ | Hugging Face API key (free limited calls) |
| `REPLICATE_API_TOKEN` | ⚠️ | Replicate API token (free signup credits) |
| `DEEPINFRA_API_KEY` | ⚠️ | DeepInfra API key (free trial credits) |
| `TOGETHER_API_KEY` | ⚠️ | Together AI API key (free credits on signup) |
| `PERPLEXITY_API_KEY` | ⚠️ | Perplexity API key (free trial, apply required) |
| `GROQ_API_KEY` | ⚠️ | Groq API key (free tier, rate limited) |
| `HF_TOKEN` | ❌ | HuggingFace token for enhanced features |
| `DEFAULT_HF_TOKEN` | ❌ | Fallback HuggingFace token |
| `NEXTAUTH_SECRET` | ✅ | Secret for authentication |
| `NEXTAUTH_URL` | ✅ | Base URL of your application |

> **Note**: You only need to add API keys for the providers you want to use. Most providers offer free tiers!

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Railway

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy with one click

### Other Platforms

Compatible with any Node.js hosting platform that supports:
- Node.js 18+
- MongoDB connectivity
- Environment variables

## 🎯 Usage

1. **Sign up/Login**: Create an account or sign in
2. **Create Project**: Start a new website project
3. **Describe Your Vision**: Use natural language to describe your website
4. **Choose AI Model**: Select from GPT-4O Mini, Llama 3.3 70B, or Llama 3.1 70B
5. **Real-time Generation**: Watch as AI creates your website with live preview
6. **Iterate & Refine**: Make adjustments with follow-up prompts
7. **Save & Deploy**: Save your project and deploy when ready

## 🤖 AI Providers

Choose from **14 different AI providers** with free tiers available:

### 🆓 Free Tier Providers

#### OpenAI
- **Models**: GPT-4O Mini, GPT-4O
- **Free Tier**: Small trial credits
- **Best for**: General web design, creative layouts

#### Anthropic (Claude)
- **Models**: Claude 3.5 Sonnet, Claude 3 Haiku
- **Free Tier**: Available via AWS Bedrock
- **Best for**: Advanced reasoning and analysis

#### Fireworks AI ⭐
- **Models**: Llama 3.1 8B/70B
- **Free Tier**: Developer tier + trial credits
- **Best for**: Fast inference, custom LLMs

#### SambaNova Cloud ⭐
- **Models**: Llama 3.1 8B/70B/405B
- **Free Tier**: No credit card required
- **Best for**: Large language models

#### Hyperbolic ⭐
- **Models**: Llama 3.1 8B/70B
- **Free Tier**: 60 requests/min, serverless
- **Best for**: High-frequency usage

#### Groq ⭐
- **Models**: Llama 3.3 70B, Llama 3.1 8B, Mixtral 8x7B
- **Free Tier**: Rate limited but generous
- **Best for**: Ultra-fast inference

#### Together AI ⭐
- **Models**: Llama 3.1 8B/70B, Mixtral 8x7B
- **Free Tier**: Free credits on signup
- **Best for**: Open-source models

#### DeepInfra ⭐
- **Models**: Llama 3.1 8B/70B
- **Free Tier**: Trial credits
- **Best for**: Open-source LLM inference

### 💳 Credit-Based Providers

#### Nebius AI Studio
- **Free Credits**: $1 free
- **Features**: LLMs + text-to-image

#### Novita AI
- **Free Credits**: $10 + GPU trial ($500)
- **Features**: LLM, image, video APIs

#### Cohere
- **Free Credits**: API credits included
- **Features**: Command R/R+, embeddings, rerank

#### Perplexity Labs
- **Free Credits**: Apply for trial
- **Features**: RAG + LLM with real-time web search

#### Hugging Face
- **Free Tier**: Limited API calls
- **Features**: Thousands of open models

#### Replicate
- **Free Credits**: Signup credits
- **Features**: AI models for images, video, LLM

## 🎨 Customization

### Wormhole Effects
The visual effects can be customized in `components/editor/preview/index.tsx`:
- Adjust ring count and rotation speeds
- Modify particle density and movement
- Change color schemes and gradients

### AI Prompts
Customize AI behavior in `lib/prompts.ts`:
- Modify system prompts for different design styles
- Adjust response formatting
- Add custom instructions

## 📁 Project Structure

```
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API endpoints
│   ├── auth/              # Authentication pages
│   └── projects/          # Project management
├── components/            # React components
│   ├── editor/           # Main editor interface
│   ├── ui/               # Reusable UI components
│   └── contexts/         # React contexts
├── lib/                  # Utility functions
│   ├── providers.ts      # AI provider configurations
│   ├── prompts.ts        # AI prompt templates
│   └── mongodb.ts        # Database connection
└── models/               # MongoDB schemas
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Creator

**Bikram Pradhan**
- Building the future of AI-powered web design
- Combining cutting-edge AI with stunning visual effects

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 technology
- **Groq** for ultra-fast inference
- **Together AI** for powerful open-source models
- **HuggingFace** for AI infrastructure
- **Next.js** team for the amazing framework
- **TailwindCSS** for beautiful styling

---

*Powered by Tapu AI* ☀️ | *Built with ❤️ by Bikram Pradhan*
      }
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        display: block;
      }
      /* Bottom section fixed */
      .bottom-section {
        position: absolute;
        bottom: 4rem; /* space from bottom */
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        z-index: 10;
      }
    </style>
  </head>
  <body>
    <!-- 3D Wormhole Background -->
    <canvas id="bg"></canvas>

    <!-- 🚀 Update Badge -->
    <span
      class="badge text-xs px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 animate-pulse"
    >
      🚀 New update live!
    </span>

    <!-- Floating Text & Button (BOTTOM FIXED) -->
    <div class="bottom-section">
      <h1 class="text-2xl lg:text-3xl font-bold neon">
        I'm ready to work
        <span class="text-base lg:text-lg text-gray-300 block font-medium mt-2">
          Ask me <span class="text-cyan-300">anything</span>.
        </span>
      </h1>
      <button
        class="mt-6 px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-xl transition-all hover:scale-110"
      >
        Start Chatting
      </button>
    </div>

    <!-- Chevron -->
    <div class="chevron"></div>

    <!-- THREE.js Wormhole Setup -->
    <script src="https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.min.js"></script>
    <script>
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("bg"),
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Glowing inner sphere
      const glowGeometry = new THREE.SphereGeometry(5.5, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00eaff,
        transparent: true,
        opacity: 0.18
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.y = 2.5; // lift wormhole
      scene.add(glow);

      // Outer purple glow
      const outerGlowGeometry = new THREE.SphereGeometry(7, 32, 32);
      const outerGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0x7b2dff,
        transparent: true,
        opacity: 0.08
      });
      const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
      outerGlow.position.y = 2.5;
      scene.add(outerGlow);

      // Wormhole Torus
      const geometry = new THREE.TorusGeometry(5, 1.5, 30, 100);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00eaff,
        wireframe: true,
        emissive: 0x00ccff,
        emissiveIntensity: 1
      });
      const torus = new THREE.Mesh(geometry, material);
      torus.position.y = 2.5;
      scene.add(torus);

      // Lighting
      const pointLight = new THREE.PointLight(0x00eaff, 2, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      // Camera
      camera.position.z = 18;

      // Stars & glowing particles
      function addParticle() {
        const size = Math.random() * 0.15;
        const geo = new THREE.SphereGeometry(size, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geo, mat);

        const [x, y, z] = Array(3)
          .fill()
          .map(() => THREE.MathUtils.randFloatSpread(200));
        star.position.set(x, y, z);
        scene.add(star);
      }
      Array(600).fill().forEach(addParticle);

      // Animate
      function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.002;
        torus.rotation.y += 0.004;

        glow.rotation.y += 0.001;
        outerGlow.rotation.y -= 0.0005;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    </script>
  </body>
</html>
---
title: App Builder v1
emoji: 🐳
---
emoji: 🐳
colorFrom: blue
colorTo: blue
sdk: docker
pinned: true
app_port: 3000
license: mit
short_description: Generate any application with DeepSeek
models:
  - deepseek-ai/DeepSeek-V3-0324
  - deepseek-ai/DeepSeek-R1-0528
---


# App Builder

App Builder is an advanced AI-powered coding platform for developers, data scientists, and AI engineers. Effortlessly build, deploy, and manage web projects with generative AI, no code required.

## Features
- AI-powered website generation
- Instant project deployment
- Modern UI/UX with Tailwind CSS
- TypeScript & Next.js support

## Getting Started
1. **Clone the repository:**
  ```bash
  git clone https://github.com/yourusername/app-builder.git
  cd app-builder
  ```
2. **Install dependencies:**
  ```bash
  npm install
  ```
3. **Run locally:**
  ```bash
  npm run dev
  ```
4. **Build for production:**
  ```bash
  npm run build
  npm start
  ```

## Credits
Build by Bikram Pradhan
