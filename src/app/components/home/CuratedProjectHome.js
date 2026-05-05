"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Home,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";
import SectionImageHeader from "../home-page-common/SectionImageHeader";

const GOLD = "#B68A35";

const TAB_ICONS = [Home, BarChart3, Target, UserRound];
const TRUST_ICONS = [ShieldCheck, CalendarDays];

const titleWithDubai = (title) => {
  const [beforeDubai, ...afterDubaiParts] = title.split("Dubai");
  if (afterDubaiParts.length === 0) return title;

  return (
    <>
      {beforeDubai}
      <span style={{ color: GOLD }}>Dubai</span>
      {afterDubaiParts.join("Dubai")}
    </>
  );
};

const CuratedProjectsSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const tabs = data.tabs || [];
  const activeTabId = tabs[activeTab]?.id;
  const filteredProjects = useMemo(() => {
    if (!activeTabId) return data.projects || [];
    return (data.projects || []).filter((project) => project.tab_id === activeTabId);
  }, [data.projects, activeTabId]);

  const [visibleCount, setVisibleCount] = useState(1);
  useEffect(() => {
    const updateVisible = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 3 : 1);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, filteredProjects.length - visibleCount);
  const safeSlideIndex = Math.min(slideIndex, maxIndex);
  const cardBasis = visibleCount === 1 ? "100%" : "calc((100% - 3rem) / 3)";
  const slideTransform =
    visibleCount === 1
      ? `translateX(calc(-${safeSlideIndex * 100}% - ${safeSlideIndex * 1.5}rem))`
      : `translateX(calc(-${(safeSlideIndex * 100) / 3}% - ${safeSlideIndex * 0.5}rem))`;

  const handlePrev = () => setSlideIndex((prev) => Math.max(0, Math.min(prev, maxIndex) - 1));
  const handleNext = () => setSlideIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section
      className="py-8 lg:py-10"
      style={{ background: t.isDark ? "#1a1c1f" : t.bg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <SectionImageHeader
          title={titleWithDubai(data.h2)}
          subtitle={data.h3}
          t={t}
          imageSrc="/projects/villa-render-2.jpg"
          minHeight={250}
          className="mb-6 hidden rounded-b-[28px] lg:block"
          contentClassName="py-10"
        />

        <div className="text-center lg:hidden">
          <h2
            className="mx-auto max-w-[360px] font-serif text-[2.1rem] font-semibold leading-[1.05]"
            style={{ color: t.text }}
          >
            {titleWithDubai(data.h2)}
          </h2>
          <p
            className="mx-auto mt-3 max-w-[360px] text-sm leading-6"
            style={{ color: t.textSecondary }}
          >
            {data.h3}
          </p>
        </div>

        {/* ── Trust Badges ── */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {data.trust_badges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.72)",
                color: GOLD,
                border: "1px solid rgba(182,138,53,0.18)",
              }}
            >
              {(() => {
                const Icon = TRUST_ICONS[i] || ShieldCheck;
                return <Icon size={16} strokeWidth={1.8} />;
              })()}
              {badge}
            </span>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div
          className="mt-7 grid grid-cols-4 overflow-hidden rounded-2xl border lg:mt-8"
          style={{
            borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)",
            background: t.isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.70)",
            boxShadow: t.isDark
              ? "0 16px 38px rgba(0,0,0,0.20)"
              : "0 16px 42px rgba(15,23,42,0.05)",
          }}
        >
          {tabs.map((tab, i) => {
            const isActive = activeTab === i;
            const Icon = TAB_ICONS[i] || Target;
            return (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(i);
                  setSlideIndex(0);
                }}
                className="relative flex min-h-[86px] flex-col items-center justify-center gap-2 border-r px-2 py-3 text-center text-[10px] font-semibold transition-all duration-200 last:border-r-0 sm:text-xs lg:min-h-[68px] lg:flex-row lg:gap-3 lg:text-sm"
                style={{
                  background: isActive
                    ? t.isDark
                      ? "rgba(182,138,53,0.10)"
                      : "rgba(182,138,53,0.06)"
                    : "transparent",
                  color: isActive ? GOLD : t.textMuted,
                  borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)",
                }}
              >
                <Icon size={24} strokeWidth={1.55} />
                <span className="max-w-[92px] leading-tight lg:max-w-none">{tab.label}</span>
                {isActive && (
                  <span
                    className="absolute inset-x-4 bottom-0 h-0.5 rounded-full"
                    style={{ background: GOLD }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Project Cards Slider ── */}
        <div className="relative mt-10">
          <div className="flex items-center justify-end gap-2 mb-4 lg:absolute lg:left-0 lg:right-0 lg:top-1/2 lg:z-20 lg:-translate-y-1/2 lg:justify-between lg:px-0 lg:pointer-events-none">
            <button
              onClick={handlePrev}
              disabled={safeSlideIndex === 0}
              className="w-9 h-9 rounded-full inline-flex items-center justify-center disabled:opacity-40 lg:-ml-5 lg:h-12 lg:w-12 lg:pointer-events-auto"
              style={{
                border: `1px solid ${t.cardBorder}`,
                color: GOLD,
                background: t.cardBg,
                boxShadow: t.isDark
                  ? "0 14px 32px rgba(0,0,0,0.24)"
                  : "0 14px 32px rgba(15,23,42,0.08)",
              }}
              aria-label="Previous projects"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={safeSlideIndex >= maxIndex}
              className="w-9 h-9 rounded-full inline-flex items-center justify-center disabled:opacity-40 lg:-mr-5 lg:h-12 lg:w-12 lg:pointer-events-auto"
              style={{
                border: `1px solid ${t.cardBorder}`,
                color: GOLD,
                background: t.cardBg,
                boxShadow: t.isDark
                  ? "0 14px 32px rgba(0,0,0,0.24)"
                  : "0 14px 32px rgba(15,23,42,0.08)",
              }}
              aria-label="Next projects"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300"
              style={{ transform: slideTransform }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shrink-0"
                  style={{
                    flexBasis: cardBasis,
                    background: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                  }}
                >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.image_alt || project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(182,138,53,0.08) 0%, rgba(59,74,107,0.12) 100%)`,
                    }}
                  />
                )}
                {project.rera_verified && (
                  <span
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider z-10"
                    style={{
                      background: "#22c55e",
                      color: "#ffffff",
                    }}
                  >
                    <Image src="/home/RERA%20Verified.svg" alt="RERA Verified" width={16} height={16} />
                    RERA Verified
                  </span>
                )}
                {/* Gradient overlay at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${t.cardBg}, transparent)` }}
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 px-5 pb-5 pt-1 relative">
                {/* Developer */}
                <p
                  className="text-[11px] font-medium uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: t.textMuted }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: GOLD }}
                  />
                  {project.developer}
                </p>

                {/* Title */}
                <h3
                  className="mt-1.5 text-base sm:text-lg font-bold leading-snug"
                  style={{ color: t.text }}
                >
                  {project.title}
                </h3>

                {/* KPI Strip */}
                <div
                  className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 py-3 px-3 rounded-xl"
                  style={{
                    background: t.bg,
                    border: `1px solid ${t.cardBorder}`,
                  }}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Price</p>
                    <p className="text-sm font-bold" style={{ color: GOLD }}>{project.price}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Yield</p>
                    <p className="text-sm font-bold" style={{ color: "#22C55E" }}>{project.yield}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Handover</p>
                    <p className="text-sm font-bold" style={{ color: t.text }}>{project.handover}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Plan</p>
                    <p className="text-sm font-bold" style={{ color: t.text }}>{project.plan || "N/A"}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold"
                      style={{
                        background: "rgba(182,138,53,0.08)",
                        color: GOLD,
                        border: "1px solid rgba(182,138,53,0.15)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Why + Best fit */}
                <p
                  className="mt-3 text-xs sm:text-sm leading-relaxed flex-1"
                  style={{ color: t.textSecondary }}
                >
                  <span className="font-semibold" style={{ color: t.text }}>
                    Why this is here:
                  </span>{" "}
                  {project.why_this_is_here}
                </p>
                <p
                  className="mt-2 text-xs sm:text-sm leading-relaxed flex-1"
                  style={{ color: t.textSecondary }}
                >
                  <span className="font-semibold" style={{ color: t.text }}>
                    Best for:
                  </span>{" "}
                  {project.best_for}
                </p>

                {/* CTA */}
                <button
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    color: GOLD,
                    border: "1px solid rgba(182,138,53,0.35)",
                    background: "rgba(182,138,53,0.06)",
                  }}
                >
                  {project.cta}
                  <ArrowRight size={14} />
                </button>
              </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="mt-10 rounded-2xl p-5 text-center sm:p-6 lg:mx-auto lg:max-w-3xl"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder}`,
          }}
        >
          <div className="font-serif text-5xl leading-none" style={{ color: GOLD }}>
            “
          </div>
          <p
            className="-mt-4 text-sm font-semibold sm:text-base"
            style={{ color: t.text }}
          >
            We don&apos;t show everything - <span style={{ color: GOLD }}>only what stands out.</span>
          </p>
          <p
            className="mt-3 text-sm leading-relaxed sm:text-base"
            style={{ color: t.textSecondary }}
          >
            Each project is selected based on location strength, pricing, demand, and long-term potential - so you can focus on what actually matters instead of sorting through hundreds of listings.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CuratedProjectsSection;
