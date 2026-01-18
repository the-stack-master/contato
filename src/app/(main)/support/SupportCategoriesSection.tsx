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
      className="bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="font-bold">
            Browse by Category
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
              <div className="flex items-start gap-4 mb-2">
                <div className="w-8 h-8 bg-[#f15A24]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent
                    name="file-text"
                    className="w-5 h-5 text-[#f15A24]"
                  />
                </div>

                <div className="min-w-0 text-left">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                    {category.title}
                  </h3>
                  <p className="!text-sm md:text-base font-medium text-gray-500 mt-1">
                    {category?.totalDocuments}{" "}
                    {category?.totalDocuments > 1 ? "articles" : "article"}
                  </p>
                </div>
              </div>

              {/* Articles (ALIGNED WITH HEADING) */}
              <div className="pl-[41px] space-y-1 mb-6 flex-1">
                {category?.documents?.slice(0, 5).map((article, i) => (
                  <button
                    key={article?.publishedAt || i}
                    onClick={() =>
                      handleDocClick(article, category?.slug?.current)
                    }
                    className="
                   group w-full flex items-start gap-1
                   px-1 py-2 rounded-lg
                   text-base md:text-lg font-medium text-gray-700
                   hover:bg-[#f15A24]/5 hover:text-[#f15A24]
                   transition
                 "
                  >
                    <span className="w-1.5 h-1.5 bg-[#f15A24] rounded-full flex-shrink-0 mt-2" />

                    <span className="flex-1 text-left leading-snug line-clamp-2">
                      {article.title}
                    </span>

                    <ArrowRight className="w-4 h-4 mt-1 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                ))}
              </div>

              {/* Footer CTA */}
              {category?.totalDocuments > 5 && (
                <Button
                  onClick={() => handleCategoryClick(category)}
                  variant="primary"
                  className="
                 mt-auto
                 rounded-xl
                 border-[#f15A24]/40
                 !text-[#f15A24]
                 hover:bg-[#f15A24]/10
                 flex items-center justify-center
               "
                >
                  See all articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </motion.div>


          ))}
        </div>


      </div>
      {supportData?.ctaSection?.enabled && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center relative"
        >
          <div
            className="
        relative max-w-3xl mx-auto
         px-10
         py-16
        bg-gradient-to-br from-orange-50 via-white to-orange-50
        
        overflow-hidden
      "
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-[#f15A24]/10 blur-3xl rounded-full" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-[#f15A24]/10 blur-3xl rounded-full" />

            {/* Content */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {supportData?.ctaSection?.title}
            </h3>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              {supportData?.ctaSection?.description}
            </p>

            <Button
              variant="primary"
              className="px-6 py-3 text-base md:text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition"
            >
              <a
                href={`mailto:${supportData?.ctaSection?.buttonLink}`}
                className="inline-flex items-center gap-2"
              >
                {supportData?.ctaSection?.buttonText}
                <span className="text-lg">→</span>
              </a>
            </Button>
          </div>
        </motion.div>
      )}

    </section >
  );
}
