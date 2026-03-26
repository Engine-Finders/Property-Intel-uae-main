"use client";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight } from "lucide-react";

const GOLD = "#B68A35";
const BLUE = "#286CFF";

const CuratedProjectsSection = ({ data }) => {
  const { t } = useTheme();
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <section style={{ background: t.bg }} className="py-6 lg:py-8">
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

        {/* ── Filter Pills ── */}
        <div className="mt-8 flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-theme md:flex-wrap md:overflow-visible">
          {data.filters.map((filter, i) => {
            const isGolden = filter.toLowerCase().includes("golden visa");
            const isActive = activeFilter === i;
            return (
              <button
                key={i}
                onClick={() => setActiveFilter(i)}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  background: isActive
                    ? isGolden ? "rgba(182,138,53,0.15)" : t.cardBg
                    : "transparent",
                  color: isActive ? GOLD : t.textMuted,
                  border: `1px solid ${isActive ? "rgba(182,138,53,0.4)" : t.cardBorder}`,
                }}
              >
                {isGolden && "🏅 "}{filter}
              </button>
            );
          })}
        </div>

        {/* ── Project Cards Grid ── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
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
                    <p className="text-sm font-bold" style={{ color: t.text }}>{project.plan}</p>
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

                {/* Description */}
                <p
                  className="mt-3 text-xs sm:text-sm leading-relaxed flex-1"
                  style={{ color: t.textSecondary }}
                >
                  {project.description}
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

        {/* ── Footer ── */}
        <div
          className="mt-12 p-5 sm:p-6 rounded-2xl"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder}`,
          }}
        >
          <h4
            className="text-sm font-bold mb-2"
            style={{ color: t.text }}
          >
            Transparency & Methodology
          </h4>
          <p
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: t.textSecondary }}
          >
            {data.footer.note}
          </p>
          <button
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style={{ color: GOLD }}
          >
            {data.footer.secondary_link_text}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CuratedProjectsSection;
