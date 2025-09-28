import { client } from "@/lib/sanity";
import FooterClient from "@/app/(main)/Components/Footer";

const footerHeaderQuery = `*[_type == "footerHeader" && isActive == true][0]{ heading, subHeading, ctaButtons[] }`;
const footerAddressQuery = `*[_type == "footerAddressBlock" && isActive == true][0]{
  companyName, description, contactInfo{ email, phone, address{ street, city, state, zipCode, country } }
}`;
const footerNavLinksQuery = `*[_type == "footerNavLinksBlock" && isActive == true][0]{ navigationColumns[] }`;
const footerSocialQuery = `*[_type == "footerSocialMediaLinksBlock" && isActive == true][0]{ socialLinks[] }`;
const footerCopyrightQuery = `*[_type == "footerCopyrightText" && isActive == true][0]{ companyName, copyrightYear,
  copyrightText, additionalText, showCopyrightSymbol, autoUpdateYear }`;

export default async function FooterServer() {
  const [header, address, navLinks, socials, copyright] = await Promise.all([
    client.fetch(footerHeaderQuery),
    client.fetch(footerAddressQuery),
    client.fetch(footerNavLinksQuery),
    client.fetch(footerSocialQuery),
    client.fetch(footerCopyrightQuery),
  ]);

  return (
    <FooterClient
      header={header}
      address={address}
      navLinks={navLinks?.navigationColumns || []}
      socials={socials?.socialLinks || []}
      copyright={copyright}
    />
  );
}
