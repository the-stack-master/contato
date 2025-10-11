"use client";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden flex items-center bg-white"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Subtle decorative gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff0f0] via-[#fff4e5] to-[#fbe5dd] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 flex items-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-left max-w-xl mx-auto lg:mx-0 text-gray-900">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                Experience Contato
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-prose">
                Your gateway to exclusive blogs, videos, and community-driven
                content — all connected through one powerful app. Download
                Contato today and sign up inside the app.
              </p>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3">
              {[
                "Trusted by thousands",
                "Seamless content access",
                "Fast and secure sign-up",
                "Exclusive features",
                "Engage and grow",
              ].map((highlight, index) => (
                <div
                  key={index}
                  className="bg-[#f15A24]/20 text-[#f15A24] px-4 py-1 rounded-full text-sm font-semibold animate-pulse"
                >
                  {highlight}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="default"
                className="bg-[#f15A24] hover:bg-[#d64d20] transition-shadow duration-300 text-base px-6 py-4 shadow-lg text-white"
              >
                Download the App
              </Button>
              <Button
                size="default"
                variant="outline"
                className="border-[#f15A24] text-[#f15A24] hover:bg-[#f15A24]/10 transition-colors duration-300 text-base px-6 py-4"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div
            className="relative animate-fade-in-right max-w-md mx-auto w-full"
            style={{
              aspectRatio: "9 / 19",
              maxHeight: "80vh",
              height: "100%",
            }}
          >
            {/* Glow Behind */}
            <div className="absolute inset-0 bg-[#f15a24]/20 rounded-3xl blur-3xl scale-110 animate-pulse"></div>

            {/* Phone Mockup Container */}
            <div className="relative bg-white rounded-3xl p-6 shadow-2xl overflow-hidden h-full w-full flex items-center justify-center">
              <div className="bg-gray-100 rounded-3xl flex items-center justify-center text-[#f15A24] text-xl font-semibold select-none h-full w-full shadow-md">
                {/* Replace with your actual image */}
                Phone Mockup
              </div>
            </div>

            {/* Floating Accents */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#f15A24]/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#f15A24]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
