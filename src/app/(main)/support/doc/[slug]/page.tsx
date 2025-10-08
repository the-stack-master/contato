"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Article {
  title: string;
  description: string;
  content: any;
  publishedAt: string;
  readTime: number;
  category: string;
}

const articleData = {
  title: "test tuitle",
  description:
    ":sdsdsdsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  content: "sdfdsfdf     ddfgd fd fd f",
  publishedAt: "sdfdsfdf     ddfgd fd fd f",
  readTime: 5,
  category: "sdfdsfdf     ddfgd fd fd f",
};

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(articleData);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/80 to-red-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3 mt-8">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/80 to-red-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center text-[#f15A24] hover:text-orange-600 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/80 to-red-50/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link
            href={`/support/${params.category}`}
            className="inline-flex items-center text-[#f15A24] hover:text-orange-600 font-semibold mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {params.category}
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {article.description && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.description}
              </p>
            )}

            <div className="flex items-center gap-6 text-sm text-gray-500">
              {article.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg prose-orange max-w-none">
              {article.content ? (
                <PortableText
                  value={article.content}
                  components={{
                    block: {
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                          {children}
                        </h3>
                      ),
                      normal: ({ children }) => (
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {children}
                        </p>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal pl-6 mb-4 space-y-2">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({ children }) => (
                        <li className="text-gray-700">{children}</li>
                      ),
                      number: ({ children }) => (
                        <li className="text-gray-700">{children}</li>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold text-gray-900">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                      code: ({ children }) => (
                        <code className="bg-gray-100 text-[#f15A24] px-2 py-1 rounded text-sm font-mono">
                          {children}
                        </code>
                      ),
                      link: ({ children, value }) => (
                        <a
                          href={value?.href}
                          className="text-[#f15A24] hover:text-orange-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              ) : (
                <p className="text-gray-600">Content coming soon...</p>
              )}
            </div>
          </div>

          {/* Help Footer */}
          <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Was this article helpful?
            </h3>
            <p className="text-gray-600 mb-4">
              Let us know if you have any questions or need further assistance.
            </p>
            <Link
              href="/support"
              className="inline-block bg-gradient-to-r from-[#f15A24] to-orange-500 hover:from-orange-600 hover:to-red-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
            >
              Browse More Articles
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
