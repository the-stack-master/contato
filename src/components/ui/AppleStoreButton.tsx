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
    setTimeout(() => setIsTapped(false), 2000);
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Soft ambient glow (hover only) */}
      <div
        className="
          absolute -inset-6 rounded-full
          bg-black/20 blur-xl
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
            bg-black
            flex items-center justify-center
            shadow-lg
            cursor-pointer
          "
        >
          <svg
            className="w-8 h-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
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
              bg-gray-900
              text-white
              text-sm font-medium
              shadow-xl
              hover:bg-gray-800
              transition-colors
            "
          >
            App Store
            <ArrowRight className="w-4 h-4 text-gray-300" />
            {/* Arrow */}
            <span
              className="
                absolute top-full left-1/2 -translate-x-1/2 -mt-1
                w-3 h-3
                bg-gray-900
                rotate-45
              "
            />
          </a>
        </div>
      </div>
    </div>
  );
}
