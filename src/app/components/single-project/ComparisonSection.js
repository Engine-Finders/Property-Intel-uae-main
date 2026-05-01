"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import SectionExpertCta from "./SectionExpertCta";

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
const GoldStarIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="m12 3 2.75 5.57 6.15.9-4.45 4.34 1.05 6.12L12 17.04 6.5 19.93l1.05-6.12L3.1 9.47l6.15-.9L12 3Z" />
  </svg>
);

const WinnerCard = ({ item, t }) => {
  return (
    <div
      className="border-b px-4 py-5 last:border-b-0"
      style={{ background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff", borderColor: t.cardBorder }}
    >
      <div className="flex items-start gap-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1", color: GOLD }}
        >
          <GoldStarIcon />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
            {item.category}
          </p>
          <p className="mt-1 text-sm font-semibold leading-5" style={{ color: t.text }}>
            {item.winner}
          </p>
          <p className="mt-2 text-sm leading-7" style={{ color: t.textSecondary }}>
            {item.rationale}
          </p>
        </div>
      </div>
    </div>
  );
};

const getProjectValue = (rows, feature, projectIndex) => {
  const row = rows.find((r) => r[0] === feature);
  return row ? row[projectIndex + 1] : "";
};

const StatLine = ({ label, sublabel, value, max = 6000000, color, t }) => {
  const raw = String(value);
  const parsed = Number(raw.replace(/[^0-9.]/g, "")) || 0;
  const number = raw.toLowerCase().includes("m") ? parsed * 1000000 : parsed;
  const width = Math.max(18, Math.min(100, (number / max) * 100));

  return (
    <div className="border-b py-4 last:border-b-0" style={{ borderColor: t.cardBorder }}>
      <div className="grid grid-cols-[1fr_1.2fr_auto] items-center gap-3">
        <div>
          <p className="text-sm font-semibold" style={{ color: t.text }}>{label}</p>
          <p className="text-xs" style={{ color: t.textMuted }}>{sublabel}</p>
        </div>
        <div className="h-2 rounded-full" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "#ebe7df" }}>
          <div className="h-full rounded-full" style={{ width: `${width}%`, background: color }} />
        </div>
        <p className="text-sm font-semibold whitespace-nowrap" style={{ color }}>{value}</p>
      </div>
    </div>
  );
};

const CompetitorDetail = ({ comp, projectMeta, activeIndex, t }) => {
  const rows = comp.rows || [];
  const colors = [GOLD, GOLD, "#286CFF"];
  const project = { ...projectMeta[activeIndex], color: colors[activeIndex] || GOLD };

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

const getCompetitorProjects = (comp, projectMeta) => {
  const rows = comp.rows || [];
  const names = (comp.headers || []).slice(1);
  const meta = [
    { icon: "♧", color: GOLD },
    { icon: "⚑", color: "#2f7d45" },
    { icon: "▥", color: "#286CFF" },
  ];

  return names.map((name, index) => ({
    name,
    developer: getProjectValue(rows, "Developer", index),
    location: getProjectValue(rows, "Location", index),
    unitTypes: getProjectValue(rows, "Unit Types", index),
    sizeRange: getProjectValue(rows, "Size Range", index),
    startingPrice: getProjectValue(rows, "Starting Price", index),
    priceSqft: getProjectValue(rows, "Price per sq.ft", index),
    handover: getProjectValue(rows, "Handover", index),
    paymentPlan: getProjectValue(rows, "Payment Plan", index),
    targetBuyer: getProjectValue(rows, "Target Buyer", index),
    amenities: getProjectValue(rows, "Amenities", index),
    riskFactor: getProjectValue(rows, "Risk Factor", index),
    badge: projectMeta[index]?.badge || "",
    ...meta[index],
  }));
};

const DesktopCompetitorCard = ({ project, t }) => {
  const detailCells = [
    ["Unit Types", project.unitTypes],
    ["Size Range", project.sizeRange],
    ["Starting Price", project.startingPrice],
    ["Price / sqft", project.priceSqft],
    ["Handover", project.handover],
    ["Payment Plan", project.paymentPlan],
  ];
  const footers = [
    ["Target Buyer", project.targetBuyer, "♙"],
    ["Amenities", project.amenities, "♧"],
    ["Risk Factor", project.riskFactor, "ⓘ"],
  ];

  return (
    <article
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff",
        border: `1px solid ${t.cardBorder}`,
      }}
    >
      {project.badge && (
        <span className="absolute left-5 top-3 rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: "#fbf3e1", color: GOLD }}>
          {project.badge}
        </span>
      )}
      <div className="flex gap-4 px-5 pb-5 pt-9">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ color: project.color, background: t.isDark ? "rgba(255,255,255,0.04)" : "#fbf7ef" }}>
          {project.icon}
        </span>
        <div>
          <h3 className="text-lg font-semibold leading-6" style={{ color: project.color }}>{project.name}</h3>
          <p className="mt-1 text-sm" style={{ color: t.textSecondary }}>{project.developer}</p>
          <p className="mt-1 text-xs" style={{ color: t.textMuted }}>⌖ {project.location}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 border-y" style={{ borderColor: t.cardBorder }}>
        {detailCells.map(([label, value], index) => (
          <div key={label} className="min-h-[86px] border-b border-r p-4 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0" style={{ borderColor: t.cardBorder }}>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: project.color }}>{label}</p>
            <p className="text-sm font-semibold leading-5" style={{ color: t.text }}>{value}</p>
          </div>
        ))}
      </div>
      <div>
        {footers.map(([label, value, icon]) => (
          <div key={label} className="flex gap-3 border-b p-4 last:border-b-0" style={{ borderColor: t.cardBorder }}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm" style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "#fbf4e8", color: project.color }}>
              {icon}
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: project.color }}>{label}</p>
              <p className="mt-1 text-xs leading-5" style={{ color: t.textSecondary }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

const DesktopWinnerPanel = ({ winners, t }) => (
  <div className="overflow-hidden rounded-2xl" style={{ background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
    <div className="grid grid-cols-[1fr_1fr_2.15fr] border-b px-6 py-3 text-xs font-semibold" style={{ borderColor: t.cardBorder, color: t.text }}>
      <span>Category</span>
      <span>Winner</span>
      <span>Rationale</span>
    </div>
    {(winners.rows || []).map((item, index) => {
      const accent = item.highlight ? GOLD : "#286CFF";
      return (
        <div key={item.category} className="grid grid-cols-[1fr_1fr_2.15fr] items-center border-b px-6 py-4 last:border-b-0" style={{ borderColor: t.cardBorder }}>
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "#fbf4e8", color: GOLD }}>
              <GoldStarIcon />
            </span>
            <span className="text-sm font-medium" style={{ color: t.text }}>{item.category}</span>
          </div>
          <span className="w-fit rounded-lg px-3 py-1 text-sm font-semibold" style={{ background: accent + "12", color: accent }}>
            {item.winner}
          </span>
          <p className="text-sm leading-6" style={{ color: t.textSecondary }}>{item.rationale}</p>
        </div>
      );
    })}
  </div>
);

const DesktopVerdictPanel = ({ verdict, t }) => (
  <div className="overflow-hidden rounded-2xl" style={{ background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
    <div className="grid grid-cols-[0.9fr_2fr]">
      <div className="border-r p-6" style={{ borderColor: t.cardBorder }}>
        <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{verdict.intro}</p>
      </div>
      <div className="grid grid-cols-3">
        {(verdict.points || []).map((point, index) => {
          const [title, desc] = String(point).split(" — ");
          return (
            <div key={point} className="border-r p-6 last:border-r-0" style={{ borderColor: t.cardBorder }}>
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg" style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "#fbf4e8", color: GOLD }}>
                {index + 1}
              </span>
              <p className="text-base font-semibold leading-6" style={{ color: t.text }}>{title}</p>
              {desc && <p className="mt-3 text-sm leading-6" style={{ color: t.textSecondary }}>{desc}</p>}
            </div>
          );
        })}
      </div>
    </div>
    <div className="border-t p-5" style={{ borderColor: t.cardBorder, background: t.isDark ? "rgba(182,138,53,0.08)" : "#fffaf0" }}>
      <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{verdict.closing}</p>
    </div>
  </div>
);

/* ── Main Component ── */
const ComparisonSection = ({ data }) => {
  const { t } = useTheme();
  const [openPanel, setOpenPanel] = useState("verdict");
  const [activeProject, setActiveProject] = useState(0);
  const toggle = (key) => setOpenPanel((prev) => (prev === key ? null : key));

  const comp = data.competitor_table || {};
  const winners = data.winner_table || {};
  const verdict = data.verdict || {};
  const projectTabs = data.mobile_project_tabs;
  const desktopProjects = getCompetitorProjects(comp, data.project_meta);

  return (
    <section id="comparison" className="pt-8 pb-0 lg:py-12 px-2 sm:px-6 lg:px-8" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <div
            className="relative overflow-hidden rounded-t-[28px] border"
            style={{
              minHeight: 300,
              background: t.isDark ? "#25282d" : "#fffdfa",
              borderColor: t.cardBorder,
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
              <h2 className="text-[2.8rem] font-semibold leading-[1.08]" style={{ color: t.text }}>
                <span className="block">How Serro at The Heights</span>
                <span className="block" style={{ color: GOLD }}>Stacks Up Against Competitors</span>
              </h2>
              <span className="mt-5 block h-px w-20" style={{ background: GOLD }} />
            </div>
          </div>

          <div
            className="rounded-b-[28px] border-x border-b p-5"
            style={{
              background: t.isDark ? t.cardBg : "#fffdfa",
              borderColor: t.cardBorder,
              boxShadow: t.isDark ? "none" : "0 16px 40px rgba(113,85,32,0.08)",
            }}
          >
            <div className="mb-5">
              <h3 className="text-2xl font-semibold" style={{ color: t.text }}>Direct Competitor Analysis</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6" style={{ color: t.textSecondary }}>{data.intro}</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {desktopProjects.map((project) => (
                <DesktopCompetitorCard key={project.name} project={project} t={t} />
              ))}
            </div>
            {comp.source && (
              <p className="mt-4 rounded-lg px-4 py-3 text-sm leading-6" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#fbf7ef", color: t.textMuted }}>
                ⓘ Sources: {comp.source}
              </p>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { key: "winners", title: `Summary - ${winners.title || "Who Wins on Value, Trust, and Lifestyle"}`, icon: <GoldStarIcon /> },
                { key: "verdict", title: verdict.title || "Strategic Verdict", icon: "◎" },
              ].map((panel) => {
                const active = openPanel === panel.key;
                return (
                  <button
                    key={panel.key}
                    type="button"
                    onClick={() => setOpenPanel(panel.key)}
                    className="flex items-center justify-between rounded-2xl p-5 text-left transition-all"
                    style={{
                      background: active ? (t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1") : (t.isDark ? "rgba(255,255,255,0.025)" : "#fff"),
                      border: `1px solid ${active ? "rgba(182,138,53,0.4)" : t.cardBorder}`,
                    }}
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full text-lg" style={{ background: GOLD, color: "#fff" }}>{panel.icon}</span>
                      <span className="text-lg font-semibold" style={{ color: t.text }}>{panel.title}</span>
                    </span>
                    <span style={{ color: GOLD }}>{active ? "⌄" : "›"}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              {openPanel === "winners" && <DesktopWinnerPanel winners={winners} t={t} />}
              {openPanel === "verdict" && <DesktopVerdictPanel verdict={verdict} t={t} />}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
        {/* Header */}
        <div className="mb-8">
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
            {data.mobile_price_glance.rows.map((row, index) => (
              <StatLine key={row.label} label={row.label} sublabel={data.project_meta[index]?.sublabel} value={row.value} color={row.color} t={t} />
            ))}
            <p className="mt-3 text-sm leading-6" style={{ color: t.textMuted }}>
              {data.mobile_price_glance.summary}
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
          <CompetitorDetail comp={comp} projectMeta={data.project_meta} activeIndex={activeProject} t={t} />
          {comp.source && (
            <p className="mt-3 rounded-lg px-3 py-2 text-sm leading-6" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#fbf7ef", color: t.textMuted }}>
              ⓘ Sources: {comp.source}
            </p>
          )}
        </div>

        {/* Winner Summary — expandable */}
        <Expandable title={`Summary - ${winners.title || "Who Wins on Value, Trust, and Lifestyle"}`} icon={<GoldStarIcon />} open={openPanel === "winners"} onToggle={() => toggle("winners")} t={t}>
          <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${t.cardBorder}` }}>
            {(winners.rows || []).map((item, i) => (
              <WinnerCard key={i} item={item} t={t} />
            ))}
          </div>
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

        </div>
        <SectionExpertCta cta={data.section_cta || data.cta} t={t} className="mt-6" />
      </div>
    </section>
  );
};

export default ComparisonSection;
