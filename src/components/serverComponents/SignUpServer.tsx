import { getSignupPage } from "@/lib/sanity-queries/signUpPageQuery";
import SignupForm from "../ui/SIgnUpForm";
import { SignupPageDocument } from "@/types/signUpPageTypes";
import { generateMetadata } from "@/lib/generateMetadata";

export async function generateMetadataForSignUp() {
  const signUpData = await getSignupPage();
  return generateMetadata(signUpData?.seo);
}

export default async function SignUpServer() {
  const signUpData: SignupPageDocument | null = await getSignupPage();

  return <SignupForm signUpData={signUpData} />;
}
