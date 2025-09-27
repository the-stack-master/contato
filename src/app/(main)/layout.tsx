"use client"; // <- needed for hooks

import Header from "@/components/ui/Header/Header";
import { LoginForm } from "@/components/ui/LoginForm";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main>
      {/* Show LoginForm only on home page */}
      {pathname === "/" && <LoginForm />}

      {pathname !== "/signup" && <Header authToken={undefined} />}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">{children}</div>
    </main>
  );
}
