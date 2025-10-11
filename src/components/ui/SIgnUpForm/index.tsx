"use client";

import { Button } from "@/components/ui/button";
import {
  Users,
  Download,
  Star,
  Bell,
  MessageCircle,
  Calendar,
  Smartphone,
} from "lucide-react";
import { Separator } from "../separator";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { SignupPageDocument } from "@/types/signUpPageTypes";
import { IconComponent } from "../IconComponent";
import { IconName } from "lucide-react/dynamic";

interface SignUpProps {
  signUpData: SignupPageDocument | null;
}

const gradients = [
  "from-[#f15A24] to-[#d04f23]",
  "from-[#f15A24] to-pink-400",
  "from-[#ffad87] to-[#f15A24]",
  "from-teal-400 to-[#f15A24]",
];

const SignupForm = ({ signUpData }: SignUpProps) => {
  const downloadButtons = signUpData?.appDownloadSection?.downloadButtons;
  const socialSection = signUpData?.socialProofSection;
  const appFeatures = signUpData?.appFeaturesSection?.features;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - App Download */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 lg:p-12 bg-white lg:border-r border-gray-100 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm space-y-6 lg:space-y-8 animate-in fade-in-50 slide-in-from-left-5 duration-700">
          {/* Logo/Brand */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-[#f15A24] rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-in zoom-in-50 duration-500 delay-200">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-300">
              {signUpData?.appDownloadSection?.headline}
            </h1>
            <p className="text-gray-600 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-400">
              {signUpData?.appDownloadSection?.description}
            </p>
          </div>

          {/* QR Codes */}
          <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-500">
            <div className="grid grid-cols-2 gap-4">
              {/* iOS QR Code */}
              <div className="text-center space-y-3">
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-[#f15A24]/10 hover:border-[#f15A24]/30 transition-colors">
                  <div className="w-24 h-24 mx-auto bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <QRCodeSVG
                      value={downloadButtons?.iosButton?.url ?? ""}
                      size={90}
                      bgColor="white"
                      fgColor="black"
                    />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {signUpData?.appDownloadSection?.qrCodes?.iosLabel}
                </p>
              </div>

              {/* Android QR Code */}
              <div className="text-center space-y-3">
                <div className="bg-gray-50 p-4 rounded-xl border-2 border-[#f15A24]/10 hover:border-[#f15A24]/30 transition-colors">
                  <div className="w-24 h-24 mx-auto bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <QRCodeSVG
                      value={downloadButtons?.androidButton?.url ?? ""}
                      size={90}
                      bgColor="white"
                      fgColor="black"
                    />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {signUpData?.appDownloadSection?.qrCodes?.androidLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-3 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-600">
            <Button
              variant="outline"
              onClick={() =>
                window.open(downloadButtons?.iosButton?.url, "_blank")
              }
              className="w-full h-12 border-[#f15A24] text-[#f15A24] hover:bg-[#f15A24]/10 font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-5 h-5 mr-3" />
              {downloadButtons?.iosButton?.text}
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                window.open(downloadButtons?.androidButton?.url, "_blank")
              }
              className="w-full h-12 border-[#f15A24] text-[#f15A24] hover:bg-[#f15A24]/10 font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-5 h-5 mr-3" />
              {downloadButtons?.androidButton?.text}
            </Button>
          </div>

          {/* Web Sign Up Option */}
          <div className="animate-in fade-in-50 duration-500 delay-700">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Right Section - App Benefits */}
      <div className="hidden lg:flex flex-1 bg-[#FFEDE6] items-center justify-center p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#f15A24]/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#f15A24]/15 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#f15A24]/20 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-32 left-32 w-16 h-16 bg-[#f15A24]/30 rounded-2xl rotate-12 animate-bounce delay-300"></div>
          <div className="absolute bottom-32 right-32 w-20 h-20 bg-[#d04f23]/25 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-[#ffad87]/20 rounded-lg rotate-45 animate-bounce delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-lg text-center space-y-12">
          {/* Main heading */}
          <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-500">
            <div className="mx-auto w-20 h-20 bg-[#f15A24] rounded-3xl flex items-center justify-center shadow-xl animate-in zoom-in-50 duration-500 delay-300">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              {signUpData?.appFeaturesSection?.headline}
              <br />
              <span className="bg-gradient-to-r from-[#f15A24] to-[#d04f23] bg-clip-text text-transparent">
                {signUpData?.appFeaturesSection?.subheading}
              </span>
            </h2>
          </div>

          {/* App Features */}
          <div className="grid grid-cols-2 gap-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-700">
            {appFeatures?.slice(0, 4).map((section, idx) => {
              return (
                <div
                  key={section?._key}
                  className="text-center space-y-3 p-4 rounded-2xl bg-white/80 backdrop-blur-md hover:bg-white transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`mx-auto w-12 h-12 bg-gradient-to-br ${gradients[idx]} rounded-xl flex items-center justify-center`}
                  >
                    <IconComponent
                      name={section?.icon?.alt as IconName}
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {section?.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {section?.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-900">
            <p className="text-lg text-gray-700 mb-4">
              Join <span className="font-semibold text-[#f15A24]">50,000+</span>{" "}
              professionals already networking smarter
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span>
                {socialSection?.rating}/5 {socialSection?.ratingLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
