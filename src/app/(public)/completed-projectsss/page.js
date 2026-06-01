import completedProjectsData from "@/app/(public)/data/completedProjectDate.json";
import CompletedHeroSection from "@/app/components/completed-projects/CompletedHerSection";
import CompletedReviewsSection from "@/app/components/completed-projects/CompletedReviewSection";
import TrackRecordSection from "@/app/components/completed-projects/TrackRecordSection";
import CompletedMarketValue from "@/app/components/completed-projects/CompletedMarketValue";
import CompletedLocationSec from "@/app/components/completed-projects/CompletedLocationSec";
import CompletedFinancialReality from "@/app/components/completed-projects/CompletedFinancialReality";
import ResaleInvestment from "@/app/components/completed-projects/ResaleInvestment";
import CompletedFaqSection from "@/app/components/completed-projects/CompletedFaqSection";


const data = completedProjectsData;

// export const metadata = {
//   title: developerData.seo.meta_title,
//   description: developerData.seo.meta_description,
//   alternates: {
//     canonical: developerData.seo.canonical,
//   },
// };

export default function Developer() {
  return (
    <>
      <CompletedHeroSection data={data.hero_section} />
      <CompletedMarketValue  data={data.market_value_section}/>
      <TrackRecordSection data={data.track_record_section}/>
      <CompletedReviewsSection data={data.reviews_section}/>
      <CompletedLocationSec data={data.location_section}/>
      <CompletedFinancialReality data={data.financial_section}/>
      <ResaleInvestment data={data.resale_investment_section} />
      <CompletedFaqSection data={data.faq_section} />
    </>
  );
}
