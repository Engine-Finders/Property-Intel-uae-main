"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    HiOutlineBuildingOffice2,
    HiOutlineUsers,
    HiOutlineChartPie,
    HiOutlineCalendarDays,
    HiOutlineShieldCheck
} from "react-icons/hi2";
import { LuInfo, LuChevronDown, LuExternalLink } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { FaRegFlag } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import ExpertSection from './ExpertSection';
import { useThemeStyles, PANEL_DARK_BG } from '@/app/components/context/themeStyles';

export default function Section4({ data }) {
    const [activeTab, setActiveTab] = useState('founding');
    const [isSourcesOpen, setIsSourcesOpen] = useState(false);
    const { t, isDark, dark } = useThemeStyles();

    if (!data) {
        return (
            <section className={isDark ? "" : "w-full bg-white font-sans antialiased"} style={isDark ? { background: t.bg } : undefined}>
                <div className="max-w-[1400px] mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: isDark ? t.textSecondary : '#666' }}>Loading...</p>
                </div>
            </section>
        );
    }

    const timelineData = data.timelineData || [];
    const leaders = data.leaders || [];
    const sourcesData = data.sourcesData || [];

    return (
        <section className={isDark ? "" : "w-full bg-white font-sans antialiased"} style={isDark ? { background: t.bg } : undefined}>
            {/* Header Section */}
            <div className="relative w-full h-[320px] lg:h-[400px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.heroImage || "/Home/Section3bg.webp"}
                        alt={data.heroAlt || "Dubai Skyline"}
                        fill
                        className="object-cover object-center grayscale-[10%]"
                        priority
                    />
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} style={isDark ? dark.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        {data.header?.title?.line1 || "Company History "}<span className="hidden lg:inline">& Leadership:</span>
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        {data.header?.title?.line2 || "Emaar Properties"}
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base leading-relaxed font-medium" style={isDark ? { color: t.textSecondary } : { color: '#4A4A4A' }}>
                        {data.header?.description || "This section establishes the authority, experience, and corporate structure of Emaar Properties, based on verified public records and official sources."}
                    </p>
                </div>
            </div>

            {/* Tabs and Main Content Container */}
            <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-2 -mt-12 relative z-20 pb-20">
                <div
                    className={`rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden ${isDark ? "" : "bg-white border border-[#F3EFE9]"}`}
                    style={isDark ? dark.panel : undefined}
                >
                    {/* Tab Navigation */}
                    <div
                        className={`flex flex-row lg:flex-row items-stretch gap-1 px-1.5 py-1.5 sm:px-3 sm:py-3 lg:px-0 ${isDark ? "" : "border-b border-[#F3EFE9]"}`}
                        style={isDark ? { borderBottom: `1px solid ${dark?.dividerColor}` } : undefined}
                    >
                        <TabButton
                            active={activeTab === 'founding'}
                            onClick={() => setActiveTab('founding')}
                            icon={<HiOutlineBuildingOffice2 className="text-xl" />}
                            label="Founding & History"
                            isDark={isDark}
                            dark={dark}
                        />
                        <TabButton
                            active={activeTab === 'leadership'}
                            onClick={() => setActiveTab('leadership')}
                            icon={<HiOutlineUsers className="text-xl" />}
                            label="Leadership Team"
                            isDark={isDark}
                            dark={dark}
                        />
                        <TabButton
                            active={activeTab === 'ownership'}
                            onClick={() => setActiveTab('ownership')}
                            icon={<HiOutlineChartPie className="text-xl" />}
                            label="Honors, Ties & Structure"
                            isDark={isDark}
                            dark={dark}
                        />
                    </div>

                    {/* Tab Content Body */}
                    <div className="p-2 sm:p-6 lg:p-6 min-h-[480px]">
                        {activeTab === 'founding' && <FoundingView data={data.founding} timelineData={timelineData} isDark={isDark} dark={dark} t={t} />}
                        {activeTab === 'leadership' && <LeadershipView data={data.leadership} leaders={leaders} isDark={isDark} dark={dark} t={t} />}
                        {activeTab === 'ownership' && <OwnershipView data={data.ownership} isDark={isDark} dark={dark} t={t} />}

                        {/* Sources Footer within Tab */}
                        <div className={`mt-12 ${isDark ? "" : "border-t border-[#F3EFE9] p-4 sm:p-0 sm:pt-6"}`} style={isDark ? { borderTop: `1px solid ${dark?.dividerColor}`, padding: '1rem 0 0' } : undefined}>
                            <button
                                type="button"
                                onClick={() => setIsSourcesOpen((current) => !current)}
                                aria-expanded={isSourcesOpen}
                                aria-controls="sources-verification-panel"
                                className="w-full flex items-center justify-between cursor-pointer group"
                                style={isDark ? { color: t.text } : { color: '#374151' }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className=" flex items-center justify-center">
                                        <HiOutlineShieldCheck className="text-[#B68A35] text-xl" />
                                    </div>
                                    <span className="font-bold text-sm">{data.sources?.title || "Sources & Verification"}</span>
                                </div>
                                <LuChevronDown className={`text-xl transition-all ${isSourcesOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={isDark ? { color: t.textMuted } : { color: '#9CA3AF' }} />
                            </button>

                            <div
                                id="sources-verification-panel"
                                className={`overflow-hidden transition-all duration-300 ${isSourcesOpen ? 'max-h-[1200px] opacity-100 pt-5' : 'max-h-0 opacity-0 pt-0'}`}
                            >
                                <div
                                    className={`rounded-xl ${isDark ? "" : "border border-[#F3EFE9] bg-[#FBF9F6]"} p-4 sm:p-5 space-y-4`}
                                    style={isDark ? { border: `1px solid ${dark?.dividerColor}`, background: PANEL_DARK_BG } : undefined}
                                >
                                    <p className="text-[12px] sm:text-[13px] leading-relaxed" style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                        {data.sources?.description || "The following sources support the information presented above. We prioritize official registrars, annual reports, and government filings."}
                                    </p>

                                    <div className="space-y-3">
                                        {sourcesData.map((item, idx) => (
                                            <div key={idx} className="text-[11px] sm:text-[12px] leading-relaxed space-y-0.5" style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                                <p><span className="font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Fact:</span> {item.fact}</p>
                                                <p><span className="font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Source:</span> {item.source}</p>
                                                <p className="break-all">
                                                    <span className="font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>URL:</span>{' '}
                                                    {item.urls
                                                        ? item.urls.map((url, urlIdx) => (
                                                            <React.Fragment key={url}>
                                                                <a
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[#B68A35] hover:underline inline-flex items-center gap-1"
                                                                >
                                                                    {url}
                                                                    <LuExternalLink className="text-[11px] shrink-0" />
                                                                </a>
                                                                {urlIdx < item.urls.length - 1 ? ' ; ' : ''}
                                                            </React.Fragment>
                                                        ))
                                                        : (
                                                            <a
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[#B68A35] hover:underline inline-flex items-center gap-1"
                                                            >
                                                                {item.url}
                                                                <LuExternalLink className="text-[11px] shrink-0" />
                                                            </a>
                                                        )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ExpertSection />

                {/* Floating Info Banner */}
                <div
                    className={`mt-6 rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start ${isDark ? "" : "bg-[#FBF9F6] border border-[#F3EFE9]"}`}
                    style={isDark ? { background: PANEL_DARK_BG, border: `1px solid ${dark?.dividerColor}` } : undefined}
                >
                    <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
                    <p className="text-xs lg:text-sm leading-relaxed" style={isDark ? { color: t.textSecondary } : { color: '#4A4A4A' }}>
                        {data.footerDisclaimer || "All information on this page is sourced from public records, financial filings and official disclosures. Please refer to the Sources & Verification section for detailed references."}
                    </p>
                </div>
            </div>
        </section>
    );
}

// --- Internal View Components ---

function TabButton({ active, onClick, icon, label, isDark, dark }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex items-center justify-center sm:gap-3 transition-all relative
                min-w-0 py-2 px-1.5 sm:px-2 lg:py-6 lg:px-4 rounded-2xl lg:rounded-none lg:mx-0
                ${active && !isDark
                    ? 'text-[#B68A35] bg-[#FDF8F0] border border-[#B68A35]/20 lg:border-none lg:bg-white'
                    : !isDark && active === false
                        ? 'text-gray-500 bg-transparent lg:bg-white hover:text-gray-800'
                        : ''
                }
            `}
            style={
                isDark && active
                    ? { ...dark.tabActive, color: '#B68A35', borderRadius: '1rem' }
                    : isDark && !active
                        ? dark.tabInactive
                        : undefined
            }
        >
            <span className="hidden lg:inline-flex">{icon}</span>
            <span className={`text-[11px] sm:text-sm leading-tight text-center tracking-wide lg:capitalize ${active ? 'font-semibold' : 'font-medium'}`}>
                {label}
            </span>
            {active && !isDark && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#B68A35] hidden lg:block" />
            )}
            {active && isDark && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35] hidden lg:block" />
            )}
        </button>
    );
}

function FoundingView({ data, timelineData, isDark, dark, t }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const updateViewport = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    const limit = isDesktop ? 500 : 250;
    const foundingText = data?.description || "";
    const isTruncated = foundingText.length > limit;
    const displayText = isExpanded || !isTruncated ? foundingText : `${foundingText.slice(0, limit).trimEnd()}...`;

    return (
        <div className="space-y-5 md:border md:rounded-xl md:p-4" style={isDark ? { border: `1px solid ${dark?.dividerColor}` } : { borderColor: '#F3EFE9' }}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-3">
                {data?.stats?.map((stat, idx) => (
                    <StatBox key={idx} icon={getStatIcon(stat.iconName)} label={stat.label} value={stat.value} isDark={isDark} dark={dark} t={t} />
                ))}
            </div>

            <div className="space-y-2.5">
                <p className="leading-relaxed text-[12px] sm:text-sm lg:text-[15px] font-medium" style={isDark ? { color: t.textSecondary } : { color: '#4A4A4A' }}>
                    {displayText}
                </p>
                <button
                    type="button"
                    onClick={() => setIsExpanded((current) => !current)}
                    className="text-[#B68A35] font-bold text-[12px] sm:text-[13px] flex items-center gap-1 hover:underline"
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                    <LuChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            <div className="pt-2">
                <h4 className="text-[#B68A35] font-bold text-[10px] sm:text-[11px] tracking-[0.12em] uppercase mb-5 sm:mb-6 flex items-center">
                    <span className="lg:hidden">{data?.timelineTitle?.mobile || "Key Evolution Milestones"}</span>
                    <div className="hidden lg:flex items-center gap-3">
                        <FaRegFlag />
                        <span style={isDark ? { color: t.text } : { color: 'black' }}>{data?.timelineTitle?.desktop || "Key Evolution Milestones"}</span>
                    </div>
                </h4>

                <div className="hidden lg:flex justify-between relative px-4">
                    <div className="absolute top-[5px] left-0 right-0 h-[2px] bg-[#B68A35]" />
                    {timelineData.map((item, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center w-40 text-center">
                            <div className="w-3 h-3 rounded-full bg-[#B68A35]" />
                            <span className="font-bold text-sm mb-2" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{item.year}</span>
                            <p className="text-[10px] leading-relaxed font-medium" style={isDark ? { color: t.textMuted } : { color: '#6B7280' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="lg:hidden max-h-80 overflow-y-scroll mobile-timeline-scrollbar space-y-5 border-l ml-1 pl-7 sm:pl-5 pr-3 pb-4" style={isDark ? { borderLeftColor: dark?.dividerColor } : { borderColor: '#E5E7EB' }}>
                    {timelineData.map((item, idx) => (
                        <div key={idx} className="relative">
                            <div className="absolute left-[-18px] top-1 w-2.5 h-2.5 rounded-full bg-[#B68A35]" />
                            <span className="block font-bold text-[13px] sm:text-[14px] mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{item.year}</span>
                            <p className="text-[11px] sm:text-[12px] leading-relaxed font-medium" style={isDark ? { color: t.textMuted } : { color: '#666666' }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function LeadershipView({ data, leaders, isDark, dark, t }) {
    const [expandedLeaderIndex, setExpandedLeaderIndex] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const updateViewport = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    const LIMIT_DESKTOP = 350;

    return (
        <div className="space-y-6">
            {leaders.map((leader, idx) => {
                const isLongOnDesktop = leader.bio && leader.bio.length > LIMIT_DESKTOP;
                const showToggle = isDesktop ? isLongOnDesktop : true;
                const desktopDisplay = isDesktop
                    ? (expandedLeaderIndex === idx || !isLongOnDesktop ? leader.bio : `${leader.bio.slice(0, LIMIT_DESKTOP).trimEnd()}...`)
                    : leader.bio;

                return (
                    <div key={idx} className="flex flex-row lg:flex-row gap-4 lg:gap-8 rounded-xl p-2 lg:p-5 items-start" style={isDark ? { background: PANEL_DARK_BG, border: `1px solid ${dark?.dividerColor}` } : { background: 'white', border: '1px solid #E5E5E5' }}>
                        <div className="w-24 h-24 lg:w-48 lg:h-48 relative rounded-xl overflow-hidden shrink-0">
                            {leader.image ? (
                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 96px, 192px"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300 font-bold uppercase text-[10px] tracking-widest" style={isDark ? { background: t.bg } : { background: '#FBF9F6' }}>Profile Image</div>
                            )}
                        </div>

                        <div className="flex-1 space-y-3 min-w-0">
                            <div className="pb-2 lg:border-0 lg:pb-0" style={!isDark ? { borderBottom: '1px solid #F3EFE9' } : undefined}>
                                <h4 className="text-[17px] lg:text-2xl font-serif font-semibold leading-tight" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{leader.name}</h4>
                                <p className="text-[#B68A35] text-[10px] lg:text-[12px] font-bold tracking-widest mt-1 uppercase">{leader.role}</p>
                            </div>

                            <p className={isDesktop ? "text-[12px] lg:text-[14px] leading-relaxed" : `text-[12px] lg:text-[14px] leading-relaxed lg:line-clamp-none ${expandedLeaderIndex === idx ? '' : 'line-clamp-4'}`} style={isDark ? { color: t.textSecondary } : { color: '#4A4A4A' }}>
                                {isDesktop ? desktopDisplay : leader.bio}
                            </p>

                            {showToggle && (
                                <button
                                    type="button"
                                    onClick={() => setExpandedLeaderIndex(expandedLeaderIndex === idx ? null : idx)}
                                    className="text-[#B68A35] font-bold text-[11px] flex items-center gap-1 uppercase tracking-tighter"
                                >
                                    {expandedLeaderIndex === idx ? 'Show less' : 'Read more'} <LuChevronDown className={`text-sm transition-transform ${expandedLeaderIndex === idx ? 'rotate-180' : ''}`} />
                                </button>
                            )}

                            {expandedLeaderIndex === idx && (
                                <div className="lg:hidden pt-3 flex items-start gap-3" style={!isDark ? { borderTop: '1px solid #F3EFE9' } : { borderTop: `1px solid ${dark?.dividerColor}` }}>
                                    <div className="mt-1 shrink-0">
                                        <HiOutlineGlobeAlt className="text-[#B68A35] text-xl" />
                                    </div>
                                    <div className="text-[12px] leading-snug min-w-0">
                                        <span style={isDark ? { color: t.textMuted } : { color: '#6B7280' }}>Source:</span>
                                        <div className="mt-1">
                                            <a href="#" className="font-medium hover:text-[#B68A35] transition-colors inline-flex items-baseline gap-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                {leader.source}
                                                <LuExternalLink className="text-[#B68A35] text-[12px] shrink-0 translate-y-0.5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="hidden lg:flex lg:w-64 items-start gap-3 pt-4 lg:pt-0 lg:pl-8 self-stretch" style={!isDark ? { borderLeft: '1px solid #F3EFE9', borderTop: 'none' } : { borderLeft: `1px solid ${dark?.dividerColor}` }}>
                            <div className="mt-1">
                                <HiOutlineGlobeAlt className="text-[#B68A35] text-xl" />
                            </div>
                            <div className="text-[13px] leading-snug">
                                <span style={isDark ? { color: t.textMuted } : { color: '#6B7280' }}>Source:</span>
                                <div className="mt-1">
                                    <a href="#" className="font-medium hover:text-[#B68A35] transition-colors inline-flex items-baseline gap-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                        {leader.source}
                                        <LuExternalLink className="text-[#B68A35] text-[12px] shrink-0 translate-y-0.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function OwnershipView({ data, isDark, dark, t }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        const updateViewport = () => {
            setIsPhone(window.innerWidth < 640);
        };
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    const limit = 220;
    const ownershipText = data?.description || "";
    const isTruncated = ownershipText.length > limit;
    const shouldTruncate = isPhone && isTruncated;
    const displayText = shouldTruncate && !isExpanded
        ? `${ownershipText.slice(0, limit).trimEnd()}...`
        : ownershipText;

    return (
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-16">
            <div className="flex-1">
                <div className=" ">
                    <h4 className="text-[#B68A35] font-bold text-[15px] tracking-[0.15em] uppercase">
                        {data?.ownershipTitle || "Ownership structure"}
                    </h4>
                </div>
                <p className="leading-[1.8] text-[12px] sm:text-[15px] font-normal mb-2 sm:mb-8 mt-2" style={isDark ? { color: t.textSecondary } : { color: '#4A4A4A' }}>
                    {displayText}
                </p>

                {shouldTruncate && (
                    <button
                        type="button"
                        onClick={() => setIsExpanded((current) => !current)}
                        className="sm:hidden text-[#B68A35] font-bold text-[12px] flex items-center gap-1 hover:underline mb-4"
                    >
                        {isExpanded ? 'Read less' : 'Read more'}
                        <LuChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                )}
            </div>

            <div className="hidden lg:block w-px self-stretch" style={!isDark ? { background: '#F3EFE9' } : { background: dark?.dividerColor }} />

            <div className="lg:w-[450px] space-y-4">
                <div className=" ">
                    <h4 className="text-[#B68A35] font-bold text-[15px] tracking-[0.15em] uppercase">
                        {data?.shareholdersTitle || "Major Shareholders"}
                    </h4>
                </div>
                {data?.shareholders?.map((shareholder, idx) => (
                    <ShareholderCard
                        key={idx}
                        icon={getShareholderIcon(shareholder.iconName)}
                        percent={shareholder.percent}
                        name={shareholder.name}
                        source={shareholder.source}
                        date={shareholder.date}
                        isDark={isDark}
                        dark={dark}
                        t={t}
                    />
                ))}
            </div>
        </div>
    );
}

// --- Utility Components ---

function StatBox({ icon, label, value, isDark, dark, t }) {
    return (
        <div className="rounded-xl flex items-center gap-1.5 sm:gap-4 transition-transform hover:scale-[1.02]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-[#B68A35] text-2xl sm:text-3xl" style={!isDark ? { background: '#fbf5ee' } : { background: 'rgba(182,138,53,0.1)' }}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] sm:text-[12px] tracking-widest font-bold mb-0.5 leading-tight" style={isDark ? { color: t.textMuted } : { color: '#374151' }}>{label}</p>
                <p className="text-[#B68A35] font-bold text-[12px] sm:text-sm lg:text-base leading-tight">{value}</p>
            </div>
        </div>
    );
}

const ShareholderCard = ({ icon, percent, name, source, date, isDark, dark, t }) => (
    <div className="flex item-start sm:items-center gap-5 p-2 sm:p-6 rounded-2xl shadow-sm" style={!isDark ? { border: '1px solid #F3EFE9', background: 'white' } : { border: `1px solid ${dark?.dividerColor}`, background: PANEL_DARK_BG }}>
        <div className="w-10 h-10 sm:w-20 sm:h-20 shrink-0 rounded-full text-2xl flex items-center justify-center text-[#B68A35]" style={!isDark ? { background: '#FBF9F6' } : { background: 'rgba(182,138,53,0.08)' }}>
            {icon}
        </div>
        <div className="space-y-1">
            <span className="block text-xl sm:text-3xl font-serif text-[#B68A35] font-medium">
                {percent}
            </span>
            <h5 className="text-[12px] sm:text-[15px] font-bold leading-tight" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                {name}
            </h5>
            <p className="text-[11px] sm:text-[12px] leading-tight mt-1" style={isDark ? { color: t.textMuted } : { color: '#6B7280' }}>
                Source: {source} <br /> {date}
            </p>
        </div>
    </div>
);

// Helper functions for icons
const getStatIcon = (iconName) => {
    const icons = {
        'HiOutlineCalendarDays': <HiOutlineCalendarDays className="text-2xl sm:text-3xl" />,
        'GoPerson': <GoPerson className="text-2xl sm:text-3xl" />,
        'HiOutlineShieldCheck': <HiOutlineShieldCheck className="text-2xl sm:text-3xl" />
    };
    return icons[iconName] || <HiOutlineCalendarDays className="text-2xl sm:text-3xl" />;
};

const getShareholderIcon = (iconName) => {
    const icons = {
        'HiOutlineBuildingOffice2': <HiOutlineBuildingOffice2 className="text-2xl sm:text-5xl" />,
        'HiOutlineUsers': <HiOutlineUsers className="text-2xl sm:text-5xl" />
    };
    return icons[iconName] || <HiOutlineBuildingOffice2 className="text-2xl sm:text-5xl" />;
};