"use client";
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import PhoneUi from "@/components/ui/phoneUi";
import Image from "next/image";

interface HeroImage {
  url: string;
  caption?: string;
}

const heroImage = {
  url: "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  caption: "screenshot1",
};
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
  "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  "https://contato.app/assets/images/screenshots/analytics-engangement.png",
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
    <main className="text-gray-900 bg-white">
      {/* Hero Section */}
      <motion.section
        aria-label="Hero"
        className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto pt-24 px-6 bg-gradient-to-b from-[#fef8f5] to-white rounded-b-3xl shadow-lg mb-24"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-5xl font-extrabold leading-tight max-w-3xl text-[#f15A24] mb-4 drop-shadow-md">
          Empower Your Professional Network with Intelligent Connections
        </h1>
        <p className="text-lg max-w-xl text-gray-700 mb-12">
          Our app uses AI to foster meaningful relationships, automate
          scheduling, and deliver insights to help you grow your career.
        </p>

        <div style={{ width: 320, height: 640 }}>
          <PhoneUi image={heroImage} rotation={0} cropHeight={0} />
        </div>

        <div className="my-12">
          <AppDownloadButtons />
        </div>
      </motion.section>

      {/* Key Features Section */}
      <section
        aria-label="Key Features"
        className="max-w-7xl mx-auto px-6 py-20 space-y-20 border-b border-gray-200 mb-24"
      >
        <div>
          <h2 className="text-4xl font-bold mb-12 text-center text-[#f15A24]">
            What&apos;s new?
          </h2>
        </div>
        {keyFeatures.map((feature, index) => (
          <motion.article
            key={feature.title}
            className={`flex flex-col md:flex-row items-center justify-center gap-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } rounded-xl shadow-lg hover:shadow-2xl transition-shadow bg-white p-8 cursor-pointer`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div
              className="relative rounded-xl overflow-hidden md:w-[210px] w-full border-2 border-black"
              style={{ height: 442 }}
            >
              <Image
                src={feature.image}
                alt={`${feature.title} illustration`}
                fill
                style={{ objectFit: "contain" }}
                priority={false}
                sizes="210px"
              />
            </div>

            <div className="md:w-1/2 max-w-lg px-6 py-8 ">
              <h2 className="text-3xl font-bold mb-6 text-[#f15A24]">
                {feature.title}
              </h2>
              <p className="text-gray-700 text-lg">{feature.description}</p>
            </div>
          </motion.article>
        ))}
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
              <img
                src={src}
                alt={`Screenshot ${i + 1}`}
                className="rounded-lg shadow-md w-full h-auto"
                loading="lazy"
              />
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
