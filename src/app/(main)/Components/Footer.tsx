import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Content", href: "#" },
      { name: "Community", href: "#" },
      { name: "Analytics", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Mobile App", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Partners", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter", href: "https://x.com/contato_app" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/contato-app/" },
  { name: "Facebook", href: "https://www.facebook.com/contatoapp" },
  { name: "Instagram", href: "https://www.instagram.com/contatoapps/" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    // Add your subscription logic here

    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-white text-gray-900">
      {/* CTA Section */}
      <div className="border-b border-gray-300">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f15A24]">
              Ready to Elevate Your Content Experience?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Join millions of users transforming how they consume and share
              knowledge with Contato.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#f15A24] to-[#d04f23] hover:shadow-lg transition-all duration-300 text-lg px-8 py-6 text-white"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-gradient-to-r from-[#f15A24] to-[#d04f23] border-[#f15A24] text-[#f15A24] hover:bg-[#f15A24]/10 transition-all duration-300 text-lg px-8 py-6 text-white"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-2xl font-semibold text-[#f15A24] mb-2">
            Subscribe to our Newsletter
          </h3>
          <p className="text-gray-600 mb-8">
            Stay updated with the latest news, tips, and exclusive offers.
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
              className="h-14 flex-grow px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f15A24] focus:border-transparent outline-none"
              required
            />
            <Button
              type="submit"
              className="h-14 bg-gradient-to-r from-[#f15A24] to-[#d04f23] text-white px-8 py-3 font-semibold rounded-lg hover:shadow-lg transition"
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

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md text-white font-bold text-sm"
                style={{ backgroundColor: "#f15A24" }}
              >
                CT
              </div>
              <span className="text-xl font-semibold text-[#f15A24]">
                Contato
              </span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The premier platform for curated content, community, and
              professional growth. Trusted by thousands worldwide.
            </p>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-[#f15A24]" />
                <a
                  href="mailto:support@contatoapp.com"
                  className="hover:underline"
                >
                  support@contatoapp.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-[#f15A24]" />
                <span>+1 (800) 555-1234</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-[#f15A24]" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-[#f15A24] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-700 hover:text-[#f15A24] transition-colors duration-200 flex items-center group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#f15A24]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-300" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4 md:mb-0">
            <a href="#" className="hover:text-[#f15A24] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#f15A24] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#f15A24] transition-colors">
              Cookie Policy
            </a>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-600 hover:text-[#f15A24] transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-300">
          <p className="text-gray-500 text-sm">
            © 2025 Contato. All rights reserved. Made with ❤️ for content lovers
            worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
