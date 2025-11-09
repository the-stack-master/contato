"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle2,
  Mail,
  Globe,
  Phone,
  Users,
  BarChart3,
} from "lucide-react";

const ExpandingCardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Card 1: Compact Contact Card (top-left)
  const card1X = useTransform(scrollYProgress, [0.2, 0.5], [-200, -720]);
  const card1Y = useTransform(scrollYProgress, [0.2, 0.5], [-100, -260]);
  const card1Scale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  // Card 2: QR Connect Card (top-right)
  const card2X = useTransform(scrollYProgress, [0.2, 0.5], [180, 500]);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.5], [-110, -140]);
  const card2Scale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  // Card 3: Analytics Dashboard (bottom-left)
  const card3X = useTransform(scrollYProgress, [0.2, 0.5], [-220, -740]);
  const card3Y = useTransform(scrollYProgress, [0.2, 0.5], [120, 180]);
  const card3Scale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  // Card 4: Team Card (bottom-right)
  const card4X = useTransform(scrollYProgress, [0.2, 0.5], [190, 520]);
  const card4Y = useTransform(scrollYProgress, [0.2, 0.5], [130, 290]);
  const card4Scale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);
  const card4Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  // Card 5: Main Profile Card (center-top)
  const card5X = useTransform(scrollYProgress, [0.2, 0.5], [0, 0]);
  const card5Y = useTransform(scrollYProgress, [0.2, 0.5], [-120, -220]);
  const card5Scale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);
  const card5Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  const centerOpacity = useTransform(scrollYProgress, [0.15, 0.35], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
      <div
        ref={sectionRef}
        className="relative w-full max-w-[1400px] mx-auto h-[120vh] flex items-center justify-center px-4"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Card 1: Compact Contact Card */}
          <motion.div
            className="absolute w-72 h-96"
            style={{
              x: card1X,
              y: card1Y,
              scale: card1Scale,
              opacity: card1Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
              className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-4 left-4">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M8 24C8 20 12 16 16 16C20 16 24 20 24 24C24 28 20 32 16 32C12 32 8 28 8 24Z"
                    fill="#60A5FA"
                  />
                  <path
                    d="M24 16C24 12 28 8 32 8C36 8 40 12 40 16C40 20 36 24 32 24C28 24 24 20 24 16Z"
                    fill="#34D399"
                  />
                </svg>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-4 mt-12 flex items-center justify-center text-6xl">
                👤
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold mb-1">Sophia Kub</h3>
                <p className="text-sm text-gray-300 mb-1">Marketing Director</p>
                <p className="text-xs text-gray-400">Brightwave Agency</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2: QR Connect Card */}
          <motion.div
            className="absolute w-80 h-[420px]"
            style={{
              x: card2X,
              y: card2Y,
              scale: card2Scale,
              opacity: card2Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
              className="h-full bg-blue-600 rounded-2xl p-8 shadow-2xl text-center flex flex-col justify-between"
            >
              <div className="bg-white rounded-xl p-6 inline-block mx-auto">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-gray-900" : "bg-white"} rounded-sm`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                CONNECT
              </button>
            </motion.div>
          </motion.div>

          {/* Card 3: Analytics Dashboard */}
          <motion.div
            className="absolute w-96 h-80"
            style={{
              x: card3X,
              y: card3Y,
              scale: card3Scale,
              opacity: card3Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
              className="h-full bg-white rounded-2xl p-6 shadow-2xl border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Analytics Overview
                </h3>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <p className="text-2xl font-bold text-blue-900">5.5k</p>
                  <p className="text-xs text-blue-600">Active Users</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <p className="text-2xl font-bold text-green-900">700</p>
                  <p className="text-xs text-green-600">Conversions</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <p className="text-2xl font-bold text-purple-900">250</p>
                  <p className="text-xs text-purple-600">Revenue</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-semibold text-gray-900">+12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "72%" }}
                  />
                </div>
              </div>
              <button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                Export Report
              </button>
            </motion.div>
          </motion.div>

          {/* Card 4: Team Card */}
          <motion.div
            className="absolute w-72 h-[360px]"
            style={{
              x: card4X,
              y: card4Y,
              scale: card4Scale,
              opacity: card4Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
              className="h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-2xl text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Research Team</h3>
                  <p className="text-sm text-white/80">100 cards</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    MG
                  </div>
                  <div>
                    <p className="font-medium text-sm">Marilyn Calzoni</p>
                    <p className="text-xs text-white/70">Admin</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                    MC
                  </div>
                  <div>
                    <p className="font-medium text-sm">Madelyn Curtis</p>
                    <p className="text-xs text-white/70">Admin</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/60 mb-4">
                Last updated: 2/15/2024
              </p>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-3 rounded-xl transition-colors">
                View All Members
              </button>
            </motion.div>
          </motion.div>

          {/* Card 5: Main Profile Card */}
          <motion.div
            className="absolute w-[420px] h-[580px]"
            style={{
              x: card5X,
              y: card5Y,
              scale: card5Scale,
              opacity: card5Opacity,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
              className="h-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="relative h-64 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500 flex items-center justify-center">
                <div className="text-8xl">👋</div>
                <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  WORK
                </div>
                <svg
                  className="absolute bottom-0 w-full"
                  viewBox="0 0 1440 60"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0,32L1440,48L1440,60L0,60Z" fill="white" />
                  <path
                    d="M0,32L720,16L1440,48L1440,60L0,60Z"
                    fill="#3B82F6"
                    opacity="0.5"
                  />
                </svg>
                <div className="absolute bottom-4 right-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-2 mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Sophia Kub
                  </h2>
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                </div>
                <p className="text-base text-gray-600 mb-1">
                  Marketing Director
                </p>
                <p className="text-gray-500 mb-4 italic text-sm">
                  Brightwave Agency
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Creative marketer, community builder, and design enthusiast.
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  📝 Goes by Sophia{" "}
                  <span className="italic">(She/her/hers)</span>
                </div>
                <div className="space-y-2">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>sophia.kub@brightwave.com</span>
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4" />
                    <span>brightwave.com</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Center Text */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0"
          style={{ opacity: centerOpacity }}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-2">
            Everything You Need
          </h2>
          <p className="text-gray-600 text-lg">
            Scroll to explore our features
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpandingCardsSection;
