import { getSignupPage } from "@/lib/sanity-queries/signUpPageQuery";
import SignupForm from "../ui/SIgnUpForm";
import { SignupPageDocument } from "@/types/signUpPageTypes";
import { generateSeoMetadata } from "@/lib/generateMetadata";
import { LogoDocument } from "@/types/commonTypes";
import { getLogo } from "@/lib/sanity-queries/logoFetchQuery";

export async function generateMetadata() {
  const signUpData = await getSignupPage();
  return generateSeoMetadata(signUpData?.seo);
}

export default async function SignUpServer() {
  const signUpData: SignupPageDocument | null = await getSignupPage();
  const logoData: LogoDocument | null = await getLogo();

  return <SignupForm signUpData={signUpData} logoData={logoData} />;
}
