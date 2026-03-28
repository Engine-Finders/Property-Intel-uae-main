"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.10)";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

/* ─── Data Table ─── */
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

/* ─── Analysis Box ─── */
const AnalysisBox = ({ title, text, t }) => (
  <div className="rounded-xl p-4 mt-4 mb-10" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
    <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">{title}</span>
    <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{text}</p>
  </div>
);

/* ─── Source Note ─── */
const SourceNote = ({ text, t }) => (
  <p style={{ color: t.textMuted }} className="text-[10px] mt-2 leading-relaxed">{text}</p>
);

/* ─── Walkability Card (expandable) ─── */
const WalkabilityCard = ({ item, t }) => {
  const [open, setOpen] = useState(false);
  const isGood = item.assessment.includes("✅");

  return (
    <button
      onClick={() => setOpen(!open)}
      className="rounded-xl p-4 text-left w-full transition-all"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
        border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
      }}
    >
      <span className="text-sm block mb-1">{item.assessment}</span>
      <span style={{ color: t.text }} className="text-xs font-bold block">{item.aspect}</span>
      {open && (
        <p className="text-[11px] leading-relaxed mt-2 pt-2" style={{ color: t.textSecondary, borderTop: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          {item.details}
        </p>
      )}
      <span style={{ color: t.textMuted }} className="text-[10px] mt-1 block">{open ? "Hide details ↑" : "Tap for details ↓"}</span>
    </button>
  );
};

/* ─── Main Section ─── */
const LocationSection = ({ data }) => {
  const { t } = useTheme();

  return (
    <section style={{ background: t.bg }} className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <h2 style={{ color: t.text }} className="text-2xl sm:text-3xl font-bold mb-3">{data.h2}</h2>

        {/* Source Transparency */}
        <div className="rounded-xl p-4 mb-8" style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-1.5">📋 Source Transparency</span>
          <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed">{data.source_transparency}</p>
        </div>

        {/* Amenities Table */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-2">{data.amenities.h3}</h3>
        <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed mb-4">{data.amenities.intro}</p>
        <DataTable headers={data.amenities.headers} rows={data.amenities.rows} t={t} />
        <SourceNote text={data.amenities.source} t={t} />
        <AnalysisBox title={data.amenities.analysis_title} text={data.amenities.analysis} t={t} />

        {/* Drive Times */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-2">{data.drive_times.h3}</h3>
        <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed mb-4">{data.drive_times.intro}</p>
        <DataTable headers={data.drive_times.headers} rows={data.drive_times.rows} t={t} />
        <SourceNote text={data.drive_times.source} t={t} />
        <AnalysisBox title={data.drive_times.analysis_title} text={data.drive_times.analysis} t={t} />

        {/* Walkability - 4 columns */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-4">{data.walkability.h3}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.walkability.items.map((item, i) => (
            <WalkabilityCard key={i} item={item} t={t} />
          ))}
        </div>
        <SourceNote text={data.walkability.source} t={t} />
        <AnalysisBox title={data.walkability.analysis_title} text={data.walkability.analysis} t={t} />

        {/* Neighbourhood Vibe */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-2">{data.neighbourhood.h3}</h3>
        <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed mb-4">{data.neighbourhood.intro}</p>
        <div className="mb-3 space-y-2">
          {data.neighbourhood.items.map((item, i) => (
            <p key={i} className="text-xs leading-relaxed">
              <span style={{ color: GOLD }} className="font-bold">{item.title}:</span>{" "}
              <span style={{ color: t.textSecondary }}>{item.text}</span>
            </p>
          ))}
        </div>
        <SourceNote text={data.neighbourhood.source} t={t} />
        <AnalysisBox title={data.neighbourhood.analysis_title} text={data.neighbourhood.analysis} t={t} />

        {/* Map Alt Text */}
        <div className="rounded-xl p-4 mb-8" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#f1f5f9", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <span style={{ color: t.textMuted }} className="text-[10px] font-bold block mb-1">📍 Map Description</span>
          <p style={{ color: t.textMuted }} className="text-[11px] leading-relaxed italic">{data.map_alt}</p>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <button className="rounded-xl px-4 py-3 text-left transition-all hover:scale-[1.01] inline-block" style={{ background: GOLD, color: "#ffffff" }}>
              <span className="text-xs font-bold block">{data.cta.primary.text}</span>
            </button>
            <p className="text-[10px] leading-relaxed mt-2 px-1" style={{ color: t.textSecondary }}>{data.cta.primary.subtext}</p>
          </div>
          <div>
            <button className="rounded-xl px-4 py-3 text-left transition-all hover:scale-[1.01] inline-block" style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#ffffff", border: `1px solid ${GOLD_BORDER}`, color: t.text }}>
              <span className="text-xs font-bold block" style={{ color: GOLD }}>{data.cta.secondary.text}</span>
            </button>
            <p className="text-[10px] leading-relaxed mt-2 px-1" style={{ color: t.textSecondary }}>{data.cta.secondary.subtext}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <p style={{ color: t.textMuted }} className="text-[10px] leading-relaxed">{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;