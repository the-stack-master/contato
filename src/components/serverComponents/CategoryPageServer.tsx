// app/(main)/Components/CategoryServer.tsx

import SupportCategoryHeader from "@/app/(main)/support/category/SupportCategoryHeader";
import SupportArticlesList from "@/app/(main)/support/category/SupportArticlesList";
import { getDocumentBySlug } from "@/lib/sanity-queries/categoryPageQuery";
import { DocumentUpload } from "@/types/categoryPageTypes";
import { generateMetadata } from "@/lib/generateMetadata";

// export async function generateMetadataForHome() {
//   const footer = await getDocumentBySlug(slug);
//   return generateMetadata(footer?.seo);
// }

interface CategoryServerProps {
  slug?: string;
}

export default async function CategoryServer({ slug }: CategoryServerProps) {
  if (!slug?.length)
    return (
      <main>
        <div>404 Not found</div>
      </main>
    );
  const categoryData: DocumentUpload | null = await getDocumentBySlug(slug);

  return (
    <main>
      <SupportCategoryHeader category={categoryData} />
      <SupportArticlesList
        articles={categoryData?.documents}
        categorySlug={categoryData?.slug?.current}
      />
    </main>
  );
}
