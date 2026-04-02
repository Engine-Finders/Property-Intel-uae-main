"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { CheckSquare, Square, ArrowRight } from "lucide-react";

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
    ? "placeholder:text-[#6b7a99]"
    : "placeholder:text-[#64748b]";

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

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center px-5 py-12 lg:px-16 lg:py-20 relative z-[30]">
            {/* Trust Badges (desktop) */}
            <div className="hidden lg:flex flex-wrap items-center gap-2 mb-6">
              {hero.trust_badges.map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide"
                  style={{
                    background: t.isDark
                      ? "rgba(182,138,53,0.12)"
                      : "rgba(182,138,53,0.08)",
                    color: GOLD,
                    border: `1px solid ${GOLD}`,
                  }}
                >
                  {badge}
                </span>
              ))}
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium"
                style={{
                  color: GOLD,
                  background: t.isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.04)",
                  border: `1px solid ${GOLD}`,
                }}
              >
                Last Data Update: {hero.last_update}
              </span>
            </div>

            {/* Trust Badges (mobile) */}
            <div className="flex lg:hidden flex-wrap items-center gap-2 mb-6">
              {hero.trust_badges.map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide"
                  style={{
                    background: t.isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.05)",
                    color: "#e3d5d5",
                    border: "1px solid #e3d5d5",
                  }}
                >
                  {badge}
                </span>
              ))}
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium"
                style={{
                  color: "#e3d5d5",
                  background: t.isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.05)",
                  border: "1px solid #e3d5d5",
                }}
              >
                Last Data Update: {hero.last_update}
              </span>
            </div>

            <h1
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.8rem] font-bold leading-[1.1] tracking-tight lg:text-inherit text-white"
              style={{ color: undefined }}
            >
              <span className="hidden lg:inline" style={{ color: t.text }}>
                {hero.h1}
              </span>
              <span className="lg:hidden">{hero.h1}</span>
            </h1>

            <p
              className="mt-4 text-sm lg:text-base leading-relaxed max-w-xl lg:text-inherit text-white/80"
              style={{ color: undefined }}
            >
              <span
                className="hidden lg:inline"
                style={{ color: t.textSecondary }}
              >
                {hero.h2}
              </span>
              <span className="lg:hidden">{hero.h2}</span>
            </p>

            <p
              className="mt-3 text-xs lg:text-sm font-medium tracking-wide"
              style={{ color: GOLD }}
            >
              {hero.social_proof}
            </p>

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
                        ? "placeholder:text-[#6b7a99]"
                        : "placeholder:text-[#64748b]"
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
              {hero.secondary_cta}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right: Video */}
          <div
            className="hidden lg:block w-[55%] relative lg:-ml-[0%] xl:-ml-[5%] z-0"
            style={{ contain: "layout style paint" }}
          >
            {/* <video autoPlay muted loop playsInline className="w-full h-full object-cover" style={{ minHeight: "100%" }}>
              <source src="home.webm" type="video/mp4" />
            </video> */}
            <link rel="preload" as="image" href="hero-bg.webp" />

            <video
              className="w-full h-full object-cover"
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

            <div className="hero-fallback-image" aria-hidden="true"></div>
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
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
