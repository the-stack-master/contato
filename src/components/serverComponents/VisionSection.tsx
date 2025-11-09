"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  Variants,
  useReducedMotion,
  useAnimation,
} from "framer-motion";
import { Target, Lightbulb, CheckCircle2 } from "lucide-react";

const COLORS = {
  brand: "#f15a24",
  warm: "#ffb47b",
  peach: "#fff4ec",
  bgLight: "#fffaf7",
  textPrimary: "#121212",
  textSecondary: "#444444",
  coolAccent: "#6ea8fe",
};

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: ["easeOut"] },
  },
});

const ContatoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setIsVisible(true));
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isVisible) controls.start("visible");
  }, [isVisible, controls]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fffaf7 0%, #fff4ec 100%)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Subtle floating background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#f15a24]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#6ea8fe]/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What is <span style={{ color: COLORS.brand }}>Contato</span>?
          </h2>
          <p className="text-lg md:text-xl text-[#444] max-w-2xl mx-auto">
            A smarter, human-centered way to build genuine professional
            connections.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Section */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-[#222] leading-relaxed">
              Contato reimagines networking by focusing on authenticity and
              alignment. Our AI ensures you meet professionals who share your
              purpose, values, and vision.
            </p>
            <p className="text-base md:text-lg text-[#333] leading-relaxed">
              Forget endless scrolls and random requests — build relationships
              that actually matter and evolve as your career grows.
            </p>

            {/* Features */}
            <div className="space-y-4 mt-10">
              {[
                {
                  icon: <Target className="w-5 h-5 text-[#f15a24]" />,
                  title: "Purpose-Driven Matching",
                  text: "Connect with professionals who share your goals and complement your skills.",
                },
                {
                  icon: <Lightbulb className="w-5 h-5 text-[#f15a24]" />,
                  title: "Contextual Introductions",
                  text: "Every connection includes shared interests and context to spark real conversations.",
                },
                {
                  icon: <CheckCircle2 className="w-5 h-5 text-[#f15a24]" />,
                  title: "Quality Over Quantity",
                  text: "Build a curated network of high-value connections that support your long-term vision.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#f15a24]/10 shadow-[0_8px_24px_rgba(241,90,36,0.06)] transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f15a24]/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#121212] mb-1 text-base md:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#444] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Stack */}
          <motion.div
            className="relative h-[520px] w-full flex items-center justify-center"
            initial="hidden"
            animate={controls}
            variants={fadeUp(0.3)}
          >
            {/* Subtle floating motion */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
              className="absolute w-[80%] h-[400px] rounded-3xl shadow-xl overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&h=700&fit=crop"
                alt="Networking session"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fff4ec]/60 to-transparent" />
            </motion.div>

            {/* Top right accent image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
              className="absolute right-0 top-0 w-[45%] h-[260px] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-[#fff4ec]/70" />
            </motion.div>

            {/* Bottom left accent image */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut",
              }}
              className="absolute left-0 bottom-0 w-[38%] h-[240px] rounded-2xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=900&h=600&fit=crop"
                alt="Professional conversation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fffaf7]/70 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContatoSection;
