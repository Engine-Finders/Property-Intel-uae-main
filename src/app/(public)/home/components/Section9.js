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

const risks = [
    {
        icon: Home,
        title: 'Financial Stability Risk',
        description: 'Developer solvency and project abandonment',
        level: 'Low',
        percentage: 25,
        color: 'green',
        explanation:
            'Emaar Properties is publicly traded on the Dubai Financial Market (DFM: EMAAR) with audited financial disclosures, strong cash reserves (AED 28.25 billion), and strategic backing from Investment Corporation of Dubai (ICD) holding 22.27% stake. The company\'s diversified revenue streams across development, hospitality, and retail reduce exposure to single-sector volatility. Low risk of project abandonment or financial distress.',
        source:
            'Emaar Annual Report 2025 / DFM filings / ICD Shareholding Disclosure via Dubai Housing Analysis',
    },
    {
        icon: Clock,
        title: 'Delivery Risk',
        description: 'Timeline adherence and handover delays',
        level: 'Moderate',
        percentage: 60,
        color: 'amber',
        explanation:
            'While the majority of Emaar\'s standard residential projects deliver within acceptable timelines (96% on-time record), large-scale and iconic developments (e.g., Dubai Creek Tower, certain phases of Dubai Creek Harbour) have experienced multi-year delays due to design complexity, infrastructure coordination, or external factors. Based on PropertyIntel analysis of DLD handover records, the average delay across major projects is 3–6 months. Construction progress is generally transparent via official channels.',
        source:
            'PropertyIntel Delivery Analysis (Section 5 link) / DLD Handover Records / RERA Progress Reports',
    },
    {
        icon: Star,
        title: 'Quality Risk',
        description: 'Build quality and post-handover satisfaction',
        level: 'Low',
        percentage: 25,
        color: 'green',
        explanation:
            'Aggregated resident reviews consistently praise Emaar communities for master-planned design, landscaping quality, and long-term asset value retention. Common complaints focus on post-handover maintenance response times and service charge communication rather than inherent construction defects. Build quality in established communities (The Greens, Arabian Ranches) remains strong after 15+ years.',
        source:
            'Aggregated Google (220+ reviews), PropertyFinder.ae, Bayut Community Ratings (Section 6)',
    },
];

const suitabilityTabs = {
    best: {
        label: 'Best for',
        icon: Check,
        tone: 'green',
        items: [
            {
                icon: Users,
                title: 'Long-term families',
                description: "Emaar's master communities (Dubai Hills Estate, Arabian Ranches III, The Valley) offer integrated amenities, international schools, parks, and community events designed for multi-generational living.",
            },
            {
                icon: Building,
                title: 'Safe-haven investors',
                description: "Emaar's strong brand recognition, prime locations, and consistent demand typically support stable capital appreciation and reliable rental income over 5-10 year horizons.",
            },
            {
                icon: Users,
                title: 'End-users seeking premium lifestyles',
                description: "Projects in Downtown Dubai, Dubai Creek Harbour, and Dubai Marina cater to buyers who value iconic addresses, walkability, and urban convenience.",
            },
        ],
    },
    caution: {
        label: 'Caution',
        icon: AlertTriangle,
        tone: 'amber',
        items: [
            {
                icon: Users,
                title: 'Short-term flippers',
                description: "Long construction timelines (3-5 years for master communities), premium entry pricing, and developer transfer fees (typically 4-5% of sale value) may limit quick-flip profitability. Resale during construction is subject to market volatility and RERA regulations.",
            },
            {
                icon: TrendingUp,
                title: 'Yield-focused investors',
                description: "Premium pricing in Emaar communities often translates to rental yields of 4-6%, which may be lower than emerging areas like Dubai South or JVC where yields can reach 7-8%.",
            },
        ],
    },
    'not-ideal': {
        label: 'Not ideal',
        icon: X,
        tone: 'red',
        items: [
            {
                icon: DollarSign,
                title: 'Budget-conscious buyers',
                description: "Emaar commands a premium price per sqft (often 20-30% above market average in comparable locations). More affordable options exist with secondary developers in similar geographic areas.",
            },
            {
                icon: TrendingUp,
                title: 'Investors seeking quick exits',
                description: "Handover timelines for off-plan projects are frequently extended; capital may be tied up longer than initially projected. Early exit strategies should account for potential delays and transfer costs.",
            },
        ],
    },
};

const knownIssues = [
    {
        label: 'Frequent',
        tone: 'red',
        title: 'Slow maintenance response for non-urgent requests',
        description: 'Google Reviews, PropertyFinder (2025-2026),ALand Build Quality Analysis',
    },
    {
        label: 'Occasional',
        tone: 'amber',
        title: 'Service charge increases above inflation without detailed justification',
        description: 'DLD Mollak data, resident, GoProfiled reviews',
    },
    {
        label: 'Occasional',
        tone: 'amber',
        title: 'Limited visitor parking in high-density tower communities',
        description: 'Resident reviews, Bayut community discussions',
    },
    {
        label: 'Occasional',
        tone: 'amber',
        title: 'Construction noise and dust in actively developing phases',
        description: 'Dubai Municipality guidelines ; Resident forums',
    },
    {
        label: 'Consistent',
        tone: 'red',
        title: 'Premium pricing vs comparable communities from secondary developers',
        description: 'Market analysis / DLD transaction data',
    },
];

const mitigationSteps = [
    {
        title: 'Verify RERA registration and escrow account',
        description: 'Before paying any deposit for an off-plan unit, confirm the specific project is registered with RERA and that all payments are directed to a verified escrow account. (Source: RERA Off-Plan Sales Guidelines via BSA Law 2025 ; EGSH Official Center 2026)',
    },
    {
        title: 'Review service charge history via Mollak:',
        description: "Check the DLD Mollak portal for service charge trends in the specific community and building you're considering to anticipate future holding costs. (Source: DLD Mollak Service Charge Index)",
    },
    {
        title: 'Speak to current residents in completed phases',
        description: 'Visit handover communities and speak directly with residents to gather firsthand feedback on maintenance responsiveness, community management, and daily living experience. (Source: PropertyIntel recommendation)',
    },
    {
        title: 'Build buffer time into financial planning',
        description: "For off-plan purchases, review the developer's delivery track record on similar projects and add a 6-12 month buffer to expected handover dates when planning relocation or rental income start dates.",
    },
    {
        title: 'Factor in transfer fees for resale strategy',
        description: 'Emaar typically charges a transfer fee (4-5% of sale value) for resale of off-plan units; include this cost in your exit strategy calculations if considering a short-to-medium term hold.',
    },
];

function toneStyles(tone) {
    switch (tone) {
        case 'green':
            return {
                badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                iconBg: 'bg-emerald-50',
                icon: 'text-emerald-600',
                dot: 'bg-emerald-500',
                card: 'bg-emerald-50/40 border-emerald-100',
            };
        case 'amber':
            return {
                badge: 'bg-amber-50 text-amber-700 border-amber-200',
                iconBg: 'bg-amber-50',
                icon: 'text-amber-600',
                dot: 'bg-amber-500',
                card: 'bg-amber-50/40 border-amber-100',
            };
        default:
            return {
                badge: 'bg-red-50 text-red-700 border-red-200',
                iconBg: 'bg-red-50',
                icon: 'text-red-600',
                dot: 'bg-red-500',
                card: 'bg-red-50/40 border-red-100',
            };
    }
}

export default function RiskAnalysisDashboard() {
    const [activeTab, setActiveTab] = useState('best');
    const [isOpenKnownIssues, setIsOpenKnownIssues] = useState(false);
    const [isOpenStrategies, setIsOpenStrategies] = useState(false);
    const [isOpenAnalyst, setIsOpenAnalyst] = useState(false);

    const [openRisks, setOpenRisks] = useState({});

    function toggleRisk(title) {
        setOpenRisks((prev) => ({ ...prev, [title]: !prev[title] }));
    }

    const activeSuitability = suitabilityTabs[activeTab];

    return (
        <section className="w-full bg-white font-sans antialiased">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-1">
                        Emaar Risk Assessment
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        WhatBuyers Should Know
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base text-gray-600 leading-relaxed font-medium">
                        An honest evaluation of potential risks when buying from Emaar, and guidance on whether their projects suit your investment or lifestyle profile.
                    </p>
                </div>
            </div>

            <div className="max-w-350 mx-auto px-2 sm:px-4 lg:px-2 -mt-12 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6 mb-2 sm:mb-6">
                    <div className="rounded-xl border border-[#F3EFE9] bg-white shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-[#F3EFE9]">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B68A35] mb-1">
                                Risk radar
                            </p>
                            <h3 className="text-xl lg:text-2xl font-serif text-[#1A1A1A]">
                                Three key risk dimensions
                            </h3>
                        </div>

                        <div className="p-2 sm:p-6 ">
                            <div className="sm:border border-[#F3EFE9]">
                                {risks.map((risk) => {
                                    const Icon = risk.icon;
                                    const colors = toneStyles(risk.color);

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
                                                        <h4 className="font-semibold text-sm lg:text-[15px] text-[#1A1A1A] leading-tight">
                                                            {risk.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
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
                                                        {openRisks[risk.title] ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center gap-3 hidden sm:flex">
                                                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Risk</span>
                                                <div className="h-1.5 flex-1 rounded-full bg-white/70 overflow-hidden border border-white">
                                                    <div className={`h-full rounded-full ${risk.color === 'green' ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-500`} style={{ width: `${risk.percentage}%` }} />
                                                </div>
                                            </div>

                                            {openRisks[risk.title] && (

                                                <div className="mt-4 pt-4 border-t border-[#F3EFE9] text-xs text-gray-700 ">
                                                    <div className="mt-4 flex items-center gap-3 sm:hidden">
                                                        <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Risk</span>
                                                        <div className="h-1.5 flex-1 rounded-full bg-white/70 overflow-hidden border border-white">
                                                            <div className={`h-full rounded-full ${risk.color === 'green' ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-500`} style={{ width: `${risk.percentage}%` }} />
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-xs text-gray-700 leading-relaxed">{risk.explanation}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                            <p className="text-[10px] text-gray-400 leading-relaxed pt-3 border-t border-[#F3EFE9]">
                                Source: Emaar Annual Report 2025 / DFM filings / ICD Shareholding Disclosure via Dubai Housing Analysis
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#F3EFE9] bg-white shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-[#F3EFE9]">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B68A35] mb-1">
                                Buyer suitability
                            </p>
                            <h3 className="text-xl lg:text-2xl font-serif text-[#1A1A1A]">
                                Who should buy from Emaar?
                            </h3>
                        </div>

                        <div className="p-2 sm:p-6">
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                                {Object.entries(suitabilityTabs).map(([key, tab]) => {
                                    const active = activeTab === key;
                                    const Icon = tab.icon;

                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setActiveTab(key)}
                                            className={`relative flex items-center justify-center gap-2 rounded-xl border px-2 py-3 text-[11px] font-bold transition-all sm:text-xs ${active
                                                ? 'bg-[#FDF8F0] border-[#B68A35]/25 text-[#B68A35] shadow-sm'
                                                : 'bg-white border-[#E9E3DA] text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                }`}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
                                            <span>{tab.label}</span>
                                            {active && <div className="" />}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="space-y-3">
                                {activeSuitability.items.map((item) => {
                                    const ItemIcon = item.icon;

                                    return (
                                        <div key={item.title} className="flex gap-4 rounded-xl border border-[#F3EFE9] p-4 transition-colors hover:bg-[#FBF9F6]">
                                            <div className="w-10 h-10 rounded-full bg-[#FAF3E6] flex items-center justify-center shrink-0">
                                                <ItemIcon className="w-4 h-4 text-[#B68A35]" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm text-[#1A1A1A] mb-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* <div className="mt-5 rounded-xl border border-[#F3EFE9] bg-[#FBF9F6] p-4">
                                <div className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider ${toneStyles(activeSuitability.tone).badge} border rounded-full px-3 py-1`}>
                                    <activeSuitability.icon className="w-3.5 h-3.5" />
                                    {activeSuitability.label}
                                </div>
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                                    <div>
                                        <p className="text-sm font-bold text-[#1A1A1A]">Long hold</p>
                                        <p className="text-[10px] text-gray-500">Works well for patient capital</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1A1A1A]">Premium pricing</p>
                                        <p className="text-[10px] text-gray-500">Expect a brand premium</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1A1A1A]">Execution quality</p>
                                        <p className="text-[10px] text-gray-500">Best for buyers valuing certainty</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
                    <div className="rounded-xl border border-[#F3EFE9] bg-white shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpenKnownIssues((current) => !current)}
                            className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 border-b border-[#F3EFE9] hover:bg-[#FBF9F6] transition-colors"
                        >
                            <div className="flex items-center gap-3 text-left min-w-0">
                                <div className="w-10 h-10 rounded-full bg-[#FAF3E6] flex items-center justify-center shrink-0">
                                    <ShieldAlert className="w-4 h-4 text-[#B68A35]" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-[#1A1A1A] text-sm lg:text-base">Known issues</h3>
                                    <p className="text-xs text-gray-500">Recurring complaints</p>
                                </div>
                            </div>
                            {isOpenKnownIssues ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                        </button>

                        {isOpenKnownIssues && (
                            <div className="p-4 sm:p-3 space-y-3">
                                <p className="text-xs text-gray-500 italic leading-relaxed">
                                    The points below are based on aggregated resident reviews and public records.
                                </p>
                                {knownIssues.map((issue) => {
                                    const colors = toneStyles(issue.tone);

                                    return (
                                        <div key={issue.title} className="flex items-start gap-3 rounded-lg border border-[#F3EFE9] p-3">
                                            <div className="mt-1 flex items-center gap-2 shrink-0 bg-[#FAF3E6] p-1 rounded-full">
                                                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                                                <span className={`text-[10px] font-bold uppercase tracking-wide ${issue.tone === 'red' ? 'text-red-600' : 'text-amber-600'}`}>
                                                    {issue.label}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-700 leading-relaxed">
                                                <span className="font-semibold text-[#1A1A1A] block mb-0.5">{issue.title}</span>
                                                {issue.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-[#F3EFE9] bg-white shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpenStrategies((current) => !current)}
                            className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 border-b border-[#F3EFE9] hover:bg-[#FBF9F6] transition-colors"
                        >
                            <div className="flex items-center gap-3 text-left min-w-0">
                                <div className="w-10 h-10 rounded-full bg-[#FAF3E6] flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-4 h-4 text-[#B68A35]" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-[#1A1A1A] text-sm lg:text-base">Risk Mitigation Strategies for Buyers</h3>
                                    <p className="text-xs text-gray-500">For buyers</p>
                                </div>
                            </div>
                            {isOpenStrategies ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                        </button>

                        {isOpenStrategies && (
                            <div className="p-4 sm:p-5 space-y-4">
                                <p className="text-xs text-gray-500 italic leading-relaxed">
                                    Practical steps to reduce risk when purchasing from Emaar:
                                </p>
                                {mitigationSteps.map((step, index) => (
                                    <div key={step.title} className="flex gap-3">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-[#FAF3E6] border border-[#F3E6CC] flex items-center justify-center text-[10px] font-bold text-[#B68A35]">
                                            {index + 1}
                                        </div>
                                        <p className="text-xs text-gray-700 leading-relaxed">
                                            <span className="font-semibold text-[#1A1A1A] block mb-0.5">{step.title}</span>
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-[#F3EFE9] bg-white shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpenAnalyst((current) => !current)}
                            className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 border-b border-[#F3EFE9] hover:bg-[#FBF9F6] transition-colors"
                        >
                            <div className="flex items-center gap-3 text-left min-w-0">
                                <div className="w-10 h-10 rounded-full bg-[#FAF3E6] flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-[#B68A35]" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-[#1A1A1A] text-sm lg:text-base">PropertyIntel Research Team</h3>
                                    <p className="text-xs text-gray-500">On-ground analysis • 22 February 2026</p>
                                </div>
                            </div>
                            {isOpenAnalyst ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                        </button>

                        {isOpenAnalyst && (
                            <div className="p-4 sm:p-5 ">


                                <p className="text-xs text-gray-700 leading-relaxed mb-4">
                                    Emaar Properties maintains its position as Dubai's most trusted developer with a 96% on-time delivery record and AED 65.8 billion in 2025 sales, more than double its nearest competitor. The company's financial strength (AED 28.25B cash reserves, Baa1/BBB+ credit ratings, 22.27% ICD government backing) effectively eliminates project abandonment risk. However, buyers should approach with realistic expectations. While standard residential communities deliver reliably, iconic projects like Dubai Creek Tower have faced multi-year delays (10+ years from announcement). Off-plan projects including The Valley and Emaar Beachfront reported handover delays in 2025-2026, reflecting industry-wide contractor capacity constraints rather than developer-specific failures.

                                    The quality proposition is nuanced. Established communities like The Greens and Arabian Ranches maintain strong build quality after 20+ years with ongoing upgrades. However, resident feedback reveals consistent complaints about post-handover maintenance responsiveness (ECM reviews averaging 1.0-3.3/5) and service charge transparency, with documented 22% YoY increases without justification. For investors, Emaar offers unmatched resale liquidity and capital preservation (4-6% stable yields) but sacrifices the higher returns (7-8%) of emerging areas like JVC. Premium pricing (15-20% above comparable communities) is justified by long-term value retention but limits quick-flip potential. The ideal Emaar buyer is a long-term holder prioritizing safety and quality over maximum short-term returns.


                                </p>
                                <a href="https://properties.emaar.com/en/about-emaar/" target="_blank" rel="noreferrer" className="text-xs text-[#B68A35] font-semibold hover:underline flex items-center gap-1">
                                    Read more <ExternalLink className="w-3 h-3" />
                                </a>

                                <div className="mt-4 pt-4 border-t border-[#F3EFE9] grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <p className="text-sm font-bold text-[#B68A35]">96%</p>
                                        <p className="text-[10px] text-gray-500">On-time delivery record</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#B68A35]">AED 65.8B</p>
                                        <p className="text-[10px] text-gray-500">2025 sales</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#B68A35]">4–6%</p>
                                        <p className="text-[10px] text-gray-500">Stable rental yields</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <ExpertSection />

                <div className="mt-2 sm:mt-6 rounded-xl border border-[#F3EFE9] bg-[#FBF9F6] px-4 py-4 sm:px-5 flex items-start gap-3">
                    <Info className="w-5 h-5 text-[#B68A35] mt-0.5 shrink-0" />
                    <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-[#1A1A1A] uppercase">Disclaimer</span> Risk assessments are based on historical data, verified public records, and aggregated owner feedback; they do not guarantee future performance. Individual project risks may vary. Last updated: 22 February 2026.
                    </p>
                </div>
            </div>
        </section>
    );
}