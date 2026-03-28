"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.10)";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

/* ─── Annotations for key inflection points ─── */
const ANNOTATIONS = {
  "2008": "Market Correction",
  "2014": "Expo Announcement",
  "2020": "Pandemic Dip",
  "2024": "Recovery Phase"
};

/* ─── Simple Line Chart ─── */
const PriceChart = ({ data, t }) => {
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const range = maxPrice - minPrice || 1;
  const chartH = 260;
  const chartW = 600;
  const padTop = 50;

  const getXY = (d, i) => {
    const x = (i / (data.length - 1)) * chartW;
    const y = chartH - ((d.price - minPrice) / range) * (chartH - padTop);
    return { x, y };
  };

  const points = data.map((d, i) => {
    const { x, y } = getXY(d, i);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`-18 -30 ${chartW + 36} ${chartH + 60}`}
        className="w-full"
        style={{ minWidth: "400px", maxHeight: "420px" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = chartH - pct * (chartH - padTop);
          const val = Math.round(minPrice + pct * range);
          return (
            <g key={i}>
              <line x1="0" y1={y} x2={chartW} y2={y} stroke={t.isDark ? "#2a2d33" : "#e2e8f0"} strokeWidth="0.5" />
              <text x="-6" y={y + 2.5} fill={t.textMuted} fontSize="7" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {/* Area fill */}
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.25" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${chartH} ${points} ${chartW},${chartH}`}
          fill="url(#goldGrad)"
        />

        {/* Line */}
        <polyline points={points} fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinejoin="round" />

        {/* Dots, year labels, and annotations */}
        {data.map((d, i) => {
          const { x, y } = getXY(d, i);
          const annotation = ANNOTATIONS[d.year];
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={annotation ? 3.5 : 2.5} fill={GOLD} />
              {/* Year label */}
              <text x={x} y={chartH + 14} fill={t.textMuted} fontSize="7" textAnchor="middle">{d.year}</text>
              {/* Price label */}
              <text x={x} y={y - 7} fill={GOLD} fontSize="6.5" textAnchor="middle" fontWeight="600">
                {d.price.toLocaleString()}
              </text>
              {/* Annotation */}
              {annotation && (
                <>
                  <line x1={x} y1={y - 12} x2={x} y2={y - 26} stroke={GOLD} strokeWidth="0.5" strokeDasharray="2,1" />
                  <rect x={x - 28} y={y - 40} width="56" height="13" rx="3"
                    fill={t.isDark ? "#1a1c22" : "#ffffff"}
                    stroke={GOLD} strokeWidth="0.5"
                  />
                  <text x={x} y={y - 31} fill={GOLD} fontSize="6" textAnchor="middle" fontWeight="600">
                    {annotation}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ─── Data Table ─── */
const DataTable = ({ headers, rows, t }) => (
  <div
    className="rounded-xl overflow-x-auto"
    style={{ border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
          {headers.map((h, i) => (
            <th
              key={i}
              style={{
                color: t.textMuted,
                textAlign: "left",
                padding: "10px 12px",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap"
              }}
            >{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr
            key={ri}
            style={{
              background: ri % 2 === 0
                ? (t.isDark ? "rgba(255,255,255,0.02)" : "#ffffff")
                : (t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc"),
              borderTop: `1px solid ${t.isDark ? "#1e2028" : "#e2e8f0"}`
            }}
          >
            {row.map((cell, ci) => (
              <td
                key={ci}
                style={{
                  padding: "10px 12px",
                  fontSize: "12px",
                  color: ci === 0 ? t.textMuted : GOLD,
                  fontWeight: ci === 0 ? 500 : 700,
                  whiteSpace: "nowrap"
                }}
              >{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─── Main Section ─── */
const MarketValueSection = ({ data }) => {
  const { t } = useTheme();
  const [openPhases, setOpenPhases] = useState(false);

  return (
    <section style={{ background: t.bg }} className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <h2 style={{ color: t.text }} className="text-2xl sm:text-3xl font-bold mb-3">
          {data.h2}
        </h2>

        {/* Source Transparency */}
        <div
          className="rounded-xl p-4 mb-8"
          style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}
        >
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-1.5">📋 Source Transparency</span>
          <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed">
            {data.source_transparency}
          </p>
        </div>

        {/* Transaction Table */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-3">
          {data.transaction_table.h3}
        </h3>
        <DataTable
          headers={data.transaction_table.headers}
          rows={data.transaction_table.rows}
          t={t}
        />
        <p style={{ color: t.textMuted }} className="text-[10px] mt-2 mb-2 leading-relaxed">
          {data.transaction_table.data_source}
        </p>

        {/* Analysis */}
        <div
          className="rounded-xl p-4 mt-4 mb-10"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
            border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
          }}
        >
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">
            {data.transaction_table.analysis_title}
          </span>
          <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">
            {data.transaction_table.analysis}
          </p>
        </div>

        {/* Price Evolution */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-3">
          {data.price_evolution.h3}
        </h3>

        {/* Chart */}
        <div
          className="rounded-xl p-4 mb-4"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
            border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
          }}
        >
          <PriceChart data={data.price_evolution.chart_data} t={t} />
        </div>

        {/* Trajectory Phases */}
        <span style={{ color: t.text }} className="text-sm font-bold block mb-3">
          {data.price_evolution.trajectory_title}
        </span>
        <div className="space-y-2 mb-2">
          {(openPhases ? data.price_evolution.phases : data.price_evolution.phases.slice(0, 2)).map((phase, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
              }}
            >
              <span style={{ color: GOLD }} className="text-xs font-bold block mb-1">{phase.period}</span>
              <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{phase.description}</p>
            </div>
          ))}
        </div>
        {data.price_evolution.phases.length > 2 && (
          <button
            onClick={() => setOpenPhases(!openPhases)}
            style={{ color: GOLD }}
            className="text-sm font-semibold mb-4 hover:underline"
          >
            {openPhases ? "Show Less ↑" : `See All ${data.price_evolution.phases.length} Phases ↓`}
          </button>
        )}

        <p style={{ color: t.textMuted }} className="text-[11px] mb-10 leading-relaxed italic">
          {data.price_evolution.note}
        </p>

        {/* Rental Performance */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-3">
          {data.rental_performance.h3}
        </h3>
        <DataTable
          headers={data.rental_performance.headers}
          rows={data.rental_performance.rows}
          t={t}
        />
        <p style={{ color: t.textMuted }} className="text-[10px] mt-2 mb-3 leading-relaxed">
          {data.rental_performance.yield_note}
        </p>

        <div
          className="rounded-xl p-4 mb-10"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
            border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
          }}
        >
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">
            {data.rental_performance.context_title}
          </span>
          <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">
            {data.rental_performance.context}
          </p>
        </div>

        {/* Buyer Insights */}
        <h4 style={{ color: t.text }} className="text-lg font-bold mb-4">
          {data.buyer_insights.h4}
        </h4>
        <div className="space-y-3 mb-6">
          {data.buyer_insights.segments.map((seg, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
              }}
            >
              <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">{seg.title}</span>
              <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{seg.text}</p>
            </div>
          ))}
        </div>

        {/* Due Diligence */}
        <span style={{ color: t.text }} className="text-sm font-bold block mb-3">
          {data.buyer_insights.due_diligence_title}
        </span>
        <div className="space-y-2 mb-8">
          {data.buyer_insights.due_diligence.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 items-start rounded-xl p-3"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.02)" : "#ffffff",
                border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
              }}
            >
              <span style={{ color: GOLD }} className="text-sm font-bold mt-0.5">✓</span>
              <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          className="rounded-xl p-4"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
            border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
          }}
        >
          <p style={{ color: t.textMuted }} className="text-[11px] leading-relaxed">
            {data.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketValueSection;
