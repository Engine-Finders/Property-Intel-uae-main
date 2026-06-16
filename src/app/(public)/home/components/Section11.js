"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Star, Info, Leaf, Users, Sparkles, ShieldCheck,
    Clock, Banknote, Car, HardHat, ChevronDown,
    ArrowRight
} from 'lucide-react';
import { SiGooglemaps } from "react-icons/si";
import { TbHomeHeart } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
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

const Section11 = ({ data }) => {
    const { t, isDark, dark } = useThemeStyles();
    const [activeTab, setActiveTab] = useState('love'); // 'love' or 'concerns'
    const [openRecent, setOpenRecent] = useState(false);
    const [openVerification, setOpenVerification] = useState(false);

    const cardBg = isDark ? PANEL_DARK_BG : "#FFFFFF";
    const cardBorder = isDark ? t.cardBorder : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FCFBFA";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    if (!data) {
        return (
            <section className="w-full py-2 sm:py-5 font-sans antialiased" style={{ background: sectionBg }}>
                <div className="max-w-350 mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
                </div>
            </section>
        );
    }

    const ratings = data.ratings || [];
    const residentsLove = data.residentsLove || [];
    const commonConcerns = data.commonConcerns || [];
    const reviews = data.reviews || [];
    const headerDescription = data.header?.description || "We've analysed thousands of resident reviews from independent platforms to give you an honest, unfiltered picture of life in Emaar developments across Dubai.";

    return (
        <section className="w-full py-2 sm:py-5 font-sans antialiased" style={{ background: sectionBg }}>

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
                            {data.header?.title?.line1 || "What Residents Say About Emaar:"}
                            <span className="block text-[#B68A35]">{data.header?.title?.line2 || "Communities - Verified Reviews"}</span>
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
                        {data.header?.title?.line1 || "What Residents Say About Emaar:"}
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        {data.header?.title?.line2 || "Communities - Verified Reviews"}
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base leading-[17px] font-medium" style={{ color: bodyColor }}>
                        {headerDescription}
                    </p>
                </div>
            </div>

            <div className="max-w-350 mx-auto px-2 sm:px-6 md:-mt-12 relative z-10 pb-16">

                {/* Top Ratings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2 sm:mb-4">
                    {/* Mobile Layout - Matches Screenshot */}
                    <div className="lg:hidden rounded p-6 shadow-sm" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-6xl font-bold font-[Merriweather] tabular-nums" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.aggregatedRating?.overallScore || "3.7"}</span>
                                <span className="text-2xl font-[Merriweather] tabular-nums" style={{ color: subtextColor }}>/5</span>
                            </div>

                            <div className="text-right">
                                <div className="flex gap-0.5 mb-1 justify-end">
                                    {renderStars(data.aggregatedRating?.overallScore || 3.7, isDark)}
                                </div>
                                <p className="text-sm" style={{ color: subtextColor }}>{data.aggregatedRating?.totalReviews || "3,000+ reviews analysed"}</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t mb-6" style={{ borderColor: cardBorder }}></div>

                        {/* Platform Breakdown */}
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide mb-4" style={{ color: subtextColor }}>Platform Breakdown</p>
                            <div className="space-y-4">
                                {ratings.map((platform, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getPlatformIcon(platform.iconName, platform.iconUrl)}
                                            <span className="font-medium" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{platform.platform}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-0.5">
                                                {renderStars(platform.rating, isDark, true)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-[#C9A962]">{platform.rating}</span>
                                                <span className="text-sm" style={{ color: subtextColor }}>{platform.reviews}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:block rounded-2xl p-8 shadow-sm" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <h3 className="text-lg font-semibold mb-6" style={isDark ? { color: t.text } : { color: '#1F2937' }}>Aggregated Rating</h3>
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            <div className="flex items-baseline gap-1">
                                <span className="text-[90px] font-bold font-[Merriweather] tabular-nums" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.aggregatedRating?.overallScore || "3.7"}</span>
                                <span className="text-4xl font-[Merriweather] tabular-nums" style={{ color: subtextColor }}>/5</span>
                            </div>

                            <div className="hidden md:block w-px h-32" style={{ background: cardBorder }}></div>

                            <div className="flex-1">
                                <div className="flex gap-1 mb-3">
                                    {renderStars(data.aggregatedRating?.overallScore || 3.7, isDark, false, "w-8 h-8")}
                                </div>
                                <p className="font-medium mb-2" style={isDark ? { color: t.textSecondary } : { color: '#1F2937' }}>Overall Score</p>
                                <p className="text-sm" style={{ color: bodyColor }}>
                                    {data.aggregatedRating?.totalReviews || "Total Reviews Analysed: ~3,000+<br/>(aggregated across platforms)"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Platform Breakdown - Desktop Table */}
                    <div className="hidden lg:block rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <h3 className="text-lg font-semibold mb-6" style={isDark ? { color: t.text } : { color: '#1F2937' }}>Platform Breakdown</h3>
                        <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${cardBorder}` }}>
                            <table className="w-full text-sm">
                                <thead className="bg-[#B68A35] text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Platform</th>
                                        <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide">Average Rating</th>
                                        <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-wide">Number of Reviews</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ borderColor: cardBorder }}>
                                    {ratings.map((platform, idx) => (
                                        <tr key={idx} className="transition-colors" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                                            <td className="px-4 py-4 flex items-center gap-3">
                                                {getPlatformIcon(platform.iconName, platform.iconUrl)}
                                                <span className="font-medium" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{platform.platform}</span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="font-bold text-[#C9A962]">{platform.rating}</span>
                                                <span className="ml-1" style={{ color: subtextColor }}>/ 5</span>
                                            </td>
                                            <td className="px-4 py-4 text-right" style={{ color: bodyColor }}>{platform.reviews}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sentiment Distribution Bar */}
                <div className="rounded lg:rounded-2xl p-4 mb-2 sm:mb-4 shadow-sm" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    <h3 className="text-lg font-semibold mb-6 font-[Merriweather] tabular-nums" style={isDark ? { color: t.text } : { color: '#1F2937' }}>Sentiment Distribution</h3>
                    <div className="w-full h-3 rounded-full flex overflow-hidden mb-4 sm:mb-8" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0' }}>
                        <div className="h-full bg-[#C9A962]" style={{ width: `${data.sentiment?.positive || 78}%` }} />
                        <div className="h-full bg-[#D4D0C8]" style={{ width: `${data.sentiment?.neutral || 14}%` }} />
                        <div className="h-full bg-[#F4A49A]" style={{ width: `${data.sentiment?.negative || 8}%` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-[#C9A962]" />
                                <span className="text-sm" style={{ color: bodyColor }}>Positive</span> <span className="hidden sm:block" style={{ color: bodyColor }}>(4-5 stars)</span>
                            </div>
                            <p className="text-2xl font-bold font-[Merriweather] tabular-nums" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.sentiment?.positive || 78}%</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-[#D4D0C8]" />
                                <span className="text-sm" style={{ color: bodyColor }}>Neutral</span> <span className="hidden sm:block" style={{ color: bodyColor }}>(3 stars)</span>
                            </div>
                            <p className="text-2xl font-bold font-[Merriweather] tabular-nums" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.sentiment?.neutral || 14}%</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-[#F4A49A]" />
                                <span className="text-sm" style={{ color: bodyColor }}>Negative</span> <span className="hidden sm:block" style={{ color: bodyColor }}>(1-2 stars)</span>
                            </div>
                            <p className="text-2xl font-bold font-[Merriweather] tabular-nums" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.sentiment?.negative || 8}%</p>
                        </div>
                    </div>
                </div>

                {/* Tabs: Love vs Concerns */}
                <div className="rounded lg:rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-sm" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    <div className="flex" style={isDark ? dark.tabBar : { borderBottom: `1px solid ${cardBorder}` }}>
                        <button
                            onClick={() => setActiveTab('love')}
                            className={`relative flex-1 py-4 lg:py-5 text-[10px] lg:text-sm font-bold leading-tight text-center transition-all flex items-center justify-center gap-1.5 lg:gap-2 min-w-0 px-1 ${activeTab === 'love'
                                    ? isDark
                                        ? "text-[#B68A35]"
                                        : "text-[#B68A35] border-b-2 border-[#B68A35]"
                                    : ""
                                }`}
                            style={
                                isDark
                                    ? activeTab === "love"
                                        ? { ...dark.tabActive, borderBottom: `2px solid ${GOLD_BORDER}` }
                                        : dark.tabInactive
                                    : activeTab !== "love"
                                        ? { color: subtextColor }
                                        : undefined
                            }
                        >
                            <FaRegHeart className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" /> <span className="truncate">{data.tabs?.love || "What Residents Love"}</span>
                            {isDark && activeTab === "love" && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" aria-hidden />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('concerns')}
                            className={`relative flex-1 py-4 lg:py-5 text-[10px] lg:text-sm font-bold leading-tight text-center transition-all flex items-center justify-center gap-1.5 lg:gap-2 min-w-0 px-1 ${activeTab === 'concerns'
                                    ? isDark
                                        ? "text-[#B68A35]"
                                        : "text-[#B68A35] border-b-2 border-[#B68A35]"
                                    : ""
                                }`}
                            style={
                                isDark
                                    ? activeTab === "concerns"
                                        ? { ...dark.tabActive, borderBottom: `2px solid ${GOLD_BORDER}` }
                                        : dark.tabInactive
                                    : activeTab !== "concerns"
                                        ? { color: subtextColor }
                                        : undefined
                            }
                        >
                            <Info className="w-4 h-4 rotate-180 shrink-0" /> <span className="truncate">{data.tabs?.concerns || "Common Concerns"}</span>
                            {isDark && activeTab === "concerns" && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" aria-hidden />
                            )}
                        </button>
                    </div>
                    <div className="p-2 sm:p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {(activeTab === 'love' ? residentsLove : commonConcerns).map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-2 sm:p-5 rounded lg:rounded-xl flex gap-4"
                                    style={
                                        isDark
                                            ? { ...dark.goldTint, border: `1px solid ${GOLD_BORDER}` }
                                            : { background: "#FDFCFB", border: `1px solid ${cardBorder}` }
                                    }
                                >
                                    <div className="mt-1">{getConcernIcon(item.iconName)}</div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{item.title}</h4>
                                        <p className="text-[13px] leading-normal lg:text-xs lg:leading-relaxed" style={{ color: bodyColor }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Grid: Recent Highlights & Verification */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6 items-start">
                    {/* Recent Review Highlights (accordion) */}
                    <div className="rounded lg:rounded-2xl shadow-sm overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <button
                            type="button"
                            onClick={() => setOpenRecent(prev => !prev)}
                            aria-expanded={openRecent}
                            className="w-full p-5 flex items-center justify-between"
                            style={isDark ? { color: t.text } : undefined}
                        >
                            <h4
                                className={`font-bold text-sm flex items-center gap-2 uppercase tracking-wide mb-0 ${isDark ? "" : ""}`}
                                style={isDark ? dark.text : undefined}
                            >
                                <Star className="w-5 h-5 text-[#B68A35] font-[Merriweather] tabular-nums" /> {data.recentHighlights?.title || "Recent Review Highlights"}
                            </h4>
                            <span className="lg:hidden">
                                <ChevronDown
                                    className={`inline w-5 h-5 transition-transform duration-200 ${openRecent ? "rotate-180" : ""}`}
                                    style={isDark ? dark.textMuted : undefined}
                                />
                            </span>
                        </button>

                        <div className="transition-all duration-300 ease-in-out overflow-hidden" style={{ maxHeight: openRecent ? "360px" : "0px" }}>
                            <div className="overflow-y-auto p-2 space-y-2 custom-scrollbar">
                                {reviews.map((rev, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-2 sm:p-4 border-b last:border-0 ${isDark ? "" : "border-gray-50"}`}
                                        style={isDark ? { borderColor: dark.dividerColor } : undefined}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 ${i < rev.stars ? "fill-[#B68A35] text-[#B68A35]" : isDark ? "text-white/15 fill-white/15" : "text-gray-200 fill-gray-200"}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className={`text-[10px] ${isDark ? "" : "text-gray-400"}`} style={isDark ? dark.textMuted : undefined}>
                                                <span className="text-[#B68A35] font-bold">{rev.platform}</span> • {rev.date}
                                            </p>
                                        </div>
                                        <p className={`text-[13px] italic leading-normal lg:text-xs lg:leading-relaxed ${isDark ? "" : "text-gray-600"}`} style={isDark ? dark.textSecondary : undefined}>
                                            &ldquo;{rev.text}&rdquo;
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className={`${openRecent ? "block" : "hidden"} lg:block`}>
                                <button
                                    type="button"
                                    className={`w-full py-4 text-[#B68A35] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${isDark ? "hover:opacity-90" : "bg-gray-50 hover:bg-gray-100"}`}
                                    style={isDark ? { ...dark.surfaceAlt, borderTop: `1px solid ${dark.dividerColor}` } : undefined}
                                >
                                    {data.recentHighlights?.viewMoreText || "View More Reviews"} <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Verification Note (accordion) */}
                    <div className="rounded lg:rounded-2xl shadow-sm overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <button
                            type="button"
                            onClick={() => setOpenVerification((prev) => !prev)}
                            aria-expanded={openVerification}
                            className="w-full p-5 flex items-center justify-between"
                            style={isDark ? { color: t.text } : undefined}
                        >
                            <h4
                                className="font-bold text-sm flex items-center gap-2 uppercase tracking-wide mb-0"
                                style={isDark ? dark.text : undefined}
                            >
                                <ShieldCheck className="w-5 h-5 text-[#B68A35] font-[Merriweather] tabular-nums" /> {data.verificationNote?.title || "Verification Note"}
                            </h4>
                            <ChevronDown
                                className={`inline w-5 h-5 transition-transform duration-200 ${openVerification ? "rotate-180" : ""}`}
                                style={isDark ? dark.textMuted : undefined}
                            />
                        </button>

                        <div className="transition-all duration-300 ease-in-out overflow-hidden" style={{ maxHeight: openVerification ? "360px" : "0px" }}>
                            <div className="p-3 sm:p-5">
                                <p
                                    className={`text-[13px] leading-normal lg:leading-relaxed space-y-4 ${isDark ? "" : "text-gray-600"}`}
                                    style={isDark ? dark.textSecondary : undefined}
                                >
                                    {data.verificationNote?.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <ExpertSection />

                <div
                    className="mt-2 sm:mt-6 rounded lg:rounded-xl px-4 py-4 sm:px-5 transition-colors duration-300"
                    style={{
                        border: `1px solid ${cardBorder}`,
                        background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6',
                        ...(isDark ? dark.verifyBanner : {}),
                    }}
                >
                    <div className="lg:hidden">
                        <MobileNoteBox icon={<Info className="w-5 h-5" />} textStyle={isDark ? dark.textSecondary : { color: bodyColor }}>
                            <span className="font-bold uppercase" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                {data.disclaimer?.title || "Disclaimer:"}
                            </span>
                            {" "}{data.disclaimer?.text || "Reviews are user-generated content and may not reflect all residents' experiences. Aggregated sentiment is for informational purposes only and does not constitute investment advice. Last updated: 22 February 2026."}
                        </MobileNoteBox>
                    </div>
                    <div className="hidden lg:flex items-start gap-3">
                        <Info className="w-5 h-5 text-[#B68A35] mt-0.5 shrink-0" />
                        <p className="text-xs leading-relaxed" style={isDark ? dark.textSecondary : { color: bodyColor }}>
                            <strong>{data.disclaimer?.title || "Disclaimer:"}</strong> {data.disclaimer?.text || "Reviews are user-generated content and may not reflect all residents' experiences. Aggregated sentiment is for informational purposes only and does not constitute investment advice. Last updated: 22 February 2026."}
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: ${isDark ? "rgba(255,255,255,0.06)" : "#f1f1f1"};
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #b68a35;
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
};

// Helper functions
const renderStars = (rating, isDark, isMobile = false, sizeClass = "w-4 h-4") => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(
                <svg key={i} className={`${sizeClass} fill-[#C9A962]`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(
                <svg key={i} className={`${sizeClass} fill-[#C9A962]`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        } else {
            stars.push(
                <svg key={i} className={`${sizeClass} fill-gray-200`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
    }
    return stars;
};

const getPlatformIcon = (iconName, iconUrl) => {
    if (iconName === 'SiGooglemaps') {
        return <SiGooglemaps className="text-[#4285F4] w-6 h-6" />;
    }
    if (iconName === 'TbHomeHeart') {
        return <TbHomeHeart className="text-[#EF5E4E] w-6 h-6" />;
    }
    if (iconUrl) {
        return <Image src={iconUrl} alt="Platform Icon" width={24} height={24} className="w-6 h-6 object-contain" />;
    }
    return <Star className="w-6 h-6 text-[#B68A35]" />;
};

const getConcernIcon = (iconName) => {
    const icons = {
        'Leaf': <Leaf className="w-5 h-5 text-[#B68A35]" />,
        'Users': <Users className="w-5 h-5 text-[#B68A35]" />,
        'Sparkles': <Sparkles className="w-5 h-5 text-[#B68A35]" />,
        'ShieldCheck': <ShieldCheck className="w-5 h-5 text-[#B68A35]" />,
        'Clock': <Clock className="w-5 h-5 text-[#B68A35]" />,
        'Banknote': <Banknote className="w-5 h-5 text-[#B68A35]" />,
        'Car': <Car className="w-5 h-5 text-[#B68A35]" />,
        'HardHat': <HardHat className="w-5 h-5 text-[#B68A35]" />
    };
    return icons[iconName] || <Leaf className="w-5 h-5 text-[#B68A35]" />;
};

export default Section11;