"use client";
import React, { useEffect, useState } from "react";
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
import { IconComponent } from "@/components/ui/IconComponent";
import { IconName } from "lucide-react/dynamic";
import { AppStoreButton } from "@/components/ui/AppleStoreButton";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";
import FeaturesListingSection from "../Components/FeaturesListingSection";
import { splitSentence } from "@/utils/stringFunctions";

const getDownloadUrl = (platform: "appstore" | "googleplay") => {
  if (platform === "appstore") {
    return "https://apps.apple.com/us/app/contato-ai-powered-networking/id6452725559";
  } else {
    return "https://play.google.com/store/apps/details?id=com.contactos.contato&pcampaignid=web_share";
  }
};

const AppDownloadButtons = ({ featuresData }: FeaturesDataProps) => (
  <div className="flex flex-row gap-4 justify-center">
    <AppStoreButton href={getDownloadUrl("appstore")} />
    <GooglePlayButton href={getDownloadUrl("googleplay")} />
  </div>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export interface FeaturesDataProps {
  featuresData: FeaturesData;
}

const usePhoneScale = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1400) setScale(1);
      else if (w >= 1300) setScale(0.95);
      else if (w >= 1200) setScale(0.9);
      else if (w >= 1100) setScale(0.85);
      else setScale(0.8);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
};

const FeaturesPage = ({ featuresData }: FeaturesDataProps) => {
  const getHeroImage = (index: number) => {
    const imageUrl = featuresData?.heroSection?.phoneScreens?.[index]?.imageUrl;
    return {
      url: imageUrl || "",
      caption: featuresData?.heroSection?.phoneScreens?.[index]?.alt || "",
    };
  };

  const phoneScale = usePhoneScale();

  return (
    <main className="text-gray-900 bg-white scroll-mt-30">
      {/* Hero Section */}
      <motion.section
        aria-label="Hero"
        className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-orange-50/60 to-white "
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        style={{ overflow: "visible" }} // allow phones to overflow container
      >
        <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto pt-25 px-6 mb-16 ">
          {/* Left text side */}
          <div className="w-full min-[900px]:w-2/5 max-w-xl text-left mb-8 min-[900px]:mb-0 min-[900px]:pr-8">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight  mb-4">
              <span className="!text-black">
                {splitSentence(featuresData?.heroSection?.highlightedText)?.firstPart}
              </span>
              &nbsp;
              <span className="!text-[#f15A24] font-extrabold">
                {splitSentence(featuresData?.heroSection?.highlightedText)?.secondPart}
              </span>
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
            className="relative hidden min-[900px]:block"
            style={{
              width: 640,
              height: 600,
              marginLeft: "auto",
              transform: `scale(${phoneScale})`,
              transformOrigin: "right center",
              willChange: "transform",
            }}
          >
            {[...Array(3)].map((_, i) => {
              const rotations = [-12, 0, 12];
              const offsets = phoneScale < 0.9 ? [-110, 0, 110] : [-150, 0, 150];

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    transformOrigin: "bottom center",
                    transform: `translateX(-50%) translateX(${offsets[i]}px) rotate(${rotations[i]}deg)`,
                    zIndex: rotations[i] === 0 ? 3 : 1,
                    boxShadow: `0 8px 20px rgba(0,0,0,${0.2 + i * 0.1})`,
                    borderRadius: "3rem",
                    transition: "transform 0.3s ease",
                  }}
                  className="hover:z-50 hover:scale-105"
                >
                  <PhoneUi image={getHeroImage(i)} />
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* New Features  */}
      <section className="w-full mx-auto py-16 bg-gradient-to-b from-slate-200 to-slate-100 shadow-sm space-y-12">
        <FeaturesScreenshotsSection featuresData={featuresData} />
      </section>

      {/* Full Feature List Section */}
      {featuresData?.featuresGrid ? (
        <section
          aria-label="Full Features List"
          className="w-full mx-auto px-0 bg-gradient-to-b from-orange-100 via-orange-50 to-white relative"
        >
          <FeaturesListingSection featuresData={featuresData?.featuresGrid} />
        </section>
      ) : null}
    </main>
  );
};

export default FeaturesPage;
