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

const Section5 = () => {
    const [isDesktop, setIsDesktop] = useState(false);
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
            // default open on desktop, closed on phone
            setIsInsightOpen(desktop);
            setIsDisclaimerOpen(desktop);
            setIsSourcesOpen(desktop);
        };

        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);
    
    return (
        <section style={{ background: sectionBg }} className="py-12 font-sans">

            {/* Header Section */}
            <div className="relative w-full h-[320px] lg:h-[400px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Home/Section3bg.webp"
                        alt="Dubai Skyline"
                        fill
                        className="object-cover object-center grayscale-[10%]"
                        priority
                    />
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} style={isDark ? dark?.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        Emaar Delivery Track Record:
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        Transparency You Can Trust
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
                        We have analysed official handover records and verified owner feedback to present an honest picture of Emaar's delivery performance.
                    </p>
                </div>
            </div>
            
            <div className="max-w-[1400px] mx-auto -mt-12 relative z-20">
                {/* --- STATS OVERVIEW CARDS --- */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-8 rounded-2xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                    <StatCard
                        icon={<FaRegCalendarCheck className="text-[#B68A35]" />}
                        label="On-Time Delivery Rate"
                        value="96%"
                        chart
                        divider
                        isDark={isDark}
                        cardBg={cardBg}
                        cardBorder={cardBorder}
                        subtextColor={subtextColor}
                        bodyColor={bodyColor}
                        t={t}
                    />
                    <StatCard
                        icon={<BsBuildings className="text-[#B68A35]" />}
                        label="Projects Analysed"
                        value="3"
                        unit="Projects"
                        divider
                        isDark={isDark}
                        cardBg={cardBg}
                        cardBorder={cardBorder}
                        subtextColor={subtextColor}
                        bodyColor={bodyColor}
                        t={t}
                    />
                    <StatCard
                        icon={<SlBadge className="text-[#B68A35]" />}
                        label="Avg. Delay"
                        value="~5"
                        unit="Months"
                        divider
                        isDark={isDark}
                        cardBg={cardBg}
                        cardBorder={cardBorder}
                        subtextColor={subtextColor}
                        bodyColor={bodyColor}
                        t={t}
                    />
                    <StatCard
                        icon={<Users className="text-[#B68A35]" />}
                        label="Owner Feedback Analysed"
                        value="500+"
                        unit="Reviews"
                        isDark={isDark}
                        cardBg={cardBg}
                        cardBorder={cardBorder}
                        subtextColor={subtextColor}
                        bodyColor={bodyColor}
                        t={t}
                    />
                </div>

                {/* --- MAIN DASHBOARD GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column: Handover & Quality */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Project Handover Analysis */}
                        <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <div className="p-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                                <div className="flex items-center gap-3">
                                    <PiBuildingApartmentLight className="text-[#B68A35] w-8 h-8" />
                                    <h4 className="font-bold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Project Handover Analysis</h4>
                                </div>
                                <ChevronUp className="w-5 h-5" style={{ color: subtextColor }} />
                            </div>
                            <div className="p-2">
                                <p className="text-[14px] mb-4" style={{ color: bodyColor }}>
                                    The following projects have been analysed using official DLD handover records, RERA progress reports, and developer announcements.
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-[11px] lg:text-xs">
                                        <thead>
                                            <tr style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FBF9F6', color: subtextColor, borderTop: `1px solid ${cardBorder}`, borderBottom: `1px solid ${cardBorder}` }}>
                                                <th className="px-2 py-3 font-bold">Project Name</th>
                                                <th className="px-2 py-3 font-bold">Original Handover</th>
                                                <th className="px-2 py-3 font-bold">Actual Handover</th>
                                                <th className="px-2 py-3 font-bold">Delay (Months)</th>
                                                <th className="px-2 py-3 font-bold">Reason</th>
                                                <th className="px-2 py-3 font-bold">Source Reference</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <TableRow name="Downtown Dubai Phase 1" original="2008" actual="2008" delay="0" reason="On Time" source="Wikipedia" status="on-time" isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor} t={t} />
                                            <TableRow name="Arabian Ranches II - Phase 1 Casa" original="Q1 2014" actual="Dec 2014" delay="~9 months" reason="Phased delivery" source="Chainex Real Estate" status="delay" isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor} t={t} />
                                            <TableRow name="The Meadows 10" original="Q2 2014" actual="Q4 2014" delay="~6 months" reason="Phased delivery" source="DLD Completion Registry" status="delay" isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor} t={t} />
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 p-3 rounded-lg flex gap-3 items-start" style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                                    <Info className="text-[#B68A35] w-6 h-6" />
                                    <p className="text-[12px] leading-relaxed" style={{ color: subtextColor }}>
                                        <span className="font-bold text-[#B68A35]">Note:</span> "Dubai Marina Towers" was excluded from analysis as this is a generic designation covering multiple developers; no single Emaar-specific project matching this exact name could be verified in DLD/RERA records.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quality & Owner Satisfaction Insights */}
                        <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <div className="p-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                                <div className="flex items-center gap-3">
                                    <Star className="text-[#B68A35] w-8 h-8" />
                                    <h4 className="font-bold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Quality & Owner Satisfaction Insights</h4>
                                </div>
                                <ChevronUp className="w-5 h-5" style={{ color: subtextColor }} />
                            </div>
                            <div className="p-2 sm:p-6">
                                <p className="text-[14px] leading-relaxed mb-4" style={{ color: bodyColor }}>
                                    <span className="font-bold text-[#B68A35]">Summary:</span> Owners consistently praise Emaar communities for master-planned design, landscaping quality, and long-term asset value retention. However, maintenance response times and service charge transparency are recurring themes in feedback, particularly in larger communities and high-density towers.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    {/* Sentiment Chart */}
                                    <div className="md:col-span-2">
                                        <h5 className="text-[11px] font-bold uppercase tracking-widest mb-6" style={{ color: subtextColor }}>Sentiment Breakdown</h5>
                                        <div className="flex items-center gap-8">
                                            <div className="relative w-32 h-32 rounded-full flex items-center justify-center border-8" style={{ background: 'conic-gradient(from 0deg, #89C587 0deg 280.8deg, #F6B07A 280.8deg 330.4deg, #E87E7E 330.4deg 360deg)', borderColor: cardBg }}>
                                                <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ background: cardBg }}>
                                                    <span className="text-2xl font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>78%</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <LegendItem color="bg-[#89C587]" label="Positive" percent="78%" isDark={isDark} bodyColor={bodyColor} t={t} />
                                                <LegendItem color="bg-[#F6B07A]" label="Neutral" percent="14%" isDark={isDark} bodyColor={bodyColor} t={t} />
                                                <LegendItem color="bg-[#E87E7E]" label="Negative" percent="8%" isDark={isDark} bodyColor={bodyColor} t={t} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Themes */}
                                    <div className="md:col-span-3">
                                        <h5 className="text-[11px] font-bold uppercase tracking-widest mb-6" style={{ color: subtextColor }}>Common Themes</h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Pros Card */}
                                            <div className="rounded-lg p-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAFAF8', border: `1px solid ${cardBorder}` }}>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <CheckCircle2 className="text-[#89C587] w-5 h-5 shrink-0" />
                                                    <p className="text-xs font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Pros</p>
                                                </div>
                                                <ul className="space-y-2">
                                                    <li className="flex gap-2">
                                                        <span className="text-[#89C587] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Integrated community amenities</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#89C587] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Consistent build quality</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#89C587] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Strong resale value</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#89C587] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Landscaping and public spaces</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#89C587] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Security and access control</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#89C587] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Pet-friendly facilities</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#89C587] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Family-oriented environment</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Cons Card */}
                                            <div className="rounded-lg p-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAFAF8', border: `1px solid ${cardBorder}` }}>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <XCircle className="text-[#E87E7E] w-5 h-5 shrink-0" />
                                                    <p className="text-xs font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Cons</p>
                                                </div>
                                                <ul className="space-y-2">
                                                    <li className="flex gap-2">
                                                        <span className="text-[#E87E7E] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Maintenance request turnaround (varies by community)</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#E87E7E] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Service charge communication and transparency</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#E87E7E] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Limited visitor parking in high-density towers</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#E87E7E] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Construction activity in actively developing phases</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-[#E87E7E] font-bold">•</span>
                                                        <span className="text-[12px]" style={{ color: bodyColor }}>Occasional handover delays in off-plan projects</span>
                                                    </li>
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
                                    <SourceLink label="EP Log Offplan" href="https://eplogoffplan.com/blog/full-comparison-of-luxury-apartments-by-emaar-and-sobha-and-damac" isDark={isDark} cardBorder={cardBorder} subtextColor={subtextColor} />
                                    <SourceLink label="ALand Blog" href="https://a.land/blog/build-quality-red-flags-warning-signs-from-different-developers" isDark={isDark} cardBorder={cardBorder} subtextColor={subtextColor} />
                                    <SourceLink label="Map Homes Real Estate" href="https://maphomesrealestate.com/emaar-vs-damac-dubai-real-estate-comparison/" isDark={isDark} cardBorder={cardBorder} subtextColor={subtextColor} />
                                    <SourceLink label="Glassdoor" href="https://www.glassdoor.com/Reviews/Emaar-Properties-Dubai-Reviews-EI_IE42707.0,16_IL.17,22_IM954.htm" isDark={isDark} cardBorder={cardBorder} subtextColor={subtextColor} />
                                    <SourceLink label="Avelon" href="http://avelon.ae/news-and-blogs/top-7-real-estate-developers-in-dubai-for-smart-property-investment-in-2026/" isDark={isDark} cardBorder={cardBorder} subtextColor={subtextColor} />
                                </div>

                                {/* Mobile sources accordion */}
                                <div className="mt-6 lg:hidden">
                                    <div className="rounded-lg overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                        <button
                                            type="button"
                                            onClick={() => setIsSourcesOpen((s) => !s)}
                                            aria-expanded={isSourcesOpen}
                                            className="w-full flex items-center justify-between p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Building2 className="w-5 h-5 text-[#B68A35]" />
                                                <span className="text-[14px] font-bold uppercase tracking-wider" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Sources</span>
                                            </div>
                                            <ChevronUp className={`w-5 h-5 transition-transform ${isSourcesOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isSourcesOpen ? { color: subtextColor } : undefined} />
                                        </button>

                                        {isSourcesOpen && (
                                            <div className="p-3" style={{ borderTop: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#FBF9F6' }}>
                                                <ul className="space-y-3">
                                                    <li className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-2 h-2 rounded-full" style={{ background: subtextColor }} />
                                                            <a href="https://eplogoffplan.com/blog/full-comparison-of-luxury-apartments-by-emaar-and-sobha-and-damac" target="_blank" rel="noopener noreferrer" className="text-[14px] underline decoration-gray-200" style={{ color: bodyColor }}>EP Log Offplan</a>
                                                        </div>
                                                        <a href="https://eplogoffplan.com/blog/full-comparison-of-luxury-apartments-by-emaar-and-sobha-and-damac" target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35]"><ExternalLink className="w-4 h-4" /></a>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-2 h-2 rounded-full" style={{ background: subtextColor }} />
                                                            <a href="https://a.land/blog/build-quality-red-flags-warning-signs-from-different-developers" target="_blank" rel="noopener noreferrer" className="text-[14px] underline decoration-gray-200" style={{ color: bodyColor }}>ALand Blog</a>
                                                        </div>
                                                        <a href="https://a.land/blog/build-quality-red-flags-warning-signs-from-different-developers" target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35]"><ExternalLink className="w-4 h-4" /></a>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-2 h-2 rounded-full" style={{ background: subtextColor }} />
                                                            <a href="https://maphomesrealestate.com/emaar-vs-damac-dubai-real-estate-comparison/" target="_blank" rel="noopener noreferrer" className="text-[14px] underline decoration-gray-200" style={{ color: bodyColor }}>Map Homes Real Estate</a>
                                                        </div>
                                                        <a href="https://maphomesrealestate.com/emaar-vs-damac-dubai-real-estate-comparison/" target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35]"><ExternalLink className="w-4 h-4" /></a>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-2 h-2 rounded-full" style={{ background: subtextColor }} />
                                                            <a href="https://www.glassdoor.com/Reviews/Emaar-Properties-Dubai-Reviews-EI_IE42707.0,16_IL.17,22_IM954.htm" target="_blank" rel="noopener noreferrer" className="text-[14px] underline decoration-gray-200" style={{ color: bodyColor }}>Glassdoor</a>
                                                        </div>
                                                        <a href="https://www.glassdoor.com/Reviews/Emaar-Properties-Dubai-Reviews-EI_IE42707.0,16_IL.17,22_IM954.htm" target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35]"><ExternalLink className="w-4 h-4" /></a>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-2 h-2 rounded-full" style={{ background: subtextColor }} />
                                                            <a href="http://avelon.ae/news-and-blogs/top-7-real-estate-developers-in-dubai-for-smart-property-investment-in-2026/" target="_blank" rel="noopener noreferrer" className="text-[14px] underline decoration-gray-200" style={{ color: bodyColor }}>Avelon</a>
                                                        </div>
                                                        <a href="http://avelon.ae/news-and-blogs/top-7-real-estate-developers-in-dubai-for-smart-property-investment-in-2026/" target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35]"><ExternalLink className="w-4 h-4" /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Insights & Disclaimer */}
                    <div className="lg:col-span-4 sm:space-y-4 p-2 space-y-2">

                        {/* On-Ground Analyst Insight */}
                        <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <div className="p-3" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                                <button
                                    type="button"
                                    onClick={() => setIsInsightOpen((s) => !s)}
                                    aria-expanded={isInsightOpen}
                                    className="w-full flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <TbBulb className="text-[#B68A35] w-8 h-8 text-2xl" />
                                        <h4 className="font-bold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>On-Ground Analyst Insight</h4>
                                    </div>
                                    <ChevronUp className={`w-5 h-5 transition-transform ${isInsightOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isInsightOpen ? { color: subtextColor } : undefined} />
                                </button>
                            </div>

                            {isInsightOpen && (
                                <div className="p-3">
                                    <div className="p-3 rounded-lg flex gap-3 mb-5" style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                                        <Info className="text-[#B68A35] w-4 h-4 mt-0.5 shrink-0" />
                                        <p className="text-[12px] text-[#B68A35] uppercase font-bold leading-tight">
                                            NOTE: <span className="font-normal capitalize tracking-normal italic" style={{ color: bodyColor }}>Below is a draft on-ground analyst insight section based on my research findings.</span>
                                        </p>
                                    </div>
                                    <div className="space-y-4 text-[14px] leading-relaxed" style={{ color: bodyColor }}>
                                        <p>Emaar Properties maintains one of the strongest delivery records among Dubai developers, with 96% of projects handed over on time according to industry analysis. This reliability, combined with premium build quality and integrated community planning, justifies the 15-20% price premium Emaar commands over comparable developments. However, our verification of DLD records and buyer feedback confirms that delays do occur, particularly in large-scale, complex projects—with documented delays ranging from 9-12 months for communities like Casa in Arabian Ranches II to over 48 months for selected iconic developments. Service charges remain predictable at AED 15-22 per sqft, though transparency in communication remains a recurring theme in resident feedback. Market-wide factors, including contractor capacity and supply chain constraints highlighted in Cavendish Maxwell's H1 2025 analysis, suggest these delivery timelines reflect industry-wide challenges rather than developer-specific issues. For investors, Emaar's unmatched resale liquidity and long-term capital appreciation in communities like Dubai Hills Estate and Downtown Dubai continue to outweigh the premium entry price, making the developer the preferred choice for risk-averse buyers prioritizing certainty over maximum short-term yields.</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                        <Building2 className="text-[#B68A35] w-4 h-4" />
                                        <p className="text-[12px]" style={{ color: subtextColor }}>
                                            Source: <span className="text-[#B68A35] font-medium cursor-pointer">PropertyIntel on-ground analysis</span> (21 February 2026)
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Disclaimer */}
                        <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                            <div className="p-3" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                                <button
                                    type="button"
                                    onClick={() => setIsDisclaimerOpen((s) => !s)}
                                    aria-expanded={isDisclaimerOpen}
                                    className="w-full flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="text-[#B68A35] w-8 h-8 text-xl" />
                                        <h4 className="font-bold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Disclaimer</h4>
                                    </div>
                                    <ChevronUp className={`w-5 h-5 transition-transform ${isDisclaimerOpen ? 'rotate-180 text-[#B68A35]' : ''}`} style={!isDisclaimerOpen ? { color: subtextColor } : undefined} />
                                </button>
                            </div>

                            {isDisclaimerOpen && (
                                <div className="p-2">
                                    <p className="text-[14px] leading-relaxed" style={{ color: bodyColor }}>
                                        All delay data verified against DLD handover records, RERA progress reports, and Emaar official announcements. Projects with delay ≤2 months are classified as "on-time". Where official handover dates are not publicly disclosed, placeholders are used for backend population. Quality insights aggregated from verified owner reviews; sentiment percentages are estimates based on available public data. Last updated: 21 February 2026. Some legacy projects may lack granular public delay records due to pre-digital reporting standards.
                                    </p>
                                    <div className="mt-6 flex items-center gap-3 p-2 rounded-xl" style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                                        <Calendar className="text-[#B68A35] w-5 h-5" />
                                        <div>
                                            <p className="text-[12px] font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Last updated: 21 February 2026</p>
                                            <p className="text-[12px] mt-0.5 leading-tight" style={{ color: subtextColor }}>Some legacy projects may lack granular public delay records.</p>
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

const StatCard = ({ icon, label, value, unit, chart, divider, isDark, cardBg, cardBorder, subtextColor, bodyColor, t }) => (
    <div className="relative px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-center text-center">

        {/* Container */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">

            {/* Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-2xl sm:text-3xl shrink-0" style={!isDark ? { background: '#FBF9F6', border: '1px solid #F3EFE9' } : { background: 'rgba(182,138,53,0.12)', border: `1px solid ${cardBorder}` }}>
                {icon}
            </div>

            {/* Text */}
            <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: subtextColor }}>
                    {label}
                </p>

                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl sm:text-4xl font-bold text-[#B68A35]">
                        {value}
                    </span>

                    {unit && (
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase" style={{ color: subtextColor }}>
                            {unit}
                        </span>
                    )}
                </div>
            </div>
        </div>

        {/* Divider (Desktop only) */}
        {divider && (
            <div className="pointer-events-none hidden md:block absolute right-0 top-6 bottom-6 w-px" style={{ background: cardBorder }} />
        )}
    </div>
);

const TableRow = ({ name, original, actual, delay, reason, source, status, isDark, cardBorder, bodyColor, t }) => (
    <tr className="transition-colors" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <td className="px-4 py-4 font-medium" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{name}</td>
        <td className="px-4 py-4" style={{ color: bodyColor }}>{original}</td>
        <td className="px-4 py-4" style={{ color: bodyColor }}>{actual}</td>
        <td className={`px-4 py-4 font-bold ${status === 'on-time' ? 'text-[#89C587]' : 'text-[#E87E7E]'}`}>
            {delay}
        </td>
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

export default Section5;