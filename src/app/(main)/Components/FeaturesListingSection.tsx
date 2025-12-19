"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  Video,
  Shield,
  Briefcase,
  ChartBar as BarChart3,
  TrendingUp,
  Coffee,
  CircleCheck as CheckCircle,
  ArrowRight,
  Zap,
  Star,
} from "lucide-react";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesListingSectionProps {
  features: Feature[];
}

const iconMap = {
  brain: Brain,
  calendar: Calendar,
  video: Video,
  shield: Shield,
  briefcase: Briefcase,
  chart: BarChart3,
  trending: TrendingUp,
  coffee: Coffee,
  check: CheckCircle,
};

const featureTags = [
  ["Real-time", "Cloud-based", "Secure"],
  ["Smart Scheduling", "Calendar Sync", "Automated"],
  ["HD Quality", "Screen Share", "Recording"],
  ["End-to-End", "Privacy First", "Verified"],
  ["Professional", "Enterprise", "Scalable"],
  ["Analytics", "Insights", "Data-driven"],
  ["Growth", "Performance", "Metrics"],
  ["Productivity", "Efficient", "Fast"],
  ["Reliable", "Proven", "Trusted"],
];

const FeatureCard = ({
  feature,
  index,
  isEven,
}: {
  feature: Feature;
  index: number;
  isEven: boolean;
}) => {
  const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
  const tags = featureTags[index] || ["Feature", "Premium", "New"];

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group"
    >
      <div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } gap-6 md:gap-8 items-center`}
      >
        {/* Icon */}
        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: [0, -3, 3, 0],
            transition: { duration: 0.5 },
          }}
          className="flex-shrink-0 relative"
        >
          <motion.div
            className="absolute -inset-3 bg-gradient-to-br from-[#f15A24] to-[#d04f23] rounded-2xl blur-xl opacity-20 group-hover:opacity-50"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#f15A24] to-[#d85d34] rounded-2xl flex items-center justify-center shadow-xl">
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <IconComponent
              className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg"
              strokeWidth={1.5}
            />
          </div>

          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
          >
            <Star className="w-3.5 h-3.5 text-yellow-900 fill-yellow-900" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div
          className={`flex-1 ${
            isEven ? "md:text-left" : "md:text-right"
          } text-center`}
        >
          <div className="relative inline-block mb-3">
            <motion.div className="absolute -inset-2 bg-gradient-to-r from-[#f15A24]/20 to-[#d04f23]/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-[#f15A24]/30">
              <Zap className="w-3.5 h-3.5 text-[#f15A24]" />
              <span className="text-xs font-bold text-[#f15A24]">
                Feature #{index + 1}
              </span>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 group-hover:text-[#f15A24] transition-colors">
            {feature.title}
          </h3>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
            {feature.description}
          </p>

          <div
            className={`flex items-center gap-2 ${
              isEven
                ? "justify-center md:justify-start"
                : "justify-center md:justify-end"
            } flex-wrap`}
          >
            {tags.map((tag, tagIndex) => (
              <motion.div
                key={tagIndex}
                className="px-3 py-1 bg-orange-100 rounded-full text-xs font-medium text-[#d04f23]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + tagIndex * 0.1 }}
              >
                {tag}
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.1 }} className="ml-2">
              <Link
                href="/features/ai-matching"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f15A24] hover:text-[#d04f23] transition-colors group/link"
              >
                <span>Details</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {index < 8 && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6 md:my-8"
        />
      )}
    </motion.div>
  );
};

export default function FeaturesListingSection({
  features,
}: FeaturesListingSectionProps) {
  return (
    <section className="py-5 px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,90,36,0.05),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(208,79,35,0.05),transparent_50%)]" />

      <div className="max-w-[1200px] mx-auto px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block mb-4 px-4 py-2 bg-orange-100 border border-[#f15A24]/30 rounded-full text-sm font-semibold text-[#f15A24]">
            Complete Feature Set
          </span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-[#f15A24] to-[#d04f23] bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            A complete toolkit designed to transform the way you connect, grow,
            and succeed
          </p>
        </div>

        <div className="space-y-0">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
