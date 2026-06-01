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

// ─── Shared Style Constants (mirrored from Section2) ───────────────────────
const sectionHeaderClass = "flex items-start gap-4 mb-8";
const sectionIconShellClass =
    "w-12 h-12 rounded-xl bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0 shadow-sm";
const sectionTitleClass =
    "text-[#1A1A1A] font-semibold font-[Merriweather] tabular-nums text-md sm:text-xl leading-tight";
const sectionSubtitleClass =
    "text-[#B68A35] text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1";
const sectionBodyClass = "text-[13px] md:text-sm text-gray-600 leading-relaxed";
const sectionPanelClass = "bg-white border border-[#F3EFE9] rounded-2xl shadow-sm";

const SectionHeader = ({ icon, title, subtitle }) => (
    <div className={sectionHeaderClass}>
        <div className={sectionIconShellClass}>{icon}</div>
        <div>
            <h3 className={sectionTitleClass}>{title}</h3>
            {subtitle ? <p className={sectionSubtitleClass}>{subtitle}</p> : null}
        </div>
    </div>
);

// ─── Checkmark SVG ─────────────────────────────────────────────────────────
const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);




const DeliveryTrackRecordView = () => {
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
        <div className="max-w-[1400px] mx-auto p-2 bg-white animate-in fade-in duration-500 space-y-12">
            {/* Header */}
            <SectionHeader
                icon={<HiOutlineClipboard className="text-[#B68A35] text-2xl sm:text-3xl" />}
                title="Delivery Track Record – Emirates Hills Project Outcome"
                subtitle="Project Phase · Handover Timeline"
            />

            {/* Timeline Section */}
            <div className="relative">
                {/* Vertical connecting line (Desktop: left-aligned | Mobile: beside dots) */}
                <div className="absolute left-[11px] lg:left-[11px] top-6 sm:top-8 bottom-12 w-[2px] bg-[#B68A35]/40" />

                <div className="space-y-4 lg:space-y-3">
                    {phases.map((phase, i) => (
                        <div key={i} className="flex gap-6 relative">
                            {/* Phase dot */}
                            <div className="w-6 h-6 flex items-center justify-center shrink-0 z-10 mt-1 lg:mt-6">
                                <div className="w-4 h-4 rounded-full bg-[#B68A35]" />
                            </div>

                            {/* Row Container */}
                            <div className="flex-1 bg-[#FAF9F6]/50 border border-[#F3EFE9] rounded-xl p-2 lg:p-4 lg:flex lg:items-center lg:justify-between lg:gap-8 transition-hover hover:border-[#B68A35]/30">

                                {/* Phase & Name */}
                                <div className="lg:w-1/4 mb-4 lg:mb-0">
                                    <p className="text-[#B68A35] text-[10px] font-bold uppercase tracking-wider mb-1">
                                        {phase.phase}
                                    </p>
                                    <h4 className="font-semibold font-[Merriweather] text-[#1A1A1A] text-base leading-tight">
                                        {phase.name}
                                    </h4>
                                </div>

                                {/* Dates Group */}
                                <div className="flex flex-wrap gap-6 sm:gap-12 lg:w-1/3 items-center">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Original Handover</p>
                                        <p className="text-sm font-bold text-[#1A1A1A]">{phase.original}</p>
                                    </div>
                                    <div className="hidden lg:block h-8 w-px bg-gray-100" />
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Actual Handover</p>
                                        <p className="text-sm font-bold text-[#1A1A1A]">{phase.actual}</p>
                                    </div>
                                </div>

                                {/* Delay Badge */}
                                <div className="mt-4 mb-4 lg:my-0 lg:w-24">
                                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border text-center min-w-[80px] ${phase.delayStyle}`}>
                                        {phase.delay}
                                    </span>
                                </div>

                                {/* Outcome */}
                                <div className="lg:w-1/3 lg:border-l lg:border-gray-100 lg:pl-4">
                                    <p className="text-[10px] font-bold text-[#B68A35] uppercase mb-1.5">
                                        Project Outcome
                                    </p>
                                    <p className="text-[12px] text-gray-600 leading-relaxed italic lg:not-italic">
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
                <div className="flex gap-4 p-6 bg-[#FAF9F6] border border-[#F3EFE9] rounded-2xl items-start h-fit">
                    <HiOutlineDatabase className="text-[#B68A35] text-2xl shrink-0" />
                    <div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                            <span className="font-bold text-gray-700 block mb-1 uppercase tracking-tight">Data Source</span>
                            DLD project completion records via DXBInteract.com; Emaar historical delivery reports.
                            Sample size: 4 phased handovers across ~450 villas, 2003–2008.
                        </p>
                    </div>
                </div>

                {/* Insights - desktop (visible on md+) */}
                <div className="hidden md:flex lg:col-span-2 rounded-xl gap-5 p-2 sm:p-6 bg-white border-l-4 border-[#B68A35] rounded-r-2xl shadow-sm border-y border-r border-y-[#F3EFE9] border-r-[#F3EFE9]">
                    <div className="bg-[#FDF8F0] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                        <HiOutlineLightBulb className="text-[#B68A35] text-2xl" />
                    </div>
                    <div>
                        <h4 className="font-bold text-[#1A1A1A] text-base mb-2">
                            What the outcomes indicate
                        </h4>
                        <p className="text-[13px] text-gray-600 leading-relaxed">
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

                {/* Insights - mobile accordion (visible on phones) */}
                <div className="md:hidden lg:col-span-2">
                    <div className="border border-[#F3EFE9] rounded-2xl overflow-hidden">
                        <button
                            className="w-full flex items-center justify-between gap-4 p-4"
                            onClick={() => setOpenInsights(!openInsights)}
                            aria-expanded={openInsights}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-[#FDF8F0] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                                    <HiOutlineLightBulb className="text-[#B68A35] text-2xl" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-[#1A1A1A] text-base mb-0 truncate">
                                        What the outcomes indicate
                                    </h4>
                                    <p className="text-[12px] text-gray-500 mt-1">Tap to expand</p>
                                </div>
                            </div>
                            <div className="shrink-0 text-gray-400">
                                {openInsights ? <HiChevronUp className="text-base" /> : <HiChevronDown className="text-base" />}
                            </div>
                        </button>

                        {openInsights && (
                            <div className="p-4 bg-white border-t border-[#F3EFE9]">
                                <p className="text-[13px] text-gray-600 leading-relaxed">
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
const RealityCheckView = () => {
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
        <div className="p-0 bg-white animate-in fade-in duration-500 mt-2 sm:mt-0">
            <SectionHeader
                icon={<HiOutlineShieldCheck className="text-[#B68A35] text-2xl sm:text-3xl" />}
                title="Original Promises vs. Reality – Emirates Hills Delivery Assessment"
                subtitle="Marketed Amenities vs. Delivered Infrastructure"
            />

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden border border-[#F3EFE9] rounded-2xl bg-white shadow-sm mb-8">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#FAF9F6] border-b border-[#F3EFE9]">
                            <th className="p-5 text-[12px] font-bold text-gray-700 uppercase tracking-widest w-[30%]">
                                Amenity (Original Marketing)
                            </th>
                            <th className="p-5 text-[12px] font-bold text-gray-700 uppercase tracking-widest w-[22%]">
                                Delivered Status
                            </th>
                            <th className="p-5 text-[12px] font-bold text-gray-700 uppercase tracking-widest">
                                Resident Verification (Aggregated Reviews)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {amenities.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-[#F3EFE9] last:border-0 hover:bg-[#FDF8F0]/20 transition-colors"
                            >
                                <td className="p-5">
                                    <div className="flex items-center gap-3">

                                        <span className="font-semibold text-[#1A1A1A] text-sm">{row.amenity}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span className="text-[#B68A35] font-bold text-sm">{row.status}</span>
                                </td>
                                <td className="p-5 text-gray-600 text-[13px] leading-relaxed">{row.verification}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden border border-[#F3EFE9] rounded-2xl overflow-hidden mb-2 sm:mb-8">
                {amenities.map((row, i) => (
                    <div key={i} className="border-b border-[#F3EFE9] last:border-0">
                        <button
                            className="w-full flex items-center justify-between p-4 text-left gap-2"
                            onClick={() => setOpenItem(openItem === i ? null : i)}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-5 h-5 rounded-full bg-[#EEF6EE] flex items-center justify-center shrink-0">
                                    <CheckIcon />
                                </div>
                                <span className="font-semibold text-[#1A1A1A] text-sm leading-tight">
                                    {row.amenity}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[#B68A35] font-bold text-[11px] hidden xs:block">
                                    {row.status}
                                </span>
                                {openItem === i ? (
                                    <HiChevronUp className="text-gray-400 text-base" />
                                ) : (
                                    <HiChevronDown className="text-gray-400 text-base" />
                                )}
                            </div>
                        </button>
                        {openItem === i && (
                            <div className="px-4 pb-4 space-y-2">
                                <p className="text-[#B68A35] font-bold text-[11px]">{row.status}</p>
                                <p className="text-[12px] text-gray-500 leading-relaxed">{row.verification}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Key Observations - desktop */}
            <div className="hidden md:block bg-[#FDF8F0]/60 border border-[#F3EFE9] rounded-2xl p-2 sm:p-6 mb-6">
                <div className="flex gap-3 mb-4 items-center">
                    <div className="bg-[#FDF8F0] w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                        <HiOutlineLightBulb className="text-[#B68A35] text-xl" />
                    </div>
                    <h4 className="font-bold text-[#B68A35] text-[10px] uppercase tracking-wider">
                        Key observations
                    </h4>
                </div>
                <p className={sectionBodyClass + " mb-4"}>
                    Emirates Hills represents one of Emaar's earliest ultra-luxury villa communities, delivered
                    before the company's current standardized delivery frameworks were fully established.
                    Despite this, the project achieved a high degree of alignment between marketed promises and
                    delivered outcomes. The bespoke nature of each villa meant that "quality" was assessed
                    individually rather than at a community scale, but aggregated feedback indicates that finish
                    standards, plot sizes, and amenity access met or exceeded buyer expectations at the time of
                    purchase.
                </p>
                <p className={sectionBodyClass}>
                    The community's sustained premium positioning in Dubai's luxury resale market—two decades
                    post-handover—further supports the conclusion that delivered value aligned with original
                    representations.
                </p>
            </div>

            {/* Key Observations - mobile accordion */}
            <div className="md:hidden mb-6">
                <div className="border border-[#F3EFE9] rounded-2xl overflow-hidden">
                    <button
                        className="w-full flex items-center justify-between gap-4 p-4"
                        onClick={() => setOpenKeyObs(!openKeyObs)}
                        aria-expanded={openKeyObs}
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-[#FDF8F0] w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                                <HiOutlineLightBulb className="text-[#B68A35] text-xl" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-[#B68A35] text-[10px] uppercase tracking-wider mb-0">
                                    Key observations
                                </h4>
                            </div>
                        </div>
                        <div className="shrink-0 text-gray-400">
                            {openKeyObs ? <HiChevronUp className="text-base" /> : <HiChevronDown className="text-base" />}
                        </div>
                    </button>

                    {openKeyObs && (
                        <div className="p-4 bg-[#FDF8F0]/60">
                            <p className={sectionBodyClass + " mb-4"}>
                                Emirates Hills represents one of Emaar's earliest ultra-luxury villa communities, delivered
                                before the company's current standardized delivery frameworks were fully established.
                                Despite this, the project achieved a high degree of alignment between marketed promises and
                                delivered outcomes. The bespoke nature of each villa meant that "quality" was assessed
                                individually rather than at a community scale, but aggregated feedback indicates that finish
                                standards, plot sizes, and amenity access met or exceeded buyer expectations at the time of
                                purchase.
                            </p>
                            <p className={sectionBodyClass}>
                                The community's sustained premium positioning in Dubai's luxury resale market—two decades
                                post-handover—further supports the conclusion that delivered value aligned with original
                                representations.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Source */}
            <div className="flex gap-3 p-3 sm:p-4 bg-[#FAF9F6] border border-[#F3EFE9] rounded-xl items-start">
                <HiOutlineDatabase className="text-[#B68A35] text-lg shrink-0" />
                <p className="text-[10px] sm:text-[11px] text-gray-500 leading-snug">
                    <span className="font-bold text-gray-700">Source:</span> Emaar original brochures
                    (2002–2003 archives), DLD handover documentation, aggregated resident reviews (Google,
                    community forums, property platforms), Q1 2025–Q1 2026.
                </p>
            </div>
        </div>
    );
};

// ─── Tab 3: Performance ───────────────────────────────────────────────────
const PerformanceView = () => {
    const [openItem, setOpenItem] = useState(0);
    const [openMeaning, setOpenMeaning] = useState(false);



    const services = [
        {
            area: "Snagging & Defect Rectification",
            period: "2004–2010",
            icon: (
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            ),
            highlight: "14–21 days avg. · <1% structural defects",
            performance:
                "Warranty claims processed within 14–21 days on average; structural defects rare (<1% of villas).",
            feedback:
                "Early-phase residents report efficient resolution; later phases benefited from refined processes.",
        },
        {
            area: "Long-Term Maintenance",
            period: "2010–Present",
            icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
            highlight: null,
            performance:
                "Emaar Community Management handles landscaping, security, and common-area upkeep; annual service charge reviews published via owners' association.",
            feedback:
                "Service charge increases (avg. 3–5% annually) align with amenity upgrades; transparency rated 'high' by long-term owners.",
        },
        {
            area: "Community Upgrades & Refreshes",
            period: "2015–2022",
            icon: <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
            highlight: null,
            performance:
                "Golf course refurbishment (2015), lake filtration system upgrade (2019), security technology refresh (2022).",
            feedback:
                "Residents note proactive investment in maintaining community standards; minimal disruption during upgrade works.",
        },
        {
            area: "Resale & Title Transfer Support",
            period: "Ongoing",
            icon: (
                <>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                </>
            ),
            highlight: null,
            performance:
                "DLD-registered freehold titles; Emaar facilitates NOC issuance for resale transactions within 5–7 business days.",
            feedback:
                "Resale process rated 'smooth' by 91% of verified transaction reviews; clear documentation standards.",
        },
    ];

    return (
        <div className="p-0 bg-white animate-in fade-in duration-500 mt-2 sm:mt-0">
            <SectionHeader
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2">
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                }
                title="Post-Handover Performance"
                subtitle="After-Sales Service & Warranty Handling · 2004–Present"
            />



            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden border border-[#F3EFE9] rounded-2xl bg-white shadow-sm mb-8">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#FAF9F6] border-b border-[#F3EFE9]">
                            <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[28%]">
                                Service Area
                            </th>
                            <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Performance Summary
                            </th>
                            <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Resident Feedback Pattern
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-[#F3EFE9] last:border-0 hover:bg-[#FDF8F0]/20 transition-colors"
                            >
                                <td className="p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0">
                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#B68A35"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                {row.icon}
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1A1A1A] text-sm leading-tight">
                                                {row.area}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{row.period}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5 text-gray-600 text-[13px] leading-relaxed">{row.performance}</td>
                                <td className="p-5 text-gray-500 text-[13px] leading-relaxed">{row.feedback}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden border border-[#F3EFE9] rounded-2xl overflow-hidden mb-2 sm:mb-8">
                {services.map((row, i) => (
                    <div key={i} className="border-b border-[#F3EFE9] last:border-0">
                        <button
                            className="w-full flex items-center justify-between p-4 text-left gap-3"
                            onClick={() => setOpenItem(openItem === i ? null : i)}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#B68A35"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {row.icon}
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-[#1A1A1A] text-sm leading-tight">{row.area}</p>
                                    <p className="text-[10px] text-gray-400">{row.period}</p>
                                </div>
                            </div>
                            {openItem === i ? (
                                <HiChevronUp className="text-gray-400 shrink-0" />
                            ) : (
                                <HiChevronDown className="text-gray-400 shrink-0" />
                            )}
                        </button>
                        {openItem === i && (
                            <div className="px-4 pb-4 space-y-3">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase mb-1">
                                        Performance Summary
                                    </p>
                                    <p className="text-[12px] text-gray-600 leading-relaxed">{row.performance}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase mb-1">
                                        Resident Feedback
                                    </p>
                                    <p className="text-[12px] text-gray-500 leading-relaxed">{row.feedback}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* What this means - desktop */}
            <div className="hidden md:block bg-[#FDF8F0]/60 border border-[#F3EFE9] rounded-2xl p-4 sm:p-6 mb-6">
                <div className="flex gap-3 mb-4 items-center">
                    <div className="bg-[#FDF8F0] w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                        <HiOutlineLightBulb className="text-[#B68A35] text-xl" />
                    </div>
                    <h4 className="font-bold text-[#B68A35] text-[10px] uppercase tracking-wider">
                        What this means for prospective buyers
                    </h4>
                </div>
                <p className={sectionBodyClass}>
                    Emirates Hills benefits from two decades of operational history, providing verified data on
                    Emaar's post-handover performance in an ultra-luxury context. After-sales service during
                    the initial warranty period was responsive, with structural issues being exceptionally rare.
                    Long-term community management has maintained high standards through scheduled upgrades and
                    transparent service charge reviews. For resale buyers, the established title transfer
                    process and clear documentation requirements reduce transaction friction compared to newer,
                    less-mature communities.
                </p>
            </div>

            {/* What this means - mobile accordion */}
            <div className="md:hidden mb-6">
                <div className="border border-[#F3EFE9] rounded-2xl overflow-hidden">
                    <button
                        className="w-full flex items-center justify-between gap-4 p-4"
                        onClick={() => setOpenMeaning(!openMeaning)}
                        aria-expanded={openMeaning}
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-[#FDF8F0] w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                                <HiOutlineLightBulb className="text-[#B68A35] text-xl" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-[#B68A35] text-[10px] uppercase tracking-wider mb-0">
                                    What this means for prospective buyers
                                </h4>
                            </div>
                        </div>
                        <div className="shrink-0 text-gray-400">
                            {openMeaning ? <HiChevronUp className="text-base" /> : <HiChevronDown className="text-base" />}
                        </div>
                    </button>

                    {openMeaning && (
                        <div className="p-4 bg-[#FDF8F0]/60">
                            <p className={sectionBodyClass}>
                                Emirates Hills benefits from two decades of operational history, providing verified data on
                                Emaar's post-handover performance in an ultra-luxury context. After-sales service during
                                the initial warranty period was responsive, with structural issues being exceptionally rare.
                                Long-term community management has maintained high standards through scheduled upgrades and
                                transparent service charge reviews. For resale buyers, the established title transfer
                                process and clear documentation requirements reduce transaction friction compared to newer,
                                less-mature communities.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Source */}
            <div className="flex gap-3 p-3 sm:p-4 bg-[#FAF9F6] border border-[#F3EFE9] rounded-xl items-start">
                <HiOutlineDatabase className="text-[#B68A35] text-lg shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-[11px] text-gray-500 leading-snug">
                    <span className="font-bold text-gray-700">Source:</span> Emaar Community Management annual
                    reports (2010–2025), DLD transaction records via DXBInteract.com, aggregated resident
                    reviews (Q1 2025–Q1 2026).
                </p>
            </div>
        </div>
    );
};

// ─── Strengths & Considerations Section ───────────────────────────────────
const StrengthsConsiderationsSection = () => {
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
        <div className="bg-white border border-[#F3EFE9] rounded-2xl shadow-sm overflow-hidden mt-6">
            {/* Panel Header (desktop) */}
            <div className="hidden md:block p-2 sm:p-6 lg:p-8 border-b border-[#F3EFE9]">
                <div className="flex items-start gap-4">
                    <div className={sectionIconShellClass}>
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
                        <h3 className={sectionTitleClass}>Strengths & Considerations</h3>
                        <p className={sectionSubtitleClass}>Post-Completion Perspective</p>
                        <p className="text-[11px] text-gray-400 mt-1">
                            Post-completion perspective based on verified evidence
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile accordion header */}
            <div className="md:hidden border-b border-[#F3EFE9]">
                <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(prev => !prev)}
                    className="w-full p-4 flex items-start gap-4"
                >
                    <div className={sectionIconShellClass}>
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
                        <h3 className={sectionTitleClass}>Strengths & Considerations</h3>
                        <p className={sectionSubtitleClass}>Post-Completion Perspective</p>
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
                <div className="md:hidden flex border-b border-[#F3EFE9]">
                    <button
                        onClick={() => setMobileTab("strengths")}
                        className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${mobileTab === "strengths"
                            ? "text-[#27AE60] border-b-2 border-[#27AE60] bg-[#F7FAF7]"
                            : "text-gray-400 hover:text-gray-500"
                            }`}
                    >
                        Strengths
                    </button>
                    <button
                        onClick={() => setMobileTab("considerations")}
                        className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${mobileTab === "considerations"
                            ? "text-[#E67E22] border-b-2 border-[#E67E22] bg-[#FFF9F5]"
                            : "text-gray-400 hover:text-gray-500"
                            }`}
                    >
                        Considerations
                    </button>
                </div>

                {/* Two-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#F3EFE9]">
                    {/* Strengths */}
                    <div
                        className={`p-4 sm:p-6 lg:p-8 ${mobileTab !== "strengths" ? "hidden md:block" : ""
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-5 h-5 rounded-full bg-[#EEF6EE] flex items-center justify-center shrink-0">
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="3">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-[#27AE60] uppercase tracking-widest">
                                Strengths Demonstrated at Emirates Hills
                            </span>
                        </div>
                        <div className="space-y-4">
                            {strengths.map((s, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 p-4 bg-[#F7FAF7] border border-[#EEF6EE] rounded-xl"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EEF6EE] flex items-center justify-center shrink-0 shadow-sm">
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
                                        <h4 className="font-bold text-[#1A1A1A] text-sm mb-1 leading-tight">
                                            {s.title}
                                        </h4>
                                        <p className="text-[12px] text-gray-500 leading-relaxed">{s.evidence}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Considerations */}
                    <div
                        className={`p-4 sm:p-6 lg:p-8 ${mobileTab !== "considerations" ? "hidden md:block" : ""
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-5 h-5 rounded-full bg-[#FFF4ED] flex items-center justify-center shrink-0">
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#E67E22" strokeWidth="3">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-widest">
                                Areas for Consideration (Based on Resident Feedback)
                            </span>
                        </div>
                        <div className="space-y-4">
                            {considerations.map((c, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 p-4 bg-[#FFF9F5] border border-[#FDE8D3] rounded-xl"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white border border-[#FDE8D3] flex items-center justify-center shrink-0 shadow-sm">
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
                                        <h4 className="font-bold text-[#1A1A1A] text-sm mb-1 leading-tight">
                                            {c.title}
                                        </h4>
                                        <p className="text-[12px] text-gray-500 leading-relaxed">{c.context}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Source */}
                <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 pt-2">
                    <div className="flex gap-3 p-3 sm:p-4 bg-[#FAF9F6] border border-[#F3EFE9] rounded-xl items-start">
                        <HiOutlineDatabase className="text-[#B68A35] text-lg shrink-0 mt-0.5" />
                        <p className="text-[10px] sm:text-[11px] text-gray-500 leading-snug">
                            <span className="font-bold text-gray-700">Source:</span> Aggregated resident reviews
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
const VerificationFrameworkSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const steps = [
        {
            num: "01",
            title: "Verify DLD Transaction History",
            desc: "Request the full DLD transaction history for the specific plot via the Dubai REST app to verify ownership chain, encumbrances, and past sale prices.",
            icon: (
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            ),
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
        <div className="bg-white border border-[#F3EFE9] rounded-2xl shadow-sm overflow-hidden mt-6">
            {/* Header (desktop) */}
            <div className="hidden md:block p-4 sm:p-6 lg:p-8 border-b border-[#F3EFE9]">
                <div className={sectionHeaderClass + " mb-0"}>
                    <div className={sectionIconShellClass}>
                        <HiOutlineShieldCheck className="text-[#B68A35] text-2xl" />
                    </div>
                    <div>
                        <h3 className={sectionTitleClass}>Verification Framework for Prospective Buyers</h3>
                        <p className={sectionSubtitleClass}>Before Purchasing a Resale Unit at Emirates Hills</p>
                    </div>
                </div>
            </div>

            {/* Mobile accordion header */}
            <div className="md:hidden border-b border-[#F3EFE9]">
                <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(prev => !prev)}
                    className="w-full p-4 flex items-start gap-4"
                >
                    <div className={sectionIconShellClass}>
                        <HiOutlineShieldCheck className="text-[#B68A35] text-2xl" />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className={sectionTitleClass}>Verification Framework for Prospective Buyers</h3>
                        <p className={sectionSubtitleClass}>Before Purchasing a Resale Unit at Emirates Hills</p>
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
                                    <div className="w-10 h-10 rounded-xl bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center">
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
                                    <h4 className="font-bold text-[#1A1A1A] text-sm mb-1.5 leading-tight">
                                        {step.title}
                                    </h4>
                                    <p className="text-[12px] text-gray-500 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Disclaimer inside framework */}
                    <div className="mt-8 flex gap-3 p-4 bg-[#FFF9F5] border border-[#FDE8D3] rounded-xl items-start">
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
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                            <span className="font-bold text-gray-700">Disclaimer:</span> All information is for
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
    const [activeTab, setActiveTab] = useState("delivery");

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
        <section className="w-full bg-[#FBF9F6] py-5 font-sans selection:bg-[#B68A35]/20">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
                </div>

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-0.5">
                        Emaar Properties –
                    </h2>
                    <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-0.5">
                        Developer{" "}
                        <span className="text-[#B68A35]">Track Record</span> for Emirates Hills
                    </h2>
                    <p className="max-w-4xl text-sm lg:text-base text-gray-600 leading-relaxed font-medium">
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
                <div className="bg-white rounded-xl border border-[#F3EFE9] overflow-hidden shadow-sm">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-[#F3EFE9] w-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex-1
                  flex flex-col lg:flex-row items-center justify-center
                  gap-1 lg:gap-3
                  py-3 lg:py-6
                  px-1 lg:px-4
                  transition-all relative
                  ${activeTab === tab.id
                                        ? "text-[#B68A35] bg-[#FDF8F0]/50"
                                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                    }
                `}
                            >
                                <span className="text-base lg:text-xl">{tab.icon}</span>
                                <span
                                    className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.id ? "font-bold" : "font-medium"
                                        }`}
                                >
                                    {tab.label}
                                </span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-2 sm:p-6 lg:p-10 bg-white min-h-100 lg:min-h-125">
                        {activeTab === "delivery" && <DeliveryTrackRecordView />}
                        {activeTab === "reality" && <RealityCheckView />}
                        {activeTab === "performance" && <PerformanceView />}
                    </div>
                </div>

                {/* Strengths & Considerations */}
                <StrengthsConsiderationsSection />

                {/* Verification Framework */}
                <VerificationFrameworkSection />

                {/* Global Disclaimer Footer */}
                <div className="p-2">
                    <div className="mt-6 flex items-start gap-4 p-2 sm:p-5 bg-[#FDF8F0] border border-[#B68A35]/10 rounded-xl">
                        <LuInfo className="text-[#B68A35] text-xl shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-wider font-bold">
                            Disclaimer:{" "}
                            <span className="font-medium normal-case">
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