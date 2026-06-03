"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    HiOutlineShieldCheck,
    HiOutlineLightBulb,
    HiOutlineClipboard,
    HiChevronUp,
    HiChevronDown,
} from "react-icons/hi2";
import { LuInfo, LuDatabase } from "react-icons/lu";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaTree, FaChartLine, FaTools, FaMoneyBillWave, FaCar, FaClock, FaThumbsUp, FaMeh, FaUsers } from "react-icons/fa";
import { GiGolfFlag } from "react-icons/gi";
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

const SectionHeader = ({ icon, title, subtitle, isDark, t }) => (
    <div className="flex items-start gap-4 mb-8">
        {icon ? (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm" 
                style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                {icon}
            </div>
        ) : null}
        <div>
            <h3 className="font-semibold font-[Merriweather] tabular-nums text-lg sm:text-xl leading-tight" 
                style={{ color: isDark ? t.text : '#1A1A1A' }}>{title}</h3>
            {subtitle ? <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{subtitle}</p> : null}
        </div>
    </div>
);

// Tab button component
const TabButton = ({ id, active, onClick, children, icon, isDark }) => {
    const Icon = icon;
    return (
        <button
            id={`tab-${id}`}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={onClick}
            className={`
                flex-1 flex flex-col lg:flex-row items-center justify-center
                gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative
                ${active && !isDark ? "text-[#B68A35] bg-white" : !isDark && !active ? "text-gray-400 hover:text-gray-600 hover:bg-gray-50" : ""}
            `}
            style={
                isDark && active
                    ? { color: GOLD, background: 'rgba(182,138,53,0.08)' }
                    : isDark && !active
                    ? { color: 'rgba(255,255,255,0.4)', background: 'transparent' }
                    : undefined
            }
        >
            <span className="text-base lg:text-xl"><Icon className="text-current" /></span>
            <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${active ? "font-bold" : "font-medium"}`}>
                {children}
            </span>
            {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35]" />}
        </button>
    );
};

// Checkmark component
const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

export default function Section4() {
    const { t, isDark, dark } = useThemeStyles();
    const [openMethodology, setOpenMethodology] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [openSource, setOpenSource] = useState(false);
    const [activeTab, setActiveTab] = useState("strengths");

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FBF9F6";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    const methodologyItems = [
        {
            title: "Verified Ownership Check",
            desc: "Reviews filtered against DXBInteract transaction records to confirm the reviewer held a title deed or registered tenancy contract (Ejari) during the review period."
        },
        {
            title: "Timeframe Segmentation",
            desc: "Feedback categorized by era (Early Phase 2003–2010, Mature Phase 2011–2020, Current Phase 2021–2026) to track changes in community management over time."
        },
        {
            title: "Source Diversity",
            desc: "Data drawn from Google Maps, independent property forums, and verified listing platforms."
        },
        {
            title: "Negative Reviews Included",
            desc: "Constructive criticism is retained to provide a balanced view for prospective buyers."
        },
    ];

    const strengths = [
        {
            title: "Security & Privacy",
            rating: "5/5",
            desc: "Guards verify all visitors. Gated entry is strict. Ideal for high-profile residents seeking discretion.",
            icon: <HiOutlineShieldCheck className="text-[#B68A35] text-xl" />
        },
        {
            title: "Mature Landscaping",
            rating: "20+ years",
            desc: "Year-old tree canopy, established lakes, and manicured grounds offer immediate livability that new communities cannot replicate.",
            icon: <FaTree className="text-[#B68A35] text-xl" />
        },
        {
            title: "Capital Stability",
            rating: "Stable",
            desc: "Long-term owners report stable property values even during market corrections (2009, 2015, 2020).",
            icon: <FaChartLine className="text-[#B68A35] text-xl" />
        },
        {
            title: "Golf Course Access",
            rating: "Direct",
            desc: "Montgomerie Golf Club membership and lake views are frequently cited as major lifestyle benefits.",
            icon: <GiGolfFlag className="text-[#B68A35] text-xl" />
        },
    ];

    const insights = [
        {
            theme: "Maintenance Response",
            feedback: "Urgent issues resolved within 24 hours. Cosmetic requests take 3–5 days.",
            meaning: "Premium service charges fund urgent response, but non-urgent tasks may have slight delays.",
            icon: <FaTools className="text-[#B68A35] text-xl" />
        },
        {
            theme: "Renovation Approvals",
            feedback: "Exterior modifications require Emaar approval. Typical review timeline: 4–8 weeks.",
            meaning: "Strict rules preserve community aesthetics. If you plan major renovations, budget for permitting timelines.",
            icon: <HiOutlineClipboard className="text-[#B68A35] text-xl" />
        },
        {
            theme: "Service Charge Increases",
            feedback: "Reported increases of 3–5% annually. Some owners find this steep compared to newer communities.",
            meaning: "Higher charges fund mature infrastructure upkeep. Budget for AED 15–25/sqft annually.",
            icon: <FaMoneyBillWave className="text-[#B68A35] text-xl" />
        },
        {
            theme: "Traffic at Peak Hours",
            feedback: "Congestion at main gate during school hours (7–8 AM) and evening peak (5–7 PM).",
            meaning: "Plan commutes outside these windows. Internal roads remain clear.",
            icon: <FaCar className="text-[#B68A35] text-xl" />
        },
        {
            theme: "Age-Related Maintenance",
            feedback: "Villas from Phase 1 (2003–2005) may require HVAC, electrical, or exterior finish updates.",
            meaning: "Commission an independent building survey before purchase to identify property-specific needs.",
            icon: <FaClock className="text-[#B68A35] text-xl" />
        },
    ];

    const sentiments = [
        { label: "Positive", pct: "78%", color: "#27AE60", themes: "Privacy, Security, Mature Landscaping, Capital Stability, Golf Course Access", icon: <FaThumbsUp className="text-[#27AE60] text-lg" /> },
        { label: "Neutral", pct: "14%", color: "#9CA3AF", themes: "Service Charge Increases, Renovation Restrictions, Traffic at Peak Hours", icon: <FaMeh className="text-gray-500 text-lg" /> },
        { label: "Constructive", pct: "8%", color: "#E67E22", themes: "Aging Infrastructure in Early Phases, Maintenance Response Times, Strict Community Rules", icon: <HiOutlineLightBulb className="text-[#E67E22] text-lg" /> },
    ];

    return (
        <section className="w-full py-5 sm:py-10 font-sans selection:bg-[#B68A35]/20" style={{ background: sectionBg }}>
            {/* ── Hero Header ──────────────────────────────────────────────────── */}
            <div className="relative w-full h-80 lg:h-96 flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Home/Section3bg.webp"
                        alt="Emirates Hills"
                        fill
                        className="object-cover object-center grayscale-10"
                        priority
                    />
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} 
                        style={isDark ? dark?.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        Resident & Owner
                    </h2>
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        Reviews from{" "}
                        <span className="text-[#B68A35]">Emirates Hills</span> by Emaar
                    </h2>
                </div>
            </div>

            {/* ── Content Area ─────────────────────────────────────────────────── */}
            <div className="relative z-20 max-w-[1400px] mx-auto px-2 sm:px-6 pb-5 sm:pb-10 -mt-24 sm:-mt-28 lg:-mt-22">

                {/* The Resident Verdict */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 rounded-2xl p-6 shadow-sm" 
                        style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                        <div className="flex items-start gap-3 mb-6">
                            <div>
                                <h3 className="font-semibold font-[Merriweather] tabular-nums text-lg sm:text-xl leading-tight" 
                                    style={{ color: isDark ? t.text : '#1A1A1A' }}>
                                    The Resident <span className="text-[#B68A35]">Verdict</span>
                                </h3>
                                <p className="text-[10px] mt-1" style={{ color: bodyColor }}>340+ verified reviews • 2003-Q1 2026</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center py-4">
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke={isDark ? 'rgba(255,255,255,0.1)' : '#F3EFE9'} strokeWidth="8" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#B68A35"
                                        strokeWidth="8"
                                        strokeDasharray="283"
                                        strokeDashoffset="62"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-[#B68A35] font-[Merriweather]">78%</span>
                                    <span className="text-[10px] uppercase tracking-wider mt-1" style={{ color: bodyColor }}>Positive<br />Sentiment</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-6 pt-6" style={{ borderTop: `1px solid ${cardBorder}` }}>
                            {[
                                { pct: "14%", label: "Neutral", color: "#9CA3AF" },
                                { pct: "8%", label: "Constructive", color: "#E67E22" },
                                { pct: "340+", label: "Reviews", color: "#B68A35" }
                            ].map((item, i) => (
                                <div key={i} className="text-center p-2 rounded-lg" 
                                    style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#f0f0f0' }}>
                                    <p className="text-lg font-bold" style={{ color: item.color }}>{item.pct}</p>
                                    <p className="text-[10px] uppercase" style={{ color: subtextColor }}>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 rounded-2xl p-2 sm:p-6 shadow-sm" 
                        style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                        <SectionHeader
                            title="Is Emirates Hills a Good Place to Live? What Owners Actually Say"
                            subtitle="Based on verified reviews collected over the last 24 months:"
                            isDark={isDark}
                            t={t}
                        />

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-hidden rounded-xl" 
                            style={{ border: `1px solid ${cardBorder}` }}>
                            <table className="w-full">
                                <thead>
                                    <tr style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
                                        <th className="p-4 text-left text-[10px] font-bold uppercase tracking-wider w-1/4" style={{ color: subtextColor }}>Sentiment</th>
                                        <th className="p-4 text-left text-[10px] font-bold uppercase tracking-wider w-1/4" style={{ color: subtextColor }}>Percentage</th>
                                        <th className="p-4 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: subtextColor }}>Key Themes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ borderColor: cardBorder }}>
                                    {sentiments.map((item, i) => (
                                        <tr key={i} className="transition-colors" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                                                    <span className="font-semibold text-sm" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.label}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="font-bold text-sm" style={{ color: item.color }}>{item.pct}</span>
                                            </td>
                                            <td className="p-4 text-[13px]" style={{ color: bodyColor }}>{item.themes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden">
                            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
                                <div className="flex px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: subtextColor }}>
                                    <div className="w-1/3">Sentiment</div>
                                    <div className="w-1/5 text-center">%</div>
                                    <div className="flex-1">Key themes</div>
                                </div>

                                <div className="divide-y" style={{ borderColor: cardBorder }}>
                                    {sentiments.map((item, i) => (
                                        <div key={i} className="flex items-start px-4 py-3" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                                            <div className="w-1/3 flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                                <span className="font-semibold text-sm" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.label}</span>
                                            </div>
                                            <div className="w-1/5 text-center">
                                                <span className="font-bold text-sm" style={{ color: item.color }}>{item.pct}</span>
                                            </div>
                                            <div className="flex-1 pl-3">
                                                <p className="text-[12px]" style={{ color: bodyColor }}>{item.themes}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What the data indicates - accordion */}
                <div className="mt-2">
                    <div className="rounded-xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                        <button
                            type="button"
                            onClick={() => setOpenData(!openData)}
                            aria-expanded={openData}
                            className="w-full p-4 flex items-start gap-3"
                        >
                            <HiOutlineLightBulb className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-sm mb-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>What the data indicates</h4>
                                <p className="text-[12px]" style={{ color: subtextColor }}>Summary of resident sentiment and recurring themes.</p>
                            </div>
                            <div className="ml-3">
                                {openData ? <HiChevronUp className="text-lg" style={{ color: subtextColor }} /> : <HiChevronDown className="text-lg" style={{ color: subtextColor }} />}
                            </div>
                        </button>

                        {openData && (
                            <div className="p-4" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                <p className="text-[13px] leading-relaxed" style={{ color: bodyColor }}>
                                    Emirates Hills maintains a high satisfaction rate (78% Positive), significantly above the Dubai villa community average (typically 60–65%). Negative sentiment is rarely related to core living experience (safety, prestige, location) and instead focuses on operational friction (maintenance bureaucracy, renovation approvals). The low "Constructive" percentage (8%) suggests that most critical issues raised in early years (2003–2010) have been resolved through community upgrades.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* How We Verify Reviews - accordion */}
                <div className="mt-2">
                    <div className="rounded-xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                        <button
                            type="button"
                            onClick={() => setOpenMethodology(!openMethodology)}
                            aria-expanded={openMethodology}
                            className="w-full p-4 flex items-start gap-3"
                        >
                            <HiOutlineShieldCheck className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-sm mb-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>How We Verify Reviews</h4>
                                <p className="text-[12px]" style={{ color: subtextColor }}>Verified ownership, timeframe segmentation, source diversity, and inclusion of constructive criticism.</p>
                            </div>
                            <div className="ml-3">
                                {openMethodology ? <HiChevronUp className="text-lg" style={{ color: subtextColor }} /> : <HiChevronDown className="text-lg" style={{ color: subtextColor }} />}
                            </div>
                        </button>

                        {openMethodology && (
                            <div className="p-4" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                <ul className="space-y-3">
                                    {methodologyItems.map((m, idx) => (
                                        <li key={idx} className="flex gap-3">
                                            <div className="mt-1 shrink-0 text-[#B68A35]">
                                                <FaRegCircleCheck />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm" style={{ color: isDark ? t.text : '#1A1A1A' }}>{m.title}</p>
                                                <p className="text-[13px] leading-relaxed" style={{ color: bodyColor }}>{m.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Source Transparency - accordion */}
                <div className="mt-2">
                    <div className="rounded-xl" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                        <button
                            type="button"
                            onClick={() => setOpenSource(!openSource)}
                            aria-expanded={openSource}
                            className="w-full p-4 flex items-start gap-3"
                        >
                            <LuInfo className="text-[#B68A35] text-lg shrink-0 mt-0.5" />
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-sm mb-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>Source Transparency</h4>
                                <p className="text-[12px]" style={{ color: subtextColor }}>Where the data came from and how it's validated and anonymized.</p>
                            </div>
                            <div className="ml-3">
                                {openSource ? <HiChevronUp className="text-lg" style={{ color: subtextColor }} /> : <HiChevronDown className="text-lg" style={{ color: subtextColor }} />}
                            </div>
                        </button>

                        {openSource && (
                            <div className="p-4" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                <p className="text-[13px] leading-relaxed" style={{ color: bodyColor }}>
                                    This analysis aggregates 340+ verified resident reviews and community discussions specific to Emirates Hills, collected from Google Maps, verified property portals, and Dubai community forums. Data covers the period from initial handover (2003) to Q1 2026. Transactional ownership context is cross-referenced with DXBInteract.com (official DLD partner) to ensure feedback originates from verified owners and long-term tenants. All sentiment is anonymized to protect resident privacy.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs: Strengths / Resident Insights / Resident Quotes / Buyer Guide */}
                <div className="mt-6">
                    <div className="rounded-xl shadow-sm mt-5" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                        <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                            <div className="flex w-full">
                                {[
                                    { key: "strengths", label: "Strengths", icon: HiOutlineShieldCheck },
                                    { key: "insights", label: "Resident Insights", icon: HiOutlineClipboard },
                                    { key: "quotes", label: "Resident Quotes", icon: LuInfo },
                                    { key: "buyer", label: "Buyer Guide", icon: LuDatabase },
                                ].map((tab) => (
                                    <TabButton
                                        key={tab.key}
                                        id={tab.key}
                                        active={activeTab === tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        icon={tab.icon}
                                        isDark={isDark}
                                    >
                                        {tab.label}
                                    </TabButton>
                                ))}
                            </div>
                        </div>

                        <div className="pb-5">
                            <div className="mt-4 rounded-2xl p-2 sm:p-6" 
                                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                
                                {activeTab === "strengths" && (
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-6" style={{ color: isDark ? t.text : '#1A1A1A' }}>What Owners Love — Key Strengths</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            {strengths.map((s, i) => (
                                                <div key={i} className="p-4 rounded-xl" style={{ border: `1px solid ${cardBorder}` }}>
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm" 
                                                            style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                                                            {s.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-sm" style={{ color: subtextColor }}>{s.title}</h4>
                                                            <p className="text-[13px] mt-2" style={{ color: bodyColor }}>{s.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "insights" && (
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-6" style={{ color: isDark ? t.text : '#1A1A1A' }}>Resident Insights for Prospective Buyers</h3>
                                        <div className="hidden md:block overflow-hidden rounded-xl" style={{ border: `1px solid ${cardBorder}` }}>
                                            <table className="w-full">
                                                <thead>
                                                    <tr style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
                                                        <th className="p-4 text-left text-[12px] font-bold uppercase tracking-wider w-1/4" style={{ color: subtextColor }}>Theme</th>
                                                        <th className="p-4 text-left text-[12px] font-bold uppercase tracking-wider" style={{ color: subtextColor }}>Resident Feedback Pattern</th>
                                                        <th className="p-4 text-left text-[12px] font-bold uppercase tracking-wider" style={{ color: subtextColor }}>What This Means for You</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y" style={{ borderColor: cardBorder }}>
                                                    {insights.map((it, idx) => (
                                                        <tr key={idx} className="transition-colors" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                                                            <td className="p-4 align-top font-semibold text-sm">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="text-[#B68A35]">{it.icon}</div>
                                                                    <div style={{ color: isDark ? t.text : '#1A1A1A' }}>{it.theme}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 align-top text-[13px]" style={{ color: bodyColor }}>{it.feedback}</td>
                                                            <td className="p-4 align-top text-[13px]" style={{ color: bodyColor }}>{it.meaning}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="md:hidden space-y-3">
                                            {insights.map((it, idx) => (
                                                <div key={idx} className="p-4 rounded-xl" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                                                    <div className="flex items-start gap-3">
                                                        <div className="mt-1 text-[#B68A35]">{it.icon}</div>
                                                        <div>
                                                            <p className="font-semibold" style={{ color: isDark ? t.text : '#1A1A1A' }}>{it.theme}</p>
                                                            <p className="text-[13px] mt-1" style={{ color: bodyColor }}>{it.feedback}</p>
                                                            <p className="text-[13px] mt-2" style={{ color: bodyColor }}>{it.meaning}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "quotes" && (
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-4" style={{ color: isDark ? t.text : '#1A1A1A' }}>Resident Quotes from Verified Owners</h3>
                                        <p className="text-[13px] mb-4" style={{ color: bodyColor }}>The following quotes are paraphrased from verified reviews to protect privacy while retaining authentic sentiment.</p>

                                        <div className="space-y-4">
                                            {[
                                                { text: "We've lived here since 2009. The security is unmatched—guards know every resident. Landscaping has matured beautifully; you don't get this level of privacy in newer communities. Property value has been stable even during market dips.", footer: "— Verified Owner (15+ Years Residency), Q4 2025" },
                                                { text: "Community management is responsive for urgent issues. The golf course access is a major lifestyle benefit. It feels like a private estate rather than a subdivision. Service charges are high but justified by the amenities.", footer: "— Verified Owner (5–10 Years Residency), Q1 2026" },
                                                { text: "Renovation approvals take time. If you plan to remodel, budget for 3–6 months of permitting with Emaar Community Management. Strict rules preserve value but limit flexibility.", footer: "— Verified Owner (Recent Renovation), Q3 2025" },
                                                { text: "Traffic can be heavy at the main gate during peak school hours (7-8 AM). Internal roads are quiet, but access points need better flow management. Some villas from Phase 1 need electrical upgrades.", footer: "— Verified Tenant (Family), Q4 2025" },
                                                { text: "Service charges have increased gradually. Understandable due to inflation, but owners should review the annual budget breakdown. Transparency has improved in the last 3 years.", footer: "— Verified Owner (Investor), Q1 2026" }
                                            ].map((quote, i) => (
                                                <blockquote key={i} className="p-4 rounded-xl" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
                                                    <p className="text-[13px]" style={{ color: isDark ? t.text : '#1A1A1A' }}>"{quote.text}"</p>
                                                    <footer className="text-[12px] mt-2" style={{ color: subtextColor }}>{quote.footer}</footer>
                                                </blockquote>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "buyer" && (
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: isDark ? t.text : '#1A1A1A' }}>Should You Buy in Emirates Hills? A Buyer Guide from Resident Reviews</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="p-2 sm:p-4 rounded-xl" style={{ border: `1px solid ${cardBorder}` }}>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" 
                                                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                                                        <FaUsers className="text-[#B68A35] text-4xl" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-[#B68A35] font-bold uppercase">For End-Users</p>
                                                        <h4 className="font-semibold mt-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>Families & Retirees</h4>
                                                        <p className="text-[13px] mt-2" style={{ color: bodyColor }}>
                                                            The review data confirms Emirates Hills delivers on its core promise: privacy, security, and stability. If your priority is a quiet, established community with mature landscaping and strict neighbor etiquette, sentiment is overwhelmingly positive. Be prepared for strict community rules—this is a feature, not a bug, for most residents.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2 sm:p-4 rounded-xl" style={{ border: `1px solid ${cardBorder}` }}>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" 
                                                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                                                        <BsFillBarChartFill className="text-[#B68A35] text-4xl" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-[#B68A35] font-bold uppercase">For Investors</p>
                                                        <h4 className="font-semibold mt-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>Resale & Rental</h4>
                                                        <p className="text-[13px] mt-2" style={{ color: bodyColor }}>
                                                            Long-term owners report stable capital appreciation, but rental yields are modest (3–4%). Reviews indicate tenants value the prestige and security, leading to longer tenancy periods (2+ years). Renovation restrictions may limit value-add strategies for flip investors.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className="font-semibold mb-3" style={{ color: isDark ? t.text : '#1A1A1A' }}>Key Due Diligence Based on Reviews</h4>
                                        <ul className="space-y-3">
                                            {[
                                                { title: "Verify Villa Phase", desc: "Early phases (2003–2005) may require more maintenance than later phases (2006–2008). Check review patterns for specific cluster names." },
                                                { title: "Review Service Charge History", desc: "Request the last 3 years of service charge invoices. Reviews indicate gradual increases; ensure this fits your holding cost budget." },
                                                { title: "Test Access Times", desc: "Visit the community gate at 7:30 AM and 5:30 PM to experience peak traffic flow firsthand." },
                                                { title: "Renovation Plans", desc: "If you intend to remodel, speak to the community management office about current approval timelines before purchasing." }
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-3 items-start">
                                                    <div className="mt-1 text-[#B68A35]"><FaRegCircleCheck /></div>
                                                    <div>
                                                        <p className="font-semibold" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.title}</p>
                                                        <p className="text-[13px]" style={{ color: bodyColor }}>{item.desc}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Disclaimer Footer */}
                <div className="p-2">
                    <div className="mt-6 flex items-start gap-4 p-2 sm:p-5 rounded-xl" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <LuInfo className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
                        <p className="text-[11px] uppercase tracking-wider font-bold leading-relaxed" style={{ color: subtextColor }}>
                            Trust & Transparency Note:{" "}
                            <span className="font-medium normal-case" style={{ color: bodyColor }}>
                                PropertyIntel.ae does not filter negative reviews. The sentiment analysis above includes constructive criticism to ensure buyers have a realistic expectation of living in Emirates Hills. Unlike off-plan projects where reviews are aggregated from unrelated communities, this data is specific to Emirates Hills verified owners and tenants. Cross-reference this feedback with your own visits and discussions with current residents.
                                Disclaimer: All review data is aggregated from public sources and verified transaction records. Individual experiences may vary. PropertyIntel.ae does not guarantee future community management performance. Verify all service charge and maintenance policies with Emaar Community Management before transacting.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}