"use client";

import { useState, useEffect } from "react";
import { Users, Star } from "lucide-react";
import { cn } from "@/utils/classNames";
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

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#f15A24]/20 to-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-[#f15A24]/15 to-red-300/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-[#f15A24]/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-4 xl:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div
            className={cn(
              "space-y-8 transition-all duration-700 max-w-xl lg:max-w-none",
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-6 opacity-0"
            )}
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src={getImageUrl(logoData?.mainLogo?.image?.asset?.url ?? "")}
                alt={logoData?.smallLogo?.altText || "Company Logo"}
                width={120}
                height={120}
                className="object-contain bg"
              />
            </div>

            {/* Headline */}
            <div className="space-y-5">
              <h1 className="leading-tight">
                {heroData?.mainHeading}&nbsp;
                <span className="text-[#f15A24] font-extrabold md:font-bold">
                  {heroData?.highlightedWord}
                </span>
                <br />
                {heroData?.secondaryHeading}
              </h1>

              <p className="max-w-xl">{heroData?.description}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              {heroData?.statistics?.map((statsSection) => (
                <div key={statsSection?.label} className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-3xl font-bold text-[#f15A24]">
                      {statsSection?.value}
                    </span>
                    {statsSection?.label === "App Rating" && (
                      <Star className="w-6 h-6 fill-[#f15A24] text-[#f15A24]" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {statsSection?.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 justify-center sm:justify-start">
              {heroData?.ctaButtons?.map((cta) =>
                cta?.isPrimary ? (
                  <AppStoreButton key={cta?.buttonUrl} href={cta?.buttonUrl} />
                ) : (
                  <GooglePlayButton
                    key={cta?.buttonUrl}
                    href={cta?.buttonUrl}
                  />
                )
              )}
            </div>
          </div>

          {/* Right Content */}
          <div
            className={cn(
              "relative flex justify-center transition-all duration-700 delay-200 w-full lg:-ml-6 xl:-ml-10",
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-6 opacity-0"
            )}
          >
            <div className="w-full max-w-[420px] lg:max-w-[480px] xl:max-w-[520px]">
              <AppShowcase appShowcaseData={appShowcaseData} />
            </div>
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
          />
        </svg>
      </div>
    </section>
  );
};

export default NewHeroSection;
