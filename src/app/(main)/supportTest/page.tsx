/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";

export default function SanityFileViewer() {
  const [docId, setDocId] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setHtmlContent("");

    if (!docId) {
      setError("Please enter a Sanity document ID");
      return;
    }

    try {
      setLoading(true);

      // Call your API that converts the Sanity file
      const res = await fetch(
        `/api/support?id=fb00d524-0c8e-4211-b9d1-0a95c1d38d7f`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Conversion failed");
      }

      // const dataToSet = data.html.replace(/\r\n|\r|\n/g, "<br/>");

      setHtmlContent(data.html);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const callDoc = async () => {
    setError(null);
    setHtmlContent("");

    try {
      setLoading(true);

      // Call your API that converts the Sanity file
      const res = await fetch(
        `/api/support?id=fb00d524-0c8e-4211-b9d1-0a95c1d38d7f`
      );
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
    <div className="min-h-screen bg-white px-0 pt-12 pb-24 flex flex-col items-center">
      {/* Error Message */}
      {error && (
        <p className="mb-8 p-3 text-red-700 bg-red-50 w-full max-w-3xl rounded text-center font-medium">
          {error}
        </p>
      )}

      {/* Main Blog Content */}
      {htmlContent && (
        <article
          className="prose max-w-3xl w-full px-0"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
}
