import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mock App",
  description: "Next.js App with Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body>{children}</body>
    </html>
  );
}
