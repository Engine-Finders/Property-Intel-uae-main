"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/(public)/ThemeProvider';
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


const Section2 = () => {
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState('All Projects');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [visibleCardCount, setVisibleCardCount] = useState(3);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1024) setVisibleCardCount(3); // lg
            else if (w >= 768) setVisibleCardCount(2); // md
            else setVisibleCardCount(1); // sm
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const projects = [
        {
            id: 1,
            title: "Creek Bay",
            category: "Apartments",
            location: "Dubai Creek Harbour",
            image: "/Home/project1.webp",
            badge: "JUST LAUNCHED",
            price: "AED 1.8M",
            unitMix: "1BR, 2BR, 3BR Apartments",
            handover: "Q2 2030",
            paymentPlan: "80/20",
            monthsToGo: 51,
            timelineProgress: 45,
            launchDate: "Launch",
            completionDate: "Q2 2030",
            projectId: "emaar-creek-bay",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/creek-bay-at-dubai-creek-harbour/"
                },
                pricingData: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/creek-bay-at-dubai-creek-harbour/"
                },
                handoverDate: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/creek-bay-at-dubai-creek-harbour/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/creek-bay.jpg"
            }
        },
        {
            id: 2,
            title: "Mareva at The Oasis",
            category: "Villas",
            location: "The Oasis, Dubailand",
            image: "/Home/project2.webp",
            badge: "SELLING FAST",
            price: "AED 13.47M",
            unitMix: "4BR, 5BR, 6BR Villas",
            handover: "Q1 2030",
            paymentPlan: "80/20",
            monthsToGo: 49,
            timelineProgress: 50,
            launchDate: "Launch",
            completionDate: "Q1 2030",
            projectId: "emaar-mareva-the-oasis",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/mareva-at-the-oasis/"
                },
                pricingData: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/mareva-at-the-oasis/"
                },
                handoverDate: {
                    source: "Property Finder",
                    url: "https://properties.emaar.com/en/properties/mareva-at-the-oasis/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/mareva-the-oasis.jpg"
            }
        },
        {
            id: 3,
            title: "Mirage at The Oasis",
            category: "Villas",
            location: "The Oasis, Dubailand",
            image: "/Home/project3.webp",
            badge: "SELLING FAST",
            price: "AED 15.8M",
            unitMix: "5BR, 6BR Villas",
            handover: "Q2 2028",
            paymentPlan: "90/10",
            monthsToGo: 28,
            timelineProgress: 75,
            launchDate: "Launch",
            completionDate: "Q2 2028",
            projectId: "emaar-mirage-the-oasis",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/mirage-at-the-oasis/"
                },
                pricingData: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/mirage-at-the-oasis/"
                },
                handoverDate: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/mirage-at-the-oasis/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/mirage-the-oasis.jpg"
            }
        },
        {
            id: 4,
            title: "Lavita at The Oasis",
            category: "Villas",
            location: "The Oasis, Dubailand",
            image: "/asset/img/projects/emaar/lavita-the-oasis.jpg",
            badge: "LIMITED UNITS",
            price: "AED 36M",
            unitMix: "6BR, 7BR Mansions",
            handover: "Q1 2029",
            paymentPlan: "80/20",
            monthsToGo: 36,
            timelineProgress: 60,
            launchDate: "Launch",
            completionDate: "Q1 2029",
            projectId: "emaar-lavita-the-oasis",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/lavita-at-the-oasis/"
                },
                pricingData: {
                    source: "Emaar",
                    url: "https://properties.emaar.com/en/properties/lavita-at-the-oasis/"
                },
                handoverDate: {
                    source: "Emaar",
                    url: "https://properties.emaar.com/en/properties/lavita-at-the-oasis/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/lavita-the-oasis.jpg"
            }
        },
        {
            id: 5,
            title: "Elora at The Valley",
            category: "Townhouses",
            location: "The Valley, Dubailand",
            image: "/asset/img/projects/emaar/elora-the-valley.jpg",
            badge: "SELLING FAST",
            price: "AED 1.6M",
            unitMix: "3BR, 4BR Townhouses",
            handover: "Q3 2026",
            paymentPlan: "80/20",
            monthsToGo: 7,
            timelineProgress: 90,
            launchDate: "Launch",
            completionDate: "Q3 2026",
            projectId: "emaar-elora-the-valley",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/elora/"
                },
                pricingData: {
                    source: "Emaar",
                    url: "https://properties.emaar.com/en/properties/elora/"
                },
                handoverDate: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/elora/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/elora-the-valley.jpg"
            }
        },
        {
            id: 6,
            title: "Lyvia by Palace",
            category: "Apartments",
            location: "Dubai Creek Harbour",
            image: "/asset/img/projects/emaar/lyvia-by-palace.jpg",
            badge: "JUST LAUNCHED",
            price: "AED 1.98M",
            unitMix: "1BR, 2BR, 3BR Apartments, 3BR Townhouses",
            handover: "Q3 2029",
            paymentPlan: "80/20",
            monthsToGo: 41,
            timelineProgress: 55,
            launchDate: "Launch",
            completionDate: "Q3 2029",
            projectId: "emaar-lyvia-by-palace",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/palace-residences/"
                },
                pricingData: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/palace-residences/"
                },
                handoverDate: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/palace-residences/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/lyvia-by-palace.jpg"
            }
        },
        {
            id: 7,
            title: "Creek Haven",
            category: "Apartments",
            location: "Dubai Creek Harbour",
            image: "/asset/img/projects/emaar/creek-haven.jpg",
            badge: "LAUNCHING SOON",
            price: "AED 1.86M",
            unitMix: "1BR, 2BR, 3BR Apartments",
            handover: "Q1 2030",
            paymentPlan: "80/20",
            monthsToGo: 49,
            timelineProgress: 50,
            launchDate: "Launch",
            completionDate: "Q1 2030",
            projectId: "emaar-creek-haven",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/creek-haven-at-dubai-creek-harbour/"
                },
                pricingData: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/creek-haven-at-dubai-creek-harbour/"
                },
                handoverDate: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/creek-haven-at-dubai-creek-harbour/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/creek-haven.jpg"
            }
        },
        {
            id: 8,
            title: "Address Residences The Bay",
            category: "Apartments",
            location: "Dubai Harbour",
            image: "/asset/img/projects/emaar/address-residences-the-bay.jpg",
            badge: "SOLD OUT",
            price: "AED 2.7M",
            unitMix: "1BR, 2BR, 3BR Apartments",
            handover: "Q4 2026",
            paymentPlan: "80/20",
            monthsToGo: 10,
            timelineProgress: 85,
            launchDate: "Launch",
            completionDate: "Q4 2026",
            projectId: "emaar-address-residences-the-bay",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/address-residences-the-bay/"
                },
                pricingData: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/address-residences-the-bay/"
                },
                handoverDate: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/properties/address-residences-the-bay/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/address-residences-the-bay.jpg"
            }
        },
        {
            id: 9,
            title: "Park Gate 2",
            category: "Villas",
            location: "Dubai Hills Estate",
            image: "/asset/img/projects/emaar/park-gate-2.jpg",
            badge: "SELLING FAST",
            price: "AED 14.12M",
            unitMix: "4BR, 5BR Villas",
            handover: "Q1 2027",
            paymentPlan: "80/20",
            monthsToGo: 12,
            timelineProgress: 80,
            launchDate: "Launch",
            completionDate: "Q1 2027",
            projectId: "emaar-park-gate-2",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/properties/park-gate-2-at-dubai-hills-estate/"
                },
                pricingData: {
                    source: "Property Finder",
                    url: "https://properties.emaar.com/en/properties/park-gate-2-at-dubai-hills-estate/"
                },
                handoverDate: {
                    source: "Property Finder",
                    url: "https://properties.emaar.com/en/properties/park-gate-2-at-dubai-hills-estate/"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/park-gate-2.jpg"
            }
        },
        {
            id: 10,
            title: "Grand Polo Club & Resort",
            category: "Townhouses",
            location: "Dubai Investment Park (DIP)",
            image: "/asset/img/projects/emaar/grand-polo-club-resort.jpg",
            badge: "LAUNCHING SOON",
            price: "AED 5.67M",
            unitMix: "3BR, 4BR, 5BR Villas",
            handover: "Q2 2029 - Q3 2029",
            paymentPlan: "80/20",
            monthsToGo: 0,
            timelineProgress: 10,
            launchDate: "April 2026",
            completionDate: "Q3 2029",
            projectId: "emaar-grand-polo-club-resort",
            sourceVerification: {
                projectInfo: {
                    source: "Emaar Properties Official Website",
                    url: "https://properties.emaar.com/en/our-communities/grand-polo-club-and-resort/"
                },
                pricingData: {
                    source: "Emaar Properties Official",
                    url: "https://properties.emaar.com/en/our-communities/grand-polo-club-and-resort/"
                },
                handoverDate: {
                    source: "Not Yet Announced",
                    url: null
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/grand-polo-club-resort.jpg"
            }
        },
        {
            id: 11,
            title: "Dubai Creek Tower",
            category: "Apartments",
            location: "Dubai Creek Harbour",
            image: "/asset/img/projects/emaar/dubai-creek-tower.jpg",
            badge: "LAUNCHING SOON",
            price: "TBA",
            unitMix: "Luxury Residences, Observatory",
            handover: "TBA",
            paymentPlan: "TBA",
            monthsToGo: 0,
            timelineProgress: 5,
            launchDate: "April 2026",
            completionDate: "TBA",
            projectId: "emaar-dubai-creek-tower",
            sourceVerification: {
                projectInfo: {
                    source: "Gulf News (Jan 2026)",
                    url: "https://gulfnews.com/business/property/emaar-to-launch-tender-for-dubai-creek-tower-within-three-months-1.500408173"
                },
                pricingData: {
                    source: "Not yet announced",
                    url: null
                },
                handoverDate: {
                    source: "Not yet announced",
                    url: null
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/dubai-creek-tower.jpg"
            }
        },
        {
            id: 12,
            title: "Fior 2",
            category: "Apartments",
            location: "Rashid Yachts & Marina, Mina Rashid",
            image: "/asset/img/projects/emaar/fior-2.jpg",
            badge: "JUST LAUNCHED",
            price: "AED 1.8M",
            unitMix: "1BR, 2BR, 3BR Apartments",
            handover: "Q1 2030",
            paymentPlan: "80/20",
            monthsToGo: 48,
            timelineProgress: 52,
            launchDate: "Launch",
            completionDate: "Q1 2030",
            projectId: "emaar-fior-2",
            sourceVerification: {
                projectInfo: {
                    source: "Property Finder",
                    url: "https://www.propertyfinder.ae/en/new-projects/emaar-properties/fior-2"
                },
                pricingData: {
                    source: "Engel & Völkers",
                    url: "https://www.engelvoelkers.com/ae/en/off-plan/fior-2-by-emaar"
                },
                handoverDate: {
                    source: "Property Finder",
                    url: "https://www.propertyfinder.ae/en/new-projects/emaar-properties/fior-2"
                },
                lastVerified: "21 February 2026",
                brochureImage: "/asset/img/projects/emaar/fior-2.jpg"
            }
        },
    ];

    const tabs = [
        { name: 'All Projects', count: projects.length, icon: <IoGridOutline /> },
        { name: 'Apartments', count: projects.filter((project) => project.category === 'Apartments').length, icon: <PiBuildingOfficeLight /> },
        { name: 'Villas', count: projects.filter((project) => project.category === 'Villas').length, icon: <BsHouse /> },
        { name: 'Townhouses', count: projects.filter((project) => project.category === 'Townhouses').length, icon: <BsBuildings /> },
    ];

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

    // Get cards for current view
    const visibleCards = filteredProjects.slice(currentCardIndex, currentCardIndex + visibleCardCount);

    return (
        <section className={`py-5 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-[#FCFBFA]'}`}>
            <div className="max-w-350 mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex items-start gap-4 mb-8 lg:mb-12">
                    <div className="">
                        <BsBuildings className='text-[#B68A35] text-2xl sm:text-5xl' />
                    </div>
                    <div>
                        <h2 className={`text-2xl lg:text-4xl font-serif leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Emaar Upcoming Projects – <br />
                            <span className="text-[#B68A35]">New Launches & Off-Plan Opportunities</span>
                        </h2>
                        <p className={`mt-3 text-sm lg:text-base max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Explore the latest Emaar projects across Dubai, from waterfront apartments to luxury villas. Download brochures directly.
                        </p>
                    </div>
                </div>

                {/* Tab Navigation Container */}
                <div className={`grid grid-cols-4 lg:flex gap-1 lg:gap-0 mb-10 pb-0 
    ${isDark ? 'border-slate-700 bg-slate-900' : '] border-0'} 
    border rounded-2xl p-1 lg:border-none lg:bg-transparent lg:rounded-none lg:p-0`}>

                    {tabs.map((tab, index) => (
                        <button
                            key={tab.name}
                            onClick={() => {
                                setActiveTab(tab.name);
                                setCurrentCardIndex(0);
                            }}
                            className={`flex flex-col sm:flex-row items-center justify-center py-2 px-1 lg:py-3 lg:px-2 transition-all w-full min-w-0 sm:flex-1 relative
                ${activeTab === tab.name
                                    ? 'bg-white border-2 border-[#B68A35] rounded-xl text-[#B68A35] lg:border lg:ring-1 lg:ring-[#B68A35] lg:rounded-none z-10'
                                    : `${isDark ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-white border-gray-100 text-slate-500 border'}`
                                }
            `}
                        >
                            {/* Icon: Top on mobile, Left on desktop */}
                            <span className={`text-lg lg:text-2xl mb-1 lg:mb-0 lg:mr-3 ${activeTab === tab.name ? 'text-[#B68A35]' : ''}`}>
                                {tab.icon}
                            </span>

                            {/* Label and Count Container */}
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] sm:text-[12px] lg:text-md font-bold lg:font-medium whitespace-nowrap">
                                    {tab.name}
                                </span>

                                {/* Count Badge */}
                                <span className={`flex items-center justify-center min-w-5 h-5 lg:w-6 lg:h-6 text-[10px] lg:text-sm rounded-full font-bold lg:font-normal
                    ${activeTab === tab.name
                                        ? 'bg-[#B68A35] text-white lg:bg-[#FAF3E6] lg:text-[#B68A35]'
                                        : 'bg-[#FAF3E6] text-[#B68A35] lg:bg-gray-100 lg:text-slate-500'}`}>
                                    {tab.count}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Project Grid - Single Row Carousel */}
                <div className="relative group">
                    <div className="flex gap-6 overflow-hidden">
                        {visibleCards.map((project) => (
                            <ProjectCard key={project.id} project={project} isDark={isDark} />
                        ))}
                    </div>

                    {/* Slider Arrows (Desktop) */}
                    <button
                        onClick={handlePrevCard}
                        disabled={currentCardIndex === 0}
                        className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 text-slate-400 hover:text-[#B68A35] opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <span className="flex h-full w-full items-center justify-center">
                            <BsChevronLeft size={24} />
                        </span>
                    </button>
                    <button
                        onClick={handleNextCard}
                        disabled={currentCardIndex >= maxStartIndex}
                        className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 text-slate-400 hover:text-[#B68A35] opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <span className="flex h-full w-full items-center justify-center">
                            <BsChevronRight size={24} />
                        </span>
                    </button>
                </div>

                {/* Mobile Pagination */}
                <div className="flex lg:hidden items-center justify-between mt-8">
                    <button
                        onClick={handlePrevCard}
                        disabled={currentCardIndex === 0}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-400 hover:text-[#B68A35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <BsChevronLeft />
                    </button>
                    <span className="text-sm text-slate-500 font-medium">{Math.min(currentCardIndex + 1, filteredProjects.length)} / {filteredProjects.length}</span>
                    <button
                        onClick={handleNextCard}
                        disabled={currentCardIndex >= maxStartIndex}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-400 hover:text-[#B68A35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <BsChevronRight />
                    </button>
                </div>

                {/* Desktop Pagination Dots */}
                <div className="hidden lg:flex justify-center gap-2 mt-12">
                    {Array.from({ length: paginationCount }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentCardIndex(index)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${currentCardIndex === index ? 'w-8 bg-[#B68A35]' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                        />
                    ))}
                </div>

                <ExpertSection />

                {/* Disclaimer Footer */}
                <div className={`mt-12 p-2 sm:p-6 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-2 sm:gap-4 transition-colors ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-[#FAF9F6] border-[#F2EEE8]'}`}>
                    <div className="flex gap-3">
                        <HiOutlineInformationCircle className="text-[#B68A35] shrink-0 text-xl" />
                        <p className={`text-[11px] lg:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Project details, prices, and handover dates are subject to change.
                            Please verify all information before making any investment decision.
                        </p>
                    </div>
                    <div className={`text-[11px] lg:text-sm whitespace-nowrap ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        Last updated: <span className="font-bold text-[#B68A35]">21 February 2026</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, isDark }) => {
    const [firstWord, ...remainingWords] = project.title.split(' ');
    const [accordionOpen, setAccordionOpen] = useState(false);
    return (
        <div className={`w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] flex-shrink-0 rounded-3xl border overflow-hidden flex flex-col transition-all hover:shadow-xl ${isDark ? 'bg-black border-slate-800' : 'bg-white border-gray-100'}`}>

            {/* Image Container */}
            <div className="relative h-60 lg:h-48">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute top-4 left-4 bg-[#6A9923] text-white text-[10px] font-bold px-3 py-1 rounded-xl tracking-wider">
                    {project.badge}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 lg:p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-[#64748b] mb-1">
                    <GrLocation className="text-sm text-[#B68A35]" />
                    <span className="text-[11px] font-medium uppercase tracking-tight text-gray-600">{project.location}</span>
                </div>
                <h3 className={`text-xl lg:text-2xl font-serif mb-4 ${isDark ? 'text-white' : 'text-[#B68A35]'}`}>
                    <span className="text-black">{firstWord}</span>{' '}
                    <span>{remainingWords.join(' ')}</span>
                </h3>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-1  rounded-xl overflow-hiddenmb-6">
                    <StatBox icon={<AiOutlineDollarCircle />} label="STARTING PRICE" value={project.price} isDark={isDark} />
                    <StatBox icon={<PiHouseBold />} label="UNIT MIX" value={project.unitMix} isDark={isDark} isSmall />
                    <StatBox icon={<MdOutlineCalendarToday />} label="HANDOVER" value={project.handover} isDark={isDark} />
                    <StatBox icon={<LuLayers />} label="PAYMENT PLAN" value={project.paymentPlan} isDark={isDark} />
                </div>

                {/* Timeline */}
                <div className="my-6">
                    <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-1.5 text-[14px] text-slate-800 uppercase">
                            <span className="text-[#B68A35]"><IoMdTime className='text-[18px]' /></span> Timeline
                        </div>
                        <span className="text-[14px] text-slate-900">{project.monthsToGo} months to go</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#B68A35] rounded-full"
                            style={{ width: `${project.timelineProgress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-[13px] font-medium text-slate-600 uppercase">
                        <span>{project.launchDate}</span>
                        <span>{project.completionDate}</span>
                    </div>
                </div>

                {/* Info Box */}
                <div className={`p-2 rounded-xl border mb-6 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-[#FDFBF7] border-[#F3EFE9]'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                        <MdPayments className="text-[#B68A35] text-[20px]" />
                        <span className="text-[14px] font-bold text-slate-800 uppercase tracking-tight">Payment Plan <span className="text-[#B68A35] ml-1">{project.paymentPlan}</span></span>
                    </div>
                    <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                        10% down • 70% during construction • 20% on handover
                    </p>
                </div>

                {/* Accordion */}
                <button
                    onClick={() => setAccordionOpen((s) => !s)}
                    aria-expanded={accordionOpen}
                    className={`w-full flex items-center justify-between py-3 px-1 border-t text-[11px] font-bold uppercase tracking-wider mb-4 ${isDark ? 'border-slate-800 text-slate-300' : 'border-gray-100 text-slate-600'}`}>
                    <div className="flex items-center gap-2 text-[12px]">
                        <LuShieldCheck className="text-[#B68A35] text-[18px]" />
                        SOURCES & VERIFICATION
                    </div>
                    <BsChevronDown className={`transform transition-transform ${accordionOpen ? 'rotate-180' : ''}`} />
                </button>

                {accordionOpen && (
                    <div className={`mb-6 p-4 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-[#FFFDF8] border-[#F3EFE9] text-slate-700'}`}>
                        <div className="grid grid-cols-1 gap-3">
                            {/* Project Info */}
                            <div>
                                <p className="text-xs font-bold uppercase text-slate-500">Project Information</p>
                                <p className="text-sm font-medium">{project.sourceVerification?.projectInfo?.source || 'N/A'}</p>
                                {project.sourceVerification?.projectInfo?.url && (
                                    <a href={project.sourceVerification.projectInfo.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-sm underline">
                                        View source
                                    </a>
                                )}
                            </div>

                            {/* Pricing Data */}
                            <div>
                                <p className="text-xs font-bold uppercase text-slate-500">Pricing Data</p>
                                <p className="text-sm font-medium">{project.sourceVerification?.pricingData?.source || 'N/A'}</p>
                                {project.sourceVerification?.pricingData?.url && (
                                    <a href={project.sourceVerification.pricingData.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-sm underline">
                                        View pricing source
                                    </a>
                                )}
                            </div>

                            {/* Handover Date */}
                            <div>
                                <p className="text-xs font-bold uppercase text-slate-500">Handover Date Source</p>
                                <p className="text-sm font-medium">{project.sourceVerification?.handoverDate?.source || 'N/A'}</p>
                                {project.sourceVerification?.handoverDate?.url && (
                                    <a href={project.sourceVerification.handoverDate.url} target="_blank" rel="noreferrer" className="text-[#B68A35] text-sm underline">
                                        View handover source
                                    </a>
                                )}
                            </div>

                            {/* Last Verified & Brochure */}
                            <div className="flex items-start gap-4 mt-2">
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Last Verified</p>
                                    <p className="text-sm font-medium">{project.sourceVerification?.lastVerified || 'N/A'}</p>
                                </div>
                                {/* {project.sourceVerification?.brochureImage && (
                                    <div className="ml-auto">
                                        <Image src={project.sourceVerification.brochureImage} alt={`${project.title} brochure`} width={180} height={110} className="rounded-md object-cover" />
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <button className="relative w-full bg-[#B38B3F] hover:bg-[#967332] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center transition-colors">
                    {/* Centered Content */}
                    <div className="flex items-center gap-2">
                        <IoDocumentTextOutline className="text-xl" />
                        <span>Download Brochure</span>
                    </div>

                    {/* Right-aligned Download Icon */}
                    <div className="absolute right-4 flex items-center">
                        <HiOutlineDownload className="text-2xl" />
                    </div>
                </button>
            </div>
        </div>
    );
};

const StatBox = ({ icon, label, value, isDark, isSmall }) => (
    <div className={`p-3 lg:p-2 lg:py-3 ${isDark ? 'bg-black' : 'bg-[#fbf9f6] border border-[#F3EFE9] rounded-lg'} flex  gap-2`}>
        <div className="flex items-start gap-2 text-[#B68A35] text-2xl mt-1">
            {icon}
        </div>
        <div>
            <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">{label}</p>
            <p className="text-[11px] font-bold text-gray-700">{value}</p>
        </div>
    </div>
);

export default Section2;