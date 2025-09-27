"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  PlayCircle,
  Users,
  MessageCircle,
  Smartphone,
  Sparkles,
  Search,
  Clock,
  Eye,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/utils/classNames";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  category: "demo" | "tutorial" | "testimonial" | "feature";
  featured: boolean;
  tags: string[];
  src?: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Connecto App Overview - Complete Demo",
    description:
      "Get a comprehensive overview of all Connecto features in this 5-minute demo. See how AI-powered matching transforms professional networking.",
    thumbnail:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "5:24",
    views: "125K",
    likes: "3.2K",
    category: "demo",
    featured: true,
    tags: ["overview", "demo", "features"],
    src: "https://www.w3schools.com/html/mov_bbb.mp4", // sample video
  },
  {
    id: "2",
    title: "AI Matching Algorithm Explained",
    description:
      "Discover how our advanced AI connects you with the most relevant professionals based on your goals and interests.",
    thumbnail:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "3:45",
    views: "89K",
    likes: "2.1K",
    category: "feature",
    featured: false,
    tags: ["AI", "matching", "algorithm"],
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "3",
    title: "Success Story: Sarah's Networking Journey",
    description:
      "Watch how Sarah expanded her professional network by 300% using Connecto's smart features and landed her dream job.",
    thumbnail:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "4:12",
    views: "67K",
    likes: "1.8K",
    category: "testimonial",
    featured: true,
    tags: ["success", "testimonial", "career"],
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "4",
    title: "Smart Scheduling Tutorial",
    description:
      "Learn how to effortlessly schedule meetings and coffee chats with integrated calendar management.",
    thumbnail:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "2:58",
    views: "45K",
    likes: "1.2K",
    category: "tutorial",
    featured: false,
    tags: ["scheduling", "calendar", "meetings"],
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "5",
    title: "Network Analytics Dashboard",
    description:
      "Explore your networking insights with detailed analytics and growth recommendations.",
    thumbnail:
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "3:33",
    views: "38K",
    likes: "956",
    category: "feature",
    featured: false,
    tags: ["analytics", "insights", "dashboard"],
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "6",
    title: "Location-Based Networking",
    description:
      "Find professionals nearby and discover local networking events with our location intelligence.",
    thumbnail:
      "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "4:07",
    views: "52K",
    likes: "1.4K",
    category: "feature",
    featured: false,
    tags: ["location", "events", "nearby"],
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const categories = [
  { id: "all", label: "All Videos", icon: PlayCircle },
  { id: "demo", label: "Product Demos", icon: Smartphone },
  { id: "feature", label: "Feature Deep Dives", icon: Sparkles },
  { id: "tutorial", label: "Tutorials", icon: Users },
  { id: "testimonial", label: "Success Stories", icon: MessageCircle },
];

const VideosSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const featuredVideos = videos.filter((video) => video.featured);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "all" || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setVisibleSections((prev) => [...new Set([...prev, id])]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPlaying === null) {
      const interval = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % featuredVideos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [featuredVideos.length, isPlaying]);

  const isVisible = (sectionId: string) => visibleSections.includes(sectionId);

  const handlePlayVideo = (videoId: string) => {
    if (isPlaying === videoId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(videoId);
    }
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredVideos.length);
    setIsPlaying(null);
  };

  const prevFeatured = () => {
    setFeaturedIndex(
      (prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length
    );
    setIsPlaying(null);
  };

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#f15A24]/5 to-orange-300/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-red-300/5 to-[#f15A24]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-200/5 to-red-200/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Title + Subtitle */}
      <section
        className={cn(
          "max-w-6xl mx-auto text-center transition-all duration-1000 transform pt-20 pb-16 px-6",
          isVisible("title")
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        )}
        data-section="title"
      >
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-100/50 px-6 py-3 rounded-full mb-8">
          <Play className="w-5 h-5 text-[#f15A24]" />
          <span className="text-[#f15A24] font-semibold">Video Library</span>
        </div>

        <h1 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
          See Connecto
          <br />
          <span className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent">
            in action
          </span>
        </h1>

        <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Explore our comprehensive video library featuring product demos,
          tutorials, success stories, and feature deep-dives.
        </p>
      </section>

      {/* Featured Videos Carousel */}
      <section
        className={cn(
          "relative py-16 px-6 max-w-7xl mx-auto transition-all duration-1000 transform",
          isVisible("featured")
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        )}
        data-section="featured"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Videos
          </h2>
          <p className="text-xl text-gray-600">
            Our most popular and impactful content
          </p>
        </div>

        <div className="relative">
          {/* Main Featured Video */}
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl mb-8">
            <div className="aspect-video bg-gray-900 relative">
              {isPlaying === featuredVideos[featuredIndex]?.id ? (
                <video
                  src={featuredVideos[featuredIndex]?.src}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  onEnded={() => setIsPlaying(null)}
                />
              ) : (
                <img
                  src={featuredVideos[featuredIndex]?.thumbnail}
                  alt={featuredVideos[featuredIndex]?.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Overlay & Play Button */}
              {isPlaying !== featuredVideos[featuredIndex]?.id && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      onClick={() =>
                        handlePlayVideo(featuredVideos[featuredIndex]?.id)
                      }
                      className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50 transition-all duration-300 hover:scale-110 group-hover:scale-125"
                    >
                      <Play className="w-10 h-10 text-white ml-1" />
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-[#f15A24] px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {featuredVideos[featuredIndex]?.category}
                </span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredVideos[featuredIndex]?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{featuredVideos[featuredIndex]?.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{featuredVideos[featuredIndex]?.likes}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-3">
                {featuredVideos[featuredIndex]?.title}
              </h3>
              <p className="text-lg text-white/90 max-w-3xl">
                {featuredVideos[featuredIndex]?.description}
              </p>
            </div>

            {/* Navigation Arrows */}
            <Button
              onClick={prevFeatured}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </Button>
            <Button
              onClick={nextFeatured}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Featured Video Indicators */}
        <div className="flex justify-center space-x-2">
          {featuredVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => setFeaturedIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === featuredIndex
                  ? "bg-[#f15A24] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </section>

      {/* All Videos with Search and Categories */}
      <section className="relative py-16 px-6">
        <div
          className={cn(
            "max-w-7xl mx-auto transition-all duration-1000 transform",
            isVisible("grid")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
          data-section="grid"
        >
          <div className="flex flex-row gap-4 justify-start items-center mb-8 w-full overflow-x-auto">
            {/* Search */}
            <div className="relative flex-none min-w-[280px] max-w-[400px] flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 w-full bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f15A24]/20 focus:border-[#f15A24] transition-all duration-200"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 justify-start flex-none max-w-[600px]">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className={cn(
                    "h-12 px-6 rounded-2xl font-medium transition-all duration-200 hover:scale-105",
                    selectedCategory === category.id
                      ? "bg-[#f15A24] hover:bg-[#f15A24]/90 text-white shadow-lg"
                      : "border-gray-200 hover:border-[#f15A24] hover:text-[#f15A24]"
                  )}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* All Videos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  {isPlaying === video.id ? (
                    <video
                      src={video.src}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlaying(null)}
                    />
                  ) : (
                    <>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          onClick={() => handlePlayVideo(video.id)}
                          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/50 transition-all duration-200 hover:scale-110"
                        >
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium uppercase text-[#f15A24]">
                      {video.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {video.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {video.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
                    <span>{video.views} views</span>
                    <span>{video.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideosSection;
