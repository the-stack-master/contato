"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Users,
  Zap,
  Shield,
  Globe,
  Heart,
  ArrowRight,
  Sparkles,
  Target,
  Layers,
} from "lucide-react";
import { cn } from "@/utils/classNames";

const highlights = [
  {
    icon: Mail,
    text: "Smart Communication",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Users,
    text: "Team Collaboration",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Zap,
    text: "Lightning Fast",
    color: "from-yellow-500 to-orange-400",
  },
  {
    icon: Shield,
    text: "Enterprise Security",
    color: "from-green-500 to-emerald-400",
  },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("about-contato");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % highlights.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about-contato" className="relative py-24 overflow-hidden">
      {/* Flowing Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/50"></div>

        {/* Organic Background Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#f15A24]/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/6 to-[#f15A24]/6 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Floating Decorative Elements */}
        <div
          className="absolute top-32 right-1/4 w-8 h-8 bg-[#f15A24]/20 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-6 h-6 bg-blue-500/20 rounded-full animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 right-20 w-4 h-4 bg-purple-500/20 rounded-full animate-bounce"
          style={{ animationDelay: "5s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Side - Main Content */}
          <div
            className={cn(
              "flex-1 space-y-8 transition-all duration-1000 transform",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-500/10 rounded-full border border-[#f15A24]/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#f15A24]" />
              <span className="text-sm font-medium text-[#f15A24]">
                About Contato
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gray-900">The Future of</span>
                <br />
                <span className="bg-gradient-to-r from-[#f15A24] to-orange-600 bg-clip-text text-transparent">
                  Communication
                </span>
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
              <p>
                Contato revolutionizes how teams communicate and collaborate.
                Built for the modern workplace, it combines powerful messaging,
                smart automation, and enterprise-grade security in one
                beautifully designed platform.
              </p>
              <p>
                From startups to Fortune 500 companies, thousands of teams trust
                Contato to streamline their workflows and keep everyone
                connected, no matter where they work.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">
                  Enterprise Security
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                <span className="text-gray-700 font-medium">
                  Real-time Sync
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"></div>
                <span className="text-gray-700 font-medium">
                  Smart Automation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
                <span className="text-gray-700 font-medium">Global Scale</span>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Visual */}
          <div
            className={cn(
              "flex-1 relative transition-all duration-1000 transform delay-300 hidden min-[1100px]:block",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <div className="origin-center scale-100 xl:scale-100 lg:scale-95 md:scale-90">
              {/* Central Hub */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Main Circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-2xl border border-gray-100 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#f15A24] to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Orbiting Highlights */}
                {highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon;
                  const angle = index * 90 - 45; // Spread around circle
                  const radius = 140;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  const isActive = activeHighlight === index;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "absolute w-20 h-20 transition-all duration-500 transform",
                        isActive ? "scale-110" : "scale-100"
                      )}
                      style={{
                        left: `calc(50% + ${x}px - 2.5rem)`,
                        top: `calc(50% + ${y}px - 2.5rem)`,
                      }}
                    >
                      {/* Connecting Line */}
                      <div
                        className={cn(
                          "absolute w-px bg-gradient-to-r transition-all duration-500",
                          isActive
                            ? `${highlight.color} opacity-40`
                            : "from-gray-200 to-transparent opacity-20"
                        )}
                        style={{
                          height: `${radius - 70}px`,
                          left: "50%",
                          top: "50%",
                          transformOrigin: "top",
                          // transform: `rotate(${angle + 180}deg) translateX(-50%)`,
                        }}
                      />

                      {/* Highlight Circle */}
                      <div
                        className={cn(
                          "relative w-full h-full rounded-full transition-all duration-500 flex items-center justify-center shadow-lg",
                          isActive
                            ? `bg-gradient-to-br ${highlight.color} shadow-xl`
                            : "bg-white border-2 border-gray-200"
                        )}
                      >
                        <IconComponent
                          className={cn(
                            "w-8 h-8 transition-colors duration-500",
                            isActive ? "text-white" : "text-gray-400"
                          )}
                        />
                      </div>

                      {/* Floating Label */}
                      <div
                        className={cn(
                          "absolute top-full mt-3 left-1/2 transform -translate-x-1/2 transition-all duration-500",
                          isActive
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        )}
                      >
                        <div className="px-3 py-1 bg-white rounded-full shadow-md border border-gray-100 whitespace-nowrap">
                          <span className="text-xs font-medium text-gray-700">
                            {highlight.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Pulsing Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-[#f15A24]/20 animate-ping"></div>
                <div
                  className="absolute inset-4 rounded-full border border-[#f15A24]/10 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Additional Floating Elements */}
                <div className="absolute -inset-8">
                  <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-[#f15A24]/30 to-orange-500/30 rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                  <div
                    className="absolute bottom-0 right-1/4 w-2 h-2 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 rounded-full animate-pulse"
                    style={{ animationDelay: "3s" }}
                  ></div>
                  <div
                    className="absolute left-0 top-1/3 w-2.5 h-2.5 bg-gradient-to-r from-purple-500/30 to-pink-400/30 rounded-full animate-pulse"
                    style={{ animationDelay: "4s" }}
                  ></div>
                </div>
              </div>

              {/* Stats Floating Cards */}
              <div
                className="absolute -bottom-0 -left-15 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 border border-gray-100/50 animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-500">Active Teams</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-15 -right-2 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 border border-gray-100/50 animate-float"
                style={{ animationDelay: "4s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">99.9%</div>
                    <div className="text-sm text-gray-500">Uptime</div>
                  </div>
                </div>
              </div>

              {/* Additional floating stat */}
              <div
                className="absolute top-5 -left-16 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 border border-gray-100/50 animate-float"
                style={{ animationDelay: "6s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">2.5s</div>
                    <div className="text-xs text-gray-500">Avg Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation for floating effect */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
