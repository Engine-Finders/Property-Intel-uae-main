"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Building2,
  RefreshCw,
  ShieldCheck,
  Info,
  Lock,
  MapPin,
  Search,
  User,
  Users,
} from "lucide-react";
import SectionExpertCta from "../home-page-common/cta-common";

const METRIC_BADGE_ICONS = [Users, Building2, RefreshCw];

const GOLD = "#B68A35";
/** Match project HeroSection subtitle / UnitMix eyebrow readability */
const SUBTITLE_GREY = "#2d2d2d";

const splitMetricLabel = (label) => {
  const parts = label.split(" ");
  return {
    value: parts[0] || label,
    label: parts.slice(1).join(" "),
  };
};

const TypeAheadDropdown = ({
  placeholder,
  options,
  value,
  onChange,
  onSelect,
  t,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const placeholderClass = t.isDark
    ? "placeholder:text-[#B68A35] lg:placeholder:text-[#6b7a99]"
    : "placeholder:text-[#B68A35] lg:placeholder:text-[#64748b]";

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const safeOptions = options || [];
  const filtered = value
    ? safeOptions.filter((opt) =>
        opt.toLowerCase().includes(value.toLowerCase()),
      )
    : safeOptions;

  return (
    <div className="relative flex-1" ref={ref}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-[15px] leading-5 bg-transparent outline-none ${placeholderClass}`}
        style={{ color: t.text }}
      />
      {open && filtered.length > 0 && (
        <div
          className="absolute top-full left-0 z-50 w-full min-w-[200px] rounded-lg shadow-xl mt-1"
          style={{
            background: t.isDark ? "#2a2d33" : "#ffffff",
            border: `1px solid ${t.cardBorder}`,
          }}
        >
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-[15px] leading-5 transition-colors"
                style={{ color: t.text }}
                onMouseEnter={(e) =>
                  (e.target.style.background = t.isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.04)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HomeHeroSection = ({ data }) => {
  const { t } = useTheme();
  const hero = data;
  const [goldenVisa, setGoldenVisa] = useState(false);
  const [developerQuery, setDeveloperQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const trustSignals = hero.trust_signals || [];
  const topTrustSignals = trustSignals.slice(0, 3);
  const metricSignals = trustSignals.slice(3, 6);
  const [titleBeforeDubai, ...titleAfterDubaiParts] = hero.h1.split("Dubai");
  const titleAfterDubai = titleAfterDubaiParts.join("Dubai");
  const hasDubaiHighlight = titleAfterDubaiParts.length > 0;
  const cardBackground = t.isDark
    ? "rgba(24, 27, 32, 0.88)"
    : "rgba(255, 255, 255, 0.86)";
  const softBorder = t.isDark
    ? "rgba(255,255,255,0.10)"
    : "rgba(182,138,53,0.12)";
  const videoWash = t.isDark ? "rgba(0,0,0,0.16)" : "rgba(255,255,255,0.20)";
  const centerFade = t.isDark ? "rgba(7,10,16,0.72)" : "rgba(255,255,255,0.72)";
  const mobileTextFade = t.isDark
    ? "radial-gradient(circle at 18% 36%, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.46) 42%, transparent 74%)"
    : "radial-gradient(circle at 18% 36%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.66) 44%, transparent 76%)";
  const heroCopyFade = t.isDark
    ? "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.42) 56%, transparent 100%)"
    : "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.68) 56%, transparent 100%)";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: t.bg,
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[54%] lg:inset-y-0 lg:left-[40%] lg:right-0 lg:h-auto lg:w-auto xl:left-[38%]">
          <link rel="preload" as="image" href="hero-bg.webp" />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="hero-bg.webp"
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src="home.webm" type="video/webm" />
          </video>
          <div className="hero-fallback-image absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0" style={{ background: videoWash }} />
          <div
            className="absolute inset-x-0 top-0 h-[420px] lg:hidden"
            style={{ background: mobileTextFade }}
          />
          <div
            className="absolute inset-y-0 left-0 hidden w-[45%] lg:block"
            style={{
              background: `linear-gradient(to right, ${t.bg} 0%, ${t.bg} 30%, transparent 100%)`,
            }}
          />
          <div
            className="absolute inset-y-0 left-[-18%] hidden w-[44%] lg:block"
            style={{
              background: `linear-gradient(to right, ${t.bg} 0%, ${centerFade} 52%, transparent 100%)`,
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-24"
            style={{
              background: `linear-gradient(to bottom, ${t.bg}, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background: `linear-gradient(to top, ${t.bg}, transparent)`,
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[850px] w-full max-w-7xl flex-col px-3 py-8 sm:px-6 lg:mx-0 lg:min-h-[640px] lg:max-w-none lg:px-7 lg:py-11 xl:min-h-[700px] xl:px-10 2xl:px-14">
        {/* Trust badges: row on desktop, can span across fade / video */}
        {topTrustSignals.length > 0 && (
          <div
            className="relative z-20 flex w-full max-w-md flex-wrap gap-2 sm:max-w-xl sm:gap-3 md:max-w-2xl lg:absolute lg:left-7 lg:right-auto lg:top-11 lg:max-w-none lg:flex-nowrap lg:gap-3 lg:w-[min(68rem,max(32rem,calc(42vw+12rem)))] xl:left-10 xl:top-11 xl:w-[min(72rem,max(34rem,calc(44vw+14rem)))] 2xl:left-14 2xl:w-[min(76rem,max(36rem,calc(46vw+16rem)))]"
            aria-label="Trust indicators"
          >
            {topTrustSignals.map((label) => (
              <div
                key={label}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] backdrop-blur-xl sm:text-xs"
                style={{
                  color: t.isDark ? "rgba(255,255,255,0.88)" : "#4b5563",
                  borderColor: softBorder,
                  background: cardBackground,
                  boxShadow: t.isDark
                    ? "0 12px 28px rgba(0,0,0,0.22)"
                    : "0 12px 28px rgba(15,23,42,0.08)",
                }}
              >
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full"
                  style={{ background: GOLD }}
                  aria-hidden
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Desktop: narrow copy column (heading only) */}
        <div className="w-full lg:max-w-[min(640px,38vw)] xl:max-w-[min(680px,36vw)] lg:pt-14">
          <div className="relative mt-9 max-w-[660px] lg:mt-3">
            <div
              className="pointer-events-none absolute -inset-x-4 -inset-y-5 z-0 rounded-[2rem] blur-2xl lg:hidden"
              style={{ background: heroCopyFade }}
              aria-hidden="true"
            />
            <h1 className="relative z-10 max-w-[640px] text-[40px] font-[575] tracking-tight leading-[1.05] sm:text-4xl lg:text-5xl">
              {hasDubaiHighlight ? (
                <>
                  <span
                    className="block"
                    style={{ color: t.isDark ? t.text : "#0a0a0a" }}
                  >
                    {titleBeforeDubai}
                    <span style={{ color: GOLD }}>Dubai</span>
                    {titleAfterDubai}
                  </span>
                </>
              ) : (
                <span
                  className="block"
                  style={{ color: t.isDark ? t.text : "#0a0a0a" }}
                >
                  {hero.h1}
                </span>
              )}
            </h1>

            <p
              className="relative z-10 mt-3 max-w-xl text-[15px] font-medium leading-snug sm:text-lg lg:text-[16px] lg:leading-snug"
              style={{ color: t.isDark ? t.textSecondary : SUBTITLE_GREY }}
            >
              {hero.hero_description}
            </p>
          </div>
        </div>

        {/* Panels: fluid width — narrow on mobile/tablet, grows across fade on desktop */}
        <div className="mt-6 w-full max-w-md space-y-4 sm:max-w-xl md:max-w-2xl lg:mt-5 lg:max-w-none lg:w-[min(68rem,max(32rem,calc(42vw+12rem)))] xl:w-[min(72rem,max(34rem,calc(44vw+14rem)))] 2xl:w-[min(76rem,max(36rem,calc(46vw+16rem)))]">
          {metricSignals.length > 0 && (
            <div
              className="grid grid-cols-3 overflow-hidden rounded-[18px] border shadow-xl backdrop-blur-xl"
              style={{
                background: cardBackground,
                borderColor: softBorder,
                boxShadow: t.isDark
                  ? "0 24px 60px rgba(0,0,0,0.28)"
                  : "0 24px 70px rgba(15,23,42,0.14)",
              }}
            >
              {metricSignals.map((label, i) => {
                const Icon = METRIC_BADGE_ICONS[i] || ShieldCheck;
                const metric = splitMetricLabel(label);

                return (
                  <div
                    key={label}
                    className="flex min-h-[72px] items-center gap-2.5 border-r pl-2 pr-1 py-2.5 last:border-r-0 sm:gap-4 sm:px-5 lg:min-h-[88px] lg:px-6"
                    style={{ borderColor: softBorder }}
                  >
                    <Icon
                      className="h-[18px] w-[18px] shrink-0 self-center sm:h-5 sm:w-5"
                      strokeWidth={1.8}
                      style={{ color: GOLD }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1 text-left">
                      <p
                        className="text-base font-semibold leading-none tracking-tight sm:text-xl lg:text-2xl"
                        style={{ color: GOLD }}
                      >
                        {metric.value}
                      </p>
                      {metric.label.trim() ? (
                        <p
                          className="mt-1 text-[11px] font-medium leading-snug sm:text-xs"
                          style={{ color: t.isDark ? t.textSecondary : "#475569" }}
                        >
                          {metric.label}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div
            className="rounded-[18px] border p-4 shadow-xl backdrop-blur-xl lg:p-5"
            style={{
              background: cardBackground,
              borderColor: softBorder,
              boxShadow: t.isDark
                ? "0 24px 60px rgba(0,0,0,0.30)"
                : "0 26px 70px rgba(15,23,42,0.11)",
            }}
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1.1fr]">
              <label
                className="flex min-h-[56px] items-center gap-3 rounded-xl border px-4"
                style={{ background: t.cardBg, borderColor: t.cardBorder }}
              >
                <Building2 size={18} style={{ color: GOLD }} />
                <input
                  type="text"
                  placeholder="Project Name"
                  className={`w-full bg-transparent text-[15px] leading-5 outline-none ${
                    t.isDark
                      ? "placeholder:text-[#9aa3b2]"
                      : "placeholder:text-[#64748b]"
                  }`}
                  style={{ color: t.text }}
                />
              </label>

              <div
                className="flex min-h-[56px] items-center gap-3 rounded-xl border px-4"
                style={{ background: t.cardBg, borderColor: t.cardBorder }}
              >
                <User size={18} style={{ color: GOLD }} />
                <TypeAheadDropdown
                  placeholder="Developer"
                  options={hero.developer_options}
                  value={developerQuery}
                  onChange={setDeveloperQuery}
                  onSelect={(val) => setDeveloperQuery(val)}
                  t={t}
                />
              </div>

              <div
                className="flex min-h-[56px] items-center gap-3 rounded-xl border px-4"
                style={{ background: t.cardBg, borderColor: t.cardBorder }}
              >
                <MapPin size={18} style={{ color: GOLD }} />
                <TypeAheadDropdown
                  placeholder="Location (e.g. Dubai Marina, JVC, Downtown Dubai)"
                  options={hero.location_options}
                  value={locationQuery}
                  onChange={setLocationQuery}
                  onSelect={(val) => setLocationQuery(val)}
                  t={t}
                />
              </div>
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.35fr] lg:items-center">
              <button
                onClick={() => setGoldenVisa(!goldenVisa)}
                className="flex min-h-[48px] items-center gap-3 rounded-xl px-1 text-left text-[13px] font-medium leading-5"
                style={{ color: t.text }}
                type="button"
              >
                <span
                  className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors"
                  style={{
                    background: goldenVisa ? GOLD : "rgba(182,138,53,0.84)",
                  }}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      goldenVisa ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
                <span>{hero.golden_visa_toggle}</span>
                <Info size={16} style={{ color: t.textMuted }} />
              </button>

              <button
                type="button"
                className="flex min-h-[56px] items-center justify-center gap-3 rounded-xl px-6 text-[15px] font-semibold leading-5 text-white transition-opacity hover:opacity-95"
                style={{ background: GOLD }}
              >
                <Search size={20} />
                Search Projects
              </button>
            </div>
          </div>

          <div
            className="[&_span.text-left>span:first-of-type]:!text-[1rem] [&_span.text-left>span:first-of-type]:!leading-snug sm:[&_span.text-left>span:first-of-type]:!text-[1.0625rem] [&_span.text-left>span:last-of-type]:!mt-1 [&_span.text-left>span:last-of-type]:!text-xs [&_span.text-left>span:last-of-type]:!leading-snug [&_span.text-left>span:last-of-type]:lg:!mt-0.5 [&_span.text-left>span:last-of-type]:lg:!leading-normal"
          >
            <SectionExpertCta cta={hero.expert_cta} t={t} />
          </div>

          <div
            className="flex items-center gap-2 text-[13px] leading-5"
            style={{ color: t.textMuted }}
          >
            <Lock size={14} />
            Secure. Transparent. Data-Driven.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
