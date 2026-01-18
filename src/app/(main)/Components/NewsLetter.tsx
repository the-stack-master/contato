"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NewsLetter = () => {
  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ✅ Clear state on navigation
  useEffect(() => {
    setError("");
    setSubmitted(false);
  }, [pathname]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    try {
      const res = await fetch("/api/newsLetter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        setError(data.error || "Subscription failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-gray-100 py-16 text-center w-full">
      <div className="max-w-4xl mx-auto px-4">
        {/* ✅ Use h2 – matches app hierarchy */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#f15A24] mb-1">
          Subscribe to our Newsletter
        </h2>

        <p className="text-gray-600 mb-2 text-sm sm:text-base">
          Stay updated with the latest news and offers.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            className="
    h-12 sm:h-14
    w-full sm:flex-grow
    px-4
    rounded-lg
    border border-gray-300
    text-lg font-semibold
    placeholder:text-lg placeholder:font-semibold
    focus:ring-2 focus:ring-[#f15A24]
    focus:outline-none
  "
          />


          {/* ✅ Reusable button, matches Continue */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="h-12 sm:h-14 px-6 sm:px-8 rounded-lg"
          >
            <p className="!text-white">Subscribe</p>
          </Button>
        </form>

        {error && <p className="!text-red-600 mt-3 text-sm">{error}</p>}

        {submitted && !error && (
          <p className="text-green-600 mt-3 text-sm">Thanks for subscribing!</p>
        )}
      </div>
    </section>
  );
};

export default NewsLetter;
