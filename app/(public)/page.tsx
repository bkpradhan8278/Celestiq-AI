import { AskAi } from "@/components/space/ask-ai";
import { redirect } from "next/navigation";
export default function Home() {
  // ...existing code...
  redirect("/projects/new");
  return (
    <main className="min-h-screen bg-black text-[#D4AF37] flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-3xl mx-auto pt-24 pb-12 flex flex-col items-center justify-center text-center">
        <div className="rounded-full border-2 border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs text-[#D4AF37] px-4 py-2 max-w-max mx-auto mb-4 shadow-md">
          ✨ Celestiq AI Public Beta
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold font-mono text-[#D4AF37] drop-shadow-lg mb-6">
          Build your website with AI in seconds
        </h1>
        <p className="text-xl md:text-2xl text-[#D4AF37]/80 mt-2 mb-8 text-center max-w-2xl">
          Effortless, creative, and fast. Powered by Celestiq AI.
        </p>
        <div className="mt-10 max-w-2xl w-full mx-auto">
          <AskAi />
        </div>
      </header>
      <section id="community" className="w-full py-20 flex items-center justify-center">
        <h2 className="text-5xl md:text-7xl font-extrabold font-mono text-[#D4AF37] text-center">Community Driven</h2>
      </section>
      <section id="deploy" className="w-full py-20 flex items-center justify-center">
        <h2 className="text-5xl md:text-7xl font-extrabold font-mono text-[#D4AF37] text-center">Deploy your website in seconds</h2>
      </section>
      <section id="features" className="w-full py-20 flex items-center justify-center">
        <h2 className="text-5xl md:text-7xl font-extrabold font-mono text-[#D4AF37] text-center">Features that make you smile</h2>
      </section>
    </main>
  );
}
