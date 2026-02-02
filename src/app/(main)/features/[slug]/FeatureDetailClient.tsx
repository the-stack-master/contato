"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FeatureAccordion from "@/components/ui/FeatureUI/FeatureAccordion";
import FeatureDetailsPoints from "@/components/ui/FeatureUI/FeatureDetailsPoints";
import MoreInfoSection from "@/components/ui/FeatureUI/MoreInfoSection";
import { IconComponent } from "@/components/ui/IconComponent";
import type { FeatureDetailData } from "./page";

interface FeatureDetailClientProps {
  feature: FeatureDetailData;
}

export default function FeatureDetailClient({ feature }: FeatureDetailClientProps) {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Organic Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px]
            bg-gradient-to-br from-[#f15A24]/25 to-[#d04f23]/20 blur-3xl"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />

        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px]
            bg-gradient-to-tr from-[#f15A24]/20 to-[#d04f23]/15 blur-3xl"
          animate={{ rotate: [360, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6 sm:px-8 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <div>
              {/* Back Button */}
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-500 rounded-lg text-orange-500 shadow-sm hover:bg-orange-100 hover:scale-105 transition-all font-medium w-max"
              >
                <ArrowLeft className="w-4 h-4" />
                Features
              </Link>
            </div>
            <div className="inline-flex w-fit items-center gap-2 bg-[#f15A24]/10 px-4 py-2 rounded-full mb-5 mx-auto lg:mx-0">
              <IconComponent
                name={feature.icon || "Zap"}
                className="w-5 h-5 mr-3 !text-[#f15A24]"
              />
              <span className="text-sm font-semibold !text-[#f15A24]">Feature Spotlight</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold !text-gray-900 leading-tight">
              {feature.title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl !text-gray-600 leading-relaxed">
              {feature.subtitle}
            </p>

            <p className="text-base sm:text-lg !text-gray-700 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>

          {/* Right Image — hidden below lg */}
          {feature.heroImage && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src={feature.heroImage}
                alt={feature.title}
                className="w-full h-[360px] xl:h-[400px] object-cover shadow-2xl"
                style={{
                  borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
                }}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      {feature.benefits && feature.benefits.length > 0 && (
        <section className="relative z-10 py-40 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl md:text-7xl font-bold !text-white mb-20 leading-tight">
              Why You'll Love
              <br />
              This Feature
            </h2>

            <div className="space-y-6">
              {feature.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="relative bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#f15A24]/30 p-8 overflow-hidden"
                >
                  {/* subtle orange accent */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#f15A24] to-[#d04f23]" />
                  <p className="text-xl !text-gray-200 leading-relaxed pl-4">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      {feature.howItWorksSteps && feature.howItWorksSteps.length > 0 && (
        <section className="relative z-10 py-32">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl md:text-6xl font-bold !text-gray-900 mb-12 text-center">
              How It Works
            </h2>
            <FeatureAccordion items={feature.howItWorksSteps} />
          </div>
        </section>
      )}

      {/* Feature Details */}
      {feature.detailPoints && feature.detailPoints.length > 0 && (
        <section className="relative z-10 py-32">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl md:text-6xl font-bold !text-gray-900 mb-12 text-center">
              Key Features
            </h2>
            <FeatureDetailsPoints points={feature.detailPoints} />
          </div>
        </section>
      )}

      {/* More Info */}
      {feature.moreInfo && (
        <MoreInfoSection
          title={feature.moreInfo.title || ""}
          subtitle={feature.moreInfo.subtitle || ""}
          paragraphs={feature.moreInfo.paragraphs || []}
        />
      )}
    </div>
  );
}
