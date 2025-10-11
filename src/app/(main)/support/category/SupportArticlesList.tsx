"use client";

import useNavigate from "@/hooks/useNavigate";
import { DocumentItem } from "@/types/categoryPageTypes";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
}

interface SupportArticlesListProps {
  articles?: DocumentItem[];
  categorySlug?: string;
}

export default function SupportArticlesList({
  articles,
  categorySlug,
}: SupportArticlesListProps) {
  const navigate = useNavigate();

  console.log(":aasas", articles);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {articles?.map((article, index) => (
            <motion.div
              key={article?.publishedAt}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
            >
              <Link
                href={`/support/category/${categorySlug}/${article?.slug?.current}`}
              >
                <div className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group-hover:shadow-md border border-transparent hover:border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#f15A24] transition-colors duration-200 truncate">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {article?.subtitle}
                    </p>
                  </div>

                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#f15A24] group-hover:translate-x-1 transition-all duration-200 ml-4 flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Help section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Didn&apos;t find what you were looking for?
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Our support team is always ready to help you with any questions
              about NetworkPro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#f15A24] px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Contact Support
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#f15A24] px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                Search All Articles
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
