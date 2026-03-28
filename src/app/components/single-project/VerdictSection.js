"use client";
import { useTheme } from "../context/ThemeContext";
import { BarChart3, Search, Handshake, MapPin, Building2, BadgeDollarSign } from "lucide-react";

const GOLD = "#B68A35";
const GREEN = "#2E7D32";
const RED = "#C62828";
const BLUE = "#1565C0";

const STEP_COLORS = [GREEN, GOLD, BLUE];
const STANDOUT_ICONS = [MapPin, Building2, BadgeDollarSign];
const STANDOUT_COLORS = [GREEN, GOLD, BLUE];

const VerdictSection = ({ data }) => {
  const { t } = useTheme();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14" style={{ background: t.bg }}>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Worth It? */}
        <div className="rounded-xl p-5 sm:p-7" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <h2 className="text-lg sm:text-xl font-bold mb-5 text-center" style={{ color: t.text }}>{data.h2_worth}</h2>
          <div className="space-y-3 mb-5">
            {data.worth_points.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="shrink-0 mt-0.5 text-sm">
                  {p.icon === "check" ? <span style={{ color: GREEN }}>✔</span> : <span style={{ color: GOLD }}>⚠</span>}
                </span>
                <span className="text-xs sm:text-sm leading-relaxed" style={{ color: t.textSecondary }}>{p.text}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg px-4 py-2.5 text-center" style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.08)", border: `1px solid ${GOLD}30` }}>
            <span className="text-xs font-bold" style={{ color: GOLD }}>Best For: </span>
            <span className="text-xs" style={{ color: t.textSecondary }}>{data.best_for}</span>
          </div>
        </div>

        {/* How We Help */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-6 text-center" style={{ color: t.text }}>{data.h2_process}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.steps.map((step, i) => {
              const Icon = [BarChart3, Search, Handshake][i];
              const clr = STEP_COLORS[i];
              return (
                <div key={i} className="text-center p-5 rounded-xl" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `${clr}15` }}>
                    <Icon size={28} color={clr} strokeWidth={1.8} />
                  </div>
                  <p className="text-xs font-bold mb-1" style={{ color: clr }}>{step.title}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: t.textMuted }}>{step.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Should You Consider */}
        <div className="rounded-xl p-5 sm:p-7" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
          <h3 className="text-base sm:text-lg font-bold mb-5 text-center" style={{ color: t.text }}>{data.h3_consider}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Good Fit */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">✅</span>
                <span className="text-xs font-bold" style={{ color: GREEN }}>Good Fit If:</span>
              </div>
              <div className="space-y-2.5">
                {data.good_fit.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5" style={{ color: GREEN }}>●</span>
                    <span className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Not Ideal */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">❌</span>
                <span className="text-xs font-bold" style={{ color: RED }}>Not Ideal If:</span>
              </div>
              <div className="space-y-2.5">
                {data.not_ideal.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5" style={{ color: RED }}>●</span>
                    <span className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Our Take */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">⚖</span>
                <span className="text-xs font-bold" style={{ color: BLUE }}>Our Take:</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>{data.our_take}</p>
            </div>
          </div>
        </div>

        {/* Why This Project Stands Out - separate from the box */}
        <div>
          <h3 className="text-base sm:text-lg font-bold mb-5 text-center" style={{ color: t.text }}>Why This Project Stands Out</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.standout.map((item, i) => {
              const Icon = STANDOUT_ICONS[i];
              const clr = STANDOUT_COLORS[i];
              return (
                <div key={i} className="text-center p-5 rounded-xl" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `${clr}15` }}>
                    <Icon size={24} color={clr} strokeWidth={1.8} />
                  </div>
                  <p className="text-xs font-bold mb-1" style={{ color: clr }}>{item.title}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: t.textMuted }}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: t.text }}>{data.h3_cta}</h3>
          <p className="text-xs mb-5 max-w-lg mx-auto" style={{ color: t.textSecondary }}>{data.cta_subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {data.cta_buttons.map((btn, i) => (
              <button
                key={i}
                className="px-5 py-2.5 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                style={{
                  background: i === 0 ? BLUE : i === 1 ? GREEN : "transparent",
                  color: i < 2 ? "#fff" : BLUE,
                  border: i === 2 ? `1.5px solid ${BLUE}` : "none"
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default VerdictSection;
