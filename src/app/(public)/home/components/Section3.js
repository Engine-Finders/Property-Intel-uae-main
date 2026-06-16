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

function Section3({ data }) {
  const { t, isDark, dark, section } = useThemeStyles();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('byDeveloper');

  if (!data) {
    return (
      <section className={`w-full font-sans antialiased transition-colors duration-300 ${isDark ? "" : "bg-[#FCFBFA]"}`} style={section}>
        <div className="max-w-350 mx-auto px-4 py-20">
          <p className="text-center" style={{ color: isDark ? dark.textSecondary : '#666' }}>Loading...</p>
        </div>
      </section>
    );
  }

  const projectsByLocation = data.projectsByLocation || {};
  const locations = data.locations || [];
  const legacyCommunities = data.legacyCommunities || [];
  const marinaLegacy = data.marinaLegacy || [];

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

  const headerDescription = data.header?.description || "Browse all current and past projects by Emaar Properties, from iconic towers to master communities. Data verified against DLD and RERA records.";

  return (
    <section className={`w-full font-sans antialiased transition-colors duration-300 ${isDark ? "" : "bg-[#FCFBFA]"}`} style={section}>
      {/* Mobile header */}
      <div className="md:hidden mb-0">
        <div className="relative min-h-[285px] overflow-hidden">
          <Image
            src="/projects/cm-projects.webp"
            alt={data.heroAlt || "Dubai Skyline"}
            fill
            className="object-cover object-center grayscale-[10%]"
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
              style={{ color: isDark ? t.text : "#1A1A1A" }}
            >
              {data.header?.title?.line1 || "Complete Emaar Project:"}
              <span className="block text-[#B68A35]">{data.header?.title?.line2 || "Database (2026)"}</span>
            </h2>
            <p
              className="mt-4 max-w-[380px] text-[14px] font-normal leading-[17px] tracking-[-0.01em]"
              style={{ color: isDark ? t.textSecondary : "#4b5563" }}
            >
              {headerDescription}
            </p>
            <span className="mt-5 block h-px w-20 bg-[#B68A35]" />
          </div>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex relative w-full h-[400px] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/cm-projects.webp"
            alt={data.heroAlt || "Dubai Skyline"}
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
            {data.header?.title?.line1 || "Complete Emaar Project:"}
            <span className="lg:hidden">—</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-serif text-[#B68A35] mb-6">
            {data.header?.title?.line2 || "Database (2026)"}
          </h3>
          <p
            className={`max-w-xl text-sm lg:text-base leading-[17px] font-medium ${isDark ? "" : "text-gray-600"}`}
            style={isDark ? dark.textSecondary : undefined}
          >
            {headerDescription}
          </p>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-2 sm:px-6 -mt-12 relative z-10 pb-16">
        {/* Filter Bar */}
        <div
          className={`rounded-xl lg:rounded-2xl border shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-3 mt-5 transition-colors duration-300 ${isDark ? "" : "bg-white border-[#F2EEE8]"}`}
          style={isDark ? dark.card : undefined}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div
              className={`flex gap-3 items-center h-12 rounded-lg px-4 border text-sm lg:flex-1 ${isDark ? "" : "bg-[#FAFAF9] border-[#ECE7DE] text-slate-500"}`}
              style={isDark ? dark.inputSurface : undefined}
            >
              <Search className={`w-4 h-4 ${isDark ? "" : "text-slate-400"}`} style={isDark ? { color: t.textMuted } : undefined} />
              <span>{data.filterBar?.searchPlaceholder || "Search by project or location..."}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full lg:flex lg:gap-3 lg:items-center lg:w-auto">
              {data.filterBar?.filters?.map((filter, idx) => (
                <FilterPill key={idx} icon={getFilterIcon(filter.iconName)} label={filter.label} />
              ))}

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

        {/* Tabs Container */}
        <div
          className={`rounded-xl lg:rounded-2xl mt-5 border shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden transition-colors duration-300 ${isDark ? "" : "border-[#F2EEE8] bg-white"}`}
          style={isDark ? dark.card : undefined}
        >
          <div
            className={`flex border-b overflow-hidden ${isDark ? "" : "border-[#F2EEE8] bg-[#FAF9F6]"}`}
            style={isDark ? dark.tabBar : undefined}
          >
            {data.tabs?.map((tab, index) => {
              const isActive = activeTab === tab.id;
              const isFirst = index === 0;
              const isLast = index === (data.tabs?.length || 0) - 1;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 px-2 py-4 lg:px-4 font-semibold text-center transition-colors text-[10px] leading-normal whitespace-nowrap lg:text-base lg:leading-normal ${isDark
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

          {/* Tab 1: Projects by Developer */}
          {activeTab === 'byDeveloper' && (
            <div
              className={`max-h-96 overflow-y-auto custom-scroll ${isDark ? "" : "bg-white"}`}
              style={isDark ? { background: PANEL_DARK_BG } : undefined}
            >
              {locations.map((item, idx) => {
                const Icon = getLocationIcon(item.iconName);
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
                      className={`w-full p-2 flex gap-4 items-center text-left transition-colors ${isDark ? "" : isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
                        }`}
                      style={isDark ? (isOpen ? dark.surfaceAlt : dark.panel) : undefined}
                    >
                      <div
                        className={`w-12 h-12 sm:w-12 sm:h-12 rounded lg:rounded-xl flex justify-center items-center border shrink-0 ${isDark ? "" : "bg-white border-[#EFE8DC]"}`}
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
                            className={`text-[13px] leading-normal lg:text-sm truncate ${isDark ? "" : "text-slate-500"}`}
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
                          className={`border overflow-hidden shadow-sm rounded lg:rounded-xl ${isDark ? "" : "bg-white border-[#EFE8DC]"}`}
                          style={isDark ? dark.panelInner : undefined}
                        >
                          <div className={`custom-scroll ${projects.length > 3 ? "max-lg:max-h-[13.5rem] max-lg:overflow-y-auto" : ""} lg:max-h-96 lg:overflow-y-auto`}>
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
                                      className={`font-semibold text-[13px] leading-normal lg:text-sm sm:text-[15px] truncate ${isDark ? "" : "text-slate-800"}`}
                                      style={isDark ? dark.text : undefined}
                                    >
                                      {row.name}
                                    </h4>
                                    <p
                                      className={`text-[13px] leading-normal lg:text-xs ${isDark ? "" : "text-slate-400"}`}
                                      style={isDark ? dark.textMuted : undefined}
                                    >
                                      {row.type}
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className={`font-medium text-[13px] leading-normal lg:text-sm shrink-0 ${row.handover === 'N/A' ? (isDark ? "" : "text-slate-400") : "text-[#B68A35]"}`}
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
                          className={`relative border border-[#B68A35] w-full h-12 mt-4 flex items-center justify-center rounded lg:rounded-xl hover:bg-[#B68A35]/5 transition-colors ${isDark ? "" : ""}`}
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
          )}

          {/* Tab 2: All Projects Table */}
          {activeTab === 'allProjects' && (
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
                    {data.allProjectsTable?.headers?.map((label, i) => (
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
                        className={`px-4 py-3 text-[13px] leading-normal lg:text-sm font-medium ${isDark ? "" : "text-slate-800"}`}
                        style={isDark ? dark.text : undefined}
                      >
                        {project.name}
                      </td>
                      <td
                        className={`px-4 py-3 text-[13px] leading-normal lg:text-sm hidden sm:table-cell ${isDark ? "" : "text-slate-600"}`}
                        style={isDark ? dark.textSecondary : undefined}
                      >
                        {project.type}
                      </td>
                      <td
                        className={`px-4 py-3 text-[13px] leading-normal lg:text-sm font-medium ${project.handover === 'N/A' ? (isDark ? "" : "text-slate-400") : "text-[#B68A35]"}`}
                        style={isDark && project.handover === 'N/A' ? dark.textMuted : undefined}
                      >
                        {project.handover}
                      </td>
                      <td
                        className={`px-4 py-3 text-[13px] leading-normal lg:text-sm font-medium hidden lg:table-cell ${isDark ? "" : "text-slate-800"}`}
                        style={isDark ? dark.text : undefined}
                      >
                        {project.locationName}
                      </td>
                      <td
                        className={`px-4 py-3 text-[13px] leading-normal lg:text-sm hidden lg:table-cell ${isDark ? "" : "text-slate-600"}`}
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

        {/* Legacy Cards */}
        <div
          className={`mt-5 rounded-xl lg:rounded-2xl flex flex-col lg:flex-row items-start border shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-4 sm:p-5 gap-4 transition-colors duration-300 ${isDark ? "" : "border-[#F2EEE8] bg-white"}`}
          style={isDark ? dark.card : undefined}
        >
          <LegacyCard
            index={15}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            icon={Palmtree}
            title="Emirates Living Legacy Communities"
            subtitle="Partial list of Emaar's iconic villa communities"
            items={legacyCommunities}
            isDark={isDark}
            dark={dark}
          />

          <LegacyCard
            index={16}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            icon={Building}
            title="Dubai Marina Legacy Projects"
            subtitle="Partial list of Emaar's iconic marina towers"
            items={marinaLegacy}
            isDark={isDark}
            dark={dark}
          />
        </div>

        <ExpertSection />

        <div
          className={`mt-6 border rounded lg:rounded-lg p-4 sm:p-5 transition-colors duration-300 ${isDark ? "" : "bg-[#FBF9F6] border-[#F3EFE9]"}`}
          style={isDark ? dark.verifyBanner : undefined}
        >
          <div className="lg:hidden">
            <MobileNoteBox
              icon={<LuInfo className="text-2xl" />}
              textClassName={isDark ? "" : "text-gray-600"}
              textStyle={isDark ? dark.textSecondary : undefined}
            >
              {data.footerDisclaimer || "Project status, prices, and performance data are verified against DLD and RERA records as of 21 February 2026. Capital appreciation calculated from launch price to current market value."}
            </MobileNoteBox>
          </div>
          <div className="hidden lg:flex gap-3 sm:gap-4 items-start">
            <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
            <p
              className={`text-sm leading-relaxed ${isDark ? "" : "text-gray-600"}`}
              style={isDark ? dark.textSecondary : undefined}
            >
              {data.footerDisclaimer || "Project status, prices, and performance data are verified against DLD and RERA records as of 21 February 2026. Capital appreciation calculated from launch price to current market value."}
            </p>
          </div>
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

function LegacyCard({ index, activeIndex, setActiveIndex, icon: Icon, title, subtitle, items, isDark, dark }) {
  const isOpen = activeIndex === index;

  return (
    <div
      className={`rounded lg:rounded-xl overflow-hidden border shadow-sm w-full lg:w-1/2 transition-colors duration-300 ${isDark ? "" : "bg-[#FAF9F6] border-[#F2EEE8]"}`}
      style={isDark ? { ...dark.surfaceAlt, borderColor: dark.cardBorder } : undefined}
    >
      <button
        type="button"
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className={`w-full flex p-4 gap-3 items-center text-left transition-colors ${isDark ? "" : isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
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
              className={`text-[13px] leading-normal lg:text-sm truncate ${isDark ? "" : "text-slate-500"}`}
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
            className={`border rounded lg:rounded-xl shadow-sm overflow-hidden ${isDark ? "" : "bg-white border-[#EFE8DC]"}`}
            style={isDark ? dark.panelInner : undefined}
          >
            <div className={`custom-scroll ${items.length > 3 ? "max-lg:max-h-[13.5rem] max-lg:overflow-y-auto" : ""} lg:max-h-96 lg:overflow-y-auto`}>
              {items.map((item, itemIdx) => (
                <div
                  key={`${item.name}-${itemIdx}`}
                  className={`flex items-start gap-4 p-4 border-b last:border-b-0 ${isDark ? "" : "border-gray-100"}`}
                  style={isDark ? { borderColor: dark.dividerColor } : undefined}
                >
                  <div className="w-2 h-2 mt-2 bg-[#B68A35] rounded-full shrink-0" />
                  <div>
                    <h4
                      className={`font-semibold text-[13px] leading-normal lg:text-sm sm:text-base ${isDark ? "" : "text-slate-800"}`}
                      style={isDark ? dark.text : undefined}
                    >
                      {item.name}
                    </h4>
                    <p
                      className={`text-[13px] leading-normal lg:text-sm ${isDark ? "" : "text-slate-600"}`}
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

// Helper functions for icons
const getFilterIcon = (iconName) => {
  const icons = {
    'MapPin': MapPin,
    'House': House,
    'Layers': Layers
  };
  return icons[iconName] || MapPin;
};

const getLocationIcon = (iconName) => {
  const icons = {
    'Anchor': Anchor,
    'Trees': Trees,
    'GiPalmTree': GiPalmTree,
    'Flag': Flag,
    'MdSpa': MdSpa,
    'Sprout': Sprout,
    'FaHome': FaHome,
    'FaHorse': FaHorse,
    'FaShip': FaShip,
    'FaUmbrellaBeach': FaUmbrellaBeach,
    'Globe': Globe,
    'Building': Building,
    'Map': Map,
    'Compass': Compass,
    'Star': Star
  };
  return icons[iconName] || Building;
};

export default Section3;