"use client";

import { useState, useEffect } from "react";
import SupportHeroSection from "./SupportHeroSection";
import SupportCategoriesSection from "./SupportCategoriesSection";
import { getDocumentUploads } from "@/lib/sanity-queries/supportPageQuery";
import { DocumentUpload, SupportPageType } from "@/types/supportPageTypes";

interface SupportPageProps {
  supportData: SupportPageType | null;
}

export default function SupportPage({ supportData }: SupportPageProps) {
  const [categories, setCategories] = useState<DocumentUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // search for category title
  const [docSearch, setDocSearch] = useState(""); // search inside documents
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchCategories = async () => {
    setLoading(true);

    // Fetch the documentUpload objects with filtered documents
    const data = await getDocumentUploads({
      page,
      pageSize,
      search: docSearch, // pass the doc search term
    });

    // Optionally filter by category title (search by upload title)
    const filtered = search
      ? data.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
      : data;

    setCategories(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [page, search, docSearch]);

  return (
    <main className="min-h-screen bg-white">
      <SupportHeroSection heroData={supportData} />
      {loading ? (
        <p className="text-center py-20">Loading...</p>
      ) : (
        <SupportCategoriesSection
          categories={categories}
          supportData={supportData}
        />
      )}
    </main>
  );
}
