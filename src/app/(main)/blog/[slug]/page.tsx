/* eslint-disable @typescript-eslint/no-explicit-any */

// app/(main)/blog/[slug]/page.tsx
import { client, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/types/blogTypes";
import { generateSeoMetadata } from "@/lib/generateMetadata";

interface PageProps {
  params: { slug: string };
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const query = `*[_type == "article" && slug.current == $slug][0]{
    _type,
    metaTitle,
    metaDescription,
    canonicalUrl,
    focusKeyword,
    keywords,
    schemaType,
    customSchema,
    slug{ current },
    openGraph{
      title,
      description,
      type,
      siteName,
      image{ asset->{url}, alt }
    },
    noIndex,
    noFollow,
    priority,
    changeFreq
  }`;

  const post: BlogPost | null = await client.fetch(query, {
    slug: params.slug,
  });

  if (!post) return {};

  return generateSeoMetadata(post?.seo);
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
    seo{
    _type,
    metaTitle,
    metaDescription,
    canonicalUrl,
    focusKeyword,
    keywords,
    schemaType,
    customSchema,
    slug{ current },
    openGraph{
      title,
      description,
      type,
      siteName,
      image{ asset->{url}, alt }
    },
    noIndex,
    noFollow,
    priority,
    changeFreq
  },
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
    <div className="min-h-screen bg-white">
      {/* Hero Section + Back Button */}
      <section className="pt-6 pb-16 px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col mt-5">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-500 rounded-lg text-orange-500 shadow-sm hover:bg-orange-100 hover:scale-105 transition-all font-medium w-max"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>

          {/* Category & Meta */}
          {post.category && (
            <div className="flex flex-wrap items-center gap-4 mt-10">
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
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-1 leading-tight">
            {post.title}
          </h1>

          {/* Tagline */}
          {post.tagline && (
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              {post.tagline}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-500 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Blog Image */}
      {post.mainImage && (
        <section className="px-6 -mt-8">
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl">
            <img
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.title}
              className="w-full h-auto object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
          </div>
        </section>
      )}

      {/* Article Content */}
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
