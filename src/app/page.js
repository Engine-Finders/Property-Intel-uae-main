import HomeHeroSection from "@/app/components/home/HomeHeroSection";
import homeData from "@/app/(public)/data/homeData.json";
import MarketPulseSection from "@/app/components/home/MarketPulseSection";
import CuratedProjectsSection from "@/app/components/home/CuratedProjectHome";
import TrustIndexSection from "@/app/components/home/TrustIndexSection";
import GrowthMapSection from "@/app/components/home/GrowthMapHome";
import TrustAuthHome from "@/app/components/home/TrustAuthHome";
import IntelligenceSection from "@/app/components/home/IntelligenceHome";
import HomeFaqSection from "@/app/components/home/HomeFaq";
import TrustedBySection from "@/app/components/home/TrustedByAuthorityHome";
import DevelopersSectionHome from "@/app/components/home/DevelopersSectionHome";

export default function Home() {
  return (
    <>
      <HomeHeroSection data={homeData.hero_section} />
      <DevelopersSectionHome data={homeData.top_developers_section} />
      <MarketPulseSection data={homeData.market_pulse_section} />
      <CuratedProjectsSection data={homeData.curated_section} />
      <TrustIndexSection data={homeData.trust_index_section} />
      <GrowthMapSection data={homeData.growth_map_section} />
      <TrustAuthHome data={homeData.trust_authority_section} />
      <IntelligenceSection data={homeData.intelligence_section} />
      <TrustedBySection data={homeData.trusted_by_section} />
      <HomeFaqSection data={homeData.faq_section} />
    </>
  );
}
