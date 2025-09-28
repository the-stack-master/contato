import { client } from "@/lib/sanity";
import FeaturesSectionClient from "@/app/(main)/Components/FeaturesSection";

interface Feature {
  text: string;
}

interface FeatureBlock {
  icon: string;
  title: string;
  description: string;
  features: Feature[];
}

interface HomeFeatureBlocks {
  _id: string;
  title: string;
  featureBlocks: FeatureBlock[];
}

interface HomeFeatureHeader {
  _id: string;
  title: string;
  heading: string;
  subHeading: string;
}

const featureBlocksQuery = `*[_type == "homeFeatureBlocks"][0]{
  _id,
  title,
  featureBlocks[]{
    icon,
    title,
    description,
    features[]{ text }
  }
}`;

const featureHeaderQuery = `*[_type == "homeFeatureHeader"][0]{
  _id,
  title,
  heading,
  subHeading
}`;

export default async function FeaturesSectionServer() {
  const featureBlocks: HomeFeatureBlocks | null = await client.fetch(
    featureBlocksQuery
  );
  const featureHeader: HomeFeatureHeader | null = await client.fetch(
    featureHeaderQuery
  );

  return (
    <FeaturesSectionClient
      featureHeader={featureHeader}
      featureBlocks={featureBlocks}
    />
  );
}
