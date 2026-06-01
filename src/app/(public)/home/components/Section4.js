"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    HiOutlineBuildingOffice2,
    HiOutlineUsers,
    HiOutlineChartPie,
    HiOutlineCalendarDays,
    HiOutlineShieldCheck
} from "react-icons/hi2";
import { LuInfo, LuChevronDown, LuExternalLink } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { FaRegFlag } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import ExpertSection from './ExpertSection';

// --- Data Structures ---
const timelineData = [
    { year: "2000", desc: "Initial Public Offering on Dubai Financial Market (DFM: EMAAR), enabling capital expansion for large-scale projects (Source: Emaar Properties Investor Relations FAQ)" },
    { year: "2003", desc: "Emaar Properties founded by Mohamed Ali Alabbar; launches Emirates Hills, Dubai's first gated luxury community (Source: Wikipedia page - Emirates Hills)" },
    { year: "2005", desc: "Commencement of Burj Khalifa construction, establishing Emaar as a developer of iconic global landmarks (Source: Source: Wikipedia - Burj Khalifa)" },
    { year: "2008", desc: "Handover of Dubai Mall, the world's largest shopping and entertainment destination by total floor area (Source: Gulf News / Wikipedia)" },
    { year: "2012", desc: "Strategic expansion into international markets with projects in Saudi Arabia, Egypt, and Pakistan (Source: Gulf News)" },
    { year: "2017", desc: "Appointment of Amit Jain as CEO, marking a new phase of operational focus and digital transformation (Source: Forbes Middle East / EY Alumni Profile)" },
];

const leaders = [
    {
        name: "Mohamed Ali Alabbar",
        role: "FOUNDER & CHAIRMAN",
        image: "/Home/section4-1.webp",
        bio: "Mohamed Ali Alabbar founded Emaar Properties in 1997 and has served as Chairman since inception. A prominent figure in Dubai's economic development, he also serves on the Dubai Executive Council and has been instrumental in shaping the emirate's real estate and tourism strategy. Under his leadership, Emaar has delivered over 200 projects across residential, commercial, hospitality, and retail sectors. Prior to founding Emaar, Alabbar held senior positions in the UAE government and private sector, bringing extensive experience in urban planning and investment. He remains actively involved in Emaar's strategic direction and major project approvals.",
        source: "Dubai Immo - Biography of Mohamed Alabbar"
    },
    {
        name: "Amit Jain",
        role: "CHIEF EXECUTIVE OFFICER",
        image: "/Home/Section4-2.webp",
        bio: "Amit Jain was appointed CEO of Emaar Properties in 2017, having joined the company in 2006 as Chief Financial Officer. He brings over 25 years of experience in real estate, finance, and investment across the Middle East, Asia, and Europe. Prior to Emaar, Jain held senior leadership roles at Jones Lang LaSalle (JLL) and other multinational firms. As CEO, he oversees Emaar's entire project portfolio, strategic growth initiatives, and operational performance. During his tenure, Emaar has launched major communities including The Valley, The Oasis, and Dubai Creek Harbour, while strengthening its hospitality and commercial asset base.",
        source: "MarketScreener - Executive Profile: Amit Jain"
    }
];

const sourcesData = [
    {
        fact: "Founding year and founder",
        source: "Emaar Official Website - About Emaar",
        url: "https://properties.emaar.com/en/about-emaar/"
    },
    {
        fact: "IPO and DFM listing",
        source: "Emaar Properties Investor Relations FAQ",
        url: "https://properties.emaar.com/en/investor-relations/faq/"
    },
    {
        fact: "Leadership team biographies",
        source: "Dubai Immo - Biography of Mohamed Alabbar",
        url: "https://dubai-immo.com/en/biographie-de-mohamed-alabbar-le-ceo-de-emaar/"
    },
    {
        fact: "Leadership team biographies",
        source: "MarketScreener - Executive Profile: Amit Jain",
        url: "https://www.marketscreener.com/insider/AMIT-JAIN-A0UIX9/experience/"
    },
    {
        fact: "Ownership structure and ICD stake",
        source: "Investing.com - Emaar Shareholders",
        url: "https://ph.investing.com/equities/emaar-properti-ownership"
    },
    {
        fact: "Key project milestones",
        source: "Emaar Press Releases (2016-2026); Wikipedia - Burj Khalifa; The National - Dubai Mall; Gulf News - 2014 Expansion",
        urls: [
            "https://properties.emaar.com/en/press-release-listing/",
            "https://en.wikipedia.org/wiki/Burj_Khalifa",
            "https://www.thenationalnews.com/business/property/mega-mall-opens-with-high-hopes-1.487846",
            "https://gulfnews.com/business/property/emaars-net-profit-gains-30-to-dh335b-1.1457527"
        ]
    }
];

export default function Section4() {
    const [activeTab, setActiveTab] = useState('founding');
    const [isSourcesOpen, setIsSourcesOpen] = useState(false);

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
                        Company History <span className="hidden lg:inline">& Leadership:</span>
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        Emaar Properties
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base text-gray-600 leading-relaxed font-medium">
                        This section establishes the authority, experience, and corporate structure of Emaar Properties, based on verified public records and official sources.
                    </p>
                </div>
            </div>

            {/* Tabs and Main Content Container */}
            <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-2 -mt-12 relative z-20 pb-20">
                <div className="bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-[#F3EFE9] overflow-hidden">

                    {/* Tab Navigation */}
                    <div className="flex flex-row lg:flex-row items-stretch gap-1 px-1.5 py-1.5 sm:px-3 sm:py-3 lg:px-0 border-b border-[#F3EFE9]">
                        <TabButton
                            active={activeTab === 'founding'}
                            onClick={() => setActiveTab('founding')}
                            icon={<HiOutlineBuildingOffice2 className="text-xl" />}
                            label="Founding & History"
                        />
                        <TabButton
                            active={activeTab === 'leadership'}
                            onClick={() => setActiveTab('leadership')}
                            icon={<HiOutlineUsers className="text-xl" />}
                            label="Leadership Team"
                        />
                        <TabButton
                            active={activeTab === 'ownership'}
                            onClick={() => setActiveTab('ownership')}
                            icon={<HiOutlineChartPie className="text-xl" />}
                            label="Honors, Ties & Structure"
                        />
                    </div>

                    {/* Tab Content Body */}
                    <div className="p-2 sm:p-6 lg:p-6 min-h-[480px]">
                        {activeTab === 'founding' && <FoundingView />}
                        {activeTab === 'leadership' && <LeadershipView />}
                        {activeTab === 'ownership' && <OwnershipView />}

                        {/* Sources Footer within Tab */}
                        <div className="mt-12 border-t border-[#F3EFE9] p-4 sm:p-0 sm:pt-6">
                            <button
                                type="button"
                                onClick={() => setIsSourcesOpen((current) => !current)}
                                aria-expanded={isSourcesOpen}
                                aria-controls="sources-verification-panel"
                                className="w-full flex items-center justify-between text-gray-700 cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className=" flex items-center justify-center">
                                        <HiOutlineShieldCheck className="text-[#B68A35] text-xl" />
                                    </div>
                                    <span className="font-bold text-sm">Sources & Verification</span>
                                </div>
                                <LuChevronDown className={`text-xl text-gray-400 group-hover:text-[#B68A35] transition-all ${isSourcesOpen ? 'rotate-180 text-[#B68A35]' : ''}`} />
                            </button>

                            <div
                                id="sources-verification-panel"
                                className={`overflow-hidden transition-all duration-300 ${isSourcesOpen ? 'max-h-[1200px] opacity-100 pt-5' : 'max-h-0 opacity-0 pt-0'}`}
                            >
                                <div className="rounded-xl border border-[#F3EFE9] bg-[#FBF9F6] p-4 sm:p-5 space-y-4">
                                    <p className="text-[12px] sm:text-[13px] text-gray-700 leading-relaxed">
                                        The following sources support the information presented above. We prioritize official registrars, annual reports, and government filings.
                                    </p>

                                    <div className="space-y-3">
                                        {sourcesData.map((item, idx) => (
                                            <div key={idx} className="text-[11px] sm:text-[12px] text-gray-700 leading-relaxed space-y-0.5">
                                                <p><span className="font-semibold text-[#1A1A1A]">Fact:</span> {item.fact}</p>
                                                <p><span className="font-semibold text-[#1A1A1A]">Source:</span> {item.source}</p>
                                                <p className="break-all">
                                                    <span className="font-semibold text-[#1A1A1A]">URL:</span>{' '}
                                                    {item.urls
                                                        ? item.urls.map((url, urlIdx) => (
                                                            <React.Fragment key={url}>
                                                                <a
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[#B68A35] hover:underline inline-flex items-center gap-1"
                                                                >
                                                                    {url}
                                                                    <LuExternalLink className="text-[11px] shrink-0" />
                                                                </a>
                                                                {urlIdx < item.urls.length - 1 ? ' ; ' : ''}
                                                            </React.Fragment>
                                                        ))
                                                        : (
                                                            <a
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[#B68A35] hover:underline inline-flex items-center gap-1"
                                                            >
                                                                {item.url}
                                                                <LuExternalLink className="text-[11px] shrink-0" />
                                                            </a>
                                                        )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ExpertSection />

                {/* Floating Info Banner */}
                <div className="mt-6 bg-[#FBF9F6] border border-[#F3EFE9] rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
                    <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
                    <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                        All information on this page is sourced from public records, financial filings and official disclosures.
                        Please refer to the Sources & Verification section for detailed references.
                    </p>
                </div>
            </div>
        </section>
    );
}

// --- Internal View Components ---

function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex items-center justify-center sm:gap-3 transition-all relative
                min-w-0 py-2 px-1.5 sm:px-2 lg:py-6 lg:px-4 rounded-2xl lg:rounded-none lg:mx-0
                ${active
                    ? 'text-[#B68A35] bg-[#FDF8F0] border border-[#B68A35]/20 lg:border-none lg:bg-white'
                    : 'text-gray-500 bg-transparent lg:bg-white hover:text-gray-800'
                }
            `}
        >
            <span className="hidden lg:inline-flex">{icon}</span>
            <span className={`text-[11px] sm:text-sm leading-tight text-center tracking-wide lg:capitalize ${active ? 'font-semibold' : 'font-medium'}`}>
                {label}
            </span>

            {/* Desktop Active Underline */}
            {active && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#B68A35] hidden lg:block" />
            )}
        </button>
    );
}

function FoundingView() {
    const foundingText = "Emaar Properties was established in 1997 by Mohamed Ali Alabbar, following a royal decree from Sheikh Mohammed bin Rashid Al Maktoum to create a flagship developer for Dubai's urban transformation. The company's initial mandate was to deliver integrated, master-planned communities that would support Dubai's economic diversification and position the emirate as a global destination for investment and tourism. Emaar's first major project, Emirates Hills (launched 2003), introduced Dubai's first gated luxury community and set a new benchmark for high-end residential development. This early success provided the foundation for Emaar's rapid expansion, culminating in the development of Downtown Dubai and the Burj Khalifa—projects that redefined the city's skyline and global reputation. The company's founding vision remains centered on creating lifestyle-oriented destinations that combine residential, commercial, hospitality, and retail components. (Source: Emaar Official Website - About-Emaar; Wikipedia)";
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const updateViewport = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        updateViewport();
        window.addEventListener('resize', updateViewport);

        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    const limit = isDesktop ? 500 : 250;
    const isTruncated = foundingText.length > limit;
    const displayText = isExpanded || !isTruncated ? foundingText : `${foundingText.slice(0, limit).trimEnd()}...`;

    return (
        <div className="space-y-5 md:border md:border-[#F3EFE9] md:rounded-xl md:p-4">
            {/* Stats Grid - Set to 2 columns on mobile to match screenshot */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-3">
                <StatBox icon={<HiOutlineCalendarDays />} label="Founded in" value="1997" />
                <StatBox icon={<GoPerson />} label="Founder" value="Mohamed Ali Alabbar" />
                <div className="hidden lg:flex justify-center">
                    <StatBox icon={<HiOutlineShieldCheck />} label="First Major Project" value="Emirates Hills (2003)" />
                </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2.5">
                <p className="text-[#4A4A4A] leading-relaxed text-[12px] sm:text-sm lg:text-[15px] font-medium">
                    {displayText}
                </p>
                <button
                    type="button"
                    onClick={() => setIsExpanded((current) => !current)}
                    className="text-[#B68A35] font-bold text-[12px] sm:text-[13px] flex items-center gap-1 hover:underline"
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                    <LuChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Timeline Section */}
            <div className="pt-2">
                {/* Mobile Heading: Removed icon and adjusted tracking/color for phone screens */}
                <h4 className="text-[#B68A35] font-bold text-[10px] sm:text-[11px] tracking-[0.12em] uppercase mb-5 sm:mb-6 flex items-center">
                    <span className="lg:hidden">Key Evolution Milestones</span>
                    <div className="hidden lg:flex items-center gap-3">
                        <FaRegFlag />
                        <span className='text-black'>Key Evolution Milestones</span>
                    </div>
                </h4>

                {/* Desktop Horizontal Timeline (Untouched) */}
                <div className="hidden lg:flex justify-between relative px-4">
                    <div className="absolute top-[5px] left-0 right-0 h-[2px] bg-[#B68A35]" />
                    {timelineData.map((item, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center w-40 text-center">
                            <div className="w-3 h-3 rounded-full bg-[#B68A35]" />
                            <span className="font-bold text-[#1A1A1A] text-sm mb-2">{item.year}</span>
                            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Mobile Vertical Timeline (Refined for exact match) */}
                <div className="lg:hidden max-h-80 overflow-y-scroll mobile-timeline-scrollbar space-y-5 border-l border-gray-200 ml-1 pl-7 sm:pl-5 pr-3 pb-4">
                    {timelineData.map((item, idx) => (
                        <div key={idx} className="relative">
                            {/* Circular Indicator */}
                            <div className="absolute left-[-18px] top-1 w-2.5 h-2.5 rounded-full bg-[#B68A35]" />

                            <span className="block font-bold text-[13px] sm:text-[14px] text-[#1A1A1A] mb-1">{item.year}</span>
                            <p className="text-[11px] sm:text-[12px] text-[#666666] leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function LeadershipView() {
    const [expandedLeaderIndex, setExpandedLeaderIndex] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const updateViewport = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    const LIMIT_DESKTOP = 350;

    return (
        <div className="space-y-6">
            {leaders.map((leader, idx) => {
                const isLongOnDesktop = leader.bio && leader.bio.length > LIMIT_DESKTOP;
                const showToggle = isDesktop ? isLongOnDesktop : true;
                const desktopDisplay = isDesktop
                    ? (expandedLeaderIndex === idx || !isLongOnDesktop ? leader.bio : `${leader.bio.slice(0, LIMIT_DESKTOP).trimEnd()}...`)
                    : leader.bio;

                return (
                    <div key={idx} className="flex flex-row lg:flex-row gap-4 lg:gap-8 bg-white border border-[#E5E5E5] rounded-xl p-2 lg:p-5 items-start">

                        {/* Image Container - Strictly smaller on mobile to match screenshot */}
                        <div className="w-24 h-24 lg:w-48 lg:h-48 relative rounded-xl overflow-hidden shrink-0">
                            {leader.image ? (
                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 96px, 192px"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-[#FBF9F6] text-gray-300 font-bold uppercase text-[10px] tracking-widest">Profile Image</div>
                            )}
                        </div>

                        {/* Content Middle Section */}
                        <div className="flex-1 space-y-3 min-w-0">
                            <div className="border-b border-[#F3EFE9] pb-2 lg:border-0 lg:pb-0">
                                <h4 className="text-[17px] lg:text-2xl font-serif text-[#1A1A1A] font-semibold leading-tight">{leader.name}</h4>
                                <p className="text-[#B68A35] text-[10px] lg:text-[12px] font-bold tracking-widest mt-1 uppercase">{leader.role}</p>
                            </div>

                            <p className={isDesktop ? "text-gray-600 text-[12px] lg:text-[14px] leading-relaxed" : `text-gray-600 text-[12px] lg:text-[14px] leading-relaxed lg:line-clamp-none ${expandedLeaderIndex === idx ? '' : 'line-clamp-4'}`}>
                                {isDesktop ? desktopDisplay : leader.bio}
                            </p>

                            {showToggle && (
                                <button
                                    type="button"
                                    onClick={() => setExpandedLeaderIndex(expandedLeaderIndex === idx ? null : idx)}
                                    className="text-[#B68A35] font-bold text-[11px] flex items-center gap-1 uppercase tracking-tighter"
                                >
                                    {expandedLeaderIndex === idx ? 'Show less' : 'Read more'} <LuChevronDown className={`text-sm transition-transform ${expandedLeaderIndex === idx ? 'rotate-180' : ''}`} />
                                </button>
                            )}

                            {expandedLeaderIndex === idx && (
                                <div className="lg:hidden pt-3 border-t border-[#F3EFE9] flex items-start gap-3">
                                    <div className="mt-1 shrink-0">
                                        <HiOutlineGlobeAlt className="text-[#B68A35] text-xl" />
                                    </div>
                                    <div className="text-[12px] leading-snug min-w-0">
                                        <span className="text-gray-500">Source:</span>
                                        <div className="mt-1">
                                            <a
                                                href="#"
                                                className="font-medium text-[#1A1A1A] hover:text-[#B68A35] transition-colors inline-flex items-baseline gap-1"
                                            >
                                                {leader.source}
                                                <LuExternalLink className="text-[#B68A35] text-[12px] shrink-0 translate-y-0.5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Source Section - Right Column (Hidden on mobile to match screenshot) */}
                        <div className="hidden lg:flex lg:w-64 items-start gap-3 pt-4 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-[#F3EFE9] self-stretch">
                            <div className="mt-1">
                                <HiOutlineGlobeAlt className="text-[#B68A35] text-xl" />
                            </div>
                            <div className="text-[13px] leading-snug">
                                <span className="text-gray-500">Source:</span>
                                <div className="mt-1">
                                    <a
                                        href="#"
                                        className="font-medium text-[#1A1A1A] hover:text-[#B68A35] transition-colors inline-flex items-baseline gap-1"
                                    >
                                        {leader.source}
                                        <LuExternalLink className="text-[#B68A35] text-[12px] shrink-0 translate-y-0.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function OwnershipView() {
    const ownershipText = "Emaar Properties is publicly traded on the Dubai Financial Market (DFM: EMAAR). The company operates under a transparent corporate governance framework aligned with UAE Securities and Commodities Authority regulations. The Government of Dubai, through Investment Corporation of Dubai (ICD), holds a significant minority stake, providing strategic alignment with Dubai's long-term development goals. The remaining shares are held by institutional investors, retail shareholders, and founding family interests.";
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        const updateViewport = () => {
            setIsPhone(window.innerWidth < 640);
        };

        updateViewport();
        window.addEventListener('resize', updateViewport);

        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    const limit = 220;
    const isTruncated = ownershipText.length > limit;
    const shouldTruncate = isPhone && isTruncated;
    const displayText = shouldTruncate && !isExpanded
        ? `${ownershipText.slice(0, limit).trimEnd()}...`
        : ownershipText;

    return (
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-16">
            {/* Left Column: Description */}
            <div className="flex-1">
                <div className=" ">
                    <h4 className="text-[#B68A35] font-bold text-[15px] tracking-[0.15em] uppercase">
                        Ownership structure
                    </h4>
                </div>
                <p className="text-[#4A4A4A] leading-[1.8] text-[12px] sm:text-[15px] font-normal mb-2 sm:mb-8 mt-2">
                    {displayText}
                </p>

                {shouldTruncate && (
                    <button
                        type="button"
                        onClick={() => setIsExpanded((current) => !current)}
                        className="sm:hidden text-[#B68A35] font-bold text-[12px] flex items-center gap-1 hover:underline mb-4"
                    >
                        {isExpanded ? 'Read less' : 'Read more'}
                        <LuChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                )}


            </div>

            {/* Vertical Divider (Visible only on LG) */}
            <div className="hidden lg:block w-px bg-[#F3EFE9] self-stretch" />

            {/* Right Column: Shareholder Cards */}
            <div className="lg:w-[450px] space-y-4">
                <div className=" ">
                    <h4 className="text-[#B68A35] font-bold text-[15px] tracking-[0.15em] uppercase">
                        Major Shareholders
                    </h4>
                </div>
                <ShareholderCard
                    icon={<HiOutlineBuildingOffice2 className="text-2xl sm:text-5xl" />}
                    percent="22.27%"
                    name="Investment Corporation of Dubai (ICD)"
                    source="Investing.com – Emaar Shareholders,"
                    date="February 2026"
                />
                <ShareholderCard
                    icon={<HiOutlineUsers className="text-2xl sm:text-5xl" />}
                    percent="70.27%"
                    name="Public & Institutional Investors"
                    source="Investing.com – Emaar Shareholders,"
                    date="February 2026"
                />
            </div>
        </div>
    );
}

// --- Utility Components ---

function StatBox({ icon, label, value }) {
    return (
        <div className="rounded-xl flex items-center gap-1.5 sm:gap-4 transition-transform hover:scale-[1.02]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#fbf5ee] flex items-center justify-center text-[#B68A35] text-2xl sm:text-3xl">
                {icon}
            </div>
            <div>
                <p className="text-[10px] sm:text-[12px] tracking-widest text-gray-700 font-bold mb-0.5 leading-tight">{label}</p>
                <p className="text-[#B68A35] font-bold text-[12px] sm:text-sm lg:text-base leading-tight">{value}</p>
            </div>
        </div>
    );
}

const ShareholderCard = ({ icon, percent, name, source, date }) => (
    <div className="flex item-start sm:items-center gap-5 p-2 sm:p-6 border border-[#F3EFE9] rounded-2xl bg-white shadow-sm">
        {/* Circular Icon Holder */}
        <div className="w-10 h-10 sm:w-20 sm:h-20 shrink-0 rounded-full text-2xl bg-[#FBF9F6] flex items-center justify-center text-[#B68A35]">
            {icon}
        </div>

        <div className="space-y-1">
            <span className="block text-xl sm:text-3xl font-serif text-[#B68A35] font-medium">
                {percent}
            </span>
            <h5 className="text-[12px] sm:text-[15px] font-bold text-[#1A1A1A] leading-tight">
                {name}
            </h5>
            <p className="text-gray-500 text-[11px] sm:text-[12px] leading-tight mt-1">
                Source: {source} <br /> {date}
            </p>
        </div>
    </div>
);