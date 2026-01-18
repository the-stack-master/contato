"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Video } from "@/types/videoTypes";
import { PlatformLearning } from "@/types/homeTypes";
import VideoPlayer from "@/components/ui/VideoPlayer";
import useNavigate from "@/hooks/useNavigate";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface VideoSectionProps {
  videoData?: PlatformLearning | null;
  videoList: Video[] | null;
}

const VideoSection = ({ videoList, videoData }: VideoSectionProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const videoRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const handleNavVideo = useCallback(() => {
    navigate("/videos");
  }, [navigate]);

  // Embla setup
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollNext(emblaApi.canScrollNext());
      setCanScrollPrev(emblaApi.canScrollPrev());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Stop video when out of view
  useEffect(() => {
    if (videoRefs.current.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute("data-index");
          const idx = indexAttr ? parseInt(indexAttr, 10) : null;

          if (idx !== null && !entry.isIntersecting && currentIndex === idx) {
            setCurrentIndex(null);
          }
        });
      },
      { threshold: 0.3 }
    );

    videoRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentIndex]);

  return (
    <section className="w-full px-5 sm:px-10 lg:px-16 py-16 sm:py-12 bg-gray-100 relative">
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {videoData?.sectionHeading}
      </motion.h2>

      <div className="relative">
        {/* Prev button */}
        {canScrollPrev && (
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-105 transition hidden sm:flex"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {videoList?.map((video, idx) => (
              <div
                key={idx}
                data-index={idx}
                ref={(el) => {
                  if (el) videoRefs.current.set(idx, el);
                }}
                className="relative flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_28%] rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-transform duration-300 hover:scale-[1.02] bg-white"
                onClick={() => setCurrentIndex(idx)}
              >
                {currentIndex === idx ? (
                  <div className="aspect-video w-full h-full">
                    <VideoPlayer
                      video={{
                        title: video.title,
                        thumbnails: video.thumbnails ?? [],
                        videoFile:
                          video.videoSource === "upload"
                            ? { asset: { url: video.videoFileUrl ?? "" } }
                            : undefined,
                        videoUrl:
                          video.videoSource === "url"
                            ? video.videoUrl
                            : undefined,
                      }}
                      isPlaying={true}
                      onPlayToggle={() => setCurrentIndex(null)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="relative aspect-video w-full">
                      <Image
                        src={
                          video?.thumbnails?.length
                            ? video.thumbnails[0].url
                            : "/placeholder-video.jpg"
                        }
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="bg-white text-black px-3 py-2 rounded-full text-sm font-semibold shadow">
                          ▶ Play
                        </div>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        {video.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                        {video.description ?? "Learn more about this topic"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Optional See More card (still fine) */}
            <div
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_28%] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.03] transition"
              onClick={handleNavVideo}
            >
              <ChevronRight className="w-10 h-10 text-gray-600 transition" />
              <p className="mt-2 text-gray-700 font-medium">See More</p>
            </div>
          </div>
        </div>

        {/* Next button */}
        {canScrollNext && (
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-105 transition hidden sm:flex"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        )}
      </div>

      {/* Scroll indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-gray-800 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* 🔥 PRIMARY CTA — visible on all devices */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleNavVideo}
          variant="primary"
          size="md"
          className="rounded-full px-8 flex items-center gap-2"
        >
          View all videos
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};

export default VideoSection;
