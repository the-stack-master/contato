import { cookies } from "next/headers";
import AnnouncementBanner from "./Components/AnnouncementBanner";
import StatsSection from "./Components/StatsSection";
import FeaturesSection from "./Components/FeaturesSection";
import TestimonialsSection from "./Components/TestimonialsSection";
import PricingSection from "./Components/PricingSection";
import Footer from "./Components/Footer";
import NewHeroSection from "./Components/NewHero";
import SimpleVideoSection from "./Components/VideoSection";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  if (authToken) {
    try {
      JSON.parse(decodeURIComponent(authToken.value));
    } catch {
      // Invalid cookie, user will be redirected by layout
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <AnnouncementBanner /> */}
      <main>
        {/* <HeroSection /> */}
        <NewHeroSection />
        <StatsSection />
        <FeaturesSection />
        <SimpleVideoSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
