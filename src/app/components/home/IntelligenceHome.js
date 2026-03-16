"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_LIGHT = "#D4A84B";
const GOLD_BORDER = "rgba(182,138,53,0.25)";
const TECH_BLUE = "#286CFF";

const categoryColors = {
  "Legal Guide": { bg: "rgba(182,138,53,0.12)", text: GOLD },
  "Investment Strategy": { bg: "rgba(40,108,255,0.10)", text: TECH_BLUE },
  "Residency & Visa": { bg: "rgba(34,197,94,0.10)", text: "#16a34a" },
  "Financial Planning": { bg: "rgba(182,138,53,0.12)", text: GOLD },
  "Legal Protection": { bg: "rgba(168,85,247,0.10)", text: "#9333ea" },
  "Market Analysis": { bg: "rgba(40,108,255,0.10)", text: TECH_BLUE },
  "Investor Protection": { bg: "rgba(34,197,94,0.10)", text: "#16a34a" },
  "Exit Strategy": { bg: "rgba(239,68,68,0.10)", text: "#dc2626" },
};

const IntelligenceSection = ({ data }) => {
  const { t } = useTheme();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const isDark = t.bg === "#232528" || t.bg === "#1a1a2e";
  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const sectionBg = isDark ? t.bg : "#F8FAFC";

  return (
    <section style={{ background: sectionBg }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ color: t.text }}
            >
              Dubai Real <span style={{ color: GOLD }}>Estate News</span> Today
              <br className="hidden sm:block" />
              & Investment <span style={{ color: GOLD }}>Intelligence</span>
            </h2>
            <span
              className="text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap"
              style={{ background: `rgba(182,138,53,0.12)`, color: GOLD }}
            >
              Last Updated: {data.last_updated}
            </span>
          </div>
          <p
            className="text-sm md:text-base leading-relaxed mb-4"
            style={{ color: bodyColor }}
          >
            {data.h3}
          </p>
          <div
            className="inline-flex items-start gap-2 text-xs md:text-sm px-4 py-2.5 rounded-lg text-left"
            style={{
              background: isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.06)",
              color: bodyColor,
              border: `1px solid ${GOLD_BORDER}`,
            }}
          >
            <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0">✓</span>
            <span>{data.trust_statement}</span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center shadow-lg transition-transform hover:scale-110"
              style={{ background: GOLD, color: "#fff" }}
              aria-label="Scroll left"
            >
              ‹
            </button>
          )}
          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center shadow-lg transition-transform hover:scale-110"
              style={{ background: GOLD, color: "#fff" }}
              aria-label="Scroll right"
            >
              ›
            </button>
          )}

          {/* Left fade */}
          {canScrollLeft && (
            <div
              className="hidden md:block absolute left-0 top-0 bottom-0 w-12 z-[5] pointer-events-none"
              style={{
                background: `linear-gradient(to right, ${sectionBg}, transparent)`,
              }}
            />
          )}
          {/* Right fade */}
          {canScrollRight && (
            <div
              className="hidden md:block absolute right-0 top-0 bottom-0 w-12 z-[5] pointer-events-none"
              style={{
                background: `linear-gradient(to left, ${sectionBg}, transparent)`,
              }}
            />
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {data.cards.map((card, i) => {
              const catColor = categoryColors[card.category] || { bg: "rgba(182,138,53,0.12)", text: GOLD };
              const isExpanded = expandedCard === i;

              return (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-xl flex flex-col transition-shadow duration-200"
                  style={{
                    width: "280px",
                    minHeight: "340px",
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    scrollSnapAlign: "start",
                    boxShadow: isDark
                      ? "0 2px 12px rgba(0,0,0,0.3)"
                      : "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Top bar */}
                  <div
                    className="px-4 pt-4 pb-3 flex items-center justify-between gap-2"
                    style={{ borderBottom: `1px solid ${cardBorder}` }}
                  >
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: catColor.bg, color: catColor.text }}
                    >
                      {card.category}
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: subtextColor }}>
                      ⏱ {card.reading_time}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="px-4 pt-3 pb-4 flex-1 flex flex-col">
                    <h4
                      className="text-sm font-bold leading-snug mb-2.5"
                      style={{ color: t.text }}
                    >
                      {card.headline}
                    </h4>
                    <p
                      className="text-xs leading-relaxed mb-3 flex-1"
                      style={{
                        color: bodyColor,
                        display: "-webkit-box",
                        WebkitLineClamp: isExpanded ? "unset" : 4,
                        WebkitBoxOrient: "vertical",
                        overflow: isExpanded ? "visible" : "hidden",
                      }}
                    >
                      {card.summary}
                    </p>

                    {/* Key takeaway - shown on expand */}
                    {isExpanded && (
                      <div
                        className="text-xs p-2.5 rounded-lg mb-3"
                        style={{
                          background: `rgba(182,138,53,0.08)`,
                          border: `1px solid ${GOLD_BORDER}`,
                          color: bodyColor,
                        }}
                      >
                        <span className="font-semibold" style={{ color: GOLD }}>
                          Key Takeaway:
                        </span>{" "}
                        {card.key_takeaway}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : i)}
                        className="text-[11px] font-semibold transition-colors"
                        style={{ color: GOLD }}
                      >
                        {isExpanded ? "Show Less ▲" : "Read More ▼"}
                      </button>
                      <span
                        className="text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        style={{ color: GOLD_LIGHT }}
                      >
                        {card.cta} →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-transform hover:scale-[1.02] w-full sm:w-auto"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            }}
          >
            {data.footer.primary_cta}
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold text-sm transition-transform hover:scale-[1.02] w-full sm:w-auto"
            style={{
              border: `1.5px solid ${GOLD}`,
              color: GOLD,
              background: "transparent",
            }}
          >
            {data.footer.secondary_cta}
          </button>
        </div>

        {/* Attribution */}
        <p
          className="text-center text-[10px] mt-5 max-w-2xl mx-auto"
          style={{ color: subtextColor }}
        >
          {data.footer.attribution}
        </p>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default IntelligenceSection;
