import ExpandingCardsSection from "@/components/ui/Cards/FeatureSectionCards";
import { SmartDigitalToolsSection } from "@/types/homeTypes";

interface NewFeaturesSectionProps {
  newFeaturesData: SmartDigitalToolsSection | null;
}

const NewFeaturesSection = ({ newFeaturesData }: NewFeaturesSectionProps) => {
  if (!newFeaturesData) return null;
  return (
    <section>
      <ExpandingCardsSection newFeaturesData={newFeaturesData} />
    </section>
  );
};

export default NewFeaturesSection;
