import FooterClient from "@/app/(main)/Components/Footer";
import { FooterDocument } from "@/types/footerTypes";
import { getFooter } from "@/lib/sanity-queries/footerQuery";
import { generateMetadata } from "@/lib/generateMetadata";

export async function generateMetadataForHome() {
  const footer = await getFooter();
  return generateMetadata(footer?.seo);
}

export default async function FooterServer() {
  const footerData: FooterDocument | null = await getFooter();

  return <FooterClient footerData={footerData} />;
}
