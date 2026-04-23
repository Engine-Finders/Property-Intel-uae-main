"use client";

import { useState } from "react";
import { useTheme } from "@/app/components/context/ThemeContext";
import DeveloperSection from "@/app/components/single-project/DeveloperSection";
import TargetBuyerSection from "@/app/components/single-project/TargetBuyerSection";
import LocationSection from "@/app/components/single-project/LocationSection";
import FinancingSection from "@/app/components/single-project/FinancingSection";
import RisksSection from "@/app/components/single-project/RiskSection";
import ConstructionSection from "@/app/components/single-project/ConstructionSection";
import ComparisonSection from "@/app/components/single-project/ComparisonSection";
import ReviewsSection from "@/app/components/single-project/ReviewSection";
import ExpertTipsSection from "@/app/components/single-project/ExpertTipsSection";
import FaqSection from "@/app/components/single-project/FaqSection";

const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const SectionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M7.5 8.5h9" />
    <path d="M7.5 12h6.5" />
    <path d="M7.5 15.5h5" />
    <circle cx="17.2" cy="16.8" r="2.2" />
    <path d="m18.8 18.4 1.7 1.7" />
  </svg>
);

const AccordionItem = ({ title, isOpen, onToggle, children, t }) => {
  const patternedGoldBackground = {
    backgroundColor: "#b98a16",
    backgroundImage: `
      linear-gradient(135deg, rgba(255,255,255,0.06) 25%, transparent 25%),
      linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%),
      linear-gradient(45deg, rgba(0,0,0,0.06) 25%, transparent 25%),
      linear-gradient(315deg, rgba(255,255,255,0.04) 25%, transparent 25%),
      linear-gradient(90deg, #b68412 0%, #c99822 35%, #b68412 100%)
    `,
    backgroundSize: "44px 44px, 44px 44px, 44px 44px, 44px 44px, 100% 100%",
    backgroundPosition: "0 0, 22px 0, 0 22px, 22px 22px, 0 0",
  };

  return (
    <div
      className="overflow-hidden md:rounded-2xl"
      style={{
        boxShadow: t.isDark ? "0 14px 30px rgba(0,0,0,0.28)" : "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left text-white sm:px-6 sm:py-5"
        style={patternedGoldBackground}
        aria-expanded={isOpen}
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
          style={{
            border: `1px solid ${t.isDark ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.35)"}`,
            background: t.isDark ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.1)",
          }}
        >
          <SectionIcon />
        </div>
        <span className="flex-1 text-lg font-medium leading-snug sm:text-[1.65rem]">
          {title}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

const ProjectAccordionSections = ({ data }) => {
  const { t } = useTheme();
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: "developer",
      title: "Developer Profile & Track Record",
      content: <DeveloperSection data={data.developer_section} />,
    },
    {
      id: "target-buyer",
      title: "Target Buyer & Investment Fit",
      content: <TargetBuyerSection data={data.target_buyer_section} />,
    },
    {
      id: "location",
      title: "Location & Neighbourhood Analysis",
      content: <LocationSection data={data.location_section} />,
    },
    {
      id: "financing",
      title: "Financing & Payment Plan Analysis",
      content: <FinancingSection data={data.financing_section} />,
    },
    {
      id: "risks",
      title: "Risks & Red Flags",
      content: <RisksSection data={data.risks_section} />,
    },
    {
      id: "construction",
      title: "Construction Progress & Timeline",
      content: <ConstructionSection data={data.construction_section} />,
    },
    {
      id: "comparison",
      title: "Market Comparison & Alternatives",
      content: <ComparisonSection data={data.comparison_section} />,
    },
    {
      id: "reviews",
      title: "Reviews & Resident Feedback",
      content: <ReviewsSection data={data.reviews_section} />,
    },
    {
      id: "expert-tips",
      title: "Expert Tips & Buyer Checklist",
      content: <ExpertTipsSection data={data.expert_tips_section} />,
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      content: <FaqSection data={data.faq_section} />,
    },
  ];

  return (
    <div
      className="space-y-4 py-6 sm:space-y-5 lg:py-8"
      style={{ background: t.bg }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:px-6 lg:gap-5 lg:px-8">
        {sections.map((section) => {
          const isOpen = openSection === section.id;

          return (
            <AccordionItem
              key={section.id}
              title={section.title}
              isOpen={isOpen}
              t={t}
              onToggle={() =>
                setOpenSection((current) =>
                  current === section.id ? null : section.id
                )
              }
            >
              {section.content}
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectAccordionSections;
