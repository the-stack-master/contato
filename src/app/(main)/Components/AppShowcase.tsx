"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  Play,
  Star,
  Calendar,
  Camera,
  MessageCircle,
} from "lucide-react";
import { AppShowcaseSection } from "@/types/homeTypes";

interface AppShowcaseProps {
  appShowcaseData: AppShowcaseSection | null;
}

const icons = [
  { icon: Users, label: "Call feature" },
  { icon: Play, label: "Video feature" },
  { icon: Star, label: "High rating" },
  { icon: Calendar, label: "Calendar feature" },
  { icon: Camera, label: "Photo feature" },
  { icon: MessageCircle, label: "Messages" },
];

// Curved vertical + horizontal offsets (same as original intent)
const positions = [
  { top: "8%", offset: 24 },
  { top: "22%", offset: 48 },
  { top: "38%", offset: 64 },
  { bottom: "38%", offset: 64 },
  { bottom: "22%", offset: 48 },
  { bottom: "8%", offset: 24 },
];

export default function AppShowcase({ appShowcaseData }: AppShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = appShowcaseData?.imageUrls || [];

  return (
    <div className="relative flex items-center justify-center w-full py-8">
      {/* PHONE + ICON GROUP */}
      <div className="relative">
        {/* PHONE */}
        <div className="relative w-[240px] sm:w-[280px] lg:w-[300px] aspect-[9/17.5] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
          <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
            {/* Status Bar */}
            <div className="h-12 bg-gray-50 flex items-center justify-between px-6 text-sm font-medium text-gray-900">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 bg-gray-900 rounded-sm" />
                <div className="w-6 h-3 border border-gray-900 rounded-sm">
                  <div className="w-4 h-1.5 bg-gray-900 rounded-sm m-0.5" />
                </div>
              </div>
            </div>

            {/* Screens */}
            <div className="relative w-full h-[calc(100%-3rem)]">
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img.imageUrl}
                  alt={img.alt ?? `slide-${index}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ${
                    index === selectedIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ICON LAYER — curved + anchored */}
        <div className="absolute top-0 left-full h-full hidden md:block ml-6 lg:ml-8">
          {icons.map((item, index) => {
            const Icon = item.icon;
            const pos = positions[index];
            const isActive = index === selectedIndex;

            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                title={item.label}
                aria-pressed={isActive}
                className={`absolute w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                  isActive
                    ? "bg-[#f15A24] border-[#f15A24] shadow-xl"
                    : "bg-white border-gray-200 shadow-md"
                }`}
                style={{
                  top: pos.top,
                  bottom: pos.bottom,
                  transform: `translateX(${pos.offset}px)`,
                }}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-[#f15A24]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
