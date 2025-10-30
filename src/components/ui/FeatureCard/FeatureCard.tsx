"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative w-full max-w-sm p-6 overflow-hidden cursor-pointer"
    >
      {/* ✨ Liquid blob background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-emerald-500 via-cyan-400 to-blue-500 rounded-[60%] blur-2xl opacity-60"
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "70% 30% 50% 50% / 50% 60% 40% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🖼 Floating Image */}
      <motion.div
        className="relative z-20 flex justify-center"
        whileHover={{ y: -10, rotate: 3 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-32 h-32 object-contain drop-shadow-xl"
        />
      </motion.div>

      {/* 📜 Text Content */}
      <div className="relative z-30 mt-6 text-center">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-emerald-600 font-medium mt-1">
            {subtitle}
          </p>
        )}
        <p className="mt-3 text-gray-700 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative overlay (glass effect) */}
      <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-lg rounded-[50%] mix-blend-overlay" />
    </motion.div>
  );
};

export default FeatureCard;
