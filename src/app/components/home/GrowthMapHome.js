"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import GrowthMap from "../sub-components/GrowthMap";
import {
  ArrowRight,
  BarChart3,
  Clock,
  MapPin,
  Plane,
  Shield,
  TrainFront,
  Waves,
  LineChart,
  Info,
} from "lucide-react";

const GOLD = "#B68A35";
const STAT_ICON_BLUE = "#2563eb";

const renderAccentText = (text, accent) => {
  if (!text || !accent || !text.includes(accent)) return text;
  return text.split(accent).map((part, index, parts) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && (
        <span
          className="font-semibold"
          style={{ color: GOLD, fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {accent}
        </span>
      )}
    </span>
  ));
};

const highlightText = (text, phrases = []) => {
  if (!text || !phrases?.length) return text;
  const pattern = new RegExp(
    `(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );
  return text.split(pattern).map((part, index) => {
    const hit = phrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase());
    return hit ? (
      <strong key={`${part}-${index}`} style={{ color: GOLD }}>
        {part}
      </strong>
    ) : (
      part
    );
  });
};

const TabIcon = ({ type, active }) => {
  const color = active ? GOLD : "#9ca3af";
  const props = { size: 22, strokeWidth: 1.6, color };
  if (type === "plane") return <Plane {...props} />;
  if (type === "train") return <TrainFront {...props} />;
  return <Waves {...props} />;
};

const StatCardIcon = ({ icon }) => {
  if (!icon) return null;
  const blue = icon === "train" || icon === "map_pin";
  const c = blue ? STAT_ICON_BLUE : GOLD;
  if (icon === "train") return <TrainFront size={18} color={c} strokeWidth={2} />;
  if (icon === "map_pin") return <MapPin size={18} color={c} strokeWidth={2} />;
  if (icon === "chart") return <LineChart size={18} color={c} strokeWidth={2} />;
  return null;
};

const GrowthMapSection = ({ data }) => {
  const { t } = useTheme();
  const zones = data.zones ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const zone = zones[activeIdx] ?? zones[0];

  const disclaimer = (data.footer?.disclaimer ?? "").replace("{{date}}", data.last_updated);

  return (
    <section style={{ background: t.bgAlt }} className="py-8 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Desktop: header + map row ── */}
        <div className="mb-8 grid gap-8 lg:mb-10 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <div className="flex flex-col">
            <span
              className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide"
              style={{
                background: "rgba(182,138,53,0.08)",
                border: "1px solid rgba(182,138,53,0.22)",
                color: GOLD,
              }}
            >
              <Clock size={14} strokeWidth={2} />
              {data.last_updated_label} {data.last_updated}
            </span>

            {/* Mobile headline */}
            <h2
              className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:hidden"
              style={{ color: t.text }}
            >
              {data.h2_mobile ? (
                <>
                  <span className="block" style={{ color: t.text }}>
                    {data.h2_mobile.line1}
                  </span>
                  <span
                    className="mt-1 block font-semibold"
                    style={{ color: GOLD, fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {data.h2_mobile.line2}
                  </span>
                </>
              ) : (
                renderAccentText(data.h2, data.h2_accent)
              )}
            </h2>

            {/* Desktop headline */}
            <h2
              className="mb-4 hidden text-3xl font-bold leading-tight sm:text-4xl lg:block lg:text-[2.35rem] lg:leading-[1.15]"
              style={{ color: t.text }}
            >
              {renderAccentText(data.h2, data.h2_accent)}
            </h2>

            <p
              className="mb-6 max-w-xl text-sm leading-relaxed sm:text-base"
              style={{ color: t.textMuted }}
            >
              {data.h3}
            </p>

            <div
              className="mt-auto flex items-start gap-3 rounded-xl border-l-4 p-4 sm:p-5"
              style={{
                background: "rgba(182,138,53,0.06)",
                borderColor: GOLD,
              }}
            >
              <Shield size={22} className="mt-0.5 shrink-0" style={{ color: GOLD }} strokeWidth={1.5} />
              <p
                className="text-sm italic leading-relaxed lg:not-italic"
                style={{ color: t.textMuted }}
              >
                {data.trust_statement}
              </p>
            </div>
          </div>

          <div className="flex min-h-[260px] flex-col lg:min-h-[320px]">
            <GrowthMap map={data.map} />
          </div>
        </div>

        {/* ── Tabs (horizontal row; stacked icon → title → subtitle per tab) ── */}
        <div
          className="mb-6 flex w-full flex-row divide-x rounded-xl p-1.5"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${t.cardBorder}`,
            borderColor: t.isDark ? "rgba(255,255,255,0.08)" : t.cardBorder,
            "--tw-divide-opacity": 1,
            "--tw-divide-color": t.isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb",
          }}
          role="tablist"
        >
          {zones.map((z, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={z.tab_title}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveIdx(i)}
                className="relative flex min-w-0 flex-1 basis-0 flex-col items-center gap-1.5 px-1.5 py-3 transition-all sm:px-3 sm:py-3.5"
                style={{
                  background: active
                    ? (t.isDark ? "rgba(255,255,255,0.09)" : "#fff")
                    : "transparent",
                  borderRadius: active ? 12 : 0,
                  boxShadow: active
                    ? (t.isDark ? "0 2px 14px rgba(0,0,0,0.35)" : "0 2px 14px rgba(0,0,0,0.08)")
                    : "none",
                  borderBottom: active ? `3px solid ${GOLD}` : "3px solid transparent",
                }}
              >
                <TabIcon type={z.icon} active={active} />
                <span className="w-full min-w-0 text-center">
                  <span
                    className="block text-xs font-bold leading-tight sm:text-sm"
                    style={{ color: active ? t.text : "#9ca3af" }}
                  >
                    {z.tab_title}
                  </span>
                  <span
                    className="mt-1 block px-0.5 text-[10px] leading-snug sm:text-[11px]"
                    style={{ color: active ? t.textMuted : "#9ca3af" }}
                  >
                    {z.tab_subtitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Zone detail ── */}
        {zone && (
          <div
            className="mb-10 overflow-hidden rounded-2xl shadow-sm lg:mb-12"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
          >
            <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)_minmax(0,300px)]">
              {/* Hero + overlay stats */}
              <div className="relative aspect-[16/11] min-h-[220px] w-full lg:aspect-auto lg:min-h-[340px]">
                <Image
                  src={zone.hero_image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority={activeIdx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-3 sm:p-4 lg:gap-3 lg:p-5">
                  {(zone.stat_cards ?? []).map((card, idx) => (
                    <div
                      key={idx}
                      className="flex min-w-[130px] flex-1 items-center gap-2 rounded-lg px-3 py-2.5 shadow-md sm:min-w-[150px] sm:px-3.5"
                      style={{
                        background: t.isDark ? "rgba(20,23,27,0.88)" : "rgba(255,255,255,0.94)",
                        border: `1px solid ${t.isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.6)"}`,
                      }}
                    >
                      {card.icon ? (
                        <StatCardIcon icon={card.icon} />
                      ) : null}
                      <div className="min-w-0">
                        <p className="text-lg font-bold leading-tight sm:text-xl" style={{ color: GOLD }}>
                          {card.value}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug sm:text-xs" style={{ color: t.textMuted }}>
                          {card.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy */}
              <div className="flex flex-col justify-center px-5 py-6 sm:px-6 lg:py-8">
                <h3
                  className="mb-4 text-2xl font-bold leading-tight sm:text-3xl"
                  style={{ color: GOLD, fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {zone.headline}
                </h3>
                <p className="text-sm leading-relaxed sm:text-base" style={{ color: t.textSecondary }}>
                  {highlightText(zone.content, zone.content_highlights)}
                </p>
              </div>

              {/* Sidebar stats + CTA (desktop / large tablet) */}
              <div
                className="hidden flex-col justify-center gap-4 border-t px-5 py-6 sm:px-6 lg:flex lg:border-l lg:border-t-0 lg:py-8"
                style={{ borderColor: t.cardBorder }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(182,138,53,0.1)", color: GOLD }}
                  >
                    <BarChart3 size={22} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-snug" style={{ color: t.text }}>
                      {zone.key_stat}
                    </p>
                    {zone.key_stat_source ? (
                      <p className="mt-1 text-xs" style={{ color: t.textMuted }}>
                        {zone.key_stat_source}
                      </p>
                    ) : null}
                  </div>
                </div>

                <span
                  className="inline-flex w-fit max-w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{
                    background: "rgba(182,138,53,0.08)",
                    border: `1px solid rgba(182,138,53,0.25)`,
                    color: GOLD,
                  }}
                >
                  <MapPin size={14} strokeWidth={2} />
                  {zone.keyword_tag}
                </span>

                <Link
                  href={zone.cta_link || "#"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-92"
                  style={{ background: GOLD }}
                >
                  {zone.cta_label}
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>
              </div>
            </div>

            {/* Mobile-only: key row + CTA below grid */}
            <div className="border-t px-5 py-4 lg:hidden" style={{ borderColor: t.cardBorder }}>
              <div className="mb-4 flex flex-wrap items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(182,138,53,0.1)", color: GOLD }}
                >
                  <BarChart3 size={20} strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold" style={{ color: t.text }}>
                    {zone.key_stat}
                  </p>
                  {zone.key_stat_source ? (
                    <p className="mt-0.5 text-xs" style={{ color: t.textMuted }}>
                      {zone.key_stat_source}
                    </p>
                  ) : null}
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold"
                  style={{
                    background: "rgba(182,138,53,0.08)",
                    border: `1px solid rgba(182,138,53,0.25)`,
                    color: GOLD,
                  }}
                >
                  <MapPin size={13} strokeWidth={2} />
                  {zone.keyword_tag}
                </span>
              </div>
              <Link
                href={zone.cta_link || "#"}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-center text-sm font-semibold text-white"
                style={{ background: GOLD }}
              >
                {zone.cta_label}
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>
          </div>
        )}

        {/* ── Footer: methodology ── */}
        <div
          className="overflow-hidden rounded-2xl shadow-sm"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div className="p-5 sm:p-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-8 lg:p-8">
            <div>
              <h4
                className="mb-3 flex items-center gap-2 text-lg font-bold sm:text-xl"
                style={{ color: t.text, fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: "rgba(182,138,53,0.1)", color: GOLD }}
                >
                  <Shield size={22} strokeWidth={1.5} />
                </div>
                {data.footer.title}
              </h4>
              <p className="max-w-3xl text-sm leading-relaxed" style={{ color: t.textMuted }}>
                {data.footer.attribution}
              </p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3 lg:mt-0 lg:min-w-[300px] lg:max-w-md">
              <Link
                href={data.footer.primary_cta_link || "#"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-92"
                style={{ background: GOLD }}
              >
                {data.footer.primary_cta}
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <Link
                href={data.footer.secondary_cta_link || "#"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 bg-transparent px-5 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ color: GOLD, borderColor: GOLD }}
              >
                {data.footer.secondary_cta}
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div
            className="flex items-start gap-2 border-t px-5 py-4 sm:px-6 lg:px-8"
            style={{ borderColor: t.cardBorder }}
          >
            <Info size={16} className="mt-0.5 shrink-0" style={{ color: GOLD }} strokeWidth={2} />
            <p className="text-left text-xs leading-relaxed" style={{ color: t.textMuted }}>
              {disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthMapSection;
