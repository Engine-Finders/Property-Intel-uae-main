"use client";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.10)";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

const DataTable = ({ headers, rows, t }) => (
  <div
    className="rounded-xl overflow-x-auto"
    style={{ border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "760px" }}>
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
                whiteSpace: "nowrap",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr
            key={ri}
            style={{
              background:
                ri % 2 === 0
                  ? t.isDark
                    ? "rgba(255,255,255,0.02)"
                    : "#ffffff"
                  : t.isDark
                    ? "rgba(255,255,255,0.04)"
                    : "#f8fafc",
              borderTop: `1px solid ${t.isDark ? "#1e2028" : "#e2e8f0"}`,
            }}
          >
            {row.map((cell, ci) => (
              <td
                key={ci}
                style={{
                  padding: "10px 12px",
                  fontSize: "12px",
                  color: ci === 0 ? t.text : t.textSecondary,
                  fontWeight: ci === 0 ? 600 : 400,
                }}
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

const AnalysisBox = ({ title, text, t }) => (
  <div
    className="rounded-xl p-4 mt-4"
    style={{
      background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
      border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`,
    }}
  >
    <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">
      {title}
    </span>
    <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">
      {text}
    </p>
  </div>
);

const ResaleInvestment = ({ data }) => {
  const { t } = useTheme();

  return (
    <section style={{ background: t.bgAlt }} className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 style={{ color: t.text }} className="text-2xl sm:text-3xl font-bold mb-3">
          {data.h2}
        </h2>

        <div className="rounded-xl p-4 mb-8" style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-1.5">
            📋 Source Transparency
          </span>
          <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed">
            {data.source_transparency}
          </p>
        </div>

        <h3 style={{ color: t.text }} className="text-lg font-bold mb-2">
          {data.buyer_suitability.h3}
        </h3>
        <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed mb-4">
          {data.buyer_suitability.intro}
        </p>
        <DataTable headers={data.buyer_suitability.headers} rows={data.buyer_suitability.rows} t={t} />
        <AnalysisBox title="Market Insight:" text={data.buyer_suitability.market_insight} t={t} />

        <h3 style={{ color: t.text }} className="text-lg font-bold mt-10 mb-2">
          {data.comparative_value.h3}
        </h3>
        <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed mb-4">
          {data.comparative_value.intro}
        </p>
        <DataTable headers={data.comparative_value.headers} rows={data.comparative_value.rows} t={t} />
        <AnalysisBox title="What the comparison indicates:" text={data.comparative_value.comparison_indicates} t={t} />

        <h3 style={{ color: t.text }} className="text-lg font-bold mt-10 mb-3">
          {data.long_term_verdict.h3}
        </h3>
        <div className="space-y-4 mb-10">
          <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
            <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">
              {data.long_term_verdict.capital_appreciation_title}
            </span>
            <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed mb-2">
              {data.long_term_verdict.capital_appreciation_text}
            </p>
            <p style={{ color: t.textMuted }} className="text-[10px] leading-relaxed italic">
              {data.long_term_verdict.note}
            </p>
          </div>
          <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
            <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">
              {data.long_term_verdict.maturity_title}
            </span>
            <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">
              {data.long_term_verdict.maturity_text}
            </p>
          </div>
        </div>

        <h4 style={{ color: t.text }} className="text-lg font-bold mb-4">
          {data.strategic_recommendations.h4}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {data.strategic_recommendations.recommendations.map((item, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
              <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">
                {item.title}
              </span>
              <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <h4 style={{ color: t.text }} className="text-lg font-bold mb-4">
          {data.kpi_summary.h4}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {data.kpi_summary.cards.map((item, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
              <p style={{ color: GOLD }} className="text-[10px] font-bold uppercase tracking-wide mb-2">
                {item.metric}
              </p>
              <p style={{ color: t.text }} className="text-sm font-bold mb-1">
                {item.performance}
              </p>
              <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed">
                {item.context}
              </p>
            </div>
          ))}
        </div>
        <p style={{ color: t.textMuted }} className="text-[10px] leading-relaxed mb-8">
          {data.kpi_summary.source}
        </p>

        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <p style={{ color: t.textMuted }} className="text-[10px] leading-relaxed">
            {data.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResaleInvestment;
