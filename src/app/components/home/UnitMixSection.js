"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const UnitMixSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedNote, setExpandedNote] = useState(false);

  const units = data.units;
  const commentary = data.price_commentary;
  const evolution = data.price_evolution;
  const floorPlans = data.floor_plans;
  const features = data.distinguishing_features;
  const insider = data.insider_tip;
  const priceData = data.price_chart_data;

  return (
    <section style={{ background: t.bg }} className="py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#B68A35" }}>Unit Types & Price Evolution</p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight" style={{ color: t.text }}>{data.heading}</h2>
        </div>

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
                background: activeTab === tab.id ? "#B68A35" : t.cardBg,
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
            {/* Mobile: Cards */}
            <div className="block lg:hidden space-y-4">
              {units.map((unit, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold" style={{ color: t.text }}>{unit.type_name}</h3>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: unit.availability === "available" ? "rgba(16,185,129,0.15)" : unit.availability === "limited" ? "rgba(182,138,53,0.15)" : t.isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0", color: unit.availability === "available" ? "#10b981" : unit.availability === "limited" ? "#B68A35" : t.textMuted, border: `1px solid ${unit.availability === "available" ? "rgba(16,185,129,0.3)" : unit.availability === "limited" ? "rgba(182,138,53,0.3)" : t.cardBorder}` }}>
                      {unit.availability === "not_released" ? "TBD" : unit.availability}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Units", value: unit.units_count },
                      { label: "Cluster", value: unit.cluster },
                      { label: "Built-up Area", value: unit.area_sqft },
                      { label: "Price / sqft", value: unit.price_per_sqft },
                    ].map((item, j) => (
                      <div key={j}>
                        <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>{item.label}</p>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: t.text }}>{item.value}</p>
                      </div>
                    ))}
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Launch Price</p>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: "#B68A35" }}>{unit.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table */}
            <div className="hidden lg:block rounded-xl overflow-hidden" style={{ border: `1px solid ${t.cardBorder}` }}>
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

            {/* Pricing Note */}
            <div className="mt-6">
              <button onClick={() => setExpandedNote(!expandedNote)} className="flex items-center gap-2 text-sm transition-colors" style={{ color: t.textMuted }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <span>Pricing note for 4 &amp; 5-bedroom units</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${expandedNote ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedNote ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                <p className="text-sm leading-relaxed pl-6" style={{ color: t.textSecondary, borderLeft: "2px solid rgba(182,138,53,0.3)" }}>{data.pricing_note}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Pricing & Trends */}
        {activeTab === "pricing" && (
          <div>
            <div className="space-y-6 mb-12">
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: commentary.intro }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commentary.factors.map((factor, i) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                    <h4 className="text-sm font-bold mb-2" style={{ color: "#B68A35" }}>{factor.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: factor.content }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
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
                              <span className="text-[10px] font-semibold" style={{ color: "#B68A35" }}>{item.serro ? item.serro.toLocaleString() : "—"}</span>
                              <div className="rounded-t-md" style={{ height: serroH, width: 36, minHeight: item.serro ? 4 : 0, background: "linear-gradient(to top, #B68A35, #D4A843)" }} />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[10px] font-semibold" style={{ color: "#286CFF" }}>{item.district ? item.district.toLocaleString() : "—"}</span>
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
                      <span className="w-3 h-3 rounded-sm" style={{ background: "#B68A35" }} />
                      <span className="text-xs" style={{ color: t.textMuted }}>Serro at The Heights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm" style={{ background: "#286CFF" }} />
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

            {/* Price Evolution */}
            <div className="rounded-xl p-5 lg:p-8" style={{ border: "1px solid rgba(182,138,53,0.2)", background: "rgba(182,138,53,0.05)" }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "#B68A35" }}>Price Evolution Expectation</h3>
              <p className="text-sm lg:text-base leading-relaxed mb-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: evolution.intro }} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {evolution.drivers.map((driver, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: t.cardBg }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                    <span className="text-sm" style={{ color: t.textSecondary }}>{driver}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed pl-4" style={{ color: t.textMuted, borderLeft: "2px solid rgba(182,138,53,0.3)" }} dangerouslySetInnerHTML={{ __html: evolution.caveat }} />
            </div>
          </div>
        )}

        {/* TAB 3: Floor Plans */}
        {activeTab === "floorplans" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {floorPlans.map((plan, i) => (
                <div key={i} className="rounded-xl p-5 transition-colors" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: "rgba(182,138,53,0.15)", color: "#B68A35" }}>{plan.bedrooms}</span>
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
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#B68A35" }} />
                    <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5 lg:p-8" style={{ border: "1px solid rgba(40,108,255,0.2)", background: "rgba(40,108,255,0.05)" }}>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#286CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                <div>
                  <h4 className="text-sm font-bold mb-1" style={{ color: "#286CFF" }}>What portals don&apos;t tell you</h4>
                  <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: insider }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UnitMixSection;
