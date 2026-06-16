"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeStyles, GOLD_BORDER } from '@/app/components/context/themeStyles';
import ExpertSection from './ExpertSection';
import {
    BsChevronLeft,
    BsChevronRight,
    BsChevronDown,
    BsBuildings,
    BsHouse,
    BsLayoutTextSidebarReverse
} from "react-icons/bs";
import {
    HiOutlineDownload,
    HiOutlineInformationCircle
} from "react-icons/hi";
import { PiHouseBold } from "react-icons/pi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { LuLayers } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { LuShieldCheck } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { IoGridOutline } from "react-icons/io5";

const GOLD = "#B68A35";

const MobileNoteBox = ({ icon, title, children, textClassName = "", textStyle }) => {
    if (title) {
        return (
            <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    <span className="shrink-0 text-[#B68A35]">{icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B68A35]">{title}</span>
                </div>
                <div className="flex gap-3 items-stretch">
                    <span className="w-px shrink-0 self-stretch" style={{ background: GOLD }} aria-hidden />
                    <div className={`min-w-0 text-[12px] leading-normal ${textClassName}`} style={textStyle}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-w-0 gap-3 items-stretch">
            <div className="flex shrink-0 flex-col items-center gap-2 self-stretch">
                <span className="text-[#B68A35]">{icon}</span>
                <span className="mx-auto w-px min-h-0 flex-1" style={{ background: GOLD }} aria-hidden />
            </div>
            <div className={`min-w-0 text-[12px] leading-normal ${textClassName}`} style={textStyle}>
                {children}
            </div>
        </div>
    );
};

const Section2 = ({ data }) => {
    const { t, isDark, dark, section } = useThemeStyles();
    const [activeTab, setActiveTab] = useState('All Projects');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [visibleCardCount, setVisibleCardCount] = useState(3);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1024) setVisibleCardCount(3);
            else if (w >= 768) setVisibleCardCount(2);
            else setVisibleCardCount(1);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    if (!data) {
        return (
            <section className={`py-5 transition-colors duration-300 ${isDark ? "" : "bg-[#FCFBFA]"}`} style={section}>
                <div className="max-w-350 mx-auto px-2 sm:px-6 py-20">
                    <p className="text-center" style={{ color: isDark ? dark.textSecondary : '#666' }}>Loading...</p>
                </div>
            </section>
        );
    }

    const projects = data.projects || [];
    const tabs = data.tabs?.map(tab => ({
        ...tab,
        count: tab.name === 'All Projects'
            ? projects.length
            : projects.filter((project) => project.category === tab.name).length,
        icon: getTabIcon(tab.iconName)
    })) || [];

    const filteredProjects = activeTab === 'All Projects'
        ? projects
        : projects.filter((project) => project.category === activeTab);

    const maxStartIndex = Math.max(filteredProjects.length - visibleCardCount, 0);
    const paginationCount = Math.max(filteredProjects.length - visibleCardCount + 1, 1);

    useEffect(() => {
        setCurrentCardIndex((idx) => Math.min(idx, maxStartIndex));
    }, [filteredProjects.length, visibleCardCount, maxStartIndex]);

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => Math.min(prevIndex + 1, maxStartIndex));
    };

    const handlePrevCard = () => {
        setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const visibleCards = filteredProjects.slice(currentCardIndex, currentCardIndex + visibleCardCount);

    const headerDescription = data.header?.description || "Explore the latest Emaar projects across Dubai, from waterfront apartments to luxury villas. Download brochures directly.";

    return (
        <section className={`py-5 transition-colors duration-300 ${isDark ? "" : "bg-[#FCFBFA]"}`} style={section}>
            {/* Mobile header */}
            <div className="md:hidden mb-8">
                <div className="relative min-h-[285px] overflow-hidden">
                    <Image
                        src="/projects/cm-projects.webp"
                        alt="Emaar upcoming projects"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: isDark
                                ? "linear-gradient(90deg, rgba(37,40,45,0.86) 0%, rgba(37,40,45,0.78) 42%, rgba(37,40,45,0.56) 62%, rgba(37,40,45,0.22) 80%, transparent 100%)"
                                : "linear-gradient(90deg, rgba(255,253,250,0.78) 0%, rgba(255,253,250,0.68) 42%, rgba(255,253,250,0.42) 62%, rgba(255,253,250,0.16) 80%, transparent 100%)",
                        }}
                    />
                    <div className="relative z-10 max-w-full px-2 py-8 text-left">
                        <h2
                            className="text-[32px] font-semibold leading-none tracking-[-0.01em]"
                            style={{ color: isDark ? t.text : "#1a1a1a" }}
                        >
                            {data.header?.title?.line1 || "Emaar Upcoming Projects – "}
                            <span className="block text-[#B68A35]">{data.header?.title?.line2 || "New Launches & Off-Plan Opportunities"}</span>
                        </h2>
                        <p
                            className="mt-4 max-w-[380px] text-[14px] font-normal leading-[17px] tracking-[-0.01em]"
                            style={{ color: isDark ? t.textSecondary : "#475569" }}
                        >
                            {headerDescription}
                        </p>
                        <span className="mt-5 block h-px w-20 bg-[#B68A35]" />
                    </div>
                </div>
            </div>

            {/* Desktop header */}
            <div className="hidden md:flex relative w-full h-80 lg:h-96 items-center overflow-hidden mb-8 lg:mb-12">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/projects/cm-projects.webp"
                        alt="Emaar upcoming projects"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div
                        className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`}
                        style={isDark ? dark?.heroOverlayLeft : undefined}
                    />
                </div>
                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
                    <h2
                        className={`text-2xl lg:text-4xl font-serif leading-tight ${isDark ? "" : "text-slate-900"}`}
                        style={isDark ? dark.text : undefined}
                    >
                        {data.header?.title?.line1 || "Emaar Upcoming Projects – "}<br />
                        <span className="text-[#B68A35]">{data.header?.title?.line2 || "New Launches & Off-Plan Opportunities"}</span>
                    </h2>
                    <p
                        className={`mt-3 text-sm lg:text-base max-w-2xl leading-[17px] ${isDark ? "" : "text-slate-600"}`}
                        style={isDark ? dark.textSecondary : undefined}
                    >
                        {headerDescription}
                    </p>
                </div>
            </div>

            <div className="max-w-350 mx-auto px-2 sm:px-6">

                {/* Tab Navigation Container */}
                <div
                    className={`grid grid-cols-4 lg:flex gap-1 lg:gap-0 mb-10 pb-0 border rounded-xl p-1 lg:rounded-none lg:p-0 overflow-hidden ${isDark ? "lg:border lg:border-solid" : "border-gray-200 lg:border-none lg:bg-transparent"
                        }`}
                    style={isDark ? dark.tabBar : undefined}
                >
                    {tabs.map((tab, index) => {
                        const isActive = activeTab === tab.name;
                        const isFirst = index === 0;
                        const isLast = index === tabs.length - 1;

                        return (
                            <button
                                key={tab.name}
                                onClick={() => {
                                    setActiveTab(tab.name);
                                    setCurrentCardIndex(0);
                                }}
                                className={`flex flex-col sm:flex-row items-center justify-center py-2 px-1 lg:py-3 lg:px-2 transition-all w-full min-w-0 sm:flex-1 relative border
                                    ${isDark
                                        ? `rounded lg:rounded-none ${isActive ? "font-semibold z-10" : "font-medium"} ${isFirst ? "lg:rounded-tl-2xl" : ""} ${isLast ? "lg:rounded-tr-2xl" : ""}`
                                        : isActive
                                            ? "bg-white border-2 border-[#B68A35] rounded text-[#B68A35] lg:border lg:ring-1 lg:ring-[#B68A35] lg:rounded-none z-10"
                                            : "bg-white border-gray-100 text-slate-500 rounded lg:rounded-none"
                                    }`}
                                style={
                                    isDark
                                        ? isActive
                                            ? {
                                                ...dark.tabActive,
                                                borderColor: GOLD_BORDER,
                                                borderWidth: 1,
                                                borderStyle: "solid",
                                            }
                                            : {
                                                ...dark.tabInactive,
                                                borderColor: t.cardBorder,
                                                borderWidth: 1,
                                                borderStyle: "solid",
                                            }
                                        : undefined
                                }
                            >
                                {isActive && isDark && (
                                    <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" aria-hidden />
                                )}

                                <span
                                    className={`text-lg lg:text-2xl mb-1 lg:mb-0 lg:mr-3 ${isActive ? "text-[#B68A35]" : ""}`}
                                    style={isDark && !isActive ? dark.textMuted : undefined}
                                >
                                    {tab.icon}
                                </span>

                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] sm:text-[12px] lg:text-md font-bold lg:font-medium whitespace-nowrap">
                                        {tab.name}
                                    </span>

                                    <span
                                        className={`flex items-center justify-center min-w-5 h-5 lg:w-6 lg:h-6 text-[10px] lg:text-sm rounded-full font-bold lg:font-normal ${isDark
                                                ? ""
                                                : isActive
                                                    ? "bg-[#B68A35] text-white lg:bg-[#FAF3E6] lg:text-[#B68A35]"
                                                    : "bg-[#FAF3E6] text-[#B68A35] lg:bg-gray-100 lg:text-slate-500"
                                            }`}
                                        style={
                                            isDark
                                                ? isActive
                                                    ? dark.tabCountActive
                                                    : dark.tabCountInactive
                                                : undefined
                                        }
                                    >
                                        {tab.count}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Project Grid - Single Row Carousel */}
                <div className="relative group">
                    <div className="flex gap-6 overflow-hidden">
                        {visibleCards.map((project) => (
                            <ProjectCard key={project.id} project={project} isDark={isDark} />
                        ))}
                    </div>

                </div>

                {/* Mobile Pagination */}
                <div className="flex lg:hidden items-center justify-between mt-8">
                    <button
                        onClick={handlePrevCard}
                        disabled={currentCardIndex === 0}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center text-slate-400 hover:text-[#B68A35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "" : "border-gray-200"}`}
                        style={isDark ? dark.card : undefined}
                    >
                        <BsChevronLeft />
                    </button>
                    <span
                        className={`text-sm font-medium ${isDark ? "" : "text-slate-500"}`}
                        style={isDark ? dark.textMuted : undefined}
                    >
                        {Math.min(currentCardIndex + 1, filteredProjects.length)} / {filteredProjects.length}
                    </span>
                    <button
                        onClick={handleNextCard}
                        disabled={currentCardIndex >= maxStartIndex}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center text-slate-400 hover:text-[#B68A35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "" : "border-gray-200"}`}
                        style={isDark ? dark.card : undefined}
                    >
                        <BsChevronRight />
                    </button>
                </div>

                {/* Desktop Pagination Dots */}
                <div className="hidden lg:flex justify-center gap-2 mt-12">
                    {Array.from({ length: paginationCount }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentCardIndex(index)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${currentCardIndex === index ? "w-8 bg-[#B68A35]" : `w-2 hover:opacity-80 ${isDark ? "" : "bg-gray-200 hover:bg-gray-300"}`}`}
                            style={isDark && currentCardIndex !== index ? dark.track : undefined}
                        />
                    ))}
                </div>

                <ExpertSection />

                {/* Disclaimer Footer */}
                <div
                    className={`mt-12 p-2 sm:p-6 rounded-xl lg:rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-2 sm:gap-4 transition-colors ${isDark ? "" : "bg-[#FAF9F6] border-[#F2EEE8]"}`}
                    style={isDark ? dark.verifyBanner : undefined}
                >
                    <div className="flex-1 min-w-0">
                        <div className="lg:hidden">
                            <MobileNoteBox
                                icon={<HiOutlineInformationCircle className="text-xl" />}
                                textClassName={isDark ? "" : "text-slate-600"}
                                textStyle={isDark ? dark.textSecondary : undefined}
                            >
                                {data.disclaimer?.text || "Project details, prices, and handover dates are subject to change. Please verify all information before making any investment decision."}
                            </MobileNoteBox>
                        </div>
                        <div className="hidden lg:flex gap-3">
                            <HiOutlineInformationCircle className="text-[#B68A35] shrink-0 text-xl" />
                            <p
                                className={`text-sm leading-relaxed ${isDark ? "" : "text-slate-600"}`}
                                style={isDark ? dark.textSecondary : undefined}
                            >
                                {data.disclaimer?.text || "Project details, prices, and handover dates are subject to change. Please verify all information before making any investment decision."}
                            </p>
                        </div>
                    </div>
                    <div
                        className={`text-[12px] leading-normal lg:text-sm lg:leading-normal whitespace-nowrap ${isDark ? "" : "text-slate-500"}`}
                        style={isDark ? dark.textMuted : undefined}
                    >
                        {data.disclaimer?.lastUpdatedLabel || "Last updated:"} <span className="font-bold text-[#B68A35]">{data.disclaimer?.lastUpdatedDate || "21 February 2026"}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, isDark }) => {
    const { t, dark } = useThemeStyles();
    const [firstWord, ...remainingWords] = project.title.split(' ');
    const [accordionOpen, setAccordionOpen] = useState(false);
    return (
        <div
            className={`w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] flex-shrink-0 rounded-xl lg:rounded-3xl border overflow-hidden flex flex-col transition-all hover:shadow-xl ${isDark ? "" : "bg-white border-gray-100"}`}
            style={isDark ? dark.card : undefined}
        >

            {/* Image Container */}
            <div className="relative h-60 lg:h-48">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute top-4 left-4 bg-[#6A9923] text-white text-[10px] font-bold px-3 py-1 rounded lg:rounded-xl tracking-wider">
                    {project.badge}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 lg:p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-[#64748b] mb-1">
                    <GrLocation className="text-sm text-[#B68A35]" />
                    <span
                        className={`text-[11px] font-medium uppercase tracking-tight ${isDark ? "" : "text-gray-600"}`}
                        style={isDark ? dark.textMuted : undefined}
                    >
                        {project.location}
                    </span>
                </div>
                <h3 className={`text-xl lg:text-2xl font-serif mb-4 ${isDark ? "" : "text-[#B68A35]"}`}>
                    <span style={isDark ? { color: t.text } : undefined} className={isDark ? "" : "text-black"}>{firstWord}</span>{' '}
                    <span className="text-[#B68A35]">{remainingWords.join(' ')}</span>
                </h3>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-1 rounded lg:rounded-xl overflow-hidden mb-6">
                    <StatBox icon={<AiOutlineDollarCircle />} label="STARTING PRICE" value={project.price} isDark={isDark} />
                    <StatBox icon={<PiHouseBold />} label="UNIT MIX" value={project.unitMix} isDark={isDark} isSmall />
                    <StatBox icon={<MdOutlineCalendarToday />} label="HANDOVER" value={project.handover} isDark={isDark} />
                    <StatBox icon={<LuLayers />} label="PAYMENT PLAN" value={project.paymentPlan} isDark={isDark} />
                </div>

                {/* Timeline */}
                <div className="my-6">
                    <div className="flex justify-between items-end mb-2">
                        <div
                            className={`flex items-center gap-1.5 text-[14px] uppercase ${isDark ? "" : "text-slate-800"}`}
                            style={isDark ? dark.text : undefined}
                        >
                            <span className="text-[#B68A35]"><IoMdTime className='text-[18px]' /></span> Timeline
                        </div>
                        <span
                            className={`text-[14px] ${isDark ? "" : "text-slate-900"}`}
                            style={isDark ? dark.text : undefined}
                        >
                            {project.monthsToGo} months to go
                        </span>
                    </div>
                    <div
                        className={`h-2 w-full rounded-full overflow-hidden ${isDark ? "" : "bg-gray-100"}`}
                        style={isDark ? dark.track : undefined}
                    >
                        <div
                            className="h-full bg-[#B68A35] rounded-full"
                            style={{ width: `${project.timelineProgress}%` }}
                        />
                    </div>
                    <div
                        className={`flex justify-between mt-2 text-[13px] font-medium uppercase ${isDark ? "" : "text-slate-600"}`}
                        style={isDark ? dark.textSecondary : undefined}
                    >
                        <span>{project.launchDate}</span>
                        <span>{project.completionDate}</span>
                    </div>
                </div>

                {/* Info Box */}
                <div
                    className={`p-2 rounded lg:rounded-xl border mb-6 ${isDark ? "" : "bg-[#FDFBF7] border-[#F3EFE9]"}`}
                    style={isDark ? dark.verifyBanner : undefined}
                >
                    <div className="lg:hidden">
                        <MobileNoteBox
                            icon={<MdPayments className="text-[20px]" />}
                            title={
                                <>
                                    Payment Plan <span className="text-[#B68A35]">{project.paymentPlan}</span>
                                </>
                            }
                            textClassName={`font-medium ${isDark ? "" : "text-slate-500"}`}
                            textStyle={isDark ? dark.textMuted : undefined}
                        >
                            10% down • 70% during construction • 20% on handover
                        </MobileNoteBox>
                    </div>
                    <div className="hidden lg:block min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                            <MdPayments className="text-[#B68A35] text-[20px]" />
                            <span
                                className={`text-[14px] font-bold uppercase tracking-tight ${isDark ? "" : "text-slate-800"}`}
                                style={isDark ? dark.text : undefined}
                            >
                                Payment Plan <span className="text-[#B68A35] ml-1">{project.paymentPlan}</span>
                            </span>
                        </div>
                        <p
                            className={`text-[12px] leading-relaxed font-medium ${isDark ? "" : "text-slate-500"}`}
                            style={isDark ? dark.textMuted : undefined}
                        >
                            10% down • 70% during construction • 20% on handover
                        </p>
                    </div>
                </div>

                {/* Accordion */}
                <button
                    onClick={() => setAccordionOpen((s) => !s)}
                    aria-expanded={accordionOpen}
                    className={`w-full flex items-center justify-between py-3 px-1 border-t text-[11px] font-bold uppercase tracking-wider mb-4 ${isDark ? "" : "border-gray-100 text-slate-600"}`}
                    style={isDark ? { ...dark.borderDivider, ...dark.textSecondary } : undefined}
                >
                    <div className="flex items-center gap-2 text-[12px]">
                        <LuShieldCheck className="text-[#B68A35] text-[18px]" />
                        SOURCES & VERIFICATION
                    </div>
                    <BsChevronDown className={`transform transition-transform ${accordionOpen ? 'rotate-180' : ''}`} />
                </button>

                {accordionOpen && (
                    <div
                        className={`mb-6 p-4 rounded lg:rounded-lg border ${isDark ? "" : "bg-[#FFFDF8] border-[#F3EFE9] text-slate-700"}`}
                        style={isDark ? { ...dark.panelInner, ...dark.textSecondary } : undefined}
                    >
                        <div className="lg:hidden">
                            <MobileNoteBox
                                icon={<LuShieldCheck className="text-[18px]" />}
                                title="Sources & Verification"
                            >
                                <div className="grid grid-cols-1 gap-3">
                                    <div>
                                        <p className={`text-xs font-bold uppercase ${isDark ? "" : "text-slate-500"}`} style={isDark ? dark.textMuted : undefined}>Project Information</p>
                                        <p className="text-[13px] leading-normal font-medium">{project.sourceVerification?.projectInfo?.source || 'N/A'}</p>
                                        {project.sourceVerification?.projectInfo?.url && (
                                            <a href={project.sourceVerification.projectInfo.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-[13px] leading-normal underline">
                                                View source
                                            </a>
                                        )}
                                    </div>

                                    <div>
                                        <p className={`text-xs font-bold uppercase ${isDark ? "" : "text-slate-500"}`} style={isDark ? dark.textMuted : undefined}>Pricing Data</p>
                                        <p className="text-[13px] leading-normal font-medium">{project.sourceVerification?.pricingData?.source || 'N/A'}</p>
                                        {project.sourceVerification?.pricingData?.url && (
                                            <a href={project.sourceVerification.pricingData.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-[13px] leading-normal underline">
                                                View pricing source
                                            </a>
                                        )}
                                    </div>

                                    <div>
                                        <p className={`text-xs font-bold uppercase ${isDark ? "" : "text-slate-500"}`} style={isDark ? dark.textMuted : undefined}>Handover Date Source</p>
                                        <p className="text-[13px] leading-normal font-medium">{project.sourceVerification?.handoverDate?.source || 'N/A'}</p>
                                        {project.sourceVerification?.handoverDate?.url && (
                                            <a href={project.sourceVerification.handoverDate.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-[13px] leading-normal underline">
                                                View handover source
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex items-start gap-4 mt-2">
                                        <div>
                                            <p className={`text-xs font-bold uppercase ${isDark ? "" : "text-slate-500"}`} style={isDark ? dark.textMuted : undefined}>Last Verified</p>
                                            <p className="text-[13px] leading-normal font-medium">{project.sourceVerification?.lastVerified || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </MobileNoteBox>
                        </div>
                        <div className="hidden lg:grid grid-cols-1 gap-3 min-w-0">
                            <div>
                                <p className={`text-xs font-bold uppercase ${isDark ? "" : "text-slate-500"}`} style={isDark ? dark.textMuted : undefined}>Project Information</p>
                                <p className="text-sm leading-normal font-medium">{project.sourceVerification?.projectInfo?.source || 'N/A'}</p>
                                {project.sourceVerification?.projectInfo?.url && (
                                    <a href={project.sourceVerification.projectInfo.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-sm underline">
                                        View source
                                    </a>
                                )}
                            </div>

                            <div>
                                <p className={`text-xs font-bold uppercase ${isDark ? "" : "text-slate-500"}`} style={isDark ? dark.textMuted : undefined}>Pricing Data</p>
                                <p className="text-sm leading-normal font-medium">{project.sourceVerification?.pricingData?.source || 'N/A'}</p>
                                {project.sourceVerification?.pricingData?.url && (
                                    <a href={project.sourceVerification.pricingData.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-sm underline">
                                        View pricing source
                                    </a>
                                )}
                            </div>

                            <div>
                                <p className={`text-xs font-bold uppercase ${isDark ? "" : "text-slate-500"}`} style={isDark ? dark.textMuted : undefined}>Handover Date Source</p>
                                <p className="text-sm leading-normal font-medium">{project.sourceVerification?.handoverDate?.source || 'N/A'}</p>
                                {project.sourceVerification?.handoverDate?.url && (
                                    <a href={project.sourceVerification.handoverDate.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-sm underline">
                                        View handover source
                                    </a>
                                )}
                            </div>

                            <div className="flex items-start gap-4 mt-2">
                                <div>
                                    <p className={`text-xs font-bold uppercase ${isDark ? "" : "text-slate-500"}`} style={isDark ? dark.textMuted : undefined}>Last Verified</p>
                                    <p className="text-sm leading-normal font-medium">{project.sourceVerification?.lastVerified || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <button className="relative w-full bg-[#B38B3F] hover:bg-[#967332] text-white py-4 rounded lg:rounded-xl font-bold text-sm flex items-center justify-center transition-colors">
                    <div className="flex items-center gap-2">
                        <IoDocumentTextOutline className="text-xl" />
                        <span>Download Brochure</span>
                    </div>
                    <div className="absolute right-4 flex items-center">
                        <HiOutlineDownload className="text-2xl" />
                    </div>
                </button>
            </div>
        </div>
    );
};

const StatBox = ({ icon, label, value, isDark, isSmall }) => {
    const { dark } = useThemeStyles();
    return (
        <div
            className={`p-3 lg:p-2 lg:py-3 flex gap-2 rounded lg:rounded-lg ${isDark ? "border" : "bg-[#fbf9f6] border border-[#F3EFE9]"}`}
            style={isDark ? dark.statCard : undefined}
        >
            <div className="flex items-start gap-2 text-[#B68A35] text-2xl mt-1">
                {icon}
            </div>
            <div>
                <p
                    className={`text-[11px] font-bold tracking-wider uppercase ${isDark ? "" : "text-slate-500"}`}
                    style={isDark ? dark.textMuted : undefined}
                >
                    {label}
                </p>
                <p
                    className={`text-[11px] font-bold ${isDark ? "" : "text-gray-700"}`}
                    style={isDark ? dark.textSecondary : undefined}
                >
                    {value}
                </p>
            </div>
        </div>
    );
};

// Helper function for tab icons
const getTabIcon = (iconName) => {
    const icons = {
        'IoGridOutline': <IoGridOutline />,
        'PiBuildingOfficeLight': <PiBuildingOfficeLight />,
        'BsHouse': <BsHouse />,
        'BsBuildings': <BsBuildings />
    };
    return icons[iconName] || <IoGridOutline />;
};

export default Section2;