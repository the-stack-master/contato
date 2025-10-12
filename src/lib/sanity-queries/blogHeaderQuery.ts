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
    seo
  }`;

  return client.fetch<BlogPageHeader | null>(query);
}
