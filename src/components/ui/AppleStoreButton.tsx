"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface AppStoreButtonProps {
  href?: string;
}

export function AppStoreButton({ href = "#" }: AppStoreButtonProps) {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 2500); // hide after 2.5s
  };

  return (
    <div className="group relative inline-flex flex-col items-center">
      {/* Subtle glowing ring */}
      <div className="absolute -inset-8 bg-gradient-to-r from-gray-900 via-gray-700 to-black rounded-full blur-xl opacity-0 sm:group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

      {/* Particle animation */}
      <div
        className="relative flex flex-col items-center justify-center"
        onClick={handleTap}
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center pointer-events-none">
          {[
            { x: -35, y: -25, delay: 0, duration: 3 },
            { x: 30, y: -30, delay: 0.5, duration: 3.5 },
            { x: 35, y: 20, delay: 1, duration: 4 },
            { x: -30, y: 25, delay: 1.5, duration: 3.2 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-900 shadow-lg pointer-events-none"
              animate={{
                x: [p.x, p.x + 10, p.x - 5, p.x],
                y: [p.y, p.y - 10, p.y + 5, p.y],
                scale: [1, 1.4, 0.9, 1],
                opacity: [0.3, 0.8, 0.4, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}

          {/* Center Apple icon */}
          <motion.div
            className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 overflow-hidden"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ pointerEvents: "auto" }}
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white select-none pointer-events-none"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </motion.div>
        </div>

        {/* Hover or tap popup (anchored above icon) */}
        <div
          className={`absolute bottom-[105%] left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-30
            ${
              isTapped
                ? "opacity-100 -translate-y-1"
                : "opacity-0 translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
            }`}
        >
          <a
            href={href}
            className="relative block transform-gpu hover:scale-105 active:scale-95 transition-transform duration-200 pointer-events-auto"
          >
            <div
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl 
              border border-gray-700 backdrop-blur-xl flex items-center gap-2"
            >
              <div className="flex flex-col items-start leading-tight whitespace-nowrap">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  App Store
                </span>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 ml-1 sm:ml-2" />
            </div>

            {/* Tooltip arrow (centered + flush to popup) */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[6px] w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-br from-gray-900 to-black rotate-45" />
          </a>
        </div>
      </div>
    </div>
  );
}
