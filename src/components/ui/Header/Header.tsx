"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useAuthActions } from "@/hooks/useAuthActions";
import useNavigate from "@/hooks/useNavigate";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type HeaderProps = {
  authToken?: RequestCookie;
};

const Header = ({ authToken }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goHome = () => navigate("/");

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/docs", label: "Docs" },
    { href: "/videos", label: "Videos" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/support", label: "Support" },
    { href: "/#about", label: "About Us" },
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 h-16 flex items-center border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={goHome}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
            style={{ backgroundColor: "#f15A24" }}
          >
            <span className="text-white font-bold text-sm">CT</span>
          </div>
          <span
            className="hidden sm:inline text-xl font-semibold"
            style={{ color: "#f15A24" }}
          >
            Contato
          </span>
        </div>

        {/* XL and above → horizontal nav */}
        <nav className="hidden xl:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors text-[#f15A24] hover:text-opacity-80 font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* CTA buttons only visible on xl+ */}
          <div className="hidden xl:flex items-center space-x-4">
            <Button
              // variant="outline"
              className="hidden sm:inline-flex border-[#f15A24] text-[#f15A24] bg-[#f15A24] hover:bg-[#f15A24] text-white hover:text-white transition cursor-pointer"
              onClick={() => (window.location.href = "/home#hero")}
            >
              Download App
            </Button>
            <Button className="bg-[#f15A24] hover:bg-opacity-90 text-white transition-all duration-300">
              Schedule a Demo
            </Button>
          </div>

          {/* Auth dependent section */}
          {authToken ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#f15A24] rounded-full px-3 py-2 bg-[#f15A24] text-white font-semibold"
              >
                <span>CU</span>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl py-2 z-50">
                  <Link
                    href="/settings"
                    className="block px-4 py-3 text-[#f15A24] hover:bg-[#f15A24] hover:text-white transition rounded-lg font-medium"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-3 text-[#f15A24] hover:bg-[#f15A24] hover:text-white transition rounded-lg font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              // variant="ghost"
              className="text-[#f15A24] hover:text-opacity-80 cursor-pointer"
              onClick={() => navigate("/home#login")}
            >
              Sign In
            </Button>
          )}

          {/* Menu toggle visible until lg */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-[#f15A24] focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible nav for sm–lg screens */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40 xl:hidden">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-[#f15A24] hover:text-opacity-80 font-medium"
              >
                {label}
              </Link>
            ))}
            <Button
              // variant="outline"
              className="border-[#f15A24] text-[#f15A24] bg-[#f15A24] hover:bg-[#f15A24] text-white hover:text-white transition w-full"
            >
              Download App
            </Button>
            <Button className="bg-[#f15A24] hover:bg-opacity-90 text-white transition-all duration-300 w-full">
              Schedule a Demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
