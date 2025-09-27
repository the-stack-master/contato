"use client";
import { useRouter } from "next/navigation";

function useNavigate() {
  const router = useRouter();

  // Function to navigate to a given url string
  function navigateTo(url: string) {
    router.push(url);
  }

  return navigateTo;
}

export default useNavigate;
