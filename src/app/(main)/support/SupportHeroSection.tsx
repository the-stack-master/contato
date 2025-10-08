"use client";

import { motion } from "framer-motion";
import { Search, HelpCircle } from "lucide-react";

export default function SupportHeroSection() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-white via-orange-50 to-red-50 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-[#f15A24] via-orange-400 to-red-400 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-orange-400 via-red-400 to-[#f15A24] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent">
                Contato
              </span>{" "}
              Help Center
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Find answers to your questions, learn how to use Contato features,
            and get the support you need to grow your professional network.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, features, or topics..."
                className="w-full pl-14 pr-32 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-[#f15A24] focus:outline-none transition-colors duration-300 shadow-lg bg-white/90 backdrop-blur-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#f15A24] to-orange-500 hover:from-orange-600 hover:to-red-500 text-white px-6 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
