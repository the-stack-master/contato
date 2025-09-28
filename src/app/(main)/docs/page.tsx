"use client";

import React, { useState } from "react";
import PdfViewer from "./DocViewer";
import { FileText } from "lucide-react";

interface Document {
  id: string;
  title: string;
  url: string;
  size: string; // e.g., '2.4 MB'
  uploadedAt: string; // ISO string date
  important?: boolean;
}

const documents: Document[] = [
  {
    id: "1",
    title: "User Guide",
    url: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf",
    size: "2.4 MB",
    uploadedAt: "2025-09-20T15:00:00Z",
    important: true,
  },
  {
    id: "2",
    title: "Privacy Policy",
    url: "/docs/privacy-policy.pdf",
    size: "1.8 MB",
    uploadedAt: "2025-08-15T10:30:00Z",
  },
  {
    id: "3",
    title: "Terms of Service",
    url: "/docs/terms.pdf",
    size: "3.1 MB",
    uploadedAt: "2025-07-01T12:00:00Z",
  },
  {
    id: "4",
    title: "Getting Started Tutorial",
    url: "/docs/getting-started.pdf",
    size: "5.0 MB",
    uploadedAt: "2025-09-25T09:00:00Z",
    important: true,
  },
  {
    id: "5",
    title: "FAQ",
    url: "/docs/faq.pdf",
    size: "900 KB",
    uploadedAt: "2025-06-30T08:00:00Z",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function SupportDocPage() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(documents[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const importantDocs = documents.filter((doc) => doc.important);
  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-12">
      {/* Important Docs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Important Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {importantDocs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`p-4 rounded-lg shadow cursor-pointer text-left transition-colors duration-200 ${
                selectedDoc?.id === doc.id
                  ? "bg-[#f15A24] text-white"
                  : "bg-gray-100 hover:bg-[#fee7dd]"
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="w-6 h-6" />
                <h3 className="text-lg font-semibold">{doc.title}</h3>
              </div>
              <div className="text-sm text-gray-200">
                {doc.size} &bull; Uploaded {formatDate(doc.uploadedAt)}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Search & All Docs */}
      <section>
        <h2 className="text-3xl font-bold mb-4">All Documents</h2>
        <input
          type="search"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f15A24]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-3 rounded-md cursor-pointer border transition-colors duration-200 ${
                  selectedDoc?.id === doc.id
                    ? "border-[#f15A24] bg-[#fee7dd]"
                    : "border-gray-300 bg-white hover:bg-[#fff0e5]"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">{doc.title}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {doc.size} &bull; Uploaded {formatDate(doc.uploadedAt)}
                </div>
              </button>
            ))
          ) : (
            <p className="text-gray-500">No documents found</p>
          )}
        </div>
      </section>

      {/* PDF Viewer */}
      <section className="mt-10 max-w-5xl mx-auto">
        {selectedDoc ? (
          <PdfViewer fileUrl={selectedDoc.url} />
        ) : (
          <p>Select a document to view</p>
        )}
      </section>
    </div>
  );
}
