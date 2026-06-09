import EmiratesHillsHero from "./components/Hero";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
import Section8 from "./components/Section8";
import heroData from "@/app/(public)/data/complete-projects/heroSection.json";
import section1Data from "@/app/(public)/data/complete-projects/section1.json";
import section2Data from "@/app/(public)/data/complete-projects/section2.json";
import section3Data from "@/app/(public)/data/complete-projects/section3.json";
import section4Data from "@/app/(public)/data/complete-projects/section4.json";
import section5Data from "@/app/(public)/data/complete-projects/section5.json";
import section6Data from "@/app/(public)/data/complete-projects/section6.json";
import section7Data from "@/app/(public)/data/complete-projects/section7.json";
import section8Data from "@/app/(public)/data/complete-projects/section8.json";

export default function Home() {
  return (
    <>
      <EmiratesHillsHero data={heroData} />
      <Section1 data={section1Data} />
      <Section2 data={section2Data} />
      <Section3 data={section3Data} />
      <Section4 data={section4Data} />
      <Section5 data={section5Data} />
      <Section6 data={section6Data} />
      <Section7 data={section7Data} />
      <Section8 data={section8Data} />
    </>
  );
}
