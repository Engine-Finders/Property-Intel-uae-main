"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GREEN = "#2E9D76";
const RED = "#C9504A";

const ChevronIcon = ({ open }) => (
  <svg
    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Icon = ({ name, size = 20 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
    bulb: (
      <>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8.5 14.5a6 6 0 1 1 7 0c-.9.7-1.5 1.6-1.5 2.5h-4c0-.9-.6-1.8-1.5-2.5Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 19 6v5c0 4.5-2.8 8.2-7 10-4.2-1.8-7-5.5-7-10V6l7-3Z" />
        <path d="M12 8v5" />
        <path d="M12 16h.01" />
      </>
    ),
    scales: (
      <>
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M6 7 3 13h6L6 7Z" />
        <path d="m18 7-3 6h6l-3-6Z" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),
    card: (
      <>
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M7 10h10" />
        <path d="M7 14h6" />
      </>
    ),
    doc: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </>
    ),
    tag: (
      <>
        <path d="M20 12 12 20 4 12V4h8l8 8Z" />
        <path d="M8 8h.01" />
      </>
    ),
    home: (
      <>
        <path d="m4 11 8-7 8 7" />
        <path d="M6 10v10h12V10" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3 9.8 8.8 4 11l5.8 2.2L12 19l2.2-5.8L20 11l-5.8-2.2L12 3Z" />
        <path d="M19 3v4" />
        <path d="M21 5h-4" />
      </>
    ),
  };

  return <svg {...common}>{icons[name] || icons.bulb}</svg>;
};

const IconBadge = ({ icon, t, tone = "gold" }) => {
  const color = tone === "red" ? RED : tone === "green" ? GREEN : GOLD;

  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
      style={{
        color,
        background: t.isDark ? `${color}22` : tone === "red" ? "#FEF0EF" : tone === "green" ? "#EEF9F4" : "#F8F1E7",
        border: `1px solid ${color}20`,
      }}
    >
      {icon}
    </span>
  );
};

const Pill = ({ children, tone = "gold" }) => {
  const styles = {
    gold: { background: "#F2E7D2", color: "#7B5A19" },
    red: { background: "#FBE6E5", color: "#A93D38" },
    green: { background: "#E8F5EE", color: "#237C5D" },
    neutral: { background: "#EDEAE4", color: "#5F6368" },
  };

  return (
    <span className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]" style={styles[tone]}>
      {children}
    </span>
  );
};

const SectionAccordion = ({ title, badge, badgeTone, icon, tone = "gold", open, onToggle, children, t }) => (
  <div
    className="overflow-hidden rounded-2xl"
    style={{
      background: t.cardBg,
      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#E9E3D9"}`,
      boxShadow: t.isDark ? "0 16px 34px rgba(0,0,0,0.24)" : "0 14px 34px rgba(15,23,42,0.04)",
    }}
  >
    <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <IconBadge icon={icon} tone={tone} t={t} />
        <div className="min-w-0">
          <h3 className="font-serif text-[22px] font-medium leading-tight" style={{ color: t.text }}>
            {title}
          </h3>
          {badge && <span className="mt-3 inline-flex"><Pill tone={badgeTone}>{badge}</Pill></span>}
        </div>
      </div>
      <span style={{ color: GOLD }}>
        <ChevronIcon open={open} />
      </span>
    </button>

    <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[7000px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="border-t px-4 py-5 sm:px-5" style={{ borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "#EFEAE1" }}>
        {children}
      </div>
    </div>
  </div>
);

const Callout = ({ label, children, tone = "gold", t }) => {
  const color = tone === "red" ? RED : GOLD;
  const bg = tone === "red" ? (t.isDark ? "rgba(201,80,74,0.12)" : "#FFF5F4") : t.isDark ? "rgba(182,138,53,0.1)" : "#FBF7EF";

  return (
    <div className="mt-4 rounded-2xl border-l-2 p-4" style={{ background: bg, borderColor: color }}>
      <div className="flex gap-3">
        <span style={{ color }}>
          <Icon name={tone === "red" ? "shield" : "check"} size={18} />
        </span>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
            {label}
          </p>
          <p className="text-xs leading-6" style={{ color: t.textSecondary }}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

const TipCard = ({ tip, index, t }) => (
  <div
    className="overflow-hidden rounded-2xl"
    style={{
      background: t.isDark ? "rgba(255,255,255,0.035)" : "#FFFEFC",
      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE6DD"}`,
    }}
  >
    <div className="p-4 sm:p-5">
      <div className="mb-5 grid grid-cols-[58px_1fr] gap-4">
        <div className="flex h-[76px] flex-col items-center justify-center rounded-tl-xl text-center" style={{ background: `linear-gradient(180deg, ${GOLD}, #9B7324)`, color: "#fff" }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Tip</span>
          <span className="mt-1 font-serif text-2xl">{String(index).padStart(2, "0")}</span>
        </div>
        <h4 className="font-serif text-xl font-medium leading-tight" style={{ color: t.text }}>{tip.title}</h4>
      </div>

      <div className="space-y-3">
        {tip.paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-7" style={{ color: t.textSecondary }}>{p}</p>
        ))}
      </div>

      {tip.table && (
        <div className="mt-4 overflow-hidden rounded-2xl" style={{ border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#DED8CE"}` }}>
          {tip.table.source && <p className="px-3 py-2 text-[10px] italic" style={{ color: t.textMuted }}>Source: {tip.table.source}</p>}
          <div className="grid grid-cols-[1.2fr_1fr] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#F4F1EC", color: t.textMuted }}>
            <span>Cost Component</span>
            <span className="text-right">Amount (AED)</span>
          </div>
          {tip.table.rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1.2fr_1fr] gap-3 border-t px-3 py-2 text-xs"
              style={{
                borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "#E7E1D7",
                background: i === tip.table.rows.length - 1 ? (t.isDark ? "rgba(182,138,53,0.12)" : "#FBF3E4") : "transparent",
              }}
            >
              <span style={{ color: i === tip.table.rows.length - 1 ? t.text : t.textSecondary, fontWeight: i === tip.table.rows.length - 1 ? 700 : 400 }}>{row[0]}</span>
              <span className="text-right font-semibold" style={{ color: i === tip.table.rows.length - 1 ? GOLD : t.text }}>{row[1]}</span>
            </div>
          ))}
        </div>
      )}

      {tip.red_flag && <Callout label="Red Flag" tone="red" t={t}>{tip.red_flag}</Callout>}
      {tip.action && <Callout label="Action" t={t}>{tip.action}</Callout>}
    </div>
  </div>
);

const ScamTable = ({ headers, rows, t }) => {
  const icons = ["card", "doc", "tag", "shield", "home"];

  return (
    <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#E7E1D7"}` }}>
      <div className="grid grid-cols-[1fr_1fr] gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ background: t.isDark ? "rgba(255,255,255,0.05)" : "#F7F3ED", color: GOLD }}>
        <span>{headers[0]}</span>
        <span>{headers[1]}</span>
      </div>
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr] gap-3 border-t px-4 py-4" style={{ borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "#E7E1D7" }}>
          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: t.isDark ? "rgba(201,80,74,0.14)" : "#FCEBEA", color: RED }}>
              <Icon name={icons[i] || "shield"} size={17} />
            </span>
            <p className="text-sm font-bold leading-6" style={{ color: RED }}>{row[0]}</p>
          </div>
          <p className="text-sm leading-6" style={{ color: t.textSecondary }}>{row[1]}</p>
        </div>
      ))}
    </div>
  );
};

const RegulatoryCard = ({ item, t }) => (
  <div
    className="flex gap-3 rounded-2xl p-4"
    style={{
      background: t.isDark ? "rgba(255,255,255,0.035)" : "#FFFEFC",
      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE6DD"}`,
      boxShadow: t.isDark ? "none" : "0 10px 24px rgba(15,23,42,0.04)",
    }}
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: t.isDark ? "rgba(46,157,118,0.14)" : "#EAF8F2", color: GREEN }}>
      <Icon name="check" size={20} />
    </span>
    <div>
      <p className="text-sm font-bold leading-6" style={{ color: t.text }}>{item.label}</p>
      <p className="mt-1 text-sm leading-6" style={{ color: t.textSecondary }}>{item.desc}</p>
    </div>
  </div>
);

const splitTitle = (title = "") => {
  const parts = title.split("—");
  return parts.length > 1 ? { eyebrow: parts[0].trim(), title: parts.slice(1).join("—").trim() } : { eyebrow: "", title };
};

const FinalWord = ({ finalWord, t }) => {
  if (!finalWord) return null;

  const { eyebrow, title } = splitTitle(finalWord.title);
  const [mainText, howeverText] = String(finalWord.text || "").split("However,");

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
      style={{
        color: "#fff",
        background: `linear-gradient(135deg, ${GOLD}, #8E6825)`,
        boxShadow: t.isDark ? "0 18px 38px rgba(0,0,0,0.28)" : "0 18px 36px rgba(91,64,18,0.18)",
      }}
    >
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 1px, transparent 18px)" }} />
      <div className="relative">
        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em]">
          <Icon name="spark" size={18} />
          {eyebrow || finalWord.badge}
        </p>
        <h3 className="font-serif text-3xl font-medium leading-tight sm:text-4xl">{title}</h3>
        {mainText && <p className="mt-5 text-lg leading-8 text-white/90">{mainText.trim()}</p>}
        {howeverText && (
          <blockquote className="mt-5 border-l-2 border-white/45 pl-5 text-lg italic leading-8 text-white/90">
            However,{howeverText.trim()}
          </blockquote>
        )}
      </div>
    </div>
  );
};

const ExpertTipsSection = ({ data }) => {
  const { t } = useTheme();
  const [openPanels, setOpenPanels] = useState({
    tips: false,
    scams: false,
    regulatory: false,
  });

  const scam = data.scam_red_flags || {};
  const regulatory = data.regulatory || {};
  const toggle = (key) => setOpenPanels((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section id="expert-tips" className="px-2 py-8 sm:px-6 lg:px-8 lg:py-12" style={{ background: t.bg }}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="mx-auto max-w-xl font-serif text-[32px] font-medium leading-tight sm:text-4xl" style={{ color: t.text }}>
            {data.title}
          </h2>
          {data.subtitle && <p className="mt-4 text-xl" style={{ color: t.textMuted }}>{data.subtitle}</p>}
        </div>

        <div className="space-y-4">
          <SectionAccordion
            title={data.tips_title}
            badge="Playbook"
            badgeTone="neutral"
            icon={<Icon name="bulb" />}
            open={openPanels.tips}
            onToggle={() => toggle("tips")}
            t={t}
          >
            <div className="space-y-4">
              {(data.tips || []).map((tip, i) => (
                <TipCard key={i} tip={tip} index={i + 1} t={t} />
              ))}
            </div>
          </SectionAccordion>

          <SectionAccordion
            title={scam.title}
            badge="High Alert"
            badgeTone="red"
            icon={<Icon name="shield" />}
            tone="red"
            open={openPanels.scams}
            onToggle={() => toggle("scams")}
            t={t}
          >
            <ScamTable headers={scam.headers || []} rows={scam.rows || []} t={t} />
          </SectionAccordion>

          <SectionAccordion
            title={regulatory.title}
            badge="Effective Jan 2026"
            badgeTone="green"
            icon={<Icon name="scales" />}
            open={openPanels.regulatory}
            onToggle={() => toggle("regulatory")}
            t={t}
          >
            <p className="mb-5 text-sm leading-7" style={{ color: t.textSecondary }}>{regulatory.intro}</p>
            <div className="space-y-3">
                {(regulatory.items || []).map((item, i) => (
                <RegulatoryCard key={i} item={item} t={t} />
                ))}
              </div>
            {regulatory.action && <Callout label="Action" t={t}>{regulatory.action}</Callout>}
          </SectionAccordion>

          {data.cta && (
            <div className="flex flex-col items-start gap-2 pt-2">
              <a
                href={data.cta.href || "#"}
                className="inline-block rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ background: GOLD }}
              >
                {data.cta.button_text}
              </a>
              {data.cta.subtext && (
                <p className="max-w-xl text-sm leading-relaxed" style={{ color: t.textMuted }}>{data.cta.subtext}</p>
              )}
            </div>
          )}

          <FinalWord finalWord={data.final_word} t={t} />
        </div>
      </div>
    </section>
  );
};

export default ExpertTipsSection;
