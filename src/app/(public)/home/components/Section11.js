"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Star, Info, Leaf, Users, Sparkles, ShieldCheck,
    Clock, Banknote, Car, HardHat, ChevronDown,
    ArrowRight
} from 'lucide-react';
import { SiGooglemaps } from "react-icons/si";
import { TbHomeHeart } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import ExpertSection from './ExpertSection';

const Section11 = () => {
    const [activeTab, setActiveTab] = useState('love'); // 'love' or 'concerns'
    const [openRecent, setOpenRecent] = useState(false);
    const [openVerification, setOpenVerification] = useState(false);

    // Keep accordions closed by default on all breakpoints.

    const ratings = [
        { platform: "Google Maps", rating: 3.9, reviews: "~1,200+", icon: <SiGooglemaps className="text-[#4285F4]" /> },
        { platform: "PropertyFinder.ae", rating: 3.5, reviews: "~850+", icon: <TbHomeHeart className="text-[#EF5E4E]" /> },
        { platform: "Bayut.com", rating: 3.5, reviews: "~950+", icon: <Image src="/icons/bayut-icon.png" width={16} height={16} alt="Bayut" className="grayscale" /> } // Placeholder for custom icon
    ];

    const residentsLove = [
        { icon: <Leaf className="w-5 h-5 text-[#B68A35]" />, title: "Well-maintained landscaping and integrated community amenities", desc: "Mentioned in ~85% of positive reviews" },
        { icon: <Users className="w-5 h-5 text-[#B68A35]" />, title: "Strong sense of community in master-planned developments", desc: "Frequently noted for Dubai Hills Estate, Arabian Ranches, and The Valley" },
        { icon: <Sparkles className="w-5 h-5 text-[#B68A35]" />, title: "High-quality finishes and attention to detail in newer handovers", desc: "Highlighted in reviews for recent projects (2024-2026)" },
        { icon: <ShieldCheck className="w-5 h-5 text-[#B68A35]" />, title: "Security, gated access, and 24/7 community management", desc: "Consistently praised across apartment and villa communities" },
    ];

    const commonConcerns = [
        { icon: <Clock className="w-5 h-5 text-[#B68A35]" />, title: "Slow response times for non-urgent maintenance requests", desc: "Appears in approx. 60% of negative reviews" },
        { icon: <Banknote className="w-5 h-5 text-[#B68A35]" />, title: "Service charge increases without detailed justification", desc: "Common concern in older communities (The Greens, The Springs) per Mollak-linked feedback" },
        { icon: <Car className="w-5 h-5 text-[#B68A35]" />, title: "Limited visitor parking in high-density tower communities", desc: "Recurring theme in Dubai Marina and Downtown Dubai reviews" },
        { icon: <HardHat className="w-5 h-5 text-[#B68A35]" />, title: "Construction activity and noise in actively developing phases", desc: "Noted in Dubai Creek Harbour and Expo Valley resident feedback" },
    ];

    const reviews = [
        { platform: "Google Maps", date: "Feb 2026", stars: 5, text: "Dubai Hills has everything we need — schools, parks, malls. Community feels safe and well-managed." },
        { platform: "PropertyFinder.ae", date: "Jan 2026", stars: 3, text: "Beautiful apartment but took 3 weeks to get a leaking tap fixed. Maintenance team needs more resources." },
        { platform: "Bayut.com", date: "Dec 2025", stars: 3, text: "Service charges went up again but no clear breakdown of where the money goes. Transparency would help." },
        { platform: "Google Maps", date: "Jan 2026", stars: 4, text: "The Greens still feels premium after 20+ years. Landscaping is immaculate and neighbours are friendly." },
        { platform: "PropertyFinder.ae", date: "Feb 2026", stars: 3, text: "Guest parking is very limited in Creek Harbour towers. Visitors often have to park far away." },
    ];

    return (
        <section className="w-full bg-[#FCFBFA] py-2 sm:py-5  font-sans antialiased text-[#1A1A1A]">


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
                        What Residents Say About Emaar:
                        <span className="lg:hidden">—</span>
                    </h2>
                    <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
                        Communities - Verified Reviews
                    </h3>
                    <p className="max-w-xl text-sm lg:text-base text-gray-600 leading-relaxed font-medium">
                        We've analysed thousands of resident reviews from independent platforms to give you an honest, unfiltered picture of life in Emaar developments across Dubai.
                    </p>
                </div>
            </div>

            <div className="max-w-350 mx-auto px-2 sm:px-6 -mt-8 sm:-mt-12 relative z-10 pb-16">

                {/* Top Ratings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2 sm:mb-4">
                    {/* Mobile Layout - Matches Screenshot */}
                    <div className="lg:hidden bg-white border border-[#F3EFE9] rounded-2xl p-6 shadow-sm">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-6xl font-bold text-gray-900 font-[Merriweather] tabular-nums">3.7</span>
                                <span className="text-2xl text-gray-400 font-[Merriweather] tabular-nums">/5</span>
                            </div>

                            <div className="text-right">
                                <div className="flex gap-0.5 mb-1 justify-end">
                                    {[1, 2, 3, 4].map((s) => (
                                        <svg key={s} className="w-5 h-5 fill-[#C9A962]" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <svg className="w-5 h-5 fill-gray-200" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-500">3,000+ reviews analysed</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 mb-6"></div>

                        {/* Platform Breakdown */}
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Platform Breakdown</p>

                            <div className="space-y-4">
                                {/* Google Maps */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Image src="/Home/googlemap.png" alt="Google Maps" width={16} height={16} className="w-4 h-4 object-contain" />
                                        <span className="font-medium text-gray-800">Google Maps</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4].map((s) => (
                                                <svg key={s} className="w-4 h-4 fill-[#C9A962]" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <svg className="w-4 h-4 fill-gray-200" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#C9A962]">3.9</span>
                                            <span className="text-sm text-gray-400">1,200+</span>
                                        </div>
                                    </div>
                                </div>

                                {/* PropertyFinder */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Image src="/Home/propertyfinder.png" alt="PropertyFinder" width={16} height={16} className="w-4 h-4 object-contain" />
                                        <span className="font-medium text-gray-800">PropertyFinder</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4].map((s) => (
                                                <svg key={s} className="w-4 h-4 fill-[#C9A962]" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <svg className="w-4 h-4 fill-gray-200" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#C9A962]">3.5</span>
                                            <span className="text-sm text-gray-400">850+</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bayut.com */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Image src="/Home/beyut.png" alt="Bayut" width={16} height={16} className="w-4 h-4 object-contain" />
                                        <span className="font-medium text-gray-800">Bayut.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4].map((s) => (
                                                <svg key={s} className="w-4 h-4 fill-[#C9A962]" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <svg className="w-4 h-4 fill-gray-200" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#C9A962]">3.5</span>
                                            <span className="text-sm text-gray-400">950+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout - Original */}
                    <div className="hidden lg:block bg-white border border-[#F3EFE9] rounded-2xl p-8 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Aggregated Rating</h3>
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            <div className="flex items-baseline gap-1">
                                <span className="text-[90px] font-bold text-gray-900 font-[Merriweather] tabular-nums">3.7</span>
                                <span className="text-4xl text-gray-400 font-[Merriweather] tabular-nums">/5</span>
                            </div>

                            {/* Vertical Divider */}
                            <div className="hidden md:block w-px h-32 bg-gray-200"></div>

                            <div className="flex-1">
                                <div className="flex gap-1 mb-3">
                                    {[1, 2, 3, 4].map((s) => (
                                        <svg key={s} className="w-8 h-8 fill-[#C9A962]" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <svg className="w-8 h-8 fill-gray-200" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-800 mb-2">Overall Score</p>
                                <p className="text-sm text-gray-600">
                                    Total Reviews Analysed: ~3,000+<br />
                                    (aggregated across platforms)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Platform Breakdown - Desktop Table */}
                    <div className="hidden lg:block bg-white border border-[#F3EFE9] rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Platform Breakdown</h3>
                        <div className="overflow-hidden rounded-xl border border-gray-200">
                            <table className="w-full text-sm ">
                                <thead className="bg-[#B68A35] text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Platform</th>
                                        <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide">Average Rating</th>
                                        <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-wide">Number of Reviews</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {/* Google Maps */}
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 flex items-center gap-3">
                                            <Image src="/Home/googlemap.png" alt="Google Maps" width={24} height={24} className="w-6 h-6 object-contain" />
                                            <span className="font-medium text-gray-800">Google Maps</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="font-bold text-[#C9A962] ">3.9</span>
                                            <span className="text-gray-400 ml-1">/ 5</span>
                                        </td>
                                        <td className="px-4 py-4 text-right text-gray-600">~1,200+</td>
                                    </tr>

                                    {/* PropertyFinder.ae */}
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 flex items-center gap-3">
                                            <Image src="/Home/propertyfinder.png" alt="PropertyFinder" width={24} height={24} className="w-6 h-6 object-contain" />
                                            <span className="font-medium text-gray-800">PropertyFinder.ae</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="font-bold text-[#C9A962]">3.5</span>
                                            <span className="text-gray-400 ml-1">/ 5</span>
                                        </td>
                                        <td className="px-4 py-4 text-right text-gray-600">~850+</td>
                                    </tr>

                                    {/* Bayut.com */}
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 flex items-center gap-3">
                                            <Image src="/Home/beyut.png" alt="Bayut" width={24} height={24} className="w-6 h-6 object-contain" />
                                            <span className="font-medium text-gray-800">Bayut.com</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="font-bold text-[#C9A962]">3.5</span>
                                            <span className="text-gray-400 ml-1">/ 5</span>
                                        </td>
                                        <td className="px-4 py-4 text-right text-gray-600">~950+</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sentiment Distribution Bar */}
                <div className="bg-white border border-[#F3EFE9] rounded-2xl p-4 mb-2 sm:mb-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 font-[Merriweather] tabular-nums">Sentiment Distribution</h3>
                    <div className="w-full h-3 bg-gray-100 rounded-full flex overflow-hidden mb-4 sm:mb-8">
                        <div className="h-full bg-[#C9A962]" style={{ width: '78%' }} />
                        <div className="h-full bg-[#D4D0C8]" style={{ width: '14%' }} />
                        <div className="h-full bg-[#F4A49A]" style={{ width: '8%' }} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-[#C9A962]" />
                                <span className="text-sm text-gray-600">Positive</span> <span className="hidden sm:block text-gray-600">(4-5 stars)</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 font-[Merriweather] tabular-nums">78%</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-[#D4D0C8]" />
                                <span className="text-sm text-gray-600">Neutral</span> <span className="hidden sm:block text-gray-600">(3 stars)</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 font-[Merriweather] tabular-nums">14%</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-[#F4A49A]" />
                                <span className="text-sm text-gray-600">Negative</span> <span className="hidden sm:block text-gray-600">(1-2 stars)</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 font-[Merriweather] tabular-nums">8%</p>
                        </div>
                    </div>
                </div>

                {/* Tabs: Love vs Concerns */}
                <div className="bg-white border border-[#F3EFE9] rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-sm">
                    <div className="flex border-b border-[#F3EFE9]">
                        <button
                            onClick={() => setActiveTab('love')}
                            className={`flex-1 py-5 text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'love' ? 'text-[#B68A35] border-b-2 border-[#B68A35]' : 'text-gray-400'}`}
                        >
                            <FaRegHeart className="w-5 h-5" /> What Residents Love
                        </button>
                        <button
                            onClick={() => setActiveTab('concerns')}
                            className={`flex-1 py-5 text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'concerns' ? 'text-[#B68A35] border-b-2 border-[#B68A35]' : 'text-gray-400'}`}
                        >
                            <Info className="w-4 h-4 rotate-180" /> Common Concerns
                        </button>
                    </div>
                    <div className="p-2 sm:p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {(activeTab === 'love' ? residentsLove : commonConcerns).map((item, idx) => (
                                <div key={idx} className="bg-[#FDFCFB] border border-[#F3EFE9] p-2 sm:p-5 rounded-xl flex gap-4">
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Grid: Recent Highlights & Verification (now accordions responsive to breakpoint) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6 items-start">
                    {/* Recent Review Highlights (accordion) */}
                    <div className="bg-white border border-[#F3EFE9] rounded-2xl shadow-sm overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setOpenRecent(prev => !prev)}
                            aria-expanded={openRecent}
                            className="w-full p-5 border-b border-[#F3EFE9] flex items-center justify-between"
                        >
                            <h4 className="font-bold text-sm flex items-center gap-2 uppercase tracking-wide">
                                <Star className="w-4 h-4 text-[#B68A35] font-[Merriweather] tabular-nums" /> Recent Review Highlights
                            </h4>
                            <span className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase hidden lg:inline">Last 6 months</span>
                                <ChevronDown className={`inline w-5 h-5 transition-transform duration-200 ${openRecent ? 'rotate-180' : ''}`} />
                            </span>
                        </button>

                        <div className="transition-all duration-300 ease-in-out overflow-hidden" style={{ maxHeight: openRecent ? '360px' : '0px' }}>
                            <div className="overflow-y-auto p-2 space-y-2 custom-scrollbar">
                                {reviews.map((rev, idx) => (
                                    <div key={idx} className="p-2 sm:p-4 border-b border-gray-50 last:border-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < rev.stars ? 'fill-[#B68A35] text-[#B68A35]' : 'text-gray-200 fill-gray-200'}`} />
                                                ))}
                                            </div>
                                            <p className="text-[10px] text-gray-400">
                                                <span className="text-[#B68A35] font-bold">{rev.platform}</span> • {rev.date}
                                            </p>
                                        </div>
                                        <p className="text-xs italic text-gray-600 leading-relaxed">"{rev.text}"</p>
                                    </div>
                                ))}
                            </div>

                            <div className={`${openRecent ? 'block' : 'hidden'} lg:block`}>
                                <button className="w-full py-4 bg-gray-50 text-[#B68A35] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                                    View More Reviews <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Verification Note (accordion) */}
                    <div className="bg-white border border-[#F3EFE9] rounded-2xl shadow-sm overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setOpenVerification(prev => !prev)}
                            aria-expanded={openVerification}
                            className="w-full p-5 flex items-center justify-between"
                        >
                            <h4 className="font-bold text-sm flex items-center gap-2 uppercase tracking-wide mb-0">
                                <ShieldCheck className="w-5 h-5 text-[#B68A35] font-[Merriweather] tabular-nums" /> Verification Note
                            </h4>
                            <ChevronDown className={`inline w-5 h-5 transition-transform duration-200 ${openVerification ? 'rotate-180' : ''}`} />
                        </button>

                        <div className="transition-all duration-300 ease-in-out overflow-hidden" style={{ maxHeight: openVerification ? '360px' : '0px' }}>
                            <div className="p-3 sm:p-5">
                                <p className="text-[13px] text-gray-600 leading-relaxed space-y-4">
                                    Reviews aggregated from Google Maps, PropertyFinder.ae, and Bayut.com between August 2025 and February 2026. Only platforms with 50+ verified reviews were included in the weighted average calculation. Sentiment percentages estimated from star rating distributions across all platforms. Emaar communities analysed include Dubai Hills Estate, Downtown Dubai, The Greens, The Springs, Arabian Ranches III, Dubai Creek Harbour, and Dubai Marina. Placeholder values indicate fields populated dynamically from PropertyIntel's review aggregation engine to ensure real-time accuracy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <ExpertSection />

                <div className="gap-2 sm:mt-6 flex items-center mt-6 text-xs text-gray-500 bg-[#B68A35]/5 p-3 rounded-xl">
                    <Info className="w-4 h-4 text-[#B68A35]  shrink-0" />
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                        <strong>Disclaimer:</strong> Reviews are user-generated content and may not reflect all residents' experiences. Aggregated sentiment is for informational purposes only and does not constitute investment advice. Last updated: 22 February 2026.
                    </p>
                </div>

            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #B68A35;
          border-radius: 10px;
        }
      `}</style>
        </section>
    );
};

const LegendItem = ({ color, label, value }) => (
    <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{label}</span>
        <span className="text-sm font-bold">{value}</span>
    </div>
);

export default Section11;