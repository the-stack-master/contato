import { HomePage } from "@/types/homeTypes";
import { client } from "@/lib/sanity";

export async function getHomePage(): Promise<HomePage | null> {
  const query = `*[_type == "homePage" && isActive == true][0]{
        title,
        seo{
    _type,
    metaTitle,
    metaDescription,
    canonicalUrl,
    focusKeyword,
    keywords,
    schemaType,
    customSchema,
    slug{ current },
    openGraph{
      title,
      description,
      type,
      siteName,
      image{ asset->{url}, alt }
    },
    noIndex,
    noFollow,
    priority,
    changeFreq
  },
        pageBuilder[]{
          _type,
          ...,
          _type == "appShowcaseSection" => {
            imageUrls[]{ imageUrl, alt }
          },
          _type == "contentFeaturesGrid" => {
            sectionHeading,
            sectionDescription,
            features[]{ featureTitle, description, featurePoints }
          },
          _type == "networkSmarterHero" => {
            mainHeading,
            secondaryHeading,
            highlightedWord,
            description,
            statistics[]{ value, label },
            ctaButtons[]{ buttonText, buttonUrl, isPrimary },
            demoVideo{ videoText, videoDuration },
            brandIcon{ asset->{url}, alt }
          },
          _type == "pricingPlans" => {
            sectionHeading,
            sectionDescription,
            plans[]{ planName, planType, price, priceUnit, features, buttonText, buttonUrl, isPopular },
            bottomText
          },
          _type == "trustStatistics" => {
            sectionHeading,
            sectionDescription,
            statistics[]{ value, label }
          },
          _type == "platformLearning" => {
            sectionHeading,
            description,
            features[]{ icon, title },
            ctaButton{ buttonText, buttonUrl },
            videoEmbed{ videoUrl, thumbnailImage{ asset->{url}, alt } }
          },
          _type == "userTestimonials" => {
            sectionHeading,
            sectionDescription,
            testimonials[]{ rating, testimonialText, authorName, authorTitle, authorInitials }
          }
        },
        isActive
      }`;

  const data = await client.fetch(query);
  return data;
}
