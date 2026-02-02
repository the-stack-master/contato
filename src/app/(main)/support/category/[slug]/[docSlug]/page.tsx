import DocumentServer from "@/components/serverComponents/DocumentFetchServer";

export const revalidate = 60;

interface PageProps {
  params: {
    slug: string;
    docSlug: string;
  };
}

const DocSlug = ({ params }: PageProps) => {
  return (
    <DocumentServer parentSlug={params.slug} documentSlug={params.docSlug} />
  );
};

export default DocSlug;
