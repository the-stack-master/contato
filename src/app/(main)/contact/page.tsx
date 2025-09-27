"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative py-24 min-h-screen bg-gradient-to-br from-[#fff7f4] via-[#f5f1fd] to-[#fff9f3] overflow-hidden">
      {/* Floating background blobs */}
      <div className="absolute top-0 left-[-4rem] w-[28rem] h-[28rem] bg-gradient-to-bl from-orange-300/30 via-pink-300/20 to-white rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-6rem] w-[22rem] h-[22rem] bg-gradient-to-br from-blue-300/25 via-purple-300/20 to-white rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 relative z-10 items-start">
        {/* Contact form glass card */}
        <form className="relative bg-white/65 backdrop-blur-[10px] border border-white/60 rounded-3xl shadow-2xl p-10 space-y-7">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-900 drop-shadow">
            Contact Us
          </h2>

          <div>
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="name"
            >
              Name<span className="text-orange-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Your Name"
              className="w-full rounded-2xl px-4 py-3 border border-gray-300 bg-white/85 transition placeholder:text-gray-400 text-base focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="email"
            >
              Email<span className="text-orange-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-2xl px-4 py-3 border border-gray-300 bg-white/85 transition placeholder:text-gray-400 text-base focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
            <span className="block text-xs text-gray-400 mt-1">
              We&apos;ll never share your email.
            </span>
          </div>

          <div>
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(Optional)"
              className="w-full rounded-2xl px-4 py-3 border border-gray-300 bg-white/85 transition placeholder:text-gray-400 text-base focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="message"
            >
              Message<span className="text-orange-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Type your message..."
              className="w-full rounded-2xl px-4 py-3 border border-gray-300 bg-white/85 transition placeholder:text-gray-400 text-base focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <button
            type="submit"
            className="mt-2 py-4 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-[#f15A24] to-orange-500 w-full shadow-xl hover:scale-105 transition-transform hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            Send Message
          </button>
        </form>

        {/* Info + icons card glassmorphism */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/60 border border-white/40 backdrop-blur-2xl rounded-2xl shadow-lg p-6 flex items-center gap-5">
            <Mail className="w-7 h-7 text-[#f15A24]" />
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-gray-600">hello@connecto.com</p>
            </div>
          </div>
          <div className="bg-white/60 border border-white/40 backdrop-blur-2xl rounded-2xl shadow-lg p-6 flex items-center gap-5">
            <Phone className="w-7 h-7 text-[#f15A24]" />
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-gray-600">+91 123 456 7890</p>
            </div>
          </div>
          <div className="bg-white/60 border border-white/40 backdrop-blur-2xl rounded-2xl shadow-lg p-6 flex items-center gap-5">
            <MapPin className="w-7 h-7 text-[#f15A24]" />
            <div>
              <p className="font-medium text-gray-900">Address</p>
              <p className="text-gray-600">
                123 Startup Street, Tech City, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
