"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";


const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.10)";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

const CompletedHeroSection = ({ data }) => {
  const { t } = useTheme();
  const [showMore, setShowMore] = useState(false);

  return (
    <section style={{ background: t.bg }}>
      {/* Hero Banner with BG Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div
          className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl"
          style={{ height: "360px" }}
        >
          <img
            src="projects/villa-render-1.jpg"
            alt="Emirates Hills"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
              {data.h1}
            </h1>
            <div
              style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            >
              <span style={{ color: GOLD }} className="text-sm font-semibold">{data.status_badge}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">

        {/* Data Grid */}
        <div className="mb-8">
          <h2
            style={{ color: t.text }}
            className="text-lg font-bold mb-4"
          >
            {data.data_grid.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.data_grid.metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  background: t.isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                  border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
                }}
                className="rounded-xl p-4"
              >
                <span style={{ color: t.textMuted }} className="text-xs block mb-1">{m.label}</span>
                <span style={{ color: GOLD }} className="text-xl font-bold block mb-1">{m.value}</span>
                <span style={{ color: t.textMuted }} className="text-[10px] block">{m.source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="flex-1">
            <button
              style={{ background: GOLD }}
              className="w-full text-white font-semibold py-3 px-6 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              {data.primary_cta.text}
            </button>
            <p style={{ color: t.textMuted }} className="text-[11px] mt-1.5 px-1">{data.primary_cta.subtext}</p>
          </div>
          <div className="flex-1">
            <button
              style={{
                background: "transparent",
                border: `1px solid ${GOLD}`,
                color: GOLD
              }}
              className="w-full font-semibold py-3 px-6 rounded-xl text-sm hover:opacity-80 transition-opacity"
            >
              {data.secondary_cta.text}
            </button>
            <p style={{ color: t.textMuted }} className="text-[11px] mt-1.5 px-1">{data.secondary_cta.subtext}</p>
          </div>
        </div>

        {/* Explore Link */}
        <a
          href={data.explore_link.href}
          style={{ color: GOLD }}
          className="text-sm font-medium underline underline-offset-4 mb-10 inline-block"
        >
          {data.explore_link.text} →
        </a>

        {/* Overview */}
        <div className="mt-8 mb-10">
          <h2
            style={{ color: t.text }}
            className="text-xl sm:text-2xl font-bold mb-4"
          >
            {data.overview.h2}
          </h2>
          <div style={{ color: t.textSecondary }} className="text-sm leading-relaxed space-y-4">
            {showMore ? (
              data.overview.paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>
                {data.overview.paragraphs[0].split(". ").slice(0, 4).join(". ") + "."}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowMore(!showMore)}
            style={{ color: GOLD }}
            className="text-sm font-semibold mt-3 hover:underline"
          >
            {showMore ? "Show Less ↑" : "See More ↓"}
          </button>
        </div>

        {/* Key Facts Table + Source Note side by side */}
        <div className="mb-8">
          <h3
            style={{ color: t.text }}
            className="text-lg sm:text-xl font-bold mb-4"
          >
            {data.key_facts.h3}
          </h3>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Table */}
            <div
              className="rounded-xl overflow-x-auto"
              style={{
                flex: "1 1 0%",
                minWidth: 0,
                border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
                    <th style={{ color: t.textMuted, textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Detail</th>
                    <th style={{ color: t.textMuted, textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Value</th>
                    <th style={{ color: t.textMuted, textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.key_facts.items.map((fact, i) => (
                    <tr
                      key={i}
                      style={{
                        background: i % 2 === 0
                          ? (t.isDark ? "rgba(255,255,255,0.02)" : "#ffffff")
                          : (t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc"),
                        borderTop: `1px solid ${t.isDark ? "#1e2028" : "#e2e8f0"}`
                      }}
                    >
                      <td style={{ color: t.textMuted, padding: "10px 12px", fontSize: "12px", fontWeight: 500 }}>{fact.label}</td>
                      <td style={{ color: GOLD, padding: "10px 12px", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>{fact.value}</td>
                      <td style={{ color: t.textMuted, padding: "10px 12px", fontSize: "11px" }}>{fact.subtext}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Source Note - right side */}
            <div
              style={{
                width: "260px",
                flexShrink: 0,
                background: GOLD_BG,
                border: `1px solid ${GOLD_BORDER}`,
                borderRadius: "12px",
                padding: "16px",
                alignSelf: "flex-start"
              }}
              className="hidden lg:block"
            >
              <span style={{ color: GOLD, fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "8px" }}>📋 Source Transparency</span>
              <p style={{ color: t.textSecondary, fontSize: "11px", lineHeight: 1.6 }}>
                {data.key_facts.source_note}
              </p>
            </div>
          </div>

          {/* Source Note - below table on mobile */}
          <div
            className="lg:hidden mt-4"
            style={{
              background: GOLD_BG,
              border: `1px solid ${GOLD_BORDER}`,
              borderRadius: "12px",
              padding: "16px"
            }}
          >
            <span style={{ color: GOLD, fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "8px" }}>📋 Source Transparency</span>
            <p style={{ color: t.textSecondary, fontSize: "11px", lineHeight: 1.6 }}>
              {data.key_facts.source_note}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
            border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
          }}
          className="rounded-xl p-4"
        >
          <p style={{ color: t.textMuted }} className="text-[11px] leading-relaxed">
            {data.key_facts.disclaimer}
          </p>
        </div>
        </div>
    </section>
  );
};

export default CompletedHeroSection;
