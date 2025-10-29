"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Star,
  Users,
  Zap,
  Shield,
  Brain,
  Calendar,
  Video,
  MessageCircle,
  ChartBar as BarChart3,
  Coffee,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Feature data - this would typically come from a CMS or API
const featuresData = {
  "ai-matching": {
    title: "AI-Powered Matching",
    subtitle: "Connect with the right professionals using advanced algorithms",
    description:
      "Our sophisticated AI analyzes your professional profile, career goals, and networking preferences to connect you with the most relevant professionals in your industry.",
    icon: Brain,
    gradient: "from-[#f15A24] via-orange-500 to-red-500",
    bgGradient: "from-orange-50 via-orange-100 to-red-50",
    detailedDescription:
      "Our AI-Powered Matching technology represents a breakthrough in professional networking. By combining advanced machine learning algorithms with behavioral psychology, we create connections that go beyond simple keyword matching. The system analyzes thousands of data points from your profile, including your skills, experience, industry trends, career trajectory, and even your communication style. It then cross-references this information with our extensive database of professionals to find matches that align with your goals and values. What makes our matching unique is its ability to learn and adapt. Every interaction you have with the platform teaches the AI more about your preferences, allowing it to refine its recommendations over time. This means the more you use NetworkPro, the better your matches become. The technology also considers timing and context, ensuring you&apos;re connected with people at the right moment in their professional journey when collaboration is most likely to be mutually beneficial.",
    heroImage:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    benefits: [
      "Save 80% of time finding relevant connections",
      "Higher quality matches based on mutual interests",
      "Intelligent recommendations that improve over time",
      "Cross-industry networking opportunities",
    ],
    features: [
      {
        title: "Smart Profile Analysis",
        description:
          "AI analyzes your skills, experience, and goals to understand your networking needs",
        icon: Brain,
      },
      {
        title: "Behavioral Learning",
        description:
          "The system learns from your interactions to provide better matches over time",
        icon: Zap,
      },
      {
        title: "Industry Insights",
        description:
          "Get matched with professionals based on industry trends and opportunities",
        icon: BarChart3,
      },
    ],
    stats: [
      { number: "95%", label: "Match Accuracy" },
      { number: "3x", label: "More Connections" },
      { number: "50M+", label: "Successful Matches" },
    ],
  },
  "video-introductions": {
    title: "Video Introduction Cards",
    subtitle: "Make memorable first impressions with personal video messages",
    description:
      "Stand out from the crowd with 30-second video introductions that showcase your personality and professional brand in a way that text profiles simply cannot.",
    icon: Video,
    gradient: "from-[#f15A24] via-orange-500 to-red-500",
    bgGradient: "from-orange-50 via-orange-100 to-red-50",
    detailedDescription:
      "Video Introduction Cards revolutionize the way professionals present themselves in the digital space. In a world where first impressions are increasingly made online, a static profile photo and text bio can only convey so much. Our video introduction feature allows you to showcase your personality, communication skills, and professional presence in just 30 seconds. The platform provides intelligent recording tools that help you create polished, professional videos without expensive equipment or technical expertise. Built-in templates guide you through the process, suggesting talking points based on your industry and goals. The system also includes subtle editing features like background enhancement and audio optimization to ensure you always look and sound your best. Privacy is paramount—you maintain complete control over who can view your video and when it plays. Research shows that profiles with video introductions receive 400% more views and significantly higher engagement rates, as they create an immediate sense of connection and trust that text alone cannot achieve.",
    heroImage:
      "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    benefits: [
      "Increase profile views by 400%",
      "Higher response rates to connection requests",
      "Showcase personality beyond text",
      "Build trust before the first meeting",
    ],
    features: [
      {
        title: "Easy Recording",
        description:
          "Record professional videos directly in the app with built-in editing tools",
        icon: Video,
      },
      {
        title: "Smart Templates",
        description:
          "Choose from industry-specific templates to create compelling introductions",
        icon: Star,
      },
      {
        title: "Privacy Controls",
        description:
          "Control who can see your video and when it plays automatically",
        icon: Shield,
      },
    ],
    stats: [
      { number: "400%", label: "More Profile Views" },
      { number: "85%", label: "Response Rate" },
      { number: "2M+", label: "Videos Created" },
    ],
  },
  "secure-messaging": {
    title: "Secure Messaging",
    subtitle: "Connect safely with end-to-end encrypted conversations",
    description:
      "Professional networking requires trust. Our secure messaging platform ensures your conversations remain private while providing powerful tools for meaningful professional communication.",
    icon: MessageCircle,
    gradient: "from-[#f15A24] via-orange-500 to-red-500",
    bgGradient: "from-orange-50 via-orange-100 to-red-50",
    detailedDescription:
      "Secure Messaging is built on the principle that professional networking requires absolute trust and privacy. Our end-to-end encryption ensures that your conversations remain completely confidential, using military-grade security protocols that protect your communications from any unauthorized access. But security is just the foundation. The messaging platform includes intelligent features designed specifically for professional communication. AI-powered conversation starters help you break the ice naturally, while smart suggestions offer context-appropriate responses based on the conversation flow. The system can detect the tone and subject matter of your discussions, offering relevant resources or suggesting optimal times for follow-ups. Rich media support allows you to share documents, presentations, and portfolios securely within the conversation, with automatic virus scanning and file verification. Message scheduling lets you compose communications when it&apos;s convenient for you while sending them at optimal times for your recipient. The platform also includes read receipts, typing indicators, and conversation threading to make your professional communications as efficient and effective as possible.",
    heroImage:
      "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    benefits: [
      "End-to-end encryption for all messages",
      "Professional conversation templates",
      "File sharing with security scanning",
      "Message scheduling and reminders",
    ],
    features: [
      {
        title: "End-to-End Encryption",
        description:
          "Military-grade encryption ensures your conversations stay completely private",
        icon: Shield,
      },
      {
        title: "Smart Suggestions",
        description:
          "AI-powered conversation starters and professional response suggestions",
        icon: Brain,
      },
      {
        title: "Rich Media Support",
        description:
          "Share documents, images, and videos securely within conversations",
        icon: MessageCircle,
      },
    ],
    stats: [
      { number: "100%", label: "Encrypted Messages" },
      { number: "99.9%", label: "Uptime" },
      { number: "10M+", label: "Messages Daily" },
    ],
  },
};

export default function FeatureDetailPage() {
  const params = useParams();
  const feature = featuresData[params.slug as keyof typeof featuresData];

  if (!feature) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Feature Not Found
          </h1>
          <Link href="/" className="text-[#f15A24] hover:text-orange-600">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = feature.icon;

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Organic Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-200/30 to-red-200/20 opacity-60 blur-3xl"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-orange-300/20 to-amber-200/20 opacity-50 blur-3xl"
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-bl from-orange-200/30 to-red-100/20 opacity-40 blur-2xl"
          style={{
            borderRadius: "70% 30% 50% 50% / 60% 40% 60% 40%",
          }}
          animate={{
            rotate: [0, -360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#f15A24] to-orange-500 text-white font-medium shadow-2xl"
                style={{
                  borderRadius: "50px 20px 50px 20px",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                Feature Spotlight
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                {feature.title}
              </h1>

              <p className="text-2xl text-gray-600 leading-relaxed">
                {feature.subtitle}
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                {feature.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#f15A24] to-orange-500 hover:opacity-90 text-white px-10 py-6 text-xl font-semibold shadow-2xl border-0"
                    style={{
                      borderRadius: "30px 10px 30px 10px",
                    }}
                  >
                    Try This Feature
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-6 text-xl font-semibold shadow-xl bg-white/80 backdrop-blur-sm"
                    style={{
                      borderRadius: "10px 30px 10px 30px",
                    }}
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-300/30 to-red-300/30 opacity-50 blur-2xl"
                  style={{
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <img
                  src={feature.heroImage}
                  alt={feature.title}
                  className="relative w-full h-96 object-cover shadow-2xl"
                  style={{
                    borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
                  }}
                />

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-sm p-8 shadow-2xl"
                  style={{
                    borderRadius: "30px 60px 30px 60px",
                  }}
                >
                  <div className="flex items-center space-x-6">
                    <div
                      className="w-16 h-16 bg-gradient-to-r from-[#f15A24] to-orange-500 flex items-center justify-center"
                      style={{
                        borderRadius: "50% 20% 50% 20%",
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {feature.stats[0].number}
                      </div>
                      <div className="text-sm text-gray-600">
                        {feature.stats[0].label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Why You&apos;ll Love This Feature
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the powerful benefits that make this feature essential
              for your professional growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feature.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-6 bg-white/70 backdrop-blur-sm p-8 hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
                style={{
                  borderRadius:
                    index % 2 === 0
                      ? "40px 20px 40px 20px"
                      : "20px 40px 20px 40px",
                }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div
                  className="w-12 h-12 bg-gradient-to-r from-[#f15A24] to-orange-500 flex items-center justify-center flex-shrink-0 mt-2"
                  style={{
                    borderRadius: "50% 20% 50% 20%",
                  }}
                >
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Breakdown */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              How It Works
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A seamless experience designed for your success.
            </p>
          </motion.div>

          <div className="space-y-32 max-w-5xl mx-auto">
            {feature.features.map((item, index) => {
              const FeatureIcon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
                >
                  <motion.div
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.05, rotate: isEven ? 5 : -5 }}
                  >
                    <motion.div
                      className="absolute inset-0 -m-8 bg-gradient-to-br from-orange-200/40 to-red-200/40 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />

                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#f15A24] to-orange-500 flex items-center justify-center shadow-2xl">
                      <FeatureIcon
                        className="w-16 h-16 lg:w-20 lg:h-20 text-white"
                        strokeWidth={2}
                      />
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="absolute -top-4 -right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#f15A24]"
                    >
                      <span className="text-2xl font-bold text-[#f15A24]">
                        {index + 1}
                      </span>
                    </motion.div>
                  </motion.div>

                  <div
                    className={`flex-1 ${isEven ? "lg:text-left" : "lg:text-right"} text-center space-y-4`}
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-4xl md:text-5xl font-bold text-gray-900"
                    >
                      {item.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl md:text-2xl text-gray-600 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-32 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-full border-2 border-orange-200">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-[#f15A24] to-orange-500"
              />
              <span className="text-lg font-semibold text-gray-700">
                Get started in under 5 minutes
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Feature Description Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#f15A24] to-orange-500 rounded-full shadow-xl mb-8"
              whileHover={{ scale: 1.1, rotate: 10 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <IconComponent
                className="w-12 h-12 text-white"
                strokeWidth={2.5}
              />
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              The Technology Behind
              <br />
              <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
                {feature.title}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
              {feature.detailedDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-12 lg:gap-20"
          >
            {feature.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="relative text-center"
              >
                <motion.div
                  className="absolute inset-0 -m-8 bg-gradient-to-br from-orange-100/50 to-red-100/50 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
                <div className="relative">
                  <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-[#f15A24] to-orange-500 bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </div>
                  <div className="text-lg md:text-xl text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 p-16 text-white relative overflow-hidden shadow-2xl rounded-3xl"
          >
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Ready to Get Started?
              </h2>
              <p className="text-2xl mb-12 opacity-90 leading-relaxed">
                Join millions of professionals who are already using this
                feature to accelerate their careers.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-[#f15A24] hover:bg-gray-100 px-12 py-6 text-xl font-semibold shadow-2xl rounded-full border-0"
                  >
                    Download NetworkPro
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#f15A24] px-12 py-6 text-xl font-semibold transition-all duration-300 rounded-full"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Organic Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 20 + 10}px`,
                    height: `${Math.random() * 20 + 10}px`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
