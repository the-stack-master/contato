// components/features/HeroSection.tsx (server)
import HeroAnimation from "./HeroAnimation";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-yellow-200">
          Discover Our Features
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          The AI-powered networking app built to help you connect, collaborate,
          and grow your career worldwide.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="px-6 py-3 bg-white text-[#f15A24] rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            App Store
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-[#f15A24] rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            Google Play
          </a>
        </div>
      </div>
      <HeroAnimation />
    </section>
  );
}
