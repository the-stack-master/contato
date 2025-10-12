import { SanitySeo, ImageWithAlt } from "@/types/commonTypes";
import { Metadata } from "next";

export function generateSeoMetadata(seo?: SanitySeo): Metadata {
  if (!seo) return {};

  const {
    metaTitle,
    metaDescription,
    canonicalUrl,
    openGraph,
    noIndex,
    noFollow,
    schemaType,
    customSchema,
    priority,
    changeFreq,
  } = seo;

  const ogImage: ImageWithAlt | undefined = openGraph?.image;

  // Ensure type is compatible with Next.js
  const metadataOpenGraphType: "website" | "article" | "profile" =
    openGraph?.type === "product" ? "website" : openGraph?.type || "website";

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
    openGraph: {
      title: openGraph?.title || metaTitle,
      description: openGraph?.description || metaDescription,
      url: canonicalUrl,
      siteName: openGraph?.siteName,
      type: metadataOpenGraphType,
      images: ogImage
        ? [
            {
              url: ogImage.asset.url,
              alt: ogImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: openGraph?.title || metaTitle,
      description: openGraph?.description || metaDescription,
      images: ogImage ? [ogImage.asset.url] : undefined,
    },
    other: {
      schema: customSchema
        ? JSON.parse(customSchema)
        : {
            "@context": "https://schema.org",
            "@type": schemaType || "WebPage",
          },
      ...(priority !== undefined ? { sitemapPriority: priority } : {}),
      ...(changeFreq ? { changeFrequency: changeFreq } : {}),
    },
  };
}
