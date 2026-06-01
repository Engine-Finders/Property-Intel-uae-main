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

// ─── Shared Style Constants (matching Section3) ───────────────────────
const sectionHeaderClass = "flex items-start gap-4 mb-8";
const sectionIconShellClass =
    "w-12 h-12 rounded-xl bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0 shadow-sm";
const sectionTitleClass =
    "text-[#1A1A1A] font-semibold font-[Merriweather] tabular-nums text-lg sm:text-xl leading-tight";
const sectionSubtitleClass =
    "text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1";
const sectionBodyClass = "text-[13px] md:text-sm text-gray-600 leading-relaxed";
const sectionPanelClass = "bg-white border border-[#F3EFE9] rounded-2xl shadow-sm";

const SectionHeader = ({ icon, title, subtitle }) => (
    <div className={sectionHeaderClass}>
        {icon ? <div className={sectionIconShellClass}>{icon}</div> : null}
        <div>
            <h3 className={sectionTitleClass}>{title}</h3>
            {subtitle ? <p className={sectionSubtitleClass}>{subtitle}</p> : null}
        </div>
    </div>
);

// Small styled tab button for the section tabs (matches Section3 tab styles)
const TabButton = ({ id, active, onClick, children, icon }) => {
    return (
        <button
            id={`tab-${id}`}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={onClick}
            className={`
                flex-1
                flex flex-col lg:flex-row items-center justify-center
                gap-1 lg:gap-3
                py-3 lg:py-6
                px-1 lg:px-4
                transition-all relative
                ${active ? "text-[#B68A35] bg-white" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}
            `}
        >
            <span className="text-base lg:text-xl">{icon}</span>
            <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${active ? "font-bold" : "font-medium"}`}>
                {children}
            </span>
            {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35]" />}
        </button>
    );
};

// ─── Checkmark SVG ─────────────────────────────────────────────────────────
const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

// ─── Main Section Component ────────────────────────────────────────────────
export default function Section4() {
    const [openMethodology, setOpenMethodology] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [openSource, setOpenSource] = useState(false);
    const [openInsights, setOpenInsights] = useState(null);
    const [activeTab, setActiveTab] = useState("strengths");

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
        { label: "Neutral", pct: "14%", color: "gray", themes: "Service Charge Increases, Renovation Restrictions, Traffic at Peak Hours", icon: <FaMeh className="text-gray-500 text-lg" /> },
        { label: "Constructive", pct: "8%", color: "#E67E22", themes: "Aging Infrastructure in Early Phases, Maintenance Response Times, Strict Community Rules", icon: <HiOutlineLightBulb className="text-[#E67E22] text-lg" /> },
    ];

    return (
        <section className="w-full bg-[#FBF9F6] py-5 sm:py-10 font-sans selection:bg-[#B68A35]/20">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
                </div>

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-0.5">
                        Resident & Owner
                    </h2>
                    <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-0.5">
                        Reviews from{" "}
                        <span className="text-[#B68A35]">Emirates Hills</span> by Emaar
                    </h2>
                </div>
            </div>

            {/* ── Content Area ─────────────────────────────────────────────────── */}
            <div className="relative z-20 max-w-[1400px] mx-auto px-2 sm:px-6 pb-5 sm:pb-10 -mt-24 sm:-mt-28 lg:-mt-22">

                {/* The Resident Verdict */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-white border border-[#F3EFE9] rounded-2xl p-6 shadow-sm">
                        <div className="flex items-start gap-3 mb-6">
                            <div>
                                <h3 className={sectionTitleClass}>The Resident <span className="text-[#B68A35]">Verdict</span></h3>
                                <p className="text-[10px] text-gray-600 mt-1">340+ verified reviews • 2003-Q1 2026</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center py-4">
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#F3EFE9" strokeWidth="8" />
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
                                    <span className="text-[10px] text-gray-700 uppercase tracking-wider mt-1">Positive<br />Sentiment</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#F3EFE9]">
                            <div className="text-center bg-gray-100 p-2 rounded-">
                                <p className="text-lg font-bold text-gray-700">14%</p>
                                <p className="text-[10px] text-gray-600 uppercase">Neutral</p>
                            </div>
                            <div className="text-center bg-gray-100 p-2">
                                <p className="text-lg font-bold text-gray-700">8%</p>
                                <p className="text-[10px] text-gray-600 uppercase">Constructive</p>
                            </div>
                            <div className="text-center bg-gray-100 p-2">
                                <p className="text-lg font-bold text-gray-700">340+</p>
                                <p className="text-[10px] text-gray-600 uppercase">Reviews</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white border border-[#F3EFE9] rounded-2xl p-2 sm:p-6 shadow-sm">
                        <SectionHeader
                            title="Is Emirates Hills a Good Place to Live? What Owners Actually Say"
                            subtitle="Based on verified reviews collected over the last 24 months:"
                        />


                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-hidden border border-[#F3EFE9] rounded-xl">
                            <table className="w-full">
                                <thead className="bg-[#FAF9F6]">
                                    <tr>
                                        <th className="p-4 text-left text-[10px] font-bold text-gray-700 uppercase tracking-wider w-1/4">Sentiment</th>
                                        <th className="p-4 text-left text-[10px] font-bold text-gray-700 uppercase tracking-wider w-1/4">Percentage</th>
                                        <th className="p-4 text-left text-[10px] font-bold text-gray-700 uppercase tracking-wider">Key Themes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F3EFE9]">
                                    <tr className="hover:bg-[#FDF8F0]/30">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#27AE60]" />
                                                <span className="font-semibold text-sm text-[#1A1A1A]">Positive</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-[#27AE60] font-bold text-sm">78%</span>
                                        </td>
                                        <td className="p-4 text-[13px] text-gray-600">Privacy, Security, Mature Landscaping, Capital Stability, Golf Course Access</td>
                                    </tr>
                                    <tr className="hover:bg-[#FDF8F0]/30">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                                                <span className="font-semibold text-sm text-[#1A1A1A]">Neutral</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-gray-500 font-bold text-sm">14%</span>
                                        </td>
                                        <td className="p-4 text-[13px] text-gray-600">Service Charge Increases, Renovation Restrictions, Traffic at Peak Hours</td>
                                    </tr>
                                    <tr className="hover:bg-[#FDF8F0]/30">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#E67E22]" />
                                                <span className="font-semibold text-sm text-[#1A1A1A]">Constructive</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-[#E67E22] font-bold text-sm">8%</span>
                                        </td>
                                        <td className="p-4 text-[13px] text-gray-600">Aging Infrastructure in Early Phases, Maintenance Response Times, Strict Community Rules</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden">
                            <div className="bg-[#FAF9F6] rounded-xl border border-[#F3EFE9] overflow-hidden">
                                <div className="flex px-4 py-3 bg-[#FAF9F6] text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    <div className="w-1/3">Sentiment</div>
                                    <div className="w-1/5 text-center">%</div>
                                    <div className="flex-1">Key themes</div>
                                </div>

                                <div className="divide-y divide-[#F3EFE9]">
                                    {sentiments.map((item, i) => (
                                        <div key={i} className="flex items-start px-4 py-3">
                                            <div className="w-1/3 flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                                <span className="font-semibold text-sm text-[#1A1A1A]">{item.label}</span>
                                            </div>

                                            <div className="w-1/5 text-center">
                                                <span className="font-bold text-sm" style={{ color: item.color }}>{item.pct}</span>
                                            </div>

                                            <div className="flex-1 pl-3">
                                                <p className="text-[12px] text-gray-600">{item.themes}</p>
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
                    <div className="bg-white border border-[#F3EFE9] rounded-xl">
                        <button
                            type="button"
                            onClick={() => setOpenData(!openData)}
                            aria-expanded={openData}
                            className="w-full p-4 flex items-start gap-3"
                        >
                            <HiOutlineLightBulb className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-[#1A1A1A] text-sm mb-1">What the data indicates</h4>
                                <p className="text-[12px] text-gray-500">Summary of resident sentiment and recurring themes.</p>
                            </div>
                            <div className="ml-3 text-gray-600">
                                {openData ? <HiChevronUp className="text-lg" /> : <HiChevronDown className="text-lg" />}
                            </div>
                        </button>

                        {openData && (
                            <div className="p-4 border-t border-[#F3EFE9]">
                                <p className="text-[13px] text-gray-600 leading-relaxed">
                                    Emirates Hills maintains a high satisfaction rate (78% Positive), significantly above the Dubai villa community average (typically 60–65%). Negative sentiment is rarely related to core living experience (safety, prestige, location) and instead focuses on operational friction (maintenance bureaucracy, renovation approvals). The low "Constructive" percentage (8%) suggests that most critical issues raised in early years (2003–2010) have been resolved through community upgrades.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* How We Verify Reviews - accordion */}
                <div className="mt-2">
                    <div className="bg-white border border-[#F3EFE9] rounded-xl">
                        <button
                            type="button"
                            onClick={() => setOpenMethodology(!openMethodology)}
                            aria-expanded={openMethodology}
                            className="w-full p-4 flex items-start gap-3"
                        >
                            <HiOutlineShieldCheck className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-[#1A1A1A] text-sm mb-1">How We Verify Reviews</h4>
                                <p className="text-[12px] text-gray-500">Verified ownership, timeframe segmentation, source diversity, and inclusion of constructive criticism.</p>
                            </div>
                            <div className="ml-3 text-gray-600">{openMethodology ? <HiChevronUp className="text-lg" /> : <HiChevronDown className="text-lg" />}</div>
                        </button>

                        {openMethodology && (
                            <div className="p-4 border-t border-[#F3EFE9]">
                                <ul className="space-y-3">
                                    {methodologyItems.map((m, idx) => (
                                        <li key={idx} className="flex gap-3">
                                            <div className="mt-1 shrink-0 text-[#B68A35]">
                                                <FaRegCircleCheck />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-[#1A1A1A]">{m.title}</p>
                                                <p className="text-[13px] text-gray-600 leading-relaxed">{m.desc}</p>
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
                    <div className="bg-white border border-[#F3EFE9] rounded-xl">
                        <button
                            type="button"
                            onClick={() => setOpenSource(!openSource)}
                            aria-expanded={openSource}
                            className="w-full p-4 flex items-start gap-3"
                        >
                            <LuInfo className="text-[#B68A35] text-lg shrink-0 mt-0.5" />
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-[#1A1A1A] text-sm mb-1">Source Transparency</h4>
                                <p className="text-[12px] text-gray-500">Where the data came from and how it's validated and anonymized.</p>
                            </div>
                            <div className="ml-3 text-gray-600">{openSource ? <HiChevronUp className="text-lg" /> : <HiChevronDown className="text-lg" />}</div>
                        </button>

                        {openSource && (
                            <div className="p-4 border-t border-[#F3EFE9]">
                                <p className="text-[13px] text-gray-600 leading-relaxed">
                                    This analysis aggregates 340+ verified resident reviews and community discussions specific to Emirates Hills, collected from Google Maps, verified property portals, and Dubai community forums. Data covers the period from initial handover (2003) to Q1 2026. Transactional ownership context is cross-referenced with DXBInteract.com (official DLD partner) to ensure feedback originates from verified owners and long-term tenants. All sentiment is anonymized to protect resident privacy.
                                </p>
                            </div>
                        )}
                    </div>
                </div>



                {/* Tabs: Strengths / Resident Insights / Resident Quotes / Buyer Guide */}
                <div className="mt-6">
                    <div className="bg-white rounded-xl border border-[#F3EFE9] overflow-hidden shadow-sm mt-5">
                        <div className="flex border-b border-[#F3EFE9]">
                            <div className="flex w-full">
                                {[
                                    { key: "strengths", label: "Strengths", icon: HiOutlineShieldCheck },
                                    { key: "insights", label: "Resident Insights", icon: HiOutlineClipboard },
                                    { key: "quotes", label: "Resident Quotes", icon: LuInfo },
                                    { key: "buyer", label: "Buyer Guide", icon: LuDatabase },
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative ${activeTab === tab.key
                                                ? "text-[#B68A35] bg-[#FDF8F0]/50"
                                                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="text-base lg:text-xl">
                                                <Icon className="text-current" />
                                            </span>
                                            <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.key ? "font-bold" : "font-medium"
                                                }`}>
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

                        <div className="pb-5">
                            <div className="mt-4 bg-white border border-[#F3EFE9] rounded-2xl p-2 sm:p-6">
                                {activeTab === "strengths" && (
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">What Owners Love — Key Strengths</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            {strengths.map((s, i) => (
                                                <div key={i} className="p-4 rounded-xl border border-[#F3EFE9]">
                                                    <div className="flex items-start gap-3">
                                                        <div className={sectionIconShellClass}>
                                                            {s.icon ? s.icon : <HiOutlineShieldCheck className="text-[#B68A35] text-xl" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <h4 className="font-semibold text-sm text-gray-600">{s.title}</h4>
                                                            </div>
                                                            <p className="text-[13px] text-gray-600 mt-2">{s.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "insights" && (
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Resident Insights for Prospective Buyers</h3>
                                        <div className="hidden md:block overflow-hidden border border-[#F3EFE9] rounded-xl">
                                            <table className="w-full">
                                                <thead className="bg-[#FAF9F6]">
                                                    <tr>
                                                        <th className="p-4 text-left text-[12px] font-bold text-gray-700 uppercase tracking-wider w-1/4">Theme</th>
                                                        <th className="p-4 text-left text-[12px] font-bold text-gray-700 uppercase tracking-wider">Resident Feedback Pattern</th>
                                                        <th className="p-4 text-left text-[12px] font-bold text-gray-700 uppercase tracking-wider">What This Means for You</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#F3EFE9]">
                                                    {insights.map((it, idx) => (
                                                        <tr key={idx} className="hover:bg-[#FDF8F0]/30">
                                                            <td className="p-4 align-top font-semibold text-sm text-gray-600">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="text-[#B68A35]">{it.icon ? it.icon : <FaRegCircleCheck />}</div>
                                                                    <div>{it.theme}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 align-top text-[13px] text-gray-600">{it.feedback}</td>
                                                            <td className="p-4 align-top text-[13px] text-gray-700">{it.meaning}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="md:hidden space-y-3">
                                            {insights.map((it, idx) => (
                                                <div key={idx} className="p-4 bg-[#FAF9F6] rounded-xl border border-[#F3EFE9]">
                                                    <div className="flex items-start gap-3">
                                                        <div className="mt-1 text-[#B68A35]">{it.icon ? it.icon : <FaRegCircleCheck />}</div>
                                                        <div>
                                                            <p className="font-semibold">{it.theme}</p>
                                                            <p className="text-[13px] text-gray-600 mt-1">{it.feedback}</p>
                                                            <p className="text-[13px] text-gray-700 mt-2">{it.meaning}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "quotes" && (
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Resident Quotes from Verified Owners</h3>
                                        <p className="text-[13px] text-gray-600 mb-4">The following quotes are paraphrased from verified reviews to protect privacy while retaining authentic sentiment.</p>

                                        <div className="space-y-4">
                                            <blockquote className="p-4 border border-[#F3EFE9] rounded-xl bg-[#FAF9F6]">
                                                <p className="text-[13px] text-gray-800">"We've lived here since 2009. The security is unmatched—guards know every resident. Landscaping has matured beautifully; you don't get this level of privacy in newer communities. Property value has been stable even during market dips."</p>
                                                <footer className="text-[12px] text-gray-500 mt-2">— Verified Owner (15+ Years Residency), Q4 2025</footer>
                                            </blockquote>

                                            <blockquote className="p-4 border border-[#F3EFE9] rounded-xl bg-[#FAF9F6]">
                                                <p className="text-[13px] text-gray-800">"Community management is responsive for urgent issues. The golf course access is a major lifestyle benefit. It feels like a private estate rather than a subdivision. Service charges are high but justified by the amenities."</p>
                                                <footer className="text-[12px] text-gray-500 mt-2">— Verified Owner (5–10 Years Residency), Q1 2026</footer>
                                            </blockquote>

                                            <blockquote className="p-4 border border-[#F3EFE9] rounded-xl bg-[#FAF9F6]">
                                                <p className="text-[13px] text-gray-800">"Renovation approvals take time. If you plan to remodel, budget for 3–6 months of permitting with Emaar Community Management. Strict rules preserve value but limit flexibility."</p>
                                                <footer className="text-[12px] text-gray-500 mt-2">— Verified Owner (Recent Renovation), Q3 2025</footer>
                                            </blockquote>

                                            <blockquote className="p-4 border border-[#F3EFE9] rounded-xl bg-[#FAF9F6]">
                                                <p className="text-[13px] text-gray-800">"Traffic can be heavy at the main gate during peak school hours (7-8 AM). Internal roads are quiet, but access points need better flow management. Some villas from Phase 1 need electrical upgrades."</p>
                                                <footer className="text-[12px] text-gray-500 mt-2">— Verified Tenant (Family), Q4 2025</footer>
                                            </blockquote>

                                            <blockquote className="p-4 border border-[#F3EFE9] rounded-xl bg-[#FAF9F6]">
                                                <p className="text-[13px] text-gray-800">"Service charges have increased gradually. Understandable due to inflation, but owners should review the annual budget breakdown. Transparency has improved in the last 3 years."</p>
                                                <footer className="text-[12px] text-gray-500 mt-2">— Verified Owner (Investor), Q1 2026</footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "buyer" && (
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Should You Buy in Emirates Hills? A Buyer Guide from Resident Reviews</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="p-2 sm:p-4 border border-[#F3EFE9] rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-16 h-16 rounded-full bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0">
                                                        <FaUsers className="text-[#B68A35] text-4xl" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-[#B68A35] font-bold uppercase">For End-Users</p>
                                                        <h4 className="font-semibold mt-1 text-gray-600">Families & Retirees</h4>
                                                        <p className="text-[13px] text-gray-600 mt-2">The review data confirms Emirates Hills delivers on its core promise: privacy, security, and stability. If your priority is a quiet, established community with mature landscaping and strict neighbor etiquette, sentiment is overwhelmingly positive. Be prepared for strict community rules—this is a feature, not a bug, for most residents.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2 sm:p-4 border border-[#F3EFE9] rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-16 h-16 rounded-full bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0">
                                                        <BsFillBarChartFill className="text-[#B68A35] text-4xl" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-[#B68A35] font-bold uppercase">For Investors</p>
                                                        <h4 className="font-semibold mt-1 text-gray-600">Resale & Rental</h4>
                                                        <p className="text-[13px] text-gray-600 mt-2">Long-term owners report stable capital appreciation, but rental yields are modest (3–4%). Reviews indicate tenants value the prestige and security, leading to longer tenancy periods (2+ years). Renovation restrictions may limit value-add strategies for flip investors.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className="font-semibold mb-3 text-gray-600">Key Due Diligence Based on Reviews</h4>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3 items-start">
                                                <div className="mt-1 text-[#B68A35]"><FaRegCircleCheck /></div>
                                                <div>
                                                    <p className="font-semibold text-gray-600">Verify Villa Phase</p>
                                                    <p className="text-[13px] text-gray-600">Early phases (2003–2005) may require more maintenance than later phases (2006–2008). Check review patterns for specific cluster names.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3 items-start">
                                                <div className="mt-1 text-[#B68A35]"><FaRegCircleCheck /></div>
                                                <div>
                                                    <p className="font-semibold text-gray-600">Review Service Charge History</p>
                                                    <p className="text-[13px] text-gray-600">Request the last 3 years of service charge invoices. Reviews indicate gradual increases; ensure this fits your holding cost budget.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3 items-start">
                                                <div className="mt-1 text-[#B68A35]"><FaRegCircleCheck /></div>
                                                <div>
                                                    <p className="font-semibold text-gray-600">Test Access Times</p>
                                                    <p className="text-[13px] text-gray-600">Visit the community gate at 7:30 AM and 5:30 PM to experience peak traffic flow firsthand.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3 items-start">
                                                <div className="mt-1 text-[#B68A35]"><FaRegCircleCheck /></div>
                                                <div>
                                                    <p className="font-semibold text-gray-600">Renovation Plans</p>
                                                    <p className="text-[13px] text-gray-600">If you intend to remodel, speak to the community management office about current approval timelines before purchasing.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Disclaimer Footer */}
                <div className="p-2">
                    <div className="mt-6 flex items-start gap-4 p-2 sm:p-5 bg-[#FDF8F0] border border-[#B68A35]/10 rounded-xl">
                        <LuInfo className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-wider font-bold">
                            Trust & Transparency Note:{" "}
                            <span className="font-medium normal-case">
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