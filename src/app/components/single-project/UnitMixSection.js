"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const BLUE = "#286CFF";

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
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const SectionIconBadge = ({ icon, t }) => (
  <div
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
    style={{
      background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)",
      color: GOLD,
      border: `1px solid ${t.isDark ? "rgba(217,176,95,0.22)" : "rgba(182,138,53,0.16)"}`,
    }}
  >
    {icon}
  </div>
);

const MobileAccordion = ({ title, icon, isOpen, onToggle, children, t }) => (
  <div
    className="overflow-hidden rounded-2xl"
    style={{
      background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
      boxShadow: t.isDark ? "0 12px 30px rgba(0,0,0,0.22)" : "0 12px 30px rgba(15,23,42,0.04)",
    }}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
    >
      <div className="flex min-w-0 items-center gap-3">
        <SectionIconBadge icon={icon} t={t} />
        <span className="text-[18px] font-semibold leading-6" style={{ color: t.text }}>
          {title}
        </span>
      </div>
      <ChevronIcon open={isOpen} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div
        className="px-4 pb-4 pt-0"
        style={{ borderTop: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}` }}
      >
        <div className="pt-4">{children}</div>
      </div>
    </div>
  </div>
);

const OverviewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
    <path d="M7.5 8.5h9" />
    <path d="M7.5 12h9" />
    <path d="M7.5 15.5h6" />
  </svg>
);

const PricingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v20" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const GraphIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18" />
    <path d="m7 14 3-3 3 2 4-6" />
    <path d="M17 7h3v3" />
  </svg>
);

const FloorplanIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20V4h8v8h8v8Z" />
    <path d="M12 4v8" />
    <path d="M20 12h-8" />
  </svg>
);

const FeaturesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3 7 4v10l-7 4-7-4V7Z" />
    <path d="m12 3 7 4-7 4-7-4" />
    <path d="m19 7-7 4-7-4" />
  </svg>
);

const InfoIcon = ({ color = GOLD, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const FeatureGlyph = ({ index }) => {
  const glyphs = [
    <svg key="aesthetic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z" /></svg>,
    <svg key="glazing" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 4v16" /><path d="M4 12h16" /></svg>,
    <svg key="materials" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m4 8 8-4 8 4-8 4-8-4Z" /><path d="m4 12 8 4 8-4" /><path d="m4 16 8 4 8-4" /></svg>,
    <svg key="carport" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13h18" /><path d="m6 13 1.5-4.5A2 2 0 0 1 9.4 7h5.2a2 2 0 0 1 1.9 1.5L18 13" /><circle cx="7.5" cy="16.5" r="1.5" /><circle cx="16.5" cy="16.5" r="1.5" /></svg>,
  ];

  return glyphs[index] || glyphs[0];
};

const splitHeading = (heading = "") => {
  const parts = heading.split("—");
  return {
    primary: parts[0]?.trim() || heading,
    accent: parts[1]?.trim() || "",
  };
};

const splitUnitName = (name = "") => {
  const match = name.match(/^(.*?)(\s*\(.*\))$/);
  if (!match) return { main: name, sub: "" };
  return { main: match[1].trim(), sub: match[2].trim() };
};

const getAvailabilityMeta = (availability, t) => {
  if (availability === "available") {
    return {
      label: "Available now",
      background: "rgba(182,138,53,0.12)",
      color: GOLD,
      border: "rgba(182,138,53,0.18)",
    };
  }
  if (availability === "limited") {
    return {
      label: "Limited",
      background: t.isDark ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.08)",
      color: GOLD,
      border: "rgba(182,138,53,0.18)",
    };
  }
  return {
    label: "TBD",
    background: t.isDark ? "rgba(255,255,255,0.08)" : "#eef2f7",
    color: t.textMuted,
    border: t.cardBorder,
  };
};

const getBedroomKey = (unit) => {
  const match = unit.type_name?.match(/^(\d+)-Bedroom/i);
  return match?.[1] || "other";
};

const strengthToWidth = (strength) => {
  if (strength === "High") return "86%";
  if (strength === "Med") return "56%";
  return "70%";
};

const UnitMixSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedNote, setExpandedNote] = useState(false);
  const [mobileOpenSections, setMobileOpenSections] = useState({
    pricing: true,
    graph: true,
    floorplans: true,
    features: true,
  });

  const units = data.units;
  const commentary = data.price_commentary;
  const evolution = data.price_evolution;
  const floorPlans = data.floor_plans;
  const features = data.distinguishing_features;
  const featureCards = data.distinguishing_feature_cards || [];
  const insider = data.insider_tip;
  const priceData = data.price_chart_data;
  const { primary, accent } = splitHeading(data.heading);
  const bedroomTabs = [...new Set(units.map((unit) => getBedroomKey(unit)).filter((item) => item !== "other"))];
  const [mobileBedroomTab, setMobileBedroomTab] = useState(bedroomTabs[0] || "3");
  const selectedMobileUnits = units.filter((unit) => getBedroomKey(unit) === mobileBedroomTab);
  const mobileDriverBars = evolution.mobile_driver_bars || [];
  const toggleMobileSection = (key) => {
    setMobileOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section style={{ background: t.bg }} className="py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-3">
        <div className="mb-10 lg:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Unit Types & Price Evolution</p>
          <div className="lg:hidden">
            <h2 className="text-[2.2rem] font-semibold leading-[1.06]" style={{ color: t.text }}>
              {primary}
              {accent && (
                <span className="mt-1 block italic" style={{ color: GOLD }}>
                  {accent}
                </span>
              )}
            </h2>
            {data.subtitle && (
              <p className="mt-4 max-w-sm text-[15px] leading-6" style={{ color: t.textSecondary }}>
                {data.subtitle}
              </p>
            )}
          </div>
          <div className="hidden lg:block">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight" style={{ color: t.text }}>{data.heading}</h2>
          </div>
        </div>

        <div className="space-y-4 lg:hidden">
          <div className="space-y-4">
            {data.mobile_unit_prompt && (
              <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                <span>{data.mobile_unit_prompt.replace(/\s*•\s*scroll\s*→?/i, "").trim()}</span>
              </div>
            )}

            <div
              className="flex gap-1 rounded-2xl p-1"
              style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f7f3eb", border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}` }}
            >
              {bedroomTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setMobileBedroomTab(tab)}
                  className="flex-1 rounded-[14px] px-3 py-3 text-sm font-medium transition-colors"
                  style={{
                    background: mobileBedroomTab === tab ? GOLD : "transparent",
                    color: mobileBedroomTab === tab ? "#fff" : t.text,
                    boxShadow: mobileBedroomTab === tab ? "0 8px 18px rgba(182,138,53,0.22)" : "none",
                  }}
                >
                  {tab}-Bedroom
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {selectedMobileUnits.map((unit, index) => {
                const selectedUnitMeta = getAvailabilityMeta(unit.availability, t);
                const unitName = splitUnitName(unit.type_name);

                return (
                  <div
                    key={`${unit.type_name}-${index}`}
                    className="rounded-[24px] p-4"
                    style={{
                      background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff",
                      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
                      boxShadow: t.isDark ? "0 10px 24px rgba(0,0,0,0.18)" : "0 10px 24px rgba(15,23,42,0.04)",
                    }}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                          {unit.cluster}
                        </p>
                        <h3 className="mt-2 text-[2rem] font-semibold leading-[1.02]" style={{ color: t.text }}>
                          {unitName.main}
                        </h3>
                        {unitName.sub && (
                          <p className="text-[1.6rem] italic leading-none" style={{ color: GOLD }}>
                            {unitName.sub}
                          </p>
                        )}
                        <span
                          className="mt-3 inline-flex rounded-full px-3 py-1 text-sm"
                          style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "#F4E8CF", color: GOLD }}
                        >
                          {unit.cluster}
                        </span>
                      </div>
                      <span
                        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                        style={{
                          background: selectedUnitMeta.background,
                          color: selectedUnitMeta.color,
                          border: `1px solid ${selectedUnitMeta.border}`,
                        }}
                      >
                        <span className="h-2 w-2 rounded-full" style={{ background: selectedUnitMeta.color }} />
                        {selectedUnitMeta.label}
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}` }}>
                      {[
                        { label: "Units Available", value: unit.units_count },
                        { label: "Built-up Area (sqft)", value: unit.area_sqft },
                        { label: "Launch Price (AED)", value: unit.price, accent: true },
                        { label: "Price / sqft (AED)", value: unit.price_per_sqft },
                      ].map((item, i) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between gap-4 px-4 py-3"
                          style={{ borderTop: i === 0 ? "none" : `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}` }}
                        >
                          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: t.textMuted }}>
                            {item.label}
                          </span>
                          <span className="text-right text-[15px] font-semibold" style={{ color: item.accent ? GOLD : t.text }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="rounded-[22px] p-4"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.02)" : "#fffdf9",
                border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
              }}
            >
              <div className="flex gap-3">
                <div className="shrink-0 pt-0.5">
                  <InfoIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                    Pricing Note
                  </p>
                  <p className="mt-2 text-[14px] leading-6" style={{ color: t.textSecondary }}>
                    {data.pricing_note}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MobileAccordion
            title="Pricing Commentary"
            icon={<PricingIcon />}
            isOpen={mobileOpenSections.pricing}
            onToggle={() => toggleMobileSection("pricing")}
            t={t}
          >
            <div className="space-y-5">
              <p className="text-[14px] leading-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: commentary.intro }} />
              {commentary.factors.map((factor, i) => (
                <div key={i}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: GOLD }}>
                    {factor.title}
                  </p>
                  <p className="mt-2 text-[14px] leading-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: factor.content }} />
                </div>
              ))}
              <div
                className="rounded-[22px] p-4"
                style={{
                  background: t.isDark ? "rgba(255,255,255,0.02)" : "#fffdf9",
                  border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
                }}
              >
                <div className="flex gap-3">
                  <div className="shrink-0 pt-0.5">
                    <InfoIcon />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                      Investor Note
                    </p>
                    <p className="mt-2 text-[14px] leading-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: evolution.caveat }} />
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordion>

          <MobileAccordion
            title="Price Evolution Expectation"
            icon={<GraphIcon />}
            isOpen={mobileOpenSections.graph}
            onToggle={() => toggleMobileSection("graph")}
            t={t}
          >
            <div className="space-y-5">
              <p className="text-[14px] leading-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: evolution.intro }} />
              <div className="space-y-4">
                {mobileDriverBars.map((driver, i) => (
                  <div key={i}>
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[14px] font-medium" style={{ color: t.text }}>
                          {driver.label}
                        </p>
                        {driver.subtext && (
                          <p className="text-[12px]" style={{ color: t.textMuted }}>
                            {driver.subtext}
                          </p>
                        )}
                      </div>
                      <span className="text-[12px] font-semibold" style={{ color: GOLD }}>
                        {driver.strength}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full" style={{ background: t.isDark ? "rgba(255,255,255,0.1)" : "#E6E8EC" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: driver.value ? `${driver.value}%` : strengthToWidth(driver.strength),
                          background: "linear-gradient(90deg, #B68A35, #D7B05E)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="rounded-[22px] p-4"
                style={{
                  background: t.isDark ? "rgba(255,255,255,0.02)" : "#fffdf9",
                  border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
                }}
              >
                <div className="flex gap-3">
                  <div className="shrink-0 pt-0.5">
                    <InfoIcon />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                      Investor Note
                    </p>
                    <p className="mt-2 text-[14px] leading-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: evolution.caveat }} />
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordion>

          <MobileAccordion
            title="Floor Plan Insight"
            icon={<FloorplanIcon />}
            isOpen={mobileOpenSections.floorplans}
            onToggle={() => toggleMobileSection("floorplans")}
            t={t}
          >
            <p className="mb-4 text-[14px] leading-6" style={{ color: t.textSecondary }}>
              {data.floor_plan_intro}
            </p>
            <div className="space-y-3">
              {floorPlans.map((plan, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff",
                    border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}`,
                  }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold"
                    style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)", color: GOLD }}
                  >
                    {plan.bedrooms}B
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold" style={{ color: t.text }}>
                      {plan.title}
                    </h4>
                    <p className="mt-1 text-[13px] leading-5" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: plan.description }} />
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordion>

          <MobileAccordion
            title="Distinguishing Features"
            icon={<FeaturesIcon />}
            isOpen={mobileOpenSections.features}
            onToggle={() => toggleMobileSection("features")}
            t={t}
          >
            <div className="grid grid-cols-2 gap-3">
              {featureCards.map((feature, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.02)" : "#fff",
                    border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}`,
                  }}
                >
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)", color: GOLD }}
                  >
                    <FeatureGlyph index={i} />
                  </div>
                  <h4 className="text-[15px] font-semibold" style={{ color: t.text }}>
                    {feature.title}
                  </h4>
                  <p className="mt-2 text-[13px] leading-5" style={{ color: t.textSecondary }}>
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-4 rounded-[22px] p-4"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.02)" : "#fffdf9",
                border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
              }}
            >
              <div className="flex gap-3">
                <div className="shrink-0 pt-0.5">
                  <InfoIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                    {data.insider_tip_title || "What portals don't tell you"}
                  </p>
                  <p className="mt-2 text-[14px] leading-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: insider }} />
                </div>
              </div>
            </div>
          </MobileAccordion>
        </div>

        <div className="hidden lg:block">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0">
            {[
              { id: "overview", label: "Unit Overview" },
              { id: "pricing", label: "Pricing & Trends" },
              { id: "floorplans", label: "Floor Plans" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  background: activeTab === tab.id ? GOLD : t.cardBg,
                  color: activeTab === tab.id ? "#fff" : t.textMuted,
                  border: activeTab === tab.id ? "none" : `1px solid ${t.cardBorder}`,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Unit Overview */}
          {activeTab === "overview" && (
            <div>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${t.cardBorder}` }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: t.cardBg }}>
                    {["Unit Type", "Units", "Built-up Area (sqft)", "Launch Price (AED)", "Price / sqft (AED)", "Status"].map((h) => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {units.map((unit, i) => (
                    <tr key={i} className="transition-colors" style={{ borderTop: `1px solid ${t.cardBorder}`, background: i % 2 !== 0 ? (t.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent" }}>
                      <td className="px-5 py-4 text-sm font-medium" style={{ color: t.text }}>{unit.type_name}</td>
                      <td className="px-5 py-4 text-sm" style={{ color: t.textSecondary }}>{unit.units_count} <span style={{ color: t.textMuted }}>({unit.cluster})</span></td>
                      <td className="px-5 py-4 text-sm" style={{ color: t.textSecondary }}>{unit.area_sqft}</td>
                      <td className="px-5 py-4 text-sm font-semibold" style={{ color: "#B68A35" }}>{unit.price}</td>
                      <td className="px-5 py-4 text-sm" style={{ color: t.textSecondary }}>{unit.price_per_sqft}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: unit.availability === "available" ? "rgba(16,185,129,0.15)" : unit.availability === "limited" ? "rgba(182,138,53,0.15)" : t.isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0", color: unit.availability === "available" ? "#10b981" : unit.availability === "limited" ? "#B68A35" : t.textMuted }}>
                          {unit.availability === "not_released" ? "TBD" : unit.availability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

              <div className="mt-6">
                <button onClick={() => setExpandedNote(!expandedNote)} className="flex items-center gap-2 text-sm transition-colors" style={{ color: t.textMuted }}>
                  <InfoIcon color="currentColor" size={14} />
                  <span>Pricing note for 4 &amp; 5-bedroom units</span>
                  <ChevronIcon open={expandedNote} color="currentColor" />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedNote ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                  <p className="text-sm leading-relaxed pl-6" style={{ color: t.textSecondary, borderLeft: "2px solid rgba(182,138,53,0.3)" }}>{data.pricing_note}</p>
                </div>
              </div>

              {data.cta && (
                <div className="mt-8 flex flex-col items-start gap-2">
                  <a
                    href={data.cta.href || "#"}
                    className="px-6 py-3.5 rounded-lg font-semibold text-sm text-white transition-colors hover:opacity-90 inline-block"
                    style={{ background: GOLD }}
                  >
                    {data.cta.button_text}
                  </a>
                  {data.cta.subtext && (
                    <p className="text-sm leading-relaxed max-w-xl" style={{ color: t.textMuted }}>{data.cta.subtext}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "pricing" && (
            <div>
              <div className="space-y-6 mb-12">
                <p className="text-base lg:text-lg leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: commentary.intro }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {commentary.factors.map((factor, i) => (
                    <div key={i} className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                      <h4 className="text-sm font-bold mb-2" style={{ color: GOLD }}>{factor.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: factor.content }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-5 lg:p-8 mb-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <h3 className="text-lg font-bold mb-6" style={{ color: t.text }}>Price Evolution — AED/sqft Comparison</h3>
                <div className="overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0">
                  <div className="min-w-[500px]">
                    <div className="flex items-end gap-6 mb-4" style={{ height: 260 }}>
                      {priceData.map((item, i) => {
                        const maxVal = 2500;
                        const barHeight = 200;
                        const serroH = item.serro ? (item.serro / maxVal) * barHeight : 0;
                        const distH = item.district ? (item.district / maxVal) * barHeight : 0;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center justify-end" style={{ height: "100%" }}>
                            <div className="w-full flex gap-1.5 items-end justify-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-semibold" style={{ color: GOLD }}>{item.serro ? item.serro.toLocaleString() : "—"}</span>
                                <div className="rounded-t-md" style={{ height: serroH, width: 36, minHeight: item.serro ? 4 : 0, background: "linear-gradient(to top, #B68A35, #D4A843)" }} />
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-semibold" style={{ color: BLUE }}>{item.district ? item.district.toLocaleString() : "—"}</span>
                                <div className="rounded-t-md" style={{ height: distH, width: 36, minHeight: item.district ? 4 : 0, background: "linear-gradient(to top, #286CFF, #4d8aff)" }} />
                              </div>
                            </div>
                            <span className="text-[10px] text-center mt-2 whitespace-pre-line" style={{ color: t.textMuted }}>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-center gap-6 pt-4" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm" style={{ background: GOLD }} />
                        <span className="text-xs" style={{ color: t.textMuted }}>Serro at The Heights</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm" style={{ background: BLUE }} />
                        <span className="text-xs" style={{ color: t.textMuted }}>Dubai Hills District Avg</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 p-4 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                  <p className="text-sm font-medium" style={{ color: "#34d399" }}>
                    <span className="font-bold" style={{ color: t.text }}>~18% Value Gap</span> — Serro is priced below comparable Emaar villa communities
                  </p>
                </div>
              </div>

              <div className="rounded-xl p-5 lg:p-8" style={{ border: "1px solid rgba(182,138,53,0.2)", background: "rgba(182,138,53,0.05)" }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: GOLD }}>Price Evolution Expectation</h3>
                <p className="text-sm lg:text-base leading-relaxed mb-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: evolution.intro }} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {evolution.drivers.map((driver, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: t.cardBg }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                      <span className="text-sm" style={{ color: t.textSecondary }}>{driver}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed pl-4" style={{ color: t.textMuted, borderLeft: "2px solid rgba(182,138,53,0.3)" }} dangerouslySetInnerHTML={{ __html: evolution.caveat }} />
              </div>
            </div>
          )}

          {activeTab === "floorplans" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {floorPlans.map((plan, i) => (
                  <div key={i} className="rounded-xl p-5 transition-colors" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: "rgba(182,138,53,0.15)", color: GOLD }}>{plan.bedrooms}</span>
                      <h4 className="text-base font-bold" style={{ color: t.text }}>{plan.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: plan.description }} />
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-5 lg:p-8 mb-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <h3 className="text-lg font-bold mb-5" style={{ color: t.text }}>Distinguishing Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: GOLD }} />
                      <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-5 lg:p-8" style={{ border: "1px solid rgba(40,108,255,0.2)", background: "rgba(40,108,255,0.05)" }}>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                  <div>
                    <h4 className="text-sm font-bold mb-1" style={{ color: BLUE }}>{data.insider_tip_title || "What portals don't tell you"}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: insider }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UnitMixSection;
