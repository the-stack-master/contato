"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuthActions } from "@/hooks/useAuthActions";
import useNavigate from "@/hooks/useNavigate";
import { usePathname } from "next/navigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthActions();
  const navigate = useNavigate();
  const pathname = usePathname();

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

  const goHome = () => navigate("/");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/videos", label: "Videos" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/support", label: "Support" },
    { href: "/about", label: "About Us" },
  ];

  if (pathname === "/signup") return null;

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
          {navLinks.map(({ href, label }) => {
            if (href === "/#pricing" && pathname !== "/") return null;
            return (
              <Link
                key={href}
                href={href}
                className="transition-colors text-[#f15A24] hover:text-opacity-80 font-medium"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* CTA buttons only visible on xl+ */}
          <div className="hidden xl:flex items-center space-x-4">
            <Button
              className="hidden sm:inline-flex border-[#f15A24] text-white bg-[#f15A24] hover:bg-[#f15A24] text-white transition cursor-pointer"
              onClick={() => navigate("/home#hero")}
            >
              Download App
            </Button>
            <Button className="bg-[#f15A24] hover:bg-opacity-90 text-white transition-all duration-300">
              Schedule a Demo
            </Button>
          </div>

          {/* Auth dependent section */}
          <Button
            className="text-[#f15A24] hover:text-opacity-80 cursor-pointer"
            onClick={() => navigate("/#login")}
          >
            Sign In
          </Button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-[#f15A24] focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible mobile nav */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40 xl:hidden"
        >
          <nav className="flex flex-col space-y-2 px-6 py-4">
            {navLinks.map(({ href, label }) => {
              // Hide pricing link if not on home page
              if (href === "/#pricing" && pathname !== "/") return null;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[#f15A24] hover:text-opacity-80 font-medium"
                >
                  {label}
                </Link>
              );
            })}
            <Button className="w-full border-[#f15A24] text-white bg-[#f15A24] hover:bg-[#f15A24] transition">
              Download App
            </Button>
            <Button className="w-full bg-[#f15A24] hover:bg-opacity-90 text-white transition-all duration-300">
              Schedule a Demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
