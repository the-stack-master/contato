import { generateSeoMetadata } from "@/lib/generateMetadata";
import { SupportPageType } from "@/types/supportPageTypes";
import SupportPage from "@/app/(main)/support/SupportClient";
import { getSupportPage } from "@/lib/sanity-queries/supportHeaderQuery";

export async function generateMetadata() {
  const supportData = await getSupportPage();
  return generateSeoMetadata(supportData?.seo);
}

export default async function SupportListServer() {
  const supportData: SupportPageType | null = await getSupportPage();

  return <SupportPage supportData={supportData} />;
}
