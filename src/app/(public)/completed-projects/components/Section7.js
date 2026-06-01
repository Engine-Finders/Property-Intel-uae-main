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

function SuitabilityBadge({ type, label }) {
    const map = {
        high: {
            bg: "bg-emerald-50",
            text: "text-emerald-600",
        },
        moderate: {
            bg: "bg-[#FDF8F0]",
            text: "text-[#B68A35]",
        },
        low: {
            bg: "bg-[#FDF8F0]",
            text: "text-[#B68A35]",
        },
    };

    const cfg = map[type] || map.high;
    return (
        <span
            className={`${cfg.bg} inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${cfg.text} text-xs font-semibold justify-self-start w-max`}
        >
            {cfg.icon}
            {label}
        </span>
    );
}

function LeftIndicator({ profile, type }) {
    const base = "w-8 h-8 rounded-full flex items-center justify-center shrink-0";
    if (profile === "Families Seeking Ready Homes" || profile === "Capital Preservation Investors") {
        return (
            <div className={`${base} bg-emerald-50 border border-emerald-100`}>
                <Check className="w-4 h-4 text-green-600" />
            </div>
        );
    }

    if (profile === "Downsizers / Retirees") {
        return (
            <div className={`${base} bg-[#FDF8F0] border border-[#FCEFD9]`}>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#B68A35]" />
            </div>
        );
    }

    if (profile === "High-Yield Seekers") {
        return (
            <div className={`${base} bg-white border border-[#FDE8E8]`}>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
        );
    }

    if (profile === "Short-Term Flippers") {
        return (
            <div className={`${base} bg-white border border-[#FDE8E8]`}>
                <XCircle className="w-4 h-4 text-rose-600" />
            </div>
        );
    }

    // fallback based on suitability type
    if (type === "high") {
        return (
            <div className={`${base} bg-emerald-50 border border-emerald-100`}>
                <Check className="w-4 h-4 text-emerald-600" />
            </div>
        );
    }

    if (type === "moderate") {
        return (
            <div className={`${base} bg-[#FDF8F0] border border-[#FCEFD9]`}>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#B68A35]" />
            </div>
        );
    }

    return (
        <div className={`${base} bg-white border border-[#FDE8E8]`}>
            <XCircle className="w-4 h-4 text-rose-600" />
        </div>
    );
}

function SourceNote({ text }) {
    return (
        <div className="flex gap-3 items-start mt-4 p-2 sm:p-4 bg-[#fbf7f1] rounded-2xl">
            <FileText className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
        </div>
    );
}

function InsightBox({ icon: Icon, title, children }) {
    return (
        <div className=" bg-[#FAF9F6] flex gap-3 items-start pb-4 border-b border-gray-200 rounded-2xl">
            <div className="w-9 h-9 rounded-lg bg-[#B68A35]/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
                    {title}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{children}</p>
            </div>
        </div>
    );
}

function AccordionItem({ title, icon: Icon, content, isOpen, onToggle }) {
    return (
        <div className="border border-[#F2EEE8] rounded-xl overflow-hidden bg-white">
            <button
                type="button"
                onClick={onToggle}
                className={`w-full flex gap-3 items-center p-4 text-left transition-colors ${isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
                    }`}
            >
                <div className="w-9 h-9 rounded-lg bg-[#B68A35]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#B68A35]" />
                </div>
                <span className="font-semibold text-sm sm:text-[15px] text-slate-800 flex-1">
                    {title}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
                )}
            </button>
            {isOpen && (
                <div className="px-4 pb-4 bg-[#FAF9F6]">
                    <p className="text-sm text-slate-600 leading-relaxed pl-12">
                        {content}
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function WhosBuyingTab() {
    return (
        <div className="px-4 sm:px-5 pt-5">
            <div className=" pb-3 flex gap-2">
                <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0">
                    <PiUsersBold className="text-[#B68A35] text-xl sm:text-2xl" />
                </div>
                <div>
                    <h3 className="text-md sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
                        Current Buyer Suitability — <span className="text-[#B68A35]">Who Is Buying Now?</span>
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
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
                            className="flex flex-row items-start gap-3 p-0 sm:p-4 border-b border-[#F2EEE8] bg-white rounded-lg"
                        >
                            <div className="shrink-0 mt-0.5">
                                <LeftIndicator profile={item.profile} type={item.suitabilityType} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm sm:text-[15px] text-slate-800 leading-snug">
                                    {item.profile}
                                </p>
                                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                                    {item.rationale}
                                </p>
                            </div>
                            <div className="shrink-0 flex-none">
                                <SuitabilityBadge type={item.suitabilityType} label={item.suitability} />
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="lg:col-span-4 cursor-pointer">
                    <div className="p-4 rounded-xl border border-[#F2EEE8] bg-[#FAF9F6]">
                        <InsightBox icon={Lightbulb} title="Market Insight">
                            Transaction data indicates approximately 65% of recent buyers are
                            end-users (families and business owners), while 35% are long-term
                            investors holding for 5+ years. This ratio contributes to community
                            stability, reducing tenant turnover and preserving neighbourhood
                            aesthetics.
                        </InsightBox>

                        <div className="space-y-3 my-6">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-slate-600 w-28">End-users</span>
                                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-[#B68A35] rounded-full" />
                                </div>
                                <span className="text-xs font-bold text-[#B68A35] ml-3">65%</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-slate-600 w-28">Investors</span>
                                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                                    <div className="h-full w-[35%] bg-emerald-500 rounded-full" />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 ml-3">35%</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function ComparativeAnalysisTab() {
    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0">
                        <TrendingUp className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
                            Comparative Value Analysis —{" "}
                            <span className="text-[#B68A35]">Completed Luxury Communities</span>
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
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
                    <div className="rounded-xl border border-[#F2EEE8] bg-white overflow-hidden">
                        <div className="grid grid-cols-6 gap-4 bg-white border-b border-[#F2EEE8] px-6 py-4">
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Community
                            </p>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Status
                            </p>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Avg. Price per Sqft
                            </p>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Avg. Gross Yield
                            </p>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Community Maturity
                            </p>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Value Proposition
                            </p>
                        </div>
                        {comparativeData.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.community}
                                    className="grid grid-cols-6 gap-4 items-center px-6 py-5 border-b border-[#F2EEE8] hover:bg-[#FCFAF5] transition-colors last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-6 h-6 text-[#B68A35] shrink-0" />
                                        <span className="font-semibold text-sm text-slate-800">
                                            {item.community}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check className="w-6 h-6 text-green-600 bg-green-600/20 shrink-0 rounded-full p-0.5" />
                                        <span className="text-xs text-slate-700">{item.status}</span>
                                    </div>
                                    <span className="text-sm font-bold text-[#B68A35]">
                                        {item.pricePerSqft}
                                    </span>
                                    <span className="text-sm text-slate-700 font-medium">{item.grossYield}</span>
                                    <div>
                                        <span className="inline-block text-xs font-semibold text-[#B68A35] bg-[#FDF8F0] px-3 py-1.5 rounded-full">
                                            {item.maturity}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed">{item.valueProp}</p>
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
                                className={`rounded-xl border border-[#F2EEE8] p-4 ${idx === 0 ? "bg-[#FAF9F6]" : "bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Icon className="w-5 h-5 text-[#B68A35] shrink-0" />
                                    <span className="font-semibold text-base text-slate-800">
                                        {item.community}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-xs text-slate-500">Price/Sqft</p>
                                        <p className="font-semibold text-[#B68A35]">{item.pricePerSqft}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Gross Yield</p>
                                        <p className="font-semibold text-slate-700">{item.grossYield}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Status</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-slate-700">{item.status}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Maturity</p>
                                        <span className="inline-block mt-0.5 text-xs font-semibold text-[#B68A35] bg-[#FDF8F0] px-2 py-1 rounded-full">
                                            {item.maturity}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#F2EEE8]">
                                    <p className="text-xs text-slate-600">{item.valueProp}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sidebar with InsightBox */}
                <aside className="lg:col-span-3">
                    <div className="p-4 rounded-xl border border-[#F2EEE8] bg-[#FAF9F6]">
                        <InsightBox icon={Lightbulb} title="What the comparison indicates">
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

function KpisTab() {
    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0">
                        <Award className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
                            Long-Term Performance Verdict
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Emirates Hills performance vs. Dubai market context
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start px-2 sm:px-5">
                {/* KPI list (left) */}
                <div className="lg:col-span-8">
                    <div className="rounded-xl border border-[#F2EEE8] bg-white overflow-hidden">
                        <div>
                            {kpiData.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.label}
                                        className="grid grid-cols-12 gap-4 items-center px-2 sm:px-6 py-2 sm:py-5 border-b border-[#F2EEE8] hover:bg-[#FCFAF5] transition-colors last:border-b-0"
                                    >
                                        <div className="col-span-6 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#B68A35]/10 flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 text-[#B68A35]" />
                                            </div>
                                            <span className="font-semibold text-xs sm:text-sm text-slate-800">
                                                {item.label}
                                            </span>
                                        </div>

                                        <div className="col-span-6 flex flex-col sm:flex-row items-end sm:items-center sm:justify-end sm:gap-4">
                                            <div className="text-xs sm:text-lg font-bold text-[#B68A35]">
                                                {item.value}
                                            </div>
                                            <div className="text-xs text-slate-500 text-right">
                                                {item.context}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right sidebar with verdict + important note */}
                <aside className="lg:col-span-4">
                    <div className="rounded-xl border border-[#F2EEE8] bg-white overflow-hidden p-2 sm:p-5">
                        <div className="flex gap-3 items-start">
                            <div className="w-9 h-9 rounded-lg bg-[#B68A35]/10 flex items-center justify-center shrink-0">
                                <Award className="w-5 h-5 text-[#B68A35]" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-2">
                                    Long-Term Performance Verdict
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Based on DLD transaction data aggregated via DXBInteract, Emirates Hills has delivered an estimated annualised appreciation of 5.5–7.0% since initial handover (2003–2008) to Q1 2026. This performance outpaces Dubai's overall villa market average (~4.5–5.5% annualised) over the same period, reflecting the asset's scarcity value and premium positioning.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 rounded-lg border border-[#F2EEE8] bg-[#FAF9F6]">
                            <div className="flex gap-3 items-start">
                                <div className="w-8 h-8 rounded-lg bg-[#B68A35]/10 flex items-center justify-center shrink-0">
                                    <Info className="w-4 h-4 text-[#B68A35]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-2">
                                        Important Note
                                    </p>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Past performance does not guarantee future results. Future appreciation will depend on Dubai's overall economic growth, infrastructure developments in surrounding corridors (e.g., Al Khail Road upgrades), and maintenance of community standards.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-slate-600">
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

function StrategyTab() {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full bg-[#FDF8F0] border border-[#B68A35]/10 flex items-center justify-center shrink-0">
                        <Lightbulb className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
                            Strategic Recommendations by Buyer Type
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
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
    const [activeTab, setActiveTab] = useState("whosBuying");

    const renderTab = () => {
        if (activeTab === "whosBuying") return <WhosBuyingTab />;
        if (activeTab === "comparative") return <ComparativeAnalysisTab />;
        if (activeTab === "kpis") return <KpisTab />;
        return <StrategyTab />;
    };

    return (
        <section className="w-full bg-[#FCFBFA] font-sans antialiased">
            {/* ── Header ── */}
            <div className="relative w-full h-80 lg:h-96 flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Home/Section3bg.webp"
                        alt="Emirates Hills luxury villas"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
                </div>

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-0.5">
                        Resale &amp; Investment Performance
                    </h2>
                    <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-0.5">
                        <span className="text-[#B68A35]">Emirates Hills</span> by Emaar
                    </h2>
                </div>
            </div>

            <div className="relative z-20 max-w-[1400px] mx-auto px-2 sm:px-6 pb-5 sm:pb-10 -mt-24 sm:-mt-28 lg:-mt-32">
                {/* ── Source Transparency ── */}
                <div className="mt-5 rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white p-4 sm:p-5 flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-lg bg-[#B68A35]/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-[#B68A35]" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
                            Source Transparency
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
                <div className="bg-white rounded-xl border border-[#F3EFE9] overflow-hidden shadow-sm mt-5">
                    <div className="flex border-b border-[#F3EFE9]">
                        <div className="flex w-full">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative ${activeTab === tab.key
                                        ? "text-[#B68A35] bg-[#FDF8F0]/50"
                                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="text-base lg:text-xl">
                                        <tab.icon />
                                    </span>
                                    <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.key ? "font-bold" : "font-medium"
                                        }`}>
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

                <SourceNote text="Source: DXBInteract.com transaction analysis, PropertyIntel market research, Q1 2026." />

                {/* ── Disclaimer ── */}
                <div className="mt-6 bg-[#FBF9F6] border border-[#F3EFE9] rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
                    <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
                    <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
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