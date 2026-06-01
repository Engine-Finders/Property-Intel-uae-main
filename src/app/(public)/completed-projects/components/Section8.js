"use client";

import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

const faqs = [
    // Financial & Ownership
    {
        category: "Financial & Ownership",
        q: "What are the current service charges for Emirates Hills villas?",
        a: (
            <>
                <p>
                    Current service charges for Emirates Hills average <strong>AED 11.50/sqft annually</strong>, based on DLD Mollak Service Charge Index data (Q4 2025). For a typical 15,000 sqft villa, this equates to approximately <strong>AED 172,500 per year</strong> (AED 14,375 monthly). Charges cover 24/7 security, landscaping, lake maintenance, road upkeep, and community amenities.
                </p>
                <p className="mt-2">
                    Service charges have increased gradually since handover (2003–2008), averaging <strong>3–5% annually</strong>, aligned with amenity upgrades and inflation. Final charges are confirmed via owners' association budgets; request the last 3 years of statements during due diligence.
                </p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> DLD Mollak Service Charge Index (Q4 2025)</p>
            </>
        ),
    },
    {
        category: "Financial & Ownership",
        q: "How has the property value performed since handover?",
        a: (
            <>
                <p>
                    Based on DLD transaction data aggregated via DXBInteract, Emirates Hills has delivered an estimated <strong>annualised appreciation of 5.5–7.0%</strong> since initial handover (2003–2008) to Q1 2026 — outpacing Dubai's overall villa market average (~4.5–5.5% annualised) over the same period.
                </p>
                <p className="mt-2">
                    Current market values for <strong>5-bedroom villas (12,000–18,000 sqft)</strong> range between AED 28–45M, translating to approximately AED 3,100–3,800 per sqft. Golf/lake-front properties command premiums of <strong>15–25%</strong> over standard orientations.
                </p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> DXBInteract DLD transaction data (Q1 2026)</p>
            </>
        ),
    },
    {
        category: "Financial & Ownership",
        q: "What is the process for buying a resale unit in Emirates Hills?",
        a: (
            <>
                <p className="mb-3">The resale process follows standard DLD freehold procedures:</p>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                    <li><strong>Offer & MOU:</strong> Buyer and seller sign a Memorandum of Understanding outlining price, payment terms, and conditions.</li>
                    <li><strong>NOC Application:</strong> Seller applies for a No Objection Certificate from Emaar Community Management (typically 5–7 business days).</li>
                    <li><strong>Due Diligence:</strong> Buyer verifies title deed, service charge status, and any encumbrances via Dubai REST app.</li>
                    <li><strong>Transfer Appointment:</strong> Both parties attend DLD office (or use trustee service) for title deed transfer; 4% DLD transfer fee applies (typically split per agreement).</li>
                    <li><strong>Utility Transfer:</strong> DEWA, cooling, and other utilities transferred to new owner post-completion.</li>
                </ol>
                <p className="mt-3">Mortgage financing is available for eligible buyers; banks typically apply <strong>50–60% LTV</strong> for ultra-luxury resale properties. Engage a RERA-licensed broker to navigate documentation and timeline.</p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> DLD buyer's guide, RERA regulations</p>
            </>
        ),
    },

    // Community & Lifestyle
    {
        category: "Community & Lifestyle",
        q: "How is the community management now?",
        a: (
            <>
                <p className="mb-3">Emirates Hills is managed by <strong>Emaar Community Management</strong>, which has overseen the community continuously since first handover (2003). Key performance indicators:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li><strong>Maintenance Response:</strong> Urgent issues (security, utilities) addressed within 24 hours; cosmetic requests typically resolved within 3–5 business days.</li>
                    <li><strong>Amenity Upkeep:</strong> Landscaping, lakes, and security infrastructure receive scheduled maintenance; capital improvements (golf course refurbishment 2015, lake filtration upgrade 2019) funded via service charges with owner consultation.</li>
                    <li><strong>Communication:</strong> Annual owners' association meetings publish budget summaries; service charge adjustments communicated 60+ days in advance.</li>
                </ul>
                <p className="mt-3">Resident feedback over the last 24 months rates community management <strong>"high"</strong> for transparency and responsiveness, though some owners note delays for non-urgent cosmetic requests during peak periods.</p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> Emaar Community Management disclosures, aggregated resident feedback (Q1 2025–Q1 2026)</p>
            </>
        ),
    },
    {
        category: "Community & Lifestyle",
        q: "What are the pros and cons of living in Emirates Hills?",
        a: (
            <>
                <p className="mb-2 font-semibold text-gray-700">Pros:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-4">
                    <li><strong>Privacy & Security:</strong> Gated entry, 24/7 manned checkpoints, and low-density layout (25% green space).</li>
                    <li><strong>Mature Landscaping:</strong> 20+ year-old tree canopy, established lakes, and manicured grounds.</li>
                    <li><strong>Capital Stability:</strong> Historical appreciation (5.5–7.0% annualised) and limited resale turnover support long-term value.</li>
                    <li><strong>Amenity Access:</strong> Direct Montgomerie Golf Club membership, private lake views, and extensive trail network.</li>
                </ul>
                <p className="mb-2 font-semibold text-gray-700">Cons:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li><strong>Car Dependency:</strong> No metro within walking distance; daily errands require vehicle (8–12 minutes to retail).</li>
                    <li><strong>Service Charge Evolution:</strong> Charges have increased cumulatively by 44–92% since original estimates; budget for 3–5% annual adjustments.</li>
                    <li><strong>Renovation Approvals:</strong> Exterior modifications require Emaar Community Management approval (4–8 week review).</li>
                    <li><strong>Age-Related Maintenance:</strong> Villas handed over 2004–2008 may require HVAC, electrical, or smart-home system updates.</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> Aggregated verified resident feedback (Q1 2025–Q1 2026)</p>
            </>
        ),
    },
    {
        category: "Community & Lifestyle",
        q: "Are there any known issues with building maintenance in Emirates Hills?",
        a: (
            <>
                <p className="mb-3">Based on aggregated resident feedback and Emaar Community Management records (Q1 2025–Q1 2026):</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li><strong>HVAC Systems:</strong> Original installations (2003–2008) may be due for replacement; budget <strong>AED 50,000–150,000</strong> for full system upgrades depending on villa size.</li>
                    <li><strong>Exterior Finishes:</strong> Stucco and stone cladding may require repointing or resealing after two decades of UAE climate exposure; typical refresh cost <strong>AED 20,000–60,000</strong>.</li>
                    <li><strong>Smart-Home Integration:</strong> Many original villas lack modern automation; retrofitting requires coordination with Emaar Community Management for structural approvals.</li>
                    <li><strong>Snagging History:</strong> Early handovers (2003–2006) reported minor cosmetic defects resolved within warranty. Structural issues remain exceptionally rare (&lt;1% of villas).</li>
                </ul>
                <p className="mt-3">Commission an independent building survey before purchase to identify property-specific needs.</p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> Emaar Community Management records, resident feedback (Q1 2025–Q1 2026)</p>
            </>
        ),
    },

    // Location & Amenities
    {
        category: "Location & Amenities",
        q: "What schools are currently available nearby?",
        a: (
            <>
                <p className="mb-3">Emirates Hills residents access multiple KHDA-rated schools within 8–15 minutes by vehicle:</p>
                <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="w-full text-sm text-gray-600 text-left">
                        <thead className="bg-[#B68A35]/10 text-gray-700">
                            <tr>
                                <th className="px-3 py-2 font-semibold">School</th>
                                <th className="px-3 py-2 font-semibold">Curriculum</th>
                                <th className="px-3 py-2 font-semibold">KHDA Rating</th>
                                <th className="px-3 py-2 font-semibold">Distance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                ["JESS Arabian Ranches", "British (IB)", "Outstanding", "8 min"],
                                ["Dubai British School", "British", "Very Good", "10 min"],
                                ["Nord Anglia School", "British (IB)", "Outstanding", "12 min"],
                                ["Greenfield International", "IB", "Good", "15 min"],
                                ["Jebel Ali School", "British", "Very Good", "15 min"],
                            ].map(([school, curr, rating, dist]) => (
                                <tr key={school} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 font-medium text-gray-800">{school}</td>
                                    <td className="px-3 py-2">{curr}</td>
                                    <td className="px-3 py-2">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${rating === 'Outstanding' ? 'bg-green-100 text-green-700' : rating === 'Very Good' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{rating}</span>
                                    </td>
                                    <td className="px-3 py-2">{dist}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-3 text-xs text-gray-500"><strong>Note:</strong> No school is within walking distance; all require vehicular transport. <strong>Source:</strong> KHDA School Directory 2025; drive times validated via Google Maps (February 2026).</p>
            </>
        ),
    },
    {
        category: "Location & Amenities",
        q: "What retail and healthcare facilities are operational now?",
        a: (
            <>
                <p className="mb-2 font-semibold text-gray-700">Retail (All Operational):</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-4">
                    <li><strong>Circle Mall (8 min):</strong> Supermarkets, dining, specialty retail.</li>
                    <li><strong>Mall of the Emirates (12 min):</strong> Luxury retail, entertainment, Carrefour.</li>
                    <li><strong>Dubai Marina Mall (10 min):</strong> Dining, boutique retail, grocery options.</li>
                    <li>Community retail zones within Emirates Hills offer limited convenience outlets; major shopping requires a short drive.</li>
                </ul>
                <p className="mb-2 font-semibold text-gray-700">Healthcare (All Operational):</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li><strong>Mediclinic Parkview Hospital (10 min):</strong> 24/7 emergency, comprehensive specialist coverage.</li>
                    <li><strong>King's College Hospital Dubai (15 min):</strong> Tertiary care, pediatrics, maternity.</li>
                    <li>Multiple dental/specialist clinics within 15 min: Dermatology, orthopedics, wellness centers.</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> Google Business listings verified February 2026; RTA infrastructure records.</p>
            </>
        ),
    },
    {
        category: "Location & Amenities",
        q: "Is Emirates Hills suitable for families with young children?",
        a: (
            <>
                <p className="mb-3">Yes, with considerations:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li><strong>Safety:</strong> Gated community with 24/7 security, low traffic volume, and dedicated pedestrian paths support safe outdoor play.</li>
                    <li><strong>Amenities:</strong> Children's play areas, community pools, and extensive green spaces provide recreation; Montgomerie Golf Club offers junior programs.</li>
                    <li><strong>School Access:</strong> Multiple KHDA-rated schools within 8–15 minutes; all require vehicular transport.</li>
                    <li><strong>Community Vibe:</strong> Low-density, privacy-focused environment attracts long-term families; neighbour networks support social connections.</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600"><strong>Consideration:</strong> Daily convenience (groceries, pharmacies) requires driving; families prioritising walkable retail may prefer more urban communities.</p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> Aggregated verified resident feedback (Q1 2025–Q1 2026)</p>
            </>
        ),
    },

    // Investment & Resale
    {
        category: "Investment & Resale",
        q: "What is the typical time-on-market for resale villas in Emirates Hills?",
        a: (
            <>
                <p className="mb-3">Based on DXBInteract transaction analysis (Q1 2025–Q1 2026):</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li><strong>Well-Priced, Turnkey Villas:</strong> 60–90 days average time-on-market.</li>
                    <li><strong>Properties Requiring Updates:</strong> 120+ days; buyers often factor renovation costs into offers.</li>
                    <li><strong>Premium Plot Positions (golf/lake view):</strong> Often sell faster (45–60 days) due to scarcity.</li>
                </ul>
                <p className="mt-3">Transaction velocity reflects the community's low-turnover nature; approximately <strong>65% of recent buyers are end-users</strong> (families, business owners), while 35% are long-term investors holding for 5+ years.</p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> DXBInteract transaction analysis (Q1 2025–Q1 2026)</p>
            </>
        ),
    },
    {
        category: "Investment & Resale",
        q: "Are mortgages available for resale purchases in Emirates Hills?",
        a: (
            <>
                <p className="mb-3">Yes, mortgage financing is available for eligible buyers. Typical terms as of Q1 2026:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li><strong>LTV Caps:</strong> 50–60% for ultra-luxury resale properties (per UAE Central Bank guidelines).</li>
                    <li><strong>Interest Rates:</strong> Fixed 4.2–5.2% or variable (EIBOR + 2.5–3.5%).</li>
                    <li><strong>Valuation:</strong> Banks commission independent valuations; approved loan amounts may differ from agreed purchase price.</li>
                    <li><strong>Documentation:</strong> Title deed, service charge clearance, and buyer income verification required.</li>
                </ul>
                <p className="mt-3">Engage a mortgage specialist early to assess eligibility and timeline; pre-approval strengthens offer positioning.</p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> UAE Central Bank mortgage guidelines (Q1 2026)</p>
            </>
        ),
    },
    {
        category: "Investment & Resale",
        q: "What should I budget beyond the purchase price for a resale villa?",
        a: (
            <>
                <p className="mb-3">Beyond the agreed purchase price, budget for:</p>
                <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="w-full text-sm text-gray-600 text-left">
                        <thead className="bg-[#B68A35]/10 text-gray-700">
                            <tr>
                                <th className="px-3 py-2 font-semibold">Cost Component</th>
                                <th className="px-3 py-2 font-semibold">Typical Amount</th>
                                <th className="px-3 py-2 font-semibold">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                ["DLD Transfer Fee", "4% of purchase price", "Typically split buyer/seller per agreement"],
                                ["Title Deed / Admin Fees", "~AED 4,000", "Fixed DLD charges"],
                                ["Mortgage Registration (if applicable)", "0.25% of loan amount", "Paid to DLD"],
                                ["Bank Arrangement Fee", "~1% + VAT of loan", "Varies by lender"],
                                ["Independent Building Survey", "AED 15,000–35,000", "Recommended for age-related assessment"],
                                ["Utility Transfer (DEWA, cooling)", "AED 2,000–5,000", "One-time connection fees"],
                                ["Initial Service Charge Proration", "Pro-rated to handover", "Confirmed via Emaar Community Management"],
                            ].map(([comp, amt, note]) => (
                                <tr key={comp} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 font-medium text-gray-800">{comp}</td>
                                    <td className="px-3 py-2 text-[#B68A35] font-semibold">{amt}</td>
                                    <td className="px-3 py-2 text-gray-500 text-xs">{note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-3">Total additional costs typically approximate <strong>7–8% of purchase price</strong> for cash buyers; mortgage buyers should factor in bank fees and valuation costs.</p>
            </>
        ),
    },

    // Verification & Due Diligence
    {
        category: "Verification & Due Diligence",
        q: "How can I verify the transaction history for a specific Emirates Hills plot?",
        a: (
            <>
                <p className="mb-3">Use the <strong>Dubai REST app</strong> (official DLD platform) to access:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Full ownership chain and transfer history for the specific plot.</li>
                    <li>Registered encumbrances, mortgages, or liens.</li>
                    <li>Service charge payment status via Mollak integration.</li>
                    <li>Title deed authenticity and issuance date.</li>
                </ul>
                <p className="mt-3">Alternatively, engage a <strong>RERA-licensed broker</strong> to request a comprehensive property report. Never rely solely on seller-provided documentation; independent verification via DLD channels is essential.</p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> Dubai Land Department (DLD), Dubai REST app</p>
            </>
        ),
    },
    {
        category: "Verification & Due Diligence",
        q: "Are there any upcoming infrastructure projects that could affect Emirates Hills?",
        a: (
            <>
                <p className="mb-3">As of Q1 2026, no major new infrastructure projects are announced that directly impact Emirates Hills' immediate vicinity. The community benefits from established connectivity:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li><strong>Road Network:</strong> Direct access to Al Khail Road (E44) and Sheikh Zayed Road (E11); recent RTA upgrades on Al Qudra Road (191% capacity increase) improve southern corridor connectivity.</li>
                    <li><strong>Airport Access:</strong> Al Maktoum International (DWC) expansion (AED 128 billion) is 10 minutes away; this primarily impacts Dubai South communities.</li>
                    <li><strong>Metro:</strong> No metro stations within walking distance; nearest stations (DMCC, Sobha Realty) are 12–15 minutes by vehicle.</li>
                </ul>
                <p className="mt-3">Monitor RTA and <strong>Dubai 2040 Master Plan</strong> announcements for long-term transport developments; verify via official government channels.</p>
                <p className="mt-3 text-xs text-gray-500"><strong>Source:</strong> RTA infrastructure records, Dubai 2040 Master Plan (Q1 2026)</p>
            </>
        ),
    },
];

const categories = [...new Set(faqs.map(f => f.category))];

const Section8 = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(prev => prev === i ? null : i);

    return (
        <section className="w-full bg-[#FCFBFA] py-2 sm:py-5 font-sans antialiased text-[#1A1A1A]">
            <div className="max-w-[1400px] mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center mb-8">
                    <h2 className="text-3xl lg:text-4xl font-serif text-[#1A1A1A] mb-2">
                        Frequently Asked Questions —{" "}
                        <span className="text-[#B68A35]">Emirates Hills</span>
                    </h2>
                    <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                        Answers compiled from DLD transaction records, Emaar Community Management disclosures, KHDA school listings, and verified resident feedback (Q1 2025–Q1 2026).
                    </p>
                </div>

                {/* FAQ grouped by category */}
                <div className="space-y-8">
                    {categories.map(category => {
                        const categoryFaqs = faqs.filter(f => f.category === category);
                        return (
                            <div key={category}>
                                <h3 className="text-lg font-serif font-semibold text-[#1A1A1A] mb-3 pb-2 border-b border-[#B68A35]/30">
                                    {category}
                                </h3>
                                <div className="bg-white border border-[#F3EFE9] rounded-2xl p-2 sm:p-6 shadow-sm">
                                    <div className="divide-y divide-gray-100">
                                        {categoryFaqs.map((item) => {
                                            const globalIdx = faqs.indexOf(item);
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
                                                                <h4 className="text-sm font-semibold text-gray-800 leading-snug">{item.q}</h4>
                                                                <div className="w-5 h-5 shrink-0 flex items-center justify-center mt-0.5">
                                                                    <ChevronDown className={`w-full h-full text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                                                </div>
                                                            </div>

                                                            <div className={`mt-3 text-sm text-gray-600 overflow-hidden transition-[max-height] duration-300 ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
                                                                {item.a}
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
                <div className="gap-2 sm:mt-6 flex items-start mt-6 text-xs text-gray-500 bg-[#B68A35]/5 p-3 rounded-xl">
                    <Info className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                        <strong>Source Transparency:</strong> Answers are compiled from Dubai Land Department (DLD) transaction records via DXBInteract.com, Emaar Community Management disclosures, KHDA school listings, and aggregated verified resident feedback (Q1 2025–Q1 2026). All information is for educational purposes; verify specific property details with official DLD channels and Emaar Community Management before transacting. <strong>Last updated: Q1 2026.</strong>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section8;