"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Crown, Zap, Building } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PricingPlans } from "@/types/homeTypes";

interface PricingFeature {
  text: string;
  included?: boolean;
}

interface PricingPlan {
  planName: string;
  planSubtitle?: string;
  price: string;
  pricePeriod?: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonUrl?: string;
  isPopular: boolean;
  badgeText?: string;
  planIcon?: string;
}

interface PricingBlock {
  _id: string;
  title?: string;
  pricingPlans: PricingPlan[];
}

interface PricingFooterFeature {
  text: string;
  icon?: string;
}

interface PricingFooter {
  _id: string;
  title?: string;
  mainText?: string;
  features: PricingFooterFeature[];
  isActive: boolean;
}

interface PricingHeader {
  _id: string;
  heading?: string;
  subHeading?: string;
}

interface Props {
  pricingData: PricingPlans | null;
}

export default function PricingSectionClient({ pricingData }: Props) {
  if (!pricingData) return null;

  return (
    <section id="pricing" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center max-w-4xl mx-auto mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {pricingData?.sectionHeading}
        </motion.h2>

        <p className="text-lg text-gray-300">
          {pricingData?.sectionDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingData?.plans.map((plan, index) => (
          <motion.div
            key={`${plan.planName}-${index}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="rounded-3xl"
          >
            <Card
              className={`group relative overflow-hidden rounded-3xl border ${
                plan.isPopular
                  ? "bg-[#1a1a1a] shadow-lg border-[#f15A24] scale-105"
                  : "bg-[#111111] border-gray-700"
              } transition-all duration-300`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#f15A24] to-[#d04f23] text-white text-sm font-semibold text-center py-2 rounded-b-xl z-10">
                  {"Most Popular"}
                </div>
              )}

              <CardHeader
                className={`text-center ${plan.isPopular ? "pt-14" : "pt-10"}`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="text-[#f15A24] group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-[#f15A24]" />
                  </div>
                </div>

                <h3
                  className={`text-2xl font-bold ${
                    plan.isPopular ? "text-[#f15A24]" : "text-white"
                  } mb-2`}
                >
                  {plan.planName}
                </h3>

                {/* {plan.planSubtitle && (
                  <p className="text-sm text-gray-400 mb-1">
                    {plan.planSubtitle}
                  </p>
                )} */}

                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold ${
                      plan.isPopular ? "text-[#f15A24]" : "text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.priceUnit && (
                    <span className="text-gray-400 ml-2">{plan.priceUnit}</span>
                  )}
                </div>

                <p className="text-gray-400 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <ul className="space-y-3 mb-8">
                  {plan.features?.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-start text-sm text-gray-300`}
                    >
                      <Check className="w-5 h-5 text-[#f15A24] mr-3 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.buttonUrl?.startsWith("/") ? (
                  <Link
                    href={plan.buttonUrl}
                    className={`inline-block w-full text-lg font-semibold transition-all duration-300 text-center py-3 rounded-lg ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-[#f15A24] to-[#d04f23] hover:shadow-lg text-white"
                        : "text-[#f15A24] border border-[#f15A24] hover:bg-[#f15A24]/10"
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                ) : (
                  <p
                    onClick={() =>
                      window.open(
                        plan.buttonUrl,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className={`cursor-pointer inline-block w-full text-lg font-semibold transition-all duration-300 text-center py-3 rounded-lg ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-[#f15A24] to-[#d04f23] hover:shadow-lg text-white"
                        : "text-[#f15A24] border border-[#f15A24] hover:bg-[#f15A24]/10"
                    }`}
                  >
                    {plan.buttonText}
                  </p>
                )}
              </CardContent>

              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f15A24] to-[#d04f23] rounded-full blur-3xl opacity-10 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer Section */}

      <div className="max-w-4xl mx-auto text-gray-400 mt-16 px-4 space-y-6 text-center">
        <div>
          <p className="mb-4">{pricingData.bottomText}</p>
        </div>
      </div>
    </section>
  );
}
