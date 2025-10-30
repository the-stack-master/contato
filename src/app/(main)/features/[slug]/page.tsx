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
      "Our AI-Powered Matching technology represents a breakthrough in professional networking. By combining advanced machine learning algorithms with behavioral psychology, we create connections that go beyond simple keyword matching. The system analyzes thousands of data points from your profile, including your skills, experience, industry trends, career trajectory, and even your communication style. It then cross-references this information with our extensive database of professionals to find matches that align with your goals and values. What makes our matching unique is its ability to learn and adapt. Every interaction you have with the platform teaches the AI more about your preferences, allowing it to refine its recommendations over time. This means the more you use NetworkPro, the better your matches become. The technology also considers timing and context, ensuring you're connected with people at the right moment in their professional journey when collaboration is most likely to be mutually beneficial.",
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
    howItWorksSteps: [
      {
        title: "Record Your Introduction",
        content:
          "Use our intuitive in-app camera interface to record a 30-second video introduction. Built-in guides help you frame the perfect shot, and smart templates suggest talking points based on your industry and profile.",
        image:
          "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "AI Enhancement",
        content:
          "Our AI automatically enhances your video with background optimization, audio clarity improvements, and subtle lighting adjustments to ensure you always look and sound professional without manual editing.",
        image:
          "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "Smart Distribution",
        content:
          "Control when and how your video appears on your profile. Set privacy preferences, choose automatic or manual playback, and decide which connections can view your introduction.",
        image:
          "https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "Track Engagement",
        content:
          "Monitor how your video introduction performs with detailed analytics showing views, completion rates, and conversion to connection requests, helping you refine your message over time.",
        image:
          "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
    ],
    detailPoints: [
      {
        title: "Professional Quality",
        description:
          "Built-in tools ensure broadcast-quality videos without expensive equipment, making professional presentation accessible to everyone.",
        icon: Video,
      },
      {
        title: "Authentic Connection",
        description:
          "Video creates immediate personal connection and trust that text profiles cannot achieve, leading to higher quality professional relationships.",
        icon: Users,
      },
      {
        title: "Privacy Controls",
        description:
          "Granular privacy settings let you control exactly who can view your video and when it plays, maintaining professional boundaries.",
        icon: Lock,
      },
      {
        title: "Mobile Optimized",
        description:
          "Record and view videos seamlessly across all devices, ensuring your introduction looks great whether viewed on desktop or mobile.",
        icon: Rocket,
      },
      {
        title: "Template Library",
        description:
          "Access industry-specific templates and examples to help you create compelling introductions that resonate with your target audience.",
        icon: Star,
      },
      {
        title: "Performance Analytics",
        description:
          "Detailed metrics show how your video performs, helping you optimize your message for maximum impact and engagement.",
        icon: BarChart3,
      },
    ],
    moreInfo: {
      title: "Why Video Introductions Matter",
      subtitle: "The psychology and impact of visual professional presence",
      paragraphs: [
        {
          text: "In the digital age, first impressions happen in seconds, often before any direct communication takes place. A static profile photo and text bio can only convey limited information about who you really are as a professional. Video introductions bridge this gap by showcasing your personality, communication style, and professional presence in ways that text simply cannot match.",
          emphasis: true,
        },
        {
          text: "Research in communication psychology shows that humans process visual and auditory information far more quickly and deeply than text. When someone watches your video introduction, they form a more complete and accurate impression of you as a professional, leading to higher quality connections and more meaningful networking outcomes.",
        },
        {
          text: "Video introductions also address the trust deficit inherent in online professional networking. Seeing and hearing you speak creates an immediate sense of authenticity and credibility that profile text struggles to achieve. This trust factor significantly increases the likelihood that others will engage with your connection requests and respond to your messages.",
        },
        {
          text: "The technology behind our video introductions is designed to make professional quality accessible to everyone. You do not need expensive equipment, professional lighting, or editing skills. Our AI-powered enhancements automatically optimize your video for clarity, lighting, and audio quality, ensuring you always present your best professional self.",
          emphasis: true,
        },
        {
          text: "Privacy remains paramount in our video introduction system. You have complete control over who can view your video, when it plays, and how it appears on your profile. This granular control lets you maintain professional boundaries while still leveraging the power of video to enhance your networking presence.",
        },
        {
          text: "Analytics provide valuable insights into how your video introduction performs. You can see completion rates, which audiences engage most, and how often your video leads to connection requests. These metrics help you refine your message over time, creating an introduction that truly resonates with your professional goals and target audience.",
        },
      ],
    },
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
      "Secure Messaging is built on the principle that professional networking requires absolute trust and privacy. Our end-to-end encryption ensures that your conversations remain completely confidential, using military-grade security protocols that protect your communications from any unauthorized access. But security is just the foundation. The messaging platform includes intelligent features designed specifically for professional communication. AI-powered conversation starters help you break the ice naturally, while smart suggestions offer context-appropriate responses based on the conversation flow. The system can detect the tone and subject matter of your discussions, offering relevant resources or suggesting optimal times for follow-ups. Rich media support allows you to share documents, presentations, and portfolios securely within the conversation, with automatic virus scanning and file verification. Message scheduling lets you compose communications when it's convenient for you while sending them at optimal times for your recipient. The platform also includes read receipts, typing indicators, and conversation threading to make your professional communications as efficient and effective as possible.",
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
    howItWorksSteps: [
      {
        title: "End-to-End Encryption",
        content:
          "Every message is encrypted using military-grade AES-256 encryption before leaving your device. Only you and your intended recipient can read the messages, ensuring complete privacy and confidentiality in all your professional communications.",
        image:
          "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "Smart Conversation Tools",
        content:
          "AI-powered features suggest conversation starters, provide context-appropriate responses, and help you maintain professional tone throughout your communications, making networking conversations more natural and effective.",
        image:
          "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "Secure File Sharing",
        content:
          "Share documents, portfolios, and media securely within conversations with automatic virus scanning and file verification. All shared content maintains the same level of encryption as your messages.",
        image:
          "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
      {
        title: "Advanced Features",
        content:
          "Schedule messages for optimal delivery times, set reminders for follow-ups, organize conversations with threading, and track read receipts to ensure your professional communications are timely and effective.",
        image:
          "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      },
    ],
    detailPoints: [
      {
        title: "Military-Grade Security",
        description:
          "AES-256 encryption and end-to-end security protocols ensure your professional conversations remain completely private and secure.",
        icon: Shield,
      },
      {
        title: "AI-Powered Assistance",
        description:
          "Smart suggestions help you craft professional messages, break the ice naturally, and maintain appropriate tone throughout conversations.",
        icon: Brain,
      },
      {
        title: "Document Security",
        description:
          "Share files, portfolios, and presentations safely with automatic virus scanning, encryption, and access controls.",
        icon: Lock,
      },
      {
        title: "Message Scheduling",
        description:
          "Compose messages when convenient and schedule them to send at optimal times for your recipients across different time zones.",
        icon: Calendar,
      },
      {
        title: "Conversation Threading",
        description:
          "Keep discussions organized with intelligent threading that groups related messages and makes it easy to track multiple conversations.",
        icon: MessageCircle,
      },
      {
        title: "Reliability Guarantee",
        description:
          "99.9% uptime ensures your professional communications are always available when you need them, with redundant systems preventing message loss.",
        icon: Award,
      },
    ],
    moreInfo: {
      title: "Building Trust Through Security",
      subtitle:
        "How encrypted messaging protects your professional relationships",
      paragraphs: [
        {
          text: "Professional networking requires trust, and trust begins with security. When you share sensitive information, discuss career opportunities, or exchange confidential business details, you need absolute certainty that your conversations remain private. Our secure messaging platform provides this certainty through military-grade encryption and robust security protocols.",
          emphasis: true,
        },
        {
          text: "End-to-end encryption means that messages are encrypted on your device before transmission and can only be decrypted by your intended recipient. This ensures that even if network traffic were intercepted, the content would remain completely unreadable. This level of security is essential for professional communications where confidentiality is paramount.",
        },
        {
          text: "Beyond basic security, our platform integrates intelligent features designed specifically for professional communication. AI-powered conversation starters help break the ice naturally, while smart suggestions offer context-appropriate responses that maintain professional tone. These features make networking conversations more natural and effective without compromising security.",
        },
        {
          text: "File sharing receives the same rigorous security treatment as text messages. Documents, presentations, and portfolios are encrypted during transmission and storage, with automatic virus scanning providing an additional layer of protection. Access controls let you manage who can view shared content and for how long, giving you complete control over your professional materials.",
          emphasis: true,
        },
        {
          text: "The platform reliability is backed by 99.9% uptime guarantee and redundant systems that prevent message loss. This reliability is crucial for professional communications where timing matters and missed messages could mean missed opportunities. You can trust that your messages will be delivered and available when needed.",
        },
        {
          text: "Advanced features like message scheduling, read receipts, and conversation threading enhance the professional communication experience. Schedule messages to send at optimal times across time zones, track when messages are read to time follow-ups appropriately, and keep multiple conversations organized with intelligent threading that groups related discussions.",
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
      <section className="relative z-10 py-40 overflow-hidden bg-slate-900">
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
                Key Benefits
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Why You'll Love
              <br />
              This Feature
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Experience the advantages that set this apart
            </p>
          </motion.div>

          <div className="space-y-2">
            {feature.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative"
              >
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
                  <div className="flex items-center gap-6 p-6 md:p-8">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <p className="text-lg md:text-xl text-slate-200 leading-relaxed flex-1">
                      {benefit}
                    </p>

                    <div className="hidden md:block flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
      </section>

      {/* How It Works - Accordion */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              How It Works
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A seamless experience designed for your success.
            </p>
          </motion.div>

          <FeatureAccordion items={feature.howItWorksSteps} />
        </div>
      </section>

      {/* Feature Details Points */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Key Features
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the powerful capabilities that set this feature apart.
            </p>
          </motion.div>

          <FeatureDetailsPoints points={feature.detailPoints} />
        </div>
      </section>

      {/* More Info Section */}
      <MoreInfoSection
        title={feature.moreInfo.title}
        subtitle={feature.moreInfo.subtitle}
        paragraphs={feature.moreInfo.paragraphs}
      />

      {/* CTA Section */}
    </div>
  );
}
