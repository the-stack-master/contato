"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/lib/sanity";

interface HeroImage {
  url: string;
  caption?: string;
}

interface HeroGallery {
  _id: string;
  title: string;
  imageUrls: HeroImage[];
}

const PhoneSlideshow = () => {
  // Demo image URLs
  // const images: string[] = [
  //   "https://contato.app/assets/images/screenshots/analytics-engangement.png",
  //   "https://contato.app/assets/images/screenshots/analytics-growth.png",
  //   "https://contato.app/assets/images/screenshots/analytics-insights.png",
  //   "https://contato.app/assets/images/screenshots/integrations.png",
  //   "https://contato.app/assets/images/screenshots/connection-near-me.png",
  //   "https://contato.app/assets/images/screenshots/my-code.png",
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [gallery, setGallery] = useState<HeroGallery | null>(null);

  useEffect(() => {
    if (!gallery?.imageUrls?.length) return; // exit early if no images

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.imageUrls.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [gallery]); // depend on gallery object instead of optional chaining

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data: HeroGallery[] = await client.fetch(`
          *[_type == "heroImageGallery"]{
            _id,
            title,
            imageUrls[]{ url, caption }
          }
        `);
        setGallery(data[0] || null);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      }
    }
    fetchGallery();
  }, []);

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
          {gallery?.imageUrls?.map((urlObj, index) => (
            <Image
              key={index}
              src={urlObj?.url}
              alt={`slide-${urlObj?.caption}`}
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
