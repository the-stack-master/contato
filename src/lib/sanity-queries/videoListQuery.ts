import { client } from "@/lib/sanity";
import { Video } from "@/types/videoTypes";

export async function getLatestVideos(): Promise<Video[] | null> {
  const query = `*[_type == "video"] | order(_createdAt desc)[0...10]{
        _id,
        _createdAt,
        title,
        slug,
        description,
        videoSource,
        "videoFileUrl": videoFile.asset->url,
        videoUrl,
        isFeatured,
        duration,
        category->{
          _id,
          title,
          slug
        },
        tags,
      
        // ✅ Always return consistent thumbnail structure
        "thumbnails": thumbnails[]{
          _type == "image" => {
            "url": coalesce(asset->url, ""),
            "alt": coalesce(alt, "Video thumbnail")
          },
          _type == "externalThumbnail" => {
            "url": coalesce(url, ""),
            "alt": coalesce(alt, "External thumbnail")
          }
        },
      
        seo{
          metaTitle,
          metaDescription,
          focusKeyword,
          canonicalUrl,
          schema,
          "openGraphImage": {
            "url": openGraphImage.asset->url,
            "alt": coalesce(openGraphImage.alt, "")
          }
        }
      }`;

  const data = await client.fetch(query);
  return data || null;
}
