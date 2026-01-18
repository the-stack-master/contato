/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/lib/sanity";
import FeaturesSectionClient from "@/app/(main)/features/FeaturesClient";
import { ImageAsset } from "@/utils/getImageUrl";
import { SanitySeo } from "@/types/commonTypes";
import { generateSeoMetadata } from "@/lib/generateMetadata";

// === Revalidate every 60 seconds ===
export const revalidate = 60;

// === Types ===
interface CtaButton {
  buttonText: string;
  buttonUrl: string;
  isPrimary: boolean;
  _key: string;
}

interface PhoneScreen {
  _key: string;
  _type: string;
  alt?: string;
  imageUrl?: string;
  screenTitle?: string;
}

export interface HeroCallToAction {
  _key: string;
  _type: "heroCallToAction";
  mainHeading?: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string;
  highlightedText?: string;
  ctaText?: string | null;
  ctaLink?: string | null;
  ctaButtons?: CtaButton[];
  image?: ImageAsset | null;
  phoneScreens?: PhoneScreen[];
}

export interface FeatureItem {
  title?: string | null;
  description: string;
  iconName?: string;
  _key?: string;
}

export interface FeaturesGrid {
  _key: string;
  _type: "featuresGrid";
  sectionHeading?: string;
  title?: string | null;
  subtitle?: string | null;
  features: FeatureItem[];
}

export interface WhatsNewItem {
  _key?: string;
  _type?: string;
  title?: string | null;
  date?: string | null;
  description?: string;
  featureName?: string;
  featureImage?: ImageAsset;
}

export interface WhatsNewSection {
  _key: string;
  _type: "whatsNewSection";
  sectionHeading?: string;
  title?: string | null;
  updates?: WhatsNewItem[] | null;
  features?: WhatsNewItem[] | null;
}

export interface GalleryImage {
  alt?: string;
  url: string;
  caption?: string;
  _key?: string;
}

export interface AppScreensGallery {
  _key: string;
  _type: "appScreensGallery";
  sectionHeading?: string;
  title?: string | null;
  images?: ImageAsset[] | null;
  screenImages?: ImageAsset[] | null;
}

export interface CarouselSlide {
  _key?: string;
  _type?: string;
  slideTitle?: string;
  slideDescription?: string;
  heading?: string;
  text?: string;
  slideImage?: ImageAsset;
  features?: { featureName: string; icon?: string; _key?: string }[];
  orderIndex?: number;
}

export interface ExperienceConnectoCarousel {
  _key: string;
  _type: "experienceConnectoCarousel";
  sectionHeading?: string;
  sectionDescription?: string;
  title?: string | null;
  slides?: CarouselSlide[] | null;
  carouselSlides?: CarouselSlide[] | null;
  bottomFeatures?: {
    _key?: string;
    description: string;
    featureName: string;
  }[];
}

export interface FeaturesData {
  id: string;
  title: string;
  seo?: SanitySeo;
  isActive: boolean;
  heroSection?: HeroCallToAction;
  featuresGrid?: FeaturesGrid;
  whatsNew?: WhatsNewSection;
  gallery?: AppScreensGallery;
  carousel?: ExperienceConnectoCarousel;
}

// === GROQ Query ===
const featuresPageQuery = `*[_type == "featuresPage"][0]{
  _id,
  title,
  seo{
    _type,
    metaTitle,
    metaDescription,
    canonicalUrl,
    focusKeyword,
    keywords,
    schemaType,
    customSchema,
    slug{ current },
    openGraph{
      title,
      description,
      type,
      siteName,
      image{ asset->{url}, alt }
    },
    noIndex,
    noFollow,
    priority,
    changeFreq
  },
  isActive,
  pageBuilder[]{...}
}`;

// === SEO Metadata ===
export async function generateMetadata() {
  const data = await client.fetch<FeaturesData>(
    featuresPageQuery,
    {},
    { cache: "force-cache" }
  );
  return generateSeoMetadata(data?.seo);
}

// === Server Component ===
export default async function FeaturesSectionServer() {
  const data = await client.fetch<any>(
    featuresPageQuery,
    {},
    { cache: "force-cache" }
  );


  if (!data) {
    return <div>Features page data not found.</div>;
  }

  // Extract pageBuilder sections
  const heroSectionRaw = data.pageBuilder?.find(
    (s: any) => s._type === "heroCallToAction"
  );
  const featuresGridRaw = data.pageBuilder?.find(
    (s: any) => s._type === "featuresGrid"
  );
  const whatsNewRaw = data.pageBuilder?.find(
    (s: any) => s._type === "whatsNewSection"
  );
  const galleryRaw = data.pageBuilder?.find(
    (s: any) => s._type === "appScreensGallery"
  );
  const carouselRaw = data.pageBuilder?.find(
    (s: any) => s._type === "experienceConnectoCarousel"
  );

  // Map data into strongly typed object
  const featuresData: FeaturesData = {
    id: data._id,
    title: data.title,
    seo: data?.seo,
    isActive: data.isActive ?? false,
    heroSection: heroSectionRaw || undefined,
    featuresGrid: featuresGridRaw || undefined,
    whatsNew: whatsNewRaw || undefined,
    gallery: galleryRaw || undefined,
    carousel: carouselRaw || undefined,
  };

  return <FeaturesSectionClient featuresData={featuresData} />;
}
