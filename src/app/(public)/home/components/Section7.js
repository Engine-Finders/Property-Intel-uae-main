"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Handshake,
    Building2,
    Target,
    Trophy,
    Landmark,
    Calendar,
    ExternalLink,
    AlertTriangle,
    ChevronRight,
    FileText,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import {
    Info
} from 'lucide-react';
import { BsBoxSeam, BsChevronUp, BsChevronDown, BsLink45Deg } from 'react-icons/bs';
import { HiOutlineExternalLink } from 'react-icons/hi';
import ExpertSection from './ExpertSection';
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

const Section7 = ({ data }) => {
    const { t, isDark, dark } = useThemeStyles();
    const [activeTab, setActiveTab] = useState('joint-ventures');
    const [expandedCard, setExpandedCard] = useState(null);
    const [sourcesOpen, setSourcesOpen] = useState(false);

    const cardBg = isDark ? PANEL_DARK_BG : "#FFFFFF";
    const cardBorder = isDark ? t.cardBorder : "rgba(0,0,0,0.08)";
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

    const categories = data.categories || [];
    const categoriesWithIcons = categories.map(cat => ({
        ...cat,
        icon: getCategoryIcon(cat.iconName)
    }));

    const activeCategory = categoriesWithIcons.find((c) => c.id === activeTab) || categoriesWithIcons[0];
    const expandedCategory = categoriesWithIcons.find((c) => c.id === expandedCard) || null;

    const headerDescription = data.header?.description || "Emaar Properties maintains strategic alignments with UAE government entities through shareholding structures, infrastructure delivery, and participation in national master plans.";

    const renderContent = (tab = activeTab) => {
        const contentData = getContentForTab(data, tab);
        if (!contentData || !contentData.items) return null;

        return (
            <div className="space-y-6">
                {contentData.items.map((item, index) => (
                    <div key={index} className="rounded lg:rounded-2xl p-4 sm:p-6 transition-colors duration-300" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                            <div className="flex-shrink-0">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center`} style={!isDark ? { background: '#FDFBF7' } : { background: 'rgba(182,138,53,0.12)' }}>
                                    <Landmark className="w-8 h-8 text-[#B68A35]" />
                                </div>
                            </div>

                            <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                    <div>
                                        <h4 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                            {item.title}
                                        </h4>
                                        <p className="text-xs font-semibold text-[#B68A35] uppercase tracking-wider mt-1">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold`} style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: '#B68A35' }}>
                                        {item.year}
                                    </span>
                                </div>

                                <p className="text-[13px] leading-normal lg:text-sm lg:leading-relaxed mb-4 max-w-2xl" style={{ color: bodyColor }}>
                                    {item.description}
                                </p>
                            </div>

                            <div className="w-full lg:w-110 flex-shrink-0">
                                <div className="rounded lg:rounded-xl p-4" style={!isDark ? { background: '#FAF9F6' } : { background: 'rgba(255,255,255,0.04)' }}>
                                    <div className="flex items-start gap-2 mb-2">
                                        <ExternalLink className={`w-4 h-4 mt-0.5 flex-shrink-0 text-[#B68A35]`} />
                                        <div>
                                            <p className={`text-xs font-semibold uppercase tracking-wider`} style={isDark ? { color: subtextColor } : { color: '#6B7280' }}>
                                                SOURCE • {item.sourceDate}
                                            </p>
                                            <p className={`text-sm mt-1`} style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                                {item.source}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-3 ml-6">
                                        <div className="flex items-center gap-2">
                                            <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                            <a href={item.fullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                {item.url}
                                            </a>
                                        </div>
                                        {item.secondaryUrl && (
                                            <div className="flex items-center gap-2">
                                                <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                <a href={item.secondaryFullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                    {item.secondaryUrl}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

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
                            {data.header?.title?.line1 || "Emaar Government & Strategic"}
                            <span className="block text-[#B68A35]">{data.header?.title?.line2 || "Partnerships - Stability Through Collaboration"}</span>
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
                        {data.header?.title?.line1 || "Emaar Government & Strategic"}
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        {data.header?.title?.line2 || "Partnerships - Stability Through Collaboration"}
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base leading-[17px] font-medium" style={{ color: bodyColor }}>
                        {headerDescription}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-2 sm:px-6 md:-mt-8 relative z-10 pb-20">

                {/* Tabs + Content (joined, Section6-style) */}
                <div className="rounded lg:rounded-2xl shadow-sm overflow-hidden mb-6 transition-colors duration-300" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                    <div style={isDark ? { ...dark.tabBar, borderBottom: `1px solid ${cardBorder}` } : { borderBottom: `1px solid ${cardBorder}` }}>
                        {/* Desktop tab row */}
                        <div className="hidden md:flex flex-row items-stretch gap-1 lg:px-0">
                            {categoriesWithIcons.map((category) => {
                                const Icon = category.icon;
                                const isActive = activeTab === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveTab(category.id)}
                                        aria-pressed={isActive}
                                        className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-3 transition-all border-b-2 ${isActive && !isDark
                                                ? "text-[#B68A35] border-[#B68A35] bg-[#FDFBF7]"
                                                : !isDark && !isActive
                                                    ? "text-gray-400 border-transparent bg-[#FBF9F6] hover:bg-gray-50"
                                                    : isActive
                                                        ? "text-[#B68A35]"
                                                        : ""
                                            }`}
                                        style={
                                            isDark
                                                ? isActive
                                                    ? { ...dark.tabActive, borderBottomColor: GOLD_BORDER }
                                                    : { ...dark.tabInactive, borderBottomColor: "transparent" }
                                                : undefined
                                        }
                                    >
                                        <div className="flex items-center justify-center w-full gap-2">
                                            <Icon className="text-2xl sm:text-3xl flex-shrink-0" />
                                            <span
                                                className={`font-semibold text-sm ${!isDark && !isActive ? "text-slate-900" : ""}`}
                                                style={isDark && !isActive ? dark.textMuted : undefined}
                                            >
                                                {category.title}
                                            </span>
                                        </div>
                                        {isDark && isActive && (
                                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" aria-hidden />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mobile cards (accordion) */}
                        <div className="md:hidden px-2 py-2">
                            {expandedCard ? (
                                <div className="space-y-2">
                                    {expandedCategory && (() => {
                                        const ExpandedIcon = expandedCategory.icon;
                                        return (
                                        <div className="rounded lg:rounded-2xl p-2 transition-colors duration-300" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                            <div className="w-full">
                                                <button
                                                    onClick={() => setExpandedCard(null)}
                                                    aria-expanded={true}
                                                    className="w-full flex flex-col items-center text-center gap-3"
                                                >
                                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors" style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                                                        <ExpandedIcon className="w-6 h-6" />
                                                    </div>
                                                    <h4 className="font-serif font-semibold text-sm" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                        {expandedCategory.title}
                                                    </h4>
                                                    <p className="text-[13px] leading-normal lg:text-xs lg:leading-relaxed" style={{ color: bodyColor }}>
                                                        {expandedCategory.description}
                                                    </p>
                                                </button>

                                                <div className="w-full mt-4 text-left">
                                                    {renderContent(expandedCategory.id)}
                                                </div>

                                                <div className="w-full mt-3 text-right">
                                                    <button onClick={() => setExpandedCard(null)} className="text-sm text-[#B68A35] font-semibold">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    })()}

                                    <div className="grid grid-cols-2 gap-4">
                                        {categoriesWithIcons.filter((c) => c.id !== expandedCard).map((cat) => {
                                            const Icon = cat.icon;
                                            return (
                                                <div key={cat.id} className="rounded lg:rounded-2xl p-4 transition-colors duration-300" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                                    <button
                                                        onClick={() => {
                                                            setExpandedCard(cat.id);
                                                            setActiveTab(cat.id);
                                                        }}
                                                        aria-expanded={false}
                                                        className="w-full flex flex-col items-center text-center gap-3"
                                                    >
                                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors" style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                                                            <Icon className="w-6 h-6" />
                                                        </div>
                                                        <h4 className="font-serif font-semibold text-sm" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                            {cat.title}
                                                        </h4>
                                                        <p className="text-[13px] leading-normal lg:text-xs lg:leading-relaxed" style={{ color: bodyColor }}>
                                                            {cat.description}
                                                        </p>
                                                        <ChevronRight className="w-5 h-5 text-[#B68A35]" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {categoriesWithIcons.map((cat) => {
                                        const Icon = cat.icon;
                                        return (
                                            <div key={cat.id} className="rounded lg:rounded-2xl p-4 transition-colors duration-300" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                                <button
                                                    onClick={() => {
                                                        setExpandedCard(cat.id);
                                                        setActiveTab(cat.id);
                                                    }}
                                                    aria-expanded={false}
                                                    className="w-full flex flex-col items-center text-center gap-3"
                                                >
                                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors" style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <h4 className="font-serif font-semibold text-sm" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                        {cat.title}
                                                    </h4>
                                                    <p className="text-[13px] leading-normal lg:text-xs lg:leading-relaxed" style={{ color: bodyColor }}>
                                                        {cat.description}
                                                    </p>
                                                    <ChevronRight className="w-5 h-5 text-[#B68A35]" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 hidden md:block">
                        <div className="mb-6">
                            <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                {activeCategory.title}
                            </h3>
                            <p className={`text-sm mt-1`} style={{ color: bodyColor }}>
                                {activeCategory.description}
                            </p>
                        </div>

                        {renderContent()}
                    </div>
                </div>

                {/* Sources & Verification (accordion) */}
                <div className="rounded lg:rounded-xl overflow-hidden transition-colors duration-300" style={{ border: `1px solid ${cardBorder}` }}>
                    <button
                        onClick={() => setSourcesOpen(!sourcesOpen)}
                        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-[#FAF6EE]'}`}
                        style={{ background: cardBg }}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="lg:hidden flex items-stretch gap-3 shrink-0">
                                <span className="w-px self-stretch" style={{ background: GOLD }} aria-hidden />
                                <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
                            </div>
                            <div className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center shrink-0" style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                                <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
                            </div>
                            <span className="text-[12px] leading-normal lg:text-[13px] font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.sources?.title || "Sources & Verification"}</span>
                            <span className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full shrink-0" style={!isDark ? { background: '#FAF6EE', color: '#6B7280' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                                {data.sources?.items?.length || 0} Financial & Regulatory Sources
                            </span>
                        </div>
                        {sourcesOpen ? <BsChevronUp className="w-4 h-4 shrink-0" style={{ color: subtextColor }} /> : <BsChevronDown className="w-4 h-4 shrink-0" style={{ color: subtextColor }} />}
                    </button>

                    {sourcesOpen && (
                        <div style={{ borderTop: `1px solid ${cardBorder}`, background: cardBg }}>
                            {data.sources?.items?.map((s, i) => (
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
                                        <span className={`block mt-0.5`} style={{ color: subtextColor }}>{s.reference}</span>
                                    </div>
                                    <div className="sm:w-[28%] shrink-0 flex items-start justify-between">
                                        {s.urls && s.urls.length > 0 ? (
                                            <a
                                                href={s.urls[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-1 group hover:underline truncate max-w-[90%] text-[#B68A35]`}
                                            >
                                                <BsLink45Deg className="shrink-0 w-3.5 h-3.5" />
                                                <span className="truncate">{s.urls[0].replace('https://', '')}</span>
                                            </a>
                                        ) : (
                                            <span style={{ color: subtextColor }}>-</span>
                                        )}
                                        <HiOutlineExternalLink className={`shrink-0 w-3.5 h-3.5 ml-1 mt-0.5`} style={{ color: subtextColor }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <ExpertSection />

                <div className="mt-2 sm:mt-6 rounded lg:rounded-xl px-4 py-4 sm:px-5" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6' }}>
                    <div className="lg:hidden">
                        <MobileNoteBox
                            icon={<Info className="w-5 h-5" />}
                            textStyle={{ color: bodyColor }}
                        >
                            <span className="font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.footer?.disclaimerTitle || "Disclaimer"} </span>
                            {data.footer?.disclaimerText || "All information sourced from official government announcements and publicly filed reports. Last verified: 22 February 2026."}
                        </MobileNoteBox>
                    </div>
                    <div className="hidden lg:flex items-start gap-3">
                        <Info className="w-5 h-5 text-[#B68A35] shrink-0" />
                        <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>
                            <span className="font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.footer?.disclaimerTitle || "Disclaimer"}</span> {data.footer?.disclaimerText || "All information sourced from official government announcements and publicly filed reports. Last verified: 22 February 2026."}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

// Helper functions for icons
const getCategoryIcon = (iconName) => {
    const icons = {
        'Handshake': Handshake,
        'Building2': Building2,
        'Target': Target,
        'Trophy': Trophy
    };
    return icons[iconName] || Handshake;
};

const getContentForTab = (data, tabId) => {
    const contentMap = {
        'joint-ventures': data.jointVentures,
        'contracts': data.governmentContracts,
        'frameworks': data.strategicFrameworks,
        'awards': data.awards
    };
    return contentMap[tabId];
};

export default Section7;