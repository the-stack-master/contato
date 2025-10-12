import { SanitySeo } from "./commonTypes";

export interface VideoThumbnail {
  url: string;
  alt: string;
}

export interface Video {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  description?: string;
  videoSource: "upload" | "url";
  videoFileUrl?: string;
  videoUrl?: string;
  isFeatured?: boolean;
  duration?: string;
  category?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
  tags?: string[];
  thumbnails?: VideoThumbnail[];
  seo?: SanitySeo;
}

// types/videoHeaderText.ts
export interface VideoCategoryFilter {
  _key: string;
  label: string;
  value: string;
  isPrimary?: boolean;
  orderIndex?: number;
  category?: {
    _id: string;
    _type: "category";
    title?: string;
    slug?: { current: string };
  };
}

export interface VideoHeaderText {
  _id: string;
  _type: "videoHeaderText";
  title: string;
  mainHeading: string;
  highlightedText?: string;
  description: string;
  videoCategories: VideoCategoryFilter[];
  isActive: boolean;
  seo?: SanitySeo;
}
