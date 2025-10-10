"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export type VideoResource = {
  title?: string;
  videoFile?: { asset: { url: string } };
  videoUrl?: string;
  thumbnails?: { asset?: { url: string }; url?: string }[];
};

type VideoPlayerProps = {
  video: VideoResource;
  isPlaying: boolean;
  onPlayToggle: () => void;
  className?: string;
};

const VideoPlayer = ({
  video,
  isPlaying,
  onPlayToggle,
  className,
}: VideoPlayerProps) => {
  const getVideoUrl = (): string | undefined => {
    if (video.videoFile?.asset?.url) return video.videoFile.asset.url;

    if (video.videoUrl && video.videoUrl.includes("youtube.com")) {
      const videoId = new URL(video.videoUrl).searchParams.get("v");
      if (videoId)
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    if (video.videoUrl && video.videoUrl.includes("youtu.be")) {
      const videoId = video.videoUrl.split("/").pop();
      if (videoId)
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    return undefined;
  };

  const getThumbnailUrl = (): string => {
    const thumb = video.thumbnails?.[0];
    if (!thumb) return "/placeholder.jpg";
    if ("asset" in thumb && thumb.asset?.url) return thumb.asset.url;
    if ("url" in thumb && typeof thumb.url === "string")
      return thumb.url as string;
    return "/placeholder.jpg";
  };

  return (
    <div className={`relative aspect-video bg-gray-900 ${className}`}>
      {isPlaying ? (
        video.videoFile?.asset?.url ? (
          <video
            src={getVideoUrl()}
            controls
            autoPlay
            className="w-full h-full object-cover"
            onEnded={onPlayToggle}
          />
        ) : (
          <iframe
            src={getVideoUrl()}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )
      ) : (
        <>
          <img
            src={getThumbnailUrl()}
            alt={video.title || "Video thumbnail"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={onPlayToggle}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/50"
            >
              <Play className="w-6 h-6 text-white" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
