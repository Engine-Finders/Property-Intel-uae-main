'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
    Home,
    Clock,
    Star,
    Users,
    TrendingUp,
    Check,
    AlertTriangle,
    X,
    ChevronDown,
    ChevronUp,
    Building,
    DollarSign,
    ShieldAlert,
    ShieldCheck,
    User,
    MapPin,
    Info,
    ExternalLink,
} from 'lucide-react';
import ExpertSection from './ExpertSection';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

function toneStyles(tone, isDark) {
    switch (tone) {
        case 'green':
            return {
                badge: isDark ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
                iconBg: isDark ? 'bg-emerald-900/20' : 'bg-emerald-50',
                icon: 'text-emerald-500',
                dot: 'bg-emerald-500',
                card: isDark ? 'bg-emerald-900/10 border-emerald-800' : 'bg-emerald-50/40 border-emerald-100',
            };
        case 'amber':
            return {
                badge: isDark ? 'bg-amber-900/30 text-amber-400 border-amber-800' : 'bg-amber-50 text-amber-700 border-amber-200',
                iconBg: isDark ? 'bg-amber-900/20' : 'bg-amber-50',
                icon: 'text-amber-500',
                dot: 'bg-amber-500',
                card: isDark ? 'bg-amber-900/10 border-amber-800' : 'bg-amber-50/40 border-amber-100',
            };
        default:
            return {
                badge: isDark ? 'bg-red-900/30 text-red-400 border-red-800' : 'bg-red-50 text-red-700 border-red-200',
                iconBg: isDark ? 'bg-red-900/20' : 'bg-red-50',
                icon: 'text-red-500',
                dot: 'bg-red-500',
                card: isDark ? 'bg-red-900/10 border-red-800' : 'bg-red-50/40 border-red-100',
            };
    }
}

export default function RiskAnalysisDashboard({ data }) {
    const { t, isDark, dark } = useThemeStyles();
    const [activeTab, setActiveTab] = useState('best');
    const [isOpenKnownIssues, setIsOpenKnownIssues] = useState(false);
    const [isOpenStrategies, setIsOpenStrategies] = useState(false);
    const [isOpenAnalyst, setIsOpenAnalyst] = useState(false);
    const [openRisks, setOpenRisks] = useState({});

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FFFFFF";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    if (!data) {
        return (
            <section className="w-full font-sans antialiased" style={{ background: sectionBg }}>
                <div className="max-w-350 mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
                </div>
            </section>
        );
    }

    const risks = data.risks || [];
    const suitabilityTabs = data.suitabilityTabs || {};
    const knownIssues = data.knownIssues || [];
    const mitigationSteps = data.mitigationSteps || [];

    function toggleRisk(title) {
        setOpenRisks((prev) => ({ ...prev, [title]: !prev[title] }));
    }

    const activeSuitability = suitabilityTabs[activeTab];

    return (
        <section className="w-full font-sans antialiased" style={{ background: sectionBg }}>
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
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} style={isDark ? dark?.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        {data.header?.title?.line1 || "Emaar Risk Assessment"}
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        {data.header?.title?.line2 || "What Buyers Should Know"}
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
                        {data.header?.description || "An honest evaluation of potential risks when buying from Emaar, and guidance on whether their projects suit your investment or lifestyle profile."}
                    </p>
                </div>
            </div>

            <div className="max-w-350 mx-auto px-2 sm:px-4 lg:px-2 -mt-12 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6 mb-2 sm:mb-6">
                    {/* Risk Radar Card */}
                    <div className="rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <div className="p-5 sm:p-6" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B68A35] mb-1">
                                {data.riskRadar?.label || "Risk radar"}
                            </p>
                            <h3 className="text-xl lg:text-2xl font-serif" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                {data.riskRadar?.title || "Three key risk dimensions"}
                            </h3>
                        </div>

                        <div className="p-2 sm:p-6">
                            <div style={{ border: `1px solid ${cardBorder}` }} className="sm:border rounded-xl">
                                {risks.map((risk) => {
                                    const Icon = getRiskIcon(risk.iconName);
                                    const colors = toneStyles(risk.color, isDark);

                                    return (
                                        <div
                                            key={risk.title}
                                            role="button"
                                            tabIndex={0}
                                            aria-expanded={!!openRisks[risk.title]}
                                            onClick={() => toggleRisk(risk.title)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    toggleRisk(risk.title);
                                                }
                                            }}
                                            className={`rounded-xl p-2 sm:p-4 transition-all cursor-pointer`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3 min-w-0">
                                                    <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center shrink-0`}>
                                                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-semibold text-sm lg:text-[15px] leading-tight" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                            {risk.title}
                                                        </h4>
                                                        <p className="text-xs mt-1 leading-relaxed" style={{ color: bodyColor }}>
                                                            {risk.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${colors.badge}`}>
                                                        {risk.level}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        aria-expanded={!!openRisks[risk.title]}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleRisk(risk.title);
                                                        }}
                                                        className="p-1 rounded-md hover:bg-gray-100"
                                                    >
                                                        {openRisks[risk.title] ? <ChevronUp className="w-4 h-4" style={{ color: subtextColor }} /> : <ChevronDown className="w-4 h-4" style={{ color: subtextColor }} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center gap-3 hidden sm:flex">
                                                <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: subtextColor }}>Risk</span>
                                                <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', border: `1px solid ${cardBorder}` }}>
                                                    <div className={`h-full rounded-full ${risk.color === 'green' ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-500`} style={{ width: `${risk.percentage}%` }} />
                                                </div>
                                            </div>

                                            {openRisks[risk.title] && (
                                                <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                                    <div className="mt-4 flex items-center gap-3 sm:hidden">
                                                        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: subtextColor }}>Risk</span>
                                                        <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', border: `1px solid ${cardBorder}` }}>
                                                            <div className={`h-full rounded-full ${risk.color === 'green' ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-500`} style={{ width: `${risk.percentage}%` }} />
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-xs leading-relaxed" style={{ color: bodyColor }}>{risk.explanation}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                            <p className="text-[10px] leading-relaxed pt-3" style={{ borderTop: `1px solid ${cardBorder}`, color: subtextColor }}>
                                {data.riskRadar?.source || "Source: Emaar Annual Report 2025 / DFM filings / ICD Shareholding Disclosure via Dubai Housing Analysis"}
                            </p>
                        </div>
                    </div>

                    {/* Buyer Suitability Card */}
                    <div className="rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <div className="p-5 sm:p-6" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B68A35] mb-1">
                                {data.buyerSuitability?.label || "Buyer suitability"}
                            </p>
                            <h3 className="text-xl lg:text-2xl font-serif" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                {data.buyerSuitability?.title || "Who should buy from Emaar?"}
                            </h3>
                        </div>

                        <div className="p-2 sm:p-6">
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                                {Object.entries(suitabilityTabs).map(([key, tab]) => {
                                    const active = activeTab === key;
                                    const Icon = getTabIcon(tab.iconName);

                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setActiveTab(key)}
                                            className={`relative flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-[11px] font-bold transition-all sm:text-xs ${active
                                                ? 'bg-[#FDF8F0] text-[#B68A35] shadow-sm'
                                                : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                }`}
                                            style={{
                                                border: `1px solid ${cardBorder}`,
                                                ...(active && isDark ? { background: 'rgba(182,138,53,0.12)', borderColor: GOLD_BORDER } : {}),
                                                ...(active && !isDark ? { borderColor: `${GOLD}/25` } : {}),
                                                ...(!active && isDark ? { background: 'transparent', color: subtextColor } : {})
                                            }}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="space-y-3">
                                {activeSuitability.items.map((item) => {
                                    const ItemIcon = getSuitabilityIcon(item.iconName);

                                    return (
                                        <div key={item.title} className="flex gap-4 rounded-xl p-4 transition-colors" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#FBF9F6' }}>
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={!isDark ? { background: '#FAF3E6' } : { background: 'rgba(182,138,53,0.12)' }}>
                                                <ItemIcon className="w-4 h-4 text-[#B68A35]" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
                    {/* Known Issues Accordion */}
                    <div className="rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <button
                            type="button"
                            onClick={() => setIsOpenKnownIssues((current) => !current)}
                            className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 transition-colors"
                            style={{ borderBottom: `1px solid ${cardBorder}`, background: cardBg }}
                        >
                            <div className="flex items-center gap-3 text-left min-w-0">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={!isDark ? { background: '#FAF3E6' } : { background: 'rgba(182,138,53,0.12)' }}>
                                    <ShieldAlert className="w-4 h-4 text-[#B68A35]" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.knownIssues?.title || "Known issues"}</h3>
                                    <p className="text-xs" style={{ color: subtextColor }}>{data.knownIssues?.subtitle || "Recurring complaints"}</p>
                                </div>
                            </div>
                            {isOpenKnownIssues ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: subtextColor }} /> : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: subtextColor }} />}
                        </button>

                        {isOpenKnownIssues && (
                            <div className="p-4 sm:p-3 space-y-3">
                                <p className="text-xs italic leading-relaxed" style={{ color: subtextColor }}>
                                    {data.knownIssues?.disclaimer || "The points below are based on aggregated resident reviews and public records."}
                                </p>
                                {knownIssues.map((issue) => {
                                    const colors = toneStyles(issue.tone, isDark);

                                    return (
                                        <div key={issue.title} className="flex items-start gap-3 rounded-lg p-3" style={{ border: `1px solid ${cardBorder}` }}>
                                            <div className="mt-1 flex items-center gap-2 shrink-0 rounded-full" style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FAF3E6', padding: '4px 8px' }}>
                                                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                                                <span className={`text-[10px] font-bold uppercase tracking-wide ${issue.tone === 'red' ? 'text-red-500' : 'text-amber-500'}`}>
                                                    {issue.label}
                                                </span>
                                            </div>
                                            <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>
                                                <span className="font-semibold block mb-0.5" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{issue.title}</span>
                                                {issue.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Risk Mitigation Strategies Accordion */}
                    <div className="rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <button
                            type="button"
                            onClick={() => setIsOpenStrategies((current) => !current)}
                            className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 transition-colors"
                            style={{ borderBottom: `1px solid ${cardBorder}`, background: cardBg }}
                        >
                            <div className="flex items-center gap-3 text-left min-w-0">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={!isDark ? { background: '#FAF3E6' } : { background: 'rgba(182,138,53,0.12)' }}>
                                    <ShieldCheck className="w-4 h-4 text-[#B68A35]" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.mitigationStrategies?.title || "Risk Mitigation Strategies for Buyers"}</h3>
                                    <p className="text-xs" style={{ color: subtextColor }}>{data.mitigationStrategies?.subtitle || "For buyers"}</p>
                                </div>
                            </div>
                            {isOpenStrategies ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: subtextColor }} /> : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: subtextColor }} />}
                        </button>

                        {isOpenStrategies && (
                            <div className="p-4 sm:p-5 space-y-4">
                                <p className="text-xs italic leading-relaxed" style={{ color: subtextColor }}>
                                    {data.mitigationStrategies?.disclaimer || "Practical steps to reduce risk when purchasing from Emaar:"}
                                </p>
                                {mitigationSteps.map((step, index) => (
                                    <div key={step.title} className="flex gap-3">
                                        <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-[#B68A35]" style={!isDark ? { background: '#FAF3E6', border: '1px solid #F3E6CC' } : { background: 'rgba(182,138,53,0.12)', border: `1px solid ${cardBorder}` }}>
                                            {index + 1}
                                        </div>
                                        <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>
                                            <span className="font-semibold block mb-0.5" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{step.title}</span>
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* PropertyIntel Research Team Accordion */}
                    <div className="rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                        <button
                            type="button"
                            onClick={() => setIsOpenAnalyst((current) => !current)}
                            className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 transition-colors"
                            style={{ borderBottom: `1px solid ${cardBorder}`, background: cardBg }}
                        >
                            <div className="flex items-center gap-3 text-left min-w-0">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={!isDark ? { background: '#FAF3E6' } : { background: 'rgba(182,138,53,0.12)' }}>
                                    <User className="w-4 h-4 text-[#B68A35]" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-sm lg:text-base" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.researchTeam?.title || "PropertyIntel Research Team"}</h3>
                                    <p className="text-xs" style={{ color: subtextColor }}>{data.researchTeam?.subtitle || "On-ground analysis • 22 February 2026"}</p>
                                </div>
                            </div>
                            {isOpenAnalyst ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: subtextColor }} /> : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: subtextColor }} />}
                        </button>

                        {isOpenAnalyst && (
                            <div className="p-4 sm:p-5">
                                <p className="text-xs leading-relaxed mb-4" style={{ color: bodyColor }}>
                                    {data.researchTeam?.content}
                                </p>
                                <a href={data.researchTeam?.readMoreUrl || "https://properties.emaar.com/en/about-emaar/"} target="_blank" rel="noreferrer" className="text-xs text-[#B68A35] font-semibold hover:underline flex items-center gap-1">
                                    Read more <ExternalLink className="w-3 h-3" />
                                </a>

                                <div className="mt-4 pt-4 grid grid-cols-3 gap-2 text-center" style={{ borderTop: `1px solid ${cardBorder}` }}>
                                    {data.researchTeam?.stats?.map((stat, idx) => (
                                        <div key={idx}>
                                            <p className="text-sm font-bold text-[#B68A35]">{stat.value}</p>
                                            <p className="text-[10px]" style={{ color: subtextColor }}>{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <ExpertSection />

                <div className="mt-2 sm:mt-6 rounded-xl px-4 py-4 sm:px-5 flex items-start gap-3" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6' }}>
                    <Info className="w-5 h-5 text-[#B68A35] mt-0.5 shrink-0" />
                    <p className="text-[10px] sm:text-xs leading-relaxed" style={{ color: bodyColor }}>
                        <span className="font-bold uppercase" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{data.disclaimer?.title || "Disclaimer"}</span> {data.disclaimer?.text || "Risk assessments are based on historical data, verified public records, and aggregated owner feedback; they do not guarantee future performance. Individual project risks may vary. Last updated: 22 February 2026."}
                    </p>
                </div>
            </div>
        </section>
    );
}

// Helper functions for icons
const getRiskIcon = (iconName) => {
    const icons = {
        'Home': Home,
        'Clock': Clock,
        'Star': Star
    };
    return icons[iconName] || Home;
};

const getTabIcon = (iconName) => {
    const icons = {
        'Check': Check,
        'AlertTriangle': AlertTriangle,
        'X': X
    };
    return icons[iconName] || Check;
};

const getSuitabilityIcon = (iconName) => {
    const icons = {
        'Users': Users,
        'Building': Building,
        'DollarSign': DollarSign,
        'TrendingUp': TrendingUp
    };
    return icons[iconName] || Users;
};