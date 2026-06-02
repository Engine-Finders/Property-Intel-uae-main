"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Handshake,
    Building2,
    Target,
    Trophy,
    Landmark,
    Calendar,
    ExternalLink,
    AlertTriangle,
    ChevronRight,
    FileText,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import {
    Info
} from 'lucide-react';
import { BsBoxSeam, BsChevronUp, BsChevronDown, BsLink45Deg } from 'react-icons/bs';
import { HiOutlineExternalLink } from 'react-icons/hi';
import ExpertSection from './ExpertSection';
import { useThemeStyles, GOLD_BORDER, PANEL_DARK_BG } from '@/app/components/context/themeStyles';

const Section7 = () => {
    const { t, isDark, dark } = useThemeStyles();
    const [activeTab, setActiveTab] = useState('joint-ventures');
    const [expandedCard, setExpandedCard] = useState(null);
    const [sourcesOpen, setSourcesOpen] = useState(false);

    const cardBg = isDark ? PANEL_DARK_BG : "#FFFFFF";
    const cardBorder = isDark ? t.cardBorder : "rgba(0,0,0,0.08)";
    const sectionBg = isDark ? t.bg : "#FCFBFA";
    const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
    const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

    const categories = [
        {
            id: 'joint-ventures',
            title: 'Government Joint Ventures',
            description: 'List of joint ventures with government entities.',
            icon: Handshake
        },
        {
            id: 'contracts',
            title: 'Government Contracts',
            description: 'Publicly awarded contracts from government entities.',
            icon: Building2
        },
        {
            id: 'frameworks',
            title: 'Alignment with National Strategic Frameworks',
            description: "Emaar's alignment with UAE national strategic vision and long-term goals.",
            icon: Target
        },
        {
            id: 'awards',
            title: 'Government Recognitions & Awards',
            description: 'Awards and recognitions received from government authorities.',
            icon: Trophy
        }
    ];

    const activeCategory = categories.find((c) => c.id === activeTab) || categories[0];
    const expandedCategory = categories.find((c) => c.id === expandedCard) || null;

    const jointVentures = [
        {
            year: '2005',
            title: 'Investment Corporation of Dubai (ICD) – Strategic Shareholder (2005)',
            subtitle: 'STRATEGIC SHAREHOLDER',
            logo: 'ICD',
            description: 'ICD, the principal investment arm of the Government of Dubai, holds a significant stake in Emaar Properties PJSC. This relationship ensures strategic alignment between Emaar\'s development pipeline and Dubai\'s economic growth objectives.',
            source: 'Dubai Housing Analysis — Who Is the Real Owner of Emaar?',
            sourceDate: '25 SEPTEMBER 2023',
            url: 'dubaihousing-ae.com',
            fullUrl: 'https://www.dubaihousing-ae.com/people-also-ask/who-is-the-real-owner-of-emaar'
        },
        {
            year: '2016',
            title: 'Dubai Holding – Dubai Creek Harbour Development (2016)',
            subtitle: 'JOINT DEVELOPMENT',
            logo: 'DUBAI HOLDING',
            description: 'Strategic collaboration between Emaar Properties and Dubai Holding to develop the Dubai Creek Harbour master community. This partnership leverages state-owned land assets combined with Emaar\'s development expertise to create a new city center.',
            source: 'The National; Santiago Calatrava Architects Official Website',
            sourceDate: 'FEBRUARY 2016',
            url: 'thenationalnews.com, prod.calatrava.com',
            fullUrl: 'https://www.thenationalnews.com/business/property/architects-keen-on-calatrava-designed-tower-at-dubai-creek-project-1.172832/, https://www.prod.calatrava.com/news/reader/calatrava-wins-international-competition-tower-in-dubai.html'
        }
    ];

    const governmentContracts = [
        {
            year: '2017',
            title: 'Expo 2020 Dubai Infrastructure & Al Wasl Plaza (2017)',
            subtitle: 'INFRASTRUCTURE DEVELOPMENT',
            logo: 'EXPO 2020',
            description: 'Client: Expo 2020 Dubai / Dubai Government Description: Emaar was appointed to develop key infrastructure at the Expo 2020 site, including the iconic Al Wasl Plaza dome and surrounding districts, serving as the central gathering point for the event. Value: Undisclosed Status: Completed ',
            source: 'Meydan Free Zone - Emaar Hospitality Group Case Study',
            sourceDate: 'JUNE 2025',
            url: 'meydanfz.ae',
            fullUrl: 'https://www.meydanfz.ae/case-studies/emaar-hospitality-group'
        },
        {
            year: '2008',
            title: 'Dubai Metro Integration - Downtown Dubai Stations (2008-2010)',
            subtitle: 'TRANSIT INFRASTRUCTURE',
            logo: 'RTA',
            description: 'Client: Roads and Transport Authority (RTA) Description: Emaar funded and constructed metro stations and connectivity infrastructure integrating the Dubai Metro Red Line with Downtown Dubai and Dubai Mall, enhancing public transit access. Value: Undisclosed Status: Completed ',
            source: 'Gulf News - First batch of companies to win Dubai Metro naming rights',
            sourceDate: 'DECEMBER 2008',
            url: 'gulfnews.com',
            fullUrl: 'https://gulfnews.com/uae/first-batch-of-companies-to-win-dubai-metro-naming-rights-announced-1.150041'
        }
    ];

    const strategicFrameworks = [
        {
            year: '2021',
            title: 'Dubai 2040 Urban Master Plan',
            subtitle: 'URBAN DEVELOPMENT ALIGNMENT',
            logo: 'DUBAI 2040',
            description: "Role: Major private sector contributor Description: Emaar's master communities, including Dubai Hills Estate, The Valley, and Dubai Creek Harbour, align with the Dubai 2040 Urban Master Plan's objectives for sustainable urban expansion, green spaces, and population distribution. ",
            source: 'Government of Dubai Media Office',
            sourceDate: '13 MARCH 2021',
            url: 'mediaoffice.ae',
            fullUrl: 'https://www.mediaoffice.ae/en/news/2021/march/13-03/mohammed-bin-rashid'
        },
        {
            year: '2024',
            title: 'UAE Centennial 2071',
            subtitle: 'ECONOMIC DIVERSIFICATION PARTNER',
            logo: 'UAE 2071',
            description: 'Role: Economic diversification partner Description: Through tourism, retail, and hospitality assets, Emaar supports the UAE Centennial 2071 goal of establishing the UAE as the best country in the world by enhancing quality of life and economic resilience. ',
            source: 'UAE Government portal',
            sourceDate: '2024',
            url: 'u.ae',
            fullUrl: 'https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/strategies-plans-and-visions/innovation-and-future-shaping/uae-centennial-2071'
        }
    ];

    const awards = [
        {
            year: '2024',
            title: 'DLD Top Developer Award (2024) ⚠️ Pending Verification',
            subtitle: 'TOP DEVELOPER RECOGNITION',
            logo: 'DLD',
            description: 'Issuing Body: Dubai Land Department Source Reference: DLD Annual Ceremony 2024',
            source: 'DLD Annual Ceremony 2024',
            sourceDate: '2024',
            url: 'dubailand.gov.ae',
            fullUrl: ''
        },
        {
            year: '2023',
            title: 'RERA Excellence in Community Management (2023) ⚠️ Pending Verification',
            subtitle: 'COMMUNITY MANAGEMENT EXCELLENCE',
            logo: 'RERA',
            description: 'Issuing Body: Real Estate Regulatory Agency (RERA) Source Reference: RERA Awards Program 2023',
            source: 'RERA Awards Program 2023',
            sourceDate: '2023',
            url: 'dubailand.gov.ae',
            fullUrl: ''
        }
    ];

    const sourcesList = [
        {
            fact: 'ICD strategic shareholding',
            source: 'Dubai Housing Analysis',
            reference: 'Who Is the Real Owner of Emaar? (25 September 2023)',
            urls: ['https://www.dubaihousing-ae.com/people-also-ask/who-is-the-real-owner-of-emaar']
        },
        {
            fact: 'Dubai Creek Harbour collaboration',
            source: 'The National; Santiago Calatrava Architects Official Website',
            reference: 'Architects keen on Calatrava-designed tower at Dubai Creek project (Feb 2016); Calatrava wins international design competition (Feb 2016)',
            urls: [
                'https://www.thenationalnews.com/business/property/architects-keen-on-calatrava-designed-tower-at-dubai-creek-project-1.172832/',
                'https://www.prod.calatrava.com/news/reader/calatrava-wins-international-competition-tower-in-dubai.html'
            ]
        },
        {
            fact: 'Expo 2020 hospitality partnership',
            source: 'Meydan Free Zone - Emaar Hospitality Group Case Study',
            reference: 'Emaar Hospitality Group Case Study (June 2025)',
            urls: ['https://www.meydanfz.ae/case-studies/emaar-hospitality-group']
        },
        {
            fact: 'Dubai Metro integration',
            source: 'Gulf News',
            reference: 'First batch of companies to win Dubai Metro naming rights (December 2008)',
            urls: ['https://gulfnews.com/uae/first-batch-of-companies-to-win-dubai-metro-naming-rights-announced-1.150041']
        },
        {
            fact: 'Dubai 2040 alignment',
            source: 'Government of Dubai Media Office',
            reference: 'Mohammed bin Rashid launches Dubai 2040 Urban Master Plan (13 March 2021)',
            urls: ['https://www.mediaoffice.ae/en/news/2021/march/13-03/mohammed-bin-rashid']
        },
        {
            fact: 'UAE Centennial 2071 alignment',
            source: 'UAE Government Official Portal',
            reference: 'UAE Centennial 2071 official page (updated 2024)',
            urls: ['https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/strategies-plans-and-visions/innovation-and-future-shaping/uae-centennial-2071']
        }
    ];

    const renderContent = (tab = activeTab) => {
        switch (tab) {
            case 'joint-ventures':
                return (
                    <div className="space-y-6">
                        {jointVentures.map((venture, index) => (
                            <div key={index} className={`rounded-2xl p-6 transition-colors duration-300`} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center`} style={!isDark ? { background: '#FDFBF7' } : { background: 'rgba(182,138,53,0.12)' }}>
                                            <Landmark className="w-8 h-8 text-[#B68A35]" />
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <div>
                                                <h4 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                    {venture.title}
                                                </h4>
                                                <p className="text-xs font-semibold text-[#B68A35] uppercase tracking-wider mt-1">
                                                    {venture.subtitle}
                                                </p>
                                            </div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold`} style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: '#B68A35' }}>
                                                {venture.year}
                                            </span>
                                        </div>

                                        <p className={`text-sm leading-relaxed mb-4 max-w-2xl`} style={{ color: bodyColor }}>
                                            {venture.description}
                                        </p>
                                    </div>

                                    <div className="w-full lg:w-110 flex-shrink-0">
                                        <div className={`rounded-xl p-4`} style={!isDark ? { background: '#FAF9F6' } : { background: 'rgba(255,255,255,0.04)' }}>
                                            <div className="flex items-start gap-2 mb-2">
                                                <ExternalLink className={`w-4 h-4 mt-0.5 flex-shrink-0 text-[#B68A35]`} />
                                                <div>
                                                    <p className={`text-xs font-semibold uppercase tracking-wider`} style={isDark ? { color: subtextColor } : { color: '#6B7280' }}>
                                                        SOURCE • {venture.sourceDate}
                                                    </p>
                                                    <p className={`text-sm mt-1`} style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                                        {venture.source}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 mt-3 ml-6">
                                                <div className="flex items-center gap-2">
                                                    <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                    <a href={venture.fullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                        {venture.url}
                                                    </a>
                                                </div>
                                                {venture.secondaryUrl && (
                                                    <div className="flex items-center gap-2">
                                                        <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                        <a href={venture.secondaryFullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                            {venture.secondaryUrl}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'contracts':
                return (
                    <div className="space-y-6">
                        {governmentContracts.map((venture, index) => (
                            <div key={index} className={`rounded-2xl p-6 transition-colors duration-300`} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center`} style={!isDark ? { background: '#FDFBF7' } : { background: 'rgba(182,138,53,0.12)' }}>
                                            <Landmark className="w-8 h-8 text-[#B68A35]" />
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <div>
                                                <h4 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                    {venture.title}
                                                </h4>
                                                <p className="text-xs font-semibold text-[#B68A35] uppercase tracking-wider mt-1">
                                                    {venture.subtitle}
                                                </p>
                                            </div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold`} style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: '#B68A35' }}>
                                                {venture.year}
                                            </span>
                                        </div>

                                        <p className={`text-sm leading-relaxed mb-4 max-w-2xl`} style={{ color: bodyColor }}>
                                            {venture.description}
                                        </p>
                                    </div>

                                    <div className="w-full lg:w-110 flex-shrink-0">
                                        <div className={`rounded-xl p-4`} style={!isDark ? { background: '#FAF9F6' } : { background: 'rgba(255,255,255,0.04)' }}>
                                            <div className="flex items-start gap-2 mb-2">
                                                <ExternalLink className={`w-4 h-4 mt-0.5 flex-shrink-0 text-[#B68A35]`} />
                                                <div>
                                                    <p className={`text-xs font-semibold uppercase tracking-wider`} style={isDark ? { color: subtextColor } : { color: '#6B7280' }}>
                                                        SOURCE • {venture.sourceDate}
                                                    </p>
                                                    <p className={`text-sm mt-1`} style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                                        {venture.source}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 mt-3 ml-6">
                                                <div className="flex items-center gap-2">
                                                    <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                    <a href={venture.fullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                        {venture.url}
                                                    </a>
                                                </div>
                                                {venture.secondaryUrl && (
                                                    <div className="flex items-center gap-2">
                                                        <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                        <a href={venture.secondaryFullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                            {venture.secondaryUrl}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'frameworks':
                return (
                    <div className="space-y-6">
                        {strategicFrameworks.map((venture, index) => (
                            <div key={index} className={`rounded-2xl p-6 transition-colors duration-300`} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center`} style={!isDark ? { background: '#FDFBF7' } : { background: 'rgba(182,138,53,0.12)' }}>
                                            <Landmark className="w-8 h-8 text-[#B68A35]" />
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <div>
                                                <h4 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                    {venture.title}
                                                </h4>
                                                <p className="text-xs font-semibold text-[#B68A35] uppercase tracking-wider mt-1">
                                                    {venture.subtitle}
                                                </p>
                                            </div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold`} style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: '#B68A35' }}>
                                                {venture.year}
                                            </span>
                                        </div>

                                        <p className={`text-sm leading-relaxed mb-4 max-w-2xl`} style={{ color: bodyColor }}>
                                            {venture.description}
                                        </p>
                                    </div>

                                    <div className="w-full lg:w-110 flex-shrink-0">
                                        <div className={`rounded-xl p-4`} style={!isDark ? { background: '#FAF9F6' } : { background: 'rgba(255,255,255,0.04)' }}>
                                            <div className="flex items-start gap-2 mb-2">
                                                <ExternalLink className={`w-4 h-4 mt-0.5 flex-shrink-0 text-[#B68A35]`} />
                                                <div>
                                                    <p className={`text-xs font-semibold uppercase tracking-wider`} style={isDark ? { color: subtextColor } : { color: '#6B7280' }}>
                                                        SOURCE • {venture.sourceDate}
                                                    </p>
                                                    <p className={`text-sm mt-1`} style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                                        {venture.source}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 mt-3 ml-6">
                                                <div className="flex items-center gap-2">
                                                    <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                    <a href={venture.fullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                        {venture.url}
                                                    </a>
                                                </div>
                                                {venture.secondaryUrl && (
                                                    <div className="flex items-center gap-2">
                                                        <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                        <a href={venture.secondaryFullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                            {venture.secondaryUrl}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'awards':
                return (
                    <div className="space-y-6">
                        {awards.map((venture, index) => (
                            <div key={index} className={`rounded-2xl p-6 transition-colors duration-300`} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center`} style={!isDark ? { background: '#FDFBF7' } : { background: 'rgba(182,138,53,0.12)' }}>
                                            <Landmark className="w-8 h-8 text-[#B68A35]" />
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <div>
                                                <h4 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                    {venture.title}
                                                </h4>
                                                <p className="text-xs font-semibold text-[#B68A35] uppercase tracking-wider mt-1">
                                                    {venture.subtitle}
                                                </p>
                                            </div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold`} style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: '#B68A35' }}>
                                                {venture.year}
                                            </span>
                                        </div>

                                        <p className={`text-sm leading-relaxed mb-4 max-w-2xl`} style={{ color: bodyColor }}>
                                            {venture.description}
                                        </p>
                                    </div>

                                    <div className="w-full lg:w-110 flex-shrink-0">
                                        <div className={`rounded-xl p-4`} style={!isDark ? { background: '#FAF9F6' } : { background: 'rgba(255,255,255,0.04)' }}>
                                            <div className="flex items-start gap-2 mb-2">
                                                <ExternalLink className={`w-4 h-4 mt-0.5 flex-shrink-0 text-[#B68A35]`} />
                                                <div>
                                                    <p className={`text-xs font-semibold uppercase tracking-wider`} style={isDark ? { color: subtextColor } : { color: '#6B7280' }}>
                                                        SOURCE • {venture.sourceDate}
                                                    </p>
                                                    <p className={`text-sm mt-1`} style={isDark ? { color: t.textSecondary } : { color: '#374151' }}>
                                                        {venture.source}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 mt-3 ml-6">
                                                <div className="flex items-center gap-2">
                                                    <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                    <a href={venture.fullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                        {venture.url}
                                                    </a>
                                                </div>
                                                {venture.secondaryUrl && (
                                                    <div className="flex items-center gap-2">
                                                        <ExternalLink className="w-3.5 h-3.5 text-[#B68A35]" />
                                                        <a href={venture.secondaryFullUrl} target="_blank" rel="noopener noreferrer" className={`text-xs text-[#B68A35] hover:underline`}>
                                                            {venture.secondaryUrl}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className={`w-full font-sans antialiased transition-colors duration-300`} style={{ background: sectionBg }}>
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
                    <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`} style={isDark ? dark?.heroOverlayLeft : undefined} />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
                    <h2 className="text-3xl lg:text-5xl font-serif mb-1" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                        Emaar Government & Strategic
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        Partnerships - Stability Through Collaboration
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base leading-relaxed font-medium" style={{ color: bodyColor }}>
                        Emaar Properties maintains strategic alignments with UAE government entities through shareholding structures, infrastructure delivery, and participation in national master plans.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-2 sm:px-6 -mt-8 sm:-mt-15 relative z-10 pb-20">

                {/* Tabs + Content (joined, Section6-style) */}
                <div className={`rounded-2xl shadow-sm overflow-hidden mb-6 transition-colors duration-300`} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                    <div style={isDark ? { ...dark.tabBar, borderBottom: `1px solid ${cardBorder}` } : { borderBottom: `1px solid ${cardBorder}` }}>
                        {/* Desktop tab row */}
                        <div className="hidden md:flex flex-row items-stretch gap-1 lg:px-0">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = activeTab === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveTab(category.id)}
                                        aria-pressed={isActive}
                                        className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-3 transition-all border-b-2 ${
                                            isActive && !isDark
                                                ? "text-[#B68A35] border-[#B68A35] bg-[#FDFBF7]"
                                                : !isDark && !isActive
                                                  ? "text-gray-400 border-transparent bg-[#FBF9F6] hover:bg-gray-50"
                                                  : isActive
                                                    ? "text-[#B68A35]"
                                                    : ""
                                        }`}
                                        style={
                                            isDark
                                                ? isActive
                                                    ? { ...dark.tabActive, borderBottomColor: GOLD_BORDER }
                                                    : { ...dark.tabInactive, borderBottomColor: "transparent" }
                                                : undefined
                                        }
                                    >
                                        <div className="flex items-center justify-center w-full gap-2">
                                            <Icon className="text-2xl sm:text-3xl flex-shrink-0" />
                                            <span
                                                className={`font-semibold text-sm ${!isDark && !isActive ? "text-slate-900" : ""}`}
                                                style={isDark && !isActive ? dark.textMuted : undefined}
                                            >
                                                {category.title}
                                            </span>
                                        </div>
                                        {isDark && isActive && (
                                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" aria-hidden />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mobile cards (accordion) */}
                        <div className="md:hidden px-2 py-2">
                            {expandedCard ? (
                                <div className="space-y-2">
                                    {expandedCategory && (
                                        <div className={`rounded-2xl p-2 transition-colors duration-300`} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                            <div className="w-full">
                                                <button
                                                    onClick={() => setExpandedCard(null)}
                                                    aria-expanded={true}
                                                    className="w-full flex flex-col items-center text-center gap-3"
                                                >
                                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors`} style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                                                        <expandedCategory.icon className="w-6 h-6" />
                                                    </div>
                                                    <h4 className={`font-serif font-semibold text-sm`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                        {expandedCategory.title}
                                                    </h4>
                                                    <p className={`text-xs leading-relaxed`} style={{ color: bodyColor }}>
                                                        {expandedCategory.description}
                                                    </p>
                                                </button>

                                                <div className="w-full mt-4 text-left">
                                                    {renderContent(expandedCategory.id)}
                                                </div>

                                                <div className="w-full mt-3 text-right">
                                                    <button onClick={() => setExpandedCard(null)} className="text-sm text-[#B68A35] font-semibold">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        {categories.filter((c) => c.id !== expandedCard).map((cat) => {
                                            const Icon = cat.icon;
                                            return (
                                                <div key={cat.id} className={`rounded-2xl p-4 transition-colors duration-300`} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                                    <button
                                                        onClick={() => {
                                                            setExpandedCard(cat.id);
                                                            setActiveTab(cat.id);
                                                        }}
                                                        aria-expanded={false}
                                                        className="w-full flex flex-col items-center text-center gap-3"
                                                    >
                                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors`} style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                                                            <Icon className="w-6 h-6" />
                                                        </div>
                                                        <h4 className={`font-serif font-semibold text-sm`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                            {cat.title}
                                                        </h4>
                                                        <p className={`text-xs leading-relaxed`} style={{ color: bodyColor }}>
                                                            {cat.description}
                                                        </p>
                                                        <ChevronRight className="w-5 h-5 text-[#B68A35]" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {categories.map((cat) => {
                                        const Icon = cat.icon;
                                        return (
                                            <div key={cat.id} className={`rounded-2xl p-4 transition-colors duration-300`} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                                                <button
                                                    onClick={() => {
                                                        setExpandedCard(cat.id);
                                                        setActiveTab(cat.id);
                                                    }}
                                                    aria-expanded={false}
                                                    className="w-full flex flex-col items-center text-center gap-3"
                                                >
                                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors`} style={!isDark ? { background: '#FDFBF7', color: '#B68A35' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <h4 className={`font-serif font-semibold text-sm`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                                        {cat.title}
                                                    </h4>
                                                    <p className={`text-xs leading-relaxed`} style={{ color: bodyColor }}>
                                                        {cat.description}
                                                    </p>
                                                    <ChevronRight className="w-5 h-5 text-[#B68A35]" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 hidden md:block">
                        <div className="mb-6">
                            <h3 className={`text-lg font-serif font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>
                                {activeCategory.title}
                            </h3>
                            <p className={`text-sm mt-1`} style={{ color: bodyColor }}>
                                {activeCategory.description}
                            </p>
                        </div>

                        {renderContent()}
                    </div>
                </div>

                {/* Sources & Verification (accordion) */}
                <div className={`rounded-xl overflow-hidden transition-colors duration-300`} style={{ border: `1px solid ${cardBorder}` }}>
                    <button
                        onClick={() => setSourcesOpen(!sourcesOpen)}
                        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-[#FAF6EE]'}`}
                        style={{ background: cardBg }}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={!isDark ? { background: '#FAF6EE' } : { background: 'rgba(182,138,53,0.12)' }}>
                                <BsBoxSeam className="text-[#B68A35] w-4 h-4" />
                            </div>
                            <span className={`text-[13px] font-semibold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Sources & Verification</span>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full`} style={!isDark ? { background: '#FAF6EE', color: '#6B7280' } : { background: 'rgba(182,138,53,0.12)', color: subtextColor }}>
                                {sourcesList.length} Financial & Regulatory Sources
                            </span>
                        </div>
                        {sourcesOpen ? <BsChevronUp className={`w-4 h-4`} style={{ color: subtextColor }} /> : <BsChevronDown className={`w-4 h-4`} style={{ color: subtextColor }} />}
                    </button>

                    {sourcesOpen && (
                        <div style={{ borderTop: `1px solid ${cardBorder}`, background: cardBg }}>
                            {sourcesList.map((s, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-4 py-3 border-b text-[11px] last:border-b-0`}
                                    style={{ borderBottom: `1px solid ${cardBorder}` }}
                                >
                                    <div className="sm:w-[22%] shrink-0">
                                        <span className={`font-bold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Fact: </span>
                                        <span style={{ color: bodyColor }}>{s.fact}</span>
                                    </div>
                                    <div className="sm:flex-1">
                                        <span className={`font-bold`} style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Source: </span>
                                        <span style={{ color: bodyColor }}>{s.source}</span>
                                        <span className={`block mt-0.5`} style={{ color: subtextColor }}>{s.reference}</span>
                                    </div>
                                    <div className="sm:w-[28%] shrink-0 flex items-start justify-between">
                                        {s.urls && s.urls.length > 0 ? (
                                            <a
                                                href={s.urls[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-1 group hover:underline truncate max-w-[90%] text-[#B68A35]`}
                                            >
                                                <BsLink45Deg className="shrink-0 w-3.5 h-3.5" />
                                                <span className="truncate">{s.urls[0].replace('https://', '')}</span>
                                            </a>
                                        ) : (
                                            <span style={{ color: subtextColor }}>-</span>
                                        )}
                                        <HiOutlineExternalLink className={`shrink-0 w-3.5 h-3.5 ml-1 mt-0.5`} style={{ color: subtextColor }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <ExpertSection />
                
                <div className="mt-2 sm:mt-6 rounded-xl px-4 py-4 sm:px-5 flex items-start gap-3" style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6' }}>
                    <Info className="w-5 h-5 text-[#B68A35] shrink-0" />
                    <p className="text-[10px] sm:text-xs leading-relaxed" style={{ color: bodyColor }}>
                        <span className="font-bold" style={isDark ? { color: t.text } : { color: '#1A1A1A' }}>Disclaimer</span> All information sourced from official government announcements and publicly filed reports. Last verified: 22 February 2026.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Section7;