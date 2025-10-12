import { getSignupPage } from "@/lib/sanity-queries/signUpPageQuery";
import SignupForm from "../ui/SIgnUpForm";
import { SignupPageDocument } from "@/types/signUpPageTypes";
import { generateMetadata } from "@/lib/generateMetadata";
import { LogoDocument } from "@/types/commonTypes";
import { getLogo } from "@/lib/sanity-queries/logoFetchQuery";

export async function generateMetadataForSignUp() {
  const signUpData = await getSignupPage();
  return generateMetadata(signUpData?.seo);
}

export default async function SignUpServer() {
  const signUpData: SignupPageDocument | null = await getSignupPage();
  const logoData: LogoDocument | null = await getLogo();

  return <SignupForm signUpData={signUpData} logoData={logoData} />;
}
