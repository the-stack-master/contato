"use client";

import useNavigate from "@/hooks/useNavigate";
import { motion } from "framer-motion";
import { Brain, Calendar, Video, ArrowRight } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

interface LatestFeaturesSectionProps {
  features: Feature[];
}

const iconMap = {
  brain: Brain,
  calendar: Calendar,
  video: Video,
};

export default function LatestFeaturesSection({
  features,
}: LatestFeaturesSectionProps) {
  const widths = ["65%", "55%", "60%", "58%"];
  const positions = ["0%", "20%", "40%", "10%"];

  const navigate = useNavigate();

  return (
    <section className="py-40 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />

      <div className="max-w-7xl mx-auto px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-blue-500" />
            <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
              What's New
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Latest Features
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Discover the newest capabilities that make this platform essential
          </p>
        </motion.div>

        <div className="relative">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;
            const width = widths[index % widths.length];
            const position = positions[index % positions.length];

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: isEven ? -100 : 100,
                  rotate: isEven ? -2 : 2,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 80,
                }}
                className="absolute"
                style={{
                  width,
                  left: position,
                  top: `${index * 280}px`,
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    rotate: isEven ? 1 : -1,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-start gap-8 p-8 md:p-10">
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{
                          rotate: 360,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="relative">
                          <motion.div
                            className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center"
                            whileHover={{
                              borderColor: "rgba(59, 130, 246, 0.6)",
                              backgroundColor: "rgba(59, 130, 246, 0.2)",
                            }}
                          >
                            <IconComponent
                              className="w-8 h-8 text-blue-400"
                              strokeWidth={1.5}
                            />
                          </motion.div>
                          {feature.badge && (
                            <motion.div
                              className="absolute -top-2 -right-2 px-2 py-1 bg-blue-500 text-white text-xs font-medium tracking-wide"
                              animate={{
                                y: [0, -2, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              {feature.badge}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>

                      <div className="flex-1">
                        <motion.h3
                          className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
                          whileHover={{
                            x: 5,
                            transition: { duration: 0.2 },
                          }}
                        >
                          {feature.title}
                        </motion.h3>
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                          {feature.description}
                        </p>

                        <motion.button
                          className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors group/btn"
                          whileHover={{ x: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>

                      <div className="hidden md:flex items-center justify-center w-20">
                        <motion.div
                          className="text-6xl font-bold text-slate-700/50 group-hover:text-slate-600/50 transition-colors"
                          whileHover={{
                            scale: 1.2,
                            color: "rgba(59, 130, 246, 0.3)",
                            transition: { duration: 0.3 },
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </motion.div>
                      </div>
                    </div>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                      style={{ opacity: 0.5 }}
                    />

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />

                    <motion.div
                      className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-blue-500 to-transparent"
                      whileHover={{
                        height: "100%",
                        transition: { duration: 0.4 },
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
          style={{ marginTop: `${features.length * 280 + 60}px` }}
        >
          <motion.button
            className="px-8 py-4 bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 hover:border-blue-500/50 transition-all duration-300 font-medium relative overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/features");
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10">View All Features</span>
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
}
