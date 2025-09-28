/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService, LoginCredentials } from "@/lib/auth-service";

export function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    console.log("useAuthActions: Starting login process");
    console.log(
      "useAuthActions: Current URL before login:",
      window.location.href
    );
    setIsLoading(true);
    setError("");

    try {
      const result = await AuthService.login(credentials);
      console.log("useAuthActions: AuthService result:", result);
      console.log(
        "useAuthActions: Current URL after login:",
        window.location.href
      );

      if (result.success) {
        console.log("useAuthActions: Login successful, checking device...");

        const userAgent =
          navigator.userAgent || navigator.vendor || (window as any).opera;

        if (/android/i.test(userAgent)) {
          console.log("Redirecting to Google Play Store");
          window.location.href =
            "https://play.google.com/store/apps/details?id=com.contactos.contato&pcampaignid=web_share";
        } else if (/iPad|iPhone|iPod/.test(userAgent)) {
          console.log("Redirecting to Apple App Store");
          window.location.href =
            "https://apps.apple.com/us/app/contato-ai-powered-networking/id6452725559";
        } else {
          console.log("Redirecting to web app (desktop)");
          window.location.href = "https://contato.app";
        }
      } else {
        console.log(
          "useAuthActions: Login failed, setting error:",
          result.error
        );
        setError(result.error || "Login failed");
      }
    } catch (err) {
      console.log("useAuthActions: Exception occurred:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();

    // If already on /home, refresh; else, redirect to /home
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      router.replace("/");
    }
  };

  const clearError = () => setError("");

  return {
    login,
    logout,
    isLoading,
    error,
    clearError,
  };
}
