"use client"
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

const ACCENT = "#B68A35";
const GREEN = "#22C55E";

const ChevronIcon = ({ open, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const IconPlaceholder = ({ size = 36 }) => (
  <span className="rounded-lg flex items-center justify-center shrink-0" style={{ width: size, height: size, background: `${ACCENT}22`, border: `1px dashed ${ACCENT}` }}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="m9 12 2 2 4-4" />
    </svg>
  </span>
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

const MetricRow = ({ label, value, highlight, t }) => (
  <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
    <span className="text-sm" style={{ color: t.textSecondary }}>{label}</span>
    <span className="text-sm font-semibold" style={{ color: highlight ? GREEN : t.text }}>{value}</span>
  </div>
);

const TabBar = ({ tabs, activeTab, onTabChange, t }) => (
  <div className="flex gap-1 mb-4">
    {tabs.map((tab, i) => (
      <button key={i} onClick={() => onTabChange(i)} className="px-3 py-2 rounded-lg text-xs font-semibold transition-all" style={{
        background: activeTab === i ? ACCENT : (t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"),
        color: activeTab === i ? "#fff" : t.textSecondary,
      }}>{tab}</button>
    ))}
  </div>
);

/* Section header: full-width bg image with text on top (same as GovernmentPartnershipsSection) */
const SectionHeader = ({ heading, subheading, t }) => (
  <div className="relative rounded-2xl overflow-hidden mb-10 h-80 lg:h-72">
    <Image
      src="/developer/finance-section.webp"
      alt=""
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)" }} />
    <div className="absolute left-4 lg:left-8 top-8 opacity-30 hidden sm:block">
      <svg viewBox="0 0 24 24" className="w-16 h-16 lg:w-20 lg:h-20" fill="none" stroke="#B68A35" strokeWidth="0.6">
        <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="absolute right-4 lg:right-8 top-8 opacity-30 hidden sm:block">
      <svg viewBox="0 0 24 24" className="w-16 h-16 lg:w-20 lg:h-20" fill="none" stroke="#B68A35" strokeWidth="0.6">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="relative z-10 max-w-3xl mx-auto text-center pt-8 lg:pt-10 px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#B68A35" }}>Financial Analysis</p>
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight text-white">{heading}</h2>
      <p className="text-sm lg:text-base leading-relaxed text-white/80">{subheading}</p>
    </div>
  </div>
);

const FinancialHealthSection = ({ data }) => {
  const { t } = useTheme();
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [marketTab, setMarketTab] = useState(0);
  const [landTab, setLandTab] = useState(0);

  const fp = data.financial_performance;
  const dm = data.debt_metrics;
  const mp = data.market_position;
  const lb = data.land_bank;
  const pp = data.project_pipeline;
  const cs = data.company_status;

  return (
    <section style={{ background: t.bg }} className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header: full-width image with heading + intro on top */}
        <SectionHeader heading={data.heading} subheading={data.intro} t={t} />

        {/* 2 — Company Status & Valuation */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Company Status & Valuation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-5 flex items-center gap-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <IconPlaceholder size={44} />
              <div>
                <p className="text-sm font-bold" style={{ color: t.text }}>Publicly Traded: {cs.publicly_traded ? "Yes" : "No"}</p>
                <p className="text-sm mt-0.5" style={{ color: t.textSecondary }}>{cs.stock_ticker}</p>
              </div>
            </div>
            <div className="rounded-xl p-5 flex items-center gap-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <IconPlaceholder size={44} />
              <div>
                <p className="text-sm font-bold" style={{ color: t.text }}>Market Capitalization</p>
                <p className="text-lg font-bold" style={{ color: ACCENT }}>{cs.market_cap}</p>
                {cs.market_cap_date && <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>{cs.market_cap_date}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* 3 — Financial Performance & Debt Metrics */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left — Financial Performance */}
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <h3 className="text-base font-bold mb-4" style={{ color: t.text }}>Financial Performance</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>Revenue (Annual)</p>
                  <p className="text-xs" style={{ color: t.textMuted }}>{fp.revenue_note}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: t.text }}>{fp.revenue}</p>
                  <p className="text-xs" style={{ color: GREEN }}>{fp.revenue_note?.match(/[+]\d+%/)?.[0]}</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>Net Profit (Annual)</p>
                  <p className="text-xs" style={{ color: t.textMuted }}>{fp.net_profit_note}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: t.text }}>{fp.net_profit}</p>
                  <p className="text-xs" style={{ color: GREEN }}>{fp.net_profit_note?.match(/[+]\d+%/)?.[0]}</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>Profit Margin</p>
                  <p className="text-xs" style={{ color: t.textMuted }}>{fp.profit_margin_note}</p>
                </div>
                <p className="text-2xl font-bold" style={{ color: ACCENT }}>{fp.profit_margin}</p>
              </div>
              <div className="flex items-center justify-between py-2 mt-1 rounded-lg px-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>Cash Reserves</p>
                  <p className="text-xs" style={{ color: t.textMuted }}>{fp.cash_reserves_note}</p>
                </div>
                <p className="text-lg font-bold" style={{ color: t.text }}>{fp.cash_reserves}</p>
              </div>
            </div>
            <p className="text-[10px] italic mt-4" style={{ color: t.textMuted }}>Source: {fp.source}</p>
          </div>

          {/* Right — Debt & Liquidity */}
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <h3 className="text-base font-bold mb-4" style={{ color: t.text }}>Debt & Liquidity Metrics</h3>
            <MetricRow label="Total Debt" value={dm.total_debt} t={t} />
            <MetricRow label="Debt-to-Equity" value={dm.debt_to_equity} t={t} />
            <MetricRow label="Interest Coverage" value={dm.interest_coverage} t={t} />
            <MetricRow label="Current Ratio" value={dm.current_ratio} t={t} />
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm" style={{ color: t.textSecondary }}>Quick Ratio</span>
              <span className="text-sm font-semibold" style={{ color: t.text }}>{dm.quick_ratio}</span>
            </div>
            <p className="text-[10px] italic mt-4" style={{ color: t.textMuted }}>Source: {dm.source}</p>
          </div>
        </div>

        {/* Source + ESG Row — Separate box */}
        <div className="mb-8 flex items-center justify-between rounded-xl p-4" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <p className="text-xs italic" style={{ color: t.textMuted }}>Source: {fp.source}</p>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: "rgba(34,197,94,0.15)", color: GREEN }}>{data.esg_rating}</span>
            <div>
              <p className="text-xs font-semibold" style={{ color: t.text }}>ESG Rating: {data.esg_rating}</p>
              <p className="text-[10px]" style={{ color: t.textMuted }}>{data.esg_rating_date}</p>
            </div>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left — Market Position */}
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="flex items-center gap-2 mb-4">
              <IconPlaceholder size={28} />
              <h3 className="text-base font-bold" style={{ color: t.text }}>Market Position</h3>
            </div>
            <TabBar tabs={["Market Share & Industry Rank", "Project Pipeline"]} activeTab={marketTab} onTabChange={setMarketTab} t={t} />

            {marketTab === 0 && (
              <div className="space-y-3">
                <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: t.text }}>Emaar led the market with {mp.market_share}</p>
                  <p className="text-[10px] italic" style={{ color: t.textMuted }}>Source: {mp.market_share_source}</p>
                </div>
                <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Industry Rank</p>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>{mp.industry_rank}</p>
                  <p className="text-[10px] italic mt-1" style={{ color: t.textMuted }}>Source: {mp.industry_rank_source}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: t.textMuted }}>Segment Strengths</p>
                  {mp.segment_strengths.map((seg, i) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: t.text }}>{seg.label}</p>
                        <p className="text-xs" style={{ color: t.textSecondary }}>{seg.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {marketTab === 1 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Upcoming Projects</p>
                    <p className="text-lg font-bold" style={{ color: ACCENT }}>{pp.upcoming}</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Total Future Units</p>
                    <p className="text-lg font-bold" style={{ color: ACCENT }}>{pp.total_units}</p>
                  </div>
                </div>
                <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Estimated GDV</p>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>{pp.estimated_gdv}</p>
                </div>
                <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Notable Launches</p>
                  <p className="text-sm" style={{ color: t.textSecondary }}>{pp.notable}</p>
                </div>
                <p className="text-[10px] italic" style={{ color: t.textMuted }}>Source: {pp.source}</p>
              </div>
            )}
          </div>

          {/* Right — Land Bank */}
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="flex items-center gap-2 mb-4">
              <IconPlaceholder size={28} />
              <h3 className="text-base font-bold" style={{ color: t.text }}>Land Bank & Future Capacity</h3>
            </div>
            <TabBar tabs={["Total Land Area", "Key Land Holdings"]} activeTab={landTab} onTabChange={setLandTab} t={t} />

            {landTab === 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Global</p>
                    <p className="text-lg font-bold" style={{ color: ACCENT }}>{lb.total_global}</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>UAE</p>
                    <p className="text-lg font-bold" style={{ color: ACCENT }}>{lb.total_uae}</p>
                  </div>
                </div>
                <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Estimated Land Value</p>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>{lb.estimated_value}</p>
                </div>
                <p className="text-[10px] italic" style={{ color: t.textMuted }}>Source: {lb.source}</p>
              </div>
            )}

            {landTab === 1 && (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
                {lb.holdings.map((h, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
                    <p className="text-sm font-bold mb-2" style={{ color: t.text }}>{h.location}</p>
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
            )}
          </div>
        </div>

        {/* 5 — Credit Ratings */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Credit Ratings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.credit_ratings.map((cr, i) => (
              <div key={i} className="rounded-xl p-5 flex items-center gap-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <div className="shrink-0 rounded-lg p-2" style={{ background: t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-wider leading-tight text-center" style={{ color: t.text }}>{cr.agency === "Moody's" ? "MOODY'S\nRATINGS" : "S&P Global\nRatings"}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold" style={{ color: ACCENT }}>{cr.rating}</p>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "rgba(34,197,94,0.12)", color: GREEN }}>{cr.outlook}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: t.textMuted }}>{cr.date} — {cr.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 — Analyst Commentary */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Analyst Commentary</h3>
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{data.analyst_commentary}</p>
            <p className="text-xs font-semibold mt-3 text-right" style={{ color: ACCENT }}>Source: {data.analyst_source}</p>
          </div>
        </div>

        {/* 7 — Sources & Verification Accordion */}
        <div className="mb-4">
          <button onClick={() => setSourcesOpen(!sourcesOpen)} className="w-full rounded-xl p-4 flex items-center justify-between" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <h3 className="text-base font-bold" style={{ color: t.text }}>Sources & Verification</h3>
            <ChevronIcon open={sourcesOpen} color={ACCENT} />
          </button>
          {sourcesOpen && (
            <div className="rounded-b-xl p-5 -mt-1" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderTop: "none" }}>
              {data.verification_sources.map((item, i) => (
                <SourceItem key={i} item={item} t={t} />
              ))}
            </div>
          )}
        </div>

        {/* 8 — Disclaimer */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-xs italic leading-relaxed" style={{ color: t.textMuted }}>{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default FinancialHealthSection;
