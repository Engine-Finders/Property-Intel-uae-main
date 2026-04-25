"use client";

import { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ACCENT = "#b68a35";

const ChevronIcon = ({ open, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ProfileIcon = ({ icon, color = ACCENT, size = 18 }) => {
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

  if (icon === "yield") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 19 19 5" />
        <path d="M8 5h11v11" />
        <path d="M5 14c1.5-3 4.5-5 8-5" />
      </svg>
    );
  }

  if (icon === "flip") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 7h10" />
        <path d="m10 3 4 4-4 4" />
        <path d="M20 17H10" />
        <path d="m14 13-4 4 4 4" />
      </svg>
    );
  }

  if (icon === "family") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
        <circle cx="10" cy="8" r="3" />
        <path d="M22 19v-1a3 3 0 0 0-2-2.82" />
        <path d="M16 4.18a3 3 0 0 1 0 5.64" />
      </svg>
    );
  }

  if (icon === "visa") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 21s7-4 7-10V5l-7-2-7 2v6c0 6 7 10 7 10Z" />
      </svg>
    );
  }

  if (icon === "school") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m3 8 9-5 9 5-9 5-9-5Z" />
        <path d="M6 10.5V15c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
      </svg>
    );
  }

  if (icon === "health") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    );
  }

  if (icon === "retail") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 9h14l-1 10H6L5 9Z" />
        <path d="M8 9V7a4 4 0 1 1 8 0v2" />
      </svg>
    );
  }

  if (icon === "rail") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="6" y="3" width="12" height="14" rx="2" />
        <path d="M8 7h8" />
        <path d="M9 11h.01" />
        <path d="M15 11h.01" />
        <path d="m8 21 2-3" />
        <path d="m16 21-2-3" />
      </svg>
    );
  }

  if (icon === "airport") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m2 19 20-7" />
        <path d="m2 12 20-7" />
        <path d="m10 14 4 6" />
        <path d="m11 9 4 6" />
      </svg>
    );
  }

  if (icon === "price") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m20 12-8 8-8-8 8-8 8 8Z" />
        <path d="M12 8h.01" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M3 10h18" />
      </svg>
    );
  }

  if (icon === "clock") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return null;
};

const HtmlText = ({ as: Tag = "p", html, className = "", style = {} }) => (
  <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />
);

const VerdictPill = ({ label, tone }) => {
  const styles = {
    buy: {
      color: "#3f7d44",
      background: "#eaf7e8",
      border: "#cbe7c5",
    },
    consider: {
      color: "#b4831b",
      background: "#fff7dc",
      border: "#f0db9e",
    },
    opportunity: {
      color: "#b4831b",
      background: "#fff7dc",
      border: "#f0db9e",
    },
  };

  const current = styles[tone] || styles.consider;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
      style={{
        color: current.color,
        background: current.background,
        border: `1px solid ${current.border}`,
      }}
    >
      {label}
    </span>
  );
};

const DataTable = ({ table, t }) => (
  <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${t.cardBorder}` }}>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-[12px] sm:text-[13px]">
        <thead style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#faf5eb" }}>
          <tr>
            {table.columns.map((column) => (
              <th
                key={column}
                className="px-3 py-3 font-medium"
                style={{ color: t.textMuted, whiteSpace: "nowrap" }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, index) => (
            <tr
              key={`${row.values[0]}-${index}`}
              style={{
                borderTop: `1px solid ${t.cardBorder}`,
                background: row.highlight ? (t.isDark ? "rgba(182,138,53,0.12)" : "#fff8e6") : "transparent",
              }}
            >
              {row.values.map((value, cellIndex) => (
                <td
                  key={`${value}-${cellIndex}`}
                  className="px-3 py-3 align-top"
                  style={{
                    color: row.highlight && cellIndex > 0 ? ACCENT : cellIndex === 0 ? t.text : t.textSecondary,
                    fontWeight: row.highlight || cellIndex === 0 ? 600 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TargetBuyerSection = ({ data }) => {
  const { t } = useTheme();
  const profiles = data?.profiles || [];
  const defaultProfile = profiles[0]?.id || null;
  const [activeProfile, setActiveProfile] = useState(defaultProfile);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const currentProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfile) || profiles[0],
    [activeProfile, profiles]
  );

  const lightCardBg = t.isDark ? t.cardBg : "#fffdfa";
  const lightMutedBg = t.isDark ? t.bgAlt : "#fbf6ed";
  const shadow = t.isDark ? "none" : "0 12px 30px rgba(112, 88, 29, 0.08)";

  if (!currentProfile) return null;

  return (
    <section style={{ background: t.bg }} className="py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-2 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            {data.section_label}
          </p>
          <h2
            className="max-w-2xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.45rem]"
            style={{ color: t.text }}
          >
            {data.heading}
          </h2>
          <p
            className="mt-4 max-w-xl text-sm leading-7 sm:text-[15px]"
            style={{ color: t.textSecondary }}
          >
            {data.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((profile) => {
            const isActive = profile.id === currentProfile.id;

            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => {
                  setActiveProfile(profile.id);
                  setIsPanelOpen(true);
                }}
                className="rounded-2xl p-4 text-left transition-all duration-300"
                style={{
                  background: isActive
                    ? (
                        t.isDark
                          ? "linear-gradient(180deg, rgba(182,138,53,0.16), rgba(255,255,255,0.03))"
                          : "linear-gradient(180deg, #fffaf0, #fffdf9)"
                      )
                    : lightCardBg,
                  border: `1px solid ${isActive ? "rgba(182,138,53,0.55)" : t.cardBorder}`,
                  boxShadow: isActive ? shadow : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1" }}
                  >
                    <ProfileIcon icon={profile.icon} />
                  </div>
                  <h3
                    className="text-[15px] font-semibold leading-5 sm:text-base"
                    style={{ color: t.text }}
                  >
                    {profile.card_title}
                  </h3>
                </div>
                <p
                  className="mt-3 min-h-[40px] text-xs leading-5 sm:text-[13px]"
                  style={{ color: t.textSecondary }}
                >
                  {profile.card_subtitle}
                </p>
                <div
                  className="mt-4 h-[3px] rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 74 : 34,
                    background: isActive ? ACCENT : "transparent",
                  }}
                />
              </button>
            );
          })}
        </div>

        <div
          className="mt-5 overflow-hidden rounded-[28px]"
          style={{
            background: lightCardBg,
            border: `1px solid ${t.cardBorder}`,
            boxShadow: shadow,
          }}
        >
          <button
            type="button"
            onClick={() => setIsPanelOpen((prev) => !prev)}
            className="flex w-full items-start gap-3 px-5 py-5 text-left sm:px-6"
          >
            <div
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1" }}
            >
              <ProfileIcon icon={currentProfile.icon} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xl leading-tight sm:text-[1.7rem]" style={{ color: t.text }}>
                <span className="font-medium">{currentProfile.panel_title} </span>
                <span className="font-medium" style={{ color: ACCENT }}>
                  {currentProfile.panel_accent}
                </span>
              </div>
              {currentProfile.panel_subtitle && (
                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: t.textMuted }}
                >
                  {currentProfile.panel_subtitle}
                </p>
              )}
            </div>
            <ChevronIcon open={isPanelOpen} color={t.textSecondary} />
          </button>

          {isPanelOpen && (
            <div
              className="border-t px-5 pb-5 pt-5 sm:px-6 sm:pb-6"
              style={{ borderColor: t.cardBorder }}
            >
              {currentProfile.intro_html && (
                <HtmlText
                  html={currentProfile.intro_html}
                  className="text-sm leading-8 sm:text-[15px]"
                  style={{ color: t.textSecondary }}
                />
              )}

              {currentProfile.table && (
                <div className="mt-5">
                  <p
                    className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: ACCENT }}
                  >
                    {currentProfile.table.title}
                  </p>
                  <DataTable table={currentProfile.table} t={t} />
                </div>
              )}

              {currentProfile.analysis_html && (
                <div
                  className="mt-5 rounded-2xl px-4 py-4"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.03)" : lightMutedBg,
                    border: `1px solid ${t.cardBorder}`,
                  }}
                >
                  <HtmlText
                    html={currentProfile.analysis_html}
                    className="text-sm leading-8 sm:text-[15px]"
                    style={{ color: t.textSecondary }}
                  />
                </div>
              )}

              {currentProfile.link_text && (
                <div className="mt-4 inline-flex items-center gap-1 text-sm" style={{ color: ACCENT }}>
                  <span>{currentProfile.link_text}</span>
                  <ChevronIcon open={false} color={ACCENT} />
                </div>
              )}

              {currentProfile.strategies?.length > 0 && (
                <div className="mt-5 space-y-3">
                  {currentProfile.strategies.map((strategy) => (
                    <div
                      key={strategy.number}
                      className="rounded-2xl px-4 py-4"
                      style={{
                        background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdfa",
                        border: `1px solid ${t.cardBorder}`,
                      }}
                    >
                      <div className="flex gap-3">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-medium"
                          style={{
                            color: ACCENT,
                            background: t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1",
                          }}
                        >
                          {strategy.number}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-semibold leading-5" style={{ color: t.text }}>
                            {strategy.title}
                          </h4>
                          <p className="mt-1 text-xs" style={{ color: ACCENT }}>
                            {strategy.timing}
                          </p>
                          <p className="mt-3 text-sm leading-7" style={{ color: t.textSecondary }}>
                            {strategy.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentProfile.verdict && (
                <div
                  className="mt-4 rounded-2xl px-4 py-4"
                  style={{
                    background: t.isDark ? "rgba(182,138,53,0.08)" : "#fdf7e8",
                    border: "1px solid rgba(182,138,53,0.2)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "#fbf0d5" }}
                    >
                      <ProfileIcon icon={currentProfile.verdict.icon || currentProfile.icon} size={16} />
                    </div>
                    <p className="text-sm leading-7" style={{ color: t.textSecondary }}>
                      <span className="font-semibold" style={{ color: ACCENT }}>
                        {currentProfile.verdict.label}:
                      </span>{" "}
                      {currentProfile.verdict.text}
                    </p>
                  </div>
                </div>
              )}

              {currentProfile.infrastructure?.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: ACCENT }}
                  >
                    {currentProfile.infrastructure_title}
                  </p>
                  {currentProfile.infrastructure.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl px-4 py-4"
                      style={{
                        background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdfa",
                        border: `1px solid ${t.cardBorder}`,
                      }}
                    >
                      <div
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1" }}
                      >
                        <ProfileIcon icon={item.icon} size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-[15px] font-semibold" style={{ color: t.text }}>
                            {item.title}
                          </h4>
                          <span className="text-xs font-medium" style={{ color: ACCENT }}>
                            {item.timeline}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-6" style={{ color: t.textMuted }}>
                          {item.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentProfile.notes?.length > 0 && (
                <div className="mt-5 space-y-3">
                  {currentProfile.notes.map((note) => (
                    <div key={note.label}>
                      <HtmlText
                        html={`<strong>${note.label}:</strong> ${note.text}`}
                        className="text-sm leading-7"
                        style={{ color: t.textSecondary }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {currentProfile.stats?.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {currentProfile.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl px-4 py-4"
                      style={{
                        background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdfa",
                        border: `1px solid ${t.cardBorder}`,
                      }}
                    >
                      <div
                        className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1" }}
                      >
                        <ProfileIcon icon={stat.icon} size={15} />
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: t.textMuted }}>
                        {stat.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 sm:text-base" style={{ color: t.text }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {currentProfile.paragraphs?.length > 0 && (
                <div className="mt-5 space-y-4">
                  {currentProfile.paragraphs.map((paragraph, index) => (
                    <HtmlText
                      key={index}
                      html={paragraph}
                      className="text-sm leading-8 sm:text-[15px]"
                      style={{ color: t.textSecondary }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-[1.7rem] font-medium tracking-[-0.02em]" style={{ color: t.text }}>
            <span style={{ color: ACCENT }}>{data.matrix_title_prefix}</span>{" "}
            <span>{data.matrix_title_suffix}</span>
          </h3>

          <div className="mt-4 space-y-4">
            {data.matrix.map((item) => (
              <div
                key={item.profile}
                className="rounded-[24px] px-4 py-4 sm:px-5"
                style={{
                  background: lightCardBg,
                  border: `1px solid ${t.cardBorder}`,
                  boxShadow: shadow,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="pr-2 text-[1.05rem] font-medium leading-6" style={{ color: t.text }}>
                    {item.profile}
                  </h4>
                  <VerdictPill label={item.verdict_label} tone={item.verdict_tone} />
                </div>
                <p className="mt-3 text-sm leading-7 sm:text-[15px]" style={{ color: t.textSecondary }}>
                  {item.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetBuyerSection;
