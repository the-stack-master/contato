"use client";
import { motion } from "framer-motion";

const screenshots = [
  "/screenshots/screen1.png",
  "/screenshots/screen2.png",
  "/screenshots/screen3.png",
];

export default function AppScreens() {
  return (
    <div className="relative w-72 h-[500px] rounded-3xl shadow-xl overflow-hidden bg-white border">
      {screenshots.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt={`App screenshot ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3, duration: 0.8 }}
        />
      ))}
    </div>
  );
}
