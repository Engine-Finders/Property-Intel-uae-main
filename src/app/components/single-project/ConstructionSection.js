"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import SectionExpertCta from "./SectionExpertCta";

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
        <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: isActive ? "#B68A35" : t.textMuted }}>
          {milestone.year} {milestone.quarter}
        </span>
        <p className="text-sm font-semibold mt-1" style={{ color: t.text }}>{milestone.label}</p>
        <p className="text-sm leading-6 mt-0.5" style={{ color: t.textSecondary }}>{milestone.detail}</p>
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
        <span className="text-sm font-semibold" style={{ color: t.text }}>{label}</span>
        <span className="text-sm font-semibold" style={{ color: "#B68A35" }}>{percent}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: t.isDark ? "#2a2d33" : "#e2e8f0" }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: "linear-gradient(90deg, #B68A35, #D4A843)" }} />
      </div>
    </div>
  );
};

const GOLD = "#B68A35";

const ConstructionIcon = ({ name, size = 22, color = GOLD }) => {
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

  if (name === "calendar") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
      </svg>
    );
  }

  if (name === "duration") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 15v-4" />
        <path d="M12 15V8" />
        <path d="M16 15v-9" />
      </svg>
    );
  }

  if (name === "timeline") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    );
  }

  if (name === "intel") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    );
  }

  if (name === "camera") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 8h4l2-2h4l2 2h4v11H4z" />
        <circle cx="12" cy="13.5" r="3" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
};

const IconBadge = ({ icon, t }) => (
  <span
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
    style={{ background: t.isDark ? "rgba(182,138,53,0.18)" : "#b68a35", color: "#fff" }}
  >
    <ConstructionIcon name={icon} size={19} color="#fff" />
  </span>
);

const ConstructionTable = ({ headers, rows, t }) => (
  <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${t.cardBorder}` }}>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-separate border-spacing-0 text-[13px] sm:text-sm">
        <thead>
          <tr style={{ background: t.isDark ? "rgba(255,255,255,0.05)" : "#fbf7ef" }}>
            {headers.map((h, i) => (
              <th
                key={h}
                className="border-r px-4 py-3.5 text-left font-semibold last:border-r-0"
                style={{ color: i === 0 ? t.text : GOLD, borderColor: t.cardBorder }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-r border-t px-4 py-3.5 align-middle leading-6 last:border-r-0"
                  style={{
                    borderColor: t.cardBorder,
                    color: j === 0 ? t.text : t.textSecondary,
                    fontWeight: j === 0 ? 600 : 400,
                    textAlign: j === 0 ? "left" : "center",
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
  </div>
);

const MiniAccordion = ({ title, icon, open, onToggle, children, t }) => (
  <div className="overflow-hidden rounded-xl" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <button type="button" onClick={onToggle} className="flex w-full items-center gap-3 px-4 py-4 text-left">
      <IconBadge icon={icon} t={t} />
      <h3 className="flex-1 text-base font-semibold leading-6" style={{ color: t.text }}>{title}</h3>
      <span className={`transition-transform ${open ? "rotate-180" : ""}`} style={{ color: GOLD }}>⌄</span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[1800px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="border-t p-4" style={{ borderColor: t.cardBorder }}>
        {children}
      </div>
    </div>
  </div>
);

const PhotoAccordionList = ({ photos, openPhoto, onToggle, t }) => (
  <div className="space-y-4">
    {photos.map((photo) => {
      const open = openPhoto === photo.id;

      return (
        <div key={photo.id} className="overflow-hidden rounded-xl" style={{ border: `1px solid ${t.cardBorder}` }}>
          <div className="relative h-44" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#eeeae2" }}>
            <span className="absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: "#fffdfa", color: GOLD }}>
              {photo.label}
            </span>
            <span className="absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.82)", color: t.text }}>
              {photo.title}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onToggle(open ? null : photo.id)}
            className="flex w-full items-center gap-2 px-4 py-3 text-left"
            style={{ color: t.text }}
          >
            <ConstructionIcon name="camera" size={16} />
            <span className="flex-1 text-sm font-medium">View Caption</span>
            <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
            <p className="border-t px-4 py-4 text-sm leading-6" style={{ color: t.textSecondary, borderColor: t.cardBorder }}>
              {photo.caption}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

const DesktopPhotoCards = ({ photos, t }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {photos.map((photo, index) => {
        const image = photo.image || photo.src;

        return (
          <article
            key={photo.id}
            className="overflow-hidden rounded-xl"
            style={{
              background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff",
              border: `1px solid ${t.cardBorder}`,
            }}
          >
            <div
              className="relative h-32 bg-cover bg-center"
              style={{
                backgroundImage: image
                  ? `url('${image}')`
                  : t.isDark
                    ? "linear-gradient(135deg, rgba(182,138,53,0.26), rgba(255,255,255,0.04))"
                    : "linear-gradient(135deg, #d8c3a0, #f7ead3)",
              }}
            >
              <span
                className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold"
                style={{ background: "rgba(255,255,255,0.9)", color: t.isDark ? "#5b4218" : t.text }}
              >
                {photo.label}
              </span>
            </div>
            <div className="flex gap-2 px-4 py-4">
              <ConstructionIcon name="camera" size={14} color={GOLD} />
              <p className="text-xs leading-5" style={{ color: t.textSecondary }}>
                {photo.title}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

/* ── Main Component ── */
const ConstructionSection = ({ data }) => {
  const { t } = useTheme();
  const [openMilestones, setOpenMilestones] = useState(true);
  const [openIntel, setOpenIntel] = useState(true);
  const [showPhotos, setShowPhotos] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(null);
  const [activeDesktopPanel, setActiveDesktopPanel] = useState("milestones");

  const tbl = data.timeline_table || {};
  const dur = data.duration_analysis || {};
  const milestones = data.milestones || [];
  const ground = data.on_ground || {};
  const photos = data.photo_placeholders || [];

  const progressItems = data.progress_items;
  const desktopPanels = data.desktop_panels.map((panel) => ({
    ...panel,
    icon: panel.id === "milestones" ? "calendar" : panel.id === "intel" ? "intel" : "camera",
    title: panel.id === "intel" ? ground.title : panel.title,
  }));

  return (
    <section id="construction" className="py-8 lg:py-12 px-2 sm:px-6 lg:px-8" style={{ background: t.bgAlt }}>
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
            <div className="relative z-10 max-w-[560px] px-8 py-12">
              <h2 className="text-[3rem] font-semibold leading-[1.05]" style={{ color: t.text }}>
                Construction Progress &amp;
                <span className="block italic" style={{ color: GOLD }}>
                  Handover Outlook
                </span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7" style={{ color: t.textSecondary }}>
                {data.intro}
              </p>
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
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
                <h3 className="mb-4 flex items-center gap-3 text-lg font-semibold" style={{ color: t.text }}>
                  <ConstructionIcon name="calendar" size={22} />
                  Official Timeline vs. Market Reality
                </h3>
                <ConstructionTable headers={tbl.headers || []} rows={tbl.rows || []} t={t} />
                {tbl.source && (
                  <p className="mt-3 text-xs italic" style={{ color: t.textMuted }}>
                    <span style={{ color: GOLD }}>Source:</span> {tbl.source}
                  </p>
                )}
              </div>

              <div className="rounded-2xl p-5" style={{ background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
                <h3 className="mb-5 flex items-center gap-3 text-lg font-semibold" style={{ color: t.text }}>
                  <ConstructionIcon name="duration" size={22} />
                  {data.progress_title}
                </h3>
                {progressItems.map((p, i) => (
                  <ProgressBar key={i} label={p.label} percent={p.percent} t={t} />
                ))}
                <p className="mt-4 rounded-lg px-4 py-3 text-xs" style={{ color: t.textMuted, background: t.isDark ? "rgba(182,138,53,0.08)" : "#fbf3e1" }}>
                  {data.progress_note}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl p-6" style={{ background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
              <h3 className="mb-3 flex items-center gap-3 text-xl font-semibold" style={{ color: t.text }}>
                <ConstructionIcon name="duration" size={24} />
                {dur.title}
              </h3>
              <p className="max-w-4xl text-sm leading-7" style={{ color: t.textSecondary }}>{dur.intro}</p>
              <div className="mt-6 grid grid-cols-3 gap-6">
                {(dur.factors || []).map((f, i) => (
                  <div key={f.label} className="border-r pr-6 last:border-r-0" style={{ borderColor: t.cardBorder }}>
                    <div className="mb-4 flex items-center gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: GOLD }}>
                        {i + 1}
                      </span>
                      <p className="text-base font-semibold" style={{ color: t.text }}>{f.label}</p>
                    </div>
                    <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{f.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {desktopPanels.map((panel) => {
                const active = activeDesktopPanel === panel.id;
                return (
                  <button
                    key={panel.id}
                    type="button"
                    onClick={() => setActiveDesktopPanel(panel.id)}
                    className="flex items-center gap-4 rounded-2xl p-5 text-left transition-all"
                    style={{
                      background: active ? (t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1") : (t.isDark ? "rgba(255,255,255,0.025)" : "#fff"),
                      border: `1px solid ${active ? "rgba(182,138,53,0.4)" : t.cardBorder}`,
                    }}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: GOLD, color: "#fff" }}>
                      <ConstructionIcon name={panel.icon} size={20} color="#fff" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold" style={{ color: t.text }}>{panel.title}</span>
                      <span className="mt-1 block text-xs leading-5" style={{ color: t.textMuted }}>{panel.subtitle}</span>
                    </span>
                    <span style={{ color: GOLD }}>{active ? "⌄" : "›"}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl p-5" style={{ background: t.isDark ? "rgba(255,255,255,0.025)" : "#fff", border: `1px solid ${t.cardBorder}` }}>
              {activeDesktopPanel === "milestones" && (
                <div className="overflow-x-auto pb-2">
                  <div className="grid min-w-[980px] grid-cols-5 gap-0">
                    {milestones.map((m, i) => {
                      const isActive = m.status === "active";
                      return (
                        <div key={`${m.year}-${m.label}`} className="relative border-r px-4 last:border-r-0" style={{ borderColor: t.cardBorder }}>
                          <div className="absolute left-4 right-0 top-4 h-px" style={{ background: t.cardBorder }} />
                          <span className="relative z-10 mb-4 block h-3 w-3 rounded-full" style={{ background: isActive ? "#3f8f3f" : "#d7c8ac" }} />
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: isActive ? "#3f8f3f" : GOLD }}>
                            {m.year} — {m.quarter}
                          </p>
                          <p className="mt-2 text-sm font-semibold" style={{ color: t.text }}>{m.label}</p>
                          <p className="mt-2 text-xs leading-5" style={{ color: t.textSecondary }}>{m.detail}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeDesktopPanel === "intel" && (
                <div className="grid grid-cols-[1fr_0.8fr] gap-5">
                  <div className="rounded-xl p-5" style={{ background: t.isDark ? "rgba(182,138,53,0.06)" : "rgba(182,138,53,0.04)", borderLeft: "3px solid #B68A35" }}>
                    <span className="block text-4xl leading-none" style={{ color: GOLD }}>“</span>
                    <p className="text-sm leading-7 italic" style={{ color: t.textSecondary }}>{ground.quote}</p>
                  </div>
                  <div className="rounded-xl p-5" style={{ background: t.isDark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
                    <div className="flex gap-3">
                      <ConstructionIcon name="intel" size={20} color="#B68A35" />
                      <p className="text-sm leading-7" style={{ color: t.isDark ? "#fcd34d" : "#92400e" }}>
                        <strong>Verification Note:</strong> {ground.verification}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDesktopPanel === "photos" && (
                <DesktopPhotoCards photos={photos} t={t} />
              )}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: t.text }}>{data.title}</h2>
          {data.intro && (
            <p className="mt-3 text-sm leading-6" style={{ color: t.textSecondary }}>{data.intro}</p>
          )}
        </div>

        {/* Timeline Table — always visible */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold" style={{ color: t.text }}>
            Official Timeline vs. Market Reality
          </h3>
          <ConstructionTable headers={tbl.headers || []} rows={tbl.rows || []} t={t} />
          {tbl.source && (
            <p className="text-xs sm:text-sm mt-3 italic" style={{ color: t.textMuted }}>
              <span style={{ color: GOLD }}>Source:</span> {tbl.source}
            </p>
          )}
        </div>

        {/* Construction Progress Bars — always visible */}
        <div className="rounded-xl p-5 lg:p-7 mb-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <h3 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: t.text }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>🏗️</span>
            {data.progress_title}
          </h3>
          {progressItems.map((p, i) => (
            <ProgressBar key={i} label={p.label} percent={p.percent} t={t} />
          ))}
          <p className="text-xs mt-2 italic" style={{ color: t.textMuted }}>{data.progress_mobile_note}</p>
        </div>

        {/* Duration Analysis */}
        <div className="mb-6 rounded-xl p-5 lg:p-7" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          <h3 className="mb-4 flex items-center gap-3 text-lg font-semibold" style={{ color: t.text }}>
            <ConstructionIcon name="duration" size={24} />
            {dur.title}
          </h3>
          <p className="mb-6 text-sm leading-7" style={{ color: t.textSecondary }}>{dur.intro}</p>
          <div className="space-y-5">
            {(dur.factors || []).map((f, i) => (
              <div key={f.label} className="border-b pb-5 last:border-b-0 last:pb-0" style={{ borderColor: t.cardBorder }}>
                <div className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white" style={{ background: GOLD }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="mb-1.5 text-base font-semibold" style={{ color: t.text }}>{f.label}</p>
                    <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{f.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <MiniAccordion
            title="Project Milestone Timeline"
            icon="calendar"
            open={openMilestones}
            onToggle={() => setOpenMilestones((current) => !current)}
            t={t}
          >
            {milestones.map((m, i) => (
              <TimelineDot key={i} milestone={m} isLast={i === milestones.length - 1} t={t} />
            ))}
          </MiniAccordion>

          <MiniAccordion
            title={ground.title}
            icon="intel"
            open={openIntel}
            onToggle={() => setOpenIntel((current) => !current)}
            t={t}
          >
            <div
              className="rounded-lg p-4 mb-4"
              style={{
                background: t.isDark ? "rgba(182,138,53,0.06)" : "rgba(182,138,53,0.04)",
                borderLeft: "3px solid #B68A35",
              }}
            >
              <span className="block text-4xl leading-none" style={{ color: GOLD }}>“</span>
              <p className="text-sm leading-7 italic" style={{ color: t.textSecondary }}>{ground.quote}</p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                background: t.isDark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.25)",
              }}
            >
              <div className="flex gap-2 items-start">
                <ConstructionIcon name="intel" size={18} color="#B68A35" />
                <p className="text-sm leading-6" style={{ color: t.isDark ? "#fcd34d" : "#92400e" }}>
                  <strong>Verification Note:</strong> {ground.verification}
                </p>
              </div>
            </div>
          </MiniAccordion>

          <MiniAccordion
            title="Construction Photos & Site Updates"
            icon="camera"
            open={showPhotos}
            onToggle={() => setShowPhotos((current) => !current)}
            t={t}
          >
            <PhotoAccordionList photos={photos} openPhoto={openPhoto} onToggle={setOpenPhoto} t={t} />
          </MiniAccordion>
        </div>
        </div>
        <SectionExpertCta cta={data.section_cta} t={t} className="mt-6" />
      </div>
    </section>
  );
};

export default ConstructionSection;
