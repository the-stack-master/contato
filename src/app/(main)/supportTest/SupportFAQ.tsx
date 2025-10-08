"use client";

import React, { useState } from "react";

const faqItems = [
  {
    question: "How can I contact support?",
    answer:
      "You can reach us anytime at support@contatoapp.com or call +1 800 123 4567 for assistance.",
  },
  {
    question: "What are the support hours?",
    answer:
      "Our support team is available 24/7 to help you with any issues or questions.",
  },
  {
    question: "Where can I find user guides and tutorials?",
    answer:
      "Visit our Help Center on the website for comprehensive user guides, video tutorials, and FAQs.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer:
      "Use the 'Forgot Password' link on the sign-in page and follow the instructions to reset your password securely.",
  },
  {
    question: "How can I update my billing information?",
    answer:
      "Go to your account settings, click on 'Billing', and update your payment details securely.",
  },
  {
    question: "How do I cancel or change my subscription?",
    answer:
      "Subscriptions can be managed under 'Account > Subscription'. You can upgrade, downgrade, or cancel at any time.",
  },
  {
    question: "The app is not working as expected. How do I troubleshoot?",
    answer:
      "Try clearing your app cache, restarting the device, or updating to the latest app version. Contact support if issues persist.",
  },
];

const helpfulTips = [
  "Keep your app updated to access the latest features and security improvements.",
  "Use the Community Forums to share tips and get advice from other users.",
  "Enable notifications to stay informed about new content and events.",
  "Regularly review your profile settings to keep your information up-to-date.",
];

export default function Support() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* Contact Info */}
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
          We’re Here to Help
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Reach out via email, phone, or live chat. Our dedicated support team
          is always ready to assist you.
        </p>
        <div className="flex justify-center flex-wrap gap-8 text-lg text-[#f15A24] font-semibold">
          <a href="mailto:support@contatoapp.com" className="hover:underline">
            support@contatoapp.com
          </a>
          <a href="tel:+18001234567" className="hover:underline">
            +1 800 123 4567
          </a>
          <a href="/live-chat" className="hover:underline">
            Live Chat
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h3 className="text-4xl font-bold mb-8 text-gray-900">
          Frequently Asked Questions
        </h3>
        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-6 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-semibold text-gray-900">
                  {item.question}
                </h4>
                <span className="text-[#f15A24] text-2xl select-none">
                  {expandedIndex === index ? "−" : "+"}
                </span>
              </div>
              {expandedIndex === index && (
                <p className="mt-4 text-gray-700 text-lg">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="bg-[#fef8f5] border border-[#f15A24] rounded-xl p-8">
        <h3 className="text-3xl font-bold mb-6 text-[#f15A24]">Helpful Tips</h3>
        <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg">
          {helpfulTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
