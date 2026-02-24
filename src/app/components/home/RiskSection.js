"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

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

/* ── Tab Button ── */
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

/* ── Main Component ── */
const RisksSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("delays");

  const tabs = [
    { key: "delays", label: "Delays" },
    { key: "oversupply", label: "Oversupply" },
    { key: "costs", label: "Hidden Costs" },
    { key: "quality", label: "Quality" },
    { key: "location", label: "Location" },
  ];

  const radar = data.risk_radar || [];
  const delay = data.handover_delay || {};
  const oversupply = data.oversupply || {};
  const hidden = data.hidden_costs || {};
  const quality = data.construction_quality || {};
  const location = data.location_downsides || {};
  const summary = data.risk_summary || {};

  return (
    <section id="risks" style={{ background: t.bg }} className="py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span
            className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: "#EF444420", color: "#EF4444" }}
          >
            {data.title || "Risks & Red Flags"}
          </span>
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

        {/* Handover Delay Table — always visible */}
        <div
          className="rounded-xl p-5 lg:p-7 mb-8"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: t.text }}>{delay.title}</h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>{delay.intro}</p>
          <div className="block lg:hidden">
            <MobileCards headers={delay.table?.headers || []} rows={delay.table?.rows || []} t={t} />
          </div>
          <div className="hidden lg:block">
            <DesktopTable headers={delay.table?.headers || []} rows={delay.table?.rows || []} t={t} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {tabs.map((tab) => (
            <TabBtn key={tab.key} label={tab.label} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)} t={t} />
          ))}
        </div>

        {/* Tab Content */}
        <div
          className="rounded-xl p-5 lg:p-7 mb-8"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          {/* Delays Tab */}
          {activeTab === "delays" && (
            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: t.text }}>The 4-Year Timeline Risk</h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: t.textSecondary }}>{delay.timeline_risk?.text}</p>
              <BulletList items={delay.timeline_risk?.factors || []} t={t} />
              <WarningBox t={t}>{delay.application_to_serro}</WarningBox>
            </div>
          )}

          {/* Oversupply Tab */}
          {activeTab === "oversupply" && (
            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: t.text }}>{oversupply.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>{oversupply.intro}</p>

              <div className="rounded-lg p-4 mb-4" style={{ background: t.isDark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#F59E0B" }}>Where Supply Concentrates</p>
                <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{oversupply.supply_concentration}</p>
              </div>

              <div className="rounded-lg p-4 mb-4" style={{ background: t.isDark ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.25)" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#22C55E" }}>Villa Market Differentiation</p>
                <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{oversupply.villa_differentiation}</p>
              </div>

              <WarningBox t={t}>{oversupply.serro_assessment}</WarningBox>
            </div>
          )}

          {/* Hidden Costs Tab */}
          {activeTab === "costs" && (
            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: t.text }}>{hidden.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>{hidden.intro}</p>

              <div className="space-y-3">
                {(hidden.post_handover_costs || []).map((cost, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4"
                    style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}
                  >
                    <p className="text-xs font-bold mb-1" style={{ color: "#F59E0B" }}>{cost.item}</p>
                    <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{cost.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Tab */}
          {activeTab === "quality" && (
            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: t.text }}>{quality.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>{quality.intro}</p>

              <div className="block lg:hidden">
                <MobileCards headers={quality.table?.headers || []} rows={quality.table?.rows || []} t={t} />
              </div>
              <div className="hidden lg:block">
                <DesktopTable headers={quality.table?.headers || []} rows={quality.table?.rows || []} t={t} />
              </div>

              <div className="rounded-lg p-4 mt-4" style={{ background: t.isDark ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.25)" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#22C55E" }}>✅ Mitigation Strategy</p>
                <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{quality.mitigation}</p>
              </div>
            </div>
          )}

          {/* Location Tab */}
          {activeTab === "location" && (
            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: t.text }}>{location.title}</h3>

              <p className="text-xs font-semibold mb-3" style={{ color: t.text }}>Current Limitations</p>
              <div className="space-y-3 mb-5">
                {(location.current_limitations || []).map((lim, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4 flex gap-3 items-start"
                    style={{ background: t.isDark ? "rgba(239,68,68,0.06)" : "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)" }}
                  >
                    <span className="text-xs mt-0.5" style={{ color: "#EF4444" }}>✕</span>
                    <div>
                      <p className="text-xs font-bold mb-0.5" style={{ color: t.text }}>{lim.issue}</p>
                      <p className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>{lim.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs font-semibold mb-2" style={{ color: t.text }}>Construction Phase Disruption</p>
              <p className="text-xs leading-relaxed mb-2" style={{ color: t.textSecondary }}>{location.construction_disruption?.text}</p>
              <BulletList items={location.construction_disruption?.items || []} t={t} icon="•" />

              <div className="rounded-lg p-4 mt-5" style={{ background: t.isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.25)" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#3B82F6" }}>🌊 Flood Risk Assessment</p>
                <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{location.flood_risk}</p>
              </div>
            </div>
          )}
        </div>

        {/* Risk vs Reward Summary — always visible */}
        <div
          className="rounded-xl p-5 lg:p-7 mb-8"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>⚖️</span>
            {summary.title}
          </h3>
          <div className="block lg:hidden">
            <MobileCards headers={summary.headers || []} rows={summary.rows || []} t={t} highlightCol={1} />
          </div>
          <div className="hidden lg:block">
            <DesktopTable headers={summary.headers || []} rows={summary.rows || []} t={t} highlightCol={1} />
          </div>
        </div>

        {/* Final Perspective */}
        <div
          className="rounded-xl p-5 lg:p-7"
          style={{
            background: "linear-gradient(135deg, rgba(182,138,53,0.1), rgba(182,138,53,0.03))",
            border: "1px solid rgba(182,138,53,0.25)",
          }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: "#B68A35" }}>Final Perspective</p>
          <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{data.final_perspective}</p>
        </div>
      </div>
    </section>
  );
};

export default RisksSection;
