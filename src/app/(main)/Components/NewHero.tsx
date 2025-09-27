"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageCircle,
  Calendar,
  Star,
  ArrowRight,
  Play,
  Apple,
  Camera,
} from "lucide-react";
import { cn } from "@/utils/classNames";
import PhoneSlideshow from "./PhoneSlideshow";
import RotatingIcons from "./RotatingIcons";

const NewHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownload = (platform: string) => {
    if (platform === "ios") {
      window.open(
        "https://apps.apple.com/us/app/contato-ai-powered-networking/id6452725559",
        "_blank"
      );
    } else if (platform === "android") {
      window.open(
        "https://play.google.com/store/apps/details?id=com.contactos.contato&pcampaignid=web_share",
        "_blank"
      );
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#f15A24]/20 to-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-[#f15A24]/15 to-red-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-[#f15A24]/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Network Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1200 800"
        >
          <defs>
            <linearGradient
              id="connectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f15A24" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
          </defs>
          <path
            d="M100,200 Q300,100 500,200 T900,150"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M200,400 Q400,300 600,400 T1000,350"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse delay-500"
          />
          <path
            d="M50,600 Q250,500 450,600 T850,550"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse delay-1000"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div
            className={cn(
              "space-y-8 transition-all duration-1000 transform",
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            )}
          >
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#f15A24] to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Contato</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Network
                <br />
                <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
                  Smarter
                </span>
                <br />
                Connect Better
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Join thousands of professionals building meaningful
                relationships through strategic networking. Your next
                opportunity is just one connection away.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f15A24]">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f15A24]">1M+</div>
                <div className="text-sm text-gray-600">Connections Made</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span className="text-3xl font-bold text-[#f15A24]">5</span>
                  <Star className="w-6 h-6 fill-[#f15A24] text-[#f15A24]" />
                </div>
                <div className="text-sm text-gray-600">App Rating</div>
              </div>
            </div>

            {/* Download Buttons */}
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

            {/* Secondary CTA */}
            <div className="flex items-center space-x-4 pt-4">
              <Button
                variant="outline"
                className="border-[#f15A24] text-[#f15A24] hover:bg-[#f15A24] hover:text-white transition-all duration-200"
              >
                Watch Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <span className="text-sm text-gray-500">2 min overview</span>
            </div>
          </div>

          {/* Right Content - Phone Mockup and icons */}
          <div
            className={cn(
              "relative flex justify-center transition-all duration-1000 delay-300 transform",
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            )}
            style={{ minWidth: 0 }}
          >
            {/* Scroll container for phone + icons */}
            <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar px-4 sm:px-0 -mx-4 sm:mx-0">
              <PhoneSlideshow />
              <RotatingIcons />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-gray-50">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default NewHeroSection;
