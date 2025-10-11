import DocumentServer from "@/components/serverComponents/DocumentFetchServer";

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
