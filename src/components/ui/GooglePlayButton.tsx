"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import playIcon from "../../../public/images/play_icon.png";

interface GooglePlayButtonProps {
  href?: string;
}

export function GooglePlayButton({ href = "#" }: GooglePlayButtonProps) {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 2500); // hide after 2.5s
  };

  return (
    <div className="group relative inline-flex flex-col items-center">
      {/* Subtle glow */}
      <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full blur-xl opacity-0 sm:group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

      {/* Particle container */}
      <div
        className="relative flex flex-col items-center justify-center"
        onClick={handleTap}
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center pointer-events-none">
          {[
            { x: -40, y: -20, delay: 0, duration: 2.8 },
            { x: 38, y: -28, delay: 0.4, duration: 3.3 },
            { x: 40, y: 25, delay: 0.8, duration: 3.8 },
            { x: -35, y: 30, delay: 1.2, duration: 3 },
            { x: 0, y: -40, delay: 1.6, duration: 3.5 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg"
              style={{ pointerEvents: "none" }}
              animate={{
                x: [p.x, p.x + 8, p.x - 6, p.x],
                y: [p.y, p.y - 8, p.y + 6, p.y],
                scale: [1, 1.5, 0.8, 1],
                opacity: [0.4, 1, 0.5, 0.4],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}

          {/* Main circular icon */}
          <motion.div
            className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-2xl 
                       group-hover:scale-110 transition-transform duration-300 overflow-hidden"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{ pointerEvents: "auto" }}
          >
            <Image
              src={playIcon}
              alt="Play icon"
              width={38}
              height={38}
              className="object-contain select-none pointer-events-none w-8 h-8 sm:w-10 sm:h-10"
            />
          </motion.div>
        </div>

        {/* Hover or tap popup (above the icon) */}
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 transition-all duration-300 pointer-events-none z-30
            ${
              isTapped
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            }`}
        >
          <a
            href={href}
            className="relative block transform-gpu hover:scale-105 active:scale-95 transition-transform duration-200 pointer-events-auto"
          >
            {/* Tooltip body */}
            <div
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 rounded-xl shadow-2xl 
                          backdrop-blur-xl flex items-center gap-2"
            >
              <div className="flex flex-col items-start leading-tight whitespace-nowrap">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  Google Play
                </span>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 ml-1 sm:ml-2" />
            </div>

            {/* Tooltip caret (diamond) */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[6px] w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-br from-teal-500 to-cyan-500 rotate-45 " />
          </a>
        </div>
      </div>
    </div>
  );
}
