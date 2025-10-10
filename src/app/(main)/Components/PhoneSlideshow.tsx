"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AppShowcaseSection } from "@/types/homeTypes";

interface PhoneSlideshowProps {
  appShowcaseData: AppShowcaseSection | null;
}

const PhoneSlideshow = ({ appShowcaseData }: PhoneSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!appShowcaseData?.imageUrls?.length) return; // exit early if no images

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % appShowcaseData.imageUrls.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [appShowcaseData]); // depend on gallery object instead of optional chaining

  return (
    <div className="relative w-80 max-w-full h-[480px] sm:h-[640px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
        {/* Status Bar */}
        <div className="h-12 bg-gray-50 flex items-center justify-between px-6 text-sm font-medium text-gray-900">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-2 bg-gray-900 rounded-sm"></div>
            <div className="w-6 h-3 border border-gray-900 rounded-sm">
              <div className="w-4 h-1.5 bg-gray-900 rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>

        {/* Slideshow */}
        <div className="w-full h-[calc(100%-3rem)] relative">
          {appShowcaseData?.imageUrls?.map((urlObj, index) => (
            <Image
              key={index}
              src={urlObj?.imageUrl}
              alt={`slide-${urlObj?.alt}`}
              fill
              className={`object-cover transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneSlideshow;
