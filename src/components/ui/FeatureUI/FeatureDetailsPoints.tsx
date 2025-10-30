"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DetailPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeatureDetailsPointsProps {
  points: DetailPoint[];
}

export default function FeatureDetailsPoints({
  points,
}: FeatureDetailsPointsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      {points.map((point, index) => {
        const IconComponent = point.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
            className="group relative"
          >
            <div className="relative h-full bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 overflow-hidden p-8">
              <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-blue-500 to-blue-600 group-hover:h-full transition-all duration-500" />

              <div className="relative z-10">
                <div className="mb-6 inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-lg" />
                    <div className="relative w-12 h-12 bg-slate-50 border border-slate-200 group-hover:border-blue-400 flex items-center justify-center transition-all duration-300">
                      <IconComponent
                        className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                  {point.title}
                </h3>

                <p className="text-base text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
