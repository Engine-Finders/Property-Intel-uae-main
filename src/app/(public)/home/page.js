import HomeHeroSection from "@/app/components/home/HomeHeroSection";
import homeData from "@/app/(public)/data/homeData.json";
import MarketPulseSection from "@/app/components/home/MarketPulseSection";
import CuratedProjectsSection from "@/app/components/home/CuratedProjectHome";
import TrustIndexSection from "@/app/components/home/TrustIndexSection";
import GrowthMapSection from "@/app/components/home/GrowthMapHome";

export default function Home() {
  return (
    <>
      <HomeHeroSection data={homeData.hero_section} />
      <MarketPulseSection data={homeData.market_pulse_section} />
      <CuratedProjectsSection data={homeData.curated_section} />
      <TrustIndexSection data={homeData.trust_index_section} />
      <GrowthMapSection data={homeData.growth_map_section} />
    </>
  );
}
