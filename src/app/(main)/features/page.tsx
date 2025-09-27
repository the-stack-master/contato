// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Users,
//   MessageCircle,
//   Calendar,
//   Star,
//   MapPin,
//   Zap,
//   Shield,
//   TrendingUp,
//   Brain,
//   Globe,
//   Clock,
//   Award,
//   ArrowRight,
//   CheckCircle,
// } from "lucide-react";
// import { cn } from "@/utils/classNames";

// interface Feature {
//   icon: React.ComponentType<any>;
//   title: string;
//   description: string;
//   details: string[];
//   color: string;
//   gradient: string;
// }

// const features: Feature[] = [
//   {
//     icon: Brain,
//     title: "AI-Powered Matching",
//     description:
//       "Our advanced algorithm connects you with the most relevant professionals based on your goals, industry, and interests.",
//     details: [
//       "Machine learning recommendations",
//       "Industry-specific matching",
//       "Goal-oriented connections",
//       "Compatibility scoring",
//     ],
//     color: "from-[#f15A24] to-orange-500",
//     gradient: "from-[#f15A24]/10 to-orange-100/50",
//   },
//   {
//     icon: MessageCircle,
//     title: "Smart Conversations",
//     description:
//       "Break the ice with AI-suggested conversation starters and maintain meaningful professional relationships.",
//     details: [
//       "Conversation starters",
//       "Follow-up reminders",
//       "Message templates",
//       "Communication insights",
//     ],
//     color: "from-blue-500 to-blue-600",
//     gradient: "from-blue-50 to-blue-100/50",
//   },
//   {
//     icon: Calendar,
//     title: "Seamless Scheduling",
//     description:
//       "Book meetings, coffee chats, and networking events with integrated calendar management and availability sync.",
//     details: [
//       "Calendar integration",
//       "Availability matching",
//       "Meeting reminders",
//       "Location suggestions",
//     ],
//     color: "from-green-500 to-emerald-600",
//     gradient: "from-green-50 to-emerald-100/50",
//   },
//   {
//     icon: MapPin,
//     title: "Location-Based Networking",
//     description:
//       "Discover professionals in your area and find local networking events, conferences, and meetups.",
//     details: [
//       "Nearby professionals",
//       "Local events discovery",
//       "Venue recommendations",
//       "Travel networking",
//     ],
//     color: "from-purple-500 to-purple-600",
//     gradient: "from-purple-50 to-purple-100/50",
//   },
//   {
//     icon: TrendingUp,
//     title: "Network Analytics",
//     description:
//       "Track your networking progress with detailed insights and recommendations for expanding your professional circle.",
//     details: [
//       "Connection analytics",
//       "Growth tracking",
//       "Engagement metrics",
//       "ROI insights",
//     ],
//     color: "from-[#f15A24] to-red-500",
//     gradient: "from-[#f15A24]/10 to-red-100/50",
//   },
//   {
//     icon: Shield,
//     title: "Privacy & Security",
//     description:
//       "Your professional information is protected with enterprise-grade security and granular privacy controls.",
//     details: [
//       "End-to-end encryption",
//       "Privacy controls",
//       "Verified profiles",
//       "Secure messaging",
//     ],
//     color: "from-gray-600 to-gray-700",
//     gradient: "from-gray-50 to-gray-100/50",
//   },
// ];

// const stats = [
//   { number: "50K+", label: "Active Professionals", icon: Users },
//   { number: "1M+", label: "Connections Made", icon: Zap },
//   { number: "95%", label: "Success Rate", icon: TrendingUp },
//   { number: "4.9★", label: "App Store Rating", icon: Star },
// ];

// const Features = () => {
//   const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const featuresRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = parseInt(
//               entry.target.getAttribute("data-index") || "0"
//             );
//             setVisibleFeatures((prev) => [...new Set([...prev, index])]);
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     const featureElements = document.querySelectorAll("[data-index]");
//     featureElements.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative min-h-screen bg-white overflow-hidden py-20">
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#f15A24]/10 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-200/10 to-[#f15A24]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <div className="relative z-10 container mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-20 animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
//           <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-100/50 px-4 py-2 rounded-full mb-6">
//             <Zap className="w-4 h-4 text-[#f15A24]" />
//             <span className="text-sm font-medium text-[#f15A24]">
//               Powerful Features
//             </span>
//           </div>
//           <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
//             Everything you need to
//             <br />
//             <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
//               network like a pro
//             </span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Discover the comprehensive suite of tools designed to transform how
//             you build and maintain professional relationships.
//           </p>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-300">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
//             >
//               <div className="w-12 h-12 bg-gradient-to-br from-[#f15A24] to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//                 <stat.icon className="w-6 h-6 text-white" />
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-2">
//                 {stat.number}
//               </div>
//               <div className="text-sm text-gray-600">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Features Grid */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-20" ref={featuresRef}>
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               data-index={index}
//               className={cn(
//                 "group relative p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]",
//                 visibleFeatures.includes(index)
//                   ? "animate-in fade-in-50 slide-in-from-bottom-5 duration-700"
//                   : "opacity-0 translate-y-10",
//                 activeFeature === index && "ring-2 ring-[#f15A24]/20 shadow-xl"
//               )}
//               style={{ animationDelay: `${index * 200}ms` }}
//             >
//               {/* Background Gradient */}
//               <div
//                 className={cn(
//                   "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
//                   `bg-gradient-to-br ${feature.gradient}`
//                 )}
//               ></div>

//               <div className="relative z-10">
//                 {/* Icon */}
//                 <div
//                   className={cn(
//                     "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
//                     `bg-gradient-to-br ${feature.color} shadow-lg`
//                   )}
//                 >
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>

//                 {/* Content */}
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#f15A24] transition-colors duration-300">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed">
//                   {feature.description}
//                 </p>

//                 {/* Feature Details */}
//                 <ul className="space-y-3 mb-6">
//                   {feature.details.map((detail, detailIndex) => (
//                     <li
//                       key={detailIndex}
//                       className="flex items-center space-x-3"
//                     >
//                       <CheckCircle className="w-5 h-5 text-[#f15A24] flex-shrink-0" />
//                       <span className="text-gray-700 text-sm">{detail}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Learn More Button */}
//                 <Button
//                   variant="outline"
//                   className="group-hover:bg-[#f15A24] group-hover:text-white group-hover:border-[#f15A24] transition-all duration-300"
//                 >
//                   Learn More
//                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//                 </Button>
//               </div>

//               {/* Hover Effect Overlay */}
//               <div className="absolute top-4 right-4 w-2 h-2 bg-[#f15A24] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA Section */}
//         <div className="text-center bg-gradient-to-r from-[#f15A24] to-orange-500 rounded-3xl p-12 text-white animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-700">
//           <div className="max-w-3xl mx-auto">
//             <h3 className="text-4xl font-bold mb-6">
//               Ready to transform your networking?
//             </h3>
//             <p className="text-xl mb-8 text-white/90">
//               Join thousands of professionals who are already building
//               meaningful connections with Connecto.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button
//                 size="lg"
//                 className="bg-white text-[#f15A24] hover:bg-gray-100 font-semibold px-8 py-4 h-auto transition-all duration-200 hover:scale-105"
//               >
//                 Download Now
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white hover:text-[#f15A24] font-semibold px-8 py-4 h-auto transition-all duration-200 hover:scale-105"
//               >
//                 Watch Demo
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;

"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Brain,
  MessageSquare,
  Calendar,
  MapPin,
  ChartBar as BarChart3,
  Shield,
  Sparkles,
  ArrowRight,
  Play,
  ChevronDown,
  Zap,
  Users,
  Globe,
  Smartphone,
  Download,
  Star,
  Rocket,
  Target,
  TrendingUp,
  Award,
  CircleCheck as CheckCircle2,
  ArrowUpRight,
  Layers,
  Infinity,
} from "lucide-react";
import { cn } from "@/utils/classNames";

interface Feature {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  color: string;
  bgGradient: string;
  iconBg: string;
  demo?: string;
}

const features: Feature[] = [
  {
    id: "ai-matching",
    icon: Brain,
    title: "AI-Powered Matching",
    subtitle: "Connect with precision",
    description:
      "Our revolutionary AI analyzes 50+ data points to connect you with professionals who align perfectly with your goals, interests, and career trajectory.",
    benefits: [
      "99.2% match accuracy",
      "Real-time learning",
      "Industry expertise mapping",
      "Goal-oriented connections",
    ],
    color: "#f15A24",
    bgGradient: "from-[#f15A24]/10 via-orange-50/50 to-red-50/30",
    iconBg: "from-[#f15A24] to-orange-600",
    demo: "Watch AI in action",
  },
  {
    id: "conversations",
    icon: MessageSquare,
    title: "Smart Conversations",
    subtitle: "Never run out of things to say",
    description:
      "AI-crafted conversation starters, follow-up suggestions, and relationship insights that turn awkward networking into natural connections.",
    benefits: [
      "Personalized ice breakers",
      "Context-aware suggestions",
      "Conversation analytics",
      "Relationship scoring",
    ],
    color: "#3B82F6",
    bgGradient: "from-blue-50/60 via-indigo-50/40 to-purple-50/30",
    iconBg: "from-blue-500 to-indigo-600",
    demo: "See conversation magic",
  },
  {
    id: "scheduling",
    icon: Calendar,
    title: "Intelligent Scheduling",
    subtitle: "Meetings that actually happen",
    description:
      "Smart calendar integration that finds optimal meeting times, suggests perfect venues, and handles all the coordination automatically.",
    benefits: [
      "Smart time optimization",
      "Venue recommendations",
      "Auto-coordination",
      "Follow-up automation",
    ],
    color: "#10B981",
    bgGradient: "from-emerald-50/60 via-green-50/40 to-teal-50/30",
    iconBg: "from-emerald-500 to-green-600",
    demo: "Schedule effortlessly",
  },
  {
    id: "location",
    icon: MapPin,
    title: "Location Intelligence",
    subtitle: "Network everywhere you go",
    description:
      "Discover high-value professionals nearby, exclusive local events, and hidden networking opportunities in any city worldwide.",
    benefits: [
      "Global professional discovery",
      "Exclusive event access",
      "Travel networking",
      "Local insights",
    ],
    color: "#8B5CF6",
    bgGradient: "from-purple-50/60 via-violet-50/40 to-fuchsia-50/30",
    iconBg: "from-purple-500 to-violet-600",
    demo: "Explore locations",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Network Analytics",
    subtitle: "Data that drives growth",
    description:
      "Advanced analytics reveal your networking ROI, connection quality, and growth opportunities with actionable insights.",
    benefits: [
      "ROI tracking",
      "Quality scoring",
      "Growth predictions",
      "Strategic insights",
    ],
    color: "#F59E0B",
    bgGradient: "from-amber-50/60 via-yellow-50/40 to-orange-50/30",
    iconBg: "from-amber-500 to-orange-500",
    demo: "View analytics",
  },
  {
    id: "security",
    icon: Shield,
    title: "Enterprise Security",
    subtitle: "Your privacy, guaranteed",
    description:
      "Military-grade encryption, verified profiles, and granular privacy controls ensure your professional data stays secure.",
    benefits: [
      "End-to-end encryption",
      "Identity verification",
      "Privacy controls",
      "Secure infrastructure",
    ],
    color: "#6B7280",
    bgGradient: "from-slate-50/60 via-gray-50/40 to-zinc-50/30",
    iconBg: "from-slate-600 to-gray-700",
    demo: "Security details",
  },
];

const floatingElements = [
  { icon: Users, delay: 0, x: 10, y: 20 },
  { icon: Zap, delay: 1000, x: 85, y: 15 },
  { icon: Star, delay: 2000, x: 15, y: 70 },
  { icon: Target, delay: 1500, x: 90, y: 80 },
  { icon: Rocket, delay: 500, x: 50, y: 10 },
  { icon: Award, delay: 2500, x: 80, y: 50 },
];

const ModernFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const handleScroll = () => setScrollY(window.scrollY);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setVisibleSections((prev) => [...new Set([...prev, id])]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isVisible = (sectionId: string) => visibleSections.includes(sectionId);

  return (
    <div className="min-h-screen bg-white overflow-hidden" ref={containerRef}>
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Mouse-following gradient */}
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-br from-[#f15A24]/15 via-orange-300/10 to-red-300/5 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})`,
          }}
        />

        {/* Floating animated orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-green-400/10 to-teal-400/5 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-400/8 to-orange-400/4 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Floating icons */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}ms`,
              animationDuration: `${3000 + index * 500}ms`,
            }}
          >
            <element.icon className="w-8 h-8 text-[#f15A24]" />
          </div>
        ))}

        {/* Geometric shapes */}
        <div
          className="absolute top-32 left-32 w-20 h-20 bg-gradient-to-br from-[#f15A24]/20 to-orange-400/10 rounded-3xl rotate-12 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/10 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-br from-green-400/20 to-teal-400/10 rounded-lg rotate-45 animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div
          className={cn(
            "text-center max-w-6xl mx-auto transition-all duration-1000 transform",
            isVisible("hero")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
          data-section="hero"
        >
          {/* Animated badge */}
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#f15A24]/10 via-orange-100/50 to-red-100/30 px-8 py-4 rounded-full mb-8 animate-pulse border border-[#f15A24]/20">
            <div className="relative">
              <Sparkles
                className="w-6 h-6 text-[#f15A24] animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <div className="absolute inset-0 w-6 h-6 bg-[#f15A24]/20 rounded-full animate-ping" />
            </div>
            <span className="text-[#f15A24] font-bold text-lg">
              Revolutionary Features
            </span>
            <div className="w-2 h-2 bg-[#f15A24] rounded-full animate-pulse" />
          </div>

          {/* Main headline with animated text */}
          <h1 className="text-8xl lg:text-9xl font-black text-gray-900 mb-8 leading-tight">
            Features that
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                transform
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#f15A24]/20 to-orange-500/20 blur-xl animate-pulse" />
            </span>
            <br />
            networking
          </h1>

          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the next generation of professional networking with
            AI-powered features that make meaningful connections effortless and
            impactful.
          </p>

          {/* Animated stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { number: "500K+", label: "Professionals", icon: Users },
              { number: "10M+", label: "Connections", icon: Zap },
              { number: "99.2%", label: "Match Rate", icon: Target },
              { number: "4.9★", label: "Rating", icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 border border-gray-100",
                  isVisible("hero")
                    ? "animate-in fade-in-50 slide-in-from-bottom-5 duration-700"
                    : "opacity-0"
                )}
                style={{ animationDelay: `${index * 200 + 500}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#f15A24] to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons with animations */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              className="h-16 px-12 bg-gradient-to-r from-[#f15A24] to-orange-600 hover:from-[#f15A24]/90 hover:to-orange-600/90 text-white font-bold text-lg shadow-2xl hover:shadow-[#f15A24]/25 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Experience Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-12 border-2 border-gray-300 hover:border-[#f15A24] text-gray-700 hover:text-[#f15A24] font-bold text-lg transition-all duration-300 hover:scale-105 group bg-white/80 backdrop-blur-sm"
            >
              <Play className="w-6 h-6 mr-3 group-hover:text-[#f15A24] transition-colors duration-300" />
              Watch Demo
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-400 mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Interactive Features Showcase */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={cn(
              "text-center mb-20 transition-all duration-1000 transform",
              isVisible("features-header")
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            )}
            data-section="features-header"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-100/50 px-6 py-3 rounded-full mb-8">
              <Layers className="w-5 h-5 text-[#f15A24]" />
              <span className="text-[#f15A24] font-semibold">
                Six Game-Changing Features
              </span>
            </div>
            <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Built for the future of
              <br />
              <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent">
                professional networking
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Each feature is meticulously crafted to solve real networking
              challenges and amplify your professional growth exponentially.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-gray-100 bg-white hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] cursor-pointer",
                  isVisible(`feature-${index}`)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0",
                  activeFeature === index &&
                    "ring-2 ring-[#f15A24]/30 shadow-xl scale-[1.02]"
                )}
                style={{
                  animationDelay: `${index * 150}ms`,
                  transitionDelay: `${index * 100}ms`,
                }}
                data-section={`feature-${index}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* Animated Background */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    feature.bgGradient
                  )}
                />

                {/* Floating Elements */}
                <div
                  className="absolute top-4 right-4 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700 blur-2xl animate-pulse"
                  style={{ backgroundColor: feature.color }}
                />
                <div
                  className="absolute bottom-4 left-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 blur-xl animate-pulse delay-300"
                  style={{ backgroundColor: feature.color }}
                />

                <div className="relative z-10 p-10">
                  {/* Icon with enhanced animations */}
                  <div
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden",
                      `bg-gradient-to-br ${feature.iconBg}`
                    )}
                  >
                    <feature.icon className="w-10 h-10 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-gray-900 group-hover:text-[#f15A24] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p
                        className="text-lg font-medium"
                        style={{ color: feature.color }}
                      >
                        {feature.subtitle}
                      </p>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Benefits with staggered animations */}
                  <div className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className={cn(
                          "flex items-center space-x-3 transition-all duration-300 transform group-hover:translate-x-2"
                        )}
                        style={{ transitionDelay: `${benefitIndex * 50}ms` }}
                      >
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: feature.color }}
                        />
                        <span className="text-gray-700 font-medium">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA with demo link */}
                  <div className="flex items-center justify-between">
                    <Button
                      className="group-hover:bg-[#f15A24] group-hover:text-white transition-all duration-300 border-2 border-gray-200 group-hover:border-[#f15A24] relative overflow-hidden"
                      variant="outline"
                    >
                      <div className="absolute inset-0 bg-[#f15A24] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10">Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                    </Button>

                    {feature.demo && (
                      <Button
                        variant="ghost"
                        className="text-gray-500 hover:text-[#f15A24] transition-colors duration-300"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {feature.demo}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Active indicator */}
                <div
                  className={cn(
                    "absolute bottom-4 right-4 w-3 h-3 rounded-full transition-all duration-300",
                    activeFeature === index
                      ? "opacity-100 scale-125"
                      : "opacity-0 group-hover:opacity-100"
                  )}
                  style={{ backgroundColor: feature.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative py-32 px-6 bg-gradient-to-r from-[#f15A24] to-orange-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="max-w-6xl mx-auto text-center text-white relative z-10">
          <div
            className={cn(
              "transition-all duration-1000 transform",
              isVisible("stats")
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            )}
            data-section="stats"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                Trusted Worldwide
              </span>
            </div>

            <h2 className="text-6xl font-bold mb-6">
              Join the networking revolution
            </h2>
            <p className="text-xl mb-16 text-white/90 max-w-3xl mx-auto">
              Professionals worldwide are transforming their careers with
              Connecto's revolutionary approach to networking
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "500K+",
                  label: "Active Users",
                  icon: Users,
                  suffix: "professionals",
                },
                {
                  number: "10M+",
                  label: "Connections",
                  icon: Zap,
                  suffix: "made",
                },
                {
                  number: "180+",
                  label: "Countries",
                  icon: Globe,
                  suffix: "worldwide",
                },
                {
                  number: "4.9★",
                  label: "Rating",
                  icon: Smartphone,
                  suffix: "app stores",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-700 transform hover:scale-110 border border-white/20",
                    isVisible("stats")
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  )}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                  <div className="text-sm text-white/60 mt-1">
                    {stat.suffix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with enhanced design */}
      <section className="relative py-32 px-6 bg-white">
        <div
          className={cn(
            "max-w-5xl mx-auto text-center transition-all duration-1000 transform",
            isVisible("final-cta")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
          data-section="final-cta"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-100/50 px-6 py-3 rounded-full mb-8">
            <Rocket className="w-5 h-5 text-[#f15A24] animate-bounce" />
            <span className="text-[#f15A24] font-semibold">
              Ready to Transform?
            </span>
          </div>

          <h2 className="text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Your networking
            <br />
            <span className="bg-gradient-to-r from-[#f15A24] to-orange-500 bg-clip-text text-transparent relative">
              revolution starts now
              <div className="absolute -inset-2 bg-gradient-to-r from-[#f15A24]/10 to-orange-500/10 blur-xl animate-pulse" />
            </span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Download Connecto today and experience the future of professional
            networking. Your next career breakthrough is just one connection
            away.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="h-16 px-12 bg-gradient-to-r from-[#f15A24] to-orange-600 hover:from-[#f15A24]/90 hover:to-orange-600/90 text-white font-bold text-lg shadow-2xl hover:shadow-[#f15A24]/25 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Download className="w-6 h-6 mr-3 group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Get Started Free</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-12 border-2 border-gray-300 hover:border-[#f15A24] text-gray-700 hover:text-[#f15A24] font-bold text-lg transition-all duration-300 hover:scale-105 group"
            >
              <ArrowUpRight className="w-6 h-6 mr-3 group-hover:text-[#f15A24] transition-colors duration-300" />
              Schedule Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Infinity className="w-4 h-4 text-blue-500" />
              <span>Unlimited Connections</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#f15A24]" />
              <span>Award Winning</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernFeatures;
