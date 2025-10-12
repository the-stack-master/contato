import { getFooter } from "@/lib/sanity-queries/footerQuery";
import { generateMetadata } from "@/lib/generateMetadata";
import { SupportPageType } from "@/types/supportPageTypes";
import SupportPage from "@/app/(main)/support/SupportClient";
import { getSupportPage } from "@/lib/sanity-queries/supportHeaderQuery";
import VideoClient from "@/app/(main)/videos/VideoClient";
import BlogClient from "@/app/(main)/blog/BlogClient";
import { getBlogHeader } from "@/lib/sanity-queries/blogHeaderQuery";
import { BlogPageHeader } from "@/types/blogTypes";

export async function generateMetadataForHome() {
  const footer = await getFooter();
  return generateMetadata(footer?.seo);
}

export default async function BlogServer() {
  const blogHeaderData: BlogPageHeader | null = await getBlogHeader();

  return <BlogClient blogHeaderData={blogHeaderData} />;
}
