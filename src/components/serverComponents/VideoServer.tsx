import { generateSeoMetadata } from "@/lib/generateMetadata";
import VideoClient from "@/app/(main)/videos/VideoClient";
import { VideoHeaderText } from "@/types/videoTypes";
import { getVideoHeaderText } from "@/lib/sanity-queries/videoHeaderQuery";

export async function generateMetadata() {
  const video = await getVideoHeaderText();
  return generateSeoMetadata(video?.seo);
}

export default async function VideoServer() {
  const videoHeaderData: VideoHeaderText | null = await getVideoHeaderText();

  return <VideoClient videoHeaderData={videoHeaderData} />;
}
