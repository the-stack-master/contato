"use client";
import React from "react";
import SanityFileViewer from "./SanityFileViewer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SanityDocumentUpload } from "@/types/documentFetchTypes";

interface DocClientProps {
  docData: SanityDocumentUpload | null;
}

const DocClient = ({ docData }: DocClientProps) => {
  console.log("----doc", docData);
  return (
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
          {docData?.document?.title}
        </h1>

        {/* {article.description && ( */}
        {docData?.document?.subtitle && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {docData?.document?.subtitle}
          </p>
        )}
        {/* )} */}
      </div>

      {/* Article Content */}
      <SanityFileViewer docId={docData?.document?.file?.asset?.url} />

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
  );
};

export default DocClient;
