// components/features/HeroAnimation.tsx (client)
"use client";
import { motion } from "framer-motion";

export default function HeroAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 -z-10"
    >
      <div className="absolute w-72 h-72 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-3xl opacity-30 top-10 left-1/4 animate-pulse" />
      <div className="absolute w-96 h-96 bg-gradient-to-r from-red-400 to-orange-600 rounded-full blur-3xl opacity-20 bottom-0 right-1/4 animate-pulse" />
    </motion.div>
  );
}
