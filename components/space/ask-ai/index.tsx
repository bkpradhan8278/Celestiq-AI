"use client";

import { ArrowUp } from "lucide-react";
import { PiGearSixFill } from "react-icons/pi";
import { TiUserAdd } from "react-icons/ti";

import { Button } from "@/components/ui/button";

export const AskAi = () => {
  return (
    <div className="bg-black/70 backdrop-blur-xl border-2 border-blue-400/40 rounded-2xl shadow-neon-blue ring-4 focus-within:ring-[#D4AF37]/40 focus-within:border-[#D4AF37] ring-transparent group transition-all duration-200 animate-fade-in">
      <textarea
        rows={3}
        className="w-full bg-transparent text-base outline-none text-[#D4AF37] placeholder:text-blue-400/60 p-4 resize-none mb-1 rounded-xl border-2 border-[#D4AF37]/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition font-orbitron caret-purple-400 animate-cursor-glow"
        placeholder="Ask Tapu AI anything..."
        onChange={() => {}}
        onKeyDown={() => {}}
        aria-label="Ask Tapu AI anything"
      />
      <div className="flex items-center justify-between gap-2 px-4 pb-3">
        <div className="flex-1 flex justify-start">
          <Button
            size="iconXs"
            variant="outline"
            className="border-blue-400/40 text-blue-400/80 hover:border-[#D4AF37] hover:text-[#D4AF37] transition animate-pulse-neon"
            aria-label="Invite user"
          >
            <TiUserAdd className="size-4" />
          </Button>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="black" size="sm" className="border-blue-400/40 text-blue-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition animate-pulse-neon">
            <PiGearSixFill className="size-4" />
            Settings
          </Button>
          <Button size="iconXs" className="bg-gradient-to-r from-blue-400 via-purple-500 to-[#D4AF37] text-black hover:bg-[#D4AF37]/80 transition shadow-neon-gold animate-pulse-neon" aria-label="Send">
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
