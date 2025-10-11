"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Brain,
  MessageCircle,
  Calendar,
  Crown,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useNavigate from "@/hooks/useNavigate";
import {
  DocumentItem,
  DocumentUpload,
  SupportPageType,
} from "@/types/supportPageTypes";
import { IconComponent } from "@/components/ui/IconComponent";

interface Article {
  id: number;
  title: string;
  slug: string;
}

// interface Category {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   articleCount: number;
//   articles: Article[];
// }

interface SupportCategoriesSectionProps {
  categories: DocumentUpload[];
  supportData: SupportPageType | null;
}

export default function SupportCategoriesSection({
  categories,
  supportData,
}: SupportCategoriesSectionProps) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryData: DocumentUpload) => {
    const urlToNav = `/support/category/${categoryData?.slug?.current}`;
    if (categoryData?.slug?.current) {
      navigate(urlToNav);
    }
  };

  const handleDocClick = (articleData: DocumentItem, categorySlug?: string) => {
    const urlToNav = `/support/category/${categorySlug}/${articleData?.slug?.current}`;
    if (articleData?.slug?.current && categorySlug) {
      navigate(urlToNav);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by{" "}
            <span className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category, index) => {
            // const IconComponent =
            //   iconMap[category.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={category?._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <IconComponent
                      name={"file-text"}
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#f15A24] transition-colors duration-300 truncate whitespace-nowrap overflow-hidden">
                      {category.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {category?.totalDocuments} articles
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed h-12 overflow-hidden text-ellipsis">
                  {category?.description}
                </p>

                <div className="space-y-2 mb-6">
                  {category?.documents
                    ?.slice(0, 3)
                    .map((article, articleIndex) => (
                      <div
                        key={article?.publishedAt}
                        onClick={() => {
                          handleDocClick(article, category?.slug?.current);
                        }}
                        className="flex items-center text-sm text-gray-600 hover:text-[#f15A24] transition-colors duration-200 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 bg-[#f15A24] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="truncate">{article.title}</span>
                      </div>
                    ))}
                </div>

                <Button
                  onClick={() => handleCategoryClick(category)}
                  className="w-full bg-gradient-to-r from-[#f15A24] to-orange-500 hover:from-orange-600 hover:to-red-500 text-white rounded-xl transition-all duration-300 group-hover:shadow-lg"
                >
                  See all {category?.totalDocuments} articles
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Help Section */}
        {supportData?.ctaSection?.enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {supportData?.ctaSection?.title}
              </h3>
              <p className="text-lg mb-6 opacity-90">
                {supportData?.ctaSection?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#f15A24] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold">
                  <a href={`mailto:${supportData?.ctaSection?.buttonLink}`}>
                    {supportData?.ctaSection?.buttonText}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
