"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.10)";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

/* ─── Data Table ─── */
const DataTable = ({ headers, rows, t }) => (
  <div
    className="rounded-xl overflow-x-auto"
    style={{ border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
          {headers.map((h, i) => (
            <th
              key={i}
              style={{
                color: t.textMuted,
                textAlign: "left",
                padding: "10px 12px",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap"
              }}
            >{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr
            key={ri}
            style={{
              background: ri % 2 === 0
                ? (t.isDark ? "rgba(255,255,255,0.02)" : "#ffffff")
                : (t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc"),
              borderTop: `1px solid ${t.isDark ? "#1e2028" : "#e2e8f0"}`
            }}
          >
            {row.map((cell, ci) => (
              <td
                key={ci}
                style={{
                  padding: "10px 12px",
                  fontSize: "12px",
                  color: ci === 0 ? t.textMuted : (ci === 1 || ci === 2 ? GOLD : t.textSecondary),
                  fontWeight: ci === 0 ? 500 : (ci <= 2 ? 700 : 400),
                  whiteSpace: ci <= 3 ? "nowrap" : "normal",
                  minWidth: ci === row.length - 1 ? "200px" : "auto"
                }}
              >{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─── Analysis Box ─── */
const AnalysisBox = ({ title, text, t }) => (
  <div
    className="rounded-xl p-4"
    style={{
      background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
      border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
    }}
  >
    <span style={{ color: GOLD }} className="text-xs font-bold block mb-2">{title}</span>
    <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{text}</p>
  </div>
);

/* ─── Source Note ─── */
const SourceNote = ({ text, t }) => (
  <p style={{ color: t.textMuted }} className="text-[10px] mt-2 mb-2 leading-relaxed">{text}</p>
);

/* ─── Main Section ─── */
const TrackRecordSection = ({ data }) => {
  const { t } = useTheme();
  const [showAllStrengths, setShowAllStrengths] = useState(false);

  return (
    <section style={{ background: t.bg }} className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <h2 style={{ color: t.text }} className="text-2xl sm:text-3xl font-bold mb-3">
          {data.h2}
        </h2>

        {/* Source Transparency */}
        <div
          className="rounded-xl p-4 mb-8"
          style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}
        >
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-1.5">📋 Source Transparency</span>
          <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed">
            {data.source_transparency}
          </p>
        </div>

        {/* ── Delivery Track Record ── */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-3">
          {data.delivery_track.h3}
        </h3>
        <DataTable
          headers={data.delivery_track.headers}
          rows={data.delivery_track.rows}
          t={t}
        />
        <SourceNote text={data.delivery_track.data_source} t={t} />
        <div className="mt-4 mb-10">
          <AnalysisBox title={data.delivery_track.analysis_title} text={data.delivery_track.analysis} t={t} />
        </div>

        {/* ── Promises vs Reality ── */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-1">
          {data.promises_vs_reality.h3}
        </h3>
        <p style={{ color: t.textMuted }} className="text-xs mb-3">{data.promises_vs_reality.subtitle}</p>
        <DataTable
          headers={data.promises_vs_reality.headers}
          rows={data.promises_vs_reality.rows}
          t={t}
        />
        <SourceNote text={data.promises_vs_reality.source} t={t} />
        <div className="mt-4 mb-10">
          <AnalysisBox title={data.promises_vs_reality.observations_title} text={data.promises_vs_reality.observations} t={t} />
        </div>

        {/* ── Post-Handover Performance ── */}
        <h3 style={{ color: t.text }} className="text-lg font-bold mb-1">
          {data.post_handover.h3}
        </h3>
        <p style={{ color: t.textMuted }} className="text-xs mb-3">{data.post_handover.subtitle}</p>
        <DataTable
          headers={data.post_handover.headers}
          rows={data.post_handover.rows}
          t={t}
        />
        <SourceNote text={data.post_handover.source} t={t} />
        <div className="mt-4 mb-10">
          <AnalysisBox title={data.post_handover.context_title} text={data.post_handover.context} t={t} />
        </div>

        {/* ── Strengths & Weaknesses ── */}
        <h4 style={{ color: t.text }} className="text-lg font-bold mb-4">
          {data.strengths_weaknesses.h4}
        </h4>

        {/* Strengths */}
        <span style={{ color: GOLD }} className="text-sm font-bold block mb-3">
          {data.strengths_weaknesses.strengths_title}
        </span>
        <DataTable
          headers={data.strengths_weaknesses.strengths_headers}
          rows={data.strengths_weaknesses.strengths}
          t={t}
        />

        {/* Weaknesses */}
        <span style={{ color: t.text }} className="text-sm font-bold block mt-6 mb-3">
          {data.strengths_weaknesses.weaknesses_title}
        </span>
        <DataTable
          headers={data.strengths_weaknesses.weaknesses_headers}
          rows={data.strengths_weaknesses.weaknesses}
          t={t}
        />
        <SourceNote text={data.strengths_weaknesses.source} t={t} />

        {/* ── Verification Framework ── */}
        <div className="mt-10 mb-8">
          <h4 style={{ color: t.text }} className="text-lg font-bold mb-1">
            {data.verification.h4}
          </h4>
          <p style={{ color: t.textMuted }} className="text-xs mb-4">{data.verification.subtitle}</p>
          <div className="space-y-2">
            {data.verification.steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-3 items-start rounded-xl p-3"
                style={{
                  background: t.isDark ? "rgba(255,255,255,0.02)" : "#ffffff",
                  border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
                }}
              >
                <span
                  style={{
                    color: GOLD,
                    background: GOLD_BG,
                    border: `1px solid ${GOLD_BORDER}`,
                    minWidth: "24px",
                    height: "24px"
                  }}
                  className="rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0"
                >
                  {i + 1}
                </span>
                <p style={{ color: t.textSecondary }} className="text-xs leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="rounded-xl p-4"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
            border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}`
          }}
        >
          <p style={{ color: t.textMuted }} className="text-[11px] leading-relaxed">
            {data.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrackRecordSection;