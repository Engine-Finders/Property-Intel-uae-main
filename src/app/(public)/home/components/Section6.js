"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    HiOutlineBuildingOffice2,
    HiOutlineInformationCircle,
    HiOutlineCheckCircle,
    HiOutlineLightBulb,
    HiOutlineCalendarDays
} from "react-icons/hi2";
import { BsBuildings, BsCurrencyEuro, BsStar, BsChevronDown, BsChevronUp, BsArrowRight } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { LuInfo, LuShieldCheck } from "react-icons/lu";
import { MdCalendarToday, MdOutlineVerifiedUser, MdTrendingUp } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { GoShieldCheck } from "react-icons/go";
import { IoDocumentOutline } from "react-icons/io5";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaRegSmile, FaTree, FaHome } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { LuWheat } from "react-icons/lu";
import { PiHouseLineLight } from "react-icons/pi";
import { TbBuildingBurjAlArab } from "react-icons/tb";
import { ExternalLink, Building2 } from 'lucide-react';
import ExpertSection from './ExpertSection';
import { TbBulb } from "react-icons/tb";
import { BsShield } from "react-icons/bs";
import { useThemeStyles, GOLD_BORDER, PANEL_DARK_BG } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";

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

export default function Section6({ data }) {
    const [activeTab, setActiveTab] = useState('structure');
    const { t, isDark, dark } = useThemeStyles();

    const cardBg = isDark ? PANEL_DARK_BG : "#FFFFFF";
    const cardBorder = isDark ? t.cardBorder : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FFFFFF";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    if (!data) {
        return (
            <section style={{ background: sectionBg }} className="font-sans">
                <div className="max-w-[1400px] mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
                </div>
            </section>
        );
    }

    const COMMUNITY_ASSESSMENTS = data.communityAssessments || [];

    const headerDescription = data.header?.description || "We analyse how Emaar manages communities post-handover, service charge trends, and asset condition to assess long-term preservation.";

    return (
        <section style={{ background: sectionBg }} className="font-sans">
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
                            {data.header?.title?.line1 || "Emaar Community Management:"}
                            <span className="block text-[#B68A35]">{data.header?.title?.line2 || "Long-Term Value Analysis"}</span>
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
                        {data.header?.title?.line1 || "Emaar Community Management:"}
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        {data.header?.title?.line2 || "Long-Term Value Analysis"}
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base leading-[17px] font-medium" style={{ color: bodyColor }}>
                        {headerDescription}
                    </p>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-[1400px] mx-auto px-2 md:-mt-12 relative z-20 pb-20">
                <div style={{ background: cardBg, border: `1px solid ${cardBorder}` }} className="rounded lg:rounded-xl shadow-sm overflow-hidden">
                    <div
                        className="flex flex-row items-stretch gap-1 lg:px-0"
                        style={isDark ? { ...dark.tabBar, borderBottom: `1px solid ${cardBorder}` } : { borderBottom: `1px solid ${cardBorder}` }}
                    >
                        {data.tabs?.map((tab) => (
                            <TabButton
                                key={tab.id}
                                active={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                icon={getTabIcon(tab.iconName)}
                                label={tab.label}
                                isDark={isDark}
                                dark={dark}
                                cardBorder={cardBorder}
                                subtextColor={subtextColor}
                                t={t}
                            />
                        ))}
                    </div>

                    {/* --- TAB CONTENT AREA --- */}
                    <div className="p-2 sm:p-6 lg:p-6 min-h-[480px]">
                        {activeTab === 'structure' && <ManagementStructureView data={data.managementStructure} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} subtextColor={subtextColor} bodyColor={bodyColor} t={t} />}
                        {activeTab === 'charges' && <ServiceChargesView data={data.serviceCharges} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} subtextColor={subtextColor} bodyColor={bodyColor} t={t} />}
                        {activeTab === 'rating' && <AssetConditionView data={data.assetCondition} communityAssessments={COMMUNITY_ASSESSMENTS} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} subtextColor={subtextColor} bodyColor={bodyColor} t={t} />}
                    </div>
                </div>

                {/* --- SHARED FOOTER BLOCKS (Owner Satisfaction & Insights) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <SatisfactionCard data={data.ownerSatisfaction} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} subtextColor={subtextColor} bodyColor={bodyColor} t={t} />
                    <AnalystInsightCard data={data.analystInsight} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} subtextColor={subtextColor} bodyColor={bodyColor} t={t} />
                </div>

                <ExpertSection />

                {/* --- METADATA FOOTER --- */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-6 p-2 sm:p-4 rounded lg:rounded-2xl" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(182,138,53,0.06)' : '#fdfaf8' }}>
                    <div className="w-full md:flex-1">
                        <div className="lg:hidden">
                            <MobileNoteBox
                                icon={<LuInfo className="w-5 h-5" />}
                                textStyle={{ color: subtextColor }}
                            >
                                {data.footer?.disclaimer || "All service charge data sourced from DLD Mollak Index where publicly available; placeholders indicate backend-populated values for real-time accuracy. Actual charges vary by building, floor, and unit size. Asset condition ratings are PropertyIntel proprietary assessments based on site visits and aggregated owner feedback."}
                            </MobileNoteBox>
                        </div>
                        <div className="hidden lg:flex items-start gap-3 max-w-2xl">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={isDark ? { background: 'rgba(182,138,53,0.12)', border: `1px solid ${cardBorder}` } : { background: '#FBF9F6', border: '1px solid #F3EFE9' }}>
                                <LuInfo className="text-[#B68A35] w-5 h-5" />
                            </div>
                            <p className="text-[11px] leading-relaxed" style={{ color: subtextColor }}>
                                {data.footer?.disclaimer || "All service charge data sourced from DLD Mollak Index where publicly available; placeholders indicate backend-populated values for real-time accuracy. Actual charges vary by building, floor, and unit size. Asset condition ratings are PropertyIntel proprietary assessments based on site visits and aggregated owner feedback."}
                            </p>
                        </div>
                    </div>
                    <div className="rounded lg:rounded-lg p-3 flex items-center gap-3 shrink-0 w-full md:w-auto" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                        <MdCalendarToday className="text-[#B68A35] w-4 h-4 shrink-0" />
                        <span className="text-[11px] font-medium leading-normal" style={{ color: subtextColor }}>{data.footer?.lastUpdated || "Last updated: 22 February 2026"}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- TAB SUB-COMPONENTS ---

function TabButton({ active, onClick, icon, label, isDark, dark, cardBorder, subtextColor, t }) {
    return (
        <button
            onClick={onClick}
            className={`relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-2 sm:py-5 px-2 sm:px-4 transition-all border-b-2
                ${active && !isDark ? "text-[#B68A35] border-[#B68A35] bg-white" : !isDark && !active ? "text-gray-400 border-transparent bg-[#FBF9F6] hover:text-gray-600" : ""}
            `}
            style={
                isDark
                    ? active
                        ? { ...dark.tabActive, borderBottomColor: GOLD_BORDER, color: "#B68A35" }
                        : { ...dark.tabInactive, borderBottomColor: "transparent" }
                    : undefined
            }
        >
            {icon}
            <span className="font-bold text-[10px] sm:text-xs tracking-wide uppercase text-center leading-tight">{label}</span>
            {isDark && active && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" aria-hidden />
            )}
        </button>
    );
}

function ManagementStructureView({ data, isDark, cardBg, cardBorder, subtextColor, bodyColor, t }) {
    const cards = data?.cards || [];
    return (
        <div className="space-y-8 py-4">
            <h3 className="text-lg lg:text-xl font-serif font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data?.title || "Management Structure"}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} style={{ background: cardBg, border: `1px solid ${cardBorder}` }} className="rounded lg:rounded-xl p-2 sm:p-8 flex gap-2 sm:gap-6 shadow-sm">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0" style={!isDark ? { background: '#fbf6ec', border: '1px solid #F3EFE9' } : { background: 'rgba(182,138,53,0.12)', border: `1px solid ${cardBorder}` }}>
                            {getManagementIcon(card.iconName)}
                        </div>
                        <div className="flex flex-col flex-1">
                            <div>
                                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest sm:mb-2" style={{ color: subtextColor }}>{card.label}</p>
                                <h4 className="text-sm sm:text-lg font-bold mb-3 font-serif" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{card.title}</h4>
                                {card.badge && <span className="inline-block px-2.5 py-1 text-[#B68A35] text-[10px] border border-[#B68A35] font-bold rounded-2xl mb-3" style={{ background: isDark ? 'transparent' : 'white' }}>{card.badge}</span>}
                                <p className="text-[13px] leading-normal sm:text-sm sm:leading-relaxed" style={{ color: bodyColor }}>{card.description}</p>
                            </div>
                            <div className="mt-auto pt-4 flex items-center gap-2 text-[12px]" style={{ color: subtextColor }}>
                                <IoDocumentOutline className="w-5 h-5 text-[#B68A35]" />
                                <span>{card.source}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const SourceLink = ({ label, href, isDark, subtextColor }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[11px] font-medium hover:text-[#B68A35] group"
        style={{ color: subtextColor }}
    >
        <span className="w-2 h-2 rounded-full group-hover:bg-[#B68A35]" style={{ background: subtextColor }} />
        <span className="underline decoration-gray-200 underline-offset-4 group-hover:decoration-[#B68A35] text-md">{label}</span>
        <ExternalLink className="w-4 h-4 text-[#B68A35]" />
    </a>
);

function ServiceChargesView({ data, isDark, cardBg, cardBorder, subtextColor, bodyColor, t }) {
    const tables = data?.tables || [];
    return (
        <div className="space-y-6 py-4">
            <div>
                <h3 className="text-lg lg:text-xl font-serif font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data?.title || "Service Charge History"}</h3>
                <p className="text-[13px] leading-normal lg:text-xs mt-2" style={{ color: subtextColor }}>{data?.subtitle || "Service charge data is sourced from the DLD Mollak Service Charge Index and verified against official records."}</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {tables.map((table, idx) => (
                    <ChargeTable
                        key={idx}
                        community={table.community}
                        type={table.type}
                        data={table.data}
                        summary={table.summary}
                        isDark={isDark}
                        cardBg={cardBg}
                        cardBorder={cardBorder}
                        subtextColor={subtextColor}
                        bodyColor={bodyColor}
                        t={t}
                    />
                ))}
            </div>
        </div>
    );
}

function ChargeTable({ community, type, data, summary, isDark, cardBg, cardBorder, subtextColor, bodyColor, t }) {
    return (
        <div style={{ border: `1px solid ${cardBorder}` }} className="rounded lg:rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 flex items-center gap-3" style={{ background: cardBg, borderBottom: `1px solid ${cardBorder}` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={!isDark ? { background: '#fbf6ec' } : { background: 'rgba(182,138,53,0.12)' }}>
                    <TbActivityHeartbeat className="text-[#B68A35] w-10 h-10" />
                </div>
                <div>
                    <h4 className="font-bold text-sm" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{community}</h4>
                    <span className="text-[10px] text-[#B68A35] font-bold uppercase tracking-wider rounded-2xl p-1" style={!isDark ? { background: '#fbf6ec' } : { background: 'rgba(182,138,53,0.12)' }}>{type}</span>
                </div>
            </div>
            <table className="w-full text-left text-[11px]">
                <thead>
                    <tr style={{ color: subtextColor, borderBottom: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#fbf6ec' }} className="uppercase font-bold text-xs">
                        <th className="p-4">Year</th>
                        <th className="p-4">AED/SQFT</th>
                        <th className="p-4">Change</th>
                        <th className="p-4">Source</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${cardBorder}`, color: bodyColor }} className="hover:bg-white/50 transition-colors">
                            <td className="p-4 font-bold" style={isDark ? { color: t.text } : { color: '#374151' }}>{row.year}</td>
                            <td className="p-4 font-bold text-[#B68A35] text-sm">{row.charge}</td>
                            <td className={`p-4 font-bold ${row.change.includes('+') ? 'text-[#89C587]' : ''}`}>{row.change}</td>
                            <td className="p-4 text-[10px]" style={{ color: subtextColor }}>{row.source}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-4 flex gap-3" style={{ background: isDark ? 'rgba(182,138,53,0.06)' : 'rgba(253,247,231,0.3)', borderTop: `1px solid ${cardBorder}` }}>
                <MdTrendingUp className="text-[#B68A35] w-8 h-8 shrink-0" />
                <div>
                    <p className="text-[12px] font-bold text-[#B68A35] uppercase tracking-widest mb-1">Trend Summary</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: bodyColor }}>{summary}</p>
                </div>
            </div>
        </div>
    );
}

function AssetConditionView({ data, communityAssessments, isDark, cardBg, cardBorder, subtextColor, bodyColor, t }) {
    const [isSourcesOpen, setIsSourcesOpen] = useState(false);
    const [openCommunityId, setOpenCommunityId] = useState('');

    return (
        <div className="space-y-8 py-4">
            <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FBF9F6', border: `1px solid ${cardBorder}` }} className="rounded lg:rounded-xl shadow-sm">
                {/* Mobile Layout */}
                <div className="lg:hidden p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: subtextColor }}>{data?.ratingLabel || "Overall Rating"}</p>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-5xl font-serif font-bold text-[#B68A35]">{data?.overallRating || "4.2"}</span>
                        <span className="text-lg font-serif" style={isDark ? { color: t.textSecondary } : { color: '#4A4A4A' }}>/ 5</span>
                    </div>
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4].map((s) => (
                            <BsStar key={s} className="w-5 h-5 fill-[#B68A35]" />
                        ))}
                        <BsStar className="w-5 h-5 fill-[#B68A35]/30" />
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid ${cardBorder}` }}>
                            <BsShield className="text-[#B68A35] w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[13px] leading-normal font-medium" style={{ color: bodyColor }}>{data?.basedOnLabel || "Based on community data"}</p>
                            <p className="text-[13px] leading-normal font-medium" style={{ color: bodyColor }}>{data?.communitiesCount || "4 communities assessed"}</p>
                        </div>
                    </div>

                    <p className="text-[13px] leading-normal" style={{ color: bodyColor }}>
                        {data?.summary || "Emaar's established communities demonstrate strong long-term value preservation with generally good to excellent asset condition."}
                    </p>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex items-stretch" style={{ divideX: `1px solid ${cardBorder}` }}>
                    <div className="px-6 py-5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: subtextColor }}>{data?.ratingLabel || "Overall Rating"}</p>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-5xl font-serif font-bold text-[#B68A35]">{data?.overallRating || "4.2"}</span>
                            <span className="text-lg font-serif" style={isDark ? { color: t.textSecondary } : { color: '#4A4A4A' }}>/ 5</span>
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map((s) => (
                                <BsStar key={s} className="w-5 h-5 fill-[#B68A35]" />
                            ))}
                            <BsStar className="w-5 h-5 fill-[#B68A35]/30" />
                        </div>
                    </div>

                    <div className="px-2 py-5 flex items-center">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid ${cardBorder}` }}>
                                <BsShield className="text-[#B68A35] w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium" style={{ color: bodyColor }}>{data?.basedOnLabel || "Based on community data"}</p>
                                <p className="text-sm font-medium" style={{ color: bodyColor }}>{data?.communitiesCount || "4 communities assessed"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-5 flex items-center">
                        <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
                            <span className="font-semibold text-[#B68A35]">Summary:</span> {data?.summary || "Emaar's established communities demonstrate strong long-term value preservation with generally good to excellent asset condition."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                    <LuUsers className="w-5 h-5 text-[#B68A35]" />
                </div>
                <span className="text-sm font-bold" style={isDark ? { color: t.text } : { color: '#374151' }}>{data?.communitiesTitle || "Communities Assessed"}</span>
            </div>

            {/* Community Table (Desktop) */}
            <div className="hidden lg:block rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] table-fixed">
                        <thead>
                            <tr style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FBF9F6', color: subtextColor, borderBottom: `1px solid ${cardBorder}` }} className="uppercase tracking-wider text-xs font-bold">
                                {data?.tableHeaders?.map((header, idx) => (
                                    <th key={idx} className="px-4 py-3" style={{ width: header.width }}>{header.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {communityAssessments.map((c) => (
                                    <tr key={c.id} style={{ borderBottom: `1px solid ${cardBorder}` }} className="hover:bg-white/50 transition-colors">
                                        <td className="px-4 py-4 font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={!isDark ? { background: '#FBF9F6' } : { background: 'rgba(182,138,53,0.08)' }}>
                                                    {getCommunityIcon(c.iconName, "text-[#B68A35] w-7 h-7")}
                                                </div>
                                                <span className="truncate text-sm">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-xs" style={{ color: bodyColor }}>{c.age}</td>
                                        <td className="px-4 py-4">
                                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase" style={c.condition === 'Excellent' ? { background: '#E8F5E9', color: '#2E7D32' } : { background: '#E8F5E9', color: '#2E7D32' }}>{c.condition}</span>
                                        </td>
                                        <td className="px-4 py-4 text-xs" style={{ color: bodyColor }}>
                                            <ul className="space-y-1">
                                                {c.notes.map((note, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <HiOutlineCheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${note.type === 'warning' ? 'text-orange-400' : 'text-[#89C587]'}`} />
                                                        <span>{note.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Community Accordion (Mobile) */}
            <div className="lg:hidden space-y-2">
                {communityAssessments.map((c) => {
                    const isOpen = openCommunityId === c.id;
                    const firstNote = c.notes[0];
                    const detailNotes = c.notes.slice(1);

                    return (
                        <div key={c.id} className="rounded lg:rounded-xl shadow-sm overflow-hidden" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <button
                                type="button"
                                onClick={() => setOpenCommunityId(isOpen ? '' : c.id)}
                                aria-expanded={isOpen}
                                className="w-full text-left p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={!isDark ? { background: '#FBF9F6' } : { background: 'rgba(182,138,53,0.08)' }}>
                                            {getCommunityIcon(c.iconName, "text-[#B68A35] w-8 h-8")}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xl leading-tight font-bold truncate" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{c.name}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold" style={!isDark ? { background: '#F8F3EC', color: '#4A4A4A' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>{c.age} Years</span>
                                                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold" style={c.condition === 'Excellent' ? { background: '#E3F3E5', color: '#2E7D32' } : { background: '#E8F5E9', color: '#2E7D32' }}>{c.condition}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {isOpen ? (
                                        <BsChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
                                    ) : (
                                        <BsChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
                                    )}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="px-4 pb-4 pt-1" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                    {firstNote && (
                                        <p className="text-[13px] leading-normal mb-4 mt-3" style={{ color: bodyColor }}>{firstNote.text}</p>
                                    )}

                                    <ul className="space-y-3">
                                        {detailNotes.map((note, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <HiOutlineCheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${note.type === 'warning' ? 'text-orange-400' : 'text-[#89C587]'}`} />
                                                <span className="text-[13px] leading-normal" style={{ color: bodyColor }}>{note.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4 pt-3 flex items-start gap-2 text-[12px] leading-normal italic" style={{ borderTop: `1px solid ${cardBorder}`, color: subtextColor }}>
                                        <IoDocumentOutline className="w-4 h-4 text-[#B68A35] mt-0.5 shrink-0" />
                                        <span>{data?.sourceText || "Source: Community guide references and resident feedback summaries"}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Desktop sources */}
            <div className="mt-8 pt-5 hidden lg:flex flex-wrap gap-4 items-center" style={{ borderTop: `1px solid ${cardBorder}` }}>
                <div className="flex items-center gap-2 mr-2">
                    <Building2 className="w-6 h-6 text-2xl text-[#B68A35]" />
                    <span className="text-[14px] font-bold uppercase tracking-wider" style={{ color: subtextColor }}>Sources</span>
                </div>
                {data?.sourcesDesktop?.map((source, idx) => (
                    <SourceLink key={idx} label={source.label} href={source.href} isDark={isDark} subtextColor={subtextColor} />
                ))}
            </div>

            {/* Mobile sources accordion */}
            <div className="mt-2 sm:mt-6 lg:hidden">
                <div className="rounded overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                    <button
                        type="button"
                        onClick={() => setIsSourcesOpen((s) => !s)}
                        aria-expanded={isSourcesOpen}
                        className="w-full flex items-center justify-between p-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-px self-stretch shrink-0 h-5" style={{ background: GOLD }} aria-hidden />
                            <Building2 className="w-5 h-5 text-[#B68A35]" />
                            <span className="text-[12px] leading-normal font-bold uppercase tracking-wider" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Sources</span>
                        </div>
                        <BsChevronUp className={`w-5 h-5 transition-transform ${isSourcesOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isSourcesOpen ? { color: subtextColor } : undefined} />
                    </button>

                    {isSourcesOpen && (
                        <div className="p-3" style={{ borderTop: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#FBF9F6' }}>
                            <ul className="space-y-3">
                                {data?.sourcesMobile?.map((source, idx) => (
                                    <li key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subtextColor }} />
                                            <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-[13px] leading-normal underline decoration-gray-200 truncate" style={{ color: bodyColor }}>{source.label}</a>
                                        </div>
                                        <a href={source.href} target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35] shrink-0"><ExternalLink className="w-4 h-4" /></a>
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

function SatisfactionCard({ data, isDark, cardBg, cardBorder, subtextColor, bodyColor, t }) {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [manualExpanded, setManualExpanded] = useState(false);
    const isExpanded = hasInteracted ? manualExpanded : false;

    if (!data) return null;

    return (
        <div className="rounded lg:rounded-xl shadow-sm overflow-hidden" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setHasInteracted(true);
                        setManualExpanded((s) => !s);
                    }}
                    aria-expanded={isExpanded}
                    className="w-full p-3 px-2 sm:p-5 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <FaRegSmile className="text-[#B68A35] w-7 h-7" />
                        <h4 className="font-bold text-sm text-left" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.title || "Owner Satisfaction with Community Management"}</h4>
                    </div>
                    <BsChevronUp className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-0 text-[#B68A35]' : 'rotate-180'}`} style={!isExpanded ? { color: subtextColor } : undefined} />
                </button>
            </div>

            {isExpanded && (
                <div className="p-5 sm:p-6 space-y-5">
                    <div>
                        <p className="text-[13px] leading-normal lg:text-[15px] lg:leading-relaxed" style={{ color: bodyColor }}>
                            <span className="font-bold text-[#B68A35]">Summary:</span> {data.summary}
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold text-sm mb-3" style={isDark ? { color: t.text } : { color: '#1F2937' }}>{data.praisesTitle || "Common Praises"}</h5>
                        <ul className="space-y-2">
                            {data.praises?.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-[13px] leading-normal lg:text-[15px]" style={{ color: bodyColor }}>
                                    <span className="text-[#C9A962] mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-sm mb-3" style={isDark ? { color: t.text } : { color: '#1F2937' }}>{data.complaintsTitle || "Common Complaints"}</h5>
                        <ul className="space-y-4">
                            {data.complaints?.map((item, i) => (
                                <li key={i} className="text-[13px] leading-normal lg:text-[15px]" style={{ color: bodyColor }}>
                                    <span className="font-semibold" style={isDark ? { color: t.text } : { color: '#1F2937' }}>{item.title}:</span> {item.desc}
                                    <blockquote className="mt-1 pl-3 border-l-2 italic" style={{ borderColor: cardBorder, color: subtextColor }}>
                                        "{item.quote}"
                                    </blockquote>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-2" style={{ borderTop: `1px solid ${cardBorder}` }}>
                        <p className="text-[12px] leading-normal lg:text-[13px]" style={{ color: subtextColor }}>
                            <span className="font-semibold" style={isDark ? { color: t.text } : { color: '#374151' }}>{data.sourcesLabel || "Sources:"}</span> {data.sources}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function AnalystInsightCard({ data, isDark, cardBg, cardBorder, subtextColor, bodyColor, t }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!data) return null;

    return (
        <div className="rounded lg:rounded-xl shadow-sm overflow-hidden" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <div>
                <button
                    type="button"
                    onClick={() => setIsExpanded((s) => !s)}
                    aria-expanded={isExpanded}
                    className="w-full p-4 px-2 sm:p-5 flex items-center justify-between"
                    style={{ borderBottom: `1px solid ${cardBorder}` }}
                >
                    <div className="flex items-center gap-3">
                        <TbBulb className="text-[#B68A35] w-8 h-8" />
                        <h4 className="font-bold text-sm text-left" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.title || "On-Ground Analyst Insight"}</h4>
                    </div>
                    <BsChevronUp className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-0 text-[#B68A35]' : 'rotate-180'}`} style={!isExpanded ? { color: subtextColor } : undefined} />
                </button>
            </div>

            {isExpanded && (
                <div className="p-5 sm:p-6 space-y-5">
                    {data.content && (
                        <p className="text-[13px] leading-normal lg:text-[14px] lg:leading-relaxed" style={{ color: bodyColor }}>
                            {data.content}
                        </p>
                    )}
                    {!data.content && data.disclaimer && (
                        <p className="lg:hidden text-[13px] leading-normal" style={{ color: bodyColor }}>
                            {data.disclaimer}
                        </p>
                    )}

                    <div className="pt-2" style={{ borderTop: `1px solid ${cardBorder}` }}>
                        <p className="text-[12px] leading-normal lg:text-[13px]" style={{ color: subtextColor }}>
                            <span className="font-semibold" style={isDark ? { color: t.text } : { color: '#374151' }}>{data.sourceLabel || "Source:"}</span> {data.source}
                        </p>
                    </div>

                    {data.disclaimer && (
                        <div className="hidden lg:block rounded-lg p-4 text-[12px] leading-relaxed" style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#F9F7F4', color: subtextColor }}>
                            <p className="font-semibold mb-1" style={isDark ? { color: t.text } : { color: '#374151' }}>{data.disclaimerTitle || "Disclaimer:"}</p>
                            <p>{data.disclaimer}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Helper functions for icons
const getTabIcon = (iconName) => {
    const icons = {
        'HiOutlineBuildingOffice2': <HiOutlineBuildingOffice2 className="text-2xl sm:text-3xl" />,
        'AiOutlineDollar': <AiOutlineDollar className="text-2xl sm:text-3xl" />,
        'BsStar': <BsStar className="text-2xl sm:text-3xl" />
    };
    return icons[iconName] || <HiOutlineBuildingOffice2 className="text-2xl sm:text-3xl" />;
};

const getManagementIcon = (iconName) => {
    const icons = {
        'HiOutlineBuildingOffice2': <HiOutlineBuildingOffice2 className="text-[#B68A35] w-6 h-6 sm:w-8 sm:h-8" />,
        'GoShieldCheck': <GoShieldCheck className="text-[#B68A35] w-6 h-6 sm:w-8 sm:h-8" />
    };
    return icons[iconName] || <HiOutlineBuildingOffice2 className="text-[#B68A35] w-6 h-6 sm:w-8 sm:h-8" />;
};

const getCommunityIcon = (iconName, className = "text-[#B68A35] w-7 h-7") => {
    const icons = {
        LuWheat: LuWheat,
        PiHouseLineLight: PiHouseLineLight,
        BsStar: BsStar,
        TbBuildingBurjAlArab: TbBuildingBurjAlArab,
    };
    const Icon = icons[iconName] || BsStar;
    return <Icon className={className} />;
};