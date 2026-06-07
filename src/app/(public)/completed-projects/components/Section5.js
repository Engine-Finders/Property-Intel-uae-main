"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MapPin,
  Clock,
  Footprints,
  Users,
  Map,
  CalendarCheck,
  Lightbulb,
  FileText,
  ArrowRight,
} from "lucide-react";
import { LuInfo, LuTrees, LuTrendingUp } from "react-icons/lu";
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function StatusBadge({ type, label, isDark }) {
  if (type === "operational") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold justify-self-start w-max"
        style={{ background: isDark ? 'rgba(34,197,94,0.15)' : 'bg-emerald-50', color: isDark ? '#4ade80' : '#059669' }}>
        <CheckCircle className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  }
  if (type === "warning") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold justify-self-start w-max"
        style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#FDF8F0', color: GOLD }}>
        <AlertTriangle className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold justify-self-start w-max"
      style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#FDF8F0', color: GOLD }}>
      <XCircle className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

function AssessmentBadge({ type, label, isDark }) {
  const map = {
    good: {
      icon: <CheckCircle className="w-3.5 h-3.5" style={{ color: '#4ade80' }} />,
      bg: isDark ? 'rgba(34,197,94,0.15)' : 'bg-emerald-50',
      text: isDark ? '#4ade80' : '#059669',
    },
    warning: {
      icon: <AlertTriangle className="w-3.5 h-3.5" style={{ color: GOLD }} />,
      bg: isDark ? 'rgba(182,138,53,0.15)' : '#FDF8F0',
      text: GOLD,
    },
    bad: {
      icon: <XCircle className="w-3.5 h-3.5" style={{ color: GOLD }} />,
      bg: isDark ? 'rgba(182,138,53,0.15)' : '#FDF8F0',
      text: GOLD,
    },
  };

  const cfg = map[type] || map.good;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold justify-self-start w-max`}
      style={{ background: cfg.bg, color: cfg.text }}
    >
      {cfg.icon}
      {label}
    </span>
  );
}

function InsightBox({ icon: Icon, title, children, isDark, cardBorder, bodyColor }) {
  return (
    <div className="mt-5 rounded-2xl p-4 sm:p-5 flex gap-3 items-start"
      style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#F2EEE8'}`, background: isDark ? 'rgba(182,138,53,0.06)' : '#FAF9F6' }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
        <Icon className="w-5 h-5 text-[#B68A35]" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>{children}</p>
      </div>
    </div>
  );
}

function SourceNote({ text, isDark, bodyColor }) {
  return (
    <div className="flex gap-3 items-start mt-4 px-4 pb-4">
      <FileText className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
      <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>{text}</p>
    </div>
  );
}

// ─── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function AmenitiesTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "What's Actually Here Now — "}
          <span className="text-[#B68A35]">
            {data?.header?.highlight || "Established Amenities & Infrastructure"}
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: bodyColor }}>
          {data?.header?.description || ""}
        </p>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {data?.items?.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.name} className="border-b last:border-b-0" style={{ borderColor: cardBorder }}>
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full flex gap-3 items-start sm:items-center p-4 text-left transition-colors ${isOpen ? "" : ""}`}
                style={{ background: isOpen && isDark ? 'rgba(255,255,255,0.04)' : isOpen ? '#FAF9F6' : 'transparent' }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0 mt-1.5 sm:mt-0" />
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <span className="font-semibold text-sm sm:text-[15px]" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                    {item.name}
                  </span>
                  <StatusBadge type={item.status} label={item.statusLabel} isDark={isDark} />
                </div>
                <span className="ml-auto shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#B68A35]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#B68A35]" />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
                  <p className="text-sm leading-relaxed pl-5" style={{ color: bodyColor }}>
                    {item.details}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SourceNote text={data?.source || ""} isDark={isDark} bodyColor={bodyColor} />

      <InsightBox icon={Lightbulb} title={data?.insight?.title || "What This Means for Buyers"} isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor}>
        {data?.insight?.content || ""}
      </InsightBox>
    </div>
  );
}

function DriveTimesTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "Drive Time Analysis "}
          <span className="text-[#B68A35]">
            {data?.header?.highlight || "(Real-World Data, Validated via Google Maps)"}
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: bodyColor }}>
          {data?.header?.description || ""}
        </p>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {data?.items?.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.destination} className="border-b last:border-b-0" style={{ borderColor: cardBorder }}>
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full flex gap-3 items-center p-4 text-left transition-colors ${isOpen ? "" : ""}`}
                style={{ background: isOpen && isDark ? 'rgba(255,255,255,0.04)' : isOpen ? '#FAF9F6' : isDark ? 'rgba(255,255,255,0.02)' : '#f9f6f1' }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
                <span className="font-semibold text-sm sm:text-[15px] flex-1 min-w-0 truncate" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                  {item.destination}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs" style={{ color: subtextColor }}>Off-Peak (10 AM)</p>
                    <p className="text-sm font-semibold p-1 text-center rounded-full" style={{ color: isDark ? t.text : '#1A1A1A', background: isDark ? 'rgba(255,255,255,0.08)' : '#efeae4' }}>
                      {item.offPeak}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs" style={{ color: subtextColor }}>Peak (8 AM / 6 PM)</p>
                    <p className="text-sm font-semibold text-[#B68A35] p-1 text-center rounded-full" style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#efe4d4' }}>
                      {item.peak}
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#B68A35]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#B68A35]" />
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
                  <div className="flex gap-6 mb-3 sm:hidden pl-5">
                    <div>
                      <p className="text-xs" style={{ color: subtextColor }}>Off-Peak (10 AM)</p>
                      <p className="text-sm font-semibold p-2 text-center rounded-full" style={{ color: isDark ? t.text : '#1A1A1A', background: isDark ? 'rgba(255,255,255,0.08)' : '#efeae4' }}>
                        {item.offPeak}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: subtextColor }}>Peak (8 AM / 6 PM)</p>
                      <p className="text-sm font-semibold text-[#B68A35] p-2 text-center rounded-full" style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#efe4d4' }}>
                        {item.peak}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed p-5" style={{ background: isDark ? cardBg : 'white', color: bodyColor }}>
                    {item.note}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SourceNote text={data?.source || ""} isDark={isDark} bodyColor={bodyColor} />

      <InsightBox icon={Lightbulb} title={data?.insight?.title || "Practical Insight"} isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor}>
        {data?.insight?.content || ""}
      </InsightBox>
    </div>
  );
}

function WalkabilityTab({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "Walkability & Pedestrian Experience — "}
          <span className="text-[#B68A35]">{data?.header?.highlight || "Honest Assessment"}</span>
        </h3>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        <div className="hidden sm:grid sm:grid-cols-3 px-4 py-2.5"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderBottom: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Aspect</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Status</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Details</p>
        </div>

        {data?.items?.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.aspect} className="border-b last:border-b-0" style={{ borderColor: cardBorder }}>
              <div className="hidden sm:grid sm:grid-cols-3 sm:items-center p-4">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
                  <span className="font-semibold text-sm sm:text-[15px]" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                    {item.aspect}
                  </span>
                </div>
                <div className="flex items-center">
                  <AssessmentBadge type={item.assessmentType} label={item.assessment} isDark={isDark} />
                </div>
                <div>
                  <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
                    {item.details}
                  </p>
                </div>
              </div>

              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full flex gap-3 items-center p-2 py-4 text-left transition-colors ${isOpen ? "" : ""}`}
                  style={{ background: isOpen && isDark ? 'rgba(255,255,255,0.04)' : isOpen ? '#FAF9F6' : 'transparent' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-sm block" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                      {item.aspect}
                    </span>
                  </div>
                  <div className="shrink-0 ml-3">
                    <AssessmentBadge type={item.assessmentType} label={item.assessment} isDark={isDark} />
                  </div>
                  <span className="shrink-0 ml-2">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#B68A35]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#B68A35]" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
                    <p className="text-sm leading-relaxed pl-5" style={{ color: bodyColor }}>
                      {item.details}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <SourceNote text={data?.source || ""} isDark={isDark} bodyColor={bodyColor} />

      <InsightBox icon={Lightbulb} title={data?.insight?.title || "Honest Takeaway"} isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor}>
        {data?.insight?.content || ""}
      </InsightBox>
    </div>
  );
}

// ─── MAP SECTION ─────────────────────────────────────────────────────────────

function MapSection({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <div className="flex gap-3 items-start px-4 sm:px-5 py-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-1 sm:mt-0"
          style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
          <Map className="w-5 h-5 text-[#B68A35]" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
            {data?.title || "Map Description (Alt-Text Style)"}
          </p>
          <p className="text-sm leading-relaxed mt-2" style={{ color: bodyColor }}>
            {data?.description || ""}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-5 py-5">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={data?.imageUrl || "/completed-projects/map.webp"}
            alt={data?.imageAlt || "Map showing Emirates Hills positioned in western Dubai"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// ─── NEIGHBOURHOOD SECTION ───────────────────────────────────────────────────

function NeighbourhoodSection({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex gap-4 items-center p-4 sm:p-5 text-left transition-colors ${open ? "" : ""}`}
        style={{ background: open && isDark ? 'rgba(255,255,255,0.04)' : open ? '#FAF9F6' : 'transparent' }}
      >
        <div className="w-12 h-12 bg-[#B68A35] rounded-xl flex items-center justify-center shrink-0">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg" style={{ color: isDark ? t.text : '#1A1A1A' }}>
            {data?.header?.title || "Neighbourhood Vibe"}
          </h3>
          <p className="text-sm truncate" style={{ color: subtextColor }}>
            {data?.header?.subtitle || "A Mature, Established Luxury Enclave"}
          </p>
        </div>
        {open ? (
          <ChevronUp className="text-[#B68A35] w-6 h-6 shrink-0" />
        ) : (
          <ChevronDown className="text-[#B68A35] w-6 h-6 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
          <p className="text-sm leading-relaxed mb-4 pt-2" style={{ color: bodyColor }}>
            {data?.description || ""}
          </p>

          <div className="rounded-xl shadow-sm overflow-hidden" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            {data?.points?.map((pt, idx) => {
              const Icon = getNeighbourhoodIcon(pt.iconName);
              return (
                <div
                  key={pt.label}
                  className="flex items-start gap-4 p-4 border-b last:border-b-0"
                  style={{ borderColor: cardBorder }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FAF9F6' }}>
                    {Icon ? (
                      <Icon className="w-4 h-4 text-[#B68A35]" />
                    ) : (
                      <span className="w-2 h-2 bg-[#B68A35] rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-[15px]" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                      {pt.label}
                    </p>
                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: bodyColor }}>
                      {pt.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <SourceNote text={data?.source || ""} isDark={isDark} bodyColor={bodyColor} />

          <InsightBox icon={Lightbulb} title={data?.insight?.title || "Why This Matters"} isDark={isDark} cardBorder={cardBorder} bodyColor={bodyColor}>
            {data?.insight?.content || ""}
          </InsightBox>
        </div>
      )}
    </div>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

function CTASection({ data, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <div className="px-4 sm:px-5 pt-4 pb-2" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35]">
          {data?.header?.badge || "Explore Emirates Hills Location"}
        </p>
        <h3 className="font-serif text-lg sm:text-xl mt-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          {data?.header?.title || "with Expert Guidance"}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-0 divide-y lg:divide-y-0 lg:divide-x" style={{ borderColor: cardBorder }}>
        {data?.buttons?.map((btn, idx) => (
          <div key={idx} className="p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
                {getCTAIcon(btn.iconName)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                  {btn.title}
                </p>
                <p className="text-xs sm:text-sm mt-1" style={{ color: bodyColor }}>
                  {btn.description}
                </p>
                <button
                  type="button"
                  className="relative w-full h-12 flex items-center justify-center rounded-xl transition-colors mt-5"
                  style={{ background: GOLD, border: `1px solid ${GOLD}` }}
                >
                  <span className="text-white text-sm font-semibold px-10">
                    {btn.buttonText}
                  </span>
                  <ArrowRight className="text-white absolute right-4 w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-center" style={{ color: subtextColor }}>
              Intent: {btn.intent}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HELPER FUNCTIONS FOR ICONS ─────────────────────────────────────────────

const getNeighbourhoodIcon = (iconName) => {
  const icons = {
    'Users': Users,
    'ShieldCheck': ShieldCheck,
    'LuTrees': LuTrees,
    'LuTrendingUp': LuTrendingUp
  };
  return icons[iconName] || ShieldCheck;
};

const getCTAIcon = (iconName) => {
  const icons = {
    'CalendarCheck': <CalendarCheck className="w-5 h-5 text-[#B68A35]" />,
    'MapPin': <MapPin className="w-5 h-5 text-[#B68A35]" />
  };
  return icons[iconName] || <CalendarCheck className="w-5 h-5 text-[#B68A35]" />;
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const TABS = [
  { key: "amenities", label: "Amenities", icon: CheckCircle },
  { key: "driveTimes", label: "Drive Times", icon: Clock },
  { key: "walkability", label: "Walkability", icon: Footprints },
];

function Section5({ data }) {
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState("amenities");

  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const sectionBg = isDark ? t.bg : "#FCFBFA";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

  if (!data) {
    return (
      <section className="w-full font-sans" style={{ background: sectionBg }}>
        <div className="max-w-[1400px] mx-auto px-4 py-20">
          <p className="text-center" style={{ color: bodyColor }}>Loading...</p>
        </div>
      </section>
    );
  }

  const renderTab = () => {
    if (activeTab === "amenities") return <AmenitiesTab data={data.amenities} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    if (activeTab === "driveTimes") return <DriveTimesTab data={data.driveTimes} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    return <WalkabilityTab data={data.walkability} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
  };

  return (
    <section className="w-full font-sans antialiased" style={{ background: sectionBg }}>
      {/* ── Header ── */}
      <div className="relative w-full h-80 lg:h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage || "/Home/Section3bg.webp"}
            alt={data.heroAlt || "Emirates Hills luxury villas"}
            fill
            className="object-cover object-center"
            priority
          />
          <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`}
            style={isDark ? dark?.heroOverlayLeft : undefined} />
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
          <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
            {data.headings?.line1 || "Location & "}<span className="text-[#B68A35] italic">{data.headings?.highlight || "Community"}</span> {data.headings?.line2 || "Maturity"}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-medium" style={{ color: bodyColor }}>
            {data.headings?.subtitle || "Emirates Hills – by Emaar Properties"}
          </p>
        </div>
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-2 sm:px-6 pb-5 sm:pb-10 -mt-24 sm:-mt-28 lg:-mt-32">
        {/* ── Source Transparency ── */}
        <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-4 sm:p-5 flex gap-3 items-start"
          style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
            <ShieldCheck className="w-5 h-5 text-[#B68A35]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">{data.sourceTransparency?.title || "Source Transparency"}</p>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
              {data.sourceTransparency?.content || ""}
            </p>
          </div>
        </div>

        {/* ── Tabbed Panel ── */}
        <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3.5 text-sm font-semibold transition-colors ${active && !isDark ? "text-[#B68A35] border-b-2 border-[#B68A35] bg-white" : !isDark && !active ? "text-slate-500 hover:text-slate-800" : ""}`}
                  style={
                    isDark && active
                      ? { color: GOLD, borderBottom: `2px solid ${GOLD}`, background: cardBg }
                      : isDark && !active
                        ? { color: subtextColor, background: 'transparent' }
                        : undefined
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden xs:inline sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pb-5">{renderTab()}</div>
        </div>

        {/* ── Neighbourhood Vibe ── */}
        <NeighbourhoodSection data={data.neighbourhood} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

        {/* ── Map + CTAs (two-column) ── */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapSection data={data.map} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />
          </div>
          <div className="lg:col-span-1">
            <CTASection data={data.cta} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="mt-6 rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start"
          style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
          <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
          <p className="text-xs lg:text-sm leading-relaxed" style={{ color: bodyColor }}>
            {data.footerDisclaimer || ""}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section5;