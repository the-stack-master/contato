// types/sanity.ts

import { SanitySeo } from "./commonTypes";

export interface DocumentItem {
  _key: string;
  title: string;
  subtitle?: string;
  file: {
    asset: {
      url: string;
    };
  };
  category: {
    _ref: string;
    _type: "reference";
  };
  fileSize?: number;
  fileType?: "pdf" | "docx" | "txt" | "xlsx" | "pptx" | "other";
  version?: string;
  accessLevel: "public" | "members" | "staff" | "private";
  author?: string;
  uploadedBy?: string;
  publishedAt?: string;
  lastUpdated?: string;
  expiresAt?: string;
  slug: { current: string };
}

export interface DocumentUpload {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
  description?: string;
  documents: DocumentItem[];
  tags?: string[];
  status: "draft" | "review" | "published" | "archived";
  featured?: boolean;
  seo?: SanitySeo;
  internalNotes?: string;
  totalDocuments?: number;
}
