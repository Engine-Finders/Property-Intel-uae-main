"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const TargetBuyerSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "overview", label: "Who Should Buy?" },
    { id: "investment", label: "Investment Case" },
    { id: "enduser", label: "End-User & Visa" },
    { id: "matrix", label: "Verdict Matrix" },
  ];

  const trafficCards = [
    {
      color: "#16a34a",
      colorLight: "#dcfce7",
      colorMid: "#22c55e",
      label: "GO",
      title: "For Families & Visa Seekers",
      desc: "AED 6M meets Golden Visa threshold. Wellness lifestyle, future schools & healthcare, proximity to DWC employment corridor. Buy with confidence.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      color: "#ca8a04",
      colorLight: "#fef9c3",
      colorMid: "#eab308",
      label: "CAUTION",
      title: "For Yield Investors",
      desc: "4–5% gross yields below apartment alternatives. But villa scarcity premium and infrastructure maturation support long-term appreciation for 5+ year holders.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 7v5l3 3" />
          <path d="M9 16h6" />
        </svg>
      ),
    },
    {
      color: "#dc2626",
      colorLight: "#fee2e2",
      colorMid: "#ef4444",
      label: "STOP",
      title: "For Short-Term Flippers",
      desc: "Not a traditional quick flip — but launch-phase resale, distressed acquisition, and handover exit strategies viable for experienced investors.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
          <line x1="4" y1="4" x2="20" y2="20" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const rentalData = data.rental_benchmarking;
  const flipStrategies = data.flip_strategies;
  const infraTimeline = data.infrastructure_timeline;
  const matrix = data.recommendation_matrix;

  return (
    <section style={{ background: t.bg }} className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <span
            style={{
              background: "linear-gradient(135deg, #b8860b, #d4a843)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-sm font-semibold tracking-widest uppercase"
          >
            Target Buyer & Investment Rationale
          </span>
          <h2
            style={{ color: t.text }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 leading-tight"
          >
            Who Should Buy at Serro?{" "}
            <span style={{ color: "#b8860b" }}>Investor, End-User, or Both?</span>
          </h2>
        </div>

        {/* Traffic Light Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {trafficCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: t.isDark
                  ? `linear-gradient(160deg, ${t.cardBg}, ${t.bgAlt})`
                  : `linear-gradient(160deg, #ffffff, ${card.colorLight}40)`,
                border: `2px solid ${card.color}40`,
                borderTop: `4px solid ${card.color}`,
              }}
              className="rounded-xl p-6 relative overflow-hidden"
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: `radial-gradient(circle at top right, ${card.color}15, transparent 70%)`,
                }}
              />
              <div className="flex items-center gap-3 mb-4">
                <div
                  style={{
                    background: `${card.color}20`,
                    color: card.color,
                    border: `1px solid ${card.color}40`,
                  }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                >
                  {card.icon}
                </div>
                <div>
                  <span
                    style={{
                      color: card.color,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                    }}
                  >
                    {card.label}
                  </span>
                  <h3 style={{ color: t.text }} className="text-lg font-bold leading-tight">
                    {card.title}
                  </h3>
                </div>
              </div>
              <p style={{ color: t.textSecondary, fontSize: 14, lineHeight: 1.7 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background:
                  activeTab === tab.id
                    ? "linear-gradient(135deg, #b8860b, #d4a843)"
                    : t.cardBg,
                color: activeTab === tab.id ? "#ffffff" : t.textSecondary,
                border: `1px solid ${activeTab === tab.id ? "#b8860b" : t.cardBorder}`,
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder}`,
          }}
          className="rounded-xl p-5 sm:p-8"
        >
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div>
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-4">
                The Investment Case — Yield Seekers & Capital Growth
              </h3>
              <p
                style={{ color: t.textSecondary, lineHeight: 1.8 }}
                className="text-sm sm:text-base mb-6"
              >
                For yield-focused investors, Serro presents a measured opportunity. The Dubai South
                corridor recorded <strong style={{ color: t.text }}>14.2% capital appreciation in 2024</strong>,
                with average prices now at AED 917/sq.ft across the district. While Serro&apos;s launch
                pricing at approximately <strong style={{ color: "#b8860b" }}>AED 1,732/sq.ft</strong> sits
                above this district average, it reflects the premium attached to Emaar&apos;s
                master-planning and wellness infrastructure.
              </p>

              {/* Rental Benchmarking Table */}
              <h4 style={{ color: t.text }} className="text-lg font-bold mb-4">
                Rental Benchmarking — Per Sq.Ft (Mature Comparables)
              </h4>

              {/* Mobile Cards */}
              <div className="block lg:hidden space-y-3 mb-6">
                {rentalData.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      background: row.highlight
                        ? `linear-gradient(135deg, ${t.bgAlt}, #b8860b10)`
                        : t.bgAlt,
                      border: `1px solid ${row.highlight ? "#b8860b40" : t.cardBorder}`,
                    }}
                    className="rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span style={{ color: t.text }} className="font-bold text-sm">
                        {row.community}
                      </span>
                      {row.highlight && (
                        <span
                          style={{
                            background: "#b8860b20",
                            color: "#b8860b",
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontWeight: 700,
                          }}
                        >
                          THIS PROJECT
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <span style={{ color: t.textMuted, fontSize: 11 }}>Annual Rent</span>
                        <p style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>{row.annual_rent}</p>
                      </div>
                      <div>
                        <span style={{ color: t.textMuted, fontSize: 11 }}>Size</span>
                        <p style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>{row.size}</p>
                      </div>
                      <div>
                        <span style={{ color: t.textMuted, fontSize: 11 }}>Rent/sqft</span>
                        <p style={{ color: "#b8860b", fontSize: 13, fontWeight: 700 }}>{row.rent_per_sqft}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block mb-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${t.cardBorder}` }}>
                      {["Community", "Annual Rent (3BR)", "Size (sq.ft)", "Rent per sq.ft"].map(
                        (h) => (
                          <th
                            key={h}
                            style={{ color: t.text, padding: "10px 12px" }}
                            className="text-left font-bold"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {rentalData.map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: `1px solid ${t.cardBorder}`,
                          background: row.highlight ? "#b8860b08" : "transparent",
                        }}
                      >
                        <td style={{ color: t.text, padding: "10px 12px", fontWeight: row.highlight ? 700 : 500 }}>
                          {row.community}
                          {row.highlight && (
                            <span style={{ color: "#b8860b", fontSize: 10, marginLeft: 8, fontWeight: 700 }}>
                              ★ THIS PROJECT
                            </span>
                          )}
                        </td>
                        <td style={{ color: t.textSecondary, padding: "10px 12px" }}>{row.annual_rent}</td>
                        <td style={{ color: t.textSecondary, padding: "10px 12px" }}>{row.size}</td>
                        <td style={{ color: "#b8860b", padding: "10px 12px", fontWeight: 700 }}>{row.rent_per_sqft}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  background: t.isDark ? "#b8860b10" : "#fef3c7",
                  border: "1px solid #b8860b30",
                  borderLeft: "4px solid #b8860b",
                }}
                className="rounded-lg p-4 text-sm"
              >
                <p style={{ color: t.textSecondary, lineHeight: 1.7 }}>
                  Applying a mid-range projection of <strong style={{ color: t.text }}>AED 270,000</strong> against
                  a AED 6,000,000 purchase price suggests a gross yield of approximately{" "}
                  <strong style={{ color: "#b8860b" }}>4.5%</strong> — consistent with Dubai South&apos;s 5.5–7.5%
                  villa yields but below the 8%+ achievable in higher-density apartment districts.
                </p>
              </div>
            </div>
          )}

          {/* INVESTMENT / FLIPPER TAB */}
          {activeTab === "investment" && (
            <div>
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-4">
                The Flipper&apos;s Perspective — Short-Term Strategies
              </h3>
              <p style={{ color: t.textSecondary, lineHeight: 1.8 }} className="text-sm sm:text-base mb-6">
                Contrary to the &quot;Avoid&quot; label, Serro offers multiple entry points for sophisticated
                short-term investors who understand off-plan mechanics.
              </p>

              <div className="space-y-4 mb-6">
                {flipStrategies.map((strategy, i) => (
                  <div
                    key={i}
                    onClick={() => toggleAccordion(`flip-${i}`)}
                    style={{
                      background: t.bgAlt,
                      border: `1px solid ${t.cardBorder}`,
                      cursor: "pointer",
                    }}
                    className="rounded-lg overflow-hidden"
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          style={{
                            background: "linear-gradient(135deg, #b8860b, #d4a843)",
                            color: "#fff",
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 800,
                          }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <h4 style={{ color: t.text }} className="font-bold text-sm">
                            {strategy.title}
                          </h4>
                          <span style={{ color: t.textMuted, fontSize: 12 }}>{strategy.timing}</span>
                        </div>
                      </div>
                      <span
                        style={{
                          color: "#b8860b",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {strategy.target}
                      </span>
                    </div>
                    {openAccordions[`flip-${i}`] && (
                      <div
                        style={{
                          borderTop: `1px solid ${t.cardBorder}`,
                          padding: "12px 16px",
                        }}
                      >
                        <p style={{ color: t.textSecondary, fontSize: 13, lineHeight: 1.7 }}>
                          {strategy.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: t.isDark ? "#dc262610" : "#fee2e2",
                  border: "1px solid #dc262630",
                  borderLeft: "4px solid #dc2626",
                }}
                className="rounded-lg p-4 text-sm"
              >
                <p style={{ color: t.text, fontWeight: 700, marginBottom: 4 }}>Flipper Verdict</p>
                <p style={{ color: t.textSecondary, lineHeight: 1.7 }}>
                  Requires structured capital and strategic timing, but 4-year timeline creates
                  arbitrage opportunities unavailable in shorter projects.
                </p>
              </div>
            </div>
          )}

          {/* END-USER & VISA TAB */}
          {activeTab === "enduser" && (
            <div>
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-4">
                The End-User Perspective — Families & Wellness Buyers
              </h3>
              <p style={{ color: t.textSecondary, lineHeight: 1.8 }} className="text-sm sm:text-base mb-6">
                For families, Serro&apos;s value lies in lifestyle calculus. The Heights dedicates{" "}
                <strong style={{ color: t.text }}>25% of land to open space</strong>, with 38km of
                cycling tracks, wellness lakes, and meditation gardens — amenities typically found in
                communities priced 20–30% higher.
              </p>

              {/* Infrastructure Timeline */}
              <h4 style={{ color: t.text }} className="text-lg font-bold mb-4">
                Future Infrastructure (Handover Alignment)
              </h4>

              {/* Mobile Cards */}
              <div className="block lg:hidden space-y-3 mb-6">
                {infraTimeline.map((item, i) => (
                  <div
                    key={i}
                    style={{ background: t.bgAlt, border: `1px solid ${t.cardBorder}` }}
                    className="rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span style={{ color: t.text, fontWeight: 700, fontSize: 14 }}>
                        {item.facility}
                      </span>
                      <span
                        style={{
                          background: "#b8860b20",
                          color: "#b8860b",
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 6,
                          fontWeight: 700,
                        }}
                      >
                        {item.timeline}
                      </span>
                    </div>
                    <p style={{ color: t.textMuted, fontSize: 12 }}>{item.details}</p>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block mb-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${t.cardBorder}` }}>
                      {["Facility", "Timeline", "Details"].map((h) => (
                        <th
                          key={h}
                          style={{ color: t.text, padding: "10px 12px" }}
                          className="text-left font-bold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {infraTimeline.map((item, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                        <td style={{ color: t.text, padding: "10px 12px", fontWeight: 600 }}>
                          {item.facility}
                        </td>
                        <td style={{ color: "#b8860b", padding: "10px 12px", fontWeight: 600 }}>
                          {item.timeline}
                        </td>
                        <td style={{ color: t.textSecondary, padding: "10px 12px" }}>
                          {item.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Connectivity Note */}
              <div
                style={{ background: t.bgAlt, border: `1px solid ${t.cardBorder}` }}
                className="rounded-lg p-4 mb-6"
              >
                <p style={{ color: t.textSecondary, fontSize: 13, lineHeight: 1.7 }}>
                  <strong style={{ color: t.text }}>Connectivity:</strong> Existing schools (South
                  View, Jebel Ali) within 15–20 min until community school opens. Direct road access
                  to Emirates Road; future Metro extension planned post-2030.
                </p>
              </div>

              {/* Lifestyle Positioning */}
              <div
                style={{ background: t.bgAlt, border: `1px solid ${t.cardBorder}` }}
                className="rounded-lg p-4 mb-8"
              >
                <p style={{ color: t.textSecondary, fontSize: 13, lineHeight: 1.7 }}>
                  <strong style={{ color: t.text }}>Lifestyle Positioning:</strong> Premium wellness
                  community in Dubai South corridor — above entry-level (AED 2.6M villas) but below
                  ultra-luxury AED 10M+ segment. Appeals to aviation professionals, DIFC commuters,
                  and health-focused families.
                </p>
              </div>

              {/* Golden Visa */}
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-4">
                The Residency/Visa Buyer — Golden Visa Eligibility
              </h3>
              <div
                style={{
                  background: t.isDark ? "#16a34a10" : "#dcfce7",
                  border: "1px solid #16a34a30",
                  borderLeft: "4px solid #16a34a",
                }}
                className="rounded-lg p-5"
              >
                <p style={{ color: t.textSecondary, fontSize: 14, lineHeight: 1.8 }}>
                  The <strong style={{ color: t.text }}>AED 6,000,000</strong> entry price positions
                  Serro comfortably above the AED 2,000,000 Golden Visa threshold. Key advantage:
                  Only <strong style={{ color: "#16a34a" }}>10% booking (AED 600,000)</strong>{" "}
                  required initially — well below the 20% down payment typically associated with visa
                  eligibility, with remaining 70% spread over 4 years. Emaar&apos;s transparent handover
                  process supports clean title deed registration on completion.
                </p>
              </div>
            </div>
          )}

          {/* VERDICT MATRIX TAB */}
          {activeTab === "matrix" && (
            <div>
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-6">
                Clear Recommendation Matrix
              </h3>

              {/* Mobile Cards */}
              <div className="block lg:hidden space-y-4">
                {matrix.map((row, i) => {
                  const verdictColor =
                    row.verdict === "✅ Buy"
                      ? "#16a34a"
                      : row.verdict === "⚠️ Consider" || row.verdict === "⚠️ Opportunity"
                      ? "#ca8a04"
                      : "#dc2626";
                  return (
                    <div
                      key={i}
                      style={{
                        background: t.bgAlt,
                        border: `1px solid ${t.cardBorder}`,
                        borderLeft: `4px solid ${verdictColor}`,
                      }}
                      className="rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span style={{ color: t.text, fontWeight: 700, fontSize: 14 }}>
                          {row.profile}
                        </span>
                        <span
                          style={{
                            color: verdictColor,
                            fontWeight: 800,
                            fontSize: 13,
                          }}
                        >
                          {row.verdict}
                        </span>
                      </div>
                      <p style={{ color: t.textSecondary, fontSize: 13, lineHeight: 1.6 }}>
                        {row.rationale}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${t.cardBorder}` }}>
                      {["Profile", "Verdict", "Rationale"].map((h) => (
                        <th
                          key={h}
                          style={{ color: t.text, padding: "12px 14px" }}
                          className="text-left font-bold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row, i) => {
                      const verdictColor =
                        row.verdict === "✅ Buy"
                          ? "#16a34a"
                          : row.verdict === "⚠️ Consider" || row.verdict === "⚠️ Opportunity"
                          ? "#ca8a04"
                          : "#dc2626";
                      return (
                        <tr key={i} style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                          <td style={{ color: t.text, padding: "12px 14px", fontWeight: 600 }}>
                            {row.profile}
                          </td>
                          <td
                            style={{
                              color: verdictColor,
                              padding: "12px 14px",
                              fontWeight: 800,
                            }}
                          >
                            {row.verdict}
                          </td>
                          <td style={{ color: t.textSecondary, padding: "12px 14px", lineHeight: 1.6 }}>
                            {row.rationale}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TargetBuyerSection;
