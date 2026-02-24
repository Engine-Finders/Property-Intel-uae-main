"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import LocationMap from "../sub-components/LocationMap";

const LocationSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("walkability");

  const tabs = [
    { id: "walkability", label: "Walk Score" },
    { id: "drivetime", label: "Drive Times" },
    { id: "infrastructure", label: "Future Infra" },
    { id: "vibe", label: "Neighbourhood" },
  ];

  const driveTimeData = data.drive_times;
  const infraItems = data.infrastructure_developments;
  const vibePoints = data.neighbourhood_vibe;
  const timelineEvents = data.timeline;

  return (
    <section style={{ background: t.bg }} className="py-6 lg:py-10">
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

        {/* Interactive Map */}
        <div className="mb-12">
          <LocationMap />
        </div>

        {/* Infrastructure Timeline */}
        <div className="mb-12">
          <h3 style={{ color: t.text }} className="text-lg font-bold mb-6 text-center">
            Infrastructure Timeline — Key Milestones
          </h3>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block relative">
            {/* Timeline line */}
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
                  {/* Dot */}
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
                  {/* Year */}
                  <span
                    style={{
                      color: "#b8860b",
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    {evt.year}
                  </span>
                  {/* Label */}
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

          {/* Mobile vertical timeline */}
          <div className="md:hidden relative pl-8">
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 14,
                top: 0,
                bottom: 0,
                width: 3,
                background: `linear-gradient(180deg, #b8860b, #d4a843)`,
                borderRadius: 2,
              }}
            />
            <div className="space-y-6">
              {timelineEvents.map((evt, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -22,
                      top: 4,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #b8860b, #d4a843)",
                      border: `3px solid ${t.bg}`,
                      boxShadow: "0 0 10px #b8860b40",
                    }}
                  />
                  <div>
                    <span style={{ color: "#b8860b", fontSize: 16, fontWeight: 800 }}>
                      {evt.year}
                    </span>
                    <span style={{ color: t.text, fontSize: 14, fontWeight: 700, marginLeft: 8 }}>
                      {evt.title}
                    </span>
                    <p style={{ color: t.textMuted, fontSize: 12, marginTop: 2 }}>{evt.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          {/* WALKABILITY TAB */}
          {activeTab === "walkability" && (
            <div>
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-4">
                Walk Score & Pedestrian Experience
              </h3>
              <p style={{ color: t.textSecondary, lineHeight: 1.8 }} className="text-sm sm:text-base mb-6">
                Serro at The Heights is positioned within a low-density, family-oriented master
                community. The pedestrian experience is deliberately designed around{" "}
                <strong style={{ color: t.text }}>wellness rather than urban convenience</strong>.
              </p>

              <div className="space-y-4">
                {data.walkability.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: t.bgAlt,
                      borderTop: `1px solid ${t.cardBorder}`,
                      borderRight: `1px solid ${t.cardBorder}`,
                      borderBottom: `1px solid ${t.cardBorder}`,
                      borderLeft: `4px solid ${item.color}`,
                    }}
                    className="rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <h4 style={{ color: t.text }} className="font-bold text-sm mb-1">
                          {item.title}
                        </h4>
                        <p style={{ color: t.textSecondary, fontSize: 13, lineHeight: 1.7 }}>
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DRIVE TIME TAB */}
          {activeTab === "drivetime" && (
            <div>
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-2">
                Drive Time Analysis — Peak vs. Off-Peak
              </h3>
              <p style={{ color: t.textMuted, fontSize: 13 }} className="mb-6">
                Using Google Maps estimates validated against RTA infrastructure updates
              </p>

              {/* Mobile Cards */}
              <div className="block lg:hidden space-y-3 mb-6">
                {driveTimeData.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      background: t.bgAlt,
                      border: `1px solid ${t.cardBorder}`,
                    }}
                    className="rounded-lg p-4"
                  >
                    <span style={{ color: t.text }} className="font-bold text-sm block mb-2">
                      {row.destination}
                    </span>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                        <span style={{ color: t.textMuted, fontSize: 11 }}>Off-Peak</span>
                        <p style={{ color: "#16a34a", fontSize: 14, fontWeight: 700 }}>
                          {row.off_peak}
                        </p>
                      </div>
                      <div>
                        <span style={{ color: t.textMuted, fontSize: 11 }}>Peak</span>
                        <p style={{ color: "#dc2626", fontSize: 14, fontWeight: 700 }}>
                          {row.peak}
                        </p>
                      </div>
                    </div>
                    {row.notes && (
                      <p style={{ color: t.textMuted, fontSize: 11, fontStyle: "italic" }}>
                        {row.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block mb-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${t.cardBorder}` }}>
                      {["Destination", "Off-Peak", "Peak", "Notes"].map((h) => (
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
                    {driveTimeData.map((row, i) => (
                      <tr
                        key={i}
                        style={{ borderBottom: `1px solid ${t.cardBorder}` }}
                      >
                        <td style={{ color: t.text, padding: "10px 12px", fontWeight: 600 }}>
                          {row.destination}
                        </td>
                        <td style={{ color: "#16a34a", padding: "10px 12px", fontWeight: 600 }}>
                          {row.off_peak}
                        </td>
                        <td style={{ color: "#dc2626", padding: "10px 12px", fontWeight: 600 }}>
                          {row.peak}
                        </td>
                        <td style={{ color: t.textMuted, padding: "10px 12px", fontSize: 12 }}>
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Future Value Note */}
              <div
                style={{
                  background: t.isDark ? "#2563eb10" : "#eff6ff",
                  border: "1px solid #2563eb30",
                  borderLeft: "4px solid #2563eb",
                }}
                className="rounded-lg p-4 text-sm"
              >
                <p style={{ color: t.text, fontWeight: 700, marginBottom: 4 }}>
                  📈 Future Value — Metro Blue Line
                </p>
                <p style={{ color: t.textSecondary, lineHeight: 1.7 }}>
                  The AED 20.5 billion Dubai Metro Blue Line contract has been awarded, connecting
                  Dubai Creek Harbour to Dubai South via 14 new stations. While completion is
                  post-2030, historical data from the Red and Green lines shows{" "}
                  <strong style={{ color: t.text }}>15–25% property value appreciation</strong> within
                  a 2km radius of new stations in the 3 years following opening. This positions Serro
                  for meaningful long-term upside.
                </p>
              </div>
            </div>
          )}

          {/* INFRASTRUCTURE TAB */}
          {activeTab === "infrastructure" && (
            <div>
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-6">
                Future Infrastructure — RTA Expansions & Masterplan Developments
              </h3>

              <div className="space-y-6">
                {infraItems.map((item, i) => (
                  <div key={i}>
                    <h4 style={{ color: t.text }} className="font-bold text-base mb-2">
                      {item.title}
                    </h4>
                    {item.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        style={{ color: t.textSecondary, lineHeight: 1.8 }}
                        className="text-sm sm:text-base mb-3"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    ))}
                    {item.relevance && (
                      <div
                        style={{
                          background: t.isDark ? "#b8860b10" : "#fef3c7",
                          border: "1px solid #b8860b30",
                          borderLeft: "4px solid #b8860b",
                        }}
                        className="rounded-lg p-4 text-sm mt-2"
                      >
                        <p style={{ color: t.text, fontWeight: 700, marginBottom: 4 }}>
                          Direct Relevance to The Heights
                        </p>
                        <p style={{ color: t.textSecondary, lineHeight: 1.7 }}>{item.relevance}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEIGHBOURHOOD VIBE TAB */}
          {activeTab === "vibe" && (
            <div>
              <h3 style={{ color: t.text }} className="text-xl font-bold mb-4">
                Neighbourhood Vibe — Emerging Wellness Enclave
              </h3>
              <p style={{ color: t.textSecondary, lineHeight: 1.8 }} className="text-sm sm:text-base mb-6">
                The Heights is positioned as an emerging, wellness-focused residential district.
                Unlike the buzzing energy of Dubai Marina or the urban intensity of Downtown, The
                Heights offers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {vibePoints.map((point, i) => (
                  <div
                    key={i}
                    style={{
                      background: t.bgAlt,
                      border: `1px solid ${t.cardBorder}`,
                    }}
                    className="rounded-xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{point.icon}</span>
                      <h4 style={{ color: t.text }} className="font-bold text-sm">
                        {point.title}
                      </h4>
                    </div>
                    <p style={{ color: t.textSecondary, fontSize: 13, lineHeight: 1.7 }}>
                      {point.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Construction Warning */}
              <div
                style={{
                  background: t.isDark ? "#ca8a0410" : "#fef9c3",
                  border: "1px solid #ca8a0430",
                  borderLeft: "4px solid #ca8a04",
                }}
                className="rounded-lg p-4 text-sm"
              >
                <p style={{ color: t.text, fontWeight: 700, marginBottom: 4 }}>
                  ⚠️ Construction Phase Reality
                </p>
                <p style={{ color: t.textSecondary, lineHeight: 1.7 }}>
                  2026–2030 will see active development; early residents should expect a live
                  building site environment for 12–24 months post-first handovers. This is standard
                  for new master communities and typically resolves as phases complete sequentially.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
