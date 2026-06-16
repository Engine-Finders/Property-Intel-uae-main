"use client";

import React from 'react';
import { GrLocation } from "react-icons/gr";
import {
    FiCheckCircle,
    FiDollarSign,
    FiTrendingUp,
    FiPieChart,
    FiShield,
    FiCalendar,
    FiArrowRight,
    FiMap,
    FiPhone,
    FiMail,
    FiUser,
} from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";

import { useThemeStyles } from "@/app/components/context/themeStyles";

const STAT_ICONS = {
    transaction_price: FiDollarSign,
    price_per_sqft: FiTrendingUp,
    rental_yield: FiPieChart,
    community_maturity: FiShield,
};

const CONTACT_ACTIONS = [
    { label: "WhatsApp", subtext: "Chat instantly", type: "whatsapp", href: "#" },
    { label: "Call Us", subtext: "Speak directly", type: "phone", href: "#" },
    { label: "Email Us", subtext: "We'll get back", type: "email", href: "#" },
];

const ContactIcon = ({ type }) => {
    if (type === "whatsapp") return <BsWhatsapp className="h-6 w-6" />;
    if (type === "phone") return <FiPhone className="h-6 w-6" />;
    return <FiMail className="h-6 w-6" />;
};

const EmiratesHillsHero = ({ data }) => {
    const { t, isDark, dark } = useThemeStyles();

    if (!data) return null;

    const { backgroundImage, badges, brand, stats, cta, utilityBar } = data;

    return (
        <div
            className={`relative min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${isDark ? "" : "text-[#1a1a1a]"}`}
            style={isDark ? { color: t.text } : undefined}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div
                    className={`absolute inset-0 transition-colors duration-300 ${isDark ? "" : "bg-black/10"}`}
                    style={
                        isDark
                            ? {
                                background:
                                    "linear-gradient(180deg, rgba(35,37,40,0.88) 0%, rgba(35,37,40,0.45) 42%, rgba(35,37,40,0.72) 100%)",
                            }
                            : undefined
                    }
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 pt-8 pb-5 md:pt-12">

                {/* Top Badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex items-center gap-2 bg-[#b08139] text-white px-4 py-2 rounded-full text-[10px] sm:text-sm font-sans font-semibold tracking-wider uppercase">
                        <FiCheckCircle className='w-4 h-4' />
                        {badges?.status}
                    </div>
                    <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] sm:text-sm font-sans font-bold tracking-wider uppercase shadow-sm ${isDark ? "" : "bg-white/90 backdrop-blur-sm"}`}
                        style={isDark ? { ...dark.goldTint, color: t.textSecondary } : undefined}
                    >
                        <GrLocation className='w-4 h-4' />
                        {badges?.location}
                    </div>
                </div>

                {/* Hero Text — h1 / h2 hardcoded */}
                <div className="mb-3 md:mb-12 md:max-w-2xl">
                    <h1
                        className="text-[40px] sm:text-6xl lg:text-7xl font-[575] italic tracking-tight leading-[1.05] mb-2 sm:mb-4"
                        style={{ fontWeight: 510, ...(isDark ? { color: t.text } : {}) }}
                    >
                        Emirates Hills by Emaar.
                    </h1>
                    <p
                        className="text-[16px] sm:text-xl lg:text-2xl font-medium max-w-lg"
                        style={isDark ? { color: t.textSecondary } : undefined}
                    >
                        Completed <span className="text-[#b08139]">Luxury Villas</span> in Emirates Hills, Dubai.
                    </p>
                    <div className="mt-4 flex items-center gap-2 border-l-2 border-[#b08139] pl-3">

                    </div>
                </div>

                {/* Stats Glass Card — one shared white-glass panel (light + dark) */}
                <div className="transition-colors duration-300 lg:mx-auto lg:max-w-5xl lg:overflow-hidden lg:rounded-[18px] lg:border lg:border-white/45 lg:bg-white/55 lg:p-4 lg:shadow-[0_24px_70px_rgba(15,23,42,0.14)] lg:backdrop-blur-2xl">
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/45">
                        {(stats || []).map((stat) => {
                            const Icon = STAT_ICONS[stat.key] || FiShield;
                            return (
                                <StatItem
                                    key={stat.key}
                                    icon={<Icon size={25} />}
                                    label={stat.label}
                                    value={stat.value}
                                />
                            );
                        })}
                    </div>

                    <div className="mt-4 flex w-full flex-col gap-3.5 lg:border-t lg:border-white/45 lg:pt-4">
                        <PrimaryCtaButton label={cta?.label} />
                        <ExpertContactCard />
                    </div>
                </div>

                <div className="mt-4 max-w-5xl mx-auto">
                    <button
                        type="button"
                        className="w-full py-4 px-6 rounded-xl flex items-center justify-between border border-[rgba(255,255,255,0.14)] text-white shadow-[0_10px_24px_rgba(182,138,53,0.24)] group transition-opacity hover:opacity-90"
                        style={{ background: "linear-gradient(180deg, #C99432 0%, #B27C21 100%)" }}
                    >
                        <div className="flex items-center gap-4">
                            <FiMap size={24} color="#ffffff" />
                            <span className="font-sans font-semibold">{utilityBar?.label}</span>
                        </div>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={24} color="#ffffff" />
                    </button>
                </div>

            </div>
        </div>
    );
};

const PrimaryCtaButton = ({ label }) => (
    <button
        type="button"
        className="w-full rounded-[8px] px-[12px] py-[12px] text-[14px] font-semibold text-white transition-colors focus:outline-none inline-flex items-center justify-between gap-3 shadow-[0_10px_24px_rgba(182,138,53,0.24)] hover:opacity-90 text-left lg:px-7 lg:py-4 lg:text-lg"
        style={{
            background: "linear-gradient(180deg, #C99432 0%, #B27C21 100%)",
            color: "#ffffff",
        }}
    >
        <span className="flex min-w-0 flex-1 items-center gap-3">
            <FiCalendar className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="min-w-0 text-left">{label}</span>
        </span>
        <FiArrowRight className="h-6 w-6 shrink-0 lg:h-8 lg:w-8" />
    </button>
);

const ExpertContactCard = () => (
    <div className="max-lg:rounded-[10px] max-lg:border max-lg:border-white/45 max-lg:bg-white/55 max-lg:px-[12px] max-lg:py-[12px] max-lg:shadow-[0_24px_70px_rgba(15,23,42,0.14)] max-lg:backdrop-blur-2xl lg:px-5 lg:py-3">
        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-[1.25fr_repeat(3,1fr)] lg:items-center">
            <div className="flex items-center gap-3 border-b pb-4 lg:border-b-0 lg:pr-5 lg:pb-0">
                <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                    style={{ background: "linear-gradient(180deg, #C99432 0%, #AE7A22 100%)" }}
                >
                    <FiUser className="h-8 w-8" />
                </span>
                <span className="min-w-0">
                    <span className="block text-[16px] font-semibold leading-tight text-[#111111]">
                        Speak to an Investment Expert
                    </span>
                    <span className="mt-1 block text-[12px] leading-relaxed text-[#5c5c5c]">
                        Get expert guidance. It's free & with no obligation.
                    </span>
                </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-[#eadfce] lg:contents">
                {CONTACT_ACTIONS.map((action, index) => (
                    <a
                        key={`${action.label}-${index}`}
                        href={action.href}
                        className="px-2 text-center transition-opacity hover:opacity-80 lg:flex lg:items-center lg:gap-3 lg:border-l lg:px-4 lg:text-left"
                        style={{ borderColor: "#eadfce" }}
                    >
                        <span
                            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border text-[#B68A35] lg:mx-0 lg:shrink-0"
                            style={{ borderColor: "rgba(182,138,53,0.28)" }}
                        >
                            <ContactIcon type={action.type} />
                        </span>
                        <span className="mt-2 block text-center lg:mt-0 lg:min-w-0 lg:text-left">
                            <span className="block text-sm font-semibold leading-tight text-[#111111]">
                                {action.label}
                            </span>
                            <span className="mt-1 block text-xs leading-tight text-[#6a6a6a]">
                                {action.subtext}
                            </span>
                        </span>
                    </a>
                ))}
            </div>
        </div>
    </div>
);

const StatItem = ({ icon, label, value }) => (
    <div className="min-w-0 max-lg:rounded-xl max-lg:border max-lg:border-white/45 max-lg:bg-white/55 max-lg:p-3 max-lg:shadow-[0_24px_70px_rgba(15,23,42,0.14)] max-lg:backdrop-blur-2xl sm:max-lg:p-4 lg:px-5 lg:py-2.5">
        <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/55 bg-white/45 text-[#b08139] sm:h-9 sm:w-9">
                {icon}
            </div>
            <p className="min-w-0 flex-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.18em] text-[#9b835e] sm:text-[11px]">
                {label}
            </p>
        </div>
        <p
            className={`mt-1.5 text-lg font-semibold tracking-tight text-[#161616] sm:text-xl lg:text-2xl ${label.includes("SQFT") ? "whitespace-nowrap" : ""}`}
        >
            {value}
        </p>
    </div>
);

export default EmiratesHillsHero;
