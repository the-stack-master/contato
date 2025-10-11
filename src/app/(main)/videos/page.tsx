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
} from "lucide-react";
import { cn } from "@/utils/classNames";
import VideoPlayer from "@/components/ui/VideoPlayer";

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

const categories = [
  { id: "all", label: "All Videos", icon: PlayCircle },
  { id: "demo", label: "Product Demos", icon: Smartphone },
  { id: "feature", label: "Feature Deep Dives", icon: Sparkles },
  { id: "tutorial", label: "Tutorials", icon: Users },
];

const PAGE_SIZE = 5;

const VideosSection = () => {
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
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-100/50 px-6 py-3 rounded-full mb-8">
            <Play className="w-5 h-5 text-[#f15A24]" />
            <span className="text-[#f15A24] font-semibold">Video Library</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            See Connecto <br />
            <span className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent">
              in action
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Explore our comprehensive video library featuring product demos,
            tutorials, success stories, and feature deep-dives.
          </p>
        </div>

        {/* Featured Videos */}
        {featuredVideos.length > 0 && (
          <div className="lg:w-1/2">
            <div className="text-center mb-8 lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Featured Videos
              </h2>
              <p className="text-lg text-gray-600">Our most popular content</p>
            </div>

            <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
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

              {featuredVideos.length > 1 && (
                <>
                  <Button
                    onClick={prevFeatured}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 border border-white/30"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </Button>
                  <Button
                    onClick={nextFeatured}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 border border-white/30"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Grid Videos */}
      <section className="relative py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-row gap-4 justify-start items-center mb-8 w-full overflow-x-auto">
          <div className="relative flex-none min-w-[280px] max-w-[400px] flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-4 w-full bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f15A24]/20 focus:border-[#f15A24]"
            />
          </div>

          {/* <div className="flex gap-2 justify-start flex-none max-w-[600px]">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className={cn(
                  "h-12 px-6 rounded-2xl font-medium",
                  selectedCategory === category.id
                    ? "bg-[#f15A24] text-white shadow-lg"
                    : "border-gray-200 hover:border-[#f15A24] hover:text-[#f15A24]"
                )}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div> */}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              <VideoPlayer
                video={video}
                isPlaying={gridPlaying === video._id}
                onPlayToggle={() =>
                  setGridPlaying(gridPlaying === video._id ? null : video._id)
                }
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium uppercase text-[#f15A24]">
                    {video.category?.title || "General"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {video.duration}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <Button
              onClick={loadMore}
              className="
                px-8 py-3
                bg-gradient-to-r from-[#f15A24] to-[#ff7f50] 
                text-white font-semibold 
                rounded-lg shadow-md 
                hover:shadow-lg hover:scale-105 
                transition-transform duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f15A24]
              "
            >
              Load More
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default VideosSection;
