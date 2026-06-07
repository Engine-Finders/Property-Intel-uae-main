import EmiratesHillsHero from "./components/Hero";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
import Section8 from "./components/Section8";
import sectionsData from "@/app/(public)/data/complete-projects/sectionsData.json";

export default function Home() {
  return (
    <>
      <EmiratesHillsHero />
      <Section1 data={sectionsData.sections?.find(s => s.id === 'section1')} />
      <Section2 data={sectionsData.sections?.find(s => s.id === 'section2')} />
      <Section3 data={sectionsData.sections?.find(s => s.id === 'section3')} />
      <Section4 data={sectionsData.sections?.find(s => s.id === 'section4')} />
      <Section5 data={sectionsData.sections?.find(s => s.id === 'section5')} />
      <Section6 data={sectionsData.sections?.find(s => s.id === 'section6')} />
      <Section7 data={sectionsData.sections?.find(s => s.id === 'section7')} />
      <Section8 data={sectionsData.sections?.find(s => s.id === 'section8')} />
    </>
  );
}