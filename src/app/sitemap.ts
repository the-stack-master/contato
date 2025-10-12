/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

export const revalidate = 86400; // Cache sitemap for 1 day

async function getBlogPages() {
  const query = `*[_type == "blogPage"]{
    slug,
    _updatedAt
  }`;
  return client.fetch(query);
}

async function getSupportDocs() {
  const query = `*[_type == "documentUpload"]{
    documents[]{
      slug,
      _updatedAt,
      category->{
        slug
      }
    }
  }`;
  return client.fetch(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://example.com";

  const blogPages = await getBlogPages();
  const documentUploads = await getSupportDocs();

  const staticPaths = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/features`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/videos`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/blog`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/support`, lastModified: new Date().toISOString() },
    {
      url: `${baseUrl}/support/category`,
      lastModified: new Date().toISOString(),
    },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
  ];

  const blogPaths = blogPages.map(
    (page: { slug: { current: any }; _updatedAt: any }) => ({
      url: `${baseUrl}/blog/${page.slug.current}`,
      lastModified: page._updatedAt,
    })
  );

  const supportDocPaths = documentUploads.flatMap(
    (upload: { documents: any[] }) =>
      upload.documents?.map((doc) => ({
        url: `${baseUrl}/support/category/${doc.category?.slug?.current}/${doc.slug?.current}`,
        lastModified: doc._updatedAt,
      })) || []
  );

  return [...staticPaths, ...blogPaths, ...supportDocPaths];
}
