/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";

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

      const dataToSet = data.html.replace(/\r\n|\r|\n/g, "<br/>");

      setHtmlContent(dataToSet);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">View DOCX/PDF from Sanity</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter Sanity document ID"
          value={docId}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Fetching & Converting..." : "Fetch & Convert"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {htmlContent && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h3 className="font-medium mb-2">Converted HTML Preview:</h3>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
            className="prose max-w-none w-full"
          />
        </div>
      )}
    </div>
  );
}
