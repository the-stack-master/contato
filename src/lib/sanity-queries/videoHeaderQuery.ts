// lib/queries/videoHeaderText.ts
import { client } from "@/lib/sanity";
import { VideoHeaderText } from "@/types/videoTypes";

export async function getVideoHeaderText(): Promise<VideoHeaderText | null> {
  const query = `
    *[_type == "videoHeaderText" && isActive == true][0]{
      _id,
      _type,
      title,
      mainHeading,
      highlightedText,
      description,
      isActive,
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
      videoCategories[]{
        _key,
        label,
        value,
        isPrimary,
        orderIndex,
        category->{
          _id,
          _type,
          title,
          slug
        }
      }
    }
  `;

  const result = await client.fetch<VideoHeaderText | null>(query);
  return result;
}
