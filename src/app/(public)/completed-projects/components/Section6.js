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
import { useThemeStyles } from '@/app/components/context/themeStyles';

const GOLD = "#B68A35";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

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

function SourceNote({ text, isDark, bodyColor, subtextColor }) {
  return (
    <div className="flex gap-3 items-start mt-4 px-4 pb-4">
      <GrSun className="w-4 h-4 text-[#B68A35] shrink-0 mt-0.5" />
      <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>{text}</p>
    </div>
  );
}

function InsightBox({ icon: Icon, title, children, isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div className="mt-5 rounded-2xl p-4 sm:p-5 flex gap-3 items-start" 
      style={{ border: `1px solid ${cardBorder}`, background: isDark ? 'rgba(182,138,53,0.06)' : '#FAF9F6' }}>
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

function AccordionRow({ title, children, points, isOpen, onToggle, isDark, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: cardBorder }}>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex gap-4 items-center p-4 text-left transition-colors ${isOpen ? "" : ""}`}
        style={{ 
          background: isOpen && isDark ? 'rgba(255,255,255,0.04)' : isOpen ? '#FAF9F6' : 'transparent',
          hover: { background: isDark ? 'rgba(255,255,255,0.02)' : '#FCFAF5' }
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0 mt-0.5" />
        <span className="font-semibold text-sm sm:text-[15px] flex-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>
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
        <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
          {children && <p className="text-sm leading-relaxed pl-5 mb-2" style={{ color: bodyColor }}>{children}</p>}
          {points && (
            <ul className="space-y-2 pl-5">
              {points.map((point, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-1.5" />
                  <span className="text-sm leading-relaxed" style={{ color: bodyColor }}>{point}</span>
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

function RentalYieldsTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          Actual Achieved Rental Yields{" "}
          <span className="text-[#B68A35]">
            — Last 12 Months (Verified Transactions)
          </span>
        </h3>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5" 
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {/* Table Header */}
        <div className="hidden sm:grid sm:grid-cols-4 px-4 py-3" 
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderBottom: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Unit Configuration</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Avg. Annual Rent (Verified)</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Typical Lease Term</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Implied Gross Yield*</p>
        </div>

        {/* Table Body */}
        {rentalYields.map((item, idx) => (
          <div
            key={idx}
            className="border-b last:border-b-0 sm:grid sm:grid-cols-4 sm:items-center sm:px-4 sm:py-3"
            style={{ borderColor: cardBorder }}
          >
            {/* Left: unit + badge */}
            <div className="p-4 sm:p-0 flex items-start sm:items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] mt-1.5 sm:mt-0 shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-[15px] flex items-center gap-3" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                  <span className="truncate">{item.unitConfig}</span>
                  <span className="ml-0 inline-block text-[#B68A35] px-2 py-0.5 rounded-full text-xs font-semibold" 
                    style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0', border: `1px solid ${GOLD}/10` }}>{item.subConfig}</span>
                </p>
              </div>
            </div>

            {/* Avg rent */}
            <div className="hidden sm:flex items-center justify-start">
              <p className="text-lg lg:text-md font-bold text-[#B68A35] tracking-tight">
                {item.avgRent}
              </p>
            </div>

            {/* Lease term */}
            <div className="hidden sm:flex items-center justify-start">
              <p className="text-sm" style={{ color: bodyColor }}>{item.leaseTerm}</p>
            </div>

            {/* Yield */}
            <div className="hidden sm:flex items-center justify-start">
              <span className="text-base lg:text-lg font-bold" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.yield}</span>
            </div>

            {/* Mobile view */}
            <div className="sm:hidden px-4 pb-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm" style={{ color: isDark ? t.text : '#1A1A1A' }}>{item.unitConfig}</p>
                  <p className="text-xs mt-0.5" style={{ color: subtextColor }}>{item.subConfig}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#B68A35]">{item.avgRent}</p>
                  <p className="text-xs mt-1" style={{ color: bodyColor }}>{item.leaseTerm}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Yield:</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[#B68A35] text-xs font-semibold" 
                  style={{ background: isDark ? 'rgba(182,138,53,0.12)' : '#FDF8F0' }}>{item.yield}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SourceNote text="Gross yield calculated as (Annual Rent ÷ Current Market Value) × 100. Based on DXBInteract rental transaction records, Q1 2025–Q1 2026. Excludes service charges, utilities, and management fees." isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} />

      <InsightBox icon={Lightbulb} title="What the numbers indicate" isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t}>
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

function ServiceChargesTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          Current Service Charges{" "}
          <span className="text-[#B68A35]">
            — Verified History & Transparency
          </span>
        </h3>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-4 sm:mx-5" 
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {/* Table Header */}
        <div className="hidden sm:grid sm:grid-cols-3 px-4 py-3" 
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderBottom: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Metric</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Value</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Source</p>
        </div>

        {/* Table Body */}
        {serviceCharges.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="border-b last:border-b-0 sm:grid sm:grid-cols-3 sm:items-center sm:px-4 sm:py-3"
              style={{ borderColor: cardBorder }}
            >
              <div className="p-2 sm:p-0 flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" 
                  style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
                  <Icon className="w-4 h-4 text-[#B68A35]" />
                </div>
                <p className="font-semibold text-sm sm:text-[15px]" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                  {item.metric}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#B68A35]">
                  {item.value}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs" style={{ color: subtextColor }}>{item.source}</p>
              </div>

              {/* Mobile view */}
              <div className="sm:hidden px-4 pb-3 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs" style={{ color: subtextColor }}>Value:</span>
                  <span className="text-sm font-semibold text-[#B68A35] text-right">
                    {item.value}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-xs" style={{ color: subtextColor }}>Source:</span>
                  <span className="text-xs text-right max-w-[60%]" style={{ color: subtextColor }}>
                    {item.source}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-4 sm:mx-5 mt-4">
        <h4 className="font-semibold text-sm mb-3" style={{ color: isDark ? t.text : '#1A1A1A' }}>What service charges fund:</h4>
        <ul className="space-y-2 text-sm">
          {[
            "24/7 security personnel, CCTV infrastructure, and gate management",
            "Landscaping, irrigation, and mature tree maintenance across 25% green space allocation",
            "Lake filtration systems, water feature upkeep, and environmental management",
            "Road maintenance, street lighting, and common-area utilities",
            "Community clubhouse, fitness facilities, and amenity operations",
            "Exterior building maintenance coordination and warranty claim facilitation"
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
              <span className="text-sm" style={{ color: bodyColor }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-4 sm:mx-5 mt-5">
        <button
          type="button"
          onClick={() => setOpenIdx(openIdx === 0 ? null : 0)}
          className="w-full flex gap-3 items-center p-4 text-left rounded-xl"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', border: `1px solid ${cardBorder}` }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#B68A35] shrink-0" />
          <span className="font-semibold text-sm flex-1" style={{ color: isDark ? t.text : '#1A1A1A' }}>
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
              <p className="text-sm font-semibold mb-2" style={{ color: isDark ? t.text : '#1A1A1A' }}>Historical context:</p>
              <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
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
              <p className="text-sm font-semibold mb-2" style={{ color: isDark ? t.text : '#1A1A1A' }}>Buyer guidance:</p>
              <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
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

      <SourceNote text="Source: DLD Mollak Service Charge Index, Q4 2025; Emaar Historical Brochures; Owners' Association Budget Records." isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} />
    </div>
  );
}

function SalesComparablesTab({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  return (
    <div>
      <div className="px-4 sm:px-5 pt-5 pb-3">
        <h3 className="text-xl sm:text-2xl font-serif leading-snug" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          Recent Sales Comparables{" "}
          <span className="text-[#B68A35]">
            — Verified DXBInteract Transactions (Last 12 Months)
          </span>
        </h3>
      </div>

      <div className="rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden mx-2 sm:mx-5" 
        style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
        {/* Table Header */}
        <div className="hidden lg:grid lg:grid-cols-6 px-2 sm:px-4 py-2 sm:py-3" 
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6', borderBottom: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Unit Type</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Built-up Area</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Sale Price</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Price/Sqft</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Date</p>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: subtextColor }}>Plot Feature</p>
        </div>

        {/* Table Body */}
        {salesComparables.map((item, idx) => (
          <div
            key={idx}
            className="border-b last:border-b-0 lg:grid lg:grid-cols-6 lg:items-center lg:px-4 lg:py-3"
            style={{ borderColor: cardBorder }}
          >
            <div className="p-4 lg:p-0">
              <p className="font-semibold text-sm lg:text-[15px]" style={{ color: isDark ? t.text : '#1A1A1A' }}>
                {item.unitType}
              </p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm" style={{ color: bodyColor }}>{item.builtUp}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-[#B68A35]">{item.salePrice}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm" style={{ color: bodyColor }}>{item.pricePerSqft}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm" style={{ color: subtextColor }}>{item.date}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs" style={{ color: subtextColor }}>{item.feature}</p>
            </div>

            {/* Mobile view */}
            <div className="lg:hidden px-4 pb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Built-up:</span>
                <span className="text-sm font-medium" style={{ color: bodyColor }}>{item.builtUp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Sale Price:</span>
                <span className="text-sm font-semibold text-[#B68A35]">{item.salePrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Price/sqft:</span>
                <span className="text-sm font-medium" style={{ color: bodyColor }}>{item.pricePerSqft}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: subtextColor }}>Date:</span>
                <span className="text-xs" style={{ color: subtextColor }}>{item.date}</span>
              </div>
              <div className="pt-2" style={{ borderTop: `1px solid ${cardBorder}` }}>
                <p className="text-xs" style={{ color: subtextColor }}>
                  <span className="font-medium">Feature:</span> {item.feature}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SourceNote text="Source: DXBInteract.com (official DLD transaction data), filtered for Emirates Hills villa sales, Q1 2025–Q1 2026. Excludes off-market private transactions and non-disclosed deals." isDark={isDark} bodyColor={bodyColor} subtextColor={subtextColor} />

      <InsightBox icon={TrendingUp} title="Market insight" isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t}>
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

function LessonsLearnedSection({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden" 
      style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <div className="px-4 sm:px-5 py-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <p className="text-xs font-bold uppercase tracking-widest text-[#B68A35]">Post-Handover Reality</p>
        <h3 className="font-serif text-lg sm:text-xl mt-0.5" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          Lessons Learned & Current Considerations
        </h3>
      </div>

      <div className="divide-y" style={{ borderColor: cardBorder }}>
        {lessonsLearned.map((item, idx) => (
          <AccordionRow
            key={idx}
            title={item.title}
            isOpen={openIdx === idx}
            onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            points={item.points}
            isDark={isDark}
            cardBorder={cardBorder}
            bodyColor={bodyColor}
            subtextColor={subtextColor}
            t={t}
          >
            {item.content}
          </AccordionRow>
        ))}
      </div>
    </div>
  );
}

// ─── WHAT THIS MEANS SECTION ─────────────────────────────────────────────────

function WhatThisMeansSection({ isDark, cardBg, cardBorder, bodyColor, subtextColor, t }) {
  const [openEndUser, setOpenEndUser] = useState(true);
  const [openInvestor, setOpenInvestor] = useState(false);
  const [openChecklist, setOpenChecklist] = useState(false);

  return (
    <div className="mt-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden" 
      style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
      <div className="px-4 sm:px-5 py-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <h3 className="font-serif text-lg sm:text-xl" style={{ color: isDark ? t.text : '#1A1A1A' }}>
          What This Means for Buyers
        </h3>
      </div>

      <div className="p-2 sm:p-4 space-y-4">
        {/* End Users */}
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          <button
            type="button"
            onClick={() => setOpenEndUser(!openEndUser)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openEndUser ? "" : ""}`}
            style={{ background: openEndUser && isDark ? 'rgba(255,255,255,0.04)' : openEndUser ? '#FAF9F6' : 'transparent' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" 
              style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
              <Home className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
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
            <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
              <p className="text-sm leading-relaxed pl-[52px]" style={{ color: bodyColor }}>
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
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          <button
            type="button"
            onClick={() => setOpenInvestor(!openInvestor)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openInvestor ? "" : ""}`}
            style={{ background: openInvestor && isDark ? 'rgba(255,255,255,0.04)' : openInvestor ? '#FAF9F6' : 'transparent' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" 
              style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
              <TrendingUp className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
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
            <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
              <p className="text-sm leading-relaxed pl-[52px]" style={{ color: bodyColor }}>
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
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          <button
            type="button"
            onClick={() => setOpenChecklist(!openChecklist)}
            className={`w-full flex gap-3 items-center p-2 text-left transition-colors ${openChecklist ? "" : ""}`}
            style={{ background: openChecklist && isDark ? 'rgba(255,255,255,0.04)' : openChecklist ? '#FAF9F6' : 'transparent' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" 
              style={{ background: isDark ? 'rgba(182,138,53,0.15)' : '#B68A35/10' }}>
              <CheckCircle className="w-5 h-5 text-[#B68A35]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base" style={{ color: isDark ? t.text : '#1A1A1A' }}>
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
            <div className="px-4 pb-4" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#FAF9F6' }}>
              <ul className="space-y-2 text-sm pl-[52px]">
                {[
                  "Request the last 3 years of service charge statements and owners' association budgets",
                  "Commission an independent building survey focused on age-related systems (HVAC, electrical, exterior finishes)",
                  "Verify the full DLD transaction history for the specific plot via the Dubai REST app",
                  "Confirm Emaar Community Management's current response protocols for maintenance requests",
                  "If planning renovations, engage a RERA-licensed contractor early to assess approval feasibility and timelines"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B68A35] shrink-0 mt-2" />
                    <span className="text-sm" style={{ color: bodyColor }}>{item}</span>
                  </li>
                ))}
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
  const { t, isDark, dark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState("rentalYields");

  // Card colors matching TopDevelopersSection pattern
  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const sectionBg = isDark ? t.bg : "#FCFBFA";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

  const renderTab = () => {
    if (activeTab === "rentalYields") return <RentalYieldsTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    if (activeTab === "serviceCharges") return <ServiceChargesTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
    return <SalesComparablesTab isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />;
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
            Financial Reality — <span className="text-[#B68A35] italic">Emirates Hills</span> by Emaar
          </h2>
          <p className="mt-2 text-sm sm:text-base font-medium" style={{ color: bodyColor }}>
            ROI, Service Charges & Comparables
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
        <div className="mt-5 rounded-xl shadow-sm overflow-hidden" style={{ border: `1px solid ${cardBorder}`, background: cardBg }}>
          <div className="flex" style={{ borderBottom: `1px solid ${cardBorder}` }}>
            <div className="flex w-full overflow-x-auto">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 py-3 lg:py-6 px-1 lg:px-4 transition-all relative ${activeTab === tab.key && !isDark ? "text-[#B68A35] bg-[#FDF8F0]/50" : !isDark && activeTab !== tab.key ? "text-gray-400 hover:text-gray-600 hover:bg-gray-50" : ""}`}
                    style={
                      isDark && activeTab === tab.key
                        ? { color: GOLD, background: 'rgba(182,138,53,0.08)' }
                        : isDark && activeTab !== tab.key
                        ? { color: subtextColor, background: 'transparent' }
                        : undefined
                    }
                  >
                    <span className="text-base lg:text-xl"><Icon /></span>
                    <span className={`text-[10px] lg:text-sm tracking-wide whitespace-nowrap ${activeTab === tab.key ? "font-bold" : "font-medium"}`}>
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
        <LessonsLearnedSection isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

        {/* ── What This Means ── */}
        <WhatThisMeansSection isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} bodyColor={bodyColor} subtextColor={subtextColor} t={t} />

        {/* ── Disclaimer ── */}
        <div className="mt-6 rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start" 
          style={{ background: isDark ? 'rgba(182,138,53,0.06)' : '#FBF9F6', border: `1px solid ${cardBorder}` }}>
          <LuInfo className="text-[#B68A35] text-2xl shrink-0 mt-0.5" />
          <p className="text-xs lg:text-sm leading-relaxed" style={{ color: bodyColor }}>
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