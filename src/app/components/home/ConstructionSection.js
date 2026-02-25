"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

/* ── Progress dot on the vertical timeline ── */
const TimelineDot = ({ milestone, isLast, t }) => {
  const isActive = milestone.status === "active";
  const dotBg = isActive ? "#B68A35" : t.isDark ? "#3a3d44" : "#cbd5e1";
  const dotBorder = isActive ? "#B68A35" : "transparent";
  const lineBg = t.isDark ? "#2a2d33" : "#e2e8f0";

  return (
    <div className="flex gap-4">
      {/* Left rail */}
      <div className="flex flex-col items-center">
        <div
          className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
          style={{ background: dotBg, border: `2px solid ${dotBorder}`, boxShadow: isActive ? "0 0 12px rgba(182,138,53,0.4)" : "none" }}
        >
          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
        {!isLast && <div className="w-px flex-1 min-h-[40px]" style={{ background: lineBg }} />}
      </div>

      {/* Content */}
      <div className="pb-6 -mt-0.5">
        <span className="text-[10px] font-bold tracking-wider" style={{ color: isActive ? "#B68A35" : t.textMuted }}>
          {milestone.year} {milestone.quarter}
        </span>
        <p className="text-xs font-bold mt-1" style={{ color: t.text }}>{milestone.label}</p>
        <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: t.textSecondary }}>{milestone.detail}</p>
      </div>
    </div>
  );
};

/* ── Animated construction progress bar ── */
const ProgressBar = ({ label, percent, t }) => {
  const [w, setW] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(percent); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [percent]);

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-[11px] font-semibold" style={{ color: t.text }}>{label}</span>
        <span className="text-[10px] font-bold" style={{ color: "#B68A35" }}>{percent}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: t.isDark ? "#2a2d33" : "#e2e8f0" }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: "linear-gradient(90deg, #B68A35, #D4A843)" }} />
      </div>
    </div>
  );
};

/* ── Responsive table helpers ── */
const MobileCards = ({ headers, rows, t }) => (
  <div className="space-y-3">
    {rows.map((row, i) => (
      <div key={i} className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
        {headers.map((h, j) => (
          <div key={j} className={`flex justify-between py-1.5 ${j < headers.length - 1 ? "border-b" : ""}`} style={{ borderColor: t.cardBorder }}>
            <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>{h}</span>
            <span className="text-[11px] font-semibold text-right max-w-[55%]" style={{ color: t.text }}>{row[j]}</span>
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

/* ── Photo placeholder grid ── */
const PhotoGrid = ({ photos, t }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {photos.map((photo) => (
      <div key={photo.id} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${t.cardBorder}` }}>
        <div
          className="aspect-video flex items-center justify-center"
          style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9" }}
        >
          <div className="text-center px-6">
            <span className="text-3xl block mb-2">📷</span>
            <span className="text-[10px] font-semibold" style={{ color: t.textMuted }}>Image {photo.id}</span>
          </div>
        </div>
        <div className="p-3">
          <p className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>{photo.caption}</p>
        </div>
      </div>
    ))}
  </div>
);

/* ── Main Component ── */
const ConstructionSection = ({ data }) => {
  const { t } = useTheme();
  const [showPair, setShowPair] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const tbl = data.timeline_table || {};
  const dur = data.duration_analysis || {};
  const milestones = data.milestones || [];
  const ground = data.on_ground || {};
  const photos = data.photo_placeholders || [];

  // Simulated early-stage progress
  const progressItems = [
    { label: "Site Preparation", percent: 15 },
    { label: "Foundation Works", percent: 5 },
    { label: "Infrastructure", percent: 3 },
    { label: "Vertical Construction", percent: 0 },
    { label: "Amenities & Landscaping", percent: 0 },
  ];

  return (
    <section id="construction" className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ background: t.bgAlt }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span
            className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: "#B68A3520", color: "#B68A35" }}
          >
            {data.badge}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: t.text }}>{data.title}</h2>
          <p className="text-sm" style={{ color: t.textMuted }}>{data.subtitle}</p>
        </div>

        {/* Timeline Table — always visible */}
        <div className="rounded-xl p-5 lg:p-7 mb-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>📅</span>
            Official Timeline vs. Market Reality
          </h3>
          <div className="block lg:hidden">
            <MobileCards headers={tbl.headers || []} rows={tbl.rows || []} t={t} />
          </div>
          <div className="hidden lg:block">
            <DesktopTable headers={tbl.headers || []} rows={tbl.rows || []} t={t} />
          </div>
          {tbl.source && (
            <p className="text-[10px] mt-3 italic" style={{ color: t.textMuted }}>Source: {tbl.source}</p>
          )}
        </div>

        {/* Construction Progress Bars — always visible */}
        <div className="rounded-xl p-5 lg:p-7 mb-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: t.text }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>🏗️</span>
            Estimated Construction Progress (Feb 2026)
          </h3>
          {progressItems.map((p, i) => (
            <ProgressBar key={i} label={p.label} percent={p.percent} t={t} />
          ))}
          <p className="text-[10px] mt-2 italic" style={{ color: t.textMuted }}>Estimates based on market intelligence. Verify via Dubai REST app.</p>
        </div>

        {/* Two-column layout on desktop: Duration Analysis + Milestone Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Duration Analysis — expandable */}
          <div className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <button onClick={() => setShowPair(!showPair)} className="w-full flex items-center justify-between p-5 lg:p-7 text-left">
              <h3 className="text-sm font-bold" style={{ color: t.text }}>{dur.title}</h3>
              <span className="text-xs transition-transform duration-300" style={{ color: t.textMuted, transform: showPair ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
            </button>
            {showPair && (
              <div className="px-5 lg:px-7 pb-5 lg:pb-7">
                <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>{dur.intro}</p>
                <div className="space-y-4">
                  {(dur.factors || []).map((f, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5" style={{ background: "#B68A3515", color: "#B68A35" }}>{i + 1}</span>
                      <div>
                        <p className="text-xs font-bold mb-0.5" style={{ color: t.text }}>{f.label}</p>
                        <p className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>{f.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Milestone Timeline — expandable */}
          <div className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <button onClick={() => setShowPair(!showPair)} className="w-full flex items-center justify-between p-5 lg:p-7 text-left">
              <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: t.text }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>🔶</span>
                Key Milestones
              </h3>
              <span className="text-xs transition-transform duration-300" style={{ color: t.textMuted, transform: showPair ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
            </button>
            {showPair && (
              <div className="px-5 lg:px-7 pb-5 lg:pb-7">
                {milestones.map((m, i) => (
                  <TimelineDot key={i} milestone={m} isLast={i === milestones.length - 1} t={t} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* On-Ground Intelligence */}
        <div className="rounded-xl p-5 lg:p-7 mb-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: t.text }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#3B82F620", color: "#3B82F6" }}>🔍</span>
            {ground.title}
          </h3>
          <div
            className="rounded-lg p-4 mb-4"
            style={{
              background: t.isDark ? "rgba(182,138,53,0.06)" : "rgba(182,138,53,0.04)",
              borderLeft: "3px solid #B68A35",
            }}
          >
            <p className="text-xs leading-relaxed italic" style={{ color: t.textSecondary }}>"{ground.quote}"</p>
          </div>
          <div
            className="rounded-lg p-4"
            style={{
              background: t.isDark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <div className="flex gap-2 items-start">
              <span className="text-sm mt-0.5">⚠️</span>
              <p className="text-xs leading-relaxed" style={{ color: t.isDark ? "#fcd34d" : "#92400e" }}>
                <strong>Verification Note:</strong> {ground.verification}
              </p>
            </div>
          </div>
        </div>

        {/* Photo Section — toggled */}
        <div className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <button
            onClick={() => setShowPhotos(!showPhotos)}
            className="w-full flex items-center justify-between p-5 lg:p-7 text-left"
          >
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: t.text }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>📸</span>
              Construction Photos & Site Updates
            </h3>
            <span
              className="text-xs transition-transform duration-300"
              style={{ color: t.textMuted, transform: showPhotos ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ▼
            </span>
          </button>
          {showPhotos && (
            <div className="px-5 lg:px-7 pb-5 lg:pb-7">
              <PhotoGrid photos={photos} t={t} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConstructionSection;
