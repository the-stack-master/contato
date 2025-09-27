"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, User, Clock } from "lucide-react";

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

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  author?: string;
  category?: string;
  readTime?: string;
  image?: string;
};

const POSTS_PER_PAGE = 1;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = async (pageNumber: number, replace = false) => {
    setLoading(true);
    const start = (pageNumber - 1) * POSTS_PER_PAGE;

    // Fetch posts
    const query = `*[_type == "blog" ${
      searchQuery
        ? `&& (title match "${searchQuery}*" || description match "${searchQuery}*")`
        : ""
    }] | order(publishedAt desc) [${start}...${start + POSTS_PER_PAGE}]{
      _id,
      title,
      slug,
      description,
      publishedAt,
      "image": mainImage.asset->url,
      "author": author->name,
      "category": category->title,
      readTime
    }`;

    // Fetch total count
    const countQuery = `count(*[_type == "blog" ${
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
    fetchPosts(1, true); // replace posts on initial load or search
  }, [searchQuery]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchPosts(nextPage);
    setPage(nextPage);
  };

  const categories = [
    "All Posts",
    "Networking",
    "Career Growth",
    "Remote Work",
    "Industry Insights",
    "Success Stories",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 lg:py-32 bg-white"
        style={{
          background: "linear-gradient(135deg, #fff 75%, #ffe6d9 100%)",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
              Contato{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #f15A24, #ff7f50)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Unlock the power of meaningful connections with expert insights,
              practical tips, and inspiring stories.
            </p>
            <div className="relative max-w-lg mx-auto group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#f15A24] h-5 w-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Discover amazing content..."
                className="pl-12 h-14 text-lg border-2 border-[#f15A24]/10 bg-white/80 rounded-2xl shadow-lg"
              />
              <Button
                size="sm"
                className="absolute right-2 top-2 bottom-2 px-4 rounded-xl shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #f15A24, #ff7f50)",
                  color: "white",
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-[#FFF4ED]/90 border-b border-[#f15A24]/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All Posts" ? "default" : "outline"}
                className={`rounded-full px-6 py-2 ${
                  category === "All Posts"
                    ? "bg-[#f15A24] text-white"
                    : "border-[#f15A24]/30 text-[#f15A24]"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24 bg-[#FFF4ED]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group cursor-pointer w-full max-w-sm"
              >
                <Card className="overflow-hidden border-0 rounded-3xl">
                  <div
                    className="h-52 relative bg-cover bg-center rounded-t-3xl"
                    style={{
                      backgroundImage: `url(${
                        post.image || "/api/placeholder/400/300"
                      })`,
                    }}
                  />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="border-[#f15A24]/30 text-[#f15A24] bg-[#f15A24]/5">
                        {post.category || "General"}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        {post.readTime || "5 min read"}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-6 line-clamp-2 text-gray-700">
                      {post.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-[#f15A24]" />
                        {post.author || "Unknown"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toDateString()}
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
