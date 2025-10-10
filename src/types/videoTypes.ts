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
