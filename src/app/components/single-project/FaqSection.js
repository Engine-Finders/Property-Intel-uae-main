"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import SectionExpertCta from "./SectionExpertCta";

const GOLD = "#B68A35";

const ChevronIcon = ({ open }) => (
  <svg
    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const splitTitle = (title = "") => {
  const parts = title.split("—");
  return parts.length > 1 ? { title: parts[0].trim(), subtitle: parts.slice(1).join("—").trim() } : { title, subtitle: "" };
};

const FaqItem = ({ faq, index, isOpen, onToggle, t }) => (
  <div
    className="overflow-hidden rounded-2xl lg:rounded-xl"
    style={{
      background: t.cardBg,
      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#E9E3D9"}`,
      boxShadow: t.isDark ? "0 14px 30px rgba(0,0,0,0.22)" : "0 12px 28px rgba(15,23,42,0.04)",
    }}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 lg:min-h-[86px] lg:px-8 lg:py-0"
    >
      <div className="flex items-center gap-4 lg:gap-8">
        <span className="font-serif text-xl leading-6 lg:min-w-[58px] lg:border-r lg:pr-6 lg:text-3xl" style={{ color: GOLD, borderColor: t.cardBorder }}>
          {String(index + 1).padStart(2, "0")}.
        </span>
        <span className="text-sm font-bold leading-snug lg:text-xl" style={{ color: t.text }}>{faq.question}</span>
      </div>
      <span style={{ color: GOLD }}><ChevronIcon open={isOpen} /></span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="space-y-3 border-t px-4 py-5 sm:px-5 lg:px-12 lg:py-7 lg:pl-[104px]" style={{ borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "#EFEAE1" }}>
        {faq.answer.map((p, i) => (
          <p key={i} className="text-sm leading-7 lg:text-base lg:leading-8" style={{ color: t.textSecondary }}>{p}</p>
        ))}
        {faq.list && (
          <ul className="mt-2 space-y-2">
            {faq.list.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-7" style={{ color: t.textSecondary }}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

const FaqSection = ({ data }) => {
  const { t } = useTheme();
  const [openIndex, setOpenIndex] = useState(0);
  const heading = splitTitle(data.title);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="px-2 py-8 sm:px-6 lg:px-8 lg:py-12" style={{ background: t.bgAlt }}>
      <div className="mx-auto max-w-3xl lg:max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mx-auto max-w-lg font-serif text-[32px] font-medium leading-tight sm:text-4xl lg:max-w-4xl lg:text-[3.25rem]" style={{ color: t.text }}>
            <span>Frequently Asked </span>
            <span style={{ color: GOLD }}>Questions</span>
          </h2>
          {heading.subtitle && (
            <p className="mx-auto mt-3 max-w-sm font-serif text-base italic lg:text-2xl" style={{ color: GOLD }}>
              {heading.subtitle}
            </p>
          )}
        </div>

        {data.note && (
          <div
            className="mb-6 flex gap-4 rounded-2xl px-4 py-4 sm:px-5 lg:mb-8 lg:items-center lg:px-8 lg:py-6"
            style={{
              background: t.cardBg,
              border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#E9E3D9"}`,
              boxShadow: t.isDark ? "0 14px 30px rgba(0,0,0,0.18)" : "0 12px 28px rgba(15,23,42,0.04)",
            }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-serif text-lg" style={{ color: GOLD, borderColor: GOLD }}>
              i
            </span>
            <p className="text-sm leading-7 lg:text-base" style={{ color: t.textSecondary }}>
              <strong style={{ color: GOLD }}>Note:</strong> {data.note}
            </p>
          </div>
        )}

        {/* FAQ Accordions */}
        <div className="mb-6 space-y-3 lg:space-y-5">
          {(data.items || []).map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} t={t} />
          ))}
        </div>

        <SectionExpertCta cta={data.section_cta || data.cta} t={t} />
      </div>
    </section>
  );
};

export default FaqSection;
