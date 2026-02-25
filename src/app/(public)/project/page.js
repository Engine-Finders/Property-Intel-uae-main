import Navbar from "../../components/Navbar";
import HeroSection from "../../components/home/HeroSection";
import Footer from "../../components/Footer";
import projectData from "@/app/(public)/data/ProjectData.json";
import UnitMixSection from "@/app/components/home/UnitMixSection";
import DeveloperSection from "@/app/components/home/DeveloperSection";
import TargetBuyerSection from "@/app/components/home/TargetBuyerSection";
import LocationSection from "@/app/components/home/LocationSection";
import FinancingSection from "@/app/components/home/FinancingSection";
import RisksSection from "@/app/components/home/RiskSection";
import ConstructionSection from "@/app/components/home/ConstructionSection";
import ComparisonSection from "@/app/components/home/ComparisonSection";
import ReviewsSection from "@/app/components/home/ReviewSection";

const data = projectData.project;

export default function Project() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <HeroSection data={data} />
        <UnitMixSection data={data.unit_mix_section} />
        <DeveloperSection data={data.developer_section} />
        <TargetBuyerSection data={data.target_buyer_section} />
        <LocationSection data={data.location_section} />
        <FinancingSection data={data.financing_section} />
        <RisksSection data={data.risks_section} />
         <ConstructionSection data={data.construction_section} />
        <ComparisonSection data={data.comparison_section} />
        <ReviewsSection data={data.reviews_section} />
      </div>
      <Footer />
    </main>
  );
};

