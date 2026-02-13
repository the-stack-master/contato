"use client";

import { motion } from "framer-motion";

interface InfoParagraph {
  text: string;
  emphasis?: boolean;
}

interface MoreInfoSectionProps {
  title: string;
  subtitle?: string;
  paragraphs: InfoParagraph[];
}

export default function MoreInfoSection({
  title,
  subtitle,
  paragraphs,
}: MoreInfoSectionProps) {
  return (
    <section className="py-14 sm:py-16 relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#f15A24]" />
            <span className="!text-slate-600 text-sm font-medium tracking-widest uppercase">
              The Science Behind
            </span>
          </div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold !text-slate-900 mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="text-xl !text-slate-600 max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-10"
        >
          {paragraphs.map((para, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-[#f15A24] to-transparent" />

              {para.emphasis ? (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold !text-slate-900 leading-snug">
                    {para.text.split(".")[0]}.
                  </h3>
                  <p className="text-lg !text-slate-600 leading-relaxed">
                    {para.text.split(".").slice(1).join(".").trim()}
                  </p>
                </div>
              ) : (
                <p className="text-lg !text-slate-600 leading-relaxed">
                  {para.text}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f15A24]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-500/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
