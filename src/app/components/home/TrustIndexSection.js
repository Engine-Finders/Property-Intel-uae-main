"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import { Shield, ArrowRight, AlertTriangle, TrendingUp, Award, ChevronDown, ChevronUp } from "lucide-react";

const GOLD = "#B68A35";
const SILVER = "#9CA3AF";
const BRONZE = "#CD7F32";

const gradeConfig = {
  Gold: { color: GOLD, icon: "/home/Gold.svg", bg: "rgba(182,138,53,0.10)", border: "rgba(182,138,53,0.25)" },
  Silver: { color: SILVER, icon: "/home/Silver.svg", bg: "rgba(156,163,175,0.10)", border: "rgba(156,163,175,0.25)" },
  Bronze: { color: BRONZE, icon: "/home/Bronze.svg", bg: "rgba(205,127,50,0.10)", border: "rgba(205,127,50,0.25)" },
};

const TrustIndexSection = ({ data }) => {
  const { t } = useTheme();
  const [expandedRow, setExpandedRow] = useState(null);

  const GradeBadge = ({ grade }) => {
    const cfg = gradeConfig[grade] || gradeConfig.Bronze;
    return (
      <span
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
      >
        <Image src={cfg.icon} alt={`${grade} badge`} width={22} height={22} />
        {grade}
      </span>
    );
  };

  return (
    <section style={{ background: t.bgAlt }} className="py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 items-start">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
            style={{ color: t.text }}
          >
            {data.h2}
          </h2>
          <span
            className="shrink-0 self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(182,138,53,0.10)",
              color: GOLD,
              border: "1px solid rgba(182,138,53,0.20)",
            }}
          >
            Last Updated: {data.last_updated}
          </span>
        </div>

        <p
          className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl"
          style={{ color: t.textSecondary }}
        >
          {data.h3}
        </p>

        {/* ── Trust Statement ── */}
        <div
          className="mt-6 p-4 rounded-xl flex items-start gap-3"
          style={{
            background: "rgba(182,138,53,0.06)",
            border: "1px solid rgba(182,138,53,0.15)",
          }}
        >
          <Shield size={18} style={{ color: GOLD, marginTop: 2, flexShrink: 0 }} />
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: t.textSecondary }}>
            {data.trust_statement}
          </p>
        </div>

        {/* ── Leaderboard Header ── */}
        <div className="mt-12 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold" style={{ color: t.text }}>
            {data.leaderboard_title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm" style={{ color: t.textMuted }}>
            {data.leaderboard_subtitle}
          </p>
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden lg:block rounded-2xl overflow-hidden" style={{ border: `1px solid ${t.cardBorder}` }}>
          <div className="overflow-x-auto scrollbar-theme">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(182,138,53,0.08)" }}>
                  {data.columns.map((col, i) => (
                    <th
                      key={i}
                      className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{ color: GOLD, borderBottom: `2px solid rgba(182,138,53,0.20)` }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.developers.map((dev, i) => (
                  <tr
                    key={i}
                    className="transition-colors duration-150"
                    style={{
                      background: i % 2 === 0 ? t.cardBg : "transparent",
                      borderBottom: `1px solid ${t.cardBorder}`,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(182,138,53,0.04)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? t.cardBg : "transparent"}
                  >
                    <td className="px-4 py-3.5 font-semibold whitespace-nowrap" style={{ color: t.text }}>
                      {dev.link ? (
                        <a href={dev.link} className="hover:underline" style={{ color: GOLD }}>{dev.name}</a>
                      ) : dev.name}
                    </td>
                    <td className="px-4 py-3.5"><GradeBadge grade={dev.grade} /></td>
                    <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: t.textSecondary }}>{dev.delivery}</td>
                    <td className="px-4 py-3.5 font-semibold whitespace-nowrap" style={{ color: t.text }}>{dev.service_charges}</td>
                    <td className="px-4 py-3.5" style={{ color: t.textSecondary }}>{dev.projects}</td>
                    <td className="px-4 py-3.5 text-xs" style={{ color: "#7d89a3" }}>{dev.positioning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="lg:hidden flex flex-col gap-3">
          {data.developers.map((dev, i) => {
            const isOpen = expandedRow === i;
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
              >
                <button
                  onClick={() => setExpandedRow(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
                >
                  <span
                    className="flex-1 text-sm font-semibold truncate"
                    style={{ color: t.text }}
                  >
                    {dev.name}
                  </span>
                  <div className="flex-shrink-0 w-[110px] flex justify-center">
                    <GradeBadge grade={dev.grade} />
                  </div>
                  {isOpen
                    ? <ChevronUp size={16} style={{ color: t.textMuted, flexShrink: 0 }} />
                    : <ChevronDown size={16} style={{ color: t.textMuted, flexShrink: 0 }} />
                  }
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 grid grid-cols-2 gap-3" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
                    <div className="pt-3">
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Delivery</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: t.text }}>{dev.delivery}</p>
                    </div>
                    <div className="pt-3">
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Service Charges</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: t.text }}>{dev.service_charges}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>2026 Projects</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: t.textSecondary }}>{dev.projects}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Positioning</p>
                      <p className="text-xs mt-0.5" style={{ color: "#c0c7d6" }}>{dev.positioning}</p>
                    </div>
                    {dev.link && (
                      <div className="col-span-2">
                        <a
                          href={dev.link}
                          className="inline-flex items-center gap-1 text-xs font-semibold"
                          style={{ color: GOLD }}
                        >
                          View Full Audit <ArrowRight size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Key Insights ── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.insights.map((insight, i) => (
            <div
              key={i}
              className="pl-5 flex flex-col"
              style={{ borderLeft: `3px solid ${GOLD}` }}
            >
              <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>
                {insight.headline}
              </h4>
              <h5 className="text-base sm:text-lg font-bold mb-2" style={{ color: t.text }}>
                {insight.sub_headline}
              </h5>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: t.textSecondary }}>
                {insight.content}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>
                Source: {insight.source}
              </p>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div
          className="mt-12 p-5 sm:p-6 rounded-2xl"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <h4 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: t.text }}>
            <Award size={14} style={{ color: GOLD }} />
            Methodology & Attribution
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: t.textSecondary }}>
            {data.footer.attribution}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href={data.footer.primary_cta_link}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{ background: GOLD, color: "#fff" }}
            >
              {data.footer.primary_cta}
              <ArrowRight size={14} />
            </a>
            <button
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{ color: GOLD, border: `1px solid rgba(182,138,53,0.35)`, background: "rgba(182,138,53,0.06)" }}
            >
              {data.footer.secondary_cta}
              <ArrowRight size={14} />
            </button>
          </div>

          <p className="mt-4 text-[10px]" style={{ color: t.textMuted }}>
            {data.footer.disclaimer.replace("{{date}}", data.last_updated)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndexSection;
