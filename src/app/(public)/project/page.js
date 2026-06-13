import HeroSection from "../../components/single-project/HeroSection";
import UnitMixSection from "@/app/components/single-project/UnitMixSection";
import VerdictSection from "@/app/components/single-project/VerdictSection";
import ProjectAccordionSections from "./ProjectAccordionSections";

// Import JSON data
import heroData from "@/app/(public)/data/Project/hero.json";
import verdictData from "@/app/(public)/data/Project/verdict.json";
import unitMixData from "@/app/(public)/data/Project/unit_mix.json";
import projectMetaData from "@/app/(public)/data/Project/project_meta.json";

export const metadata = {
  title: projectMetaData.seo.meta_title,
  description: projectMetaData.seo.meta_description,
  alternates: {
    canonical: projectMetaData.seo.canonical,
  },
};

export default function Project() {
  return (
    <>
      {/* HeroSection expects data.hero_section - hero.json has hero_section wrapper */}
      <HeroSection data={heroData} />

      {/* VerdictSection expects data at root level - verdict.json now has data at root level */}
      <VerdictSection data={verdictData} />

      {/* UnitMixSection expects data at root level - unit_mix.json has data at root level */}
      <UnitMixSection data={unitMixData} />

      <ProjectAccordionSections />
    </>
  );
}