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
import { useTheme } from '@/app/(public)/ThemeProvider';

import Link from "next/link";

const Hero = () => {
    const [activeTab, setActiveTab] = useState('performance');
    const { isDark, mounted } = useTheme();

    const sourceData = [
        {
            stat: "RERA Number 13800",
            source: "Dubai Land Department (DLD) – Official Portal",
            url: "https://dubailand.gov.ae/",
            link: "https://dubailand.gov.ae/"
        },
        {
            stat: "Units Delivered",
            source: "Emaar Properties Official Press Release",
            url: "https://properties.emaar.com/en/tag/press-release/",
            link: "https://properties.emaar.com/en/tag/press-release/"
        },
        {
            stat: "Years Active",
            source: "Emaar Official Website – About Us",
            url: "https://properties.emaar.com/en/about-emaar/",
            link: "https://properties.emaar.com/en/about-emaar/"
        },
        {
            stat: "Active Projects",
            source: "Emaar Properties Official Press Release (12 Feb 2026)",
            url: "https://properties.emaar.com/en/tag/press-release/",
            link: "https://properties.emaar.com/en/tag/press-release/"
        },
        {
            stat: "Avg. Project Delay",
            source: "PropertyIntel analysis of DLD handover data",
            url: "–",
            link: null
        },
        {
            stat: "Trust Score",
            source: "PropertyIntel proprietary scoring model based on financials, delivery track record, years active, units delivered, and market reputation",
            url: "–",
            link: null
        }
    ];

    return (
        <div className={`${isDark ? 'bg-black' : 'bg-[#FCFBFA]'} font-sans text-slate-800 antialiased transition-colors duration-300`}>
            {/* Hero Background Section */}
            <div className="relative h-[520px] lg:h-[480px] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/Home/herobg.webp')` }}
                >
                    <div className={`lg:block absolute inset-0 ${isDark ? 'bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent' : 'bg-gradient-to-r from-white/95 via-white/60 to-transparent'} transition-colors duration-300`} />
                </div>

                <div className="relative max-w-[1400px] mx-auto px-2 sm:px-6 pt-4 sm:pt-10 h-full">


                    <div className="mt-8 lg:mt-14 max-w-2xl">
                        <h2 className={`text-3xl lg:text-5xl xl:text-6xl font-serif leading-tight lg:leading-[1.1] ${isDark ? 'text-white' : 'text-slate-900'}`}
                            style={{ fontWeight: 510 }}
                        >
                            Emaar Properties – <br />
                            <span className="text-[#B68A35]">
                                Projects, Payment Plans <br className="hidden lg:block" />& Reviews (2026)
                            </span>
                        </h2>
                        <p className={`mt-4 lg:mt-6 leading-relaxed max-w-md text-sm lg:text-md ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            Explore Emaar's complete portfolio: 200+ projects across Dubai.
                            Compare payment plans, check delivery history, and read verified resident reviews.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Overlap */}
            <div className="max-w-[1400px] mx-auto px-2 sm:px-6 -mt-50 lg:-mt-10 relative z-10 pb-20">
                <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">

                    <div className="flex-1 min-w-0 w-full">
                        {/* Developer Trust Card */}
                        <div className={`${isDark ? 'bg-black border-slate-600' : 'bg-white border-white'} rounded-2xl p-2 sm:p-5 lg:p-6 xl:p-8 mb-6 border shadow-xl lg:shadow-sm transition-colors duration-300`}>
                            <div className="mb-2 flex items-start justify-between gap-3 sm:block">
                                <h3 className={`text-2xl lg:text-3xl xl:text-4xl font-normal font-serif ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Developer <span className="text-[#B8860B] lg:italic">Trust</span> Snapshot: Emaar
                                </h3>
                                <span className="sm:hidden mt-1 shrink-0 text-lg font-semibold text-[#B8860B] font-[Merriweather] tabular-nums">
                                    9.0/10
                                </span>
                            </div>
                            <p className={`text-xs lg:text-sm mb-6 lg:mb-8 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                Shaping Dubai's skyline with iconic communities since 1997 – <br className="hidden lg:block" />
                                the master developer behind Downtown Dubai and Burj Khalifa.
                            </p>

                            {/* Stats Grid - Adjusted gap for 1024-1230px */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 xl:gap-4">
                                <StatCard
                                    icon={<MdOutlineVerifiedUser />}
                                    label="RERA Status"
                                    value="13800"
                                />
                                <StatCard
                                    icon={<MdCalendarToday />}
                                    label="Years Active"
                                    value="29"
                                    sub="years (founded 1997)"
                                />
                                <StatCard
                                    icon={<BsBuildings />}
                                    label="Units Delivered"
                                    value="123,500+"
                                    sub="residential units globally (as of November 2025)"
                                />
                                <StatCard
                                    icon={<BsBriefcase />}
                                    label="Active Projects"
                                    value="48"
                                    sub="new projects launched in 2025"
                                />
                            </div>

                            {/* Verification Badge */}
                            <div className={`mt-6 border rounded-xl lg:rounded-lg p-2 sm:p-4 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-[11px] lg:text-sm ${isDark ? 'bg-black border-slate-700 text-slate-300' : 'bg-[#FAF3E6] lg:bg-[#FEF9EC] border-[#F3E8D2] text-slate-600'}`}>
                                <div className="flex items-center gap-2 font-bold text-[#B38B3F]">
                                    <MdOutlineVerifiedUser className='w-5 h-5 sm:w-6 sm:h-6' />
                                    <div>
                                        <p className={`lg:hidden font-bold ${isDark ? 'text-slate-300' : 'text-[#8B6E3D]'}`}>Analyst Verification</p>
                                        <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>PropertyIntel Research Team</span>
                                    </div>
                                </div>
                                <div className={`hidden lg:block w-px h-3 ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
                                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Verified: 21 February 2026</span>
                            </div>
                        </div>

                        <div className={`rounded-2xl border shadow-sm overflow-hidden font-sans transition-colors duration-300 ${isDark ? 'bg-black border-slate-800' : 'bg-white border-gray-100'}`}>
                            {/* Tab Headers */}
                            <div className={`flex border-b rounded-t-2xl overflow-hidden transition-colors duration-300 ${isDark ? 'bg-black border-slate-700' : 'bg-[#F2F2F2] border-gray-200'}`}>
                                <button
                                    onClick={() => setActiveTab('performance')}
                                    className={`relative flex-1 py-4 text-xs lg:text-sm transition-all duration-200 ${activeTab === 'performance'
                                        ? `${isDark ? 'text-[#B8860B] bg-slate-900 rounded-tl-2xl' : 'text-[#B8860B] bg-white rounded-tl-2xl'} font-semibold`
                                        : `${isDark ? 'text-slate-400 hover:text-slate-300 bg-black' : 'text-gray-500 hover:text-gray-700 bg-[#F2F2F2]'}`
                                        }`}
                                >
                                    Performance Stats
                                    {activeTab === 'performance' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8860B]" />
                                    )}
                                </button>

                                <button
                                    onClick={() => setActiveTab('sources')}
                                    className={`relative flex-1 py-4 text-xs lg:text-sm transition-all duration-200 ${activeTab === 'sources'
                                        ? `${isDark ? 'text-[#8B6E3D] bg-slate-900 rounded-tr-2xl' : 'text-[#8B6E3D] bg-white rounded-tr-2xl'} font-semibold`
                                        : `${isDark ? 'text-slate-400 hover:text-slate-300 bg-black' : 'text-gray-500 hover:text-gray-700 bg-[#F2F2F2]'}`
                                        }`}
                                >
                                    Sources & Methodology
                                    {activeTab === 'sources' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B38B3F]" />
                                    )}
                                </button>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'performance' ? (
                                <div className="lg:py-2 flex flex-col lg:flex-row items-stretch">
                                    {/* Total Projects Launched */}
                                    <div className={`flex items-center lg:items-start justify-between lg:justify-start lg:flex-1 gap-4 lg:gap-3 xl:gap-5 p-4 lg:pr-2 lg:py-4 border-b lg:border-b-0 lg:border-r ${isDark ? 'border-slate-700' : 'border-gray-100'} transition-colors duration-300`}>
                                        <div className="flex gap-3 xl:gap-4 items-center lg:items-start">
                                            <div className={`w-10 h-10 xl:w-14 xl:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDark ? 'bg-slate-800' : 'bg-[#FAF6F0]'}`}>
                                                <svg className="w-5 h-5 xl:w-7 xl:h-7 text-[#B38B3F]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className={`text-[12px] xl:text-[14px] font-bold leading-tight ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>Total Projects</p>
                                                <p className="text-xl xl:text-3xl text-[#B38B3F] font-semibold font-[Merriweather] tabular-nums">
                                                    351
                                                </p>
                                                <p className={`text-[10px] xl:text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
                                                    293 completed + 58 under construction
                                                </p>
                                            </div>
                                        </div>
                                        <BsChevronRight className="lg:hidden text-gray-400" />
                                    </div>

                                    {/* Avg. Project Delay */}
                                    <div className={`flex items-center lg:items-start justify-between lg:justify-start lg:flex-1 gap-4 lg:gap-3 xl:gap-5 p-4 lg:px-4 xl:px-8 lg:py-4 border-b lg:border-b-0 lg:border-r ${isDark ? 'border-slate-700' : 'border-gray-100'} transition-colors duration-300`}>
                                        <div className="flex gap-3 xl:gap-4 items-center lg:items-start">
                                            <div className={`w-10 h-10 xl:w-14 xl:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDark ? 'bg-slate-800' : 'bg-[#FAF6F0]'}`}>
                                                <svg className="w-5 h-5 xl:w-7 xl:h-7 text-[#B38B3F]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className={`text-[12px] xl:text-sm font-bold leading-tight ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>Avg. Delay (Last 5)</p>
                                                <div className="flex items-baseline gap-1.5 my-0.5">
                                                    <span className="text-xl xl:text-3xl text-[#B38B3F] font-semibold font-[Merriweather] tabular-nums">3–6</span>
                                                    <span className={`text-[10px] xl:text-xs font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>months</span>
                                                </div>
                                            </div>
                                        </div>
                                        <BsChevronRight className="lg:hidden text-gray-400" />
                                    </div>

                                    {/* Trust Score */}
                                    <div className="flex items-center lg:items-start justify-between lg:justify-start lg:flex-[1.2] gap-4 lg:gap-3 xl:gap-5 p-4 lg:pl-4 xl:pl-8 lg:py-4">
                                        <div className="flex gap-3 xl:gap-4 items-center lg:items-start w-full">
                                            <div className={`w-10 h-10 xl:w-14 xl:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDark ? 'bg-slate-800' : 'bg-[#FAF6F0]'}`}>
                                                <svg className="w-5 h-5 xl:w-7 xl:h-7 text-[#B38B3F]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                </svg>
                                            </div>
                                            <div className="w-full">
                                                <p className={`text-[12px] xl:text-sm font-bold leading-tight ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>Trust Score</p>
                                                <div className="flex items-center gap-2 xl:gap-3 my-0.5">
                                                    <p className="text-xl xl:text-3xl text-[#B38B3F] font-semibold font-[Merriweather] tabular-nums">
                                                        9.0 <span className="text-sm xl:text-2xl text-[#B38B3F]/50">/ 10</span>
                                                    </p>
                                                    <span className={`px-2 py-0.5 text-[8px] xl:text-[10px] font-bold rounded-full border transition-colors duration-300 ${isDark ? 'bg-slate-800 text-[#B8A060] border-slate-700' : 'bg-[#FDF5E6] text-[#B38B3F] border-[#F5E6CC]'}`}>
                                                        EXCELLENT
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <BsChevronRight className="lg:hidden text-gray-400" />
                                    </div>
                                </div>
                            ) : (
                                <div className={`p-0 lg:p-6 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
                                    <div className="hidden lg:block">
                                        <div className="flex flex-col">
                                            {sourceData.map((item, index) => (
                                                <div key={index} className={`flex items-start py-3 border-t ${isDark ? 'border-slate-700' : 'border-gray-100'} ${index === sourceData.length - 1 ? `border-b ${isDark ? 'border-slate-700' : ''}` : ''}`}>
                                                    <div className="w-[20%] pr-4">
                                                        <p className={`text-[12px] xl:text-[13px] ${isDark ? 'text-slate-300' : 'text-gray-600'}`}><span className="font-bold">Stat:</span> {item.stat}</p>
                                                    </div>
                                                    <div className="flex-1 pr-4">
                                                        <p className={`text-[12px] xl:text-[13px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}><span className="font-bold">Source:</span> {item.source}</p>
                                                    </div>
                                                    <div className="w-[30%] flex items-center justify-between">
                                                        {item.link ? (
                                                            <Link
                                                                href={item.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-between w-full group"
                                                            >
                                                                <p className={`text-[12px] xl:text-[13px] truncate group-hover:underline transition-all ${isDark ? 'text-[#B8A060]' : 'text-[#B38B3F]'}`}>
                                                                    <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>URL:</span> {item.url}
                                                                </p>
                                                                <HiOutlineExternalLink className={`ml-2 shrink-0 transition-transform group-hover:scale-110 ${isDark ? 'text-[#B8A060]' : 'text-[#B38B3F]'}`} />
                                                            </Link>
                                                        ) : (
                                                            <div className="flex items-center justify-between w-full">
                                                                <p className={`text-[12px] xl:text-[13px] truncate ${isDark ? 'text-slate-500' : 'text-gray-400'}`}><span className="font-bold">URL:</span> {item.url}</p>
                                                                <HiOutlineExternalLink className={`ml-2 shrink-0 ${isDark ? 'text-slate-600' : 'text-gray-300'}`} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="lg:hidden flex flex-col">
                                        {sourceData.map((item, index) => (
                                            <div key={index} className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-slate-800' : 'border-gray-50'}`}>
                                                <div className="text-[12px] leading-tight pr-4">
                                                    <p className={`font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                        Stat: <span className={`font-normal ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{item.stat}</span>
                                                    </p>
                                                    <p className={`font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                        Source: <span className={`font-normal ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{item.source}</span>
                                                    </p>
                                                </div>

                                                {/* Wrap icon in Link if item.link exists */}
                                                {item.link ? (
                                                    <Link
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="active:scale-90 transition-transform"
                                                    >
                                                        <HiOutlineExternalLink className={`text-xl shrink-0 ${isDark ? 'text-[#B8A060]' : 'text-[#B38B3F]'}`} />
                                                    </Link>
                                                ) : (
                                                    <HiOutlineExternalLink className={`text-xl shrink-0 ${isDark ? 'text-slate-600' : 'text-gray-300'}`} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* <button className="lg:hidden w-full mt-6 bg-[#b07d2d] text-white rounded-xl p-4 flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3">
                                <TfiHeadphoneAlt className="w-6 h-6 text-white/90" />
                                <span className="text-sm font-medium">Speak to a Licensed Expert About Emaar</span>
                            </div>
                            <BsChevronRight strokeWidth={2.5} />
                        </button> */}
                        {/* Expert Section */}
                        <div className={`mt-4 border rounded-2xl p-2 lg:hidden transition-colors duration-300 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-[#e8e1d5]'}`}>
                            <div className="flex items-center gap-3 mb-4 justify-center">
                                <div className='border-2 border-[#b07d2d] rounded-full'>
                                    <div className="w-10 h-10 rounded-full bg-[#b07d2d] border-2 border-white flex items-center justify-center text-[#b07d2d]">
                                        <RiCustomerService2Line className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className={`text-[13px] xl:text-sm leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Speak to an Investment Expert</h4>
                                    <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Get expert guidance. It's free & no obligation.</p>
                                </div>
                            </div>

                            <div className={`h-[1px] mb-4 ${isDark ? 'bg-slate-700' : 'bg-[#eee4d7]'}`} />

                            {/* Contact Grid */}
                            <div className="grid grid-cols-3 gap-2">
                                {/* WhatsApp */}
                                <div className="flex flex-col items-center text-center cursor-pointer group">
                                    <div className="w-11 h-11 rounded-full border border-[#b07d2d] flex items-center justify-center text-[#b07d2d] mb-1 group-hover:bg-[#b07d2d] group-hover:text-white transition-colors">
                                        <BsWhatsapp className="w-6 h-6" />
                                    </div>
                                    <p className="text-[13px] font-bold text-slate-800">WhatsApp</p>
                                    <p className="text-[10px] text-slate-600">Chat instantly</p>
                                </div>

                                {/* Call */}
                                <div className="flex flex-col items-center text-center border-x border-[#eee4d7] cursor-pointer group">
                                    <div className="w-11 h-11 rounded-full border border-[#b07d2d] flex items-center justify-center text-[#b07d2d] mb-1 group-hover:bg-[#b07d2d] group-hover:text-white transition-colors">
                                        <FiPhoneCall className="w-6 h-6" />
                                    </div>
                                    <p className="text-[13px] font-bold text-slate-800">Call Us</p>
                                    <p className="text-[10px] text-slate-600">Speak directly</p>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col items-center text-center cursor-pointer group">
                                    <div className="w-11 h-11 rounded-full border border-[#b07d2d] flex items-center justify-center text-[#b07d2d] mb-1 group-hover:bg-[#b07d2d] group-hover:text-white transition-colors">
                                        <HiOutlineMail className="w-6 h-6" />
                                    </div>
                                    <p className="text-[13px] font-bold text-slate-800">Email Us</p>
                                    <p className="text-[10px] text-slate-600">We'll get back</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Floating Card - Fluid Width Fix */}
                    <div className="hidden lg:block w-[310px] xl:w-[360px] shrink-0 sticky top-4">
                        <div className={`p-3 xl:p-4 rounded-3xl shadow-sm border transition-colors duration-300 ${isDark ? 'bg-black border-slate-600' : 'bg-white border-gray-100'}`}>
                            <div className={`rounded-[24px] p-6 xl:p-4 transition-colors duration-300 ${isDark ? 'bg-black border border-slate-600' : 'bg-[#fbf8f4]'}`}>
                                <p className="text-[9px] font-black tracking-[0.2em] text-[#B68A35] uppercase">Trust Score</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-6xl xl:text-7xl font-serif text-[#B68A35] leading-none">9.0</span>
                                    <span className="text-2xl xl:text-3xl font-serif text-[#B68A35]">/ 10</span>
                                </div>
                                <div className={`relative w-full h-2 rounded-full mt-6 ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
                                    <div className="bg-[#B68A35] h-full rounded-full relative" style={{ width: '90%' }}>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 xl:w-4 xl:h-4 bg-[#B68A35] rounded-full shadow-md" />
                                    </div>
                                </div>

                                <div className="mt-8 xl:mt-10 flex gap-3 xl:gap-4">
                                    <GiLaurels className="w-7 h-7 xl:w-8 xl:h-8 text-[#B68A35] shrink-0" />
                                    <div>
                                        <h4 className={`font-bold text-[13px] xl:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Top Tier Developer</h4>
                                        <p className={`text-[10px] xl:text-[11px] mt-1 leading-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proven track record in delivery and transparency</p>
                                    </div>
                                </div>

                                <div className="mt-6 xl:mt-8 flex gap-3 xl:gap-4 items-center">
                                    <MdOutlineVerifiedUser className="w-7 h-7 xl:w-8 xl:h-8 text-[#B68A35] shrink-0" />
                                    <div>
                                        <h4 className={`font-bold text-[13px] xl:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Verified Research</h4>
                                        <p className={`text-[10px] xl:text-[11px] mt-1 leading-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Updated Feb 2026</p>
                                    </div>
                                </div>

                                {/* Main CTA Button */}
                                <button className="w-full mt-8 bg-gradient-to-r from-[#b07d2d] to-[#c79a51] hover:opacity-90 text-white rounded-2xl p-2 py-3 flex items-center justify-between group transition-all">
                                    <div className="flex items-center gap-2">
                                        <HiOutlineBuildingOffice2 className="w-6 h-6 xl:w-7 xl:h-7" />
                                        <span className="text-sm xl:text-base font-semibold">Get Availability & Floor Plans</span>
                                    </div>
                                    <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Expert Section */}
                                <div className={`mt-4 border rounded-2xl p-2 transition-colors duration-300 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-[#e8e1d5]'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className='border-2 border-[#b07d2d] rounded-full'>
                                            <div className="w-10 h-10 rounded-full bg-[#b07d2d] border-2 border-white flex items-center justify-center text-[#b07d2d]">
                                                <RiCustomerService2Line className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={`text-[13px] xl:text-sm leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Speak to an Investment Expert</h4>
                                            <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Get expert guidance. It's free & no obligation.</p>
                                        </div>
                                    </div>

                                    <div className={`h-[1px] mb-4 ${isDark ? 'bg-slate-700' : 'bg-[#eee4d7]'}`} />

                                    {/* Contact Grid */}
                                    <div className="grid grid-cols-3 gap-2">
                                        {/* WhatsApp */}
                                        <div className="flex flex-col items-center text-center cursor-pointer group">
                                            <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 group-hover:text-white transition-colors ${isDark ? 'border-slate-600 text-slate-300 group-hover:bg-[#b07d2d]' : 'border-[#b07d2d] text-[#b07d2d] group-hover:bg-[#b07d2d] group-hover:text-white'}`}>
                                                <BsWhatsapp className="w-6 h-6" />
                                            </div>
                                            <p className={`text-[13px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>WhatsApp</p>
                                            <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Chat instantly</p>
                                        </div>

                                        {/* Call */}
                                        <div className={`flex flex-col items-center text-center border-x cursor-pointer group ${isDark ? 'border-slate-700' : 'border-[#eee4d7]'}`}>
                                            <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 group-hover:text-white transition-colors ${isDark ? 'border-slate-600 text-slate-300 group-hover:bg-[#b07d2d]' : 'border-[#b07d2d] text-[#b07d2d] group-hover:bg-[#b07d2d] group-hover:text-white'}`}>
                                                <FiPhoneCall className="w-6 h-6" />
                                            </div>
                                            <p className={`text-[13px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Call Us</p>
                                            <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Speak directly</p>
                                        </div>

                                        {/* Email */}
                                        <div className="flex flex-col items-center text-center cursor-pointer group">
                                            <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 group-hover:text-white transition-colors ${isDark ? 'border-slate-600 text-slate-300 group-hover:bg-[#b07d2d]' : 'border-[#b07d2d] text-[#b07d2d] group-hover:bg-[#b07d2d] group-hover:text-white'}`}>
                                                <HiOutlineMail className="w-6 h-6" />
                                            </div>
                                            <p className={`text-[13px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Email Us</p>
                                            <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>We'll get back</p>
                                        </div>
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
    const { isDark } = useTheme();
    return (
        <div className={`border p-3 xl:p-4 flex flex-col gap-0 xl:gap-2 min-w-0 transition-colors duration-300 ${isDark ? ' bg-black' : 'border-slate-100 bg-white'}`}>
            <div className="flex items-start lg:items-center gap-2 xl:gap-4">
                <div className="shrink-0 text-[#af8840] text-xl lg:text-2xl xl:text-4xl pt-0.5">
                    {icon}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className={`text-[10px] xl:text-[14px] font-medium leading-tight truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {label}
                    </span>
                    <div className="text-xl xl:text-3xl text-[#B38B3F] font-semibold font-[Merriweather] tabular-nums">
                        {value}
                    </div>
                </div>
            </div>
            {sub && (
                <p className={`text-[11px] xl:text-[13px] leading-snug font-normal border-t pt-2 ${isDark ? 'text-slate-400 border-slate-700' : 'text-slate-500 border-slate-50'}`}>
                    {sub}
                </p>
            )}
        </div>
    );
}

export default Hero;