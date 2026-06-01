"use client";

import React, { useState } from 'react';
import {
    FiCheckCircle, FiTrendingUp, FiShield, FiChevronDown, FiChevronUp,
    FiGlobe
} from 'react-icons/fi';
import { PiBuildingLight, PiHouseLight } from 'react-icons/pi';
import { LuBadgeCheck, LuBuilding2, LuLayers, LuTag, LuChartBar, LuTrees, LuFileText } from 'react-icons/lu';

/* ─────────────────────────────────────────────
   KEY FACTS DATA
───────────────────────────────────────────── */
const keyFacts = [
    {
        icon: <LuBuilding2 size={22} />,
        label: 'Developer',
        value: 'Emaar Properties',
        sub: '118,000+ units delivered globally; founded 1997',
    },
    {
        icon: <LuBadgeCheck size={22} />,
        label: 'Project Status',
        value: 'Completed',
        valueIcon: <FiCheckCircle size={14} className="inline-block mr-1 text-[#b08139]" />,
        sub: 'Phased handover 2003–2008; fully operational',
    },
    {
        icon: <LuLayers size={22} />,
        label: 'Total Units',
        value: '~450 Detached Villas',
        sub: 'Custom-designed; plot sizes 15K–50K+ sqft',
    },
    {
        icon: <PiHouseLight size={22} />,
        label: 'Unit Types',
        value: '5–10+ Bedroom Villas',
        sub: 'Built-up area: ~10,000–30,000+ sqft',
    },
    {
        icon: <LuTag size={22} />,
        label: 'Current Price Range',
        value: 'AED 25M–100M+',
        sub: 'Based on DXBInteract transactions Q4 2025',
    },
    {
        icon: <LuChartBar size={22} />,
        label: 'Price per Sqft (Current)',
        value: 'AED 3,100–3,800',
        sub: 'Market average; varies by view, customization, plot',
    },
    {
        icon: <LuTrees size={22} />,
        label: 'Community Amenities',
        value: 'Montgomerie Golf Club, Lakes, Parks, 24/7 Security',
        sub: 'Managed by Emaar Community Management',
    },
    {
        icon: <LuFileText size={22} />,
        label: 'Resale Process',
        value: 'DLD-Registered Freehold',
        sub: 'Title deed transfer via Dubai Land Department; mortgage financing available',
    },
];

/* ─────────────────────────────────────────────
   KEY FACT CARD
───────────────────────────────────────────── */
const FactCard = ({ icon, label, value, valueIcon, sub }) => (
    <div className="flex flex-col gap-1 p-2 sm:p-5 max-sm:border-b  sm:border border-[#e8d9b8] sm:rounded-xl bg-white hover:shadow-md transition-shadow duration-200">
        {/* Icon + Label */}
        <div className="flex items-center gap-2 text-[#b08139] mb-1">
            {icon}
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-widest text-gray-500 leading-tight">
                {label}
            </span>
        </div>

        {/* Value */}
        <p className="font-[Merriweather] tabular-nums text-[15px] sm:text-[20px] font-bold text-[#1a1a1a] leading-snug">
            {valueIcon}{value}
        </p>

        {/* Sub */}
        <p className="text-[10px] sm:text-[11px] font-sans text-gray-500 leading-relaxed">
            {sub}
        </p>
    </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Section1 = () => {
    const [disclaimerOpen, setDisclaimerOpen] = useState(false);

    return (
        <section className="w-full bg-[#faf8f4] font-serif text-[#1a1a1a]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10">

                {/* ── Section Header ── */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="mt-1 w-10 h-10 rounded-lg bg-[#f5ead6] border border-[#e8d9b8] flex items-center justify-center text-[#b08139] shrink-0">
                        <PiBuildingLight size={22} />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1a1a1a] leading-tight">
                            Project Overview
                        </h2>
                        <p className="text-[#b08139] font-sans text-sm sm:text-base font-medium mt-0.5">
                            Emirates Hills, Dubai
                        </p>
                        <div className="mt-2 w-10 h-[2px] bg-[#b08139] rounded-full" />
                    </div>
                </div>

                {/* ── Body Text ── */}
                <div className=" space-y-4 mb-8">
                    <p className="text-sm sm:text-base leading-relaxed text-gray-700 font-sans">
                        Emirates Hills is a completed, gated luxury villa community developed by Emaar Properties, positioned within
                        one of Dubai's most established premium residential enclaves. Comprising approximately 450 custom-designed
                        detached villas across landscaped plots ranging from 15,000 to over 50,000 sqft, the community was delivered
                        in phases between 2003 and 2008 and has since matured into a benchmark for ultra-luxury living in the UAE.
                    </p>
                </div>

                {/* ── Two-column bullet points ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 mb-10 max-w-5xl">
                    <BulletPoint>
                        Residents benefit from 24/7 security, direct access to the Montgomerie Golf Club, lake and golf course
                        views, and proximity to Dubai Marina, JBR, and major arterial routes including Sheikh Zayed Road (E11).
                    </BulletPoint>
                    <BulletPoint>
                        The broader Emirates Hills district spans approximately 2.1 million sqm and forms part of Dubai's "Premium
                        Residential Corridor" alongside Jumeirah Islands, Jumeirah Golf Estates, and Dubai Hills Estate.
                    </BulletPoint>
                </div>

                {/* ── Divider ── */}
                <div className="border-t border-[#e8d9b8] mb-10" />

                {/* ── Key Facts Heading ── */}
                <h3 className="text-xl sm:text-2xl font-serif mb-6">
                    Key Facts{' '}
                    <span className="text-[#b08139] font-normal italic">at a Glance</span>
                </h3>

                {/* ── Facts Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 mb-2 sm:mb-5">
                    {keyFacts.map((fact, i) => (
                        <FactCard key={i} {...fact} />
                    ))}
                </div>

                {/* ── Source & Disclaimer Accordion ── */}
                <div className="border border-[#e8d9b8] rounded-xl overflow-hidden bg-white">
                    {/* Header row */}
                    <button
                        onClick={() => setDisclaimerOpen(v => !v)}
                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#faf8f4] transition-colors duration-150"
                    >
                        <div className="flex items-center gap-2 text-[#b08139]">
                            <FiShield size={18} />
                            <span className="font-sans font-semibold text-sm text-[#1a1a1a]">Source &amp; Disclaimer</span>
                        </div>
                        <span className="text-[#b08139]">
                            {disclaimerOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                        </span>
                    </button>

                    {/* Collapsible body */}
                    {disclaimerOpen && (
                        <div className="border-t border-[#e8d9b8] grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e8d9b8]/40">
                            <DisclaimerBlock
                                icon={<FiGlobe size={16} />}
                                title="Source Transparency"
                                body={
                                    <>
                                        Pricing and transaction data aggregated from{' '}
                                        <a
                                            href="https://dxbinteract.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#b08139] underline hover:opacity-80"
                                        >
                                            DXBInteract.com
                                        </a>{' '}
                                        (official DLD partner), along with other portals listings as of February 2026. Values represent
                                        market estimates for informational purposes and may vary by property condition, view,
                                        customization, and negotiation. Verify all details with licensed real estate professionals and
                                        official DLD channels before transacting.
                                    </>
                                }
                            />
                            <DisclaimerBlock
                                icon={<FiShield size={16} />}
                                title="Disclaimer"
                                body="All information is for educational and research purposes only. PropertyIntel.ae does not provide financial, legal, or investment advice. Market values, rental yields, and transaction data are estimates based on aggregated third-party sources and are subject to change. Verify all details with the Dubai Land Department, licensed real estate brokers, and official developer channels before making any commitment."
                            />
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

/* ─── Small Helpers ─── */
const BulletPoint = ({ children }) => (
    <div className="flex items-start gap-3">
        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#b08139] shrink-0" />
        <p className="text-sm font-sans text-gray-700 leading-relaxed">{children}</p>
    </div>
);

const DisclaimerBlock = ({ icon, title, body }) => (
    <div className="flex gap-3 px-5 py-5">
        <div className="mt-0.5 text-[#b08139] shrink-0">{icon}</div>
        <div>
            <p className="font-sans font-semibold text-[13px] text-[#1a1a1a] mb-1">{title}:</p>
            <p className="font-sans text-[12px] text-gray-600 leading-relaxed">{body}</p>
        </div>
    </div>
);

export default Section1;