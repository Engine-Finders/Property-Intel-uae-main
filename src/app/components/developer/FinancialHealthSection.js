"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ACCENT = "#B68A35";
const GREEN = "#22C55E";

const ChevronIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const StatCard = ({ label, value, note, t, accent = ACCENT }) => (
  <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>{label}</p>
    <p className="text-lg font-bold" style={{ color: accent }}>{value}</p>
    {note && <p className="text-xs mt-1" style={{ color: t.textMuted }}>{note}</p>}
  </div>
);

const MetricRow = ({ label, value, t }) => (
  <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
    <span className="text-sm" style={{ color: t.textSecondary }}>{label}</span>
    <span className="text-sm font-semibold" style={{ color: t.text }}>{value}</span>
  </div>
);

const SourceItem = ({ item, t }) => (
  <div className="py-3" style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
    <p className="text-xs font-semibold mb-1" style={{ color: t.text }}>{item.fact}</p>
    <p className="text-xs mb-1" style={{ color: t.textMuted }}>{item.source} — {item.reference}</p>
    {item.url && (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs underline break-all" style={{ color: ACCENT }}>{item.url}</a>
    )}
  </div>
);

const FinancialHealthSection = ({ data }) => {
  const { t } = useTheme();
  const [showAllSources, setShowAllSources] = useState(false);

  const fp = data.financial_performance;
  const dm = data.debt_metrics;
  const mp = data.market_position;
  const lb = data.land_bank;
  const pp = data.project_pipeline;
  const cs = data.company_status;

  const visibleSources = showAllSources ? data.verification_sources : data.verification_sources.slice(0, 3);

  return (
    <section style={{ background: t.bg }} className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>Financial Analysis</p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight" style={{ color: t.text }}>{data.heading}</h2>
          <p className="mt-3 text-sm lg:text-base leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>{data.intro}</p>
        </div>

        {/* Company Status */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Company Status & Valuation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard label="Publicly Traded" value={cs.publicly_traded ? "Yes" : "No"} t={t} accent={GREEN} />
            <StatCard label="Stock Ticker" value={cs.stock_ticker} t={t} />
            <StatCard label="Market Capitalization" value={cs.market_cap} note={cs.market_cap_date} t={t} />
          </div>
        </div>

        {/* Financial Performance */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Financial Performance</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <StatCard label="Revenue (Annual)" value={fp.revenue} note={fp.revenue_note} t={t} />
            <StatCard label="Net Profit (Annual)" value={fp.net_profit} note={fp.net_profit_note} t={t} />
            <StatCard label="Profit Margin" value={fp.profit_margin} note={fp.profit_margin_note} t={t} />
            <StatCard label="Cash Reserves" value={fp.cash_reserves} note={fp.cash_reserves_note} t={t} />
          </div>
          <p className="text-xs italic mb-6" style={{ color: t.textMuted }}>Source: {fp.source}</p>

          {/* Debt Metrics */}
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>Debt & Liquidity Metrics</p>
            <MetricRow label="Total Debt" value={dm.total_debt} t={t} />
            <MetricRow label="Debt-to-Equity Ratio" value={dm.debt_to_equity} t={t} />
            <MetricRow label="Interest Coverage" value={dm.interest_coverage} t={t} />
            <MetricRow label="Current Ratio" value={dm.current_ratio} t={t} />
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm" style={{ color: t.textSecondary }}>Quick Ratio</span>
              <span className="text-sm font-semibold" style={{ color: t.text }}>{dm.quick_ratio}</span>
            </div>
            <p className="text-xs italic mt-3" style={{ color: t.textMuted }}>Source: {dm.source}</p>
          </div>

          {/* ESG */}
          <div className="mt-4 flex items-center gap-3 rounded-xl p-4" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <span className="w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold" style={{ background: "rgba(34,197,94,0.15)", color: GREEN }}>A</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: t.text }}>ESG Rating: {data.esg_rating}</p>
              <p className="text-xs" style={{ color: t.textMuted }}>{data.esg_rating_date}</p>
            </div>
          </div>
        </div>

        {/* Market Position */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Market Position</h3>
          <div className="space-y-3 mb-4">
            <div className="rounded-xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Market Share</p>
              <p className="text-sm font-semibold" style={{ color: t.text }}>Emaar led the market with {mp.market_share}</p>
              <p className="text-xs mt-1 italic" style={{ color: t.textMuted }}>Source: {mp.market_share_source}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Industry Rank</p>
              <p className="text-sm font-semibold" style={{ color: t.text }}>{mp.industry_rank}</p>
              <p className="text-xs mt-1 italic" style={{ color: t.textMuted }}>Source: {mp.industry_rank_source}</p>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>Segment Strengths</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mp.segment_strengths.map((seg, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>{seg.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: t.textSecondary }}>{seg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Land Bank */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Land Bank & Future Capacity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <StatCard label="Total Land (Global)" value={lb.total_global} t={t} />
            <StatCard label="Total Land (UAE)" value={lb.total_uae} t={t} />
            <StatCard label="Estimated Land Value" value={lb.estimated_value} t={t} />
          </div>
          <p className="text-xs italic mb-4" style={{ color: t.textMuted }}>Source: {lb.source}</p>

          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.text }}>Key Land Holdings</p>
          {/* Mobile cards */}
          <div className="block lg:hidden space-y-3">
            {lb.holdings.map((h, i) => (
              <div key={i} className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
                <p className="text-sm font-semibold mb-2" style={{ color: t.text }}>{h.location}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Size</p>
                    <p className="text-xs mt-0.5" style={{ color: t.textSecondary }}>{h.size}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Status</p>
                    <p className="text-xs mt-0.5" style={{ color: ACCENT }}>{h.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop table */}
          <div className="hidden lg:block rounded-xl overflow-hidden" style={{ border: `1px solid ${t.cardBorder}` }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: t.cardBg }}>
                  {["Location", "Size", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lb.holdings.map((h, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${t.cardBorder}`, background: i % 2 !== 0 ? (t.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent" }}>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: t.text }}>{h.location}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: t.textSecondary }}>{h.size}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: ACCENT }}>{h.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Pipeline */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Project Pipeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <StatCard label="Upcoming Projects" value={pp.upcoming} t={t} />
            <StatCard label="Total Future Units" value={pp.total_units} t={t} />
            <StatCard label="Estimated GDV" value={pp.estimated_gdv} t={t} />
          </div>
          <div className="rounded-lg p-3 mb-2" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Notable Launches</p>
            <p className="text-sm" style={{ color: t.textSecondary }}>{pp.notable}</p>
          </div>
          <p className="text-xs italic" style={{ color: t.textMuted }}>Source: {pp.source}</p>
        </div>

        {/* Credit Ratings */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Credit Ratings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.credit_ratings.map((cr, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold" style={{ color: t.text }}>{cr.agency}</p>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(34,197,94,0.12)", color: GREEN }}>{cr.outlook}</span>
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: ACCENT }}>{cr.rating}</p>
                <p className="text-xs" style={{ color: t.textMuted }}>{cr.date} — {cr.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analyst Commentary */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Analyst Commentary</h3>
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(34,197,94,0.12)", color: GREEN }}>BUY</span>
              <span className="text-xs" style={{ color: t.textMuted }}>Consensus of 12 analysts</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{data.analyst_commentary}</p>
            <p className="text-xs italic mt-3" style={{ color: t.textMuted }}>Source: {data.analyst_source}</p>
          </div>
        </div>

        {/* Sources */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Sources & Verification</h3>
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            {visibleSources.map((item, i) => (
              <SourceItem key={i} item={item} t={t} />
            ))}
            {data.verification_sources.length > 3 && (
              <button onClick={() => setShowAllSources(!showAllSources)} className="mt-3 text-xs font-semibold flex items-center gap-1" style={{ color: ACCENT }}>
                {showAllSources ? "Show Less" : `Show All ${data.verification_sources.length} Sources`}
                <ChevronIcon open={showAllSources} />
              </button>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs italic leading-relaxed" style={{ color: t.textMuted }}>{data.disclaimer}</p>
      </div>
    </section>
  );
};

export default FinancialHealthSection;
