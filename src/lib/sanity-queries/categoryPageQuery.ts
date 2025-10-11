import { client } from "@/lib/sanity";
import { DocumentUpload } from "@/types/categoryPageTypes";

export async function getDocumentBySlug(
  slug: string
): Promise<DocumentUpload | null> {
  const query = `*[_type == "documentUpload" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    subtitle,
    slug,
    description,
    documents[]{
      _key,
      slug,
      title,
      subtitle,
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
    },
    "totalDocuments": count(documents),
    tags,
    status,
    featured,
    seo,
    internalNotes
  }`;

  return client.fetch(query, { slug });
}
