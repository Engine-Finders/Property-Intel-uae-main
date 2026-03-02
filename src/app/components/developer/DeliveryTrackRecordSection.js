"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GREEN = "#10b981";

/* ── Animated Donut Segment ── */
const AnimatedDonut = ({ segments, size = 180, strokeWidth = 22 }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let offset = 0;
  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block mx-auto">
      {segments.map((seg, i) => {
        const dash = animated ? (seg.percent / 100) * circ : 0;
        const gap = circ - dash;
        const thisOffset = offset;
        offset += (seg.percent / 100) * circ;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-thisOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1.2s ease", transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        );
      })}
    </svg>
  );
};

/* ── Mobile Table Cards ── */
const MobileCards = ({ headers, rows, t }) => (
  <div className="lg:hidden space-y-3">
    {rows.map((row, i) => (
      <div key={i} className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
        {headers.map((h, j) => (
          <div key={j} className="flex justify-between py-1">
            <span className="text-xs font-medium" style={{ color: t.textMuted }}>{h}</span>
            <span className="text-xs text-right max-w-[55%]" style={{ color: j === 0 ? t.text : t.textSecondary }}>{row[j]}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

/* ── Desktop Table ── */
const DesktopTable = ({ headers, rows, t }) => (
  <div className="hidden lg:block overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
          {headers.map((h) => (
            <th key={h} className="text-left py-3 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${t.isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"}` }}>
            {row.map((cell, j) => (
              <td key={j} className={`py-3 px-3 ${j === 0 ? "font-medium" : ""}`} style={{ color: j === 0 ? t.text : t.textSecondary }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DeliveryTrackRecordSection = ({ data }) => {
  const { t } = useTheme();
  const d = data;

  const tableHeaders = ["Project Name", "Original Handover", "Actual Handover", "Delay (Months)", "Reason", "Source"];
  const tableRows = d.handover_table.map((r) => [r.project, r.original, r.actual, r.delay, r.reason, r.source]);

  const sentimentSegments = [
    { percent: d.sentiment.positive, color: GOLD, label: "Positive" },
    { percent: d.sentiment.neutral, color: t.isDark ? "#4a5568" : "#cbd5e1", label: "Neutral" },
    { percent: d.sentiment.negative, color: t.isDark ? "#2d3748" : "#94a3b8", label: "Negative" },
  ];

  return (
    <section style={{ background: t.bgAlt }} className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: GOLD }}>Delivery & Satisfaction</p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ color: t.text }}>{d.heading}</h2>
          <p className="text-sm lg:text-base leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>{d.subheading}</p>
        </div>

        {/* On-Time Delivery Rate */}
        <div className="rounded-2xl p-6 lg:p-8 mb-8 flex flex-col sm:flex-row items-center gap-6" style={{ background: `linear-gradient(135deg, rgba(182,138,53,0.08), rgba(182,138,53,0.02))`, border: `1px solid rgba(182,138,53,0.2)` }}>
          <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: `4px solid ${GOLD}` }}>
            <span className="text-2xl font-bold" style={{ color: GOLD }}>{d.on_time_rate}</span>
          </div>
          <div>
            <p className="text-lg font-semibold" style={{ color: t.text }}>On-Time Delivery Rate</p>
            <p className="text-sm mt-1" style={{ color: t.textSecondary }}>Based on official DLD handover records and RERA progress reports.</p>
          </div>
        </div>

        {/* H3: Handover Table */}
        <div className="rounded-2xl p-6 lg:p-8 mb-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Project Handover Analysis</h3>
          <p className="text-sm mb-6" style={{ color: t.textSecondary }}>{d.table_intro}</p>
          <DesktopTable headers={tableHeaders} rows={tableRows} t={t} />
          <MobileCards headers={tableHeaders} rows={tableRows} t={t} />
          <p className="text-[10px] mt-4 italic" style={{ color: t.textMuted }}>{d.table_note}</p>
        </div>

        {/* H3: Quality & Owner Satisfaction */}
        <div className="rounded-2xl p-6 lg:p-8 mb-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Quality & Owner Satisfaction Insights</h3>
          <p className="text-sm mb-6" style={{ color: t.textSecondary }}>{d.satisfaction_summary}</p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Donut */}
            <div className="flex flex-col items-center lg:w-1/3">
              <div className="relative">
                <AnimatedDonut segments={sentimentSegments} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold" style={{ color: GOLD }}>{d.sentiment.positive}%</span>
                  <span className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: t.textMuted }}>Owner Sentiment</span>
                </div>
              </div>
              {/* Legend */}
              <div className="flex gap-4 mt-4">
                {sentimentSegments.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: seg.color }} />
                    <span className="text-[10px]" style={{ color: t.textMuted }}>{seg.label} {seg.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pros / Cons */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pros */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: GREEN }}>Pros</p>
                <ul className="space-y-2">
                  {d.pros.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={GREEN} strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm" style={{ color: t.textSecondary }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Cons */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#f59e0b" }}>Cons</p>
                <ul className="space-y-2">
                  {d.cons.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#f59e0b" }} />
                      <span className="text-sm" style={{ color: t.textSecondary }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
            <p className="text-[10px]" style={{ color: t.textMuted }}>
              <span className="font-semibold">Sources:</span> {d.satisfaction_sources}
            </p>
          </div>
        </div>

        {/* H3: On-Ground Analyst Insight */}
        <div className="rounded-2xl p-6 lg:p-8 mb-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(182,138,53,0.15)" }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={GOLD} strokeWidth="1.5">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: t.text }}>On-Ground Analyst Insight</h3>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>PropertyIntel Research Team</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{d.analyst_insight}</p>
          <p className="text-[10px] mt-4 italic" style={{ color: t.textMuted }}>{d.analyst_source}</p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl p-5" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: t.textMuted }}>{d.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default DeliveryTrackRecordSection;
