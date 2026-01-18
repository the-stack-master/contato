/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";

interface FileViewerProps {
  docId?: string;
}

export default function SanityFileViewer({ docId }: FileViewerProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callDoc = async () => {
    setError(null);
    setHtmlContent("");

    try {
      setLoading(true);

      // Call your API that converts the Sanity file
      const res = await fetch(`/api/support?url=${docId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Conversion failed");
      }

      const dataToSet = data.html;

      setHtmlContent(dataToSet);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callDoc();
  }, []);

  return (
    <div className="min-h-screen bg-white px-0 pt-0 pb-24 flex flex-col items-center">
      {/* Error Message */}
      {error && (
        <p className="mb-8 p-3 !text-red-700 bg-red-50 w-full max-w-3xl rounded text-center font-medium">
          {error}
        </p>
      )}

      <>
        {loading ? (
          <div className="w-full max-w-3xl px-6 py-16 animate-pulse">
            {/* Spinner */}
            <div className="flex justify-center mb-6">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-[#f15A24] rounded-full animate-spin" />
            </div>

            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-6" />

            {/* Paragraph skeletons */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-[95%]" />
              <div className="h-4 bg-gray-200 rounded w-[90%]" />
              <div className="h-4 bg-gray-200 rounded w-[92%]" />
            </div>

            {/* Loading text */}
            <p className="text-sm text-gray-500 text-center mt-6">
              Loading document…
            </p>
          </div>

        ) : (
          <>
            {/* Main Blog Content */}
            {htmlContent && (
              <article
                className="prose max-w-3xl w-full px-0 py-0"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            )}
          </>
        )}
      </>
    </div>
  );
}
