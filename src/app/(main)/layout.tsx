// app/(whatever)/layout.tsx

import Header from "@/components/ui/Header/Header";
import { ReactNode } from "react";
import LoginPageServer from "@/components/serverComponents/LoginServer";
import FooterServer from "@/components/serverComponents/FooterServer";
import HideLoginOnScroll from "@/components/client/HideLoginOnScroll";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      {/* Login Section */}
      <div id="login-section">
        <LoginPageServer />
      </div>

      {/* Scroll logic is in this small client component */}
      <HideLoginOnScroll />

      {/* Header */}
      <Header />

      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">{children}</div>

      <FooterServer />
    </main>
  );
}
