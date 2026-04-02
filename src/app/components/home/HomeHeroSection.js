"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  ArrowRight,
  Building2,
  Calendar,
  Database,
  RefreshCw,
  ShieldCheck,
  Square,
  CheckSquare,
  Users,
} from "lucide-react";

/** Dummy icons per badge (same order as hero.trust_signals); swap later if needed */
const TRUST_BADGE_ICONS = [
  ShieldCheck,
  Database,
  Calendar,
  Users,
  Building2,
  RefreshCw,
];

const GOLD = "#B68A35";

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
        className={`w-full px-4 py-3 text-sm bg-transparent outline-none ${placeholderClass}`}
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
                className="w-full text-left px-4 py-2.5 text-sm transition-colors"
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
  /** Barely visible table-style borders (mobile only; cleared at lg) */
  const mobileBadgeBorder = t.isDark ? "rgba(255,255,255,0.09)" : "rgba(15,23,42,0.08)";

  return (
    <section className="relative overflow-hidden" style={{ background: t.bg }}>
      {/* Mobile: Video behind headings area only */}
      <div className="block lg:hidden absolute inset-0 z-0">
        <div className="absolute inset-0 bottom-auto" style={{ height: "55%" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="home.webm" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background: `linear-gradient(to top, ${t.bg}, transparent)`,
            }}
          />
        </div>
      </div>

      <div className="relative z-10 lg:min-h-0">
        {/* Desktop: video overlays the right side of the hero (absolute, on top of section bg) */}
        <div
          className="hidden lg:block absolute inset-y-0 right-0 z-[5] w-[55%] xl:w-[52%] pointer-events-none"
          style={{ contain: "layout style paint" }}
        >
          <link rel="preload" as="image" href="hero-bg.webp" />
          <video
            className="absolute inset-0 w-full h-full object-cover"
            style={{ minHeight: "100%", willChange: "transform" }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="hero-bg.webp"
            aria-hidden="true"
          >
            <source src="home.webm" type="video/webm" />
          </video>
          <div className="hero-fallback-image absolute inset-0" aria-hidden="true" />
          <div
            className="absolute inset-y-0 left-0 w-40"
            style={{
              background: `linear-gradient(to right, ${t.bg}, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background: `linear-gradient(to top, ${t.bg}, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-16"
            style={{
              background: `linear-gradient(to bottom, ${t.bg}, transparent)`,
            }}
          />
        </div>

        {/* Left column: in flow above the absolute video (z-index) */}
        <div className="w-full lg:max-w-[50%] lg:pr-6 flex flex-col justify-center px-5 py-12 lg:px-16 lg:py-20 relative z-[25] mt-[50px] md:mt-0">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.8rem] font-bold leading-[1.1] tracking-tight text-center lg:text-left lg:text-inherit text-white"
              style={{ color: undefined }}
            >
              <span className="hidden lg:inline" style={{ color: t.text }}>
                {hero.h1}
              </span>
              <span className="lg:hidden">{hero.h1}</span>
            </h1>

            {/* Search Bar */}
            <div className="mt-6">
              {/* Mobile/desktop: each field is its own box (no shared combined input background). */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-4">
                {/* Project Name - simple search */}
                <div
                  className="rounded-xl"
                  style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                >
                  <input
                    type="text"
                    placeholder="Project Name"
                    className={`w-full px-4 py-3 text-sm bg-transparent outline-none ${
                      t.isDark
                        ? "placeholder:text-[#B68A35] lg:placeholder:text-[#6b7a99]"
                        : "placeholder:text-[#B68A35] lg:placeholder:text-[#64748b]"
                    }`}
                    style={{ color: t.text }}
                  />
                </div>

                {/* Developer - type-ahead */}
                <div
                  className="rounded-xl"
                  style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                >
                  <TypeAheadDropdown
                    placeholder="Developer"
                    options={hero.developer_options}
                    value={developerQuery}
                    onChange={setDeveloperQuery}
                    onSelect={(val) => setDeveloperQuery(val)}
                    t={t}
                  />
                </div>

                {/* Location - type-ahead */}
                <div
                  className="flex-1 rounded-xl"
                  style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                >
                  <TypeAheadDropdown
                    placeholder="Location (e.g., Al Yalayis)"
                    options={hero.location_options}
                    value={locationQuery}
                    onChange={setLocationQuery}
                    onSelect={(val) => setLocationQuery(val)}
                    t={t}
                  />
                </div>

                {/* Search button (always on its own box; on mobile it's next line after location) */}
                <button
                  type="button"
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white flex items-center justify-center whitespace-nowrap transition-opacity hover:opacity-95"
                  style={{ background: GOLD, border: `1px solid rgba(0,0,0,0.05)` }}
                >
                  Search
                </button>
              </div>
            </div>

            <p
              className="mt-5 text-sm lg:text-base leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0"
              style={{ color: t.textSecondary }}
            >
              {hero.hero_description}
            </p>

            {/* Golden Visa Toggle */}
            <button
              onClick={() => setGoldenVisa(!goldenVisa)}
              className="mt-3 flex items-center gap-2 text-sm font-medium justify-center md:justify-start"
              style={{ color: goldenVisa ? GOLD : t.textMuted }}
            >
              {goldenVisa ? <CheckSquare size={16} /> : <Square size={16} />}
              {hero.golden_visa_toggle}
            </button>

            {/* Secondary CTA */}
            <button
              className="mt-4 md:self-start self-center flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-colors"
              style={{
                color: GOLD,
                border: `1.5px solid ${GOLD}`,
                background: "transparent",
              }}
            >
              {hero.consultation_cta}
              <ArrowRight size={16} />
            </button>

            {/* Trust badges: directly under CTA; single row on lg, 3×2 on small screens; mobile = table grid */}
            {trustSignals.length > 0 && (
              <div
                className="mt-5 w-full max-lg:border max-lg:border-solid max-lg:rounded-none lg:border-0"
                style={{ borderColor: mobileBadgeBorder }}
              >
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-0 lg:gap-x-2 lg:gap-y-0">
                  {trustSignals.map((label, i) => {
                    const Icon = TRUST_BADGE_ICONS[i] || ShieldCheck;
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center text-center px-1 py-2.5 sm:px-1.5 max-lg:rounded-none max-lg:border-solid max-lg:[&:not(:nth-child(3n))]:border-r max-lg:[&:nth-child(-n+3)]:border-b lg:border-0"
                        style={{ borderColor: mobileBadgeBorder }}
                      >
                        <Icon
                          className="shrink-0 mb-1.5 opacity-90"
                          size={18}
                          strokeWidth={1.75}
                          style={{ color: GOLD }}
                          aria-hidden
                        />
                        <span
                          className="text-[9px] sm:text-[10px] lg:text-[11px] font-semibold uppercase tracking-wide leading-tight"
                          style={{ color: t.textMuted }}
                        >
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
