import FooterClient from "@/app/(main)/Components/Footer";
import { FooterDocument } from "@/types/footerTypes";
import { getFooter } from "@/lib/sanity-queries/footerQuery";
import { generateMetadata } from "@/lib/generateMetadata";
import { SupportPageType } from "@/types/supportPageTypes";
import SupportPage from "@/app/(main)/support/SupportClient";
import { getSupportPage } from "@/lib/sanity-queries/supportHeaderQuery";

export async function generateMetadataForHome() {
  const footer = await getFooter();
  return generateMetadata(footer?.seo);
}

export default async function SupportListServer() {
  const supportData: SupportPageType | null = await getSupportPage();

  console.log("data", supportData);

  return <SupportPage supportData={supportData} />;
}
