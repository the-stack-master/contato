"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLogo } from "@/lib/sanity-queries/logoFetchQuery";
import { LogoDocument } from "@/types/commonTypes";
import getImageUrl from "@/utils/getImageUrl";
import useNavigate from "@/hooks/useNavigate";
import { cn } from "@/utils/classNames";

const Header = () => {
  const pathname = usePathname();
  const navigate = useNavigate();

  console.log("---", pathname);

  const headerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportMenuOpen, setSupportMenuOpen] = useState(false);
  const [logo, setLogo] = useState<LogoDocument | null>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  /** Active checks */
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const isSupportRoute = pathname.startsWith("/support") || pathname.startsWith("/videos");

  /** Close menus on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
    setSupportMenuOpen(false);
  }, [pathname]);

  /** Outside click (desktop + mobile + touch) */
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
        setSupportMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  /** Fetch logo */
  useEffect(() => {
    getLogo().then(setLogo);
  }, []);

  if (pathname === "/signup") return null;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="container mx-auto h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center cursor-pointer pl-2">
          {logo ? (
            <Image
              src={getImageUrl(logo.mainLogo?.image?.asset?.url ?? "")}
              alt={logo.mainLogo?.altText || "Company Logo"}
              width={120}
              height={120}
              className="object-contain"
            />
          ) : (
            <div className="w-[120px] h-[50px]" />
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "!font-semibold !text-[16px] transition-colors",
                isActive(href) ? "!text-[#f15A24]" : "text-[#1f2937] hover:text-[#f15A24]",
              )}
            >
              {label}
            </Link>
          ))}

          {/* Support dropdown */}
          <div className="relative">
            <button
              onClick={() => setSupportMenuOpen((p) => !p)}
              className={cn(
                "flex items-center !font-semibold !text-[16px] transition-colors",
                isSupportRoute ? "!text-[#f15A24]" : "text-[#1f2937] hover:text-[#f15A24]",
              )}
            >
              Support
              <ChevronDown
                className={cn(
                  "ml-1 w-4 h-4 transition-transform duration-200",
                  supportMenuOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </button>

            {supportMenuOpen && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-2">
                <Link
                  href="/support"
                  onClick={() => setSupportMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 !font-semibold !text-[16px] transition-colors",
                    pathname.startsWith("/support")
                      ? "!text-[#f15A24] bg-[#f15A24]/10"
                      : "text-[#1f2937] hover:bg-[#f15A24]/10 hover:text-[#f15A24]",
                  )}
                >
                  Support Docs
                </Link>
                <Link
                  href="/videos"
                  onClick={() => setSupportMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 !font-semibold !text-[16px] transition-colors",
                    pathname.startsWith("/videos")
                      ? "!text-[#f15A24] bg-[#f15A24]/10"
                      : "text-[#1f2937] hover:bg-[#f15A24]/10 hover:text-[#f15A24]",
                  )}
                >
                  Videos
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {!mobileMenuOpen ? (
            <button
              onClick={() => (window.location.href = "/")}
              className="font-semibold text-[16px] text-[#1f2937] hover:text-[#f15A24] transition-colors"
            >
              Sign In
            </button>
          ) : null}

          {/* Mobile toggle */}
          <button onClick={() => setMobileMenuOpen((p) => !p)} className="lg:hidden text-[#1f2937]">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-100 shadow-md">
          <nav className="flex flex-col space-y-4 px-6 py-6 font-semibold text-[16px]">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  isActive(href) ? "!text-[#f15A24]" : "text-[#1f2937] hover:text-[#f15A24]",
                )}
              >
                {label}
              </Link>
            ))}

            {/* Support (mobile) */}
            <div>
              <button
                onClick={() => setSupportMenuOpen((p) => !p)}
                className={cn(
                  "flex w-full items-center justify-between font-semibold text-[16px] transition-colors",
                  isSupportRoute ? "!text-[#f15A24]" : "text-[#1f2937] hover:text-[#f15A24]",
                )}
              >
                Support
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    supportMenuOpen ? "rotate-180" : "rotate-0",
                  )}
                />
              </button>

              {supportMenuOpen && (
                <div className="mt-3 pl-4 flex flex-col space-y-3 font-semibold text-[16px]">
                  <Link
                    href="/support"
                    onClick={() => setSupportMenuOpen(false)}
                    className={
                      pathname.startsWith("/support")
                        ? "!text-[#f15A24]"
                        : "text-[#1f2937] hover:text-[#f15A24]"
                    }
                  >
                    Support Docs
                  </Link>
                  <Link
                    href="/videos"
                    onClick={() => setSupportMenuOpen(false)}
                    className={
                      pathname.startsWith("/videos")
                        ? "!text-[#f15A24]"
                        : "text-[#1f2937] hover:text-[#f15A24]"
                    }
                  >
                    Videos
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
