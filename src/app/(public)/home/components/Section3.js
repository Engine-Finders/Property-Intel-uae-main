"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Anchor,
  Building,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Compass,
  Flag,
  Globe,
  Map,
  MapPin,
  Funnel,
  House,
  Layers,
  Palmtree,
  Search,
  ShieldCheck,
  Sprout,
  Star,
  Trees,
} from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';
import { MdSpa } from 'react-icons/md';
import { FaHome, FaHorse, FaShip, FaUmbrellaBeach } from 'react-icons/fa';
import { LuInfo } from 'react-icons/lu';
import ExpertSection from './ExpertSection';
import { useThemeStyles, GOLD_BORDER, PANEL_DARK_BG } from '@/app/components/context/themeStyles';

const projectsByLocation = {
  'Dubai Creek Harbour': [
    { name: 'Address Harbour Point', type: 'Apartment', handover: 'Completed 2022' },
    { name: 'Aeon', type: 'Apartment', handover: 'N/A' },
    { name: 'Altan', type: 'Apartment, Townhouse', handover: 'Q3 2029' },
    { name: 'Altus', type: 'Apartment', handover: 'N/A' },
    { name: 'Cedar', type: 'Apartment', handover: 'Q3 2026' },
    { name: 'Creek Beach Grove', type: 'Apartment', handover: 'Completed' },
    { name: 'Creek Beach Rosewater', type: 'Apartment', handover: 'Completed' },
    { name: 'Creek Beach Surf', type: 'Apartment', handover: 'Completed' },
    { name: 'Creek Crescent', type: 'Apartment', handover: 'N/A' },
    { name: 'Creek Edge', type: 'Apartment', handover: 'Completed Mar 2024' },
    { name: 'Creek Gate', type: 'Apartment', handover: 'Completed Apr 2022' },
    { name: 'Creek Haven', type: 'Apartment', handover: 'N/A' },
    { name: 'Creek Palace', type: 'Apartment', handover: 'N/A' },
    { name: 'Creek Bay', type: 'Apartment', handover: 'N/A' },
    { name: 'Dubai Creek Residence - South Towers', type: 'Apartment', handover: 'Completed Oct 2021' },
    { name: 'Dubai Square', type: 'Retail/Commercial', handover: 'Est. 2028 (3 years)' },
    { name: 'Grove', type: 'Apartment', handover: 'N/A' },
    { name: 'Grove Creek Beach', type: 'Apartment', handover: 'Completed Jun 2025' },
    { name: 'Harbour Gate', type: 'Apartment', handover: 'Completed Dec 2022' },
    { name: 'Island Park', type: 'Apartment', handover: 'Completed' },
    { name: 'Lotus at Creek Beach', type: 'Apartment', handover: 'Completed Sep 2025' },
    { name: 'Lyvia by Palace', type: 'Apartment', handover: 'N/A' },
    { name: 'Mangrove Building 1', type: 'Apartment', handover: 'Q3 2026' },
    { name: 'Montiva by Vida', type: 'Apartment', handover: 'N/A' },
    { name: 'Orchid at Dubai Creek Harbour', type: 'Apartment', handover: 'Completed Sep 2025' },
    { name: 'Oria', type: 'Apartment', handover: 'N/A' },
    { name: 'Palace Residences', type: 'Apartment', handover: 'Completed' },
    { name: 'Savanna', type: 'Apartment', handover: 'N/A' },
    { name: 'Silva', type: 'Apartment, Townhouse', handover: 'Q3 2029' },
    { name: 'Summer at Creek Beach', type: 'Apartment', handover: 'Completed Sep 2022' },
    { name: 'Sunset at Creek Beach', type: 'Apartment', handover: 'Completed Dec 2022' },
    { name: 'Vida Residences Creek Beach', type: 'Apartment', handover: 'Completed Dec 2022' },
  ],
  'Dubai Hills Estate': [
    { name: 'Club Place', type: 'Apartment', handover: 'N/A' },
    { name: 'Collective', type: 'Apartment', handover: 'Completed Mar 2022' },
    { name: 'Emerald Hills', type: 'Villa', handover: 'N/A' },
    { name: 'Golf Place', type: 'Apartment/Villa', handover: 'Completed Dec 2023' },
    { name: 'Golf Place 1', type: 'Villa', handover: 'Completed Dec 2023' },
    { name: 'Golf Suites', type: 'Apartment', handover: 'Completed Dec 2022' },
    { name: 'Golfville', type: 'Apartment', handover: 'Completed Feb 2022' },
    { name: 'Green Square', type: 'Apartment', handover: 'Completed Dec 2022' },
    { name: 'Greencrest', type: 'Apartment', handover: 'N/A' },
    { name: 'Hillsedge', type: 'Villa/Townhouse', handover: 'N/A' },
    { name: 'Lime Gardens', type: 'Apartment, Townhouse', handover: 'Q1 2026' },
    { name: 'Palm Hills', type: 'Villa', handover: 'Completed' },
    { name: 'Palace Residences Hillside B', type: 'Apartment', handover: 'Est. 2028' },
    { name: 'Park Field', type: 'Apartment', handover: 'Q4 2025' },
    { name: 'Park Heights', type: 'Apartment', handover: 'N/A' },
    { name: 'Park Lane', type: 'Apartment', handover: 'N/A' },
    { name: 'Parkwood', type: 'Apartment', handover: 'N/A' },
    { name: 'Parkway Vistas', type: 'Apartment', handover: 'N/A' },
    { name: 'Rosehill', type: 'Apartment', handover: 'N/A' },
    { name: 'Vida Residences Hillside', type: 'Apartment', handover: 'Q2 2029' },
  ],
  'Emaar South': [
    { name: 'Golf Acres', type: 'Apartment, Townhouse', handover: 'Q4 2028' },
    { name: 'Golf Dale', type: 'Apartment', handover: 'Q4 2028' },
    { name: 'Golf Edge', type: 'Apartment, Townhouse', handover: 'Q1 2029' },
    { name: 'Golf Hills', type: 'Apartment, Townhouse', handover: 'N/A' },
    { name: 'Golf Hills 2', type: 'Apartment, Townhouse', handover: 'N/A' },
    { name: 'Golf Meadow', type: 'Apartment', handover: 'N/A' },
    { name: 'Golf Place', type: 'Apartment', handover: 'Q4 2028' },
    { name: 'Golf Verge', type: 'Apartment', handover: 'Q2 2029' },
    { name: 'Greenridge', type: 'Townhouse', handover: 'Q4 2028' },
    { name: 'Greenspoint', type: 'Townhouse', handover: 'N/A' },
    { name: 'Grove Ridge', type: 'Apartment', handover: 'N/A' },
    { name: 'Vista Ridge', type: 'Apartment', handover: 'N/A' },
  ],
  'The Oasis by Emaar': [
    { name: 'Address Villas Tierra', type: 'Villa', handover: 'Q2 2029' },
    { name: 'Lavita', type: 'Villa', handover: 'Q1 2029' },
    { name: 'Mareva at The Oasis', type: 'Villa', handover: 'N/A' },
    { name: 'Mareva 2', type: 'Ultra-Luxury Villa', handover: 'N/A' },
    { name: 'Mirage', type: 'Villa', handover: 'Q2 2028' },
    { name: 'Ostra Palace Villas', type: 'Villa', handover: 'Q3 2029' },
    { name: 'Valoria', type: 'Luxury Villa', handover: 'Q4 2029' },
  ],
  'Grand Polo Club & Resort': [
    { name: 'Chevalia Estate', type: 'Villa', handover: 'Q1 2029' },
    { name: 'Chevalia Fields', type: 'Villa', handover: 'Q2 2029' },
    { name: 'Equiterra', type: 'Villa', handover: 'N/A' },
    { name: 'Equiterra 2', type: 'Villa', handover: 'N/A' },
    { name: 'Equestra', type: 'Villa', handover: 'N/A' },
    { name: 'Selvara', type: 'Villa', handover: 'Q2 2029' },
    { name: 'Selvara 3', type: 'Villa', handover: 'N/A' },
    { name: 'Selvara 4', type: 'Villa', handover: 'N/A' },
  ],
  'The Heights Country Club & Wellness': [
    { name: 'Salva', type: 'Townhouse/Villa', handover: 'Medium-term' },
    { name: 'Serro', type: 'Townhouse/Villa', handover: 'Medium-term' },
    { name: 'Serro 2', type: 'Townhouse/Villa', handover: 'Medium-term' },
    { name: 'The Heights Country Club', type: 'Townhouse, Villa', handover: '2028' },
  ],
  'The Valley': [
    { name: 'Elora', type: 'Villa/Townhouse', handover: 'N/A' },
    { name: 'Elva', type: 'Townhouse', handover: 'N/A' },
    { name: 'Farm Gardens', type: 'Villa/Townhouse', handover: 'N/A' },
    { name: 'Farm Grove', type: 'Villa', handover: 'N/A' },
    { name: 'Nara', type: 'Villa/Townhouse', handover: 'Completed Dec 2024' },
    { name: 'Orania', type: 'Townhouse', handover: 'Q4 2025' },
    { name: 'Ovelle', type: 'Villa', handover: 'N/A' },
    { name: 'Rivera', type: 'Villa', handover: 'N/A' },
    { name: 'Talia', type: 'Villa/Townhouse', handover: 'Completed Jan 2025' },
    { name: 'Venera', type: 'Villa/Townhouse', handover: 'N/A' },
    { name: 'Vindera', type: 'Townhouse', handover: 'N/A' },
  ],
  'Arabian Ranches': [
    { name: 'Arabian Ranches I', type: 'Villa', handover: 'Sold Out (2005)' },
    { name: 'Arabian Ranches II', type: 'Villa', handover: 'Completed Dec 2021' },
    { name: 'Bliss', type: 'Townhouse', handover: 'Completed' },
    { name: 'Bliss 2', type: 'Villa', handover: 'Q4 2025' },
    { name: 'Caya', type: 'Villa', handover: 'Completed' },
    { name: 'Caya Villas 2', type: 'Villa', handover: 'Completed Oct 2024' },
    { name: 'Elie Saab', type: 'Villa', handover: 'Completed Oct 2023' },
    { name: 'Elie Saab 1', type: 'Villa', handover: 'Q4 2025' },
    { name: 'Elie Saab II', type: 'Villa', handover: 'Dec 2025' },
    { name: 'June', type: 'Villa', handover: 'Completed Mar 2024' },
    { name: 'June Phase 2', type: 'Villa', handover: 'Completed' },
    { name: 'Ruba', type: 'Townhouse', handover: 'Completed Dec 2023' },
    { name: 'Spring', type: 'Townhouse', handover: 'Completed Dec 2022' },
    { name: 'Sun', type: 'Townhouse', handover: 'Completed Apr 2022' },
  ],
  'Rashid Yachts & Marina': [
    { name: 'Aurea', type: 'Apartment', handover: 'N/A' },
    { name: 'Baystar by Vida', type: 'Apartment', handover: 'N/A' },
    { name: 'Ocean Point', type: 'Apartment, Townhouse', handover: 'Q2 2028' },
    { name: 'Sera 1', type: 'Apartment', handover: 'N/A' },
    { name: 'Sera 2', type: 'Apartment', handover: 'N/A' },
  ],
  'Emaar Beachfront & Dubai Harbour': [
    { name: 'Address Residences The Bay', type: 'Apartment', handover: 'Q4 2026' },
    { name: 'Bayview by Address Resort', type: 'Apartment', handover: 'Q3 2028' },
    { name: 'Beach Isle', type: 'Apartment', handover: 'Completed 2020' },
    { name: 'Beach Mansion', type: 'Apartment', handover: 'Completed Jan 2025' },
    { name: 'Beach Mansion Tower 1', type: 'Apartment, Penthouse', handover: 'Q4 2025' },
    { name: 'Beach Vista', type: 'Apartment', handover: 'Completed Jan 2022' },
    { name: 'Palace Beach Residence', type: 'Apartment', handover: 'Completed Dec 2025' },
    { name: 'Sunrise Bay', type: 'Apartment', handover: 'Completed Dec 2021' },
  ],
  'Mina Rashid': [
    { name: 'Clearpoint', type: 'Apartment', handover: 'Q3 2027' },
    { name: 'Marina Views', type: 'Apartment', handover: 'N/A' },
    { name: 'Seascape', type: 'Apartment, Townhouse', handover: 'Q4 2026' },
    { name: 'Seagate', type: 'Apartment', handover: 'Completed Nov 2025' },
    { name: 'Sirdhana', type: 'Apartment', handover: 'Completed Aug 2022' },
  ],
  'Downtown Dubai & Business Bay': [
    { name: '17 Icon Bay', type: 'Apartment', handover: 'Completed Dec 2022' },
    { name: 'Act One', type: 'Apartment', handover: 'Completed Mar 2023' },
    { name: 'Act Two', type: 'Apartment', handover: 'Completed Sep 2023' },
    { name: 'Address Residences Dubai Opera', type: 'Apartment', handover: 'Completed Jun 2023' },
    { name: 'Avarra by Palace', type: 'Apartment', handover: 'N/A' },
    { name: 'Burj Crown', type: 'Apartment', handover: 'Completed Oct 2023' },
    { name: 'Burj Khalifa', type: 'Apartment', handover: 'Completed 2010' },
    { name: 'Burj Royale', type: 'Apartment', handover: 'Completed Dec 2022' },
    { name: 'Downtown Views', type: 'Apartment', handover: 'Completed 2021' },
    { name: 'Downtown Views II', type: 'Apartment', handover: 'Completed Jun 2023' },
    { name: 'Forte', type: 'Apartment', handover: 'Completed Dec 2023' },
    { name: 'Forte Phase 2', type: 'Apartment', handover: 'Completed' },
    { name: 'Grande', type: 'Apartment', handover: 'Completed Jun 2022' },
    { name: 'Grande at Opera', type: 'Apartment', handover: 'Completed Dec 2022' },
    { name: 'IL Primo', type: 'Apartment', handover: 'Completed Sep 2023' },
    { name: 'The Address Dubai Mall', type: 'Apartment', handover: 'Completed Jan 2023' },
    { name: 'The Residence Burj Khalifa', type: 'Apartment', handover: 'Completed Dec 2024' },
    { name: 'Vida Residences Downtown', type: 'Apartment', handover: 'Completed 2019' },
    { name: 'Vida Residences Dubai Mall', type: 'Apartment', handover: 'Completed Apr 2022' },
  ],
  'Expo City & Dubailand': [
    { name: 'Expo Golf Villas', type: 'Villa', handover: 'Completed Jul 2021' },
    { name: 'Expo Golf Villas 6', type: 'Villa', handover: 'Completed Nov 2025' },
    { name: 'Expo Golf Villas IV - Greenview', type: 'Villa', handover: 'Completed Jun 2022' },
    { name: 'Expo Golf Villas Phase III', type: 'Villa', handover: 'Completed Apr 2024' },
    { name: 'Greenviews 3', type: 'Villa', handover: 'Completed Nov 2025' },
    { name: 'Terra Gardens', type: 'Apartment', handover: 'N/A' },
    { name: 'Terra Heights', type: 'Apartment', handover: 'N/A' },
  ],
  'Al Marjan Island, Ras Al Khaimah': [
    { name: 'Address Residences', type: 'Apartment', handover: 'Q1 2028' },
  ],
  'Jumeirah & Central Dubai': [
    { name: 'Address Residences Jumeirah Resort + Spa', type: 'Hotel/Residences', handover: 'Under construction' },
    { name: 'Address Residences Zabeel', type: 'Apartment', handover: 'Q3 2029' },
    { name: 'Grand Bleu Tower', type: 'Apartment', handover: 'Completed Jun 2023' },
    { name: 'Marina Sand', type: 'N/A', handover: 'Dec 2025' },
    { name: 'Marina Vista', type: 'Apartment', handover: 'Completed Jan 2023' },
    { name: 'South Beach', type: 'Apartment', handover: 'Completed May 2023' },
    { name: 'South Beach Holiday Home', type: 'N/A', handover: 'Completed Sep 2023' },
    { name: 'St. Regis Residences', type: 'Apartment', handover: 'Q4 2025' },
    { name: 'Vida Residences Dubai Marina', type: 'Apartment', handover: 'Completed Mar 2022' },
    { name: 'Vida Za\'abeel', type: 'Apartment', handover: 'Completed Mar 2022' },
  ],
};

const locations = [
  { name: 'Dubai Creek Harbour', subtitle: 'Waterfront Mega-Community', count: 32, icon: Anchor },
  { name: 'Dubai Hills Estate', subtitle: 'The Green Heart of Dubai', count: 20, icon: Trees },
  { name: 'The Oasis by Emaar', subtitle: 'Luxury Waterfront Villas', count: 7, icon: GiPalmTree },
  { name: 'Emaar South', subtitle: 'Dubai South', count: 12, icon: Flag },
  { name: 'The Heights Country Club & Wellness', subtitle: 'Wellness-focused Community', count: 4, icon: MdSpa },
  { name: 'The Valley', subtitle: 'Family-Oriented Community', count: 11, icon: Sprout },
  { name: 'Arabian Ranches', subtitle: 'I, II, III - Villa Communities', count: 14, icon: FaHome },
  { name: 'Grand Polo Club & Resort', subtitle: 'Equestrian Living', count: 8, icon: FaHorse },
  { name: 'Rashid Yachts & Marina', subtitle: 'Waterfront Living', count: 5, icon: FaShip },
  { name: 'Emaar Beachfront & Dubai Harbour', subtitle: 'Beachfront Communities', count: 8, icon: FaUmbrellaBeach },
  { name: 'Mina Rashid', subtitle: 'Maritime Heritage Community', count: 5, icon: Globe },
  { name: 'Downtown Dubai & Business Bay', subtitle: 'Central Dubai', count: 19, icon: Building },
  { name: 'Expo City & Dubailand', subtitle: 'Post-Expo Developments', count: 7, icon: Map },
  { name: 'Al Marjan Island, Ras Al Khaimah', subtitle: 'International - RAK', count: 1, icon: Compass },
  { name: 'Jumeirah & Central Dubai', subtitle: 'Luxury Residential', count: 10, icon: Star },
];

const legacyCommunities = [
  { name: 'The Springs', desc: 'Villas / Townhouses, multiple phases: Springs 1-18' },
  { name: 'The Meadows', desc: 'Villas, multiple phases: Meadows 1-14' },
  { name: 'The Lakes', desc: 'Villas, multiple phases: Lakes 1-7' },
  { name: 'The Greens', desc: 'Apartments; Golf Towers, Al Thanyah, etc.' },
  { name: 'Emirates Hills', desc: 'Luxury villas, multiple phases' },
];

const marinaLegacy = [
  { name: 'Sanibel Tower', desc: 'Residential Tower' },
  { name: 'Marina Quay North', desc: 'Residential Tower' },
  { name: 'Fairways Clubside Residence', desc: 'Residential Tower' },
  { name: 'Various other residential towers', desc: 'Across Dubai Marina' },
];

function Section3() {
  const { t, isDark, dark, section } = useThemeStyles();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('byDeveloper');

  // Create a flat list of all projects with location info
  const allProjectsList = [];
  Object.entries(projectsByLocation).forEach(([locationName, projects]) => {
    const locationData = locations.find(loc => loc.name === locationName);
    projects.forEach(project => {
      allProjectsList.push({
        ...project,
        locationName,
        locationSubtitle: locationData?.subtitle || '',
      });
    });
  });

  return (
    <section className={`w-full font-sans antialiased transition-colors duration-300 ${isDark ? "" : "bg-[#FCFBFA]"}`} style={section}>
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
          <div
            className={`absolute inset-0 transition-colors duration-300 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`}
            style={isDark ? dark.heroOverlayLeft : undefined}
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-2 w-full">
          <h2
            className={`text-3xl lg:text-5xl font-serif mb-1 ${isDark ? "" : "text-[#1A1A1A]"}`}
            style={isDark ? dark.text : undefined}
          >
            Complete Emaar Project:
            <span className="lg:hidden">—</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
            Database (2026)
          </h3>
          <p
            className={`max-w-xl text-sm lg:text-base leading-relaxed font-medium ${isDark ? "" : "text-gray-600"}`}
            style={isDark ? dark.textSecondary : undefined}
          >
            Browse all current and past projects by Emaar Properties, from iconic towers to master communities. Data verified against DLD and RERA records.
          </p>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-2 sm:px-6 -mt-12 relative z-10 pb-16">
        {/* <div className="bg-[#FAF9F6] mt-5 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-2">
            <p className="text-sm sm:text-base font-semibold text-slate-800">Sources Metadata:</p>
            <p className="text-xs sm:text-sm text-slate-600"><span className="font-medium">Primary Sources:</span> DLD Dubai REST App, RERA Project Tracker, Oqood Portal</p>
            <p className="text-xs sm:text-sm text-slate-600"><span className="font-medium">Secondary Sources:</span> Emaar Annual Report 2025, DLD Open Data 2025</p>
            <p className="text-xs sm:text-sm text-slate-600"><span className="font-medium">Overall Last Verified:</span> 21 February 2026</p>
          </div>
        </div> */}

        <div
          className={`rounded-2xl border shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-3 mt-5 transition-colors duration-300 ${isDark ? "" : "bg-white border-[#F2EEE8]"}`}
          style={isDark ? dark.card : undefined}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div
              className={`flex gap-3 items-center h-12 rounded-lg px-4 border text-sm lg:flex-1 ${isDark ? "" : "bg-[#FAFAF9] border-[#ECE7DE] text-slate-500"}`}
              style={isDark ? dark.inputSurface : undefined}
            >
              <Search className={`w-4 h-4 ${isDark ? "" : "text-slate-400"}`} style={isDark ? { color: t.textMuted } : undefined} />
              <span>Search by project or location...</span>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full lg:flex lg:gap-3 lg:items-center lg:w-auto">
              <FilterPill icon={MapPin} label="Location" />
              <FilterPill icon={House} label="Property Type" />
              <FilterPill icon={Layers} label="Status" />

              <button
                type="button"
                className={`w-12 h-12 rounded-lg border flex justify-center items-center text-[#C59A52] hover:bg-[#B68A35]/5 ${isDark ? "" : "border-[#D9B577]"}`}
                style={isDark ? { borderColor: GOLD_BORDER, ...dark.iconCircle } : undefined}
              >
                <Funnel className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl mt-5 border shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden transition-colors duration-300 ${isDark ? "" : "border-[#F2EEE8] bg-white"}`}
          style={isDark ? dark.card : undefined}
        >
          <div
            className={`flex border-b overflow-hidden ${isDark ? "" : "border-[#F2EEE8] bg-[#FAF9F6]"}`}
            style={isDark ? dark.tabBar : undefined}
          >
            {[
              { id: 'byDeveloper', label: 'Projects by Developer' },
              { id: 'allProjects', label: 'All Projects' },
            ].map((tab, index) => {
              const isActive = activeTab === tab.id;
              const isFirst = index === 0;
              const isLast = index === 1;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 px-4 py-4 font-semibold text-center transition-colors ${
                    isDark
                      ? `${isFirst ? "rounded-tl-2xl" : ""} ${isLast ? "rounded-tr-2xl" : ""} ${isActive ? "z-10" : ""}`
                      : isActive
                        ? "text-[#B68A35] border-b-2 border-[#B68A35] bg-white"
                        : "text-slate-600 hover:text-slate-900"
                  }`}
                  style={
                    isDark
                      ? isActive
                        ? { ...dark.tabActive, borderColor: GOLD_BORDER, borderBottomWidth: 2, borderBottomStyle: "solid" }
                        : dark.tabInactive
                      : undefined
                  }
                >
                  {tab.label}
                  {isActive && isDark && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B68A35]" aria-hidden />
                  )}
                </button>
              );
            })}
          </div>

          {activeTab === 'byDeveloper' ? (
            <div
              className={`max-h-96 overflow-y-auto custom-scroll ${isDark ? "" : "bg-white"}`}
              style={isDark ? { background: PANEL_DARK_BG } : undefined}
            >
              {locations.map((item, idx) => {
                const Icon = item.icon;
                const isOpen = activeIndex === idx;
                const projects = projectsByLocation[item.name] || [];

                return (
                  <div
                    key={item.name}
                    className={`border-b last:border-b-0 ${isDark ? "" : "bg-[#FAF9F6] border-[#F2EEE8]"}`}
                    style={isDark ? { ...dark.surfaceAlt, borderColor: dark.dividerColor } : undefined}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(isOpen ? null : idx)}
                      className={`w-full p-2 flex gap-4 items-center text-left transition-colors ${
                        isDark ? "" : isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
                      }`}
                      style={isDark ? (isOpen ? dark.surfaceAlt : dark.panel) : undefined}
                    >
                      <div
                        className={`w-12 h-12 sm:w-12 sm:h-12 rounded-xl flex justify-center items-center border shrink-0 ${isDark ? "" : "bg-white border-[#EFE8DC]"}`}
                        style={isDark ? dark.iconCircle : undefined}
                      >
                        <Icon className="text-[#B68A35] w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="flex justify-between items-center flex-1 min-w-0">
                        <div className="min-w-0">
                          <h3
                            className={`font-semibold text-base sm:text-md truncate ${isDark ? "" : "text-slate-900"}`}
                            style={isDark ? dark.text : undefined}
                          >
                            {item.name}
                          </h3>
                          <p
                            className={`text-sm truncate ${isDark ? "" : "text-slate-500"}`}
                            style={isDark ? dark.textMuted : undefined}
                          >
                            {item.subtitle}
                          </p>
                        </div>

                        <div className="flex gap-3 items-center pl-3">
                          <div
                            className={`min-w-8 h-6 px-2 sm:min-w-10 sm:h-7 rounded-full flex justify-center items-center text-xs sm:text-sm ${isDark ? "" : "bg-[#B68A35] text-white"}`}
                            style={isDark ? dark.tabCountActive : undefined}
                          >
                            {projects.length}
                          </div>
                          {isOpen ? (
                            <ChevronUp className="text-[#B68A35] w-5 h-5 sm:w-6 sm:h-6" />
                          ) : (
                            <ChevronDown className="text-[#B68A35] w-5 h-5 sm:w-6 sm:h-6" />
                          )}
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        className={`px-4 pb-4 ${isDark ? "" : "bg-[#FAF9F6]"}`}
                        style={isDark ? dark.surfaceAlt : undefined}
                      >
                        <div
                          className={`border overflow-hidden shadow-sm rounded-xl ${isDark ? "" : "bg-white border-[#EFE8DC]"}`}
                          style={isDark ? dark.panelInner : undefined}
                        >
                          <div className="max-h-96 overflow-y-auto custom-scroll">
                            {projects.map((row, rowIndex) => (
                              <div
                                key={`${row.name}-${rowIndex}`}
                                className={`flex items-center justify-between p-4 border-b last:border-b-0 gap-3 ${isDark ? "" : "border-gray-50"}`}
                                style={isDark ? { borderColor: dark.dividerColor } : undefined}
                              >
                                <div className="flex items-center gap-4 min-w-0">
                                  <div className={`w-2 h-2 rounded-full ${row.handover === 'N/A' ? 'bg-[#B68A35]/40' : 'bg-[#B68A35]'}`} />
                                  <div className="min-w-0">
                                    <h4
                                      className={`font-semibold text-sm sm:text-[15px] truncate ${isDark ? "" : "text-slate-800"}`}
                                      style={isDark ? dark.text : undefined}
                                    >
                                      {row.name}
                                    </h4>
                                    <p
                                      className={`text-xs ${isDark ? "" : "text-slate-400"}`}
                                      style={isDark ? dark.textMuted : undefined}
                                    >
                                      {row.type}
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className={`font-medium text-sm shrink-0 ${row.handover === 'N/A' ? (isDark ? "" : "text-slate-400") : "text-[#B68A35]"}`}
                                  style={isDark && row.handover === 'N/A' ? dark.textMuted : undefined}
                                >
                                  {row.handover}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`relative border border-[#B68A35] w-full h-12 mt-4 flex items-center justify-center rounded-xl hover:bg-[#B68A35]/5 transition-colors ${isDark ? "" : ""}`}
                          style={isDark ? { borderColor: GOLD_BORDER, background: "rgba(182,138,53,0.08)" } : undefined}
                        >
                          <p className="text-[#B68A35] text-sm sm:text-base font-semibold text-center px-10">
                            View All {projects.length} Projects in {item.name}
                          </p>
                          <ChevronRight className="text-[#B68A35] absolute right-4 w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`max-h-96 overflow-y-auto custom-scroll overflow-x-auto ${isDark ? "" : "bg-white"}`}
              style={isDark ? { background: PANEL_DARK_BG } : undefined}
            >
              <table className="w-full min-w-full">
                <thead
                  className={`border-b sticky top-0 ${isDark ? "" : "bg-[#FAF9F6] border-[#F2EEE8]"}`}
                  style={isDark ? dark.tabBar : undefined}
                >
                  <tr>
                    {['Project Name', 'Property Type', 'Status', 'Location Name', 'Location Subtitle'].map((label, i) => (
                      <th
                        key={label}
                        className={`text-left px-4 py-3 font-semibold text-sm ${isDark ? "" : "text-slate-900"} ${i === 1 ? "hidden sm:table-cell" : ""} ${i >= 3 ? "hidden lg:table-cell" : ""}`}
                        style={isDark ? dark.text : undefined}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allProjectsList.map((project, idx) => (
                    <tr
                      key={`${project.locationName}-${project.name}-${idx}`}
                      className={`border-b transition-colors last:border-b-0 ${isDark ? "hover:bg-[#2a2d33]" : "border-gray-100 hover:bg-[#FCFAF5]"}`}
                      style={isDark ? { borderColor: dark.dividerColor } : undefined}
                    >
                      <td
                        className={`px-4 py-3 text-sm font-medium ${isDark ? "" : "text-slate-800"}`}
                        style={isDark ? dark.text : undefined}
                      >
                        {project.name}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm hidden sm:table-cell ${isDark ? "" : "text-slate-600"}`}
                        style={isDark ? dark.textSecondary : undefined}
                      >
                        {project.type}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm font-medium ${project.handover === 'N/A' ? (isDark ? "" : "text-slate-400") : "text-[#B68A35]"}`}
                        style={isDark && project.handover === 'N/A' ? dark.textMuted : undefined}
                      >
                        {project.handover}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm font-medium hidden lg:table-cell ${isDark ? "" : "text-slate-800"}`}
                        style={isDark ? dark.text : undefined}
                      >
                        {project.locationName}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm hidden lg:table-cell ${isDark ? "" : "text-slate-600"}`}
                        style={isDark ? dark.textSecondary : undefined}
                      >
                        {project.locationSubtitle}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div
          className={`mt-5 rounded-2xl flex flex-col lg:flex-row items-start border shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-4 sm:p-5 gap-4 transition-colors duration-300 ${isDark ? "" : "border-[#F2EEE8] bg-white"}`}
          style={isDark ? dark.card : undefined}
        >
          <LegacyCard
            index={15}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            icon={Palmtree}
            title="Emirates Living Legacy Communities"
            subtitle="Partial list of Emaar's iconic villa communities"
            items={[
              { name: 'The Springs', desc: 'Villas / Townhouses, multiple phases: Springs 1-18' },
              { name: 'The Meadows', desc: 'Villas, multiple phases: Meadows 1-14' },
              { name: 'The Lakes', desc: 'Villas, multiple phases: Lakes 1-7' },
              { name: 'The Greens', desc: 'Apartments; Golf Towers, Al Thanyah, etc.' },
              { name: 'Emirates Hills', desc: 'Luxury villas, multiple phases' },
            ]}
          />

          <LegacyCard
            index={16}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            icon={Building}
            title="Dubai Marina Legacy Projects"
            subtitle="Partial list of Emaar's iconic marina towers"
            items={[
              { name: 'Sanibel Tower', desc: 'Residential Tower' },
              { name: 'Marina Quay North', desc: 'Residential Tower' },
              { name: 'Fairways Clubside Residence', desc: 'Residential Tower' },
              { name: 'Various other residential towers', desc: 'Across Dubai Marina' },
            ]}
          />
        </div>

        <ExpertSection />

        <div
          className={`mt-6 border rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start transition-colors duration-300 ${isDark ? "" : "bg-[#FBF9F6] border-[#F3EFE9]"}`}
          style={isDark ? dark.verifyBanner : undefined}
        >
          <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
          <p
            className={`text-xs lg:text-sm leading-relaxed ${isDark ? "" : "text-gray-600"}`}
            style={isDark ? dark.textSecondary : undefined}
          >
            Project status, prices, and performance data are verified against DLD and RERA records as of 21 February 2026.. Capital appreciation calculated from launch price to current market value.
          </p>
        </div>
      </div>
    </section>
  );
}

function FilterPill({ icon: Icon, label }) {
  const { isDark, dark } = useThemeStyles();
  return (
    <button
      type="button"
      className={`rounded-lg h-12 border flex items-center justify-between px-4 lg:w-42.5 transition-colors ${isDark ? "hover:opacity-90" : "bg-white border-[#ECE7DE] hover:bg-[#FBFAF8]"}`}
      style={isDark ? dark.statCard : undefined}
    >
      <div className="flex gap-3 items-center">
        <Icon className="text-[#C59A52] w-4 h-4" />
        <span
          className={`font-medium text-sm ${isDark ? "" : "text-slate-700"}`}
          style={isDark ? dark.text : undefined}
        >
          {label}
        </span>
      </div>
      <ChevronDown
        className={`w-4 h-4 ${isDark ? "" : "text-slate-500"}`}
        style={isDark ? dark.textMuted : undefined}
      />
    </button>
  );
}

function LegacyCard({ index, activeIndex, setActiveIndex, icon: Icon, title, subtitle, items }) {
  const { t, isDark, dark } = useThemeStyles();
  const isOpen = activeIndex === index;

  return (
    <div
      className={`rounded-xl overflow-hidden border shadow-sm w-full lg:w-1/2 transition-colors duration-300 ${isDark ? "" : "bg-[#FAF9F6] border-[#F2EEE8]"}`}
      style={isDark ? { ...dark.surfaceAlt, borderColor: t.cardBorder } : undefined}
    >
      <button
        type="button"
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className={`w-full flex p-4 gap-3 items-center text-left transition-colors ${
          isDark ? "" : isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
        }`}
        style={isDark ? (isOpen ? dark.surfaceAlt : dark.panel) : undefined}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#B68A35] rounded-lg flex justify-center items-center shrink-0">
          <Icon className="text-white w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        <div className="flex justify-between items-center w-full min-w-0">
          <div className="min-w-0">
            <h3
              className={`font-semibold text-base sm:text-lg truncate ${isDark ? "" : "text-slate-900"}`}
              style={isDark ? dark.text : undefined}
            >
              {title}
            </h3>
            <p
              className={`text-sm truncate ${isDark ? "" : "text-slate-500"}`}
              style={isDark ? dark.textMuted : undefined}
            >
              {subtitle}
            </p>
          </div>

          {isOpen ? (
            <ChevronUp className="text-[#B68A35] w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          ) : (
            <ChevronDown className="text-[#B68A35] w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          className={`px-4 pb-4 ${isDark ? "" : "bg-[#FAF9F6]"}`}
          style={isDark ? dark.surfaceAlt : undefined}
        >
          <div
            className={`border rounded-xl shadow-sm overflow-hidden ${isDark ? "" : "bg-white border-[#EFE8DC]"}`}
            style={isDark ? dark.panelInner : undefined}
          >
            <div className="max-h-96 overflow-y-auto custom-scroll">
              {items.map((item, itemIdx) => (
                <div
                  key={`${item.name}-${itemIdx}`}
                  className={`flex items-start gap-4 p-4 border-b last:border-b-0 ${isDark ? "" : "border-gray-100"}`}
                  style={isDark ? { borderColor: dark.dividerColor } : undefined}
                >
                  <div className="w-2 h-2 mt-2 bg-[#B68A35] rounded-full shrink-0" />
                  <div>
                    <h4
                      className={`font-semibold text-sm sm:text-base ${isDark ? "" : "text-slate-800"}`}
                      style={isDark ? dark.text : undefined}
                    >
                      {item.name}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm ${isDark ? "" : "text-slate-600"}`}
                      style={isDark ? dark.textSecondary : undefined}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Section3;