import Header from "@/components/ui/Header/Header";
import { ReactNode } from "react";
import Footer from "./Components/Footer";
import LoginPageServer from "@/components/serverComponents/LoginServer";
import FooterServer from "@/components/serverComponents/FooterServer";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <LoginPageServer />
      <Header authToken={undefined} />
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">{children}</div>
      <FooterServer />
    </main>
  );
}
