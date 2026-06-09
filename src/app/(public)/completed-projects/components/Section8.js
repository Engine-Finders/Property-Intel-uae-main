"use client";

import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

const Section8 = ({ data }) => {
    const { t, isDark, dark } = useThemeStyles();
    const [openIndex, setOpenIndex] = useState(null);

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FCFBFA";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    const toggle = (i) => setOpenIndex(prev => prev === i ? null : i);

    if (!data) {
        return (
            <section className="w-full py-2 sm:py-5 font-sans" style={{ background: sectionBg }}>
                <div className="max-w-[1400px] mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
                </div>
            </section>
        );
    }

    const categories = [...new Set(data.faqs?.map(f => f.category) || [])];

    // Helper to render answer content with HTML
    const renderAnswer = (answerHtml) => {
        return <div dangerouslySetInnerHTML={{ __html: answerHtml }} />;
    };

    return (
        <section className="w-full py-2 sm:py-5 font-sans antialiased" style={{ background: sectionBg }}>
            <div className="max-w-[1400px] mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center mb-8">
                    <h2 className="text-3xl lg:text-4xl font-serif mb-2" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                        {data.headings?.line1 || "Frequently Asked Questions — "}
                        <span className="text-[#B68A35]">{data.headings?.highlight || "Emirates Hills"}</span>
                    </h2>
                    <p className="text-sm max-w-2xl mx-auto" style={{ color: bodyColor }}>
                        {data.headings?.description || ""}
                    </p>
                </div>

                {/* FAQ grouped by category */}
                <div className="space-y-8">
                    {categories.map(category => {
                        const categoryFaqs = data.faqs?.filter(f => f.category === category) || [];
                        return (
                            <div key={category}>
                                <h3 className="text-lg font-serif font-semibold mb-3 pb-2" style={{ color: isDark ? t.text : '#1A1A1A', borderBottom: `1px solid ${GOLD}/30` }}>
                                    {category}
                                </h3>
                                <div className="rounded-2xl p-2 sm:p-6 shadow-sm" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                                    <div className="divide-y" style={{ borderColor: cardBorder }}>
                                        {categoryFaqs.map((item) => {
                                            const globalIdx = data.faqs?.findIndex(f => f.q === item.q);
                                            const isOpen = openIndex === globalIdx;

                                            return (
                                                <div key={globalIdx} className="py-2 sm:py-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggle(globalIdx)}
                                                        aria-expanded={isOpen}
                                                        className="w-full text-left flex items-start gap-0 sm:gap-4"
                                                    >
                                                        <div className="w-12 shrink-0 text-[#B68A35] font-bold text-lg font-serif tabular-nums pt-0.5">
                                                            {String(globalIdx + 1).padStart(2, '0')}.
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-3">
                                                                <h4 className="text-sm font-semibold leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.q}</h4>
                                                                <div className="w-5 h-5 shrink-0 flex items-center justify-center mt-0.5">
                                                                    <ChevronDown className={`w-full h-full transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} style={{ color: subtextColor }} />
                                                                </div>
                                                            </div>

                                                            <div className={`mt-3 text-sm overflow-hidden transition-[max-height] duration-300 ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`} style={{ color: bodyColor }}>
                                                                {renderAnswer(item.a)}
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Source Transparency Note */}
                <div className="gap-2 sm:mt-6 flex items-start mt-6 text-xs p-3 rounded-xl" style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#B68A35/5', border: `1px solid ${cardBorder}` }}>
                    <Info className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed" style={{ color: bodyColor }}>
                        {data.sourceTransparency?.content || ""}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section8;