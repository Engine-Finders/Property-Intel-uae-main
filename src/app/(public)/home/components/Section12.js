"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Info } from 'lucide-react';
import ExpertSection from './ExpertSection';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

const Section12 = ({ data }) => {
    const { t, isDark, dark } = useThemeStyles();
    const [openIndex, setOpenIndex] = useState(null);

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FCFBFA";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    if (!data) {
        return (
            <section className="w-full py-2 sm:py-5 font-sans antialiased" style={{ background: sectionBg }}>
                <div className="max-w-[1400px] mx-auto px-4 py-20">
                    <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
                </div>
            </section>
        );
    }

    const faqs = data.faqs || [];

    const toggle = (i) => {
        setOpenIndex((prev) => (prev === i ? null : i));
    };

    return (
        <section className="w-full py-2 sm:py-5 font-sans antialiased" style={{ background: sectionBg }}>
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl lg:text-4xl font-serif mb-2" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        {data.header?.title?.line1 || "Frequently Asked Questions About "}<span className="text-[#B68A35]">{data.header?.title?.highlight || "Emaar Properties"}</span>
                    </h2>
                    <p className="mb-6 max-w-2xl text-center mx-auto" style={{ color: bodyColor }}>
                        {data.header?.description || "Find answers to the most common questions about buying from Emaar, payment plans, delivery track record, and more."}
                    </p>
                </div>

                <div className={`rounded-2xl p-2 sm:p-6 shadow-sm`} style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
                    <div className="divide-y" style={{ borderColor: cardBorder }}>
                        {faqs.map((item, idx) => (
                            <div key={idx} className="py-2 sm:py-4">
                                <button
                                    type="button"
                                    onClick={() => toggle(idx)}
                                    aria-expanded={openIndex === idx}
                                    className="w-full text-left flex items-start gap-0 sm:gap-4"
                                >
                                    <div className="w-12 shrink-0 text-[#B68A35] font-bold text-lg font-[Merriweather] tabular-nums">
                                        {String(idx + 1).padStart(2, '0')}.
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-semibold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>{item.q}</h3>
                                            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                                                <ChevronDown className={`w-full h-full transition-transform duration-200 transform ${openIndex === idx ? 'rotate-180' : ''}`} style={{ color: subtextColor }} />
                                            </div>
                                        </div>

                                        <div className={`mt-3 text-sm overflow-hidden transition-[max-height] duration-300 ${openIndex === idx ? 'max-h-screen' : 'max-h-0'}`} style={{ color: bodyColor }}>
                                            <div dangerouslySetInnerHTML={{ __html: item.a }} />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <ExpertSection />

                <div className="gap-2 sm:mt-6 flex items-center mt-6 text-xs p-3 rounded-xl" style={{ background: isDark ? 'rgba(182,138,53,0.08)' : '#B68A35/5', border: `1px solid ${cardBorder}` }}>
                    <Info className="w-4 h-4 text-[#B68A35] shrink-0" />
                    <p className="text-[11px] leading-relaxed" style={{ color: bodyColor }}>
                        <strong>{data.disclaimer?.title || "Disclaimer:"}</strong> {data.disclaimer?.text || "Answers are based on publicly available information and are updated regularly. Investment outcomes vary; consult a licensed financial advisor before making decisions. Last updated: 22 February 2026"}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section12;