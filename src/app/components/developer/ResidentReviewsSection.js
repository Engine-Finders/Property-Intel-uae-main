"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

const ACCENT = "#B68A35";

/* ── Animated bar ── */
const AnimatedBar = ({ percent, color, t }) => {
  const [w, setW] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(percent); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [percent]);

  return (
    <div ref={ref} className="h-3 rounded-full overflow-hidden" style={{ background: t.isDark ? "#2a2d33" : "#e2e8f0" }}>
      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: color }} />
    </div>
  );
};

/* ── Star rating ── */
const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="inline-flex gap-0.5 text-sm">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < full || (i === full && half) ? "#F59E0B" : "#d1d5db" }}>★</span>
      ))}
    </span>
  );
};

/* ── Review card ── */
const ReviewCard = ({ review, t }) => {
  const borderColor = review.rating >= 4 ? "#22C55E" : review.rating >= 3 ? "#F59E0B" : "#EF4444";
  return (
    <div className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}`, borderLeft: `3px solid ${borderColor}` }}>
      <p className="text-xs leading-relaxed italic mb-3" style={{ color: t.textSecondary }}>"{review.text}"</p>
      <div className="flex flex-wrap items-center gap-2">
        <Stars rating={review.rating} />
        <span className="text-[10px] font-semibold" style={{ color: t.textMuted }}>{review.rating}/5</span>
        <span className="text-[10px]" style={{ color: t.textMuted }}>·</span>
        <span className="text-[10px]" style={{ color: t.textMuted }}>{review.platform}</span>
        <span className="text-[10px]" style={{ color: t.textMuted }}>·</span>
        <span className="text-[10px]" style={{ color: t.textMuted }}>{review.date}</span>
      </div>
    </div>
  );
};

/* ── Platform table ── */
const PlatformTable = ({ platforms, t }) => (
  <>
    {/* Mobile */}
    <div className="space-y-3 lg:hidden">
      {platforms.map((p, i) => (
        <div key={i} className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-sm font-semibold mb-1" style={{ color: t.text }}>{p.platform}</p>
          <div className="flex gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Rating</p>
              <p className="text-xs font-bold mt-0.5" style={{ color: ACCENT }}>{p.rating}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: t.textMuted }}>Reviews</p>
              <p className="text-xs mt-0.5" style={{ color: t.textSecondary }}>{p.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* Desktop */}
    <div className="hidden lg:block overflow-x-auto rounded-lg" style={{ border: `1px solid ${t.cardBorder}` }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: t.textMuted, borderBottom: `1px solid ${t.cardBorder}` }}>Platform</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: t.textMuted, borderBottom: `1px solid ${t.cardBorder}` }}>Average Rating</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: t.textMuted, borderBottom: `1px solid ${t.cardBorder}` }}>Number of Reviews</th>
          </tr>
        </thead>
        <tbody>
          {platforms.map((p, i) => (
            <tr key={i} style={{ borderBottom: i < platforms.length - 1 ? `1px solid ${t.cardBorder}` : "none" }}>
              <td className="px-4 py-3 font-semibold" style={{ color: t.text }}>{p.platform}</td>
              <td className="px-4 py-3 font-bold" style={{ color: ACCENT }}>{p.rating}</td>
              <td className="px-4 py-3" style={{ color: t.textSecondary }}>{p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

/* ── Theme list item ── */
const ThemeItem = ({ text, icon, color, t }) => (
  <div className="flex gap-2 items-start text-xs leading-relaxed py-1.5" style={{ color: t.textSecondary }}>
    <span className="shrink-0 mt-0.5" style={{ color }}>{icon}</span>
    <span>{text}</span>
  </div>
);

/* ── Main ── */
const ResidentReviewsSection = ({ data }) => {
  const { t } = useTheme();
  const [themesTab, setThemesTab] = useState(0); // 0 = Pros, 1 = Cons — mobile only

  const sentiment = data.sentiment || [];
  const pros = data.pros || [];
  const cons = data.cons || [];
  const reviews = data.reviews || [];
  const platforms = data.platforms || [];

  return (
    <section id="resident-reviews" className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ background: t.bgAlt }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4" style={{ background: ACCENT + "20", color: ACCENT }}>
              {data.badge}
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: t.text }}>{data.title}</h2>
            <p className="text-sm mb-4" style={{ color: t.textMuted }}>{data.subtitle}</p>
            <p className="text-xs leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>{data.intro}</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden min-h-40 lg:min-h-52">
            <Image
              src="/projects/villa-render-1.jpg"
              fill
              alt="Emaar Resident Reviews"
              className="object-cover"
            />
          </div>
        </div>

        {/* Aggregated Rating (left) + Recent Review Highlights (right) | Sentiment Breakdown (below left) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left column: Aggregated Rating (top) + Sentiment Breakdown (below) */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl p-5 lg:p-7" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: ACCENT + "20", color: ACCENT }}>⭐</span>
                Aggregated Rating
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black" style={{ color: ACCENT }}>{data.overall_score}</span>
                  <span className="text-lg font-medium" style={{ color: t.textMuted }}>/ 5</span>
                </div>
                <div>
                  <Stars rating={parseFloat(data.overall_score)} />
                  <p className="text-[10px] mt-1" style={{ color: t.textMuted }}>{data.total_reviews} reviews analysed</p>
                </div>
              </div>
              <PlatformTable platforms={platforms} t={t} />
            </div>
            <div className="rounded-xl p-5 lg:p-7" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: t.text }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: ACCENT + "20", color: ACCENT }}>📊</span>
                Sentiment Breakdown
              </h3>
              {sentiment.map((s, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold" style={{ color: t.text }}>{s.label}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: s.color + "20", color: s.color }}>{s.percent}%</span>
                  </div>
                  <AnimatedBar percent={s.percent} color={s.color} t={t} />
                </div>
              ))}
            </div>
          </div>
          {/* Right column: Recent Review Highlights */}
          <div className="rounded-xl p-5 lg:p-7" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: ACCENT + "20", color: ACCENT }}>💬</span>
              Recent Review Highlights
            </h3>
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <ReviewCard key={i} review={r} t={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Common Themes — tabs on mobile, side-by-side on desktop */}
        <div className="mb-6">
          {/* Mobile: tabs */}
          <div className="lg:hidden mb-4">
            <div className="flex gap-1 p-1 rounded-lg" style={{ background: t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}>
              <button
                onClick={() => setThemesTab(0)}
                className="flex-1 py-2.5 px-3 rounded-md text-xs font-semibold transition-all"
                style={{
                  background: themesTab === 0 ? "#22C55E" : "transparent",
                  color: themesTab === 0 ? "#fff" : t.textSecondary,
                }}
              >
                ✓ Appreciate
              </button>
              <button
                onClick={() => setThemesTab(1)}
                className="flex-1 py-2.5 px-3 rounded-md text-xs font-semibold transition-all"
                style={{
                  background: themesTab === 1 ? "#EF4444" : "transparent",
                  color: themesTab === 1 ? "#fff" : t.textSecondary,
                }}
              >
                ! Mention
              </button>
            </div>
            <div className="rounded-xl p-5 mt-0" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              {themesTab === 0 ? (
                <>
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#22C55E20", color: "#22C55E" }}>✓</span>
                    What Residents Appreciate
                  </h3>
                  {pros.map((p, i) => (
                    <ThemeItem key={i} text={p} icon="✓" color="#22C55E" t={t} />
                  ))}
                </>
              ) : (
                <>
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#EF444420", color: "#EF4444" }}>!</span>
                    What Residents Frequently Mention
                  </h3>
                  {cons.map((c, i) => (
                    <ThemeItem key={i} text={c} icon="→" color="#F59E0B" t={t} />
                  ))}
                </>
              )}
            </div>
          </div>
          {/* Desktop: side by side */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#22C55E20", color: "#22C55E" }}>✓</span>
                What Residents Appreciate
              </h3>
              {pros.map((p, i) => (
                <ThemeItem key={i} text={p} icon="✓" color="#22C55E" t={t} />
              ))}
            </div>
            <div className="rounded-xl p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#EF444420", color: "#EF4444" }}>!</span>
                What Residents Frequently Mention
              </h3>
              {cons.map((c, i) => (
                <ThemeItem key={i} text={c} icon="→" color="#F59E0B" t={t} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mb-6">
          <a
            href="#"
            className="inline-block rounded-xl px-6 py-3 font-semibold text-sm sm:text-base transition-opacity hover:opacity-95"
            style={{ background: ACCENT, color: "#fff" }}
          >
            Read Unfiltered Emaar Reviews
          </a>
          <p className="mt-2 text-xs sm:text-sm" style={{ color: t.textSecondary }}>
            The good, the bad, and the honest straight from residents.
          </p>
        </div>

        {/* Verification Note */}
        <div className="rounded-xl p-4 mb-4" style={{ background: t.isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.25)" }}>
          <div className="flex gap-2 items-start">
            <span className="text-sm mt-0.5">ℹ️</span>
            <p className="text-xs leading-relaxed" style={{ color: t.isDark ? "#93c5fd" : "#1e40af" }}>
              <strong>Verification Note:</strong> {data.verification_note}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <div className="flex gap-2 items-start">
            <span className="text-sm mt-0.5">⚠️</span>
            <p className="text-xs leading-relaxed" style={{ color: t.isDark ? "#fcd34d" : "#92400e" }}>
              <strong>Disclaimer:</strong> {data.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentReviewsSection;
