"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ChevronIcon = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const AccordionCard = ({ title, icon, children, isOpen, onToggle, t, accentColor = "#B68A35" }) => (
  <div
    className="rounded-xl overflow-hidden transition-all duration-300"
    style={{
      background: t.cardBg,
      border: `1px solid ${isOpen ? accentColor + "40" : t.cardBorder}`,
    }}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 p-5 text-left transition-colors"
      style={{ color: t.text }}
    >
      <span
        className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
        style={{ background: accentColor + "20", color: accentColor }}
      >
        {icon}
      </span>
      <span className="flex-1 text-sm font-bold lg:text-base">{title}</span>
      <ChevronIcon open={isOpen} />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="px-5 pb-5 pt-0">{children}</div>
    </div>
  </div>
);

const MobileCards = ({ headers, rows, t, highlightLast }) =>
  rows.map((row, i) => (
    <div
      key={i}
      className="rounded-lg p-4"
      style={{
        background: highlightLast && i === rows.length - 1 ? "rgba(182,138,53,0.08)" : t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        border: `1px solid ${highlightLast && i === rows.length - 1 ? "rgba(182,138,53,0.3)" : t.cardBorder}`,
      }}
    >
      {headers.map((h, j) => (
        <div key={j} className={j > 0 ? "mt-2" : ""}>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</p>
          <p
            className="text-sm font-medium mt-0.5"
            style={{ color: highlightLast && i === rows.length - 1 && j === headers.length - 1 ? "#B68A35" : t.text }}
          >
            {row[j]}
          </p>
        </div>
      ))}
    </div>
  ));

const DesktopTable = ({ headers, rows, t, highlightLast }) => (
  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${t.cardBorder}` }}>
    <table className="w-full">
      <thead>
        <tr style={{ background: t.cardBg }}>
          {headers.map((h) => (
            <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            style={{
              borderTop: `1px solid ${t.cardBorder}`,
              background: highlightLast && i === rows.length - 1 ? "rgba(182,138,53,0.06)" : i % 2 !== 0 ? (t.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent",
            }}
          >
            {row.map((cell, j) => (
              <td
                key={j}
                className={`px-4 py-3 text-sm ${highlightLast && i === rows.length - 1 ? "font-bold" : j === 0 ? "font-medium" : ""}`}
                style={{ color: highlightLast && i === rows.length - 1 ? "#B68A35" : j === 0 ? t.text : t.textSecondary }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FinancingSection = ({ data }) => {
  const { t } = useTheme();
  const [openSections, setOpenSections] = useState({ financing: true });

  const toggle = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const ltvHeaders = ["Buyer Profile", "Property Value", "Max LTV", "Min Down Payment"];
  const ltvRows = data.ltv_table.map((r) => [r.profile, r.value, r.ltv, r.down]);

  const cashHeaders = ["Cost Component", "Calculation", "Amount (AED)"];
  const cashRows = data.cash_table.map((r) => [r.component, r.calc, r.amount]);

  const rentalHeaders = ["Community", "Project", "Avg Rent", "Size (sq.ft)", "Rent/sq.ft"];
  const rentalRows = data.rental_benchmarking.map((r) => [r.community, r.project, r.rent, r.size, r.per_sqft]);

  const yieldHeaders = ["Scenario", "Annual Rent", "Purchase Price", "Gross Yield"];
  const yieldRows = data.yield_projections.map((r) => [r.scenario, r.rent, r.price, r.yield]);

  const scHeaders = ["Community", "Charge (AED/sq.ft)", "Amenity Package"];
  const scRows = data.service_charge_comparison.map((r) => [r.community, r.charge, r.amenity]);

  const compHeaders = ["Feature", "Serro", "Emaar South", "DAMAC Hills 2", "Town Square"];
  const compRows = data.project_comparison.map((r) => [r.feature, r.serro, r.emaar_south, r.damac, r.town_square]);

  const infraHeaders = ["Project", "Timeline", "Proximity to Serro"];
  const infraRows = data.infrastructure_plans.map((r) => [r.project, r.timeline, r.proximity]);

  return (
    <section style={{ background: t.bg }} className="py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#B68A35" }}>
            Financing & Yield Analysis
          </p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight" style={{ color: t.text }}>
            {data.heading}
          </h2>
        </div>

        {/* Accordion sections */}
        <div className="space-y-3">
          {/* 1. Financing Realities */}
          <AccordionCard
            title="Financing Realities — Off-Plan vs. Completed"
            icon="🏦"
            isOpen={openSections.financing}
            onToggle={() => toggle("financing")}
            t={t}
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.financing_intro }} />

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#B68A35" }}>
              What this means for Serro buyers:
            </p>
            <div className="space-y-2 mb-6">
              {data.what_this_means.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#B68A35" }} />
                  <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>
              LTV Caps for Handover Financing
            </p>
            <div className="block lg:hidden space-y-3 mb-4">
              <MobileCards headers={ltvHeaders} rows={ltvRows} t={t} />
            </div>
            <div className="hidden lg:block mb-4">
              <DesktopTable headers={ltvHeaders} rows={ltvRows} t={t} />
            </div>
            <p className="text-xs leading-relaxed italic pl-3 mb-6" style={{ color: t.textMuted, borderLeft: "2px solid rgba(182,138,53,0.3)" }}>
              {data.ltv_note}
            </p>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>
              Current Mortgage Rate Context (Feb 2026)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Fixed Rates (1–5yr)", value: data.mortgage_rates.fixed },
                { label: "Variable Rates", value: data.mortgage_rates.variable },
                { label: "CB Base Rate", value: data.mortgage_rates.base_rate },
              ].map((item, i) => (
                <div key={i} className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>{item.label}</p>
                  <p className="text-sm font-semibold" style={{ color: "#B68A35" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </AccordionCard>

          {/* 2. Total Cash Required */}
          <AccordionCard
            title="Total Cash Required at Purchase"
            icon="💰"
            isOpen={openSections.cash}
            onToggle={() => toggle("cash")}
            t={t}
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.cash_required_intro }} />

            <div className="block lg:hidden space-y-3 mb-4">
              <MobileCards headers={cashHeaders} rows={cashRows} t={t} highlightLast />
            </div>
            <div className="hidden lg:block mb-4">
              <DesktopTable headers={cashHeaders} rows={cashRows} t={t} highlightLast />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: "rgba(182,138,53,0.08)", border: "1px solid rgba(182,138,53,0.2)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.cash_insight }} />
            </div>
          </AccordionCard>

          {/* 3. ROI & Rental Yield */}
          <AccordionCard
            title="ROI Estimator — Rental Yield Projections"
            icon="📊"
            isOpen={openSections.roi}
            onToggle={() => toggle("roi")}
            t={t}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>
              Rental Benchmarking — Per Sq.Ft Analysis
            </p>
            <div className="block lg:hidden space-y-3 mb-6">
              <MobileCards headers={rentalHeaders} rows={rentalRows} t={t} />
            </div>
            <div className="hidden lg:block mb-6">
              <DesktopTable headers={rentalHeaders} rows={rentalRows} t={t} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>
              Projected Gross Yield — 3-Bedroom
            </p>
            <div className="block lg:hidden space-y-3 mb-4">
              <MobileCards headers={yieldHeaders} rows={yieldRows} t={t} />
            </div>
            <div className="hidden lg:block mb-4">
              <DesktopTable headers={yieldHeaders} rows={yieldRows} t={t} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3 mt-6" style={{ color: t.text }}>
              Context: Dubai South avg villa ROI is 4.94%
            </p>
            <div className="space-y-2 mb-6">
              {data.yield_context.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#B68A35" }} />
                  <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{item}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <div className="flex items-start gap-2">
                <span className="text-sm shrink-0">⚠️</span>
                <p className="text-xs leading-relaxed" style={{ color: t.textMuted }}>{data.yield_disclaimer}</p>
              </div>
            </div>
          </AccordionCard>

          {/* 4. Service Charges */}
          <AccordionCard
            title="Service Charges — What Owners Actually Pay"
            icon="🔧"
            isOpen={openSections.service}
            onToggle={() => toggle("service")}
            t={t}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg font-bold" style={{ color: "#B68A35" }}>{data.service_charge_range}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Annual ({data.service_charge_example.size} sq.ft)</p>
                <p className="text-sm font-semibold mt-1" style={{ color: t.text }}>{data.service_charge_example.annual}</p>
              </div>
              <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Monthly Equivalent</p>
                <p className="text-sm font-semibold mt-1" style={{ color: t.text }}>{data.service_charge_example.monthly}</p>
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>What Service Charges Fund</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {data.service_charge_funds.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#B68A35" }} />
                  <p className="text-sm" style={{ color: t.textSecondary }}>{item}</p>
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>Comparative Context</p>
            <div className="block lg:hidden space-y-3 mb-4">
              <MobileCards headers={scHeaders} rows={scRows} t={t} />
            </div>
            <div className="hidden lg:block mb-4">
              <DesktopTable headers={scHeaders} rows={scRows} t={t} />
            </div>

            <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.service_charge_assessment }} />
            <p className="text-xs leading-relaxed italic pl-3" style={{ color: t.textMuted, borderLeft: "2px solid rgba(182,138,53,0.3)" }}>
              {data.service_charge_note}
            </p>
          </AccordionCard>

          {/* 5. Project Comparison */}
          <AccordionCard
            title="Project Comparison — Emaar vs. Competitors"
            icon="⚖️"
            isOpen={openSections.comparison}
            onToggle={() => toggle("comparison")}
            t={t}
            accentColor="#286CFF"
          >
            <div className="block lg:hidden space-y-3 mb-6">
              {compRows.map((row, i) => (
                <div key={i} className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
                  <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "#286CFF" }}>{row[0]}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Serro", "Emaar South", "DAMAC Hills 2", "Town Square"].map((label, j) => (
                      <div key={j}>
                        <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>{label}</p>
                        <p className={`text-sm mt-0.5 ${j === 0 ? "font-semibold" : ""}`} style={{ color: j === 0 ? "#B68A35" : t.textSecondary }}>{row[j + 1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden lg:block mb-6 overflow-x-auto">
              <DesktopTable headers={compHeaders} rows={compRows} t={t} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>
              Future Infrastructure & Government Plans
            </p>
            <div className="block lg:hidden space-y-3 mb-6">
              <MobileCards headers={infraHeaders} rows={infraRows} t={t} />
            </div>
            <div className="hidden lg:block mb-6">
              <DesktopTable headers={infraHeaders} rows={infraRows} t={t} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>Analysis</p>
            <div className="space-y-2">
              {data.comparison_analysis.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#286CFF" }} />
                  <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{item}</p>
                </div>
              ))}
            </div>
          </AccordionCard>
        </div>
      </div>
    </section>
  );
};

export default FinancingSection;
