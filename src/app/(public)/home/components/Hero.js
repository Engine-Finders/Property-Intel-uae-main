"use client";

import React, { useState } from 'react';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GiLaurels } from "react-icons/gi";
import { MdOutlineVerifiedUser, MdCalendarToday } from "react-icons/md";
import { BsBuildings, BsBriefcase, BsChevronRight } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsArrowRight } from "react-icons/bs";
import { RiCustomerService2Line } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { useThemeStyles } from "@/app/components/context/themeStyles";

import Link from "next/link";

const Hero = ({ data }) => {
    const [activeTab, setActiveTab] = useState('performance');
    const { t, isDark, dark: dk } = useThemeStyles();

    if (!data) {
        return (
            <div
                className={`font-sans antialiased transition-colors duration-300 ${isDark ? "" : "bg-[#FCFBFA] text-slate-800"}`}
                style={dk?.page}
            >
                <div className="max-w-[1400px] mx-auto px-2 sm:px-6 py-20">
                    <p className="text-center" style={{ color: isDark ? t.textSecondary : '#666' }}>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`font-sans antialiased transition-colors duration-300 ${isDark ? "" : "bg-[#FCFBFA] text-slate-800"}`}
            style={dk?.page}
        >
            {/* Hero Background Section */}
            <div className="relative h-[520px] lg:h-[480px] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/projects/cm-projects.webp')" }}
                >
                    <div
                        className={`lg:block absolute inset-0 transition-colors duration-300 ${isDark ? "" : "bg-gradient-to-r from-white/95 via-white/60 to-transparent"}`}
                        style={dk?.heroOverlayLeft}
                    />
                </div>

                <div className="relative max-w-[1400px] mx-auto px-2 sm:px-6 pt-4 sm:pt-10 h-full">

                    <div className="mt-8 lg:mt-14 max-w-2xl">
                        <h2
                            className={`text-[40px] lg:text-5xl xl:text-6xl font-serif leading-none lg:leading-[1.1] ${isDark ? "" : "text-slate-900"}`}
                            style={{ fontWeight: 510, ...(isDark ? { color: t.text } : {}) }}
                        >
                            {data.hero?.title?.line1 || "Emaar Properties – "}<br />
                            <span className="text-[#B68A35]">
                                {data.hero?.title?.line2 || "Projects, Payment Plans "}<br className="hidden lg:block" />{data.hero?.title?.line3 || "& Reviews (2026)"}
                            </span>
                        </h2>
                        <p
                            className={`mt-4 lg:mt-6 max-w-md text-[15px] leading-[19px] lg:text-md lg:leading-relaxed ${isDark ? "" : "text-slate-600"}`}
                            style={isDark ? { color: t.textSecondary } : undefined}
                        >
                            {data.hero?.description || "Explore Emaar's complete portfolio: 200+ projects across Dubai. Compare payment plans, check delivery history, and read verified resident reviews."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Overlap */}
            <div className="max-w-[1400px] mx-auto px-2 sm:px-6 -mt-50 lg:-mt-10 relative z-10 pb-20">
                <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">

                    <div className="flex-1 min-w-0 w-full">
                        {/* Developer Trust Card */}
                        <div
                            className={`rounded-2xl p-2 sm:p-5 lg:p-6 xl:p-8 mb-6 border shadow-xl lg:shadow-sm transition-colors duration-300 ${isDark ? "" : "bg-white border-white"}`}
                            style={dk?.panel}
                        >
                            <div className="mb-2 flex items-start justify-between gap-3 sm:block">
                                <h3
                                    className={`text-2xl lg:text-3xl xl:text-4xl font-normal font-serif ${isDark ? "" : "text-slate-900"}`}
                                    style={isDark ? { color: t.text } : undefined}
                                >
                                    {data.developerTrust?.title?.line1 || "Developer "}<span className="text-[#B8860B] lg:italic">{data.developerTrust?.title?.highlight || "Trust"}</span> {data.developerTrust?.title?.line2 || "Snapshot: Emaar"}
                                </h3>
                                <span className="sm:hidden mt-1 shrink-0 text-lg font-semibold text-[#B8860B] font-[Merriweather] tabular-nums">
                                    {data.developerTrust?.trustScore || "9.0"}/10
                                </span>
                            </div>
                            <p
                                className={`text-xs lg:text-sm mb-6 lg:mb-8 leading-relaxed ${isDark ? "" : "text-slate-600"}`}
                                style={isDark ? { color: t.textSecondary } : undefined}
                            >
                                {data.developerTrust?.description || "Shaping Dubai's skyline with iconic communities since 1997 – the master developer behind Downtown Dubai and Burj Khalifa."}
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 xl:gap-4">
                                {data.developerTrust?.stats?.map((stat, index) => (
                                    <StatCard
                                        key={index}
                                        icon={getStatIcon(stat.iconName)}
                                        label={stat.label}
                                        value={stat.value}
                                        sub={stat.sub}
                                    />
                                ))}
                            </div>

                            {/* Verification Badge */}
                            <div
                                className={`mt-6 border rounded-xl lg:rounded-lg p-2 sm:p-4 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-[11px] lg:text-sm ${isDark ? "" : "bg-[#FAF3E6] lg:bg-[#FEF9EC] border-[#F3E8D2] text-slate-600"}`}
                                style={dk?.verifyBanner}
                            >
                                <div className="flex items-center gap-2 font-bold text-[#B38B3F]">
                                    <MdOutlineVerifiedUser className='w-5 h-5 sm:w-6 sm:h-6' />
                                    <div>
                                        <p className={`lg:hidden font-bold ${isDark ? "" : "text-[#8B6E3D]"}`} style={isDark ? { color: t.textSecondary } : undefined}>{data.verification?.badgeLabel || "Analyst Verification"}</p>
                                        <span className={isDark ? "" : "text-slate-700"} style={isDark ? { color: t.text } : undefined}>{data.verification?.teamName || "PropertyIntel Research Team"}</span>
                                    </div>
                                </div>
                                <div className={`hidden lg:block w-px h-3 ${isDark ? "" : "bg-slate-300"}`} style={isDark ? dk.divider : undefined} />
                                <span className={isDark ? "" : "text-slate-500"} style={isDark ? { color: t.textMuted } : undefined}>{data.verification?.verifiedDate || "Verified: 21 February 2026"}</span>
                            </div>
                        </div>

                        <div
                            className={`rounded-2xl border shadow-sm overflow-hidden font-sans transition-colors duration-300 ${isDark ? "" : "bg-white border-gray-100"}`}
                            style={dk?.card}
                        >
                            {/* Tab Headers */}
                            <div
                                className={`flex border-b rounded-t-2xl overflow-hidden transition-colors duration-300 ${isDark ? "" : "bg-[#F2F2F2] border-gray-200"}`}
                                style={dk?.tabBar}
                            >
                                <button
                                    onClick={() => setActiveTab('performance')}
                                    className={`relative flex-1 py-4 text-xs lg:text-sm transition-all duration-200 ${activeTab === 'performance'
                                        ? `${isDark ? "font-semibold rounded-tl-2xl" : "text-[#B8860B] bg-white rounded-tl-2xl font-semibold"}`
                                        : `${isDark ? "" : "text-gray-500 hover:text-gray-700 bg-[#F2F2F2]"}`
                                        }`}
                                    style={
                                        isDark
                                            ? activeTab === "performance"
                                                ? { ...dk.tabActive, color: "#B8860B" }
                                                : dk.tabInactive
                                            : undefined
                                    }
                                >
                                    {data.tabs?.performance || "Performance Stats"}
                                    {activeTab === 'performance' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8860B]" />
                                    )}
                                </button>

                                <button
                                    onClick={() => setActiveTab('sources')}
                                    className={`relative flex-1 py-4 text-xs lg:text-sm transition-all duration-200 ${activeTab === 'sources'
                                        ? `${isDark ? "font-semibold rounded-tr-2xl" : "text-[#8B6E3D] bg-white rounded-tr-2xl font-semibold"}`
                                        : `${isDark ? "" : "text-gray-500 hover:text-gray-700 bg-[#F2F2F2]"}`
                                        }`}
                                    style={
                                        isDark
                                            ? activeTab === "sources"
                                                ? { ...dk.tabActive, color: "#8B6E3D" }
                                                : dk.tabInactive
                                            : undefined
                                    }
                                >
                                    {data.tabs?.sources || "Sources & Methodology"}
                                    {activeTab === 'sources' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B38B3F]" />
                                    )}
                                </button>
                            </div>

                            {/* Tab Content - Performance */}
                            {activeTab === 'performance' ? (
                                <div className="lg:py-2 flex flex-col lg:flex-row items-stretch">
                                    {data.performanceStats?.map((stat, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center lg:items-start justify-between lg:justify-start lg:flex-1 gap-4 lg:gap-3 xl:gap-5 p-4 lg:pr-2 lg:py-4 border-b lg:border-b-0 ${index < data.performanceStats.length - 1 ? 'lg:border-r' : ''} transition-colors duration-300 ${isDark ? "" : "border-gray-100"}`}
                                            style={isDark ? { borderColor: dk.dividerColor } : undefined}
                                        >
                                            <div className="flex gap-3 xl:gap-4 items-center lg:items-start">
                                                <div
                                                    className={`w-10 h-10 xl:w-14 xl:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDark ? "" : "bg-[#FAF6F0]"}`}
                                                    style={dk?.iconCircle}
                                                >
                                                    {getPerformanceIcon(stat.iconSvg)}
                                                </div>
                                                <div>
                                                    <p className={`text-[12px] xl:text-[14px] font-bold leading-tight ${isDark ? "" : "text-gray-800"}`} style={isDark ? { color: t.text } : undefined}>{stat.label}</p>
                                                    <p className="text-xl xl:text-3xl text-[#B38B3F] font-semibold font-[Merriweather] tabular-nums">
                                                        {stat.value}
                                                    </p>
                                                    {stat.sub && (
                                                        <p className={`text-[10px] xl:text-[11px] leading-relaxed ${isDark ? "" : "text-gray-400"}`} style={isDark ? { color: t.textMuted } : undefined}>
                                                            {stat.sub}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <BsChevronRight className="lg:hidden text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Tab Content - Sources */
                                <div
                                    className={`p-0 lg:p-6 transition-colors duration-300 ${isDark ? "" : "bg-white"}`}
                                    style={isDark ? { background: "#25282d" } : undefined}
                                >
                                    <div className="hidden lg:block">
                                        <div className="flex flex-col">
                                            {data.sourcesData?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex items-start py-3 border-t ${isDark ? "" : "border-gray-100"} ${index === data.sourcesData.length - 1 ? `border-b ${isDark ? "" : ""}` : ""}`}
                                                    style={isDark ? { borderColor: dk.dividerColor } : undefined}
                                                >
                                                    <div className="w-[20%] pr-4">
                                                        <p className={`text-[12px] xl:text-[13px] ${isDark ? "" : "text-gray-600"}`} style={isDark ? { color: t.textSecondary } : undefined}><span className="font-bold">Stat:</span> {item.stat}</p>
                                                    </div>
                                                    <div className="flex-1 pr-4">
                                                        <p className={`text-[12px] xl:text-[13px] leading-relaxed ${isDark ? "" : "text-gray-600"}`} style={isDark ? { color: t.textSecondary } : undefined}><span className="font-bold">Source:</span> {item.source}</p>
                                                    </div>
                                                    <div className="w-[30%] flex items-center justify-between">
                                                        {item.link ? (
                                                            <Link
                                                                href={item.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-between w-full group"
                                                            >
                                                                <p className={`text-[12px] xl:text-[13px] truncate group-hover:underline transition-all ${isDark ? "" : "text-[#B38B3F]"}`} style={isDark ? dk.goldLink : undefined}>
                                                                    <span className={`font-bold ${isDark ? "" : "text-gray-600"}`} style={isDark ? { color: t.textSecondary } : undefined}>URL:</span> {item.url}
                                                                </p>
                                                                <HiOutlineExternalLink className={`ml-2 shrink-0 transition-transform group-hover:scale-110 ${isDark ? "" : "text-[#B38B3F]"}`} style={isDark ? dk.goldLink : undefined} />
                                                            </Link>
                                                        ) : (
                                                            <div className="flex items-center justify-between w-full">
                                                                <p className={`text-[12px] xl:text-[13px] truncate ${isDark ? "" : "text-gray-400"}`} style={isDark ? { color: t.textMuted } : undefined}><span className="font-bold">URL:</span> {item.url}</p>
                                                                <HiOutlineExternalLink className={`ml-2 shrink-0 ${isDark ? "" : "text-gray-300"}`} style={isDark ? { color: t.cardBorder } : undefined} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="lg:hidden flex flex-col">
                                        {data.sourcesData?.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-between p-4 border-b ${isDark ? "" : "border-gray-50"}`}
                                                style={isDark ? { borderColor: dk.dividerColor } : undefined}
                                            >
                                                <div className="text-[12px] leading-tight pr-4">
                                                    <p className={`font-bold mt-1 ${isDark ? "" : "text-gray-900"}`} style={isDark ? { color: t.text } : undefined}>
                                                        Stat: <span className={`font-normal ${isDark ? "" : "text-gray-600"}`} style={isDark ? { color: t.textSecondary } : undefined}>{item.stat}</span>
                                                    </p>
                                                    <p className={`font-bold mt-1 ${isDark ? "" : "text-gray-900"}`} style={isDark ? { color: t.text } : undefined}>
                                                        Source: <span className={`font-normal ${isDark ? "" : "text-gray-600"}`} style={isDark ? { color: t.textSecondary } : undefined}>{item.source}</span>
                                                    </p>
                                                </div>

                                                {item.link ? (
                                                    <Link
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="active:scale-90 transition-transform"
                                                    >
                                                        <HiOutlineExternalLink className={`text-xl shrink-0 ${isDark ? "" : "text-[#B38B3F]"}`} style={isDark ? dk.goldLink : undefined} />
                                                    </Link>
                                                ) : (
                                                    <HiOutlineExternalLink className={`text-xl shrink-0 ${isDark ? "" : "text-gray-300"}`} style={isDark ? { color: t.cardBorder } : undefined} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Expert Section */}
                        <div
                            className={`mt-4 border rounded-2xl p-2 lg:hidden transition-colors duration-300 ${isDark ? "" : "border-[#e8e1d5]"}`}
                            style={dk?.expertCard}
                        >
                            <div className="flex items-center gap-3 mb-4 justify-center">
                                <div className='border-2 border-[#b07d2d] rounded-full'>
                                    <div className="w-10 h-10 rounded-full bg-[#b07d2d] border-2 border-white flex items-center justify-center text-[#b07d2d]">
                                        <RiCustomerService2Line className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className={`text-[13px] xl:text-sm leading-tight ${isDark ? "" : "text-slate-900"}`} style={isDark ? { color: t.text } : undefined}>{data.expertSection?.title || "Speak to an Investment Expert"}</h4>
                                    <p className={`text-[10px] ${isDark ? "" : "text-slate-500"}`} style={isDark ? { color: t.textMuted } : undefined}>{data.expertSection?.subtitle || "Get expert guidance. It's free & no obligation."}</p>
                                </div>
                            </div>

                            <div className={`h-[1px] mb-4 ${isDark ? "" : "bg-[#eee4d7]"}`} style={isDark ? dk.divider : undefined} />

                            <div className="grid grid-cols-3 gap-2">
                                {data.expertSection?.contacts?.map((contact, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center cursor-pointer group">
                                        <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 group-hover:bg-[#b07d2d] group-hover:text-white transition-colors ${isDark ? "" : "border-[#b07d2d] text-[#b07d2d]"}`} style={isDark ? dk.expertIcon : undefined}>
                                            {getContactIcon(contact.iconName)}
                                        </div>
                                        <p className={`text-[13px] font-bold ${isDark ? "" : "text-slate-800"}`} style={isDark ? { color: t.text } : undefined}>{contact.label}</p>
                                        <p className={`text-[10px] ${isDark ? "" : "text-slate-600"}`} style={isDark ? { color: t.textMuted } : undefined}>{contact.subtext}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Floating Card - Desktop */}
                    <div className="hidden lg:block w-[310px] xl:w-[360px] shrink-0 sticky top-4">
                        <div
                            className={`p-3 xl:p-4 rounded-3xl shadow-sm border transition-colors duration-300 ${isDark ? "" : "bg-white border-gray-100"}`}
                            style={dk?.panel}
                        >
                            <div
                                className={`rounded-[24px] p-6 xl:p-4 transition-colors duration-300 ${isDark ? "border" : "bg-[#fbf8f4]"}`}
                                style={isDark ? dk.panelInner : undefined}
                            >
                                <p className="text-[9px] font-black tracking-[0.2em] text-[#B68A35] uppercase">{data.rightCard?.trustScoreLabel || "Trust Score"}</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-6xl xl:text-7xl font-serif text-[#B68A35] leading-none">{data.rightCard?.trustScoreValue || "9.0"}</span>
                                    <span className="text-2xl xl:text-3xl font-serif text-[#B68A35]">/ 10</span>
                                </div>
                                <div className={`relative w-full h-2 rounded-full mt-6 ${isDark ? "" : "bg-white"}`} style={dk?.track}>
                                    <div className="bg-[#B68A35] h-full rounded-full relative" style={{ width: `${data.rightCard?.trustScorePercentage || 90}%` }}>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 xl:w-4 xl:h-4 bg-[#B68A35] rounded-full shadow-md" />
                                    </div>
                                </div>

                                <div className="mt-8 xl:mt-10 flex gap-3 xl:gap-4">
                                    <GiLaurels className="w-7 h-7 xl:w-8 xl:h-8 text-[#B68A35] shrink-0" />
                                    <div>
                                        <h4 className={`font-bold text-[13px] xl:text-sm ${isDark ? "" : "text-slate-900"}`} style={isDark ? { color: t.text } : undefined}>{data.rightCard?.badgeTitle || "Top Tier Developer"}</h4>
                                        <p className={`text-[10px] xl:text-[11px] mt-1 leading-normal ${isDark ? "" : "text-slate-500"}`} style={isDark ? { color: t.textMuted } : undefined}>{data.rightCard?.badgeSubtitle || "Proven track record in delivery and transparency"}</p>
                                    </div>
                                </div>

                                <div className="mt-6 xl:mt-8 flex gap-3 xl:gap-4 items-center">
                                    <MdOutlineVerifiedUser className="w-7 h-7 xl:w-8 xl:h-8 text-[#B68A35] shrink-0" />
                                    <div>
                                        <h4 className={`font-bold text-[13px] xl:text-sm ${isDark ? "" : "text-slate-900"}`} style={isDark ? { color: t.text } : undefined}>{data.rightCard?.verifiedLabel || "Verified Research"}</h4>
                                        <p className={`text-[10px] xl:text-[11px] mt-1 leading-normal ${isDark ? "" : "text-slate-500"}`} style={isDark ? { color: t.textMuted } : undefined}>{data.rightCard?.verifiedDate || "Updated Feb 2026"}</p>
                                    </div>
                                </div>

                                <button className="w-full mt-8 bg-gradient-to-r from-[#b07d2d] to-[#c79a51] hover:opacity-90 text-white rounded-2xl p-2 py-3 flex items-center justify-between group transition-all">
                                    <div className="flex items-center gap-2">
                                        <HiOutlineBuildingOffice2 className="w-6 h-6 xl:w-7 xl:h-7" />
                                        <span className="text-sm xl:text-base font-semibold">{data.rightCard?.ctaButtonText || "Get Availability & Floor Plans"}</span>
                                    </div>
                                    <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Expert Section in Right Card */}
                                <div
                                    className={`mt-4 border rounded-2xl p-2 transition-colors duration-300 ${isDark ? "" : "border-[#e8e1d5]"}`}
                                    style={dk?.expertCard}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className='border-2 border-[#b07d2d] rounded-full'>
                                            <div className="w-10 h-10 rounded-full bg-[#b07d2d] border-2 border-white flex items-center justify-center text-[#b07d2d]">
                                                <RiCustomerService2Line className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={`text-[13px] xl:text-sm leading-tight ${isDark ? "" : "text-slate-900"}`} style={isDark ? { color: t.text } : undefined}>{data.expertSection?.title || "Speak to an Investment Expert"}</h4>
                                            <p className={`text-[10px] ${isDark ? "" : "text-slate-500"}`} style={isDark ? { color: t.textMuted } : undefined}>{data.expertSection?.subtitle || "Get expert guidance. It's free & no obligation."}</p>
                                        </div>
                                    </div>

                                    <div className={`h-[1px] mb-4 ${isDark ? "" : "bg-[#eee4d7]"}`} style={isDark ? dk.divider : undefined} />

                                    <div className="grid grid-cols-3 gap-2">
                                        {data.expertSection?.contacts?.map((contact, idx) => (
                                            <div key={idx} className="flex flex-col items-center text-center cursor-pointer group">
                                                <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 group-hover:bg-[#b07d2d] group-hover:text-white transition-colors ${isDark ? "" : "border-[#b07d2d] text-[#b07d2d]"}`} style={isDark ? dk.expertIcon : undefined}>
                                                    {getContactIcon(contact.iconName)}
                                                </div>
                                                <p className={`text-[13px] font-bold ${isDark ? "" : "text-slate-800"}`} style={isDark ? { color: t.text } : undefined}>{contact.label}</p>
                                                <p className={`text-[10px] ${isDark ? "" : "text-slate-600"}`} style={isDark ? { color: t.textMuted } : undefined}>{contact.subtext}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, sub }) => {
    const { t, isDark, dark: dk } = useThemeStyles();
    return (
        <div
            className={`border p-3 xl:p-4 flex flex-col gap-0 xl:gap-2 min-w-0 transition-colors duration-300 ${isDark ? "" : "border-slate-100 bg-white"}`}
            style={dk?.statCard}
        >
            <div className="flex items-start lg:items-center gap-2 xl:gap-4">
                <div className="shrink-0 text-[#af8840] text-xl lg:text-2xl xl:text-4xl pt-0.5">
                    {icon}
                </div>
                <div className="flex flex-col min-w-0">
                    <span
                        className={`text-[10px] xl:text-[14px] font-medium leading-tight truncate ${isDark ? "" : "text-slate-700"}`}
                        style={isDark ? { color: t.textSecondary } : undefined}
                    >
                        {label}
                    </span>
                    <div className="text-xl xl:text-3xl text-[#B38B3F] font-semibold font-[Merriweather] tabular-nums">
                        {value}
                    </div>
                </div>
            </div>
            {sub && (
                <p
                    className={`text-[11px] xl:text-[13px] leading-snug font-normal border-t pt-2 ${isDark ? "" : "text-slate-500 border-slate-50"}`}
                    style={isDark ? { color: t.textMuted, borderColor: dk.dividerColor } : undefined}
                >
                    {sub}
                </p>
            )}
        </div>
    );
}

// Helper functions for icons
const getStatIcon = (iconName) => {
    const icons = {
        'MdOutlineVerifiedUser': <MdOutlineVerifiedUser className="w-6 h-6" />,
        'MdCalendarToday': <MdCalendarToday className="w-6 h-6" />,
        'BsBuildings': <BsBuildings className="w-6 h-6" />,
        'BsBriefcase': <BsBriefcase className="w-6 h-6" />
    };
    return icons[iconName] || <MdOutlineVerifiedUser className="w-6 h-6" />;
};

const getPerformanceIcon = (iconSvgPath) => {
    // This renders the SVG path directly
    return (
        <svg className="w-5 h-5 xl:w-7 xl:h-7 text-[#B38B3F]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={iconSvgPath} />
        </svg>
    );
};

const getContactIcon = (iconName) => {
    const icons = {
        'BsWhatsapp': <BsWhatsapp className="w-6 h-6" />,
        'FiPhoneCall': <FiPhoneCall className="w-6 h-6" />,
        'HiOutlineMail': <HiOutlineMail className="w-6 h-6" />
    };
    return icons[iconName] || <BsWhatsapp className="w-6 h-6" />;
};

export default Hero;