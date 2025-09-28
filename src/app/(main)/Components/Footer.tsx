/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

interface FooterClientProps {
  header: any;
  address: any;
  navLinks: any[];
  socials: any[];
  copyright: any;
}

export default function FooterClient({
  header,
  address,
  navLinks,
  socials,
  copyright,
}: FooterClientProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const pathname = usePathname();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  if (pathname === "/signup") return null;

  return (
    <footer className="bg-white text-gray-900">
      {/* Header CTA */}
      {header && (
        <div className="border-b border-gray-300">
          <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f15A24]">
              {header.heading}
            </h2>
            <p className="text-lg text-gray-700 mb-8">{header.subHeading}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {header.ctaButtons?.map((btn: any, i: number) => (
                <Button
                  key={i}
                  size="lg"
                  variant={btn.isPrimary ? "default" : "outline"}
                  className={`${
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
      <section className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-2xl font-semibold text-[#f15A24] mb-2">
            Subscribe to our Newsletter
          </h3>
          <p className="text-gray-600 mb-8">
            Stay updated with the latest news and offers.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 flex-grow px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f15A24] outline-none"
            />
            <Button
              type="submit"
              className="h-14 bg-gradient-to-r from-[#f15A24] to-[#d04f23] text-white px-8 py-3 font-semibold rounded-lg"
            >
              Subscribe
            </Button>
          </form>
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {submitted && !error && (
            <p className="text-green-600 mt-4">Thanks for subscribing!</p>
          )}
        </div>
      </section>

      {/* Address & Nav */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {/* Address */}
        {address && (
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-[#f15A24] mb-4">
              {address.companyName}
            </h3>
            <p className="text-gray-700 mb-6">{address.description}</p>
            <div className="space-y-3 text-gray-700">
              {address.contactInfo?.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-[#f15A24]" />
                  <a href={`mailto:${address.contactInfo.email}`}>
                    {address.contactInfo.email}
                  </a>
                </div>
              )}
              {address.contactInfo?.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-[#f15A24]" />
                  <span>{address.contactInfo.phone}</span>
                </div>
              )}
              {address.contactInfo?.address && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-[#f15A24]" />
                  <span>
                    {address.contactInfo.address.street},{" "}
                    {address.contactInfo.address.city}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nav Columns */}
        {navLinks?.map((col: any, i: number) => (
          <div key={i}>
            <h3 className="font-semibold text-[#f15A24] mb-4">
              {col.columnTitle}
            </h3>
            <ul className="space-y-3">
              {col.links?.map((link: any, j: number) => {
                const href =
                  link.linkType === "internal"
                    ? `/${link.internalPage?.slug}`
                    : link.externalUrl;
                return (
                  <li key={j}>
                    <a
                      href={href}
                      target={link.openInNewTab ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-[#f15A24]"
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

      {/* Bottom */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-6 text-sm text-gray-600 mb-4 md:mb-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
        <div className="flex gap-6">
          {socials?.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#f15A24]"
            >
              {s.platformName}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center border-t border-gray-300 py-6">
        <p className="text-gray-500 text-sm">
          {copyright?.showCopyrightSymbol && "© "}
          {copyright?.autoUpdateYear
            ? new Date().getFullYear()
            : copyright?.copyrightYear}{" "}
          {copyright?.companyName}. {copyright?.copyrightText}
        </p>
        {copyright?.additionalText && (
          <p className="text-gray-400 text-xs mt-2">
            {copyright.additionalText}
          </p>
        )}
      </div>
    </footer>
  );
}
