"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const SectionHeader = ({ label, title, subtitle, t }) => (
  <div className="mb-10">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#B68A35" }}>{label}</p>
    <h2 className="text-2xl lg:text-4xl font-bold mb-3" style={{ color: t.text }}>{title}</h2>
    <p className="text-sm lg:text-base leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>{subtitle}</p>
  </div>
);

const JointVentureCard = ({ item, t }) => (
  <div className="rounded-2xl p-5 lg:p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(182,138,53,0.12)" }}>
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#B68A35" strokeWidth="1.5">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <p className="text-sm font-semibold" style={{ color: t.text }}>{item.title}</p>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(182,138,53,0.12)", color: "#B68A35" }}>{item.year}</span>
        </div>
        <p className="text-xs" style={{ color: t.textMuted }}>{item.tag}</p>
      </div>
    </div>
    <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>{item.description}</p>
    <div className="flex items-center justify-between">
      <p className="text-[10px] italic" style={{ color: t.textMuted }}>{item.source} ({item.source_date})</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium flex items-center gap-1" style={{ color: "#B68A35" }}>
        View Source
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>
  </div>
);

const ContractCard = ({ item, t }) => (
  <div className="rounded-2xl p-5 lg:p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.12)" }}>
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#10b981" strokeWidth="1.5">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <p className="text-sm font-semibold" style={{ color: t.text }}>{item.title}</p>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>{item.year}</span>
        </div>
        <p className="text-xs" style={{ color: t.textMuted }}>Client: {item.client}</p>
      </div>
    </div>
    <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>{item.description}</p>
    <div className="flex flex-wrap gap-3 mb-3">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>Value:</span>
        <span className="text-xs font-medium" style={{ color: t.textSecondary }}>{item.value}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>Status:</span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>{item.status}</span>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-[10px] italic" style={{ color: t.textMuted }}>{item.source}</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium flex items-center gap-1" style={{ color: "#B68A35" }}>
        View Source
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>
  </div>
);

const FrameworkCard = ({ item, t }) => (
  <div className="rounded-2xl p-5 lg:p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.12)" }}>
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#6366f1" strokeWidth="1.5">
          <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: t.text }}>{item.title}</p>
        <p className="text-xs mt-0.5" style={{ color: "#6366f1" }}>{item.role}</p>
      </div>
    </div>
    <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>{item.description}</p>
    <div className="flex items-center justify-between">
      <p className="text-[10px] italic" style={{ color: t.textMuted }}>{item.source} ({item.source_date})</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium flex items-center gap-1" style={{ color: "#B68A35" }}>
        View Source
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>
  </div>
);

const AwardCard = ({ item, t }) => (
  <div className="rounded-2xl p-4 lg:p-5 flex items-start gap-3" style={{ background: item.pending_verification ? (t.isDark ? "rgba(245,158,11,0.04)" : "rgba(245,158,11,0.03)") : t.cardBg, border: `1px solid ${item.pending_verification ? "rgba(245,158,11,0.2)" : t.cardBorder}` }}>
    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.pending_verification ? "rgba(245,158,11,0.12)" : "rgba(182,138,53,0.12)" }}>
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={item.pending_verification ? "#f59e0b" : "#B68A35"} strokeWidth="1.5">
        <path d="M5 3l3.057-3L12 3l3.943-3L19 3l2 4-3 6h-2l-1 7H9l-1-7H6L3 7l2-4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold" style={{ color: t.text }}>{item.title}</p>
        {item.pending_verification && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>⚠️ Pending Verification</span>
        )}
      </div>
      <p className="text-xs mt-1" style={{ color: t.textMuted }}>Issuing Body: {item.issuing_body}</p>
      <p className="text-[10px] italic mt-1" style={{ color: t.textMuted }}>{item.source}</p>
    </div>
  </div>
);

const GovernmentPartnershipsSection = ({ data }) => {
  const { t } = useTheme();
  const [showAllSources, setShowAllSources] = useState(false);

  const visibleSources = showAllSources ? data.verification_sources : data.verification_sources.slice(0, 3);

  return (
    <section style={{ background: t.bg }} className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="Government Relations" title={data.heading} subtitle={data.subheading} t={t} />

        {/* Joint Ventures */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Government Joint Ventures</h3>
          <p className="text-xs mb-5" style={{ color: t.textMuted }}>List of joint ventures with government entities.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.joint_ventures.map((item, i) => (
              <JointVentureCard key={i} item={item} t={t} />
            ))}
          </div>
        </div>

        {/* Government Contracts */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Government Contracts</h3>
          <p className="text-xs mb-5" style={{ color: t.textMuted }}>Publicly awarded contracts from government entities.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.government_contracts.map((item, i) => (
              <ContractCard key={i} item={item} t={t} />
            ))}
          </div>
        </div>

        {/* Strategic Frameworks */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Alignment with National Strategic Frameworks</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.strategic_frameworks.map((item, i) => (
              <FrameworkCard key={i} item={item} t={t} />
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Government Recognitions & Awards</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.awards.map((item, i) => (
              <AwardCard key={i} item={item} t={t} />
            ))}
          </div>
        </div>

        {/* Sources & Verification */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2" style={{ color: t.text }}>Sources & Verification</h3>
          <p className="text-xs mb-5" style={{ color: t.textMuted }}>The following sources support the information presented above. All claims are traceable to official government announcements or audited reports.</p>
          <div className="space-y-2">
            {visibleSources.map((src, i) => (
              <div key={i} className="rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(182,138,53,0.1)" }}>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#B68A35" strokeWidth="1.5">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "#B68A35" }}>{src.fact}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs" style={{ color: t.textSecondary }}>{src.source} — {src.reference}</p>
                </div>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium flex items-center gap-1 flex-shrink-0" style={{ color: "#B68A35" }}>
                  View Source
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            ))}
          </div>
          {data.verification_sources.length > 3 && (
            <button
              onClick={() => setShowAllSources(!showAllSources)}
              className="mt-3 text-xs font-medium flex items-center gap-1"
              style={{ color: "#B68A35" }}
            >
              {showAllSources ? "Show Less" : `Show All ${data.verification_sources.length} Sources`}
              <svg className="w-3 h-3 transition-transform" style={{ transform: showAllSources ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>
          )}
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: t.textMuted }}>{data.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default GovernmentPartnershipsSection;
