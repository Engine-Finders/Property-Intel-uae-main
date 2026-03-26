"use client"
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { TrendingUp, TrendingDown, Minus, Download, ExternalLink } from "lucide-react";

const GOLD = "#B68A35";
const DARK_NAVY = "#3B4A6B";
const GREEN = "#22C55E";
const BLUE = "#286CFF";

/* ── Donut Chart (SVG) ── */
const DonutChart = ({ data, size = 180 }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = 70;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 32;

  let cumulative = 0;
  const segments = data.map((d) => {
    const pct = d.value / total;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray * (1 - pct);
    const rotation = cumulative * 360 - 90;
    cumulative += pct;
    return { ...d, dashArray, dashOffset, rotation };
  });

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={seg.dashArray}
            strokeDashoffset={seg.dashOffset}
            transform={`rotate(${seg.rotation} ${cx} ${cy})`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: GOLD }}>{data[0].value}%</span>
        <span className="text-[11px] font-medium" style={{ color: DARK_NAVY }}>Off-Plan</span>
      </div>
    </div>
  );
};

/* ── Horizontal Bar Chart ── */
const HorizontalBarChart = ({ data, t }) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium" style={{ color: t.text }}>{item.area}</span>
            <span className="text-xs font-semibold" style={{ color: GOLD }}>{item.display}</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(item.value / maxVal) * 100}%`,
                background: `linear-gradient(90deg, ${GOLD}, ${GOLD}cc)`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Improved Horizontal Bar Chart (Desktop) ── */
const ImprovedHorizontalBarChart = ({ data, t }) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  const trackBg = t.isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)"; // light grey track
  const subtleGold = `rgba(182,138,53,${t.isDark ? 0.35 : 0.25})`;

  return (
    <div className="space-y-4">
      {data.map((item, i) => {
        const pct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
        return (
          <div key={i} className="flex items-center gap-4">
            {/* Area name (left) */}
            <div
              className="text-xs font-medium truncate"
              style={{ color: t.textSecondary, width: 150 }}
              title={item.area}
            >
              {item.area}
            </div>

            {/* Track + thin gold bar (middle) */}
            <div className="flex-1 min-w-0">
              <div
                className="relative w-full h-4 rounded-full overflow-hidden"
                style={{ background: trackBg }}
              >
                {/* gold bar on top representing value */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${GOLD}, ${GOLD}cc)`,
                  }}
                />
              </div>
            </div>

            {/* Value (right aligned end of bar container) */}
            <div
              className="text-[11px] font-semibold whitespace-nowrap text-right"
              style={{ color: t.isDark ? "#ffffff" : "#111827", width: 90 }}
            >
              {item.display}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── Trend Icon ── */
const TrendIcon = ({ direction }) => {
  if (direction === "up") return <TrendingUp size={13} color={GREEN} />;
  if (direction === "down") return <TrendingDown size={13} color="#EF4444" />;
  return <Minus size={13} color={GOLD} />;
};

/* ── Main Section ── */
const MarketPulseSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const tabs = data.tabs || [];
  const metrics = data.metrics || [];
  const footer = data.footer || {};
  const currentTab = tabs[activeTab] || {};

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const getSortedTable = (tableData) => {
    if (!sortKey || !tableData) return tableData;
    return [...tableData].sort((a, b) => {
      const aVal = a[sortKey] || "";
      const bVal = b[sortKey] || "";
      const cmp = aVal.localeCompare ? aVal.localeCompare(bVal) : 0;
      return sortAsc ? cmp : -cmp;
    });
  };

  const footerText = (footer.attribution || "").replace("{{date}}", data.last_updated);

  return (
    <section className="py-6 lg:py-8" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: t.text }}>
              {data.h2}
            </h2>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide shrink-0 self-start"
              style={{
                background: t.isDark ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.08)",
                color: GOLD,
                border: "1px solid rgba(182,138,53,0.25)"
              }}
            >
              Last Updated: {data.last_updated}
            </span>
          </div>
          <p className="text-sm lg:text-base leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>
            {data.h3}
          </p>
        </div>

        {/* ── Metric Tiles ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-xl p-4 transition-all duration-200"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                border: `1px solid ${t.cardBorder}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = GOLD;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 24px -8px rgba(182,138,53,0.15)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.cardBorder;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <p className="text-[11px] font-medium mb-2 leading-snug" style={{ color: t.textMuted }}>
                {m.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl lg:text-2xl font-bold" style={{ color: t.text }}>
                  {m.value}
                </span>
                {m.sub_value && (
                  <span className="text-[11px] font-medium" style={{ color: t.textSecondary }}>
                    {m.sub_value}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendIcon direction={m.trend_direction} />
                <span className="text-[11px] font-semibold" style={{
                  color: m.trend_direction === "up" ? GREEN : m.trend_direction === "down" ? "#EF4444" : GOLD
                }}>
                  {m.trend}
                </span>
              </div>
              <p className="text-[10px] mt-1.5" style={{ color: t.textMuted }}>{m.context}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="mb-4">
          <div
            className="flex flex-wrap gap-0 rounded-xl overflow-hidden"
            style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9" }}
          >
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(i); setSortKey(null); }}
                className="flex-1 min-w-[140px] px-4 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 text-center"
                style={{
                  background: activeTab === i
                    ? (t.isDark ? GOLD : GOLD)
                    : "transparent",
                  color: activeTab === i
                    ? "#ffffff"
                    : t.textSecondary,
                  borderBottom: activeTab === i ? "none" : `2px solid transparent`,
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div
          className="rounded-xl p-5 sm:p-8"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
            border: `1px solid ${t.cardBorder}`
          }}
        >
          {/* TAB: Donut */}
          {currentTab.chart_type === "donut" && (
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <div className="flex flex-col items-center gap-4">
                <DonutChart data={currentTab.chart_data} />
                <div className="flex gap-4">
                  {(currentTab.chart_data || []).map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
                      <span className="text-xs font-medium" style={{ color: t.textSecondary }}>
                        {d.label} ({d.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold mb-1" style={{ color: t.text }}>
                  {currentTab.sub_title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>
                  {currentTab.content}
                </p>
                <p className="mt-4 text-[11px] font-medium" style={{ color: t.textMuted }}>
                  Source: {currentTab.source}
                </p>
              </div>
            </div>
          )}

          {/* TAB: Table */}
          {currentTab.chart_type === "table" && (
            <div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: t.textSecondary }}>
                {currentTab.intro}
              </p>
              {/* Mobile: cards instead of table */}
              <div className="lg:hidden space-y-3">
                {getSortedTable(currentTab.table_data || []).map((row, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4"
                    style={{
                      background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
                      border: `1px solid ${t.cardBorder}`,
                    }}
                  >
                    <div className="text-xs font-medium" style={{ color: t.textSecondary }}>
                      {row.area}
                    </div>
                    <div className="mt-1 text-[14px] font-bold" style={{ color: GOLD }}>
                      {row.price}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed" style={{ color: t.textSecondary }}>
                      {row.insight}
                    </p>
                  </div>
                ))}
              </div>

              {/* Desktop: keep current table */}
              <div className="hidden lg:block overflow-x-auto rounded-lg" style={{ border: `1px solid ${t.cardBorder}` }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: t.isDark ? "rgba(255,255,255,0.05)" : "#f8fafc" }}>
                      <th
                        className="text-left px-4 py-3 text-xs font-semibold cursor-pointer select-none"
                        style={{ color: t.textMuted }}
                        onClick={() => handleSort("area")}
                      >
                        Area {sortKey === "area" ? (sortAsc ? "↑" : "↓") : ""}
                      </th>
                      <th
                        className="text-left px-4 py-3 text-xs font-semibold cursor-pointer select-none"
                        style={{ color: t.textMuted }}
                        onClick={() => handleSort("price")}
                      >
                        Price/Sq.Ft {sortKey === "price" ? (sortAsc ? "↑" : "↓") : ""}
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: t.textMuted }}>
                        Insight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedTable(currentTab.table_data || []).map((row, i) => (
                      <tr
                        key={i}
                        className="transition-colors"
                        style={{ borderTop: `1px solid ${t.cardBorder}` }}
                        onMouseEnter={(e) => e.currentTarget.style.background = t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <td className="px-4 py-3 font-medium" style={{ color: t.text }}>{row.area}</td>
                        <td className="px-4 py-3 font-semibold" style={{ color: GOLD }}>{row.price}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: t.textSecondary }}>{row.insight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[11px] font-medium" style={{ color: t.textMuted }}>
                Source: {currentTab.source}
              </p>
            </div>
          )}

          {/* TAB: Bar Chart */}
          {currentTab.chart_type === "bar" && (
            <div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: t.textSecondary }}>
                {currentTab.intro}
              </p>
              {/* Keep current mobile, improve on desktop */}
              <div className="lg:hidden">
                <HorizontalBarChart data={currentTab.bar_data || []} t={t} />
              </div>
              <div className="hidden lg:block">
                <ImprovedHorizontalBarChart data={currentTab.bar_data || []} t={t} />
              </div>
              <div
                className="mt-6 p-4 rounded-lg"
                style={{
                  background: t.isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.05)",
                  border: "1px solid rgba(182,138,53,0.2)"
                }}
              >
                <p className="text-xs font-medium" style={{ color: GOLD }}>
                  💡 Insight: {currentTab.insight}
                </p>
              </div>
              <p className="mt-4 text-[11px] font-medium" style={{ color: t.textMuted }}>
                Source: {currentTab.source}
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
          <p className="text-xs leading-relaxed mb-6" style={{ color: t.textMuted }}>
            {footerText}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200"
              style={{ background: GOLD }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <Download size={16} />
              {footer.primary_cta}
            </button>
            <a
              href={footer.secondary_link_url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              style={{ color: GOLD, border: `1.5px solid ${GOLD}` }}
            >
              {footer.secondary_link_text}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPulseSection;
