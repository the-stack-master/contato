"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, User, Clock, X } from "lucide-react";

import { client } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPageHeader, BlogPost } from "@/types/blogTypes";
import { splitSentence } from "@/utils/stringFunctions";

const POSTS_PER_PAGE = 6;

interface BlogClientProps {
  blogHeaderData: BlogPageHeader | null;
}

export default function BlogClient({ blogHeaderData }: BlogClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = async (pageNumber: number, replace = false) => {
    setLoading(true);
    const start = (pageNumber - 1) * POSTS_PER_PAGE;

    const query = `*[_type == "article" ${
      searchQuery
        ? `&& (title match "${searchQuery}*" || description match "${searchQuery}*")`
        : ""
    }] | order(publishedAt desc) [${start}...${start + POSTS_PER_PAGE}]{
      _id, title, slug, author, publishedDate,
      excerpt, mainImage{ asset->, alt }, category, readingTime
    }`;

    const countQuery = `count(*[_type == "article" ${
      searchQuery
        ? `&& (title match "${searchQuery}*" || description match "${searchQuery}*")`
        : ""
    }])`;

    const [newPosts, totalCount]: [BlogPost[], number] = await Promise.all([
      client.fetch(query),
      client.fetch(countQuery),
    ]);

    setPosts((prev) => (replace ? newPosts : [...prev, ...newPosts]));
    setTotalPosts(totalCount);
    setHasMore(
      (pageNumber - 1) * POSTS_PER_PAGE + newPosts.length < totalCount
    );
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchPosts(1, true);
  }, [searchQuery]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchPosts(nextPage);
    setPage(nextPage);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 bg-white">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            {splitSentence(blogHeaderData?.heading, 2)?.firstPart}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f15A24, #ff7f50)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {splitSentence(blogHeaderData?.heading, 2)?.secondPart}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {blogHeaderData?.subHeading}
          </p>
        </div>
      </section>

      {/* Search + Posts Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Search Icon / Bar */}
          <div className="flex justify-end mb-10">
            {!searchOpen ? (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-3 rounded-full bg-gradient-to-r from-[#f15A24] to-[#ff7f50] text-white shadow-md hover:scale-105 transition"
                aria-label="Open Search"
              >
                <Search className="h-6 w-6" />
              </button>
            ) : (
              <div className="relative w-full max-w-lg transition-all duration-300">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="pl-12 h-14 text-lg border-2 border-[#f15A24]/10 bg-white/90 rounded-2xl shadow-lg"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f15A24]" />
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f15A24]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden border-0 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div
                    className="h-44 relative bg-cover bg-center rounded-t-2xl"
                    style={{
                      backgroundImage: `url(${
                        post.mainImage?.asset?.url || "/api/placeholder/400/300"
                      })`,
                    }}
                  />
                  <CardHeader className="pb-2 px-4 pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="border-[#f15A24]/30 text-[#f15A24] bg-[#f15A24]/5 text-xs px-2 py-0.5">
                        {post.category?.title || "General"}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {post.readingTime || "5 min read"}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-snug group-hover:text-[#f15A24] transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-1 px-4 pb-4">
                    <CardDescription className="mb-3 line-clamp-2 text-gray-700 text-sm">
                      {post?.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-[#f15A24]" />
                        {post.author || "Unknown"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedDate).toDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-12 text-center">
              <Button
                onClick={loadMore}
                className="rounded-xl px-8 py-3 bg-gradient-to-r from-[#f15A24] to-[#ff7f50] text-white"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
