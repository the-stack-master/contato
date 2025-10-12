// ===============================
// 📦 Common Image Type

import { SanitySeo } from "./commonTypes";

// ===============================
export interface ImageType {
  _type: "image";
  alt: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// ===============================
// 📱 App Download Section
// ===============================
export interface AppDownloadButton {
  enabled: boolean;
  text: string;
  url: string;
}

export interface DownloadButtons {
  androidButton: AppDownloadButton;
  iosButton: AppDownloadButton;
}

export interface QrCodes {
  androidLabel: string;
  iosLabel: string;
  androidQR: ImageType;
  iosQR: ImageType;
}

export interface SignInLink {
  enabled: boolean;
  text: string;
  url: string;
}

export interface AppDownloadSection {
  appIcon: ImageType;
  description: string;
  headline: string;
  downloadButtons: DownloadButtons;
  qrCodes: QrCodes;
  signInLink: SignInLink;
}

// ===============================
// 🌟 App Features Section
// ===============================
export interface FeatureItem {
  _key: string;
  title: string;
  description: string;
  iconName: string;
  alt?: string;
}

export interface AppFeaturesSection {
  headline: string;
  subheading: string;
  phoneImage: ImageType;
  features: FeatureItem[];
}

// ===============================
// 💬 Social Proof Section
// ===============================
export interface SocialProofSection {
  enabled: boolean;
  rating: number;
  ratingLabel: string;
  showStars: boolean;
  userCount: string;
  userCountLabel: string;
}

// ===============================
// ⚙️ Page Settings
// ===============================
export interface PageSettings {
  showHeader: boolean;
  showFooter: boolean;
}

// ===============================
// 🧠 SEO Section
// ===============================
export interface SeoSlug {
  _type: "slug";
  current: string;
}

export interface OpenGraph {
  type: string;
}

// ===============================
// 📄 Main Signup Page Document
// ===============================
export interface SignupPageDocument {
  _id: string;
  _type: "signup";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SeoSlug;
  seo: SanitySeo;
  isPublished: boolean;
  publishedAt: string;
  pageSettings: PageSettings;
  appDownloadSection: AppDownloadSection;
  appFeaturesSection: AppFeaturesSection;
  socialProofSection: SocialProofSection;
  signupBaseLabel: string;
}
