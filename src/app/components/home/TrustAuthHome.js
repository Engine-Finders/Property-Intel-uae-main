"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import SectionImageHeader from "../home-page-common/SectionImageHeader";


const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.06)";
const GOLD_BORDER = "rgba(182,138,53,0.18)";

const iconMap = {
  database: "/home/Cross%20Referenced%20Official%20Sources.svg",
  shield: "/home/Secure%20Your%20ownership.svg",
  home: "/home/Navigate%20Freehold.svg",
  support: "/home/Dedicated%20Support%20From%20Search%20to%20Handover%20icon.svg",
};

const getTrustSignalIconSrc = (signal = "") => {
  const s = signal.toLowerCase();
  if (s.includes("dld data verified")) return "/home/DLD%20Data%20Verified%20icon.svg";
  if (s.includes("dxbinteract")) return "/home/Market%20Analysis.svg";
  if (s.includes("rera compliance guide")) return "/home/RERA%20Verified.svg";
  if (s.includes("escrow verification process")) return "/home/Escrow%20Verification%20Process.svg";
  if (s.includes("designated area maps")) return "/home/Designated%20Area%20Maps.svg";
  if (s.includes("visa eligibility calculator")) return "/home/Visa%20Eligibility%20Calculator%20icon.svg";
  if (s.includes("vetted partner network")) return "/home/Vetted%20Partner%20Network%20icon.svg";
  if (s.includes("post-handover support")) return "/home/Post-Handover%20Support%20icon.svg";
  return null;
};

/* ── Main Section ── */
const TrustAuthoritySection = ({ data }) => {
  const { t } = useTheme();
  const [expandedStep, setExpandedStep] = useState(null);
  const toggleStep = (idx) => setExpandedStep(expandedStep === idx ? null : idx);

  return (
    <section style={{ background: t.bg }} className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <SectionImageHeader
          title={data.h2}
          subtitle={data.h3}
          t={t}
          imageSrc="/developer/finance-section.webp"
          className="mb-10 lg:mb-14 rounded-[28px] border"
          contentClassName="max-w-3xl"
        />

        {/* ── Row 1: Four Pillars ── */}
        <div className="mb-10 lg:mb-14">
          <h3
            className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-2"
            style={{ color: t.text }}
          >
            {data.pillars_title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6">
            {data.pillars.map((pillar, i) => {
              const iconSrc = iconMap[pillar.icon] || "/home/Cross%20Referenced%20Official%20Sources.svg";
              return (
                <div
                  key={i}
                  className="rounded-2xl p-4 sm:p-5"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                  }}
                >
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div
                      className="h-11 w-11 sm:h-12 sm:w-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: GOLD_BG }}
                    >
                      <Image src={iconSrc} alt={pillar.headline} width={26} height={26} />
                    </div>
                    <h4 className="font-bold text-[19px] sm:text-[20px] leading-tight" style={{ color: t.text }}>
                      {pillar.headline}
                    </h4>
                  </div>

                  <p className="mt-3 text-[13px] sm:text-sm mb-4" style={{ color: t.textMuted, lineHeight: 1.75 }}>
                    {pillar.content}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {pillar.trust_signals.map((sig, j) => (
                      <span
                        key={j}
                        className="text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5"
                        style={{ background: GOLD_BG, color: GOLD, border: `1px solid ${GOLD_BORDER}` }}
                      >
                        {getTrustSignalIconSrc(sig) ? (
                          <Image src={getTrustSignalIconSrc(sig)} alt={sig} width={18} height={18} />
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill={GOLD} stroke="none">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        )}
                        {sig}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs italic" style={{ color: t.textMuted, opacity: 0.65 }}>
                    {pillar.keyword_tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Row 2: 4-Step Process ── */}
        <div
          className="mb-10 lg:mb-14 rounded-xl p-5 sm:p-8"
          style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}
        >
          <h3
            className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-6 sm:mb-8"
            style={{ color: t.text }}
          >
            {data.process_title} — <span style={{ color: GOLD }}>{data.process_subtitle}</span>
          </h3>

          {/* Desktop timeline */}
          <div className="hidden sm:block relative">
            <div
              className="absolute left-0 right-0 top-6 h-[1.5px]"
              style={{ background: "rgba(182,138,53,0.35)" }}
            />
            <div className="grid grid-cols-4 gap-4 relative">
              {data.steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold mb-3 z-10"
                    style={{ background: GOLD, color: "#fff" }}
                  >
                    {step.number}
                  </div>
                  <h4 className="font-bold text-sm mb-1.5 leading-snug" style={{ color: t.text }}>
                    {step.title}
                  </h4>
                  <p className="text-xs mb-2" style={{ color: t.textMuted, lineHeight: 1.5 }}>
                    {step.summary}
                  </p>
                  <button
                    onClick={() => toggleStep(i)}
                    className="text-xs font-semibold transition-colors"
                    style={{ color: GOLD }}
                  >
                    {expandedStep === i ? "Hide Details ▲" : "View Details ▼"}
                  </button>
                  {expandedStep === i && (
                    <div
                      className="mt-3 p-3 rounded-lg text-left text-xs w-full"
                      style={{
                        background: t.cardBg,
                        border: `1px solid ${GOLD_BORDER}`,
                        color: t.textMuted,
                        lineHeight: 1.7,
                      }}
                    >
                      <p className="mb-2"><strong style={{ color: t.text }}>Action:</strong> {step.action}</p>
                      <p className="mb-2"><strong style={{ color: t.text }}>Why It Matters:</strong> {step.why}</p>
                      <p style={{ color: GOLD, fontWeight: 600 }}>📄 {step.source}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="sm:hidden relative pl-8 space-y-6">
            <div
              className="absolute left-0 top-2 bottom-2 w-[2px]"
              style={{ background: "rgba(182,138,53,0.35)" }}
            />
            {data.steps.map((step, i) => (
              <div key={i} className="relative">
                <div
                  className="absolute -left-[20px] top-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-10"
                  style={{ background: GOLD, color: "#fff" }}
                >
                  {step.number}
                </div>
                {/* Small marker dot on line for each step */}
                <span
                  className="absolute -left-[35px] top-[14px] w-2 h-2 rounded-full"
                  style={{ background: "rgba(182,138,53,0.75)" }}
                />

                <div className="pl-[26px]">
                  <h4 className="font-bold text-sm mb-1 leading-snug" style={{ color: t.text }}>
                    {step.title}
                  </h4>
                  <p className="text-xs mb-2" style={{ color: t.textMuted, lineHeight: 1.5 }}>
                    {step.summary}
                  </p>
                  <button
                    onClick={() => toggleStep(i)}
                    className="text-xs font-semibold transition-colors"
                    style={{ color: GOLD }}
                  >
                    {expandedStep === i ? "Hide Details ▲" : "View Details ▼"}
                  </button>
                  {expandedStep === i && (
                    <div
                      className="mt-3 p-3 rounded-lg text-left text-xs"
                      style={{
                        background: t.cardBg,
                        border: `1px solid ${GOLD_BORDER}`,
                        color: t.textMuted,
                        lineHeight: 1.7,
                      }}
                    >
                      <p className="mb-2"><strong style={{ color: t.text }}>Action:</strong> {step.action}</p>
                      <p className="mb-2"><strong style={{ color: t.text }}>Why It Matters:</strong> {step.why}</p>
                      <p style={{ color: GOLD, fontWeight: 600 }}>📄 {step.source}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── CTA + Footer Disclaimer ── */}
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <p
              className="text-xs sm:text-sm rounded-xl px-4 py-3 text-left"
              style={{
                color: t.textSecondary,
                background: t.isDark ? "rgba(255,255,255,0.04)" : "#f7f7f5",
                border: `1px solid ${t.cardBorder}`,
              }}
            >
              {data.footer.attribution}
            </p>
            <button
              className="w-full lg:w-[280px] px-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-opacity hover:opacity-90"
              style={{ background: GOLD, color: "#fff" }}
            >
              {data.footer.primary_cta}
            </button>
            <button
              className="w-full lg:w-[320px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-opacity hover:opacity-90"
              style={{ color: t.text, border: `1px solid ${GOLD_BORDER}`, background: "transparent" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {data.footer.secondary_cta}
            </button>
          </div>

          <p className="text-xs sm:text-sm max-w-2xl mx-auto mt-4 text-center" style={{ color: t.textMuted, opacity: 0.75, lineHeight: 1.6 }}>
            {data.footer.disclaimer.replace("{{date}}", data.last_updated)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustAuthoritySection;
