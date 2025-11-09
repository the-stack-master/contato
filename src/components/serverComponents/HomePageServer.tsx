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

  const featuresData = {
    latest: [
      {
        title: "AI-Powered Matching",
        description:
          "Advanced algorithms connect you with the most relevant professionals in your industry",
        icon: "brain",
        badge: "New",
      },
      {
        title: "Smart Event Discovery",
        description:
          "Find networking events near you based on your interests and professional goals",
        icon: "calendar",
        badge: "Updated",
      },
      {
        title: "Video Introduction Cards",
        description:
          "Make memorable first impressions with 30-second video introductions",
        icon: "video",
        badge: "New",
      },
      {
        title: "Real-Time Collaboration",
        description:
          "Connect instantly with professionals through live video sessions and interactive workshops",
        icon: "video",
        badge: "Beta",
      },
    ],
    complete: [
      {
        title: "AI-Powered Matching",
        description:
          "Connect with professionals who share your interests, industry, and career goals using advanced AI algorithms",
        icon: "brain",
      },
      {
        title: "Smart Event Discovery",
        description:
          "Discover networking events, conferences, and meetups tailored to your professional interests",
        icon: "calendar",
      },
      {
        title: "Video Introductions",
        description:
          "Create compelling 30-second video introductions to make lasting first impressions",
        icon: "video",
      },
      {
        title: "Secure Messaging",
        description:
          "Connect safely with end-to-end encrypted messaging and verified professional profiles",
        icon: "shield",
      },
      {
        title: "Career Opportunities",
        description:
          "Get matched with job opportunities and business partnerships through your network",
        icon: "briefcase",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Track your networking progress with detailed insights and connection analytics",
        icon: "chart",
      },
      {
        title: "Industry Insights",
        description:
          "Stay updated with personalized industry news and trending professional topics",
        icon: "trending",
      },
      {
        title: "Virtual Coffee Chats",
        description:
          "Schedule and join virtual networking sessions with professionals worldwide",
        icon: "coffee",
      },
      {
        title: "Profile Verification",
        description:
          "Build trust with LinkedIn integration and professional credential verification",
        icon: "check",
      },
    ],
    benefits: [
      {
        title: "Expand Your Network Globally",
        description:
          "Connect with over 2M+ professionals across 150+ countries",
        metric: "2M+ Professionals",
      },
      {
        title: "Save Time with AI Matching",
        description:
          "Our AI finds the right connections for you, saving hours of manual searching",
        metric: "80% Time Saved",
      },
      {
        title: "Increase Career Opportunities",
        description:
          "Users report 3x more job opportunities through our networking platform",
        metric: "3x More Opportunities",
      },
    ],
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Marketing Director",
        company: "TechStart Inc.",
        content:
          "NetworkPro helped me find my dream job! The AI matching is incredibly accurate.",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      {
        name: "Michael Rodriguez",
        role: "Startup Founder",
        company: "InnovateNow",
        content:
          "I've made invaluable business connections that led to our Series A funding.",
        avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      {
        name: "Emily Johnson",
        role: "Software Engineer",
        company: "Global Tech",
        content:
          "The video introductions feature makes networking feel personal and authentic.",
        avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
    ],
    howItWorks: [
      {
        title: "Create Your Profile",
        subtitle: "Set up in minutes",
        description:
          "Sign up and build your professional profile with your experience, skills, and career goals. Add a video introduction to stand out and make authentic connections.",
        icon: "userPlus",
      },
      {
        title: "AI Finds Your Matches",
        subtitle: "Smart connections made easy",
        description:
          "Our advanced AI algorithm analyzes your profile, interests, and goals to connect you with the most relevant professionals in your industry and beyond.",
        icon: "sparkles",
      },
      {
        title: "Connect & Engage",
        subtitle: "Build meaningful relationships",
        description:
          "Start conversations, attend virtual events, and join industry discussions. Our secure messaging platform makes it easy to network authentically.",
        icon: "message",
      },
      {
        title: "Grow Your Career",
        subtitle: "Unlock new opportunities",
        description:
          "Leverage your expanded network to discover job opportunities, find business partners, and accelerate your professional growth with insider insights.",
        icon: "trending",
      },
    ],
  };

  return (
    <>
      <NewHeroSection
        heroData={heroData}
        appShowcaseData={appShowCaseData}
        logoData={logoData}
      />
      {/* <AboutSection /> */}
      <ContatoSection />
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
