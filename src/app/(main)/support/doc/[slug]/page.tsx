/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SanityFileViewer from "@/app/(main)/supportTest/page";

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
            The article you&apos;re looking for doesn&apos;t exist.
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
            href={`/support`}
            className="inline-flex items-center text-[#f15A24] hover:text-orange-600 font-semibold mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to support
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
          </div>

          {/* Article Content */}
          <SanityFileViewer />

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
