import { getSignupPage } from "@/lib/sanity-queries/signUpPageQuery";
import SignupForm from "../ui/SIgnUpForm";
import { SignupPageDocument } from "@/types/signUpPageTypes";
import { generateMetadata } from "@/lib/generateMetadata";
import { SanityDocumentUpload } from "@/types/documentFetchTypes";
import { getDocumentBySlugs } from "@/lib/sanity-queries/documentFetchQuery";

import DocClient from "@/app/(main)/support/category/[slug]/[docSlug]/DocClient";

// export async function generateMetadataForSignUp() {
//   const signUpData = await getSignupPage();
//   return generateMetadata(signUpData?.seo);
// }

interface DocumentServerProps {
  parentSlug: string;
  documentSlug: string;
}

export default async function DocumentServer({
  parentSlug,
  documentSlug,
}: DocumentServerProps) {
  const docData: SanityDocumentUpload | null = await getDocumentBySlugs(
    parentSlug,
    documentSlug
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/80 to-red-50/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <DocClient docData={docData} />
      </div>
    </div>
  );
}
