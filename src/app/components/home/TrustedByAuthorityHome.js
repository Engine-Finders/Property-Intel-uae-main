"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import SectionImageHeader from "../home-page-common/SectionImageHeader";
import SectionExpertCta from "../home-page-common/cta-common";

const GOLD = "#B68A35";
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

const getBadgeIconSrc = (text = "") => {
  const normalized = text.toLowerCase();
  if (normalized.includes("dld")) return "/home/DLD%20Data%20Verified%20icon.svg";
  if (normalized.includes("analytics")) return "/home/Market%20Analysis.svg";
  if (normalized.includes("rera")) return "/home/RERA%20Verified.svg";
  if (normalized.includes("research users")) return "/home/User%20icon.svg";
  return null;
};

const badgeLines = (text = "") => {
  const lower = text.toLowerCase();
  if (lower.includes("dld")) return { line1: "Data Verified", line2: "Against DLD Records" };
  if (lower.includes("dxbinteract")) return { line1: "Market Analytics", line2: "Powered by DXBinteract.com" };
  if (lower.includes("rera")) return { line1: "RERA-Compliant", line2: "Information" };
  if (lower.includes("research users")) return { line1: "5,000+ Monthly", line2: "Research Users" };
  return { line1: text, line2: "" };
};

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
  const validationBg = isDark ? "rgba(255,255,255,0.04)" : "#fbf8f1";
  const badgeStripBg = isDark ? "rgba(255,255,255,0.03)" : "#faf7f2";

  const ctaConfig = {
    heading: data.footer?.primary_cta ?? "Start Your Investment Research",
    subtext: data.footer?.secondary_cta ?? "Get a Free Investment Consultation",
  };

  const sectionTitle = data.h2 ?? "Trusted by";
  const sectionAccent = data.h2_accent ?? "Global Investors & Industry Partners";

  return (
    <section style={{ background: sectionBg }} className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Desktop header */}
        <div className="mb-6 hidden lg:block">
          <SectionImageHeader
            title={sectionTitle}
            accent={sectionAccent}
            subtitle={data.h3}
            t={t}
            imageSrc="/developer/finance-section.webp"
            className="rounded-[28px] border"
            contentClassName="max-w-3xl"
          />
          <div className="mt-4 flex justify-end">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap"
              style={{ background: "rgba(182,138,53,0.12)", color: GOLD }}
            >
              Last Updated: {data.last_updated}
            </span>
          </div>
        </div>

        {/* Mobile header */}
        <div className="mb-6 lg:hidden">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: t.text }}>
            {sectionTitle}{" "}
            <span style={{ color: GOLD }}>{sectionAccent}</span>
          </h2>
          <span
            className="inline-flex text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap mb-3"
            style={{ background: "rgba(182,138,53,0.12)", color: GOLD }}
          >
            Last Updated: {data.last_updated}
          </span>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: bodyColor }}>
            {data.h3}
          </p>
        </div>

        {/* Trust statement + shield */}
        <div
          className="flex items-start gap-3 text-xs md:text-sm px-4 py-3 md:px-5 md:py-4 rounded-xl mb-6 md:mb-8"
          style={{
            background: validationBg,
            border: `1px solid ${GOLD_BORDER}`,
            color: bodyColor,
          }}
        >
          <ShieldCheck size={26} className="shrink-0 mt-0.5" style={{ color: GOLD }} strokeWidth={1.65} aria-hidden />
          <span>{data.trust_statement}</span>
        </div>

        {/* Trust badges — desktop: single row with dividers */}
        <div
          className="mb-10 hidden overflow-hidden rounded-xl border md:flex"
          style={{
            background: badgeStripBg,
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          }}
        >
          {data.badges.map((badge, i) => {
            const { line1, line2 } = badgeLines(badge.text);
            const iconSrc = getBadgeIconSrc(badge.text);
            return (
              <div
                key={i}
                className="flex min-w-0 flex-1 items-center gap-3 px-4 py-4 lg:px-5 lg:py-5"
                style={{
                  borderRight:
                    i < data.badges.length - 1
                      ? `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`
                      : undefined,
                }}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: isDark ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.14)" }}
                >
                  {iconSrc ? (
                    <Image src={iconSrc} alt="" width={24} height={24} />
                  ) : (
                    <span className="text-lg">{badge.icon}</span>
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight" style={{ color: t.text }}>
                    {line1}
                  </p>
                  {line2 ? (
                    <p className="mt-1 text-xs leading-snug" style={{ color: subtextColor }}>
                      {line2}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust badges — mobile: 2×2 grid */}
        <div className="mb-10 md:hidden">
          <p
            className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: GOLD }}
          >
            Data sources &amp; trust signals
          </p>
          <div
            className="grid grid-cols-2 overflow-hidden rounded-xl border"
            style={{
              background: badgeStripBg,
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            }}
          >
            {data.badges.map((badge, i) => {
              const { line1, line2 } = badgeLines(badge.text);
              const iconSrc = getBadgeIconSrc(badge.text);
              const divider = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
              return (
                <div
                  key={i}
                  className="flex flex-col items-center px-3 py-5 text-center"
                  style={{
                    borderRight: i % 2 === 0 ? `1px solid ${divider}` : undefined,
                    borderBottom: i < 2 ? `1px solid ${divider}` : undefined,
                  }}
                >
                  <span
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: isDark ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.14)" }}
                  >
                    {iconSrc ? (
                      <Image src={iconSrc} alt="" width={24} height={24} />
                    ) : (
                      <span className="text-lg">{badge.icon}</span>
                    )}
                  </span>
                  <p className="text-xs font-bold leading-tight" style={{ color: t.text }}>
                    {line1}
                  </p>
                  {line2 ? (
                    <p className="mt-1 text-[11px] leading-snug" style={{ color: subtextColor }}>
                      {line2}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
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
                      src={`/${item.image}`}
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

        <div className="mt-8">
          <SectionExpertCta cta={ctaConfig} t={t} />
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
