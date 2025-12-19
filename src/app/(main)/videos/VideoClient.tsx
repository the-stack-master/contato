"use client";

import { useState, useEffect, useRef } from "react";
import { client } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import {
  Play,
  PlayCircle,
  Users,
  Smartphone,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/utils/classNames";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { VideoHeaderText } from "@/types/videoTypes";
import { Input } from "@/components/ui/input";

export type SanityImage = {
  asset: { _id: string; url: string };
  alt?: string;
};

export type Video = {
  _id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  videoFile?: { asset: { url: string } };
  duration?: string;
  views?: string;
  likes?: string;
  category?: { _id: string; title: string };
  isFeatured?: boolean;
  tags?: string[];
  thumbnails?: (SanityImage | { url: string; alt?: string })[];
};

const PAGE_SIZE = 5;

interface VideoClientProps {
  videoHeaderData: VideoHeaderText | null;
}

const VideoClient = ({ videoHeaderData }: VideoClientProps) => {
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [featuredPlaying, setFeaturedPlaying] = useState<string | null>(null);
  const [gridPlaying, setGridPlaying] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalVideos, setTotalVideos] = useState(0);

  // Fetch featured videos
  const fetchFeaturedVideos = async () => {
    const query = `*[_type=="video" && isFeatured==true] | order(_createdAt desc){
      _id,
      title,
      description,
      videoUrl,
      videoFile{ asset-> },
      duration,
      views,
      likes,
      category->{ _id, title },
      tags,
      thumbnails[]{ _type == "image" => { asset->, alt }, _type == "externalThumbnail" => { url, alt } }
    }`;
    const data: Video[] = await client.fetch(query);
    setFeaturedVideos(data);
  };

  // Fetch total count for current filter/search
  const fetchTotalCount = async (search: string, category: string) => {
    let filter = "true";
    if (category !== "all")
      filter += ` && category->.title match "${category}"`;
    if (search)
      filter += ` && (title match "*${search}*" || description match "*${search}*" || tags[] match "*${search}*")`;

    const countQuery = `count(*[_type=="video" && ${filter}])`;
    const total: number = await client.fetch(countQuery);
    return total;
  };

  // Fetch grid videos
  const fetchVideos = async (
    pageNumber: number = 1,
    search: string = "",
    category: string = "all",
    append: boolean = false
  ) => {
    const start = (pageNumber - 1) * PAGE_SIZE;
    const end = pageNumber * PAGE_SIZE;

    let filter = "true";
    if (category !== "all")
      filter += ` && category->.title match "${category}"`;
    if (search)
      filter += ` && (title match "*${search}*" || description match "*${search}*" || tags[] match "*${search}*")`;

    const query = `*[_type=="video" && ${filter}] | order(_createdAt desc) [${start}...${end}] {
      _id,
      title,
      description,
      videoUrl,
      videoFile{ asset-> },
      duration,
      views,
      likes,
      category->{ _id, title },
      tags,
      thumbnails[]{ _type == "image" => { asset->, alt }, _type == "externalThumbnail" => { url, alt } }
    }`;

    const data: Video[] = await client.fetch(query);

    setVideos((prev) => (append ? [...prev, ...data] : data));

    return data;
  };

  // Initial fetch
  useEffect(() => {
    const initialize = async () => {
      fetchFeaturedVideos();
      const total = await fetchTotalCount(searchQuery, selectedCategory);
      setTotalVideos(total);

      const data = await fetchVideos(1, searchQuery, selectedCategory, false);
      setHasMore(data.length < total);
    };
    initialize();
  }, []);

  // Refetch on search/category change
  useEffect(() => {
    const refetch = async () => {
      setPage(1);
      const total = await fetchTotalCount(searchQuery, selectedCategory);
      setTotalVideos(total);

      const data = await fetchVideos(1, searchQuery, selectedCategory, false);
      setHasMore(data.length < total);
    };
    refetch();
  }, [searchQuery, selectedCategory]);

  // Featured carousel auto-play
  useEffect(() => {
    if (!featuredPlaying && featuredVideos.length > 0) {
      const interval = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % featuredVideos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredVideos, featuredPlaying]);

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredVideos.length);
    setFeaturedPlaying(null);
  };

  const prevFeatured = () => {
    setFeaturedIndex(
      (prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length
    );
    setFeaturedPlaying(null);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * PAGE_SIZE;

    const data = await fetchVideos(
      nextPage,
      searchQuery,
      selectedCategory,
      true
    );
    setPage(nextPage);

    setHasMore(startIndex + data.length < totalVideos);
  };

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Title + Subtitle */}
      <section className="relative">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white to-white pointer-events-none" />

        <div
          className="
      relative
      max-w-7xl mx-auto
      px-6 py-12
      grid grid-cols-1 lg:grid-cols-2
      gap-10
      items-start
    "
        >
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            {/* Pill */}
            <div
              className="
          inline-flex w-fit items-center gap-2
          bg-[#f15A24]/10
          px-4 py-2
          rounded-full
          mb-5
          mx-auto lg:mx-0
        "
            >
              <Play className="w-4 h-4 !text-[#f15A24]" />
              <span className="text-sm font-semibold !text-[#f15A24]">
                {videoHeaderData?.title}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-black !text-gray-900 leading-tight mb-3 mt-5">
              {videoHeaderData?.mainHeading}
              <br />
              <span className="!text-[#f15A24]">
                {videoHeaderData?.highlightedText}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg !text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {videoHeaderData?.description}
            </p>
          </div>

          {/* RIGHT – FEATURED VIDEO */}
          {featuredVideos.length > 0 && (
            <div className="flex flex-col items-center lg:items-start">
              {/* Heading aligned with pill */}
              <h2 className="text-lg font-semibold !text-gray-900 mb-3">
                Featured Videos
              </h2>

              {/* Constrained video container */}
              <div
                className="
            relative
            w-full
            max-w-[480px]
            aspect-video
            rounded-2xl
            overflow-hidden
            bg-white
            border border-gray-200
            shadow-md
          "
              >
                <VideoPlayer
                  video={featuredVideos[featuredIndex]}
                  isPlaying={
                    featuredPlaying === featuredVideos[featuredIndex]._id
                  }
                  onPlayToggle={() =>
                    setFeaturedPlaying(
                      featuredPlaying === featuredVideos[featuredIndex]._id
                        ? null
                        : featuredVideos[featuredIndex]._id
                    )
                  }
                />

                {/* Controls */}
                {featuredVideos.length > 1 && (
                  <>
                    <button
                      onClick={prevFeatured}
                      aria-label="Previous video"
                      className="
                  absolute left-3 top-1/2 -translate-y-1/2
                  z-10
                  flex items-center justify-center
                  w-10 h-10
                  rounded-full
                  bg-black/50 backdrop-blur-sm
                  hover:bg-black/70
                  transition
                  cursor-pointer
                "
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>

                    <button
                      onClick={nextFeatured}
                      aria-label="Next video"
                      className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  z-10
                  flex items-center justify-center
                  w-10 h-10
                  rounded-full
                  bg-black/50 backdrop-blur-sm
                  hover:bg-black/70
                  transition
                  cursor-pointer
                "
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid Videos */}
      <section className="relative py-16 px-6 max-w-7xl mx-auto">
        {/* Search */}
        <div className="mb-12 flex justify-center">
          <div
            className="
        relative w-full max-w-xl
        bg-white/80 backdrop-blur
        rounded-2xl
        border border-gray-200
        shadow-sm
      "
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos…"
              className="
          h-14 pl-12 pr-12
          
        "
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-[#f15A24]
            transition
          "
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video._id}
              className="
          group bg-white rounded-2xl overflow-hidden
          border border-gray-200
          shadow-sm hover:shadow-xl
          transition-all duration-300
          hover:-translate-y-1
        "
            >
              <VideoPlayer
                video={video}
                isPlaying={gridPlaying === video._id}
                onPlayToggle={() =>
                  setGridPlaying(gridPlaying === video._id ? null : video._id)
                }
              />

              <div className="p-6 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase !text-[#f15A24]">
                    {video.category?.title || "General"}
                  </span>
                  <span className="!text-xs text-gray-500">
                    {video.duration}
                  </span>
                </div>

                <h3 className="mt-3">{video.title}</h3>

                <p className="!text-sm !text-gray-600 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 text-center">
            <Button variant={"primary"} onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default VideoClient;
