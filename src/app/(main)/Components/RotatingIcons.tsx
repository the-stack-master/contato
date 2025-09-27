"use client";
import { useEffect, useState } from "react";
import {
  Users,
  Play,
  Star,
  Calendar,
  Camera,
  MessageCircle,
} from "lucide-react";

const initialIcons = [
  { icon: Users, label: "Call feature" },
  { icon: Play, label: "Video feature" },
  { icon: Star, label: "High rating" },
  { icon: Calendar, label: "Calendar feature" },
  { icon: Camera, label: "Photo feature" },
  { icon: MessageCircle, label: "Task list feature" },
];

// fixed positions on screen
const positions = [
  { top: "10%", right: "10%" },
  { top: "25%", right: "0%" },
  { top: "38%", right: "-5%" },
  { bottom: "38%", right: "-5%" },
  { bottom: "25%", right: "0%" },
  { bottom: "10%", right: "10%" },
];

const ShufflingIcons = () => {
  const [icons, setIcons] = useState(initialIcons);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcons((prev) => {
        const newIcons = [...prev];
        const first = newIcons.shift();
        if (first) newIcons.push(first);
        return newIcons;
      });
    }, 2000); // switch every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block">
      {icons.map((item, index) => {
        const Icon = item.icon;
        const pos = positions[index];

        return (
          <div
            key={index}
            className="absolute w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-xl"
            style={pos}
            tabIndex={0}
            aria-label={item.label}
            title={item.label}
          >
            <Icon className="w-6 h-6 text-[#f15A24]" />
          </div>
        );
      })}
    </div>
  );
};

export default ShufflingIcons;
