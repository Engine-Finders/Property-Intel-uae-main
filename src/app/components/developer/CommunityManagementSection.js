"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const InfoRow = ({ label, value, t }) => (
  <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
    <span className="text-xs font-semibold uppercase tracking-wider min-w-[140px]" style={{ color: t.textMuted }}>{label}</span>
    <span className="text-sm" style={{ color: t.textSecondary }}>{value}</span>
  </div>
);

const ConditionBadge = ({ condition }) => {
  const colors = {
    Excellent: { bg: "rgba(16,185,129,0.12)", text: "#10b981" },
    Good: { bg: "rgba(182,138,53,0.12)", text: "#B68A35" },
    Fair: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
  };
  const c = colors[condition] || colors.Good;
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: c.bg, color: c.text }}>
      {condition}
    </span>
  );
};

const ServiceChargeTable = ({ table, t }) => (
  <div className="rounded-2xl p-5 lg:p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <h4 className="text-sm font-semibold mb-4" style={{ color: t.text }}>{table.title}</h4>
    {/* Desktop */}
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
            {["Year", "Charge/sqft (AED)", "Change", "Source"].map(h => (
              <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${t.isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"}` }}>
              <td className="py-2.5 px-3 font-medium" style={{ color: t.text }}>{row.year}</td>
              <td className="py-2.5 px-3" style={{ color: t.textSecondary }}>{row.charge}</td>
              <td className="py-2.5 px-3" style={{ color: t.textSecondary }}>{row.change}</td>
              <td className="py-2.5 px-3 text-xs" style={{ color: t.textMuted }}>{row.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Mobile */}
    <div className="sm:hidden space-y-2">
      {table.rows.map((row, i) => (
        <div key={i} className="rounded-xl p-3" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-sm font-semibold mb-1.5" style={{ color: t.text }}>{row.year}</p>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div><span style={{ color: t.textMuted }}>Charge:</span> <span style={{ color: t.textSecondary }}>{row.charge}</span></div>
            <div><span style={{ color: t.textMuted }}>Change:</span> <span style={{ color: t.textSecondary }}>{row.change}</span></div>
          </div>
          <p className="text-[10px] mt-1.5 italic" style={{ color: t.textMuted }}>{row.source}</p>
        </div>
      ))}
    </div>
    <p className="mt-3 text-xs italic" style={{ color: t.textMuted }}>Trend Summary: {table.trend_summary}</p>
  </div>
);

const CommunityManagementSection = ({ data }) => {
  const { t } = useTheme();
  const [expandedComplaint, setExpandedComplaint] = useState(null);

  const mgmt = data.management_structure;
  const asset = data.asset_condition;
  const satisfaction = data.owner_satisfaction;

  return (
    <section style={{ background: t.bgAlt }} className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#B68A35" }}>Post-Handover Analysis</p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ color: t.text }}>{data.heading}</h2>
          <p className="text-sm lg:text-base leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>{data.subheading}</p>
        </div>

        {/* Management Structure */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-5" style={{ color: t.text }}>Management Structure</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl p-5 lg:p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(182,138,53,0.12)" }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#B68A35" strokeWidth="1.5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m5-12h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.text }}>{mgmt.entity}</p>
                  <p className="text-xs" style={{ color: t.textMuted }}>{mgmt.type}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>{mgmt.note}</p>
              <p className="text-[10px] italic" style={{ color: t.textMuted }}>{mgmt.source}</p>
            </div>

            <div className="rounded-2xl p-5 lg:p-6" style={{ background: mgmt.mollak_integration ? "rgba(16,185,129,0.04)" : t.cardBg, border: `1px solid ${mgmt.mollak_integration ? "rgba(16,185,129,0.15)" : t.cardBorder}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.12)" }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#10b981" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#10b981" }}>Mollak Integration: {mgmt.mollak_integration ? "Yes" : "No"}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>{mgmt.mollak_note}</p>
              <p className="text-[10px] italic" style={{ color: t.textMuted }}>{mgmt.mollak_source}</p>
            </div>
          </div>
        </div>

        {/* Service Charge History */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Service Charge History</h3>
          <p className="text-sm mb-5" style={{ color: t.textSecondary }}>{data.service_charge_intro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.service_charges.map((table, i) => (
              <ServiceChargeTable key={i} table={table} t={t} />
            ))}
          </div>
        </div>

        {/* Asset Condition Rating */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Asset Condition Rating (Established Communities)</h3>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl font-bold" style={{ color: "#B68A35" }}>{asset.overall_rating}</span>
            <span className="text-sm" style={{ color: t.textMuted }}>{asset.rating_basis}</span>
          </div>
          <p className="text-sm mb-6" style={{ color: t.textSecondary }}>{asset.summary}</p>

          {/* Desktop table */}
          <div className="hidden lg:block rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                  {["Community", "Age (Years)", "Condition", "Notes"].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: t.textMuted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {asset.communities.map((c, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${t.isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"}` }}>
                    <td className="py-3 px-4 font-medium" style={{ color: t.text }}>{c.community}</td>
                    <td className="py-3 px-4" style={{ color: t.textSecondary }}>{c.age}</td>
                    <td className="py-3 px-4"><ConditionBadge condition={c.condition} /></td>
                    <td className="py-3 px-4 text-xs leading-relaxed" style={{ color: t.textSecondary }}>{c.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-3">
            {asset.communities.map((c, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color: t.text }}>{c.community}</p>
                  <ConditionBadge condition={c.condition} />
                </div>
                <p className="text-xs mb-2" style={{ color: t.textMuted }}>Age: {c.age} years</p>
                <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{c.notes}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[10px] italic" style={{ color: t.textMuted }}>Sources: {asset.sources}</p>
        </div>

        {/* Owner Satisfaction */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4" style={{ color: t.text }}>Owner Satisfaction with Community Management</h3>
          <div className="rounded-2xl p-5 lg:p-6 mb-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{satisfaction.summary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            {/* Praises */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.12)" }}>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#10b981" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" /><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
                Common Praises
              </h4>
              <ul className="space-y-2">
                {satisfaction.praises.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: t.textSecondary }}>
                    <span className="mt-0.5" style={{ color: "#10b981" }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complaints */}
            <div className="rounded-2xl p-5" style={{ background: t.isDark ? "rgba(239,68,68,0.04)" : "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.12)" }}>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#ef4444" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" /><path d="M17 2h3a2 2 0 012 2v7a2 2 0 01-2 2h-3" /></svg>
                Common Complaints
              </h4>
              <div className="space-y-1.5">
                {satisfaction.complaints.map((item, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setExpandedComplaint(expandedComplaint === i ? null : i)}
                      className="w-full flex items-center justify-between py-1.5 text-left"
                    >
                      <span className="text-sm flex items-center gap-2" style={{ color: t.text }}>
                        <span style={{ color: "#ef4444" }}>•</span>
                        {item.title}
                      </span>
                      <svg className="w-3.5 h-3.5 flex-shrink-0 transition-transform" style={{ color: t.textMuted, transform: expandedComplaint === i ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    {expandedComplaint === i && (
                      <p className="text-xs leading-relaxed pl-5 pb-2" style={{ color: t.textSecondary }}>{item.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[10px] italic" style={{ color: t.textMuted }}>Sources: {satisfaction.sources}</p>
        </div>

        {/* Analyst Insight */}
        <div className="mb-8 rounded-2xl p-6 lg:p-8" style={{ background: "linear-gradient(135deg, rgba(182,138,53,0.08), rgba(182,138,53,0.02))", border: "1px solid rgba(182,138,53,0.2)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(182,138,53,0.15)" }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#B68A35" strokeWidth="1.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#B68A35" }}>On-Ground Analyst Insight</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>{data.analyst_insight}</p>
          <p className="text-[10px] italic" style={{ color: t.textMuted }}>{data.analyst_source}</p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: t.textMuted }}>{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default CommunityManagementSection;
