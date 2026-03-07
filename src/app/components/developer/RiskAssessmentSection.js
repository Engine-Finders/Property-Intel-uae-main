"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

/* ── Chevron (small) ── */
const ChevronSmall = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }} className="ml-1">
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Risk Card (Box layout) ── */
const RiskCard = ({ category, level, value, explanation, source, t }) => {
  const [width, setWidth] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(value); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const barColor = value >= 60 ? "#EF4444" : value >= 35 ? "#F59E0B" : "#22C55E";
  const isExpanded = expanded;
  const handleToggle = () => setExpanded((p) => !p);

  return (
    <div
      ref={ref}
      className="rounded-xl p-5 cursor-pointer transition-all flex flex-col min-h-[140px] self-start"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
        border: `1px solid ${isExpanded ? barColor + "40" : t.cardBorder}`,
      }}
      onClick={handleToggle}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: barColor + "18", color: barColor }}
        >
          {level}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ color: t.textMuted, transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-xs font-bold mb-3" style={{ color: t.text }}>{category}</p>
      <div className="h-1.5 rounded-full overflow-hidden mt-auto" style={{ background: t.isDark ? "#2a2d33" : "#e2e8f0" }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: barColor }}
        />
      </div>
      {isExpanded && (
        <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
          <p className="text-[11px] leading-relaxed mb-2" style={{ color: t.textSecondary }}>{explanation}</p>
          {source && (
            <p className="text-[10px] italic" style={{ color: t.textMuted }}>Source: {source}</p>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Suitability Card (items as simple text accordions) ── */
const SuitabilityItemAccordion = ({ item, color, t }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-1.5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
      >
        <span className="text-xs font-semibold" style={{ color: t.text }}>{item.label}</span>
        <span style={{ color: t.textMuted }}><ChevronSmall open={open} /></span>
      </button>
      {open && (
        <p className="text-[11px] leading-relaxed mt-1.5 pr-4" style={{ color: t.textSecondary }}>{item.detail}</p>
      )}
    </div>
  );
};

const SuitabilityCard = ({ items, color, icon, title, t }) => (
  <div className="rounded-xl p-5 h-full" style={{ background: color + "08", border: `1px solid ${color}25` }}>
    <div className="flex items-center gap-2 mb-3">
      <span className="text-sm">{icon}</span>
      <span className="text-xs font-bold" style={{ color }}>{title}</span>
    </div>
    <div className="space-y-0">
      {items.map((item, i) => (
        <SuitabilityItemAccordion key={i} item={item} color={color} t={t} />
      ))}
    </div>
  </div>
);

/* ── Responsive Table (Mobile Cards / Desktop Table) ── */
const MobileCards = ({ headers, rows, t }) => (
  <div className="space-y-3">
    {rows.map((row, i) => (
      <div
        key={i}
        className="rounded-lg p-4"
        style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}
      >
        {headers.map((h, j) => (
          <div key={j} className={`flex justify-between py-1.5 ${j < headers.length - 1 ? "border-b" : ""}`} style={{ borderColor: t.cardBorder }}>
            <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>{h}</span>
            <span
              className="text-[11px] font-semibold text-right max-w-[55%]"
              style={{ color: h === "Frequency" ? getFrequencyColor(row[j]) : t.text }}
            >
              {row[j]}
            </span>
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
              <td
                key={j}
                className="px-4 py-3"
                style={{
                  color: j === 1 ? getFrequencyColor(cell) : t.text,
                  fontWeight: j === 1 ? 700 : 400,
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

function getFrequencyColor(text) {
  if (!text) return "#F59E0B";
  const lower = String(text).toLowerCase();
  if (lower.includes("frequent")) return "#EF4444";
  if (lower.includes("consistent")) return "#F59E0B";
  return "#F59E0B";
}

/* ── Mitigation Step ── */
const MitigationStep = ({ item, index, t }) => (
  <div
    className="rounded-lg p-4 flex gap-3 items-start"
    style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}
  >
    <span
      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
      style={{ background: "#B68A3520", color: "#B68A35" }}
    >
      {index + 1}
    </span>
    <div className="min-w-0">
      <p className="text-xs font-bold mb-1" style={{ color: t.text }}>{item.title}</p>
      <p className="text-[11px] leading-relaxed mb-1" style={{ color: t.textSecondary }}>{item.detail}</p>
      {item.source && (
        <p className="text-[10px] italic" style={{ color: t.textMuted }}>Source: {item.source}</p>
      )}
    </div>
  </div>
);

/* ── Main Component ── */
const RiskAssessmentSection = ({ data }) => {
  const { t } = useTheme();
  const [openKnownIssues, setOpenKnownIssues] = useState(false);
  const [openMitigation, setOpenMitigation] = useState(false);

  const radar = data.risk_radar || [];
  const suit = data.buyer_suitability || {};
  const issues = data.known_issues || {};
  const mitigation = data.mitigation_strategies || {};
  const analyst = data.analyst_insight || {};

  return (
    <section style={{ background: t.bg }} className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <span
              className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4"
              style={{ background: "#EF444420", color: "#EF4444" }}
            >
              {data.label}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: t.text }}>
              {data.title}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>
              {data.subtitle}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-24 lg:h-32">
            <Image
              src="/projects/villa-render-1.jpg"
              fill
              alt="Emaar Risk Assessment"
              className="object-cover"
            />
          </div>
        </div>

        {/* Risk Radar - 3 column boxes */}
        <div
          className="rounded-xl p-5 lg:p-7 mb-6"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: t.text }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#EF444420", color: "#EF4444" }}>📊</span>
            Risk Radar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
            {radar.map((r, i) => (
              <RiskCard key={i} {...r} t={t} />
            ))}
          </div>
        </div>

        {/* Buyer Suitability - 3 column boxes */}
        <div
          className="rounded-xl p-5 lg:p-7 mb-6"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: t.text }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#22C55E20", color: "#22C55E" }}>👤</span>
            Buyer Suitability — Who Should Buy from Emaar?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SuitabilityCard items={suit.best_for || []} color="#22C55E" icon="✅" title="Best For" t={t} />
            <SuitabilityCard items={suit.caution_for || []} color="#F59E0B" icon="⚠️" title="Caution For" t={t} />
            <SuitabilityCard items={suit.not_ideal_for || []} color="#EF4444" icon="✕" title="Not Ideal For" t={t} />
          </div>
        </div>

        {/* Known Issues Table — Accordion */}
        <div
          className="rounded-xl overflow-hidden mb-6"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <button
            onClick={() => setOpenKnownIssues(!openKnownIssues)}
            className="w-full p-5 lg:p-7 flex items-center justify-between gap-2 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#F59E0B20", color: "#F59E0B" }}>⚡</span>
              <div>
                <h3 className="text-sm font-bold" style={{ color: t.text }}>{issues.title}</h3>
                <p className="text-[11px] mt-0.5" style={{ color: t.textMuted }}>{issues.subtitle}</p>
              </div>
            </div>
            <span style={{ color: t.textMuted }}><ChevronSmall open={openKnownIssues} /></span>
          </button>
          {openKnownIssues && (
            <div className="px-5 lg:px-7 pb-5 lg:pb-7 pt-0" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
              <div className="block lg:hidden">
                <MobileCards headers={issues.headers || []} rows={issues.rows || []} t={t} />
              </div>
              <div className="hidden lg:block">
                <DesktopTable headers={issues.headers || []} rows={issues.rows || []} t={t} />
              </div>
            </div>
          )}
        </div>

        {/* Mitigation Strategies — Accordion */}
        <div
          className="rounded-xl overflow-hidden mb-6"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <button
            onClick={() => setOpenMitigation(!openMitigation)}
            className="w-full p-5 lg:p-7 flex items-center justify-between gap-2 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#3B82F620", color: "#3B82F6" }}>🛡️</span>
              <div>
                <h3 className="text-sm font-bold" style={{ color: t.text }}>{mitigation.title}</h3>
                <p className="text-[11px] mt-0.5" style={{ color: t.textMuted }}>{mitigation.subtitle}</p>
              </div>
            </div>
            <span style={{ color: t.textMuted }}><ChevronSmall open={openMitigation} /></span>
          </button>
          {openMitigation && (
            <div className="px-5 lg:px-7 pb-5 lg:pb-7 pt-0" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
              <div className="space-y-3">
                {(mitigation.items || []).map((item, i) => (
                  <MitigationStep key={i} item={item} index={i} t={t} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Analyst Insight */}
        <div
          className="rounded-xl p-5 lg:p-7 mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(182,138,53,0.1), rgba(182,138,53,0.03))",
            border: "1px solid rgba(182,138,53,0.25)",
          }}
        >
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#B68A35" }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>🔍</span>
            On-Ground Analyst Insight
          </h3>
          <p className="text-xs leading-relaxed mb-3" style={{ color: t.textSecondary }}>{analyst.text}</p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: t.textSecondary }}>{analyst.text_2}</p>
          <p className="text-[10px] italic" style={{ color: t.textMuted }}>Source: {analyst.source}</p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: t.textMuted }}>{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default RiskAssessmentSection;
