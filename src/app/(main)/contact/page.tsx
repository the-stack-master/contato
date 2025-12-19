/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: Record<string, any>) => {
    const err: Record<string, string> = {};

    if (!data.firstName || data.firstName.trim().length < 2)
      err.firstName = "First name must be at least 2 characters";

    if (!data.lastName || data.lastName.trim().length < 2)
      err.lastName = "Last name must be at least 2 characters";

    if (
      !data.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email.trim())
    )
      err.email = "Invalid email address";

    if (!data.phone || !/^\+?[\d\s()-]{7,}$/i.test(data.phone.trim()))
      err.phone = "Invalid phone number";

    if (!data.business || data.business.trim().length < 2)
      err.business = "Business name required";

    if (!data.comments || data.comments.trim().length < 2)
      err.comment = "Comment required";

    return err;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const clearError = (name: string) =>
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold !text-[#f15A24] mb-3 leading-tight">
            Get In Touch
          </h1>
          <p className="text-lg !text-gray-600">
            Feel free to reach out and stay connected with us.
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            bg-white
            p-10
            border border-gray-200
            grid grid-cols-1 md:grid-cols-2 gap-8
            relative
            rounded-none
          "
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold !text-gray-700 mb-2">
              First Name
            </label>
            <Input
              name="firstName"
              onChange={() => clearError("firstName")}
              placeholder="Enter first name"
              className={`h-12 rounded-xl !text-sm ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 !text-[11px] !text-red-400 leading-snug">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold !text-gray-700 mb-2">
              Last Name
            </label>
            <Input
              name="lastName"
              onChange={() => clearError("lastName")}
              placeholder="Enter last name"
              className={`h-12 rounded-xl !text-sm ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 !text-[11px] !text-red-400 leading-snug">
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold !text-gray-700 mb-2">
              E-Mail
            </label>
            <Input
              name="email"
              type="email"
              onChange={() => clearError("email")}
              placeholder="Enter email"
              className={`h-12 rounded-xl !text-sm ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 !text-[11px] !text-red-400 leading-snug">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold !text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              name="phone"
              onChange={() => clearError("phone")}
              placeholder="Enter phone number"
              className={`h-12 rounded-xl !text-sm ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="mt-1 !text-[11px] !text-red-400 leading-snug">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Business */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold !text-gray-700 mb-2">
              Business Name
            </label>
            <Input
              name="business"
              onChange={() => clearError("business")}
              placeholder="Enter business name"
              className={`h-12 rounded-xl !text-sm ${
                errors.business ? "border-red-500" : ""
              }`}
            />
            {errors.business && (
              <p className="mt-1 !text-[11px] !text-red-400 leading-snug">
                {errors.business}
              </p>
            )}
          </div>

          {/* Comments */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold !text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              name="comments"
              rows={4}
              onChange={() => clearError("comment")}
              placeholder="Write your message..."
              className={`
                flex w-full
                px-4 py-3
                min-h-[120px]
                rounded-lg
                border ${errors.comment ? "border-red-500" : "border-gray-300"}
                bg-white
                !text-sm text-gray-900
                placeholder:text-gray-400
                resize-none
                focus:ring-2 focus:ring-[#f15A24]
                focus:border-transparent
                focus:outline-none
                disabled:cursor-not-allowed disabled:opacity-50
              `}
            />
            {errors.comment && (
              <p className="mt-1 !text-[11px] !text-red-400 leading-snug">
                {errors.comment}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <Button
              variant={"primary"}
              type="submit"
              size="lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </div>

          {/* Toast */}
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full font-semibold text-white shadow-lg ${
                status === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {status === "success"
                ? "✅ Your message has been sent successfully!"
                : "❌ Something went wrong. Please try again."}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
