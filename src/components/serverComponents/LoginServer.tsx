import { client } from "@/lib/sanity";
import { LoginForm } from "../ui/LoginForm";
import { LogoDocument, SanitySeo } from "@/types/commonTypes";
import { getLogo } from "@/lib/sanity-queries/logoFetchQuery";

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
  seo
}`;

export default async function LoginPageServer() {
  // Fetch the data on the server
  const loginContent: LoginPage | null = await client.fetch(query);
  const logoData: LogoDocument | null = await getLogo();

  return <LoginForm loginContent={loginContent} logoData={logoData} />;
}
