"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import {
  Award,
  Building2,
  ChevronDown,
  ChevronUp,
  FileText,
  LineChart,
  Trophy,
} from "lucide-react";

const GOLD = "#B68A35";
const SILVER = "#9CA3AF";
const BRONZE = "#CD7F32";

const gradeConfig = {
  Gold: { color: GOLD, icon: "/home/Gold.svg", bg: "rgba(182,138,53,0.10)", border: "rgba(182,138,53,0.25)" },
  Silver: { color: SILVER, icon: "/home/Silver.svg", bg: "rgba(156,163,175,0.10)", border: "rgba(156,163,175,0.25)" },
  Bronze: { color: BRONZE, icon: "/home/Bronze.svg", bg: "rgba(205,127,50,0.10)", border: "rgba(205,127,50,0.25)" },
};

const highlightText = (text, phrases = []) => {
  if (!text || phrases.length === 0) return text;

  const pattern = new RegExp(`(${phrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");

  return text.split(pattern).map((part, index) => {
    const isHighlighted = phrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase());
    return isHighlighted ? (
      <strong key={`${part}-${index}`} style={{ color: GOLD }}>
        {part}
      </strong>
    ) : (
      part
    );
  });
};

const renderAccentText = (text, accent) => {
  if (!text || !accent || !text.includes(accent)) return text;

  return text.split(accent).map((part, index, parts) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && <span style={{ color: GOLD }}>{accent}</span>}
    </span>
  ));
};

const TrustIndexSection = ({ data }) => {
  const { t } = useTheme();
  const [expandedRow, setExpandedRow] = useState(data.default_expanded_index ?? 1);
  const mobileLabels = data.mobile_labels;
  const serviceChargeUnit = data.service_charge_unit;

  const GradeBadge = ({ grade }) => {
    const cfg = gradeConfig[grade] || gradeConfig.Bronze;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
      >
        <Image src={cfg.icon} alt={`${grade} badge`} width={20} height={20} />
        {grade}
      </span>
    );
  };

  const DeveloperIdentity = ({ dev, compact = false }) => (
    <span className="flex items-center gap-3 min-w-0">
      <span
        className={`${compact ? "w-12 h-12" : "w-11 h-11"} relative flex-shrink-0 overflow-hidden rounded-sm`}
        style={{ background: "linear-gradient(135deg, rgba(182,138,53,0.95), rgba(207,164,74,0.9))" }}
      >
        {dev.logo ? (
          <Image
            src={dev.logo}
            alt={dev.name}
            fill
            sizes={compact ? "48px" : "44px"}
            className="object-contain p-1"
          />
        ) : (
          <Building2 size={compact ? 24 : 22} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
        )}
      </span>
      <span className="min-w-0">
        <span className={`${compact ? "text-sm" : "text-[13px]"} block font-semibold truncate`} style={{ color: t.text }}>
          {dev.name}
        </span>
        {compact && (
          <span className="mt-0.5 block text-xs truncate" style={{ color: t.textMuted }}>
            {dev.mobile_summary}
          </span>
        )}
      </span>
    </span>
  );

  return (
    <section style={{ background: t.bgAlt }} className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div
          className="relative overflow-hidden rounded-[28px] p-5 sm:p-7 lg:min-h-[295px] lg:p-8"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.04)" : "#fbf8f1",
            border: "1px solid rgba(182,138,53,0.14)",
          }}
        >
          <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
            <Image
              src={data.header_image}
              alt=""
              fill
              priority
              sizes="56vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: t.isDark
                  ? "linear-gradient(to right, rgba(26,28,31,0.96), rgba(26,28,31,0.68), rgba(26,28,31,0))"
                  : "linear-gradient(to right, rgba(251,248,241,1), rgba(251,248,241,0.7), rgba(251,248,241,0))",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: t.isDark
                  ? "linear-gradient(to top, rgba(26,28,31,0.62), rgba(26,28,31,0), rgba(26,28,31,0.24))"
                  : "linear-gradient(to top, rgba(251,248,241,0.55), rgba(251,248,241,0), rgba(251,248,241,0.2))",
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{
                background: "rgba(182,138,53,0.08)",
                color: GOLD,
                border: "1px solid rgba(182,138,53,0.20)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
              {data.last_updated_label} {data.last_updated}
            </span>

            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ color: t.text }}>
              {renderAccentText(data.h2, data.h2_accent)}
            </h2>

            <div className="mt-6 space-y-4 border-l-2 pl-4 text-sm leading-relaxed sm:text-base" style={{ borderColor: GOLD, color: t.textSecondary }}>
              <p>{highlightText(data.h3, data.h3_highlights)}</p>
              <p>{highlightText(data.trust_statement, data.trust_statement_highlights)}</p>
            </div>
          </div>
        </div>

        {/* ── Leaderboard Header ── */}
        <div className="mt-10 mb-5 flex items-start gap-4 lg:mt-12">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(182,138,53,0.08)", color: GOLD }}
          >
            <Trophy size={28} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold sm:text-2xl" style={{ color: t.text }}>
              {renderAccentText(data.leaderboard_title, data.leaderboard_title_accent)}
            </h3>
            <p className="mt-1 max-w-lg text-xs sm:text-sm" style={{ color: t.textMuted }}>
              {data.leaderboard_subtitle}
            </p>
          </div>
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden lg:block overflow-hidden rounded-2xl shadow-sm" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <div className="overflow-x-auto scrollbar-theme">
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#fbf8f1" }}>
                  {data.columns.map((col, i) => (
                    <th
                      key={i}
                      className="px-4 py-4 text-left text-[11px] font-bold leading-snug"
                      style={{
                        color: t.text,
                        borderBottom: `1px solid ${t.cardBorder}`,
                        width: i === 0 ? "19%" : i === 1 ? "14%" : i === 2 ? "18%" : i === 3 ? "15%" : i === 4 ? "18%" : "16%",
                      }}
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
                      background: t.cardBg,
                      borderBottom: `1px solid ${t.cardBorder}`,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(182,138,53,0.04)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = t.cardBg}
                  >
                    <td className="px-4 py-3.5">
                      <a href={dev.link || "#"} className="inline-flex max-w-full">
                        <DeveloperIdentity dev={dev} />
                      </a>
                    </td>
                    <td className="px-4 py-3.5"><GradeBadge grade={dev.grade} /></td>
                    <td className="px-4 py-3.5 text-xs leading-relaxed" style={{ color: t.textSecondary }}>{dev.delivery}</td>
                    <td className="px-4 py-3.5 text-xs font-semibold whitespace-nowrap" style={{ color: t.text }}>{dev.service_charges}</td>
                    <td className="px-4 py-3.5 text-xs leading-relaxed" style={{ color: t.textSecondary }}>{dev.projects}</td>
                    <td className="px-4 py-3.5 text-xs leading-relaxed" style={{ color: t.textMuted }}>{dev.positioning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="lg:hidden flex flex-col gap-2.5">
          {data.developers.map((dev, i) => {
            const isOpen = expandedRow === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-xl transition-all duration-200 shadow-sm"
                style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
              >
                <button
                  onClick={() => setExpandedRow(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-3.5 py-3 text-left"
                >
                  <span className="min-w-0 flex-1">
                    <DeveloperIdentity dev={dev} compact />
                  </span>
                  <div className="flex-shrink-0">
                    <GradeBadge grade={dev.grade} />
                  </div>
                  {isOpen
                    ? <ChevronUp size={16} style={{ color: t.textMuted, flexShrink: 0 }} />
                    : <ChevronDown size={16} style={{ color: t.textMuted, flexShrink: 0 }} />
                  }
                </button>

                {isOpen && (
                  <div className="mx-3.5 mb-3 grid grid-cols-2 gap-0 border-t pt-3" style={{ borderColor: t.cardBorder }}>
                    <div className="border-r pr-3" style={{ borderColor: t.cardBorder }}>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>{mobileLabels.delivery}</p>
                      <p className="mt-1 text-xs font-semibold leading-relaxed" style={{ color: t.text }}>{dev.delivery}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>{mobileLabels.service_charges}</p>
                      <p className="mt-1 text-xs font-semibold leading-relaxed" style={{ color: t.text }}>{dev.service_charges} {serviceChargeUnit}</p>
                    </div>
                    <div className="mt-4 border-r pr-3" style={{ borderColor: t.cardBorder }}>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>{mobileLabels.projects}</p>
                      <p className="mt-1 text-xs font-semibold leading-relaxed" style={{ color: t.textSecondary }}>
                        {dev.projects.split(", ").map((project) => (
                          <span key={project} className="block">• {project}</span>
                        ))}
                      </p>
                    </div>
                    <div className="mt-4 pl-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>{mobileLabels.positioning}</p>
                      <p className="mt-1 text-xs leading-relaxed" style={{ color: t.textSecondary }}>{dev.positioning}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Key Insights ── */}
        <div className="mt-12 lg:mt-14">
          <h3 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl" style={{ color: t.text }}>
            {renderAccentText(data.insights_title, data.insights_title_accent)}
          </h3>
          <div className="mt-3 h-0.5 w-16" style={{ background: GOLD }} />

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {data.insights.map((insight, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl shadow-sm"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(182,138,53,0.08)", color: GOLD }}
                  >
                    {i === 0 ? <Building2 size={30} strokeWidth={1.4} /> : <LineChart size={30} strokeWidth={1.4} />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                      {insight.headline}
                    </h4>
                    <h5 className="mt-1 text-2xl font-bold leading-tight" style={{ color: t.text }}>
                      {renderAccentText(insight.display_title || insight.sub_headline, insight.display_title_accent)}
                    </h5>
                  </div>
                </div>

                {i === 0 ? (
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm" style={{ color: t.textSecondary }}>
                      <span>{insight.metric_label}</span>
                      <strong style={{ color: GOLD }}>{insight.metric_value}</strong>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full" style={{ background: "rgba(156,163,175,0.18)" }}>
                      <div className="h-full rounded-full" style={{ width: `${insight.metric_percent}%`, background: GOLD }} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs sm:text-sm" style={{ color: t.textMuted }}>
                      <span>{insight.delayed_units_label}</span>
                      <span>{insight.total_units_label}</span>
                    </div>
                    <p className="mt-6 text-sm leading-7 sm:text-base" style={{ color: t.textSecondary }}>
                      {highlightText(insight.content, insight.content_highlights)}
                    </p>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div className="grid grid-cols-3 gap-3">
                      {insight.grade_cards?.map((item) => {
                        const cfg = gradeConfig[item.grade];
                        return (
                          <div
                            key={item.grade}
                            className="rounded-lg px-2 py-3 text-center"
                            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                          >
                            <Image src={cfg.icon} alt={`${item.grade} badge`} width={28} height={28} className="mx-auto mb-1.5" />
                            <p className="text-xs font-semibold" style={{ color: cfg.color }}>{item.grade}</p>
                            <p className="mt-1 text-[10px] leading-snug" style={{ color: t.textMuted }}>
                              {item.summary}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-6 text-sm leading-7 sm:text-base" style={{ color: t.textSecondary }}>
                      {highlightText(insight.content, insight.content_highlights)}
                    </p>
                  </div>
                )}
              </div>

              <div
                className="flex items-center gap-2 border-t px-5 py-3 text-xs sm:px-6"
                style={{
                  borderColor: t.cardBorder,
                  color: t.textMuted,
                  background: t.isDark ? "rgba(255,255,255,0.04)" : "#fbf8f1",
                }}
              >
                <FileText size={17} style={{ color: GOLD }} />
                <span>{data.source_label} {insight.source}</span>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="mt-8 rounded-2xl p-5 shadow-sm sm:p-6 lg:mt-6"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-lg font-bold" style={{ color: t.text }}>
                <Award size={26} style={{ color: GOLD }} strokeWidth={1.6} />
                {data.footer.title}
              </h4>
              <p className="max-w-3xl text-xs leading-relaxed sm:text-sm" style={{ color: t.textSecondary }}>
                {data.footer.attribution}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:min-w-[520px]">
              <a
                href={data.footer.primary_cta_link}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-sm font-semibold transition-all duration-200"
                style={{ background: GOLD, color: "#fff" }}
              >
                {data.footer.primary_cta}
              </a>
              <button
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-sm font-semibold transition-all duration-200"
                style={{ color: GOLD, border: `1px solid rgba(182,138,53,0.35)`, background: "rgba(182,138,53,0.03)" }}
              >
                {data.footer.secondary_cta}
              </button>
            </div>
          </div>

          <p className="mt-5 text-center text-[10px] lg:text-left" style={{ color: t.textMuted }}>
            {data.footer.disclaimer.replace("{{date}}", data.last_updated)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndexSection;
