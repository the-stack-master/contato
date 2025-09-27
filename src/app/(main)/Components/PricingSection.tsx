"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Crown, Zap, Building } from "lucide-react";
import { motion } from "framer-motion";
import { JSX } from "react";

type ButtonVariant =
  | "outline"
  | "default"
  | "link"
  | "destructive"
  | "secondary"
  | "ghost"
  | null
  | undefined;

const plans: {
  name: string;
  icon: JSX.Element;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  variant: ButtonVariant;
}[] = [
  {
    name: "Basic",
    icon: <Zap className="w-6 h-6 text-[#f15A24]" />,
    price: "Free",
    period: "forever",
    description:
      "Perfect for individual users exploring Contato’s essential content and networking features",
    features: [
      "Access to curated blogs and videos",
      "Standard community features",
      "Basic content recommendations",
      "Mobile app access",
      "Standard support",
    ],
    cta: "Get Started Free",
    popular: false,
    variant: "outline",
  },
  {
    name: "Pro",
    icon: <Crown className="w-6 h-6 text-[#f15A24]" />,
    price: "$12",
    period: "per month",
    description:
      "Ideal for professionals seeking full access and advanced networking insights",
    features: [
      "Unlimited premium content access",
      "Enhanced community engagement tools",
      "Personalized content insights",
      "Priority support",
      "Third-party integrations",
    ],
    cta: "Start Free Trial",
    popular: true,
    variant: "default",
  },
  {
    name: "Enterprise",
    icon: <Building className="w-6 h-6 text-[#f15A24]" />,
    price: "Custom",
    period: "pricing",
    description:
      "Comprehensive solution for teams and organizations driving content strategy and engagement",
    features: [
      "All Pro features included",
      "Team management & collaboration",
      "Advanced analytics and reporting",
      "Dedicated account management",
      "Custom integrations and SSO",
    ],
    cta: "Contact Sales",
    popular: false,
    variant: "outline",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include access to
            Contato’s core app features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="rounded-3xl"
            >
              <Card
                className={`group relative overflow-hidden rounded-3xl border ${
                  plan.popular
                    ? "bg-[#1a1a1a] shadow-lg border-[#f15A24] scale-105"
                    : "bg-[#111111] border-gray-700"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#f15A24] to-[#d04f23] text-white text-sm font-semibold text-center py-2 rounded-b-xl z-10">
                    Most Popular
                  </div>
                )}

                <CardHeader
                  className={`text-center ${plan.popular ? "pt-14" : "pt-10"}`}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-[#f15A24] group-hover:scale-110 transition-transform duration-300">
                      {plan.icon}
                    </div>
                  </div>

                  <h3
                    className={`text-2xl font-bold ${
                      plan.popular ? "text-[#f15A24]" : "text-white"
                    } mb-2`}
                  >
                    {plan.name}
                  </h3>

                  <div className="mb-4">
                    <span
                      className={`text-4xl font-bold ${
                        plan.popular ? "text-[#f15A24]" : "text-white"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-300 text-sm"
                      >
                        <Check className="w-5 h-5 text-[#f15A24] mr-3 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={
                      plan.variant as
                        | "outline"
                        | "default"
                        | "link"
                        | "destructive"
                        | "secondary"
                        | "ghost"
                        | null
                        | undefined
                    }
                    className={`w-full text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#f15A24] to-[#d04f23] hover:shadow-lg"
                        : "text-[#f15A24] border-[#f15A24] hover:bg-[#f15A24]/10"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>

                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f15A24] to-[#d04f23] rounded-full blur-3xl opacity-10 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12 max-w-3xl mx-auto text-gray-400">
          <p className="mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#f15A24]" />
              <span>Cancel anytime</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#f15A24]" />
              <span>24/7 support</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#f15A24]" />
              <span>99.9% uptime</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
