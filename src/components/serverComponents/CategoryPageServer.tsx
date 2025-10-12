// app/(main)/Components/CategoryServer.tsx

import SupportCategoryHeader from "@/app/(main)/support/category/SupportCategoryHeader";
import SupportArticlesList from "@/app/(main)/support/category/SupportArticlesList";
import { getDocumentBySlug } from "@/lib/sanity-queries/categoryPageQuery";
import { DocumentUpload } from "@/types/categoryPageTypes";
import { generateSeoMetadata } from "@/lib/generateMetadata";

interface CategoryServerProps {
  slug?: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const docData = await getDocumentBySlug(params.slug);
  return generateSeoMetadata(docData?.seo);
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
