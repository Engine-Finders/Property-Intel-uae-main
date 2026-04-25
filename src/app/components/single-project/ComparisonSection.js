"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";

/* ── Expandable Card wrapper ── */
const Expandable = ({ title, icon, open, onToggle, children, t }) => (
  <div className="rounded-xl overflow-hidden mb-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <button onClick={onToggle} className="w-full flex items-center justify-between p-4 lg:p-5 text-left">
      <h3 className="text-sm sm:text-base font-semibold flex items-center gap-3" style={{ color: t.text }}>
        {icon && (
        <span className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: GOLD, color: "#fff" }}>{icon}</span>
        )}
        {title}
      </h3>
      <span className="text-lg transition-transform duration-300" style={{ color: GOLD, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
    </button>
    {open && <div className="border-t px-4 lg:px-5 py-5" style={{ borderColor: t.cardBorder }}>{children}</div>}
  </div>
);

/* ── Winner row card ── */
const WinnerCard = ({ item, t }) => {
  const isSerro = item.winner.toLowerCase().includes("serro");
  const accentColor = isSerro ? "#B68A35" : "#3B82F6";

  return (
    <div className="rounded-lg p-4 mb-3" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}`, borderLeft: `3px solid ${accentColor}` }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-sm">{item.emoji}</span>
        <span className="text-sm font-semibold" style={{ color: t.text }}>{item.category}</span>
        <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: accentColor + "15", color: accentColor }}>{item.winner}</span>
      </div>
      <p className="text-sm leading-6" style={{ color: t.textSecondary }}>{item.rationale}</p>
    </div>
  );
};

const getProjectValue = (rows, feature, projectIndex) => {
  const row = rows.find((r) => r[0] === feature);
  return row ? row[projectIndex + 1] : "";
};

const StatLine = ({ label, value, max = 6000000, color, t }) => {
  const raw = String(value);
  const parsed = Number(raw.replace(/[^0-9.]/g, "")) || 0;
  const number = raw.toLowerCase().includes("m") ? parsed * 1000000 : parsed;
  const width = Math.max(18, Math.min(100, (number / max) * 100));

  return (
    <div className="border-b py-4 last:border-b-0" style={{ borderColor: t.cardBorder }}>
      <div className="grid grid-cols-[1fr_1.2fr_auto] items-center gap-3">
        <div>
          <p className="text-sm font-semibold" style={{ color: t.text }}>{label}</p>
          <p className="text-xs" style={{ color: t.textMuted }}>{label === "Serro" ? "The Heights" : label === "Emaar South" ? "Golf Place" : "Phase VI"}</p>
        </div>
        <div className="h-2 rounded-full" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "#ebe7df" }}>
          <div className="h-full rounded-full" style={{ width: `${width}%`, background: color }} />
        </div>
        <p className="text-sm font-semibold whitespace-nowrap" style={{ color }}>{value}</p>
      </div>
    </div>
  );
};

const CompetitorDetail = ({ comp, activeIndex, t }) => {
  const rows = comp.rows || [];
  const projects = [
    { short: "Serro at The Heights", brand: "Emaar Properties", badge: "Premium pick", color: GOLD },
    { short: "Emaar South — Golf Place", brand: "Emaar Properties", badge: "Emaar Properties", color: GOLD },
    { short: "Dubai South Residential", brand: "Various (Dubai South Development)", badge: "Dubai South Development", color: "#286CFF" },
  ];
  const project = projects[activeIndex] || projects[0];

  const details = [
    ["Unit Types", getProjectValue(rows, "Unit Types", activeIndex)],
    ["Size Range", getProjectValue(rows, "Size Range", activeIndex)],
    ["Starting Price", getProjectValue(rows, "Starting Price", activeIndex)],
    ["Price / sqft", getProjectValue(rows, "Price per sq.ft", activeIndex)],
    ["Handover", getProjectValue(rows, "Handover", activeIndex)],
    ["Payment Plan", getProjectValue(rows, "Payment Plan", activeIndex)],
  ];

  const extras = [
    ["Target Buyer", getProjectValue(rows, "Target Buyer", activeIndex), "👤"],
    ["Amenities", getProjectValue(rows, "Amenities", activeIndex), "♧"],
    ["Risk Factor", getProjectValue(rows, "Risk Factor", activeIndex), "ⓘ"],
  ];

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
      <div className="p-4">
        <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold mb-4" style={{ background: t.isDark ? "rgba(182,138,53,0.15)" : "#faf4e7", color: GOLD }}>
          {project.badge}
        </span>
        <h3 className="text-lg font-semibold mb-1" style={{ color: t.text }}>{project.short}</h3>
        <p className="text-sm mb-2" style={{ color: t.textSecondary }}>{project.brand}</p>
        <p className="text-sm" style={{ color: t.textMuted }}>⌖ {getProjectValue(rows, "Location", activeIndex)}</p>
      </div>

      <div className="grid grid-cols-2 border-t" style={{ borderColor: t.cardBorder }}>
        {details.map(([label, value], index) => (
          <div key={label} className="border-b border-r p-4 even:border-r-0" style={{ borderColor: t.cardBorder }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: GOLD }}>{label}</p>
            <p className="text-sm font-semibold leading-6" style={{ color: index === 2 && activeIndex === 2 ? "#286CFF" : t.text }}>{value}</p>
          </div>
        ))}
      </div>

      <div>
        {extras.map(([label, value, icon]) => (
          <div key={label} className="flex gap-3 border-t p-4" style={{ borderColor: t.cardBorder }}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "#fbf4e8", color: GOLD }}>
              {icon}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: GOLD }}>{label}</p>
              <p className="text-sm leading-6" style={{ color: t.textSecondary }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Component ── */
const ComparisonSection = ({ data }) => {
  const { t } = useTheme();
  const [openPanel, setOpenPanel] = useState("verdict");
  const [activeProject, setActiveProject] = useState(0);
  const toggle = (key) => setOpenPanel((prev) => (prev === key ? null : key));

  const comp = data.competitor_table || {};
  const winners = data.winner_table || {};
  const verdict = data.verdict || {};
  const projectTabs = ["Serro\nThe Heights", "Emaar South\nGolf Place", "Dubai South\nPhase VI"];

  return (
    <section id="comparison" className="py-8 lg:py-12 px-2 sm:px-6 lg:px-8" style={{ background: t.bg }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4" style={{ background: "#B68A3520", color: "#B68A35" }}>
            {data.badge}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: t.text }}>
            <span className="block">How Serro at The Heights</span>
            <span className="block" style={{ color: GOLD }}>Stacks Up Against Competitors</span>
          </h2>
          <p className="text-sm leading-6 max-w-3xl" style={{ color: t.textSecondary }}>{data.intro}</p>
        </div>

        <div className="mb-8 rounded-xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <h3 className="mb-4 text-lg font-semibold" style={{ color: t.text }}>Starting price at a glance</h3>
          <div className="rounded-xl p-4" style={{ border: `1px solid ${t.cardBorder}` }}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>Entry Price — 3 Bedroom</p>
            <StatLine label="Serro" value="AED 6.0M" color={GOLD} t={t} />
            <StatLine label="Emaar South" value="AED 3.8M" color="#9eba6e" t={t} />
            <StatLine label="Dubai South" value="AED 1.47M" color="#6f9fca" t={t} />
            <p className="mt-3 text-sm leading-6" style={{ color: t.textMuted }}>
              Price per sqft: Serro ~AED 1,732 · Emaar South ~AED 1,550–1,700 · Dubai South ~AED 700–900
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold" style={{ color: t.text }}>Direct Competitor Analysis</h3>
          <div className="mb-4 grid grid-cols-3 overflow-hidden rounded-xl" style={{ border: `1px solid ${t.cardBorder}` }}>
            {projectTabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveProject(index)}
                className="min-h-[58px] whitespace-pre-line border-r px-2 py-3 text-xs sm:text-sm font-medium last:border-r-0"
                style={{
                  borderColor: t.cardBorder,
                  background: activeProject === index ? GOLD : t.cardBg,
                  color: activeProject === index ? "#fff" : t.text,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <CompetitorDetail comp={comp} activeIndex={activeProject} t={t} />
          {comp.source && (
            <p className="mt-3 rounded-lg px-3 py-2 text-sm leading-6" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#fbf7ef", color: t.textMuted }}>
              ⓘ Sources: {comp.source}
            </p>
          )}
        </div>

        {/* Winner Summary — expandable */}
        <Expandable title={`Summary - ${winners.title || "Who Wins on Value, Trust, and Lifestyle"}`} icon="▧" open={openPanel === "winners"} onToggle={() => toggle("winners")} t={t}>
          {(winners.rows || []).map((item, i) => (
            <WinnerCard key={i} item={item} t={t} />
          ))}
        </Expandable>

        <Expandable title={verdict.title || "Strategic Verdict"} icon="◎" open={openPanel === "verdict"} onToggle={() => toggle("verdict")} t={t}>
          <p className="text-sm leading-6 mb-5" style={{ color: t.textSecondary }}>{verdict.intro}</p>
          <div className="divide-y mb-5" style={{ borderColor: t.cardBorder }}>
            {(verdict.points || []).map((p, i) => {
              const [title, desc] = String(p).split(" — ");
              return (
                <div key={i} className="flex gap-4 py-5 first:pt-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold" style={{ background: "#fbf3e3", color: GOLD }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: t.text }}>{title}</p>
                    {desc && <p className="text-sm leading-6" style={{ color: t.textSecondary }}>{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-l-2 p-4" style={{ borderColor: GOLD, background: t.isDark ? "rgba(182,138,53,0.08)" : "#fffaf0" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: GOLD }}>Bottom Line</p>
            <p className="text-sm leading-6" style={{ color: t.textSecondary }}>{verdict.closing}</p>
          </div>
        </Expandable>

        {/* CTA — after Strategic Verdict */}
        {data.cta && (
          <div className="mt-6 flex flex-col items-start gap-2">
            <a
              href={data.cta.href || "#"}
              className="px-6 py-3.5 rounded-lg font-semibold text-sm text-white transition-colors hover:opacity-90 inline-block"
              style={{ background: "#B68A35" }}
            >
              {data.cta.button_text}
            </a>
            {data.cta.subtext && (
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: t.textMuted }}>{data.cta.subtext}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonSection;
