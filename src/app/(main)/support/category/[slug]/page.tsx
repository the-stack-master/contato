import SupportCategoryHeader from "../SupportCategoryHeader";
import SupportArticlesList from "../SupportArticlesList";
import CategoryServer from "@/components/serverComponents/CategoryPageServer";

export const revalidate = 60;

interface PageProps {
  params: {
    slug: string;
  };
}

const CategoryPage = ({ params }: PageProps) => {
  return <CategoryServer slug={params.slug} />;
};

export default CategoryPage;
