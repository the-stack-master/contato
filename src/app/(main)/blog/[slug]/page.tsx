/* eslint-disable @typescript-eslint/no-explicit-any */

// app/(main)/blog/[slug]/page.tsx
import { client, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, Clock, Tag, MessageCircle } from "lucide-react";
import Link from "next/link";
import { SanityImage } from "../page";
import { BlogPost } from "../page"; // your updated type

interface PageProps {
  params: { slug: string };
}

// Generate static paths
export async function generateStaticParams() {
  const query = `*[_type == "article" && defined(slug.current)]{"slug": slug.current}`;
  const slugs: { slug: string }[] = await client.fetch(query);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;

  const query = `*[_type == "article" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    tagline,
    slug,
    author->{name, "image": image.asset, role, bio},
    publishedDate,
    excerpt,
    mainImage,
    subImages,
    body,
    tags,
    category->{name, color},
    readingTime,
    isFeatured,
    seo
  }`;

  const post: BlogPost | null = await client.fetch(query, { slug });
  if (!post) notFound();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-white relative">
      {/* Back Button - fully left aligned */}
      <div className="absolute top-8 left-6 z-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-500 rounded-lg text-orange-500 shadow-sm hover:bg-orange-100 hover:scale-105 transition-all font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Blog
        </Link>
      </div>

      {/* Hero Section + Category/Meta/Title/Excerpt/Tags */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden text-left">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Optional Category and Meta */}
          {post.category && (
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-orange-500">
                {post.category?.title}
              </span>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDate(post.publishedDate)}
                  </span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{post.readingTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Tagline / Excerpt */}
          {post.tagline && (
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              {post.tagline}
            </p>
          )}

          {/* Tags (directly under heading/subheading) */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-4 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900">{post.author}</h3>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Image - width matches content */}
      {post.mainImage && (
        <section className="-mt-8 px-6 relative z-10">
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </section>
      )}

      {/* Article Content + Separator */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-left">
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }) => {
                    if (!value?.asset?._ref) return null;
                    return (
                      <img
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || "Blog Image"}
                        className="my-6 rounded-xl w-full object-cover"
                      />
                    );
                  },
                },
              }}
            />
          </div>
          {/* End-of-post separator */}
          <div className="my-10 flex items-center justify-center">
            <span className="w-16 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
