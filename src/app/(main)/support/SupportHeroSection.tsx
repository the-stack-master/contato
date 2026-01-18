"use client";

import { SupportPageType } from "@/types/supportPageTypes";
import { splitSentence } from "@/utils/stringFunctions";
import { motion } from "framer-motion";

interface SupportHeroSectionProps {
  heroData: SupportPageType | null;
}

export default function SupportHeroSection({
  heroData,
}: SupportHeroSectionProps) {
  return (
    <section className="relative py-16 bg-gradient-to-b from-orange-50/60 to-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {splitSentence(heroData?.title, 1)?.firstPart}{" "}
            <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
              {splitSentence(heroData?.title, 1)?.secondPart}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {heroData?.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
