"use client";
import { X } from "lucide-react";
import { useState } from "react";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="bg-gradient-to-r from-white to-white text-[#f15A24] py-3 px-4 relative border-b border-[#f15A24]"
      role="region"
      aria-label="Announcement"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-center text-sm md:text-base relative">
          <p className="text-center max-w-3xl">
            Introducing our new app — your gateway to exclusive content,
            seamless networking, and much more. Sign up directly inside the app
            after downloading.
            <a
              href="#"
              className="underline ml-2 text-[#f15A24] hover:text-opacity-80"
              onClick={(e) => e.preventDefault()} // Replace link as needed
            >
              Learn More →
            </a>
          </p>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-[#f15A24] hover:text-white p-1 rounded transition-colors"
            aria-label="Close Announcement"
          >
            <X className="w-4 h-4" stroke="#f15A24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
