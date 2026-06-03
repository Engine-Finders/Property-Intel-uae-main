"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineShieldCheck
} from "react-icons/hi2";
import { LuInfo } from "react-icons/lu";
import { HiOutlineDatabase, HiOutlineClipboardCheck } from 'react-icons/hi';
import { PiHouseLine } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { FiPercent } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { GoInfo } from "react-icons/go";
import { HiChevronUp } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi2";
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

// --- Sub-components for Tab Views ---

const SectionHeader = ({ icon, title, subtitle, isDark, t }) => (
  <div className="flex items-start gap-4 mb-8">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm" 
      style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
      {icon}
    </div>
    <div>
      <h3 className="font-semibold font-[Merriweather] tabular-nums text-lg sm:text-xl leading-tight" 
        style={{ color: isDark ? t.text : '#1A1A1A' }}>{title}</h3>
      {subtitle ? <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{subtitle}</p> : null}
    </div>
  </div>
);

const TransactionsView = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 animate-in fade-in duration-500" style={{ background: cardBg }}>
    {/* Left Section: Transaction Data */}
    <div className="lg:col-span-2 space-y-8 lg:space-y-10">

      {/* Header Section */}
      <SectionHeader
        icon={<HiOutlineClipboardCheck className="text-[#B68A35] text-2xl sm:text-3xl" />}
        title="Verified Transaction Data"
        subtitle="Last 12 Months"
        isDark={isDark}
        t={t}
      />

      {/* Transaction Rows */}
      <div className="space-y-6 sm:space-y-8">
        {[
          {
            label: "5-Bedroom Villa (Standard)",
            sqft: "10,000 – 14,000 sqft",
            avg: "26.5M",
            perSqft: "2,950–3,200",
            range: "AED 24M–32M",
            progressStart: "20%",
            progressWidth: "50%"
          },
          {
            label: "6-Bedroom Villa (Extended)",
            sqft: "14,000 – 20,000 sqft",
            avg: "38.2M",
            perSqft: "3,100–3,450",
            range: "AED 34M–48M",
            progressStart: "15%",
            progressWidth: "60%"
          },
          {
            label: "7+ Bedroom Villa (Custom)",
            sqft: "20,000 – 30,000+ sqft",
            avg: "62.8M",
            perSqft: "3,300–3,800",
            range: "AED 52M–100M+",
            progressStart: "25%",
            progressWidth: "65%"
          },
        ].map((item, i) => (
          <div key={i} className="flex flex-col xl:flex-row justify-between items-start gap-2 sm:gap-6 border-b last:border-0 pb-5"
            style={{ borderColor: cardBorder }}>

            {/* Property Identity */}
            <div className="pt-1">
              <h5 className="font-semibold font-[Merriweather] tabular-nums text-base sm:text-lg leading-tight" 
                style={{ color: isDark ? t.text : '#1A1A1A' }}>
                {item.label}
              </h5>
              <p className="text-xs sm:text-sm mt-1" style={{ color: bodyColor }}>{item.sqft}</p>
            </div>

            {/* Data and Slider Grouped Container */}
            <div className="w-full xl:w-105 shrink-0">
              {/* Price Cards */}
              <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="flex-1 rounded-xl px-3 sm:px-5 py-3" 
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <p className="text-[10px] sm:text-[12px] font-bold uppercase mb-1" style={{ color: subtextColor }}>Avg. Sale</p>
                  <p className="text-[#B68A35] font-bold text-base sm:text-xl whitespace-nowrap">AED {item.avg}</p>
                </div>
                <div className="flex-1 rounded-xl px-3 sm:px-5 py-3" 
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <p className="text-[10px] sm:text-[12px] font-bold uppercase mb-1" style={{ color: subtextColor }}>Price / SQFT</p>
                  <p className="font-bold text-base sm:text-xl whitespace-nowrap" style={{ color: isDark ? t.text : '#1A1A1A' }}>AED {item.perSqft}</p>
                </div>
              </div>

              {/* Range Slider Container */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-tight">
                  <span style={{ color: subtextColor }}>Active listing range</span>
                  <span className="text-[#B68A35]">{item.range}</span>
                </div>
                <div className="relative w-full h-1.5 rounded-full" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#F3EFE9' }}>
                  <div
                    className="absolute h-full bg-[#B68A35] rounded-full"
                    style={{ left: item.progressStart, width: item.progressWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Section: Insights & Source */}
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="p-2 sm:p-7 rounded-2xl shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
        <div className="flex gap-3 mb-4 sm:mb-5 items-center">
          <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0' 
            style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>
            <HiOutlineLightBulb className="text-[#B68A35] text-xl sm:text-2xl" />
          </div>
          <h4 className="font-bold text-base sm:text-lg" style={{ color: isDark ? t.text : '#1A1A1A' }}>What the numbers indicate</h4>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8" style={{ color: bodyColor }}>
          Emirates Hills maintains a premium price-per-square-foot position relative to Dubai's overall villa market (AED 1,400-1,800/sqft), reflecting its gated status, golf-course adjacency, and limited resale inventory. The spread between average sale price and active listing range suggests negotiation flexibility of approximately 8-12% in current market conditions-a typical pattern for ultra-luxury, low-turnover communities.
        </p>
        {/* Data Source Footer */}
        <div className="flex gap-3 px-1 sm:px-2 pt-2 rounded-2xl items-start" 
          style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FDF8F0/60', border: `1px solid ${cardBorder}` }}>
          <HiOutlineDatabase className="text-[#B68A35] text-lg shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-[10px] sm:text-[11px] leading-tight" style={{ color: subtextColor }}>
              <span className="font-bold" style={{ color: isDark ? t.textSecondary : '#374151' }}>Data Source:</span> DXBInteract.com (DLD transaction records), February 2026. Sample size: 47 verified sales across Emirates Hills, Q1 2025-Q1 2026. Listings aggregated from verified broker portals; excludes unverified private listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PriceHistoryView = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
  const milestones = [
    {
      range: "2003–2008",
      title: "Initial Handover Phase",
      desc: "Launch prices averaged AED 1,800–2,200/sqft for standard villa typologies. Early resale activity showed modest appreciation as community amenities matured.",
      badge: "AED 1,800–2,200/sqft",
      icon: <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3y-3.5" />,
      color: "#B68A35",
    },
    {
      range: "2009–2013",
      title: "Post-Correction Stabilisation",
      desc: "Prices consolidated; transaction volume decreased but quality finishes and plot scarcity supported floor values.",
      badge: "Market Floor",
      icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
      color: "#D3423F",
    },
    {
      range: "2014–2019",
      title: "Expo-Driven Growth",
      desc: "Median price per sqft rose to AED 2,600–2,900, aligning with Dubai's broader luxury segment recovery and infrastructure investment.",
      badge: "AED 2,600–2,900/sqft",
      icon: <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
      color: "#B68A35",
    },
    {
      range: "2020–2022",
      title: "Pandemic Adjustment",
      desc: "Temporary softening of 5–8% observed in transaction data; limited impact on prime plot valuations with golf/lake views.",
      badge: "-5% to -8%",
      icon: (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </>
      ),
      color: "#E67E22",
    },
    {
      range: "2023–2026 (Current)",
      title: "Current Cycle — Record Highs",
      desc: "Renewed demand for established, low-density communities has lifted median values to AED 3,100–3,800/sqft. Transaction velocity remains selective.",
      badge: "AED 3,100–3,800/sqft",
      icon: <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
      color: "#27AE60",
    },
  ];

  const points = [
    { x: 0, y: 60, label: '2003' },
    { x: 18, y: 48, label: '2008', callout: 'Market Correction' },
    { x: 48, y: 44, label: '2014', callout: 'Expo Announcement' },
    { x: 68, y: 52, label: '2020', callout: 'Pandemic Dip' },
    { x: 85, y: 32, label: '2023-2024', callout: 'Recovery Phase' },
    { x: 100, y: 10, isMainBadge: true }
  ];

  return (
    <div className="p-4 sm:p-6 font-sans max-w-360 mx-auto" style={{ background: cardBg, color: isDark ? t.text : '#1A1A1A' }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

        {/* Left Column: Chart Container */}
        <div className="lg:col-span-8 flex flex-col space-y-8">
          <SectionHeader
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>}
            title="Price Evolution Since Handover"
            subtitle="2003–2026 · Median price per sqft via DLD transaction data"
            isDark={isDark}
            t={t}
          />

          {/* Chart Description */}
          <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: bodyColor }}>
            Line graph showing median price per sqft for Emirates Hills villas from first handover (2003) to present (Q1 2026), based on DLD transaction data via DXBInteract. Key inflection points annotated: 2008 market correction, 2014 Expo announcement, 2020 pandemic dip, 2023–2024 recovery phase.
          </p>

          {/* Chart Area */}
          <div className="relative w-full h-80 md:h-105">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-[10px] md:text-[11px] font-bold z-10" style={{ color: subtextColor }}>
              <span>4,000</span><span>3,200</span><span>2,400</span><span>1,600</span><span>800</span><span>0</span>
            </div>

            {/* SVG Content */}
            <div className="ml-12 h-full relative border-l border-b" style={{ borderColor: cardBorder }}>
              {/* Horizontal Grid lines */}
              {[0, 20, 40, 60, 80].map((top) => (
                <div key={top} className="absolute left-0 right-0 border-t" style={{ top: `${top}%`, borderColor: cardBorder }} />
              ))}

              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 400">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B68A35" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#B68A35" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Main Path */}
                <path
                  d="M0,240 C100,220 150,190 180,190 C220,190 280,260 350,260 C420,260 450,180 480,180 C580,180 630,220 680,220 C780,220 880,100 1000,40"
                  fill="none" stroke="#B68A35" strokeWidth="4" strokeLinecap="round"
                />
                <path
                  d="M0,240 C100,220 150,190 180,190 C220,190 280,260 350,260 C420,260 450,180 480,180 C580,180 630,220 680,220 C780,220 880,100 1000,40 L 1000,400 L 0,400 Z"
                  fill="url(#chartFill)"
                />
              </svg>

              {/* Data points and responsive Tooltips */}
              {points.map((p, i) => (
                <div key={i} className="absolute group" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  {/* Point */}
                  <div className="w-3 h-3 bg-[#B68A35] border-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm z-20" style={{ borderColor: cardBg }} />

                  {/* Vertical Guide Line */}
                  {i > 0 && <div className="absolute top-0 left-0 w-px h-125 border-l border-dashed -translate-x-1/2 -z-10" style={{ borderColor: cardBorder }} />}

                  {/* Dynamic Tooltip Label */}
                  {p.callout && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 mb-2 z-30">
                      <div className="px-2 py-1 rounded shadow-sm text-center min-w-25" 
                        style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                        <p className="text-[#B68A35] text-[9px] font-bold leading-none mb-1">{p.label}</p>
                        <p className="text-[9px] font-bold leading-none whitespace-nowrap" style={{ color: isDark ? t.text : '#1A1A1A' }}>{p.callout}</p>
                      </div>
                    </div>
                  )}

                  {/* Q1 2026 Badge */}
                  {p.isMainBadge && (
                    <div className="absolute bottom-6 right-0 translate-x-2 p-2 md:p-3 rounded-xl text-center shadow-md min-w-32.5 z-30" 
                      style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/30` }}>
                      <p className="text-[#B68A35] text-[10px] font-bold uppercase mb-0.5">Q1 2026</p>
                      <p className="text-xs md:text-sm font-bold whitespace-nowrap" style={{ color: isDark ? t.text : '#1A1A1A' }}>AED 3,100–3,800</p>
                    </div>
                  )}
                </div>
              ))}

              {/* X-Axis Dates */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-[10px] md:text-[11px] font-bold" style={{ color: subtextColor }}>
                <span>2003</span><span>2008</span><span>2012</span><span>2014</span><span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>Q1 2026</span>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="rounded-2xl p-4 md:p-5 flex gap-4 items-start mt-4" 
            style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FDF8F0/60', border: `1px solid ${cardBorder}` }}>
            <div className="text-[#B68A35] mt-0.5 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.663 17h4.674M12 3v1M18.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <p className="text-[12px] md:text-[13px] leading-relaxed" style={{ color: bodyColor }}>
              <span className="font-bold" style={{ color: isDark ? t.text : '#1A1A1A' }}>Note:</span> Individual property performance varies significantly based on plot orientation, customization quality, and maintenance history. This analysis reflects community-level median trends, not specific unit valuations.
            </p>
          </div>
        </div>

        {/* Right Column: Timeline Cards */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-5 pt-1">
          {milestones.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full shadow-sm flex items-center justify-center z-10" 
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: item.color }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </div>
                {i !== milestones.length - 1 && <div className="w-px h-full mt-2" style={{ background: cardBorder }} />}
              </div>
              <div className="flex-1 pb-6 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="text-[#B68A35] text-[10px] md:text-[11px] font-bold uppercase tracking-wider">{item.range}</span>
                  <span className="text-[#B68A35] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded border" 
                    style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', borderColor: `${GOLD}/10` }}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm md:text-[15px] mb-1 leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.title}</h3>
                <p className="text-[11px] md:text-[12px] leading-relaxed" style={{ color: bodyColor }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const RentalYieldView = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
  const data = [
    {
      type: "5-Bedroom Villa",
      rent: "AED 950,000–1.2M",
      yield: "3.1–3.8%",
      term: "12-month renewable",
      icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    },
    {
      type: "6-Bedroom Villa",
      rent: "AED 1.4M–1.9M",
      yield: "3.3–4.2%",
      term: "12-month renewable",
      icon: <path d="M19 7h-8a2 2 0 0 0-2 2V21a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    },
    {
      type: "7+ Bedroom Villa",
      rent: "AED 2.2M–3.5M",
      yield: "3.0–4.0%",
      term: "12–24 month negotiated",
      icon: <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    },
  ];

  return (
    <div className="max-w-360 mx-auto p-4 sm:p-6 font-sans" style={{ background: cardBg }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

        {/* LEFT CONTENT: TABLE/CARDS */}
        <div className="lg:col-span-8 space-y-8">
          <SectionHeader
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2">
              <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
            </svg>}
            title="Achieved Rental Performance"
            subtitle="Last 12 Months • DXBInteract Verified"
            isDark={isDark}
            t={t}
          />

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block overflow-hidden rounded-2xl shadow-sm" 
            style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6', borderColor: cardBorder }}>
                  <th className="p-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <PiHouseLine className="text-[#B68A35] text-xl" />
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: subtextColor }}>Unit Configuration</span>
                    </div>
                  </th>
                  <th className="p-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <IoWalletOutline className="text-[#B68A35] text-xl" />
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: subtextColor }}>Avg. Annual Rent (Verified)</span>
                    </div>
                  </th>
                  <th className="p-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <FiPercent className="text-[#B68A35] text-xl" />
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: subtextColor }}>Implied Gross Yield*</span>
                    </div>
                  </th>
                  <th className="p-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <LuCalendarDays className="text-[#B68A35] text-xl" />
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: subtextColor }}>Lease Term Typical</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b last:border-0 transition-colors" style={{ borderColor: cardBorder }}>
                    <td className="p-6 text-center font-bold text-sm" style={{ color: isDark ? t.text : '#1A1A1A' }}>{row.type}</td>
                    <td className="p-6 text-center font-bold text-sm text-[#B68A35]">{row.rent}</td>
                    <td className="p-6 text-center font-bold text-sm" style={{ color: isDark ? t.text : '#1A1A1A' }}>{row.yield}</td>
                    <td className="p-6 text-center font-medium text-sm" style={{ color: bodyColor }}>{row.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="md:hidden space-y-4">
            {data.map((row, i) => (
              <div key={i} className="space-y-3">
                <h4 className="font-bold text-base leading-tight" style={{ color: isDark ? t.text : '#1A1A1A' }}>{row.type}</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl p-2 text-center" 
                    style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                    <p className="text-[9px] font-bold uppercase leading-tight mb-2" style={{ color: subtextColor }}>Annual Rent (Verified)</p>
                    <p className="text-[#B68A35] font-bold text-[11px] leading-tight">{row.rent}</p>
                  </div>
                  <div className="rounded-xl p-2 text-center" 
                    style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                    <p className="text-[9px] font-bold uppercase leading-tight mb-2" style={{ color: subtextColor }}>Implied Gross Yield*</p>
                    <p className="text-[#B68A35] font-bold text-[11px] leading-tight">{row.yield}</p>
                  </div>
                  <div className="rounded-xl p-2 text-center" 
                    style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                    <p className="text-[9px] font-bold uppercase leading-tight mb-2" style={{ color: subtextColor }}>Lease Term Typical</p>
                    <p className="font-bold text-[11px] leading-tight" style={{ color: isDark ? t.text : '#1A1A1A' }}>{row.term}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer / Disclaimer */}
          <div className="rounded-2xl p-4 flex gap-4 items-start" 
            style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FDF8F0/60', border: `1px solid ${cardBorder}` }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              <GoInfo className="text-[#B68A35] font-serif italic text-md font-bold" />
            </div>
            <p className="text-[11px] md:text-xs leading-relaxed italic" style={{ color: subtextColor }}>
              *Gross yield calculated as (Annual Rent ÷ Current Market Value) × 100. Based on <span className="text-[#B68A35] font-bold">DXBInteract</span> rental transaction records, Q1 2025–Q1 2026. Excludes service charges, utilities, and management fees.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTEXT & PREMIUM DRIVER */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:pt-1">
          {/* Rental Market Context */}
          <div className="rounded-2xl p-4 sm:p-6 shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="1.5">
                  <path d="M3 21h18" /><path d="m3 7 9-4 9 4" /><path d="M5 21V10" /><path d="M19 21V10" /><path d="M9 21v-4" /><path d="M15 21v-4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg leading-tight" style={{ color: isDark ? t.text : '#1A1A1A' }}>Rental Market Context</h3>
            </div>
            <p className="text-[13px] md:text-sm leading-relaxed mb-0" style={{ color: bodyColor }}>
              Emirates Hills rental yields sit at the lower end of Dubai's villa spectrum, consistent with its positioning as a capital-preservation asset rather than a high-yield investment. Demand is driven by executive relocations, family upgrades, and short-term luxury leases. Properties with recent interior updates and smart-home integration achieve rental premiums of 10-15% above community averages.
            </p>
          </div>

          {/* Data Source Box */}
          <div className="rounded-2xl p-5 flex items-start gap-4 shadow-sm" 
            style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="1.5" className="shrink-0 mt-1">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div>
              <p className="text-[11px] leading-snug" style={{ color: subtextColor }}>
                <span className="font-bold" style={{ color: isDark ? t.textSecondary : '#374151' }}>Data Source:</span> DXBInteract.com (rental transaction records), Q1 2025–Q1 2026. Excludes service charges, utilities, and management fees.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* FULL WIDTH DISCLAIMER */}
      <div className="mt-5 rounded-xl p-5" 
        style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FDF8F0/40', border: `1px solid ${cardBorder}` }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
            <GoInfo className="text-[#B68A35] font-serif italic text-md font-bold" />
          </div>
          <span className="text-[#B68A35] text-[10px] font-bold uppercase tracking-widest">Disclaimer</span>
        </div>
        <p className="text-[10px] md:text-[11px] leading-relaxed" style={{ color: subtextColor }}>
          All data is for educational and research purposes only. PropertyIntel.ae does not provide financial, legal, or investment advice. Market values, rental yields, and transaction data are estimates based on aggregated third-party sources and are subject to change. Verify all details with the Dubai Land Department, licensed real estate brokers, and official developer channels before making any commitment.
        </p>
      </div>
    </div>
  );
};

const BuyerGuideView = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
  const [openSection, setOpenSection] = useState(0);

  const sections = [
    {
      id: 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "For end-users seeking a primary residence",
      content: (
        <div className="space-y-4">
          <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: bodyColor }}>
            The verified transaction data confirms Emirates Hills’ status as a <span className="font-bold" style={{ color: isDark ? t.text : '#1A1A1A' }}>mature, low-volatility asset</span>. Price stability over two decades, coupled with limited new supply in the gated luxury segment, supports long-term value retention.
          </p>
          <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: bodyColor }}>
            Buyers should prioritise <span className="font-bold text-[#27AE60]">plot position (golf/lake view)</span>, structural condition, and proximity to community entrances when evaluating specific units.
          </p>
        </div>
      ),
      color: "#27AE60",
      bg: isDark ? 'rgba(39,174,96,0.1)' : '#F7FAF7',
      iconColor: "#27AE60",
      iconBg: isDark ? 'rgba(39,174,96,0.15)' : '#EEF6EE'
    },
    {
      id: 1,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
        </svg>
      ),
      title: "For investors evaluating resale or rental strategy",
      content: (
        <div className="space-y-4">
          <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: bodyColor }}>
            Current yield profiles (3.0–4.2%) are modest relative to newer villa communities, reflecting the premium embedded in established locations. Capital appreciation has historically outpaced rental income in this asset class.
          </p>
          <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: bodyColor }}>
            Investors with a <span className="font-bold text-[#B68A35]">5–10 year horizon</span> may benefit from infrastructure maturation in surrounding corridors (e.g., Al Khail Road upgrades, proximity to Dubai Hills Estate amenities), though near-term liquidity remains selective.
          </p>
        </div>
      ),
      color: "#B68A35",
      bg: isDark ? 'rgba(182,138,53,0.1)' : '#FDFBF7',
      iconColor: "#B68A35",
      iconBg: isDark ? 'rgba(182,138,53,0.15)' : '#FDF8F0'
    },
    {
      id: 2,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        </svg>
      ),
      title: "Key due diligence considerations",
      content: (
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22] mt-1.5 shrink-0" />
            <p className="text-[12px] md:text-[13px] leading-snug" style={{ color: bodyColor }}>
              Request the full DLD transaction history for any specific plot via the <span className="font-bold text-[#E67E22]">Dubai REST app</span> to verify ownership chain and encumbrances.
            </p>
          </div>
          <div className="w-full h-px" style={{ background: cardBorder }} />
          <div className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22] mt-1.5 shrink-0" />
            <p className="text-[12px] md:text-[13px] leading-snug" style={{ color: bodyColor }}>
              Commission an <span className="font-bold text-[#E67E22]">independent valuation</span> if financing; banks typically apply conservative LTV ratios <span className="font-bold text-[#E67E22]">(50–60%)</span> for ultra-luxury resale properties.
            </p>
          </div>
          <div className="w-full h-px" style={{ background: cardBorder }} />
          <div className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22] mt-1.5 shrink-0" />
            <p className="text-[12px] md:text-[13px] leading-snug" style={{ color: bodyColor }}>
              Factor in service charge history: Emirates Hills community fees have averaged <span className="font-bold" style={{ color: isDark ? t.text : '#1A1A1A' }}>AED 8–12/sqft</span> annually, with modest annual adjustments aligned with amenity upgrades.
            </p>
          </div>
        </div>
      ),
      color: "#E67E22",
      bg: isDark ? 'rgba(230,126,34,0.1)' : '#FFF9F5',
      iconColor: "#E67E22",
      iconBg: isDark ? 'rgba(230,126,34,0.15)' : '#FFF4ED'
    }
  ];

  return (
    <div className="w-full max-w-360 mx-auto py-6">
      <div className="px-2 sm:px-4">
        <SectionHeader
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>}
          title="What This Means for Buyers & Investors"
          subtitle="Practical guidance for end-users and investors"
          isDark={isDark}
          t={t}
        />
      </div>

      {/* Desktop Grid / Mobile Accordion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`flex flex-col border-t-4 border-x border-b rounded-xl overflow-hidden transition-all duration-300 shadow-sm`}
            style={{ borderTopColor: section.color, borderColor: cardBorder, background: cardBg }}
          >
            <div
              className={`px-4 py-4 sm:px-5 sm:py-5 flex items-center justify-between cursor-pointer md:cursor-default`}
              style={{ background: section.bg }}
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm`}
                  style={{ background: section.iconBg, border: `1px solid ${cardBorder}` }}>
                  <div style={{ color: section.iconColor }}>{section.icon}</div>
                </div>
                <h3 className="font-bold text-[14px] md:text-[15px] leading-tight" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                  {section.title}
                </h3>
              </div>

              {/* Chevron only on Mobile */}
              <div className="md:hidden">
                {openSection === section.id ? <HiChevronUp className="text-gray-400" /> : <HiChevronDown className="text-gray-400" />}
              </div>
            </div>

            {/* Content: Visible on Desktop, Toggleable on Mobile */}
            <div className={`${openSection === section.id ? 'block' : 'hidden'} md:block p-5 sm:p-6 flex-1`}>
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Section Component ---

export default function Section2() {
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState('transactions');

  // Card colors matching TopDevelopersSection pattern
  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const sectionBg = isDark ? t.bg : "#FBF9F6";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

  const tabs = [
    { id: 'transactions', label: 'Transactions', icon: <HiOutlineChartBar /> },
    { id: 'price-history', label: 'Price History', icon: <HiOutlineChartPie /> },
    { id: 'rental-yield', label: 'Rental Yield', icon: <HiOutlineClock /> },
    { id: 'buyer-guide', label: 'Buyer Guide', icon: <HiOutlineBookOpen /> },
  ];

  return (
    <section className="w-full py-5 font-sans selection:bg-[#B68A35]/20" style={{ background: sectionBg }}>
      {/* Header Section */}
      <div className="relative w-full h-80 lg:h-100 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Home/Section3bg.webp"
            alt="Dubai Skyline"
            fill
            className="object-cover object-center grayscale-10"
            priority
          />
          <div className={`absolute inset-0 ${isDark ? "" : "bg-linear-to-r from-white via-white/85 to-transparent"}`} 
            style={isDark ? dark?.heroOverlayLeft : undefined} />
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-2 w-full">
          <h2 className="text-3xl lg:text-5xl font-serif mb-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>
            Current Market Value & Price History
            <span className="lg:hidden">—</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
            Emirates Hills by Emaar
          </h3>
          <p className="max-w-4xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
            Source Transparency: All transaction data presented below is aggregated from the Dubai Land Department (DLD) via DXBInteract.com, an official DLD data partner. Market values represent verified sales transactions and active listing data as of Q1 2026. Figures are estimates for informational purposes and may vary by plot position, customization, view, and condition. Always verify specific property details with a RERA-licensed broker and official DLD channels before transacting.
          </p>
        </div>
      </div>
      
      <div className="max-w-350 mx-auto">

        {/* Tab Navigation */}
        <div className="rounded-xl shadow-sm overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}` }}>
            <div className="flex w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex flex-col lg:flex-row items-center justify-center
                    gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative
                    ${activeTab === tab.id && !isDark ? 'text-[#B68A35] bg-[#FDF8F0]/50' : !isDark && activeTab !== tab.id ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50' : ''}
                  `}
                  style={
                    isDark && activeTab === tab.id
                      ? { color: GOLD, background: 'rgba(182,138,53,0.08)' }
                      : isDark && activeTab !== tab.id
                      ? { color: subtextColor, background: 'transparent' }
                      : undefined
                  }
                >
                  <span className="text-base lg:text-xl">{tab.icon}</span>
                  <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.id ? 'font-bold' : 'font-medium'}`}>
                    {tab.label}
                  </span>

                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-2 sm:p-6 lg:p-10 min-h-100 lg:min-h-125" style={{ background: cardBg }}>
            {activeTab === 'transactions' && <TransactionsView isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'price-history' && <PriceHistoryView isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'rental-yield' && <RentalYieldView isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'buyer-guide' && <BuyerGuideView isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
          </div>
        </div>

        {/* Global Footer Disclaimer */}
        <div className="p-2">
          <div className="mt-6 flex items-start gap-4 p-2 sm:p-5 rounded-xl" 
            style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
            <LuInfo className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
            <p className="text-[11px] uppercase tracking-wider font-bold leading-relaxed" style={{ color: subtextColor }}>
              Disclaimer: <span className="font-medium normal-case" style={{ color: bodyColor }}>All data is for educational and research purposes only. PropertyIntel.ae does not provide financial, legal, or investment advice. Market values, rental yields, and transaction data are estimates based on aggregated third-party sources and are subject to change.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}