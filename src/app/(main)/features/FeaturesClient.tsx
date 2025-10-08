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
import { Button } from "@/components/ui/button";
import { Apple, CheckCircle, Globe, Heart, Play, Zap } from "lucide-react";
import { FeaturesData } from "@/components/serverComponents/FeaturesServer";
import getImageUrl from "@/utils/getImageUrl";

const getFeaturesIcons = (iconVal?: string) => {
  switch (iconVal) {
    case "folder":
      return "📁";
    case "lightning":
      return "⚡";
    case "shield":
      return "🔒";
    case "chart":
      return "📊";
    default:
      return "🔒";
  }
};

const handleDownload = (platform: "appstore" | "googleplay") => {
  if (platform === "appstore") {
    window.open(
      "https://apps.apple.com/us/app/contato-ai-powered-networking/id6452725559",
      "_blank"
    );
  } else {
    window.open(
      "https://play.google.com/store/apps/details?id=com.contactos.contato&pcampaignid=web_share",
      "_blank"
    );
  }
};

const AppDownloadButtons = ({ featuresData }: FeaturesDataProps) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <Button
      onClick={() => handleDownload("appstore")}
      className="h-14 px-8 bg-black hover:bg-gray-800 text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
    >
      <Apple className="w-6 h-6 mr-3" />
      <div className="text-left">
        <div className="text-xs opacity-80">Download on the</div>
        <div className="text-sm font-semibold">App Store</div>
      </div>
    </Button>

    <Button
      onClick={() => handleDownload("googleplay")}
      className="h-14 px-8 bg-[#f15A24] hover:bg-orange-600 text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
    >
      <Play className="w-6 h-6 mr-3" />
      <div className="text-left">
        <div className="text-xs opacity-90">Get it on</div>
        <div className="text-sm font-semibold">Google Play</div>
      </div>
    </Button>
  </div>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export interface FeaturesDataProps {
  featuresData: FeaturesData;
}

const FeaturesPage = ({ featuresData }: FeaturesDataProps) => {
  const getHeroImage = (index: number) => {
    const imageUrl = featuresData?.heroSection?.phoneScreens?.[index]?.imageUrl;
    return {
      url: imageUrl || "",
      caption: featuresData?.heroSection?.phoneScreens?.[index]?.alt || "",
    };
  };
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
            {featuresData?.heroSection?.highlightedText}
          </h1>
          <p className="text-sm md:text-base text-gray-700 px-1 md:px-0">
            {featuresData?.heroSection?.description}
          </p>

          <div className="mt-10">
            <AppDownloadButtons featuresData={featuresData} />
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
                <PhoneUi image={getHeroImage(i)} cropHeight={0} rotation={0} />
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
          {featuresData?.whatsNew?.sectionHeading || "What's New?"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {featuresData?.whatsNew?.features?.map((feature) => (
            <motion.article
              key={feature._key}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="relative w-40 h-40 mb-6 rounded-xl overflow-hidden border border-gray-300">
                <Image
                  src={getImageUrl(feature.featureImage || "-")}
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
      <section className="max-w-7xl mx-auto px-6 py-20 my-5 bg-gray-50 rounded-2xl shadow-sm space-y-12">
        <FeaturesScreenshotsSection featuresData={featuresData} />
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
          {featuresData?.gallery?.screenImages?.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-160 rounded-lg shadow-md overflow-hidden">
                <Image
                  src={getImageUrl(src)}
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
          {featuresData?.featuresGrid?.features.map((feature, i) => (
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
                {getFeaturesIcons(feature?.icon)}
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
