"use client";

import { useState, useEffect } from "react";
import { AuthService } from "@/lib/auth-service";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      const currentUser = AuthService.getCurrentUser();

      setIsAuthenticated(authenticated);
      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
    user,
    isLoading,
  };
}
