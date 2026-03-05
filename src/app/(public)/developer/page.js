import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import developerData from "@/app/(public)/data/developerData.json";
import DeveloperHeroSection from "@/app/components/developer/DeveloperHeroSection";
import DeveloperProjectsSection from "@/app/components/developer/DeveloperProjectsSection";
import DeveloperProjectTable from "@/app/components/developer/DeveloperProjectTable";
import CompanyHistorySection from "@/app/components/developer/CompanyHistorySection";
import DeliveryTrackRecordSection from "@/app/components/developer/DeliveryTrackRecordSection";
import CommunityManagementSection from "@/app/components/developer/CommunityManagementSection";
import GovernmentPartnershipsSection from "@/app/components/developer/GovernmentPartnershipsSection";
import FinancialHealthSection from "@/app/components/developer/FinancialHealthSection";
import RiskAssessmentSection from "@/app/components/developer/RiskAssessmentSection";
import BalanceSheetSection from "@/app/components/developer/BalanceSheetSection";
import ResidentReviewsSection from "@/app/components/developer/ResidentReviewsSection";
import DeveloperFaqSection from "@/app/components/developer/DeveloperFaqSection";

const data = developerData.developer;

export default function Developer() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <DeveloperHeroSection data={data} />
        <DeveloperProjectsSection data={data} />
        <DeveloperProjectTable data={data.project_table} />
        <CompanyHistorySection data={data} />
        <DeliveryTrackRecordSection data={data.delivery_track_record_section} />
        <CommunityManagementSection data={data.community_management_section} />
        <GovernmentPartnershipsSection data={data.government_partnerships_section} />
        <FinancialHealthSection data={data.financial_health_section} />
        <RiskAssessmentSection data={data.risk_assessment_section} />
        <BalanceSheetSection data={data.balance_sheet_section} />
        <ResidentReviewsSection data={data.resident_reviews_section} />
        <DeveloperFaqSection data={data.developer_faq_section} />

      </div>
      <Footer />
    </main>
  );
}

