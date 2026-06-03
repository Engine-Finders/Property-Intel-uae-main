"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    ShieldCheck,
    Check,
    CheckCircle,
    AlertTriangle,
    XCircle,
    ChevronDown,
    ChevronUp,
    Users,
    TrendingUp,
    DollarSign,
    Clock,
    Award,
    Building2,
    Home,
    FileText,
    Lightbulb,
    Info,
    Percent,
    MapPin,
} from "lucide-react";
import { LuInfo } from "react-icons/lu";
import { PiUsersBold } from "react-icons/pi";
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

// ─── DATA ────────────────────────────────────────────────────────────────────

const buyerProfiles = [
    {
        profile: "Families Seeking Ready Homes",
        suitability: "High",
        suitabilityType: "high",
        rationale:
            "Immediate occupancy; no construction risk; mature landscaping; established school catchments (JESS, Dubai British School).",
    },
    {
        profile: "Capital Preservation Investors",
        suitability: "High",
        suitabilityType: "high",
        rationale:
            "Low volatility asset; historically resilient during market corrections; scarce supply of gated luxury villas supports floor values.",
    },
    {
        profile: "Downsizers / Retirees",
        suitability: "Moderate",
        suitabilityType: "moderate",
        rationale:
            "Quiet, low-density environment; single-level living options available; however, car dependency is high for daily errands.",
    },
    {
        profile: "High-Yield Seekers",
        suitability: "Low",
        suitabilityType: "low",
        rationale:
            "Gross yields (3.2-4.1%) are below Dubai villa average (5-6%); better suited for long-term capital hold than immediate cash flow.",
    },
    {
        profile: "Short-Term Flippers",
        suitability: "Low",
        suitabilityType: "low",
        rationale:
            "High entry price (AED 25M+); slower transaction velocity (60-90 days on market); significant DLD fees reduce margin potential.",
    },
];

const comparativeData = [
    {
        community: "Emirates Hills",
        status: "Completed (2008)",
        pricePerSqft: "AED 3,100-3,800",
        grossYield: "3.2-4.1%",
        maturity: "Fully Mature",
        valueProp:
            "Highest privacy; established prestige; stable capital value.",
        icon: Award,
    },
    {
        community: "Palm Jumeirah Garden Homes",
        status: "Completed (2006)",
        pricePerSqft: "AED 3,500-4,200",
        grossYield: "3.0-3.8%",
        maturity: "Fully Mature",
        valueProp:
            "Beach access premium; higher maintenance costs; similar stability.",
        icon: Home,
    },
    {
        community: "Jumeirah Golf Estates",
        status: "Completed (2015)",
        pricePerSqft: "AED 2,400-3,100",
        grossYield: "4.0-5.0%",
        maturity: "Mature",
        valueProp:
            "Newer stock; higher yields; slightly less privacy than Emirates Hills.",
        icon: Building2,
    },
    {
        community: "Arabian Ranches (Phase 1)",
        status: "Completed (2004)",
        pricePerSqft: "AED 1,600-2,100",
        grossYield: "5.0-6.0%",
        maturity: "Fully Mature",
        valueProp:
            "Lower entry price; higher yields; higher density; less exclusive.",
        icon: MapPin,
    },
];

const kpiData = [
    {
        label: "Capital Appreciation Since Handover",
        value: "~5.5 - 7.0%",
        context: "Outperforms Dubai villa avg (~4.5-5.5%)",
        icon: TrendingUp,
    },
    {
        label: "Current Rental Yield",
        value: "3.2 - 4.1%",
        context: "Below Dubai villa avg (5-6%)",
        icon: Percent,
    },
    {
        label: "Resale Velocity",
        value: "60 - 90 days",
        context: "Slower than high-density (30-45 days)",
        icon: Clock,
    },
    {
        label: "Price Stability During Corrections",
        value: "High",
        context: "Resilient: 2009, 2015, 2020 downturns",
        icon: Award,
    },
    {
        label: "Community Maturity",
        value: "100%",
        context: "All amenities, landscaping & infrastructure operational",
        icon: CheckCircle,
    },
];

const strategyRecommendations = [
    {
        title: "Families & End-users",
        icon: Users,
        content:
            "Prioritise turnkey, ready homes; focus on plot, orientation and school catchments. Negotiate on cosmetic items and secure a 3–5 year holding horizon for best outcomes.",
    },
    {
        title: "Yield-Focused Investors",
        icon: DollarSign,
        content:
            "Consider nearby higher-yield communities if rental income is the primary objective. For Emirates Hills, target long-term capital appreciation and selective leasing strategies to improve yield.",
    },
    {
        title: "Long-Term Capital Holders",
        icon: TrendingUp,
        content:
            "Buy and hold strategy benefits from scarcity and low-density premium. Aim for high-quality maintenance and tenant selection to preserve value over multi-year horizons.",
    },
    {
        title: "Short-Term Flippers",
        icon: Clock,
        content:
            "Not recommended: high entry price and slower resale velocity compress margins. If pursuing flips, focus on exceptionally well-priced lots and strong local demand windows.",
    },
];

function SuitabilityBadge({ type, label, isDark }) {
    const map = {
        high: {
            bg: isDark ? "rgba(39,174,96,0.15)" : "bg-emerald-50",
            text: isDark ? "text-emerald-400" : "text-emerald-600",
        },
        moderate: {
            bg: isDark ? "rgba(182,138,53,0.12)" : "bg-[#FDF8F0]",
            text: "text-[#B68A35]",
        },
        low: {
            bg: isDark ? "rgba(182,138,53,0.12)" : "bg-[#FDF8F0]",
            text: "text-[#B68A35]",
        },
    };

    const cfg = map[type] || map.high;
    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold justify-self-start w-max`}
            style={{ background: cfg.bg, color: cfg.text }}
        >
            {label}
        </span>
    );
}

function LeftIndicator({ profile, type, isDark }) {
    const base = "w-8 h-8 rounded-full flex items-center justify-center shrink-0";
    
    if (profile === "Families Seeking Ready Homes" || profile === "Capital Preservation Investors") {
        return (
            <div className={`${base}`} style={{ background: isDark ? 'rgba(39,174,96,0.15)' : '#E8F5E9', border: `1px solid ${isDark ? 'rgba(39,174,96,0.3)' : '#C8E6C9'}` }}>
                <Check className="w-4 h-4 text-green-500" />
            </div>
        );
    }

    if (profile === "Downsizers / Retirees") {
        return (
            <div className={`${base}`} style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${isDark ? 'rgba(182,138,53,0.2)' : '#FCEFD9'}` }}>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#B68A35]" />
            </div>
        );
    }

    return (
        <div className={`${base}`} style={{ background: isDark ? 'rgba(239,68,68,0.1)' : '#FFFFFF', border: `1px solid ${isDark ? 'rgba(239,68,68,0.3)' : '#FDE8E8'}` }}>
            <XCircle className="w-4 h-4 text-rose-500" />
        </div>
    );
}

function SourceNote({ text, isDark, bodyColor, cardBorder, subtextColor }) {
    return (
        <div className="flex gap-3 items-start mt-4 p-2 sm:p-4 rounded-2xl" 
            style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#fbf7f1', border: `1px solid ${cardBorder}` }}>
            <FileText className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed" style={{ color: subtextColor }}>{text}</p>
        </div>
    );
}

function InsightBox({ icon: Icon, title, children, isDark, cardBorder }) {
    return (
        <div className="flex gap-3 items-start pb-4 border-b rounded-2xl" 
            style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6', borderColor: cardBorder }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" 
                style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
                <Icon className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
                    {title}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#4A4A4A' }}>{children}</p>
            </div>
        </div>
    );
}

function AccordionItem({ title, icon: Icon, content, isOpen, onToggle, isDark, cardBorder, bodyColor }) {
    return (
        <div className="rounded-xl overflow-hidden" 
            style={{ border: `1px solid ${cardBorder}`, background: isDark ? '#2a2d31' : '#FFFFFF' }}>
            <button
                type="button"
                onClick={onToggle}
                className={`w-full flex gap-3 items-center p-4 text-left transition-colors ${
                    isOpen ? (isDark ? 'bg-[#2a2d31]' : 'bg-[#FAF9F6]') : (isDark ? 'bg-[#2a2d31]' : 'bg-white')
                }`}
            >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" 
                    style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
                    <Icon className="w-4 h-4 text-[#B68A35]" />
                </div>
                <span className="font-semibold text-sm sm:text-[15px] flex-1" 
                    style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
                    {title}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
                )}
            </button>
            {isOpen && (
                <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6' }}>
                    <p className="text-sm leading-relaxed pl-12" style={{ color: bodyColor }}>
                        {content}
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function WhosBuyingTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
    return (
        <div className="px-4 sm:px-5 pt-5">
            <div className="pb-3 flex gap-2">
                <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0" 
                    style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                    <PiUsersBold className="text-[#B68A35] text-xl sm:text-2xl" />
                </div>
                <div>
                    <h3 className="text-md sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        Current Buyer Suitability — <span className="text-[#B68A35]">Who Is Buying Now?</span>
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                        Unlike off-plan projects where buyer profiles are speculative,
                        Emirates Hills has a verified resale buyer demographic based on
                        actual transaction data from the last 24 months. The community now
                        primarily attracts:
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="space-y-3 lg:col-span-8">
                    {buyerProfiles.map((item) => (
                        <div
                            key={item.profile}
                            className="flex flex-row items-start gap-3 p-0 sm:p-4 rounded-lg"
                            style={{ background: cardBg, borderBottom: `1px solid ${cardBorder}` }}
                        >
                            <div className="shrink-0 mt-0.5">
                                <LeftIndicator profile={item.profile} type={item.suitabilityType} isDark={isDark} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm sm:text-[15px] leading-snug" style={{ color: isDark ? t.text : '#1F2937' }}>
                                    {item.profile}
                                </p>
                                <p className="text-xs sm:text-sm mt-1.5 leading-relaxed" style={{ color: bodyColor }}>
                                    {item.rationale}
                                </p>
                            </div>
                            <div className="shrink-0 flex-none">
                                <SuitabilityBadge type={item.suitabilityType} label={item.suitability} isDark={isDark} />
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="lg:col-span-4 cursor-pointer">
                    <div className="p-4 rounded-xl" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <InsightBox icon={Lightbulb} title="Market Insight" isDark={isDark} cardBorder={cardBorder}>
                            Transaction data indicates approximately 65% of recent buyers are
                            end-users (families and business owners), while 35% are long-term
                            investors holding for 5+ years. This ratio contributes to community
                            stability, reducing tenant turnover and preserving neighbourhood
                            aesthetics.
                        </InsightBox>

                        <div className="space-y-3 my-6">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold w-28" style={{ color: subtextColor }}>End-users</span>
                                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
                                    <div className="h-full w-[65%] bg-[#B68A35] rounded-full" />
                                </div>
                                <span className="text-xs font-bold text-[#B68A35] ml-3">65%</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold w-28" style={{ color: subtextColor }}>Investors</span>
                                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
                                    <div className="h-full w-[35%] bg-emerald-500 rounded-full" />
                                </div>
                                <span className="text-xs font-bold text-emerald-500 ml-3">35%</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function ComparativeAnalysisTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <TrendingUp className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                            Comparative Value Analysis —{" "}
                            <span className="text-[#B68A35]">Completed Luxury Communities</span>
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                            To assess Emirates Hills' current market positioning, we compare it
                            against three other completed, gated villa communities in Dubai's
                            premium corridor. Data reflects Q1 2026 market averages.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start px-1 sm:px-2">
                {/* Desktop Table */}
                <div className="hidden lg:block lg:col-span-9">
                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <div className="grid grid-cols-6 gap-4 px-6 py-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Community</p>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Status</p>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Avg. Price per Sqft</p>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Avg. Gross Yield</p>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Community Maturity</p>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Value Proposition</p>
                        </div>
                        {comparativeData.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.community}
                                    className="grid grid-cols-6 gap-4 items-center px-6 py-5 transition-colors last:border-b-0"
                                    style={{ borderBottom: `1px solid ${cardBorder}` }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-6 h-6 text-[#B68A35] shrink-0" />
                                        <span className="font-semibold text-sm" style={{ color: isDark ? t.text : '#1F2937' }}>
                                            {item.community}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check className="w-6 h-6 text-green-500 shrink-0 rounded-full p-0.5" />
                                        <span className="text-xs" style={{ color: bodyColor }}>{item.status}</span>
                                    </div>
                                    <span className="text-sm font-bold text-[#B68A35]">{item.pricePerSqft}</span>
                                    <span className="text-sm font-medium" style={{ color: bodyColor }}>{item.grossYield}</span>
                                    <div>
                                        <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full" 
                                            style={{ color: GOLD, background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>
                                            {item.maturity}
                                        </span>
                                    </div>
                                    <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>{item.valueProp}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-3">
                    {comparativeData.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.community}
                                className={`rounded-xl p-4 ${idx === 0 ? (isDark ? 'bg-[#2a2d31]' : 'bg-[#FAF9F6]') : (isDark ? 'bg-[#2a2d31]' : 'bg-white')}`}
                                style={{ border: `1px solid ${cardBorder}` }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Icon className="w-5 h-5 text-[#B68A35] shrink-0" />
                                    <span className="font-semibold text-base" style={{ color: isDark ? t.text : '#1F2937' }}>
                                        {item.community}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-xs" style={{ color: subtextColor }}>Price/Sqft</p>
                                        <p className="font-semibold text-[#B68A35]">{item.pricePerSqft}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: subtextColor }}>Gross Yield</p>
                                        <p className="font-semibold" style={{ color: bodyColor }}>{item.grossYield}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: subtextColor }}>Status</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                                            <span style={{ color: bodyColor }}>{item.status}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: subtextColor }}>Maturity</p>
                                        <span className="inline-block mt-0.5 text-xs font-semibold px-2 py-1 rounded-full" 
                                            style={{ color: GOLD, background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>
                                            {item.maturity}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                    <p className="text-xs" style={{ color: bodyColor }}>{item.valueProp}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <aside className="lg:col-span-3">
                    <div className="p-4 rounded-xl" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <InsightBox icon={Lightbulb} title="What the comparison indicates" isDark={isDark} cardBorder={cardBorder}>
                            Emirates Hills commands a price premium of approximately 25-30% over
                            Jumeirah Golf Estates and 80-100% over Arabian Ranches per square foot.
                            This premium is justified by lower density (larger plots), stricter
                            architectural control, and established prestige. However, investors
                            prioritizing rental yield over capital stability may find better value
                            in Jumeirah Golf Estates or Arabian Ranches, where yields exceed 5%.
                        </InsightBox>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function KpisTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <Award className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                            Long-Term Performance Verdict
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                            Emirates Hills performance vs. Dubai market context
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start px-2 sm:px-5">
                <div className="lg:col-span-8">
                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        {kpiData.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.label}
                                    className="grid grid-cols-12 gap-4 items-center px-2 sm:px-6 py-2 sm:py-5 transition-colors last:border-b-0"
                                    style={{ borderBottom: `1px solid ${cardBorder}` }}
                                >
                                    <div className="col-span-6 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" 
                                            style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
                                            <Icon className="w-4 h-4 text-[#B68A35]" />
                                        </div>
                                        <span className="font-semibold text-xs sm:text-sm" style={{ color: isDark ? t.text : '#1F2937' }}>
                                            {item.label}
                                        </span>
                                    </div>

                                    <div className="col-span-6 flex flex-col sm:flex-row items-end sm:items-center sm:justify-end sm:gap-4">
                                        <div className="text-xs sm:text-lg font-bold text-[#B68A35]">
                                            {item.value}
                                        </div>
                                        <div className="text-xs text-right" style={{ color: subtextColor }}>
                                            {item.context}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <aside className="lg:col-span-4">
                    <div className="rounded-xl overflow-hidden p-2 sm:p-5" 
                        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <div className="flex gap-3 items-start">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" 
                                style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
                                <Award className="w-5 h-5 text-[#B68A35]" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-2">
                                    Long-Term Performance Verdict
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
                                    Based on DLD transaction data aggregated via DXBInteract, Emirates Hills has delivered an estimated annualised appreciation of 5.5–7.0% since initial handover (2003–2008) to Q1 2026. This performance outpaces Dubai's overall villa market average (~4.5–5.5% annualised) over the same period, reflecting the asset's scarcity value and premium positioning.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 rounded-lg" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6' }}>
                            <div className="flex gap-3 items-start">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" 
                                    style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
                                    <Info className="w-4 h-4 text-[#B68A35]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-2">
                                        Important Note
                                    </p>
                                    <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
                                        Past performance does not guarantee future results. Future appreciation will depend on Dubai's overall economic growth, infrastructure developments in surrounding corridors (e.g., Al Khail Road upgrades), and maintenance of community standards.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-sm" style={{ color: bodyColor }}>
                            <p>
                                For end-users, the community is <span className="font-semibold text-[#B68A35]">fully mature</span>. All landscaping, amenities, and infrastructure are established. There is no uncertainty regarding delivery timelines, amenity completion, or neighbourhood character. Residents know exactly what they are buying—a stable, low-density enclave with verified security protocols and managed maintenance standards.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function StrategyTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>
                        <Lightbulb className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                            Strategic Recommendations by Buyer Type
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                            Actionable guidance tailored to your investment goals.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-4 sm:mx-5 space-y-3">
                {strategyRecommendations.map((item, idx) => (
                    <AccordionItem
                        key={item.title}
                        title={item.title}
                        icon={item.icon}
                        content={item.content}
                        isOpen={openIdx === idx}
                        onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                        isDark={isDark}
                        cardBorder={cardBorder}
                        bodyColor={bodyColor}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const TABS = [
    { key: "whosBuying", label: "Who's Buying", icon: Users },
    { key: "comparative", label: "Comparative Analysis", icon: TrendingUp },
    { key: "kpis", label: "KPIs", icon: Award },
    { key: "strategy", label: "Strategy", icon: Lightbulb },
];

function Section7() {
    const { t, isDark, dark } = useThemeStyles();
    const [activeTab, setActiveTab] = useState("whosBuying");

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FCFBFA";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    const renderTab = () => {
        if (activeTab === "whosBuying") return <WhosBuyingTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
        if (activeTab === "comparative") return <ComparativeAnalysisTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
        if (activeTab === "kpis") return <KpisTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
        return <StrategyTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    };

    return (
        <section className="w-full font-sans antialiased" style={{ background: sectionBg }}>
            {/* ── Header ── */}
            <div className="relative w-full h-80 lg:h-96 flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Home/Section3bg.webp"
                        alt="Emirates Hills luxury villas"
                        fill
                        className="object-cover object-center"
                        priority                    />
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} 
                        style={isDark ? dark?.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        Resale &amp; Investment Performance
                    </h2>
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        <span className="text-[#B68A35]">Emirates Hills</span> by Emaar
                    </h2>
                </div>
            </div>

            <div className="relative z-20 max-w-[1400px] mx-auto px-2 sm:px-6 pb-5 sm:pb-10 -mt-24 sm:-mt-28 lg:-mt-32">
                {/* ── Source Transparency ── */}
                <div className="mt-5 rounded-2xl shadow-sm p-4 sm:p-5 flex gap-3 items-start" 
                    style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" 
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#B68A35/10' }}>
                        <ShieldCheck className="w-5 h-5 text-[#B68A35]" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
                            Source Transparency
                        </p>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                            Performance data aggregated from Dubai Land Department (DLD)
                            transaction records via DXBInteract.com, covering the period from
                            first handover (2003) to Q1 2026. Comparative data reflects current
                            market values for completed villa communities in similar premium
                            corridors. All figures are estimates for informational purposes;
                            verify specific unit performance with a RERA-licensed broker before
                            transacting.
                        </p>
                    </div>
                </div>

                {/* ── Tabbed Panel ── */}
                <div className="rounded-xl shadow-sm mt-5" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                        <div className="flex w-full">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative ${
                                        activeTab === tab.key && !isDark ? 'text-[#B68A35] bg-[#FDF8F0]/50' : !isDark && activeTab !== tab.key ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50' : ''
                                    }`}
                                    style={
                                        isDark && activeTab === tab.key
                                            ? { color: GOLD, background: 'rgba(182,138,53,0.08)' }
                                            : isDark && activeTab !== tab.key
                                            ? { color: subtextColor, background: 'transparent' }
                                            : undefined
                                    }
                                >
                                    <span className="text-base lg:text-xl">
                                        <tab.icon />
                                    </span>
                                    <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.key ? "font-bold" : "font-medium"}`}>
                                        {tab.label}
                                    </span>

                                    {activeTab === tab.key && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab body */}
                    <div className="pb-5">{renderTab()}</div>
                </div>

                <SourceNote text="Source: DXBInteract.com transaction analysis, PropertyIntel market research, Q1 2026." 
                    isDark={isDark} bodyColor={bodyColor} cardBorder={cardBorder} subtextColor={subtextColor} />

                {/* ── Disclaimer ── */}
                <div className="mt-6 rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start" 
                    style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                    <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
                    <p className="text-xs lg:text-sm leading-relaxed" style={{ color: bodyColor }}>
                        All performance data is for educational and research purposes only.
                        PropertyIntel.ae does not provide financial, legal, or investment
                        advice. Market values, rental yields, and appreciation rates are
                        estimates based on aggregated third-party sources and are subject to
                        change. Verify all details with the Dubai Land Department, licensed
                        real estate brokers, and official developer channels before making
                        any commitment.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Section7;