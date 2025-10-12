import { client } from "@/lib/sanity";
import type { SanityDocumentUpload } from "@/types/documentFetchTypes";

export async function getDocumentBySlugs(
  parentSlug: string,
  documentSlug: string
): Promise<SanityDocumentUpload | null> {
  const query = `
    *[_type == "documentUpload" && slug.current == $parentSlug][0]{
      _id,
      title,
      slug,
      "document": documents[slug.current == $documentSlug][0]{
        _key,
        title,
        subtitle,
        slug,
        file {
          _type,
          asset->{
            _id,
            url
          }
        },
        category->{
          _id,
          title,
          slug
        },
        fileSize,
        fileType,
        version,
        accessLevel,
        author,
        uploadedBy,
        publishedAt,
        lastUpdated,
        expiresAt,
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
      }
    }
  `;

  const result = await client.fetch<SanityDocumentUpload>(query, {
    parentSlug,
    documentSlug,
  });

  if (!result?.document) return null;
  return result;
}
