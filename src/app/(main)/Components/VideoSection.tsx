"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { Users, BarChart, Lightbulb, ClipboardList } from "lucide-react";

const VideoSection = () => {
  const [currentVideo, setCurrentVideo] = useState(
    "https://www.youtube.com/watch?v=pVlmaFwOZgk"
  );

  const videos = [
    {
      url: "https://www.youtube.com/watch?v=pVlmaFwOZgk",
      title: "Video 2",
      thumbnail: "https://img.youtube.com/vi/pVlmaFwOZgk/hqdefault.jpg",
    },
    {
      url: "https://www.youtube.com/watch?v=Qmfs-zCnlqI",
      title: "Video 1",
      thumbnail: "https://img.youtube.com/vi/Qmfs-zCnlqI/hqdefault.jpg",
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Intro to Our Platform",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    },
    {
      url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      title: "How It Works",
      thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/mqdefault.jpg",
    },
    {
      url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      title: "Behind the Scenes",
      thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg",
    },
    {
      url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      title: "Customer Stories",
      thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/mqdefault.jpg",
    },
  ];

  const getYouTubeId = (url: string) => {
    const match = url.match(/[?&]v=([^&#]*)/);
    return match ? match[1] : "";
  };

  // --- Height sync for video player and left panel
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const handleResize = () => {
      if (videoWrapperRef.current) {
        setVideoHeight(videoWrapperRef.current.getBoundingClientRect().height);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentVideo]);

  return (
    <div className="w-full px-2 sm:px-6 lg:px-12 py-6 sm:py-12 bg-gray-50">
      <div className="w-full px-2 sm:px-6 lg:px-12 py-6 sm:py-12 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
          {/* Left Content - always matches the height of video player */}
          <div
            className="lg:col-span-5 flex flex-col justify-start space-y-6 sm:space-y-8 p-4 sm:p-8 bg-white rounded-2xl shadow-[0_8px_24px_rgb(241,90,36,0.12)] border border-[#f15A2466] overflow-y-auto"
            style={videoHeight ? { height: `${videoHeight}px` } : undefined}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Learn More About Our Platform
            </h2>
            <p className="text-gray-700 text-base sm:text-lg max-w-prose">
              Discover how our platform empowers teams to work smarter, scale
              faster, and deliver results like never before. Watch our curated
              video collection.
            </p>
            <ul className="max-w-md space-y-3 sm:space-y-4">
              {[
                {
                  icon: Users,
                  text: "Boost team collaboration and productivity.",
                },
                {
                  icon: BarChart,
                  text: "Gain actionable insights from data-driven analytics.",
                },
                {
                  icon: Lightbulb,
                  text: "Explore real-world success stories and case studies.",
                },
                {
                  icon: ClipboardList,
                  text: "Learn step-by-step how to maximize platform potential.",
                },
              ].map(({ icon: IconComponent, text }, idx) => (
                <li
                  key={idx}
                  className="flex items-center space-x-2 sm:space-x-3 text-gray-800 list-none transition-transform duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-[#f15A24]">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <button className="w-fit bg-gradient-to-r from-[#f15A24] to-[#d04f23] hover:from-[#d04f23] hover:to-[#f15A24] text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] text-base sm:text-lg">
              Get Started
            </button>
          </div>
          {/* Right Content - reference wrapper for measurement */}
          <div className="lg:col-span-7 w-full flex items-center">
            <div
              className="aspect-video rounded-xl overflow-hidden shadow-lg w-full"
              ref={videoWrapperRef}
            >
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(
                  currentVideo
                )}`}
                title="YouTube video player"
                allowFullScreen
                className="w-full h-full"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
        {/* Playlist Thumbnails */}
        <div className="mt-6 sm:mt-10 bg-gray-100 p-4 sm:p-6 rounded-xl shadow-inner">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
            Playlist
          </h3>
          <div className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {videos.map((video, index) => (
              <div
                key={index}
                className={`flex-none w-36 sm:w-48 cursor-pointer group ${
                  currentVideo === video.url
                    ? "opacity-100"
                    : "opacity-80 hover:opacity-100"
                }`}
                onClick={() => setCurrentVideo(video.url)}
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-700 font-medium truncate">
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
