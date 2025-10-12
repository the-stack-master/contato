import { client } from "@/lib/sanity";
import { LoginForm } from "../ui/LoginForm";
import { LogoDocument, SanitySeo } from "@/types/commonTypes";
import { getLogo } from "@/lib/sanity-queries/logoFetchQuery";
import { generateSeoMetadata } from "@/lib/generateMetadata";

interface LoginPage {
  _id: string;
  title: string;
  heading: string;
  tagline: string;
  seo?: SanitySeo;
}

const query = `*[_type == "loginPage"][0]{
  _id,
  title,
  heading,
  tagline,
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
}`;

export async function generateMetadata() {
  const loginContent: LoginPage | null = await client.fetch(query);
  return generateSeoMetadata(loginContent?.seo);
}

export default async function LoginPageServer() {
  // Fetch the data on the server
  const loginContent: LoginPage | null = await client.fetch(query);
  const logoData: LogoDocument | null = await getLogo();

  return <LoginForm loginContent={loginContent} logoData={logoData} />;
}
