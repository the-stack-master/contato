"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
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
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#f15A24] mb-2">
          Subscribe to our Newsletter
        </h3>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Stay updated with the latest news and offers.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 sm:h-14 w-full sm:flex-grow max-w-full px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f15A24] outline-none"
          />
          <Button
            type="submit"
            className="h-12 sm:h-14 w-full cursor-pointer sm:w-auto bg-gradient-to-r from-[#f15A24] to-[#d04f23] text-white px-6 sm:px-8 py-3 font-semibold rounded-lg"
          >
            Subscribe
          </Button>
        </form>
        {error && <p className="text-red-600 mt-3">{error}</p>}
        {submitted && !error && (
          <p className="text-green-600 mt-3">Thanks for subscribing!</p>
        )}
      </div>
    </section>
  );
};

export default NewsLetter;
