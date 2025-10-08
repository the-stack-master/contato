import { Metadata } from "next";
import { notFound } from "next/navigation";
import SupportCategoryHeader from "../SupportCategoryHeader";
import SupportArticlesList from "../SupportArticlesList";

// This would typically come from a database or CMS
const supportData = {
  categories: [
    {
      id: "getting-started",
      title: "Getting Started",
      description:
        "Learn the basics of NetworkPro and set up your professional profile",
      icon: "rocket",
      articles: [
        {
          id: 1,
          title: "Creating Your Professional Profile",
          slug: "creating-professional-profile",
          excerpt:
            "Step-by-step guide to building an impressive professional profile that attracts the right connections.",
        },
        {
          id: 2,
          title: "Setting Up Your Account",
          slug: "setting-up-account",
          excerpt:
            "Complete account setup process including verification and security settings.",
        },
        {
          id: 3,
          title: "Verifying Your Professional Credentials",
          slug: "verifying-credentials",
          excerpt:
            "How to verify your work experience, education, and professional certifications.",
        },
        {
          id: 4,
          title: "Understanding Privacy Settings",
          slug: "privacy-settings",
          excerpt:
            "Control who can see your profile and how your information is shared.",
        },
        {
          id: 5,
          title: "Connecting Your LinkedIn Account",
          slug: "linkedin-integration",
          excerpt:
            "Import your LinkedIn profile and connections to get started faster.",
        },
        {
          id: 37,
          title: "Adding Skills and Endorsements",
          slug: "skills-endorsements",
          excerpt:
            "Showcase your professional skills and get endorsements from connections.",
        },
        {
          id: 38,
          title: "Setting Career Goals",
          slug: "career-goals",
          excerpt: "Define your networking objectives and career aspirations.",
        },
        {
          id: 39,
          title: "Profile Optimization Tips",
          slug: "profile-optimization",
          excerpt:
            "Best practices for creating a standout professional profile.",
        },
        {
          id: 40,
          title: "Industry Selection Guide",
          slug: "industry-selection",
          excerpt: "Choose the right industry categories for better matching.",
        },
      ],
    },
    {
      id: "ai-matching",
      title: "AI-Powered Matching",
      description:
        "Discover how our AI connects you with the right professionals",
      icon: "brain",
      articles: [
        {
          id: 6,
          title: "How AI Matching Works",
          slug: "how-ai-matching-works",
          excerpt:
            "Understanding the technology behind our intelligent professional matching system.",
        },
        {
          id: 7,
          title: "Improving Your Match Quality",
          slug: "improving-match-quality",
          excerpt:
            "Tips and strategies to get better, more relevant professional matches.",
        },
        {
          id: 8,
          title: "Understanding Match Scores",
          slug: "understanding-match-scores",
          excerpt: "Learn what match scores mean and how they are calculated.",
        },
        {
          id: 9,
          title: "Setting Your Networking Preferences",
          slug: "networking-preferences",
          excerpt: "Customize your matching preferences for better results.",
        },
        {
          id: 10,
          title: "Managing Match Notifications",
          slug: "match-notifications",
          excerpt:
            "Control when and how you receive notifications about new matches.",
        },
        {
          id: 11,
          title: "Blocking Unwanted Matches",
          slug: "blocking-matches",
          excerpt:
            "How to block specific users or types of matches you don't want to see.",
        },
        {
          id: 41,
          title: "Geographic Matching Settings",
          slug: "geographic-matching",
          excerpt:
            "Set location preferences for local and remote networking opportunities.",
        },
        {
          id: 42,
          title: "Industry-Specific Matching",
          slug: "industry-matching",
          excerpt:
            "Get matched with professionals in your specific industry or related fields.",
        },
        {
          id: 43,
          title: "Experience Level Matching",
          slug: "experience-matching",
          excerpt:
            "Connect with professionals at similar or complementary career levels.",
        },
      ],
    },
    {
      id: "messaging",
      title: "Messaging & Communication",
      description: "Connect safely with secure messaging and video features",
      icon: "message",
      articles: [
        {
          id: 12,
          title: "Sending Your First Message",
          slug: "first-message",
          excerpt:
            "Best practices for crafting effective first messages that get responses.",
        },
        {
          id: 13,
          title: "Video Introduction Cards",
          slug: "video-introductions",
          excerpt:
            "Create compelling 30-second video introductions to stand out.",
        },
        {
          id: 14,
          title: "Message Encryption & Security",
          slug: "message-security",
          excerpt:
            "How we protect your conversations with end-to-end encryption.",
        },
        {
          id: 15,
          title: "Scheduling Virtual Coffee Chats",
          slug: "virtual-coffee-chats",
          excerpt:
            "Set up and join virtual networking sessions with other professionals.",
        },
        {
          id: 16,
          title: "Managing Message Requests",
          slug: "message-requests",
          excerpt: "Handle incoming message requests and connection attempts.",
        },
        {
          id: 17,
          title: "Reporting Inappropriate Messages",
          slug: "reporting-messages",
          excerpt: "How to report spam, harassment, or inappropriate content.",
        },
        {
          id: 18,
          title: "Message History & Archives",
          slug: "message-history",
          excerpt:
            "Access and manage your conversation history and important messages.",
        },
        {
          id: 44,
          title: "Group Messaging Features",
          slug: "group-messaging",
          excerpt:
            "Create and participate in professional group conversations.",
        },
        {
          id: 45,
          title: "File Sharing Guidelines",
          slug: "file-sharing",
          excerpt:
            "Share documents, presentations, and files securely with connections.",
        },
        {
          id: 46,
          title: "Message Templates",
          slug: "message-templates",
          excerpt: "Use and create templates for common networking messages.",
        },
      ],
    },
    {
      id: "events",
      title: "Events & Networking",
      description: "Find and attend professional events and meetups",
      icon: "calendar",
      articles: [
        {
          id: 19,
          title: "Discovering Networking Events",
          slug: "discovering-events",
          excerpt:
            "Find relevant professional events and networking opportunities near you.",
        },
        {
          id: 20,
          title: "RSVP and Event Management",
          slug: "rsvp-management",
          excerpt:
            "Manage your event attendance and track upcoming networking events.",
        },
        {
          id: 21,
          title: "Creating Your Own Events",
          slug: "creating-events",
          excerpt: "Host your own networking events and professional meetups.",
        },
        {
          id: 22,
          title: "Event Check-in Process",
          slug: "event-checkin",
          excerpt:
            "How to check in at events and connect with other attendees.",
        },
        {
          id: 23,
          title: "Following Up After Events",
          slug: "event-followup",
          excerpt:
            "Best practices for maintaining connections made at networking events.",
        },
        {
          id: 47,
          title: "Virtual Event Participation",
          slug: "virtual-events",
          excerpt:
            "Join and participate in online networking events and webinars.",
        },
        {
          id: 48,
          title: "Event Networking Tips",
          slug: "event-networking-tips",
          excerpt: "Maximize your networking success at professional events.",
        },
        {
          id: 49,
          title: "Industry Conference Guide",
          slug: "conference-guide",
          excerpt:
            "Make the most of industry conferences and large networking events.",
        },
      ],
    },
    {
      id: "premium",
      title: "Premium Features",
      description: "Get the most out of NetworkPro with premium capabilities",
      icon: "crown",
      articles: [
        {
          id: 24,
          title: "Upgrading to Premium",
          slug: "upgrading-premium",
          excerpt:
            "Learn about premium features and how to upgrade your account.",
        },
        {
          id: 25,
          title: "Advanced Analytics Dashboard",
          slug: "analytics-dashboard",
          excerpt:
            "Track your networking progress with detailed insights and metrics.",
        },
        {
          id: 26,
          title: "Priority Matching & Visibility",
          slug: "priority-matching",
          excerpt:
            "Get priority placement in search results and matching algorithms.",
        },
        {
          id: 27,
          title: "Custom Profile Themes",
          slug: "custom-themes",
          excerpt:
            "Personalize your profile with custom themes and branding options.",
        },
        {
          id: 28,
          title: "Export Your Network Data",
          slug: "export-data",
          excerpt:
            "Download and backup your professional network and connection data.",
        },
        {
          id: 29,
          title: "Premium Support Access",
          slug: "premium-support",
          excerpt:
            "Get priority customer support and dedicated account management.",
        },
        {
          id: 50,
          title: "Advanced Search Filters",
          slug: "advanced-search",
          excerpt:
            "Use powerful search filters to find exactly the right connections.",
        },
        {
          id: 51,
          title: "Unlimited Messaging",
          slug: "unlimited-messaging",
          excerpt:
            "Send unlimited messages to expand your professional network.",
        },
        {
          id: 52,
          title: "Profile Boost Features",
          slug: "profile-boost",
          excerpt:
            "Increase your profile visibility and connection opportunities.",
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Solve common issues and technical problems",
      icon: "wrench",
      articles: [
        {
          id: 30,
          title: "App Not Loading or Crashing",
          slug: "app-crashes",
          excerpt: "Solutions for app stability issues and loading problems.",
        },
        {
          id: 31,
          title: "Login and Password Issues",
          slug: "login-issues",
          excerpt: "Resolve login problems and reset your password securely.",
        },
        {
          id: 32,
          title: "Notification Problems",
          slug: "notification-problems",
          excerpt: "Fix issues with push notifications and email alerts.",
        },
        {
          id: 33,
          title: "Profile Photo Upload Issues",
          slug: "photo-upload",
          excerpt:
            "Troubleshoot problems with uploading or changing your profile photo.",
        },
        {
          id: 34,
          title: "Connection and Sync Problems",
          slug: "sync-problems",
          excerpt: "Resolve issues with data synchronization across devices.",
        },
        {
          id: 35,
          title: "Billing and Subscription Issues",
          slug: "billing-issues",
          excerpt:
            "Get help with payment problems and subscription management.",
        },
        {
          id: 36,
          title: "Account Deletion and Data",
          slug: "account-deletion",
          excerpt:
            "How to delete your account and understand data retention policies.",
        },
        {
          id: 53,
          title: "Performance Optimization",
          slug: "performance-optimization",
          excerpt: "Improve app performance and reduce battery usage.",
        },
        {
          id: 54,
          title: "Network Connectivity Issues",
          slug: "connectivity-issues",
          excerpt:
            "Solve problems with internet connection and offline functionality.",
        },
        {
          id: 55,
          title: "Contact Support Team",
          slug: "contact-support",
          excerpt: "How to reach our support team for additional help.",
        },
      ],
    },
  ],
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category = supportData.categories.find((cat) => cat.id === params.slug);

  if (!category) {
    return {
      title: "Category Not Found - NetworkPro Support",
    };
  }

  return {
    title: `${category.title} - NetworkPro Support`,
    description: category.description,
  };
}

const CategoryPage = ({ params }: PageProps) => {
  const category = supportData.categories.find((cat) => cat.id === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <SupportCategoryHeader category={category} />
      <SupportArticlesList
        articles={category.articles}
        categoryId={category.id}
      />
    </main>
  );
};

export async function generateStaticParams() {
  return supportData.categories.map((category) => ({
    category: category.id,
  }));
}

export default CategoryPage;
