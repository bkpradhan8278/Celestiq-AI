"use client";
import { useUpdateEffect } from "react-use";
import { useMemo, useState, useEffect } from "react";
import classNames from "classnames";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magic-ui/grid-pattern";
import { htmlTagToText } from "@/lib/html-tag-to-text";

// Futuristic Wormhole Background Component (Three.js inspired)
const WormholeBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Three.js inspired Torus Rings - Enhanced Sensitivity */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`torus-${i}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: isClient ? `torusRotate${i} ${1 + i * 0.2}s linear infinite, torusFloat${i} ${1.5 + i * 0.3}s ease-in-out infinite` : undefined,
            transformOrigin: 'center center',
          }}
        >
          <div
            className="border-2 rounded-full"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              borderColor: i % 4 === 0 ? '#00eaff' : i % 4 === 1 ? '#7b2dff' : i % 4 === 2 ? '#ff2d7b' : '#00ff88',
              borderStyle: i % 2 === 0 ? 'dashed' : 'dotted',
              borderWidth: `${2 + (i % 3)}px`,
              opacity: 0.4 - i * 0.03,
              boxShadow: `0 0 ${15 + i * 5}px ${i % 4 === 0 ? '#00eaff' : i % 4 === 1 ? '#7b2dff' : i % 4 === 2 ? '#ff2d7b' : '#00ff88'}, inset 0 0 ${10 + i * 3}px ${i % 4 === 0 ? '#00eaff' : i % 4 === 1 ? '#7b2dff' : i % 4 === 2 ? '#ff2d7b' : '#00ff88'}`,
              transform: `rotateX(${50 + i * 8}deg) rotateY(${30 + i * 12}deg) scale(${1 + i * 0.1})`,
              filter: `blur(${i * 0.2}px)`,
            }}
          />
        </div>
      ))}

      {/* Central Glowing Sphere - Enhanced Movement */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-28 h-28 rounded-full"
          style={{
            background: `radial-gradient(circle, #00eaff 0%, #00eaff/30 40%, transparent 70%)`,
            boxShadow: `0 0 50px #00eaff, 0 0 100px #00eaff/60, inset 0 0 40px #00eaff/40`,
            animation: isClient ? 'glowPulse 0.8s ease-in-out infinite, centralFloat 1.2s ease-in-out infinite' : undefined,
          }}
        />
      </div>

      {/* Outer Glow Sphere - Enhanced */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-40 h-40 rounded-full opacity-25"
          style={{
            background: `radial-gradient(circle, #7b2dff 0%, #7b2dff/15 50%, transparent 80%)`,
            boxShadow: `0 0 80px #7b2dff/40`,
            animation: isClient ? 'outerGlow 1s ease-in-out infinite reverse, outerFloat 1.5s ease-in-out infinite' : undefined,
          }}
        />
      </div>

      {/* Particle Field (like Three.js stars) */}
      {isClient && [...Array(100)].map((_, i) => {
        const size = 1 + (i % 3) * 0.5;
        const left = (i * 17.3) % 100;
        const top = (i * 23.7) % 100;
        const delay = (i * 0.1) % 5;
        
        return (
          <div
            key={`particle-${i}`}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animation: `twinkle ${0.8 + (i % 3) * 0.2}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              boxShadow: '0 0 4px white',
            }}
          />
        );
      })}

      {/* Floating Energy Orbs - Enhanced Sensitivity */}
      {isClient && [...Array(12)].map((_, i) => {
        const angle = (i * 30);
        const radius = 100 + (i % 4) * 30;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        return (
          <div
            key={`energy-orb-${i}`}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(${x}px, ${y}px)`,
              animation: `orbitalFloat ${1.5 + i * 0.2}s linear infinite, orbFloat${i % 4} ${0.8 + i * 0.1}s ease-in-out infinite`,
            }}
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{
                background: i % 4 === 0 ? '#00eaff' : i % 4 === 1 ? '#7b2dff' : i % 4 === 2 ? '#ff2d7b' : '#00ff88',
                boxShadow: `0 0 20px ${i % 4 === 0 ? '#00eaff' : i % 4 === 1 ? '#7b2dff' : i % 4 === 2 ? '#ff2d7b' : '#00ff88'}`,
                animation: 'energyPulse 0.5s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          </div>
        );
      })}

      {/* Enhanced CSS Animations with Higher Sensitivity */}
      <style jsx>{`
        @keyframes torusRotate0 {
          from { transform: rotateX(50deg) rotateY(30deg) rotateZ(0deg); }
          to { transform: rotateX(50deg) rotateY(30deg) rotateZ(360deg); }
        }
        @keyframes torusRotate1 {
          from { transform: rotateX(58deg) rotateY(42deg) rotateZ(0deg); }
          to { transform: rotateX(58deg) rotateY(42deg) rotateZ(-360deg); }
        }
        @keyframes torusRotate2 {
          from { transform: rotateX(66deg) rotateY(54deg) rotateZ(0deg); }
          to { transform: rotateX(66deg) rotateY(54deg) rotateZ(360deg); }
        }
        @keyframes torusRotate3 {
          from { transform: rotateX(74deg) rotateY(66deg) rotateZ(0deg); }
          to { transform: rotateX(74deg) rotateY(66deg) rotateZ(-360deg); }
        }
        @keyframes torusRotate4 {
          from { transform: rotateX(82deg) rotateY(78deg) rotateZ(0deg); }
          to { transform: rotateX(82deg) rotateY(78deg) rotateZ(360deg); }
        }
        @keyframes torusRotate5 {
          from { transform: rotateX(90deg) rotateY(90deg) rotateZ(0deg); }
          to { transform: rotateX(90deg) rotateY(90deg) rotateZ(-360deg); }
        }
        @keyframes torusRotate6 {
          from { transform: rotateX(98deg) rotateY(102deg) rotateZ(0deg); }
          to { transform: rotateX(98deg) rotateY(102deg) rotateZ(360deg); }
        }
        @keyframes torusRotate7 {
          from { transform: rotateX(106deg) rotateY(114deg) rotateZ(0deg); }
          to { transform: rotateX(106deg) rotateY(114deg) rotateZ(-360deg); }
        }
        @keyframes torusFloat0 {
          0%, 100% { transform: translateZ(0px) scale(1); }
          50% { transform: translateZ(20px) scale(1.05); }
        }
        @keyframes torusFloat1 {
          0%, 100% { transform: translateZ(0px) scale(1); }
          50% { transform: translateZ(-15px) scale(0.95); }
        }
        @keyframes torusFloat2 {
          0%, 100% { transform: translateZ(0px) scale(1); }
          50% { transform: translateZ(25px) scale(1.08); }
        }
        @keyframes torusFloat3 {
          0%, 100% { transform: translateZ(0px) scale(1); }
          50% { transform: translateZ(-20px) scale(0.92); }
        }
        @keyframes torusFloat4 {
          0%, 100% { transform: translateZ(0px) scale(1); }
          50% { transform: translateZ(30px) scale(1.1); }
        }
        @keyframes torusFloat5 {
          0%, 100% { transform: translateZ(0px) scale(1); }
          50% { transform: translateZ(-25px) scale(0.9); }
        }
        @keyframes torusFloat6 {
          0%, 100% { transform: translateZ(0px) scale(1); }
          50% { transform: translateZ(35px) scale(1.12); }
        }
        @keyframes torusFloat7 {
          0%, 100% { transform: translateZ(0px) scale(1); }
          50% { transform: translateZ(-30px) scale(0.88); }
        }
        @keyframes glowPulse {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 50px #00eaff, 0 0 100px #00eaff/60, inset 0 0 40px #00eaff/40;
          }
          25% { 
            transform: scale(1.15) rotate(90deg);
            box-shadow: 0 0 70px #00eaff, 0 0 140px #00eaff/80, inset 0 0 60px #00eaff/60;
          }
          50% { 
            transform: scale(1.3) rotate(180deg);
            box-shadow: 0 0 90px #00eaff, 0 0 180px #00eaff/90, inset 0 0 80px #00eaff/70;
          }
          75% { 
            transform: scale(1.15) rotate(270deg);
            box-shadow: 0 0 70px #00eaff, 0 0 140px #00eaff/80, inset 0 0 60px #00eaff/60;
          }
        }
        @keyframes centralFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-5px) translateX(3px); }
          50% { transform: translateY(0px) translateX(5px); }
          75% { transform: translateY(5px) translateX(-3px); }
        }
        @keyframes outerGlow {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.25; 
          }
          33% { 
            transform: scale(1.1) rotate(120deg); 
            opacity: 0.15; 
          }
          66% { 
            transform: scale(1.2) rotate(240deg); 
            opacity: 0.3; 
          }
        }
        @keyframes outerFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(180deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          25% { opacity: 0.8; transform: scale(1.3); }
          50% { opacity: 1; transform: scale(1.5); }
          75% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes orbitalFloat {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes orbFloat0 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.2); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(8px) scale(0.8); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.3); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(6px) scale(0.7); }
        }
        @keyframes energyPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          25% { transform: scale(1.4); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0.8; }
          75% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export const Preview = ({
  html,
  isResizing,
  isAiWorking,
  ref,
  device,
  currentTab,
  iframeRef,
  isEditableModeEnabled,
  onClickElement,
}: {
  html: string;
  isResizing: boolean;
  isAiWorking: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
  device: "desktop" | "mobile";
  currentTab: string;
  isEditableModeEnabled?: boolean;
  onClickElement?: (element: HTMLElement) => void;
}) => {
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
    null
  );

  // add event listener to the iframe to track hovered elements
  const handleMouseOver = (event: MouseEvent) => {
    if (iframeRef?.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        const targetElement = event.target as HTMLElement;
        if (
          hoveredElement !== targetElement &&
          targetElement !== iframeDocument.body
        ) {
          setHoveredElement(targetElement);
          targetElement.classList.add("hovered-element");
        } else {
          return setHoveredElement(null);
        }
      }
    }
  };
  const handleMouseOut = () => {
    setHoveredElement(null);
  };
  const handleClick = (event: MouseEvent) => {
    if (iframeRef?.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        const targetElement = event.target as HTMLElement;
        if (targetElement !== iframeDocument.body) {
          onClickElement?.(targetElement);
        }
      }
    }
  };

  useUpdateEffect(() => {
    const cleanupListeners = () => {
      if (iframeRef?.current?.contentDocument) {
        const iframeDocument = iframeRef.current.contentDocument;
        iframeDocument.removeEventListener("mouseover", handleMouseOver);
        iframeDocument.removeEventListener("mouseout", handleMouseOut);
        iframeDocument.removeEventListener("click", handleClick);
      }
    };

    if (iframeRef?.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        // Clean up existing listeners first
        cleanupListeners();

        if (isEditableModeEnabled) {
          iframeDocument.addEventListener("mouseover", handleMouseOver);
          iframeDocument.addEventListener("mouseout", handleMouseOut);
          iframeDocument.addEventListener("click", handleClick);
        }
      }
    }

    // Clean up when component unmounts or dependencies change
    return cleanupListeners;
  }, [iframeRef, isEditableModeEnabled]);

  const selectedElement = useMemo(() => {
    if (!isEditableModeEnabled) return null;
    if (!hoveredElement) return null;
    return hoveredElement;
  }, [hoveredElement, isEditableModeEnabled]);

  return (
    <div
      ref={ref}
      className={classNames(
        "w-full border-l border-neutral-800/50 h-full relative z-0 flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden",
        {
          "lg:p-6": currentTab !== "preview",
          "max-lg:h-0": currentTab === "chat",
          "max-lg:h-full": currentTab === "preview",
        }
      )}
      onClick={(e) => {
        if (isAiWorking) {
          e.preventDefault();
          e.stopPropagation();
          toast.warning("Please wait for the AI to finish working.");
        }
      }}
    >
      {/* Enhanced Futuristic Background */}
      <WormholeBackground />
      
      {/* Subtle Grid Pattern Overlay */}
      <GridPattern
        x={-1}
        y={-1}
        strokeDasharray={"6 3"}
        className={cn(
          "[mask-image:radial-gradient(1400px_circle_at_center,white,transparent)] opacity-10 z-10"
        )}
      />
      {!isAiWorking && hoveredElement && selectedElement && (
        <div
          className="cursor-pointer absolute bg-[#D4AF37]/15 border-2 border-dashed border-[#D4AF37] rounded-lg p-3 z-20 pointer-events-none backdrop-blur-sm"
          style={{
            top:
              selectedElement.getBoundingClientRect().top +
              (currentTab === "preview" ? 0 : 24),
            left:
              selectedElement.getBoundingClientRect().left +
              (currentTab === "preview" ? 0 : 24),
            width: selectedElement.getBoundingClientRect().width,
            height: selectedElement.getBoundingClientRect().height,
            boxShadow: '0 0 20px #D4AF37/30, inset 0 0 20px #D4AF37/10',
          }}
        >
          <span className="bg-gradient-to-r from-[#D4AF37] to-yellow-400 rounded-md text-xs text-black font-bold px-3 py-1.5 -translate-y-8 absolute top-0 left-0 shadow-lg border border-yellow-300">
            {htmlTagToText(selectedElement.tagName.toLowerCase())}
          </span>
        </div>
      )}
      <iframe
        id="preview-iframe"
        ref={iframeRef}
        title="output"
        className={classNames(
          "w-full select-none transition-all duration-500 bg-white h-full shadow-2xl z-15 relative",
          {
            "pointer-events-none": isResizing || isAiWorking,
            "lg:max-w-md lg:mx-auto lg:!rounded-[32px] lg:border-4 lg:border-neutral-700/70 lg:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.1)] lg:h-[82dvh] lg:max-h-[1000px] lg:ring-4 lg:ring-[#D4AF37]/25 lg:ring-offset-4 lg:ring-offset-neutral-900":
              device === "mobile",
            "lg:border-4 lg:border-neutral-700/70 lg:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.08)] lg:rounded-[16px] lg:ring-4 lg:ring-[#D4AF37]/15 lg:ring-offset-4 lg:ring-offset-neutral-900":
              currentTab !== "preview" && device === "desktop",
          }
        )}
        srcDoc={html}
        onLoad={() => {
          if (iframeRef?.current?.contentWindow?.document?.body) {
            iframeRef.current.contentWindow.document.body.scrollIntoView({
              block: isAiWorking ? "end" : "start",
              inline: "nearest",
              behavior: isAiWorking ? "instant" : "smooth",
            });
          }
        }}
      />
    </div>
  );
};
