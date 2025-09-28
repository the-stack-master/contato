import { client } from "@/lib/sanity";
import PricingSectionClient from "@/app/(main)/Components/PricingSection";

const pricingHeaderQuery = `*[_type == "homePricingHeader"][0]{
  _id,
  heading,
  subHeading
}`;

const pricingBlocksQuery = `*[_type == "homePricingBlocks"]{
  _id,
  title,
  pricingPlans[]{
    planName,
    planSubtitle,
    price,
    pricePeriod,
    description,
    features[]{
      text,
      included
    },
    buttonText,
    buttonUrl,
    isPopular,
    badgeText,
    planIcon
  }
}`;

const pricingFooterQuery = `*[_type == "homePricingFooter"]{
  _id,
  title,
  mainText,
  features[]{
    text,
    icon
  },
  isActive
}`;

export default async function PricingSectionServer() {
  const pricingHeader = await client.fetch(pricingHeaderQuery);
  const pricingBlocks = await client.fetch(pricingBlocksQuery);
  const pricingFooter = await client.fetch(pricingFooterQuery);

  return (
    <PricingSectionClient
      pricingHeader={pricingHeader}
      pricingBlocks={pricingBlocks}
      pricingFooter={pricingFooter}
    />
  );
}
