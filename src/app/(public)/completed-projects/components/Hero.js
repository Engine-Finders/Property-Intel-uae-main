import React from 'react';
import { GrLocation } from "react-icons/gr";
import { FiCheckCircle, FiDollarSign, FiTrendingUp, FiPieChart, FiShield, FiCalendar, FiGrid, FiArrowRight, FiMap } from "react-icons/fi";
import { PiBuildingLight } from "react-icons/pi";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import ExpertSection from "@/app/(public)/home/components/ExpertSection";

const EmiratesHillsHero = () => {
    return (
        <div className="relative min-h-screen w-full font-serif text-[#1a1a1a] overflow-x-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/completed-projects/bg.webp')" }}
            >
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 pt-10 pb-5 md:pt-12">

                {/* Top Badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex items-center gap-2 bg-[#b08139] text-white px-4 py-2 rounded-full text-[10px] sm:text-sm font-sans font-semibold tracking-wider uppercase">
                        <FiCheckCircle className='w-4 h-4' />
                        Completed — Phased Delivery 2003-2008
                    </div>
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] sm:text-sm font-sans font-bold tracking-wider uppercase shadow-sm">
                        <GrLocation className='w-4 h-4' />
                        Established Community
                    </div>
                </div>

                {/* Hero Text */}
                <div className="mb-12 md:max-w-2xl">
                    <h1 className="text-3xl lg:text-5xl xl:text-6xl font-serif leading-tight lg:leading-[1.1] mb-2 sm:mb-4" style={{ fontWeight: 510 }}>
                        Emirates Hills by Emaar.
                    </h1>
                    <p className="text-2xl md:text-4xl max-w-lg">
                        Completed <span className="text-[#b08139]">Luxury Villas</span> in Emirates Hills, Dubai.
                    </p>
                    <div className="mt-4 flex items-center gap-2 border-l-2 border-[#b08139] pl-3">
                        <span className="text-sm font-sans font-medium text-gray-700">PropertyIntel.ae</span>
                    </div>
                </div>

                {/* Stats Glass Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-2 sm:p-5 shadow-2xl border border-white/50 max-w-5xl mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-8 mb-8">
                        <StatItem
                            icon={<FiDollarSign size={25} />}
                            label="LATEST TRANSACTION PRICE (5BR VILLA)"
                            value="AED 32.5M"
                        />
                        <StatItem
                            icon={<FiTrendingUp size={25} />}
                            label="CURRENT PRICE PER SQFT (MARKET AVG)"
                            value="AED 3,100–3,800"
                        />

                        <StatItem
                            icon={<FiPieChart size={25} />}
                            label="RENTAL YIELD (12-MONTH AVG)"
                            value="3.2–4.1%"
                        />
                        <StatItem
                            icon={<FiShield size={25} />}
                            label="COMMUNITY MATURITY"
                            value="Fully Established"
                        />
                    </div>

                    {/* Action Button */}
                    <button className=" mx-auto w-full sm:w-max max-w-full flex flex-row bg-[#b08139] hover:bg-[#966b2d] transition-colors text-white py-4 sm:py-4 px-2 sm:px-6 rounded-xl items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-lg text-center font-sans font-semibold mb-4 shadow-lg group">
                        <FiCalendar size={20} className='hidden sm:block'/>
                        <span className="whitespace-normal leading-snug text-[12px] sm:text-lg">
                            Get Current Market Valuation for Emirates Hills
                        </span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button>

                    <p className="text-center text-[10px] md:text-xs text-gray-600 font-sans uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Receive a data-driven valuation report based on recent transactions, listings, and property-specific factors — no obligation.
                    </p>

                    {/* Footer Contacts (Desktop Only Layout) */}
                    <div className="items-center justify-between">

                        <ExpertSection />

                    </div>


                    {/* Mobile Specific Secondary Buttons */}
                    <div className="md:hidden space-y-3 mt-4">
                        <button className="w-full bg-white/80 border border-[#b08139]/30 py-4 px-6 rounded-xl flex items-center justify-between text-[#b08139] font-bold">
                            Explore Similar Off-Plan Projects by Emaar
                            <FiArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Bottom Utility Bar */}
                <div className="mt-4 max-w-5xl mx-auto">
                    <button className="w-full bg-white/90 backdrop-blur-sm py-4 px-6 rounded-xl flex items-center justify-between text-[#1a1a1a] shadow-lg border border-white/50 group">
                        <div className="flex items-center gap-4">
                            <FiMap size={24} color="#b08139" />
                            <span className="font-sans font-semibold">View Emirates Hills Community Map and Amenities</span>
                        </div>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={24} color="#b08139" />
                    </button>
                </div>

            </div>
        </div>
    );
};

// Helper Stat Item Component
const StatItem = ({ icon, label, value }) => (
    <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-14 h-14 rounded-full border border-[#b08139]/30 flex items-center justify-center text-[#b08139] bg-white/50">
            {icon}
        </div>
        <div>
            <p className="text-[10px] sm:text-[12px]  font-bold text-gray-600 uppercase tracking-tighter leading-tight mb-1">
                {label}
            </p>
            <p className="text-lg sm:text-xl font-bold text-[#1a1a1a] whitespace-nowrap font-[Merriweather] tabular-nums">
                {value}
            </p>
        </div>
    </div>
);

// Helper Contact Link Component
const ContactLink = ({ icon, title, sub }) => (
    <div className="flex items-center gap-3 cursor-pointer group">
        <div className="text-[#b08139] bg-white rounded-full border border-[#b08139]/20 p-2">
            {icon}
        </div>
        <div className="font-sans">
            <p className="text-sm font-bold leading-none mb-1 group-hover:text-[#b08139] transition-colors">{title}</p>
            <p className="text-[10px] text-gray-500 uppercase font-medium leading-none">{sub}</p>
        </div>
    </div>
);

export default EmiratesHillsHero;