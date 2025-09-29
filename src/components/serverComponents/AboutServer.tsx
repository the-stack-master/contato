/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/lib/sanity";
import AboutSectionClient from "@/app/(main)/about/AboutClient";
import {
  CompanyStorySection,
  ContactHRSection,
  ImageAsset,
  TeamIntroSection,
} from "@/app/(main)/about/types";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  image: ImageAsset;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  joinDate: string;
  location: string;
}

interface CompanyValue {
  icon: string; // keep as string here, map to component inside client
  title: string;
  description: string;
}

export interface AboutData {
  teamMembers: TeamMember[];
  teamIntroSection: TeamIntroSection;
  companyStory: CompanyStorySection;
  contactHR: ContactHRSection;
}

const aboutPageQuery = `*[_type == "aboutPage"][0]{
  _id,
  title,
  seoTitle,
  seoDescription,
  pageBuilder,
  isActive
}`;

export default async function AboutSectionServer() {
  const data = await client.fetch<any>(aboutPageQuery);

  if (!data || !data.pageBuilder) {
    return <div>About page data not found.</div>;
  }

  const teamMembersSection = data.pageBuilder.find(
    (s: any) => s._type === "teamMembersGrid"
  );

  const teamIntroSection = data.pageBuilder.find(
    (s: any) => s._type === "teamIntroSection"
  );
  const teamMembers: TeamMember[] = (teamMembersSection?.members || []).map(
    (member: any) => ({
      id: member._id || member.name,
      name: member.name,
      position: member.position,
      department: member.department || "",
      image: member.photo || "",
      bio: member.bio || "",
      linkedin: member.socialLinks?.find((l: any) => l.platform === "linkedin")
        ?.url,
      twitter: member.socialLinks?.find((l: any) => l.platform === "twitter")
        ?.url,
      email: member.socialLinks?.find((l: any) => l.platform === "email")?.url,
      joinDate: member.joinYear ? String(member.joinYear) : "",
      location: member.location || "",
    })
  );

  const companyStory = data.pageBuilder.find(
    (s: any) => s._type === "companyStorySection"
  );

  const contactHR = data.pageBuilder.find(
    (s: any) => s._type === "contactHRSection"
  );

  const aboutData: AboutData = {
    teamMembers,
    teamIntroSection,
    companyStory,
    contactHR,
  };

  return <AboutSectionClient aboutData={aboutData} />;
}
