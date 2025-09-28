// app/features/page.tsx (Server Component)
import HeroSection from "./components/HeroSection";
import FeaturesHighlight from "./components/FeaturesHighlight";
import AppShowcase from "./components/AppShowcase";
import FeaturesList from "./components/FeaturesList";
import CallToAction from "./components/CallToAction";

export default function FeaturesPage() {
  return (
    <>
      <HeroSection />
      <FeaturesHighlight />
      <AppShowcase />
      <FeaturesList />
      <CallToAction />
    </>
  );
}
