"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  Globe,
  Heart,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  Zap,
  ArrowRight,
  CircleCheck as CheckCircle,
  Sparkles,
  Coffee,
} from "lucide-react";
import { cn } from "@/utils/classNames";
import useNavigate from "@/hooks/useNavigate";
import { AboutData } from "@/components/serverComponents/AboutServer";
import getImageUrl from "@/utils/getImageUrl";

const getIcon = (iconVal: string) => {
  switch (iconVal) {
    case "heart":
      return <Heart className="w-4 h-4 text-white" />;
    case "lightning":
      return <Zap className="w-4 h-4 text-white" />;
    case "shield":
      return <CheckCircle className="w-4 h-4 text-white" />;
    case "globe":
      return <Globe className="w-4 h-4 text-white" />;
    default:
      return <Globe className="w-4 h-4 text-white" />;
  }
};

interface AboutSectionProps {
  aboutData: AboutData;
}

const AboutSection = ({ aboutData }: AboutSectionProps) => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setVisibleSections((prev) => [...new Set([...prev, id])]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const isVisible = (sectionId: string) => visibleSections.includes(sectionId);

  return (
    <div className="min-h-screen bg-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-[#f15A24]/10 to-orange-300/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-red-300/10 to-[#f15A24]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-gradient-to-br from-orange-200/10 to-red-200/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-5 pb-5 px-6">
        <div
          className={cn(
            "max-w-6xl mx-auto text-center transition-all duration-1000 transform",
            isVisible("hero")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
          data-section="hero"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-100/50 px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-[#f15A24]" />
            <span className="text-[#f15A24] font-semibold">
              {aboutData?.companyStory?.sectionLabel}
            </span>
          </div>
          <h1 className="text-4xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent">
              {aboutData?.companyStory?.mainHeading}
            </span>
          </h1>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="relative py-8 px-6 bg-gray-50">
        <div
          className={cn(
            "max-w-6xl mx-auto transition-all duration-1000 transform",
            isVisible("mission")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
          data-section="mission"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {aboutData?.companyStory?.highlightedText?.split(" ")[0]}
                  <br />
                  <span className="text-[#f15A24]">
                    {aboutData?.companyStory?.highlightedText
                      ?.split(" ")
                      ?.slice(-2)
                      .join(" ")}
                  </span>
                </h2>
                <p className="text-md text-gray-600 leading-relaxed mb-6">
                  {aboutData?.companyStory?.storyContent[0]?.children[0]?.text}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {aboutData?.companyStory?.storyContent[1]?.children[0]?.text}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={() => {
                    navigate("/about#join-contato");
                  }}
                  className="bg-[#f15A24] hover:bg-[#f15A24]/90 text-white px-8 py-4 h-auto font-semibold transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  Join Our Mission
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-[#f15A24] text-[#f15A24] hover:bg-[#f15A24] hover:text-white px-8 py-4 h-auto font-semibold transition-all duration-200 w-full sm:w-auto"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Careers
                </Button>
              </div>
            </div>
            {/* Right Content - Values */}
            <div className="space-y-6">
              {aboutData?.companyStory?.valuePropositions?.map(
                (value, index) => (
                  <div
                    key={index}
                    className={cn(
                      "mt-6 p-4 rounded-2xl bg-orange-50 border border-orange-200 shadow-sm hover:shadow-md transition-all duration-400 hover:scale-[1.02]",
                      isVisible("mission")
                        ? "animate-in fade-in-50 slide-in-from-right-5 duration-600"
                        : "opacity-0"
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#f15A24] to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        {getIcon(value.icon ?? "")}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {value.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-tight">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team - New Compact Layout */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={cn(
              "text-center mb-10 transition-all duration-1000 transform",
              isVisible("team-header")
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            )}
            data-section="team-header"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-100/50 px-6 py-3 rounded-full mb-8">
              <Users className="w-5 h-5 text-[#f15A24]" />
              <span className="text-[#f15A24] font-semibold">
                {aboutData?.teamIntroSection?.heading}
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {aboutData?.teamIntroSection?.highlightedText
                ?.split(" ")
                .slice(0, 4)
                .join(" ")}
              <br />
              <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
                {aboutData?.teamIntroSection?.highlightedText
                  ?.split(" ")
                  .slice(-2)
                  .join(" ")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {aboutData?.teamIntroSection?.description}
            </p>
          </div>

          {/* Team Member Compact Grid */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16">
            {aboutData?.teamMembers?.map((member, idx) => (
              <div
                key={member.name}
                className={cn(
                  "flex flex-col items-center w-full max-w-xs sm:max-w-[45%] md:max-w-[30%] lg:max-w-[22%] px-4 py-6 hover:scale-105 transition-transform duration-300 bg-white/0",
                  isVisible("team")
                    ? "animate-in fade-in-50 slide-in-from-bottom-5 duration-700 opacity-100"
                    : "opacity-0 translate-y-10"
                )}
                style={{ animationDelay: `${idx * 120}ms` }}
                data-section="team"
              >
                {/* Rounded Avatar */}
                <img
                  src={getImageUrl(member.image)}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#f15A24] mb-3 shadow-sm"
                />
                {/* Name & Position & Dept */}
                <div className="text-center mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-[#f15A24] font-semibold">
                    {member.position}
                  </p>
                  <p className="text-xs text-gray-500">{member.department}</p>
                </div>
                {/* Bio — Short version */}
                <p className="text-gray-600 text-xs mt-1 mb-3 text-center line-clamp-2">
                  {member.bio}
                </p>
                {/* Social Icons */}
                <div className="flex gap-2 justify-center mb-2">
                  {member.linkedin && (
                    <Button
                      size="icon"
                      className="bg-[#f15A24]/10 hover:bg-[#f15A24] p-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(member.linkedin, "_blank");
                      }}
                    >
                      <Linkedin className="w-4 h-4 text-[#f15A24]" />
                    </Button>
                  )}
                  {member.twitter && (
                    <Button
                      size="icon"
                      className="bg-[#1DA1F2]/10 hover:bg-[#1DA1F2] p-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(member.twitter, "_blank");
                      }}
                    >
                      <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                    </Button>
                  )}
                  {member.email && (
                    <Button
                      size="icon"
                      className="bg-[#f15A24]/10 hover:bg-[#f15A24]/80 p-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`mailto:${member.email}`, "_blank");
                      }}
                    >
                      <Mail className="w-4 h-4 text-[#f15A24]" />
                    </Button>
                  )}
                </div>
                {/* Location and Join Date */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" /> {member.location}
                  <span>•</span>
                  <Calendar className="w-3 h-3" /> {member.joinDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section
        id="join-contato"
        className="relative py-12 px-6 bg-gradient-to-r from-[#f15A24] to-orange-600 scroll-mt-30"
      >
        <div
          className={cn(
            "max-w-4xl mx-auto text-center text-white transition-all duration-700 transform",
            isVisible("cta")
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          )}
          data-section="cta"
        >
          <div className="mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-semibold mb-2 text-white/90">
              {aboutData?.contactHR?.heading}
            </h2>
            <p className="text-md text-white/85 max-w-xl mx-auto mb-2">
              {aboutData?.contactHR?.description}
            </p>
            <p className="text-sm text-white/75 mb-6">
              Email:{" "}
              <a
                href={`mailto:${aboutData?.contactHR?.email}`}
                className="underline text-white/75 hover:text-white transition-colors"
              >
                hr@connecto.com
              </a>
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="h-14 px-10 bg-white text-[#f15A24] hover:bg-orange-50 font-semibold text-lg shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              onClick={() =>
                window.open(`mailto:${aboutData?.contactHR?.email}`, "_blank")
              }
            >
              <Mail className="w-6 h-6 text-[#f15A24]" />
              Email HR
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
