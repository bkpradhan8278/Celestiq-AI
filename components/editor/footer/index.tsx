import classNames from "classnames";
import { FaMobileAlt } from "react-icons/fa";
import { RefreshCcw } from "lucide-react";
import { FaLaptopCode } from "react-icons/fa6";
import { HtmlHistory } from "@/types";
import { Button } from "@/components/ui/button";
import { MdAdd } from "react-icons/md";
import { History } from "@/components/editor/history";
import { UserMenu } from "@/components/user-menu";
import { useUser } from "@/hooks/useUser";

const DEVICES = [
  {
    name: "desktop",
    icon: FaLaptopCode,
  },
  {
    name: "mobile",
    icon: FaMobileAlt,
  },
];

export function Footer({
  onReset,
  htmlHistory,
  setHtml,
  device,
  setDevice,
  iframeRef,
  onTabChange,
}: {
  onReset: () => void;
  htmlHistory?: HtmlHistory[];
  device: "desktop" | "mobile";
  setHtml: (html: string) => void;
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
  setDevice: React.Dispatch<React.SetStateAction<"desktop" | "mobile">>;
  onTabChange?: (tab: string) => void;
}) {
  const { user } = useUser();

  const handleRefreshIframe = () => {
    if (iframeRef?.current) {
      const iframe = iframeRef.current;
      const content = iframe.srcdoc;
      iframe.srcdoc = "";
      setTimeout(() => {
        iframe.srcdoc = content;
      }, 10);
    }
  };

  // Handle New button click - mobile switches to chat after reset
  const handleNewClick = () => {
    const isMobile = window.innerWidth < 768;
    
    // Always do the reset first
    onReset();
    
    // On mobile, switch to chat section after reset
    if (isMobile && onTabChange) {
      setTimeout(() => {
        onTabChange('chat');
      }, 100); // Small delay to ensure reset completes first
    }
  };

  return (
    <footer className="w-full py-3 px-4 flex items-center justify-between bg-black/90 backdrop-blur-sm border-t border-neutral-700/50">
      <div className="flex items-center gap-3">
        {user &&
          (user?.isLocalUse ? (
            <div className="bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg px-3 py-1 text-xs font-medium border border-[#D4AF37]/30">
              Local
            </div>
          ) : (
            <UserMenu className="!p-1 !pr-3 !h-auto" />
          ))}
        <Button size="sm" variant="secondary" onClick={handleNewClick} className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black rounded-lg font-medium px-3 py-1.5 text-sm">
          <MdAdd className="size-3 mr-1" />
          New
        </Button>
        {htmlHistory && htmlHistory.length > 0 && (
          <History history={htmlHistory} setHtml={setHtml} />
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={handleRefreshIframe} className="border-neutral-600 text-gray-400 hover:text-white hover:border-gray-500 p-2 rounded-lg">
          <RefreshCcw className="size-4" />
        </Button>
        <div className="flex items-center bg-neutral-800 rounded-lg p-1 gap-1">
          {DEVICES.map((deviceItem) => (
            <button
              key={deviceItem.name}
              className={classNames(
                "rounded-md text-white size-7 flex items-center justify-center transition-all duration-200",
                {
                  "bg-[#D4AF37] text-black": device === deviceItem.name,
                  "hover:bg-neutral-700": device !== deviceItem.name,
                }
              )}
              onClick={() => setDevice(deviceItem.name as "desktop" | "mobile")}
            >
              <deviceItem.icon className="text-sm" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
