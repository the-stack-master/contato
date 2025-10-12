import { SanitySeo } from "./commonTypes";

export interface LoginPage {
  _id: string;
  _type: "loginPage";
  title: string;
  bottomText?: string;
  signUpUrl?: string;
  otpTitle: string;
  infoText?: string;
  changeEmailText?: string;
  otpLabel?: string;
  resendText?: string;
  resendButtonLabel?: string;
  resendTimerLabel?: string;
  verifyButtonText?: string;
  signupText?: string;
  seo?: SanitySeo; // Replace with your SEO type if you have one
  isPublished: boolean;
  publishedAt: string;
  heroHeading: string;
  heroHighlightedText: string;
  heroTagline: string;
}
