// lib/queries/blogPageHeader.ts
import { client } from "@/lib/sanity";
import { BlogPageHeader } from "@/types/blogTypes";

export async function getBlogHeader(): Promise<BlogPageHeader | null> {
  const query = `*[_type == "blogPageHeader"][0]{
    _id,
    _type,
    title,
    heading,
    subHeading,
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
  }
  }`;

  return client.fetch<BlogPageHeader | null>(query);
}
