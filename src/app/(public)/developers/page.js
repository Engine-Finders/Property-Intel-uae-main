import Hero from "../home/components/Hero";
import Section2 from "../home/components/Section2";
import Section3 from "../home/components/Section3";
import Section4 from "../home/components/Section4";
import Section5 from "../home/components/Section5";
import Section6 from "../home/components/Section6";
import Section7 from "../home/components/Section7";
import Section8 from "../home/components/Section8";
import Section9 from "../home/components/Section9";
import Section10 from "../home/components/Section10";
import Section11 from "../home/components/Section11";
import Section12 from "../home/components/Section12";

// Import JSON data for all sections from developers-new folder
import heroData from "@/app/(public)/data/developers-new/hero.json";
import section2Data from "@/app/(public)/data/developers-new/section2.json";
import section3Data from "@/app/(public)/data/developers-new/section3.json";
import section4Data from "@/app/(public)/data/developers-new/section4.json";
import section5Data from "@/app/(public)/data/developers-new/section5.json";
import section6Data from "@/app/(public)/data/developers-new/section6.json";
import section7Data from "@/app/(public)/data/developers-new/section7.json";
import section8Data from "@/app/(public)/data/developers-new/section8.json";
import section9Data from "@/app/(public)/data/developers-new/section9.json";
import section10Data from "@/app/(public)/data/developers-new/section10.json";
import section11Data from "@/app/(public)/data/developers-new/section11.json";
import section12Data from "@/app/(public)/data/developers-new/section12.json";

export default function Home() {
  return (
    <>
      <Hero data={heroData} />
      <Section2 data={section2Data} />
      <Section3 data={section3Data} />
      <Section4 data={section4Data} />
      <Section5 data={section5Data} />
      <Section6 data={section6Data} />
      <Section7 data={section7Data} />
      <Section8 data={section8Data} />
      <Section9 data={section9Data} />
      <Section10 data={section10Data} />
      <Section11 data={section11Data} />
      <Section12 data={section12Data} />
    </>
  );
}