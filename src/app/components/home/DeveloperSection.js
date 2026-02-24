"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const DeveloperSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "track_record", label: "Track Record" },
    { id: "quality", label: "Quality & Risk" },
    { id: "buyer_guide", label: "Buyer Guide" },
  ];

  const stats = data.stats;
  const deliveryTable = data.delivery_track_record;
  const qualityIssues = data.known_quality_issues;
  const positiveIndicators = data.positive_quality_indicators;
  const financials = data.financial_highlights;
  const strengths = data.strengths_applied;
  const weaknesses = data.weaknesses_to_monitor;
  const verificationSteps = data.verification_framework;

  return (
    <section style={{ background: t.bgAlt }} className="py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#B68A35" }}>Developer Profile & Track Record</p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-2" style={{ color: t.text }}>{data.heading}</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
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

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke={t.isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"} strokeWidth="6" />
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#B68A35" strokeWidth="6" strokeDasharray={`${(stat.progress / 100) * 213.6} 213.6`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base font-bold" style={{ color: t.text }}>{stat.value}</span>
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: t.textMuted }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6 lg:p-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>Company Background</h3>
              <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.company_background }} />
            </div>

            <div className="rounded-2xl p-6 lg:p-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>Institutional Context</h3>
              <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.institutional_context }} />
            </div>

            {/* RERA Trust Badge */}
            <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.15)" }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#10b981" }}>RERA Registered & Escrow Compliant</p>
                <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>All active projects maintain registered escrow accounts with no public record of fund misuse penalties.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {financials.map((f, i) => (
                <div key={i} className="rounded-xl p-4 text-center" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                  <p className="text-xl font-bold" style={{ color: "#B68A35" }}>{f.value}</p>
                  <p className="text-xs mt-1" style={{ color: t.textMuted }}>{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRACK RECORD */}
        {activeTab === "track_record" && (
          <div className="space-y-8">
            <div className="rounded-2xl p-6 lg:p-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>On-Time Delivery Performance</h3>
              <p className="text-sm mb-6" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.delivery_intro }} />

              {/* Mobile cards */}
              <div className="lg:hidden space-y-3">
                {deliveryTable.map((row, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: t.text }}>{row.project}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span style={{ color: t.textMuted }}>Original:</span><span className="ml-1" style={{ color: t.textSecondary }}>{row.original}</span></div>
                      <div><span style={{ color: t.textMuted }}>Actual:</span><span className="ml-1" style={{ color: t.textSecondary }}>{row.actual}</span></div>
                      <div><span style={{ color: t.textMuted }}>Delay:</span><span className="ml-1" style={{ color: row.delay === "On time" ? "#10b981" : "#f59e0b" }}>{row.delay}</span></div>
                    </div>
                    {row.notes && <p className="text-[10px] mt-2 italic" style={{ color: t.textMuted }}>{row.notes}</p>}
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                      {["Project", "Original Handover", "Actual Handover", "Delay", "Notes"].map((h) => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryTable.map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${t.isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"}` }}>
                        <td className="py-3 px-3 font-medium" style={{ color: t.text }}>{row.project}</td>
                        <td className="py-3 px-3" style={{ color: t.textSecondary }}>{row.original}</td>
                        <td className="py-3 px-3" style={{ color: t.textSecondary }}>{row.actual}</td>
                        <td className="py-3 px-3 font-semibold" style={{ color: row.delay === "On time" ? "#10b981" : "#f59e0b" }}>{row.delay}</td>
                        <td className="py-3 px-3 text-xs italic" style={{ color: t.textMuted }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "rgba(182,138,53,0.06)", border: "1px solid rgba(182,138,53,0.15)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#B68A35" }}>Analysis</p>
              <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.delivery_analysis }} />
            </div>
          </div>
        )}

        {/* QUALITY & RISK */}
        {activeTab === "quality" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>Known Quality Issues</h3>
              <p className="text-xs mb-4 italic" style={{ color: t.textMuted }}>Based on aggregated resident reviews (Property Finder, Trustpilot, Reddit r/dubai)</p>
              <div className="space-y-2">
                {qualityIssues.map((issue, i) => {
                  const key = `quality_${i}`;
                  const isOpen = openAccordions[key];
                  return (
                    <div key={i} className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                      <button onClick={() => toggleAccordion(key)} className="w-full flex items-center justify-between p-4 text-left">
                        <div className="flex items-center gap-3">
                          <span className="text-base">{issue.icon}</span>
                          <span className="text-sm font-medium" style={{ color: t.text }}>{issue.title}</span>
                        </div>
                        <svg className="w-4 h-4 transition-transform" style={{ color: t.textMuted, transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{issue.content}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>Positive Quality Indicators</h3>
              <ul className="space-y-3">
                {positiveIndicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(16,185,129,0.15)" }}>
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#10b981" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-sm" style={{ color: t.textSecondary }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "#10b981" }}>
                  <span>▲</span> Strengths Applied to Serro
                </h3>
                <div className="space-y-2">
                  {strengths.map((s, i) => {
                    const key = `strength_${i}`;
                    const isOpen = openAccordions[key];
                    return (
                      <div key={i}>
                        <button onClick={() => toggleAccordion(key)} className="w-full flex items-center justify-between py-2 text-left">
                          <span className="text-sm font-medium" style={{ color: t.text }}>{s.title}</span>
                          <svg className="w-3.5 h-3.5 transition-transform" style={{ color: t.textMuted, transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                        </button>
                        {isOpen && <p className="text-xs leading-relaxed pb-2" style={{ color: t.textSecondary }}>{s.content}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "#f59e0b" }}>
                  <span>▼</span> Weaknesses to Monitor
                </h3>
                <div className="space-y-2">
                  {weaknesses.map((w, i) => {
                    const key = `weakness_${i}`;
                    const isOpen = openAccordions[key];
                    return (
                      <div key={i}>
                        <button onClick={() => toggleAccordion(key)} className="w-full flex items-center justify-between py-2 text-left">
                          <span className="text-sm font-medium" style={{ color: t.text }}>{w.title}</span>
                          <svg className="w-3.5 h-3.5 transition-transform" style={{ color: t.textMuted, transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                        </button>
                        {isOpen && <p className="text-xs leading-relaxed pb-2" style={{ color: t.textSecondary }}>{w.content}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: t.text }}>Financial Stability Assessment</h3>
              <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.financial_assessment }} />
            </div>
          </div>
        )}

        {/* BUYER GUIDE */}
        {activeTab === "buyer_guide" && (
          <div className="space-y-8">
            <div className="rounded-2xl p-6 lg:p-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: t.text }}>RERA Trustee Rating</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.rera_details }} />
              <ul className="space-y-2">
                {data.rera_indicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: t.textSecondary }}>
                    <span className="mt-0.5" style={{ color: "#10b981" }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-6 lg:p-8" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-lg font-semibold mb-6" style={{ color: t.text }}>Verification Framework for Buyers</h3>
              <div className="space-y-3">
                {verificationSteps.map((group, i) => {
                  const key = `verify_${i}`;
                  const isOpen = openAccordions[key];
                  return (
                    <div key={i} className="rounded-xl overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
                      <button onClick={() => toggleAccordion(key)} className="w-full flex items-center justify-between p-4 text-left">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(182,138,53,0.15)", color: "#B68A35" }}>{i + 1}</span>
                          <span className="text-sm font-medium" style={{ color: t.text }}>{group.phase}</span>
                        </div>
                        <svg className="w-4 h-4 transition-transform" style={{ color: t.textMuted, transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <ul className="space-y-2">
                            {group.steps.map((step, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm" style={{ color: t.textSecondary }}>
                                <span style={{ color: "#B68A35" }}>→</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: "rgba(182,138,53,0.06)", border: "1px solid rgba(182,138,53,0.15)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#B68A35" }}>Transparency Statement</p>
              <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: data.transparency_statement }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeveloperSection;
