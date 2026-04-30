"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";

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
  const [mobileOpenSections, setMobileOpenSections] = useState({
    pricing: false,
    graph: false,
    floorplans: false,
    features: false,
  });

  const units = data.units;
  const commentary = data.price_commentary;
  const evolution = data.price_evolution;
  const floorPlans = data.floor_plans;
  const featureCards = data.distinguishing_feature_cards || [];
  const insider = data.insider_tip;
  const { primary, accent } = splitHeading(data.heading);
  const bedroomTabs = [...new Set(units.map((unit) => getBedroomKey(unit)).filter((item) => item !== "other"))];
  const [mobileBedroomTab, setMobileBedroomTab] = useState(bedroomTabs[0] || "3");
  const [desktopBedroomTab, setDesktopBedroomTab] = useState(bedroomTabs[0] || "3");
  const selectedMobileUnits = units.filter((unit) => getBedroomKey(unit) === mobileBedroomTab);
  const selectedDesktopUnits = units.filter((unit) => getBedroomKey(unit) === desktopBedroomTab);
  const mobileDriverBars = evolution.mobile_driver_bars || [];
  const toggleMobileSection = (key) => {
    setMobileOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section style={{ background: t.bg }} className="py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-3">
        <div className="mb-10 lg:hidden">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Unit Types & Price Evolution</p>
          <div>
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
          </MobileAccordion>

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
                  {data.insider_tip_title || "What portals don't tell you"}
                </p>
                <p className="mt-2 text-[14px] leading-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: insider }} />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="mb-7 text-center">
            <h2 className="text-[3rem] font-semibold leading-[1.05]" style={{ color: t.text }}>
              {primary}
              {accent && (
                <span className="mt-1 block italic" style={{ color: GOLD }}>
                  {accent}
                </span>
              )}
            </h2>
            {data.subtitle && (
              <p className="mt-3 text-base" style={{ color: t.textSecondary }}>
                {data.subtitle}
              </p>
            )}
          </div>

          <div className="mx-auto mb-7 flex max-w-xl gap-1 rounded-xl p-1" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f7f3eb", border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}` }}>
            {bedroomTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setDesktopBedroomTab(tab)}
                className="flex-1 rounded-lg px-8 py-3 text-sm font-medium transition-colors"
                style={{
                  background: desktopBedroomTab === tab ? GOLD : "transparent",
                  color: desktopBedroomTab === tab ? "#fff" : t.text,
                  boxShadow: desktopBedroomTab === tab ? "0 8px 18px rgba(182,138,53,0.22)" : "none",
                }}
              >
                {tab}-Bedroom
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            {selectedDesktopUnits.map((unit, index) => {
              const selectedUnitMeta = getAvailabilityMeta(unit.availability, t);
              const unitName = splitUnitName(unit.type_name);

              return (
                <div
                  key={`${unit.type_name}-${index}`}
                  className="rounded-[24px] p-6"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.02)" : "#fffdf9",
                    border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
                    boxShadow: t.isDark ? "0 10px 24px rgba(0,0,0,0.18)" : "0 10px 24px rgba(15,23,42,0.04)",
                  }}
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                        {unit.cluster}
                      </p>
                      <h3 className="mt-2 text-[2rem] font-semibold leading-[1.02]" style={{ color: t.text }}>
                        {unitName.main}
                        {unitName.sub && (
                          <span className="ml-1 text-[1.45rem] font-normal" style={{ color: t.textSecondary }}>
                            {unitName.sub}
                          </span>
                        )}
                      </h3>
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
                      { label: "Units Available", value: unit.units_count, icon: <OverviewIcon /> },
                      { label: "Built-up Area (sqft)", value: unit.area_sqft, icon: <FloorplanIcon /> },
                      { label: "Launch Price (AED)", value: unit.price, accent: true, icon: <PricingIcon /> },
                      { label: "Price / sqft (AED)", value: unit.price_per_sqft, icon: <GraphIcon /> },
                    ].map((item, i) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-4 px-5 py-4"
                        style={{ borderTop: i === 0 ? "none" : `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}` }}
                      >
                        <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: t.textMuted }}>
                          <span className="text-[#B68A35]">{item.icon}</span>
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
            className="mt-5 rounded-[22px] p-5"
            style={{
              background: t.isDark ? "rgba(255,255,255,0.02)" : "#fffdf9",
              border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
            }}
          >
            <div className="flex gap-4">
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

          <div className="mt-5 grid grid-cols-2 items-start gap-4">
            <div className="space-y-4">
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
            </div>

            <div className="space-y-4">
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
                title="Design & Finishing Highlights"
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
              </MobileAccordion>
            </div>
          </div>

          <div
            className="mt-5 rounded-[22px] p-5"
            style={{
              background: t.isDark ? "rgba(255,255,255,0.02)" : "#fffdf9",
              border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
            }}
          >
            <div className="flex gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default UnitMixSection;
