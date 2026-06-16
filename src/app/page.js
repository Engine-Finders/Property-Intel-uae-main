import HomeHeroSection from "@/app/components/home/HomeHeroSection";
import HowWeHelpHome from "./components/home/HowWeHelpHome";

import MarketPulseSection from "@/app/components/home/MarketPulseSection";
import CuratedProjectsSection from "@/app/components/home/CuratedProjectHome";
import TrustIndexSection from "@/app/components/home/TrustIndexSection";
import GrowthMapSection from "@/app/components/home/GrowthMapHome";
import TrustAuthHome from "@/app/components/home/TrustAuthHome";
import IntelligenceSection from "@/app/components/home/IntelligenceHome";
import HomeFaqSection from "@/app/components/home/HomeFaq";
import TrustedBySection from "@/app/components/home/TrustedByAuthorityHome";
import DevelopersSectionHome from "@/app/components/home/DevelopersSectionHome";

// Import all separate JSON files from the home folder
import heroData from "@/app/(public)/data/home/hero.json";
import howWeHelpData from "@/app/(public)/data/home/how_we_help.json";
import marketPulseData from "@/app/(public)/data/home/market_pulse.json";
import curatedProjectsData from "@/app/(public)/data/home/curated_projects.json";
import trustIndexData from "@/app/(public)/data/home/trust_index.json";
import growthMapData from "@/app/(public)/data/home/growth_map.json";
import trustAuthorityData from "@/app/(public)/data/home/trust_authority.json";
import intelligenceData from "@/app/(public)/data/home/intelligence.json";
import trustedByData from "@/app/(public)/data/home/trusted_by.json";
import topDevelopersData from "@/app/(public)/data/home/top_developers.json";
import faqData from "@/app/(public)/data/home/faq.json";
import seoData from "@/app/(public)/data/home/seo.json";

export const metadata = {
  title: seoData.seo.meta_title,
  description: seoData.seo.meta_description,
  alternates: {
    canonical: seoData.seo.canonical,
  },
};

export default function Home() {
  return (
    <>
      <HomeHeroSection data={heroData} />
      <HowWeHelpHome data={howWeHelpData} />
      <CuratedProjectsSection data={curatedProjectsData} />
      <DevelopersSectionHome data={topDevelopersData} />
      <MarketPulseSection data={marketPulseData} />
      <TrustIndexSection data={trustIndexData} />
      <GrowthMapSection data={growthMapData} />
      <TrustAuthHome data={trustAuthorityData} />
      <IntelligenceSection data={intelligenceData} />
      <TrustedBySection data={trustedByData} />
      <HomeFaqSection data={faqData} />
    </>
  );
}