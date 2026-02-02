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
  Lock,
  Rocket,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeatureAccordion from "@/components/ui/FeatureUI/FeatureAccordion";
import FeatureDetailsPoints from "@/components/ui/FeatureUI/FeatureDetailsPoints";
import MoreInfoSection from "@/components/ui/FeatureUI/MoreInfoSection";

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
        description: "The system learns from your interactions to provide better matches over time",
        icon: Zap,
      },
      {
        title: "Industry Insights",
        description: "Get matched with professionals based on industry trends and opportunities",
        icon: BarChart3,
      },
    ],
    stats: [
      { number: "95%", label: "Match Accuracy" },
      { number: "3x", label: "More Connections" },
      { number: "50M+", label: "Successful Matches" },
    ],
    howItWorksSteps: [
      {
        title: "Profile Intelligence Analysis",
        content:
          "Our AI system performs a comprehensive analysis of your professional profile, examining your skills, experience, career trajectory, and networking goals. It uses natural language processing to understand nuances in your background and aspirations.",
        image:
          "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "Smart Matching Algorithm",
        content:
          "The algorithm cross-references your profile with millions of professionals in our database, considering factors like industry overlap, complementary skills, shared interests, and mutual career goals to identify the most relevant connections.",
        image:
          "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "Contextual Recommendations",
        content:
          "Matches are presented with detailed context about why the connection is valuable, including shared experiences, potential collaboration opportunities, and mutual benefits to help you make informed networking decisions.",
        image:
          "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "Continuous Learning",
        content:
          "The system learns from your interactions, feedback, and engagement patterns to continuously refine its recommendations, ensuring that each suggestion becomes more accurate and valuable over time.",
        image:
          "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
    ],
    detailPoints: [
      {
        title: "Advanced Machine Learning",
        description:
          "Utilizes deep learning models trained on millions of successful professional connections to predict compatibility and networking potential.",
        icon: Brain,
      },
      {
        title: "Real-Time Processing",
        description:
          "Analyzes profile updates and industry trends in real-time to provide up-to-date matching recommendations that reflect current opportunities.",
        icon: Zap,
      },
      {
        title: "Privacy-First Design",
        description:
          "All profile analysis and matching happens with complete respect for your privacy, with full control over what information is shared.",
        icon: Shield,
      },
      {
        title: "Industry Expertise",
        description:
          "Incorporates industry-specific knowledge and trends to ensure matches are contextually relevant to your professional field.",
        icon: BarChart3,
      },
      {
        title: "Goal Alignment",
        description:
          "Matches professionals based on aligned career goals, ensuring connections that support your long-term professional development.",
        icon: Target,
      },
      {
        title: "Success Tracking",
        description:
          "Monitors the success of connections to continuously improve matching accuracy and provide insights on networking effectiveness.",
        icon: TrendingUp,
      },
    ],
    moreInfo: {
      title: "The Science Behind Smart Matching",
      subtitle: "Understanding how AI transforms professional networking",
      paragraphs: [
        {
          text: "Traditional networking often feels like searching for a needle in a haystack. You spend hours scrolling through profiles, sending connection requests, and hoping for meaningful responses. Our AI-Powered Matching changes this entirely by bringing data science and behavioral psychology together to create connections that matter.",
          emphasis: true,
        },
        {
          text: "The technology begins with a sophisticated profile analysis that goes far beyond simple keyword matching. Natural language processing examines the context and nuances of your professional experience, understanding not just what you do, but how you think about your work and career. This deep understanding forms the foundation for truly relevant matches.",
        },
        {
          text: "What makes our approach unique is the integration of multiple data dimensions. The system considers your explicit preferences, implicit patterns from your behavior, industry dynamics, and even the timing of career transitions. This multi-dimensional analysis ensures that matches are not just relevant, but timely and contextually appropriate.",
        },
        {
          text: "Machine learning models continuously evolve based on outcomes. When you engage with a match, accept a connection, or provide feedback, the system learns what works for you specifically. This creates a personalized networking experience that improves with every interaction, adapting to your unique professional journey.",
          emphasis: true,
        },
        {
          text: "Privacy and transparency are built into every aspect of the matching process. You maintain complete control over your data, and the system provides clear explanations for why specific matches are suggested. This transparency builds trust and helps you make informed decisions about which connections to pursue.",
        },
        {
          text: "The result is a networking experience that feels less like work and more like discovery. Instead of spending hours searching, you receive a curated list of professionals who are genuinely relevant to your goals. This efficiency transforms networking from a time-consuming task into a strategic advantage for your career growth.",
        },
      ],
    },
  },
};

export default function FeatureDetailPage() {
  const params = useParams();
  const feature = featuresData[params.slug as keyof typeof featuresData];

  if (!feature) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold !text-gray-900 mb-4">Feature Not Found</h1>
          <Link href="/" className="!text-[#f15A24] hover:!text-[#d04f23]">
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
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px]
            bg-gradient-to-br from-[#f15A24]/25 to-[#d04f23]/20 blur-3xl"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />

        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px]
            bg-gradient-to-tr from-[#f15A24]/20 to-[#d04f23]/15 blur-3xl"
          animate={{ rotate: [360, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6 sm:px-8 pb-20">
        <div
          className="
      max-w-7xl mx-auto
      grid grid-cols-1 lg:grid-cols-2
      gap-12 lg:gap-16
      items-center
    "
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
        space-y-6 sm:space-y-8
        max-w-3xl
        mx-auto lg:mx-0
        text-center lg:text-left
      "
          >
            <div>
              {/* Back Button */}
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-500 rounded-lg text-orange-500 shadow-sm hover:bg-orange-100 hover:scale-105 transition-all font-medium w-max"
              >
                <ArrowLeft className="w-4 h-4" />
                Features
              </Link>
            </div>
            <div
              className="
          inline-flex w-fit items-center gap-2
          bg-[#f15A24]/10
          px-4 py-2
          rounded-full
          mb-5
          mx-auto lg:mx-0
        "
            >
              <IconComponent className="w-5 h-5 mr-3 !text-[#f15A24]" />
              <span className="text-sm font-semibold !text-[#f15A24]">Feature Spotlight</span>
            </div>

            <h1
              className="
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-bold !text-gray-900 leading-tight
        "
            >
              {feature.title}
            </h1>

            <p
              className="
          text-lg sm:text-xl md:text-2xl
          !text-gray-600 leading-relaxed
        "
            >
              {feature.subtitle}
            </p>

            <p
              className="
          text-base sm:text-lg
          !text-gray-700 leading-relaxed
        "
            >
              {feature.description}
            </p>
          </motion.div>

          {/* Right Image — hidden below lg */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src={feature.heroImage}
              alt={feature.title}
              className="w-full h-[360px] xl:h-[400px] object-cover shadow-2xl"
              style={{
                borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-40 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl md:text-7xl font-bold !text-white mb-20 leading-tight">
            Why You’ll Love
            <br />
            This Feature
          </h2>

          <div className="space-y-6">
            {feature.benefits.map((benefit, index) => (
              <div
                key={index}
                className="
            relative bg-[#1a1a1a]/80 backdrop-blur-sm
            border border-[#f15A24]/30
            p-8 overflow-hidden
          "
              >
                {/* subtle orange accent */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#f15A24] to-[#d04f23]" />

                <p className="text-xl !text-gray-200 leading-relaxed pl-4">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl md:text-6xl font-bold !text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <FeatureAccordion items={feature.howItWorksSteps} />
        </div>
      </section>

      {/* Feature Details */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl md:text-6xl font-bold !text-gray-900 mb-12 text-center">
            Key Features
          </h2>
          <FeatureDetailsPoints points={feature.detailPoints} />
        </div>
      </section>

      {/* More Info */}
      <MoreInfoSection
        title={feature.moreInfo.title}
        subtitle={feature.moreInfo.subtitle}
        paragraphs={feature.moreInfo.paragraphs}
      />
    </div>
  );
}
