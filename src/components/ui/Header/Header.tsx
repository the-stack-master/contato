"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuthActions } from "@/hooks/useAuthActions";
import useNavigate from "@/hooks/useNavigate";
import { usePathname } from "next/navigation";
import { getLogo } from "@/lib/sanity-queries/logoFetchQuery";
import { LogoDocument } from "@/types/commonTypes";
import Image from "next/image";
import getImageUrl from "@/utils/getImageUrl";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportMenuOpen, setSupportMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthActions();
  const navigate = useNavigate();
  const pathname = usePathname();
  const [logo, setLogo] = useState<LogoDocument | null>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchLogo = async () => {
    const logoData = await getLogo();
    setLogo(logoData);
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const goHome = () => navigate("/");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  if (pathname === "/signup") return null;

  return (
    <header className="w-full bg-white sticky top-0 z-50 h-16 flex items-center border-b border-gray-100 shadow-sm ">
      <div className="container mx-auto px-4 flex items-center justify-between ">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer overflow-hidden mb-1"
          onClick={goHome}
        >
          {getImageUrl(logo?.mainLogo?.image?.asset?.url ?? "") && (
            <>
              {logo ? (
                <Image
                  src={getImageUrl(logo?.mainLogo?.image?.asset?.url ?? "")}
                  alt={logo?.mainLogo?.altText || "Company Logo"}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              ) : (
                // 👇 Placeholder keeps same layout and avoids mismatch
                <div className="w-[120px] h-[40px]" />
              )}
            </>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden xl:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-semibold text-[16px] text-[#1f2937] hover:text-[#f15A24] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}

          {/* Support dropdown */}
          <div className="relative">
            <button
              onClick={() => setSupportMenuOpen((prev) => !prev)}
              className="flex items-center font-semibold text-[16px] text-[#1f2937] hover:text-[#f15A24] transition-colors duration-200"
            >
              Support
              <ChevronDown
                className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${
                  supportMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {supportMenuOpen && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-44 animate-fadeIn">
                <Link
                  href="/support"
                  onClick={() => {
                    setSupportMenuOpen(false);
                  }}
                  className="block px-4 py-2.5 text-[15px] text-[#1f2937] hover:bg-[#f15A24]/10 hover:text-[#f15A24] transition-colors"
                >
                  Support Docs
                </Link>
                <Link
                  onClick={() => {
                    setSupportMenuOpen(false);
                  }}
                  href="/videos"
                  className="block px-4 py-2.5 text-[15px] text-[#1f2937] hover:bg-[#f15A24]/10 hover:text-[#f15A24] transition-colors"
                >
                  Videos
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Button
            className="text-[#1f2937] hover:text-[#f15A24] font-semibold cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Sign In
          </Button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-[#1f2937] focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="absolute top-16 left-0 w-full bg-white border-t border-gray-100 shadow-md z-40 xl:hidden"
        >
          <nav className="flex flex-col space-y-3 px-6 py-5 font-semibold text-[16px] text-[#1f2937]">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#f15A24] transition-colors"
              >
                {label}
              </Link>
            ))}

            {/* Support section for mobile */}
            <div>
              <button
                onClick={() => setSupportMenuOpen(!supportMenuOpen)}
                className="flex items-center justify-between w-full hover:text-[#f15A24]"
              >
                Support
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${
                    supportMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {supportMenuOpen && (
                <div className="mt-2 pl-4 flex flex-col space-y-2 text-[15px] font-normal">
                  <Link
                    href="/support/docs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#1f2937] hover:text-[#f15A24]"
                  >
                    Support Docs
                  </Link>
                  <Link
                    href="/videos"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#1f2937] hover:text-[#f15A24]"
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
