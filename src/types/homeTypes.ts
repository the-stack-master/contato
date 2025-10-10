// ========================
// === Global Reusables ===
// ========================

import { ImageWithAlt, SanitySeo } from "./commonTypes";

export interface CTAButton {
  buttonText: string;
  buttonUrl?: string;
  isPrimary?: boolean;
}

export interface VideoEmbed {
  videoUrl?: string;
  thumbnailImage?: ImageWithAlt;
}

export interface Statistic {
  value: string;
  label: string;
}

// ========================
// === Object Schemas ===
// ========================

export interface HeroData {
  _type: "networkSmarterHero";
  brandIcon: ImageWithAlt;
  mainHeading: string;
  highlightedWord?: string;
  secondaryHeading: string;
  description: string;
  statistics: Statistic[];
  ctaButtons?: CTAButton[];
  demoVideo?: {
    videoText?: string;
    videoDuration?: string;
  };
}

export interface ContentFeature {
  featureTitle: string;
  description: string;
  featurePoints: string[];
}

export interface ContentFeaturesGrid {
  _type: "contentFeaturesGrid";
  sectionHeading: string;
  sectionDescription?: string;
  features: ContentFeature[];
}

export interface AppShowcaseImage {
  imageUrl: string;
  alt: string;
}

export interface AppShowcaseSection {
  _type: "appShowcaseSection";
  imageUrls: AppShowcaseImage[];
}

export interface LearningFeature {
  icon?: "users" | "chart" | "map" | "book";
  title: string;
}

export interface PlatformLearning {
  _type: "platformLearning";
  sectionHeading: string;
  description?: string;
  features: LearningFeature[];
  ctaButton?: {
    buttonText: string;
    buttonUrl?: string;
  };
  videoEmbed?: VideoEmbed;
}

export interface PricingPlan {
  planName: string;
  planType: string;
  price: string;
  priceUnit?: string;
  description?: string;
  features?: string[];
  buttonText: string;
  buttonUrl?: string;
  isPopular?: boolean;
}

export interface PricingPlans {
  _type: "pricingPlans";
  sectionHeading: string;
  sectionDescription?: string;
  plans: PricingPlan[];
  bottomText?: string;
}

export interface TrustStatistics {
  _type: "trustStatistics";
  sectionHeading: string;
  sectionDescription?: string;
  statistics: Statistic[];
}

export interface Testimonial {
  rating: number;
  testimonialText: string;
  authorName: string;
  authorTitle?: string;
  authorInitials?: string;
}

export interface UserTestimonials {
  _type: "userTestimonials";
  sectionHeading: string;
  sectionDescription?: string;
  testimonials: Testimonial[];
}

export interface QrProfileCard {
  _type: "qrProfileCard";
  profileImage: ImageWithAlt;
  qrCodeImage: ImageWithAlt;
  profileName: string;
  profileTitle?: string;
  profileSubtitle?: string;
}

// ========================
// === SEO Schema ===
// ========================

// ========================
// === Page Schema ===
// ========================

export type PageBuilderSection =
  | HeroData
  | ContentFeaturesGrid
  | AppShowcaseSection
  | PricingPlans
  | TrustStatistics
  | PlatformLearning
  | UserTestimonials;

export interface HomePage {
  _id: string;
  _type: "homePage";
  title: string;
  seo?: SanitySeo;
  pageBuilder: PageBuilderSection[];
  isActive: boolean;
}
