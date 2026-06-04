"use client";
import React, { useState } from "react";
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
import Image from "next/image";
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

// ─── DATA ────────────────────────────────────────────────────────────────────

const amenities = [
  {
    name: "Montgomerie Golf Club",
    status: "operational",
    statusLabel: "Operational since 2003",
    details:
      "18-hole championship course; membership available to residents; hosted European Tour events.",
  },
  {
    name: "Private Lakes & Landscaping",
    status: "operational",
    statusLabel: "Mature since 2008",
    details:
      "Fully established water features, irrigation systems, and 25+ year-old tree canopy.",
  },
  {
    name: "24/7 Security & Gated Entry",
    status: "operational",
    statusLabel: "Operational since first handover",
    details:
      "Manned checkpoints, CCTV coverage, visitor verification protocols; response times <10 minutes.",
  },
  {
    name: "Community Roads & Lighting",
    status: "operational",
    statusLabel: "Fully maintained",
    details:
      "Paved internal roads, LED street lighting, regular RTA-aligned maintenance schedules.",
  },
  {
    name: "Nearby Retail (Operational)",
    status: "operational",
    statusLabel: "All open now",
    details:
      "Mall of the Emirates (12 min), Dubai Marina Mall (10 min), Circle Mall (8 min), Waitrose/Spinneys within 10 min drive.",
  },
  {
    name: "Healthcare Facilities",
    status: "operational",
    statusLabel: "Operational",
    details:
      "Mediclinic Parkview (10 min), King's College Hospital Dubai (15 min), multiple dental/specialist clinics within 15 min.",
  },
  {
    name: "Schools (KHDA-Rated)",
    status: "operational",
    statusLabel: "Operational",
    details:
      "JESS Arabian Ranches (8 min, Outstanding), Dubai British School (10 min, Very Good), Nord Anglia School (12 min, Outstanding).",
  },
];

const driveTimes = [
  {
    destination: "Dubai Marina / JBR",
    offPeak: "8–12 min",
    peak: "15–22 min",
    note: "Via Al Khail Road (E44) or Sheikh Zayed Road (E11); minimal congestion outside rush hours.",
  },
  {
    destination: "Mall of the Emirates",
    offPeak: "10–14 min",
    peak: "18–25 min",
    note: "Direct access via Al Khail Road; dedicated exit for Emirates Hills residents.",
  },
  {
    destination: "DIFC / Downtown Dubai",
    offPeak: "18–22 min",
    peak: "28–40 min",
    note: "Via Sheikh Zayed Road (E11); Business Bay crossing experiences peak-hour delays.",
  },
  {
    destination: "Dubai International Airport (DXB)",
    offPeak: "22–28 min",
    peak: "35–50 min",
    note: "Via Sheikh Zayed Road; allow extra time during school drop-off/pick-up windows.",
  },
  {
    destination: "Al Maktoum International (DWC)",
    offPeak: "30–38 min",
    peak: "40–55 min",
    note: "Via Emirates Road (E611); less congested than DXB route but longer distance.",
  },
  {
    destination: "Jebel Ali Port / Industrial",
    offPeak: "15–20 min",
    peak: "22–30 min",
    note: "Via Sheikh Zayed Road South; key employment corridor for logistics/professional residents.",
  },
  {
    destination: "Mediclinic Parkview Hospital",
    offPeak: "8–12 min",
    peak: "12–18 min",
    note: "Via Al Khail Road; 24/7 emergency services, comprehensive specialist coverage.",
  },
];

const walkabilityItems = [
  {
    aspect: "Internal Walkability",
    assessment: "Excellent",
    assessmentType: "good",
    details:
      "Wide, landscaped internal roads with dedicated pedestrian paths; jogging/cycling routes connect clusters to golf club and lake areas; low traffic volume enables safe walking.",
  },
  {
    aspect: "External Walkability",
    assessment: "Limited",
    assessmentType: "warning",
    details:
      "No metro or tram station within walking distance; nearest Dubai Metro stations (Sobha Realty / DMCC) are 12–15 minutes by vehicle; community designed for car-dependent lifestyle.",
  },
  {
    aspect: "Daily Convenience (Walking)",
    assessment: "Not feasible",
    assessmentType: "bad",
    details:
      "No supermarkets, pharmacies, or cafes within walking distance outside the gated community; all daily errands require vehicle access.",
  },
  {
    aspect: "Daily Convenience (Driving)",
    assessment: "Excellent",
    assessmentType: "good",
    details:
      "Multiple retail options within 8–12 minutes: Circle Mall (8 min), Mall of the Emirates (12 min), Dubai Marina retail corridor (10 min); grocery delivery services widely available.",
  },
];

const neighbourhoodPoints = [
  {
    label: "Demographics",
    icon: Users,
    text: "Predominantly executive families, business owners, and long-term UAE residents; high proportion of Golden Visa holders; low tenant turnover (average tenancy 3–5 years).",
  },
  {
    label: "Community Character",
    icon: ShieldCheck,
    text: "Quiet, privacy-focused, and well-maintained; strict architectural guidelines preserve aesthetic cohesion; minimal short-term rental activity preserves residential tranquility.",
  },
  {
    label: "Green Space",
    icon: LuTrees,
    text: "Landscaping is fully mature —trees planted in 2003–2008 now provide significant shade; lakes and water features are established ecosystems, not new installations.",
  },
  {
    label: "Social Infrastructure",
    icon: Users,
    text: "Active owners' association; regular community events coordinated via Emaar Community Management; informal neighbour networks support long-term residency.",
  },
  {
    label: "Market Position",
    icon: LuTrendingUp,
    text: "Consistently ranks among Dubai's top 3 villa communities for capital stability (DXBInteract transaction analysis, 2020–2025); limited resale inventory reflects high owner satisfaction.",
  },
];

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

function AccordionRow({ children, isOpen, onToggle, dot = true, isDark }) {
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#F2EEE8' }}>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex gap-4 items-center p-4 text-left transition-colors ${isOpen ? "" : ""}`}
        style={{ 
          background: isOpen && isDark ? 'rgba(255,255,255,0.04)' : isOpen ? '#FAF9F6' : 'transparent',
          hover: { background: isDark ? 'rgba(255,255,255,0.02)' : '#FCFAF5' }
        }}
      >
        {dot && (
          <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0 mt-0.5" />
        )}
        {children}
        <span className="ml-auto shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-[#B68A35]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#B68A35]" />
          )}
        </span>
      </button>
    </div>
  );
}

function SourceNote({ text, isDark, bodyColor, subtextColor }) {
  return (
    <div className="flex gap-3 items-start mt-4 px-4 pb-4">
      <FileText className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
      <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>{text}</p>
    </div>
  );
}

function InsightBox({ icon: Icon, title, children, isDark, bodyColor, subtextColor, t }) {
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

// ─── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function AmenitiesTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          What's Actually Here Now —{" "}
          <span className="text-[#B68A35]">
            Established Amenities & Infrastructure
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: bodyColor }}>
          Emirates Hills has been fully operational since 2008, with all core
          infrastructure, amenities, and community services mature and actively
          maintained. Unlike emerging corridors where residents wait for promised
          facilities, Emirates Hills offers immediate access to:
        </p>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {amenities.map((item, idx) => {
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

      <SourceNote text="Source: DLD Community Registry, Google Business listings (verified February 2026), KHDA School Directory 2025, RTA infrastructure records." isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} />

      <InsightBox icon={Lightbulb} title="What This Means for Buyers" isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} t={t}>
        There is no waiting period for amenities. Schools, retail, healthcare,
        and leisure facilities are fully operational and have served the community
        for 15–20+ years. This eliminates the "construction phase uncertainty"
        common in off-plan purchases and provides immediate livability for
        end-users.
      </InsightBox>
    </div>
  );
}

function DriveTimesTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          Drive Time Analysis{" "}
          <span className="text-[#B68A35]">
            (Real-World Data, Validated via Google Maps)
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: bodyColor }}>
          Drive times below reflect actual routing data validated against RTA
          traffic patterns. Times vary by day of week and seasonal conditions;
          figures represent typical weekday performance.
        </p>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {driveTimes.map((item, idx) => {
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
                  {/* Mobile: show off-peak too */}
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

      <SourceNote text="Source: Google Maps routing data (validated February 2026), RTA Traffic Performance Reports Q4 2025." isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} />

      <InsightBox icon={Lightbulb} title="Practical Insight" isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} t={t}>
        Emirates Hills benefits from direct access to Al Khail Road (E44) and
        Sheikh Zayed Road (E11), two of Dubai's most reliable arterial routes.
        Unlike communities dependent on single-access roads, residents have
        multiple routing options, reducing vulnerability to localized congestion.
        Peak-hour delays are predictable and manageable with flexible scheduling.
      </InsightBox>
    </div>
  );
}

function WalkabilityTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          Walkability & Pedestrian Experience —{" "}
          <span className="text-[#B68A35]">Honest Assessment</span>
        </h3>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5"
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {/* Table header */}
        <div className="hidden sm:grid sm:grid-cols-3 px-4 py-2.5"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderBottom: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Aspect</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Status</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Details</p>
        </div>

        {walkabilityItems.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.aspect} className="border-b last:border-b-0" style={{ borderColor: cardBorder }}>
              {/* Desktop: show as three-column row with Status column */}
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

              {/* Mobile: keep accordion behaviour */}
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

      <SourceNote text="Source: On-ground verification (February 2026), RTA pedestrian infrastructure maps, Google Places API." isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} />

      <InsightBox icon={Lightbulb} title="Honest Takeaway" isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} t={t}>
        Emirates Hills prioritises privacy, security, and low-density living
        over urban walkability. This is a deliberate design choice aligned with
        its ultra-luxury positioning. Residents who value car-free convenience
        may find the community less suitable; those prioritising exclusivity,
        space, and controlled access will view the car-dependent model as a
        feature, not a limitation.
      </InsightBox>
    </div>
  );
}

// ─── MAP SECTION ─────────────────────────────────────────────────────────────

function MapSection({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
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
            Map Description (Alt-Text Style)
          </p>
          <p className="text-sm leading-relaxed mt-2" style={{ color: bodyColor }}>
            Map showing Emirates Hills positioned in western Dubai, bounded by Al
            Khail Road (E44) to the north and Sheikh Zayed Road (E11) to the east.
            The community sits approximately 10 minutes from Dubai Marina, 12
            minutes from Mall of the Emirates, and 22 minutes from Downtown Dubai.
            Montgomerie Golf Club occupies the southern edge of the community, with
            private lakes and landscaped buffers separating residential plots. No
            metro stations are within 2 km; nearest stations (DMCC, Sobha Realty)
            require 12–15 minutes by vehicle.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-5 py-5">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/completed-projects/map.webp"
            alt="Map showing Emirates Hills positioned in western Dubai"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// ─── NEIGHBOURHOOD SECTION ───────────────────────────────────────────────────

function NeighbourhoodSection({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
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
            Neighbourhood Vibe
          </h3>
          <p className="text-sm truncate" style={{ color: subtextColor }}>
            A Mature, Established Luxury Enclave
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
            Now home to approximately 450 families across custom-built villas,
            Emirates Hills has evolved into one of Dubai's most stable,
            low-turnover residential communities. After two decades of
            occupation, the neighbourhood exhibits characteristics of a fully
            matured enclave:
          </p>

          <div className="rounded-xl shadow-sm overflow-hidden" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            {neighbourhoodPoints.map((pt, idx) => {
              const Icon = pt.icon;
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

          <SourceNote text="Source: Aggregated DLD transaction data (DXBInteract), Emaar Community Management reports, verified resident feedback (Google Reviews, property forums, Q1 2025–Q1 2026)." isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} />

          <InsightBox icon={Lightbulb} title="Why This Matters" isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} t={t}>
            A mature community reduces uncertainty. Buyers can assess actual
            noise levels, traffic patterns, neighbour behaviour, and maintenance
            standards through site visits — unlike off-plan purchases where
            these factors remain speculative until handover.
          </InsightBox>
        </div>
      )}
    </div>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

function CTASection({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <div className="px-4 sm:px-5 pt-4 pb-2" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35]">
          Explore Emirates Hills Location
        </p>
        <h3 className="font-serif text-lg sm:text-xl mt-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          with Expert Guidance
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-0 divide-y lg:divide-y-0 lg:divide-x" style={{ borderColor: cardBorder }}>
        {/* Primary CTA */}
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
              <CalendarCheck className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                Schedule a Location Consultation for Emirates Hills
              </p>
              <p className="text-xs sm:text-sm mt-1" style={{ color: bodyColor }}>
                Speak with a local expert about commute patterns, school
                catchments, and the real day-to-day experience of living in this
                established community.
              </p>
              <button
                type="button"
                className="relative w-full h-12 flex items-center justify-center rounded-xl transition-colors mt-5"
                style={{ background: GOLD, border: `1px solid ${GOLD}` }}
              >
                <span className="text-white text-sm font-semibold px-10">
                  Schedule Consultation
                </span>
                <ArrowRight className="text-white absolute right-4 w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[10px] text-center" style={{ color: subtextColor }}>
            Intent: location_consultation
          </p>
        </div>

        {/* Secondary CTA */}
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
              <MapPin className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                View Comparable Completed Communities
              </p>
              <p className="text-xs sm:text-sm mt-1" style={{ color: bodyColor }}>
                Explore how Emirates Hills compares to other mature villa
                enclaves like Arabian Ranches, Jumeirah Islands, and Palm
                Jumeirah Garden Homes.
              </p>
              <button
                type="button"
                className="relative w-full h-12 flex items-center justify-center rounded-xl transition-colors mt-5"
                style={{ background: GOLD, border: `1px solid ${GOLD}` }}
              >
                <span className="text-white text-sm font-semibold px-10">
                  View Comparable Communities
                </span>
                <ArrowRight className="text-white absolute right-4 w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[10px] text-center" style={{ color: subtextColor }}>
            Intent: community_comparison
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const TABS = [
  { key: "amenities", label: "Amenities", icon: CheckCircle },
  { key: "driveTimes", label: "Drive Times", icon: Clock },
  { key: "walkability", label: "Walkability", icon: Footprints },
];

function Section5() {
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState("amenities");

  // Card colors matching TopDevelopersSection pattern
  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const sectionBg = isDark ? t.bg : "#FCFBFA";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

  const renderTab = () => {
    if (activeTab === "amenities") return <AmenitiesTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    if (activeTab === "driveTimes") return <DriveTimesTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    return <WalkabilityTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
  };

  return (
    <section className="w-full font-sans antialiased" style={{ background: sectionBg }}>
      {/* ── Header ── */}
      <div className="relative w-full h-80 lg:h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Home/Section3bg.webp"
            alt="Emirates Hills luxury villas"
            fill
            className="object-cover object-center"
            priority
          />
          <div className={`absolute inset-0 ${isDark ? "" : "bg-gradient-to-r from-white via-white/85 to-transparent"}`}
            style={isDark ? dark?.heroOverlayLeft : undefined} />
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
          <h2 className="text-3xl lg:text-5xl font-serif mb-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
            Location &amp; <span className="text-[#B68A35] italic">Community</span> Maturity
          </h2>
          <p className="mt-2 text-sm sm:text-base font-medium" style={{ color: bodyColor }}>
            Emirates Hills – by Emaar Properties
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">Source Transparency</p>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: bodyColor }}>
              Drive times validated via Google Maps (February 2026) and
              cross-referenced with RTA traffic reports. Amenity status confirmed
              via DLD community registry, Google Business listings, and
              on-ground verification. All information reflects operational status
              as of Q1 2026. Verify specific access details with community
              management before purchase.
            </p>
          </div>
        </div>

        {/* ── Tabbed Panel ── */}
        <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          {/* Tab bar */}
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

          {/* Tab body */}
          <div className="pb-5">{renderTab()}</div>
        </div>

        {/* ── Neighbourhood Vibe ── */}
        <NeighbourhoodSection isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

        {/* ── Map + CTAs (two-column) ── */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapSection isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />
          </div>
          <div className="lg:col-span-1">
            <CTASection isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="mt-6 rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start"
          style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
          <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
          <p className="text-xs lg:text-sm leading-relaxed" style={{ color: bodyColor }}>
            All location data is for informational purposes only. Drive times
            vary by traffic conditions, time of day, and route selection. Verify
            school catchments, healthcare access, and retail availability
            directly with providers before making location-dependent decisions.
            PropertyIntel.ae does not guarantee future infrastructure performance
            or amenity availability.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section5;