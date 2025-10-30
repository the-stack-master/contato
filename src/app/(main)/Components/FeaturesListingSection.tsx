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
      initial={{
        opacity: 0,
        x: isEven ? -40 : 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group"
    >
      <div
        className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-8 items-center`}
      >
        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: [0, -3, 3, 0],
            transition: { duration: 0.5 },
          }}
          className="flex-shrink-0 relative"
        >
          <motion.div
            className="absolute -inset-3 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IconComponent
                className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg"
                strokeWidth={1.5}
              />
            </motion.div>
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

        <div
          className={`flex-1 ${isEven ? "md:text-left" : "md:text-right"} text-center`}
        >
          <div className="relative inline-block mb-3">
            <motion.div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-violet-50 rounded-lg border border-blue-200/50">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-blue-600">
                Feature #{index + 1}
              </span>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {feature.title}
          </h3>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
            {feature.description}
          </p>

          <div
            className={`flex items-center gap-2 ${isEven ? "justify-center md:justify-start" : "justify-center md:justify-end"} flex-wrap`}
          >
            {tags.map((tag, tagIndex) => (
              <motion.div
                key={tagIndex}
                className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + tagIndex * 0.1 }}
              >
                {tag}
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="ml-2"
            >
              <Link
                href="/features/ai-matching"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-violet-600 transition-colors duration-300 group/link"
              >
                <span>Details</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
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
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.03),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.03),transparent_50%)]" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-violet-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Complete Feature Set
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A complete toolkit designed to transform the way you connect, grow,
            and succeed
          </p>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 md:mt-32 relative max-w-5xl mx-auto"
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 blur-3xl opacity-50"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
