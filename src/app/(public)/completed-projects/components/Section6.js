"use client";

import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Lightbulb,
  TrendingUp,
  DollarSign,
  Home,
  Info,
  Clock,
  LineChart,
} from "lucide-react";
import { LuInfo } from "react-icons/lu";
import { GrSun } from "react-icons/gr";
import Image from "next/image";
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function SourceNote({ text, isDark, bodyColor }) {
  return (
    <div className="flex gap-3 items-start mt-4 px-4 pb-4">
      <GrSun className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
      <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>{text}</p>
    </div>
  );
}

function InsightBox({ icon: Icon, title, children, isDark, cardBorder, bodyColor }) {
  return (
    <div className="mt-5 rounded-2xl p-4 sm:p-5 flex gap-3 items-start"
      style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(182,138,53,0.06)' : '#FAF9F6' }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
        <Icon className="w-5 h-5 text-[#B68A35]" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>{children}</p>
      </div>
    </div>
  );
}

function AccordionRow({ title, children, points, isOpen, onToggle, isDark, cardBorder, bodyColor, t }) {
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: cardBorder }}>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex gap-4 items-center p-4 text-left transition-colors ${isOpen ? "" : ""}`}
        style={{
          background: isOpen && isDark ? 'rgba(255,255,255,0.04)' : isOpen ? '#FAF9F6' : 'transparent'
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0 mt-0.5" />
        <span className="font-semibold text-sm sm:text-[15px] flex-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {title}
        </span>
        <span className="ml-auto shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-[#B68A35]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#B68A35]" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
          {children && <p className="text-sm leading-relaxed pl-5 mb-2" style={{ color: bodyColor }}>{children}</p>}
          {points && (
            <ul className="space-y-2 pl-5">
              {points.map((point, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-1.5" />
                  <span className="text-sm leading-relaxed" style={{ color: bodyColor }}>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

// ─── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function RentalYieldsTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "Actual Achieved Rental Yields "}
          <span className="text-[#B68A35]">
            {data?.header?.highlight || "— Last 12 Months (Verified Transactions)"}
          </span>
        </h3>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {/* Table Header */}
        <div className="hidden sm:grid sm:grid-cols-4 px-4 py-3"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderBottom: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Unit Configuration</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Avg. Annual Rent (Verified)</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Typical Lease Term</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Implied Gross Yield*</p>
        </div>

        {/* Table Body */}
        {data?.items?.map((item, idx) => (
          <div
            key={idx}
            className="border-b last:border-b-0 sm:grid sm:grid-cols-4 sm:items-center sm:px-4 sm:py-3"
            style={{ borderColor: cardBorder }}
          >
            <div className="p-4 sm:p-0 flex items-start sm:items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] mt-1.5 sm:mt-0 shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-[15px] flex items-center gap-3 flex-wrap" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                  <span className="truncate">{item.unitConfig}</span>
                  <span className="ml-0 inline-block text-[#B68A35] px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>{item.subConfig}</span>
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-start">
              <p className="text-lg lg:text-md font-bold text-[#B68A35] tracking-tight">
                {item.avgRent}
              </p>
            </div>

            <div className="hidden sm:flex items-center justify-start">
              <p className="text-sm" style={{ color: bodyColor }}>{item.leaseTerm}</p>
            </div>

            <div className="hidden sm:flex items-center justify-start">
              <span className="text-base lg:text-lg font-bold" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.yield}</span>
            </div>

            {/* Mobile view */}
            <div className="sm:hidden px-4 pb-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.unitConfig}</p>
                  <p className="text-xs mt-0.5" style={{ color: subtextColor }}>{item.subConfig}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#B68A35]">{item.avgRent}</p>
                  <p className="text-xs mt-1" style={{ color: bodyColor }}>{item.leaseTerm}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Yield:</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[#B68A35] text-xs font-semibold"
                  style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>{item.yield}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SourceNote text={data?.source || ""} isDark={isDark} bodyColor={bodyColor} />

      <InsightBox icon={Lightbulb} title={data?.insight?.title || "What the numbers indicate"} isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor}>
        {data?.insight?.content || ""}
      </InsightBox>
    </div>
  );
}

function ServiceChargesTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "Current Service Charges "}
          <span className="text-[#B68A35]">
            {data?.header?.highlight || "— Verified History & Transparency"}
          </span>
        </h3>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        <div className="hidden sm:grid sm:grid-cols-3 px-4 py-3"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderBottom: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Metric</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Value</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Source</p>
        </div>

        {data?.items?.map((item, idx) => {
          const Icon = getServiceIcon(item.iconName);
          return (
            <div
              key={idx}
              className="border-b last:border-b-0 sm:grid sm:grid-cols-3 sm:items-center sm:px-4 sm:py-3"
              style={{ borderColor: cardBorder }}
            >
              <div className="p-2 sm:p-0 flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
                  {Icon}
                </div>
                <p className="font-semibold text-sm sm:text-[15px]" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                  {item.metric}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#B68A35]">
                  {item.value}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs" style={{ color: subtextColor }}>{item.source}</p>
              </div>

              <div className="sm:hidden px-4 pb-3 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs" style={{ color: subtextColor }}>Value:</span>
                  <span className="text-sm font-semibold text-[#B68A35] text-right">
                    {item.value}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-xs" style={{ color: subtextColor }}>Source:</span>
                  <span className="text-xs text-right max-w-[60%]" style={{ color: subtextColor }}>
                    {item.source}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-4 sm:mx-5 mt-4">
        <h4 className="font-semibold text-sm mb-3" style={{ color: isDark ? t.text : '#1A1A1A' }}>{data?.whatFunds?.title || "What service charges fund:"}</h4>
        <ul className="space-y-2 text-sm">
          {data?.whatFunds?.items?.map((item, idx) => (
            <li key={idx} className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
              <span className="text-sm" style={{ color: bodyColor }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-4 sm:mx-5 mt-5">
        <button
          type="button"
          onClick={() => setOpenIdx(openIdx === 0 ? null : 0)}
          className="w-full flex gap-3 items-center p-4 text-left rounded-xl"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
          <span className="font-semibold text-sm flex-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>
            {data?.historicalContext?.title || "Historical Context & Buyer Guidance"}
          </span>
          {openIdx === 0 ? (
            <ChevronUp className="w-5 h-5 text-[#B68A35]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#B68A35]" />
          )}
        </button>
        {openIdx === 0 && (
          <div className="mt-3 px-4 pb-4 space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: isDark ? t.text : '#1A1A1A' }}>Historical context:</p>
              <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
                {data?.historicalContext?.context || ""}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: isDark ? t.text : '#1A1A1A' }}>Buyer guidance:</p>
              <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
                {data?.historicalContext?.guidance || ""}
              </p>
            </div>
          </div>
        )}
      </div>

      <SourceNote text={data?.source || ""} isDark={isDark} bodyColor={bodyColor} />
    </div>
  );
}

function SalesComparablesTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "Recent Sales Comparables "}
          <span className="text-[#B68A35]">
            {data?.header?.highlight || "— Verified DXBInteract Transactions (Last 12 Months)"}
          </span>
        </h3>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-2 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        <div className="hidden lg:grid lg:grid-cols-6 px-2 sm:px-4 py-2 sm:py-3"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderBottom: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Unit Type</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Built-up Area</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Sale Price</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Price/Sqft</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Date</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Plot Feature</p>
        </div>

        {data?.items?.map((item, idx) => (
          <div
            key={idx}
            className="border-b last:border-b-0 lg:grid lg:grid-cols-6 lg:items-center lg:px-4 lg:py-3"
            style={{ borderColor: cardBorder }}
          >
            <div className="p-4 lg:p-0">
              <p className="font-semibold text-sm lg:text-[15px]" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                {item.unitType}
              </p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm" style={{ color: bodyColor }}>{item.builtUp}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-[#B68A35]">{item.salePrice}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm" style={{ color: bodyColor }}>{item.pricePerSqft}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm" style={{ color: subtextColor }}>{item.date}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs" style={{ color: subtextColor }}>{item.feature}</p>
            </div>

            <div className="lg:hidden px-4 pb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Built-up:</span>
                <span className="text-sm font-medium" style={{ color: bodyColor }}>{item.builtUp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Sale Price:</span>
                <span className="text-sm font-semibold text-[#B68A35]">{item.salePrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Price/sqft:</span>
                <span className="text-sm font-medium" style={{ color: bodyColor }}>{item.pricePerSqft}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Date:</span>
                <span className="text-xs" style={{ color: subtextColor }}>{item.date}</span>
              </div>
              <div className="pt-2" style={{ borderTop: `1px solid ${cardBorder}` }}>
                <p className="text-xs" style={{ color: subtextColor }}>
                  <span className="font-medium">Feature:</span> {item.feature}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SourceNote text={data?.source || ""} isDark={isDark} bodyColor={bodyColor} />

      <InsightBox icon={TrendingUp} title={data?.insight?.title || "Market insight"} isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor}>
        {data?.insight?.content || ""}
      </InsightBox>
    </div>
  );
}

// ─── LESSONS LEARNED SECTION ─────────────────────────────────────────────────

function LessonsLearnedSection({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <div className="px-4 sm:px-5 py-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35]">{data?.header?.badge || "Post-Handover Reality"}</p>
        <h3 className="font-serif text-lg sm:text-xl mt-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "Lessons Learned & Current Considerations"}
        </h3>
      </div>

      <div className="divide-y" style={{ borderColor: cardBorder }}>
        {data?.items?.map((item, idx) => (
          <AccordionRow
            key={idx}
            title={item.title}
            isOpen={openIdx === idx}
            onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            points={item.points}
            isDark={isDark}
            cardBorder={cardBorder}
            bodyColor={bodyColor}
            t={t}
          >
            {item.content}
          </AccordionRow>
        ))}
      </div>
    </div>
  );
}

// ─── WHAT THIS MEANS SECTION ─────────────────────────────────────────────────

function WhatThisMeansSection({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openEndUser, setOpenEndUser] = useState(true);
  const [openInvestor, setOpenInvestor] = useState(false);
  const [openChecklist, setOpenChecklist] = useState(false);

  return (
    <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <div className="px-4 sm:px-5 py-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <h3 className="font-serif text-lg sm:text-xl" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "What This Means for Buyers"}
        </h3>
      </div>

      <div className="p-2 sm:p-4 space-y-4">
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          <button
            type="button"
            onClick={() => setOpenEndUser(!openEndUser)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openEndUser ? "" : ""}`}
            style={{ background: openEndUser && isDark ? 'rgba(255,255,255,0.04)' : openEndUser ? '#FAF9F6' : 'transparent' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
              <Home className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                {data?.endUser?.title || "For end-users seeking a primary residence"}
              </p>
            </div>
            {openEndUser ? (
              <ChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
            )}
          </button>
          {openEndUser && (
            <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
              <p className="text-sm leading-relaxed pl-[52px]" style={{ color: bodyColor }}>
                {data?.endUser?.content || ""}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          <button
            type="button"
            onClick={() => setOpenInvestor(!openInvestor)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openInvestor ? "" : ""}`}
            style={{ background: openInvestor && isDark ? 'rgba(255,255,255,0.04)' : openInvestor ? '#FAF9F6' : 'transparent' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
              <TrendingUp className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                {data?.investor?.title || "For investors evaluating resale or rental strategy"}
              </p>
            </div>
            {openInvestor ? (
              <ChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
            )}
          </button>
          {openInvestor && (
            <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
              <p className="text-sm leading-relaxed pl-[52px]" style={{ color: bodyColor }}>
                {data?.investor?.content || ""}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          <button
            type="button"
            onClick={() => setOpenChecklist(!openChecklist)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openChecklist ? "" : ""}`}
            style={{ background: openChecklist && isDark ? 'rgba(255,255,255,0.04)' : openChecklist ? '#FAF9F6' : 'transparent' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
              <CheckCircle className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                {data?.checklist?.title || "Key due diligence checklist"}
              </p>
            </div>
            {openChecklist ? (
              <ChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
            )}
          </button>
          {openChecklist && (
            <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
              <ul className="space-y-2 text-sm pl-[52px]">
                {data?.checklist?.items?.map((item, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
                    <span className="text-sm" style={{ color: bodyColor }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── HELPER FUNCTIONS FOR ICONS ─────────────────────────────────────────────

const getServiceIcon = (iconName) => {
  const icons = {
    'DollarSign': <DollarSign className="w-4 h-4 text-[#B68A35]" />,
    'Clock': <Clock className="w-4 h-4 text-[#B68A35]" />,
    'TrendingUp': <TrendingUp className="w-4 h-4 text-[#B68A35]" />,
    'LineChart': <LineChart className="w-4 h-4 text-[#B68A35]" />
  };
  return icons[iconName] || <DollarSign className="w-4 h-4 text-[#B68A35]" />;
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const TABS = [
  { key: "rentalYields", label: "Rental Yields", icon: DollarSign },
  { key: "serviceCharges", label: "Service Charges", icon: FileText },
  { key: "salesComparables", label: "Sales Comparables", icon: Home },
];

function Section6({ data }) {
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState("rentalYields");

  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const sectionBg = isDark ? t.bg : "#FCFBFA";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

  if (!data) {
    return (
      <section className="w-full font-sans" style={{ background: sectionBg }}>
        <div className="max-w-[1400px] mx-auto px-4 py-20">
          <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
        </div>
      </section>
    );
  }

  const renderTab = () => {
    if (activeTab === "rentalYields") return <RentalYieldsTab data={data.rentalYields} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    if (activeTab === "serviceCharges") return <ServiceChargesTab data={data.serviceCharges} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    return <SalesComparablesTab data={data.salesComparables} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
  };

  return (
    <section className="w-full font-sans antialiased" style={{ background: sectionBg }}>
      <div className="relative w-full h-80 lg:h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage || "/Home/Section3bg.webp"}
            alt={data.heroAlt || "Emirates Hills luxury villas"}
            fill
            className="object-cover object-center"
            priority
          />
          <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`}
            style={isDark ? dark?.heroOverlayLeft : undefined} />
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
          <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
            {data.headings?.line1 || "Financial Reality — "}<span className="text-[#B68A35] italic">{data.headings?.highlight || "Emirates Hills"}</span> {data.headings?.line2 || "by Emaar"}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-medium" style={{ color: bodyColor }}>
            {data.headings?.subtitle || "ROI, Service Charges & Comparables"}
          </p>
        </div>
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-2 sm:px-6 pb-5 sm:pb-10 -mt-24 sm:-mt-28 lg:-mt-32">
        <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-4 sm:p-5 flex gap-3 items-start"
          style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
            <ShieldCheck className="w-5 h-5 text-[#B68A35]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">{data.sourceTransparency?.title || "Source Transparency"}</p>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
              {data.sourceTransparency?.content || ""}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl shadow-sm overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}` }}>
            <div className="flex w-full overflow-x-auto">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative ${activeTab === tab.key && !isDark ? "text-[#B68A35] bg-[#FDF8F0]/50" : !isDark && activeTab !== tab.key ? "text-gray-400 hover:text-gray-600 hover:bg-gray-50" : ""}`}
                    style={
                      isDark && activeTab === tab.key
                        ? { color: GOLD, background: 'rgba(182,138,53,0.08)' }
                        : isDark && activeTab !== tab.key
                          ? { color: subtextColor, background: 'transparent' }
                          : undefined
                    }
                  >
                    <span className="text-base lg:text-xl"><Icon /></span>
                    <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.key ? "font-bold" : "font-medium"}`}>
                      {tab.label}
                    </span>
                    {activeTab === tab.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pb-5">{renderTab()}</div>
        </div>

        <LessonsLearnedSection data={data.lessonsLearned} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

        <WhatThisMeansSection data={data.whatThisMeans} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

        <div className="mt-6 rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start"
          style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
          <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
          <p className="text-xs lg:text-sm leading-relaxed" style={{ color: bodyColor }}>
            {data.footerDisclaimer || ""}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section6;