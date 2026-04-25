"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";

const ChevronIcon = ({ open, color = GOLD }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const AccordionCard = ({ title, subtitle, icon, children, isOpen, onToggle, t, accentColor = GOLD }) => (
  <div
    className="rounded-2xl transition-all duration-300"
    style={{
      background: t.isDark ? t.cardBg : "#fffdfa",
      border: `1px solid ${isOpen ? accentColor + "40" : t.cardBorder}`,
      boxShadow: t.isDark ? "none" : "0 8px 26px rgba(113, 85, 32, 0.08)",
    }}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors sm:px-5"
      style={{ color: t.text }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base"
        style={{ background: accentColor + "22", color: accentColor }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-5 sm:text-[1rem]">{title}</span>
        {subtitle && (
          <span className="mt-0.5 block text-[11px] font-medium leading-4" style={{ color: t.textMuted }}>
            {subtitle}
          </span>
        )}
      </span>
      <ChevronIcon open={isOpen} color={accentColor} />
    </button>

    <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[4500px] overflow-visible opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
      <div className="border-t px-4 pb-5 pt-4 sm:px-5" style={{ borderColor: t.cardBorder }}>
        {children}
      </div>
    </div>
  </div>
);

const MobileCards = ({ headers, rows, t, highlightLast }) =>
  rows.map((row, i) => (
    <div
      key={i}
      className="rounded-xl p-3.5"
      style={{
        background:
          highlightLast && i === rows.length - 1
            ? "rgba(182,138,53,0.08)"
            : t.isDark
              ? "rgba(255,255,255,0.03)"
              : "#fff",
        border: `1px solid ${highlightLast && i === rows.length - 1 ? "rgba(182,138,53,0.3)" : t.cardBorder}`,
      }}
    >
      {headers.map((h, j) => (
        <div key={j} className={j > 0 ? "mt-2" : ""}>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>
            {h}
          </p>
          <p className="mt-0.5 text-sm font-medium" style={{ color: highlightLast && i === rows.length - 1 && j === headers.length - 1 ? GOLD : t.text }}>
            {row[j]}
          </p>
        </div>
      ))}
    </div>
  ));

const DesktopTable = ({ headers, rows, t, highlightLast, minTableWidth = 0 }) => (
  <div className="inline-block min-w-full rounded-xl align-top" style={{ border: `1px solid ${t.cardBorder}` }}>
    <table className="w-full" style={minTableWidth ? { width: `${minTableWidth}px` } : { width: "100%" }}>
      <thead>
        <tr style={{ background: t.isDark ? t.cardBg : "#f6efe3" }}>
          {headers.map((h) => (
            <th key={h} className="whitespace-nowrap px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            style={{
              borderTop: `1px solid ${t.cardBorder}`,
              background:
                highlightLast && i === rows.length - 1
                  ? "rgba(182,138,53,0.06)"
                  : i % 2 !== 0
                    ? t.isDark
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(0,0,0,0.02)"
                    : "transparent",
            }}
          >
            {row.map((cell, j) => (
              <td
                key={j}
                className={`px-4 py-2.5 text-sm ${highlightLast && i === rows.length - 1 ? "font-bold" : j === 0 ? "font-medium" : ""}`}
                style={{ color: highlightLast && i === rows.length - 1 ? GOLD : j === 0 ? t.text : t.textSecondary }}
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

const BulletList = ({ items, t, color = GOLD }) => (
  <div className="space-y-2">
    {items.map((item, i) => (
      <div key={i} className="flex items-start gap-2">
        <span className="mt-[7px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] leading-none" style={{ background: `${color}20`, color }}>
          ✓
        </span>
        <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: item }} />
      </div>
    ))}
  </div>
);

const TableWrap = ({ children }) => (
  <div className="min-w-0">
    <div
      className="table-scroll-x min-w-0 overflow-x-auto pb-2"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {children}
    </div>
  </div>
);

const FinancingSection = ({ data }) => {
  const { t } = useTheme();
  const [openSections, setOpenSections] = useState({
    financing: true,
    ltv: true,
    cash: true,
    roi: true,
    service: true,
    comparison: false,
  });
  const [activeComparisonIndex, setActiveComparisonIndex] = useState(0);

  const toggle = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const ltvHeaders = ["Buyer Profile", "Property Value", "Max LTV", "Min Down"];
  const ltvRows = data.ltv_table.map((r) => [r.profile, r.value, r.ltv, r.down]);

  const cashHeaders = ["Cost Component", "Calculation", "Amount (AED)"];
  const cashRows = data.cash_table.map((r) => [r.component, r.calc, r.amount]);

  const rentalHeaders = ["Community", "Project", "Avg Annual Rent", "Size", "Rent/sq.ft"];
  const rentalRows = data.rental_benchmarking.map((r) => [r.community, r.project, r.rent, r.size, r.per_sqft]);

  const scHeaders = ["Community", "Service Charge", "Amenity Package"];
  const scRows = data.service_charge_comparison.map((r) => [r.community, `AED ${r.charge}`, r.amenity]);

  const compHeaders = ["Feature", "Serro", "Emaar South", "DAMAC Hills 2", "Town Square"];
  const compRows = data.project_comparison.map((r) => [r.feature, r.serro, r.emaar_south, r.damac, r.town_square]);

  const infraHeaders = ["Project", "Timeline", "Proximity to Serro"];
  const infraRows = data.infrastructure_plans.map((r) => [r.project, r.timeline, r.proximity]);
  const comparisonTabs = data.comparison_project_labels || [
    "Serro at The Heights",
    "Emaar South (Golf Place)",
    "DAMAC Hills 2",
    "Town Square (Nshama)",
  ];
  const activeProjectTitle = comparisonTabs[activeComparisonIndex] || comparisonTabs[0];
  const activeProjectDeveloper = [
    "Emaar Properties",
    "Emaar Properties",
    "DAMAC Properties",
    "Nshama (Wasl)",
  ][activeComparisonIndex];
  const activeProjectRows = data.project_comparison.map((row) => [
    row.feature,
    [row.serro, row.emaar_south, row.damac, row.town_square][activeComparisonIndex],
  ]);

  const journeySteps = [
    { title: "Booking", sub: "10% cash deposit", meta: "Day 1", icon: "💳" },
    { title: "Construction", sub: "70% self-funded payments", meta: "2026-2030", icon: "🕒" },
    { title: "Handover", sub: "Mortgage available", meta: "Q1-Q2 2030", icon: "📅" },
  ];

  return (
    <section style={{ background: t.bg }} className="py-6 lg:py-10">
      <style jsx>{`
        .table-scroll-x {
          scrollbar-width: thin;
          scrollbar-color: #b68a35 rgba(0, 0, 0, 0.12);
        }
        .table-scroll-x::-webkit-scrollbar {
          height: 9px;
        }
        .table-scroll-x::-webkit-scrollbar-track {
          background: ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
          border-radius: 999px;
        }
        .table-scroll-x::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #cda24f, #b68a35);
          border-radius: 999px;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
            Financing & Yield Analysis
          </p>
          <h2 className="text-2xl font-bold leading-tight lg:text-3xl xl:text-4xl" style={{ color: t.text }}>
            {data.heading}
          </h2>
        </div>

        <div className="space-y-3">
          <AccordionCard title="Financing Realities — Off-Plan vs. Completed" icon="🏛️" isOpen={openSections.financing} onToggle={() => toggle("financing")} t={t}>
            <h3 className="mb-3 text-lg font-bold" style={{ color: GOLD }}>
              H3: Financing Realities - Off-Plan vs. Completed Properties
            </h3>

            <div className="mb-5 rounded-xl p-4" style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "#f6f2ea", border: `1px solid ${t.cardBorder}` }}>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-lg" style={{ color: GOLD }}>
                  ⚠️
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: t.textSecondary }}
                  dangerouslySetInnerHTML={{ __html: `<strong>Critical:</strong> ${data.financing_intro}` }}
                />
              </div>
            </div>

            <h4 className="mb-3 text-lg font-semibold" style={{ color: GOLD }}>
              Construction Payment Journey
            </h4>
            <div className="mb-6 grid grid-cols-3 gap-2">
              {journeySteps.map((step, idx) => (
                <div key={step.title} className="relative text-center">
                  {idx < journeySteps.length - 1 && (
                    <span className="absolute left-[62%] top-[18px] hidden h-[2px] w-[76%] sm:block" style={{ background: "linear-gradient(90deg, #d8c29b 0%, #ead7b7 100%)" }} />
                  )}
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full text-sm" style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f5f1e8", border: `1px solid ${t.cardBorder}` }}>
                    {step.icon}
                  </div>
                  <p className="text-[13px] font-semibold" style={{ color: t.text }}>
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-4" style={{ color: t.textMuted }}>
                    {step.sub}
                  </p>
                  <p className="mt-1 text-[12px] font-semibold" style={{ color: GOLD }}>
                    {step.meta}
                  </p>
                </div>
              ))}
            </div>

            <h4 className="mb-3 text-lg font-semibold" style={{ color: GOLD }}>
              What this means for Serro buyers:
            </h4>
            <BulletList items={data.what_this_means} t={t} />
          </AccordionCard>

          <AccordionCard title="Loan-to-Value (LTV) Caps for Handover Financing" icon="%" isOpen={openSections.ltv} onToggle={() => toggle("ltv")} t={t}>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: t.textSecondary }}>
              Based on Central Bank of UAE regulations, these are the maximum LTV ratios available when the property is completed.
            </p>

            <div className="mb-4">
              <TableWrap>
                <DesktopTable headers={ltvHeaders} rows={ltvRows} t={t} minTableWidth={720} />
              </TableWrap>
            </div>

            <p className="mb-5 border-l-2 pl-3 text-xs italic leading-relaxed" style={{ color: t.textMuted, borderColor: "rgba(182,138,53,0.3)" }}>
              {data.ltv_note}
            </p>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
              Current Mortgage Rate Context (Feb 2026)
            </p>
            <div>
              <TableWrap>
                <DesktopTable
                  headers={["Rate Type", "Current Value"]}
                  rows={[
                    ["Fixed Rates (1-5yr)", data.mortgage_rates.fixed],
                    ["Variable Rates (EIBOR-linked)", data.mortgage_rates.variable],
                    ["Central Bank Base Rate", data.mortgage_rates.base_rate],
                  ]}
                  t={t}
                  minTableWidth={560}
                />
              </TableWrap>
            </div>
          </AccordionCard>

          <AccordionCard title="Total Cash Required at Purchase" icon="$" isOpen={openSections.cash} onToggle={() => toggle("cash")} t={t}>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.cash_required_intro }} />
            <div className="mb-4 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD, background: t.isDark ? "rgba(182,138,53,0.14)" : "#f8f1e5", border: `1px solid ${t.cardBorder}` }}>
              For AED 6,000,000 Purchase
            </div>

            <div className="mb-4">
              <TableWrap>
                <DesktopTable headers={cashHeaders} rows={cashRows} t={t} highlightLast minTableWidth={700} />
              </TableWrap>
            </div>

            <div>
              <TableWrap>
                <DesktopTable
                  headers={["Key Insight"]}
                  rows={[[<span key="insight" dangerouslySetInnerHTML={{ __html: data.cash_insight }} />]]}
                  t={t}
                />
              </TableWrap>
            </div>
          </AccordionCard>

          <AccordionCard title="ROI Estimator — Rental Yield Projections" subtitle="Benchmarking · 3 scenarios · yield context" icon="📈" isOpen={openSections.roi} onToggle={() => toggle("roi")} t={t}>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: t.textSecondary }}>
              To evaluate Serro's income potential accurately, we compare actual rental transactions from completed communities in the same Dubai South corridor.
            </p>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
              Projected Gross Yield — 3BR @ AED 6M purchase price
            </p>
            <div className="mb-5">
              <TableWrap>
                <DesktopTable
                  headers={["Scenario", "Projected Yield", "Annual Rent", "Purchase Price"]}
                  rows={data.yield_projections.map((row) => [row.scenario, row.yield, row.rent, row.price])}
                  t={t}
                  minTableWidth={700}
                />
              </TableWrap>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.text }}>
              Rental Benchmarking — Per Sq.Ft Analysis
            </p>
            <div className="mb-6">
              <TableWrap>
                <DesktopTable headers={rentalHeaders} rows={rentalRows} t={t} minTableWidth={920} />
              </TableWrap>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
              Yield Context — Why 4-5%?
            </p>
            <div className="mb-6">
              <TableWrap>
                <DesktopTable
                  headers={["Context Points"]}
                  rows={data.yield_context.map((item) => [item])}
                  t={t}
                />
              </TableWrap>
            </div>

            <div className="rounded-lg border p-4" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)" }}>
              <p className="text-xs leading-relaxed" style={{ color: t.textMuted }}>
                <strong>Disclaimer:</strong> {data.yield_disclaimer}
              </p>
            </div>
          </AccordionCard>

          <AccordionCard title="Service Charges — What Owners Actually Pay" icon="🏛️" isOpen={openSections.service} onToggle={() => toggle("service")} t={t}>
            <div className="mb-5">
              <TableWrap>
                <DesktopTable
                  headers={["Estimated Range", "Annual", "Monthly"]}
                  rows={[
                    [
                      "AED 3-5 / sq.ft / yr",
                      data.service_charge_example.annual,
                      data.service_charge_example.monthly,
                    ],
                  ]}
                  t={t}
                  minTableWidth={620}
                />
              </TableWrap>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
              What Service Charges Fund
            </p>
            <div className="mb-6">
              <TableWrap>
                <DesktopTable headers={["Funded Item"]} rows={data.service_charge_funds.map((item) => [item])} t={t} />
              </TableWrap>
            </div>

            <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
              Comparative Context — Villa Communities
            </p>
            <div className="mb-4">
              <TableWrap>
                <DesktopTable headers={scHeaders} rows={scRows} t={t} minTableWidth={860} />
              </TableWrap>
            </div>

            <div className="mb-3">
              <TableWrap>
                <DesktopTable
                  headers={["Value Assessment"]}
                  rows={[[<span key="assessment" dangerouslySetInnerHTML={{ __html: data.service_charge_assessment }} />]]}
                  t={t}
                />
              </TableWrap>
            </div>
            <div>
              <TableWrap>
                <DesktopTable headers={["Note"]} rows={[[data.service_charge_note]]} t={t} />
              </TableWrap>
            </div>
          </AccordionCard>

          <AccordionCard title="Project Comparison — Emaar vs. Competitors" icon="⚖️" isOpen={openSections.comparison} onToggle={() => toggle("comparison")} t={t} accentColor="#286CFF">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: GOLD }}>
              {data.comparison_h3 || "Project Comparison - Emaar vs. Competitor Offerings"}
            </h3>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: t.textSecondary }}>
              {data.comparison_intro || "To contextualize Serro's value proposition, we compare it against similar-tier projects in the Dubai South corridor:"}
            </p>

            <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl p-2 sm:grid-cols-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f6efe3", border: `1px solid ${t.cardBorder}` }}>
              {comparisonTabs.map((label, idx) => {
                const active = idx === activeComparisonIndex;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveComparisonIndex(idx)}
                    className="rounded-lg px-2 py-2 text-center text-[11px] font-medium leading-4 transition-colors"
                    style={{
                      background: active ? (t.isDark ? "rgba(182,138,53,0.2)" : "#fff") : "transparent",
                      color: active ? GOLD : t.textMuted,
                      border: active ? `1px solid ${t.cardBorder}` : "1px solid transparent",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mb-6 rounded-xl p-3 sm:p-4" style={{ border: `1px solid ${t.cardBorder}`, background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff" }}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold" style={{ color: t.text }}>
                    {activeProjectTitle}
                  </p>
                  <p className="text-xs" style={{ color: t.textMuted }}>
                    {activeProjectDeveloper}
                  </p>
                </div>
                {activeComparisonIndex === 0 && (
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: GOLD, background: t.isDark ? "rgba(182,138,53,0.18)" : "#f9f0df" }}
                  >
                    This Project
                  </span>
                )}
              </div>

              <TableWrap>
                <DesktopTable headers={["Feature", "Value"]} rows={activeProjectRows} t={t} minTableWidth={560} />
              </TableWrap>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.text }}>
              Future Infrastructure & Government Plans
            </p>
            <div className="mb-6 rounded-xl p-3 sm:p-4" style={{ border: `1px solid ${t.cardBorder}`, background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff" }}>
              <div className="space-y-3">
                {data.infrastructure_plans.map((item, idx) => (
                  <div key={item.project} className="flex items-start gap-3">
                    <div className="relative flex flex-col items-center">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                        style={{ background: t.isDark ? "rgba(182,138,53,0.18)" : "#f7efde", color: GOLD, border: `1px solid ${t.cardBorder}` }}
                      >
                        {idx + 1}
                      </span>
                      {idx < data.infrastructure_plans.length - 1 && (
                        <span className="mt-1 h-7 w-px" style={{ background: t.cardBorder }} />
                      )}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-base font-semibold leading-5" style={{ color: t.text }}>
                        {item.project}
                      </p>
                      <p className="mt-1 text-sm leading-5" style={{ color: t.textMuted }}>
                        {item.timeline} · <span style={{ color: GOLD }}>{item.proximity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.text }}>
              Analysis
            </p>
            <div className="space-y-2">
              {data.comparison_analysis.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#286CFF" }} />
                  <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </AccordionCard>
        </div>

        {data.cta && (
          <div className="mt-6 rounded-xl px-6 py-6" style={{ background: t.bgAlt, border: `1px solid ${t.cardBorder}` }}>
            <div className="flex flex-col items-start gap-2">
              <a
                href={data.cta.href || "#"}
                className="inline-block rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ background: GOLD }}
              >
                {data.cta.button_text}
              </a>
              {data.cta.subtext && (
                <p className="max-w-xl text-sm leading-relaxed" style={{ color: t.textMuted }}>
                  {data.cta.subtext}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinancingSection;
