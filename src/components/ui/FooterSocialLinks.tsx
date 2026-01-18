import { SocialLink } from "@/types/footerTypes";
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaGithub,
  FaDiscord,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

const platformIcons: Record<string, React.ReactNode> = {
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  tiktok: <FaTiktok />,
  github: <FaGithub />,
  discord: <FaDiscord />,
  telegram: <FaTelegram />,
  whatsapp: <FaWhatsapp />,
  other: <span>🔗</span>,
};

interface FooterSocialLinkProps {
  footerLinks?: SocialLink[];
}

export default function FooterSocialLinks({
  footerLinks,
}: FooterSocialLinkProps) {
  return (
    <div className="flex gap-4">
      {footerLinks
        ?.filter((s) => s.isActive)
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
        .map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#f15A24] transition-colors !text-3xl sm:!text-2xl"
            aria-label={s.platformName || s.platform}
          >
            {platformIcons[s.platform] || platformIcons.other}
          </a>
        ))}
    </div>
  );
}
