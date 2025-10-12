import FooterClient from "@/app/(main)/Components/Footer";
import { FooterDocument } from "@/types/footerTypes";
import { getFooter } from "@/lib/sanity-queries/footerQuery";
import { generateSeoMetadata } from "@/lib/generateMetadata";

export async function generateMetadata() {
  const footer = await getFooter();
  return generateSeoMetadata(footer?.seo);
}

export default async function FooterServer() {
  const footerData: FooterDocument | null = await getFooter();

  return <FooterClient footerData={footerData} />;
}
