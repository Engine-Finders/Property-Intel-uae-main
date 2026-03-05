"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ACCENT = "#B68A35";
const GREEN = "#22C55E";

const ChevronIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MobileCards = ({ headers, rows, t }) => (
  <div className="space-y-3 lg:hidden">
    {rows.map((row, i) => (
      <div key={i} className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
        <p className="text-sm font-semibold mb-2" style={{ color: t.text }}>{row[0]}</p>
        <div className="grid grid-cols-2 gap-2">
          {headers.slice(1).map((h, j) => (
            <div key={j}>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</p>
              <p className="text-xs mt-0.5" style={{ color: row[j + 1] && (row[j + 1].startsWith("+") ? GREEN : t.textSecondary) }}>{row[j + 1]}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const DesktopTable = ({ headers, rows, t }) => (
  <div className="hidden lg:block rounded-xl overflow-hidden" style={{ border: `1px solid ${t.cardBorder}` }}>
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
          <tr key={i} style={{ borderTop: `1px solid ${t.cardBorder}`, background: i % 2 !== 0 ? (t.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent" }}>
            {row.map((cell, j) => (
              <td key={j} className={`px-4 py-3 text-sm ${j === 0 ? "font-medium" : ""}`} style={{ color: cell && cell.startsWith && cell.startsWith("+") ? GREEN : (j === 0 ? t.text : t.textSecondary) }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatCard = ({ label, value, note, t, accent = ACCENT }) => (
  <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>{label}</p>
    <p className="text-lg font-bold" style={{ color: accent }}>{value}</p>
    {note && <p className="text-xs mt-1" style={{ color: t.textMuted }}>{note}</p>}
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

const BalanceSheetSection = ({ data }) => {
  const { t } = useTheme();
  const [showAllSources, setShowAllSources] = useState(false);

  const cs = data.company_status;
  const fm = data.financial_metrics;
  const cr = data.credit_ratings;
  const esc = data.escrow_compliance;
  const lb = data.land_bank;
  const pp = data.project_pipeline;
  const ac = data.analyst_commentary;
  const visibleSources = showAllSources ? data.verification_sources : data.verification_sources.slice(0, 3);

  return (
    <section style={{ background: t.bg }} className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>Balance Sheet</p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight" style={{ color: t.text }}>{data.heading}</h2>
          <p className="mt-3 text-sm lg:text-base leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>{data.intro}</p>
        </div>

        {/* Company Status */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Company Status</h3>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Publicly Traded" value={cs.publicly_traded ? "Yes" : "No"} t={t} accent={GREEN} />
            <StatCard label="Exchange" value={cs.exchange} t={t} />
            <StatCard label="Ticker" value={cs.ticker} t={t} />
          </div>
        </div>

        {/* Key Financial Metrics Table */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Key Financial Metrics</h3>
          <MobileCards headers={fm.headers} rows={fm.rows} t={t} />
          <DesktopTable headers={fm.headers} rows={fm.rows} t={t} />
        </div>

        {/* Credit Ratings Table */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Credit Ratings</h3>
          <MobileCards headers={cr.headers} rows={cr.rows} t={t} />
          <DesktopTable headers={cr.headers} rows={cr.rows} t={t} />
          {cr.source_url && (
            <a href={cr.source_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs underline" style={{ color: ACCENT }}>View Source →</a>
          )}
        </div>

        {/* Escrow Compliance */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Escrow Compliance</h3>
          <div className="rounded-xl p-5" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(34,197,94,0.15)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </span>
              <p className="text-sm font-bold" style={{ color: t.text }}>{esc.status}</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{esc.note}</p>
            <p className="text-xs italic mt-3" style={{ color: t.textMuted }}>Source: {esc.source}</p>
          </div>
        </div>

        {/* Land Bank */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Land Bank & Future Capacity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
              <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Total Land Area</p>
              <p className="text-sm font-semibold" style={{ color: t.text }}>{lb.total_area}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
              <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>Estimated Land Value</p>
              <p className="text-sm font-semibold" style={{ color: t.text }}>{lb.estimated_value}</p>
            </div>
          </div>
          <p className="text-xs italic" style={{ color: t.textMuted }}>Source: {lb.source}</p>
        </div>

        {/* Project Pipeline */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Project Pipeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <StatCard label="Revenue Backlog" value={pp.revenue_backlog} note={pp.revenue_backlog_date} t={t} />
            <StatCard label="Upcoming Projects" value={pp.upcoming_projects} t={t} />
          </div>
          <p className="text-xs italic" style={{ color: t.textMuted }}>Source: {pp.source}</p>
        </div>

        {/* Analyst Commentary */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: t.text }}>Analyst Commentary</h3>
          <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(34,197,94,0.12)", color: GREEN }}>BUY</span>
              <span className="text-xs" style={{ color: t.textMuted }}>Consensus of 13 analysts</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{ac.text}</p>
            <p className="text-xs italic mt-3" style={{ color: t.textMuted }}>Source: {ac.source}</p>
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

export default BalanceSheetSection;
