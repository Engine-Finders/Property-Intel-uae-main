"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_LIGHT = "#D4A84B";
const GOLD_BORDER = "rgba(182,138,53,0.25)";
const INITIAL_COUNT = 10;

const TopDevelopersSection = ({ data }) => {
  const { t } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const isDark = t.bg === "#232528" || t.bg === "#1a1a2e";
  const cardBg = isDark ? "#2a2d31" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const bodyColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const sectionBg = isDark ? t.bg : "#FBF9F6";
  const placeholderBg = isDark ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.08)";

  const visible = showAll ? data.developers : data.developers.slice(0, INITIAL_COUNT);

  return (
    <section style={{ background: sectionBg }} className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: t.text }}>
            {data.title}
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: bodyColor }}>
            {data.subtitle}
          </p>
        </div>

        {/* Developer Grid - 2 cols mobile, 3 tablet, 5 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {visible.map((dev, i) => {
            const href = dev.link || "/developer";
            const rawIconSrc = dev.icon_src || dev.iconSrc || "";
            const iconSrc =
              rawIconSrc && !rawIconSrc.startsWith("/")
                ? `/${rawIconSrc}`
                : rawIconSrc;
            const iconAlt = dev.icon_alt || dev.iconAlt || dev.name;

            return (
              <Link
                key={i}
                href={href}
                className="flex flex-col items-center justify-center gap-3 rounded-xl p-4 md:p-5 transition-transform hover:scale-[1.03] cursor-pointer"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  boxShadow: isDark
                    ? "0 2px 8px rgba(0,0,0,0.25)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {/* JSON-driven icon (with fallback to first letter) */}
                <div
                  className="relative w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    background: placeholderBg,
                    border: `1px solid ${GOLD_BORDER}`,
                  }}
                >
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt={iconAlt}
                      fill
                      sizes="(max-width: 768px) 88px, 88px"
                      className=""
                    />
                  ) : (
                    <span
                      className="text-lg md:text-xl font-bold"
                      style={{ color: GOLD }}
                    >
                      {dev.name.charAt(0)}
                    </span>
                  )}
                </div>

                <span
                  className="text-xs md:text-sm font-semibold text-center leading-tight"
                  style={{ color: t.text }}
                >
                  {dev.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* See More / See Less */}
        {data.developers.length > INITIAL_COUNT && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-transform hover:scale-[1.02]"
              style={{ border: `1.5px solid ${GOLD}`, color: GOLD, background: "transparent" }}
            >
              {showAll ? "Show Less ▲" : `See All Developers ▼`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDevelopersSection;
