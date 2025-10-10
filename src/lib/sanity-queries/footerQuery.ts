// lib/footer.ts
import { FooterDocument } from "@/types/footerTypes";
import { client } from "@/lib/sanity";

export async function getFooter(): Promise<FooterDocument | null> {
  const query = `*[_type == "footerDocument" && isActive == true] | order(displayOrder asc)[0]{
    _id,
    title,
    seo,
    footerHeader{
      heading,
      subHeading,
      isActive,
      ctaButtons[]{
        text,
        url,
        isPrimary,
        openInNewTab
      }
    },
    footerAddressBlock{
      companyName,
      companyLogo{ asset->{_id, url}, alt },
      description,
      contactInfo{
        email,
        phone,
        address{
          street,
          city,
          state,
          zipCode,
          country
        }
      },
      isActive
    },
    footerNavLinksBlock{
      navigationColumns[]{
        columnTitle,
        links[]{
          text,
          linkType,
          internalLink->{_id, title},
          externalUrl,
          openInNewTab
        }
      },
      isActive
    },
    footerSocialMediaLinksBlock{
      socialLinks[]{
        platform,
        platformName,
        url,
        isActive,
        orderIndex
      },
      isActive
    },
    footerCopyrightText{
      copyrightYear,
      companyName,
      copyrightText,
      additionalText,
      showCopyrightSymbol,
      autoUpdateYear,
      isActive
    },
    isActive,
    displayOrder
  }`;

  const data = await client.fetch<FooterDocument>(query);
  return data || null;
}
