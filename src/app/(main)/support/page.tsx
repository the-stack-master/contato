import { Metadata } from "next";
import SupportHeroSection from "./SupportHeroSection";
import SupportCategoriesSection from "./SupportCategoriesSection";
import SupportClient from "./SupportClient";
import SupportListServer from "@/components/serverComponents/SupportListServer";

export const metadata: Metadata = {
  title: "Contato Support - Help Center",
  description:
    "Find answers to your questions about Contato. Get help with features, troubleshooting, and more.",
  keywords:
    "Contato support, help center, networking app help, troubleshooting",
};

// Support data - this would typically come from a CMS or database

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <SupportListServer />
    </main>
  );
}
