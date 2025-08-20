import { ReactNode } from "react";
import { Eye, MessageCircleCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import classNames from "classnames";

const TABS = [
  {
    value: "chat",
    label: "Chat",
    icon: MessageCircleCode,
  },
  {
    value: "preview",
    label: "Preview",
    icon: Eye,
  },
];

export function Header({
  tab,
  onNewTab,
  children,
}: {
  tab: string;
  onNewTab: (tab: string) => void;
  children?: ReactNode;
}) {
  return (
    <header className="bg-black/80 backdrop-blur-xl border-b border-[#D4AF37]/20 z-20 flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-[#D4AF37] via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight flex items-center gap-1">
            🔆 Celestiq AI
          </h1>
          <span className="text-[10px] text-gray-500 font-normal mt-1 ml-6">
            @ Powered by Tapu AI
          </span>
        </div>
      </div>
      <nav className="flex items-center gap-2">
        {TABS.map((item) => (
          <Button
            key={item.value}
            variant={tab === item.value ? "secondary" : "ghost"}
            className={classNames(
              "transition-all duration-200 p-2 rounded-lg",
              {
                "bg-[#D4AF37]/20 text-[#D4AF37]": tab === item.value,
                "text-gray-400 hover:text-white hover:bg-white/5": tab !== item.value,
              }
            )}
            size="sm"
            aria-label={item.label}
            onClick={() => onNewTab(item.value)}
          >
            <item.icon className="size-4" />
          </Button>
        ))}
      </nav>
      <div className="flex items-center gap-3">{children}</div>
    </header>
  );
}
