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

const FeaturesSection = () => {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8 text-[#f15A24]" />,
      title: "Seamless App Access",
      description:
        "Experience smooth navigation and easy access to blogs, videos, and posts—all within one powerful app.",
      benefits: [
        "User-friendly interface",
        "Fast loading",
        "Offline access",
        "Cross-device sync",
      ],
    },
    {
      icon: <Video className="w-8 h-8 text-[#f15A24]" />,
      title: "Premium Content",
      description:
        "Get exclusive access to expertly curated blogs, videos, and community posts to elevate your knowledge and skills.",
      benefits: [
        "Curated content",
        "Expert insights",
        "Interactive videos",
        "Regular updates",
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-[#f15A24]" />,
      title: "Community Engagement",
      description:
        "Connect, share, and grow with a vibrant community of like-minded professionals and enthusiasts.",
      benefits: [
        "Discussion forums",
        "User posts",
        "Networking opportunities",
        "Event invites",
      ],
    },
    {
      icon: <BarChart className="w-8 h-8 text-[#f15A24]" />,
      title: "Insightful Analytics",
      description:
        "Track your app activity and engagement to understand your personal growth and content interaction.",
      benefits: [
        "View history",
        "Engagement stats",
        "Personalized recommendations",
        "Progress tracking",
      ],
    },
    {
      icon: <Shield className="w-8 h-8 text-[#f15A24]" />,
      title: "Privacy & Security",
      description:
        "Your data is protected with industry-standard encryption and privacy controls to keep your information safe.",
      benefits: [
        "Data encryption",
        "User privacy settings",
        "Secure authentication",
        "Regular updates",
      ],
    },
    {
      icon: <Zap className="w-8 h-8 text-[#f15A24]" />,
      title: "Third-Party Integrations",
      description:
        "Connect your favorite tools to enhance your experience and streamline workflows seamlessly.",
      benefits: [
        "Calendar sync",
        "Notification integrations",
        "API access",
        "Cross-platform support",
      ],
    },
  ];

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
            Everything You Need for Content & Community
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-md mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Comprehensive features designed to connect you with valuable content
            and a thriving network.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className={`group rounded-3xl overflow-hidden ${
                index % 2 === 0 ? "bg-white/90" : "bg-white/70"
              } shadow-md hover:shadow-lg border border-gray-100`}
            >
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="p-8">
                  <div className="mb-6 transition-transform duration-300 origin-center group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-[#f15A24] mr-2 flex-shrink-0" />
                        {benefit}
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
};

export default FeaturesSection;
