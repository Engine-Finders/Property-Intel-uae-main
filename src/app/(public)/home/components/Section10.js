"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
  TrendingUp,
  Building2,
  Info,
  Wallet,
  PieChart,
  Landmark,
  CreditCard,
  Scale,
  Umbrella,
  Droplet,
  Layers,
  FileText,
  Shield,
  ChartBar,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';
import { BsChatDots, BsBoxSeam, BsChevronUp, BsChevronDown, BsLink45Deg } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import ExpertSection from './ExpertSection';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";

const MobileNoteBox = ({ icon, title, children, textClassName = "", textStyle }) => {
  if (title) {
    return (
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="shrink-0 text-[#B68A35]">{icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B68A35]">{title}</span>
        </div>
        <div className="flex gap-3 items-stretch">
          <span className="w-px shrink-0 self-stretch" style={{ background: GOLD }} aria-hidden />
          <div className={`min-w-0 text-[12px] leading-normal ${textClassName}`} style={textStyle}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 gap-3 items-stretch">
      <div className="flex shrink-0 flex-col items-center gap-2 self-stretch">
        <span className="text-[#B68A35]">{icon}</span>
        <span className="mx-auto w-px min-h-0 flex-1" style={{ background: GOLD }} aria-hidden />
      </div>
      <div className={`min-w-0 text-[12px] leading-normal ${textClassName}`} style={textStyle}>
        {children}
      </div>
    </div>
  );
};

function parsePipelineSubtext(subtext) {
  if (!subtext) return { detail: null, subtext: "" };
  const match = subtext.match(/^(.+?)\s+launched\s+(.+)$/i);
  if (match) {
    const detail = match[1].replace(/\b\w/g, (c) => c.toUpperCase());
    return { detail, subtext: `Launched ${match[2]}` };
  }
  return { detail: null, subtext };
}

const Section10 = ({ data }) => {
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState('key-metrics');
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);
  const [isAnalystOpen, setIsAnalystOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const sectionBg = isDark ? t.bg : "#FCFBFA";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const metricCardBg = isDark ? "rgba(255,255,255,0.03)" : "#FFFFFF";
  const pipelineCardBg = isDark ? "rgba(255,255,255,0.04)" : "#FDFBF7";

  if (!data) {
    return (
      <section className="w-full font-sans antialiased transition-colors duration-300" style={{ background: sectionBg }}>
        <div className="max-w-[1400px] mx-auto px-4 py-20">
          <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
        </div>
      </section>
    );
  }

  const financialMetrics = data.financialMetrics || [];
  const primaryMetrics = financialMetrics.slice(0, 6);
  const liquidityMetrics = financialMetrics.slice(6);
  const sourcesList = data.sourcesList || [];
  const tabs = data.tabs || [
    { id: 'key-metrics', label: 'Key Metrics', iconName: 'BarChart3' },
    { id: 'pipeline', label: 'Pipeline', iconName: 'ChartBar' },
    { id: 'analyst-commentary', label: 'Analyst Commentary', iconName: 'BsChatDots' },
  ];
  const headerDescription = data.header?.description || "Analysis of Emaar Properties' financial strength, cash position, and ability to fund future projects based on audited reports and credit rating agency data.";
  const footerNote = data.footerNote || "All financial figures are for Emaar Properties PJSC unless stated otherwise. Last updated: 22 February 2026";
  const auditedTitle = data.auditedStatus?.title || "Audited FY 2025 Financials";
  const auditedSubtitle = data.auditedStatus?.subtitle || "Baa1 / BBB+ credit-backed profile";

  return (
    <section className="w-full font-sans antialiased transition-colors duration-300" style={{ background: sectionBg }}>
      {/* Mobile header */}
      <div className="md:hidden">
        <div className="relative min-h-[285px] overflow-hidden">
          <Image
            src="/projects/cm-projects.webp"
            alt={data.heroAlt || "Dubai Skyline"}
            fill
            className="object-cover object-center grayscale-[10%]"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(90deg, rgba(37,40,45,0.86) 0%, rgba(37,40,45,0.78) 42%, rgba(37,40,45,0.56) 62%, rgba(37,40,45,0.22) 80%, transparent 100%)"
                : "linear-gradient(90deg, rgba(255,253,250,0.78) 0%, rgba(255,253,250,0.68) 42%, rgba(255,253,250,0.42) 62%, rgba(255,253,250,0.16) 80%, transparent 100%)",
            }}
          />
          <div className="relative z-10 max-w-full px-2 py-8 text-left">
            <h2
              className="text-[32px] font-semibold leading-none tracking-[-0.01em]"
              style={{ color: isDark ? t.text : "#1A1A1A" }}
            >
              {data.header?.title?.line1 || "Emaar Financial Health:"}
              <span className="block text-[#B68A35]">{data.header?.title?.line2 || "The Balance Sheet Check"}</span>
            </h2>
            <p
              className="mt-4 max-w-[380px] text-[14px] font-normal leading-[17px] tracking-[-0.01em]"
              style={{ color: isDark ? t.textSecondary : bodyColor }}
            >
              {headerDescription}
            </p>
            <span className="mt-5 block h-px w-20 bg-[#B68A35]" />
          </div>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex relative w-full h-[320px] lg:h-[400px] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/cm-projects.webp"
            alt={data.heroAlt || "Dubai Skyline"}
            fill
            className="object-cover object-center grayscale-[10%]"
            priority
          />
          <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} style={isDark ? dark?.heroOverlayLeft : undefined} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
          <h2 className="text-3xl lg:text-5xl font-serif mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
            {data.header?.title?.line1 || "Emaar Financial Health:"}
            <span className="lg:hidden">—</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
            {data.header?.title?.line2 || "The Balance Sheet Check"}
          </h3>
          <p className="max-w-xl text-sm lg:text-base leading-[17px] font-medium" style={{ color: bodyColor }}>
            {headerDescription}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 md:-mt-12 relative z-10 pb-20">

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-4">
          <div className={`flex items-center gap-1 p-1 rounded ${isDark ? 'bg-slate-800/50' : 'bg-[#F5F0E8]'}`}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center py-2.5 px-1 rounded text-[10px] font-semibold leading-tight text-center transition-all duration-300 min-w-0 ${isActive
                    ? 'bg-[#B68A35] text-white shadow-md'
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                >
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Key Financial Metrics */}
          {(activeTab === 'key-metrics' || activeTab !== 'pipeline' && activeTab !== 'analyst-commentary') && (
            <div className={`lg:col-span-2 rounded lg:rounded-2xl shadow-sm overflow-hidden transition-colors duration-300 ${activeTab === 'key-metrics' ? 'block' : 'hidden lg:block'}`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <div className="hidden lg:block px-6 py-4" style={{ borderBottom: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.03)' : cardBg }}>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#B68A35]" />
                  <h3 className="text-lg font-serif font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Key Financial Metrics</h3>
                </div>
              </div>

              {/* Mobile: card grid per ref */}
              <div className="lg:hidden p-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {primaryMetrics.map((item, index) => {
                    const Icon = getMetricIcon(item.iconName);
                    return (
                      <div
                        key={index}
                        className="rounded p-3 flex flex-col min-h-[140px]"
                        style={{ border: `1px solid ${cardBorder}`, background: metricCardBg }}
                      >
                        <div className="flex items-start justify-between gap-1 mb-2">
                          <Icon className="w-4 h-4 text-[#B68A35] shrink-0" strokeWidth={1.5} />
                          <span className="text-[9px] leading-tight text-right" style={{ color: subtextColor }}>{item.period}</span>
                        </div>
                        <p className="text-[11px] font-medium leading-tight mb-1" style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                          {item.metric}
                        </p>
                        <p className="text-[13px] font-bold font-serif leading-tight mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                          {item.value}
                        </p>
                        {item.trend === 'up' && (
                          <span className="inline-flex w-fit items-center gap-0.5 rounded-full bg-emerald-600/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 mb-1">
                            <TrendingUp className="w-2.5 h-2.5" strokeWidth={2.5} />
                            {item.trendValue}
                          </span>
                        )}
                        <div className="mt-auto pt-2" style={{ borderTop: `1px solid ${cardBorder}` }}>
                          <p className="text-[9px] leading-normal" style={{ color: subtextColor }}>{item.source}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Liquidity & Coverage */}
                {liquidityMetrics.length > 0 && (
                  <div className="rounded overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: metricCardBg }}>
                    <div className="flex items-center gap-2 px-3 py-3" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                      <Shield className="w-4 h-4 text-[#B68A35]" />
                      <h4 className="text-[13px] font-serif font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        Liquidity & Coverage
                      </h4>
                    </div>
                    <div className="grid grid-cols-3 divide-x" style={{ borderColor: cardBorder }}>
                      {liquidityMetrics.map((item, index) => {
                        const Icon = getMetricIcon(item.iconName);
                        return (
                          <div key={index} className="px-2 py-3 flex flex-col min-w-0">
                            <Icon className="w-3.5 h-3.5 text-[#B68A35] mb-1.5" strokeWidth={1.5} />
                            <p className="text-[9px] leading-tight mb-1" style={{ color: subtextColor }}>{item.metric}</p>
                            <p className="text-[13px] font-bold font-serif leading-none mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                              {item.value}
                            </p>
                            <p className="text-[8px] leading-tight mb-2" style={{ color: subtextColor }}>{item.period}</p>
                            <p className="text-[8px] leading-normal mt-auto" style={{ color: subtextColor }}>{item.source}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Audited status banner */}
                <div
                  className="rounded flex items-center justify-between gap-3 px-3 py-3"
                  style={{
                    border: `1px solid ${isDark ? 'rgba(34,197,94,0.25)' : 'rgba(34,197,94,0.2)'}`,
                    background: isDark ? 'rgba(34,197,94,0.08)' : 'rgba(236,253,245,0.9)',
                  }}
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold leading-tight" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        {auditedTitle}
                      </p>
                      <p className="text-[10px] leading-normal mt-0.5" style={{ color: subtextColor }}>{auditedSubtitle}</p>
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-1 text-[9px] font-bold text-white">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <div className="rounded px-3 py-3" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6' }}>
                  <MobileNoteBox icon={<Info className="w-5 h-5" />} textStyle={{ color: bodyColor }}>
                    {footerNote}
                  </MobileNoteBox>
                </div>
              </div>

              {/* Desktop: table */}
              <div className="hidden lg:block overflow-x-auto p-4">
                <table className="w-full" style={{ border: `1px solid ${cardBorder}` }}>
                  <thead>
                    <tr className="border-b" style={{ borderBottomColor: cardBorder, background: isDark ? 'rgba(255,255,255,0.03)' : '#FDFCF8' }}>
                      <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Metric</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Value</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell" style={{ color: subtextColor }}>Period</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden md:table-cell" style={{ color: subtextColor }}>Trend</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell" style={{ color: subtextColor }}>Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: cardBorder }}>
                    {financialMetrics.map((item, index) => {
                      const Icon = getMetricIcon(item.iconName);
                      return (
                        <tr key={index} className="transition-colors" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                          <td className="px-2 py-3">
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5 text-[#B68A35]" strokeWidth={1.5} />
                              <span className="text-[12px] font-medium" style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                {item.metric}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-3">
                            <span className="text-[12px] font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                              {item.value}
                            </span>
                          </td>
                          <td className="px-2 py-3 text-[12px] hidden sm:table-cell" style={{ color: subtextColor }}>{item.period}</td>
                          <td className="px-2 py-3 hidden md:table-cell">
                            {item.trend === 'up' ? (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-600/10">
                                <TrendingUp className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                                <span className="text-xs font-semibold text-green-600">{item.trendValue}</span>
                              </div>
                            ) : (
                              <span className="text-sm" style={{ color: subtextColor }}>{item.trendValue}</span>
                            )}
                          </td>
                          <td className="px-2 py-2 text-sm hidden lg:table-cell" style={{ color: subtextColor }}>{item.source}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="hidden lg:flex px-6 py-3 border-t text-xs items-center gap-2" style={{ borderTopColor: cardBorder, background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6', color: subtextColor }}>
                <Info className="w-4 h-4" />
                <span>{footerNote}</span>
              </div>
            </div>
          )}

          <div className="space-y-6 lg:block">

            {/* Project Pipeline */}
            <div className={activeTab === 'pipeline' ? 'block' : 'hidden lg:block'}>
              {/* Mobile pipeline layout — ref image 2 */}
              <div
                className="lg:hidden p-4 rounded shadow-sm"
                style={{ border: `1px solid ${cardBorder}`, background: pipelineCardBg }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={isDark ? { background: 'rgba(182,138,53,0.15)' } : { background: '#FAF3E6' }}
                  >
                    <ChartBar className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <h3 className="text-base font-serif font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                    {data.pipeline?.title || "Project Pipeline"}
                  </h3>
                </div>

                <div className="flex divide-x mb-4" style={{ borderColor: cardBorder }}>
                  {(data.pipeline?.stats || []).map((stat, idx) => {
                    const parsed = idx === 1 ? parsePipelineSubtext(stat.subtext) : { detail: null, subtext: stat.subtext };
                    return (
                      <div key={idx} className="flex-1 min-w-0 px-3 first:pl-0 last:pr-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: subtextColor }}>
                          {stat.label}
                        </p>
                        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                          <p className="text-xl font-[Merriweather] font-bold text-[#B68A35] leading-none tabular-nums">
                            {stat.value}
                          </p>
                          {parsed.detail && (
                            <p className="text-[11px] font-semibold font-serif leading-tight" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                              {parsed.detail}
                            </p>
                          )}
                        </div>
                        <p className="text-[10px] leading-normal mt-1.5" style={{ color: subtextColor }}>
                          {parsed.subtext}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 mt-0.5 text-[#B68A35] shrink-0" />
                  <p className="text-[10px] leading-normal" style={{ color: subtextColor }}>
                    {data.pipeline?.source || "Source: Emaar Annual Report 2025 / S&P Global Ratings"}
                  </p>
                </div>
              </div>

              {/* Desktop pipeline layout */}
              <div className="hidden lg:block rounded-2xl shadow-sm p-6 transition-colors duration-300" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                    {data.pipeline?.title || "Project Pipeline"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {data.pipeline?.stats?.map((stat, idx) => (
                    <div key={idx} className="rounded-xl p-5" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FDFBF7' }}>
                      <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: subtextColor }}>{stat.label}</p>
                      <p className="text-lg sm:text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35] mb-1">{stat.value}</p>
                      <p className="text-xs" style={{ color: subtextColor }}>{stat.subtext}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5" style={{ color: subtextColor }} />
                  <p className="text-[10px]" style={{ color: subtextColor }}>{data.pipeline?.source || "Source: Emaar Annual Report 2025 / S&P Global Ratings"}</p>
                </div>
              </div>
            </div>

            {/* Escrow Compliance */}
            <div className={`rounded lg:rounded-2xl shadow-sm p-4 transition-colors duration-300 ${activeTab === 'pipeline' ? 'block' : 'hidden lg:block'}`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <button
                type="button"
                onClick={() => setIsEscrowOpen((v) => !v)}
                aria-expanded={isEscrowOpen}
                aria-controls="escrow-content"
                className="w-full flex items-center justify-between mb-0 focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={isDark ? { background: 'rgba(182,138,53,0.12)' } : { background: cardBg }}>
                    <Shield className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.escrow?.title || "Escrow Compliance"}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white">{data.escrow?.percentage || "100%"}</span>
                  {isEscrowOpen ? (
                    <ChevronUp className="w-4 h-4" style={{ color: subtextColor }} />
                  ) : (
                    <ChevronDown className="w-4 h-4" style={{ color: subtextColor }} />
                  )}
                </div>
              </button>

              <div id="escrow-content" className={`block ${isEscrowOpen ? 'lg:block' : 'lg:hidden'}`}>
                <p className="text-[13px] leading-normal lg:text-sm lg:leading-relaxed mb-3 mt-3" style={{ color: bodyColor }}>
                  {data.escrow?.summary}
                </p>

                <p className="text-[13px] leading-normal lg:text-xs lg:leading-relaxed mb-4" style={{ color: subtextColor }}>
                  {data.escrow?.description}
                </p>

                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5" style={{ color: subtextColor }} />
                  <p className="text-[10px] leading-normal" style={{ color: subtextColor }}>{data.escrow?.source}</p>
                </div>
              </div>
            </div>

            {/* Analyst Commentary */}
            <div className={`rounded lg:rounded-2xl shadow-sm p-4 transition-colors duration-300 ${activeTab === 'analyst-commentary' ? 'block' : 'hidden lg:block'}`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <button
                type="button"
                onClick={() => setIsAnalystOpen((v) => !v)}
                aria-expanded={isAnalystOpen}
                aria-controls="analyst-content"
                className="w-full flex items-center justify-between mb-0 focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={isDark ? { background: 'rgba(182,138,53,0.12)' } : { background: cardBg }}>
                    <BsChatDots className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.analystCommentary?.title || "Analyst Commentary"}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#B68A35] text-white">{data.analystCommentary?.rating || "BUY"}</span>
                  {isAnalystOpen ? (
                    <ChevronUp className="w-4 h-4" style={{ color: subtextColor }} />
                  ) : (
                    <ChevronDown className="w-4 h-4" style={{ color: subtextColor }} />
                  )}
                </div>
              </button>

              <div id="analyst-content" className={`block ${isAnalystOpen ? 'lg:block' : 'lg:hidden'}`}>
                <p className="text-[13px] leading-normal lg:text-sm lg:leading-relaxed mb-6 mt-3" style={{ color: bodyColor }}>
                  {data.analystCommentary?.content}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-xs mb-1" style={{ color: subtextColor }}>Low</p>
                      <p className="text-sm font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.analystCommentary?.lowTarget || "AED 15.80"}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs mb-1" style={{ color: subtextColor }}>Average Target</p>
                      <p className="text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35]">{data.analystCommentary?.avgTarget || "AED 19.33"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs mb-1" style={{ color: subtextColor }}>High</p>
                      <p className="text-sm font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.analystCommentary?.highTarget || "AED 25.00"}</p>
                    </div>
                  </div>

                  <div className="relative w-full h-6 flex items-center">
                    <div
                      className="absolute inset-x-0 h-[4px] rounded-full"
                      style={{
                        background: isDark
                          ? 'linear-gradient(to right, transparent 0%, rgba(148, 163, 184, 0.6) 20%, rgba(182,138,53,0.8) 50%, rgba(148, 163, 184, 0.6) 80%, transparent 100%)'
                          : 'linear-gradient(to right, transparent 0%, rgba(212, 180, 131, 0.6) 20%, rgba(212, 180, 131, 0.95) 50%, rgba(212, 180, 131, 0.6) 80%, transparent 100%)'
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#B68A35]"
                      style={{ background: cardBg }}
                    />
                  </div>

                  <p className="text-xs text-center mt-3 font-medium text-[#B68A35]">
                    {data.analystCommentary?.upsideText || "~18% upside potential from current levels"}
                  </p>
                </div>

                <p className="text-[13px] leading-normal lg:text-xs mt-2" style={{ color: subtextColor }}>{data.analystCommentary?.source}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Sources & Verification */}
        <div className="rounded lg:rounded-xl mt-2 overflow-hidden transition-colors duration-300" style={{ border: `1px solid ${cardBorder}` }}>
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-[#FAF6EE]'}`}
            style={{ background: cardBg }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
              </div>
              <span className="text-[13px] font-semibold truncate" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.sources?.title || "Sources & Verification"}</span>
              <span className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full shrink-0" style={!isDark ? { background: '#FAF6EE', color: '#6B7280' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                {sourcesList.length} Financial & Regulatory Sources
              </span>
            </div>
            {sourcesOpen ? <BsChevronUp className="w-4 h-4 shrink-0" style={{ color: subtextColor }} /> : <BsChevronDown className="w-4 h-4 shrink-0" style={{ color: subtextColor }} />}
          </button>

          {sourcesOpen && (
            <div style={{ borderTop: `1px solid ${cardBorder}`, background: cardBg }}>
              {sourcesList.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-4 py-3 border-b text-[11px] last:border-b-0"
                  style={{ borderBottom: `1px solid ${cardBorder}` }}
                >
                  <div className="sm:w-[22%] shrink-0">
                    <span className="font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Fact: </span>
                    <span className="text-[13px] leading-normal lg:text-[11px]" style={{ color: bodyColor }}>{s.fact}</span>
                  </div>
                  <div className="sm:flex-1">
                    <span className="font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Source: </span>
                    <span className="text-[13px] leading-normal lg:text-[11px]" style={{ color: bodyColor }}>{s.source}</span>
                    <span className="block mt-0.5 text-[13px] leading-normal lg:text-[11px]" style={{ color: subtextColor }}>{s.reference}</span>
                  </div>
                  <div className="sm:w-[28%] shrink-0 flex items-start justify-between">
                    {s.urls && s.urls.length > 0 ? (
                      <a
                        href={s.urls[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 group hover:underline truncate max-w-[90%] text-[#B68A35]"
                      >
                        <BsLink45Deg className="shrink-0 w-3.5 h-3.5" />
                        <span className="truncate">{s.urls[0].replace('https://', '')}</span>
                      </a>
                    ) : (
                      <span style={{ color: subtextColor }}>-</span>
                    )}
                    <HiOutlineExternalLink className="shrink-0 w-3.5 h-3.5 ml-1 mt-0.5" style={{ color: subtextColor }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ExpertSection />

      </div>
    </section>
  );
};

const getMetricIcon = (iconName) => {
  const icons = {
    Building2,
    Wallet,
    PieChart,
    Landmark,
    CreditCard,
    Scale,
    Umbrella,
    Droplet,
    Layers,
  };
  return icons[iconName] || Building2;
};

export default Section10;
