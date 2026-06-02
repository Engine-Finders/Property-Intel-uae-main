"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Info } from 'lucide-react';
import ExpertSection from './ExpertSection';
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

const faqs = [
    {
        q: 'Is Emaar a reliable developer in Dubai?',
        a: (
            <>
                <p>
                    Yes, Emaar Properties is widely regarded as one of the most reliable developers in the UAE. Founded in 1997, it has delivered over 123,500+ residential units globally including iconic projects like Burj Khalifa and Dubai Mall. Emaar is publicly traded on the Dubai Financial Market (DFM: EMAAR) and maintains strong financial metrics with cash reserves of AED 28.25 billion as of 31 December 2025. The company is backed by the Investment Corporation of Dubai (22.27% stake), adding institutional credibility. While most projects deliver on schedule (96% on-time record), some large-scale developments have experienced multi-year delays (4-10+ years for iconic projects like Dubai Creek Tower) based on DLD handover records. Resident reviews generally praise build quality and community design (78% positive sentiment), though maintenance response times are a recurring theme (ECM reviews average 1.0-3.3/5). Overall, Emaar's financial transparency, government alignment, and track record make it a low-risk choice for buyers seeking long-term value.
                </p>
                <p className="mt-3 text-xs"><strong>Source:</strong> Emaar Annual Report 2025, DLD handover records, DFM filings (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: 'What payment plans does Emaar offer for off-plan properties?',
        a: (
            <>
                <p className="mb-2">Emaar typically offers flexible payment structures for off-plan purchases. Common plans include:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>80/20 plans:</strong> 10% booking fee, 70% during construction (spread over installments), 20% on handover</li>
                    <li><strong>90/10 plans:</strong> For premium villa collections with higher upfront commitment</li>
                    <li><strong>Post-handover options:</strong> Available for select projects, allowing 40-50% payment after handover over 2-5 years</li>
                </ul>
                <p className="mt-3 text-xs"><strong>Note:</strong> Payment terms vary by project, launch phase, and promotions. All off-plan funds are held in RERA-regulated escrow accounts. <strong>Source:</strong> Emaar official website, RERA off-plan sales guidelines (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: 'Does Emaar deliver projects on time?',
        a: (
            <>
                <p>
                    Emaar has a strong overall delivery record, though timelines vary by project complexity. Based on PropertyIntel analysis of DLD handover data, approximately 96% of Emaar's projects in the last five years were handed over within 6 months of the original date. Notable delays have occurred for iconic or infrastructure-heavy developments such as Dubai Creek Tower due to design and foundation engineering, and certain phases in Dubai Creek Harbour because of infrastructure coordination. Emaar generally communicates schedule updates transparently and follows RERA guidelines regarding buyer rights. For off-plan purchases, always review the expected handover date in the Sales and Purchase Agreement and factor in a reasonable buffer for planning purposes.
                </p>
                <p className="mt-3 text-xs"><strong>Source:</strong> DLD handover records 2020-2025, Emaar project announcements, Dubai Invest (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: "What are service charges like in Emaar communities?",
        a: (
            <>
                <p className="mb-2">Service charges vary by location, property type, and building age. Based on DLD Mollak data (2025):</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>The Greens (apartments):</strong> Average AED 8-11 per sqft annually</li>
                    <li><strong>Dubai Hills Estate (apartments):</strong> Average AED 18-20 per sqft annually</li>
                    <li><strong>Arabian Ranches (villas):</strong> Average AED 2.44-3+ per sqft annually</li>
                    <li><strong>Downtown Dubai (apartments):</strong> Average AED 21-68 per sqft annually</li>
                </ul>
                <p className="mt-3 text-xs">These charges are regulated by RERA and published via the DLD Mollak portal. Emaar Community Management typically adjusts charges annually by ~2-4%. <strong>Source:</strong> DLD Mollak Service Charge Index 2025 (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: 'Can foreigners buy property from Emaar?',
        a: (
            <>
                <p className="mb-2">Yes. Foreigners can purchase freehold property from Emaar in Dubai's designated freehold areas, including:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Downtown Dubai, Dubai Marina, Dubai Hills Estate</li>
                    <li>Dubai Creek Harbour, Arabian Ranches, The Valley</li>
                    <li>Emaar South, Dubai South</li>
                </ul>
                <p className="mt-2">There are no nationality restrictions for freehold purchases. Investments of AED 750,000+ may qualify for a 2-year residency visa, while AED 2M+ may qualify for a 10-year Golden Visa. Always follow DLD procedures and consult a RERA-certified agent for registration and visa guidance.</p>
                <p className="mt-3 text-xs"><strong>Source:</strong> Dubai Land Department, Emaar sales terms, UAE residency regulations (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: 'How does Emaar compare to Damac or Aldar?',
        a: (
            <>
                <p>
                    Emaar, Damac, and Aldar are leading UAE developers with distinct market positions. Emaar is known for master-planned communities and iconic landmarks (Burj Khalifa, Dubai Mall) with strong government backing and the largest Dubai portfolio. Aldar is Abu Dhabi's flagship developer, known for steady delivery and government projects. Damac focuses on luxury branded residences and aggressive marketing but has mixed after-sales reviews. In short, Emaar offers broader Dubai inventory and higher brand recognition; Aldar leads in Abu Dhabi; Damac targets branded luxury buyers. Always compare project-level terms rather than relying on reputation alone.
                </p>
                <p className="mt-3 text-xs"><strong>Source:</strong> ValuStrat UAE Developer Comparison 2025, DLD transaction data (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: "What is Emaar's most popular project right now?",
        a: (
            <>
                <p className="mb-2">Emaar's most iconic project remains Burj Khalifa. In terms of sales velocity and interest (2025-2026), top-performing projects include:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Dubai Hills Estate — master community with golf course, parks, schools</li>
                    <li>The Valley — affordable townhouses targeting families</li>
                    <li>Dubai Creek Harbour — waterfront living with Dubai Creek Tower anchor</li>
                    <li>The Oasis — luxury villa collection in Dubailand</li>
                </ul>
                <p className="mt-3 text-xs"><strong>Source:</strong> DLD 2025 transaction data, Emaar sales reports, Google Trends UAE (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: 'Does Emaar offer post-handover payment plans?',
        a: (
            <>
                <p>
                    Yes — for select projects and promotional periods Emaar offers post-handover plans. Examples include Dubai South (36 months post-handover), Dubai Creek Harbour (40% post-handover over 2 years) and The Valley (up to 5 years post-handover for townhouses). Terms vary, may include administrative fees or interest, and are subject to availability.
                </p>
                <p className="mt-3 text-xs"><strong>Source:</strong> Emaar project brochures 2025-2026, authorized agent disclosures (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: 'What are common complaints about Emaar communities?',
        a: (
            <>
                <p className="mb-2">Aggregated resident feedback highlights a few recurring concerns:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Slow maintenance response for non-urgent issues</li>
                    <li>Service charge increases with requests for clearer breakdowns</li>
                    <li>Limited visitor parking in high-density towers</li>
                    <li>Construction noise and dust in developing masterplan phases</li>
                </ul>
                <p className="mt-2">Overall sentiment remains positive (~78-85% positive reviews), with most complaints focused on post-handover management rather than construction quality.</p>
                <p className="mt-3 text-xs"><strong>Source:</strong> Google Reviews / PropertyFinder.ae / Bayut.com aggregation (2025-2026) (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: 'How can I buy an off-plan property from Emaar?',
        a: (
            <>
                <p className="mb-2">Typical steps to buy off-plan from Emaar:</p>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li><strong>Research:</strong> Visit Emaar's website or contact authorized agents to pick a project and unit.</li>
                    <li><strong>Select:</strong> Choose unit configuration, floor and view.</li>
                    <li><strong>Reserve:</strong> Pay booking fee (typically 5-10%) to secure the unit.</li>
                    <li><strong>Sign SPA:</strong> Execute Sales & Purchase Agreement outlining schedule and handover date.</li>
                    <li><strong>Register:</strong> SPA is registered with DLD's Oqood to secure ownership rights.</li>
                    <li><strong>Pay:</strong> Follow payment plan; funds held in RERA escrow.</li>
                    <li><strong>Handover:</strong> Final payments, snagging and possession on completion.</li>
                </ol>
                <p className="mt-3 text-xs"><strong>Source:</strong> DLD buyer's guide, Emaar sales process documentation, RERA regulations (Last updated: 22 February 2026)</p>
            </>
        ),
    },
    {
        q: 'Are Emaar properties good for rental investment?',
        a: (
            <>
                <p>
                    Emaar properties can be suitable for rental investment, with returns varying by location and type. Typical 2025 metrics include: apartments in Dubai Hills Estate/Downtown: gross yields ~4-6%; villas in Arabian Ranches/The Valley: ~3.5-5%. Waterfront Creek Harbour units may have lower yields but potential capital appreciation. Model cash flows including service charges, vacancy, and potential handover delays before committing.
                </p>
                <p className="mt-3 text-xs"><strong>Source:</strong> ValuStrat Price Index Q4 2025, PropertyIntel rental yield analysis (Last updated: 22 February 2026)</p>
            </>
        ),
    },
];

const Section12 = () => {
    const { t, isDark, dark } = useThemeStyles();
    const [openIndex, setOpenIndex] = useState(null);

    // Card colors matching TopDevelopersSection pattern
    const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
    const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FCFBFA";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    const toggle = (i) => {
        setOpenIndex((prev) => (prev === i ? null : i));
    };

    return (
        <section className="w-full py-2 sm:py-5 font-sans antialiased" style={{ background: sectionBg }}>
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl lg:text-4xl font-serif mb-2" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        Frequently Asked Questions About <span className="text-[#B68A35]">Emaar Properties</span>
                    </h2>
                    <p className="mb-6 max-w-2xl text-center mx-auto" style={{ color: bodyColor }}>
                        Find answers to the most common questions about buying from Emaar, payment plans, delivery track record, and more.
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
                                            {item.a}
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
                        <strong>Disclaimer:</strong> Answers are based on publicly available information and are updated regularly. Investment outcomes vary; consult a licensed financial advisor before making decisions. Last updated: 22 February 2026
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section12;