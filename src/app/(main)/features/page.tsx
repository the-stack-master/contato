"use client";
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import PhoneUi from "@/components/ui/phoneUi";
import Image from "next/image";
import FeaturesScreenshotsSection from "./components/FeaturesScreenshots";

interface HeroImage {
  id: number;
  url: string;
  caption?: string;
}

const heroImage: HeroImage[] = [
  {
    id: 1,
    url: "https://contato.app/assets/images/screenshots/analytics-engangement.png",
    caption: "screenshot2",
  },
  {
    id: 2,
    url: "https://contato.app/assets/images/screenshots/my-code.png",
    caption: "screenshot2",
  },
  {
    id: 3,
    url: "https://contato.app/assets/images/screenshots/integrations.png",
    caption: "screenshot2",
  },
];

const keyFeatures = [
  {
    title: "AI-Powered Matching",
    description:
      "Connect with professionals who align perfectly with your goals, interests, and career trajectory.",
    image:
      "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  },
  {
    title: "Smart Conversations",
    description:
      "Crafted conversation starters and relationship insights that turn awkward networking into natural connections.",
    image:
      "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  },
  {
    title: "Intelligent Scheduling",
    description:
      "Smart calendar integration automates your meetings and follow-ups for optimal productivity.",
    image:
      "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  },
];

const screenshots = [
  "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  "https://contato.app/assets/images/screenshots/analytics-growth.png",
  "https://contato.app/assets/images/screenshots/analytics-insights.png",
  "https://contato.app/assets/images/screenshots/integrations.png",
  "https://contato.app/assets/images/screenshots/connection-near-me.png",
  "https://contato.app/assets/images/screenshots/my-code.png",
];

const fullFeatures = [
  {
    title: "File Management",
    icon: "📁",
    description: "Organize all your files with safe access and fast search.",
  },
  {
    title: "Enhance Productivity",
    icon: "⚡",
    description: "Automate workflows and eliminate repetitive tasks.",
  },
  {
    title: "Analysis Tool",
    icon: "📊",
    description: "Get real-time analytics and actionable insights.",
  },
  {
    title: "System Protection",
    icon: "🔒",
    description: "Enterprise-level security for total peace of mind.",
  },
  {
    title: "File Management",
    icon: "📁",
    description: "Organize all your files with safe access and fast search.",
  },
  {
    title: "Enhance Productivity",
    icon: "⚡",
    description: "Automate workflows and eliminate repetitive tasks.",
  },
  {
    title: "Analysis Tool",
    icon: "📊",
    description: "Get real-time analytics and actionable insights.",
  },
  {
    title: "System Protection",
    icon: "🔒",
    description: "Enterprise-level security for total peace of mind.",
  },
];

const AppDownloadButtons = () => (
  <div className="flex gap-6 mt-6 justify-center">
    <a
      href="#"
      className="inline-block bg-[#f15A24] text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition transform hover:scale-105"
      aria-label="Download on the App Store"
    >
      App Store
    </a>
    <a
      href="#"
      className="inline-block bg-[#f15A24] text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition transform hover:scale-105"
      aria-label="Download on Google Play"
    >
      Google Play
    </a>
  </div>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FeaturesPage = () => {
  return (
    <main className="text-gray-900 bg-white scroll-mt-30">
      {/* Hero Section */}
      <motion.section
        aria-label="Hero"
        className="flex flex-col md:flex-row items-center max-w-7xl mx-auto pt-26 px-6 bg-white mb-24 "
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        style={{ overflow: "visible" }} // allow phones to overflow container
      >
        {/* Left text side */}
        <div className="md:w-2/5 max-w-xl text-left mb-8 md:mb-0 md:pr-8">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#f15A24] mb-4">
            Empower Your Professional Network with Intelligent Connections
          </h1>
          <p className="text-sm md:text-base text-gray-700 px-1 md:px-0">
            Our app uses AI to foster meaningful relationships, automate
            scheduling, and deliver insights to help you grow your career.
          </p>

          <div className="mt-10">
            <AppDownloadButtons />
          </div>
        </div>

        {/* Right phones side */}
        <div
          className="relative hidden md:block"
          style={{
            width: 640,
            height: 600,
            overflow: "visible",
            marginLeft: "auto",
          }}
        >
          {[...Array(3)].map((_, i) => {
            const rotations = [-12, 0, 12];
            const offsets = [-200, 0, 200];
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transformOrigin: "bottom center",
                  transform: `translateX(-50%) translateX(${offsets[i]}px) rotate(${rotations[i]}deg)`,
                  zIndex: rotations[i] === 0 ? 3 : 1,
                  boxShadow: `0 8px 20px rgba(0, 0, 0, ${0.2 + i * 0.1})`,
                  borderRadius: "3rem",
                  transition: "transform 0.3s ease",
                  overflow: "visible",
                }}
                className="hover:z-50 hover:scale-105"
              >
                <PhoneUi image={heroImage[i]} cropHeight={0} rotation={0} />
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Key Features Section */}
      <section
        aria-label="Key Features"
        className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 rounded-2xl shadow-sm space-y-12"
      >
        <h2 className="text-4xl font-extrabold text-center text-[#f15A24] mb-16">
          What&apos;s New?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {keyFeatures.map((feature) => (
            <motion.article
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="relative w-40 h-40 mb-6 rounded-xl overflow-hidden border border-gray-300">
                <Image
                  src={feature.image}
                  alt={`${feature.title} illustration`}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={false}
                  sizes="160px"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#f15A24] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* New Features  */}
      <section>
        <FeaturesScreenshotsSection />
      </section>

      {/* Screenshots Carousel Section */}
      <section
        aria-label="App Screenshots"
        className="bg-gray-50 py-20 max-w-7xl mx-auto px-6 border-b border-gray-200 mb-24"
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-[#f15A24]">
          See More Screens
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          loop
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {screenshots.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-160 rounded-lg shadow-md overflow-hidden">
                <Image
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority={i < 3} // optionally prioritize first few images
                  className="rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Full Feature List Section */}
      <section
        aria-label="Full Features List"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#f15A24]">
          Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fullFeatures.map((feature, i) => (
            <motion.article
              key={i}
              className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-md border border-orange-400 bg-white transition-transform duration-300 min-h-[180px] max-w-[280px] mx-auto hover:scale-105 hover:shadow-lg"
              tabIndex={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="flex items-center justify-center mb-4 w-16 h-16 rounded-full bg-white border border-[#f15A24] shadow-[0_4px_10px_rgba(241,90,36,0.3)] text-4xl text-[#f15A24]">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold mb-1 text-[#f15A24] text-center tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm text-center leading-relaxed px-2">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;
