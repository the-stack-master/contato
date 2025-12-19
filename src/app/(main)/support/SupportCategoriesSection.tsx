"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useNavigate from "@/hooks/useNavigate";
import {
  DocumentItem,
  DocumentUpload,
  SupportPageType,
} from "@/types/supportPageTypes";
import { IconComponent } from "@/components/ui/IconComponent";

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
    if (categoryData?.slug?.current) {
      navigate(`/support/category/${categoryData.slug.current}`);
    }
  };

  const handleDocClick = (articleData: DocumentItem, categorySlug?: string) => {
    if (articleData?.slug?.current && categorySlug) {
      navigate(`/support/category/${categorySlug}/${articleData.slug.current}`);
    }
  };

  const isTwoItems = categories?.length === 2;

  return (
    <section
      className="relative py-16
  bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Browse by{" "}
            <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div
          className={
            isTwoItems
              ? "flex justify-center gap-6 flex-wrap"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          }
        >
          {categories?.map((category, index) => (
            <motion.div
              key={category?._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="
              bg-white
              rounded-2xl
              p-6
              border border-gray-200
              shadow-sm
              transition-all duration-300 ease-out
              hover:shadow-xl
              hover:-translate-y-1
              hover:border-[#f15A24]/40
              focus-within:shadow-xl
              focus-within:border-[#f15A24]/40
              flex flex-col
              w-full
              max-w-sm
            "
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 bg-[#f15A24]/10 rounded-xl flex items-center justify-center">
                  <IconComponent
                    name="file-text"
                    className="w-5 h-5 text-[#f15A24]"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate">{category.title}</h3>
                  <p className="!text-sm text-gray-500 mt-0.5">
                    {category?.totalDocuments}{" "}
                    {category?.totalDocuments > 1 ? `articles` : "article"}
                  </p>
                </div>
              </div>

              {/* Articles */}
              <div className="space-y-1 mb-6 flex-1">
                {category?.documents?.slice(0, 5).map((article, i) => (
                  <button
                    key={article?.publishedAt || i}
                    onClick={() =>
                      handleDocClick(article, category?.slug?.current)
                    }
                    className="group w-full flex items-center gap-3
                               px-2 py-1.5 rounded-lg
                               text-sm text-gray-600
                               hover:bg-[#f15A24]/5 hover:text-[#f15A24]
                               transition"
                  >
                    <span className="w-1.5 h-1.5 bg-[#f15A24] rounded-full flex-shrink-0" />
                    <span className="truncate flex-1 text-left">
                      {article.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                ))}
              </div>

              {/* Footer CTA */}
              {category?.totalDocuments > 5 && (
                <Button
                  onClick={() => handleCategoryClick(category)}
                  variant="primary"
                  className="mt-auto rounded-xl border-[#f15A24]/40
                             !text-[#f15A24] hover:bg-[#f15A24]/10"
                >
                  See all articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Subtle CTA */}
        {supportData?.ctaSection?.enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center"
          >
            <div
              className="max-w-3xl mx-auto border border-[#f15A24]/20
                            rounded-2xl p-8 bg-white"
            >
              <h3 className="!text-xl !md:text-2xl !font-semibold !text-gray-900 mb-2">
                {supportData?.ctaSection?.title}
              </h3>
              <p className="!text-gray-600 mb-6">
                {supportData?.ctaSection?.description}
              </p>
              <Button variant="primary">
                <a href={`mailto:${supportData?.ctaSection?.buttonLink}`}>
                  {supportData?.ctaSection?.buttonText}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
