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
import { useTheme } from '@/app/(public)/ThemeProvider';
import ExpertSection from './ExpertSection';

const Section10 = () => {
  const { isDark, mounted } = useTheme();
  const [activeTab, setActiveTab] = useState('key-metrics');
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);
  const [isAnalystOpen, setIsAnalystOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

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
    <section className={`w-full font-sans antialiased transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-[#FCFBFA]'}`}>
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
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
          <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-1">
            Emaar Financial Health:
            <span className="lg:hidden">—</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
            The Balance Sheet Check
          </h3>
          <p className="max-w-xl text-sm lg:text-base text-gray-600 leading-relaxed font-medium">
            Analysis of Emaar Properties' financial strength, cash position, and ability to fund future projects based on audited reports and credit rating agency data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 -mt-16 lg:-mt-15 relative z-10 pb-20">

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-4">
          <div className={`flex items-center gap-1 p-1.5 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-[#F5F0E8]'}`}>
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all duration-300 ${isActive
                    ? `${isDark ? 'bg-slate-800 text-white shadow-lg' : 'bg-[#B68A35] text-white shadow-lg'}`
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
            <div className={`lg:col-span-2 rounded-2xl border shadow-sm overflow-hidden transition-colors duration-300 ${activeTab === 'key-metrics' ? 'block' : 'hidden lg:block'
              } ${isDark ? 'bg-black border-slate-700' : 'bg-white border-gray-100'}`}>
              <div className={`px-6 py-4 border-b ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-gray-100 bg-white'}`}>
                <div className="flex items-center gap-2">
                  <BarChart3 className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-[#B68A35]'}`} />
                  <h3 className={`text-lg font-serif font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Key Financial Metrics</h3>
                </div>
              </div>

              <div className="overflow-x-auto p-4">
                <table className="w-full border border-gray-200">
                  <thead>
                    <tr className={`border-b border-gray-200 ${isDark ? 'border-slate-800' : 'border-gray-100 bg-[#FDFCF8]'}`}>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Metric
                      </th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Value
                      </th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Period
                      </th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden md:table-cell ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Trend
                      </th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    {financialMetrics.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <tr
                          key={index}
                          className={`${isDark ? 'hover:bg-slate-900/30' : ''} transition-colors`}
                        >
                          <td className="px-2 py-3">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-[#B68A35]'}`} strokeWidth={1.5} />
                              <span className={`text-[12px] font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                {item.metric}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-3">
                            <span className={`text-[12px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {item.value}
                            </span>
                          </td>
                          <td className={`px-2 py-3 text-[12px] hidden sm:table-cell ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {item.period}
                          </td>
                          <td className="px-2 py-3 hidden md:table-cell">
                            {item.trend === 'up' ? (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-600/10">
                                <TrendingUp className="w-3.5 h-3.5 text-green-600 " strokeWidth={2} />
                                <span className="text-xs font-semibold text-green-600 ">
                                  {item.trendValue}
                                </span>
                              </div>
                            ) : (
                              <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                {item.trendValue}
                              </span>
                            )}
                          </td>
                          <td className={`px-2 py-2 text-sm hidden lg:table-cell ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            {item.source}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className={`px-6 py-3 border-t text-xs flex items-center gap-2 ${isDark ? 'border-slate-700 bg-slate-900/30 text-slate-400' : 'border-gray-100 bg-[#FAF9F6] text-slate-500'}`}>
                <Info className="w-4 h-4" />
                <span>All financial figures are for Emaar Properties PJSC unless stated otherwise. Last updated: 22 February 2026</span>
              </div>
            </div>
          )}

          {/* Right Sidebar */}
          <div className="space-y-6 lg:block">

            {/* Project Pipeline */}
            <div className={`rounded-2xl border shadow-sm p-6 transition-colors duration-300 ${activeTab === 'pipeline' ? 'block' : 'hidden lg:block'
              } ${isDark ? 'bg-black border-slate-700' : 'bg-white border-gray-100'}`}>
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? '' : ''}`}>
                  <Building2 className="w-5 h-5 text-[#B68A35]" />
                </div>
                <h3 className={`text-lg font-serif font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Project Pipeline</h3>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Left Card - Revenue Backlog */}
                <div className={`rounded-xl p-5 border border-gray-100 ${isDark ? 'bg-slate-900/50' : 'bg-[#FDFBF7]'}`}>
                  <p className={`text-[10px] uppercase tracking-wider font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Revenue Backlog
                  </p>
                  <p className="text-lg sm:text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35] mb-1">
                    AED 155B
                  </p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    As of 31 December 2025
                  </p>
                </div>

                {/* Right Card - Upcoming Projects */}
                <div className={`rounded-xl border border-gray-100 p-5 ${isDark ? 'bg-slate-900/50' : 'bg-[#FDFBF7]'}`}>
                  <p className={`text-[10px] uppercase tracking-wider font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Upcoming Projects
                  </p>
                  <p className={`text-lg lg:text-2xl font-[Merriweather] tabular-nums  font-bold ${isDark ? 'text-[#B68A35]' : 'text-[#B68A35]'} mb-1`}>
                    48
                  </p>
                  <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    New residential projects launched in 2025
                  </p>
                </div>
              </div>

              {/* Footer Source */}
              <div className="flex items-start gap-2">
                <FileText className={`w-4 h-4 mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`} />
                <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Source: Emaar Annual Report 2025 / S&P Global Ratings
                </p>
              </div>
            </div>

            {/* Escrow Compliance (accordion) */}
            <div className={`rounded-2xl border shadow-sm p-4 transition-colors duration-300 ${activeTab === 'pipeline' ? 'block' : 'hidden lg:block'} ${isDark ? 'bg-black border-slate-700' : 'bg-white border-gray-100'}`}>
              <button
                type="button"
                onClick={() => setIsEscrowOpen((v) => !v)}
                aria-expanded={isEscrowOpen}
                aria-controls="escrow-content"
                className="w-full flex items-center justify-between mb-0 focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <Shield className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <h3 className={`text-lg font-serif font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Escrow Compliance</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white">100%</span>
                  {isEscrowOpen ? (
                    <ChevronUp className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-500'}`} />
                  ) : (
                    <ChevronDown className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-500'}`} />
                  )}
                </div>
              </button>

              <div id="escrow-content" className={`block ${isEscrowOpen ? 'lg:block' : 'lg:hidden'}`}>
                <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  100% of active off-plan projects are registered with RERA and have fully funded escrow accounts.
                </p>

                <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Emaar Properties complies with all RERA escrow requirements under Law No. 8 of 2007. This law mandates separate escrow accounts for each project, requires all buyer payments to be deposited into these accounts, and restricts fund release to verified construction milestones. Project-specific escrow details are publicly accessible via the Dubai REST app and Oqood portal.
                </p>

                <div className="flex items-start gap-2">
                  <FileText className={`w-4 h-4 mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`} />
                  <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    Source: RERA compliance database / Emaar Investor Disclosures / Law No. 8 of 2007
                  </p>
                </div>
              </div>
            </div>

            {/* Analyst Commentary (accordion) */}
            <div className={`rounded-2xl border shadow-sm p-4 transition-colors duration-300 ${activeTab === 'analyst-commentary' ? 'block' : 'hidden lg:block'} ${isDark ? 'bg-black border-slate-700' : 'bg-white border-gray-100'}`}>
              <button
                type="button"
                onClick={() => setIsAnalystOpen((v) => !v)}
                aria-expanded={isAnalystOpen}
                aria-controls="analyst-content"
                className="w-full flex items-center justify-between mb-0 focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <BsChatDots className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <h3 className={`text-lg font-serif font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Analyst Commentary</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#B68A35] text-white">BUY</span>
                  {isAnalystOpen ? (
                    <ChevronUp className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-500'}`} />
                  ) : (
                    <ChevronDown className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-500'}`} />
                  )}
                </div>
              </button>

              <div id="analyst-content" className={`block ${isAnalystOpen ? 'lg:block' : 'lg:hidden'}`}>
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  The consensus among 13 analysts covering Emaar Properties is a <strong>"BUY"</strong> rating, with an average 12-month target price of AED 19.33,
                  representing approximately 18% upside from current levels. The highest price target is AED 25.00, while the lowest is AED 15.80.
                  Analysts highlight Emaar's record 2025 performance, strong balance sheet, and credit rating upgrades as key positives.
                </p>

                {/* Price targets */}
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Low</p>
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>AED 15.80</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Average Target</p>
                      <p className="text-2xl font-[Merriweather] tabular-nums font-bold text-[#B68A35] ">AED 19.33</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>High</p>
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>AED 25.00</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative w-full h-6 flex items-center">
                    <div
                      className="absolute inset-x-0 h-[4px]"
                      style={{
                        background: isDark
                          ? 'linear-gradient(to right, transparent 0%, rgba(148, 163, 184, 0.6) 20%, rgba(148, 163, 184, 0.95) 50%, rgba(148, 163, 184, 0.6) 80%, transparent 100%)'
                          : 'linear-gradient(to right, transparent 0%, rgba(212, 180, 131, 0.6) 20%, rgba(212, 180, 131, 0.95) 50%, rgba(212, 180, 131, 0.6) 80%, transparent 100%)'
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white border-[#B68A35] bg-transparent"
                    />
                  </div>

                  <p className="text-xs text-center mt-3 font-medium text-[#B68A35]">
                    ~18% upside potential from current levels
                  </p>
                </div>

                <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Source: MarketScreener Analyst Consensus, February 2026
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Sources & Verification (accordion) */}
        <div className={`rounded-xl mt-2 border overflow-hidden transition-colors duration-300 ${isDark ? 'border-slate-700' : 'border-[#EDE8DF]'}`}>
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-[#FAF6EE]'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-[#FAF6EE]'}`}>
                <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
              </div>
              <span className={`text-[13px] font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Sources & Verification</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-[#FAF6EE] text-slate-500'}`}>
                {sourcesList.length} Financial & Regulatory Sources
              </span>
            </div>
            {sourcesOpen ? <BsChevronUp className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} /> : <BsChevronDown className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />}
          </button>

          {sourcesOpen && (
            <div className={`border-t ${isDark ? 'border-slate-700' : 'border-[#EDE8DF]'}`}>
              {sourcesList.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-4 py-3 border-b text-[11px] last:border-b-0 ${isDark ? 'border-slate-800' : 'border-[#F2EEE8]'}`}
                >
                  <div className="sm:w-[22%] shrink-0">
                    <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Fact: </span>
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{s.fact}</span>
                  </div>
                  <div className="sm:flex-1">
                    <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Source: </span>
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{s.source}</span>
                    <span className={`block mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{s.reference}</span>
                  </div>
                  <div className="sm:w-[28%] shrink-0 flex items-start justify-between">
                    {s.urls && s.urls.length > 0 ? (
                      <a
                        href={s.urls[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 group hover:underline truncate max-w-[90%] ${isDark ? 'text-[#B68A35]/80' : 'text-[#B68A35]'}`}
                      >
                        <BsLink45Deg className="shrink-0 w-3.5 h-3.5" />
                        <span className="truncate">{s.urls[0].replace('https://', '')}</span>
                      </a>
                    ) : (
                      <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>-</span>
                    )}
                    <HiOutlineExternalLink className={`shrink-0 w-3.5 h-3.5 ml-1 mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
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