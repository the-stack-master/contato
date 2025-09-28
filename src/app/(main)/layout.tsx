import Header from "@/components/ui/Header/Header";
import { ReactNode } from "react";
import Footer from "./Components/Footer";
import LoginPageServer from "@/components/serverComponents/LoginServer";
import FooterServer from "@/components/serverComponents/FooterServer";
import { cookies } from "next/headers";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  return (
    <main>
      <LoginPageServer />
      <Header authToken={authToken} />
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">{children}</div>
      <FooterServer />
    </main>
  );
}
