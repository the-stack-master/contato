import Header from "@/components/ui/Header/Header";
import { ReactNode } from "react";
import LoginPageServer from "@/components/serverComponents/LoginServer";
import FooterServer from "@/components/serverComponents/FooterServer";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      <LoginPageServer />
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">{children}</div>
      <FooterServer />
    </main>
  );
}
