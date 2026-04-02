"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GOLD = "#B68A35";
const BLUE = "#286CFF";

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

  useEffect(() => {
    setSlideIndex((prev) => Math.min(prev, Math.max(0, filteredProjects.length - visibleCount)));
  }, [filteredProjects.length, visibleCount]);

  const maxIndex = Math.max(0, filteredProjects.length - visibleCount);

  const handlePrev = () => setSlideIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setSlideIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section
      className="py-6 lg:py-8"
      style={{ background: t.isDark ? "#1a1c1f" : t.bg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
          style={{ color: t.text }}
        >
          {data.h2}
        </h2>
        <p
          className="mt-3 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl"
          style={{ color: t.textSecondary }}
        >
          {data.h3}
        </p>

        {/* ── Trust Badges ── */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {data.trust_badges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: i === 0 ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.08)",
                color: GOLD,
                border: "1px solid rgba(182,138,53,0.25)",
              }}
            >
              {i === 0 && (
                <Image
                  src="/home/RERA%20Verified.svg"
                  alt="RERA Verified"
                  width={16}
                  height={16}
                />
              )}
              {badge}
            </span>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="mt-8 flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-theme md:flex-wrap md:overflow-visible">
          {tabs.map((tab, i) => {
            const isActive = activeTab === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(i);
                  setSlideIndex(0);
                }}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  background: isActive
                    ? "rgba(182,138,53,0.15)"
                    : "transparent",
                  color: isActive ? GOLD : t.textMuted,
                  border: `1px solid ${isActive ? "rgba(182,138,53,0.4)" : t.cardBorder}`,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Project Cards Slider ── */}
        <div className="mt-10">
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              onClick={handlePrev}
              disabled={slideIndex === 0}
              className="w-9 h-9 rounded-full inline-flex items-center justify-center disabled:opacity-40"
              style={{ border: `1px solid ${t.cardBorder}`, color: t.text }}
              aria-label="Previous projects"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={slideIndex >= maxIndex}
              className="w-9 h-9 rounded-full inline-flex items-center justify-center disabled:opacity-40"
              style={{ border: `1px solid ${t.cardBorder}`, color: t.text }}
              aria-label="Next projects"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${slideIndex * (100 / visibleCount)}%)` }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shrink-0 basis-full lg:basis-[31.5%]"
                  style={{
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
          className="mt-12 p-5 sm:p-6 rounded-2xl"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder}`,
          }}
        >
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: t.textSecondary }}
          >
            We don&apos;t show everything - only what stands out.
          </p>
          <p
            className="mt-3 text-sm sm:text-base leading-relaxed"
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
