"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    FiCheckCircle, FiTrendingUp, FiShield, FiChevronDown, FiChevronUp,
    FiGlobe
} from 'react-icons/fi';
import { PiBuildingLight, PiHouseLight } from 'react-icons/pi';
import { LuBadgeCheck, LuBuilding2, LuLayers, LuTag, LuChartBar, LuTrees, LuFileText } from 'react-icons/lu';
import { useThemeStyles, GOLD_BORDER, PANEL_DARK_BG } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";

/* ─────────────────────────────────────────────
   KEY FACT CARD
───────────────────────────────────────────── */
const FactRow = ({ icon, label, value, valueIcon, sub, isDark, bodyColor, subtextColor, t, isFirst }) => (
    <div
        className={`relative grid grid-cols-[3.5rem_1fr] gap-2 px-2 py-5 sm:grid-cols-[4.5rem_1.2fr_1fr] sm:items-center sm:px-6 ${isFirst ? "" : "border-t"}`}
        style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)" }}
    >
        {sub ? (
            <p
                className="absolute top-5 right-4 z-10 max-w-[48%] text-right text-[11px] leading-snug sm:static sm:col-start-3 sm:max-w-none sm:self-center sm:text-[13px] sm:leading-relaxed"
                style={{ color: bodyColor }}
            >
                {sub}
            </p>
        ) : null}

        <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl border sm:h-16 sm:w-16 ${isFirst ? "p-2" : ""}`}
            style={{
                borderColor: isDark ? GOLD_BORDER : "rgba(182,138,53,0.2)",
                background: isDark ? "rgba(182,138,53,0.08)" : "#fffdf8",
                color: "#b08139",
            }}
        >
            {isFirst ? (
                <Image src="/developer/emaar-logo.png" alt="Emaar logo" width={52} height={52} className="h-full w-full object-contain" />
            ) : (
                icon
            )}
        </div>

        <div className="min-w-0 pr-[50%] sm:pr-0">
            <p className="text-[11px] font-medium leading-tight" style={{ color: subtextColor }}>
                {label}
            </p>
            <p className="mt-1 text-[17px] font-semibold leading-snug sm:text-xl" style={{ color: isDark ? t.text : "#1a1a1a" }}>
                {valueIcon}{value}
            </p>
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Section1 = ({ data }) => {
    const { t, isDark, dark } = useThemeStyles();
    const [disclaimerOpen, setDisclaimerOpen] = useState(false);

    const cardBg = isDark ? PANEL_DARK_BG : "#FFFFFF";
    const cardBorder = isDark ? GOLD_BORDER : "#e8d9b8";
    const sectionBg = isDark ? t.bg : "#faf8f4";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    if (!data) {
        return (
            <section className="w-full" style={{ background: sectionBg }}>
                <div className="max-w-[1400px] mx-auto px-1 sm:px-6 lg:px-8 py-5 sm:py-10">
                    <div className="flex items-center justify-center py-20">
                        <p style={{ color: bodyColor }}>Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full" style={{ background: sectionBg, color: isDark ? t.text : '#1a1a1a' }}>
            <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 py-5 sm:py-10">

                {/* ── Project Overview ── */}
                <div
                    className="mb-8 flex max-h-[18rem] flex-col overflow-hidden rounded-2xl border p-5 sm:p-7 lg:max-h-[24rem]"
                    style={{
                        borderColor: cardBorder,
                        background: isDark ? "rgba(182,138,53,0.05)" : cardBg,
                        boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.25)" : "0 10px 28px rgba(0,0,0,0.06)",
                    }}
                >
                    <div className="flex shrink-0 items-start gap-4 border-b pb-4" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.14)" }}>
                        <div
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#b08139]"
                            style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#f5ead6', border: `1px solid ${cardBorder}` }}
                        >
                            <PiBuildingLight size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-2xl font-semibold leading-tight" style={{ color: isDark ? t.text : '#1a1a1a' }}>
                                {data.headings?.mainTitle || "Project Overview"}
                            </h2>
                            <p className="text-[#b08139] text-sm sm:text-base font-medium mt-0.5">
                                {data.headings?.subtitle || "Emirates Hills, Dubai"}
                            </p>
                            <div className="mt-2 w-14 h-[2px] bg-[#b08139] rounded-full" />
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto pr-2 pt-4 custom-scrollbar">
                        <p className="text-sm sm:text-base leading-relaxed" style={{ color: bodyColor }}>
                            {data.bodyText?.primary || ''}
                        </p>

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                            {data.bulletPoints?.map((point, idx) => (
                                <BulletPoint key={idx} isDark={isDark} bodyColor={bodyColor}>
                                    {point}
                                </BulletPoint>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="border-t mb-10" style={{ borderColor: cardBorder }} />

                {/* ── Key Facts ── */}
                <div className="mb-2 sm:mb-5">
                    <h3 className="mb-3 text-3xl font-semibold leading-tight sm:text-4xl" style={{ color: isDark ? t.text : '#1a1a1a' }}>
                        {data.headings?.keyFactsTitle || 'Key Facts'}{' '}
                        <span className="text-[#b08139] font-normal">{data.headings?.keyFactsSubtitle || 'at a Glance'}</span>
                    </h3>
                    <div className="mb-3 h-[2px] w-28 bg-[#b08139]" />

                    <div
                        className="overflow-hidden rounded-2xl border shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
                        style={{
                            borderColor: isDark ? GOLD_BORDER : "rgba(15,23,42,0.08)",
                            background: isDark ? "rgba(182,138,53,0.05)" : "#ffffff",
                        }}
                    >
                        {data.keyFacts?.map((fact, i) => (
                            <FactRow
                                key={i}
                                icon={getIconComponent(fact.iconName)}
                                label={fact.label}
                                value={fact.value}
                                valueIcon={fact.valueIcon ? <FiCheckCircle size={16} className="inline-block mr-1 text-[#b08139]" /> : null}
                                sub={fact.sub}
                                isDark={isDark}
                                bodyColor={bodyColor}
                                subtextColor={subtextColor}
                                t={t}
                                isFirst={i === 0}
                            />
                        ))}
                    </div>
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

                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: ${isDark ? "rgba(255,255,255,0.06)" : "#f1f1f1"};
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #b08139;
                        border-radius: 10px;
                    }
                `}</style>
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