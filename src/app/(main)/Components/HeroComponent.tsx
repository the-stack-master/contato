import { client } from "@/lib/sanity";
import HeroClient from "./NewHero";

interface HeroLogo {
  asset: { _id: string; url: string };
}

interface HeroHeadline {
  text: string;
  style?: string;
}

interface HeroStatistic {
  value: string;
  label: string;
  color?: string;
}

interface HeroButtonIcon {
  asset: { _id: string; url: string };
}

interface HeroButton {
  platform: string;
  buttonText: string;
  url: string;
  buttonStyle?: string;
  icon?: HeroButtonIcon;
}

interface HeroBackgroundStyle {
  backgroundColor?: string;
  backgroundImage?: { asset: { _id: string; url: string } };
}

export interface HeroData {
  _id: string;
  title: string;
  companyName: string;
  logo?: HeroLogo;
  mainHeadline?: HeroHeadline[];
  description?: string;
  statistics?: HeroStatistic[];
  downloadButtons?: HeroButton[];
  backgroundStyle?: HeroBackgroundStyle;
  seo?: Record<string, string | number | undefined>;
}

const HeroServer = async () => {
  const heroData: HeroData | null = await client.fetch(`
    *[_type == "landingPageHero"][0]{
      _id,
      title,
      companyName,
      logo{ asset->{ _id, url } },
      mainHeadline[]{ text, style },
      description,
      statistics[]{ value, label, color },
      downloadButtons[]{ platform, buttonText, url, buttonStyle, icon{ asset->{ _id, url } } },
      backgroundStyle{ backgroundColor, backgroundImage{ asset->{ _id, url } } },
      seo
    }
  `);

  return <HeroClient heroData={heroData} />;
};

export default HeroServer;
