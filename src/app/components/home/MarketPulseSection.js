"use client";

import { useMemo, useState } from "react";
import {
  ArrowUp,
  BarChart3,
  Building2,
  Coins,
  Download,
  ExternalLink,
  Landmark,
  Lightbulb,
  MapPin,
  Minus,
  Percent,
  PieChart,
  Search,
  ShieldCheck,
  Tag,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SectionImageHeader from "../home-page-common/SectionImageHeader";

const GOLD = "#B68A35";
const GREEN = "#15803D";
const MUTED_GOLD = "rgba(182,138,53,0.12)";

const METRIC_ICONS = [Building2, Tag, BarChart3, Coins, TrendingUp, Percent];
const TAB_ICONS = [PieChart, MapPin, Building2];
const AREA_ICONS = [Landmark, PieChart, Building2, MapPin, TrendingUp, Tag];

const titleWithAccent = (title) => {
  const [before, ...afterParts] = title.split("Deep Dive");
  if (afterParts.length === 0) return title;

  return (
    <>
      {before}
      <span style={{ color: GOLD }}>Deep Dive</span>
      {afterParts.join("Deep Dive")}
    </>
  );
};

const sectionLabel = (label) => (
  <div className="mb-4 flex items-center gap-2">
    <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ color: GOLD }}>
      <Search size={18} strokeWidth={1.8} />
    </span>
    <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: "inherit" }}>
      {label}
    </h3>
    <span className="h-px flex-1" style={{ background: "rgba(182,138,53,0.18)" }} />
  </div>
);

const TrendLine = ({ trend, direction }) => {
  const isUp = direction === "up";

  return (
    <div className="mt-3 flex items-center gap-1.5 text-sm font-medium" style={{ color: isUp ? GREEN : GOLD }}>
      {isUp ? <ArrowUp size={15} /> : <Minus size={15} />}
      {trend.replace("↑ ", "").replace("↔ ", "")}
    </div>
  );
};

const DonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const first = data[0] || { value: 0, label: "", color: GOLD };
  const second = data[1] || { value: 0, label: "", color: "#E6E2DC" };
  const firstPct = total > 0 ? first.value / total : 0;
  const firstDegrees = firstPct * 360;
  const gapDegrees = 3.5;
  const readyColor = "#E3DED7";

  return (
    <div className="relative mx-auto h-64 w-64 lg:h-56 lg:w-56">
      <div
        className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)]"
        style={{
          background: `conic-gradient(from 135deg, ${first.color} 0deg ${firstDegrees}deg, #ffffff ${firstDegrees}deg ${firstDegrees + gapDegrees}deg, ${readyColor} ${firstDegrees + gapDegrees}deg 360deg)`,
        }}
      />
      <div className="absolute inset-[32%] rounded-full bg-white shadow-[0_2px_18px_rgba(15,23,42,0.08)]" />
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div>
          <div className="text-xs font-bold uppercase leading-tight" style={{ color: "#334155" }}>
            Jan 2026
          </div>
          <div className="text-[10px] font-bold uppercase leading-tight" style={{ color: "#334155" }}>
            Sales Activity
          </div>
        </div>
      </div>
      <div className="absolute left-[25%] top-[45%] -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <div className="text-2xl font-bold leading-none drop-shadow-sm">{first.value}%</div>
        <div className="mt-1 text-xs leading-none">{first.label}</div>
      </div>
      <div className="absolute right-[15%] top-[48%] -translate-y-1/2 text-center" style={{ color: "#1f2937" }}>
        <div className="text-xl font-bold leading-none">{second.value}%</div>
        <div className="mt-1 text-xs leading-none">{second.label}</div>
      </div>
    </div>
  );
};

const SourceRow = ({ source, t }) => (
  <div
    className="mt-5 flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
    style={{
      color: t.textMuted,
      background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(182,138,53,0.05)",
    }}
  >
    <ShieldCheck size={17} style={{ color: GOLD }} />
    <span>
      <span style={{ color: GOLD }}>Source:</span> {source}
    </span>
  </div>
);

const MarketPulseSection = ({ data }) => {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const metrics = data.metrics || [];
  const tabs = data.tabs || [];
  const currentTab = tabs[activeTab] || {};
  const footer = data.footer || {};
  const footerText = (footer.attribution || "").replace("{{date}}", data.last_updated);

  const tableRows = useMemo(() => currentTab.table_data || [], [currentTab.table_data]);
  const barRows = currentTab.bar_data || [];

  return (
    <section className="py-8 lg:py-10" style={{ background: t.bg }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7 hidden lg:block">
          <div className="mb-4 flex justify-end">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap"
              style={{ background: "rgba(182,138,53,0.12)", color: GOLD }}
            >
              Updated: {data.last_updated}
            </span>
          </div>
          <SectionImageHeader
            title={titleWithAccent(data.h2)}
            subtitle={data.h3}
            t={t}
            imageSrc="/projects/villa-render-2.jpg"
            minHeight={270}
            className="rounded-b-[28px]"
            contentClassName="py-9"
          />
        </div>

        <div
          className="relative mb-7 overflow-hidden rounded-[24px] border p-5 lg:hidden"
          style={{
            borderColor: t.cardBorder,
            background: t.isDark ? t.cardBg : "#fffdfa",
          }}
        >
          <span
            className="mb-5 inline-flex text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap"
            style={{ background: "rgba(182,138,53,0.12)", color: GOLD }}
          >
            Updated: {data.last_updated}
          </span>
          <h2 className="font-serif text-[2.2rem] font-semibold leading-[1.05]" style={{ color: t.text }}>
            {titleWithAccent(data.h2)}
          </h2>
          <p className="mt-4 text-sm leading-7" style={{ color: t.textSecondary }}>
            {data.h3}
          </p>
        </div>

        <div style={{ color: t.text }}>{sectionLabel("Key Market Metrics")}</div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-6 lg:gap-3">
          {metrics.map((metric, index) => {
            const Icon = METRIC_ICONS[index] || BarChart3;
            return (
              <div
                key={metric.label}
                className="rounded-2xl border p-4 shadow-sm lg:min-h-[176px]"
                style={{
                  borderColor: t.cardBorder,
                  background: t.isDark ? "rgba(255,255,255,0.035)" : "#ffffff",
                  boxShadow: t.isDark
                    ? "0 14px 34px rgba(0,0,0,0.18)"
                    : "0 14px 36px rgba(15,23,42,0.06)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Icon size={27} strokeWidth={1.65} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                  <h4 className="text-sm font-semibold leading-snug" style={{ color: t.text }}>
                    {metric.label}
                  </h4>
                </div>
                <div className="mt-4 font-serif text-[1.8rem] leading-none lg:text-[1.55rem]" style={{ color: t.text }}>
                  {metric.value}
                  {metric.sub_value && index === 3 ? (
                    <span className="ml-1 text-[1.25rem]">{metric.sub_value}</span>
                  ) : null}
                </div>
                {metric.sub_value && index !== 3 ? (
                  <p className="mt-1 text-xs" style={{ color: t.textSecondary }}>
                    {metric.sub_value}
                  </p>
                ) : null}
                <TrendLine trend={metric.trend} direction={metric.trend_direction} />
                <p className="mt-2 text-xs leading-5" style={{ color: t.textMuted }}>
                  {metric.context}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8" style={{ color: t.text }}>
          {sectionLabel("Deep Dive Analysis")}
        </div>

        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            borderColor: t.cardBorder,
            background: t.isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
          }}
        >
          <div className="grid grid-cols-3 border-b" style={{ borderColor: t.cardBorder }}>
            {tabs.map((tab, index) => {
              const Icon = TAB_ICONS[index] || PieChart;
              const isActive = activeTab === index;
              const label = index === 0 ? "Market Flow" : index === 1 ? "Price Map" : "Top Areas";

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className="relative flex min-h-[72px] items-center justify-center gap-2 border-r px-2 text-xs font-semibold uppercase last:border-r-0 sm:text-sm"
                  style={{
                    color: isActive ? GOLD : t.textMuted,
                    borderColor: t.cardBorder,
                    background: isActive
                      ? t.isDark
                        ? "rgba(182,138,53,0.08)"
                        : "rgba(182,138,53,0.04)"
                      : "transparent",
                  }}
                >
                  <Icon size={21} strokeWidth={1.65} />
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: GOLD }} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-5 lg:p-7">
            {currentTab.chart_type === "donut" && (
              <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-center">
                <div>
                  <h4 className="font-serif text-2xl font-semibold leading-tight" style={{ color: t.text }}>
                    {currentTab.title}
                  </h4>
                  <p className="mt-1 text-lg" style={{ color: t.text }}>
                    {currentTab.sub_title}
                  </p>
                  <div className="lg:hidden">
                    <DonutChart data={currentTab.chart_data || []} />
                  </div>
                </div>
                <div className="hidden lg:block">
                  <DonutChart data={currentTab.chart_data || []} />
                </div>
                <p className="text-base leading-8 lg:col-start-2 lg:row-start-1 lg:row-end-3" style={{ color: t.textSecondary }}>
                  {currentTab.content}
                </p>
                <div className="lg:col-span-2">
                  <SourceRow source={currentTab.source} t={t} />
                </div>
              </div>
            )}

            {currentTab.chart_type === "table" && (
              <div>
                <h4 className="font-serif text-2xl font-semibold leading-tight" style={{ color: t.text }}>
                  {currentTab.title} <span style={{ color: GOLD }}>{currentTab.sub_title}</span>
                </h4>
                <p className="mt-2 max-w-4xl text-base leading-7" style={{ color: t.textSecondary }}>
                  {currentTab.intro}
                </p>
                <div className="mt-5 overflow-hidden rounded-xl border" style={{ borderColor: t.cardBorder }}>
                  {tableRows.map((row, index) => {
                    const Icon = AREA_ICONS[index] || Landmark;
                    return (
                      <div
                        key={row.area}
                        className="grid grid-cols-[48px_1fr] items-center border-b last:border-b-0 lg:grid-cols-[52px_1.2fr_1fr_1.6fr]"
                        style={{ borderColor: t.cardBorder }}
                      >
                        <div className="flex min-h-[62px] items-center justify-center" style={{ color: GOLD }}>
                          <Icon size={24} strokeWidth={1.55} />
                        </div>
                        <div className="py-3 pr-3">
                          <div className="font-semibold" style={{ color: t.text }}>
                            {row.area}
                          </div>
                          <div className="text-xs leading-5 lg:hidden" style={{ color: t.textSecondary }}>
                            {row.insight}
                          </div>
                        </div>
                        <div className="col-start-2 border-t py-3 pr-3 font-serif text-lg font-semibold lg:col-start-auto lg:border-t-0 lg:text-base" style={{ color: GOLD, borderColor: t.cardBorder }}>
                          {row.price}
                        </div>
                        <div className="hidden py-3 text-sm leading-6 lg:block" style={{ color: t.textSecondary }}>
                          {row.insight}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <SourceRow source={currentTab.source} t={t} />
              </div>
            )}

            {currentTab.chart_type === "bar" && (
              <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr_280px] lg:items-start">
                <div>
                  <h4 className="font-serif text-2xl font-semibold leading-tight" style={{ color: t.text }}>
                    {currentTab.title} <span style={{ color: GOLD }}>{currentTab.sub_title}</span>
                  </h4>
                  <p className="mt-3 text-base leading-7" style={{ color: t.textSecondary }}>
                    {currentTab.intro}
                  </p>
                </div>
                <div className="space-y-0 overflow-hidden rounded-xl">
                  {barRows.map((row, index) => (
                    <div
                      key={row.area}
                      className="grid grid-cols-[42px_1fr_auto] items-center border-b py-3 last:border-b-0"
                      style={{ borderColor: t.cardBorder }}
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold"
                        style={{
                          color: index === 0 ? "#ffffff" : GOLD,
                          background: index === 0 ? GOLD : "transparent",
                          borderColor: "rgba(182,138,53,0.45)",
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="font-semibold" style={{ color: t.text }}>
                        {row.area}
                      </span>
                      <span className="font-serif font-semibold" style={{ color: GOLD }}>
                        {row.display}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: "rgba(182,138,53,0.18)",
                    background: t.isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 font-semibold" style={{ color: GOLD }}>
                    <Lightbulb size={20} />
                    Key Insight
                  </div>
                  <p className="mt-3 text-sm leading-7" style={{ color: t.textSecondary }}>
                    {currentTab.insight}
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <SourceRow source={currentTab.source} t={t} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="mt-5 grid gap-5 rounded-2xl border p-5 lg:grid-cols-[1fr_460px] lg:items-center"
          style={{
            borderColor: t.cardBorder,
            background: t.isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
          }}
        >
          <div className="flex gap-3">
            <ShieldCheck size={30} className="shrink-0" style={{ color: GOLD }} />
            <div>
              <h4 className="font-bold uppercase tracking-wide" style={{ color: t.text }}>
                Data Integrity & Attribution
              </h4>
              <div className="mt-3 h-px w-24" style={{ background: GOLD }} />
              <p className="mt-4 text-sm leading-7" style={{ color: t.textSecondary }}>
                {footerText}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: GOLD }}
            >
              <Download size={17} />
              {footer.primary_cta}
            </button>
            <a
              href={footer.secondary_link_url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              style={{
                color: t.text,
                border: `1px solid ${GOLD}`,
                background: t.isDark ? "rgba(255,255,255,0.02)" : "#ffffff",
              }}
            >
              {footer.secondary_link_text}
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPulseSection;
