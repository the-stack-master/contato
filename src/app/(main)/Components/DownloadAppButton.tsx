"use client";

import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";

export default function DownloadButtons() {
  const handleDownload = (platform: "ios" | "android") => {
    if (platform === "ios") {
      window.open(
        "https://apps.apple.com/us/app/contato-ai-powered-networking/id6452725559",
        "_blank"
      );
    } else {
      window.open(
        "https://play.google.com/store/apps/details?id=com.contactos.contato&pcampaignid=web_share",
        "_blank"
      );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={() => handleDownload("ios")}
        className="h-14 px-8 bg-black hover:bg-gray-800 text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
      >
        <Apple className="w-6 h-6 mr-3" />
        <div className="text-left">
          <div className="text-xs opacity-80">Download on the</div>
          <div className="text-sm font-semibold">App Store</div>
        </div>
      </Button>

      <Button
        onClick={() => handleDownload("android")}
        className="h-14 px-8 bg-[#f15A24] hover:bg-orange-600 text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
      >
        <Play className="w-6 h-6 mr-3" />
        <div className="text-left">
          <div className="text-xs opacity-90">Get it on</div>
          <div className="text-sm font-semibold">Google Play</div>
        </div>
      </Button>
    </div>
  );
}
