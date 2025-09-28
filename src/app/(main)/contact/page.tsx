"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: Record<string, any>) => {
    const err: Record<string, string> = {};
    if (!data.firstName || data.firstName.trim().length < 2) {
      err.firstName = "First name must be at least 2 characters";
    }
    if (!data.lastName || data.lastName.trim().length < 2) {
      err.lastName = "Last name must be at least 2 characters";
    }
    if (
      !data.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email.trim())
    ) {
      err.email = "Invalid email address";
    }
    if (!data.phone || data.phone.trim().length < 2) {
      err.phone = "Phone number required";
    }
    if (!data.phone || data.phone.trim().length < 2) {
      err.phone = "Phone number required";
    }
    if (!data.business || data.business.trim().length < 2) {
      err.business = "Business name required";
    }
    if (!data.comment || data.comment.trim().length < 2) {
      err.comment = "Comment required";
    }
    if (data.phone && !/^\+?[\d\s()-]{7,}$/i.test(data.phone.trim())) {
      err.phone = "Invalid phone number";
    }
    return err;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const formElement = e.currentTarget; // Save ref before async
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());
    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
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
        formElement.reset(); // safe reset here
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Hide toast after 3 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Feel free to reach out and stay connected with us.
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-3xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8 relative"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              placeholder="Enter first name"
              className={`w-full px-5 py-3 border rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              placeholder="Enter last name"
              className={`w-full px-5 py-3 border rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              E-Mail
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              className={`w-full px-5 py-3 border rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              className={`w-full px-5 py-3 border rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Business Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Business Name
            </label>
            <input
              name="business"
              type="text"
              placeholder="Enter business name"
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition"
            />
            {errors.business && (
              <p className="mt-1 text-red-500 text-xs">{errors.business}</p>
            )}
          </div>

          {/* Comments */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Comments
            </label>
            <textarea
              name="comments"
              rows={4}
              placeholder="Write your message..."
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition resize-none"
            />
            {errors.comment && (
              <p className="mt-1 text-red-500 text-xs">{errors.comment}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-4 bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 text-white font-bold rounded-2xl transition transform ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-105 hover:brightness-110"
              }`}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>

          {/* Toast Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: status ? 1 : 0, y: status ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full font-semibold text-white shadow-lg ${
              status === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {status === "success" &&
              "✅ Your message has been sent successfully!"}
            {status === "error" &&
              "❌ Something went wrong. Please try again later."}
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
