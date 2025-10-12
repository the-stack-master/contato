// lib/sanity-queries/documentQuery.ts
import { client } from "@/lib/sanity";
import { DocumentUpload } from "@/types/supportPageTypes";

interface GetDocumentsOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getDocumentUploads({
  page = 1,
  pageSize = 10,
  search = "",
}: GetDocumentsOptions): Promise<DocumentUpload[]> {
  const offset = (page - 1) * pageSize;

  const query = `
  *[_type == "documentUpload" ${search ? `&& title match $search` : ""}] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    subtitle,
    slug,
    description,
    "documents": documents[]{
      title,
      slug,
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
    internalNotes
  }
  [totalDocuments > 0]  // only keep uploads with at least one document
  [${offset}...${offset + pageSize}]
  | order(${search ? "_updatedAt desc" : "title asc"})
  `;

  const result: DocumentUpload[] = await client.fetch(query, {
    search: search ? `*${search}*` : undefined,
  });

  return result;
}
