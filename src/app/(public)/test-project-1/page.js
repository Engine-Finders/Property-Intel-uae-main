import projectData from "@/app/(public)/testing/project1.json";
import HeroSection from "../../components/single-project/HeroSection";
import UnitMixSection from "@/app/components/single-project/UnitMixSection";
import DeveloperSection from "@/app/components/single-project/DeveloperSection";
import TargetBuyerSection from "@/app/components/single-project/TargetBuyerSection";
import LocationSection from "@/app/components/single-project/LocationSection";
import FinancingSection from "@/app/components/single-project/FinancingSection";
import RisksSection from "@/app/components/single-project/RiskSection";
import ConstructionSection from "@/app/components/single-project/ConstructionSection";
import ComparisonSection from "@/app/components/single-project/ComparisonSection";
import ReviewsSection from "@/app/components/single-project/ReviewSection";
import FaqSection from "@/app/components/single-project/FaqSection";
import ExpertTipsSection from "@/app/components/single-project/ExpertTipsSection";
import VerdictSection from "@/app/components/single-project/VerdictSection";

const data = projectData;

export const metadata = {
  title: projectData.seo.meta_title,
  description: projectData.seo.meta_description,
  alternates: {
    canonical: projectData.seo.canonical,
  },
};

export default function Project() {
  return (
    <>
      {/* <HeroSection data={data} />
      <VerdictSection data={data.verdict_section} />
      <UnitMixSection data={data.unit_mix_section} />
      <DeveloperSection data={data.developer_section} />
      <TargetBuyerSection data={data.target_buyer_section} />
      <LocationSection data={data.location_section} />
      <FinancingSection data={data.financing_section} />
      <RisksSection data={data.risks_section} />
      <ConstructionSection data={data.construction_section} />
      <ComparisonSection data={data.comparison_section} />
      <ReviewsSection data={data.reviews_section} />
      <ExpertTipsSection data={data.expert_tips_section} />
      <FaqSection data={data.faq_section} /> */}
    </>
  );
}
