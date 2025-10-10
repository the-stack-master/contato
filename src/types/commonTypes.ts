// types/commonTypes.ts

export interface ImageWithAlt {
  _type: "image";
  asset: {
    _type: "reference" | "sanity.imageAsset";
    url: string; // Ensure GROQ resolves the URL
  };
  alt: string;
}

export interface OpenGraph {
  title?: string;
  description?: string;
  image?: ImageWithAlt;
  siteName?: string;
  type?: "website" | "article" | "product" | "profile";
}

export interface SanitySeo {
  metaTitle: string;
  metaDescription: string;
  slug?: { _type: "slug"; current: string };
  canonicalUrl?: string;
  focusKeyword?: string;
  keywords?: string[];
  schemaType?: string;
  customSchema?: string;
  openGraph?: OpenGraph;
  noIndex?: boolean;
  noFollow?: boolean;
  priority?: number; // 0-1
  changeFreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}
