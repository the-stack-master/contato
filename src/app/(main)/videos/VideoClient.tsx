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
import useEmblaCarousel from "embla-carousel-react";

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

  const [featuredRef, featuredApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [featuredSnaps, setFeaturedSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!featuredApi) return;

    setFeaturedSnaps(featuredApi.scrollSnapList());
    setFeaturedIndex(featuredApi.selectedScrollSnap());

    featuredApi.on("select", () => {
      setFeaturedIndex(featuredApi.selectedScrollSnap());
    });
  }, [featuredApi]);



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
      <section className="relative py-12 bg-gradient-to-b from-orange-50/60 to-white">
        {/* Subtle background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white to-white pointer-events-none" /> */}

        <div
          className="
      flex
      items-center
      justify-center
      
    "
        >
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center items-center !text-center">

            {/* Heading */}
            <h1 className="!font-bold !text-gray-900 leading-tight mb-3 mt-5 !text-center">
              {videoHeaderData?.mainHeading}&nbsp;
              <span className="!text-[#f15A24] font-extrabold">
                {videoHeaderData?.highlightedText}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg !text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center px-8">
              {videoHeaderData?.description}
            </p>
          </div>


        </div>
      </section>

      {/* Grid Videos */}
      <section className="relative pb-16 px-6 max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* LEFT – VIDEOS SECTION (8 cols on md+) */}
          <div className="md:col-span-8">
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
                  className="h-14 pl-16 pr-16"
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      setGridPlaying(
                        gridPlaying === video._id ? null : video._id
                      )
                    }
                  />

                  <div className="p-6 mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase text-[#f15A24]">
                        {video.category?.title || "General"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {video.duration}
                      </span>
                    </div>

                    <h3 className="mt-3">{video.title}</h3>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-12 text-center">
                <Button variant="primary" onClick={loadMore}>
                  Load More
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT – FEATURED VIDEOS (4 cols on md+) */}
          <div className="md:col-span-4">
            {featuredVideos.length > 0 && (
              <div className="flex flex-col items-center lg:items-start">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Featured Videos
                </h2>

                {/* Embla carousel */}
                <div
                  ref={featuredRef}
                  className="relative w-full max-w-[480px] overflow-hidden"
                >
                  <div className="flex">
                    {featuredVideos.map((video) => (
                      <div
                        key={video._id}
                        className="flex-[0_0_100%] px-1"
                      >
                        <div
                          className="
                  aspect-video
                  rounded-2xl
                  overflow-hidden
                  bg-white
                  border border-gray-200
                  shadow-md
                "
                        >
                          <VideoPlayer
                            video={video}
                            isPlaying={featuredPlaying === video._id}
                            onPlayToggle={() =>
                              setFeaturedPlaying(
                                featuredPlaying === video._id ? null : video._id
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots */}
                {featuredSnaps.length > 1 && (
                  <div className="flex gap-2 mt-4 w-full justify-center">
                    {featuredSnaps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => featuredApi?.scrollTo(index)}
                        className={`
                w-2 h-2 rounded-full transition-all
                ${index === featuredIndex
                            ? "bg-[#f15A24] scale-125"
                            : "bg-gray-300"}
              `}
                        aria-label={`Go to featured video ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>


        </div>
      </section>

    </div>
  );
};

export default VideoClient;
