// ========================
// === Global Reusables ===
// ========================

import { PortableTextBlock } from "@portabletext/react";
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
  iconName: string;
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

export interface AboutCommunicationSection {
  _type: "aboutCommunicationSection";
  chipText?: string;
  title: string;
  titleHighlightText?: string;
  description?: PortableTextBlock[];
  highlightFeatures?: {
    title: string;
    icon?: string;
  }[];
  bubbles?: {
    iconName?: string;
    title: string;
    description?: string;
  }[];
  bottomTextHeading?: string;
  bottomTextDescription?: string;
}

export interface SmartToolMetric {
  topText?: string;
  centerText?: string;
  bottomText?: string;
}

export interface SmartToolTab {
  text?: string;
  icon?: ImageWithAlt;
}

export interface SmartToolImage {
  type: "upload" | "url";
  upload?: ImageWithAlt;
  url?: string;
}

export interface SmartToolCard1 {
  _type: "card1";
  image?: SmartToolImage;
  icon?: string;
  chipText?: string;
  heading: string;
  subheading?: string;
  description?: string;
}

export interface SmartToolCard2 {
  _type: "card2";
  icon?: string;
  chipText?: string;
  heading: string;
  subheading?: string;
  bulletPoints: string[];
  description?: string;
}

export interface SmartToolCard3 {
  _type: "card3";
  icon?: string;
  chipText?: string;
  heading: string;
  subheading?: string;
  metrics: SmartToolMetric[];
  description?: string;
}

export interface SmartToolCard4 {
  _type: "card4";
  icon?: string;
  chipText?: string;
  heading: string;
  subheading?: string;
  description?: string;
  bulletPoints: string[];
  image?: SmartToolImage;
}

export interface SmartToolCard5 {
  _type: "card5";
  image?: SmartToolImage;
  icon?: string;
  chipText?: string;
  heading: string;
  subheading?: string;
  description?: string;
}

export interface SmartToolCard6 {
  _type: "card6";
  icon?: string;
  chipText?: string;
  heading: string;
  subheading?: string;
  tabs: SmartToolTab[];
  description?: string;
}

export type SmartToolCard =
  | SmartToolCard1
  | SmartToolCard2
  | SmartToolCard3
  | SmartToolCard4
  | SmartToolCard5
  | SmartToolCard6;

export interface SmartDigitalToolsSection {
  _type: "smartDigitalToolsSection";
  heading: string;
  subheading?: string;
  cards: SmartToolCard[];
  cta?: {
    text: string;
    url?: string;
  };
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
  | UserTestimonials
  | AboutCommunicationSection
  | SmartDigitalToolsSection;

export interface HomePage {
  _id: string;
  _type: "homePage";
  title: string;
  seo?: SanitySeo;
  pageBuilder: PageBuilderSection[];
  isActive: boolean;
}
