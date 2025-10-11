// lib/sanity-queries/documentQuery.ts
import { client } from "@/lib/sanity";
import { DocumentItem } from "@/types/supportPageTypes";

export async function getDocumentItemBySlug(
  slug: string
): Promise<DocumentItem | null> {
  const query = `
    *[_type == "documentUpload" && documents[slug.current == $slug]]{
      _id,
      title,
      slug,
      "document": documents[slug.current == $slug][0]{
        _key,
        title,
        subtitle,
        slug,
        file{asset->{url}},
        category->{_id, title, slug},
        fileSize,
        fileType,
        version,
        accessLevel,
        author,
        uploadedBy,
        publishedAt,
        lastUpdated,
        expiresAt
      }
    }[0]
  `;

  const result = await client.fetch(query, { slug });
  return result?.document || null;
}
