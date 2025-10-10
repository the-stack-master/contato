// types/footer.ts
export interface CTAButton {
  text: string;
  url: string;
  isPrimary?: boolean;
  openInNewTab?: boolean;
}

export interface FooterHeader {
  heading: string;
  subHeading: string;
  ctaButtons: CTAButton[];
  isActive?: boolean;
}

export interface ContactAddress {
  street?: string;
  city: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: ContactAddress;
}

export interface FooterAddressBlock {
  companyName: string;
  companyLogo?: { asset: { _ref: string } } | null;
  description: string;
  contactInfo?: ContactInfo;
  isActive?: boolean;
}

export interface NavLink {
  text: string;
  linkType: "internal" | "external";
  internalLink?: { _ref: string; title?: string };
  externalUrl?: string;
  openInNewTab?: boolean;
}

export interface NavigationColumn {
  columnTitle: string;
  links: NavLink[];
}

export interface FooterNavLinksBlock {
  navigationColumns: NavigationColumn[];
  isActive?: boolean;
}

export interface SocialLink {
  platform: string;
  platformName?: string;
  url: string;
  isActive?: boolean;
  orderIndex?: number;
}

export interface FooterSocialMediaLinksBlock {
  socialLinks: SocialLink[];
  isActive?: boolean;
}

export interface FooterCopyrightText {
  copyrightYear: number;
  companyName: string;
  copyrightText?: string;
  additionalText?: string;
  showCopyrightSymbol?: boolean;
  autoUpdateYear?: boolean;
  isActive?: boolean;
}

export interface FooterDocument {
  _id: string;
  _type: "footerDocument";
  title: string;
  seo?: any;
  footerHeader?: FooterHeader;
  footerAddressBlock?: FooterAddressBlock;
  footerNavLinksBlock?: FooterNavLinksBlock;
  footerSocialMediaLinksBlock?: FooterSocialMediaLinksBlock;
  footerCopyrightText?: FooterCopyrightText;
  isActive?: boolean;
  displayOrder?: number;
}
