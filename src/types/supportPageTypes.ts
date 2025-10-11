// types/supportPageTypes.ts

import { SanitySeo } from "./commonTypes";

export interface DocumentItem {
  _key: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
  file: { asset: { url: string } };
  category: { _id: string; title: string; slug: { current: string } };
  fileSize?: number;
  fileType?: string;
  version?: string;
  accessLevel?: string;
  author?: string;
  uploadedBy?: string;
  publishedAt?: string;
  lastUpdated?: string;
  expiresAt?: string;
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
  totalDocuments: number;
  tags?: string[];
  status?: string;
  featured?: boolean;
  seo?: any;
  internalNotes?: string;
}

// types/supportPageTypes.ts
export interface SupportPageType {
  _id: string;
  title: string;
  subtitle?: string;
  slug: { _type: "slug"; current: string };
  searchSection?: {
    searchPlaceholder?: string;
    searchButtonText?: string;
    enableSearch?: boolean;
  };
  ctaSection?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  seo?: SanitySeo; // replace with your SEO type if defined
  isPublished?: boolean;
  publishedAt?: string;
  _updatedAt?: string;
}
