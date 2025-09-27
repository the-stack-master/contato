// app/(main)/blog/[slug]/page.tsx
import { client, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Tag,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/utils/classNames";
import Link from "next/link";

interface BlogPost {
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  content: any[];
  mainImage?: { asset: { _ref: string } };
  author?: {
    name: string;
    image?: { asset: { _ref: string } };
    role?: string;
    bio?: string;
  };
  category?: { name: string; color?: string };
  tags?: string[];
  relatedPosts?: BlogPost[];
}

interface PageProps {
  params: { slug: string };
}

// Generate static paths
export async function generateStaticParams() {
  const query = `*[_type == "blog" && defined(slug.current)]{"slug": slug.current}`;
  const slugs: { slug: string }[] = await client.fetch(query);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;

  const query = `*[_type == "blog" && slug.current == $slug][0]{
    title,
    slug,
    description,
    publishedAt,
    content,
    mainImage,
    author->{name, "image": image.asset, role, bio},
    category->{name, color},
    tags,
    "relatedPosts": *[_type=="blog" && slug.current != $slug] | order(publishedAt desc)[0..2]{
      title, slug, description, publishedAt, mainImage, category->{name,color}
    }
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
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>
          </div>

          {/* Category & Meta */}
          {post.category && (
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </span>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.description}
          </p>

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-4 mb-8">
              {post.author.image && (
                <img
                  src={urlFor(post.author.image).width(100).url()}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-900">
                  {post.author.name}
                </h3>
                <p className="text-sm text-gray-600">{post.author.role}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {post.mainImage && (
        <section className="px-6 -mt-8 relative z-10">
          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-orange-500" /> In This
                  Article
                </h3>
                <nav className="space-y-2">
                  {/* Example anchors */}
                  <a
                    href="#evolution"
                    className="block text-sm text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    The Evolution of Networking
                  </a>
                  <a
                    href="#ai-enhancement"
                    className="block text-sm text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    How AI Enhances Connections
                  </a>
                  <a
                    href="#career-impact"
                    className="block text-sm text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Impact on Career Development
                  </a>
                  <a
                    href="#best-practices"
                    className="block text-sm text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Best Practices
                  </a>
                  <a
                    href="#future"
                    className="block text-sm text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Looking Ahead
                  </a>
                </nav>
              </div>

              {/* Tags */}
              {post.tags && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-orange-500" /> Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-500 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 prose prose-lg max-w-none">
              <PortableText value={post.content} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts?.length ? (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Related Articles
              </h2>
              <p className="text-xl text-gray-600">
                Continue your learning journey
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {post.relatedPosts.map((related, i) => (
                <Link
                  key={i}
                  href={`/blog/${related.slug.current}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100"
                >
                  {related.mainImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={urlFor(related.mainImage).width(600).url()}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {related.category && (
                        <span
                          className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white"
                          style={{ backgroundColor: related.category.color }}
                        >
                          {related.category.name}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Stay in the loop</h2>
            <p className="text-xl text-white/90">
              Get the latest networking insights and career tips delivered to
              your inbox.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-orange-500 hover:bg-gray-100 font-semibold px-8 py-4 h-auto rounded-2xl transition-all duration-200 hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
