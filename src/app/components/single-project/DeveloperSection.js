"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GREEN = "#10b981";
const AMBER = "#D9B05F";
const RED = "#f59e0b";

const ChevronIcon = ({ open, color = GOLD, size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const splitHeading = (heading = "") => {
  const parts = heading.split("—");
  return {
    primary: parts[0]?.trim() || heading,
    accent: parts[1]?.trim() || "",
  };
};

const TabGlyph = ({ id }) => {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (id === "track_record") {
    return (
      <svg {...common}>
        <path d="M3 17h18" />
        <path d="m6 14 3-3 3 2 5-6" />
      </svg>
    );
  }
  if (id === "quality") {
    return (
      <svg {...common}>
        <path d="M12 3 3 19h18L12 3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  if (id === "financials") {
    return (
      <svg {...common}>
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
};

const OverviewStatIcon = ({ index }) => {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = [
    <svg key="briefcase" {...common}><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" /><path d="M4 11h16" /></svg>,
    <svg key="globe" {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></svg>,
    <svg key="pie" {...common}><path d="M21 12a9 9 0 1 1-9-9" /><path d="M12 3v9h9" /></svg>,
    <svg key="coins" {...common}><path d="M12 6c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3Z" transform="translate(0 3)" /><path d="M4 9v6c0 1.7 3.6 3 8 3s8-1.3 8-3V9" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>,
  ];

  return icons[index] || icons[0];
};

const FinancialIcon = ({ index }) => {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = [
    <svg key="bank" {...common}><path d="M3 10 12 4l9 6" /><path d="M5 10v8" /><path d="M9 10v8" /><path d="M15 10v8" /><path d="M19 10v8" /><path d="M3 18h18" /></svg>,
    <svg key="scale" {...common}><path d="M12 3v18" /><path d="M6 7h12" /><path d="m8 7-3 5h6l-3-5Z" /><path d="m16 7-3 5h6l-3-5Z" /></svg>,
    <svg key="rocket" {...common}><path d="M5 19c2.5-1 4-2.5 5-5l5-5a4.2 4.2 0 0 0 1-4 4.2 4.2 0 0 0-4 1l-5 5c-2.5 1-4 2.5-5 5Z" /><path d="M15 9h.01" /></svg>,
  ];

  return icons[index] || icons[0];
};

const SectionHeader = ({ iconId, title, subtitle, t }) => (
  <div className="mb-6 flex items-start gap-3">
    <div
      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      style={{
        background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)",
        color: GOLD,
        border: `1px solid ${t.isDark ? "rgba(217,176,95,0.24)" : "rgba(182,138,53,0.16)"}`,
      }}
    >
      <TabGlyph id={iconId} />
    </div>
    <div>
      <h3 className="text-xl font-semibold" style={{ color: t.text }}>
        {title}
      </h3>
      {subtitle && (
        <p className="mt-1 text-sm" style={{ color: t.textMuted }}>
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const StyledAccordion = ({ title, icon, isOpen, onToggle, children, t }) => (
  <div
    className="overflow-hidden rounded-2xl"
    style={{
      background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
    }}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{
            background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)",
            color: GOLD,
            border: `1px solid ${t.isDark ? "rgba(217,176,95,0.22)" : "rgba(182,138,53,0.16)"}`,
          }}
        >
          {icon}
        </div>
        <span className="text-base font-semibold" style={{ color: t.text }}>
          {title}
        </span>
      </div>
      <ChevronIcon open={isOpen} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div
        className="px-4 pb-4 pt-0 sm:px-5"
        style={{ borderTop: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}` }}
      >
        <div className="pt-4">{children}</div>
      </div>
    </div>
  </div>
);

const DeveloperSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("track_record");
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "track_record", label: "Delivery", sublabel: "Track record" },
    { id: "quality", label: "Quality", sublabel: "Known issues" },
    { id: "financials", label: "Financials", sublabel: "Stability" },
    { id: "buyer_guide", label: "Warranty", sublabel: "Coverage" },
  ];

  const stats = data.stats || [];
  const deliveryTable = data.delivery_track_record || [];
  const qualityIssues = data.known_quality_issues || [];
  const positiveIndicators = data.positive_quality_indicators || [];
  const financials = data.financial_highlights || [];
  const strengths = data.strengths_applied || [];
  const weaknesses = data.weaknesses_to_monitor || [];
  const verificationSteps = data.verification_framework || [];
  const { primary, accent } = splitHeading(data.heading);

  return (
    <section style={{ background: t.bgAlt }} className="py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 space-y-6 lg:mb-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
              Developer Profile & Track Record
            </p>
            <h2 className="text-[2.1rem] font-semibold leading-[1.05] lg:text-5xl" style={{ color: t.text }}>
              {primary}
              {accent && (
                <span className="block italic" style={{ color: GOLD }}>
                  {accent}
                </span>
              )}
            </h2>
            <p className="mt-4 max-w-5xl text-[15px] leading-8 lg:text-base" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.company_background }} />
          </div>

          <div
            className="rounded-[28px] p-4 sm:p-6"
            style={{
              background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
              border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
              boxShadow: t.isDark ? "0 14px 32px rgba(0,0,0,0.2)" : "0 14px 32px rgba(15,23,42,0.04)",
            }}
          >
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 sm:p-5"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff",
                    border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}`,
                  }}
                >
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-full"
                    style={{
                      background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)",
                      color: GOLD,
                    }}
                  >
                    <OverviewStatIcon index={i} />
                  </div>
                  <p className="text-2xl font-semibold sm:text-3xl" style={{ color: t.text }}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-5" style={{ color: t.textSecondary }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {data.overview_highlight && (
              <div
                className="mt-4 rounded-2xl px-4 py-3"
                style={{
                  background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff",
                  border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}`,
                }}
              >
                <p className="text-sm font-semibold" style={{ color: GOLD }}>
                  {data.overview_highlight.title}
                </p>
                <p className="mt-1 text-sm leading-6" style={{ color: t.textMuted }}>
                  {data.overview_highlight.text}
                </p>
              </div>
            )}
          </div>

          <div
            className="rounded-[28px] p-5 sm:p-6"
            style={{
              background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
              border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)",
                  color: GOLD,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold" style={{ color: t.text }}>
                Institutional Context
              </h3>
            </div>
            <p
              className="border-l-2 pl-4 text-[15px] leading-8"
              style={{ color: t.textSecondary, borderColor: "rgba(182,138,53,0.45)" }}
              dangerouslySetInnerHTML={{ __html: data.institutional_context }}
            />
          </div>

          <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))", border: "1px solid rgba(16,185,129,0.2)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="1.5" />
                <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#10b981" }}>RERA Registered & Escrow Compliant</p>
              <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>All active projects maintain registered escrow accounts with no public record of fund misuse penalties.</p>
            </div>
          </div>
        </div>

        <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="min-w-[120px] rounded-2xl px-4 py-3 text-left transition-all"
                style={{
                  background: isActive ? (t.isDark ? "rgba(255,255,255,0.04)" : "#fffdf9") : t.cardBg,
                  color: isActive ? GOLD : t.textMuted,
                  border: `1px solid ${isActive ? "rgba(182,138,53,0.22)" : t.cardBorder}`,
                  boxShadow: isActive ? (t.isDark ? "0 12px 24px rgba(0,0,0,0.18)" : "0 10px 24px rgba(15,23,42,0.04)") : "none",
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <TabGlyph id={tab.id} />
                  <span className="text-sm font-semibold">{tab.label}</span>
                </div>
                <p className="text-[11px] leading-4" style={{ color: isActive ? t.text : t.textMuted }}>
                  {tab.sublabel}
                </p>
              </button>
            );
          })}
        </div>

        {activeTab === "track_record" && (
          <div className="space-y-8">
            <div
              className="rounded-[28px] p-5 sm:p-6"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
                border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
              }}
            >
              <SectionHeader iconId="track_record" title="Delivery Track Record" subtitle="Mandatory - DLD-verified completion dates" t={t} />

              <div className="lg:hidden space-y-3">
                {deliveryTable.map((row, i) => (
                  <div key={i} className="rounded-2xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
                    <p className="text-sm font-semibold mb-3" style={{ color: t.text }}>{row.project}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span style={{ color: t.textMuted }}>Original:</span><span className="ml-1" style={{ color: t.textSecondary }}>{row.original}</span></div>
                      <div><span style={{ color: t.textMuted }}>Actual:</span><span className="ml-1" style={{ color: t.textSecondary }}>{row.actual}</span></div>
                      <div><span style={{ color: t.textMuted }}>Delay:</span><span className="ml-1 font-semibold" style={{ color: row.delay === "On time" ? GREEN : RED }}>{row.delay}</span></div>
                    </div>
                    {row.notes && <p className="text-[11px] mt-3 italic" style={{ color: t.textMuted }}>{row.notes}</p>}
                  </div>
                ))}
              </div>

              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                      {["Project", "Original Handover", "Actual Handover", "Delay", "Notes"].map((h) => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryTable.map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${t.isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"}` }}>
                        <td className="py-3 px-3 font-medium" style={{ color: t.text }}>{row.project}</td>
                        <td className="py-3 px-3" style={{ color: t.textSecondary }}>{row.original}</td>
                        <td className="py-3 px-3" style={{ color: t.textSecondary }}>{row.actual}</td>
                        <td className="py-3 px-3 font-semibold" style={{ color: row.delay === "On time" ? GREEN : RED }}>{row.delay}</td>
                        <td className="py-3 px-3 text-xs italic" style={{ color: t.textMuted }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "rgba(182,138,53,0.06)", border: "1px solid rgba(182,138,53,0.15)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Analysis</p>
              <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.delivery_analysis }} />
            </div>
          </div>
        )}

        {activeTab === "quality" && (
          <div className="space-y-4">
            <SectionHeader iconId="quality" title="Known Quality Issues" subtitle="Based on aggregated resident reviews and forum discussions" t={t} />

            <StyledAccordion
              title="Known Quality Issues"
              icon={<TabGlyph id="quality" />}
              isOpen={!!openAccordions.qualityIssues}
              onToggle={() => toggleAccordion("qualityIssues")}
              t={t}
            >
              <div className="space-y-3">
                {qualityIssues.map((issue, i) => (
                  <div key={i} className="rounded-2xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-base">{issue.icon}</span>
                      <p className="text-sm font-semibold" style={{ color: t.text }}>{issue.title}</p>
                    </div>
                    <p className="text-sm leading-6" style={{ color: t.textSecondary }}>{issue.content}</p>
                  </div>
                ))}
              </div>
            </StyledAccordion>

            <StyledAccordion
              title="Positive Quality Indicators"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7" /></svg>}
              isOpen={!!openAccordions.positiveIndicators}
              onToggle={() => toggleAccordion("positiveIndicators")}
              t={t}
            >
              <ul className="space-y-3">
                {positiveIndicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(16,185,129,0.14)" }}>
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke={GREEN} strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-sm leading-6" style={{ color: t.textSecondary }}>{item}</span>
                  </li>
                ))}
              </ul>
            </StyledAccordion>

            <StyledAccordion
              title="Strengths Applied to Serro"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 7" /></svg>}
              isOpen={!!openAccordions.strengths}
              onToggle={() => toggleAccordion("strengths")}
              t={t}
            >
              <div className="space-y-3">
                {strengths.map((item, i) => (
                  <div key={i} className="rounded-2xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
                    <p className="text-sm font-semibold" style={{ color: t.text }}>{item.title}</p>
                    <p className="mt-2 text-sm leading-6" style={{ color: t.textSecondary }}>{item.content}</p>
                  </div>
                ))}
              </div>
            </StyledAccordion>

            <StyledAccordion
              title="Weaknesses to Monitor"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 3 19h18L12 3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>}
              isOpen={!!openAccordions.weaknesses}
              onToggle={() => toggleAccordion("weaknesses")}
              t={t}
            >
              <div className="space-y-3">
                {weaknesses.map((item, i) => (
                  <div key={i} className="rounded-2xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
                    <p className="text-sm font-semibold" style={{ color: t.text }}>{item.title}</p>
                    <p className="mt-2 text-sm leading-6" style={{ color: t.textSecondary }}>{item.content}</p>
                  </div>
                ))}
              </div>
            </StyledAccordion>
          </div>
        )}

        {activeTab === "financials" && (
          <div
            className="rounded-[28px] p-5 sm:p-6"
            style={{
              background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
              border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
            }}
          >
            <SectionHeader iconId="financials" title="Financial Stability Assessment" subtitle="Balance sheet & completion risk" t={t} />
            <p className="mb-6 text-sm leading-7" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.financial_assessment }} />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {financials.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff", border: `1px solid ${t.cardBorder}` }}
                >
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <p className="text-3xl font-semibold" style={{ color: GOLD }}>{item.value}</p>
                      <p className="mt-2 text-sm leading-5" style={{ color: t.textSecondary }}>{item.label}</p>
                    </div>
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)", color: GOLD }}
                    >
                      <FinancialIcon index={i} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "buyer_guide" && (
          <div className="space-y-4">
            <SectionHeader iconId="buyer_guide" title="Warranty Coverage" subtitle="RERA compliance & buyer checks" t={t} />

            <div className="rounded-[28px] p-5 sm:p-6" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9", border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}` }}>
              <h4 className="text-lg font-semibold mb-3" style={{ color: t.text }}>RERA Compliance</h4>
              <p className="text-sm leading-7 mb-4" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.rera_details }} />
              <ul className="space-y-2">
                {data.rera_indicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: t.textSecondary }}>
                    <span className="mt-0.5" style={{ color: GREEN }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              {verificationSteps.map((group, i) => {
                const key = `verify_${i}`;
                return (
                  <StyledAccordion
                    key={i}
                    title={group.phase}
                    icon={
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                        style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)", color: GOLD }}
                      >
                        {i + 1}
                      </span>
                    }
                    isOpen={!!openAccordions[key]}
                    onToggle={() => toggleAccordion(key)}
                    t={t}
                  >
                    <ul className="space-y-2">
                      {group.steps.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: t.textSecondary }}>
                          <span style={{ color: GOLD }}>→</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </StyledAccordion>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <StyledAccordion
            title="Transparency Statement"
            icon={<TabGlyph id="buyer_guide" />}
            isOpen={!!openAccordions.transparency}
            onToggle={() => toggleAccordion("transparency")}
            t={t}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: GOLD }}>
              Transparency Statement
            </p>
            <p className="text-sm leading-8" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.transparency_statement }} />
          </StyledAccordion>

          {data.report_cta && (
            <div
              className="rounded-[28px] p-5 sm:p-6"
              style={{
                background: t.isDark ? "linear-gradient(135deg, rgba(182,138,53,0.12), rgba(255,255,255,0.04))" : "linear-gradient(135deg, #F6E8CC, #FFF9F0)",
                border: `1px solid ${t.isDark ? "rgba(217,176,95,0.16)" : "rgba(182,138,53,0.16)"}`,
              }}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ background: GOLD, color: "#fff" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold leading-tight" style={{ color: t.text }}>
                      {data.report_cta.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7" style={{ color: t.textSecondary }}>
                      {data.report_cta.subtitle}
                    </p>
                  </div>
                </div>
                <a
                  href={data.report_cta.href || "#"}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ background: t.isDark ? "#1f1a17" : "#1f1a17", color: "#fff" }}
                >
                  {data.report_cta.button_text}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
