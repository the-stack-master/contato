"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, QrCode, Sparkles, Share2, Globe, TrendingUp } from "lucide-react";
import { SmartDigitalToolsSection } from "@/types/homeTypes";
import { IconComponent } from "../IconComponent";

// ✅ Card Data
const cardContentColors = [
  {
    id: 1,
    title: "AI Contact Insights",
    subtitle: "Smart Recommendations",
    description:
      "Get AI-powered suggestions for follow-ups and relationship management.",
    chipText: "New",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: Sparkles,
    screenshot:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=400&fit=crop",
    gradient: "from-[#fff3ec] via-[#fff0e7] to-white",
  },
  {
    id: 2,
    title: "Smart Sync",
    subtitle: "Auto-Update",
    description:
      "Changes sync across all platforms instantly.",
    chipText: "Beta",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: Zap,
    screenshot:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=400&fit=crop",
    features: ["Real-time sync", "Cloud backup", "Version history"],
    gradient: "from-[#fff3ec] to-white",
  },
  {
    id: 3,
    title: "Advanced Analytics",
    subtitle: "Real-time Insights",
    description:
      "Track card views, engagement rates, and conversion metrics with beautiful visualizations.",
    chipText: "Pro",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: TrendingUp,
    metrics: [
      { label: "Views", value: "12.5k", change: "+24%" },
      { label: "Clicks", value: "3.2k", change: "+18%" },
      { label: "Saves", value: "892", change: "+35%" },
    ],
    gradient: "from-[#2a2a2a] to-[#3a3a3a]",
  },
  {
    id: 4,
    title: "Social Integration",
    subtitle: "Connect Everything",
    description:
      "Link all your social profiles, portfolios, and content in one beautiful card.",
    chipText: "Hot",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: Share2,
    gradient: "from-white to-[#fff6f1]",
    featureList: [
      "Unified dashboard for social profiles",
      "Auto-fetch bio and profile updates",
      "Smart content linking & tracking",
    ]
  },
  {
    id: 5,
    title: "Instant QR Sharing",
    subtitle: "Contactless Exchange",
    description:
      "Generate dynamic QR codes that update in real-time. Share your latest info instantly.",
    chipText: "Popular",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: QrCode,
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&h=400&fit=crop",
    gradient: "from-white to-[#fff6f1]",

  },

  {
    id: 6,
    title: "Multi-Card Profiles",
    subtitle: "Context Switching",
    description:
      "Create separate cards for work, personal, and events. Switch instantly based on context.",
    chipText: "Featured",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: Globe,
    profiles: ["Work", "Personal", "Events"],
    gradient: "from-[#fff7f2] to-[#fff0e7]",
  },


];



// ✅ Hook to track screen width
const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

interface ExpandingCardsSectionProps {
  newFeaturesData: SmartDigitalToolsSection;
}

const ExpandingCardsSection: React.FC<ExpandingCardsSectionProps> = ({ newFeaturesData }: ExpandingCardsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const width = useWindowWidth();
  const [mounted, setMounted] = useState(false);

  console.log(newFeaturesData?.cards);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });

  // ✅ Balanced card positions for 1920×1080 & 1366×768
  const positions = [
    { x: [-160, -540], y: [-80, -100] }, // AI Contact Insights
    { x: [-10, -220], y: [-80, -100] }, // Smart Sync
    { x: [-180, -380], y: [100, 300] }, // Advanced Analytics
    { x: [0, 135], y: [180, 70] }, // Social Integration
    { x: [180, 520], y: [-90, -150] }, // Instant QR Sharing
    { x: [180, 520], y: [200, 250] }, // Multi-Card Profiles
  ];

  // ✅ ALL useTransform hooks must be called unconditionally

  // AI Contact Insights
  const card1X = useTransform(scrollYProgress, [0.15, 0.5], positions[0].x);
  const card1Y = useTransform(scrollYProgress, [0.15, 0.5], positions[0].y);
  const card1Scale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Smart Sync
  const card2X = useTransform(scrollYProgress, [0.15, 0.5], positions[1].x);
  const card2Y = useTransform(scrollYProgress, [0.15, 0.5], positions[1].y);
  const card2Scale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Advanced Analytics
  const card3X = useTransform(scrollYProgress, [0.15, 0.5], positions[2].x);
  const card3Y = useTransform(scrollYProgress, [0.15, 0.5], positions[2].y);
  const card3Scale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);


  //Multi-Card Profiles
  const card4X = useTransform(scrollYProgress, [0.15, 0.5], positions[3].x);
  const card4Y = useTransform(scrollYProgress, [0.15, 0.5], positions[3].y);
  const card4Scale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]);
  const card4Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // QR Sharing
  const card5X = useTransform(scrollYProgress, [0.15, 0.5], positions[4].x);
  const card5Y = useTransform(scrollYProgress, [0.15, 0.5], positions[4].y);
  const card5Scale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]);
  const card5Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);


  // Social Integration
  const card6X = useTransform(scrollYProgress, [0.15, 0.5], positions[5].x);
  const card6Y = useTransform(scrollYProgress, [0.15, 0.5], positions[5].y);
  const card6Scale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]);
  const card6Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);




  // ✅ Responsive scaling for different screen sizes
  const layoutScale =
    width >= 1800
      ? 0.94
      : width >= 1600
        ? 0.9
        : width >= 1400
          ? 0.86
          : width >= 1200
            ? 0.8
            : width >= 1000
              ? 0.78
              : 0.74;

  const isMobile = width < 768;
  const showDesktopCards = width >= 1200;

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#fff5ed] via-[#ffe9d6] to-[#ffd9b8] py-16 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* ✨ Softer ambient glows for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#f15a24]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-5%] right-[-10%] w-[450px] h-[450px] bg-[#ffb47b]/15 blur-[110px] rounded-full"></div>
      <div className="absolute top-[40%] left-[50%] w-[700px] h-[450px] -translate-x-1/2 bg-white/10 blur-[160px] rounded-full opacity-50"></div>

      {/* 🎨 Very subtle radial vignette for soft contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,rgba(255,195,150,0.15)_45%,rgba(255,170,100,0.08)_80%,rgba(255,160,80,0.05)_100%)] pointer-events-none"></div>

      {/* 🧭 Section Heading */}
      <div className="text-center z-10 mb-4 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-3 leading-tight">
          {newFeaturesData?.heading}
        </h2>
        <p className="text-[#4b4b4b] text-lg max-w-2xl mx-auto">
          {newFeaturesData?.subheading}
        </p>
      </div>

      {/* 🪄 Animated Cards Layout - Desktop Only */}
      {mounted && showDesktopCards && (
        <motion.div
          className="relative flex w-full max-w-[1400px] h-[84vh] items-center justify-center px-6"
          style={{ scale: layoutScale, transformOrigin: "center top" }}
        >
          {/* CARD 1 — AI Contact Insights */}
          <motion.div
            className="absolute w-[290px] md:w-[300px] lg:w-[310px] h-[420px] md:h-[430px] lg:h-[440px]"
            style={{
              x: card1X,
              y: card1Y,
              scale: card1Scale,
              opacity: card1Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className={`h-full bg-gradient-to-br ${cardContentColors[0].gradient} rounded-3xl shadow-xl overflow-hidden text-black`}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`${cardContentColors[0].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                  >
                    {newFeaturesData?.cards[0]?.chipText}
                  </div>
                  <div className="w-10 h-10 bg-[#f15a24]/10 rounded-xl flex items-center justify-center">
                    <IconComponent name={newFeaturesData?.cards[0].icon ?? "Zap"} className="w-4 h-4 text-[#f15a24]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">
                  {newFeaturesData?.cards[0].heading}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {newFeaturesData?.cards[0].subheading}
                </p>
                <div className="flex-1 bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden mb-4 border border-[#f15a24]/10">
                  {newFeaturesData?.cards[0]?._type === "card1" ? <img
                    src={newFeaturesData?.cards[0].image?.url || ""}
                    alt={newFeaturesData?.cards[0].heading}
                    className="w-full h-full object-cover"
                  /> : null}
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  {newFeaturesData?.cards[0].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 5 — Instant QR Sharing */}
          <motion.div
            className="absolute w-[350px] md:w-[360px] lg:w-[370px] h-[420px] md:h-[330px] lg:h-[340px]"
            style={{
              x: card5X,
              y: card5Y,
              scale: card5Scale,
              opacity: card5Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full bg-gradient-to-br from-white to-[#fff5ef] rounded-3xl shadow-xl overflow-hidden text-black border border-[#f15a24]/10"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={newFeaturesData?.cards[4]?._type === "card5" ? newFeaturesData?.cards[4]?.image?.url : ""}
                  alt={newFeaturesData?.cards[4].heading}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/70" />
                <div
                  className={`absolute top-4 right-4 ${cardContentColors[4].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
                >
                  {newFeaturesData?.cards[4].chipText}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-10 h-10 bg-[#f15a24]/10 rounded-2xl shadow-md flex items-center justify-center">
                    <IconComponent name={newFeaturesData?.cards[4].icon ?? "Zap"} className="w-4 h-4 text-[#f15a24]" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-start h-full">
                <h3 className="text-lg font-bold mb-1">{newFeaturesData?.cards[4].heading}</h3>
                <p className="text-gray-600 text-xs font-semibold mb-2">
                  {newFeaturesData?.cards[4].subheading}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {newFeaturesData?.cards[4].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 3 — Advanced Analytics */}
          <motion.div
            className="absolute w-[580px] md:w-[600px] lg:w-[635px] h-[300px] md:h-[310px] lg:h-[320px]"
            style={{
              x: card3X,
              y: card3Y,
              scale: card3Scale,
              opacity: card3Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className={`h-full bg-gradient-to-br ${cardContentColors[2].gradient} rounded-3xl shadow-2xl overflow-hidden border border-[#333] !text-white`}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f15a24]/20 rounded-2xl flex items-center justify-center">
                      <IconComponent name={newFeaturesData?.cards[2].icon ?? "Zap"} className="w-6 h-6 text-[#ffb47b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold !text-white">
                        {newFeaturesData?.cards[2].heading}
                      </h3>
                      <p className="!text-gray-400 text-sm">
                        {newFeaturesData?.cards[2].subheading}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${cardContentColors[2].badgeColor} !text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                  >
                    {newFeaturesData?.cards[2].chipText}
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3 mb-4">
                  {newFeaturesData?.cards[2]?._type === "card3" ? newFeaturesData?.cards[2]?.metrics?.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-[#2a2a2a] rounded-xl p-3 border border-[#444]"
                    >
                      <p className="text-2xl font-bold !text-[#ffb47b] mb-1">
                        {metric.topText}
                      </p>
                      <p className="text-xs !text-gray-400 mb-2">
                        {metric.centerText}
                      </p>
                      <div className="text-green-400 text-xs font-semibold">
                        {metric.bottomText}
                      </div>
                    </div>
                  )) : null}
                </div>

                <p className="!text-gray-300 text-sm leading-relaxed">
                  {newFeaturesData?.cards[2].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 6 — Multi-Card Profiles */}
          <motion.div
            className="absolute w-[350px] md:w-[360px] lg:w-[370px] h-[420px] md:h-[430px] lg:h-[440px]"
            style={{
              x: card6X,
              y: card6Y,
              scale: card6Scale,
              opacity: card6Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`h-full bg-gradient-to-br ${cardContentColors[5].gradient} rounded-3xl shadow-xl overflow-hidden text-black border border-[#f15a24]/10`}
            >
              <div className="p-5 flex flex-col h-full relative">
                <div className="absolute top-4 right-4">
                  <div
                    className={`${cardContentColors[5].badgeColor} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md`}
                  >
                    {newFeaturesData?.cards[5].chipText}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#f15a24]/10 to-[#ffb47b]/10 rounded-xl flex items-center justify-center mb-3 border border-[#f15a24]/20">
                  <IconComponent name={newFeaturesData?.cards[5].icon ?? "Zap"} className="w-6 h-6 text-[#f15a24]" />

                </div>

                <h3 className="text-xl font-bold mb-1">{newFeaturesData?.cards[5].heading}</h3>
                <p className="text-gray-600 text-xs mb-4">
                  {newFeaturesData?.cards[5].subheading}
                </p>

                <div className="space-y-2 mb-3">
                  {newFeaturesData?.cards[5]?._type === "card6" ? newFeaturesData?.cards[5]?.tabs?.map((profile, i) => (
                    <div
                      key={i}
                      className="bg-white/70 border border-[#f15a24]/10 rounded-xl p-3 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#f15a24]/10 to-[#ffb47b]/10 rounded-lg flex items-center justify-center">
                          <span className="text-[#f15a24] font-semibold text-xs">
                            {profile?.text?.charAt(0)}
                          </span>
                        </div>
                        <span className="text-gray-800 font-medium text-sm">
                          {profile?.text}
                        </span>
                      </div>
                      <div className="w-2 h-2 bg-[#f15a24] rounded-full" />
                    </div>
                  )) : null}
                </div>

                <p className="text-gray-700 text-xs leading-relaxed">
                  {newFeaturesData?.cards[5].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 4 — Social Integration */}
          <motion.div
            className="absolute w-[330px] md:w-[340px] lg:w-[350px] h-auto min-h-[480px]"
            style={{
              x: card4X,
              y: card4Y,
              scale: card4Scale,
              opacity: card4Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full bg-gradient-to-br from-white to-[#fff7f2] rounded-3xl shadow-2xl overflow-hidden text-black border border-[#f15a24]/10"
            >
              <div className="relative h-[320px] overflow-hidden">
                {(newFeaturesData?.cards[3]?._type === "card4") ? <img
                  src={newFeaturesData?.cards[3]?.image?.url ?? ""}
                  alt={newFeaturesData?.cards[3].heading}
                  className="w-full h-full object-cover object-top"
                /> : null}


                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-white/60" />
                <div
                  className={`absolute top-4 right-4 ${cardContentColors[4].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
                >
                  {newFeaturesData?.cards[3].chipText}
                </div>
              </div>

              <div className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#f15a24] to-[#ffb47b] rounded-2xl shadow-lg flex items-center justify-center mb-4">
                  <IconComponent name={newFeaturesData?.cards[2].icon ?? "Zap"} className="w-7 h-7 text-white" />

                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {newFeaturesData?.cards[3].heading}
                </h3>
                <p className="text-gray-600 text-sm font-semibold mb-3">
                  {newFeaturesData?.cards[3].subheading}
                </p>

                <p className="text-gray-700 text-sm leading-relaxed mb-5">
                  {newFeaturesData?.cards[3].description}
                </p>

                <div className="space-y-3">
                  {newFeaturesData?.cards[3]?._type === "card4" ? newFeaturesData?.cards[3]?.bulletPoints?.map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#f15a24] rounded-full" />
                      <p className="text-gray-700 text-sm">{text}</p>
                    </div>
                  )) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 2 — Smart Sync */}
          <motion.div
            className="absolute w-[290px] md:w-[300px] lg:w-[310px] h-[420px] md:h-[430px] lg:h-[440px]"
            style={{
              x: card2X,
              y: card2Y,
              scale: card2Scale,
              opacity: card2Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className={`h-full bg-gradient-to-br ${cardContentColors[1].gradient} rounded-3xl shadow-xl overflow-hidden relative text-black`}
            >
              <div className="absolute inset-0 bg-white/10" />
              <div className="relative p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`${cardContentColors[1].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                  >
                    {newFeaturesData?.cards[1].chipText}
                  </div>
                  <div className="w-10 h-10 bg-[#f15a24]/10 rounded-xl flex items-center justify-center">

                    <IconComponent name={newFeaturesData?.cards[2].icon ?? "Zap"} className="w-5 h-5 text-[#f15a24]" />

                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-1">
                  {newFeaturesData?.cards[1].heading}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {newFeaturesData?.cards[1].subheading}
                </p>

                <div className="flex-1 bg-white/50 rounded-2xl p-4 mb-4 border border-[#f15a24]/20">
                  <div className="space-y-3">
                    {newFeaturesData?.cards[1]?._type === "card2" ? newFeaturesData?.cards[1]?.bulletPoints?.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-[#f15a24]/10 rounded-lg p-3"
                      >
                        <div className="w-2 h-2 bg-[#f15a24] rounded-full" />
                        <span className="text-gray-800 text-sm font-medium">
                          {feature}
                        </span>
                      </div>
                    )) : null}
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {newFeaturesData?.cards[1].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* 📱 Mobile Layout */}
      {mounted && !showDesktopCards && (
        <div className="flex flex-col gap-6 px-4 mt-8 w-full max-w-md mx-auto">
          {newFeaturesData?.cards.map((card, index) => (
            <div
              key={card.heading}
              className={`bg-gradient-to-br ${index === 2 ? "from-[#fff7f2] to-[#fff0e7]" : cardContentColors[index].gradient
                } rounded-3xl shadow-lg overflow-hidden text-black border border-[#f15a24]/10`}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`${cardContentColors[index].badgeColor} !text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                  >
                    {card.chipText}
                  </div>
                  <div className="w-8 h-8 bg-[#f15a24]/10 rounded-lg flex items-center justify-center">

                    <IconComponent name={card.icon ?? "Zap"} className="w-4 h-4 text-[#f15a24]" />

                  </div>
                </div>
                <h3 className="text-xl font-bold !text-[#1a1a1a] mb-1">{card.heading}</h3>
                <p className="!text-[#4b4b4b] !text-sm mb-3">{card.subheading}</p>
                {(card._type === "card1" || card?._type === "card5") && (
                  <div className="rounded-2xl overflow-hidden mb-3 border border-[#f15a24]/10">
                    <img
                      src={card.image?.url}
                      alt={card.heading}
                      className="w-full h-44 object-cover"
                    />
                  </div>
                )}
                <p className="!text-[#4b4b4b] text-sm mb-3 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🚀 CTA Button */}
      {mounted && (
        <div className={`${!showDesktopCards ? "mt-6" : "mt-20"} z-20 flex justify-center`}>
          <motion.div
            onClick={() => (window.location.href = "/features")}
            className="group relative inline-flex items-center gap-3 cursor-pointer select-none"
            whileHover="hover"
            role="link"
          >
            <motion.div
              className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-br from-[#f15a24] to-[#ffb47b]"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </motion.div>
            <motion.span className="relative inline-block leading-none">
              <motion.span
                className="text-lg md:text-xl font-medium tracking-wide bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1a1a1a 0%, #f15a24 40%, #ffb47b 70%, #1a1a1a 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                }}
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                Explore All Features
              </motion.span>
            </motion.span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ExpandingCardsSection;