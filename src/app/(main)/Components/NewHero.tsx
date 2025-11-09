"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageCircle,
  Calendar,
  Star,
  ArrowRight,
  Play,
  Apple,
  Camera,
} from "lucide-react";
import { cn } from "@/utils/classNames";
import PhoneSlideshow from "./PhoneSlideshow";
import RotatingIcons from "./RotatingIcons";
import DownloadButtons from "./DownloadAppButton";
import { AppShowcaseSection, HeroData } from "@/types/homeTypes";
import { LogoDocument } from "@/types/commonTypes";
import Image from "next/image";
import getImageUrl from "@/utils/getImageUrl";
import AppShowcase from "./AppShowcase";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";
import { AppStoreButton } from "@/components/ui/AppleStoreButton";

interface HeroClientProps {
  heroData: HeroData | null;
  appShowcaseData: AppShowcaseSection | null;
  logoData: LogoDocument | null;
}

const NewHeroSection = ({
  heroData,
  appShowcaseData,
  logoData,
}: HeroClientProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTA = (url?: string) => {
    if (url?.length) {
      window.open(url, "_blank");
    }
  };

  const getCTAClasses = (isPrimaryVal: boolean) =>
    isPrimaryVal
      ? "h-14 px-8 bg-black hover:bg-gray-800 text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
      : "h-14 px-8 bg-[#f15A24] hover:bg-orange-600 text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95";

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#f15A24]/20 to-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-[#f15A24]/15 to-red-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-[#f15A24]/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Network Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1200 800"
        >
          <defs>
            <linearGradient
              id="connectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f15A24" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
          </defs>
          <path
            d="M100,200 Q300,100 500,200 T900,150"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M200,400 Q400,300 600,400 T1000,350"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse delay-500"
          />
          <path
            d="M50,600 Q250,500 450,600 T850,550"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse delay-1000"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div
            className={cn(
              "space-y-8 transition-all duration-1000 transform",
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            )}
          >
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#f15A24] to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                <Image
                  src={getImageUrl(logoData?.mainLogo?.image?.asset?.url ?? "")}
                  alt={logoData?.smallLogo?.altText || "Company Logo"}
                  width={200} // match w-16
                  height={200} // match h-16
                  className="object-contain"
                />
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {heroData?.mainHeading || ""}
                <br />
                <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
                  {heroData?.highlightedWord || ""}
                </span>
                <br />
                {heroData?.secondaryHeading || ""}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                {heroData?.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 py-6">
              {heroData?.statistics?.map((statsSection) => (
                <div key={statsSection?.label} className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-3xl font-bold text-[#f15A24]">
                      {statsSection?.value}
                    </span>
                    {statsSection?.label === "App Rating" ? (
                      <Star className="w-6 h-6 fill-[#f15A24] text-[#f15A24]" />
                    ) : null}
                  </div>
                  <div className="text-sm text-gray-600">
                    {statsSection?.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {heroData?.ctaButtons?.map((cta) => {
                // <Button
                //   key={cta?.buttonUrl}
                //   onClick={() => handleCTA(cta?.buttonUrl)}
                //   className={getCTAClasses(cta?.isPrimary ?? false)}
                // >
                //   {cta?.isPrimary ? (
                //     <Apple className="w-6 h-6 mr-3" />
                //   ) : (
                //     <Play className="w-6 h-6 mr-3" />
                //   )}
                //   <div className="flex flex-col items-center">
                //     {cta?.buttonText &&
                //       (() => {
                //         const words = cta.buttonText.split(" ");
                //         const top = words.slice(0, 3).join(" "); // first 3 words
                //         const bottom = words.slice(3).join(" "); // remaining words
                //         return (
                //           <>
                //             <div className="text-xs opacity-90">{top}</div>
                //             <div className="text-sm font-semibold">
                //               {bottom}
                //             </div>
                //           </>
                //         );
                //       })()}
                //   </div>
                // </Button>
                if (cta?.isPrimary) {
                  return (
                    <AppStoreButton
                      key={cta?.buttonUrl}
                      href={cta?.buttonUrl}
                    />
                  );
                } else {
                  return (
                    <GooglePlayButton
                      key={cta?.buttonUrl}
                      href={cta?.buttonUrl}
                    />
                  );
                }
              })}
            </div>

            {/* Secondary CTA */}
            {/* <div className="flex items-center space-x-4 pt-4">
              <Button
                variant="outline"
                className="border-[#f15A24] text-[#f15A24] hover:bg-[#f15A24] hover:text-white transition-all duration-200"
              >
                {heroData?.demoVideo?.videoText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <span className="text-sm text-gray-500">
                {heroData?.demoVideo?.videoDuration}
              </span>
            </div> */}
          </div>

          {/* Right Content - Phone Mockup and icons */}
          <div
            className={cn(
              "relative flex justify-center transition-all duration-1000 delay-300 transform",
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            )}
            style={{ minWidth: 0 }}
          >
            {/* Scroll container for phone + icons */}
            {/* <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar px-4 sm:px-0 -mx-4 sm:mx-0 bg-transparent"> */}
            {/* <PhoneSlideshow appShowcaseData={appShowcaseData} />
              <RotatingIcons /> */}
            <AppShowcase appShowcaseData={appShowcaseData} />
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-20"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            className="fill-gray-50"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default NewHeroSection;
