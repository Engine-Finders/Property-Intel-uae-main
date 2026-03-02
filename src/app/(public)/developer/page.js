import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import developerData from "@/app/(public)/data/developerData.json";
import DeveloperHeroSection from "@/app/components/developer/DeveloperHeroSection";
import DeveloperProjectsSection from "@/app/components/developer/DeveloperProjectsSection";
import DeveloperProjectTable from "@/app/components/developer/DeveloperProjectTable";
import CompanyHistorySection from "@/app/components/developer/CompanyHistorySection";
import DeliveryTrackRecordSection from "@/app/components/developer/DeliveryTrackRecordSection";

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
      </div>
      <Footer />
    </main>
  );
}

