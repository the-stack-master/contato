/* eslint-disable @typescript-eslint/no-explicit-any */

import { SanitySeo } from "./commonTypes";

// About Page main type
export interface AboutPage {
  _id?: string;
  _type: "aboutPage";
  title: string;
  seo?: SanitySeo;
  pageBuilder: PageBuilderSection[];
  isActive?: boolean;
}

// Union type for pageBuilder sections
export type PageBuilderSection =
  | CompanyStorySection
  | TeamIntroSection
  | TeamMembersGrid
  | ContactHRSection;

/** companyStorySection */
export interface CompanyStorySection {
  _type: "companyStorySection";
  sectionLabel?: string;
  companyName: string;
  mainHeading: string;
  highlightedText?: string;
  storyContent: PortableTextBlock[]; // Sanity rich text blocks
  valuePropositions?: ValueProposition[];
  ctaButtons?: CTAButton[];
}

export interface ValueProposition {
  title: string;
  description?: string;
  icon?: "heart" | "lightning" | "shield" | "globe";
}

export interface CTAButton {
  text: string;
  url?: string;
  isPrimary?: boolean;
}

/** teamIntroSection */
export interface TeamIntroSection {
  _type: "teamIntroSection";
  sectionLabel?: string;
  heading: string;
  highlightedText?: string;
  description: string;
}

/** teamMembersGrid */
export interface TeamMembersGrid {
  _type: "teamMembersGrid";
  members: TeamMember[];
}

export interface TeamMember {
  name: string;
  position: string;
  department?: string;
  bio?: string;
  photo: ImageAsset;
  socialLinks?: SocialLink[];
  location?: string;
  joinYear?: number;
}

export interface ImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
}

export interface SocialLink {
  platform: "linkedin" | "twitter" | "email";
  url?: string;
}

/** contactHRSection */
export interface ContactHRSection {
  _type: "contactHRSection";
  heading: string;
  description?: string;
  email: string;
  buttonText?: string;
}

// Sanity Portable Text block type (simplified)
export interface PortableTextBlock {
  _type: "block";
  _key?: string;
  children: Array<{ _type: "span"; text: string; marks: string[] }>;
  markDefs: any[];
  style: string;
}
