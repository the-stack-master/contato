import { client } from "@/lib/sanity";
import { LoginPage } from "@/types/loginTypes";

export async function getLoginPage(): Promise<LoginPage | null> {
  const query = `
    *[_type == "loginPage"][0]{
      _id,
      _type,
      title,
      bottomText,
      signUpUrl,
      otpTitle,
      infoText,
      changeEmailText,
      otpLabel,
      resendText,
      resendButtonLabel,
      resendTimerLabel,
      verifyButtonText,
      signupText,
      seo,
      isPublished,
      publishedAt,
      heroHeading,
      heroHighlightedText,
      heroTagline
    }
    `;

  const data = await client.fetch<LoginPage>(query);
  return data || null;
}
