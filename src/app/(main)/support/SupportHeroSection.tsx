"use client";

import { SupportPageType } from "@/types/supportPageTypes";
import { splitSentence } from "@/utils/stringFunctions";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface SupportHeroSectionProps {
  heroData: SupportPageType | null;
}

export default function SupportHeroSection({
  heroData,
}: SupportHeroSectionProps) {
  return (
    <section className="relative py-16 bg-gradient-to-br from-white via-orange-50 to-red-50 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-12 left-12 w-72 h-72 bg-gradient-to-r from-[#f15A24] via-orange-400 to-red-400 rounded-full opacity-15 blur-3xl"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-12 right-12 w-96 h-96 bg-gradient-to-r from-orange-400 via-red-400 to-[#f15A24] rounded-full opacity-15 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon + Title */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-6 gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold leading-snug">
              <span className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent">
                {splitSentence(heroData?.title, 1)?.firstPart}
              </span>{" "}
              {splitSentence(heroData?.title, 1)?.secondPart}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {heroData?.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
