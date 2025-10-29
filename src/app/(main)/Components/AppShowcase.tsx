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
  { icon: MessageCircle, label: "Task list feature" },
];

// ✅ Positions for a nice curved alignment outside the phone
const positions = [
  { top: "10%", right: "-40%" },
  { top: "23%", right: "-60%" },
  { top: "38%", right: "-75%" },
  { bottom: "38%", right: "-75%" },
  { bottom: "23%", right: "-60%" },
  { bottom: "10%", right: "-40%" },
];

export default function AppShowcase({ appShowcaseData }: AppShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = appShowcaseData?.imageUrls || [];

  return (
    // ✅ Outer wrapper allows overflow but no scrollbars
    <div className="relative flex items-center justify-center w-full py-12 bg-transparent overflow-visible">
      {/* PHONE WRAPPER */}
      <div className="relative w-80 max-w-full h-[480px] sm:h-[640px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl overflow-visible">
        {/* PHONE INNER SCREEN */}
        <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden z-10">
          {/* Status Bar */}
          <div className="h-12 bg-gray-50 flex items-center justify-between px-6 text-sm font-medium text-gray-900">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-gray-900 rounded-sm"></div>
              <div className="w-6 h-3 border border-gray-900 rounded-sm">
                <div className="w-4 h-1.5 bg-gray-900 rounded-sm m-0.5"></div>
              </div>
            </div>
          </div>

          {/* Screenshot Area */}
          <div className="w-full h-[calc(100%-3rem)] relative">
            {images.map((urlObj, index) => (
              <Image
                key={index}
                src={urlObj?.imageUrl}
                alt={`slide-${urlObj?.alt ?? index}`}
                fill
                className={`object-cover transition-opacity duration-700 ${
                  index === selectedIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ✅ Floating Side Icons */}
        <div className="absolute inset-0 overflow-visible z-20 hidden md:block">
          {icons.map((item, index) => {
            const Icon = item.icon;
            const pos = positions[index];
            const isActive = index === selectedIndex;

            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`absolute w-12 h-12 rounded-xl flex items-center justify-center scale-120 hover:scale-125 transition-all duration-300 ease-in-out border cursor-pointer ${
                  isActive
                    ? "bg-[#f15A24] border-[#f15A24] shadow-xl"
                    : "bg-white border-gray-100  shadow-md"
                }`}
                style={pos}
                title={item.label}
                aria-pressed={isActive}
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
