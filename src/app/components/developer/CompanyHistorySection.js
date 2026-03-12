"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";

const TimelineDot = ({ year, shortLabel, label, isLast, t }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ minWidth: 100, maxWidth: 140 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover tooltip */}
      {hovered && label && (
        <div
          className="absolute bottom-full mb-3 px-3 py-2 rounded-lg text-xs text-center z-10"
          style={{
            background: t.isDark ? "#2a2d33" : "#fff",
            color: t.textSecondary,
            border: `1px solid ${t.cardBorder}`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            width: 180,
            left: "50%",
            transform: "translateX(-50%)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {label}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `6px solid ${t.isDark ? "#2a2d33" : "#fff"}`,
            }}
          />
        </div>
      )}
      {/* Dot */}
      <div
        className="w-3.5 h-3.5 rounded-full border-2 z-[1] cursor-pointer transition-transform"
        style={{
          borderColor: GOLD,
          background: hovered ? GOLD : (t.isDark ? "#1a1c1f" : "#f8fafc"),
          transform: hovered ? "scale(1.4)" : "scale(1)",
        }}
      />
      {/* Year */}
      <span
        className="text-xs font-semibold mt-2"
        style={{ color: hovered ? GOLD : t.text }}
      >
        {year}
      </span>
      {/* Short label always visible */}
      <span
        className="text-[10px] leading-tight mt-1 text-center"
        style={{ color: t.textMuted, maxWidth: 120 }}
      >
        {shortLabel}
      </span>
    </div>
  );
};

const LeaderCard = ({ name, title, bio, highlights, t }) => (
  <div
    className="rounded-2xl overflow-hidden"
    style={{
      background: t.cardBg,
      border: `1px solid ${t.cardBorder}`,
      boxShadow: t.isDark ? "none" : "0 2px 12px rgba(0,0,0,0.04)",
    }}
  >
    {/* Gold top accent */}
    <div style={{ height: 3, background: `linear-gradient(90deg, ${GOLD}, rgba(182,138,53,0.3))` }} />
    <div className="p-5 sm:p-6 space-y-4">
      {/* Heading + portrait row (mobile and desktop) */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4
            className="text-base sm:text-lg font-bold"
            style={{ color: t.text, fontFamily: "Georgia, serif" }}
          >
            {name}
          </h4>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.15em] mt-1"
            style={{ color: GOLD }}
          >
            {title}
          </p>
        </div>
        <div className="flex justify-end flex-shrink-0">
          <div
            className="w-24 h-32 sm:w-28 sm:h-36 rounded-lg flex-shrink-0 flex items-center justify-center"
            style={{
              background: t.isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.05)",
              border: `2px solid ${GOLD}`,
            }}
          >
            <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke={GOLD} strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>
      {/* Bio + highlights full width */}
      <div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }}>
          {bio}
        </p>
        <ul className="space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: t.textSecondary }}>
              <span className="mt-0.5" style={{ color: GOLD }}>▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const DonutChart = ({ segments, t }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {segments.map((seg, i) => {
        const offset = (cumulative / total) * circumference;
        const length = (seg.value / total) * circumference;
        cumulative += seg.value;
        return (
          <circle
            key={i}
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="14"
            strokeDasharray={`${length} ${circumference - length}`}
            strokeDashoffset={-offset}
            className="-rotate-90 origin-center"
          />
        );
      })}
    </svg>
  );
};

const SourcesAccordion = ({ sources, t }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4"
      >
        <span className="text-lg font-semibold" style={{ color: t.text }}>
          Sources & Verification
        </span>
        <ChevronDown
          className="w-5 h-5 transition-transform duration-200"
          style={{ color: t.textMuted, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-5 sm:px-6 pb-5">
          {sources.map((src, i) => (
            <div
              key={i}
              className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(182,138,53,0.1)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={GOLD} strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs mb-1" style={{ color: t.textMuted }}>{src.fact}</p>
                <p className="text-sm font-semibold" style={{ color: t.text }}>{src.source}</p>
                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs inline-flex items-center gap-1 mt-1.5 hover:underline"
                    style={{ color: GOLD }}
                  >
                    View Source
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CompanyHistorySection = ({ data }) => {
  const { t } = useTheme();
  const d = data.company_history;

  const milestones = d.milestones;
  const leaders = d.leadership;
  const ownership = d.ownership;
  const sources = d.sources;

  const donutSegments = [
    { value: 22.27, color: GOLD, label: "Investment Corporation of Dubai (ICD)" },
    { value: 70.27, color: t.isDark ? "rgba(255,255,255,0.12)" : "#cbd5e1", label: "Public & Institutional Investors" },
    { value: 7.46, color: t.isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0", label: "Other / Undisclosed" },
  ];

  return (
    <section style={{ background: t.bg }} className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        {/* Mobile: headings + portrait in one row, paragraph below full-width */}
        <div className="sm:hidden mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
                style={{ color: GOLD }}
              >
                Corporate Profile
              </p>
              <h2
                className="text-xl font-bold mb-2"
                style={{ color: t.text }}
              >
                Emaar Leadership & Company History
              </h2>
              <h3 className="text-lg font-semibold" style={{ color: t.text }}>
                Founding & History
              </h3>
            </div>
            <div className="flex justify-end flex-shrink-0">
              <div
                className="w-24 h-32 rounded-lg flex items-center justify-center"
                style={{
                  background: t.isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.05)",
                  border: `2px solid ${GOLD}`,
                }}
              >
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke={GOLD} strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }}>
            {d.founding_story}
          </p>
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {[
              { label: "Founded", value: d.founded },
              { label: "Founder", value: d.founder },
              { label: "Listed", value: d.listed },
            ].map((chip, i) => (
              <div
                key={i}
                className="rounded-full px-3 py-1 text-[10px] whitespace-nowrap"
                style={{
                  background: t.isDark ? "rgba(182,138,53,0.1)" : "rgba(182,138,53,0.08)",
                  border: `1px solid rgba(182,138,53,0.25)`,
                  color: t.text,
                }}
              >
                <span style={{ color: GOLD }}>{chip.label}:</span>{" "}
                <span className="font-semibold">{chip.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop / tablet: original layout, text left image right */}
        <div className="hidden sm:flex sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
          <div className="flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
              style={{ color: GOLD }}
            >
              Corporate Profile
            </p>
            <h2
              className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
              style={{ color: t.text }}
            >
              Emaar Leadership & Company History
            </h2>
            <h3 className="text-lg font-semibold mb-3" style={{ color: t.text }}>
              Founding & History
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }}>
              {d.founding_story}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Founded", value: d.founded },
                { label: "Founder", value: d.founder },
                { label: "Listed", value: d.listed },
              ].map((chip, i) => (
                <div
                  key={i}
                  className="rounded-full px-3 py-1 text-[10px] whitespace-nowrap"
                  style={{
                    background: t.isDark ? "rgba(182,138,53,0.1)" : "rgba(182,138,53,0.08)",
                    border: `1px solid rgba(182,138,53,0.25)`,
                    color: t.text,
                  }}
                >
                  <span style={{ color: GOLD }}>{chip.label}:</span>{" "}
                  <span className="font-semibold">{chip.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end flex-shrink-0">
            <div
              className="w-28 h-36 sm:w-32 sm:h-40 rounded-lg flex items-center justify-center"
              style={{
                background: t.isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.05)",
                border: `2px solid ${GOLD}`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke={GOLD} strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── TIMELINE ─── */}
        <div className="mb-8">

          {/* Timeline */}
          <div
            className="rounded-2xl p-5 sm:p-6 overflow-x-auto"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-5 text-center sm:text-left" style={{ color: t.textMuted }}>
              Key Milestones
            </p>
            <div className="relative flex items-start justify-between pb-2" style={{ minWidth: milestones.length * 120 }}>
              {/* Gold line */}
              <div
                className="absolute top-[6px] left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, ${GOLD}, rgba(182,138,53,0.2))` }}
              />
              {milestones.map((m, i) => (
                <TimelineDot
                  key={i}
                  year={m.year}
                  shortLabel={m.shortLabel}
                  label={m.label}
                  isLast={i === milestones.length - 1}
                  t={t}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── LEADERSHIP ─── */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>
            Leadership Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {leaders.map((leader, i) => (
              <LeaderCard key={i} {...leader} t={t} />
            ))}
          </div>
        </div>

        {/* ─── OWNERSHIP ─── */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>
            Ownership Structure
          </h3>
          <div
            className="rounded-2xl p-5 sm:p-6"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Donut */}
              <div className="w-44 h-44 mx-auto sm:mx-0 relative">
                <DonutChart segments={donutSegments} t={t} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold" style={{ color: t.text }}>DFM</span>
                  <span className="text-[10px]" style={{ color: t.textMuted }}>EMAAR</span>
                </div>
              </div>
              {/* Stats */}
              <div className="space-y-4">
                {ownership.shareholders.map((s, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ background: i === 0 ? GOLD : (t.isDark ? "rgba(255,255,255,0.12)" : "#cbd5e1") }}
                      />
                      <p className="text-sm font-medium" style={{ color: t.text }}>
                        {s.name}{" "}
                        <span className="font-bold" style={{ color: i === 0 ? GOLD : t.text }}>
                          {s.percentage}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 mt-2"
                  style={{
                    background: "rgba(182,138,53,0.08)",
                    border: "1px solid rgba(182,138,53,0.2)",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={GOLD} strokeWidth="1.5">
                    <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: GOLD }}>
                    Publicly Listed on DFM (EMAAR)
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs mt-4 leading-relaxed" style={{ color: t.textMuted }}>
              {ownership.description}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mb-8">
          <a
            href="#"
            className="inline-block rounded-xl px-6 py-3 font-semibold text-sm sm:text-base transition-opacity hover:opacity-95"
            style={{ background: GOLD, color: "#fff" }}
          >
            Speak to an Emaar Investment Expert
          </a>
          <p className="mt-2 text-xs sm:text-sm" style={{ color: t.textSecondary }}>
            Get personalized guidance on Emaar's financial strength, leadership, and long-term stability.
          </p>
        </div>

        {/* ─── SOURCES ─── */}
        <SourcesAccordion sources={sources} t={t} />
      </div>
    </section>
  );
};

export default CompanyHistorySection;
