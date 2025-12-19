import { LoginForm } from "../ui/LoginForm";
import { LogoDocument } from "@/types/commonTypes";
import { getLogo } from "@/lib/sanity-queries/logoFetchQuery";
import { generateSeoMetadata } from "@/lib/generateMetadata";
import { getLoginPage } from "@/lib/sanity-queries/loginPageQuery";
import { LoginPage } from "@/types/loginTypes";

export async function generateMetadata() {
  const loginContent: LoginPage | null = await getLoginPage();
  return generateSeoMetadata(loginContent?.seo);
}

export default async function LoginPageServer() {
  // Fetch the data on the server
  const loginContent: LoginPage | null = await getLoginPage();
  const logoData: LogoDocument | null = await getLogo();

  return <LoginForm loginContent={loginContent} logoData={logoData} />;
}
