"use client";
import React, { useState } from "react";
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  FileText,
  Lightbulb,
  TrendingUp,
  DollarSign,
  Home,
  Info,
  Clock,
  LineChart,
} from "lucide-react";
import { LuInfo } from "react-icons/lu";
import { GrSun } from "react-icons/gr";
import Image from "next/image";

// ─── DATA ────────────────────────────────────────────────────────────────────

const rentalYields = [
  {
    unitConfig: "5-Bedroom Villa",
    subConfig: "Standard",
    avgRent: "AED 950K – 1.2M",
    yield: "3.1 – 3.8%",
    leaseTerm: "12-month renewable",
  },
  {
    unitConfig: "6-Bedroom Villa",
    subConfig: "Extended",
    avgRent: "AED 1.4M – 1.9M",
    yield: "3.3 – 4.2%",
    leaseTerm: "12-month renewable",
  },
  {
    unitConfig: "7+ Bedroom Villa",
    subConfig: "Custom Build",
    avgRent: "AED 2.2M – 3.5M",
    yield: "3.0 – 4.0%",
    leaseTerm: "12-24 month negotiated",
  },
];

const serviceCharges = [
  {
    metric: "Current Service Charge (Avg.)",
    value: "AED 11.50/sqft annually",
    source: "DLD Mollak Index, Q4 2025",
    icon: DollarSign,
  },
  {
    metric: "Original Estimate at Launch (2003)",
    value: "AED 6.00–8.00/sqft annually",
    source: "Emaar Historical Brochures",
    icon: Clock,
  },
  {
    metric: "Cumulative Increase Since Handover",
    value: "+44 –92%",
    source: "DLD Mollak Historical Data",
    icon: TrendingUp,
  },
  {
    metric: "Annual Adjustment Trend (2010–2025)",
    value: "+3–5% average",
    source: "Owners' Association Budget Records",
    icon: LineChart,
  },
];

const salesComparables = [
  {
    unitType: "5-Bed Villa",
    builtUp: "12,450 sqft",
    salePrice: "AED 29.8M",
    pricePerSqft: "AED 2,394",
    date: "Nov 2025",
    feature: "Golf course view",
  },
  {
    unitType: "6-Bed Villa",
    builtUp: "16,200 sqft",
    salePrice: "AED 41.5M",
    pricePerSqft: "AED 2,562",
    date: "Jan 2026",
    feature: "Lake frontage",
  },
  {
    unitType: "7-Bed Villa",
    builtUp: "22,100 sqft",
    salePrice: "AED 68.2M",
    pricePerSqft: "AED 3,086",
    date: "Dec 2025",
    feature: "Corner plot, extended garden",
  },
  {
    unitType: "5-Bed Villa",
    builtUp: "11,800 sqft",
    salePrice: "AED 27.3M",
    pricePerSqft: "AED 2,314",
    date: "Oct 2025",
    feature: "Standard orientation",
  },
  {
    unitType: "6-Bed Villa",
    builtUp: "15,500 sqft",
    salePrice: "AED 39.1M",
    pricePerSqft: "AED 2,523",
    date: "Feb 2026",
    feature: "Recently renovated interior",
  },
];

const lessonsLearned = [
  {
    title: "Snagging & After-Sales Service",
    content:
      "Early residents (2003–2006 handovers) reported initial delays in snagging resolution, with wait times of 2–4 weeks for non-urgent cosmetic items. Emaar's after-sales team has since refined its processes; current warranty claims for structural items are typically addressed within 7–10 business days. For resale buyers commissioning independent surveys, budget AED 15,000–35,000 for a comprehensive building inspection given the age of assets (handed over 2003–2008).",
  },
  {
    title: "Service Charge Evolution",
    content:
      "Service charges have increased cumulatively by 44–92% since original estimates, driven by inflation, amenity enhancements, and elevated security standards. While this exceeds initial projections, the increases have been transparently communicated via annual owners' association budgets. Current charges remain competitive relative to comparable ultra-luxury communities.",
  },
  {
    title: "Age-Related Maintenance Considerations",
    content: "Villas handed over in the mid-2000s may require system updates:",
    points: [
      "HVAC units typically have a 15–20 year lifespan; many original installations are due for replacement or major servicing.",
      "Electrical panels and wiring may benefit from upgrades to support modern smart-home integration.",
      "Exterior finishes (stucco, stone cladding) may require repointing or resealing after two decades of UAE climate exposure.",
    ],
  },
  {
    title: "Renovation Approval Process",
    content:
      "Major exterior modifications require Emaar Community Management approval, with typical review timelines of 4–8 weeks. Interior renovations face fewer restrictions but must comply with building structural guidelines. Engage a RERA-licensed contractor early to assess feasibility and budget for permit-related timelines.",
  },
  {
    title: "Resale Process Clarity",
    content: "Unlike off-plan transactions, resale purchases at Emirates Hills benefit from:",
    points: [
      "Immediate mortgage eligibility (subject to bank valuation and buyer profile)",
      "Clear title deed transfer via Dubai Land Department (typically 5–7 business days post-NOC)",
      "Transparent service charge history and owners' association records",
      "Established community management protocols for maintenance requests",
    ],
  },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function SourceNote({ text }) {
  return (
    <div className="flex gap-3 items-start mt-4 px-4 pb-4">
      <GrSun className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
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

function AccordionRow({ title, children, points, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#F2EEE8] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex gap-4 items-center p-4 text-left transition-colors ${isOpen ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
          }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0 mt-0.5" />
        <span className="font-semibold text-sm sm:text-[15px] text-slate-800 flex-1">
          {title}
        </span>
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
          {children && <p className="text-sm text-slate-600 leading-relaxed pl-5 mb-2">{children}</p>}
          {points && (
            <ul className="space-y-2 pl-5">
              {points.map((point, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-1.5" />
                  <span className="text-sm text-slate-600 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

// ─── TAB CONTENT COMPONENTS ──────────────────────────────────────────────────

function RentalYieldsTab() {
  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
          Actual Achieved Rental Yields{" "}
          <span className="text-[#B68A35]">
            — Last 12 Months (Verified Transactions)
          </span>
        </h3>
      </div>

      <div className="rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden mx-4 sm:mx-5">
        {/* Table Header */}
        <div className="hidden sm:grid sm:grid-cols-4 bg-[#FAF9F6] border-b border-[#F2EEE8] px-4 py-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Unit Configuration
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Avg. Annual Rent (Verified)
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Typical Lease Term
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Implied Gross Yield*
          </p>
        </div>

        {/* Table Body */}
        {rentalYields.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-[#F2EEE8] last:border-b-0 sm:grid sm:grid-cols-4 sm:items-center sm:px-4 sm:py-3"
          >
            {/* Left: unit + badge */}
            <div className="p-4 sm:p-0 flex items-start sm:items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] mt-1.5 sm:mt-0 shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-[15px] text-slate-800 flex items-center gap-3">
                  <span className="truncate">{item.unitConfig}</span>
                  <span className="ml-0 inline-block bg-[#FDF8F0] text-[#B68A35] px-2 py-0.5 rounded-full text-xs font-semibold border border-[#FCEFD9]">{item.subConfig}</span>
                </p>
              </div>
            </div>

            {/* Avg rent (center-left) */}
            <div className="hidden sm:flex items-center justify-start">
              <p className="text-lg lg:text-md font-bold text-[#B68A35] tracking-tight">
                {item.avgRent}
              </p>
            </div>

            {/* Lease term (center-right) */}
            <div className="hidden sm:flex items-center justify-start">
              <p className="text-sm text-slate-600">{item.leaseTerm}</p>
            </div>

            {/* Yield (right) */}
            <div className="hidden sm:flex items-center justify-start">
              <span className="text-base lg:text-lg font-bold text-slate-800">{item.yield}</span>
            </div>

            {/* Mobile view */}
            <div className="sm:hidden px-4 pb-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-slate-800">{item.unitConfig}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.subConfig}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#B68A35]">{item.avgRent}</p>
                  <p className="text-xs text-slate-600 mt-1">{item.leaseTerm}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Yield:</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#FDF8F0] text-[#B68A35] text-xs font-semibold">{item.yield}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SourceNote text="Gross yield calculated as (Annual Rent ÷ Current Market Value) × 100. Based on DXBInteract rental transaction records, Q1 2025–Q1 2026. Excludes service charges, utilities, and management fees." />

      <InsightBox icon={Lightbulb} title="What the numbers indicate">
        Emirates Hills rental yields sit at the lower end of Dubai's villa
        spectrum (typically 4–6% for newer communities), reflecting its
        positioning as a capital-preservation asset rather than a high-yield
        investment. Demand is driven by executive relocations, family upgrades,
        and long-term luxury leases. Properties with recent interior updates,
        smart-home integration, or prime golf/lake views achieve rental premiums
        of 10–15% above community averages. For investors, the trade-off is
        clear: modest current income in exchange for long-term value stability
        and scarcity-driven appreciation.
      </InsightBox>
    </div>
  );
}

function ServiceChargesTab() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
          Current Service Charges{" "}
          <span className="text-[#B68A35]">
            — Verified History & Transparency
          </span>
        </h3>
      </div>

      <div className="rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden mx-4 sm:mx-5">
        {/* Table Header */}
        <div className="hidden sm:grid sm:grid-cols-3 bg-[#FAF9F6] border-b border-[#F2EEE8] px-4 py-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Metric
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Value
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Source
          </p>
        </div>

        {/* Table Body */}
        {serviceCharges.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="border-b border-[#F2EEE8] last:border-b-0 sm:grid sm:grid-cols-3 sm:items-center sm:px-4 sm:py-3"
            >
              <div className="p-2 sm:p-0 flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#B68A35]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#B68A35]" />
                </div>
                <p className="font-semibold text-sm sm:text-[15px] text-slate-800">
                  {item.metric}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#B68A35]">
                  {item.value}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-slate-500">{item.source}</p>
              </div>

              {/* Mobile view */}
              <div className="sm:hidden px-4 pb-3 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-slate-500">Value:</span>
                  <span className="text-sm font-semibold text-[#B68A35] text-right">
                    {item.value}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-xs text-slate-500">Source:</span>
                  <span className="text-xs text-slate-500 text-right max-w-[60%]">
                    {item.source}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-4 sm:mx-5 mt-4">
        <h4 className="font-semibold text-sm text-slate-800 mb-3">
          What service charges fund:
        </h4>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
            <span>24/7 security personnel, CCTV infrastructure, and gate management</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
            <span>Landscaping, irrigation, and mature tree maintenance across 25% green space allocation</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
            <span>Lake filtration systems, water feature upkeep, and environmental management</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
            <span>Road maintenance, street lighting, and common-area utilities</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
            <span>Community clubhouse, fitness facilities, and amenity operations</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
            <span>Exterior building maintenance coordination and warranty claim facilitation</span>
          </li>
        </ul>
      </div>

      <div className="mx-4 sm:mx-5 mt-5">
        <button
          type="button"
          onClick={() => setOpenIdx(openIdx === 0 ? null : 0)}
          className="w-full flex gap-3 items-center p-4 text-left bg-[#FAF9F6] rounded-xl border border-[#F2EEE8]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
          <span className="font-semibold text-sm text-slate-800 flex-1">
            Historical Context & Buyer Guidance
          </span>
          {openIdx === 0 ? (
            <ChevronUp className="w-5 h-5 text-[#B68A35]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#B68A35]" />
          )}
        </button>
        {openIdx === 0 && (
          <div className="mt-3 px-4 pb-4 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-2">
                Historical context:
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Service charges at Emirates Hills have increased gradually since
                handover (2003–2008), aligning with inflation, amenity upgrades,
                and enhanced security protocols. The most significant adjustments
                occurred during 2015–2018 (golf course refurbishment, lake system
                upgrades) and 2022–2024 (post-pandemic operational cost
                normalization). Unlike newer communities where initial estimates
                are often optimistic, Emirates Hills benefits from two decades of
                transparent budget disclosure via owners' association meetings.
                Current charges remain competitive relative to comparable
                ultra-luxury enclaves (e.g., Palm Jumeirah Garden Homes: AED
                14–18/sqft; Jumeirah Golf Estates: AED 10–13/sqft).
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-2">
                Buyer guidance:
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Request the last 3 years of service charge statements and owners'
                association budgets during due diligence. Factor in potential
                annual adjustments of 3–5% when modelling long-term holding
                costs. Properties with larger plots or premium views may incur
                marginally higher charges due to expanded landscaping scope.
              </p>
            </div>
          </div>
        )}
      </div>

      <SourceNote text="Source: DLD Mollak Service Charge Index, Q4 2025; Emaar Historical Brochures; Owners' Association Budget Records." />
    </div>
  );
}

function SalesComparablesTab() {
  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-snug">
          Recent Sales Comparables{" "}
          <span className="text-[#B68A35]">
            — Verified DXBInteract Transactions (Last 12 Months)
          </span>
        </h3>
      </div>

      <div className="rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden mx-2 sm:mx-5">
        {/* Table Header */}
        <div className="hidden lg:grid lg:grid-cols-6 bg-[#FAF9F6] border-b border-[#F2EEE8] px-2 sm:px-4 py-2 sm:py-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Unit Type
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Built-up Area
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Sale Price
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Price/Sqft
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Date
          </p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Plot Feature
          </p>
        </div>

        {/* Table Body */}
        {salesComparables.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-[#F2EEE8] last:border-b-0 lg:grid lg:grid-cols-6 lg:items-center lg:px-4 lg:py-3"
          >
            <div className="p-4 lg:p-0">
              <p className="font-semibold text-sm lg:text-[15px] text-slate-800">
                {item.unitType}
              </p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-slate-700">{item.builtUp}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-[#B68A35]">
                {item.salePrice}
              </p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-slate-700">{item.pricePerSqft}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-slate-600">{item.date}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs text-slate-500">{item.feature}</p>
            </div>

            {/* Mobile view */}
            <div className="lg:hidden px-4 pb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Built-up:</span>
                <span className="text-sm font-medium text-slate-700">
                  {item.builtUp}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Sale Price:</span>
                <span className="text-sm font-semibold text-[#B68A35]">
                  {item.salePrice}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Price/sqft:</span>
                <span className="text-sm font-medium text-slate-700">
                  {item.pricePerSqft}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Date:</span>
                <span className="text-xs text-slate-600">{item.date}</span>
              </div>
              <div className="pt-2 border-t border-[#F2EEE8]">
                <p className="text-xs text-slate-500">
                  <span className="font-medium">Feature:</span> {item.feature}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SourceNote text="Source: DXBInteract.com (official DLD transaction data), filtered for Emirates Hills villa sales, Q1 2025–Q1 2026. Excludes off-market private transactions and non-disclosed deals." />

      <InsightBox icon={TrendingUp} title="Market insight">
        The spread between transaction prices (AED 2,314–3,086/sqft) reflects the
        impact of plot position, view quality, interior condition, and
        negotiation dynamics. Golf/lake-front properties command premiums of
        15–25% over standard orientations. Recently renovated units achieve
        faster sales and stronger pricing, underscoring the value of proactive
        maintenance in a mature community. Transaction velocity remains
        selective—typical time-on-market for well-priced, turnkey villas is
        60–90 days, compared to 120+ days for properties requiring significant
        updates.
      </InsightBox>
    </div>
  );
}

// ─── LESSONS LEARNED SECTION ─────────────────────────────────────────────────

function LessonsLearnedSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="mt-5 rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
      <div className="px-4 sm:px-5 py-4 border-b border-[#F2EEE8]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35]">
          Post-Handover Reality
        </p>
        <h3 className="font-serif text-lg sm:text-xl text-[#1A1A1A] mt-0.5">
          Lessons Learned & Current Considerations
        </h3>
      </div>

      <div className="divide-y divide-[#F2EEE8]">
        {lessonsLearned.map((item, idx) => (
          <AccordionRow
            key={idx}
            title={item.title}
            isOpen={openIdx === idx}
            onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            points={item.points}
          >
            {item.content}
          </AccordionRow>
        ))}
      </div>
    </div>
  );
}

// ─── WHAT THIS MEANS SECTION ─────────────────────────────────────────────────

function WhatThisMeansSection() {
  const [openEndUser, setOpenEndUser] = useState(true);
  const [openInvestor, setOpenInvestor] = useState(false);
  const [openChecklist, setOpenChecklist] = useState(false);

  return (
    <div className="mt-5 rounded-2xl border border-[#F2EEE8] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
      <div className="px-4 sm:px-5 py-4 border-b border-[#F2EEE8]">
        <h3 className="font-serif text-lg sm:text-xl text-[#1A1A1A]">
          What This Means for Buyers
        </h3>
      </div>

      <div className="p-2 sm:p-4 space-y-4">
        {/* End Users */}
        <div className="border border-[#F2EEE8] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenEndUser(!openEndUser)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openEndUser ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
              }`}
          >
            <div className="w-10 h-10 bg-[#B68A35]/10 rounded-lg flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base text-slate-900">
                For end-users seeking a primary residence
              </p>
            </div>
            {openEndUser ? (
              <ChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
            )}
          </button>
          {openEndUser && (
            <div className="px-4 pb-4 bg-[#FAF9F6]">
              <p className="text-sm text-slate-600 leading-relaxed pl-[52px]">
                Emirates Hills offers predictable holding costs, transparent
                service charge history, and a mature community with resolved
                early-phase teething issues. Budget for potential system upgrades
                (HVAC, electrical) given the asset age, and factor in the
                renovation approval timeline if planning significant
                modifications. The resale process is streamlined compared to
                off-plan purchases, with immediate mortgage eligibility and clear
                title transfer protocols.
              </p>
            </div>
          )}
        </div>

        {/* Investors */}
        <div className="border border-[#F2EEE8] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenInvestor(!openInvestor)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openInvestor ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
              }`}
          >
            <div className="w-10 h-10 bg-[#B68A35]/10 rounded-lg flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base text-slate-900">
                For investors evaluating resale or rental strategy
              </p>
            </div>
            {openInvestor ? (
              <ChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
            )}
          </button>
          {openInvestor && (
            <div className="px-4 pb-4 bg-[#FAF9F6]">
              <p className="text-sm text-slate-600 leading-relaxed pl-[52px]">
                Current yields (3.0–4.2%) are modest but stable, reflecting the
                community's capital-preservation positioning. Capital appreciation
                has historically outpaced rental income in this asset class.
                Investors with a 5–10 year horizon may benefit from continued
                infrastructure maturation in surrounding corridors, though
                near-term liquidity remains selective. Properties with recent
                interior updates achieve rental premiums and faster resale
                velocity.
              </p>
            </div>
          )}
        </div>

        {/* Checklist */}
        <div className="border border-[#F2EEE8] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenChecklist(!openChecklist)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openChecklist ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FCFAF5]"
              }`}
          >
            <div className="w-10 h-10 bg-[#B68A35]/10 rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base text-slate-900">
                Key due diligence checklist
              </p>
            </div>
            {openChecklist ? (
              <ChevronUp className="w-5 h-5 text-[#B68A35] shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#B68A35] shrink-0" />
            )}
          </button>
          {openChecklist && (
            <div className="px-4 pb-4 bg-[#FAF9F6]">
              <ul className="space-y-2 text-sm text-slate-600 pl-[52px]">
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
                  <span>
                    Request the last 3 years of service charge statements and
                    owners' association budgets
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
                  <span>
                    Commission an independent building survey focused on
                    age-related systems (HVAC, electrical, exterior finishes)
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
                  <span>
                    Verify the full DLD transaction history for the specific plot
                    via the Dubai REST app
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
                  <span>
                    Confirm Emaar Community Management's current response
                    protocols for maintenance requests
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
                  <span>
                    If planning renovations, engage a RERA-licensed contractor
                    early to assess approval feasibility and timelines
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const TABS = [
  { key: "rentalYields", label: "Rental Yields", icon: DollarSign },
  { key: "serviceCharges", label: "Service Charges", icon: FileText },
  { key: "salesComparables", label: "Sales Comparables", icon: Home },
];

function Section6() {
  const [activeTab, setActiveTab] = useState("rentalYields");

  const renderTab = () => {
    if (activeTab === "rentalYields") return <RentalYieldsTab />;
    if (activeTab === "serviceCharges") return <ServiceChargesTab />;
    return <SalesComparablesTab />;
  };

  return (
    <section className="w-full bg-[#FCFBFA] font-sans antialiased">
      {/* ── Header ── */}
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
            Financial Reality — <span className="text-[#B68A35] italic">Emirates Hills</span> by Emaar
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
            ROI, Service Charges & Comparables
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
              All financial data presented below is aggregated from the Dubai
              Land Department (DLD) via DXBInteract.com (official DLD partner),
              DLD Mollak Service Charge Index, and verified owner association
              records. Market values, rental yields, and service charges
              represent verified transaction data and disclosed community
              budgets as of Q1 2026. Figures are estimates for informational
              purposes and may vary by plot position, customization, view, and
              condition. Always verify specific property details with a
              RERA-licensed broker and official DLD channels before transacting.
            </p>
          </div>
        </div>

        {/* ── Tabbed Panel ── */}
        <div className="mt-5 bg-white rounded-xl border border-[#F3EFE9] overflow-hidden shadow-sm">
          <div className="flex border-b border-[#F3EFE9]">
            <div className="flex w-full overflow-x-auto">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative ${activeTab === tab.key
                      ? "text-[#B68A35] bg-[#FDF8F0]/50"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    <span className="text-base lg:text-xl">
                      <Icon />
                    </span>
                    <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.key ? "font-bold" : "font-medium"
                      }`}>
                      {tab.label}
                    </span>

                    {activeTab === tab.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A35]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab body */}
          <div className="pb-5">{renderTab()}</div>
        </div>

        {/* ── Lessons Learned ── */}
        <LessonsLearnedSection />

        {/* ── What This Means ── */}
        <WhatThisMeansSection />

        {/* ── Disclaimer ── */}
        <div className="mt-6 bg-[#FBF9F6] border border-[#F3EFE9] rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
          <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
          <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
            All financial data is for educational and research purposes only.
            PropertyIntel.ae does not provide financial, legal, or investment
            advice. Market values, rental yields, service charges, and
            transaction data are estimates based on aggregated third-party
            sources and are subject to change. Verify all details with the Dubai
            Land Department, licensed real estate brokers, and official
            developer channels before making any commitment.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section6;