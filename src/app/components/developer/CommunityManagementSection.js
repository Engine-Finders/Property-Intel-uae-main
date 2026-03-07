"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

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

/* ─── Mollak Accordion ─── */
const MollakAccordion = ({ mgmt, t }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: mgmt.mollak_integration ? "rgba(16,185,129,0.04)" : t.cardBg,
        border: `1px solid ${mgmt.mollak_integration ? "rgba(16,185,129,0.15)" : t.cardBorder}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-4 flex items-center gap-3 text-left"
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.12)" }}>
          {/* Placeholder icon */}
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="#10b981" strokeWidth="1.5">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm font-semibold flex-1" style={{ color: "#10b981" }}>
          Mollak Integration: {mgmt.mollak_integration ? "Yes" : "No"}
        </p>
        <ChevronIcon open={open} color="#10b981" />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-sm leading-relaxed mb-2" style={{ color: t.textSecondary }}>
            {mgmt.mollak_note}
          </p>
          <p className="text-[10px] italic" style={{ color: t.textMuted }}>
            {mgmt.mollak_source}
          </p>
        </div>
      )}
    </div>
  );
};

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

/* ─── Condition Badge ─── */
const ConditionBadge = ({ condition }) => {
  const colors = {
    Excellent: { bg: "rgba(16,185,129,0.12)", text: "#10b981" },
    Good: { bg: "rgba(182,138,53,0.12)", text: "#B68A35" },
    Fair: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
  };
  const c = colors[condition] || colors.Good;
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: c.bg, color: c.text }}>
      {condition}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════
   BLOCK 1 — Overview (Header + Management + Image)
   ═══════════════════════════════════════════════════════════ */
const OverviewBlock = ({ data, t }) => {
  const mgmt = data.management_structure;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* Left — Text */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#B68A35" }}>
          Post-Handover Analysis
        </p>
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight" style={{ color: t.text }}>
          {data.heading}
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: t.textSecondary }}>
          {data.subheading}
        </p>

        <h3 className="text-base font-semibold mb-4" style={{ color: "#B68A35" }}>Management Structure</h3>

        {/* ECM Card */}
        <div className="rounded-2xl p-5 mb-3" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(182,138,53,0.12)" }}>
              {/* Placeholder icon */}
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="#B68A35" strokeWidth="1.5">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m5-12h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: t.text }}>{mgmt.entity}</p>
              <p className="text-xs" style={{ color: t.textMuted }}>{mgmt.type}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-2" style={{ color: t.textSecondary }}>{mgmt.note}</p>
          <p className="text-[10px] italic" style={{ color: t.textMuted }}>{mgmt.source}</p>
        </div>

        {/* Mollak Accordion */}
        <MollakAccordion mgmt={mgmt} t={t} />
      </div>

      {/* Right — Image Placeholder */}
      <div className="rounded-2xl overflow-hidden flex items-center justify-center min-h-[320px] lg:min-h-[400px]"
        style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9", border: `1px solid ${t.cardBorder}` }}>
        <div className="text-center">
          {/* Placeholder icon */}
          <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto mb-3" fill="none" stroke={t.textMuted} strokeWidth="0.8">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <p className="text-sm font-medium" style={{ color: t.textMuted }}>IMAGE</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   BLOCK 2 — Service Charges + Asset Condition
   ═══════════════════════════════════════════════════════════ */
const ServiceChargeBlock = ({ serviceCharges, serviceChargeIntro, t }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = serviceCharges.map((sc) => sc.title);
  const active = serviceCharges[activeTab];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
      <div className="p-5 pb-3">
        <div className="flex items-center gap-2 mb-2">
          {/* Placeholder icon */}
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#B68A35" strokeWidth="1.5">
            <path d="M9 7h6m0 10v-3m-3 3v-6m-3 6v-1M3 3v18h18V3H3z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="text-base font-semibold" style={{ color: t.text }}>Service Charge History</h3>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color: t.textMuted }}>{serviceChargeIntro}</p>
      </div>
      <TabBar tabs={tabNames} activeTab={activeTab} onTabChange={setActiveTab} t={t} />
      <div
        className="p-5 max-h-[300px] overflow-y-auto space-y-3"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: `${t.cardBorder} transparent`,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {active.rows.map((row, i) => (
          <div key={i} className="rounded-xl p-4" style={{
            background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
            border: `1px solid ${t.isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
          }}>
            <p className="text-sm font-bold mb-2" style={{ color: t.text }}>{row.year}</p>
            <div className="flex items-center gap-6 text-xs">
              <div>
                <span style={{ color: t.textMuted }}>Charge: </span>
                <span className="font-medium" style={{ color: t.textSecondary }}>{row.charge}</span>
              </div>
              <div>
                <span style={{ color: t.textMuted }}>Change: </span>
                <span className="font-medium" style={{ color: row.change?.startsWith("+") ? "#10b981" : t.textSecondary }}>{row.change}</span>
              </div>
            </div>
            <p className="text-[10px] mt-2 italic" style={{ color: t.textMuted }}>{row.source}</p>
          </div>
        ))}
      </div>
      <div className="px-5 pb-4">
        <p className="text-xs italic" style={{ color: t.textMuted }}>Trend: {active.trend_summary}</p>
      </div>
    </div>
  );
};

const AssetConditionBlock = ({ asset, t }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = asset.communities.map((c) => c.community);
  const active = asset.communities[activeTab];
  const ratingNum = asset.overall_rating?.replace("/5", "");

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
      <div className="p-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          {/* Placeholder icon */}
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#B68A35" strokeWidth="1.5">
            <path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="text-base font-semibold" style={{ color: t.text }}>
            Asset Condition Rating <span className="text-xs font-normal" style={{ color: t.textMuted }}>(Established Communities)</span>
          </h3>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold" style={{ color: "#B68A35" }}>{ratingNum}</span>
          <span className="text-sm" style={{ color: t.textMuted }}>/ 5</span>
          <span className="text-xs ml-1" style={{ color: t.textMuted }}>{asset.rating_basis}</span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{asset.summary}</p>
      </div>
      <TabBar tabs={tabNames} activeTab={activeTab} onTabChange={setActiveTab} t={t} />
      <div className="p-5">
        <div className="rounded-xl p-4" style={{
          background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
          border: `1px solid ${t.isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
        }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold" style={{ color: t.text }}>{active.community}</p>
            <ConditionBadge condition={active.condition} />
          </div>
          <p className="text-xs mb-3" style={{ color: t.textMuted }}>Age: {active.age} years</p>
          <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{active.notes}</p>
        </div>
      </div>
      <div className="px-5 pb-4">
        <p className="text-[10px] italic" style={{ color: t.textMuted }}>Sources: {asset.sources}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   BLOCK 3 — Owner Satisfaction
   ═══════════════════════════════════════════════════════════ */
const OwnerSatisfactionBlock = ({ satisfaction, analystInsight, analystSource, t }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = ["Common Praises", "Common Complaints", "On-Ground Analyst Insight"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* Left — Summary */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>
          Owner Satisfaction with Community Management
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>
          {satisfaction.summary}
          {" "}The aggregated rating across {satisfaction.review_count} averages approximately{" "}
          <span className="font-semibold" style={{ color: "#f59e0b" }}>{satisfaction.average_rating || "N/A"}/5</span>, with the main concerns documented below.
        </p>

        {/* Platform ratings */}
        {satisfaction.platforms?.length > 0 && (
          <div className="mt-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>Platform Ratings</p>
            {satisfaction.platforms.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                <span style={{ color: t.text }}>{p.label}</span>
                <span className="font-semibold" style={{ color: parseFloat(p.rating) < 2 ? "#ef4444" : parseFloat(p.rating) < 3 ? "#f59e0b" : t.text }}>
                  {p.rating} <span className="text-xs font-normal" style={{ color: t.textMuted }}>/5</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right — Tabbed Content */}
      <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
        <TabBar tabs={tabNames} activeTab={activeTab} onTabChange={setActiveTab} t={t} />
        <div className="p-5">
          {activeTab === 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "#10b981" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 00-6 0v4m-2 0h10a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z" />
                </svg>
                Common Praises
              </h4>
              <ul className="space-y-3">
                {satisfaction.praises.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: t.textSecondary }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: "#10b981" }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "#ef4444" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Common Complaints
              </h4>
              <ul className="space-y-3">
                {satisfaction.complaints.map((item, i) => (
                  <li key={i} className="text-sm" style={{ color: t.textSecondary }}>
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: "#ef4444" }}>•</span>
                      <div>
                        <p className="font-medium" style={{ color: t.text }}>{item.title}</p>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: t.textMuted }}>{item.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "#B68A35" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                On-Ground Analyst Insight
              </h4>
              <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>{analystInsight}</p>
              <p className="text-[10px] italic" style={{ color: t.textMuted }}>{analystSource}</p>
            </div>
          )}
        </div>
        <div className="px-5 pb-4">
          <p className="text-[10px] italic" style={{ color: t.textMuted }}>Sources: {satisfaction.sources}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
const CommunityManagementSection = ({ data }) => {
  const { t } = useTheme();

  return (
    <section style={{ background: t.bgAlt }} className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Block 1 — Overview */}
        <OverviewBlock data={data} t={t} />

        {/* Block 2 — Service Charges + Asset Condition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <ServiceChargeBlock
            serviceCharges={data.service_charges}
            serviceChargeIntro={data.service_charge_intro}
            t={t}
          />
          <AssetConditionBlock asset={data.asset_condition} t={t} />
        </div>

        {/* Block 3 — Owner Satisfaction */}
        <OwnerSatisfactionBlock
          satisfaction={data.owner_satisfaction}
          analystInsight={data.analyst_insight}
          analystSource={data.analyst_source}
          t={t}
        />

        {/* Disclaimer */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: t.textMuted }}>{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default CommunityManagementSection;
