// lib/sanity-queries/supportPageQuery.ts
import { client } from "@/lib/sanity";
import { SupportPageType } from "@/types/supportPageTypes";

export async function getSupportPage(
  slug?: string
): Promise<SupportPageType | null> {
  const query = `
    *[_type == "supportPage"${slug ? " && slug.current == $slug" : ""}][0]{
      _id,
      title,
      subtitle,
      slug,
      searchSection {
        searchPlaceholder,
        searchButtonText,
        enableSearch
      },
      ctaSection {
        enabled,
        title,
        description,
        buttonText,
        buttonLink
      },
      seo,
      isPublished,
      publishedAt,
      _updatedAt
    }
  `;

  const result: SupportPageType | null = await client.fetch(query, { slug });
  return result;
}
