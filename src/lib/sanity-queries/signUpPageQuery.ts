import { client } from "@/lib/sanity";
import { SignupPageDocument } from "@/types/signUpPageTypes";

export async function getSignupPage(): Promise<SignupPageDocument | null> {
  const query = `
    *[_type == "signup" && isPublished == true][0]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      isPublished,
      publishedAt,
      signupBaseLabel,

      // 🌐 SEO
      seo{
    _type,
    metaTitle,
    metaDescription,
    canonicalUrl,
    focusKeyword,
    keywords,
    schemaType,
    customSchema,
    slug{ current },
    openGraph{
      title,
      description,
      type,
      siteName,
      image{ asset->{url}, alt }
    },
    noIndex,
    noFollow,
    priority,
    changeFreq
  },

      // ⚙️ Page Settings
      pageSettings{
        showHeader,
        showFooter
      },

      // 📱 App Download Section
      appDownloadSection{
        headline,
        description,
        appIcon{
          _type,
          alt,
          asset->{ _id, url }
        },
        downloadButtons{
          androidButton{
            enabled,
            text,
            url
          },
          iosButton{
            enabled,
            text,
            url
          }
        },
        qrCodes{
          androidLabel,
          iosLabel,
          androidQR{
            _type,
            alt,
            asset->{ _id, url }
          },
          iosQR{
            _type,
            alt,
            asset->{ _id, url }
          }
        },
        signInLink{
          enabled,
          text,
          url
        }
      },

      // 🌟 App Features Section
      appFeaturesSection{
        headline,
        subheading,
        phoneImage{
          _type,
          alt,
          asset->{ _id, url }
        },
        features[]{
          _key,
          title,
          description,
          iconName,
          alt
        }
      },

      // 💬 Social Proof Section
      socialProofSection{
        enabled,
        rating,
        ratingLabel,
        showStars,
        userCount,
        userCountLabel
      }
    }
  `;

  const data = await client.fetch<SignupPageDocument>(query);
  return data || null;
}
