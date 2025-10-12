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
import { PortableTextBlock } from "@portabletext/react";
import { BlogPageHeader } from "@/types/blogTypes";
import { splitSentence } from "@/utils/stringFunctions";

export type SanityImage = {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
  caption?: string;
};

export type Category = {
  title?: "string";
  description?: "string";
};

export type BlogPost = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  tagline?: string;
  slug: { current: string };
  author?: string;
  publishedDate: string;
  excerpt?: string;
  mainImage?: SanityImage;
  subImages?: SanityImage[];
  body: PortableTextBlock[];
  tags?: string[];
  category?: Category;
  readingTime?: string;
  isFeatured?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

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
  const [totalPosts, setTotalPosts] = useState(0);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);

  const fetchPosts = async (pageNumber: number, replace = false) => {
    setLoading(true);
    const start = (pageNumber - 1) * POSTS_PER_PAGE;

    const query = `*[_type == "article" ${
      searchQuery
        ? `&& (title match "${searchQuery}*" || description match "${searchQuery}*")`
        : ""
    }] | order(publishedAt desc) [${start}...${start + POSTS_PER_PAGE}]{
      _id, _createdAt, _updatedAt, title, tagline, slug, author, publishedDate,
      excerpt, mainImage{ asset->, alt, caption }, subImages[]{ asset->, alt, caption },
      body, tags, category, readingTime, isFeatured, seo
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

  const fetchFeaturedPosts = async () => {
    const query = `*[_type == "article" && isFeatured == true] | order(publishedDate desc){
      _id, _createdAt, _updatedAt, title, tagline, slug, author, publishedDate,
      excerpt, mainImage{ asset->, alt, caption }, subImages[]{ asset->, alt, caption },
      body, tags, category, readingTime, isFeatured, seo
    }`;

    const featuredPosts: BlogPost[] = await client.fetch(query);
    setFeaturedPosts(featuredPosts);
  };

  useEffect(() => {
    setPage(1);
    fetchPosts(1, true);
    fetchFeaturedPosts();
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
      <section className="relative overflow-hidden py-5 lg:py-10 bg-white">
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
          <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
            {blogHeaderData?.subHeading}
          </p>
        </div>
      </section>

      {/* Main Section: Search + Categories + Posts + Sidebar */}
      <section className="py-5 lg:py-5 ">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Column: Search + Categories + Posts */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="relative max-w-xl mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f15A24] h-5 w-5" />
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

            {/* Posts */}
            <div className="grid sm:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden border-0 rounded-2xl">
                    {/* Reduce hero height */}
                    <div
                      className="h-40 relative bg-cover bg-center rounded-t-2xl"
                      style={{
                        backgroundImage: `url(${
                          post.mainImage?.asset?.url ||
                          "/api/placeholder/400/300"
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
                      <CardTitle className="text-lg leading-snug">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-1 px-4">
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

          {/* Right Sidebar: Featured Posts */}
          <aside className="lg:col-span-1">
            {featuredPosts?.length > 0 && (
              <div className="sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Featured Posts
                </h2>
                <div className="space-y-6">
                  {featuredPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className="block group"
                    >
                      <Card className="overflow-hidden border  border-transparent rounded-2xl shadow-sm">
                        <div
                          className="h-32 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${
                              post.mainImage?.asset?.url ||
                              "/api/placeholder/200/150"
                            })`,
                          }}
                        />
                        <CardHeader className="p-4">
                          <CardTitle className="text-base line-clamp-2 group-hover:text-[#f15A24] transition-colors">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
