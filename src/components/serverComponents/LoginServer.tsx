import { client } from "@/lib/sanity";
import { LoginForm } from "../ui/LoginForm";

interface LoginPage {
  _id: string;
  title: string;
  heading: string;
  tagline: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: {
      asset: {
        url: string;
        metadata?: {
          lqip?: string;
          dimensions?: { width: number; height: number };
        };
      };
    };
  };
}

const query = `*[_type == "loginPage"][0]{
  _id,
  title,
  heading,
  tagline,
  seo {
    metaTitle,
    metaDescription,
    openGraphImage {
      asset -> {
        url,
        metadata { lqip, dimensions }
      }
    }
  }
}`;

export default async function LoginPageServer() {
  // Fetch the data on the server
  const loginContent: LoginPage | null = await client.fetch(query);

  return <LoginForm loginContent={loginContent} />;
}
