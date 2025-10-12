// types/blogPageHeader.ts

import { SanitySeo } from "./commonTypes";
import { PortableTextBlock } from "@portabletext/react";

export interface BlogPageHeader {
  _id: string;
  _type: "blogPageHeader";
  title: string; // internal title
  heading: string; // main heading
  subHeading: string; // supporting text
  seo?: SanitySeo;
}

export type SanityImage = {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
  caption?: string;
};

export type Category = {
  title?: "string";
  description?: "string";
};

export type BlogPost = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  tagline?: string;
  slug: { current: string };
  author?: string;
  publishedDate: string;
  excerpt?: string;
  mainImage?: SanityImage;
  subImages?: SanityImage[];
  body: PortableTextBlock[];
  tags?: string[];
  category?: Category;
  readingTime?: string;
  isFeatured?: boolean;
  seo?: SanitySeo;
};
