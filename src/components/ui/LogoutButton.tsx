"use client";

import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const { logout } = useAuthActions();

  return (
    <Button
      onClick={logout}
      variant="outline"
      className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
    >
      Logout
    </Button>
  );
}
