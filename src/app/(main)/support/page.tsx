import { Metadata } from "next";
import SupportHeroSection from "./SupportHeroSection";
import SupportCategoriesSection from "./SupportCategoriesSection";

export const metadata: Metadata = {
  title: "Contato Support - Help Center",
  description:
    "Find answers to your questions about Contato. Get help with features, troubleshooting, and more.",
  keywords:
    "Contato support, help center, networking app help, troubleshooting",
};

// Support data - this would typically come from a CMS or database
const supportData = {
  categories: [
    {
      id: "getting-started",
      title: "Getting Started",
      description:
        "Learn the basics of Contato and set up your professional profile",
      icon: "rocket",
      articleCount: 9,
      articles: [
        {
          id: 1,
          title: "Creating Your Professional Profile",
          slug: "creating-professional-profile",
        },
        { id: 2, title: "Setting Up Your Account", slug: "setting-up-account" },
        {
          id: 3,
          title: "Verifying Your Professional Credentials",
          slug: "verifying-credentials",
        },
      ],
    },
    {
      id: "ai-matching",
      title: "AI-Powered Matching",
      description:
        "Discover how our AI connects you with the right professionals",
      icon: "brain",
      articleCount: 9,
      articles: [
        {
          id: 6,
          title: "How AI Matching Works",
          slug: "how-ai-matching-works",
        },
        {
          id: 7,
          title: "Improving Your Match Quality",
          slug: "improving-match-quality",
        },
        {
          id: 8,
          title: "Understanding Match Scores",
          slug: "understanding-match-scores",
        },
      ],
    },
    {
      id: "messaging",
      title: "Messaging & Communication",
      description: "Connect safely with secure messaging and video features",
      icon: "message",
      articleCount: 10,
      articles: [
        { id: 12, title: "Sending Your First Message", slug: "first-message" },
        {
          id: 13,
          title: "Video Introduction Cards",
          slug: "video-introductions",
        },
        {
          id: 14,
          title: "Message Encryption & Security",
          slug: "message-security",
        },
      ],
    },
    {
      id: "events",
      title: "Events & Networking",
      description: "Find and attend professional events and meetups",
      icon: "calendar",
      articleCount: 8,
      articles: [
        {
          id: 19,
          title: "Discovering Networking Events",
          slug: "discovering-events",
        },
        { id: 20, title: "RSVP and Event Management", slug: "rsvp-management" },
        { id: 21, title: "Creating Your Own Events", slug: "creating-events" },
      ],
    },
    {
      id: "premium",
      title: "Premium Features",
      description: "Get the most out of Contato with premium capabilities",
      icon: "crown",
      articleCount: 9,
      articles: [
        { id: 24, title: "Upgrading to Premium", slug: "upgrading-premium" },
        {
          id: 25,
          title: "Advanced Analytics Dashboard",
          slug: "analytics-dashboard",
        },
        {
          id: 26,
          title: "Priority Matching & Visibility",
          slug: "priority-matching",
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Solve common issues and technical problems",
      icon: "wrench",
      articleCount: 10,
      articles: [
        { id: 30, title: "App Not Loading or Crashing", slug: "app-crashes" },
        { id: 31, title: "Login and Password Issues", slug: "login-issues" },
        {
          id: 32,
          title: "Notification Problems",
          slug: "notification-problems",
        },
      ],
    },
  ],
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <SupportHeroSection />
      <SupportCategoriesSection categories={supportData.categories} />
    </main>
  );
}
