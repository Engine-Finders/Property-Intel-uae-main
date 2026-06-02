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

const Section10 = () => {
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

  const financialMetrics = [
    {
      metric: "Revenue (Annual)",
      value: "AED 49.6 billion",
      period: "FY 2025",
      trend: "up",
      trendValue: "+40%",
      source: "Emaar Annual Report 2025",
      icon: Building2
    },
    {
      metric: "Net Profit (Annual)",
      value: "AED 25.7 billion (pre-tax)",
      period: "FY 2025",
      trend: "up",
      trendValue: "+36%",
      source: "Emaar Annual Report 2025",
      icon: Wallet
    },
    {
      metric: "Profit Margin",
      value: "52% (EBITDA margin)",
      period: "FY 2025",
      trend: null,
      trendValue: "—",
      source: "Calculated from Annual Report",
      icon: PieChart
    },
    {
      metric: "Cash Reserves",
      value: "AED 28.25 billion",
      period: "As of 31 Dec 2025",
      trend: null,
      trendValue: "—",
      source: "Emaar Annual Report 2025 / S&P Global Ratings",
      icon: Landmark
    },
    {
      metric: "Total Debt",
      value: "AED 10.61 billion",
      period: "As of 31 Dec 2025",
      trend: null,
      trendValue: "—",
      source: "Emaar Annual Report 2025",
      icon: CreditCard
    },
    {
      metric: "Debt-to-Equity",
      value: "0.13 (13%)",
      period: "As of 31 Dec 2025",
      trend: null,
      trendValue: "—",
      source: "Calculated from Annual Report",
      icon: Scale
    },
    {
      metric: "Interest Coverage",
      value: "24x",
      period: "FY 2025",
      trend: null,
      trendValue: "—",
      source: "Calculated from Annual Report",
      icon: Umbrella
    },
    {
      metric: "Current Ratio",
      value: "7.45",
      period: "As of 31 Dec 2025",
      trend: null,
      trendValue: "—",
      source: "Calculated from Annual Report",
      icon: Droplet
    },
    {
      metric: "Quick Ratio",
      value: "7.45",
      period: "As of 31 Dec 2025",
      trend: null,
      trendValue: "—",
      source: "Calculated from Annual Report",
      icon: Layers
    }
  ];

  const sourcesList = [
    {
      fact: "Revenue and net profit figures",
      source: "Emaar Annual Report 2025 via Gulf News / Decypha",
      reference: "2025, Consolidated Financial Statements, published 12 February 2026",
      urls: [
        "https://gulfnews.com/business/property/emaar-reports-record-2025-with-highest-sales-revenue-and-profit-1.500441130",
        "https://decypha.com/en/news/details/Emaar-achieves-highest-ever-property-sales-in-2025--unveils-AED-8-8bn-dividend-payout/21533969"
      ]
    },
    {
      fact: "Cash reserves and debt position",
      source: "Emaar Annual Report 2025 / S&P Global Ratings via Stock Analysis",
      reference: "2025 Report, Liquidity Analysis Section, Balance Sheet as of 31 December 2025",
      urls: ["https://stockanalysis.com/quote/dfm/EMAAR/financials/balance-sheet/"]
    },
    {
      fact: "Credit ratings (S&P, Moody's)",
      source: "S&P Global Ratings / Moody's Investors Service via Emaar Official Press Release",
      reference: "Public rating reports, June 2025",
      urls: ["https://properties.emaar.com/en/press-release-listing/sp-and-moodys-upgrade-emaars-credit-ratings/"]
    },
    {
      fact: "Escrow compliance status",
      source: "RERA Project Registry / Law No. 8 of 2007",
      reference: "Dubai REST App and Oqood portal, accessed 22 February 2026",
      urls: [
        "https://dlp.dubailand.gov.ae",
        "https://dlp.dubai.gov.ae/Legislation%20Reference/2007/Law%20No.%20(8)%20of%202007%20Concerning%20Escrow%20Accounts%20for%20Real%20Estate%20Development%20in%20the%20Emirate%20of%20Dubai.html"
      ]
    },
    {
      fact: "Land bank details",
      source: "Emaar Investor Presentation Q4 2025 via Official Press Releases",
      reference: "Q4 2025, Strategic Update (November–December 2025)",
      urls: ["https://properties.emaar.com/en/tag/press-release/"]
    },
    {
      fact: "Revenue backlog and pipeline",
      source: "Emaar Investor Presentation / ZAWYA",
      reference: "Q4 2025, Strategic Update; Emaar records highest sales, revenue, profit in 2025 (Feb 2026)",
      urls: ["https://www.zawya.com/en/capital-markets/equities/emaar-records-highest-sales-revenue-profit-in-2025-rp58gxia"]
    }
  ];

  const tabs = [
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
            src="/Home/Section3bg.webp"
            alt="Dubai Skyline"
            fill
            className="object-cover object-center grayscale-[10%]"
            priority
          />
          <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} style={isDark ? dark?.heroOverlayLeft : undefined} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
          <h2 className="text-3xl lg:text-5xl font-serif mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
            Emaar Financial Health:
            <span className="lg:hidden">—</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
            The Balance Sheet Check
          </h3>
          <p className="max-w-xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
            Analysis of Emaar Properties' financial strength, cash position, and ability to fund future projects based on audited reports and credit rating agency data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 -mt-16 lg:-mt-15 relative z-10 pb-20">

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-4">
          <div className={`flex items-center gap-1 p-1.5 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-[#F5F0E8]'}`}>
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    isActive
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
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider`} style={{ color: subtextColor }}>
                        Metric
                      </th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider`} style={{ color: subtextColor }}>
                        Value
                      </th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell`} style={{ color: subtextColor }}>
                        Period
                      </th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden md:table-cell`} style={{ color: subtextColor }}>
                        Trend
                      </th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell`} style={{ color: subtextColor }}>
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: cardBorder }}>
                    {financialMetrics.map((item, index) => {
                      const Icon = item.icon;
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
                          <td className={`px-2 py-3 text-[12px] hidden sm:table-cell`} style={{ color: subtextColor }}>
                            {item.period}
                          </td>
                          <td className="px-2 py-3 hidden md:table-cell">
                            {item.trend === 'up' ? (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-600/10">
                                <TrendingUp className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                                <span className="text-xs font-semibold text-green-600">
                                  {item.trendValue}
                                </span>
                              </div>
                            ) : (
                              <span className={`text-sm`} style={{ color: subtextColor }}>
                                {item.trendValue}
                              </span>
                            )}
                          </td>
                          <td className={`px-2 py-2 text-sm hidden lg:table-cell`} style={{ color: subtextColor }}>
                            {item.source}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className={`px-6 py-3 border-t text-xs flex items-center gap-2`} style={{ borderTopColor: cardBorder, background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6', color: subtextColor }}>
                <Info className="w-4 h-4" />
                <span>All financial figures are for Emaar Properties PJSC unless stated otherwise. Last updated: 22 February 2026</span>
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
                <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Project Pipeline</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className={`rounded-xl p-5`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FDFBF7' }}>
                  <p className={`text-[10px] uppercase tracking-wider font-semibold mb-2`} style={{ color: subtextColor }}>Revenue Backlog</p>
                  <p className="text-lg sm:text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35] mb-1">AED 155B</p>
                  <p className={`text-xs`} style={{ color: subtextColor }}>As of 31 December 2025</p>
                </div>

                <div className={`rounded-xl p-5`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FDFBF7' }}>
                  <p className={`text-[10px] uppercase tracking-wider font-semibold mb-2`} style={{ color: subtextColor }}>Upcoming Projects</p>
                  <p className={`text-lg lg:text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35] mb-1`}>48</p>
                  <p className={`text-[10px]`} style={{ color: subtextColor }}>New residential projects launched in 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FileText className={`w-4 h-4 mt-0.5`} style={{ color: subtextColor }} />
                <p className={`text-[10px]`} style={{ color: subtextColor }}>Source: Emaar Annual Report 2025 / S&P Global Ratings</p>
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
                  <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Escrow Compliance</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white">100%</span>
                  {isEscrowOpen ? (
                    <ChevronUp className="w-4 h-4" style={{ color: subtextColor }} />
                  ) : (
                    <ChevronDown className="w-4 h-4" style={{ color: subtextColor }} />
                  )}
                </div>
              </button>

              <div id="escrow-content" className={`block ${isEscrowOpen ? 'lg:block' : 'lg:hidden'}`}>
                <p className={`text-sm leading-relaxed mb-3`} style={{ color: bodyColor }}>
                  100% of active off-plan projects are registered with RERA and have fully funded escrow accounts.
                </p>

                <p className={`text-xs leading-relaxed mb-4`} style={{ color: subtextColor }}>
                  Emaar Properties complies with all RERA escrow requirements under Law No. 8 of 2007. This law mandates separate escrow accounts for each project, requires all buyer payments to be deposited into these accounts, and restricts fund release to verified construction milestones. Project-specific escrow details are publicly accessible via the Dubai REST app and Oqood portal.
                </p>

                <div className="flex items-start gap-2">
                  <FileText className={`w-4 h-4 mt-0.5`} style={{ color: subtextColor }} />
                  <p className={`text-[10px]`} style={{ color: subtextColor }}>Source: RERA compliance database / Emaar Investor Disclosures / Law No. 8 of 2007</p>
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
                  <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Analyst Commentary</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#B68A35] text-white">BUY</span>
                  {isAnalystOpen ? (
                    <ChevronUp className="w-4 h-4" style={{ color: subtextColor }} />
                  ) : (
                    <ChevronDown className="w-4 h-4" style={{ color: subtextColor }} />
                  )}
                </div>
              </button>

              <div id="analyst-content" className={`block ${isAnalystOpen ? 'lg:block' : 'lg:hidden'}`}>
                <p className={`text-sm leading-relaxed mb-6`} style={{ color: bodyColor }}>
                  The consensus among 13 analysts covering Emaar Properties is a <strong>"BUY"</strong> rating, with an average 12-month target price of AED 19.33,
                  representing approximately 18% upside from current levels. The highest price target is AED 25.00, while the lowest is AED 15.80.
                  Analysts highlight Emaar's record 2025 performance, strong balance sheet, and credit rating upgrades as key positives.
                </p>

                <div className="mb-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className={`text-xs mb-1`} style={{ color: subtextColor }}>Low</p>
                      <p className={`text-sm font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>AED 15.80</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-xs mb-1`} style={{ color: subtextColor }}>Average Target</p>
                      <p className="text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35]">AED 19.33</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs mb-1`} style={{ color: subtextColor }}>High</p>
                      <p className={`text-sm font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>AED 25.00</p>
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
                    ~18% upside potential from current levels
                  </p>
                </div>

                <p className={`text-xs mt-2`} style={{ color: subtextColor }}>Source: MarketScreener Analyst Consensus, February 2026</p>
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
              <span className={`text-[13px] font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Sources & Verification</span>
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

export default Section10;