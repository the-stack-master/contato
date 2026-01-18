"use client";
import React from "react";
import SanityFileViewer from "./SanityFileViewer";
import {
  ArrowLeft,
  MailQuestionMark,
  MessageCircle,
  ShieldQuestionMark,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SanityDocumentUpload } from "@/types/documentFetchTypes";
import { Button } from "@/components/ui/button";

interface DocClientProps {
  docData: SanityDocumentUpload | null;
}

const DocClient = ({ docData }: DocClientProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}

      <Link
        href={`/support`}
        className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-500 rounded-lg
         text-orange-500 shadow-sm hover:bg-orange-100 hover:scale-105 transition-all font-medium w-max mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to support
      </Link>



      {/* Article Content */}
      <SanityFileViewer docId={docData?.document?.file?.asset?.url} />

      {/* Help Footer */}
      <div
        className="
    mt-16 p-8 md:p-10
    rounded-2xl
    bg-gradient-to-br from-[#fff6f2] via-white to-white
    border border-[#f15A24]/20
    flex flex-col md:flex-row md:items-center md:justify-between
    gap-6
  "
      >
        {/* Text */}
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold !text-gray-900">
            <ShieldQuestionMark className="w-5 h-5 text-[#f15A24]" />
            Was this article helpful?
          </h3>

          <p className="text-sm md:text-base !text-gray-600 max-w-md">
            Explore more guides or get help from our support resources.
          </p>
        </div>

        {/* CTA */}
        <Link href="/support">
          <Button variant="primary" size="md" className="rounded-xl px-6">
            Browse more articles
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default DocClient;
