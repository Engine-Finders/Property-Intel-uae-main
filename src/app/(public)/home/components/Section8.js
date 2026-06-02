"use client";

import React, { useState } from 'react';
import {
  BsBank2,
  BsGraphUpArrow,
  BsShieldCheck,
  BsBuilding,
  BsGlobe2,
  BsAward,
  BsBarChartLine,
  BsArrowUpRight,
  BsChevronDown,
  BsChevronUp,
  BsBoxSeam,
  BsPatchCheck,
  BsCalendar3,
  BsLink45Deg,
} from 'react-icons/bs';
import {
  HiOutlineExternalLink,
  HiOutlineTrendingUp,
  HiOutlineCash,
  HiOutlineOfficeBuilding,
} from 'react-icons/hi';
import {
  MdOutlineVerifiedUser,
  MdOutlineBalance,
  MdOutlineShowChart,
  MdOutlineWaterDrop,
  MdOutlineSpeed,
  MdOutlineLeaderboard,
} from 'react-icons/md';
import {
  TbBuildingBank,
  TbCoin,
  TbChartBar,
  TbShieldStar,
  TbRocket,
  TbMapPin,
  TbBuildingSkyscraper,
  TbHome,
  TbTrendingUp,
} from 'react-icons/tb';
import { TbStack2 } from "react-icons/tb";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { PiChartLineUpLight } from "react-icons/pi";
import { CiBank } from "react-icons/ci";
import { LiaCoinsSolid } from "react-icons/lia";
import { RiGovernmentLine, RiLineChartLine } from 'react-icons/ri';
import { HiOutlineChartPie } from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";
import { LuInfo } from 'react-icons/lu';
import { GoPeople } from "react-icons/go";
import Image from 'next/image';
import ExpertSection from './ExpertSection';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

// ─── Data ────────────────────────────────────────────────────────────────────

const financialPerformance = [
  { label: 'Annual Revenue', value: 'AED 49.6B', growth: '+40%', sub: 'FY 2025', icon: <PiChartLineUpLight /> },
  { label: 'Net Profit', value: 'AED 25.7B', growth: '+36%', sub: 'FY 2025', icon: <LiaMoneyBillWaveAltSolid /> },
  { label: 'EBITDA Margin', value: '52%', sub: 'Profit margin', icon: <HiOutlineChartPie /> },
  { label: 'Cash Reserves', value: 'AED 28.25B', sub: 'as of 31 December 2025', icon: <IoWalletOutline /> },
];

const debtMetrics = [
  { label: 'Total Debt', value: 'AED 10.61B', icon: <TbBuildingBank /> },
  { label: 'Debt-to-Equity Ratio', value: '9.86%', icon: <MdOutlineBalance /> },
  { label: 'Interest Coverage', value: '24x', icon: <MdOutlineSpeed /> },
  { label: 'Current Ratio', value: '7.45', icon: <RiLineChartLine /> },
  { label: 'Quick Ratio', value: '7.45', icon: <MdOutlineWaterDrop /> },
];

const landHoldings = [
  {
    location: 'Dubai South / Expo Valley',
    size: '~7 sq km (~75 million sq ft)',
    status: 'Masterplanned — phased development',
    icon: <TbMapPin />,
  },
  {
    location: 'Dubai Hills Estate',
    size: '11 million sq m (~118 million sq ft)',
    status: 'Under development — ongoing releases',
    icon: <TbMapPin />,
  },
  {
    location: 'Dubai Creek Harbour',
    size: '6 million sq m (~64.5 million sq ft)',
    status: 'Under development',
    icon: <TbMapPin />,
  },
];

const sourceData = [
  {
    fact: 'Revenue and profit figures',
    source: 'Gulf News; Decypha',
    ref: 'Emaar reports record 2025 with highest sales, revenue and profit (Feb 2026)',
    url: 'https://gulfnews.com/business/property/emaar-reports-record-2025-with-highest-sales-revenue-and-profit-1.500441130',
  },
  {
    fact: 'Cash reserves, debt metrics',
    source: 'Yahoo Finance',
    ref: 'Emaar Properties PJSC Key Statistics (31 Dec 2025)',
    url: 'https://sg.finance.yahoo.com/quote/EMAAR.AE/key-statistics/',
  },
  {
    fact: 'Interest coverage ratio',
    source: 'AInvest',
    ref: 'Navigating Uncertainty with Middle Eastern Dividend Champions (June 2025)',
    url: 'https://www.ainvest.com/news/navigating-uncertainty-middle-eastern-dividend-champions-emaar-delek-edc-2025-income-plays-2506/',
  },
  {
    fact: 'ESG Rating',
    source: 'MarketScreener',
    ref: 'Emaar Properties Stock — ESG MSCI A rating',
    url: 'https://sa.marketscreener.com/quote/stock/EMAAR-PROPERTIES-9059234',
  },
  {
    fact: 'Market share calculation',
    source: 'CW Property Middle East; DXBinteract',
    ref: 'Dubai developers 2025: Emaar tops sales, Binghatti leads transactions (January 2026)',
    url: 'https://property.constructionweekonline.com/dubai-developers-2025-emaar-tops-sales-binghatti-leads-transactions/',
  },
  {
    fact: 'Credit rating, Total land bank figures',
    source: 'Emaar Properties Official Press Release (Nov 2025)',
    ref: "Emaar's Property Sales reached AED 61 billion (6 November 2025)",
    url: 'https://properties.emaar.com/en/press-release-listing/emaars-property-sales-reached-aed-61-billion/',
  },
  {
    fact: 'Dubai Hills Estate size',
    source: 'Emaar Properties Official Website',
    ref: 'Dubai Hills Estate — The Green Heart of Dubai',
    url: 'https://properties.emaar.com/en/our-communities/dubai-hills-estate/',
  },
  {
    fact: 'Dubai Creek Harbour size',
    source: 'Gulf Times',
    ref: 'Creekside 18 promises luxury living alongside Dubai Creek (27 January 2026)',
    url: 'https://www.gulf-times.com/story/455087/--creekside-18-promises-luxury-living-alongside-dubai-creek',
  },
  {
    fact: 'UAE land bank trend and The Heights size',
    source: 'Arabian Gulf Business Insight (AGBI)',
    ref: "Emaar's land bank shrinks as it focuses on Dubai South (17 February 2026)",
    url: 'https://www.agbi.com/analysis/real-estate/2026/02/emaars-land-bank-shrinks-as-it-focuses-on-dubai-south/',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const GoldDivider = ({ isDark }) => (
  <div className={`h-[1px] w-full ${isDark ? 'bg-[#B68A35]/25' : 'bg-[#D4A853]/30'}`} />
);

const SectionLabel = ({ children, isDark }) => (
  <p className={`text-[10px] font-black tracking-[0.2em] uppercase mb-3 ${isDark ? 'text-[#B68A35]' : 'text-[#96712A]'}`}>
    {children}
  </p>
);

// ─── Tab: Financials ─────────────────────────────────────────────────────────

const FinancialsTab = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => (
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left: Performance */}
    <div className="flex-1">
      <SectionLabel isDark={isDark}>Financial Performance — FY 2025</SectionLabel>
      <GoldDivider isDark={isDark} />

      {/* All 4 cards in one row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {financialPerformance.map((item, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl`}
            style={{ border: `1px solid ${cardBorder}`, background: cardBg }}
          >
            {/* Icon and Label */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                <span className="text-[#B68A35] text-3xl">{item.icon}</span>
              </div>
              <span className={`text-[12px] font-medium`} style={{ color: subtextColor }}>{item.label}</span>
            </div>

            {/* Value */}
            <div className={`text-2xl lg:text-2xl font-semibold font-[Merriweather] tabular-nums mb-2`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
              {item.value}
            </div>

            {/* Growth */}
            {item.growth && (
              <div className="flex items-center gap-1 text-emerald-600 mb-2">
                <BsArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-bold">{item.growth}</span>
              </div>
            )}

            {/* FY 2025 */}
            <span className={`text-[10px]`} style={{ color: subtextColor }}>{item.sub}</span>
          </div>
        ))}
      </div>

      <p className={`text-[10px] mt-3 italic`} style={{ color: subtextColor }}>
        Source: Emaar Annual Report 2025 via Gulf News / Yahoo Finance
      </p>
    </div>

    {/* Right: Debt Metrics + ESG */}
    <div className={`lg:w-[300px] xl:w-[340px] shrink-0 rounded-xl p-4`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF8F4' }}>
      <SectionLabel isDark={isDark}>Debt & Liquidity Metrics</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="flex flex-col gap-0 mt-3">
        {debtMetrics.map((m, i) => (
          <div key={i} className={`flex items-center justify-between py-2.5 border-b last:border-b-0`} style={{ borderBottomColor: cardBorder }}>
            <div className="flex items-center gap-2">
              <span className={`text-base ${isDark ? 'text-[#B68A35]/70' : 'text-[#B68A35]/80'}`}>{m.icon}</span>
              <span className={`text-[12px]`} style={{ color: bodyColor }}>{m.label}</span>
            </div>
            <span className={`text-[13px] font-semibold tabular-nums`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{m.value}</span>
          </div>
        ))}
      </div>
      <p className={`text-[10px] mt-3 italic`} style={{ color: subtextColor }}>
        Source: Calculated from Emaar Annual Report 2025 via Yahoo Finance / AInvest
      </p>

      {/* ESG */}
      <div className={`mt-4 rounded-xl p-3 flex items-center justify-between`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(0,0,0,0.3)' : '#F1FAF1' }}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <BsPatchCheck className="text-emerald-600 w-4 h-4" />
          </div>
          <div>
            <p className={`text-[10px] font-medium`} style={{ color: subtextColor }}>ESG Rating</p>
            <p className={`text-[11px]`} style={{ color: subtextColor }}>December 2025</p>
          </div>
        </div>
        <span className="text-3xl font-serif font-bold text-emerald-600">A</span>
      </div>
    </div>
  </div>
);

// ─── Tab: Market ─────────────────────────────────────────────────────────────

const MarketTab = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Column 1: Market Position */}
    <div className={`rounded-xl p-6`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <SectionLabel isDark={isDark}>Market Position</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="mt-6 flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
          <MdOutlineLeaderboard className="text-[#B68A35] w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className={`text-[11px] font-semibold tracking-wider uppercase`} style={{ color: subtextColor }}>Market Share</p>
          <p className={`text-3xl font-serif font-semibold mt-1`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
            AED <span className="text-[#B68A35]">65.8B</span>
          </p>
          <p className={`text-[12px] mt-2 leading-relaxed`} style={{ color: bodyColor }}>
            Emaar led the market with AED 65.8 billion in sales value (2025)
          </p>
          <p className={`text-[10px] mt-3 italic leading-relaxed`} style={{ color: subtextColor }}>
            Source: DLD Annual Report 2025 / PropertyIntel analysis via CW Property Middle East – Dubai developers 2025: Emaar tops sales, Binghatti leads transactions
          </p>
        </div>
      </div>
    </div>

    {/* Column 2: Industry Rank */}
    <div className={`rounded-xl p-6`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <SectionLabel isDark={isDark}>Industry Rank</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
            <BsAward className="text-[#B68A35] w-6 h-6" />
          </div>
          <div>
            <p className={`text-2xl font-serif font-bold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>#1</p>
            <p className={`text-[12px] leading-relaxed`} style={{ color: bodyColor }}>developer in Dubai by sales value</p>
          </div>
        </div>
        <div className={`h-px`} style={{ background: cardBorder }} />
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
            <BsGlobe2 className="text-[#B68A35] w-6 h-6" />
          </div>
          <div>
            <p className={`text-2xl font-serif font-bold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>#3</p>
            <p className={`text-[12px] leading-relaxed`} style={{ color: bodyColor }}>most valuable UAE brand ($6.7 billion, +53% YoY)</p>
          </div>
        </div>
      </div>
      <p className={`text-[10px] mt-5 italic leading-relaxed`} style={{ color: subtextColor }}>
        Source: Zawya Top 100 UAE Companies 2025 / Kantar BrandZ Most Valuable Emirati Brands 2025 via Gulf News (Sep 2025)
      </p>
    </div>

    {/* Column 3: Segment Strengths */}
    <div className={`rounded-xl p-6`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <SectionLabel isDark={isDark}>Segment Strengths</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
            <TbHome className="text-[#B68A35] w-6 h-6" />
          </div>
          <div>
            <p className={`text-[14px] font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Luxury Villas</p>
            <p className={`text-[12px] mt-1 leading-relaxed`} style={{ color: bodyColor }}>
              Dominant in Dubai Hills, Arabian Ranches, and The Oasis.
            </p>
          </div>
        </div>
        <div className={`h-px`} style={{ background: cardBorder }} />
        <div className="flex gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
            <TbBuildingSkyscraper className="text-[#B68A35] w-6 h-6" />
          </div>
          <div>
            <p className={`text-[14px] font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Mixed-Use Communities</p>
            <p className={`text-[12px] mt-1 leading-relaxed`} style={{ color: bodyColor }}>
              Downtown Dubai, Dubai Creek Harbour as flagship developments.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Tab: Pipeline ────────────────────────────────────────────────────────────

const PipelineTab = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
  const landHoldingsData = [
    {
      icon: <TbMapPin className="w-5 h-5" />,
      location: "Dubai South / Expo Valley",
      size: "~7 sq km (~75 million sq ft)",
      status: "Masterplanned — phased development",
      badge: "~7"
    },
    {
      icon: <TbMapPin className="w-5 h-5" />,
      location: "Dubai Hills Estate",
      size: "11 million sq m (~118 million sq ft)",
      status: "Under development — ongoing releases",
      badge: "11M"
    },
    {
      icon: <TbMapPin className="w-5 h-5" />,
      location: "Dubai Creek Harbour",
      size: "6 million sq m (~64.5 million sq ft)",
      status: "Under development",
      badge: "6M"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

      {/* Left Column: Land Bank & Key Holdings */}
      <div className="lg:col-span-3 flex flex-col gap-8">
        <div>
          <SectionLabel isDark={isDark}>Land Bank & Future Capacity</SectionLabel>
          <GoldDivider isDark={isDark} />
        </div>

        {/* Land Bank Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`rounded-xl p-4 text-center`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF8F4' }}>
            <p className={`text-[10px] font-semibold tracking-wider uppercase mb-1`} style={{ color: subtextColor }}>Global</p>
            <p className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#B68A35]'}`}>~660M sq. ft.</p>
          </div>
          <div className={`rounded-xl p-4 text-center`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF8F4' }}>
            <p className={`text-[10px] font-semibold tracking-wider uppercase mb-1`} style={{ color: subtextColor }}>UAE</p>
            <p className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#B68A35]'}`}>~370M sq. ft.</p>
          </div>
        </div>

        {/* Estimated Value Note */}
        <div className={`text-[11px] italic`} style={{ color: subtextColor }}>
          Estimated land value: Not publicly disclosed. Source: Emaar Investor Presentation Q4 2025 via Emaar Press Release (Nov 2025).
        </div>

        {/* Key Land Holdings */}
        <div>
          <SectionLabel isDark={isDark}>Key Land Holdings</SectionLabel>
          <GoldDivider isDark={isDark} />

          {/* Mobile View: List Cards */}
          <div className="flex flex-col gap-3 mt-4 lg:hidden">
            {landHoldingsData.map((h, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 rounded-xl`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                  <span className={isDark ? 'text-[#B68A35]' : 'text-[#B68A35]'}>{h.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{h.location}</p>
                  <p className={`text-[11px] truncate`} style={{ color: bodyColor }}>{h.size}</p>
                  <p className={`text-[11px] truncate`} style={{ color: subtextColor }}>{h.status}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-[10px] font-bold shrink-0`} style={!isDark ? { background: '#F5F2EB', color: '#96712A' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                  {h.badge}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden lg:block mt-4">
            <div className={`grid grid-cols-12 px-4 py-3 text-[10px] font-bold tracking-widest uppercase`} style={{ color: subtextColor }}>
              <div className="col-span-4">Location</div>
              <div className="col-span-4">Size</div>
              <div className="col-span-4">Status</div>
            </div>
            <div className="flex flex-col">
              {landHoldingsData.map((h, i) => (
                <div key={i} className={`grid grid-cols-12 px-4 py-4 items-center border-t`} style={{ borderTopColor: cardBorder }}>
                  <div className="col-span-4 flex items-center gap-3">
                    <span className={`text-[#B68A35]`}>{h.icon}</span>
                    <span className={`text-sm font-medium`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{h.location}</span>
                  </div>
                  <div className={`col-span-4 text-[13px]`} style={{ color: bodyColor }}>{h.size}</div>
                  <div className={`col-span-4 text-[13px]`} style={{ color: subtextColor }}>{h.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Project Pipeline */}
      <div className="lg:col-span-2 flex flex-col gap-8">
        <div>
          <SectionLabel isDark={isDark}>Project Pipeline</SectionLabel>
          <GoldDivider isDark={isDark} />
        </div>

        <div className="flex flex-col gap-4">
          {/* New Launches */}
          <div className={`flex items-start gap-4 p-4 rounded-xl`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
              <TbRocket className={`w-6 h-6 text-[#B68A35]`} />
            </div>
            <div className="flex-1 pt-1">
              <p className={`text-sm font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Upcoming Projects (2025)</p>
              <p className={`text-[11px] mt-0.5 leading-relaxed`} style={{ color: bodyColor }}>
                Including Grand Polo Club and Resort, The Valley, and Bristol at Emaar Beachfront.
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-3xl font-serif font-bold text-[#B68A35]`}>48</p>
              <p className={`text-[11px]`} style={{ color: subtextColor }}>projects</p>
            </div>
          </div>

          {/* Total Future Units */}
          <div className={`flex items-start gap-4 p-4 rounded-xl`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
              <GoPeople className={`w-6 h-6 text-[#B68A35]`} />
            </div>
            <div className="flex-1 pt-1">
              <p className={`text-sm font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Total Future Units</p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-3xl font-serif font-bold text-[#B68A35]`}>~51,000</p>
              <p className={`text-[11px]`} style={{ color: subtextColor }}>units under development</p>
            </div>
          </div>

          {/* Estimated GDV */}
          <div className={`flex items-start gap-4 p-4 rounded-xl`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
              <TbStack2 className={`w-6 h-6 text-[#B68A35]`} />
            </div>
            <div className="flex-1 pt-1">
              <p className={`text-sm font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Estimated GDV (Revenue Backlog)</p>
              <p className={`text-[11px] mt-0.5`} style={{ color: subtextColor }}>revenue backlog as of 31 December 2025</p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-3xl font-serif font-bold text-[#B68A35]`}>AED 155B</p>
            </div>
          </div>
        </div>

        <div className={`text-[10px] italic leading-relaxed`} style={{ color: subtextColor }}>
          Revenue backlog as of 31 December 2025. Source: Emaar Investor Relations / Gulf News (Feb 2026); Decypha (Feb 2026); Emaar Official Press Release (June 2025).
        </div>
      </div>
    </div>
  );
};

// ─── Tab: Ratings ─────────────────────────────────────────────────────────────

const RatingsTab = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => (
  <div className="flex flex-col gap-6">
    <div>
      <SectionLabel isDark={isDark}>Credit Ratings</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {[
          { agency: "Moody's", rating: 'Baa1', outlook: 'Stable', date: 'June 2025', source: "Moody's Investors Service" },
          { agency: 'S&P', rating: 'BBB+', outlook: 'Stable', date: 'June 2025', source: 'S&P Global Ratings' },
        ].map((r, i) => (
          <div
            key={i}
            className={`rounded-xl p-6`}
            style={{ border: `1px solid ${cardBorder}`, background: cardBg }}
          >
            <div className="flex items-start gap-4">
              {/* Rating Badge */}
              <div className={`px-4 py-4 rounded-lg shrink-0`} style={isDark ? { background: 'rgba(182,138,53,0.12)' } : { background: '#FFFBF3' }}>
                <span className="text-2xl font-serif font-bold text-[#B68A35]">{r.rating}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <p className={`text-lg font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{r.agency}</p>
                  <BsArrowUpRight className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#B68A35]/60' : 'text-[#B68A35]'}`} />
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5">
                    <BsGraphUpArrow className={`w-4 h-4 ${isDark ? 'text-[#B68A35]/70' : 'text-[#B68A35]'}`} />
                    <span className={`text-[13px]`} style={{ color: subtextColor }}>
                      Outlook: <strong style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{r.outlook}</strong>
                    </span>
                  </div>
                  <div className={`w-px h-4`} style={{ background: cardBorder }} />
                  <div className="flex items-center gap-1.5">
                    <BsCalendar3 className={`w-4 h-4 ${isDark ? 'text-[#B68A35]/70' : 'text-[#B68A35]'}`} />
                    <span className={`text-[13px]`} style={{ color: subtextColor }}>
                      Date: <strong style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{r.date}</strong>
                    </span>
                  </div>
                </div>

                <p className={`text-[11px] italic`} style={{ color: subtextColor }}>
                  Source: {r.source}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Collapsible Sources ──────────────────────────────────────────────────────

const SourcesAccordion = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
  const [open, setOpen] = useState(false);
  const [analyticOpen, setAnalyticOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Analyst Commentary accordion */}
      <div className={`rounded-xl overflow-hidden transition-colors duration-300`} style={{ border: `1px solid ${cardBorder}` }}>
        <button
          onClick={() => setAnalyticOpen(!analyticOpen)}
          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-[#FAF6EE]'}`}
          style={{ background: cardBg }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
              <BsBarChartLine className="text-[#B68A35] w-4 h-4" />
            </div>
            <span className={`text-[13px] font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Analyst Commentary</span>
          </div>
          {analyticOpen ? <BsChevronUp className="w-4 h-4" style={{ color: subtextColor }} /> : <BsChevronDown className="w-4 h-4" style={{ color: subtextColor }} />}
        </button>
        {analyticOpen && (
          <div className={`px-4 pb-4 border-t text-[12px] leading-relaxed`} style={{ borderTopColor: cardBorder, background: cardBg }}>
            <div className={`mt-3 p-3 rounded-lg`} style={isDark ? { background: 'rgba(255,255,255,0.04)' } : { background: 'white' }}>
              <p className="leading-relaxed" style={{ color: bodyColor }}>
                The consensus among 12 analysts covering Emaar Properties is a "BUY" rating, with an average 12-month target price of AED 19.41, representing approximately 18% upside from current levels. Analysts highlight Emaar's record 2025 performance (AED 49.6B revenue, AED 65.8B property sales, AED 155B backlog), strong balance sheet with net cash position, and credit rating upgrades to Baa1/BBB+ by Moody's and S&P. The company's dominant market position (AED 65.8B sales, 48 new launches) and ~51,000 units under development provide strong revenue visibility. Goldman Sachs maintains a positive outlook on Emaar Development, citing robust UAE real estate fundamentals. Key risks monitored include potential market cyclicality and execution of large-scale projects.
              </p>
              <p className={`text-[10px] mt-2 italic`} style={{ color: subtextColor }}>Source: Goldman Sachs Research (2025)</p>
            </div>
          </div>
        )}
      </div>

      {/* Sources accordion */}
      <div className={`rounded-xl overflow-hidden transition-colors duration-300`} style={{ border: `1px solid ${cardBorder}` }}>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-[#FAF6EE]'}`}
          style={{ background: cardBg }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
              <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
            </div>
            <span className={`text-[13px] font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Sources & Verification</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full`} style={!isDark ? { background: '#FAF6EE', color: '#6B7280' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
              {sourceData.length} Financial & Regulatory Sources
            </span>
          </div>
          {open ? <BsChevronUp className="w-4 h-4" style={{ color: subtextColor }} /> : <BsChevronDown className="w-4 h-4" style={{ color: subtextColor }} />}
        </button>
        {open && (
          <div style={{ borderTop: `1px solid ${cardBorder}`, background: cardBg }}>
            {sourceData.map((s, i) => (
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
                  <span className={`block mt-0.5`} style={{ color: subtextColor }}>{s.ref}</span>
                </div>
                <div className="sm:w-[28%] shrink-0 flex items-start justify-between">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 group hover:underline truncate max-w-[90%] text-[#B68A35]`}
                  >
                    <BsLink45Deg className="shrink-0 w-3.5 h-3.5" />
                    <span className="truncate">{s.url.replace('https://', '')}</span>
                  </a>
                  <HiOutlineExternalLink className={`shrink-0 w-3.5 h-3.5 ml-1 mt-0.5`} style={{ color: subtextColor }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Section8 = () => {
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState('financials');

  // Card colors matching TopDevelopersSection pattern
  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const sectionBg = isDark ? t.bg : "#FCFBFA";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

  const tabs = [
    { id: 'financials', label: 'Financials', icon: <TbChartBar /> },
    { id: 'market', label: 'Market', icon: <BsBarChartLine /> },
    { id: 'pipeline', label: 'Pipeline', icon: <TbRocket /> },
    { id: 'ratings', label: 'Ratings', icon: <BsShieldCheck /> },
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
            Emaar Financial Health & Market
            <span className="lg:hidden">—</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
            Position - Investor Analysis
          </h3>
          <p className="max-w-xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
            Analysis of Emaar Properties' financial strength, market share, and development pipeline based on audited financial reports and DLD data.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 pb-16">
        {/* ── Stat Tiles ── */}
        <div className={`relative z-20 grid grid-cols-1 sm:grid-cols-3 gap-0 rounded-2xl overflow-hidden mb-5 -mt-20 sm:-mt-24 lg:-mt-18`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          {[
            {
              icon: <CiBank />,
              label: 'Publicly Traded',
              value: 'Yes',
              sub: null,
            },
            {
              icon: <BsBarChartLine />,
              label: 'Stock Ticker',
              value: 'DFM: EMAAR',
              sub: null,
            },
            {
              icon: <LiaCoinsSolid />,
              label: 'Market Capitalization',
              value: 'AED 145.2 billion',
              sub: 'as of 21 February 2026, per DFM trading summary',
            },
          ].map((tile, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 sm:p-5 border-b sm:border-b-0 sm:border-r last:border-0`}
              style={{ borderColor: cardBorder }}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                <span className="text-[#B68A35] text-xl lg:text-2xl">{tile.icon}</span>
              </div>
              <div>
                <p className={`text-[10px] font-medium uppercase tracking-wider`} style={{ color: subtextColor }}>{tile.label}</p>
                <p className={`text-base lg:text-xl font-serif font-semibold mt-0.5`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{tile.value}</p>
                {tile.sub && <p className={`text-[10px] mt-0.5`} style={{ color: subtextColor }}>{tile.sub}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className={`rounded-2xl overflow-hidden`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          {/* Tab headers */}
          <div className={`flex`} style={{ borderBottom: `1px solid ${cardBorder}`, background: isDark ? cardBg : '#FAF9F6' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-1.5 py-3.5 text-[11px] lg:text-[13px] font-medium transition-colors duration-200
                  ${activeTab === tab.id && !isDark ? 'text-[#B68A35] bg-white font-semibold' : !isDark && activeTab !== tab.id ? 'text-slate-500 hover:text-slate-700 bg-[#FAF9F6]' : ''}
                `}
                style={
                  isDark && activeTab === tab.id
                    ? { color: GOLD, background: cardBg, fontWeight: 600 }
                    : isDark && activeTab !== tab.id
                    ? { color: subtextColor, background: 'transparent' }
                    : undefined
                }
              >
                <span className="text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4 sm:p-5 lg:p-6">
            {activeTab === 'financials' && <FinancialsTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'market' && <MarketTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'pipeline' && <PipelineTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'ratings' && <RatingsTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
          </div>
        </div>

        {/* ── Accordions ── */}
        <div className="mt-4">
          <SourcesAccordion isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />
        </div>

        <ExpertSection />

        {/* ── Disclaimer ── */}
        <div className={`mt-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF8F4' }}>
          <div className="flex items-start gap-3">
            <BsShieldCheck className={`w-5 h-5 shrink-0 mt-0.5`} style={{ color: subtextColor }} />
            <div>
              <span className={`text-[11px] font-semibold`} style={{ color: subtextColor }}>Disclaimer </span>
              <span className={`text-[11px]`} style={{ color: subtextColor }}>
                All financial data sourced from publicly available reports and regulatory filings.
                Placeholder values indicate backend-populated data for real-time accuracy.
              </span>
            </div>
          </div>
          <div className={`flex items-center gap-2 shrink-0 text-[11px]`} style={{ color: subtextColor }}>
            <BsCalendar3 className="w-3.5 h-3.5" />
            <span>Last updated: 22 February 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section8;