
"use client";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
/** Soft white halo so title/subtitle read on very dark or very light hero images */
const HERO_TEXT_HALO = "0 0 12px rgba(255,255,255,0.92), 0 0 2px rgba(255,255,255,0.98), 0 1px 0 rgba(255,255,255,0.85)";
const SUBTITLE_GREY = "#2d2d2d";

const getCtaDetails = (cta) => ({
  text: typeof cta === "string" ? cta : cta?.button_text,
  href: typeof cta === "object" ? cta?.href : null,
});

/** e.g. "Serro at The Heights" → "Serro at" (black) + "The Heights" (gold) */
const splitHeroTitle = (raw) => {
  if (!raw) return { line1: "", line2: null };
  const s = String(raw);
  const m = s.match(/^(.*)\s+The\s+(.+)$/i);
  if (m) return { line1: m[1].trim(), line2: `The ${m[2].trim()}` };
  return { line1: s.trim(), line2: null };
};

const renderStatIcon = (type, color) => {
  if (type === "starting_price") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }

  if (type === "price_per_sqft") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21 21 3" />
        <path d="M7 7h.01" />
        <path d="M17 17h.01" />
        <path d="M14 3h7v7" />
        <path d="M3 14v7h7" />
      </svg>
    );
  }

  if (type === "yield_forecast") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 3 5-7" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
};

const PrimaryCtaIcon = ({ size = 26 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const ArrowRightIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </svg>
);

const ContactIcon = ({ type }) => {
  if (type === "whatsapp") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21l1.4-4.4A8.7 8.7 0 1 1 7.7 20L3 21Z" />
        <path d="M8.8 8.9c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3 0 .5.5 1 1.3 1.8 2.3 2.3.2.1.4.1.5-.1l.5-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .5-.2 1-.6 1.3-.5.4-1.1.5-1.8.3-3.4-.9-5.8-3.3-6.7-6.7-.2-.7-.1-1.3.2-1.8.2-.3.5-.6.8-.8Z" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
};

const ExpertBadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21a7 7 0 0 1 14 0" />
    <path d="M18 8h2" />
    <path d="M4 8h2" />
  </svg>
);

const PrimaryCtaButton = ({ cta, mobile = false }) => {
  const { text, href } = getCtaDetails(cta);
  const className = [
    mobile ? "w-full px-4 py-4 text-[0.95rem]" : "w-full max-w-[640px] px-8 py-5 text-xl",
    "rounded-[18px] font-semibold transition-colors focus:outline-none inline-flex items-center justify-between gap-3 shadow-[0_10px_24px_rgba(182,138,53,0.24)] hover:opacity-90",
  ].join(" ");
  const style = { background: "linear-gradient(180deg, #C99432 0%, #B27C21 100%)", color: "#ffffff" };
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-3">
        <PrimaryCtaIcon size={mobile ? 22 : 26} />
        <span className="whitespace-nowrap">{text}</span>
      </span>
      <ArrowRightIcon size={mobile ? 24 : 32} />
    </>
  );

  return href ? (
    <a href={href} className={className} style={style}>{content}</a>
  ) : (
    <button type="button" className={className} style={style}>{content}</button>
  );
};

const ExpertContactCard = ({ cta, mobile = false }) => {
  const fallbackText = typeof cta === "string" ? cta : "Speak to an Investment Expert";
  const title = typeof cta === "object" ? cta?.heading || cta?.button_text || fallbackText : fallbackText;
  const subtitle = typeof cta === "object" ? cta?.subtext : "Get expert guidance. It's free & with no obligation.";
  const actions = typeof cta === "object" && Array.isArray(cta?.actions)
    ? cta.actions
    : [
        { label: "WhatsApp", subtext: "Chat instantly", type: "whatsapp", href: "#" },
        { label: "Call Us", subtext: "Speak directly", type: "phone", href: "#" },
        { label: "Email Us", subtext: "We'll get back", type: "email", href: "#" },
      ];

  const cardClass = mobile
    ? "rounded-[18px] border px-4 py-4"
    : "px-6 py-4";
  const cardStyle = mobile
    ? {
        background: "rgba(255,255,255,0.14)",
        borderColor: "rgba(255,255,255,0.24)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 12px 36px rgba(0,0,0,0.16)",
      }
    : {
        background: "transparent",
        borderColor: "transparent",
        boxShadow: "none",
      };
  const titleColor = mobile ? "#ffffff" : "#111111";
  const subtitleColor = mobile ? "rgba(255,255,255,0.82)" : "#5c5c5c";
  const actionTextColor = mobile ? "#ffffff" : "#111111";
  const actionSubtextColor = mobile ? "rgba(255,255,255,0.76)" : "#6a6a6a";
  const dividerColor = mobile ? "rgba(255,255,255,0.18)" : "#eadfce";
  const actionIconStyle = mobile
    ? { borderColor: "rgba(182,138,53,0.35)", color: GOLD }
    : { borderColor: "rgba(182,138,53,0.28)", color: "#B68A35" };

  return (
    <div className={cardClass} style={cardStyle}>
      <div className={mobile ? "flex flex-col gap-4" : "grid grid-cols-[1.25fr_repeat(3,1fr)] items-center"}>
        <div
          className={mobile ? "flex items-center gap-3 border-b pb-4" : "flex items-center gap-4 pr-6"}
          style={mobile ? { borderColor: dividerColor } : undefined}
        >
          <span className={mobile ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" : "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"} style={{ background: "linear-gradient(180deg, #C99432 0%, #AE7A22 100%)" }}>
            <ExpertBadgeIcon />
          </span>
          <span className="min-w-0">
            <span className={mobile ? "block text-lg font-semibold leading-tight" : "block text-xl font-semibold leading-tight"} style={{ color: titleColor }}>
              {title}
            </span>
            <span className={mobile ? "mt-1 block text-sm leading-snug" : "mt-1 block text-sm leading-relaxed"} style={{ color: subtitleColor }}>
              {subtitle}
            </span>
          </span>
        </div>

        <div className={mobile ? "grid grid-cols-3 divide-x divide-white/20" : "contents"}>
          {actions.map((action, index) => {
            const content = (
              <>
                <span className={mobile ? "mx-auto flex h-11 w-11 items-center justify-center rounded-full border" : "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"} style={actionIconStyle}>
                  <ContactIcon type={action.type} />
                </span>
                <span className={mobile ? "mt-2 block text-center" : "block min-w-0"}>
                  <span className="block text-sm font-semibold leading-tight" style={{ color: actionTextColor }}>
                    {action.label}
                  </span>
                  <span className="mt-1 block text-xs leading-tight" style={{ color: actionSubtextColor }}>
                    {action.subtext}
                  </span>
                </span>
              </>
            );

            return (
              <a
                key={`${action.label}-${index}`}
                href={action.href || "#"}
                className={mobile ? "px-2 text-center transition-opacity hover:opacity-80" : "flex items-center gap-3 border-l px-5 transition-opacity hover:opacity-80"}
                style={mobile ? undefined : { borderColor: dividerColor }}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AccordionChevron = ({ open, color = "#C7A248", size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const AccordionIconBadge = ({
  icon,
  alt,
  iconSrc,
  t,
  filled = false,
  sizeClass = "h-9 w-9",
  imageSize = 16,
}) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full ${sizeClass}`}
    style={{
      background: filled ? GOLD : t.isDark ? "rgba(182,138,53,0.12)" : "transparent",
      border: filled ? "none" : `1px solid ${t.isDark ? "rgba(217,176,95,0.3)" : "rgba(182,138,53,0.35)"}`,
      color: filled ? "#fff" : GOLD,
      boxShadow: filled
        ? `inset 0 0 0 1px ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)"}`
        : "none",
    }}
  >
    {iconSrc ? (
      <Image src={iconSrc} alt={alt || ""} width={imageSize} height={imageSize} className="object-contain" />
    ) : (
      icon || <span className="block h-4 w-4 rounded-full" aria-hidden="true" />
    )}
  </div>
);

const SecondaryAccordionButton = ({ open, onClick, title, icon, t }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-between p-5 rounded-xl text-left transition-colors"
    style={{
      background: t.isDark ? "rgba(255,255,255,0.04)" : "#FBF9F4",
      border: `1px solid ${t.isDark ? "rgba(217,176,95,0.22)" : "rgba(182,138,53,0.18)"}`,
      boxShadow: t.isDark ? "0 8px 24px rgba(0,0,0,0.22)" : "0 6px 20px rgba(17,24,39,0.04)",
    }}
  >
    <div className="flex items-center gap-3">
      <AccordionIconBadge filled icon={icon} t={t} />
      <span className="text-lg font-semibold" style={{ color: t.text }}>
        {title}
      </span>
    </div>
    <AccordionChevron open={open} size={20} color={t.isDark ? "#D9B05F" : "#C7A248"} />
  </button>
);

const TertiaryAccordionButton = ({
  open,
  onClick,
  title,
  eyebrow = "WHY THIS MATTERS",
  icon,
  iconSrc,
  t,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 text-left transition-colors"
    style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "#FFFFFF" }}
  >
    <div className="flex min-w-0 items-center gap-3 pr-4">
      <AccordionIconBadge
        icon={icon}
        iconSrc={iconSrc}
        alt={title}
        t={t}
        sizeClass="h-8 w-8"
        imageSize={14}
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium leading-snug" style={{ color: t.text }}>
          {title}
        </p>
        <p
          className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: GOLD }}
        >
          {eyebrow}
        </p>
      </div>
    </div>
    <AccordionChevron open={open} size={16} color={t.isDark ? "#D9B05F" : "#C7A248"} />
  </button>
);

const HeroSection = ({ data }) => {
  const { t } = useTheme();
  const hero = data.hero_section;
  const meta = data.project_meta || {};
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showInfra, setShowInfra] = useState(false);
  const heroImage = meta.images?.[1] || meta.images?.[0];
  const { line1, line2 } = splitHeroTitle(hero?.h1 || meta.name);
  const chipItems = [
    {
      label: hero.status_badges?.[0]?.label || meta.status || "Off-Plan",
      variant: "gold",
    },
    {
      label: meta.developer?.name || hero.status_badges?.[1]?.label,
      variant: "light",
    },
  ].filter((item) => item.label);
  const snapshotCardClass =
    "rounded-2xl p-6 lg:p-8 border flex flex-col overflow-hidden max-lg:min-h-[18rem] max-lg:max-h-[18rem] lg:h-[24rem]";
  const snapshotCardStyle = {
    border: "1px solid rgba(182,138,53,0.2)",
    background: t.isDark ? "rgba(182,138,53,0.05)" : t.cardBg,
    boxShadow: t.isDark ? "0 4px 24px rgba(0,0,0,0.25)" : "0 4px 24px rgba(0,0,0,0.08)",
  };

  const statCards = [
    {
      key: "starting_price",
      label: "Starting Price",
      value: hero.data_grid.starting_price,
      color: GOLD,
    },
    {
      key: "price_per_sqft",
      label: "Price / Sqft",
      value: hero.data_grid.price_per_sqft,
      color: "#ffffff",
    },
    {
      key: "yield_forecast",
      label: "Yield Forecast",
      value: hero.data_grid.yield_forecast,
      color: "#4ade80",
    },
    {
      key: "handover",
      label: "Handover",
      value: hero.data_grid.handover,
      color: "#ffffff",
    },
  ];
  const keyFactsSection = hero.key_facts_section || {};
  const developerSummary = keyFactsSection.developer_summary || {};
  const unitTypesAndPrices = keyFactsSection.unit_types_and_prices || {};
  const paymentPlan = keyFactsSection.payment_plan || {};
  const keyFactsBorder = "rgba(182,138,53,0.18)";
  const keyFactsDivider = t.isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const keyFactsPanelStyle = {
    background: t.isDark ? "#25282d" : "#fffefb",
    border: `1px solid ${keyFactsBorder}`,
    boxShadow: t.isDark ? "0 14px 34px rgba(0,0,0,0.28)" : "0 10px 28px rgba(0,0,0,0.06)",
  };
  const desktopFactsCardStyle = {
    borderColor: keyFactsBorder,
    background: t.isDark ? "#25282d" : "#fffefb",
    boxShadow: t.isDark ? "0 14px 34px rgba(0,0,0,0.28)" : "0 10px 30px rgba(15,23,42,0.06)",
  };
  const desktopFactsIconStyle = {
    border: `1px solid ${keyFactsBorder}`,
    color: GOLD,
    background: t.isDark ? "rgba(182,138,53,0.1)" : "#fffaf0",
  };
  const keyFactsPillStyle = {
    background: t.isDark ? "rgba(182,138,53,0.1)" : "rgba(182,138,53,0.08)",
    border: `1px solid ${keyFactsBorder}`,
    color: t.isDark ? "#e7d2a2" : "#a47b27",
  };
  const keyFactsLabelColor = t.isDark ? "rgba(255,255,255,0.76)" : "#57534e";
  const keyFactsMutedColor = t.isDark ? "rgba(255,255,255,0.58)" : "#8b8477";

  return (
    <section style={{ background: t.bg }} className="min-h-screen">
      <div className="relative overflow-hidden min-h-[640px] lg:min-h-[760px]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={meta.name || hero.h1 || "Project hero image"}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2a2d33, #141518)" }} />
        )}
        {/* Subtle bottom tint only: a little dark for contrast; photo stays clear */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] lg:h-[40%]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.06) 45%, transparent 100%)",
          }}
        />

        <div className="relative z-10 min-h-[640px] lg:min-h-[760px] max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-14 flex items-end">
          <div className="w-full max-w-[640px] lg:max-w-none">
            <div className="flex flex-wrap gap-3">
              {chipItems.map((item, i) => (
                <span
                  key={`${item.label}-${i}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{
                    background: item.variant === "gold" ? "rgba(182,138,53,0.92)" : "rgba(255,255,255,0.72)",
                    color: item.variant === "gold" ? "#ffffff" : "#4b5563",
                    border: item.variant === "gold" ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.45)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: item.variant === "gold" ? "#ffffff" : GOLD }}
                  />
                  {item.label}
                </span>
              ))}
            </div>

            <div className="relative mt-6 w-fit max-w-full">
              <div
                className="pointer-events-none absolute -inset-x-5 -inset-y-5 rounded-[34px] bg-white/70 blur-2xl sm:-inset-x-10 sm:-inset-y-6 sm:rounded-[42px]"
                aria-hidden="true"
              />
              <div className="relative">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                  <span className="block text-[#0a0a0a]" style={{ textShadow: HERO_TEXT_HALO }}>
                    {line1}
                  </span>
                  {line2 && (
                    <span className="mt-0.5 block" style={{ color: GOLD, textShadow: HERO_TEXT_HALO }}>
                      {line2}
                    </span>
                  )}
                </h1>
                <h2
                  className="mt-3 text-lg sm:text-xl lg:text-2xl font-medium"
                  style={{ color: SUBTITLE_GREY, textShadow: HERO_TEXT_HALO }}
                >
                  {hero.subtitle}
                </h2>
              </div>
            </div>

            <div className="mt-8 hidden max-w-[1080px] overflow-hidden rounded-[30px] border border-white/45 bg-white/55 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-2xl lg:block">
              <div className="grid grid-cols-4 divide-x divide-white/45">
                {statCards.map((item) => (
                  <div key={item.key} className="min-w-0 px-6 py-3">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/55 bg-white/45 text-[#B68A35]">
                      {renderStatIcon(item.key, "currentColor")}
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b835e]">
                      {item.label}
                    </p>
                    <p className={`mt-2 text-2xl font-semibold tracking-tight text-[#161616] ${item.key === "price_per_sqft" ? "whitespace-nowrap" : ""}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col items-center gap-4 border-t border-white/45 pt-5">
                <PrimaryCtaButton cta={hero.cta_primary} />
                <ExpertContactCard cta={hero.cta_secondary} />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 lg:hidden">
              {statCards.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl p-3 sm:p-4 lg:p-4 min-w-0"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.24)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 12px 36px rgba(0,0,0,0.16)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs font-medium text-white/88 leading-tight">
                        {item.label}
                      </p>
                      <p
                        className={`mt-1.5 font-semibold tracking-tight text-lg sm:text-xl lg:text-2xl ${item.key === "price_per_sqft" ? "whitespace-nowrap" : ""}`}
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </p>
                    </div>
                    <div className="mt-0.5 text-white/90">
                      {renderStatIcon(item.key, "rgba(255,255,255,0.9)")}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-5 lg:hidden">
              <PrimaryCtaButton cta={hero.cta_primary} mobile />
              <ExpertContactCard cta={hero.cta_secondary} mobile />
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview + Investor’s Snapshot: mobile = equal height; overview scrolls inside */}
      <div className="max-w-7xl mx-auto px-2 py-6 lg:py-10">
        <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
          <div className={snapshotCardClass} style={snapshotCardStyle}>
            <h3
              className="shrink-0 text-lg lg:text-2xl font-semibold mb-4 flex items-center gap-3"
              style={{ color: t.text }}
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ border: `1px solid rgba(182,138,53,0.35)`, color: GOLD }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V7l8-4v18" />
                  <path d="M19 21V11l-6-3" />
                  <path d="M9 9h.01" />
                  <path d="M9 13h.01" />
                  <path d="M9 17h.01" />
                </svg>
              </span>
              <span>
                Project Overview
                <span className="mt-2 block h-px w-14" style={{ background: GOLD }} />
              </span>
            </h3>
            <div
              className="min-h-0 flex-1 overflow-y-auto pr-1.5 text-base lg:text-sm leading-relaxed lg:leading-7 scrollbar-gold"
              style={{ color: t.textSecondary }}
            >
              {hero.overview_paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={i > 0 ? "mt-6" : ""}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>

          <div className={snapshotCardClass} style={snapshotCardStyle}>
            <h3
              className="shrink-0 text-lg lg:text-2xl font-semibold mb-4 flex items-center gap-3"
              style={{ color: t.text }}
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ border: `1px solid rgba(182,138,53,0.35)`, color: GOLD }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="4" y1="20" x2="4" y2="10" />
                  <line x1="10" y1="20" x2="10" y2="5" />
                  <line x1="16" y1="20" x2="16" y2="12" />
                  <path d="M2 20h20" />
                </svg>
              </span>
              <span>
                Investor Snapshot
                <span className="mt-2 block h-px w-14" style={{ background: GOLD }} />
              </span>
            </h3>
            <div
              className="min-h-0 flex-1 overflow-y-auto pr-1.5 text-base lg:text-sm leading-relaxed lg:leading-7 scrollbar-gold"
              style={{ color: t.textSecondary, scrollbarWidth: "thin" }}
            >
              {Array.isArray(hero.data_led_hook) ? (
                <ul className="m-0 space-y-3">
                  {hero.data_led_hook.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3"
                    >
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full" style={{ background: GOLD }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className="m-0"
                  dangerouslySetInnerHTML={{ __html: hero.data_led_hook }}
                />
              )}
            </div>
          </div>
        </div>

        {hero.explore_link && (
          <div className="mt-6 flex justify-center">
            <a
              href={hero.explore_link.href || "#"}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-90 cursor-pointer"
              style={{ color: "#B68A35" }}
            >
              {hero.explore_link.text}
              <span aria-hidden>→</span>
            </a>
          </div>
        )}

        <div className="mt-16 hidden lg:block">
          <h3 className="text-center text-[2rem] font-semibold tracking-tight" style={{ color: t.text }}>
            <span>{keyFactsSection.title_prefix || "Key Facts at a"} </span>
            <span style={{ color: GOLD }}>{keyFactsSection.title_accent || "Glance"}</span>
          </h3>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border p-6" style={desktopFactsCardStyle}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={desktopFactsIconStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4v18" />
                    <path d="M19 21V11l-6-3" />
                    <path d="M9 10h.01" />
                    <path d="M9 14h.01" />
                    <path d="M9 18h.01" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-base font-medium" style={{ color: t.text }}>Developer</p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: t.textSecondary }}>{developerSummary.name || meta.developer?.name}</p>
                  {(developerSummary.founded_label || meta.developer?.founded_year) && (
                    <p className="text-xs" style={{ color: keyFactsMutedColor }}>
                      {developerSummary.founded_label || `Founded ${meta.developer?.founded_year}`}
                    </p>
                  )}
                </div>
              </div>
              {(developerSummary.highlights || []).length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {developerSummary.highlights.map((item, i) => (
                    <span key={`${item}-${i}`} className="rounded-full px-3 py-1 text-[11px]" style={keyFactsPillStyle}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border p-6" style={desktopFactsCardStyle}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={desktopFactsIconStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3 4 7v6c0 5 3.5 7.5 8 8 4.5-.5 8-3 8-8V7l-8-4Z" />
                    <path d="m9 12 2 2 4-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium" style={{ color: t.text }}>{keyFactsSection.project_status?.label || "Project Status"}</p>
                  {keyFactsSection.project_status?.badge && (
                    <span className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium" style={keyFactsPillStyle}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                      {keyFactsSection.project_status.badge}
                    </span>
                  )}
                  {keyFactsSection.project_status?.note && (
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: keyFactsMutedColor }}>{keyFactsSection.project_status.note}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border p-6" style={desktopFactsCardStyle}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={desktopFactsIconStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium" style={{ color: t.text }}>{keyFactsSection.handover?.label || "Handover Date"}</p>
                  <p className="mt-4 text-xl font-semibold" style={{ color: t.text }}>{keyFactsSection.handover?.value}</p>
                  {keyFactsSection.handover?.note && (
                    <p className="mt-2 text-sm" style={{ color: keyFactsMutedColor }}>{keyFactsSection.handover.note}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border p-6" style={desktopFactsCardStyle}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={desktopFactsIconStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 11 12 4l9 7" />
                    <path d="M5 10v10h14V10" />
                    <path d="M9 20v-6h6v6" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium" style={{ color: t.text }}>{keyFactsSection.total_units?.label || "Total Units (Project)"}</p>
                  <p className="mt-4 text-xl font-semibold" style={{ color: t.text }}>{keyFactsSection.total_units?.value}</p>
                  {keyFactsSection.total_units?.note && (
                    <p className="mt-2 text-sm" style={{ color: keyFactsMutedColor }}>{keyFactsSection.total_units.note}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border p-6" style={desktopFactsCardStyle}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={desktopFactsIconStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="7" r="3" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                    <path d="M19 8h2" />
                    <path d="M3 8h2" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium" style={{ color: t.text }}>{keyFactsSection.master_community?.label || "Master Community"}</p>
                  <p className="mt-4 text-xl font-semibold leading-snug" style={{ color: t.text }}>{keyFactsSection.master_community?.value}</p>
                  {keyFactsSection.master_community?.note && (
                    <p className="mt-2 text-sm" style={{ color: keyFactsMutedColor }}>{keyFactsSection.master_community.note}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border p-6" style={desktopFactsCardStyle}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={desktopFactsIconStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 21h18" />
                    <path d="M6 21v-8h5v8" />
                    <path d="M13 21V9h5v12" />
                    <path d="M8 9h.01" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-medium" style={{ color: t.text }}>{unitTypesAndPrices.label || "Unit Types & Prices"}</p>
                  <div className="mt-4 space-y-2">
                    {(unitTypesAndPrices.items || []).slice(0, 3).map((item, i) => (
                      <div key={`${item.type}-${i}`} className="grid grid-cols-[1fr_auto] gap-3 text-xs">
                        <div className="min-w-0">
                          <span className="font-medium" style={{ color: t.text }}>{item.type}</span>
                          {item.count && <span style={{ color: keyFactsMutedColor }}> {item.count}</span>}
                        </div>
                        <span className="whitespace-nowrap" style={{ color: t.text }}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  {unitTypesAndPrices.summary && (
                    <p className="mt-3 text-xs text-right" style={{ color: keyFactsMutedColor }}>{unitTypesAndPrices.summary}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border p-6" style={desktopFactsCardStyle}>
            <div className="grid grid-cols-[220px_1fr] items-center gap-8">
              <div>
                <p className="text-2xl font-semibold leading-tight" style={{ color: t.text }}>{paymentPlan.label || "Payment Plan"}</p>
                {paymentPlan.summary && <p className="mt-1 text-2xl font-semibold" style={{ color: GOLD }}>({paymentPlan.summary})</p>}
              </div>
              <div>
                <div className="h-3 overflow-hidden rounded-full" style={{ background: "rgba(182,138,53,0.16)" }}>
                  <div className="flex h-full">
                    {(paymentPlan.milestones || []).map((item, i) => (
                      <div
                        key={`${item.title}-${i}`}
                        className="h-full"
                        style={{
                          width: `${item.percent || 0}%`,
                          background: i === 0 ? "#b68a35" : i === 1 ? "#d9b05f" : "#ead5a8",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 divide-x" style={{ borderColor: keyFactsDivider }}>
                  {(paymentPlan.milestones || []).map((item, i) => (
                    <div key={`${item.title}-${i}`} className="px-6 text-center first:pl-0 last:pr-0">
                      <p className="text-2xl font-semibold" style={{ color: GOLD }}>{item.percent}%</p>
                      <p className="mt-1 text-sm font-medium" style={{ color: t.text }}>{item.title}</p>
                      {item.note && <p className="mt-1 text-xs" style={{ color: keyFactsMutedColor }}>{item.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:hidden">
          <h3 className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] font-semibold tracking-tight" style={{ color: t.text }}>
            <span>{keyFactsSection.title_prefix || "Key Facts at a"} </span>
            <span style={{ color: GOLD }}>{keyFactsSection.title_accent || "Glance"}</span>
          </h3>

          <div className="mt-6 overflow-hidden rounded-[28px]" style={keyFactsPanelStyle}>
            <div className="px-5 py-5 sm:px-6 sm:py-6 lg:px-8 flex items-start gap-4 sm:gap-5">
              <div
                className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden shrink-0"
                style={{ border: `1px solid ${keyFactsBorder}`, background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffaf0" }}
              >
                {developerSummary.logo || meta.developer?.logo_url ? (
                  <Image
                    src={developerSummary.logo || meta.developer?.logo_url}
                    alt={`${developerSummary.name || meta.developer?.name || "Developer"} logo`}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold" style={{ color: GOLD }}>
                    {(developerSummary.name || meta.developer?.name || "D").charAt(0)}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xl sm:text-2xl font-semibold tracking-tight" style={{ color: t.text }}>
                  {developerSummary.name || meta.developer?.name}
                </p>
                {(developerSummary.founded_label || (meta.developer?.founded_year ? `Founded ${meta.developer.founded_year}` : null)) && (
                  <p className="mt-1 text-sm sm:text-base" style={{ color: keyFactsMutedColor }}>
                    {developerSummary.founded_label || `Founded ${meta.developer?.founded_year}`}
                  </p>
                )}

                {(developerSummary.highlights || []).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {developerSummary.highlights.map((item, i) => (
                      <span
                        key={`${item}-${i}`}
                        className="inline-flex rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium"
                        style={keyFactsPillStyle}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
                <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                  {keyFactsSection.project_status?.label || "Project Status"}
                </p>
                <div className="shrink-0 text-right">
                  {keyFactsSection.project_status?.badge && (
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                      style={keyFactsPillStyle}
                    >
                      <span className="inline-block h-2 w-2 rounded-full" style={{ background: GOLD }} />
                      {keyFactsSection.project_status.badge}
                    </span>
                  )}
                  {keyFactsSection.project_status?.note && (
                    <p className="mt-2 text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                      {keyFactsSection.project_status.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
                <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                  {keyFactsSection.handover?.label || "Handover Date"}
                </p>
                <div className="shrink-0 text-right">
                  <p className="text-xl sm:text-[1.75rem] font-semibold tracking-tight" style={{ color: t.text }}>
                    {keyFactsSection.handover?.value}
                  </p>
                  {keyFactsSection.handover?.note && (
                    <p className="mt-1 text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                      {keyFactsSection.handover.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
                <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                  {keyFactsSection.total_units?.label || "Total Units (Project)"}
                </p>
                <div className="shrink-0 text-right">
                  <p className="text-xl sm:text-[1.75rem] font-semibold tracking-tight" style={{ color: t.text }}>
                    {keyFactsSection.total_units?.value}
                  </p>
                  {keyFactsSection.total_units?.note && (
                    <p className="mt-1 text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                      {keyFactsSection.total_units.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
                <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                  {keyFactsSection.master_community?.label || "Master Community"}
                </p>
                <div className="shrink-0 text-right">
                  <p className="text-xl sm:text-[1.75rem] font-semibold tracking-tight" style={{ color: t.text }}>
                    {keyFactsSection.master_community?.value}
                  </p>
                  {keyFactsSection.master_community?.note && (
                    <p className="mt-1 text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                      {keyFactsSection.master_community.note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="px-5 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                    {unitTypesAndPrices.label || "Unit Types & Prices"}
                  </p>
                  {unitTypesAndPrices.summary && (
                    <p className="text-xs sm:text-sm sm:text-right" style={{ color: keyFactsMutedColor }}>
                      {unitTypesAndPrices.summary}
                    </p>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  {(unitTypesAndPrices.items || []).map((item, i) => (
                    <div
                      key={`${item.type}-${i}`}
                      className={`grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 ${i > 0 ? "pt-3" : ""}`}
                      style={i > 0 ? { borderTop: `1px solid ${keyFactsDivider}` } : undefined}
                    >
                      <div className="min-w-0 flex items-center gap-2">
                        <span className="mt-0.5 inline-block h-2 w-2 rounded-full shrink-0" style={{ background: GOLD }} />
                        <p className="min-w-0 text-base sm:text-lg font-medium" style={{ color: t.text }}>
                          {item.type}
                        </p>
                        {item.count && (
                          <span className="text-xs sm:text-sm whitespace-nowrap" style={{ color: keyFactsMutedColor }}>
                            {item.count}
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-base sm:text-lg font-medium whitespace-nowrap" style={{ color: t.text }}>
                          {item.price}
                        </p>
                        {item.note && (
                          <p className="text-xs sm:text-sm" style={{ color: keyFactsMutedColor }}>
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${keyFactsDivider}` }}>
              <div className="px-5 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <p className="text-sm sm:text-base" style={{ color: keyFactsLabelColor }}>
                    {paymentPlan.label || "Payment Plan"}
                  </p>
                  {paymentPlan.summary && (
                    <span className="inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium sm:ml-auto" style={keyFactsPillStyle}>
                      {paymentPlan.summary}
                    </span>
                  )}
                </div>

                <div
                  className="mt-4 h-2.5 overflow-hidden rounded-full"
                  style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)" }}
                >
                  <div className="flex h-full">
                    {(paymentPlan.milestones || []).map((item, i) => (
                      <div
                        key={`${item.title}-${i}`}
                        className="h-full"
                        style={{
                          width: `${item.percent || 0}%`,
                          background: i === 0 ? "#b68a35" : i === 1 ? "#d9b05f" : "#edd9ac",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="mt-4 grid grid-cols-3"
                  style={{ borderTop: `1px solid ${keyFactsDivider}` }}
                >
                  {(paymentPlan.milestones || []).map((item, i) => (
                    <div
                      key={`${item.title}-${i}`}
                      className={`pt-4 ${i > 0 ? "pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}
                      style={i > 0 ? { borderLeft: `1px solid ${keyFactsDivider}` } : undefined}
                    >
                      <p className="text-2xl sm:text-[1.75rem] font-semibold tracking-tight" style={{ color: GOLD }}>
                        {item.percent}%
                      </p>
                      <p className="mt-1 text-sm sm:text-base font-medium" style={{ color: t.text }}>
                        {item.title}
                      </p>
                      {item.note && (
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed" style={{ color: keyFactsMutedColor }}>
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Accordion */}
        <div className="mt-16 hidden grid-cols-[0.95fr_1.65fr] gap-5 lg:grid">
          <div className="relative overflow-hidden rounded-[28px] border p-8" style={desktopFactsCardStyle}>
            <h3 className="text-3xl font-semibold leading-tight" style={{ color: t.text }}>
              Future Infrastructure
              <span className="block" style={{ color: GOLD }}>&amp; Economic Development</span>
            </h3>
            <span className="mt-5 block h-px w-20" style={{ background: GOLD }} />
            <p className="mt-6 text-sm leading-7" style={{ color: t.textSecondary }}>
              Strategic infrastructure, connectivity, and long-term growth drivers that may support demand around the project.
            </p>
            <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-72 rounded-full border border-[#ead9b7] opacity-50" />
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-60"
              style={{
                background: t.isDark
                  ? "linear-gradient(to top, rgba(182,138,53,0.1), transparent)"
                  : "linear-gradient(to top, #fff7e8, transparent)",
              }}
            />
          </div>

          <div className="space-y-2">
            {hero.infrastructure_items.map((item, i) => {
              const isOpen = openAccordion === i || (openAccordion === null && i === 0);

              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border"
                  style={desktopFactsCardStyle}
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={desktopFactsIconStyle}>
                        {i + 1}
                      </span>
                      <span className="text-base font-medium" style={{ color: t.text }}>{item.title}</span>
                    </div>
                    <AccordionChevron open={isOpen} size={18} color={GOLD} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-44 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-20 pb-5">
                      <p className="text-sm leading-7" style={{ color: t.textSecondary }}>{item.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 lg:hidden">
          <SecondaryAccordionButton
            open={showInfra}
            onClick={() => setShowInfra(!showInfra)}
            title="Future Infrastructure & Economic Development"
            t={t}
            icon={(
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            )}
          />

          <div className={`overflow-hidden transition-all duration-500 ${showInfra ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
            <div className="space-y-3">
              {hero.infrastructure_items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
                    border: `1px solid ${t.isDark ? "rgba(217,176,95,0.16)" : "rgba(182,138,53,0.14)"}`,
                    boxShadow: t.isDark ? "0 10px 24px rgba(0,0,0,0.18)" : "0 4px 18px rgba(17,24,39,0.03)",
                  }}
                >
                  <TertiaryAccordionButton
                    open={openAccordion === i}
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    title={item.title}
                    t={t}
                  />
                  <div className={`overflow-hidden transition-all duration-300 ${openAccordion === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-4 pb-4 pt-0">
                      <div style={{ borderTop: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)"}` }} />
                      <p className="pt-4 text-sm leading-relaxed" style={{ color: t.textSecondary }}>{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;