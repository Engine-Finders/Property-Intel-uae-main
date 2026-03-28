"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.10)";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

/* ─── Rental Yield Card ─── */
const RentalCard = ({ card, t }) => (
  <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
    <span style={{ color: GOLD }} className="text-[10px] font-bold uppercase tracking-wide block mb-2">Unit Configuration</span>
    <span style={{ color: t.text }} className="text-xs font-bold block mb-3">{card.config}</span>
    <div className="space-y-2">
      <div>
        <span style={{ color: t.textMuted }} className="text-[10px] block">Avg. Annual Rent</span>
        <span style={{ color: t.text }} className="text-xs font-semibold">{card.rent}</span>
      </div>
      <div>
        <span style={{ color: t.textMuted }} className="text-[10px] block">Implied Gross Yield*</span>
        <span style={{ color: "#22C55E" }} className="text-xs font-bold">{card.yield}</span>
      </div>
      <div>
        <span style={{ color: t.textMuted }} className="text-[10px] block">Typical Lease Term</span>
        <span style={{ color: t.textSecondary }} className="text-xs">{card.lease}</span>
      </div>
    </div>
  </div>
);

/* ─── Service Charge Card ─── */
const ChargeCard = ({ card, t }) => (
  <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
    <span style={{ color: GOLD }} className="text-[10px] font-bold uppercase tracking-wide block mb-2">Metric</span>
    <span style={{ color: t.text }} className="text-xs font-bold block mb-3">{card.metric}</span>
    <div className="space-y-2">
      <div>
        <span style={{ color: t.textMuted }} className="text-[10px] block">Value</span>
        <span style={{ color: t.text }} className="text-sm font-bold">{card.value}</span>
      </div>
      <div>
        <span style={{ color: t.textMuted }} className="text-[10px] block">Source</span>
        <span style={{ color: t.textSecondary }} className="text-[10px]">{card.source}</span>
      </div>
    </div>
  </div>
);

/* ─── Data Table ─── */
const DataTable = ({ headers, rows, t }) => (
  <div className="rounded-xl overflow-x-auto" style={{ border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
      <thead>
        <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
          {headers.map((h, i) => (
            <th key={i} style={{ color: t.textMuted, textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? (t.isDark ? "rgba(255,255,255,0.02)" : "#ffffff") : (t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc"), borderTop: `1px solid ${t.isDark ? "#1e2028" : "#e2e8f0"}` }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: "10px 12px", fontSize: "12px", color: ci === 0 ? t.text : t.textSecondary, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─── Analysis Box ─── */
const AnalysisBox = ({ title, text, t }) => (
  <div className="rounded-xl p-4 mt-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
    <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">{title}</span>
    <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{text}</p>
  </div>
);

/* ─── Collapsible Lesson Item ─── */
const LessonItem = ({ item, t, isLast }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? "none" : `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left cursor-pointer"
      >
        <span style={{ color: GOLD }} className="text-xs font-bold">{item.title}</span>
        <span style={{ color: t.textMuted, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} className="text-sm">▾</span>
      </button>
      {open && (
        <div className="pb-4">
          <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{item.text}</p>
          {item.points && (
            <ul className="mt-2 space-y-1 ml-3">
              {item.points.map((pt, pi) => (
                <li key={pi} style={{ color: t.textSecondary }} className="text-xs leading-relaxed flex items-start gap-2">
                  <span style={{ color: GOLD }} className="mt-0.5">•</span>{pt}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── Main Section ─── */
const FinancialRealitySection = ({ data }) => {
  const { t } = useTheme();

  return (
    <section style={{ background: t.bg }} className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <h2 style={{ color: t.text }} className="text-2xl sm:text-3xl font-bold mb-3 mt-2">{data.h2}</h2>

        {/* Source Transparency */}
        <div className="rounded-xl p-4 mb-10" style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-1.5">📋 Source Transparency</span>
          <p style={{ color: t.textSecondary }} className="text-[10px] leading-relaxed">{data.source_transparency}</p>
        </div>

        {/* ── Rental Yields (4-col cards) ── */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-4">{data.rental_yields.h3}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
          {data.rental_yields.cards.map((card, i) => (
            <RentalCard key={i} card={card} t={t} />
          ))}
        </div>
        <p style={{ color: t.textMuted }} className="text-[10px] leading-relaxed mt-2">{data.rental_yields.yield_note}</p>
        <AnalysisBox title={data.rental_yields.analysis_title} text={data.rental_yields.analysis} t={t} />

        {/* ── Service Charges (4-col cards) ── */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-4 mt-10">{data.service_charges.h3}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {data.service_charges.cards.map((card, i) => (
            <ChargeCard key={i} card={card} t={t} />
          ))}
        </div>

        {/* Funds list */}
        <div className="rounded-xl p-4 mb-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">{data.service_charges.funds_title}</span>
          <ul className="space-y-1.5">
            {data.service_charges.funds.map((item, i) => (
              <li key={i} style={{ color: t.textSecondary }} className="text-xs leading-relaxed flex items-start gap-2">
                <span style={{ color: GOLD }} className="mt-0.5">•</span>{item}
              </li>
            ))}
          </ul>
        </div>

        <AnalysisBox title={data.service_charges.history_title} text={data.service_charges.history} t={t} />
        <AnalysisBox title={data.service_charges.guidance_title} text={data.service_charges.guidance} t={t} />

        {/* ── Comparables Table ── */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-4 mt-10">{data.comparables.h3}</h3>
        <DataTable headers={data.comparables.headers} rows={data.comparables.rows} t={t} />
        <p style={{ color: t.textMuted }} className="text-[10px] mt-2 leading-relaxed">{data.comparables.source}</p>
        <AnalysisBox title={data.comparables.insight_title} text={data.comparables.insight} t={t} />

        {/* ── Lessons Learned ── */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-4 mt-10">{data.lessons.h3}</h3>
        <div className="rounded-xl p-5" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <div className="space-y-0">
            {data.lessons.items.map((item, i) => (
              <LessonItem key={i} item={item} t={t} isLast={i === data.lessons.items.length - 1} />
            ))}
          </div>
        </div>

        {/* ── Buyer Insights (two cards) ── */}
        <h4 style={{ color: t.text }} className="text-base font-bold mb-4 mt-10">{data.buyer_insights.h4}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {data.buyer_insights.segments.map((seg, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
              <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">{seg.title}</span>
              <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{seg.text}</p>
            </div>
          ))}
        </div>

        {/* Checklist (simple points) */}
        <span style={{ color: t.text }} className="text-xs font-bold block mb-2">{data.buyer_insights.checklist_title}</span>
        <div className="space-y-1.5 mb-8">
          {data.buyer_insights.checklist.map((item, i) => (
            <p key={i} style={{ color: t.textSecondary }} className="text-xs leading-relaxed flex items-start gap-2">
              <span style={{ color: GOLD }} className="mt-0.5">•</span>{item}
            </p>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <p style={{ color: t.textMuted }} className="text-[10px] leading-relaxed">{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default FinancialRealitySection;
