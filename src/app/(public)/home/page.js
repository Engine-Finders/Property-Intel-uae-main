import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HomeHeroSection from "@/app/components/home/HomeHeroSection";
import homeData from "@/app/(public)/data/homeData.json";
import MarketPulseSection from "@/app/components/home/MarketPulseSection";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <HomeHeroSection data={homeData.hero_section} />
        <MarketPulseSection data={homeData.market_pulse_section} />
      </div>
      <Footer />
    </main>
  );
}

