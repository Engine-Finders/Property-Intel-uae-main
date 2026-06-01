"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    HiOutlineBuildingOffice2,
    HiOutlineInformationCircle,
    HiOutlineCheckCircle,
    HiOutlineLightBulb,
    HiOutlineCalendarDays
} from "react-icons/hi2";
import { BsBuildings, BsCurrencyEuro, BsStar, BsChevronDown, BsChevronUp, BsArrowRight } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { LuInfo, LuShieldCheck } from "react-icons/lu";
import { MdCalendarToday, MdOutlineVerifiedUser, MdTrendingUp } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { GoShieldCheck } from "react-icons/go";
import { IoDocumentOutline } from "react-icons/io5";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaRegSmile, FaTree, FaHome } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { LuWheat } from "react-icons/lu";
import { PiHouseLineLight } from "react-icons/pi";
import { TbBuildingBurjAlArab } from "react-icons/tb";
import { ExternalLink, Building2 } from 'lucide-react';
import ExpertSection from './ExpertSection';
import { TbBulb } from "react-icons/tb";
import { BsShield } from "react-icons/bs";

// Data-driven community assessments for the Asset Condition table
const COMMUNITY_ASSESSMENTS = [
    {
        id: 'the-greens',
        name: 'The Greens',
        age: 23,
        condition: 'Good',
        Icon: LuWheat,
        notes: [
            { type: 'positive', text: 'Emaar launched The Greens in 2001 and completed the first phase in 2003.' },
            { type: 'positive', text: 'Residents praise "great community for families", "great landscaping", and "extremely well maintained" public areas.' },
            { type: 'warning', text: 'However, some report maintenance issues and unhelpful management follow-up.' }
        ]
    },
    {
        id: 'the-springs',
        name: 'The Springs',
        age: 22,
        condition: 'Good',
        Icon: PiHouseLineLight,
        notes: [
            { type: 'positive', text: 'Construction of The Springs 1370 Villas project started in 2004.' },
            { type: 'positive', text: 'The Springs 2 sub-community took 2 years to complete, starting in 2005 and completed in 2007.' },
            { type: 'positive', text: 'Mature, well-managed environment with low-rise townhouses and green corridors maintained.' }
        ]
    },
    {
        id: 'emirates-hills',
        name: 'Emirates Hills',
        age: 23,
        condition: 'Excellent',
        Icon: BsStar,
        notes: [
            { type: 'positive', text: 'Completed in December 2003.' },
            { type: 'positive', text: 'One of the most prestigious and elite residential communities in the UAE" with ultra‑luxury villas and world‑class golf views.' },
            { type: 'positive', text: 'Features 24/7 gated security and controlled access. Only around 600 villas total, ensuring exclusivity.  Known for strong capital appreciation.' }
        ]
    },
    {
        id: 'dubai-marina',
        name: 'Dubai Marina',
        age: 23,
        condition: 'Good',
        Icon: TbBuildingBurjAlArab,
        notes: [
            { type: 'positive', text: 'Dubai Marina Towers (Emaar 6 Towers) were completed in 2003' },
            { type: 'positive', text: 'The complex includes six residential towers with over 1,100 apartments.  Residents praise "Emaar build quality" noting properties "have aged better than many other developments around Dubai Marina' },
            { type: 'warning', text: 'However, maintenance is a recurring concern with reports of slow response times and unresolved issues' }
        ]
    }
];
export default function Section6() {
    const [activeTab, setActiveTab] = useState('structure');

    return (
        <section className="bg-white font-sans text-[#1A1A1A]">
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
                        Emaar Community Management:
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        Long-Term Value Analysis
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base text-gray-600 leading-relaxed font-medium">
                        We analyse how Emaar manages communities post-handover, service charge trends, and asset condition to assess long-term preservation.
                    </p>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-[1400px] mx-auto px-2 -mt-12 relative z-20 pb-20">
                <div className="bg-white border border-[#F3EFE9] rounded-xl shadow-sm overflow-hidden">
                    <div className="flex flex-row items-stretch gap-1  lg:px-0 border-b border-[#F3EFE9]">
                        <TabButton
                            active={activeTab === 'structure'}
                            onClick={() => setActiveTab('structure')}
                            icon={<HiOutlineBuildingOffice2 className="text-2xl sm:text-3xl" />}
                            label="Management Structure"
                        />
                        <TabButton
                            active={activeTab === 'charges'}
                            onClick={() => setActiveTab('charges')}
                            icon={<AiOutlineDollar className="text-2xl sm:text-3xl" />}
                            label="Service Charges"
                        />
                        <TabButton
                            active={activeTab === 'rating'}
                            onClick={() => setActiveTab('rating')}
                            icon={<BsStar className="text-2xl sm:text-3xl" />}
                            label="Asset Condition Rating"
                        />
                    </div>

                    {/* --- TAB CONTENT AREA --- */}
                    <div className="p-2 sm:p-6 lg:p-6 min-h-[480px]">
                        {activeTab === 'structure' && <ManagementStructureView />}
                        {activeTab === 'charges' && <ServiceChargesView />}
                        {activeTab === 'rating' && <AssetConditionView />}
                    </div>
                </div>

                {/* --- SHARED FOOTER BLOCKS (Owner Satisfaction & Insights) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <SatisfactionCard />
                    <AnalystInsightCard />
                </div>

                <ExpertSection />

                {/* --- METADATA FOOTER --- */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-6 p-2 sm:p-4 rounded-2xl border border-[#F3EFE9] bg-[#fdfaf8]">
                    <div className="flex items-start gap-3 max-w-2xl">
                        <div className="w-5 h-5 rounded-full bg-[#FBF9F6] border border-[#F3EFE9] flex items-center justify-center shrink-0 mt-0.5">
                            <LuInfo className="text-[#B68A35] w-5 h-5" />
                        </div>
                        <p className="text-[10px] lg:text-[11px] text-gray-500 leading-relaxed">
                            All service charge data sourced from DLD Mollak Index where publicly available; placeholders indicate backend-populated values for real-time accuracy. Actual charges vary by building, floor, and unit size. Asset condition ratings are PropertyIntel proprietary assessments based on site visits and aggregated owner feedback.
                        </p>
                    </div>
                    <div className="bg-[#FBF9F6] border border-[#F3EFE9] rounded-lg p-3 flex items-center gap-3 shrink-0">
                        <MdCalendarToday className="text-[#B68A35] w-4 h-4" />
                        <span className="text-[11px] font-medium text-gray-600">Last updated: 22 February 2026</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- TAB SUB-COMPONENTS ---

function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1  flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-2 sm:py-5 px-2 sm:px-4 transition-all relative border-b-2
        ${active ? 'text-[#B68A35] border-[#B68A35] bg-white' : 'text-gray-400 border-transparent bg-[#FBF9F6] hover:text-gray-600'}
      `}
        >
            {icon}
            <span className="font-bold text-[10px] sm:text-xs tracking-wide uppercase">{label}</span>
        </button>
    );
}

function ManagementStructureView() {
    return (
        <div className="space-y-8 py-4">
            <h3 className="text-lg lg:text-xl font-serif font-bold text-[#1A1A1A]">Management Structure</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Card 1 */}
                <div className="bg-white border border-[#F3EFE9] rounded-xl p-2 sm:p-8 flex gap-2 sm:gap-6 shadow-sm">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#fbf6ec] flex items-center justify-center shrink-0 border border-[#F3EFE9]">
                        <HiOutlineBuildingOffice2 className="text-[#B68A35] w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    {/* Added 'flex flex-col flex-1' here */}
                    <div className="flex flex-col flex-1">
                        <div>
                            <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest sm:mb-2">Management Entity</p>
                            <h4 className="text-sm sm:text-lg font-bold text-[#1A1A1A] mb-3 font-serif">Emaar Community Management (ECM)</h4>
                            <span className="inline-block px-2.5 py-1 bg-white text-[#B68A35] text-[10px] border border-[#B68A35] font-bold rounded-2xl mb-3">Dedicated Subsidiary</span>
                            <p className="text-[12px] sm:text-sm text-gray-600 leading-relaxed">
                                Emaar Community Management (ECM) Management Type: Dedicated subsidiary Note: ECM operates as a wholly-owned subsidiary managing all Emaar residential communities, ensuring consistent service standards across master developments including Downtown Dubai, Dubai Hills Estate, and Arabian Ranches. Source: Emaar Official Website - Community Management; Emaar Annual Report 2025
                            </p>
                        </div>
                        {/* Changed mt-4 to mt-auto and added pt-4 */}
                        <div className="mt-auto pt-4 flex items-center gap-2 text-[12px] text-gray-500">
                            <IoDocumentOutline className="w-5 h-5 text-[#B68A35]" />
                            <span>Source: Emaar Official Website / Annual Report 2025</span>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-[#F3EFE9] rounded-xl p-2 sm:p-8 flex gap-2 sm:gap-6 shadow-sm">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#fbf6ec] flex items-center justify-center shrink-0 border border-[#F3EFE9]">
                        <GoShieldCheck className="text-[#B68A35] w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    {/* Added 'flex flex-col flex-1' here */}
                    <div className="flex flex-col flex-1">
                        <div>
                            <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Mollak Integration</p>
                            <div className="flex items-center gap-2 mb-3">
                                <h4 className="text-sm sm:text-lg font-bold text-[#1A1A1A] font-serif">Yes</h4>
                                <HiOutlineCheckCircle className="text-white bg-green-500 rounded-full w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <p className="text-[12px] sm:text-sm text-gray-600 leading-relaxed">
                                Yes Note: All Emaar-managed communities are registered on the DLD Mollak portal, enabling transparent service charge disclosure and owner access to annual statements. Source: DLD Mollak Service Charge Index 2025
                            </p>
                        </div>
                        {/* Changed mt-4 to mt-auto and added pt-4 */}
                        <div className="mt-auto pt-4 flex items-center gap-2 text-[12px] text-gray-500">
                            <IoDocumentOutline className="w-5 h-5 text-[#B68A35]" />
                            <span>Source: DLD Mollak Service Charge Index 2025</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

const SourceLink = ({ label, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[11px] font-medium text-gray-600 hover:text-[#B68A35] group"
    >
        <span className="w-2 h-2 bg-gray-300 group-hover:bg-[#B68A35] rounded-full" />
        <span className="underline decoration-gray-200 underline-offset-4 group-hover:decoration-[#B68A35] text-md">{label}</span>
        <ExternalLink className="w-4 h-4 text-[#B68A35]" />
    </a>
);

function ServiceChargesView() {
    return (
        <div className="space-y-6 py-4">
            <div>
                <h3 className="text-lg lg:text-xl font-serif font-bold text-[#1A1A1A]">Service Charge History</h3>
                <p className="text-xs text-gray-500 mt-2">Service charge data is sourced from the DLD Mollak Service Charge Index and verified against official records.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <ChargeTable
                    community="The Greens"
                    type="Apartment"
                    data={[
                        { year: '2023', charge: '16.50', change: '—', source: 'DLD Mollak Index 2024' },
                        { year: '2024', charge: '17.10', change: '+3.6%', source: 'DLD Mollak Index 2025' },
                        { year: '2025', charge: '17.55', change: '+2.6%', source: 'DLD Mollak Index 2026' }
                    ]}
                    summary="Modest, stable increases over 3 years averaging ~3.1% p.a., in line with community maintenance cost inflation."
                />
                <ChargeTable
                    community="Park Heights"
                    type="Dubai Hills Estate — Apartment"
                    data={[
                        { year: '2023', charge: '18.20', change: '—', source: 'DLD Mollak Index 2024' },
                        { year: '2024', charge: '18.95', change: '+4.1%', source: 'DLD Mollak Index 2025' },
                        { year: '2025', charge: '19.60', change: '+3.4%', source: 'DLD Mollak Index 2026' }
                    ]}
                    summary="Moderate and consistent increases over 3 years averaging ~3.8% p.a., reflecting high-quality community upkeep."
                />
            </div>
        </div>
    );
}

function ChargeTable({ community, type, data, summary }) {
    return (
        <div className=" border border-[#F3EFE9] rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-white flex items-center gap-3 border-b border-[#F3EFE9]">
                <div className="w-12 h-12 rounded-full bg-[#fbf6ec] flex items-center justify-center">
                    <TbActivityHeartbeat className="text-[#B68A35] w-10 h-10" />
                </div>
                <div className=''>
                    <h4 className="font-bold text-sm text-[#1A1A1A]">{community}</h4>
                    <span className="text-[10px] text-[#B68A35] font-bold uppercase tracking-wider bg-[#fbf6ec] rounded-2xl p-1">{type}</span>
                </div>
            </div>
            <table className="w-full text-left text-[11px]">
                <thead>
                    <tr className="text-gray-400 border-b border-[#F3EFE9] uppercase font-bold text-xs bg-[#fbf6ec]">
                        <th className="p-4">Year</th>
                        <th className="p-4">AED/SQFT</th>
                        <th className="p-4">Change</th>
                        <th className="p-4">Source</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFE9]">
                    {data.map((row, i) => (
                        <tr key={i} className="text-gray-600 hover:bg-white/50 transition-colors">
                            <td className="p-4 font-bold text-gray-700">{row.year}</td>
                            <td className="p-4 font-bold text-[#B68A35] text-sm">{row.charge}</td>
                            <td className={`p-4 font-bold ${row.change.includes('+') ? 'text-[#89C587]' : 'text-gray-400'}`}>{row.change}</td>
                            <td className="p-4 text-gray-400 text-[10px]">{row.source}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-4 bg-[#FDF7E7]/30 flex gap-3 border-t border-[#F3EFE9]">
                <MdTrendingUp className="text-[#B68A35] w-8 h-8 shrink-0" />
                <div>
                    <p className="text-[12px] font-bold text-[#B68A35] uppercase tracking-widest mb-1">Trend Summary</p>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{summary}</p>
                </div>
            </div>
        </div>
    );
}

function AssetConditionView() {
    const [isSourcesOpen, setIsSourcesOpen] = useState(false);
    const [openCommunityId, setOpenCommunityId] = useState('the-greens');
    return (
        <div className="space-y-8 py-4">
            <div className="bg-[#FBF9F6] border border-[#F3EFE9] rounded-xl shadow-sm">
                {/* Mobile Layout */}
                <div className="lg:hidden p-5">
                    {/* Overall Rating */}
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Overall Rating
                    </p>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-5xl font-serif font-bold text-[#B68A35]">
                            4.2
                        </span>
                        <span className="text-lg font-serif text-gray-700">
                            / 5
                        </span>
                    </div>
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4].map((s) => (
                            <BsStar key={s} className="w-5 h-5 fill-[#B68A35]" />
                        ))}
                        <BsStar className="w-5 h-5 fill-[#B68A35]/30" />
                    </div>

                    {/* Based on community data */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full border border-[#E5DCD0] flex items-center justify-center">
                            <BsShield className="text-[#B68A35] w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Based on community data
                            </p>
                            <p className="text-sm font-medium text-gray-600">
                                4 communities assessed
                            </p>
                        </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Emaar&apos;s established communities demonstrate strong long-term value preservation with generally{" "}
                        <span className="font-semibold text-[#B68A35]">
                            good to excellent
                        </span>{" "}
                        asset condition.
                    </p>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex items-stretch divide-x divide-[#F3EFE9]">
                    {/* LEFT: Rating */}
                    <div className="px-6 py-5">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Overall Rating
                        </p>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-5xl font-serif font-bold text-[#B68A35]">
                                4.2
                            </span>
                            <span className="text-lg font-serif text-gray-700">
                                / 5
                            </span>
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map((s) => (
                                <BsStar key={s} className="w-5 h-5 fill-[#B68A35]" />
                            ))}
                            <BsStar className="w-5 h-5 fill-[#B68A35]/30" />
                        </div>
                    </div>

                    {/* CENTER: Info */}
                    <div className="px-2 py-5 flex items-center">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full border border-[#E5DCD0] flex items-center justify-center">
                                <BsShield className="text-[#B68A35] w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Based on community data
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                    4 communities assessed
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Summary */}
                    <div className="px-4 py-5 flex items-center">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold text-[#B68A35]">Summary:</span>{" "}
                            Emaar&apos;s established communities demonstrate strong long-term value preservation with generally{" "}
                            <span className="font-semibold text-[#B68A35]">
                                good to excellent
                            </span>{" "}
                            asset condition.
                        </p>
                    </div>
                </div>
            </div>

            {/* Communities Assessed Label */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                    <LuUsers className="w-5 h-5 text-[#B68A35]" />
                </div>
                <span className="text-sm font-bold text-gray-700">Communities Assessed</span>
            </div>

            {/* Community Table (Desktop) */}
            <div className="hidden lg:block bg-white border border-[#F3EFE9] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] table-fixed">
                        <thead>
                            <tr className="bg-[#FBF9F6] text-gray-600 uppercase tracking-wider border-b border-[#F3EFE9] text-xs font-bold">
                                <th className="px-4 py-3 w-[20%]">Community</th>
                                <th className="px-4 py-3 w-[10%]">Age (Years)</th>
                                <th className="px-4 py-3 w-[10%]">Condition</th>
                                <th className="px-4 py-3 w-[60%]">Notes</th> {/* 60% Ratio */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3EFE9]">
                            {COMMUNITY_ASSESSMENTS.map((c) => {
                                const Icon = c.Icon;
                                return (
                                    <tr key={c.id} className="hover:bg-white/50 transition-colors">
                                        <td className="px-4 py-4 font-bold text-[#1A1A1A]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-[#FBF9F6] flex items-center justify-center flex-shrink-0">
                                                    <Icon className="text-[#B68A35] w-7 h-7" />
                                                </div>
                                                <span className="truncate text-sm">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-gray-600 text-xs">{c.age}</td>
                                        <td className="px-4 py-4">
                                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#E8F5E9] text-[#2E7D32]">{c.condition}</span>
                                        </td>
                                        <td className="px-4 py-4 text-gray-600 text-xs">
                                            <ul className="space-y-1">
                                                {c.notes.map((note, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <HiOutlineCheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${note.type === 'warning' ? 'text-orange-400' : 'text-[#89C587]'}`} />
                                                        <span>{note.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Community Accordion (Mobile) */}
            <div className="lg:hidden space-y-2">
                {COMMUNITY_ASSESSMENTS.map((c) => {
                    const Icon = c.Icon;
                    const isOpen = openCommunityId === c.id;
                    const firstNote = c.notes[0];
                    const detailNotes = c.notes.slice(1);

                    return (
                        <div key={c.id} className="bg-white border border-[#F3EFE9] rounded-xl shadow-sm overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setOpenCommunityId(isOpen ? '' : c.id)}
                                aria-expanded={isOpen}
                                className="w-full text-left p-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-11 h-11 rounded-full bg-[#FBF9F6] flex items-center justify-center shrink-0">
                                            <Icon className="text-[#B68A35] w-8 h-8" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xl leading-tight font-bold text-[#1A1A1A] truncate">{c.name}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F8F3EC] text-gray-600">{c.age} Years</span>
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${c.condition === 'Excellent' ? 'bg-[#E3F3E5] text-[#2E7D32]' : 'bg-[#E8F5E9] text-[#2E7D32]'}`}>{c.condition}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {isOpen ? (
                                        <BsChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
                                    ) : (
                                        <BsChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
                                    )}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="px-4 pb-4 pt-1 border-t border-[#F3EFE9]">
                                    {firstNote && (
                                        <p className="text-[15px] text-gray-600 leading-relaxed mb-4 mt-3">{firstNote.text}</p>
                                    )}

                                    <ul className="space-y-3">
                                        {detailNotes.map((note, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <HiOutlineCheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${note.type === 'warning' ? 'text-orange-400' : 'text-[#89C587]'}`} />
                                                <span className="text-[14px] text-gray-700 leading-relaxed">{note.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4 pt-3 border-t border-[#F3EFE9] flex items-start gap-2 text-[13px] text-gray-500 italic">
                                        <IoDocumentOutline className="w-4 h-4 text-[#B68A35] mt-0.5 shrink-0" />
                                        <span>Source: Community guide references and resident feedback summaries</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Desktop sources (aligned with Section5 style) */}
            <div className="mt-8 pt-5 border-t border-[#F3EFE9] hidden lg:flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 mr-2">
                    <Building2 className="w-6 h-6 text-2xl text-[#B68A35]" />
                    <span className="text-[14px] font-bold uppercase tracking-wider">Sources</span>
                </div>
                <SourceLink label="Driven Properties - The Greens Community Guide" href="https://drivenproperties.com" />
                <SourceLink label="APIL Properties - Emirates Hills Guide" href="#" />
                <SourceLink label="Bayut" href="https://www.bayut.com" />
            </div>

            {/* Mobile sources accordion */}
            <div className="mt-2 sm:mt-6 lg:hidden">
                <div className="bg-white border border-[#F3EFE9] rounded-lg overflow-hidden shadow-sm">
                    <button
                        type="button"
                        onClick={() => setIsSourcesOpen((s) => !s)}
                        aria-expanded={isSourcesOpen}
                        className="w-full flex items-center justify-between p-4"
                    >
                        <div className="flex items-center gap-3">
                            <Building2 className="w-5 h-5 text-[#B68A35]" />
                            <span className="text-[14px] font-bold uppercase tracking-wider">Sources</span>
                        </div>
                        <BsChevronUp className={`w-5 h-5 transition-transform ${isSourcesOpen ? 'rotate-180 text-[#B68A35]' : 'text-gray-300'}`} />
                    </button>

                    {isSourcesOpen && (
                        <div className="p-3 border-t border-[#F3EFE9] bg-[#FBF9F6]">
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full" />
                                        <a href="https://drivenproperties.com" target="_blank" rel="noopener noreferrer" className="text-[14px] text-gray-700 underline decoration-gray-200">Driven Properties - The Greens Community Guide</a>
                                    </div>
                                    <a href="https://drivenproperties.com" target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35]"><ExternalLink className="w-4 h-4" /></a>
                                </li>

                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full" />
                                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-[14px] text-gray-700 underline decoration-gray-200">APIL Properties - Emirates Hills Guide</a>
                                    </div>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35]"><ExternalLink className="w-4 h-4" /></a>
                                </li>

                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full" />
                                        <a href="https://www.bayut.com" target="_blank" rel="noopener noreferrer" className="text-[14px] text-gray-700 underline decoration-gray-200">Bayut</a>
                                    </div>
                                    <a href="https://www.bayut.com" target="_blank" rel="noopener noreferrer" className="ml-3 text-[#B68A35]"><ExternalLink className="w-4 h-4" /></a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SatisfactionCard() {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [manualExpanded, setManualExpanded] = useState(false);
    const isExpanded = hasInteracted ? manualExpanded : false;

    return (
        <div className="bg-white border border-[#F3EFE9] rounded-xl shadow-sm overflow-hidden">
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setHasInteracted(true);
                        setManualExpanded((s) => !s);
                    }}
                    aria-expanded={isExpanded}
                    className="w-full p-3 px-2 sm:p-5 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <FaRegSmile className="text-[#B68A35] w-7 h-7" />
                        <h4 className="font-bold text-sm text-left">Owner Satisfaction with Community Management</h4>
                    </div>
                    <BsChevronUp className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-0 text-[#B68A35]' : 'rotate-180 text-gray-300'}`} />
                </button>
            </div>

            {isExpanded && (
                <div className="p-5 sm:p-6 space-y-5">
                    {/* Summary */}
                    <div>
                        <p className="text-[15px] leading-relaxed text-gray-600">
                            <span className="font-bold text-[#B68A35]">Summary:</span> Resident feedback on Emaar Community Management (ECM) reveals significant and consistent concerns across multiple platforms and communities. Reviews indicate systemic issues with maintenance responsiveness, communication, accountability, and service charge transparency. While ECM&apos;s official communications emphasize customer-centricity and 24/7 response capabilities, the on-ground experience reported by residents often contradicts this messaging. The aggregated rating across 220+ reviews averages approximately 3.2/5, with the main ECM office showing 1.0/5 based on recent reviews and 3.3/5 based on 212 reviews on another platform. The Dubai Marina office has a 2.0/5 rating from 4 reviews.
                        </p>
                    </div>

                    {/* Common Praises */}
                    <div>
                        <h5 className="font-bold text-gray-800 text-sm mb-3">Common Praises</h5>
                        <ul className="space-y-2">
                            {[
                                "Community landscaping and public spaces (general Emaar reputation)",
                                "Security and gated access (acknowledged in multiple communities)",
                                "Loyalty programme (UBYEMAAR) for residents"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-[15px] text-gray-600">
                                    <span className="text-[#C9A962] mt-1">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Common Complaints */}
                    <div>
                        <h5 className="font-bold text-gray-800 text-sm mb-3">Common Complaints</h5>
                        <ul className="space-y-4">
                            {[
                                {
                                    title: "Extremely slow maintenance response",
                                    desc: "Residents report issues like water leakage taking 3+ weeks to address, with multiple follow-ups required and no resolution.",
                                    quote: "I have an issue with the bathroom water leakage problem... this they still delayed for 3 weeks and can't find a solution"
                                },
                                {
                                    title: "Unresponsive customer service",
                                    desc: "Emails go unanswered or receive generic template responses; calls are not returned; managers fail to follow up as promised.",
                                    quote: "This is by far the WORST customer experience I have ever witnessed. Emails never being actually answered, always 'we have referred your email to the relevant dept' then nothing happens"
                                },
                                {
                                    title: "Lack of accountability",
                                    desc: "No single person takes responsibility for issues; residents are passed between representatives with conflicting information.",
                                    quote: "Each representative has his own rules and regulations manual... no one taking responsibility for their actions"
                                },
                                {
                                    title: "NOC and permit delays",
                                    desc: "NOC transfers for property sales take weeks with repeated requests for additional documents.",
                                    quote: "Wanted to sell my real estate in Springs which requires a NOC transfer. They charge you 525 AED and after 4 days they ask me for more documents"
                                },
                                {
                                    title: "Service charge increases without justification",
                                    desc: "Dramatic fee hikes (up to 22% year-on-year) with poor communication and deteriorating maintenance quality.",
                                    quote: "The service fee has been dramatically increased (22% YoY), yet the quality of maintenance suffers"
                                },
                                {
                                    title: "No proper complaint escalation process",
                                    desc: "No clear mechanism to escalate issues or suggest improvements.",
                                    quote: "Worst of all there is no process to manage complaints, no escalation number/email/contact available. Almost designed to ensure that no one can suggest an area of improvement"
                                }
                            ].map((item, i) => (
                                <li key={i} className="text-[15px] text-gray-600">
                                    <span className="font-semibold text-gray-800">{item.title}:</span> {item.desc}
                                    <blockquote className="mt-1 pl-3 border-l-2 border-[#E5DCD0] italic text-gray-500">
                                        "{item.quote}"
                                    </blockquote>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sources */}
                    <div className="pt-2 border-t border-[#F3EFE9]">
                        <p className="text-[13px] text-gray-500">
                            <span className="font-semibold text-gray-700">Sources:</span> Google Reviews (220+ reviews, Feb 2026) aggregated from GoProfiled; BestThings.ae; ECM Official Website
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function AnalystInsightCard({ onGroundInsight = "{{on_ground_insight}}", onGroundDate = "{{on_ground_date}}" }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white border border-[#F3EFE9] rounded-xl shadow-sm overflow-hidden">
            <div>
                <button
                    type="button"
                    onClick={() => setIsExpanded((s) => !s)}
                    aria-expanded={isExpanded}
                    className="w-full p-4 px-2  sm:p-5 border-b border-[#F3EFE9] flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <TbBulb className="text-[#B68A35] w-8 h-8" />
                        <h4 className="font-bold text-sm text-left">On-Ground Analyst Insight</h4>
                    </div>
                    <BsChevronUp className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-0 text-[#B68A35]' : 'rotate-180 text-gray-300'}`} />
                </button>
            </div>

            {isExpanded && (
                <div className="p-5 sm:p-6 space-y-5">


                    {/* Source */}
                    <div className="pt-2 border-t border-[#F3EFE9]">
                        <p className="text-[13px] text-gray-500">
                            <span className="font-semibold text-gray-700">Source:</span> PropertyIntel on-ground analysis
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-[#F9F7F4] rounded-lg p-4 text-[12px] text-gray-500 leading-relaxed">
                        <p className="font-semibold text-gray-700 mb-1">Disclaimer:</p>
                        <p>
                            All service charge data sourced from DLD Mollak Index where publicly available; placeholders indicate backend-populated values for real-time accuracy. Actual charges vary by building, floor, and unit size. Asset condition ratings are PropertyIntel proprietary assessments based on site visits and aggregated owner feedback. Last updated: 22 February 2026.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
