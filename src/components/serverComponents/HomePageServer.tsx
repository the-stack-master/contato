import React from "react";
import NewHeroSection from "@/app/(main)/Components/NewHero";
import StatsSection from "@/app/(main)/Components/StatsSection";
import FeaturesSectionClient from "@/app/(main)/Components/FeaturesSection";
import VideoSection from "@/app/(main)/Components/VideoSection";
import TestimonialsSectionClient from "@/app/(main)/Components/TestimonialsSection";
import PricingSectionClient from "@/app/(main)/Components/PricingSection";
import { getHomePage } from "@/lib/sanity-queries/homePageQuery";
import { generateSeoMetadata } from "@/lib/generateMetadata";
import { HomePage } from "@/types/homeTypes";
import { Video } from "@/types/videoTypes";
import { getLatestVideos } from "@/lib/sanity-queries/videoListQuery";
import { LogoDocument } from "@/types/commonTypes";
import { getLogo } from "@/lib/sanity-queries/logoFetchQuery";
import LatestFeaturesSection from "@/app/(main)/Components/LatestFeaturesSection";
import { AboutSection } from "@/app/(main)/Components/AboutAppSection";
import NewFeaturesSection from "@/app/(main)/Components/NewFeaturesSection";
import ContatoSection from "./VisionSection";

export async function generateMetadata() {
  const homepage = await getHomePage();
  return generateSeoMetadata(homepage?.seo);
}

const HomePageServer = async () => {
  const homePage: HomePage | null = await getHomePage();
  const videos: Video[] | null = await getLatestVideos();
  const logoData: LogoDocument | null = await getLogo();

  if (!homePage) {
    return (
      <section>
        <p>404 Not Found</p>
      </section>
    );
  }

  const heroData =
    homePage?.pageBuilder.find(
      (section) => section._type === "networkSmarterHero"
    ) || null;

  const featureData =
    homePage?.pageBuilder.find(
      (section) => section._type === "contentFeaturesGrid"
    ) || null;

  const testimonialData =
    homePage?.pageBuilder.find(
      (section) => section._type === "userTestimonials"
    ) || null;

  const pricingData =
    homePage?.pageBuilder.find((section) => section._type === "pricingPlans") ||
    null;

  const statsData =
    homePage?.pageBuilder.find(
      (section) => section._type === "trustStatistics"
    ) || null;

  const videoData =
    homePage?.pageBuilder.find(
      (section) => section._type === "platformLearning"
    ) || null;

  const appShowCaseData =
    homePage?.pageBuilder.find(
      (section) => section?._type === "appShowcaseSection"
    ) || null;

  const aboutData = homePage?.pageBuilder?.find((section) => section?._type === "aboutCommunicationSection") || null

  return (
    <>
      <NewHeroSection
        heroData={heroData}
        appShowcaseData={appShowCaseData}
        logoData={logoData}
      />
      <AboutSection aboutData={aboutData} />
      {/* <ContatoSection /> */}
      <StatsSection statsData={statsData} />
      {/* <FeaturesSectionClient featureData={featureData} /> */}
      {/* <LatestFeaturesSection features={featuresData.latest} /> */}
      <NewFeaturesSection />
      <VideoSection videoData={videoData} videoList={videos} />
      <TestimonialsSectionClient testimonialData={testimonialData} />
      <PricingSectionClient pricingData={pricingData} />
    </>
  );
};

export default HomePageServer;
