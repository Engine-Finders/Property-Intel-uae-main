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

const FinancialsTab = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => (
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left: Performance */}
    <div className="flex-1">
      <SectionLabel isDark={isDark}>{data?.performanceLabel || "Financial Performance — FY 2025"}</SectionLabel>
      <GoldDivider isDark={isDark} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {data?.financialPerformance?.map((item, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl`}
            style={{ border: `1px solid ${cardBorder}`, background: cardBg }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                <span className="text-[#B68A35] text-3xl">{getFinancialIcon(item.iconName)}</span>
              </div>
              <span className={`text-[12px] font-medium`} style={{ color: subtextColor }}>{item.label}</span>
            </div>

            <div className={`text-2xl lg:text-2xl font-semibold font-[Merriweather] tabular-nums mb-2`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
              {item.value}
            </div>

            {item.growth && (
              <div className="flex items-center gap-1 text-emerald-600 mb-2">
                <BsArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-bold">{item.growth}</span>
              </div>
            )}

            <span className={`text-[10px]`} style={{ color: subtextColor }}>{item.sub}</span>
          </div>
        ))}
      </div>

      <p className={`text-[10px] mt-3 italic`} style={{ color: subtextColor }}>
        {data?.sourceNote || "Source: Emaar Annual Report 2025 via Gulf News / Yahoo Finance"}
      </p>
    </div>

    {/* Right: Debt Metrics + ESG */}
    <div className={`lg:w-[300px] xl:w-[340px] shrink-0 rounded-xl p-4`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF8F4' }}>
      <SectionLabel isDark={isDark}>{data?.debtLabel || "Debt & Liquidity Metrics"}</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="flex flex-col gap-0 mt-3">
        {data?.debtMetrics?.map((m, i) => (
          <div key={i} className={`flex items-center justify-between py-2.5 border-b last:border-b-0`} style={{ borderBottomColor: cardBorder }}>
            <div className="flex items-center gap-2">
              <span className={`text-base ${isDark ? 'text-[#B68A35]/70' : 'text-[#B68A35]/80'}`}>{getDebtIcon(m.iconName)}</span>
              <span className={`text-[12px]`} style={{ color: bodyColor }}>{m.label}</span>
            </div>
            <span className={`text-[13px] font-semibold tabular-nums`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{m.value}</span>
          </div>
        ))}
      </div>
      <p className={`text-[10px] mt-3 italic`} style={{ color: subtextColor }}>
        {data?.debtSourceNote || "Source: Calculated from Emaar Annual Report 2025 via Yahoo Finance / AInvest"}
      </p>

      {/* ESG */}
      {data?.esg && (
        <div className={`mt-4 rounded-xl p-3 flex items-center justify-between`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(0,0,0,0.3)' : '#F1FAF1' }}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
              <BsPatchCheck className="text-emerald-600 w-4 h-4" />
            </div>
            <div>
              <p className={`text-[10px] font-medium`} style={{ color: subtextColor }}>{data.esg.label}</p>
              <p className={`text-[11px]`} style={{ color: subtextColor }}>{data.esg.date}</p>
            </div>
          </div>
          <span className="text-3xl font-serif font-bold text-emerald-600">{data.esg.rating}</span>
        </div>
      )}
    </div>
  </div>
);

// ─── Tab: Market ─────────────────────────────────────────────────────────────

const MarketTab = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Column 1: Market Position */}
    <div className={`rounded-xl p-6`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <SectionLabel isDark={isDark}>{data?.marketPosition?.title || "Market Position"}</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="mt-6 flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
          <MdOutlineLeaderboard className="text-[#B68A35] w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className={`text-[11px] font-semibold tracking-wider uppercase`} style={{ color: subtextColor }}>{data?.marketPosition?.label || "Market Share"}</p>
          <p className={`text-3xl font-serif font-semibold mt-1`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
            AED <span className="text-[#B68A35]">{data?.marketPosition?.value}</span>
          </p>
          <p className={`text-[12px] mt-2 leading-relaxed`} style={{ color: bodyColor }}>
            {data?.marketPosition?.description}
          </p>
          <p className={`text-[10px] mt-3 italic leading-relaxed`} style={{ color: subtextColor }}>
            {data?.marketPosition?.source}
          </p>
        </div>
      </div>
    </div>

    {/* Column 2: Industry Rank */}
    <div className={`rounded-xl p-6`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <SectionLabel isDark={isDark}>{data?.industryRank?.title || "Industry Rank"}</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="mt-6 flex flex-col gap-4">
        {data?.industryRank?.items?.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                {getRankIcon(item.iconName)}
              </div>
              <div>
                <p className={`text-2xl font-serif font-bold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{item.rank}</p>
                <p className={`text-[12px] leading-relaxed`} style={{ color: bodyColor }}>{item.description}</p>
              </div>
            </div>
            {idx < data.industryRank.items.length - 1 && <div className={`h-px my-4`} style={{ background: cardBorder }} />}
          </div>
        ))}
      </div>
      <p className={`text-[10px] mt-5 italic leading-relaxed`} style={{ color: subtextColor }}>
        {data?.industryRank?.source}
      </p>
    </div>

    {/* Column 3: Segment Strengths */}
    <div className={`rounded-xl p-6`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <SectionLabel isDark={isDark}>{data?.segmentStrengths?.title || "Segment Strengths"}</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="mt-6 flex flex-col gap-4">
        {data?.segmentStrengths?.items?.map((item, idx) => (
          <div key={idx}>
            <div className="flex gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                {getSegmentIcon(item.iconName)}
              </div>
              <div>
                <p className={`text-[14px] font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{item.title}</p>
                <p className={`text-[12px] mt-1 leading-relaxed`} style={{ color: bodyColor }}>{item.description}</p>
              </div>
            </div>
            {idx < data.segmentStrengths.items.length - 1 && <div className={`h-px my-4`} style={{ background: cardBorder }} />}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Tab: Pipeline ────────────────────────────────────────────────────────────

const PipelineTab = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
  const landHoldingsData = data?.landHoldings || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

      {/* Left Column: Land Bank & Key Holdings */}
      <div className="lg:col-span-3 flex flex-col gap-8">
        <div>
          <SectionLabel isDark={isDark}>{data?.landBankTitle || "Land Bank & Future Capacity"}</SectionLabel>
          <GoldDivider isDark={isDark} />
        </div>

        {/* Land Bank Cards */}
        <div className="grid grid-cols-2 gap-4">
          {data?.landBankStats?.map((stat, idx) => (
            <div key={idx} className={`rounded-xl p-4 text-center`} style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF8F4' }}>
              <p className={`text-[10px] font-semibold tracking-wider uppercase mb-1`} style={{ color: subtextColor }}>{stat.label}</p>
              <p className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#B68A35]'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Estimated Value Note */}
        <div className={`text-[11px] italic`} style={{ color: subtextColor }}>
          {data?.landValueNote}
        </div>

        {/* Key Land Holdings */}
        <div>
          <SectionLabel isDark={isDark}>{data?.keyHoldingsTitle || "Key Land Holdings"}</SectionLabel>
          <GoldDivider isDark={isDark} />

          {/* Mobile View: List Cards */}
          <div className="flex flex-col gap-3 mt-4 lg:hidden">
            {landHoldingsData.map((h, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 rounded-xl`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                  <span className={isDark ? 'text-[#B68A35]' : 'text-[#B68A35]'}>{getPinIcon(h.iconName)}</span>
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
                    <span className={`text-[#B68A35]`}>{getPinIcon(h.iconName)}</span>
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
          <SectionLabel isDark={isDark}>{data?.pipelineTitle || "Project Pipeline"}</SectionLabel>
          <GoldDivider isDark={isDark} />
        </div>

        <div className="flex flex-col gap-4">
          {data?.pipelineStats?.map((stat, idx) => (
            <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                {getPipelineIcon(stat.iconName)}
              </div>
              <div className="flex-1 pt-1">
                <p className={`text-sm font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{stat.title}</p>
                {stat.description && <p className={`text-[11px] mt-0.5 leading-relaxed`} style={{ color: bodyColor }}>{stat.description}</p>}
              </div>
              <div className="text-right shrink-0">
                <p className={`text-3xl font-serif font-bold text-[#B68A35]`}>{stat.value}</p>
                {stat.sub && <p className={`text-[11px]`} style={{ color: subtextColor }}>{stat.sub}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className={`text-[10px] italic leading-relaxed`} style={{ color: subtextColor }}>
          {data?.pipelineSourceNote}
        </div>
      </div>
    </div>
  );
};

// ─── Tab: Ratings ─────────────────────────────────────────────────────────────

const RatingsTab = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => (
  <div className="flex flex-col gap-6">
    <div>
      <SectionLabel isDark={isDark}>{data?.title || "Credit Ratings"}</SectionLabel>
      <GoldDivider isDark={isDark} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {data?.ratings?.map((r, i) => (
          <div
            key={i}
            className={`rounded-xl p-6`}
            style={{ border: `1px solid ${cardBorder}`, background: cardBg }}
          >
            <div className="flex items-start gap-4">
              <div className={`px-4 py-4 rounded-lg shrink-0`} style={isDark ? { background: 'rgba(182,138,53,0.12)' } : { background: '#FFFBF3' }}>
                <span className="text-2xl font-serif font-bold text-[#B68A35]">{r.rating}</span>
              </div>

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

const SourcesAccordion = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
  const [open, setOpen] = useState(false);
  const [analyticOpen, setAnalyticOpen] = useState(false);

  const sourceData = data?.sources || [];
  const analystCommentary = data?.analystCommentary;

  return (
    <div className="flex flex-col gap-2">
      {/* Analyst Commentary accordion */}
      {analystCommentary && (
        <div className={`rounded lg:rounded-xl overflow-hidden transition-colors duration-300`} style={{ border: `1px solid ${cardBorder}` }}>
          <button
            onClick={() => setAnalyticOpen(!analyticOpen)}
            className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? "hover:bg-slate-800/40" : "hover:bg-[#FAF6EE]"}`}
            style={{ background: cardBg }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="lg:hidden flex items-stretch gap-3 shrink-0">
                <span className="w-px self-stretch" style={{ background: GOLD }} aria-hidden />
                <BsBarChartLine className="text-[#B68A35] w-4 h-4" />
              </div>
              <div className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center shrink-0" style={!isDark ? { background: "#FAF6EE" } : { background: "rgba(182,138,53,0.12)" }}>
                <BsBarChartLine className="text-[#B68A35] w-4 h-4" />
              </div>
              <span className="text-[12px] leading-normal lg:text-[13px] font-semibold" style={isDark ? { color: t.text } : { color: "#1A1A1A" }}>{analystCommentary.title}</span>
            </div>
            {analyticOpen ? <BsChevronUp className="w-4 h-4 shrink-0" style={{ color: subtextColor }} /> : <BsChevronDown className="w-4 h-4 shrink-0" style={{ color: subtextColor }} />}
          </button>
          {analyticOpen && (
            <div className="px-4 pb-4 border-t text-[13px] leading-normal lg:text-[12px] lg:leading-relaxed" style={{ borderTopColor: cardBorder, background: cardBg }}>
              <div className={`mt-3 p-3 rounded-lg`} style={isDark ? { background: 'rgba(255,255,255,0.04)' } : { background: 'white' }}>
                <p className="leading-relaxed" style={{ color: bodyColor }}>
                  {analystCommentary.content}
                </p>
                <p className={`text-[10px] mt-2 italic`} style={{ color: subtextColor }}>Source: {analystCommentary.source}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sources accordion */}
      <div className={`rounded lg:rounded-xl overflow-hidden transition-colors duration-300`} style={{ border: `1px solid ${cardBorder}` }}>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? "hover:bg-slate-800/40" : "hover:bg-[#FAF6EE]"}`}
          style={{ background: cardBg }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="lg:hidden flex items-stretch gap-3 shrink-0">
              <span className="w-px self-stretch" style={{ background: GOLD }} aria-hidden />
              <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
            </div>
            <div className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center shrink-0" style={!isDark ? { background: "#FAF6EE" } : { background: "rgba(182,138,53,0.12)" }}>
              <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
            </div>
            <span className="text-[12px] leading-normal lg:text-[13px] font-semibold" style={isDark ? { color: t.text } : { color: "#1A1A1A" }}>{data?.sourcesTitle || "Sources & Verification"}</span>
            <span className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full shrink-0" style={!isDark ? { background: "#FAF6EE", color: "#6B7280" } : { background: "rgba(182,138,53,0.12)", color: subtextColor }}>
              {sourceData.length} Financial & Regulatory Sources
            </span>
          </div>
          {open ? <BsChevronUp className="w-4 h-4 shrink-0" style={{ color: subtextColor }} /> : <BsChevronDown className="w-4 h-4 shrink-0" style={{ color: subtextColor }} />}
        </button>
        {open && (
          <div style={{ borderTop: `1px solid ${cardBorder}`, background: cardBg }}>
            {sourceData.map((s, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-4 py-3 border-b text-[12px] leading-normal lg:text-[11px] last:border-b-0"
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

const Section8 = ({ data }) => {
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState('financials');

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

  const tabs = data.tabs || [
    { id: 'financials', label: 'Financials', iconName: 'TbChartBar' },
    { id: 'market', label: 'Market', iconName: 'BsBarChartLine' },
    { id: 'pipeline', label: 'Pipeline', iconName: 'TbRocket' },
    { id: 'ratings', label: 'Ratings', iconName: 'BsShieldCheck' },
  ];

  const statTiles = data.statTiles || [];

  const headerDescription = data.header?.description || "Analysis of Emaar Properties' financial strength, market share, and development pipeline based on audited financial reports and DLD data.";

  return (
    <section className={`w-full font-sans antialiased transition-colors duration-300`} style={{ background: sectionBg }}>
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
              {data.header?.title?.line1 || "Emaar Financial Health & Market"}
              <span className="block text-[#B68A35]">{data.header?.title?.line2 || "Position - Investor Analysis"}</span>
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
            {data.header?.title?.line1 || "Emaar Financial Health & Market"}
            <span className="lg:hidden">—</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
            {data.header?.title?.line2 || "Position - Investor Analysis"}
          </h3>
          <p className="max-w-xl text-sm lg:text-base leading-[17px] font-medium" style={{ color: bodyColor }}>
            {headerDescription}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 pb-16">
        {/* ── Stat Tiles (ref: 3-column status bar) ── */}
        <div
          className="relative z-20 -mt-10 sm:-mt-16 lg:-mt-14 mb-5 rounded lg:rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${cardBorder}`, background: cardBg }}
        >
          <div className="grid grid-cols-3">
            {statTiles.map((tile, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center text-center px-2 py-5 sm:px-4 sm:py-6 gap-1.5 sm:gap-2 ${i < statTiles.length - 1 ? "border-r" : ""}`}
                style={{ borderColor: cardBorder }}
              >
                <div className="text-[#B68A35] text-xl sm:text-2xl">
                  {getStatTileIcon(tile.iconName)}
                </div>
                <p className="text-[10px] sm:text-[11px] font-medium leading-normal" style={{ color: subtextColor }}>
                  {tile.label}
                </p>
                <p className="text-sm sm:text-lg font-serif font-semibold leading-tight px-1" style={isDark ? { color: t.text } : { color: "#1A1A1A" }}>
                  {tile.value}
                </p>
                {tile.sub && (
                  <p className="text-[9px] sm:text-[10px] leading-normal px-1 hidden sm:block" style={{ color: subtextColor }}>
                    {tile.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs (ref: icon + label, gold active underline) ── */}
        <div className="rounded lg:rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}`, background: isDark ? cardBg : "#FFFFFF" }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = getTabIconComponent(tab.iconName);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3.5 sm:py-4 px-1 sm:px-2 transition-colors duration-200 min-w-0
                    ${isActive && !isDark ? "text-[#B68A35] bg-white font-semibold" : !isDark && !isActive ? "text-slate-500 bg-[#FAF9F6]" : ""}
                  `}
                  style={
                    isDark && isActive
                      ? { color: GOLD, background: cardBg, fontWeight: 600 }
                      : isDark && !isActive
                        ? { color: subtextColor, background: "transparent" }
                        : undefined
                  }
                >
                  <TabIcon className={`w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 ${isActive ? "text-[#B68A35]" : isDark ? "" : "text-slate-500"}`} style={isDark && !isActive ? { color: subtextColor } : undefined} />
                  <span className={`text-[10px] sm:text-xs leading-tight text-center ${isActive ? "font-semibold" : "font-medium"}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" aria-hidden />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="p-4 sm:p-5 lg:p-6">
            {activeTab === 'financials' && <FinancialsTab data={data.financials} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'market' && <MarketTab data={data.market} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'pipeline' && <PipelineTab data={data.pipeline} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
            {activeTab === 'ratings' && <RatingsTab data={data.ratings} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
          </div>
        </div>

        {/* ── Accordions ── */}
        <div className="mt-4">
          <SourcesAccordion data={data.sourcesAccordion} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />
        </div>

        <ExpertSection />

        {/* ── Disclaimer ── */}
        <div className="mt-4 rounded lg:rounded-xl p-4" style={{ border: `1px solid ${cardBorder}`, background: isDark ? "rgba(255,255,255,0.04)" : "#FAF8F4" }}>
          <div className="lg:hidden">
            <MobileNoteBox icon={<BsShieldCheck className="w-5 h-5" />} textStyle={{ color: subtextColor }}>
              <span className="font-semibold" style={isDark ? { color: t.text } : { color: "#1A1A1A" }}>{data.disclaimer?.title || "Disclaimer "}</span>
              {" "}{data.disclaimer?.text || "All financial data sourced from publicly available reports and regulatory filings. Placeholder values indicate backend-populated data for real-time accuracy."}
            </MobileNoteBox>
            <div className="mt-3 flex items-center gap-2 text-[11px] leading-normal" style={{ color: subtextColor }}>
              <BsCalendar3 className="w-3.5 h-3.5 shrink-0 text-[#B68A35]" />
              <span>{data.disclaimer?.lastUpdated || "Last updated: 22 February 2026"}</span>
            </div>
          </div>
          <div className="hidden lg:flex flex-row items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <BsShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: subtextColor }} />
              <div>
                <span className="text-[11px] font-semibold" style={{ color: subtextColor }}>{data.disclaimer?.title || "Disclaimer "}</span>
                <span className="text-[11px]" style={{ color: subtextColor }}>
                  {data.disclaimer?.text || "All financial data sourced from publicly available reports and regulatory filings. Placeholder values indicate backend-populated data for real-time accuracy."}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-[11px]" style={{ color: subtextColor }}>
              <BsCalendar3 className="w-3.5 h-3.5" />
              <span>{data.disclaimer?.lastUpdated || "Last updated: 22 February 2026"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper functions for icons
const getFinancialIcon = (iconName) => {
  const icons = {
    'PiChartLineUpLight': <PiChartLineUpLight className="text-2xl lg:text-3xl" />,
    'LiaMoneyBillWaveAltSolid': <LiaMoneyBillWaveAltSolid className="text-2xl lg:text-3xl" />,
    'HiOutlineChartPie': <HiOutlineChartPie className="text-2xl lg:text-3xl" />,
    'IoWalletOutline': <IoWalletOutline className="text-2xl lg:text-3xl" />
  };
  return icons[iconName] || <PiChartLineUpLight className="text-2xl lg:text-3xl" />;
};

const getDebtIcon = (iconName) => {
  const icons = {
    'TbBuildingBank': <TbBuildingBank className="w-4 h-4" />,
    'MdOutlineBalance': <MdOutlineBalance className="w-4 h-4" />,
    'MdOutlineSpeed': <MdOutlineSpeed className="w-4 h-4" />,
    'RiLineChartLine': <RiLineChartLine className="w-4 h-4" />,
    'MdOutlineWaterDrop': <MdOutlineWaterDrop className="w-4 h-4" />
  };
  return icons[iconName] || <TbBuildingBank className="w-4 h-4" />;
};

const getRankIcon = (iconName) => {
  const icons = {
    'BsAward': <BsAward className="text-[#B68A35] w-6 h-6" />,
    'BsGlobe2': <BsGlobe2 className="text-[#B68A35] w-6 h-6" />
  };
  return icons[iconName] || <BsAward className="text-[#B68A35] w-6 h-6" />;
};

const getSegmentIcon = (iconName) => {
  const icons = {
    'TbHome': <TbHome className="text-[#B68A35] w-6 h-6" />,
    'TbBuildingSkyscraper': <TbBuildingSkyscraper className="text-[#B68A35] w-6 h-6" />
  };
  return icons[iconName] || <TbHome className="text-[#B68A35] w-6 h-6" />;
};

const getPinIcon = (iconName) => {
  const icons = {
    'TbMapPin': <TbMapPin className="w-5 h-5" />
  };
  return icons[iconName] || <TbMapPin className="w-5 h-5" />;
};

const getPipelineIcon = (iconName) => {
  const icons = {
    'TbRocket': <TbRocket className="w-6 h-6 text-[#B68A35]" />,
    'GoPeople': <GoPeople className="w-6 h-6 text-[#B68A35]" />,
    'TbStack2': <TbStack2 className="w-6 h-6 text-[#B68A35]" />
  };
  return icons[iconName] || <TbRocket className="w-6 h-6 text-[#B68A35]" />;
};

const getStatTileIcon = (iconName) => {
  const icons = {
    'CiBank': <CiBank className="text-[#B68A35] text-xl lg:text-2xl" />,
    'BsBarChartLine': <BsBarChartLine className="text-[#B68A35] text-xl lg:text-2xl" />,
    'LiaCoinsSolid': <LiaCoinsSolid className="text-[#B68A35] text-xl lg:text-2xl" />
  };
  return icons[iconName] || <CiBank className="text-[#B68A35] text-xl lg:text-2xl" />;
};

const getTabIconComponent = (iconName) => {
  const icons = {
    TbChartBar: IoWalletOutline,
    IoWalletOutline: IoWalletOutline,
    BsBarChartLine: BsBarChartLine,
    TbRocket: TbStack2,
    TbStack2: TbStack2,
    BsShieldCheck: BsShieldCheck,
  };
  return icons[iconName] || IoWalletOutline;
};

export default Section8;