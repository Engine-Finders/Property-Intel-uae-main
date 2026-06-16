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
import { LuInfo } from "react-icons/lu";
import { HiOutlineDatabase } from 'react-icons/hi';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

// ─── Shared Style Constants (mirrored from Section2) ───────────────────────
const SectionHeader = ({ icon, title, subtitle, isDark, t }) => (
    <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
            style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: '1px solid rgba(182,138,53,0.18)' }}>
            {icon}
        </div>
        <div>
            <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight"
                style={{ color: isDark ? t.text : '#1A1A1A' }}>{title}</h3>
            {subtitle ? <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{subtitle}</p> : null}
        </div>
    </div>
);

// ─── Checkmark SVG ─────────────────────────────────────────────────────────
const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

const AccentIconColumn = ({ children, color = GOLD }) => (
    <div className="flex self-stretch shrink-0 flex-col items-center gap-2">
        <div className="shrink-0 text-[#B68A35]">
            {children}
        </div>
        <span className="min-h-10 w-px flex-1" style={{ background: color }} />
    </div>
);

const DeliveryTrackRecordView = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    const [openInsights, setOpenInsights] = useState(false);

    return (
        <div className="max-w-[1400px] mx-auto p-2 animate-in fade-in duration-500 space-y-12" style={{ background: cardBg }}>
            {/* Header */}
            <SectionHeader
                icon={<HiOutlineClipboard className="text-[#B68A35] text-2xl sm:text-3xl" />}
                title={data?.header?.title || "Delivery Track Record – Emirates Hills Project Outcome"}
                subtitle={data?.header?.subtitle || "Project Phase · Handover Timeline"}
                isDark={isDark}
                t={t}
            />

            {/* Timeline Section */}
            <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-[11px] top-6 bottom-12 hidden w-[2px] bg-[#B68A35]/40 lg:block" />

                <div className="space-y-4 lg:space-y-3">
                    {data?.phases?.map((phase, i) => (
                        <div key={i} className="flex gap-0 lg:gap-6 relative">
                            {/* Phase dot */}
                            <div className="hidden w-6 h-6 items-center justify-center shrink-0 z-10 mt-1 lg:mt-6 lg:flex">
                                <div className="w-4 h-4 rounded-full bg-[#B68A35]" />
                            </div>

                            {/* Row Container */}
                            <div className="relative flex-1 rounded-xl p-4 pt-5 shadow-sm lg:p-4 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:shadow-none transition-all"
                                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#fffefb', border: `1px solid ${cardBorder}` }}>

                                {/* Phase & Name */}
                                <div className="mb-5 pr-24 lg:w-1/4 lg:mb-0 lg:pr-0">
                                    <p className="text-[#B68A35] text-[10px] font-bold uppercase tracking-wider mb-1">
                                        {phase.phase}
                                    </p>
                                    <h4 className="font-semibold text-base leading-tight"
                                        style={{ color: isDark ? t.text : '#1A1A1A' }}>
                                        {phase.name}
                                    </h4>
                                </div>

                                {/* Dates Group */}
                                <div className="grid grid-cols-2 gap-5 border-t pt-4 lg:flex lg:flex-wrap lg:gap-12 lg:border-t-0 lg:pt-0 lg:w-1/3 lg:items-center" style={{ borderColor: cardBorder }}>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase mb-0.5" style={{ color: subtextColor }}>Original Handover</p>
                                        <p className="text-sm font-bold" style={{ color: isDark ? t.text : '#1A1A1A' }}>{phase.original}</p>
                                    </div>
                                    <div className="hidden lg:block h-8 w-px" style={{ background: cardBorder }} />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase mb-0.5" style={{ color: subtextColor }}>Actual Handover</p>
                                        <p className="text-sm font-bold" style={{ color: isDark ? t.text : '#1A1A1A' }}>{phase.actual}</p>
                                    </div>
                                </div>

                                {/* Delay Badge */}
                                <div className="absolute right-3 top-3 lg:static lg:my-0 lg:w-24">
                                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border text-center min-w-[80px]`}
                                        style={isDark ? { background: 'rgba(182,138,53,0.12)', borderColor: GOLD_BORDER, color: GOLD } : phase.delayStyle ? { background: phase.delayStyle?.bg, color: phase.delayStyle?.color, borderColor: phase.delayStyle?.borderColor } : {}}>
                                        {phase.delay}
                                    </span>
                                </div>

                                {/* Outcome */}
                                <div className="mt-4 border-t pt-4 lg:mt-0 lg:w-1/3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0" style={{ borderColor: cardBorder }}>
                                    <p className="text-[10px] font-bold text-[#B68A35] uppercase mb-1.5">Project Outcome</p>
                                    <p className="text-[12px] leading-relaxed italic lg:not-italic" style={{ color: bodyColor }}>
                                        {phase.outcome}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section: Data source + insights side-by-side for desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Data Source */}
                <div className="flex gap-4 p-3 rounded-2xl items-start h-fit"
                    style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                    <AccentIconColumn>
                        <HiOutlineDatabase className="text-[#B68A35] text-2xl" />
                    </AccentIconColumn>
                    <div>
                        <p className="text-[11px] leading-relaxed" style={{ color: subtextColor }}>
                            <span className="font-bold block mb-1 uppercase tracking-tight" style={{ color: isDark ? t.textSecondary : '#374151' }}>Data Source</span>
                            {data?.dataSource || ""}
                        </p>
                    </div>
                </div>

                {/* Insights - desktop */}
                <div className="hidden md:flex lg:col-span-2 rounded-xl gap-5 p-2 sm:p-6 rounded-r-2xl shadow-sm border"
                    style={{ background: cardBg, borderColor: cardBorder }}>
                    <AccentIconColumn>
                        <HiOutlineLightBulb className="text-[#B68A35] text-2xl" />
                    </AccentIconColumn>
                    <div>
                        <h4 className="font-bold text-base mb-2" style={{ color: isDark ? t.text : '#1A1A1A' }}>{data?.insights?.title || "What the outcomes indicate"}</h4>
                        <p className="text-[13px] leading-relaxed" style={{ color: bodyColor }}>
                            {data?.insights?.content || ""}
                        </p>
                    </div>
                </div>

                {/* Insights - mobile accordion */}
                <div className="md:hidden lg:col-span-2">
                    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
                        <button
                            className="w-full flex items-center justify-between gap-4 p-4"
                            onClick={() => setOpenInsights(!openInsights)}
                            aria-expanded={openInsights}
                            style={{ background: cardBg }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>
                                    <HiOutlineLightBulb className="text-[#B68A35] text-2xl" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-base mb-0 truncate" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                                        {data?.insights?.title || "What the outcomes indicate"}
                                    </h4>
                                    <p className="text-[12px] mt-1" style={{ color: subtextColor }}>Tap to expand</p>
                                </div>
                            </div>
                            <div className="shrink-0">
                                {openInsights ? <HiChevronUp className="text-base" style={{ color: subtextColor }} /> : <HiChevronDown className="text-base" style={{ color: subtextColor }} />}
                            </div>
                        </button>

                        {openInsights && (
                            <div className="p-4" style={{ borderTop: `1px solid ${cardBorder}`, background: cardBg }}>
                                <p className="text-[13px] leading-relaxed" style={{ color: bodyColor }}>
                                    {data?.insights?.content || ""}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Tab 2: Reality Check ─────────────────────────────────────────────────
const RealityCheckView = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    const [openItem, setOpenItem] = useState(null);
    const [openKeyObs, setOpenKeyObs] = useState(false);

    return (
        <div className="p-0 animate-in fade-in duration-500 mt-2 sm:mt-0" style={{ background: cardBg }}>
            <SectionHeader
                icon={<HiOutlineShieldCheck className="text-[#B68A35] text-2xl sm:text-3xl" />}
                title={data?.header?.title || "Original Promises vs. Reality – Emirates Hills Delivery Assessment"}
                subtitle={data?.header?.subtitle || "Marketed Amenities vs. Delivered Infrastructure"}
                isDark={isDark}
                t={t}
            />

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl shadow-sm mb-8"
                style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderColor: cardBorder }}>
                            <th className="p-5 text-[12px] font-bold uppercase tracking-widest w-[30%]" style={{ color: subtextColor }}>
                                Amenity (Original Marketing)
                            </th>
                            <th className="p-5 text-[12px] font-bold uppercase tracking-widest w-[22%]" style={{ color: subtextColor }}>
                                Delivered Status
                            </th>
                            <th className="p-5 text-[12px] font-bold uppercase tracking-widest" style={{ color: subtextColor }}>
                                Resident Verification (Aggregated Reviews)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.amenities?.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b last:border-0 transition-colors"
                                style={{ borderColor: cardBorder }}
                            >
                                <td className="p-5">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-sm" style={{ color: isDark ? t.text : '#1A1A1A' }}>{row.amenity}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span className="font-bold text-sm text-[#B68A35]">{row.status}</span>
                                </td>
                                <td className="p-5 text-[13px] leading-relaxed" style={{ color: bodyColor }}>{row.verification}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden rounded-2xl overflow-hidden mb-2 sm:mb-8" style={{ border: `1px solid ${cardBorder}` }}>
                {data?.amenities?.map((row, i) => (
                    <div key={i} className="border-b last:border-0" style={{ borderColor: cardBorder }}>
                        <button
                            className="w-full flex items-center justify-between p-4 text-left gap-2"
                            onClick={() => setOpenItem(openItem === i ? null : i)}
                            style={{ background: cardBg }}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(39,174,96,0.15)' }}>
                                    <CheckIcon />
                                </div>
                                <span className="font-semibold text-sm leading-tight" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                                    {row.amenity}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span
                                    className="max-w-[112px] truncate rounded-full px-2.5 py-1 text-right text-[10px] font-medium text-[#B68A35]"
                                    style={{ background: isDark ? "rgba(182,138,53,0.1)" : "rgba(182,138,53,0.06)" }}
                                >
                                    {row.status}
                                </span>
                                {openItem === i ? (
                                    <HiChevronUp className="text-base" style={{ color: subtextColor }} />
                                ) : (
                                    <HiChevronDown className="text-base" style={{ color: subtextColor }} />
                                )}
                            </div>
                        </button>
                        {openItem === i && (
                            <div className="px-4 pb-4 space-y-2" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
                                <p className="text-[12px] leading-relaxed" style={{ color: bodyColor }}>{row.verification}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Key Observations - desktop */}
            <div className="hidden md:flex rounded-2xl p-2 sm:p-6 mb-6 gap-3"
                style={{ background: isDark ? 'rgba(182,138,53,0.06)' : 'rgba(182,138,53,0.06)', border: `1px solid ${cardBorder}` }}>
                <AccentIconColumn>
                    <HiOutlineLightBulb className="text-[#B68A35] text-xl" />
                </AccentIconColumn>
                <div>
                    <div className="flex gap-3 mb-4 items-center">
                        <h4 className="font-bold text-[#B68A35] text-[10px] uppercase tracking-wider">Key observations</h4>
                    </div>
                    {data?.keyObservations?.map((obs, idx) => (
                        <p key={idx} className="text-[13px] md:text-sm leading-relaxed mb-4" style={{ color: bodyColor }}>
                            {obs}
                        </p>
                    ))}
                </div>
            </div>

            {/* Key Observations - mobile accordion */}
            <div className="md:hidden mb-6">
                <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
                    <button
                        className="w-full flex items-center justify-between gap-4 p-4"
                        onClick={() => setOpenKeyObs(!openKeyObs)}
                        aria-expanded={openKeyObs}
                        style={{ background: cardBg }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>
                                <HiOutlineLightBulb className="text-[#B68A35] text-xl" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-[#B68A35] text-[10px] uppercase tracking-wider mb-0">
                                    Key observations
                                </h4>
                            </div>
                        </div>
                        <div className="shrink-0">
                            {openKeyObs ? <HiChevronUp className="text-base" style={{ color: subtextColor }} /> : <HiChevronDown className="text-base" style={{ color: subtextColor }} />}
                        </div>
                    </button>

                    {openKeyObs && (
                        <div className="flex gap-3 p-4" style={{ background: isDark ? 'rgba(182,138,53,0.06)' : 'rgba(182,138,53,0.06)' }}>
                            <AccentIconColumn>
                                <HiOutlineLightBulb className="text-[#B68A35] text-xl" />
                            </AccentIconColumn>
                            <div>
                                {data?.keyObservations?.map((obs, idx) => (
                                    <p key={idx} className="text-[13px] leading-relaxed mb-4" style={{ color: bodyColor }}>
                                        {obs}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Source */}
            <div className="flex gap-3 p-3 sm:p-4 rounded-xl items-start"
                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                <AccentIconColumn>
                    <HiOutlineDatabase className="text-[#B68A35] text-lg" />
                </AccentIconColumn>
                <p className="text-[10px] sm:text-[11px] leading-snug" style={{ color: subtextColor }}>
                    <span className="font-bold" style={{ color: isDark ? t.textSecondary : '#374151' }}>Source:</span> {data?.source || ""}
                </p>
            </div>
        </div>
    );
};

// ─── Tab 3: Performance View ───────────────────────────────────────────────
const PerformanceView = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    return (
        <div className="p-0 animate-in fade-in duration-500" style={{ background: cardBg }}>
            <SectionHeader
                icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>}
                title={data?.header?.title || "Post-Completion Performance Analysis"}
                subtitle={data?.header?.subtitle || "20+ Year Track Record"}
                isDark={isDark}
                t={t}
            />

            <div className="text-center p-8" style={{ color: bodyColor }}>
                {data?.message || "Performance data available in the sections below."}
            </div>
        </div>
    );
};

// ─── Strengths & Considerations Section ───────────────────────────────────
const StrengthsConsiderationsSection = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    const [mobileTab, setMobileTab] = useState("strengths");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-2xl shadow-sm overflow-hidden mt-6"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            {/* Panel Header (desktop) */}
            <div className="hidden md:block p-2 sm:p-6 lg:p-8" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: '1px solid rgba(182,138,53,0.18)' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2">
                            <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight"
                            style={{ color: isDark ? t.text : '#1A1A1A' }}>{data?.header?.title || "Strengths & Considerations"}</h3>
                        <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{data?.header?.subtitle || "Post-Completion Perspective"}</p>
                        <p className="text-[11px] mt-1" style={{ color: subtextColor }}>{data?.header?.description || "Post-completion perspective based on verified evidence"}</p>
                    </div>
                </div>
            </div>

            {/* Mobile accordion header */}
            <div className="md:hidden" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(prev => !prev)}
                    className="w-full p-4 flex items-start gap-4"
                    style={{ background: cardBg }}
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: '1px solid rgba(182,138,53,0.18)' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2">
                            <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
                        </svg>
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight"
                            style={{ color: isDark ? t.text : '#1A1A1A' }}>{data?.header?.title || "Strengths & Considerations"}</h3>
                        <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{data?.header?.subtitle || "Post-Completion Perspective"}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2" className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>

            {/* Body (visible on desktop or when mobile accordion is open) */}
            <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                {/* Mobile Tab Toggle */}
                <div className="md:hidden flex" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                    <button
                        onClick={() => setMobileTab("strengths")}
                        className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${mobileTab === "strengths"
                            ? "text-[#27AE60] border-b-2 border-[#27AE60]"
                            : "text-gray-400 hover:text-gray-500"
                            }`}
                        style={mobileTab === "strengths" && isDark ? { background: 'rgba(39,174,96,0.1)' } : { background: cardBg }}
                    >
                        Strengths
                    </button>
                    <button
                        onClick={() => setMobileTab("considerations")}
                        className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${mobileTab === "considerations"
                            ? "text-[#E67E22] border-b-2 border-[#E67E22]"
                            : "text-gray-400 hover:text-gray-500"
                            }`}
                        style={mobileTab === "considerations" && isDark ? { background: 'rgba(230,126,34,0.1)' } : { background: cardBg }}
                    >
                        Considerations
                    </button>
                </div>

                {/* Two-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0" style={{ borderColor: cardBorder }}>
                    {/* Strengths */}
                    <div className={`p-4 sm:p-6 lg:p-8 ${mobileTab !== "strengths" ? "hidden md:block" : ""}`}
                        style={{ borderRight: `1px solid ${cardBorder}` }}>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(39,174,96,0.15)' }}>
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="3">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-[#27AE60] uppercase tracking-widest">{data?.strengths?.title || "Strengths Demonstrated at Emirates Hills"}</span>
                        </div>
                        <div className="space-y-4">
                            {data?.strengths?.items?.map((s, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl"
                                    style={{ background: isDark ? 'rgba(39,174,96,0.08)' : '#F7FAF7', border: `1px solid ${isDark ? 'rgba(39,174,96,0.2)' : '#EEF6EE'}` }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                                        style={{ background: cardBg, border: `1px solid ${isDark ? 'rgba(39,174,96,0.2)' : '#EEF6EE'}` }}>
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d={s.iconPath} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1 leading-tight" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                                            {s.title}
                                        </h4>
                                        <p className="text-[12px] leading-relaxed" style={{ color: bodyColor }}>{s.evidence}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Considerations */}
                    <div className={`p-4 sm:p-6 lg:p-8 ${mobileTab !== "considerations" ? "hidden md:block" : ""}`}>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(230,126,34,0.15)' }}>
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#E67E22" strokeWidth="3">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-widest">{data?.considerations?.title || "Areas for Consideration (Based on Resident Feedback)"}</span>
                        </div>
                        <div className="space-y-4">
                            {data?.considerations?.items?.map((c, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl"
                                    style={{ background: isDark ? 'rgba(230,126,34,0.08)' : '#FFF9F5', border: `1px solid ${isDark ? 'rgba(230,126,34,0.2)' : '#FDE8D3'}` }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                                        style={{ background: cardBg, border: `1px solid ${isDark ? 'rgba(230,126,34,0.2)' : '#FDE8D3'}` }}>
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E67E22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d={c.iconPath} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1 leading-tight" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                                            {c.title}
                                        </h4>
                                        <p className="text-[12px] leading-relaxed" style={{ color: bodyColor }}>{c.context}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Source */}
                <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 pt-2">
                    <div className="flex gap-3 p-3 sm:p-4 rounded-xl items-start"
                        style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                        <AccentIconColumn>
                            <HiOutlineDatabase className="text-[#B68A35] text-lg" />
                        </AccentIconColumn>
                        <p className="text-[12px] sm:text-[11px] leading-snug" style={{ color: subtextColor }}>
                            <span className="font-bold" style={{ color: isDark ? t.textSecondary : '#374151' }}>Source:</span> {data?.source || ""}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Verification Framework Section ───────────────────────────────────────
const VerificationFrameworkSection = ({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-2xl shadow-sm overflow-hidden mt-6"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            {/* Header (desktop) */}
            <div className="hidden md:block p-4 sm:p-6 lg:p-8" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                <div className="flex items-start gap-4 mb-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: '1px solid rgba(182,138,53,0.18)' }}>
                        <HiOutlineShieldCheck className="text-[#B68A35] text-2xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight"
                            style={{ color: isDark ? t.text : '#1A1A1A' }}>{data?.header?.title || "Verification Framework for Prospective Buyers"}</h3>
                        <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{data?.header?.subtitle || "Before Purchasing a Resale Unit at Emirates Hills"}</p>
                    </div>
                </div>
            </div>

            {/* Mobile accordion header */}
            <div className="md:hidden" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(prev => !prev)}
                    className="w-full p-4 flex items-start gap-4"
                    style={{ background: cardBg }}
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: '1px solid rgba(182,138,53,0.18)' }}>
                        <HiOutlineShieldCheck className="text-[#B68A35] text-2xl" />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight"
                            style={{ color: isDark ? t.text : '#1A1A1A' }}>{data?.header?.title || "Verification Framework for Prospective Buyers"}</h3>
                        <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{data?.header?.subtitle || "Before Purchasing a Resale Unit at Emirates Hills"}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2" className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>

            {/* Body (visible on desktop or when mobile accordion is open) */}
            <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                {/* Steps */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
                        {data?.steps?.map((step, i) => (
                            <div key={i} className="flex flex-row lg:flex-col gap-4 lg:gap-3">
                                <div className="flex lg:flex-col items-center lg:items-start gap-3 shrink-0">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: '1px solid rgba(182,138,53,0.18)' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d={step.iconPath} />
                                        </svg>
                                    </div>
                                    <span className="text-[#B68A35] text-xl sm:text-2xl font-bold font-[Merriweather] leading-none">
                                        {step.num}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm mb-1.5 leading-tight" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                                        {step.title}
                                    </h4>
                                    <p className="text-[12px] leading-relaxed" style={{ color: bodyColor }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Disclaimer inside framework */}
                    <div className="mt-8 flex gap-3 p-4 rounded-xl items-start"
                        style={{ background: isDark ? 'rgba(230,126,34,0.08)' : '#FFF9F5', border: `1px solid ${isDark ? 'rgba(230,126,34,0.2)' : '#FDE8D3'}` }}>
                        <AccentIconColumn color="#E67E22">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </AccentIconColumn>
                        <p className="text-[11px] leading-relaxed" style={{ color: subtextColor }}>
                            <span className="font-bold" style={{ color: isDark ? t.textSecondary : '#374151' }}>Disclaimer:</span> {data?.disclaimer || ""}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── MAIN SECTION ────────────────────────────────────────────────────────────────
export default function Section3({ data }) {
    const { t, isDark, dark } = useThemeStyles();
    const [activeTab, setActiveTab] = useState("delivery");

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FBF9F6";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    const tabs = [
        { id: "delivery", label: "Delivery Track Record", icon: <HiOutlineClipboard /> },
        { id: "reality", label: "Reality Check", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
        { id: "performance", label: "Performance", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg> },
    ];

    if (!data) {
        return (
            <section className="w-full py-5 font-sans" style={{ background: sectionBg }}>
                <div className="max-w-350 mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-5 font-sans selection:bg-[#B68A35]/20" style={{ background: sectionBg }}>
            {/* ── Hero Header ──────────────────────────────────────────────────── */}
            <div className="md:hidden max-w-350 mx-auto px-1">
                <div
                    className="relative min-h-[285px] overflow-hidden border"
                    style={{
                        borderColor: t.cardBorder,
                        background: isDark ? t.cardBg : "#fffdfa",
                    }}
                >
                    <Image
                        src="/projects/cm-projects.webp"
                        alt={data.heroAlt || "Emirates Hills"}
                        fill
                        className="object-cover object-center"
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
                            className="text-[32px] font-semibold leading-[1.08] tracking-[-0.01em]"
                            style={{ color: t.text }}
                        >
                            {data.headings?.line1 || "Emaar Properties –"}
                            <span className="block">
                                {data.headings?.line2 || "Developer "}
                                <span className="text-[#B68A35]">{data.headings?.highlight || "Track Record"}</span>
                            </span>
                            <span className="block">{data.headings?.line3 || "for Emirates Hills"}</span>
                        </h2>
                        <p
                            className="mt-4 max-w-[380px] text-left text-[14px] font-normal leading-[24px] tracking-[-0.01em]"
                            style={{ color: t.textSecondary }}
                        >
                            {data.headerDescription || ""}
                        </p>
                        <span className="mt-5 block h-px w-20 bg-[#B68A35]" />
                    </div>
                </div>
            </div>

            <div className="hidden md:flex relative w-full h-80 lg:h-100 items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.heroImage || "/Home/Section3bg.webp"}
                        alt={data.heroAlt || "Emirates Hills"}
                        fill
                        className="object-cover object-center grayscale-10"
                        priority
                    />
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`}
                        style={isDark ? dark?.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        {data.headings?.line1 || "Emaar Properties –"}
                    </h2>
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        {data.headings?.line2 || "Developer "}
                        <span className="text-[#B68A35]">{data.headings?.highlight || "Track Record"}</span> {data.headings?.line3 || "for Emirates Hills"}
                    </h2>
                    <p className="max-w-4xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
                        {data.headerDescription || ""}
                    </p>
                </div>
            </div>

            {/* ── Content Area ─────────────────────────────────────────────────── */}
            <div className="max-w-350 mx-auto px-2">
                {/* Tab Card */}
                <div className="rounded-xl shadow-sm overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    {/* Tab Navigation */}
                    <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex-1 flex flex-col lg:flex-row items-center justify-center
                                    gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative
                                    ${activeTab === tab.id && !isDark ? "text-[#B68A35] bg-[#FDF8F0]/50" : !isDark && activeTab !== tab.id ? "text-gray-400 hover:text-gray-600 hover:bg-gray-50" : ""}
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
                                <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.id ? "font-bold" : "font-medium"}`}>
                                    {tab.label}
                                </span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-2 sm:p-6 lg:p-10 min-h-100 lg:min-h-125" style={{ background: cardBg }}>
                        {activeTab === "delivery" && <DeliveryTrackRecordView data={data.deliveryTrackRecord} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
                        {activeTab === "reality" && <RealityCheckView data={data.realityCheck} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
                        {activeTab === "performance" && <PerformanceView data={data.performance} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
                    </div>
                </div>

                {/* Strengths & Considerations */}
                <StrengthsConsiderationsSection data={data.strengthsConsiderations} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

                {/* Verification Framework */}
                <VerificationFrameworkSection data={data.verificationFramework} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

                {/* Global Disclaimer Footer */}
                <div className="p-2">
                    <div className="mt-6 flex items-start gap-4 p-2 sm:p-5 rounded-xl"
                        style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FDF8F0', border: `1px solid rgba(182,138,53,0.18)` }}>
                        <AccentIconColumn>
                            <LuInfo className="text-[#B68A35] text-xl" />
                        </AccentIconColumn>
                        <p className="text-[11px] uppercase tracking-wider font-bold leading-relaxed" style={{ color: subtextColor }}>
                            Disclaimer:{" "}
                            <span className="font-medium normal-case" style={{ color: bodyColor }}>
                                {data.footerDisclaimer || "All data is for educational and research purposes only. PropertyIntel.ae does not provide financial, legal, or investment advice. Market values, rental yields, and transaction data are estimates based on aggregated third-party sources and are subject to change."}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}