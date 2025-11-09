"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, QrCode, Sparkles, Share2, Globe, TrendingUp } from "lucide-react";

// ✅ Card Data
const cardContent = [
  {
    id: 1,
    title: "AI Contact Insights",
    subtitle: "Smart Recommendations",
    description:
      "Get AI-powered suggestions for follow-ups and relationship management.",
    badge: "New",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: Sparkles,
    screenshot:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=400&fit=crop",
    gradient: "from-[#fff3ec] via-[#fff0e7] to-white",
  },
  {
    id: 2,
    title: "Instant QR Sharing",
    subtitle: "Contactless Exchange",
    description:
      "Generate dynamic QR codes that update in real-time. Share your latest info instantly.",
    badge: "Popular",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: QrCode,
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&h=400&fit=crop",
    gradient: "from-white to-[#fff6f1]",
  },
  {
    id: 3,
    title: "Advanced Analytics",
    subtitle: "Real-time Insights",
    description:
      "Track card views, engagement rates, and conversion metrics with beautiful visualizations.",
    badge: "Pro",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: TrendingUp,
    metrics: [
      { label: "Views", value: "12.5k", change: "+24%" },
      { label: "Clicks", value: "3.2k", change: "+18%" },
      { label: "Saves", value: "892", change: "+35%" },
    ],
    gradient: "from-[#1a1a1a] to-[#2e2e2e]",
  },
  {
    id: 4,
    title: "Multi-Card Profiles",
    subtitle: "Context Switching",
    description:
      "Create separate cards for work, personal, and events. Switch instantly based on context.",
    badge: "Featured",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: Globe,
    profiles: ["Work", "Personal", "Events"],
    gradient: "from-[#fff7f2] to-[#fff0e7]",
  },
  {
    id: 5,
    title: "Social Integration",
    subtitle: "Connect Everything",
    description:
      "Link all your social profiles, portfolios, and content in one beautiful card.",
    badge: "Hot",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: Share2,
    gradient: "from-white to-[#fff6f1]",
  },
  {
    id: 6,
    title: "Smart Sync",
    subtitle: "Auto-Update",
    description:
      "Changes sync across all platforms instantly. Update once, reflect everywhere.",
    badge: "Beta",
    badgeColor: "bg-gradient-to-r from-[#f15a24] to-[#ffb47b]",
    icon: Zap,
    screenshot:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=400&fit=crop",
    features: ["Real-time sync", "Cloud backup", "Version history"],
    gradient: "from-[#fff3ec] to-white",
  },
];

// ✅ Hook to track screen width
const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

const ExpandingCardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const width = useWindowWidth();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });

  // ✅ Balanced card positions for 1920×1080 & 1366×768
  const positions = [
    { x: [-160, -540], y: [-80, -100] },
    { x: [180, 520], y: [-90, -130] },
    { x: [-180, -380], y: [100, 300] },
    { x: [180, 520], y: [200, 250] },
    { x: [0, 135], y: [180, 70] },
    { x: [-10, -220], y: [-80, -100] },
  ];

  // ✅ Responsive scaling for different screen sizes
  const layoutScale =
    width >= 1800
      ? 0.94
      : width >= 1600
        ? 0.9
        : width >= 1400
          ? 0.86
          : width >= 1200
            ? 0.82
            : width >= 1000
              ? 0.78
              : 0.74;

  // ✅ Scroll animations
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const buttonOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);
  const buttonY = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

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

      {/* 🪶 Overlay Intro */}
      <motion.div
        className="absolute left-1/2 top-[35%] -translate-x-1/2 text-center z-10 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      >
        <h2 className="text-5xl font-bold text-[#1a1a1a] mb-2 drop-shadow-sm">
          Latest Features
        </h2>
        <p className="text-[#4b4b4b] text-lg">
          Scroll to explore what&apos;s new
        </p>
      </motion.div>

      {/* 🧭 Section Heading */}
      <motion.div
        className="text-center z-10 mb-12"
        style={{ opacity: headingOpacity, y: headingY }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-3 leading-tight">
          Discover Our Smart Digital Tools
        </h2>
        <p className="text-[#4b4b4b] text-lg max-w-2xl mx-auto">
          Explore intelligent features designed to simplify your workflow and
          elevate your connections — all in one seamless experience.
        </p>
      </motion.div>

      {/* 🪄 Animated Cards Layout */}
      <motion.div
        className="relative hidden md:flex w-full max-w-[1400px] h-[84vh] items-center justify-center transition-all duration-700 ease-in-out px-6"
        style={{ scale: layoutScale, transformOrigin: "center top" }}
      >
        {/* CARD 1 — AI Contact Insights */}
        <motion.div
          className="absolute w-[290px] md:w-[300px] lg:w-[310px] h-[420px] md:h-[430px] lg:h-[440px]"
          style={{
            x: useTransform(scrollYProgress, [0.15, 0.5], positions[0].x),
            y: useTransform(scrollYProgress, [0.15, 0.5], positions[0].y),
            scale: useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]),
            opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className={`h-full bg-gradient-to-br ${cardContent[0].gradient} rounded-3xl shadow-xl overflow-hidden text-black`}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`${cardContent[0].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                >
                  {cardContent[0].badge}
                </div>
                <div className="w-10 h-10 bg-[#f15a24]/10 rounded-xl flex items-center justify-center">
                  {React.createElement(cardContent[0].icon, {
                    className: "w-5 h-5 text-[#f15a24]",
                  })}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">
                {cardContent[0].title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {cardContent[0].subtitle}
              </p>
              <div className="flex-1 bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden mb-4 border border-[#f15a24]/10">
                <img
                  src={cardContent[0].screenshot}
                  alt={cardContent[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-700 text-sm mb-4">
                {cardContent[0].description}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CARD 2 — Instant QR Sharing */}
        <motion.div
          className="absolute w-[350px] md:w-[360px] lg:w-[370px] h-auto min-h-[320px]"
          style={{
            x: useTransform(scrollYProgress, [0.15, 0.5], positions[1].x),
            y: useTransform(scrollYProgress, [0.15, 0.5], positions[1].y),
            scale: useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]),
            opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full bg-gradient-to-br from-white to-[#fff5ef] rounded-3xl shadow-xl overflow-hidden text-black border border-[#f15a24]/10"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={cardContent[1].image}
                alt={cardContent[1].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/70" />
              <div
                className={`absolute top-4 right-4 ${cardContent[1].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
              >
                {cardContent[1].badge}
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-10 h-10 bg-[#f15a24]/10 rounded-2xl shadow-md flex items-center justify-center">
                  {React.createElement(cardContent[1].icon, {
                    className: "w-5 h-5 text-[#f15a24]",
                  })}
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col justify-start h-full">
              <h3 className="text-lg font-bold mb-1">{cardContent[1].title}</h3>
              <p className="text-gray-600 text-xs font-semibold mb-2">
                {cardContent[1].subtitle}
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {cardContent[1].description} Perfect for instant digital contact
                sharing and professional networking.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CARD 3 — Advanced Analytics */}
        <motion.div
          className="absolute w-[580px] md:w-[600px] lg:w-[635px] h-[300px] md:h-[310px] lg:h-[320px]"
          style={{
            x: useTransform(scrollYProgress, [0.15, 0.5], positions[2].x),
            y: useTransform(scrollYProgress, [0.15, 0.5], positions[2].y),
            scale: useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]),
            opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className={`h-full bg-gradient-to-br ${cardContent[2].gradient} rounded-3xl shadow-2xl overflow-hidden border border-[#333] text-white`}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f15a24]/20 rounded-2xl flex items-center justify-center">
                    {React.createElement(cardContent[2].icon, {
                      className: "w-6 h-6 text-[#ffb47b]",
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {cardContent[2].title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {cardContent[2].subtitle}
                    </p>
                  </div>
                </div>
                <div
                  className={`${cardContent[2].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                >
                  {cardContent[2].badge}
                </div>
              </div>

              <div className="flex-1 grid grid-cols-3 gap-3 mb-4">
                {cardContent[2]?.metrics?.map((metric, i) => (
                  <div
                    key={i}
                    className="bg-[#2a2a2a] rounded-xl p-3 border border-[#444]"
                  >
                    <p className="text-2xl font-bold text-[#ffb47b] mb-1">
                      {metric.value}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">{metric.label}</p>
                    <div className="text-green-400 text-xs font-semibold">
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {cardContent[2].description}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CARD 4 — Multi-Card Profiles */}
        <motion.div
          className="absolute w-[350px] md:w-[360px] lg:w-[370px] h-auto min-h-[340px]"
          style={{
            x: useTransform(scrollYProgress, [0.15, 0.5], positions[3].x),
            y: useTransform(scrollYProgress, [0.15, 0.5], positions[3].y),
            scale: useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]),
            opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`h-full bg-gradient-to-br ${cardContent[3].gradient} rounded-3xl shadow-xl overflow-hidden text-black border border-[#f15a24]/10`}
          >
            <div className="p-5 flex flex-col h-full relative">
              <div className="absolute top-4 right-4">
                <div
                  className={`${cardContent[3].badgeColor} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md`}
                >
                  {cardContent[3].badge}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#f15a24]/10 to-[#ffb47b]/10 rounded-xl flex items-center justify-center mb-3 border border-[#f15a24]/20">
                {React.createElement(cardContent[3].icon, {
                  className: "w-6 h-6 text-[#f15a24]",
                })}
              </div>

              <h3 className="text-xl font-bold mb-1">{cardContent[3].title}</h3>
              <p className="text-gray-600 text-xs mb-4">
                {cardContent[3].subtitle}
              </p>

              <div className="space-y-2 mb-3">
                {cardContent[3]?.profiles?.map((profile, i) => (
                  <div
                    key={i}
                    className="bg-white/70 border border-[#f15a24]/10 rounded-xl p-3 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#f15a24]/10 to-[#ffb47b]/10 rounded-lg flex items-center justify-center">
                        <span className="text-[#f15a24] font-semibold text-xs">
                          {profile.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm">
                        {profile}
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-[#f15a24] rounded-full" />
                  </div>
                ))}
              </div>

              <p className="text-gray-700 text-xs leading-relaxed">
                {cardContent[3].description}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CARD 5 — Social Integration */}
        <motion.div
          className="absolute w-[330px] md:w-[340px] lg:w-[350px] h-auto min-h-[480px]"
          style={{
            x: useTransform(scrollYProgress, [0.15, 0.5], positions[4].x),
            y: useTransform(scrollYProgress, [0.15, 0.5], positions[4].y),
            scale: useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]),
            opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full bg-gradient-to-br from-white to-[#fff7f2] rounded-3xl shadow-2xl overflow-hidden text-black border border-[#f15a24]/10"
          >
            <div className="relative h-[320px] overflow-hidden">
              <img
                src="https://contato.app/assets/images/screenshots/analytics-insights.png"
                alt={cardContent[4].title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-white/60" />
              <div
                className={`absolute top-4 right-4 ${cardContent[4].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
              >
                {cardContent[4].badge}
              </div>
            </div>

            <div className="p-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#f15a24] to-[#ffb47b] rounded-2xl shadow-lg flex items-center justify-center mb-4">
                {React.createElement(cardContent[4].icon, {
                  className: "w-7 h-7 text-white",
                })}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {cardContent[4].title}
              </h3>
              <p className="text-gray-600 text-sm font-semibold mb-3">
                {cardContent[4].subtitle}
              </p>

              <p className="text-gray-700 text-sm leading-relaxed mb-5">
                {cardContent[4].description}
              </p>

              <div className="space-y-3">
                {[
                  "Unified dashboard for social profiles",
                  "Auto-fetch bio and profile updates",
                  "Smart content linking & tracking",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#f15a24] rounded-full" />
                    <p className="text-gray-700 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CARD 6 — Smart Sync */}
        <motion.div
          className="absolute w-[290px] md:w-[300px] lg:w-[310px] h-[420px] md:h-[430px] lg:h-[440px]"
          style={{
            x: useTransform(scrollYProgress, [0.15, 0.5], positions[5].x),
            y: useTransform(scrollYProgress, [0.15, 0.5], positions[5].y),
            scale: useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]),
            opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className={`h-full bg-gradient-to-br ${cardContent[5].gradient} rounded-3xl shadow-xl overflow-hidden relative text-black`}
          >
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`${cardContent[5].badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                >
                  {cardContent[5].badge}
                </div>
                <div className="w-10 h-10 bg-[#f15a24]/10 rounded-xl flex items-center justify-center">
                  {React.createElement(cardContent[5].icon, {
                    className: "w-5 h-5 text-[#f15a24]",
                  })}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-1">
                {cardContent[5].title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {cardContent[5].subtitle}
              </p>

              <div className="flex-1 bg-white/50 rounded-2xl p-4 mb-4 border border-[#f15a24]/20">
                <div className="space-y-3">
                  {cardContent[5]?.features?.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[#f15a24]/10 rounded-lg p-3"
                    >
                      <div className="w-2 h-2 bg-[#f15a24] rounded-full" />
                      <span className="text-gray-800 text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {cardContent[5].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 📱 Mobile Layout */}
      <div className="hidden max-[899px]:flex flex-col gap-6 px-4 mt-8 w-full max-w-md mx-auto">
        {cardContent.map((card) => (
          <div
            key={card.id}
            className={`bg-gradient-to-br ${card.gradient} rounded-3xl shadow-lg overflow-hidden text-black border border-[#f15a24]/10`}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`${card.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                >
                  {card.badge}
                </div>
                <div className="w-8 h-8 bg-[#f15a24]/10 rounded-lg flex items-center justify-center">
                  {React.createElement(card.icon, {
                    className: "w-4 h-4 text-[#f15a24]",
                  })}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 text-[#1a1a1a]">
                {card.title}
              </h3>
              <p className="text-[#4b4b4b] text-sm mb-3">{card.subtitle}</p>
              {(card.screenshot || card.image) && (
                <div className="rounded-2xl overflow-hidden mb-3 border border-[#f15a24]/10">
                  <img
                    src={card.screenshot || card.image}
                    alt={card.title}
                    className="w-full h-44 object-cover"
                  />
                </div>
              )}
              <p className="text-[#4b4b4b] text-sm mb-3 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 CTA Button */}
      <motion.div
        className="mt-28 z-20 flex justify-center"
        style={{ opacity: buttonOpacity, y: buttonY }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
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
      </motion.div>
    </div>
  );
};

export default ExpandingCardsSection;
