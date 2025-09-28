// components/features/FeaturesHighlight.tsx
import { Brain, Globe, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    desc: "Smart recommendations help you connect with the right people.",
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "Build meaningful connections across borders and industries.",
  },
  {
    icon: Shield,
    title: "Secure Networking",
    desc: "Your data is safe with enterprise-grade security standards.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    desc: "Track opportunities and grow your professional network.",
  },
];

export default function FeaturesHighlight() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Latest Features
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition"
            >
              <f.icon className="w-12 h-12 text-[#f15A24] mb-4" />
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
