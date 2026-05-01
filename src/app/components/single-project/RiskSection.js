"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import SectionExpertCta from "./SectionExpertCta";

/* ── Animated Risk Bar ── */
const RiskBar = ({ label, level, value, t }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(value); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const barColor =
    value >= 70 ? "#EF4444" : value >= 50 ? "#F59E0B" : "#22C55E";

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold" style={{ color: t.text }}>{label}</span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: barColor + "20", color: barColor }}
        >
          {level}
        </span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: t.isDark ? "#2a2d33" : "#e2e8f0" }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: barColor }}
        />
      </div>
    </div>
  );
};

/* ── Responsive Table / Cards ── */
const MobileCards = ({ headers, rows, t, highlightCol }) => (
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
              style={{
                color: highlightCol === j ? getSeverityColor(row[j]) : t.text,
              }}
            >
              {row[j]}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const DesktopTable = ({ headers, rows, t, highlightCol }) => (
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
                  color: highlightCol === j ? getSeverityColor(cell) : t.text,
                  fontWeight: highlightCol === j ? 700 : 400,
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

function getSeverityColor(text) {
  if (!text) return "#F59E0B";
  const lower = String(text).toLowerCase();
  if (lower.includes("high")) return "#EF4444";
  if (lower.includes("low")) return "#22C55E";
  if (lower.includes("on time")) return "#22C55E";
  return "#F59E0B";
}

const RiskIcon = ({ name, size = 24, color = "#B68A35" }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "clock") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l4 2" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 14 3-3 3 2 5-7" />
      </svg>
    );
  }

  if (name === "document") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </svg>
    );
  }

  if (name === "crane") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 20h16" />
        <path d="M7 20V8" />
        <path d="M7 8h11" />
        <path d="M11 8v12" />
        <path d="M18 8v5" />
        <path d="m18 13-2 2" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  if (name === "train") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="6" y="3" width="12" height="14" rx="2" />
        <path d="M8 7h8" />
        <path d="M9 11h.01" />
        <path d="M15 11h.01" />
        <path d="m8 21 2-3" />
        <path d="m16 21-2-3" />
      </svg>
    );
  }

  if (name === "retail") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 9h14l-1 11H6z" />
        <path d="M8 9V7a4 4 0 0 1 8 0v2" />
        <path d="M4 9h16" />
      </svg>
    );
  }

  if (name === "school") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m3 10 9-5 9 5-9 5z" />
        <path d="M7 12v5c3 2 7 2 10 0v-5" />
      </svg>
    );
  }

  if (name === "notes") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 3h12v18H6z" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
};

/* ── Risk Selector Card ── */
const RiskOptionCard = ({ label, icon, active, onClick, t }) => (
  <button
    onClick={onClick}
    className="min-h-[150px] rounded-xl p-4 text-center transition-all duration-200"
    style={{
      background: active ? (t.isDark ? "rgba(182,138,53,0.16)" : "#fffaf0") : t.cardBg,
      border: `1px solid ${active ? "rgba(182,138,53,0.55)" : t.cardBorder}`,
      boxShadow: active && !t.isDark ? "0 12px 28px rgba(113,85,32,0.12)" : "none",
    }}
  >
    <span
      className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-3xl"
      style={{
        background: t.isDark ? "rgba(182,138,53,0.12)" : "#f7f0df",
        color: "#B68A35",
      }}
    >
      <RiskIcon name={icon} size={30} />
    </span>
    <span className="block text-[1rem] font-semibold leading-5" style={{ color: t.text }}>
      {label}
    </span>
  </button>
);

/* ── Warning Callout ── */
const WarningBox = ({ children, t }) => (
  <div
    className="rounded-lg p-4 mt-4"
    style={{
      background: t.isDark ? "rgba(239,68,68,0.08)" : "rgba(239,68,68,0.06)",
      border: "1px solid rgba(239,68,68,0.25)",
    }}
  >
    <div className="flex gap-2 items-start">
      <span className="text-sm mt-0.5">⚠️</span>
      <div className="text-xs leading-relaxed" style={{ color: t.isDark ? "#fca5a5" : "#b91c1c" }}>
        {children}
      </div>
    </div>
  </div>
);

/* ── Bullet List ── */
const BulletList = ({ items, t, icon = "→" }) => (
  <ul className="space-y-2 mt-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2 items-start text-xs leading-relaxed" style={{ color: t.textSecondary }}>
        <span style={{ color: "#B68A35" }} className="shrink-0 mt-0.5">{icon}</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const HandoverDelaySlider = ({ headers, rows, activeIndex, onChange, t }) => {
  const row = rows[activeIndex] || rows[0] || [];
  const prev = () => onChange((activeIndex - 1 + rows.length) % rows.length);
  const next = () => onChange((activeIndex + 1) % rows.length);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={prev}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg sm:flex"
          style={{ border: `1px solid ${t.cardBorder}`, color: "#B68A35" }}
          aria-label="Previous delay example"
        >
          ‹
        </button>

        <div className="flex-1 rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}`, background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff" }}>
          <p className="mb-3 text-sm font-semibold" style={{ color: t.text }}>
            {row[0]}
          </p>
          <div className="divide-y" style={{ borderColor: t.cardBorder }}>
            {headers.slice(1).map((header, index) => (
              <div key={header} className="grid grid-cols-[1fr_1.25fr] gap-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded text-[11px]" style={{ background: "rgba(182,138,53,0.1)", color: "#B68A35" }}>
                    {index + 1}
                  </span>
                  <span className="text-xs" style={{ color: t.textMuted }}>{header}</span>
                </div>
                <span className="text-xs font-semibold text-right" style={{ color: index === 2 ? t.textSecondary : "#B68A35" }}>
                  {row[index + 1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg sm:flex"
          style={{ border: `1px solid ${t.cardBorder}`, color: "#B68A35" }}
          aria-label="Next delay example"
        >
          ›
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {rows.map((item, index) => (
          <button
            key={item[0]}
            type="button"
            onClick={() => onChange(index)}
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: index === activeIndex ? "#B68A35" : t.cardBorder }}
            aria-label={`Show ${item[0]}`}
          />
        ))}
      </div>
    </div>
  );
};

const ResearchNotesAccordion = ({ notes, t }) => {
  const [open, setOpen] = useState(false);
  if (!notes) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center gap-3 px-4 py-4 text-left"
        style={{ color: t.text }}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(182,138,53,0.18)", color: "#B68A35" }}>
          <RiskIcon name="notes" size={20} />
        </span>
        <span className="flex-1 text-lg font-semibold">Research Notes</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`} style={{ color: "#B68A35" }}>⌄</span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[1400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="grid gap-4 border-t p-4 lg:grid-cols-2" style={{ borderColor: t.cardBorder }}>
          <div className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
            <div className="mb-3 flex items-center gap-2">
              <RiskIcon name="document" size={18} />
              <p className="text-sm font-semibold" style={{ color: "#B68A35" }}>Sources consulted</p>
            </div>
            <div className="max-h-44 overflow-y-auto pr-2 scrollbar-gold lg:max-h-40">
              <BulletList items={notes.sources_consulted || []} t={t} icon="•" />
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
            <div className="mb-3 flex items-center gap-2">
              <RiskIcon name="shield" size={18} />
              <p className="text-sm font-semibold" style={{ color: "#B68A35" }}>Data verification notes</p>
            </div>
            <div className="max-h-44 overflow-y-auto pr-2 scrollbar-gold lg:max-h-40">
              <BulletList items={notes.data_verification_notes || []} t={t} icon="•" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const RisksSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("handover");
  const [activeDelayIndex, setActiveDelayIndex] = useState(0);

  const tabs = [
    { key: "handover", label: "Handover Delay History — Emaar’s Record in Growth Corridors", icon: "clock" },
    { key: "oversupply", label: "Sub-Market Oversupply Risk", icon: "chart" },
    { key: "costs", label: "Hidden Costs — Beyond the Purchase Price", icon: "document" },
    { key: "quality", label: "Construction Quality Concerns — Learning from Past Projects", icon: "crane" },
    { key: "location", label: "Location Downsides — The Reality of Emerging Communities", icon: "pin" },
    { key: "summary", label: "Summary — Risk vs. Reward", icon: "shield" },
  ];

  const radar = data.risk_radar || [];
  const delay = data.handover_delay || {};
  const oversupply = data.oversupply || {};
  const hidden = data.hidden_costs || {};
  const quality = data.construction_quality || {};
  const location = data.location_downsides || {};
  const summary = data.risk_summary || {};

  return (
    <section id="risks" style={{ background: t.bg }} className="py-6 lg:py-10 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <div
            className="relative mb-0 overflow-hidden rounded-t-[28px] border"
            style={{
              borderColor: t.cardBorder,
              background: t.isDark ? "#25282d" : "#fffdfa",
              minHeight: 260,
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/projects/villa-render-2.jpg')" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{
                background: t.isDark
                  ? "linear-gradient(90deg, #25282d 0%, #25282d 42%, rgba(37,40,45,0.9) 56%, rgba(37,40,45,0.48) 72%, rgba(37,40,45,0.1) 88%, transparent 100%)"
                  : "linear-gradient(90deg, #fffdfa 0%, #fffdfa 42%, rgba(255,253,250,0.5) 64%, transparent 84%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-[590px] px-8 py-12">
              <h2 className="text-[3rem] font-semibold leading-[1.05]" style={{ color: t.text }}>
                What Buyers Often Overlook —
                <span className="block italic" style={{ color: "#B68A35" }}>
                  Honest Risk Assessment
                </span>
              </h2>
              <span className="mt-5 block h-px w-20" style={{ background: "#B68A35" }} />
            </div>
          </div>

          <div
            className="grid grid-cols-[240px_1fr] gap-5 rounded-b-[28px] border-x border-b p-5"
            style={{ borderColor: t.cardBorder, background: t.isDark ? t.cardBg : "#fffdfa" }}
          >
            <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${t.cardBorder}` }}>
              {tabs.map((tab) => {
                const active = activeTab === tab.key;
                const parts = tab.label.split("—").map((part) => part.trim());

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className="relative flex w-full items-center gap-3 border-b px-4 py-4 text-left last:border-b-0"
                    style={{
                      borderColor: t.cardBorder,
                      background: active ? "#B68A35" : "transparent",
                      color: active ? "#fff" : t.text,
                    }}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: active ? "rgba(255,255,255,0.16)" : "rgba(182,138,53,0.12)", color: active ? "#fff" : "#B68A35" }}
                    >
                      <RiskIcon name={tab.icon} size={20} color="currentColor" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-5">{parts[0]}</span>
                      {parts[1] && <span className="mt-0.5 block text-xs leading-4 opacity-90">{parts[1]}</span>}
                    </span>
                    <span>›</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              <div
                className="rounded-2xl p-2"
                style={{ background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff", border: `1px solid ${t.cardBorder}` }}
              >
                {activeTab === "handover" && (
                  <div>
                    <div className="mb-5 flex items-start gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                        <RiskIcon name="clock" size={24} />
                      </span>
                      <div>
                        <h3 className="text-2xl font-semibold" style={{ color: t.text }}>{delay.title}</h3>
                        <p className="mt-2 text-sm leading-6" style={{ color: t.textSecondary }}>{delay.intro}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
                      <DesktopTable headers={delay.table?.headers || []} rows={delay.table?.rows || []} t={t} highlightCol={3} />
                      <div className="space-y-4">
                        <div className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                          <p className="text-sm font-semibold" style={{ color: "#B68A35" }}>Application to Serro:</p>
                          <p className="mt-2 text-sm leading-6" style={{ color: t.textSecondary }}>{delay.application_to_serro}</p>
                        </div>
                        <div className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                          <p className="text-sm font-semibold" style={{ color: "#B68A35" }}>{delay.timeline_risk?.title}</p>
                          <p className="mt-2 text-sm leading-6" style={{ color: t.textSecondary }}>{delay.timeline_risk?.text}</p>
                          <BulletList items={delay.timeline_risk?.factors || []} t={t} icon="•" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "oversupply" && (
                  <div>
                    <div className="mb-6 grid grid-cols-[1fr_280px] gap-6">
                      <div className="flex items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                          <RiskIcon name="chart" size={24} />
                        </span>
                        <div>
                          <h3 className="text-2xl font-semibold" style={{ color: t.text }}>{oversupply.title}</h3>
                          <p className="mt-3 text-sm leading-7" style={{ color: t.textSecondary }}>{oversupply.intro}</p>
                        </div>
                      </div>
                      <div className="rounded-2xl p-5" style={{ border: `1px solid ${t.cardBorder}`, background: t.isDark ? "rgba(255,255,255,0.02)" : "#fffdfa" }}>
                        <p className="text-4xl font-semibold" style={{ color: "#B68A35" }}>{oversupply.stat_value}</p>
                        <p className="mt-2 text-sm leading-6" style={{ color: t.textSecondary }}>{oversupply.stat_description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                        <p className="mb-3 text-sm font-semibold" style={{ color: "#B68A35" }}>Where Supply Concentrates:</p>
                        {oversupply.supply_areas.map((area) => (
                          <p key={area} className="mb-2 rounded px-3 py-2 text-sm last:mb-0" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#faf7f0", color: t.text }}>{area}</p>
                        ))}
                      </div>
                      <div className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                        <p className="mb-3 text-sm font-semibold" style={{ color: "#B68A35" }}>Villa Market Differentiation:</p>
                        <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{oversupply.villa_differentiation}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                          <p className="mb-3 text-sm font-semibold" style={{ color: "#B68A35" }}>Risk Assessment for Serro:</p>
                          <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{oversupply.serro_assessment}</p>
                        </div>
                        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(182,138,53,0.08)" : "#fbf3e1", border: `1px solid ${t.cardBorder}` }}>
                          <p className="text-sm" style={{ color: t.textSecondary }}><strong style={{ color: "#B68A35" }}>{oversupply.impact_window_label}</strong><br />{oversupply.impact_window}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "costs" && (
                  <div>
                    <div className="mb-7 flex items-start gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                        <RiskIcon name="document" size={24} />
                      </span>
                      <div>
                        <h3 className="text-2xl font-semibold" style={{ color: t.text }}>{hidden.title}</h3>
                        <p className="mt-3 text-sm leading-7" style={{ color: t.textSecondary }}>{hidden.intro}</p>
                      </div>
                    </div>
                    <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: "#B68A35" }}>Post-Handover Cost Considerations</p>
                    <div className="grid grid-cols-4 gap-5">
                      {(hidden.post_handover_costs || []).map((cost, i) => (
                        <div key={cost.item} className="relative rounded-2xl p-6 text-center" style={{ border: `1px solid ${t.cardBorder}` }}>
                          <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: "#B68A35" }}>{i + 1}</span>
                          <RiskIcon name={i === 0 ? "chart" : i === 1 ? "document" : i === 2 ? "clock" : "shield"} size={34} />
                          <p className="mt-5 text-base font-semibold" style={{ color: t.text }}>{cost.item}</p>
                          <p className="mt-4 text-sm leading-7" style={{ color: t.textSecondary }}>{cost.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "quality" && (
                  <div>
                    <div className="mb-5 flex items-start gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                        <RiskIcon name="crane" size={24} />
                      </span>
                      <div>
                        <h3 className="text-2xl font-semibold" style={{ color: t.text }}>{quality.title}</h3>
                        <p className="mt-2 text-sm leading-6" style={{ color: t.textSecondary }}>{quality.intro}</p>
                      </div>
                    </div>
                    <DesktopTable headers={quality.table?.headers || []} rows={quality.table?.rows || []} t={t} />
                    <div className="mt-5 rounded-xl p-4" style={{ background: t.isDark ? "rgba(182,138,53,0.08)" : "#fbf3e1", border: `1px solid ${t.cardBorder}` }}>
                      <p className="text-sm leading-7" style={{ color: t.textSecondary }}><strong style={{ color: "#B68A35" }}>Mitigation Strategy:</strong> {quality.mitigation}</p>
                    </div>
                  </div>
                )}

                {activeTab === "location" && (
                  <div>
                    <div className="mb-6 flex items-start gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                        <RiskIcon name="pin" size={24} />
                      </span>
                      <h3 className="text-2xl font-semibold" style={{ color: t.text }}>{location.title}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                      <div>
                        <p className="mb-4 text-sm font-semibold" style={{ color: "#B68A35" }}>Current Limitations:</p>
                        {(location.current_limitations || []).map((lim) => (
                          <div key={lim.issue} className="mb-4 flex gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                              <RiskIcon name={lim.issue.toLowerCase().includes("metro") ? "train" : lim.issue.toLowerCase().includes("retail") ? "retail" : "school"} size={18} />
                            </span>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: t.text }}>{lim.issue}</p>
                              <p className="mt-1 text-sm leading-6" style={{ color: t.textSecondary }}>{lim.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="mb-4 text-sm font-semibold" style={{ color: "#B68A35" }}>Construction Phase Disruption:</p>
                        <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{location.construction_disruption?.text}</p>
                        <div className="mt-4 space-y-3">
                          {(location.construction_disruption?.items || []).map((item) => (
                            <p key={item} className="rounded-xl px-4 py-3 text-sm" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#faf7f0", color: t.textSecondary }}>{item}</p>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl p-6" style={{ border: `1px solid ${t.cardBorder}` }}>
                        <p className="mb-5 text-sm font-semibold" style={{ color: "#B68A35" }}>Flood Risk Assessment:</p>
                        <div className="mb-6 flex justify-center">
                          <span className="flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                            <RiskIcon name="shield" size={42} />
                          </span>
                        </div>
                        <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{location.flood_risk}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "summary" && (
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                          <RiskIcon name="shield" size={24} />
                        </span>
                        <h3 className="text-2xl font-semibold" style={{ color: t.text }}>{summary.title}</h3>
                      </div>
                    </div>
                    <DesktopTable headers={summary.headers || []} rows={summary.rows || []} t={t} highlightCol={1} />
                    <div className="mt-5 rounded-xl p-5" style={{ background: t.isDark ? "rgba(182,138,53,0.08)" : "#fbf3e1", border: `1px solid ${t.cardBorder}` }}>
                      <p className="text-sm leading-7" style={{ color: t.textSecondary }}><strong style={{ color: "#B68A35" }}>Final Perspective:</strong> {data.final_perspective}</p>
                    </div>
                  </div>
                )}
              </div>

              <ResearchNotesAccordion notes={data.research_notes} t={t} />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: t.text }}>
            {data.subtitle}
          </h2>
        </div>

        {/* Risk Radar Bars — always visible */}
        <div
          className="rounded-xl p-5 lg:p-7 mb-8"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: t.text }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#EF444420", color: "#EF4444" }}>📊</span>
            Risk Radar
          </h3>
          {radar.map((r, i) => (
            <RiskBar key={i} label={r.label} level={r.level} value={r.value} t={t} />
          ))}
        </div>

        {/* Risk cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {tabs.map((tab) => (
            <RiskOptionCard
              key={tab.key}
              label={tab.label}
              icon={tab.icon}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              t={t}
            />
          ))}
        </div>

        {/* Selected risk content */}
        <div
          className="rounded-2xl p-5 lg:p-7 mb-8"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          {activeTab === "handover" && (
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>{delay.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }}>{delay.intro}</p>
              <HandoverDelaySlider
                headers={delay.table?.headers || []}
                rows={delay.table?.rows || []}
                activeIndex={activeDelayIndex}
                onChange={setActiveDelayIndex}
                t={t}
              />
              <div className="mt-5 max-h-[260px] overflow-y-auto rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#B68A35" }}>Application to Serro:</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>{delay.application_to_serro}</p>
                <p className="text-xs font-semibold mb-1" style={{ color: "#B68A35" }}>{delay.timeline_risk?.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{delay.timeline_risk?.text}</p>
                <BulletList items={delay.timeline_risk?.factors || []} t={t} icon="•" />
              </div>
            </div>
          )}

          {activeTab === "oversupply" && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>{oversupply.title}</h3>
              <div className="mb-4 grid grid-cols-[1fr_auto] gap-3 rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                <div>
                  <p className="text-5xl font-semibold leading-none" style={{ color: "#B68A35" }}>{oversupply.stat_value}</p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: t.textSecondary }}>{oversupply.intro}</p>
                </div>
                <div className="border-l pl-4 text-center" style={{ borderColor: t.cardBorder }}>
                  <p className="text-2xl font-semibold" style={{ color: "#B68A35" }}>{oversupply.stat_year}</p>
                  <p className="text-xs" style={{ color: t.textMuted }}>{oversupply.stat_year_label}</p>
                </div>
              </div>
              <div className="mb-4 rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#B68A35" }}>Where Supply Concentrates</p>
                <div className="mb-3 flex flex-wrap gap-2">
                  {oversupply.mobile_supply_areas.map((area) => (
                    <span key={area} className="rounded-full px-3 py-1 text-[11px]" style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "#f7f0df", color: t.textSecondary }}>{area}</span>
                  ))}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{oversupply.supply_concentration}</p>
              </div>
              <div className="mb-4 rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#B68A35" }}>Villa Market Differentiation</p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: t.textSecondary }}>{oversupply.villa_differentiation}</p>
                <div className="flex flex-wrap gap-2">
                  {oversupply.market_tags.map((tag) => (
                    <span key={tag} className="rounded px-2 py-1 text-[11px]" style={{ background: "rgba(34,197,94,0.08)", color: "#2f7d45" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <WarningBox t={t}>{oversupply.serro_assessment}</WarningBox>
            </div>
          )}

          {activeTab === "costs" && (
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: t.text }}>{hidden.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: t.textSecondary }}>{hidden.intro}</p>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#B68A35" }}>Post-Handover Cost Considerations</p>
              <div className="space-y-3">
                {(hidden.post_handover_costs || []).map((cost, i) => (
                  <div key={cost.item} className="flex gap-4 rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: "#B68A35" }}>{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: t.text }}>{cost.item}</p>
                      <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{cost.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quality" && (
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: t.text }}>{quality.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }}>{quality.intro}</p>
              <div className="space-y-3">
                {(quality.table?.rows || []).map((row) => (
                  <div key={row[0]} className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: t.text }}>{row[0]}</p>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: t.textSecondary }}>{row[1]}</p>
                    <p className="text-xs italic" style={{ color: "#B68A35" }}>Relevance: {row[2]}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border-l-2 p-4" style={{ borderColor: "#B68A35", background: t.isDark ? "rgba(182,138,53,0.08)" : "#fffaf0" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#B68A35" }}>Mitigation Strategy</p>
                <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{quality.mitigation}</p>
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>{location.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#B68A35" }}>Current Limitations</p>
              <div className="space-y-4 mb-5">
                {(location.current_limitations || []).map((lim) => (
                  <div key={lim.issue} className="flex gap-3 border-b pb-4" style={{ borderColor: t.cardBorder }}>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(182,138,53,0.12)" }}>
                      <RiskIcon
                        name={
                          lim.issue.toLowerCase().includes("metro")
                            ? "train"
                            : lim.issue.toLowerCase().includes("retail")
                              ? "retail"
                              : "school"
                        }
                        size={18}
                      />
                    </span>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: t.text }}>{lim.issue}</p>
                      <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{lim.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 mb-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#B68A35" }}>Construction Phase Disruption</p>
                <p className="text-sm leading-relaxed mb-2" style={{ color: t.textSecondary }}>{location.construction_disruption?.text}</p>
                <BulletList items={location.construction_disruption?.items || []} t={t} icon="•" />
              </div>
              <div className="rounded-xl border-l-2 p-4" style={{ borderColor: "#B68A35", background: t.isDark ? "rgba(182,138,53,0.08)" : "#fffaf0" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#B68A35" }}>Flood Risk Assessment</p>
                <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{location.flood_risk}</p>
              </div>
            </div>
          )}

          {activeTab === "summary" && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>{summary.title}</h3>
              <div className="space-y-3 mb-5">
                {(summary.rows || []).map((row) => (
                  <div key={row[0]} className="grid grid-cols-[1fr_1.2fr] gap-3 rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: t.text }}>{row[0]}</p>
                      <span className="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: `${getSeverityColor(row[1])}18`, color: getSeverityColor(row[1]) }}>{row[1]}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{row[2]}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, rgba(182,138,53,0.1), rgba(182,138,53,0.03))", border: "1px solid rgba(182,138,53,0.25)" }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "#B68A35" }}>Final Perspective</p>
                <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{data.final_perspective}</p>
              </div>
            </div>
          )}
        </div>

        <ResearchNotesAccordion notes={data.research_notes} t={t} />

        </div>
        <SectionExpertCta cta={data.section_cta || data.cta} t={t} className="mt-6" />
      </div>
    </section>
  );
};

export default RisksSection;
