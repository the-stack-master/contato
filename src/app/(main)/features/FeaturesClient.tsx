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
  const featuresDataFull = {
    latest: [
      {
        title: "AI-Powered Matching",
        description:
          "Advanced algorithms connect you with the most relevant professionals in your industry",
        icon: "brain",
        badge: "New",
      },
      {
        title: "Smart Event Discovery",
        description:
          "Find networking events near you based on your interests and professional goals",
        icon: "calendar",
        badge: "Updated",
      },
      {
        title: "Video Introduction Cards",
        description:
          "Make memorable first impressions with 30-second video introductions",
        icon: "video",
        badge: "New",
      },
      {
        title: "Real-Time Collaboration",
        description:
          "Connect instantly with professionals through live video sessions and interactive workshops",
        icon: "video",
        badge: "Beta",
      },
    ],
    complete: [
      {
        title: "AI-Powered Matching",
        description:
          "Connect with professionals who share your interests, industry, and career goals using advanced AI algorithms",
        icon: "brain",
      },
      {
        title: "Smart Event Discovery",
        description:
          "Discover networking events, conferences, and meetups tailored to your professional interests",
        icon: "calendar",
      },
      {
        title: "Video Introductions",
        description:
          "Create compelling 30-second video introductions to make lasting first impressions",
        icon: "video",
      },
      {
        title: "Secure Messaging",
        description:
          "Connect safely with end-to-end encrypted messaging and verified professional profiles",
        icon: "shield",
      },
      {
        title: "Career Opportunities",
        description:
          "Get matched with job opportunities and business partnerships through your network",
        icon: "briefcase",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Track your networking progress with detailed insights and connection analytics",
        icon: "chart",
      },
      {
        title: "Industry Insights",
        description:
          "Stay updated with personalized industry news and trending professional topics",
        icon: "trending",
      },
      {
        title: "Virtual Coffee Chats",
        description:
          "Schedule and join virtual networking sessions with professionals worldwide",
        icon: "coffee",
      },
      {
        title: "Profile Verification",
        description:
          "Build trust with LinkedIn integration and professional credential verification",
        icon: "check",
      },
    ],
    benefits: [
      {
        title: "Expand Your Network Globally",
        description:
          "Connect with over 2M+ professionals across 150+ countries",
        metric: "2M+ Professionals",
      },
      {
        title: "Save Time with AI Matching",
        description:
          "Our AI finds the right connections for you, saving hours of manual searching",
        metric: "80% Time Saved",
      },
      {
        title: "Increase Career Opportunities",
        description:
          "Users report 3x more job opportunities through our networking platform",
        metric: "3x More Opportunities",
      },
    ],
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Marketing Director",
        company: "TechStart Inc.",
        content:
          "NetworkPro helped me find my dream job! The AI matching is incredibly accurate.",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      {
        name: "Michael Rodriguez",
        role: "Startup Founder",
        company: "InnovateNow",
        content:
          "I've made invaluable business connections that led to our Series A funding.",
        avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      {
        name: "Emily Johnson",
        role: "Software Engineer",
        company: "Global Tech",
        content:
          "The video introductions feature makes networking feel personal and authentic.",
        avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
    ],
    howItWorks: [
      {
        title: "Create Your Profile",
        subtitle: "Set up in minutes",
        description:
          "Sign up and build your professional profile with your experience, skills, and career goals. Add a video introduction to stand out and make authentic connections.",
        icon: "userPlus",
      },
      {
        title: "AI Finds Your Matches",
        subtitle: "Smart connections made easy",
        description:
          "Our advanced AI algorithm analyzes your profile, interests, and goals to connect you with the most relevant professionals in your industry and beyond.",
        icon: "sparkles",
      },
      {
        title: "Connect & Engage",
        subtitle: "Build meaningful relationships",
        description:
          "Start conversations, attend virtual events, and join industry discussions. Our secure messaging platform makes it easy to network authentically.",
        icon: "message",
      },
      {
        title: "Grow Your Career",
        subtitle: "Unlock new opportunities",
        description:
          "Leverage your expanded network to discover job opportunities, find business partners, and accelerate your professional growth with insider insights.",
        icon: "trending",
      },
    ],
  };

  const phoneScale = usePhoneScale();

  return (
    <main className="text-gray-900 bg-white scroll-mt-30">
      {/* Hero Section */}
      <motion.section
        aria-label="Hero"
        className="flex flex-col md:flex-row items-center max-w-7xl mx-auto pt-26 px-6 bg-gradient-to-b from-orange-50/60 to-white mb-24 "
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        style={{ overflow: "visible" }} // allow phones to overflow container
      >
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
      </motion.section>

      {/* New Features  */}
      <section className="w-full mx-auto py-16 bg-gray-100 shadow-sm space-y-12">
        <FeaturesScreenshotsSection featuresData={featuresData} />
      </section>

      {/* Full Feature List Section */}
      <section
        aria-label="Full Features List"
        className="w-full mx-auto px-0 !bg-gradient-to-b from-white via-slate-50 to-white relative"
      >
        <FeaturesListingSection features={featuresDataFull?.complete} />
      </section>
    </main>
  );
};

export default FeaturesPage;
