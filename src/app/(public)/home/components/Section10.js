"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  CheckCircle2,
  DollarSign,
  BarChart3,
  ArrowUpRight,
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
  ChevronUp
} from 'lucide-react';
import { BsChatDots, BsBoxSeam, BsChevronUp, BsChevronDown, BsLink45Deg } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import ExpertSection from './ExpertSection';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

const Section10 = ({ data }) => {
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState('key-metrics');
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);
  const [isAnalystOpen, setIsAnalystOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  // Card colors matching TopDevelopersSection pattern
  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const sectionBg = isDark ? t.bg : "#FCFBFA";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

  if (!data) {
    return (
      <section className={`w-full font-sans antialiased transition-colors duration-300`} style={{ background: sectionBg }}>
        <div className="max-w-[1400px] mx-auto px-4 py-20">
          <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
        </div>
      </section>
    );
  }

  const financialMetrics = data.financialMetrics || [];
  const sourcesList = data.sourcesList || [];
  const tabs = data.tabs || [
    { id: 'key-metrics', label: 'Key Metrics', icon: BarChart3 },
    { id: 'pipeline', label: 'Pipeline', icon: ChartBar },
    { id: 'analyst-commentary', label: 'Analyst Commentary', icon: BsChatDots }
  ];

  return (
    <section className={`w-full font-sans antialiased transition-colors duration-300`} style={{ background: sectionBg }}>
      {/* Header Section */}
      <div className="relative w-full h-[320px] lg:h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage || "/Home/Section3bg.webp"}
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
          <p className="max-w-xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
            {data.header?.description || "Analysis of Emaar Properties' financial strength, cash position, and ability to fund future projects based on audited reports and credit rating agency data."}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 -mt-16 lg:-mt-15 relative z-10 pb-20">

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-4">
          <div className={`flex items-center gap-1 p-1.5 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-[#F5F0E8]'}`}>
            {tabs.map((tab) => {
              const TabIcon = getTabIcon(tab.iconName);
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all duration-300 ${isActive
                      ? `${isDark ? 'bg-[#B68A35] text-white shadow-lg' : 'bg-[#B68A35] text-white shadow-lg'}`
                      : `${isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`
                    }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Key Financial Metrics Table */}
          {(activeTab === 'key-metrics' || activeTab !== 'pipeline' && activeTab !== 'analyst-commentary') && (
            <div className={`lg:col-span-2 rounded-2xl shadow-sm overflow-hidden transition-colors duration-300 ${activeTab === 'key-metrics' ? 'block' : 'hidden lg:block'}`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <div className={`px-6 py-4`} style={{ borderBottom: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.03)' : cardBg }}>
                <div className="flex items-center gap-2">
                  <BarChart3 className={`w-5 h-5 text-[#B68A35]`} />
                  <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Key Financial Metrics</h3>
                </div>
              </div>

              <div className="overflow-x-auto p-4">
                <table className="w-full" style={{ border: `1px solid ${cardBorder}` }}>
                  <thead>
                    <tr className={`border-b`} style={{ borderBottomColor: cardBorder, background: isDark ? 'rgba(255,255,255,0.03)' : '#FDFCF8' }}>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider`} style={{ color: subtextColor }}>Metric</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider`} style={{ color: subtextColor }}>Value</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell`} style={{ color: subtextColor }}>Period</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden md:table-cell`} style={{ color: subtextColor }}>Trend</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell`} style={{ color: subtextColor }}>Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: cardBorder }}>
                    {financialMetrics.map((item, index) => {
                      const Icon = getMetricIcon(item.iconName);
                      return (
                        <tr key={index} className="transition-colors" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                          <td className="px-2 py-3">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-5 h-5 text-[#B68A35]`} strokeWidth={1.5} />
                              <span className={`text-[12px] font-medium`} style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                {item.metric}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-3">
                            <span className={`text-[12px] font-bold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                              {item.value}
                            </span>
                          </td>
                          <td className={`px-2 py-3 text-[12px] hidden sm:table-cell`} style={{ color: subtextColor }}>{item.period}</td>
                          <td className="px-2 py-3 hidden md:table-cell">
                            {item.trend === 'up' ? (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-600/10">
                                <TrendingUp className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                                <span className="text-xs font-semibold text-green-600">{item.trendValue}</span>
                              </div>
                            ) : (
                              <span className={`text-sm`} style={{ color: subtextColor }}>{item.trendValue}</span>
                            )}
                          </td>
                          <td className={`px-2 py-2 text-sm hidden lg:table-cell`} style={{ color: subtextColor }}>{item.source}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className={`px-6 py-3 border-t text-xs flex items-center gap-2`} style={{ borderTopColor: cardBorder, background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6', color: subtextColor }}>
                <Info className="w-4 h-4" />
                <span>{data.footerNote || "All financial figures are for Emaar Properties PJSC unless stated otherwise. Last updated: 22 February 2026"}</span>
              </div>
            </div>
          )}

          {/* Right Sidebar */}
          <div className="space-y-6 lg:block">

            {/* Project Pipeline */}
            <div className={`rounded-2xl shadow-sm p-6 transition-colors duration-300 ${activeTab === 'pipeline' ? 'block' : 'hidden lg:block'}`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center`}>
                  <Building2 className="w-5 h-5 text-[#B68A35]" />
                </div>
                <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.pipeline?.title || "Project Pipeline"}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {data.pipeline?.stats?.map((stat, idx) => (
                  <div key={idx} className={`rounded-xl p-5`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FDFBF7' }}>
                    <p className={`text-[10px] uppercase tracking-wider font-semibold mb-2`} style={{ color: subtextColor }}>{stat.label}</p>
                    <p className="text-lg sm:text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35] mb-1">{stat.value}</p>
                    <p className={`text-xs`} style={{ color: subtextColor }}>{stat.subtext}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2">
                <FileText className={`w-4 h-4 mt-0.5`} style={{ color: subtextColor }} />
                <p className={`text-[10px]`} style={{ color: subtextColor }}>{data.pipeline?.source || "Source: Emaar Annual Report 2025 / S&P Global Ratings"}</p>
              </div>
            </div>

            {/* Escrow Compliance (accordion) */}
            <div className={`rounded-2xl shadow-sm p-4 transition-colors duration-300 ${activeTab === 'pipeline' ? 'block' : 'hidden lg:block'}`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <button
                type="button"
                onClick={() => setIsEscrowOpen((v) => !v)}
                aria-expanded={isEscrowOpen}
                aria-controls="escrow-content"
                className="w-full flex items-center justify-between mb-0 focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={isDark ? { background: 'rgba(182,138,53,0.12)' } : { background: cardBg }}>
                    <Shield className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.escrow?.title || "Escrow Compliance"}</h3>
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
                <p className={`text-sm leading-relaxed mb-3`} style={{ color: bodyColor }}>
                  {data.escrow?.summary}
                </p>

                <p className={`text-xs leading-relaxed mb-4`} style={{ color: subtextColor }}>
                  {data.escrow?.description}
                </p>

                <div className="flex items-start gap-2">
                  <FileText className={`w-4 h-4 mt-0.5`} style={{ color: subtextColor }} />
                  <p className={`text-[10px]`} style={{ color: subtextColor }}>{data.escrow?.source}</p>
                </div>
              </div>
            </div>

            {/* Analyst Commentary (accordion) */}
            <div className={`rounded-2xl shadow-sm p-4 transition-colors duration-300 ${activeTab === 'analyst-commentary' ? 'block' : 'hidden lg:block'}`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <button
                type="button"
                onClick={() => setIsAnalystOpen((v) => !v)}
                aria-expanded={isAnalystOpen}
                aria-controls="analyst-content"
                className="w-full flex items-center justify-between mb-0 focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={isDark ? { background: 'rgba(182,138,53,0.12)' } : { background: cardBg }}>
                    <BsChatDots className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.analystCommentary?.title || "Analyst Commentary"}</h3>
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
                <p className={`text-sm leading-relaxed mb-6`} style={{ color: bodyColor }}>
                  {data.analystCommentary?.content}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className={`text-xs mb-1`} style={{ color: subtextColor }}>Low</p>
                      <p className={`text-sm font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.analystCommentary?.lowTarget || "AED 15.80"}</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-xs mb-1`} style={{ color: subtextColor }}>Average Target</p>
                      <p className="text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35]">{data.analystCommentary?.avgTarget || "AED 19.33"}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs mb-1`} style={{ color: subtextColor }}>High</p>
                      <p className={`text-sm font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.analystCommentary?.highTarget || "AED 25.00"}</p>
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

                <p className={`text-xs mt-2`} style={{ color: subtextColor }}>{data.analystCommentary?.source}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Sources & Verification (accordion) */}
        <div className={`rounded-xl mt-2 overflow-hidden transition-colors duration-300`} style={{ border: `1px solid ${cardBorder}` }}>
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-[#FAF6EE]'}`}
            style={{ background: cardBg }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
              </div>
              <span className={`text-[13px] font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.sources?.title || "Sources & Verification"}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full`} style={!isDark ? { background: '#FAF6EE', color: '#6B7280' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                {sourcesList.length} Financial & Regulatory Sources
              </span>
            </div>
            {sourcesOpen ? <BsChevronUp className="w-4 h-4" style={{ color: subtextColor }} /> : <BsChevronDown className="w-4 h-4" style={{ color: subtextColor }} />}
          </button>

          {sourcesOpen && (
            <div style={{ borderTop: `1px solid ${cardBorder}`, background: cardBg }}>
              {sourcesList.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-4 py-3 border-b text-[11px] last:border-b-0`}
                  style={{ borderBottom: `1px solid ${cardBorder}` }}
                >
                  <div className="sm:w-[22%] shrink-0">
                    <span className={`font-bold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Fact: </span>
                    <span style={{ color: bodyColor }}>{s.fact}</span>
                  </div>
                  <div className="sm:flex-1">
                    <span className={`font-bold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Source: </span>
                    <span style={{ color: bodyColor }}>{s.source}</span>
                    <span className={`block mt-0.5`} style={{ color: subtextColor }}>{s.reference}</span>
                  </div>
                  <div className="sm:w-[28%] shrink-0 flex items-start justify-between">
                    {s.urls && s.urls.length > 0 ? (
                      <a
                        href={s.urls[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 group hover:underline truncate max-w-[90%] text-[#B68A35]`}
                      >
                        <BsLink45Deg className="shrink-0 w-3.5 h-3.5" />
                        <span className="truncate">{s.urls[0].replace('https://', '')}</span>
                      </a>
                    ) : (
                      <span style={{ color: subtextColor }}>-</span>
                    )}
                    <HiOutlineExternalLink className={`shrink-0 w-3.5 h-3.5 ml-1 mt-0.5`} style={{ color: subtextColor }} />
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

// Helper functions for icons
const getTabIcon = (iconName) => {
  const icons = {
    'BarChart3': BarChart3,
    'ChartBar': ChartBar,
    'BsChatDots': BsChatDots
  };
  return icons[iconName] || BarChart3;
};

const getMetricIcon = (iconName) => {
  const icons = {
    'Building2': Building2,
    'Wallet': Wallet,
    'PieChart': PieChart,
    'Landmark': Landmark,
    'CreditCard': CreditCard,
    'Scale': Scale,
    'Umbrella': Umbrella,
    'Droplet': Droplet,
    'Layers': Layers
  };
  return icons[iconName] || Building2;
};

export default Section10;