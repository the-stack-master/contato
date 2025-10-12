import { getFooter } from "@/lib/sanity-queries/footerQuery";
import { generateMetadata } from "@/lib/generateMetadata";
import { SupportPageType } from "@/types/supportPageTypes";
import SupportPage from "@/app/(main)/support/SupportClient";
import { getSupportPage } from "@/lib/sanity-queries/supportHeaderQuery";
import VideoClient from "@/app/(main)/videos/VideoClient";
import { VideoHeaderText } from "@/types/videoTypes";
import { getVideoHeaderText } from "@/lib/sanity-queries/videoHeaderQuery";

export async function generateMetadataForHome() {
  const footer = await getFooter();
  return generateMetadata(footer?.seo);
}

export default async function VideoServer() {
  const videoHeaderData: VideoHeaderText | null = await getVideoHeaderText();

  return <VideoClient videoHeaderData={videoHeaderData} />;
}
