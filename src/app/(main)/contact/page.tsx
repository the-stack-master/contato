"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setStatus(null);

  //   const formData = new FormData(e.currentTarget);
  //   const data = Object.fromEntries(formData.entries());

  //   try {
  //     const res = await fetch("/api/contact", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     if (res.ok) {
  //       setStatus("success");
  //       e.currentTarget.reset();
  //     } else {
  //       setStatus("error");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          onSubmit={() => {}}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-3xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              required
              placeholder="Enter first name"
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              required
              placeholder="Enter last name"
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              E-Mail
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter email"
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition"
            />
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
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-[#f15A24]/30 focus:border-[#f15A24] outline-none transition"
            />
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
        </motion.form>

        {/* Status Messages */}
        {status === "success" && (
          <p className="mt-6 text-green-600 text-center font-semibold">
            ✅ Your message has been sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="mt-6 text-red-600 text-center font-semibold">
            ❌ Something went wrong. Please try again later.
          </p>
        )}
      </div>
    </section>
  );
}
