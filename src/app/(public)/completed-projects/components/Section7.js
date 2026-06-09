"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const AccentIconColumn = ({ children, color = GOLD, lineClassName = "min-h-14 w-px flex-1 md:min-h-12" }) => (
    <div className="flex self-stretch shrink-0 flex-col items-center gap-2">
        <div className="shrink-0 text-[#B68A35]">
            {children}
        </div>
        <span className={lineClassName} style={{ background: color }} />
    </div>
);

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

function LeftIndicator({ profile, type, isDark, data }) {
    const base = "w-8 h-8 rounded-full flex items-center justify-center shrink-0";

    if (data?.highProfiles?.includes(profile)) {
        return (
            <div className={`${base}`} style={{ background: isDark ? 'rgba(39,174,96,0.15)' : '#E8F5E9', border: `1px solid ${isDark ? 'rgba(39,174,96,0.3)' : '#C8E6C9'}` }}>
                <Check className="w-4 h-4 text-green-500" />
            </div>
        );
    }

    if (data?.moderateProfiles?.includes(profile)) {
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
            <AccentIconColumn lineClassName="min-h-0 w-px flex-1">
                <FileText className="w-4 h-4 text-[#B68A35]" />
            </AccentIconColumn>
            <p className="text-[13px] md:leading-relaxed" style={{ color: subtextColor }}>{text}</p>
        </div>
    );
}

function InsightBox({ icon: Icon, title, children, isDark, cardBorder }) {
    return (
        <div className="flex gap-3 items-start pb-4 border-b rounded-2xl"
            style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6', borderColor: cardBorder }}>
            <AccentIconColumn>
                <Icon className="w-5 h-5 text-[#B68A35]" />
            </AccentIconColumn>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
                    {title}
                </p>
                <p className="text-[13px] md:leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#4A4A4A' }}>{children}</p>
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
                className={`w-full flex gap-3 items-center p-4 text-left transition-colors ${isOpen ? (isDark ? 'bg-[#2a2d31]' : 'bg-[#FAF9F6]') : (isDark ? 'bg-[#2a2d31]' : 'bg-white')
                    }`}
            >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: isDark ? 'rgba(182,138,53,0.15)' : 'rgba(182,138,53,0.10)' }}>
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
                    <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
                        {content}
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function WhosBuyingTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
    return (
        <div className="px-4 sm:px-5 pt-5">
            <div className="pb-3 flex gap-2">
                <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD_BORDER}` }}>
                    <PiUsersBold className="text-[#B68A35] text-xl sm:text-2xl" />
                </div>
                <div>
                    <h3 className="text-md sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        {data?.header?.title || "Current Buyer Suitability — "}
                        <span className="text-[#B68A35]">{data?.header?.highlight || "Who Is Buying Now?"}</span>
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                        {data?.header?.description || ""}
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="space-y-3 lg:col-span-8">
                    {data?.profiles?.map((item) => (
                        <div
                            key={item.profile}
                            className="flex flex-row items-start gap-3 p-0 sm:p-4 rounded-lg"
                            style={{ background: cardBg, borderBottom: `1px solid ${cardBorder}` }}
                        >
                            <div className="shrink-0 mt-0.5">
                                <LeftIndicator profile={item.profile} type={item.suitabilityType} isDark={isDark} data={data} />
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
                        <InsightBox icon={Lightbulb} title={data?.insight?.title || "Market Insight"} isDark={isDark} cardBorder={cardBorder}>
                            {data?.insight?.content || ""}
                        </InsightBox>

                        <div className="space-y-3 my-6">
                            {data?.buyerRatios?.map((ratio, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <span className="text-xs font-semibold w-28" style={{ color: subtextColor }}>{ratio.label}</span>
                                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
                                        <div className={`h-full rounded-full`}
                                            style={{ width: `${ratio.percentage}%`, background: ratio.color === 'gold' ? GOLD : '#10B981' }} />
                                    </div>
                                    <span className="text-xs font-bold ml-3" style={{ color: ratio.color === 'gold' ? GOLD : '#10B981' }}>{ratio.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function ComparativeAnalysisTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD_BORDER}` }}>
                        <TrendingUp className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                            {data?.header?.title || "Comparative Value Analysis — "}
                            <span className="text-[#B68A35]">{data?.header?.highlight || "Completed Luxury Communities"}</span>
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                            {data?.header?.description || ""}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start px-1 sm:px-2">
                <div className="hidden lg:block lg:col-span-9">
                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <div className="grid grid-cols-6 gap-4 px-6 py-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                            {data?.tableHeaders?.map((header, idx) => (
                                <p key={idx} className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>{header}</p>
                            ))}
                        </div>
                        {data?.communities?.map((item) => {
                            const Icon = getComparisonIcon(item.iconName);
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

                <div className="lg:hidden space-y-3">
                    {data?.communities?.map((item, idx) => {
                        const Icon = getComparisonIcon(item.iconName);
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
                        <InsightBox icon={Lightbulb} title={data?.insight?.title || "What the comparison indicates"} isDark={isDark} cardBorder={cardBorder}>
                            {data?.insight?.content || ""}
                        </InsightBox>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function KpisTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD_BORDER}` }}>
                        <Award className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                            {data?.header?.title || "Long-Term Performance Verdict"}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                            {data?.header?.description || ""}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start px-2 sm:px-5">
                <div className="lg:col-span-8">
                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        {data?.kpis?.map((item) => {
                            const Icon = getKpiIcon(item.iconName);
                            return (
                                <div
                                    key={item.label}
                                    className="grid grid-cols-12 gap-4 items-center px-2 sm:px-6 py-2 sm:py-5 transition-colors last:border-b-0"
                                    style={{ borderBottom: `1px solid ${cardBorder}` }}
                                >
                                    <div className="col-span-6 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                            style={{ background: isDark ? 'rgba(182,138,53,0.15)' : 'rgba(182,138,53,0.10)' }}>
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
                            <AccentIconColumn>
                                <Award className="w-5 h-5 text-[#B68A35]" />
                            </AccentIconColumn>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-2">
                                    {data?.verdict?.title || "Long-Term Performance Verdict"}
                                </p>
                                <p className="text-[13px] md:leading-relaxed" style={{ color: bodyColor }}>
                                    {data?.verdict?.content || ""}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 rounded-lg" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#FAF9F6' }}>
                            <div className="flex gap-3 items-start">
                                <AccentIconColumn>
                                    <Info className="w-4 h-4 text-[#B68A35]" />
                                </AccentIconColumn>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-2">
                                        {data?.importantNote?.title || "Important Note"}
                                    </p>
                                    <p className="text-[13px] md:leading-relaxed" style={{ color: bodyColor }}>
                                        {data?.importantNote?.content || ""}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-sm" style={{ color: bodyColor }}>
                            <p>
                                {data?.endUserNote || ""}
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function StrategyTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <div>
            <div className="px-4 sm:px-5 pt-5">
                <div className="pb-3 flex gap-2">
                    <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD_BORDER}` }}>
                        <Lightbulb className="text-[#B68A35] text-xl sm:text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-md sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                            {data?.header?.title || "Strategic Recommendations by Buyer Type"}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
                            {data?.header?.description || ""}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-4 sm:mx-5 space-y-3">
                {data?.recommendations?.map((item, idx) => (
                    <AccordionItem
                        key={item.title}
                        title={item.title}
                        icon={getStrategyIcon(item.iconName)}
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

// ─── HELPER FUNCTIONS FOR ICONS ─────────────────────────────────────────────

const getComparisonIcon = (iconName) => {
    const icons = {
        'Award': Award,
        'Home': Home,
        'Building2': Building2,
        'MapPin': MapPin
    };
    return icons[iconName] || Award;
};

const getKpiIcon = (iconName) => {
    const icons = {
        'TrendingUp': TrendingUp,
        'Percent': Percent,
        'Clock': Clock,
        'Award': Award,
        'CheckCircle': CheckCircle
    };
    return icons[iconName] || TrendingUp;
};

const getStrategyIcon = (iconName) => {
    const icons = {
        'Users': Users,
        'DollarSign': DollarSign,
        'TrendingUp': TrendingUp,
        'Clock': Clock
    };
    return icons[iconName] || Users;
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const TABS = [
    { key: "whosBuying", label: "Who's Buying", icon: Users },
    { key: "comparative", label: "Comparative Analysis", icon: TrendingUp },
    { key: "kpis", label: "KPIs", icon: Award },
    { key: "strategy", label: "Strategy", icon: Lightbulb },
];

function Section7({ data }) {
    const { t, isDark, dark } = useThemeStyles();
    const [activeTab, setActiveTab] = useState("whosBuying");

    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FCFBFA";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    if (!data) {
        return (
            <section className="w-full font-sans" style={{ background: sectionBg }}>
                <div className="max-w-[1400px] mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
                </div>
            </section>
        );
    }

    const renderTab = () => {
        if (activeTab === "whosBuying") return <WhosBuyingTab data={data.whosBuying} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
        if (activeTab === "comparative") return <ComparativeAnalysisTab data={data.comparativeAnalysis} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
        if (activeTab === "kpis") return <KpisTab data={data.kpis} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
        return <StrategyTab data={data.strategy} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    };

    return (
        <section className="w-full font-sans antialiased" style={{ background: sectionBg }}>
            <div className="md:hidden max-w-350 mx-auto px-1">
                <div
                    className="relative min-h-[285px] overflow-hidden border rounded-none"
                    style={{
                        borderColor: cardBorder,
                        background: isDark ? t.cardBg : "#fffdfa",
                    }}
                >
                    <Image
                        src={"/projects/cm-projects.webp"}
                        alt={"Emirates Hills luxury villas"}
                        fill
                        className="object-cover object-center"
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
                            className="text-[32px] font-semibold leading-[1.08] tracking-[-0.01em]"
                            style={{ color: isDark ? t.text : '#1A1A1A' }}
                        >
                            {data.headings?.line1 || "Resale & Investment Performance"}
                            <span className="block">
                                <span className="text-[#B68A35]">{data.headings?.highlight || "Emirates Hills"}</span> {data.headings?.line2 || "by Emaar"}
                            </span>
                        </h2>
                        <span className="mt-5 block h-px w-20 bg-[#B68A35]" />
                    </div>
                </div>
            </div>

            <div className="hidden md:flex relative w-full h-80 lg:h-96 items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.heroImage || "/Home/Section3bg.webp"}
                        alt={data.heroAlt || "Emirates Hills luxury villas"}
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`}
                        style={isDark ? dark?.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        {data.headings?.line1 || "Resale & Investment Performance"}
                    </h2>
                    <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        <span className="text-[#B68A35]">{data.headings?.highlight || "Emirates Hills"}</span> {data.headings?.line2 || "by Emaar"}
                    </h2>
                </div>
            </div>

            <div className="relative z-20 max-w-[1400px] mx-auto px-2 sm:px-6 pb-5 sm:pb-10 -mt-24 sm:-mt-28 lg:-mt-32">
                <div className="mt-5 rounded-2xl shadow-sm p-4 sm:p-5 flex gap-3 items-start"
                    style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    <AccentIconColumn>
                        <ShieldCheck className="w-5 h-5 text-[#B68A35]" />
                    </AccentIconColumn>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
                            {data.sourceTransparency?.title || "Source Transparency"}
                        </p>
                        <p className="text-[13px] md:leading-relaxed" style={{ color: bodyColor }}>
                            {data.sourceTransparency?.content || ""}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl shadow-sm mt-5" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                        <div className="flex w-full">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative ${activeTab === tab.key && !isDark ? 'text-[#B68A35] bg-[#FDF8F0]/50' : !isDark && activeTab !== tab.key ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50' : ''
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

                    <div className="pb-5">{renderTab()}</div>
                </div>

                <SourceNote text={data.sourceNote || "Source: DXBInteract.com transaction analysis, PropertyIntel market research, Q1 2026."}
                    isDark={isDark} bodyColor={bodyColor} cardBorder={cardBorder} subtextColor={subtextColor} />

                <div className="mt-6 rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start"
                    style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
                    <AccentIconColumn>
                        <LuInfo className="text-[#B68A35] text-2xl" />
                    </AccentIconColumn>
                    <p className="text-[13px] md:leading-relaxed" style={{ color: bodyColor }}>
                        {data.footerDisclaimer || ""}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Section7;