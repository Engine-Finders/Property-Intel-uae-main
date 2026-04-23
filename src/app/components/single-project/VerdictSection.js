"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { BarChart3, Search, Handshake } from "lucide-react";

const GOLD = "#B68A35";
const GREEN = "#6EAF4A";
const RED = "#D97D74";
const BLUE = "#1565C0";

const STEP_COLORS = [GREEN, GOLD, BLUE];

const CircleIcon = ({ children, color, bg, size = "h-10 w-10" }) => (
  <div
    className={`flex ${size} shrink-0 items-center justify-center rounded-full`}
    style={{ color, background: bg, border: `1px solid ${color}20` }}
  >
    {children}
  </div>
);

const CheckGlyph = ({ color = GREEN }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5 9-9" />
  </svg>
);

const XGlyph = ({ color = RED }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const AlertGlyph = ({ color = "#CC9A2C" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
  </svg>
);

const TrendGlyph = ({ color = GOLD }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18" />
    <path d="m7 15 4-4 3 3 5-7" />
    <path d="M17 7h2v2" />
  </svg>
);

const AimGlyph = ({ color = GOLD }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
  </svg>
);

const ArrowGlyph = ({ color = GOLD }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </svg>
);

const splitProcessTitle = (title = "") => {
  const cleaned = title.replace(/^\d+\.\s*/, "").trim();
  const parts = cleaned.split(" ");
  const lead = parts.slice(0, 3).join(" ");
  const rest = parts.slice(3).join(" ");
  return { lead, rest };
};

const MobileTabButton = ({ active, onClick, children, t }) => (
  <button
    type="button"
    onClick={onClick}
    className="relative flex-1 pb-3 text-center text-[13px] font-medium transition-colors"
    style={{ color: active ? GOLD : t.textMuted }}
  >
    {children}
    <span
      className="absolute inset-x-0 bottom-0 h-px"
      style={{ background: active ? GOLD : "transparent" }}
    />
  </button>
);

const MobileBulletRow = ({ icon, text, t }) => (
  <div
    className="flex items-start gap-3 px-3 py-3"
    style={{ borderTop: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}` }}
  >
    {icon}
    <p className="text-[13px] leading-5" style={{ color: t.textSecondary }}>
      {text}
    </p>
  </div>
);

const MobileFitCard = ({ title, items, color, icon, t }) => (
  <div
    className="rounded-2xl p-4"
    style={{
      background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
      border: `1px solid ${t.isDark ? `${color}33` : `${color}26`}`,
      boxShadow: t.isDark ? "0 8px 24px rgba(0,0,0,0.18)" : "0 8px 24px rgba(15,23,42,0.04)",
    }}
  >
    <div className="mb-3 flex items-center gap-2">
      <CircleIcon color={color} bg={`${color}15`} size="h-7 w-7">
        {icon}
      </CircleIcon>
      <p className="text-sm font-medium" style={{ color }}>
        {title}
      </p>
    </div>
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <span className="mt-[7px] block h-1.5 w-1.5 rounded-full" style={{ background: color }} />
          <p className="text-[13px] leading-6" style={{ color: t.textSecondary }}>
            {item}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const MobileApproachCard = ({ item, index, t }) => {
  const { lead, rest } = splitProcessTitle(item.title);
  const iconMap = [
    <BarChart3 key="bar" size={18} color={GOLD} strokeWidth={1.8} />,
    <Search key="search" size={18} color={GOLD} strokeWidth={1.8} />,
    <Handshake key="handshake" size={18} color={GOLD} strokeWidth={1.8} />,
  ];

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
        border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}`,
        boxShadow: t.isDark ? "0 8px 24px rgba(0,0,0,0.18)" : "0 8px 24px rgba(15,23,42,0.04)",
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <CircleIcon color={GOLD} bg={t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)"} size="h-11 w-11">
            {iconMap[index]}
          </CircleIcon>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: GOLD }}>
            {String(index + 1).padStart(2, "0")}
          </p>
          <h4 className="mt-1 text-[18px] font-semibold leading-6" style={{ color: t.text }}>
            {lead}
            {rest ? <> <span>{rest}</span></> : null}
          </h4>
          <p className="mt-2 text-[13px] leading-5" style={{ color: t.textSecondary }}>
            {item.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

const MobileVerdict = ({ data, t }) => (
  <div className="space-y-4">
    <div
      className="rounded-2xl p-4"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
        border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}`,
        boxShadow: t.isDark ? "0 8px 24px rgba(0,0,0,0.18)" : "0 8px 24px rgba(15,23,42,0.04)",
      }}
    >
      <div className="flex items-start gap-3">
        <CircleIcon color={GOLD} bg={t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)"} size="h-14 w-14">
          <TrendGlyph />
        </CircleIcon>
        <div>
          <h3 className="text-[18px] font-semibold leading-6" style={{ color: t.text }}>
            {data.mobile_verdict_summary?.title}
          </h3>
          <p className="mt-1 text-[13px] leading-5" style={{ color: t.textSecondary }}>
            {data.mobile_verdict_summary?.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl" style={{ border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}` }}>
        {data.worth_points.map((point, i) => (
          <MobileBulletRow
            key={i}
            t={t}
            text={point.text}
            icon={
              <CircleIcon
                color={point.icon === "check" ? GREEN : "#CC9A2C"}
                bg={point.icon === "check" ? `${GREEN}15` : "rgba(204,154,44,0.14)"}
                size="h-7 w-7"
              >
                {point.icon === "check" ? <CheckGlyph color={GREEN} /> : <AlertGlyph color="#CC9A2C" />}
              </CircleIcon>
            }
          />
        ))}
      </div>
    </div>

    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
        Best For
      </p>
      <p className="mt-1 text-[13px] leading-5" style={{ color: t.textSecondary }}>
        {data.best_for}
      </p>
    </div>
  </div>
);

const MobileGoodFit = ({ data, t }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <MobileFitCard
        title={data.mobile_good_fit_heading || "Good fit"}
        items={data.good_fit || []}
        color={GREEN}
        icon={<CheckGlyph color={GREEN} />}
        t={t}
      />
      <MobileFitCard
        title={data.mobile_not_ideal_heading || "Not ideal if"}
        items={data.not_ideal || []}
        color={RED}
        icon={<XGlyph color={RED} />}
        t={t}
      />
    </div>

    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
        {data.mobile_bottom_line_label || "Bottom Line"}
      </p>
      <div className="mt-2 flex items-start gap-3">
        <CircleIcon color={GOLD} bg={t.isDark ? "rgba(182,138,53,0.14)" : "rgba(182,138,53,0.1)"} size="h-8 w-8">
          <AimGlyph />
        </CircleIcon>
        <p className="text-[13px] leading-5" style={{ color: t.textSecondary }}>
          {data.our_take}
        </p>
      </div>
    </div>
  </div>
);

const MobileApproach = ({ data, t }) => (
  <div className="space-y-3">
    {(data.steps || []).map((item, i) => (
      <MobileApproachCard key={i} item={item} index={i} t={t} />
    ))}
  </div>
);

const VerdictSection = ({ data }) => {
  const { t } = useTheme();
  const [mobileTab, setMobileTab] = useState("verdict");

  return (
    <section className="px-1 py-5 sm:px-6 sm:py-14 lg:px-8" style={{ background: t.bg }}>
      <div className="mx-auto max-w-3xl">
        <div className="md:hidden">
          <div
            className="rounded-[28px] p-4"
            style={{
              background: t.isDark ? "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))" : "linear-gradient(180deg, #fdfbf7, #fbf8f1)",
              border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
              boxShadow: t.isDark ? "0 16px 36px rgba(0,0,0,0.26)" : "0 16px 36px rgba(15,23,42,0.06)",
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
              {data.mobile_badge || "Investment Verdict"}
            </p>
            <h2 className="mt-2 text-[33px] font-semibold leading-[1.04]" style={{ color: t.text }}>
              {data.mobile_title}
              <span className="block italic" style={{ color: GOLD }}>
                {data.mobile_title_accent}
              </span>
            </h2>

            <div
              className="mt-5 flex items-center gap-2 border-b"
              style={{ borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)" }}
            >
              <MobileTabButton active={mobileTab === "verdict"} onClick={() => setMobileTab("verdict")} t={t}>
                {data.mobile_tabs?.verdict || "Verdict"}
              </MobileTabButton>
              <MobileTabButton active={mobileTab === "good_fit"} onClick={() => setMobileTab("good_fit")} t={t}>
                {data.mobile_tabs?.good_fit || "Good fit?"}
              </MobileTabButton>
              <MobileTabButton active={mobileTab === "approach"} onClick={() => setMobileTab("approach")} t={t}>
                {data.mobile_tabs?.approach || "Our approach"}
              </MobileTabButton>
            </div>

            <div className="mt-4">
              {mobileTab === "verdict" && <MobileVerdict data={data} t={t} />}
              {mobileTab === "good_fit" && <MobileGoodFit data={data} t={t} />}
              {mobileTab === "approach" && <MobileApproach data={data} t={t} />}
            </div>

            <div
              className="mt-5 rounded-2xl p-4"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
                border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}`,
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                {data.mobile_cta_badge || "Ready to go deeper?"}
              </p>
              <h3 className="mt-2 text-[26px] font-semibold leading-[1.08]" style={{ color: t.text }}>
                {data.mobile_cta_title || data.h3_cta}
              </h3>
              <p className="mt-2 text-[13px] leading-5" style={{ color: t.textSecondary }}>
                {data.mobile_cta_subtitle || data.cta_subtitle}
              </p>
              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold"
                style={{
                  background: GOLD,
                  color: "#fff",
                  boxShadow: "0 10px 20px rgba(182,138,53,0.22)",
                }}
              >
                <span>{data.mobile_cta_button || data.cta_buttons?.[0] || "Speak to an expert"}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <ArrowGlyph color="#fff" />
                </span>
              </button>
              <p className="mt-2 text-center text-[11px]" style={{ color: t.textMuted }}>
                {data.mobile_cta_note || "Payment plan - ROI analysis - No pressure"}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden space-y-10 md:block">
          <div className="rounded-xl p-5 sm:p-7" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
            <h2 className="mb-5 text-center text-xl font-bold sm:text-2xl" style={{ color: t.text }}>{data.h2_worth}</h2>
            <div className="mb-5 space-y-3">
              {data.worth_points.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 text-sm" style={{ color: point.icon === "check" ? GREEN : GOLD }}>
                    {point.icon === "check" ? "✔" : "⚠"}
                  </span>
                  <span className="text-sm leading-relaxed sm:text-base" style={{ color: t.textSecondary }}>
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-lg px-4 py-2.5 text-center" style={{ background: t.isDark ? "rgba(182,138,53,0.12)" : "rgba(182,138,53,0.08)", border: `1px solid ${GOLD}30` }}>
              <span className="text-sm font-bold" style={{ color: GOLD }}>Best For: </span>
              <span className="text-sm" style={{ color: t.textSecondary }}>
                {data.best_for}
              </span>
            </div>
          </div>

          <div className="rounded-xl p-5 sm:p-7" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
            <h3 className="mb-5 text-center text-lg font-bold sm:text-xl" style={{ color: t.text }}>{data.h3_consider}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm">✅</span>
                  <span className="text-sm font-bold" style={{ color: GREEN }}>Good Fit:</span>
                </div>
                <div className="space-y-2.5">
                  {data.good_fit.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0" style={{ color: GREEN }}>●</span>
                      <span className="text-xs leading-relaxed sm:text-sm" style={{ color: t.textSecondary }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm">❌</span>
                  <span className="text-sm font-bold" style={{ color: RED }}>Not Ideal If:</span>
                </div>
                <div className="space-y-2.5">
                  {data.not_ideal.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0" style={{ color: RED }}>●</span>
                      <span className="text-xs leading-relaxed sm:text-sm" style={{ color: t.textSecondary }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-center text-xl font-bold sm:text-2xl" style={{ color: t.text }}>{data.h2_process}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {(data.steps || []).map((item, i) => {
                const Icon = [BarChart3, Search, Handshake][i];
                const clr = STEP_COLORS[i];
                return (
                  <div key={i} className="rounded-xl p-5 text-center" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.isDark ? "#2a2d33" : "#e2e8f0"}` }}>
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: `${clr}15` }}>
                      <Icon size={28} color={clr} strokeWidth={1.8} />
                    </div>
                    <p className="mb-1 text-sm font-bold" style={{ color: clr }}>{item.title}</p>
                    <p className="text-xs leading-relaxed sm:text-sm" style={{ color: t.textMuted }}>{item.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <h3 className="mb-2 text-lg font-bold sm:text-xl" style={{ color: t.text }}>{data.h3_cta}</h3>
            <p className="mx-auto mb-5 max-w-lg text-sm" style={{ color: t.textSecondary }}>{data.cta_subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.cta_buttons.map((btn, i) => (
                <button
                  key={i}
                  type="button"
                  className="rounded-lg px-5 py-2.5 text-xs font-bold transition-all hover:opacity-90"
                  style={{
                    background: i === 0 ? BLUE : i === 1 ? GREEN : "transparent",
                    color: i < 2 ? "#fff" : BLUE,
                    border: i === 2 ? `1.5px solid ${BLUE}` : "none",
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerdictSection;
