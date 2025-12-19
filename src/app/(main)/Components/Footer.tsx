/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import NewsLetter from "./NewsLetter";
import { FooterDocument } from "@/types/footerTypes";
import FooterSocialLinks from "@/components/ui/FooterSocialLinks";
import Link from "next/link";
import { LogoDocument } from "@/types/commonTypes";
import Image from "next/image";
import getImageUrl from "@/utils/getImageUrl";

interface FooterClientProps {
  footerData: FooterDocument | null;
  logoData: LogoDocument | null;
}

const FooterClient = ({ footerData, logoData }: FooterClientProps) => {
  const pathname = usePathname();

  if (pathname === "/signup") return null;

  return (
    <footer className="bg-white text-gray-900 w-full overflow-hidden">
      {/* Newsletter */}
      <NewsLetter />

      {/* Address + Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Address Section (LEFT) */}
        {footerData?.footerAddressBlock && (
          <div className="w-full lg:w-[35%] flex-shrink-0">
            {/* <h3 className="font-semibold text-[#f15A24] mb-3 sm:mb-4">
              {footerData.footerAddressBlock.companyName}
            </h3> */}
            <div className="flex items-center space-x-3">
              <Image
                src={getImageUrl(logoData?.mainLogo?.image?.asset?.url ?? "")}
                alt={logoData?.smallLogo?.altText || "Company Logo"}
                width={140}
                height={40}
                className="object-contain bg"
              />
            </div>

            <p className="text-gray-700 mb-4 sm:mb-6">
              {footerData.footerAddressBlock.description}
            </p>

            <div className="space-y-3 text-gray-700 text-sm sm:text-base">
              {footerData.footerAddressBlock.contactInfo?.email && (
                <div className="flex items-start">
                  <Mail className="w-4 h-4 mt-1 mr-3 text-[#f15A24]" />
                  <a
                    href={`mailto:${footerData.footerAddressBlock.contactInfo.email}`}
                    className="break-all"
                  >
                    {footerData.footerAddressBlock.contactInfo.email}
                  </a>
                </div>
              )}

              {footerData.footerAddressBlock.contactInfo?.phone && (
                <div className="flex items-start">
                  <Phone className="w-4 h-4 mt-1 mr-3 text-[#f15A24]" />
                  <span>{footerData.footerAddressBlock.contactInfo.phone}</span>
                </div>
              )}

              {footerData.footerAddressBlock.contactInfo?.address && (
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mt-1 mr-3 text-[#f15A24]" />
                  <span>
                    {footerData.footerAddressBlock.contactInfo.address.street},{" "}
                    {footerData.footerAddressBlock.contactInfo.address.city}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Columns (RIGHT – grouped) */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-10">
          {footerData?.footerNavLinksBlock?.navigationColumns?.map((col, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="font-semibold text-[#f15A24] mb-2 sm:mb-3">
                {col.columnTitle}
              </h3>

              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                {col.links?.map((link, j) => {
                  const href =
                    link.linkType === "internal"
                      ? `/${link.internalLink}`
                      : link.externalUrl;

                  return (
                    <li key={j}>
                      <a
                        href={href}
                        target={link.openInNewTab ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#f15A24] transition-colors"
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
      </div>

      <Separator className="bg-gray-300" />

      {/* Bottom Links & Socials */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-gray-600">
          {footerData?.footerPolicies?.map((link) => (
            <Link key={link?._key} href={link?.url}>
              {link?.text}
            </Link>
          ))}
        </div>

        <FooterSocialLinks
          footerLinks={footerData?.footerSocialMediaLinksBlock?.socialLinks}
        />
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-300 py-4 sm:py-6 text-sm">
        <p className="text-gray-500">
          {footerData?.footerCopyrightText?.showCopyrightSymbol && "© "}
          {footerData?.footerCopyrightText?.autoUpdateYear
            ? new Date().getFullYear()
            : footerData?.footerCopyrightText?.copyrightYear}{" "}
          {footerData?.footerCopyrightText?.companyName}.{" "}
          {footerData?.footerCopyrightText?.copyrightText}
        </p>

        {footerData?.footerCopyrightText?.additionalText && (
          <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
            {footerData?.footerCopyrightText?.additionalText}
          </p>
        )}
      </div>
    </footer>
  );
};

export default FooterClient;
