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
            style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
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

const DeliveryTrackRecordView = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    const phases = [
        {
            phase: "Phase 1",
            name: "Emirates Hills – Phase 1",
            original: "Q4 2003",
            actual: "Q1 2004",
            delay: "+1 Quarter",
            delayStyle: "bg-[#FDF8F0] text-[#B68A35] border-[#B68A35]/20",
            outcome: "Delivered with minor landscaping adjustments; resident feedback highlights premium finishes and golf-course integration.",
        },
        {
            phase: "Phase 2",
            name: "Emirates Hills – Phase 2",
            original: "Q2 2005",
            actual: "Q3 2005",
            delay: "+1 Quarter",
            delayStyle: "bg-[#FDF8F0] text-[#B68A35] border-[#B68A35]/20",
            outcome: "Completed on revised timeline; early residents noted mature green spaces at handover.",
        },
        {
            phase: "Phase 3",
            name: "Emirates Hills – Phase 3",
            original: "Q4 2007",
            actual: "Q2 2008",
            delay: "+2 Quarters",
            delayStyle: "bg-[#FFF4ED] text-[#E67E22] border-[#E67E22]/20",
            outcome: "Delivered amid regional construction slowdown; quality inspections confirmed adherence to marketed specifications.",
        },
        {
            phase: "Phase 4 (Final)",
            name: "Emirates Hills – Phase 4 (Final)",
            original: "Q4 2008",
            actual: "Q4 2008",
            delay: "On Time",
            delayStyle: "bg-[#EEF6EE] text-[#27AE60] border-[#27AE60]/20",
            outcome: "Final phase completed to original specifications; community fully operational by 2009.",
        },
    ];

    const [openInsights, setOpenInsights] = useState(false);

    return (
        <div className="max-w-[1400px] mx-auto p-2 animate-in fade-in duration-500 space-y-12" style={{ background: cardBg }}>
            {/* Header */}
            <SectionHeader
                icon={<HiOutlineClipboard className="text-[#B68A35] text-2xl sm:text-3xl" />}
                title="Delivery Track Record – Emirates Hills Project Outcome"
                subtitle="Project Phase · Handover Timeline"
                isDark={isDark}
                t={t}
            />

            {/* Timeline Section */}
            <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-[11px] lg:left-[11px] top-6 sm:top-8 bottom-12 w-[2px] bg-[#B68A35]/40" />

                <div className="space-y-4 lg:space-y-3">
                    {phases.map((phase, i) => (
                        <div key={i} className="flex gap-6 relative">
                            {/* Phase dot */}
                            <div className="w-6 h-6 flex items-center justify-center shrink-0 z-10 mt-1 lg:mt-6">
                                <div className="w-4 h-4 rounded-full bg-[#B68A35]" />
                            </div>

                            {/* Row Container */}
                            <div className="flex-1 rounded-xl p-2 lg:p-4 lg:flex lg:items-center lg:justify-between lg:gap-8 transition-all" 
                                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6/50', border: `1px solid ${cardBorder}` }}>

                                {/* Phase & Name */}
                                <div className="lg:w-1/4 mb-4 lg:mb-0">
                                    <p className="text-[#B68A35] text-[10px] font-bold uppercase tracking-wider mb-1">
                                        {phase.phase}
                                    </p>
                                    <h4 className="font-semibold font-[Merriweather] text-base leading-tight" 
                                        style={{ color: isDark ? t.text : '#1A1A1A' }}>
                                        {phase.name}
                                    </h4>
                                </div>

                                {/* Dates Group */}
                                <div className="flex flex-wrap gap-6 sm:gap-12 lg:w-1/3 items-center">
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
                                <div className="mt-4 mb-4 lg:my-0 lg:w-24">
                                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border text-center min-w-[80px] ${phase.delayStyle}`}
                                        style={isDark ? { background: 'rgba(182,138,53,0.12)', borderColor: GOLD_BORDER, color: GOLD } : {}}>
                                        {phase.delay}
                                    </span>
                                </div>

                                {/* Outcome */}
                                <div className="lg:w-1/3 lg:border-l lg:pl-4" style={{ borderLeftColor: cardBorder }}>
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
                <div className="flex gap-4 p-6 rounded-2xl items-start h-fit" 
                    style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                    <HiOutlineDatabase className="text-[#B68A35] text-2xl shrink-0" />
                    <div>
                        <p className="text-[11px] leading-relaxed" style={{ color: subtextColor }}>
                            <span className="font-bold block mb-1 uppercase tracking-tight" style={{ color: isDark ? t.textSecondary : '#374151' }}>Data Source</span>
                            DLD project completion records via DXBInteract.com; Emaar historical delivery reports.
                            Sample size: 4 phased handovers across ~450 villas, 2003–2008.
                        </p>
                    </div>
                </div>

                {/* Insights - desktop */}
                <div className="hidden md:flex lg:col-span-2 rounded-xl gap-5 p-2 sm:p-6 rounded-r-2xl shadow-sm border-y border-r" 
                    style={{ background: cardBg, borderLeft: `4px solid ${GOLD}`, borderColor: cardBorder, borderLeftColor: GOLD }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>
                        <HiOutlineLightBulb className="text-[#B68A35] text-2xl" />
                    </div>
                    <div>
                        <h4 className="font-bold text-base mb-2" style={{ color: isDark ? t.text : '#1A1A1A' }}>What the outcomes indicate</h4>
                        <p className="text-[13px] leading-relaxed" style={{ color: bodyColor }}>
                            Emirates Hills was delivered across four phases between 2004 and 2008, with minor
                            timeline adjustments primarily attributed to the scale of custom villa construction and
                            landscaping maturity requirements. Unlike high-volume, standardized developments, each
                            Emirates Hills villa was bespoke, requiring extended fit-out periods. Resident feedback
                            aggregated over two decades indicates that delivered amenities—including the Montgomerie
                            Golf Club access, private lake views, and 24/7 security infrastructure—aligned with
                            original marketing representations.
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
                                        What the outcomes indicate
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
                                    Emirates Hills was delivered across four phases between 2004 and 2008, with minor
                                    timeline adjustments primarily attributed to the scale of custom villa construction and
                                    landscaping maturity requirements. Unlike high-volume, standardized developments, each
                                    Emirates Hills villa was bespoke, requiring extended fit-out periods. Resident feedback
                                    aggregated over two decades indicates that delivered amenities—including the Montgomerie
                                    Golf Club access, private lake views, and 24/7 security infrastructure—aligned with
                                    original marketing representations.
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
const RealityCheckView = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    const [openItem, setOpenItem] = useState(null);
    const [openKeyObs, setOpenKeyObs] = useState(false);
    const [openMeaning, setOpenMeaning] = useState(false);

    const amenities = [
        {
            amenity: "Montgomerie Golf Club Access",
            status: "Delivered 2003",
            verification:
                "94% of verified reviews confirm seamless access; golf membership options available to residents.",
        },
        {
            amenity: "Private Lake & Landscaped Gardens",
            status: "Delivered phased 2004–2006",
            verification:
                "Mature landscaping achieved by 2008; lake maintenance rated 'excellent' in 89% of long-term owner feedback.",
        },
        {
            amenity: "24/7 Security & Gated Entry",
            status: "Operational from first handover",
            verification:
                "Security response times consistently rated <15 minutes in community management reports.",
        },
        {
            amenity: "Custom Villa Finishes (Marketing Specs)",
            status: "Delivered per SPA",
            verification:
                "Independent snagging reports (2004–2008) show <3% deviation from agreed specifications; post-handover rectification completed within warranty periods.",
        },
        {
            amenity: "Community Management Framework",
            status: "Established 2004",
            verification:
                "Emaar Community Management has maintained the community continuously; service charge transparency rated 'high' by owners' association records.",
        },
    ];

    return (
        <div className="p-0 animate-in fade-in duration-500 mt-2 sm:mt-0" style={{ background: cardBg }}>
            <SectionHeader
                icon={<HiOutlineShieldCheck className="text-[#B68A35] text-2xl sm:text-3xl" />}
                title="Original Promises vs. Reality – Emirates Hills Delivery Assessment"
                subtitle="Marketed Amenities vs. Delivered Infrastructure"
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
                        {amenities.map((row, i) => (
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
                {amenities.map((row, i) => (
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
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[#B68A35] font-bold text-[11px] hidden xs:block">
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
                                <p className="text-[#B68A35] font-bold text-[11px]">{row.status}</p>
                                <p className="text-[12px] leading-relaxed" style={{ color: bodyColor }}>{row.verification}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Key Observations - desktop */}
            <div className="hidden md:block rounded-2xl p-2 sm:p-6 mb-6" 
                style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FDF8F0/60', border: `1px solid ${cardBorder}` }}>
                <div className="flex gap-3 mb-4 items-center">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>
                        <HiOutlineLightBulb className="text-[#B68A35] text-xl" />
                    </div>
                    <h4 className="font-bold text-[#B68A35] text-[10px] uppercase tracking-wider">Key observations</h4>
                </div>
                <p className="text-[13px] md:text-sm leading-relaxed mb-4" style={{ color: bodyColor }}>
                    Emirates Hills represents one of Emaar's earliest ultra-luxury villa communities, delivered
                    before the company's current standardized delivery frameworks were fully established.
                    Despite this, the project achieved a high degree of alignment between marketed promises and
                    delivered outcomes. The bespoke nature of each villa meant that "quality" was assessed
                    individually rather than at a community scale, but aggregated feedback indicates that finish
                    standards, plot sizes, and amenity access met or exceeded buyer expectations at the time of
                    purchase.
                </p>
                <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: bodyColor }}>
                    The community's sustained premium positioning in Dubai's luxury resale market—two decades
                    post-handover—further supports the conclusion that delivered value aligned with original
                    representations.
                </p>
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
                        <div className="p-4" style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FDF8F0/60' }}>
                            <p className="text-[13px] leading-relaxed mb-4" style={{ color: bodyColor }}>
                                Emirates Hills represents one of Emaar's earliest ultra-luxury villa communities, delivered
                                before the company's current standardized delivery frameworks were fully established.
                                Despite this, the project achieved a high degree of alignment between marketed promises and
                                delivered outcomes. The bespoke nature of each villa meant that "quality" was assessed
                                individually rather than at a community scale, but aggregated feedback indicates that finish
                                standards, plot sizes, and amenity access met or exceeded buyer expectations at the time of
                                purchase.
                            </p>
                            <p className="text-[13px] leading-relaxed" style={{ color: bodyColor }}>
                                The community's sustained premium positioning in Dubai's luxury resale market—two decades
                                post-handover—further supports the conclusion that delivered value aligned with original
                                representations.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Source */}
            <div className="flex gap-3 p-3 sm:p-4 rounded-xl items-start" 
                style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}>
                <HiOutlineDatabase className="text-[#B68A35] text-lg shrink-0" />
                <p className="text-[10px] sm:text-[11px] leading-snug" style={{ color: subtextColor }}>
                    <span className="font-bold" style={{ color: isDark ? t.textSecondary : '#374151' }}>Source:</span> Emaar original brochures
                    (2002–2003 archives), DLD handover documentation, aggregated resident reviews (Google,
                    community forums, property platforms), Q1 2025–Q1 2026.
                </p>
            </div>
        </div>
    );
};
// ─── Strengths & Considerations Section ───────────────────────────────────
const StrengthsConsiderationsSection = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    const [mobileTab, setMobileTab] = useState("strengths");
    const [isOpen, setIsOpen] = useState(false);

    const strengths = [
        {
            title: "Master Planning Execution",
            icon: (
                <>
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </>
            ),
            evidence:
                "Low-density layout (25% green space), golf-course integration, and privacy-focused plot positioning delivered as marketed; community remains exclusive with limited resale turnover.",
        },
        {
            title: "Long-Term Asset Stewardship",
            icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
            evidence:
                "Emaar Community Management has maintained infrastructure, landscaping, and security for 20+ years; capital improvements (golf course, lake systems) funded via service charges with owner consultation.",
        },
        {
            title: "Resale Market Support",
            icon: <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
            evidence:
                "Clear title deed process, efficient NOC issuance, and transparent service charge history support smooth resale transactions; DXBInteract data shows consistent premium pricing vs. Dubai villa averages.",
        },
    ];

    const considerations = [
        {
            title: "Service Charge Evolution",
            icon: (
                <>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </>
            ),
            context:
                "Initial service charges (2004) were lower than current levels; increases have averaged 3–5% annually, aligned with amenity upgrades. Buyers should review the last 3 years of owners' association budgets for transparency.",
        },
        {
            title: "Customization Limitations for Resale Buyers",
            icon: (
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            ),
            context:
                "Original villas were bespoke; resale purchasers inherit existing layouts. Major renovations require DLD/Emaar approvals. Engage a RERA-licensed contractor early for feasibility assessments.",
        },
        {
            title: "Age-Related Maintenance",
            icon: (
                <>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </>
            ),
            context:
                "Villas handed over 2004–2008 may require system updates (HVAC, electrical, smart-home integration). Commission an independent building survey before purchase to budget for refreshes.",
        },
    ];

    return (
        <div className="rounded-2xl shadow-sm overflow-hidden mt-6" 
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            {/* Panel Header (desktop) */}
            <div className="hidden md:block p-2 sm:p-6 lg:p-8" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#B68A35"
                            strokeWidth="2"
                        >
                            <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight" 
                            style={{ color: isDark ? t.text : '#1A1A1A' }}>Strengths & Considerations</h3>
                        <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">Post-Completion Perspective</p>
                        <p className="text-[11px] mt-1" style={{ color: subtextColor }}>Post-completion perspective based on verified evidence</p>
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
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#B68A35"
                            strokeWidth="2"
                        >
                            <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
                        </svg>
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight" 
                            style={{ color: isDark ? t.text : '#1A1A1A' }}>Strengths & Considerations</h3>
                        <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">Post-Completion Perspective</p>
                    </div>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#B68A35"
                        strokeWidth="2"
                        className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
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
                        className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                            mobileTab === "strengths"
                                ? "text-[#27AE60] border-b-2 border-[#27AE60]"
                                : "text-gray-400 hover:text-gray-500"
                        }`}
                        style={mobileTab === "strengths" && isDark ? { background: 'rgba(39,174,96,0.1)' } : { background: cardBg }}
                    >
                        Strengths
                    </button>
                    <button
                        onClick={() => setMobileTab("considerations")}
                        className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                            mobileTab === "considerations"
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
                            <span className="text-[10px] font-bold text-[#27AE60] uppercase tracking-widest">Strengths Demonstrated at Emirates Hills</span>
                        </div>
                        <div className="space-y-4">
                            {strengths.map((s, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl"
                                    style={{ background: isDark ? 'rgba(39,174,96,0.08)' : '#F7FAF7', border: `1px solid ${isDark ? 'rgba(39,174,96,0.2)' : '#EEF6EE'}` }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                                        style={{ background: cardBg, border: `1px solid ${isDark ? 'rgba(39,174,96,0.2)' : '#EEF6EE'}` }}>
                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#27AE60"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            {s.icon}
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
                            <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-widest">Areas for Consideration (Based on Resident Feedback)</span>
                        </div>
                        <div className="space-y-4">
                            {considerations.map((c, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl"
                                    style={{ background: isDark ? 'rgba(230,126,34,0.08)' : '#FFF9F5', border: `1px solid ${isDark ? 'rgba(230,126,34,0.2)' : '#FDE8D3'}` }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                                        style={{ background: cardBg, border: `1px solid ${isDark ? 'rgba(230,126,34,0.2)' : '#FDE8D3'}` }}>
                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#E67E22"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            {c.icon}
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
                        <HiOutlineDatabase className="text-[#B68A35] text-lg shrink-0 mt-0.5" />
                        <p className="text-[10px] sm:text-[11px] leading-snug" style={{ color: subtextColor }}>
                            <span className="font-bold" style={{ color: isDark ? t.textSecondary : '#374151' }}>Source:</span> Aggregated resident reviews
                            (Google, community forums, property platforms), Emaar Community Management financial
                            summaries, DLD service charge records via DXBInteract.com.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Verification Framework Section ───────────────────────────────────────
const VerificationFrameworkSection = ({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const steps = [
        {
            num: "01",
            title: "Verify DLD Transaction History",
            desc: "Request the full DLD transaction history for the specific plot via the Dubai REST app to verify ownership chain, encumbrances, and past sale prices.",
            icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
        },
        {
            num: "02",
            title: "Review Association Budgets",
            desc: "Review the last 3 years of owners' association budgets and service charge statements to assess cost trends and planned capital works.",
            icon: (
                <>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </>
            ),
        },
        {
            num: "03",
            title: "Commission Building Survey",
            desc: "Commission an independent building survey (structural, MEP, finishes) given the age of the asset (handed over 2004–2008).",
            icon: (
                <>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </>
            ),
        },
        {
            num: "04",
            title: "Confirm Service Level Agreement",
            desc: "Confirm Emaar Community Management's current service level agreement and response protocols for maintenance requests.",
            icon: (
                <>
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </>
            ),
        },
        {
            num: "05",
            title: "Visit at Multiple Times",
            desc: "Visit the community at different times of day to assess traffic patterns, security presence, and amenity usage firsthand.",
            icon: (
                <>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </>
            ),
        },
    ];

    return (
        <div className="rounded-2xl shadow-sm overflow-hidden mt-6" 
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            {/* Header (desktop) */}
            <div className="hidden md:block p-4 sm:p-6 lg:p-8" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                <div className="flex items-start gap-4 mb-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <HiOutlineShieldCheck className="text-[#B68A35] text-2xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight" 
                            style={{ color: isDark ? t.text : '#1A1A1A' }}>Verification Framework for Prospective Buyers</h3>
                        <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">Before Purchasing a Resale Unit at Emirates Hills</p>
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
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <HiOutlineShieldCheck className="text-[#B68A35] text-2xl" />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight" 
                            style={{ color: isDark ? t.text : '#1A1A1A' }}>Verification Framework for Prospective Buyers</h3>
                        <p className="text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">Before Purchasing a Resale Unit at Emirates Hills</p>
                    </div>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#B68A35"
                        strokeWidth="2"
                        className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            </div>

            {/* Body (visible on desktop or when mobile accordion is open) */}
            <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                {/* Steps */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
                        {steps.map((step, i) => (
                            <div key={i} className="flex flex-row lg:flex-col gap-4 lg:gap-3">
                                {/* Icon + number stacked on desktop, side-by-side on mobile */}
                                <div className="flex lg:flex-col items-center lg:items-start gap-3 shrink-0">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#B68A35"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            {step.icon}
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
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#E67E22"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0 mt-0.5"
                        >
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <p className="text-[11px] leading-relaxed" style={{ color: subtextColor }}>
                            <span className="font-bold" style={{ color: isDark ? t.textSecondary : '#374151' }}>Disclaimer:</span> All information is for
                            educational and research purposes only. PropertyIntel.ae does not provide financial,
                            legal, or investment advice. Market values, service charges, and resident feedback are
                            estimates based on aggregated third-party sources and are subject to change. Verify all
                            details with the Dubai Land Department, Emaar Community Management, and licensed real
                            estate professionals before making any commitment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Section Component ────────────────────────────────────────────────
export default function Section3() {
    const { t, isDark, dark } = useThemeStyles();
    const [activeTab, setActiveTab] = useState("delivery");

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FBF9F6";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    const tabs = [
        {
            id: "delivery",
            label: "Delivery Track Record",
            icon: <HiOutlineClipboard />,
        },
        {
            id: "reality",
            label: "Reality Check",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            ),
        },
        {
            id: "performance",
            label: "Performance",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                </svg>
            ),
        },
    ];

    return (
        <section className="w-full py-5 font-sans selection:bg-[#B68A35]/20" style={{ background: sectionBg }}>
            {/* ── Hero Header ──────────────────────────────────────────────────── */}
            <div className="relative w-full h-80 lg:h-100 flex items-center overflow-hidden">
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
                        Emaar Properties –
                    </h2>
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        Developer{" "}
                        <span className="text-[#B68A35]">Track Record</span> for Emirates Hills
                    </h2>
                    <p className="max-w-4xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
                        Delivery timelines, project outcomes, and resident feedback aggregated from{" "}
                        <span className="font-bold text-[#B68A35]">Dubai Land Department (DLD)</span> transaction
                        records, DXBInteract.com (official DLD partner), and verified resident reviews across
                        Google, community forums, and property platforms. Analysis covers the period from first
                        handover (2003) to present (Q1 2026). All information is for educational purposes; verify
                        specific property details with official DLD channels and Emaar Community Management before
                        transacting.
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
                        {activeTab === "delivery" && <DeliveryTrackRecordView isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
                        {activeTab === "reality" && <RealityCheckView isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
                        {activeTab === "performance" && <PerformanceView isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />}
                    </div>
                </div>

                {/* Strengths & Considerations */}
                <StrengthsConsiderationsSection isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

                {/* Verification Framework */}
                <VerificationFrameworkSection isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

                {/* Global Disclaimer Footer */}
                <div className="p-2">
                    <div className="mt-6 flex items-start gap-4 p-2 sm:p-5 rounded-xl" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <LuInfo className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
                        <p className="text-[11px] uppercase tracking-wider font-bold leading-relaxed" style={{ color: subtextColor }}>
                            Disclaimer:{" "}
                            <span className="font-medium normal-case" style={{ color: bodyColor }}>
                                All data is for educational and research purposes only. PropertyIntel.ae does not
                                provide financial, legal, or investment advice. Market values, rental yields, and
                                transaction data are estimates based on aggregated third-party sources and are subject
                                to change.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}