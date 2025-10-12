import { SanitySeo } from "./commonTypes";

export interface SanityAsset {
  _id: string;
  url: string;
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export interface SanityDocumentItem {
  _key: string;
  title: string;
  subtitle?: string;
  slug: {
    current: string;
  };
  file?: {
    _type: string;
    asset?: SanityAsset;
  };
  category?: SanityCategory;
  fileSize?: number;
  fileType?: string;
  version?: string;
  accessLevel?: "public" | "members" | "staff" | "private";
  author?: string;
  uploadedBy?: string;
  publishedAt?: string;
  lastUpdated?: string;
  expiresAt?: string;
}

export interface SanityDocumentUpload {
  _id?: string;
  title: string;
  slug: {
    current: string;
  };
  document?: SanityDocumentItem;
  seo?: SanitySeo;
}
