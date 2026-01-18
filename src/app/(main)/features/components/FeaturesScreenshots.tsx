"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import { FeaturesDataProps } from "../FeaturesClient";
import getImageUrl from "@/utils/getImageUrl";
import { splitSentence } from "@/utils/stringFunctions";

const FeaturesScreenshotsSection = ({ featuresData }: FeaturesDataProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const screenshots = featuresData?.carousel?.carouselSlides || [];

  /* ---------------- Mobile detection ---------------- */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  /* ---------------- Mobile layout (unchanged logic) ---------------- */
  if (isMobile) {
    const screenshot = screenshots[selectedIndex];
    return (
      <section className="py-12 px-6">
        <motion.div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {splitSentence(featuresData?.carousel?.sectionHeading)?.firstPart}{" "}
            <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
              {
                splitSentence(featuresData?.carousel?.sectionHeading)
                  ?.secondPart
              }
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {featuresData?.carousel?.sectionDescription}
          </p>
        </motion.div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="flex-[0_0_100%] px-2">
                <div className="max-w-sm mx-auto relative rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={getImageUrl(screenshot.slideImage || "")}
                    alt={screenshot.slideTitle}
                    className="w-full h-[480px] object-cover"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end">
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    {/* Text panel */}
                    <div className="relative p-5 bg-black/65 backdrop-blur-xl rounded-b-3xl">
                      {/* Title */}
                      <h3 className="text-lg font-extrabold mb-1 !text-[#FFE6D5]">
                        {screenshot.slideTitle}
                      </h3>

                      {/* Description */}
                      <p className="text-sm font-medium leading-snug mb-2 !text-gray-200">
                        {screenshot.slideDescription}
                      </p>

                      {/* Features */}
                      <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                        {screenshot?.features?.map((feat, idx) => (
                          <li key={idx}>{feat?.featureName}</li>
                        ))}
                      </ul>
                    </div>
                  </div>




                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${index === selectedIndex
                ? "bg-[#f15A24] scale-125"
                : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </section>
    );
  }

  /* ---------------- Desktop / Tablet ---------------- */
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {splitSentence(featuresData?.carousel?.sectionHeading)?.firstPart}{" "}
            <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
              {
                splitSentence(featuresData?.carousel?.sectionHeading)
                  ?.secondPart
              }
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {featuresData?.carousel?.sectionDescription}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {screenshots.map((screenshot, index) => (
                <div key={index} className="flex-[0_0_100%] px-4">
                  <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {/* 📱 Mockup (SCALED DOWN RESPONSIVELY) */}
                    <div className="flex-1 flex justify-center">
                      <div
                        className="
  w-52 h-[440px]
  sm:w-50 sm:h-[360px]
  md:w-52 md:h-[380px]
  lg:w-56 lg:h-[430px]
  xl:w-62 xl:h-[480px]
  rounded-3xl p-1 border border-gray-700 bg-black shadow-sm
"
                      >
                        <div className="w-full h-full bg-white rounded-3xl overflow-hidden">
                          <img
                            src={getImageUrl(screenshot.slideImage || "")}
                            alt={screenshot.slideTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 📝 Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        {screenshot.slideTitle}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6">
                        {screenshot.slideDescription}
                      </p>

                      <div className="space-y-3 inline-flex flex-col items-start">
                        {screenshot?.features?.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-center lg:justify-start gap-3"
                          >
                            <span className="w-6 h-6 rounded-full bg-[#f15A24] text-white flex items-center justify-center text-sm">
                              ✓
                            </span>
                            <span className="text-gray-700 font-medium">
                              {feature?.featureName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full ${index === selectedIndex
                ? "bg-[#f15A24] scale-125"
                : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesScreenshotsSection;
