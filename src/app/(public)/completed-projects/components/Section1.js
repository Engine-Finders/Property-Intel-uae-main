"use client";

import React, { useState } from 'react';
import {
    FiCheckCircle, FiTrendingUp, FiShield, FiChevronDown, FiChevronUp,
    FiGlobe
} from 'react-icons/fi';
import { PiBuildingLight, PiHouseLight } from 'react-icons/pi';
import { LuBadgeCheck, LuBuilding2, LuLayers, LuTag, LuChartBar, LuTrees, LuFileText } from 'react-icons/lu';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

/* ─────────────────────────────────────────────
   KEY FACT CARD
───────────────────────────────────────────── */
const FactCard = ({ icon, label, value, valueIcon, sub, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) => (
    <div className="flex flex-col gap-1 p-2 sm:p-5 max-sm:border-b sm:rounded-xl transition-shadow duration-200"
        style={{
            borderColor: cardBorder,
            background: cardBg,
            ...(isDark ? {} : { borderBottomWidth: '1px' })
        }}>
        {/* Icon + Label */}
        <div className="flex items-center gap-2 text-[#b08139] mb-1">
            {icon}
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-widest leading-tight" style={{ color: subtextColor }}>
                {label}
            </span>
        </div>

        {/* Value */}
        <p className="font-[Merriweather] tabular-nums text-[15px] sm:text-[20px] font-bold leading-snug"
            style={{ color: isDark ? t.text : '#1a1a1a' }}>
            {valueIcon}{value}
        </p>

        {/* Sub */}
        <p className="text-[10px] sm:text-[11px] font-sans leading-relaxed" style={{ color: bodyColor }}>
            {sub}
        </p>
    </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Section1 = ({ data }) => {
    const { t, isDark, dark } = useThemeStyles();
    const [disclaimerOpen, setDisclaimerOpen] = useState(false);

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "#e8d9b8";
    const sectionBg = isDark ? t.bg : "#faf8f4";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    if (!data) {
        return (
            <section className="w-full font-serif" style={{ background: sectionBg }}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10">
                    <div className="flex items-center justify-center py-20">
                        <p style={{ color: bodyColor }}>Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full font-serif" style={{ background: sectionBg, color: isDark ? t.text : '#1a1a1a' }}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10">

                {/* ── Section Header ── */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="mt-1 w-10 h-10 rounded-lg flex items-center justify-center text-[#b08139] shrink-0"
                        style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#f5ead6', border: `1px solid ${cardBorder}` }}>
                        <PiBuildingLight size={22} />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-semibold leading-tight" style={{ color: isDark ? t.text : '#1a1a1a' }}>
                            {data.headings?.mainTitle || "Project Overview"}
                        </h2>
                        <p className="text-[#b08139] font-sans text-sm sm:text-base font-medium mt-0.5">
                            {data.headings?.subtitle || "Emirates Hills, Dubai"}
                        </p>
                        <div className="mt-2 w-10 h-[2px] bg-[#b08139] rounded-full" />
                    </div>
                </div>

                {/* ── Body Text ── */}
                <div className="space-y-4 mb-8">
                    <p className="text-sm sm:text-base leading-relaxed font-sans" style={{ color: bodyColor }}>
                        {data.bodyText?.primary || ''}
                    </p>
                </div>

                {/* ── Two-column bullet points ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 mb-10 max-w-5xl">
                    {data.bulletPoints?.map((point, idx) => (
                        <BulletPoint key={idx} isDark={isDark} bodyColor={bodyColor}>
                            {point}
                        </BulletPoint>
                    ))}
                </div>

                {/* ── Divider ── */}
                <div className="border-t mb-10" style={{ borderColor: cardBorder }} />

                {/* ── Key Facts Heading ── */}
                <h3 className="text-xl sm:text-2xl font-serif mb-6" style={{ color: isDark ? t.text : '#1a1a1a' }}>
                    {data.headings?.keyFactsTitle || 'Key Facts'}{' '}
                    <span className="text-[#b08139] font-normal italic">{data.headings?.keyFactsSubtitle || 'at a Glance'}</span>
                </h3>

                {/* ── Facts Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 mb-2 sm:mb-5">
                    {data.keyFacts?.map((fact, i) => (
                        <FactCard key={i}
                            icon={getIconComponent(fact.iconName)}
                            label={fact.label}
                            value={fact.value}
                            valueIcon={fact.valueIcon ? <FiCheckCircle size={14} className="inline-block mr-1 text-[#b08139]" /> : null}
                            sub={fact.sub}
                            isDark={isDark}
                            cardBg={cardBg}
                            cardBorder={cardBorder}
                            bodyColor={bodyColor}
                            subtextColor={subtextColor}
                            t={t}
                        />
                    ))}
                </div>

                {/* ── Source & Disclaimer Accordion ── */}
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    {/* Header row */}
                    <button
                        onClick={() => setDisclaimerOpen(v => !v)}
                        className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-150"
                        style={{ hover: { background: isDark ? 'rgba(255,255,255,0.03)' : '#faf8f4' } }}
                    >
                        <div className="flex items-center gap-2 text-[#b08139]">
                            <FiShield size={18} />
                            <span className="font-sans font-semibold text-sm" style={{ color: isDark ? t.text : '#1a1a1a' }}>
                                {data.disclaimer?.title || "Source & Disclaimer"}
                            </span>
                        </div>
                        <span className="text-[#b08139]">
                            {disclaimerOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                        </span>
                    </button>

                    {/* Collapsible body */}
                    {disclaimerOpen && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x" style={{ borderTop: `1px solid ${cardBorder}`, borderColor: `${cardBorder}/40` }}>
                            <DisclaimerBlock
                                icon={<FiGlobe size={16} />}
                                title={data.disclaimer?.blocks?.[0]?.title || "Source Transparency"}
                                body={data.disclaimer?.blocks?.[0]?.content || ''}
                                isDark={isDark}
                                bodyColor={bodyColor}
                                subtextColor={subtextColor}
                                t={t}
                            />
                            <DisclaimerBlock
                                icon={<FiShield size={16} />}
                                title={data.disclaimer?.blocks?.[1]?.title || "Disclaimer"}
                                body={data.disclaimer?.blocks?.[1]?.content || ''}
                                isDark={isDark}
                                bodyColor={bodyColor}
                                subtextColor={subtextColor}
                                t={t}
                            />
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

/* ─── Helper function to get icon components ─── */
const getIconComponent = (iconName) => {
    const icons = {
        'LuBuilding2': <LuBuilding2 size={22} />,
        'LuBadgeCheck': <LuBadgeCheck size={22} />,
        'LuLayers': <LuLayers size={22} />,
        'PiHouseLight': <PiHouseLight size={22} />,
        'LuTag': <LuTag size={22} />,
        'LuChartBar': <LuChartBar size={22} />,
        'LuTrees': <LuTrees size={22} />,
        'LuFileText': <LuFileText size={22} />
    };
    return icons[iconName] || <LuBuilding2 size={22} />;
};

/* ─── Small Helpers ─── */
const BulletPoint = ({ children, isDark, bodyColor }) => (
    <div className="flex items-start gap-3">
        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#b08139] shrink-0" />
        <p className="text-sm font-sans leading-relaxed" style={{ color: bodyColor }}>{children}</p>
    </div>
);

const DisclaimerBlock = ({ icon, title, body, isDark, bodyColor, subtextColor, t }) => (
    <div className="flex gap-3 px-5 py-5">
        <div className="mt-0.5 text-[#b08139] shrink-0">{icon}</div>
        <div>
            <p className="font-sans font-semibold text-[13px] mb-1" style={{ color: isDark ? t.text : '#1a1a1a' }}>{title}:</p>
            <p className="font-sans text-[12px] leading-relaxed" style={{ color: bodyColor }}>{body}</p>
        </div>
    </div>
);

export default Section1;