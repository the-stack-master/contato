"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Crown, Leaf, Settings, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PricingPlan, PricingPlans } from "@/types/homeTypes";
import { Button } from "@/components/ui/button";

interface Props {
  pricingData: PricingPlans | null;
}

export default function PricingSectionClient({ pricingData }: Props) {
  if (!pricingData) return null;

  const getIcon = (planData: PricingPlan) => {
    if (planData?.isPopular) {
      return <Crown className="w-6 h-6 text-[#f15A24]" />;
    }
    if (planData?.planType?.toLowerCase() === "free") {
      return <Leaf className="w-6 h-6 text-[#f15A24]" />;
    }
    if (planData?.planType?.toLowerCase() === "custom") {
      return <Settings className="w-6 h-6 text-[#f15A24]" />;
    }

    return <Zap className="w-6 h-6 text-[#f15A24]" />;
  };

  return (
    <section id="pricing" className="py-16 bg-black text-white">
      {/* HEADER */}
      <div className="container mx-auto px-4 text-center max-w-4xl mb-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 !text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {pricingData.sectionHeading}
        </motion.h2>

        <p className="text-lg !text-white">{pricingData.sectionDescription}</p>
      </div>

      {/* PLANS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:!gap-8 max-w-6xl mx-auto px-6 items-stretch">
        {pricingData.plans.map((plan, index) => (
          <motion.div
            key={plan.planType}
            className={plan.isPopular ? "md:scale-[1.05]" : ""}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Card
              className={`relative h-11/12 overflow-hidden rounded-3xl border transition-all duration-300 ${plan.isPopular
                ? "bg-[#1a1a1a] border-[#f15A24] shadow-xl"
                : "bg-[#111111] border-gray-700"
                }`}
            >
              {/* MOST POPULAR BADGE */}
              {plan.isPopular && (
                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-[#f15A24] to-[#d04f23] text-white text-sm font-semibold text-center py-2 rounded-t-3xl">
                  Most Popular
                </div>
              )}

              <div className={`h-full flex flex-col items-center justify-center ${plan?.isPopular ? "pt-16" : "pt-12"} pb-8`}>
                {/* HEADER */}
                <CardHeader
                  className={`text-center`}
                >
                  <div className="flex justify-center mb-8">{getIcon(plan)}</div>

                  <h3
                    className={`text-2xl font-bold mb-1 ${plan.isPopular ? "!text-[#f15A24]" : "!text-white"
                      }`}
                  >
                    {plan.planName}
                  </h3>

                  <div className="mb-1">
                    <span
                      className={`text-4xl font-bold ${plan.isPopular ? "text-[#f15A24]" : "text-white"
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

                {/* CONTENT */}
                <CardContent className="px-8 pb-8 flex flex-col h-full">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan?.features?.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-gray-300"
                      >
                        <Check className="w-5 h-5 text-[#f15A24] mr-3 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* BUTTON */}
                  {plan.isPopular ? (
                    <Button
                      asChild
                      variant="primary"
                      size="md"
                      className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link href={plan.buttonUrl ?? "#"} className="!text-white !font-bold">{plan.buttonText}</Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      size="md"
                      className="
                      w-full rounded-xl font-medium
                      border-[#f15A24] text-[#f15A24]
                      hover:bg-gradient-to-r hover:from-[#f15A24] hover:to-[#d04f23]
                      hover:text-white
                      hover:border-transparent
                      transition-all
                    "
                    >
                      <Link href={plan.buttonUrl ?? "#"}>{plan.buttonText}</Link>
                    </Button>
                  )}
                </CardContent>
              </div>

              {/* DECORATIVE GLOW */}
              {plan.isPopular && (
                <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f15A24] to-[#d04f23] blur-3xl opacity-10" />
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="max-w-4xl mx-auto text-white/70 -mt-10 md:-mt-5 px-8 text-center italic text-xs">
        {pricingData.bottomText}
      </div>

    </section>
  );
}
