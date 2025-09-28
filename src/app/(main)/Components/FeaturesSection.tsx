"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Smartphone,
  Video,
  Users,
  BarChart,
  Shield,
  Zap,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

interface Feature {
  text: string;
}

interface FeatureBlock {
  icon: string;
  title: string;
  description: string;
  features: Feature[];
}

interface HomeFeatureBlocks {
  _id: string;
  title: string;
  featureBlocks: FeatureBlock[];
}

interface HomeFeatureHeader {
  _id: string;
  title: string;
  heading: string;
  subHeading: string;
}

// Map icon string to lucide-react icon components
const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-8 h-8 text-[#f15A24]" />,
  "App Access": <Video className="w-8 h-8 text-[#f15A24]" />,
  Users: <Users className="w-8 h-8 text-[#f15A24]" />,
  BarChart: <BarChart className="w-8 h-8 text-[#f15A24]" />,
  Shield: <Shield className="w-8 h-8 text-[#f15A24]" />,
  Zap: <Zap className="w-8 h-8 text-[#f15A24]" />,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.06,
    boxShadow: "0 8px 20px rgba(241, 90, 36, 0.35)",
    transition: { duration: 0.4 },
  },
};

interface FeaturesSectionClientProps {
  featureHeader: HomeFeatureHeader | null;
  featureBlocks: HomeFeatureBlocks | null;
}

export default function FeaturesSectionClient({
  featureHeader,
  featureBlocks,
}: FeaturesSectionClientProps) {
  if (!featureHeader || !featureBlocks) return null;

  return (
    <section
      id="features"
      className="py-20 bg-white border-t border-gray-200 relative"
    >
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {featureHeader.heading}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-md mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {featureHeader.subHeading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featureBlocks.featureBlocks.map((feature, index) => (
            <motion.div
              key={feature.title + index}
              variants={cardVariants}
              whileHover="hover"
              className={`group rounded-3xl overflow-hidden ${
                index % 2 === 0 ? "bg-white/90" : "bg-white/70"
              } shadow-md hover:shadow-lg border border-gray-100`}
            >
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="p-8">
                  <div className="mb-6 transition-transform duration-300 origin-center group-hover:scale-110">
                    {iconMap[feature.icon] || (
                      <Smartphone className="w-8 h-8 text-[#f15A24]" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-[#f15A24] mr-2 flex-shrink-0" />
                        {benefit.text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
