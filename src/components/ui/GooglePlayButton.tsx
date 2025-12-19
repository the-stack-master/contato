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
    setTimeout(() => setIsTapped(false), 2000);
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Soft ambient glow (hover only) */}
      <div
        className="
          absolute -inset-6 rounded-full
          bg-emerald-500/20 blur-xl
          opacity-0 group-hover:opacity-20
          transition-opacity duration-300
          pointer-events-none
        "
      />

      <div
        className="group relative flex flex-col items-center"
        onClick={handleTap}
      >
        {/* App icon */}
        <motion.div
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="
            relative
            w-16 h-16 sm:w-18 sm:h-18
            rounded-2xl
            bg-white
            flex items-center justify-center
            shadow-lg
            cursor-pointer
          "
        >
          <Image
            src={playIcon}
            alt="Google Play"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain pointer-events-none"
          />
        </motion.div>

        {/* Tooltip */}
        <div
          className={`
            absolute bottom-[120%] left-1/2 -translate-x-1/2
            transition-all duration-300
            ${
              isTapped
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            }
          `}
        >
          <a
            href={href}
            className="
              relative flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-emerald-600
              text-white
              text-sm font-medium
              shadow-xl
              hover:bg-emerald-700
              transition-colors
            "
          >
            Google Play
            <ArrowRight className="w-4 h-4 text-white/90" />
            {/* Tooltip arrow */}
            <span
              className="
                absolute top-full left-1/2 -translate-x-1/2 -mt-1
                w-3 h-3
                bg-emerald-600
                rotate-45
              "
            />
          </a>
        </div>
      </div>
    </div>
  );
}
