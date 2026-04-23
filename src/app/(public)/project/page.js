import HeroSection from "../../components/single-project/HeroSection";
import projectData from "@/app/(public)/data/ProjectData.json";
import UnitMixSection from "@/app/components/single-project/UnitMixSection";
import VerdictSection from "@/app/components/single-project/VerdictSection";
import ProjectAccordionSections from "./ProjectAccordionSections";

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
      <HeroSection data={data} />
      <VerdictSection data={data.verdict_section} />
      <UnitMixSection data={data.unit_mix_section} />
      <ProjectAccordionSections data={data} />
    </>
  );
}
