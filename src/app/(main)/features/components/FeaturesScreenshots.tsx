"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const screenshots = [
  {
    id: 1,
    title: "Profile & Connections",
    description:
      "Showcase your professional profile and connect with like-minded professionals",
    image:
      "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400&h=800&fit=crop",
    features: [
      "Professional Profile",
      "Connection Requests",
      "Skills Showcase",
    ],
  },
  {
    id: 2,
    title: "AI-Powered Matching",
    description:
      "Let our AI find the perfect professional matches for your career goals",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=800&fit=crop",
    features: ["Smart Matching", "Industry Insights", "Career Recommendations"],
  },
  {
    id: 3,
    title: "Event Discovery",
    description: "Discover networking events and professional meetups near you",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=800&fit=crop",
    features: ["Event Calendar", "Location-based", "RSVP Management"],
  },
  {
    id: 4,
    title: "Secure Messaging",
    description:
      "Connect safely with end-to-end encrypted professional conversations",
    image:
      "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400&h=800&fit=crop",
    features: ["Encrypted Chat", "File Sharing", "Video Calls"],
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    description:
      "Track your networking progress with detailed insights and metrics",
    image:
      "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=800&fit=crop",
    features: ["Network Growth", "Engagement Stats", "Career Progress"],
  },
];

const FeaturesScreenshotsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience{" "}
            <span className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent">
              Connecto
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Connecto transforms professional networking with beautiful,
            intuitive design and powerful features at your fingertips.
          </p>
        </motion.div>

        {/* Mobile & Desktop Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.id}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto"
                  >
                    {/* Mobile Mockup */}
                    <div className="flex-1 flex justify-center">
                      <div className="relative">
                        <div className="w-72 max-w-full h-[600px] rounded-3xl p-1 border border-gray-700 bg-black shadow-sm">
                          <div className="w-full h-full bg-white rounded-3xl overflow-hidden relative">
                            <div className="h-6 bg-gray-100 flex items-center justify-center relative border-b border-gray-300">
                              <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
                              <div className="absolute right-4 top-1 text-gray-500 text-xs font-semibold select-none">
                                9:41
                              </div>
                            </div>

                            <div className="relative h-[calc(100%-24px)] overflow-hidden">
                              <img
                                src={screenshot.image}
                                alt={screenshot.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left px-4 sm:px-0">
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                          {screenshot.title}
                        </h3>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                          {screenshot.description}
                        </p>

                        <div className="space-y-3">
                          {screenshot.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.4,
                                delay: 0.3 + idx * 0.1,
                              }}
                              className="flex items-center justify-center lg:justify-start space-x-3"
                            >
                              <div className="w-6 h-6 bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                              </div>
                              <span className="text-gray-700 font-medium">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === selectedIndex
                  ? "bg-gradient-to-r from-[#f15A24] to-orange-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            {[
              "Intuitive mobile-first design",
              "Seamless user experience",
              "Professional networking made simple",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <p className="text-gray-600 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesScreenshotsSection;
