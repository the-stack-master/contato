"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
  image?: string;
}

interface FeatureAccordionProps {
  items: AccordionItem[];
}

export default function FeatureAccordion({ items }: FeatureAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <motion.button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`w-full text-left p-8 bg-white/80 backdrop-blur-sm border-2 transition-all duration-300 shadow-lg hover:shadow-2xl ${
                isOpen
                  ? "border-[#f15A24] bg-gradient-to-r from-[#f15A24]/10 to-white"
                  : "border-gray-200 hover:border-[#f15A24]/60"
              }`}
              style={{ borderRadius: "30px" }}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <motion.div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-[#f15A24] to-[#d04f23] !text-white scale-110"
                        : "bg-gradient-to-br from-gray-100 to-gray-200 !text-gray-700"
                    }`}
                    animate={{ rotate: isOpen ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {index + 1}
                  </motion.div>

                  <h3
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      isOpen ? "!text-[#f15A24]" : "!text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isOpen
                      ? "bg-[#f15A24] !text-white"
                      : "bg-gray-100 !text-gray-600"
                  }`}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-8">
                    <div
                      className={`${item.image ? "grid md:grid-cols-2 gap-8 items-center" : ""}`}
                    >
                      <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#f15A24] to-[#d04f23] rounded-full" />
                        <p className="text-lg !text-gray-700 leading-relaxed pl-6">
                          {item.content}
                        </p>
                      </div>

                      {item.image && (
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-[#f15A24]/10 to-[#d04f23]/10" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
