/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Rocket,
  Brain,
  MessageCircle,
  Calendar,
  Crown,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DocumentUpload } from "@/types/categoryPageTypes";
import { formatDateUTC } from "@/utils/getFormatedDate";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  articles: any[];
}

interface SupportCategoryHeaderProps {
  category: DocumentUpload | null;
}

const iconMap = {
  rocket: Rocket,
  brain: Brain,
  message: MessageCircle,
  calendar: Calendar,
  crown: Crown,
  wrench: Wrench,
};

export default function SupportCategoryHeader({
  category,
}: SupportCategoryHeaderProps) {
  // const IconComponent = iconMap[category.icon as keyof typeof iconMap];

  return (
    <section className="py-5 bg-gradient-to-br from-white via-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/support">
            <Button
              variant="ghost"
              className="mb-12 text-gray-600 hover:text-[#f15A24] p-0 h-auto text-lg font-medium"
            >
              <ArrowLeft className="w-6 h-6 mr-3" />
              Back to Help Center
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-10 mb-12">
            <div>
              <h1 className="text-5xl md:text-4xl font-bold text-gray-900 mb-6">
                {category?.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                {category?.description}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="text-4xl font-bold text-[#f15A24]">
                  {category?.totalDocuments ?? 0}
                </div>
                <div className="text-gray-600 text-lg">
                  articles in this category
                </div>
              </div>
              <div className="text-gray-500">
                Last updated: {formatDateUTC(category?._updatedAt)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
