"use client";

import { useEffect, useRef } from "react";

export default function HideLoginOnScroll() {
  const hasHidden = useRef(false);

  useEffect(() => {
    const loginEl = document.getElementById("login-section");
    if (!loginEl) return;

    // Always reset visibility on mount
    loginEl.style.display = "block";
    loginEl.style.opacity = "1";

    const showLogin = () => {
      loginEl.style.display = "block";
      requestAnimationFrame(() => (loginEl.style.opacity = "1"));
      hasHidden.current = false;
    };

    const hideLogin = () => {
      if (hasHidden.current) return;
      hasHidden.current = true;
      loginEl.style.transition = "opacity 0.6s ease";
      loginEl.style.opacity = "0";
      setTimeout(() => (loginEl.style.display = "none"), 600);
    };

    const scrollToLogin = () => {
      if (window.location.hash === "#login") {
        showLogin();
        requestAnimationFrame(() => {
          loginEl.scrollIntoView({ behavior: "smooth", block: "start" });
          window.scrollBy(0, -10);
        });
      }
    };

    // Check if we came from /#login directly
    const isDirectLogin = window.location.hash === "#login";
    if (isDirectLogin) scrollToLogin();

    // --- Hash change logic ---
    const handleHashChange = () => {
      if (window.location.hash === "#login") {
        showLogin();
        scrollToLogin();
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    // --- Hide on scroll logic ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        // hide only after visible section fully scrolled past
        if (!entry.isIntersecting && !hasHidden.current) hideLogin();
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    // Delay observer start longer if we loaded /#login
    const startDelay = isDirectLogin ? 2500 : 500;
    const timeout = setTimeout(() => observer.observe(loginEl), startDelay);

    // Fallback scroll check
    const handleScroll = () => {
      if (hasHidden.current) return;
      const rect = loginEl.getBoundingClientRect();
      if (rect.bottom < 0) hideLogin();
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
