"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { Users, BarChart, Lightbulb, ClipboardList } from "lucide-react";
import { PlatformLearning } from "@/types/homeTypes";
import useNavigate from "@/hooks/useNavigate";
import { Video } from "@/types/videoTypes";
import VideoPlayer from "@/components/ui/VideoPlayer";

interface VideoSectionProps {
  videoData: PlatformLearning | null;
  videoList: Video[] | null;
}

const VideoSection = ({ videoData, videoList }: VideoSectionProps) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const firstVideo = videoList?.length ? videoList[0] : null;
  const [currentVideo, setCurrentVideo] = useState<Video | null>(firstVideo);

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

  const getIcons = (iconName?: string) => {
    switch (iconName) {
      case "users":
        return <Users className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "chart":
        return <BarChart className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "map":
        return <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "book":
        return <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const handleNavVideo = () => {
    navigate("/videos");
  };

  // Determine which URL to pass to VideoPlayer
  const getVideoUrl = (video: Video) => {
    if (!video) return "";
    if (video.videoSource === "upload") return video.videoFileUrl ?? "";
    if (video.videoSource === "url") return video.videoUrl ?? "";
    return "";
  };

  console.log("sdsds video data", videoList);

  return (
    <div className="w-full px-2 sm:px-6 lg:px-12 py-6 sm:py-12 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
        {/* Left Content */}
        <div
          className="lg:col-span-5 flex flex-col justify-start space-y-6 sm:space-y-8 p-4 sm:p-8 bg-white rounded-2xl shadow-[0_8px_24px_rgb(241,90,36,0.12)] border border-[#f15A2466] overflow-y-auto"
          style={videoHeight ? { height: `${videoHeight}px` } : undefined}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {videoData?.sectionHeading}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg max-w-prose">
            {videoData?.description}
          </p>
          <ul className="max-w-md space-y-3 sm:space-y-4">
            {videoData?.features?.map(({ icon, title }, idx) => (
              <li
                key={idx}
                className="flex items-center space-x-2 sm:space-x-3 text-gray-800 list-none transition-transform duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-[#f15A24]">
                  {getIcons(icon)}
                </div>
                <span>{title}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleNavVideo}
            className="w-fit bg-gradient-to-r from-[#f15A24] to-[#d04f23] cursor-pointer hover:from-[#d04f23] hover:to-[#f15A24] text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] text-base sm:text-lg"
          >
            Get Started
          </button>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-7 w-full flex items-center">
          <div
            className="aspect-video rounded-xl overflow-hidden shadow-lg w-full"
            ref={videoWrapperRef}
          >
            {currentVideo && (
              <VideoPlayer
                video={{
                  title: currentVideo.title,
                  thumbnails: currentVideo.thumbnails ?? [],
                  // Pass uploaded videos correctly
                  videoFile:
                    currentVideo.videoSource === "upload"
                      ? { asset: { url: currentVideo.videoFileUrl ?? "" } }
                      : undefined,
                  // Pass YouTube videos
                  videoUrl:
                    currentVideo.videoSource === "url"
                      ? currentVideo.videoUrl
                      : undefined,
                }}
                isPlaying={isPlaying}
                onPlayToggle={() => setIsPlaying((prev) => !prev)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Playlist Thumbnails */}
      <div className="mt-6 sm:mt-10 bg-gray-100 p-4 sm:p-6 rounded-xl shadow-inner">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
          Playlist
        </h3>
        <div className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {videoList?.map((video, index) => (
            <div
              key={index}
              className={`flex-none w-36 sm:w-48 cursor-pointer group ${
                currentVideo === video
                  ? "opacity-100"
                  : "opacity-80 hover:opacity-100"
              }`}
              onClick={() => setCurrentVideo(video)}
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition">
                <Image
                  src={video?.thumbnails?.length ? video.thumbnails[0].url : ""}
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
  );
};

export default VideoSection;
