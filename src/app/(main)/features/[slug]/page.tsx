import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/generateMetadata";
import { SanitySeo } from "@/types/commonTypes";
import FeatureDetailClient from "./FeatureDetailClient";

export const revalidate = 60;

// === Types ===
export interface FeatureItem {
  _key?: string;
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  _key?: string;
  number: string;
  label: string;
}

export interface HowItWorksStep {
  _key?: string;
  title: string;
  content: string;
  image?: string;
}

export interface DetailPoint {
  _key?: string;
  title: string;
  description: string;
  icon: string;
}

export interface Paragraph {
  _key?: string;
  text: string;
  emphasis?: boolean;
}

export interface MoreInfo {
  title?: string;
  subtitle?: string;
  paragraphs?: Paragraph[];
}

export interface FeatureDetailData {
  _id: string;
  slug: { current: string };
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  detailedDescription?: string;
  heroImage?: string;
  benefits?: string[];
  features?: FeatureItem[];
  stats?: StatItem[];
  howItWorksSteps?: HowItWorksStep[];
  detailPoints?: DetailPoint[];
  moreInfo?: MoreInfo;
  isPublished?: boolean;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// === GROQ Query ===
const featureDetailQuery = `*[_type == "featureDetailPage" && slug.current == $slug][0]{
  _id,
  slug,
  title,
  subtitle,
  description,
  icon,
  detailedDescription,
  heroImage,
  benefits,
  features[]{
    _key,
    title,
    description,
    icon
  },
  stats[]{
    _key,
    number,
    label
  },
  howItWorksSteps[]{
    _key,
    title,
    content,
    image
  },
  detailPoints[]{
    _key,
    title,
    description,
    icon
  },
  moreInfo{
    title,
    subtitle,
    paragraphs[]{
      _key,
      text,
      emphasis
    }
  },
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
  isPublished
}`;

// === SEO Metadata ===
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await client.fetch<FeatureDetailData & { seo?: SanitySeo }>(
    featureDetailQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!data) return {};

  return generateSeoMetadata(data.seo);
}

// === Generate Static Params ===
export async function generateStaticParams() {
  const query = `*[_type == "featureDetailPage" && defined(slug.current)]{"slug": slug.current}`;
  const slugs: { slug: string }[] = await client.fetch(query);
  return slugs.map(({ slug }) => ({ slug }));
}

// === Server Component ===
export default async function FeatureDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const feature = await client.fetch<FeatureDetailData>(
    featureDetailQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!feature) {
    notFound();
  }

  return <FeatureDetailClient feature={feature} />;
}
