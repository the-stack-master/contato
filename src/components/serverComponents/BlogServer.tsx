import { generateSeoMetadata } from "@/lib/generateMetadata";
import BlogClient from "@/app/(main)/blog/BlogClient";
import { getBlogHeader } from "@/lib/sanity-queries/blogHeaderQuery";
import { BlogPageHeader } from "@/types/blogTypes";

export async function generateMetadata() {
  const blogData = await getBlogHeader();
  return generateSeoMetadata(blogData?.seo);
}

export default async function BlogServer() {
  const blogHeaderData: BlogPageHeader | null = await getBlogHeader();

  return <BlogClient blogHeaderData={blogHeaderData} />;
}
