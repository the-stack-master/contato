/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import NewsLetter from "./NewsLetter";
import { FooterDocument } from "@/types/footerTypes";
import FooterSocialLinks from "@/components/ui/FooterSocialLinks";

interface FooterClientProps {
  footerData: FooterDocument | null;
}

const FooterClient = ({ footerData }: FooterClientProps) => {
  const pathname = usePathname();

  if (pathname === "/signup") return null;

  const handleCtaClick = (url?: string) => {
    if (url?.length) {
      window.open(url, "_blank");
    }
  };

  return (
    <footer className="bg-white text-gray-900 w-full overflow-hidden">
      {/* Header CTA */}
      {footerData?.footerHeader && (
        <div className="border-b border-gray-300">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#f15A24]">
              {footerData?.footerHeader?.heading}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
              {footerData?.footerHeader?.subHeading}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              {footerData?.footerHeader?.ctaButtons?.map((btn, i) => (
                <Button
                  key={i}
                  size="lg"
                  onClick={() => handleCtaClick(btn?.url)}
                  variant={btn.isPrimary ? "default" : "outline"}
                  className={`w-full sm:w-auto cursor-pointer ${
                    btn.isPrimary
                      ? "bg-gradient-to-r from-[#f15A24] to-[#d04f23] text-white"
                      : "border-[#f15A24] text-[#f15A24]"
                  }`}
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter */}
      <NewsLetter />

      {/* Address & Nav */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 w-full">
        {/* Address */}
        {footerData?.footerAddressBlock && (
          <div className="lg:col-span-2 w-full">
            <h3 className="font-semibold text-[#f15A24] mb-3 sm:mb-4">
              {footerData?.footerAddressBlock?.companyName}
            </h3>
            <p className="text-gray-700 mb-4 sm:mb-6">
              {footerData?.footerAddressBlock?.description}
            </p>
            <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              {footerData?.footerAddressBlock?.contactInfo?.email && (
                <div className="flex items-center break-words">
                  <Mail className="w-4 h-4 mr-2 sm:mr-3 text-[#f15A24]" />
                  <a
                    href={`mailto:${footerData?.footerAddressBlock?.contactInfo?.email}`}
                  >
                    {footerData?.footerAddressBlock?.contactInfo?.email}
                  </a>
                </div>
              )}
              {footerData?.footerAddressBlock?.contactInfo?.phone && (
                <div className="flex items-center break-words">
                  <Phone className="w-4 h-4 mr-2 sm:mr-3 text-[#f15A24]" />
                  <span>
                    {footerData?.footerAddressBlock?.contactInfo.phone}
                  </span>
                </div>
              )}
              {footerData?.footerAddressBlock?.contactInfo?.address && (
                <div className="flex items-center break-words">
                  <MapPin className="w-4 h-4 mr-2 sm:mr-3 text-[#f15A24]" />
                  <span>
                    {footerData?.footerAddressBlock?.contactInfo.address.street}
                    , {footerData?.footerAddressBlock?.contactInfo.address.city}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nav Columns */}
        {footerData?.footerNavLinksBlock?.navigationColumns?.map((col, i) => (
          <div key={i} className="w-full min-w-0">
            <h3 className="font-semibold text-[#f15A24] mb-2 sm:mb-3">
              {col.columnTitle}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              {col.links?.map((link, j) => {
                const href =
                  link.linkType === "internal"
                    ? `/${link?.internalLink}`
                    : link.externalUrl;
                return (
                  <li key={j}>
                    <a
                      href={href}
                      target={link.openInNewTab ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-[#f15A24] break-words"
                    >
                      {link.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="bg-gray-300" />

      {/* Bottom Links & Socials */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 w-full">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-gray-600 text-center sm:text-left">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
        <div className="flex gap-4 sm:gap-6 text-sm">
          <FooterSocialLinks
            footerLinks={footerData?.footerSocialMediaLinksBlock?.socialLinks}
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-300 py-4 sm:py-6 text-sm sm:text-base w-full">
        <p className="text-gray-500 break-words">
          {footerData?.footerCopyrightText?.showCopyrightSymbol && "© "}
          {footerData?.footerCopyrightText?.autoUpdateYear
            ? new Date().getFullYear()
            : footerData?.footerCopyrightText?.copyrightYear}{" "}
          {footerData?.footerCopyrightText?.companyName}.{" "}
          {footerData?.footerCopyrightText?.copyrightText}
        </p>
        {footerData?.footerCopyrightText?.additionalText && (
          <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 break-words">
            {footerData?.footerCopyrightText?.additionalText}
          </p>
        )}
      </div>
    </footer>
  );
};

export default FooterClient;
