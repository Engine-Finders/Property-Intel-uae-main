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

function StatusBadge({ type, label }) {
  // Use pill-style badges with subtle background and limited text colours
  if (type === "operational") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold justify-self-start w-max">
        <CheckCircle className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  }
  if (type === "warning") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDF8F0] text-[#B68A35] text-xs font-semibold justify-self-start w-max">
        <AlertTriangle className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDF8F0] text-[#B68A35] text-xs font-semibold justify-self-start w-max">
      <XCircle className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

function AssessmentBadge({ type, label }) {
  // Limit text colours to either green (good) or primary (#B68A35) per design.
  const map = {
    good: {
      icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    warning: {
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#B68A35]" />,
      bg: "bg-[#FDF8F0]",
      text: "text-[#B68A35]",
    },
    bad: {
      icon: <XCircle className="w-3.5 h-3.5 text-[#B68A35]" />,
      bg: "bg-[#FDF8F0]",
      text: "text-[#B68A35]",
    },
  };

  const cfg = map[type] || map.good;
  return (
    <span
      className={`${cfg.bg} inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${cfg.text} text-sm font-semibold justify-self-start w-max`}
    >
      {cfg.icon}
      {label}
    </span>
  );
}

function AccordionRow({ children, isOpen, onToggle, dot = true }) {
  return (
    <div className="border-b border-[#F2EEE8] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex gap-4 items-center p-4 text-left transition-colors ${isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
          }`}
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

function SourceNote({ text }) {
  return (
    <div className="flex gap-3 items-start mt-4 px-4 pb-4">
      <FileText className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
      <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
    </div>
  );
}

function InsightBox({ icon: Icon, title, children }) {
  return (
    <div className="mt-5 rounded-2xl border border-[#F2EEE8] bg-[#FAF9F6] p-4 sm:p-5 flex gap-3 items-start">
      <div className="w-9 h-9 rounded-lg bg-[#B68A35]/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#B68A35]" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
          {title}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

// ─── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function AmenitiesTab() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
          What's Actually Here Now —{" "}
          <span className="text-[#B68A35]">
            Established Amenities & Infrastructure
          </span>
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Emirates Hills has been fully operational since 2008, with all core
          infrastructure, amenities, and community services mature and actively
          maintained. Unlike emerging corridors where residents wait for promised
          facilities, Emirates Hills offers immediate access to:
        </p>
      </div>

      <div className="rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden mx-4 sm:mx-5">
        {amenities.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.name} className="border-b border-[#F2EEE8] last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full flex gap-3 items-start sm:items-center p-4 text-left transition-colors ${isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
                  }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0 mt-1.5 sm:mt-0" />
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <span className="font-semibold text-sm sm:text-[15px] text-slate-800">
                    {item.name}
                  </span>
                  <StatusBadge type={item.status} label={item.statusLabel} />
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
                <div className="px-4 pb-4 bg-[#FAF9F6]">
                  <p className="text-sm text-slate-600 leading-relaxed pl-5">
                    {item.details}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SourceNote text="Source: DLD Community Registry, Google Business listings (verified February 2026), KHDA School Directory 2025, RTA infrastructure records." />

      <InsightBox icon={Lightbulb} title="What This Means for Buyers">
        There is no waiting period for amenities. Schools, retail, healthcare,
        and leisure facilities are fully operational and have served the community
        for 15–20+ years. This eliminates the "construction phase uncertainty"
        common in off-plan purchases and provides immediate livability for
        end-users.
      </InsightBox>
    </div>
  );
}

function DriveTimesTab() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
          Drive Time Analysis{" "}
          <span className="text-[#B68A35]">
            (Real-World Data, Validated via Google Maps)
          </span>
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Drive times below reflect actual routing data validated against RTA
          traffic patterns. Times vary by day of week and seasonal conditions;
          figures represent typical weekday performance.
        </p>
      </div>

      <div className="rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden mx-4 sm:mx-5">
        {driveTimes.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.destination} className="border-b border-[#F2EEE8] last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full flex gap-3 items-center p-4 text-left transition-colors ${isOpen ? "bg-[#FAF9F6]" : "bg-[#f9f6f1] hover:bg-[#FCFAF5]"
                  }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
                <span className="font-semibold text-sm sm:text-[15px] text-slate-800 flex-1 min-w-0 truncate">
                  {item.destination}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-400">Off-Peak (10 AM)</p>
                    <p className="text-sm font-semibold text-slate-800 bg-[#efeae4] p-1 text-center rounded-full">
                      {item.offPeak}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-400">Peak (8 AM / 6 PM)</p>
                    <p className="text-sm font-semibold text-[#B68A35] bg-[#efe4d4] p-1 text-center rounded-full">
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
                <div className=" bg-[#FAF9F6]">
                  {/* Mobile: show off-peak too */}
                  <div className="flex gap-6 mb-3 sm:hidden pl-5">
                    <div>
                      <p className="text-xs text-slate-400">Off-Peak (10 AM)</p>
                      <p className="text-sm font-semibold text-slate-800 bg-[#efeae4] p-2 text-center rounded-full">
                        {item.offPeak}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Peak (8 AM / 6 PM)</p>
                      <p className="text-sm font-semibold text-[#B68A35] bg-[#efe4d4] p-2 text-center rounded-full">
                        {item.peak}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed p-5 bg-white">
                    {item.note}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SourceNote text="Source: Google Maps routing data (validated February 2026), RTA Traffic Performance Reports Q4 2025." />

      <InsightBox icon={Lightbulb} title="Practical Insight">
        Emirates Hills benefits from direct access to Al Khail Road (E44) and
        Sheikh Zayed Road (E11), two of Dubai's most reliable arterial routes.
        Unlike communities dependent on single-access roads, residents have
        multiple routing options, reducing vulnerability to localized congestion.
        Peak-hour delays are predictable and manageable with flexible scheduling.
      </InsightBox>
    </div>
  );
}

function WalkabilityTab() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
          Walkability & Pedestrian Experience —{" "}
          <span className="text-[#B68A35]">Honest Assessment</span>
        </h3>
      </div>

      <div className="rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden mx-4 sm:mx-5">
        {/* Table header */}
        <div className="hidden sm:grid sm:grid-cols-3 bg-[#FAF9F6] border-b border-[#F2EEE8] px-4 py-2.5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Aspect
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Status
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Details
          </p>
        </div>

        {walkabilityItems.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.aspect} className="border-b border-[#F2EEE8] last:border-b-0">
              {/* Desktop: show as three-column row with Status column */}
              <div className="hidden sm:grid sm:grid-cols-3 sm:items-center p-4">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
                  <span className="font-semibold text-sm sm:text-[15px] text-slate-800 block">
                    {item.aspect}
                  </span>
                </div>

                <div className="flex items-center">
                  <AssessmentBadge type={item.assessmentType} label={item.assessment} />
                </div>

                <div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>

              {/* Mobile: keep accordion behaviour */}
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full flex gap-3 items-center p-2 py-4 text-left transition-colors ${isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
                    }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-sm text-slate-800 block">
                      {item.aspect}
                    </span>
                  </div>
                  <div className="shrink-0 ml-3">
                    <AssessmentBadge type={item.assessmentType} label={item.assessment} />
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
                  <div className="px-4 pb-4 bg-[#FAF9F6]">
                    <p className="text-sm text-slate-600 leading-relaxed pl-5">
                      {item.details}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <SourceNote text="Source: On-ground verification (February 2026), RTA pedestrian infrastructure maps, Google Places API." />

      <InsightBox icon={Lightbulb} title="Honest Takeaway">
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

function MapSection() {
  return (
    <div className="mt-5 rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
      <div className="flex gap-3 items-start px-4 sm:px-5 py-4 border-b border-[#F2EEE8]">
        <div className="w-10 h-10 bg-[#B68A35]/10 rounded-lg flex items-center justify-center shrink-0 mt-1 sm:mt-0">
          <Map className="w-5 h-5 text-[#B68A35]" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm sm:text-base text-slate-900">
            Map Description (Alt-Text Style)
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">
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
        <div className="">
          <div className="relative rounded-xl overflow-hidden bg-white">
            <img
              src="/completed-projects/map.webp"
              alt="Map showing Emirates Hills positioned in western Dubai"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>


    </div>
  );
}

// ─── NEIGHBOURHOOD SECTION ───────────────────────────────────────────────────

function NeighbourhoodSection() {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-5 rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex gap-4 items-center p-4 sm:p-5 text-left transition-colors ${open ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
          }`}
      >
        <div className="w-12 h-12 bg-[#B68A35] rounded-xl flex items-center justify-center shrink-0">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg text-slate-900">
            Neighbourhood Vibe
          </h3>
          <p className="text-sm text-slate-500 truncate">
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
        <div className="bg-[#FAF9F6] px-4 pb-4">
          <p className="text-sm text-slate-600 leading-relaxed mb-4 pt-2">
            Now home to approximately 450 families across custom-built villas,
            Emirates Hills has evolved into one of Dubai's most stable,
            low-turnover residential communities. After two decades of
            occupation, the neighbourhood exhibits characteristics of a fully
            matured enclave:
          </p>

          <div className="bg-white border border-[#EFE8DC] rounded-xl shadow-sm overflow-hidden">
            {neighbourhoodPoints.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.label}
                  className="flex items-start gap-4 p-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] flex items-center justify-center shrink-0 mt-0.5">
                    {Icon ? (
                      <Icon className="w-4 h-4 text-[#B68A35]" />
                    ) : (
                      <span className="w-2 h-2 bg-[#B68A35] rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-[15px] text-slate-800">
                      {pt.label}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {pt.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <SourceNote text="Source: Aggregated DLD transaction data (DXBInteract), Emaar Community Management reports, verified resident feedback (Google Reviews, property forums, Q1 2025–Q1 2026)." />

          <InsightBox icon={Lightbulb} title="Why This Matters">
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

function CTASection() {
  return (
    <div className="mt-5 rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
      <div className="px-4 sm:px-5 pt-4 pb-2 border-b border-[#F2EEE8]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35]">
          Explore Emirates Hills Location
        </p>
        <h3 className="font-serif text-lg sm:text-xl text-[#1A1A1A] mt-0.5">
          with Expert Guidance
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#F2EEE8]">
        {/* Primary CTA */}
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 bg-[#B68A35]/10 rounded-xl flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base text-slate-900">
                Schedule a Location Consultation for Emirates Hills
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Speak with a local expert about commute patterns, school
                catchments, and the real day-to-day experience of living in this
                established community.
              </p>
              <button
                type="button"
                className="relative border border-[#B68A35] bg-[#B68A35] w-full h-12 flex items-center justify-center rounded-xl hover:bg-[#A07830] transition-colors mt-5"
              >
                <span className="text-white text-sm font-semibold px-10">
                  Schedule Consultation
                </span>
                <ArrowRight className="text-white absolute right-4 w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[10px] text-slate-600 text-center">
            Intent: location_consultation
          </p>
        </div>

        {/* Secondary CTA */}
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 bg-[#B68A35]/10 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base text-slate-900">
                View Comparable Completed Communities
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore how Emirates Hills compares to other mature villa
                enclaves like Arabian Ranches, Jumeirah Islands, and Palm
                Jumeirah Garden Homes.
              </p>
              <button
                type="button"
                className="relative border border-[#B68A35] bg-[#B68A35] w-full h-12 flex items-center justify-center rounded-xl hover:bg-[#B68A35]/5 transition-colors mt-5"
              >
                <span className="text-white text-sm font-semibold px-10">
                  View Comparable Communities
                </span>
                <ArrowRight className="text-white absolute right-4 w-4 h-4" />
              </button>
            </div>

          </div>

          <p className="text-[10px] text-slate-600 text-center">
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
  const [activeTab, setActiveTab] = useState("amenities");

  const renderTab = () => {
    if (activeTab === "amenities") return <AmenitiesTab />;
    if (activeTab === "driveTimes") return <DriveTimesTab />;
    return <WalkabilityTab />;
  };

  return (
    <section className="w-full bg-[#FCFBFA] font-sans antialiased">
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
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 w-full">
          <h2 className="text-3xl lg:text-5xl font-serif text-[#1A1A1A] mb-0.5">
            Location &amp; <span className="text-[#B68A35] italic">Community</span> Maturity
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
            Emirates Hills – by Emaar Properties
          </p>
        </div>
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-2 sm:px-6 pb-5 sm:pb-10 -mt-24 sm:-mt-28 lg:-mt-32">
        {/* ── Source Transparency ── */}
        <div className="mt-5 rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white p-4 sm:p-5 flex gap-3 items-start">
          <div className="w-9 h-9 rounded-lg bg-[#B68A35]/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#B68A35]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35] mb-1">
              Source Transparency
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
        <div className="mt-5 rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-[#F2EEE8] bg-[#FAF9F6]">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3.5 text-sm font-semibold transition-colors ${active
                      ? "text-[#B68A35] border-b-2 border-[#B68A35] bg-white"
                      : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden xs:inline sm:inline">{tab.label}</span>
                  {/* Always visible on very small screens */}
                  <span className="sm:hidden">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab body */}
          <div className="pb-5">{renderTab()}</div>
        </div>

        {/* ── Neighbourhood Vibe ── */}
        <NeighbourhoodSection />

        {/* ── Map + CTAs (two-column) ── */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapSection />
          </div>
          <div className="lg:col-span-1">
            <CTASection />
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="mt-6 bg-[#FBF9F6] border border-[#F3EFE9] rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
          <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
          <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
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