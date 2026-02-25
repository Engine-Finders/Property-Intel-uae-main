"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

/* ── Animated sentiment bar ── */
const SentimentBar = ({ item, t }) => {
  const [w, setW] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(item.percent); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [item.percent]);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-bold" style={{ color: t.text }}>{item.label}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: item.color + "20", color: item.color }}>{item.percent}%</span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: t.isDark ? "#2a2d33" : "#e2e8f0" }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: item.color }} />
      </div>
      <p className="text-[10px] leading-relaxed mt-1.5 italic" style={{ color: t.textMuted }}>{item.themes}</p>
    </div>
  );
};

/* ── Quote card ── */
const QuoteCard = ({ quote, accentColor, t }) => (
  <div className="rounded-lg p-4 mb-3" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", borderLeft: `3px solid ${accentColor}`, border: `1px solid ${t.cardBorder}`, borderLeftWidth: "3px", borderLeftColor: accentColor }}>
    <p className="text-xs leading-relaxed italic mb-2" style={{ color: t.textSecondary }}>"{quote.text}"</p>
    <p className="text-[10px] font-semibold" style={{ color: t.textMuted }}>— {quote.source}</p>
  </div>
);

/* ── Tab button ── */
const TabBtn = ({ label, active, onClick, t }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap"
    style={{
      background: active ? "#B68A35" : "transparent",
      color: active ? "#fff" : t.textMuted,
      border: active ? "none" : `1px solid ${t.cardBorder}`,
    }}
  >
    {label}
  </button>
);

/* ── Responsive table ── */
const MobileCards = ({ headers, rows, t }) => (
  <div className="space-y-3">
    {rows.map((row, i) => (
      <div key={i} className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
        {headers.map((h, j) => (
          <div key={j} className={`flex justify-between py-1.5 ${j < headers.length - 1 ? "border-b" : ""}`} style={{ borderColor: t.cardBorder }}>
            <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>{h}</span>
            <span className="text-[11px] font-semibold text-right max-w-[60%]" style={{ color: t.text }}>{row[j]}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const DesktopTable = ({ headers, rows, t }) => (
  <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${t.cardBorder}` }}>
    <table className="w-full text-xs">
      <thead>
        <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
          {headers.map((h, i) => (
            <th key={i} className="text-left px-4 py-3 font-semibold" style={{ color: t.textMuted, borderBottom: `1px solid ${t.cardBorder}` }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${t.cardBorder}` : "none" }}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3" style={{ color: j === 0 ? t.text : t.textSecondary, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ── Main Component ── */
const ReviewsSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("sentiment");

  const sentiment = data.sentiment || {};
  const quotes = data.quotes || {};
  const pattern = data.pattern_analysis || {};
  const future = data.future_reviews || {};

  const tabs = [
    { key: "sentiment", label: "Sentiment" },
    { key: "quotes", label: "Quotes" },
    { key: "patterns", label: "Patterns" },
    { key: "future", label: "Future" },
  ];

  return (
    <section id="reviews" className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ background: t.bgAlt }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4" style={{ background: "#B68A3520", color: "#B68A35" }}>
            {data.badge}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: t.text }}>{data.title}</h2>
          <p className="text-sm mb-4" style={{ color: t.textMuted }}>{data.subtitle}</p>
          <p className="text-xs leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>{data.methodology}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {tabs.map((tab) => (
            <TabBtn key={tab.key} label={tab.label} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)} t={t} />
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-xl p-5 lg:p-7 mb-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>

          {/* Sentiment Tab */}
          {activeTab === "sentiment" && (
            <div>
              <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: t.text }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>📊</span>
                {sentiment.title}
              </h3>
              {(sentiment.items || []).map((item, i) => (
                <SentimentBar key={i} item={item} t={t} />
              ))}
              <p className="text-[10px] italic mt-2" style={{ color: t.textMuted }}>Source: {sentiment.source}</p>
            </div>
          )}

          {/* Quotes Tab */}
          {activeTab === "quotes" && (
            <div>
              <h3 className="text-sm font-bold mb-4" style={{ color: t.text }}>Representative Quotes</h3>

              <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#22C55E" }}>Positive</p>
              {(quotes.positive || []).map((q, i) => (
                <QuoteCard key={i} quote={q} accentColor="#22C55E" t={t} />
              ))}

              <p className="text-[10px] font-bold uppercase tracking-wider mb-3 mt-5" style={{ color: "#F59E0B" }}>Mixed</p>
              {(quotes.mixed || []).map((q, i) => (
                <QuoteCard key={i} quote={q} accentColor="#F59E0B" t={t} />
              ))}

              <p className="text-[10px] font-bold uppercase tracking-wider mb-3 mt-5" style={{ color: "#3B82F6" }}>Constructive</p>
              {(quotes.constructive || []).map((q, i) => (
                <QuoteCard key={i} quote={q} accentColor="#3B82F6" t={t} />
              ))}
            </div>
          )}

          {/* Patterns Tab */}
          {activeTab === "patterns" && (
            <div>
              <h3 className="text-sm font-bold mb-4" style={{ color: t.text }}>{pattern.title}</h3>
              <div className="block lg:hidden">
                <MobileCards headers={pattern.headers || []} rows={pattern.rows || []} t={t} />
              </div>
              <div className="hidden lg:block">
                <DesktopTable headers={pattern.headers || []} rows={pattern.rows || []} t={t} />
              </div>
            </div>
          )}

          {/* Future Tab */}
          {activeTab === "future" && (
            <div>
              <h3 className="text-sm font-bold mb-4" style={{ color: t.text }}>{future.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>As The Heights matures, we anticipate resident feedback will centre on:</p>
              <ul className="space-y-3">
                {(future.items || []).map((item, i) => (
                  <li key={i} className="flex gap-2 items-start text-xs leading-relaxed" style={{ color: t.textSecondary }}>
                    <span className="shrink-0 mt-0.5" style={{ color: "#B68A35" }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Transparency Note */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <div className="flex gap-2 items-start">
            <span className="text-sm mt-0.5">⚠️</span>
            <p className="text-xs leading-relaxed" style={{ color: t.isDark ? "#fcd34d" : "#92400e" }}>
              <strong>Transparency Note:</strong> {data.transparency_note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
