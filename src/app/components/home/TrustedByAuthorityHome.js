"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";


const GOLD = "#B68A35";
const GOLD_LIGHT = "#D4A84B";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

// const avatarMap = {
//   "testimonial-rajiv.jpg": rajivImg,
//   "testimonial-mukesh.jpg": mukeshImg,
//   "testimonial-sarfaraz.jpg": sarfarazImg,
//   "testimonial-karl.jpg": karlImg,
//   "testimonial-yevgeny.jpg": yevgenyImg,
// };

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={GOLD} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const TrustedBySection = ({ data }) => {
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
    el.scrollBy({ left: dir === "left" ? -el.clientWidth * 0.75 : el.clientWidth * 0.75, behavior: "smooth" });
  };

  const isDark = t.bg === "#232528" || t.bg === "#1a1a2e";
  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const sectionBg = isDark ? t.bg : "#FBF9F6";

  return (
    <section style={{ background: sectionBg }} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: t.text }}>
              Trusted by <span style={{ color: GOLD }}>Global Investors</span> & Industry Partners
            </h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: bodyColor }}>
              {data.h3}
            </p>
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap self-start"
            style={{ background: "rgba(182,138,53,0.12)", color: GOLD }}
          >
            Last Updated: {data.last_updated}
          </span>
        </div>

        {/* Trust statement */}
        <div
          className="inline-flex items-start gap-2 text-xs md:text-sm px-4 py-2.5 rounded-lg mb-8"
          style={{
            background: isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.06)",
            border: `1px solid ${GOLD_BORDER}`,
            color: bodyColor,
          }}
        >
          <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0">✓</span>
          <span>{data.trust_statement}</span>
        </div>

        {/* Trust badges row */}
        <div className="flex flex-wrap gap-3 mb-10">
          {data.badges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-full"
              style={{
                background: isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.06)",
                border: `1px solid ${GOLD_BORDER}`,
                color: t.text,
              }}
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Testimonial slider */}
        <div className="relative">
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

          {canScrollLeft && (
            <div
              className="hidden md:block absolute left-0 top-0 bottom-0 w-12 z-[5] pointer-events-none"
              style={{ background: `linear-gradient(to right, ${sectionBg}, transparent)` }}
            />
          )}
          {canScrollRight && (
            <div
              className="hidden md:block absolute right-0 top-0 bottom-0 w-12 z-[5] pointer-events-none"
              style={{ background: `linear-gradient(to left, ${sectionBg}, transparent)` }}
            />
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {data.testimonials.map((item, i) => {
              const isExpanded = expandedCard === i;
            
              return (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-xl flex flex-col overflow-hidden"
                  style={{
                    width: "300px",
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    scrollSnapAlign: "start",
                    boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Avatar + Identity */}
                  <div className="px-5 pt-5 pb-4 flex items-center gap-3" style={{ borderBottom: `1px solid ${cardBorder}` }}>
                    <img
                      src="s"
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      style={{ border: `2px solid ${GOLD_BORDER}` }}
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold truncate" style={{ color: t.text }}>{item.name}</h4>
                      <p className="text-[11px]" style={{ color: subtextColor }}>{item.location}</p>
                      <p className="text-[10px] font-medium" style={{ color: GOLD }}>{item.profile}</p>
                    </div>
                  </div>

                  {/* Rating + headline */}
                  <div className="px-5 pt-3">
                    <StarRating count={item.rating} />
                    <h5 className="text-xs font-bold mt-2 leading-snug" style={{ color: t.text }}>
                      "{item.headline}"
                    </h5>
                  </div>

                  {/* Testimonial body */}
                  <div className="px-5 pt-2 pb-4 flex-1 flex flex-col">
                    <p
                      className="text-xs leading-relaxed mb-3"
                      style={{
                        color: bodyColor,
                        display: "-webkit-box",
                        WebkitLineClamp: isExpanded ? "unset" : 4,
                        WebkitBoxOrient: "vertical",
                        overflow: isExpanded ? "visible" : "hidden",
                      }}
                    >
                      {item.testimonial}
                    </p>

                    {/* Outcome - shown on expand */}
                    {isExpanded && (
                      <div
                        className="text-xs p-2.5 rounded-lg mb-3"
                        style={{
                          background: "rgba(182,138,53,0.08)",
                          border: `1px solid ${GOLD_BORDER}`,
                          color: bodyColor,
                        }}
                      >
                        <span className="font-semibold" style={{ color: GOLD }}>Outcome:</span>{" "}
                        {item.outcome}
                      </div>
                    )}

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.badges.map((badge, j) => (
                        <span
                          key={j}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(34,197,94,0.10)",
                            color: "#16a34a",
                            border: "1px solid rgba(34,197,94,0.2)",
                          }}
                        >
                          ✓ {badge}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : i)}
                      className="text-[11px] font-semibold mt-auto self-start"
                      style={{ color: GOLD }}
                    >
                      {isExpanded ? "Show Less ▲" : "Read More ▼"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Context statement */}
        <div className="mt-8 text-center max-w-3xl mx-auto">
          <p className="text-xs leading-relaxed mb-1" style={{ color: bodyColor }}>{data.context_primary}</p>
          <p className="text-[10px] leading-relaxed" style={{ color: subtextColor }}>{data.context_secondary}</p>
          <p className="text-[10px] mt-2 font-medium" style={{ color: subtextColor }}>
            📊 Data Sources: {data.data_sources}
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            className="px-6 py-3 rounded-lg font-semibold text-sm text-white transition-transform hover:scale-[1.02] w-full sm:w-auto"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
          >
            {data.footer.primary_cta}
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold text-sm transition-transform hover:scale-[1.02] w-full sm:w-auto"
            style={{ border: `1.5px solid ${GOLD}`, color: GOLD, background: "transparent" }}
          >
            {data.footer.secondary_cta}
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default TrustedBySection;
