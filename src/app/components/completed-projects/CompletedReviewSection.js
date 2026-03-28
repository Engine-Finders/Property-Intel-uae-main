"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.10)";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

/* ─── Animated Sentiment Bar ─── */
const SentimentBar = ({ item, t }) => {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(item.percent); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [item.percent]);

  return (
    <div ref={ref} className="p-4 rounded-xl" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold" style={{ color: t.text }}>{item.label}</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: item.color + "20", color: item.color }}>{item.percent}%</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: t.isDark ? "#2a2d33" : "#e2e8f0" }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: item.color }} />
      </div>
      <p className="text-[10px] leading-relaxed mt-2 italic" style={{ color: t.textMuted }}>{item.themes}</p>
    </div>
  );
};

/* ─── Data Table (horizontal scroll) ─── */
const DataTable = ({ headers, rows, t }) => (
  <div className="rounded-xl overflow-x-auto" style={{ border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
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

/* ─── Quote Card ─── */
const QuoteCard = ({ quote, accentColor, t }) => (
  <div className="rounded-lg p-4 mb-3" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`, borderLeft: `3px solid ${accentColor}` }}>
    <p className="text-xs leading-relaxed italic mb-2" style={{ color: t.textSecondary }}>"{quote.text}"</p>
    <p className="text-[10px] font-semibold" style={{ color: t.textMuted }}>— {quote.source}</p>
  </div>
);

/* ─── Main Section ─── */
const CompletedReviewsSection = ({ data }) => {
  const { t } = useTheme();
  const [quotesOpen, setQuotesOpen] = useState(false);

  return (
    <section style={{ background: t.bgAlt }} className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <h2 style={{ color: t.text }} className="text-2xl sm:text-3xl font-bold">{data.h2}</h2>
        </div>
        <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4" style={{ background: GOLD_BG, color: GOLD, border: `1px solid ${GOLD_BORDER}` }}>
          {data.badge}
        </span>

        {/* Source Transparency */}
        <div className="rounded-xl p-4 mb-8" style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-1.5">📋 Source Transparency</span>
          <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed">{data.source_transparency}</p>
        </div>

        {/* Verification Methodology */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-2">{data.verification.h3}</h3>
        <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed mb-3">{data.verification.intro}</p>
        <div className="space-y-2 mb-8">
          {data.verification.items.map((item, i) => (
            <div key={i} className="flex gap-3 items-start rounded-xl p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
              <span style={{ color: GOLD }} className="text-sm font-bold mt-0.5">✓</span>
              <div>
                <span style={{ color: t.text }} className="text-xs font-bold block">{item.title}</span>
                <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sentiment - 3 columns */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-2">{data.sentiment.h3}</h3>
        <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed mb-4">{data.sentiment.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.sentiment.items.map((item, i) => (
            <SentimentBar key={i} item={item} t={t} />
          ))}
        </div>
        <div className="rounded-xl p-4 mt-3 mb-10" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">What the data indicates:</span>
          <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{data.sentiment.analysis}</p>
        </div>

        {/* Strengths */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-4">{data.strengths.h3}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {data.strengths.items.map((item, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{item.icon}</span>
                <span style={{ color: t.text }} className="text-xs font-bold">{item.title}</span>
              </div>
              <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Insights Table */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-3">{data.insights_table.h3}</h3>
        <div className="mb-10">
          <DataTable headers={data.insights_table.headers} rows={data.insights_table.rows} t={t} />
        </div>

        {/* Quotes (Collapsible) */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-1">{data.quotes.h3}</h3>
        <button onClick={() => setQuotesOpen(!quotesOpen)} style={{ color: GOLD }} className="text-xs font-semibold mb-4 hover:underline">
          {quotesOpen ? "Hide Quotes ↑" : "Show Quotes ↓"}
        </button>
        {quotesOpen && (
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#22C55E" }}>Positive Experiences</p>
            {data.quotes.positive.map((q, i) => <QuoteCard key={i} quote={q} accentColor="#22C55E" t={t} />)}
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3 mt-5" style={{ color: "#F59E0B" }}>Neutral / Constructive Feedback</p>
            {data.quotes.constructive.map((q, i) => <QuoteCard key={i} quote={q} accentColor="#F59E0B" t={t} />)}
          </div>
        )}

        {/* Buyer Guide */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-4">{data.buyer_guide.h3}</h3>
        <div className="space-y-3 mb-6">
          {data.buyer_guide.segments.map((seg, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
              <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">{seg.title}</span>
              <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{seg.text}</p>
            </div>
          ))}
        </div>

        <span style={{ color: t.text }} className="text-sm font-bold block mb-3">{data.buyer_guide.due_diligence_title}</span>
        <div className="space-y-2 mb-8">
          {data.buyer_guide.due_diligence.map((item, i) => (
            <div key={i} className="flex gap-3 items-start rounded-xl p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#ffffff", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: GOLD_BG, color: GOLD, border: `1px solid ${GOLD_BORDER}` }}>{i + 1}</span>
              <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="rounded-xl p-4 mb-4" style={{ background: t.isDark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <div className="flex gap-2 items-start">
            <span className="text-sm mt-0.5">⚠️</span>
            <p className="text-xs leading-relaxed" style={{ color: t.isDark ? "#fcd34d" : "#92400e" }}>
              <strong>Trust & Transparency Note:</strong> {data.trust_note}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <p style={{ color: t.textMuted }} className="text-[11px] leading-relaxed">{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default CompletedReviewsSection;
