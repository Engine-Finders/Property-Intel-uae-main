"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

/* ─── Chevron Icon ─── */
const ChevronIcon = ({ open, color }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 transition-transform duration-200"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    fill="none"
    stroke={color || "currentColor"}
    strokeWidth="2"
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Source Verified Accordion ─── */
const SourceAccordion = ({ source, sourceDate, url, t }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs font-semibold"
        style={{ color: "#B68A35" }}
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#B68A35" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Source Verified
        <ChevronIcon open={open} color="#B68A35" />
      </button>
      {open && (
        <div className="mt-2 rounded-xl p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>
            {source} {sourceDate && `(${sourceDate})`}
          </p>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium flex items-center gap-1 mt-1.5" style={{ color: "#B68A35" }}>
              View Source
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── Image Placeholder ─── */
const ImagePlaceholder = ({ yearBadge, t }) => (
<div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
  <Image
    src="/projects/villa-render-1.jpg"
    alt=""
    fill
    className="object-cover"
    loading="lazy"
  />

  {yearBadge && (
    <span
      className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold"
      style={{ background: "rgba(182,138,53,0.9)", color: "#fff" }}
    >
      {yearBadge}
    </span>
  )}
</div>
);

/* ─── Reusable Tab Bar ─── */
const TabBar = ({ tabs, activeTab, onTabChange, t }) => (
  <div
    className="flex gap-0 border-b overflow-x-auto overflow-y-hidden flex-nowrap"
    style={{
      borderColor: t.cardBorder,
      scrollbarWidth: "thin",
      WebkitOverflowScrolling: "touch",
    }}
  >
    {tabs.map((tab, i) => (
      <button
        key={i}
        onClick={() => onTabChange(i)}
        className="flex-shrink-0 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors"
        style={{
          color: activeTab === i ? "#B68A35" : t.textMuted,
          borderBottom: activeTab === i ? "2px solid #B68A35" : "2px solid transparent",
          background: "transparent",
        }}
      >
        {tab}
      </button>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   BLOCK 1 — Section Header
   ═══════════════════════════════════════════════════════════ */
const SectionHeader = ({ heading, subheading, t }) => (
  <div className="relative rounded-2xl overflow-hidden mb-12 h-80 lg:h-72">
    
<Image
  src="/developer/governament-section.webp"
  alt="Emaar Government Partnerships"
  fill
  className="absolute inset-0 w-full h-full object-cover"
/>
    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)" }} />
    {/* Decorative left icon */}
    <div className="absolute left-4 lg:left-8 top-8 opacity-30 hidden sm:block">
      <svg viewBox="0 0 24 24" className="w-16 h-16 lg:w-20 lg:h-20" fill="none" stroke="#B68A35" strokeWidth="0.6">
        <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    {/* Decorative right icon */}
    <div className="absolute right-4 lg:right-8 top-8 opacity-30 hidden sm:block">
      <svg viewBox="0 0 24 24" className="w-16 h-16 lg:w-20 lg:h-20" fill="none" stroke="#B68A35" strokeWidth="0.6">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="relative z-10 max-w-3xl mx-auto text-center pt-8 lg:pt-10 px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#B68A35" }}>Government Relations</p>
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight text-white">{heading}</h2>
      <p className="text-sm lg:text-base leading-relaxed text-white/80">{subheading}</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   BLOCK 2 — Joint Ventures
   ═══════════════════════════════════════════════════════════ */
const JointVentureCard = ({ item, t }) => (
  <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <ImagePlaceholder yearBadge={item.year} t={t} />
    <div className="p-5 lg:p-6">
      <p className="text-xs mb-1.5" style={{ color: t.textMuted }}>{item.tag}</p>
      <h4 className="text-base font-bold mb-3 leading-snug" style={{ color: t.text }}>{item.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{item.description}</p>
      <SourceAccordion source={item.source} sourceDate={item.source_date} url={item.url} t={t} />
    </div>
  </div>
);

const JointVenturesBlock = ({ items, t }) => (
  <div className="mb-12">
    <h3 className="text-lg lg:text-xl font-bold mb-5" style={{ color: t.text }}>Government Joint Ventures</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {items.map((item, i) => (
        <JointVentureCard key={i} item={item} t={t} />
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   BLOCK 3 — Government Contracts
   ═══════════════════════════════════════════════════════════ */
const ContractCard = ({ item, t }) => (
  <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <ImagePlaceholder yearBadge={item.year} t={t} />
    <div className="p-5 lg:p-6">
      <div className="flex flex-wrap items-center gap-2 mb-1.5">
        <p className="text-xs" style={{ color: t.textMuted }}>Client: {item.client}</p>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>{item.status}</span>
      </div>
      <h4 className="text-base font-bold mb-3 leading-snug" style={{ color: t.text }}>{item.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{item.description}</p>
      <SourceAccordion source={item.source} sourceDate={item.source_date} url={item.url} t={t} />
    </div>
  </div>
);

const GovernmentContractsBlock = ({ items, t }) => (
  <div className="mb-12">
    <h3 className="text-lg lg:text-xl font-bold mb-5" style={{ color: t.text }}>Government Contracts</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {items.map((item, i) => (
        <ContractCard key={i} item={item} t={t} />
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   BLOCK 4 — Strategic Frameworks + Awards
   ═══════════════════════════════════════════════════════════ */
const StrategicFrameworksBlock = ({ frameworks, awards, t }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = frameworks.map((f) => f.title);
  const active = frameworks[activeTab];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      {/* Left — Tabbed Frameworks */}
      <div>
        <h3 className="text-lg lg:text-xl font-bold mb-5" style={{ color: t.text }}>Alignment with National Strategic Frameworks</h3>
        <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <TabBar tabs={tabNames} activeTab={activeTab} onTabChange={setActiveTab} t={t} />
          <div className="p-5">
            <div className="rounded-xl p-4" style={{
              background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
              border: `1px solid ${t.isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
            }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#6366f1" }}>{active.role}</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>{active.description}</p>
              <SourceAccordion source={active.source} sourceDate={active.source_date} url={active.url} t={t} />
            </div>
          </div>
        </div>
      </div>

      {/* Right — Awards */}
      <div>
        <h3 className="text-lg lg:text-xl font-bold mb-5" style={{ color: t.text }}>Government Recognitions & Awards</h3>
        <div className="space-y-4">
          {awards.map((item, i) => (
            <div key={i} className="rounded-2xl p-5 flex items-start gap-4"
              style={{
                background: t.cardBg,
                border: `1px solid ${t.cardBorder}`,
              }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(182,138,53,0.12)" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#B68A35" strokeWidth="1.5">
                  <path d="M12 15l-3.5 2 .67-3.89L6 10.11l3.94-.34L12 6l2.06 3.77 3.94.34-3.17 3L15.5 17z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold mb-1" style={{ color: t.text }}>{item.title}</p>
                <p className="text-xs" style={{ color: t.textMuted }}>Issuing Body: {item.issuing_body}</p>
                <p className="text-[10px] italic mt-1" style={{ color: t.textMuted }}>{item.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   BLOCK 5 — Sources & Verification (Accordion)
   ═══════════════════════════════════════════════════════════ */
const GOLD = "#B68A35";

const SourcesVerificationAccordion = ({ sources, disclaimer, t }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-8">
      {/* CTA */}
      <div className="mb-4">
        <a
          href="#"
          className="inline-block rounded-xl px-6 py-3 font-semibold text-sm sm:text-base transition-opacity hover:opacity-95"
          style={{ background: GOLD, color: "#fff" }}
        >
          Verify Emaar's Government Ties
        </a>
        <p className="mt-2 text-xs sm:text-sm" style={{ color: t.textSecondary }}>
          Independent insights on ICD stake, government contracts, and alignment with Dubai 2040.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-5 py-4 flex items-center gap-3 text-left"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(182,138,53,0.12)" }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#B68A35" strokeWidth="1.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: t.text }}>Sources & Verification</p>
            <p className="text-xs" style={{ color: t.textMuted }}>{sources.length} verified sources</p>
          </div>
          <ChevronIcon open={open} color="#B68A35" />
        </button>
        {open && (
          <div className="px-5 pb-5 space-y-2">
            {sources.map((src, i) => (
              <div key={i} className="rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}` }}>
                <span className="text-xs font-semibold flex-shrink-0" style={{ color: "#B68A35" }}>{src.fact}</span>
                <p className="text-xs flex-1" style={{ color: t.textSecondary }}>{src.source} — {src.reference}</p>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium flex items-center gap-1 flex-shrink-0" style={{ color: "#B68A35" }}>
                  View
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Disclaimer */}
      <div className="rounded-xl p-4 mt-4" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
        <p className="text-[10px] leading-relaxed" style={{ color: t.textMuted }}>{disclaimer}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
const GovernmentPartnershipsSection = ({ data }) => {
  const { t } = useTheme();

  return (
    <section style={{ background: t.bg }} className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader heading={data.heading} subheading={data.subheading} t={t} />
        <JointVenturesBlock items={data.joint_ventures} t={t} />
        <GovernmentContractsBlock items={data.government_contracts} t={t} />
        <StrategicFrameworksBlock frameworks={data.strategic_frameworks} awards={data.awards} t={t} />
        <SourcesVerificationAccordion sources={data.verification_sources} disclaimer={data.disclaimer} t={t} />
      </div>
    </section>
  );
};

export default GovernmentPartnershipsSection;
