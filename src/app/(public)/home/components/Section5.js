"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Calendar, Building2, Trophy, Users, Info, Star,
    Lightbulb, ShieldCheck, ChevronUp, ExternalLink, CheckCircle2, XCircle
} from 'lucide-react';
import ExpertSection from './ExpertSection';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { BsBuildings } from "react-icons/bs";
import { SlBadge } from "react-icons/sl";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { TbBulb } from "react-icons/tb";
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

const Section5 = ({ data }) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isHandoverOpen, setIsHandoverOpen] = useState(false);
    const [isQualityOpen, setIsQualityOpen] = useState(false);
    const [isInsightOpen, setIsInsightOpen] = useState(false);
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
    const [isSourcesOpen, setIsSourcesOpen] = useState(false);
    const { t, isDark, dark } = useThemeStyles();

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FDFCFB";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    useEffect(() => {
        const updateViewport = () => {
            const desktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
            setIsDesktop(desktop);
            setIsHandoverOpen(desktop);
            setIsQualityOpen(desktop);
            setIsInsightOpen(desktop);
            setIsDisclaimerOpen(desktop);
            setIsSourcesOpen(desktop);
        };

        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    if (!data) {
        return (
            <section style={{ background: sectionBg }} className="py-12 font-sans">
                <div className="max-w-[1400px] mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
                </div>
            </section>
        );
    }

    const statCards = data.statCards || [];
    const tableRows = data.tableRows || [];
    const prosItems = data.prosItems || [];
    const consItems = data.consItems || [];
    const sourcesDesktop = data.sourcesDesktop || [];
    const sourcesMobile = data.sourcesMobile || [];

    const headerDescription = data.header?.description || "We have analysed official handover records and verified owner feedback to present an honest picture of Emaar's delivery performance.";

    return (
        <section style={{ background: sectionBg }} className="py-12 font-sans">

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
                            {data.header?.title?.line1 || "Emaar Delivery Track Record:"}
                            <span className="block text-[#B68A35]">{data.header?.title?.line2 || "Transparency You Can Trust"}</span>
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
                        src={data.heroImage || "/Home/Section3bg.webp"}
                        alt={data.heroAlt || "Dubai Skyline"}
                        fill
                        className="object-cover object-center grayscale-[10%]"
                        priority
                    />
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} style={isDark ? dark?.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        {data.header?.title?.line1 || "Emaar Delivery Track Record:"}
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        {data.header?.title?.line2 || "Transparency You Can Trust"}
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base leading-[17px] font-medium" style={{ color: bodyColor }}>
                        {headerDescription}
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-2 md:-mt-12 relative z-20">
                {/* --- STATS OVERVIEW CARDS --- */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-8 rounded lg:rounded-2xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                    {statCards.map((stat, idx) => (
                        <StatCard
                            key={idx}
                            icon={getStatIcon(stat.iconName)}
                            label={stat.label}
                            value={stat.value}
                            unit={stat.unit}
                            divider={idx < statCards.length - 1}
                            isDark={isDark}
                            cardBg={cardBg}
                            cardBorder={cardBorder}
                            subtextColor={subtextColor}
                            bodyColor={bodyColor}
                            t={t}
                        />
                    ))}
                </div>

                {/* --- MAIN DASHBOARD GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Handover & Quality */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Project Handover Analysis */}
                        <div className="rounded lg:rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <button
                                type="button"
                                onClick={() => !isDesktop && setIsHandoverOpen((s) => !s)}
                                aria-expanded={isHandoverOpen || isDesktop}
                                className="w-full p-5 flex items-center justify-between text-left lg:cursor-default"
                                style={{ borderBottom: (isHandoverOpen || isDesktop) ? `1px solid ${cardBorder}` : 'none' }}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <PiBuildingApartmentLight className="text-[#B68A35] w-8 h-8 shrink-0" />
                                    <h4 className="font-bold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.handoverAnalysis?.title || "Project Handover Analysis"}</h4>
                                </div>
                                <ChevronUp className={`w-5 h-5 shrink-0 transition-transform lg:hidden ${isHandoverOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isHandoverOpen ? { color: subtextColor } : undefined} />
                            </button>
                            {(isHandoverOpen || isDesktop) && (
                            <div className="p-2">
                                <p className="text-[13px] leading-normal lg:text-[14px] lg:leading-relaxed mb-4" style={{ color: bodyColor }}>
                                    {data.handoverAnalysis?.description || "The following projects have been analysed using official DLD handover records, RERA progress reports, and developer announcements."}
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-[11px] lg:text-xs">
                                        <thead>
                                            <tr style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FBF9F6', color: subtextColor, borderTop: `1px solid ${cardBorder}`, borderBottom: `1px solid ${cardBorder}` }}>
                                                {data.handoverAnalysis?.tableHeaders?.map((header, idx) => (
                                                    <th key={idx} className="px-2 py-3 font-bold">{header}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableRows.map((row, idx) => (
                                                <TableRow
                                                    key={idx}
                                                    name={row.name}
                                                    original={row.original}
                                                    actual={row.actual}
                                                    delay={row.delay}
                                                    reason={row.reason}
                                                    source={row.source}
                                                    status={row.status}
                                                    isDark={isDark}
                                                    cardBorder={cardBorder}
                                                    bodyColor={bodyColor}
                                                    t={t}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {data.handoverAnalysis?.note ? (
                                    <div className="mt-4 p-3 rounded lg:rounded-lg" style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                                        <div className="lg:hidden">
                                            <MobileNoteBox
                                                icon={<Info className="w-5 h-5" />}
                                                textStyle={{ color: subtextColor }}
                                            >
                                                {data.handoverAnalysis.note}
                                            </MobileNoteBox>
                                        </div>
                                        <div className="hidden lg:flex gap-3 items-start">
                                            <Info className="text-[#B68A35] w-6 h-6 shrink-0" />
                                            <p className="text-[12px] leading-relaxed" style={{ color: subtextColor }}>
                                                {data.handoverAnalysis.note}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            )}
                        </div>

                        {/* Quality & Owner Satisfaction Insights */}
                        <div className="rounded lg:rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <button
                                type="button"
                                onClick={() => !isDesktop && setIsQualityOpen((s) => !s)}
                                aria-expanded={isQualityOpen || isDesktop}
                                className="w-full p-5 flex items-center justify-between text-left lg:cursor-default"
                                style={{ borderBottom: (isQualityOpen || isDesktop) ? `1px solid ${cardBorder}` : 'none' }}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <Star className="text-[#B68A35] w-8 h-8 shrink-0" />
                                    <h4 className="font-bold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.qualityInsights?.title || "Quality & Owner Satisfaction Insights"}</h4>
                                </div>
                                <ChevronUp className={`w-5 h-5 shrink-0 transition-transform lg:hidden ${isQualityOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isQualityOpen ? { color: subtextColor } : undefined} />
                            </button>
                            {(isQualityOpen || isDesktop) && (
                            <div className="p-2 sm:p-6">
                                <p className="text-[13px] leading-normal lg:text-[14px] lg:leading-relaxed mb-4" style={{ color: bodyColor }}>
                                    <span className="font-bold text-[#B68A35]">Summary:</span> {data.qualityInsights?.summary || ""}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    {/* Sentiment Chart */}
                                    <div className="md:col-span-2">
                                        <h5 className="text-[11px] font-bold uppercase tracking-widest mb-6" style={{ color: subtextColor }}>{data.qualityInsights?.sentimentTitle || "Sentiment Breakdown"}</h5>
                                        <div className="flex items-center gap-8">
                                            <div className="relative w-32 h-32 rounded-full flex items-center justify-center border-8" style={{ background: `conic-gradient(from 0deg, #89C587 0deg ${data.qualityInsights?.positivePercent * 3.6}deg, #F6B07A ${data.qualityInsights?.positivePercent * 3.6}deg ${(data.qualityInsights?.positivePercent + data.qualityInsights?.neutralPercent) * 3.6}deg, #E87E7E ${(data.qualityInsights?.positivePercent + data.qualityInsights?.neutralPercent) * 3.6}deg 360deg)`, borderColor: cardBg }}>
                                                <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ background: cardBg }}>
                                                    <span className="text-2xl font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.qualityInsights?.positivePercent}%</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <LegendItem color="bg-[#89C587]" label="Positive" percent={`${data.qualityInsights?.positivePercent}%`} isDark={isDark} bodyColor={bodyColor} t={t} />
                                                <LegendItem color="bg-[#F6B07A]" label="Neutral" percent={`${data.qualityInsights?.neutralPercent}%`} isDark={isDark} bodyColor={bodyColor} t={t} />
                                                <LegendItem color="bg-[#E87E7E]" label="Negative" percent={`${data.qualityInsights?.negativePercent}%`} isDark={isDark} bodyColor={bodyColor} t={t} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Themes */}
                                    <div className="md:col-span-3">
                                        <h5 className="text-[11px] font-bold uppercase tracking-widest mb-6" style={{ color: subtextColor }}>{data.qualityInsights?.themesTitle || "Common Themes"}</h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Pros Card */}
                                            <div className="rounded-lg p-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAFAF8', border: `1px solid ${cardBorder}` }}>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <CheckCircle2 className="text-[#89C587] w-5 h-5 shrink-0" />
                                                    <p className="text-xs font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Pros</p>
                                                </div>
                                                <ul className="space-y-2">
                                                    {prosItems.map((item, idx) => (
                                                        <li key={idx} className="flex gap-2">
                                                            <span className="text-[#89C587] font-bold">•</span>
                                                            <span className="text-[13px] leading-normal lg:text-[12px] lg:leading-normal" style={{ color: bodyColor }}>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Cons Card */}
                                            <div className="rounded-lg p-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAFAF8', border: `1px solid ${cardBorder}` }}>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <XCircle className="text-[#E87E7E] w-5 h-5 shrink-0" />
                                                    <p className="text-xs font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Cons</p>
                                                </div>
                                                <ul className="space-y-2">
                                                    {consItems.map((item, idx) => (
                                                        <li key={idx} className="flex gap-2">
                                                            <span className="text-[#E87E7E] font-bold">•</span>
                                                            <span className="text-[13px] leading-normal lg:text-[12px] lg:leading-normal" style={{ color: bodyColor }}>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop sources */}
                                <div className="mt-8 pt-5 hidden lg:flex flex-wrap gap-4 items-center" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                    <div className="flex items-center gap-2 mr-2">
                                        <Building2 className="w-6 h-6 text-2xl text-[#B68A35]" />
                                        <span className="text-[14px] font-bold uppercase tracking-wider" style={{ color: subtextColor }}>Sources</span>
                                    </div>
                                    {sourcesDesktop.map((source, idx) => (
                                        <SourceLink key={idx} label={source.label} href={source.href} isDark={isDark} cardBorder={cardBorder} subtextColor={subtextColor} />
                                    ))}
                                </div>

                                {/* Mobile sources accordion */}
                                <div className="mt-6 lg:hidden">
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
                                            <ChevronUp className={`w-5 h-5 transition-transform ${isSourcesOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isSourcesOpen ? { color: subtextColor } : undefined} />
                                        </button>

                                        {isSourcesOpen && (
                                            <div className="p-3" style={{ borderTop: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#FBF9F6' }}>
                                                <ul className="space-y-3">
                                                    {sourcesMobile.map((source, idx) => (
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
                            )}
                        </div>
                    </div>

                    {/* Right Column: Insights & Disclaimer */}
                    <div className="lg:col-span-4 sm:space-y-4 p-2 space-y-2">

                        {/* On-Ground Analyst Insight */}
                        <div className="rounded lg:rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <div className="p-3" style={{ borderBottom: isInsightOpen ? `1px solid ${cardBorder}` : 'none' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsInsightOpen((s) => !s)}
                                    aria-expanded={isInsightOpen}
                                    className="w-full flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <TbBulb className="text-[#B68A35] w-8 h-8 text-2xl shrink-0" />
                                        <h4 className="font-bold text-sm lg:text-base text-left" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.insight?.title || "On-Ground Analyst Insight"}</h4>
                                    </div>
                                    <ChevronUp className={`w-5 h-5 shrink-0 transition-transform ${isInsightOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isInsightOpen ? { color: subtextColor } : undefined} />
                                </button>
                            </div>

                            {isInsightOpen && (
                                <div className="p-3">
                                    <div className="hidden lg:block p-3 rounded-lg flex gap-3 mb-5" style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                                        <Info className="text-[#B68A35] w-4 h-4 mt-0.5 shrink-0" />
                                        <p className="text-[12px] text-[#B68A35] uppercase font-bold leading-tight">
                                            {data.insight?.note || "NOTE:"} <span className="font-normal capitalize tracking-normal italic" style={{ color: bodyColor }}>{data.insight?.noteText || ""}</span>
                                        </p>
                                    </div>
                                    <div className="space-y-4 text-[13px] leading-normal lg:text-[14px] lg:leading-relaxed" style={{ color: bodyColor }}>
                                        <p>{data.insight?.content || ""}</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                        <Building2 className="text-[#B68A35] w-4 h-4 shrink-0" />
                                        <p className="text-[12px] leading-normal lg:leading-normal" style={{ color: subtextColor }}>
                                            {data.insight?.sourceLabel || "Source:"} <span className="text-[#B68A35] font-medium cursor-pointer">{data.insight?.sourceName || "PropertyIntel on-ground analysis"}</span> ({data.insight?.sourceDate || "21 February 2026"})
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Disclaimer */}
                        <div className="rounded lg:rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <div className="p-3" style={{ borderBottom: isDisclaimerOpen ? `1px solid ${cardBorder}` : 'none' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsDisclaimerOpen((s) => !s)}
                                    aria-expanded={isDisclaimerOpen}
                                    className="w-full flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <ShieldCheck className="text-[#B68A35] w-8 h-8 text-xl shrink-0" />
                                        <h4 className="font-bold text-sm lg:text-base text-left" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.disclaimer?.title || "Disclaimer"}</h4>
                                    </div>
                                    <ChevronUp className={`w-5 h-5 shrink-0 transition-transform ${isDisclaimerOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isDisclaimerOpen ? { color: subtextColor } : undefined} />
                                </button>
                            </div>

                            {isDisclaimerOpen && (
                                <div className="p-2">
                                    <p className="text-[13px] leading-normal lg:text-[14px] lg:leading-relaxed" style={{ color: bodyColor }}>
                                        {data.disclaimer?.content || ""}
                                    </p>
                                    <div className="mt-6 p-2 rounded lg:rounded-xl" style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                                        <div className="lg:hidden">
                                            <MobileNoteBox
                                                icon={<Calendar className="w-5 h-5" />}
                                                textStyle={{ color: subtextColor }}
                                            >
                                                <span className="font-bold block mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.disclaimer?.lastUpdated || "Last updated: 21 February 2026"}</span>
                                                {data.disclaimer?.note || "Some legacy projects may lack granular public delay records."}
                                            </MobileNoteBox>
                                        </div>
                                        <div className="hidden lg:flex items-center gap-3">
                                            <Calendar className="text-[#B68A35] w-5 h-5 shrink-0" />
                                            <div>
                                                <p className="text-[12px] font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.disclaimer?.lastUpdated || "Last updated: 21 February 2026"}</p>
                                                <p className="text-[12px] mt-0.5 leading-tight" style={{ color: subtextColor }}>{data.disclaimer?.note || "Some legacy projects may lack granular public delay records."}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <ExpertSection />
            </div>
        </section>
    );
};

// --- Sub-components ---

const StatCard = ({ icon, label, value, unit, divider, isDark, cardBg, cardBorder, subtextColor, bodyColor, t }) => (
    <div className="relative px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-2xl sm:text-3xl shrink-0" style={!isDark ? { background: '#FBF9F6', border: '1px solid #F3EFE9' } : { background: 'rgba(182,138,53,0.12)', border: `1px solid ${cardBorder}` }}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: subtextColor }}>{label}</p>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl sm:text-4xl font-bold text-[#B68A35]">{value}</span>
                    {unit && <span className="text-[9px] sm:text-[10px] font-bold uppercase" style={{ color: subtextColor }}>{unit}</span>}
                </div>
            </div>
        </div>
        {divider && <div className="pointer-events-none hidden md:block absolute right-0 top-6 bottom-6 w-px" style={{ background: cardBorder }} />}
    </div>
);

const TableRow = ({ name, original, actual, delay, reason, source, status, isDark, cardBorder, bodyColor, t }) => (
    <tr className="transition-colors" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <td className="px-4 py-4 font-medium" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{name}</td>
        <td className="px-4 py-4" style={{ color: bodyColor }}>{original}</td>
        <td className="px-4 py-4" style={{ color: bodyColor }}>{actual}</td>
        <td className={`px-4 py-4 font-bold ${status === 'on-time' ? 'text-[#89C587]' : 'text-[#E87E7E]'}`}>{delay}</td>
        <td className="px-4 py-4" style={{ color: bodyColor }}>{reason}</td>
        <td className="px-4 py-4 text-[#B68A35] font-medium cursor-pointer underline decoration-[#F3EFE9] underline-offset-4">{source}</td>
    </tr>
);

const LegendItem = ({ color, label, percent, isDark, bodyColor, t }) => (
    <div className="flex items-center justify-between gap-6 min-w-[120px]">
        <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-[12px] font-medium" style={{ color: bodyColor }}>{label}</span>
        </div>
        <span className="text-[11px] font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{percent}</span>
    </div>
);

const SourceLink = ({ label, href, isDark, cardBorder, subtextColor }) => (
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

// Helper function for icons
const getStatIcon = (iconName) => {
    const icons = {
        'FaRegCalendarCheck': <FaRegCalendarCheck className="text-[#B68A35] text-2xl sm:text-3xl" />,
        'BsBuildings': <BsBuildings className="text-[#B68A35] text-2xl sm:text-3xl" />,
        'SlBadge': <SlBadge className="text-[#B68A35] text-2xl sm:text-3xl" />,
        'Users': <Users className="text-[#B68A35] text-2xl sm:text-3xl" />
    };
    return icons[iconName] || <FaRegCalendarCheck className="text-[#B68A35] text-2xl sm:text-3xl" />;
};

export default Section5;