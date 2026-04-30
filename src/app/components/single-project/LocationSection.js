"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import LocationMap from "../sub-components/LocationMap";

const GOLD = "#b68a35";

const ChevronIcon = ({ open, color = GOLD }) => (
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

const SectionIcon = ({ name, color = "#ffffff", size = 20 }) => {
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

  if (name === "walkability") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M13 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="m6 12 3-2 2-3 2 1 1 3 3 3" />
        <path d="M8 18v-3l2-2" />
        <path d="m14 14-2 3" />
        <path d="M3 10h2" />
        <path d="M2 14h3" />
      </svg>
    );
  }

  if (name === "drive") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M3 10h18" />
      </svg>
    );
  }

  if (name === "infrastructure") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="5" y="3" width="14" height="14" rx="2" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 21h8" />
        <path d="m9 17-2 4" />
        <path d="m15 17 2 4" />
      </svg>
    );
  }

  if (name === "neighbourhood") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="16" cy="8" r="2.5" />
        <path d="M3.5 18a4.5 4.5 0 0 1 9 0" />
        <path d="M11.5 18a4.5 4.5 0 0 1 9 0" />
      </svg>
    );
  }

  if (name === "walk") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9 5a1.75 1.75 0 1 0 0-3.5A1.75 1.75 0 0 0 9 5Z" />
        <path d="m6 12 2-2 2-2 2 1" />
        <path d="m11 9 1 4 3 3" />
        <path d="M7 18v-3l2-2" />
        <path d="m12 17-1 4" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    );
  }

  if (name === "cart") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="9" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
        <path d="M3 4h2l2.4 10h9.8L20 7H7.3" />
      </svg>
    );
  }

  if (name === "info") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6" />
        <path d="M12 7h.01" />
      </svg>
    );
  }

  if (name === "airport") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m2 19 20-7" />
        <path d="m2 12 20-7" />
        <path d="m10 14 4 6" />
        <path d="m11 9 4 6" />
      </svg>
    );
  }

  if (name === "expo") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2v20" />
        <path d="M5 6h14" />
        <path d="M5 18h14" />
        <path d="M7 6c1.5 2 1.5 10 0 12" />
        <path d="M17 6c-1.5 2-1.5 10 0 12" />
      </svg>
    );
  }

  if (name === "marina") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 20V8l4-3 4 3V4l4-2v18" />
        <path d="M4 20h16" />
      </svg>
    );
  }

  if (name === "mall") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 8V6a3 3 0 1 1 6 0v2" />
      </svg>
    );
  }

  if (name === "port") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 18h16" />
        <path d="M7 18V7h10v11" />
        <path d="M9 7V4h6v3" />
      </svg>
    );
  }

  if (name === "hospital") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M12 7v8" />
        <path d="M8 11h8" />
      </svg>
    );
  }

  if (name === "road") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 3h8" />
        <path d="m10 3-3 18" />
        <path d="m14 3 3 18" />
        <path d="M12 7h.01" />
        <path d="M12 12h.01" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (name === "train") {
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

  if (name === "home") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    );
  }

  if (name === "wellness") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 21c4-3 6-6 6-9a3 3 0 0 0-6-1 3 3 0 0 0-6 1c0 3 2 6 6 9Z" />
      </svg>
    );
  }

  if (name === "family") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="9" cy="8" r="2.5" />
        <circle cx="16" cy="9" r="2" />
        <path d="M4.5 19a4.5 4.5 0 0 1 9 0" />
        <path d="M13 19a3.5 3.5 0 0 1 7 0" />
      </svg>
    );
  }

  if (name === "construction") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 3 5 20h14L12 3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  return null;
};

const SectionBadgeIcon = ({ icon, active, t }) => (
  <div
    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
    style={{
      background: active ? GOLD : t.isDark ? "rgba(182,138,53,0.16)" : "#c89b3c",
      boxShadow: active && !t.isDark ? "0 10px 18px rgba(182,138,53,0.22)" : "none",
    }}
  >
    <SectionIcon name={icon} color="#ffffff" size={20} />
  </div>
);

const DetailIcon = ({ icon, t, highlight = false }) => (
  <div
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
    style={{
      background: highlight
        ? t.isDark
          ? "rgba(182,138,53,0.18)"
          : "#fbf3e1"
        : t.isDark
          ? "rgba(255,255,255,0.05)"
          : "#f9f5ed",
      color: GOLD,
    }}
  >
    <SectionIcon name={icon} color={GOLD} size={16} />
  </div>
);

const HtmlText = ({ html, className = "", style = {} }) => (
  <p className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />
);

const infrastructureScrollStyles = `
  .infrastructure-scroll {
    scrollbar-width: thin;
    scrollbar-color: #b68a35 transparent;
  }

  .infrastructure-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .infrastructure-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .infrastructure-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #cda24f 0%, #b68a35 100%);
    border-radius: 999px;
  }
`;

const LocationSection = ({ data }) => {
  const { t } = useTheme();
  const [openSection, setOpenSection] = useState("walkability");
  const [driveMode, setDriveMode] = useState("off_peak");

  const timelineEvents = data.timeline;
  const lightCard = t.isDark ? t.cardBg : "#fffdfa";
  const softBg = t.isDark ? "rgba(255,255,255,0.03)" : "#fbf7ef";
  const shadow = t.isDark ? "none" : "0 14px 34px rgba(110, 84, 26, 0.08)";

  const accordionItems = [
    {
      id: "walkability",
      icon: "walkability",
      title: data.walkability_title || "Walkability & Pedestrian Experience",
      subtitle: data.walkability_subtitle || "Walk score & daily convenience",
    },
    {
      id: "drive",
      icon: "drive",
      title: data.drive_title || "Drive Times",
      subtitle: data.drive_subtitle || "Off-peak vs. peak hour analysis",
    },
    {
      id: "infrastructure",
      icon: "infrastructure",
      title: data.infrastructure_title || "Future Infrastructure",
      subtitle: data.infrastructure_subtitle || "RTA, Metro, Airport — upcoming catalysts",
    },
    {
      id: "neighbourhood",
      icon: "neighbourhood",
      title: data.neighbourhood_title || "Neighbourhood Character",
      subtitle: data.neighbourhood_subtitle || "Emerging wellness enclave",
    },
  ];

  const renderWalkability = () => (
    <div className="pt-4">
      <p className="text-sm leading-7" style={{ color: t.textSecondary }}>
        {data.walkability_intro}
      </p>

      <div className="mt-4 space-y-3">
        {data.walkability.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl p-4"
            style={{ background: softBg, border: `1px solid ${t.cardBorder}` }}
          >
            <div className="flex items-start gap-3">
              <DetailIcon icon={item.icon} t={t} />
              <div>
                <h4 className="text-sm font-semibold" style={{ color: t.text }}>
                  {item.title}
                </h4>
                <p className="mt-1 text-sm leading-6" style={{ color: t.textSecondary }}>
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.walkability_note && (
        <div
          className="mt-3 rounded-2xl p-4"
          style={{
            background: t.isDark ? "rgba(182,138,53,0.08)" : "#faf6ef",
            border: `1px solid ${t.cardBorder}`,
          }}
        >
          <div className="flex items-start gap-3">
            <DetailIcon icon="info" t={t} highlight />
            <p className="text-sm leading-6" style={{ color: t.textSecondary }}>
              {data.walkability_note}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderDriveTimes = () => (
    <div className="pt-4">
      <div className="mb-4 flex gap-2">
        {[
          { id: "off_peak", label: "Off-Peak" },
          { id: "peak", label: "Peak Hour" },
        ].map((option) => {
          const active = driveMode === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setDriveMode(option.id)}
              className="rounded-full px-4 py-2 text-xs font-medium transition-all"
              style={{
                background: active ? (t.isDark ? "rgba(182,138,53,0.18)" : "#fbf3e1") : "transparent",
                color: active ? GOLD : t.textMuted,
                border: `1px solid ${active ? "rgba(182,138,53,0.32)" : t.cardBorder}`,
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div
        className="overflow-hidden rounded-2xl"
        style={{ background: softBg, border: `1px solid ${t.cardBorder}` }}
      >
        <div
          className="grid grid-cols-[1fr_auto] gap-3 border-b px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: t.textMuted, borderColor: t.cardBorder }}
        >
          <span>Destination</span>
          <span>{driveMode === "off_peak" ? "Drive Time (60 min)" : "Peak Hour"}</span>
        </div>

        <div className="divide-y" style={{ borderColor: t.cardBorder }}>
          {data.drive_times.map((row) => (
            <div
              key={row.destination}
              className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3"
              style={{ borderTop: `1px solid ${t.cardBorder}` }}
            >
              <div className="min-w-0">
                <div className="flex items-start gap-2">
                  <DetailIcon icon={row.icon} t={t} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-5" style={{ color: t.text }}>
                      {row.destination}
                    </p>
                    {row.notes && (
                      <p className="mt-1 text-xs leading-5" style={{ color: t.textMuted }}>
                        {row.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-1 text-right text-sm font-semibold" style={{ color: GOLD }}>
                {driveMode === "off_peak" ? row.off_peak : row.peak}
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.drive_source_note && (
        <p className="mt-3 text-xs leading-5" style={{ color: t.textMuted }}>
          {data.drive_source_note}
        </p>
      )}
    </div>
  );

  const renderInfrastructure = () => (
    <div className="pt-4">
      <style jsx>{infrastructureScrollStyles}</style>
      <div className="grid gap-4">
      {data.infrastructure_developments.map((item) => (
        <div
          key={item.title}
          className="overflow-hidden rounded-[26px] p-4 sm:p-5"
          style={{
            background: t.isDark ? "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))" : "#fffdfa",
            border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#eadfcb"}`,
            boxShadow: t.isDark ? "none" : "0 18px 38px rgba(110, 84, 26, 0.08)",
          }}
        >
          <div className="flex min-h-0 items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: t.isDark ? "rgba(182,138,53,0.14)" : "#fbf3e1",
                border: `1px solid ${t.isDark ? "rgba(182,138,53,0.2)" : "#f0dfb8"}`,
              }}
            >
              <SectionIcon name={item.icon} color={GOLD} size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h4 className="max-w-[16rem] text-base font-semibold leading-6" style={{ color: t.text }}>
                  {item.title}
                </h4>
                <div className="flex shrink-0 flex-wrap gap-2 sm:max-w-[9rem] sm:justify-end">
                  {item.tag && (
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-medium leading-none"
                      style={{
                        color: "#9a5fd0",
                        background: t.isDark ? "rgba(154,95,208,0.18)" : "#f6ebff",
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                  {item.impact && (
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-medium leading-none"
                      style={{
                        color: GOLD,
                        background: t.isDark ? "rgba(182,138,53,0.18)" : "#fbf3e1",
                      }}
                    >
                      {item.impact}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="infrastructure-scroll mt-4 overflow-y-scroll pr-2"
            style={{
              height: 112,
              scrollbarGutter: "stable",
              overscrollBehavior: "contain",
            }}
          >
            <div className="space-y-2.5">
              {item.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: GOLD }}
                  />
                  <HtmlText
                    html={bullet}
                    className="text-sm leading-6"
                    style={{ color: t.textSecondary }}
                  />
                </div>
              ))}
            </div>

            {item.relevance && (
              <p className="mt-3 border-t pt-3 text-sm leading-6" style={{ color: t.textSecondary, borderColor: t.cardBorder }}>
                <span className="font-semibold" style={{ color: GOLD }}>
                  Direct Relevance to The Heights:
                </span>{" "}
                {item.relevance}
              </p>
            )}
          </div>
        </div>
      ))}
      </div>
    </div>
  );

  const renderNeighbourhood = () => (
    <div className="pt-4">
      <p className="text-sm leading-7" style={{ color: t.textSecondary }}>
        {data.neighbourhood_intro}
      </p>

      <div className="mt-4 space-y-3">
        {data.neighbourhood_vibe.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl p-4"
            style={{
              background: item.highlight ? (t.isDark ? "rgba(182,138,53,0.08)" : "#fffaf0") : softBg,
              border: `1px solid ${item.highlight ? "rgba(182,138,53,0.4)" : t.cardBorder}`,
            }}
          >
            <div className="flex items-start gap-3">
              <DetailIcon icon={item.icon} t={t} highlight={item.highlight} />
              <div>
                <h4 className="text-base font-semibold" style={{ color: t.text }}>
                  {item.title}
                </h4>
                <p className="mt-1 text-sm leading-6" style={{ color: t.textSecondary }}>
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccordionBody = (id) => {
    if (id === "walkability") return renderWalkability();
    if (id === "drive") return renderDriveTimes();
    if (id === "infrastructure") return renderInfrastructure();
    return renderNeighbourhood();
  };

  const renderVerticalTimeline = (className = "", outlined = false) => (
    <div className={`relative pl-8 ${className}`}>
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 0,
          bottom: 0,
          width: outlined ? 2 : 3,
          background: `linear-gradient(180deg, #b8860b, #d4a843)`,
          borderRadius: 2,
        }}
      />
      <div className="space-y-6">
        {timelineEvents.map((evt, i) => (
          <div key={i} className="relative flex items-start gap-4">
            <div
              style={{
                position: "absolute",
                left: -22,
                top: 4,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: outlined ? (t.isDark ? t.bg : "#fffdfa") : "linear-gradient(135deg, #b8860b, #d4a843)",
                border: outlined ? `2px solid #b8860b` : `3px solid ${t.bg}`,
                boxShadow: outlined ? "0 0 0 3px rgba(182,138,53,0.08)" : "0 0 10px #b8860b40",
              }}
            />
            <div>
              {outlined ? (
                <>
                  <span style={{ color: t.text, fontSize: 16, fontWeight: 800 }}>{evt.year}</span>
                  <p style={{ color: "#b8860b", fontSize: 14, fontWeight: 700, marginTop: 6 }}>
                    {evt.title}
                  </p>
                  <p style={{ color: t.textMuted, fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>{evt.detail}</p>
                </>
              ) : (
                <>
                  <span style={{ color: "#b8860b", fontSize: 16, fontWeight: 800 }}>{evt.year}</span>
                  <span style={{ color: t.text, fontSize: 14, fontWeight: 700, marginLeft: 8 }}>
                    {evt.title}
                  </span>
                  <p style={{ color: t.textMuted, fontSize: 12, marginTop: 2 }}>{evt.detail}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section style={{ background: t.bg }} className="py-6 lg:py-10">
      <div className="max-w-6xl mx-auto px-2 sm:px-6">
        <div className="text-center mb-10 lg:mb-14">
          <span
            style={{
              background: "linear-gradient(135deg, #b8860b, #d4a843)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-sm font-semibold tracking-widest uppercase"
          >
            Location & Neighbourhood Deep Dive
          </span>
          <h2
            style={{ color: t.text }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 leading-tight"
          >
            Location Analysis —{" "}
            <span style={{ color: "#b8860b" }}>Connectivity, Amenities & Future Infrastructure</span>
          </h2>
        </div>

        <div className="lg:hidden">
          <div className="mb-12">
            <LocationMap />
          </div>

          <div className="mb-12">
            <h3 style={{ color: t.text }} className="text-lg font-bold mb-6 text-center">
              Infrastructure Timeline — Key Milestones
            </h3>

            <div className="hidden md:block relative">
            <div
              style={{
                position: "absolute",
                top: 28,
                left: "8%",
                right: "8%",
                height: 3,
                background: `linear-gradient(90deg, #b8860b, #d4a843, #b8860b)`,
                borderRadius: 2,
              }}
            />
            <div className="flex justify-between px-4">
              {timelineEvents.map((evt, i) => (
                <div key={i} className="flex flex-col items-center relative" style={{ flex: 1 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #b8860b, #d4a843)",
                      border: `3px solid ${t.bg}`,
                      boxShadow: "0 0 12px #b8860b50",
                      zIndex: 2,
                      marginBottom: 12,
                    }}
                  />
                  <span style={{ color: "#b8860b", fontSize: 18, fontWeight: 800 }}>{evt.year}</span>
                  <span
                    style={{
                      color: t.text,
                      fontSize: 13,
                      fontWeight: 700,
                      textAlign: "center",
                      marginTop: 4,
                    }}
                  >
                    {evt.title}
                  </span>
                  <span
                    style={{
                      color: t.textMuted,
                      fontSize: 11,
                      textAlign: "center",
                      maxWidth: 140,
                      marginTop: 2,
                    }}
                  >
                    {evt.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

            {renderVerticalTimeline("md:hidden")}
          </div>

          <div className="space-y-4">
            {accordionItems.map((item) => {
              const isOpen = openSection === item.id;

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-[24px]"
                  style={{
                    background: lightCard,
                    border: `1px solid ${isOpen ? "rgba(182,138,53,0.32)" : t.cardBorder}`,
                    boxShadow: shadow,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenSection((prev) => (prev === item.id ? "" : item.id))}
                    className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <SectionBadgeIcon icon={item.icon} active={isOpen} t={t} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.05rem] font-semibold leading-6 sm:text-[1.2rem]" style={{ color: t.text }}>
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-5" style={{ color: t.textMuted }}>
                        {item.subtitle}
                      </p>
                    </div>
                    <ChevronIcon open={isOpen} />
                  </button>

                  {isOpen && (
                    <div
                      className="border-t px-4 pb-4 sm:px-5 sm:pb-5"
                      style={{ borderColor: t.cardBorder }}
                    >
                      {renderAccordionBody(item.id)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="grid grid-cols-[1.55fr_1fr] gap-4">
            <div className="rounded-[24px] p-4" style={{ background: lightCard, border: `1px solid ${t.cardBorder}`, boxShadow: shadow }}>
              <div className="mb-3 flex items-center gap-2">
                <DetailIcon icon="pin" t={t} highlight />
                <h3 className="text-lg font-semibold" style={{ color: t.text }}>Location Overview</h3>
              </div>
              <LocationMap />
            </div>

            <div className="rounded-[24px] p-6" style={{ background: lightCard, border: `1px solid ${t.cardBorder}`, boxShadow: shadow }}>
              <div className="mb-5 flex items-center gap-2">
                <DetailIcon icon="calendar" t={t} highlight />
                <h3 className="text-lg font-semibold" style={{ color: t.text }}>
                  Infrastructure Timeline Key Milestones
                </h3>
              </div>
              {renderVerticalTimeline("", true)}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 items-start gap-4">
            {[accordionItems.filter((_, index) => index % 2 === 0), accordionItems.filter((_, index) => index % 2 === 1)].map((columnItems, columnIndex) => (
              <div key={columnIndex} className="space-y-4">
                {columnItems.map((item) => {
                  const isOpen = openSection === item.id;
                  return (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-[24px]"
                      style={{
                        background: lightCard,
                        border: `1px solid ${isOpen ? "rgba(182,138,53,0.32)" : t.cardBorder}`,
                        boxShadow: shadow,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenSection((prev) => (prev === item.id ? "" : item.id))}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left"
                      >
                        <SectionBadgeIcon icon={item.icon} active={isOpen} t={t} />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[1.05rem] font-semibold leading-6" style={{ color: t.text }}>
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-5" style={{ color: t.textMuted }}>
                            {item.subtitle}
                          </p>
                        </div>
                        <ChevronIcon open={isOpen} />
                      </button>
                      {isOpen && (
                        <div className="border-t px-5 pb-5" style={{ borderColor: t.cardBorder }}>
                          {renderAccordionBody(item.id)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
