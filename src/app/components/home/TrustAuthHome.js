"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";


const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.06)";
const GOLD_BORDER = "rgba(182,138,53,0.18)";

/* ── Icon Components ── */
const DatabaseIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const HomeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SupportIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M4 15h16" />
    <circle cx="12" cy="8" r="2" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const iconMap = { database: DatabaseIcon, shield: ShieldIcon, home: HomeIcon, support: SupportIcon };

const SectionHeader = ({ heading, subheading, lastUpdated }) => (
  <div className="relative rounded-2xl overflow-hidden mb-10 lg:mb-14 h-80 lg:h-72">
    <Image
      src="/developer/finance-section.webp"
      alt=""
      fill
      className="object-cover"
      priority
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)",
      }}
    />

    {lastUpdated && (
      <span
        style={{
          background: "rgba(182,138,53,0.08)",
          border: `1px solid ${GOLD_BORDER}`,
          color: GOLD,
          fontSize: 11,
          fontWeight: 600,
          padding: "4px 14px",
          borderRadius: 20,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          display: "inline-block",
          width: "fit-content",
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
        }}
      >
        Last Updated: {lastUpdated}
      </span>
    )}

    <div className="relative z-10 max-w-3xl mx-auto text-center pt-8 lg:pt-10 px-6">
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight text-white">
        {heading}
      </h2>
      <p className="text-sm lg:text-base leading-relaxed text-white/80">
        {subheading}
      </p>
    </div>
  </div>
);

/* ── Main Section ── */
const TrustAuthoritySection = ({ data }) => {
  const { t } = useTheme();
  const [expandedStep, setExpandedStep] = useState(null);
  const toggleStep = (idx) => setExpandedStep(expandedStep === idx ? null : idx);

  return (
    <section style={{ background: t.bg }} className="py-6 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Header: Image background + text overlay (like FinancialHealthSection) ── */}
        <SectionHeader
          heading={data.h2}
          subheading={data.h3}
          lastUpdated={data.last_updated}
        />

        {/* ── Row 1: Four Pillars ── */}
        <div className="mb-10 lg:mb-14">
          <h3
            className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-2"
            style={{ color: t.text }}
          >
            The <span style={{ color: GOLD }}>Four Pillars</span> of Secure Investment
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6">
            {data.pillars.map((pillar, i) => {
              const IconComp = iconMap[pillar.icon] || DatabaseIcon;
              return (
                <div
                  key={i}
                  className="rounded-xl p-5 flex flex-col"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ background: GOLD_BG }}
                  >
                    <IconComp />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base mb-2" style={{ color: t.text }}>
                    {pillar.headline}
                  </h4>
                  <p className="text-xs sm:text-sm mb-4 flex-1" style={{ color: t.textMuted, lineHeight: 1.7 }}>
                    {pillar.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {pillar.trust_signals.map((sig, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1"
                        style={{ background: GOLD_BG, color: GOLD, border: `1px solid ${GOLD_BORDER}` }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill={GOLD} stroke="none">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        {sig}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs italic" style={{ color: t.textMuted, opacity: 0.6 }}>
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

          {/* Footer row: CTA + Download + Attribution */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6" style={{ borderTop: `1px solid ${GOLD_BORDER}` }}>
            <button
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: GOLD, color: "#fff" }}
            >
              {data.footer.primary_cta}
            </button>
            <button
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ color: t.text }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {data.footer.secondary_cta}
            </button>
            <p className="text-[11px] sm:text-xs sm:ml-auto text-center sm:text-right" style={{ color: t.textMuted, opacity: 0.8, lineHeight: 1.5 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1" style={{ verticalAlign: "-2px" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              All guidance verified by DLD &amp; RERA Guidelines • Updated Monthly
            </p>
          </div>
        </div>

        {/* ── Footer Disclaimer ── */}
        <div className="text-center">
          <p className="text-xs sm:text-sm max-w-2xl mx-auto" style={{ color: t.textMuted, opacity: 0.85, lineHeight: 1.6 }}>
            {data.footer.attribution}
          </p>
          <p className="text-xs sm:text-sm max-w-2xl mx-auto mt-2" style={{ color: t.textMuted, opacity: 0.75, lineHeight: 1.6 }}>
            {data.footer.disclaimer.replace("{{date}}", data.last_updated)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustAuthoritySection;
