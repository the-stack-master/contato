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
import { ContentFeaturesGrid } from "@/types/homeTypes";
import { IconComponent } from "@/components/ui/IconComponent";

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
  featureData: ContentFeaturesGrid | null;
}

export default function FeaturesSectionClient({
  featureData,
}: FeaturesSectionClientProps) {
  if (!featureData) return null;

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
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {featureData?.sectionHeading}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-md mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {featureData?.sectionDescription}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featureData.features.map((feature, index) => (
            <motion.div
              key={feature.featureTitle + index}
              variants={cardVariants}
              whileHover="hover"
              className={`group relative overflow-visible rounded-[30px_15px_40px_20px] 
              bg-gradient-to-tr ${index % 2 === 0 ? "from-white/90 to-orange-50" : "from-white/70 to-orange-100"} 
              shadow-xl hover:shadow-2xl border border-gray-200
              transition-shadow duration-300`}
            >
              <Card className="border-0 bg-transparent shadow-none relative z-10">
                <CardContent className="p-8">
                  <div className="mb-6 transition-transform duration-300 origin-center group-hover:scale-110">
                    <div className="w-12 h-12 rounded-full bg-[#f15A24]/20 flex items-center justify-center">
                      <IconComponent
                        name={feature?.iconName}
                        className="w-6 h-6 text-[#f15A24]"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.featureTitle}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.featurePoints.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-[#f15A24] mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Blurred colored blob effect */}
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-[50%_40%_60%_70%] bg-[#f15A24]/30 filter blur-3xl opacity-70 pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
