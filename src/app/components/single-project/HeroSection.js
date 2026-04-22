
"use client";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
/** Soft white halo so title/subtitle read on very dark or very light hero images */
const HERO_TEXT_HALO = "0 0 12px rgba(255,255,255,0.92), 0 0 2px rgba(255,255,255,0.98), 0 1px 0 rgba(255,255,255,0.85)";
const SUBTITLE_GREY = "#2d2d2d";

/** e.g. "Serro at The Heights" → "Serro at" (black) + "The Heights" (gold) */
const splitHeroTitle = (raw) => {
  if (!raw) return { line1: "", line2: null };
  const s = String(raw);
  const m = s.match(/^(.*)\s+The\s+(.+)$/i);
  if (m) return { line1: m[1].trim(), line2: `The ${m[2].trim()}` };
  return { line1: s.trim(), line2: null };
};

const renderStatIcon = (type, color) => {
  if (type === "starting_price") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }

  if (type === "price_per_sqft") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21 21 3" />
        <path d="M7 7h.01" />
        <path d="M17 17h.01" />
        <path d="M14 3h7v7" />
        <path d="M3 14v7h7" />
      </svg>
    );
  }

  if (type === "yield_forecast") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 3 5-7" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
};

const HeroSection = ({ data }) => {
  const { t } = useTheme();
  const hero = data.hero_section;
  const meta = data.project_meta || {};
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showInfra, setShowInfra] = useState(false);
  const heroImage = meta.images?.[1] || meta.images?.[0];
  const { line1, line2 } = splitHeroTitle(hero?.h1 || meta.name);
  const chipItems = [
    {
      label: hero.status_badges?.[0]?.label || meta.status || "Off-Plan",
      variant: "gold",
    },
    {
      label: meta.developer?.name || hero.status_badges?.[1]?.label,
      variant: "light",
    },
  ].filter((item) => item.label);
  const snapshotCardClass =
    "rounded-2xl p-6 lg:p-8 border max-lg:min-h-[18rem] max-lg:max-h-[18rem] max-lg:overflow-hidden max-lg:flex max-lg:flex-col lg:max-h-none";
  const snapshotCardStyle = {
    border: "1px solid rgba(182,138,53,0.2)",
    background: t.isDark ? "rgba(182,138,53,0.05)" : t.cardBg,
    boxShadow: t.isDark ? "0 4px 24px rgba(0,0,0,0.25)" : "0 4px 24px rgba(0,0,0,0.08)",
  };

  const statCards = [
    {
      key: "starting_price",
      label: "Starting Price",
      value: hero.data_grid.starting_price,
      color: GOLD,
    },
    {
      key: "price_per_sqft",
      label: "Price / Sqft",
      value: hero.data_grid.price_per_sqft,
      color: "#ffffff",
    },
    {
      key: "yield_forecast",
      label: "Yield Forecast",
      value: hero.data_grid.yield_forecast,
      color: "#4ade80",
    },
    {
      key: "handover",
      label: "Handover",
      value: hero.data_grid.handover,
      color: "#ffffff",
    },
  ];
  const keyFactsSection = hero.key_facts_section || {};
  const developerSummary = keyFactsSection.developer_summary || {};
  const unitTypesAndPrices = keyFactsSection.unit_types_and_prices || {};
  const paymentPlan = keyFactsSection.payment_plan || {};
  const keyFactsBorder = "rgba(182,138,53,0.18)";
  const keyFactsDivider = t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const keyFactsPanelStyle = {
    background: t.isDark ? "#25282d" : "#fffefb",
    border: `1px solid ${keyFactsBorder}`,
    boxShadow: t.isDark ? "0 14px 34px rgba(0,0,0,0.28)" : "0 10px 28px rgba(0,0,0,0.06)",
  };
  const keyFactsPillStyle = {
    background: t.isDark ? "rgba(182,138,53,0.1)" : "rgba(182,138,53,0.08)",
    border: `1px solid ${keyFactsBorder}`,
    color: t.isDark ? "#e7d2a2" : "#a47b27",
  };
  const keyFactsLabelColor = t.isDark ? "rgba(255,255,255,0.76)" : "#57534e";
  const keyFactsMutedColor = t.isDark ? "rgba(255,255,255,0.58)" : "#8b8477";

  return (
    <section style={{ background: t.bg }} className="min-h-screen">
      <div className="relative overflow-hidden min-h-[640px] lg:min-h-[760px]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={meta.name || hero.h1 || "Project hero image"}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2a2d33, #141518)" }} />
        )}
        {/* Subtle bottom tint only: a little dark for contrast; photo stays clear */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] lg:h-[40%]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.06) 45%, transparent 100%)",
          }}
        />

        <div className="relative z-10 min-h-[640px] lg:min-h-[760px] max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-14 flex items-end">
          <div className="w-full max-w-[640px] lg:max-w-none">
            <div className="flex flex-wrap gap-3">
              {chipItems.map((item, i) => (
                <span
                  key={`${item.label}-${i}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{
                    background: item.variant === "gold" ? "rgba(182,138,53,0.92)" : "rgba(255,255,255,0.72)",
                    color: item.variant === "gold" ? "#ffffff" : "#4b5563",
                    border: item.variant === "gold" ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.45)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: item.variant === "gold" ? "#ffffff" : GOLD }}
                  />
                  {item.label}
                </span>
              ))}
            </div>

            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              <span className="block text-[#0a0a0a]" style={{ textShadow: HERO_TEXT_HALO }}>
                {line1}
              </span>
              {line2 && (
                <span className="mt-0.5 block" style={{ color: GOLD, textShadow: HERO_TEXT_HALO }}>
                  {line2}
                </span>
              )}
            </h1>
            <h2
              className="mt-3 text-lg sm:text-xl lg:text-2xl font-medium"
              style={{ color: SUBTITLE_GREY, textShadow: HERO_TEXT_HALO }}
            >
              {hero.subtitle}
            </h2>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {statCards.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl p-3 sm:p-4 lg:p-4 min-w-0"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.24)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 12px 36px rgba(0,0,0,0.16)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs font-medium text-white/88 leading-tight">
                        {item.label}
                      </p>
                      <p
                        className={`mt-1.5 font-semibold tracking-tight text-lg sm:text-xl lg:text-2xl ${item.key === "price_per_sqft" ? "whitespace-nowrap" : ""}`}
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </p>
                    </div>
                    <div className="mt-0.5 text-white/90">
                      {renderStatIcon(item.key, "rgba(255,255,255,0.9)")}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              {(() => {
                const primary = hero.cta_primary;
                const text = typeof primary === "string" ? primary : primary?.button_text;
                const href = typeof primary === "object" && primary?.href;
                const className = "w-full px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors focus:outline-none inline-flex items-center justify-center " + (href ? "hover:opacity-90" : "");
                const style = { background: GOLD, color: "#ffffff" };
                return href ? (
                  <a href={href} className={className} style={style}>{text}</a>
                ) : (
                  <button type="button" className={className} style={style}>{text}</button>
                );
              })()}
              {(typeof hero.cta_primary === "object" && hero.cta_primary?.subtext) && (
                <p className="text-xs leading-relaxed" style={{ color: t.textMuted }}>{hero.cta_primary.subtext}</p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              {(() => {
                const secondary = hero.cta_secondary;
                const text = typeof secondary === "string" ? secondary : secondary?.button_text;
                const href = typeof secondary === "object" && secondary?.href;
                const className = "w-full px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors focus:outline-none inline-flex items-center justify-center " + (href ? "hover:opacity-90" : "");
                const style = {
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                };
                return href ? (
                  <a href={href} className={className} style={style}>{text}</a>
                ) : (
                  <button type="button" className={className} style={style}>{text}</button>
                );
              })()}
              {(typeof hero.cta_secondary === "object" && hero.cta_secondary?.subtext) && (
                <p className="text-xs leading-relaxed" style={{ color: t.textMuted }}>{hero.cta_secondary.subtext}</p>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview + Investor’s Snapshot: mobile = equal height; overview scrolls inside */}
      <div className="max-w-7xl mx-auto px-2 py-6 lg:py-10">
        <div className={snapshotCardClass} style={snapshotCardStyle}>
          <div
            className="text-base lg:text-lg leading-relaxed max-lg:min-h-0 max-lg:flex-1 max-lg:overflow-y-auto max-lg:pr-1.5 scrollbar-gold"
            style={{ color: t.textSecondary }}
          >
            {hero.overview_paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={i > 0 ? "mt-6" : ""}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>

        {hero.explore_link && (
          <div className="mt-6 flex justify-center">
            <a
              href={hero.explore_link.href || "#"}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-90 cursor-pointer"
              style={{ color: "#B68A35" }}
            >
              {hero.explore_link.text}
              <span aria-hidden>→</span>
            </a>
          </div>
        )}

        <div className="mt-10 max-lg:mt-4">
          <div className={snapshotCardClass} style={snapshotCardStyle}>
            <h3
              className="shrink-0 text-lg lg:text-xl font-bold mb-4 flex items-center gap-2.5"
              style={{ color: "#B68A35" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B68A35"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="4" y1="20" x2="4" y2="10" />
                <line x1="10" y1="20" x2="10" y2="5" />
                <line x1="16" y1="20" x2="16" y2="12" />
                <path d="M2 20h20" />
              </svg>
              Investor&rsquo;s Snapshot
            </h3>
            <div
              className="max-lg:min-h-0 max-lg:flex-1 max-lg:overflow-y-auto lg:overflow-visible text-base lg:text-lg leading-relaxed"
              style={{ color: t.textSecondary, scrollbarWidth: "thin" }}
            >
              <p
                className="m-0"
                dangerouslySetInnerHTML={{ __html: hero.data_led_hook }}
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] font-semibold tracking-tight" style={{ color: t.text }}>
            <span>{keyFactsSection.title_prefix || "Key Facts at a"} </span>
            <span style={{ color: GOLD }}>{keyFactsSection.title_accent || "Glance"}</span>
          </h3>

          <div className="mt-6 overflow-hidden rounded-[28px]" style={keyFactsPanelStyle}>
            <div className="px-5 py-5 sm:px-6 sm:py-6 lg:px-8 flex items-start gap-4 sm:gap-5">
              <div
                className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden shrink-0"
                style={{ border: `1px solid ${keyFactsBorder}`, background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffaf0" }}
              >
                {developerSummary.logo || meta.developer?.logo_url ? (
                  <Image
                    src={developerSummary.logo || meta.developer?.logo_url}
                    alt={`${developerSummary.name || meta.developer?.name || "Developer"} logo`}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold" style={{ color: GOLD }}>
                    {(developerSummary.name || meta.developer?.name || "D").charAt(0)}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xl sm:text-2xl font-semibold tracking-tight" style={{ color: t.text }}>
                  {developerSummary.name || meta.developer?.name}
                </p>
                {(developerSummary.founded_label || (meta.developer?.founded_year ? `Founded ${meta.developer.founded_year}` : null)) && (
                  <p className="mt-1 text-sm sm:text-base" style={{ color: keyFactsMutedColor }}>
                    {developerSummary.founded_label || `Founded ${meta.developer?.founded_year}`}
                  </p>
                )}

                {(developerSummary.highlights || []).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {developerSummary.highlights.map((item, i) => (
                      <span
                        key={`${item}-${i}`}
                        className="inline-flex rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium"
                        style={keyFactsPillStyle}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
                <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                  {keyFactsSection.project_status?.label || "Project Status"}
                </p>
                <div className="shrink-0 text-right">
                  {keyFactsSection.project_status?.badge && (
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                      style={keyFactsPillStyle}
                    >
                      <span className="inline-block h-2 w-2 rounded-full" style={{ background: GOLD }} />
                      {keyFactsSection.project_status.badge}
                    </span>
                  )}
                  {keyFactsSection.project_status?.note && (
                    <p className="mt-2 text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                      {keyFactsSection.project_status.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
                <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                  {keyFactsSection.handover?.label || "Handover Date"}
                </p>
                <div className="shrink-0 text-right">
                  <p className="text-xl sm:text-[1.75rem] font-semibold tracking-tight" style={{ color: t.text }}>
                    {keyFactsSection.handover?.value}
                  </p>
                  {keyFactsSection.handover?.note && (
                    <p className="mt-1 text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                      {keyFactsSection.handover.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
                <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                  {keyFactsSection.total_units?.label || "Total Units (Project)"}
                </p>
                <div className="shrink-0 text-right">
                  <p className="text-xl sm:text-[1.75rem] font-semibold tracking-tight" style={{ color: t.text }}>
                    {keyFactsSection.total_units?.value}
                  </p>
                  {keyFactsSection.total_units?.note && (
                    <p className="mt-1 text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                      {keyFactsSection.total_units.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
                <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                  {keyFactsSection.master_community?.label || "Master Community"}
                </p>
                <div className="shrink-0 text-right">
                  <p className="text-xl sm:text-[1.75rem] font-semibold tracking-tight" style={{ color: t.text }}>
                    {keyFactsSection.master_community?.value}
                  </p>
                  {keyFactsSection.master_community?.note && (
                    <p className="mt-1 text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                      {keyFactsSection.master_community.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="px-5 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                    {unitTypesAndPrices.label || "Unit Types & Prices"}
                  </p>
                  {unitTypesAndPrices.summary && (
                    <p className="text-xs sm:text-sm sm:text-right" style={{ color: keyFactsMutedColor }}>
                      {unitTypesAndPrices.summary}
                    </p>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  {(unitTypesAndPrices.items || []).map((item, i) => (
                    <div
                      key={`${item.type}-${i}`}
                      className={`grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 ${i > 0 ? "pt-3" : ""}`}
                      style={i > 0 ? { borderTop: `1px solid ${keyFactsDivider}` } : undefined}
                    >
                      <div className="min-w-0 flex items-center gap-2">
                        <span className="mt-0.5 inline-block h-2 w-2 rounded-full shrink-0" style={{ background: GOLD }} />
                        <p className="min-w-0 text-base sm:text-lg font-medium" style={{ color: t.text }}>
                          {item.type}
                        </p>
                        {item.count && (
                          <span className="text-xs sm:text-sm whitespace-nowrap" style={{ color: keyFactsMutedColor }}>
                            {item.count}
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-base sm:text-lg font-medium whitespace-nowrap" style={{ color: t.text }}>
                          {item.price}
                        </p>
                        {item.note && (
                          <p className="text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="px-5 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                    {paymentPlan.label || "Payment Plan"}
                  </p>
                  {paymentPlan.summary && (
                    <span className="inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium sm:ml-auto" style={keyFactsPillStyle}>
                      {paymentPlan.summary}
                    </span>
                  )}
                </div>

                <div
                  className="mt-4 h-2.5 overflow-hidden rounded-full"
                  style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)" }}
                >
                  <div className="flex h-full">
                    {(paymentPlan.milestones || []).map((item, i) => (
                      <div
                        key={`${item.title}-${i}`}
                        className="h-full"
                        style={{
                          width: `${item.percent || 0}%`,
                          background: i === 0 ? "#b68a35" : i === 1 ? "#d9b05f" : "#edd9ac",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="mt-4 grid grid-cols-3"
                  style={{ borderTop: `1px solid ${keyFactsDivider}` }}
                >
                  {(paymentPlan.milestones || []).map((item, i) => (
                    <div
                      key={`${item.title}-${i}`}
                      className={`pt-4 ${i > 0 ? "pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}
                      style={i > 0 ? { borderLeft: `1px solid ${keyFactsDivider}` } : undefined}
                    >
                      <p className="text-2xl sm:text-[1.75rem] font-semibold tracking-tight" style={{ color: GOLD }}>
                        {item.percent}%
                      </p>
                      <p className="mt-1 text-sm sm:text-base font-medium" style={{ color: t.text }}>
                        {item.title}
                      </p>
                      {item.note && (
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed" style={{ color: keyFactsMutedColor }}>
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Accordion */}
        <div className="mt-16">
          <button onClick={() => setShowInfra(!showInfra)} className="w-full flex items-center justify-between p-5 rounded-xl transition-colors group" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="text-lg font-semibold" style={{ color: t.text }}>Future Infrastructure & Economic Development</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${showInfra ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${showInfra ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
            <div className="space-y-3">
              {hero.infrastructure_items.map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                  <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left transition-colors">
                    <span className="text-sm font-medium pr-4" style={{ color: t.text }}>{item.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-transform duration-300 ${openAccordion === i ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openAccordion === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-4 pb-4 text-sm leading-relaxed" style={{ color: t.textSecondary }}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;