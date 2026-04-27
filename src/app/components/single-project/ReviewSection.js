"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const CONSTRUCTIVE = "#6F764B";

const Icon = ({ name, size = 18 }) => {
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

  const paths = {
    review: (
      <>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H13l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
        <path d="M8 9h8" />
        <path d="M8 12h5" />
      </>
    ),
    building: (
      <>
        <path d="M4 20h16" />
        <path d="M6 20V9h6v11" />
        <path d="M12 20V4h6v16" />
        <path d="M8.5 12h1" />
        <path d="M8.5 15h1" />
        <path d="M14.5 8h1" />
        <path d="M14.5 11h1" />
        <path d="M14.5 14h1" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="5" width="14" height="16" rx="2" />
        <path d="M9 5a3 3 0 0 1 6 0" />
        <path d="M9 9h6" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19h16" />
        <path d="M7 16V9" />
        <path d="M12 16V5" />
        <path d="M17 16v-4" />
      </>
    ),
    quote: (
      <>
        <path d="M9 11H5a4 4 0 0 1 4-4v8a3 3 0 0 1-3 3" />
        <path d="M19 11h-4a4 4 0 0 1 4-4v8a3 3 0 0 1-3 3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
        <path d="M9 11h4" />
        <path d="M11 9v4" />
      </>
    ),
    megaphone: (
      <>
        <path d="M4 13h3l9 4V7l-9 4H4v2Z" />
        <path d="M7 13l1 5h3" />
        <path d="M19 9a4 4 0 0 1 0 6" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3 9.8 8.8 4 11l5.8 2.2L12 19l2.2-5.8L20 11l-5.8-2.2L12 3Z" />
        <path d="M19 3v4" />
        <path d="M21 5h-4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </>
    ),
    wallet: (
      <>
        <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5H18v14H7.5A2.5 2.5 0 0 1 5 16.5v-9Z" />
        <path d="M18 10h-4a2 2 0 0 0 0 4h4" />
        <path d="M14 12h.01" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3" />
        <path d="M12 19v3" />
        <path d="m4.9 4.9 2.1 2.1" />
        <path d="m17 17 2.1 2.1" />
        <path d="M2 12h3" />
        <path d="M19 12h3" />
        <path d="m4.9 19.1 2.1-2.1" />
        <path d="m17 7 2.1-2.1" />
      </>
    ),
    home: (
      <>
        <path d="m4 11 8-7 8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M10 20v-6h4v6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.review}</svg>;
};

const ChevronIcon = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const IconBadge = ({ children, filled = false, t, className = "h-10 w-10" }) => (
  <span
    className={`flex shrink-0 items-center justify-center rounded-lg ${className}`}
    style={{
      background: filled ? GOLD : t.isDark ? "rgba(182,138,53,0.14)" : "#FBF3E4",
      border: filled ? "none" : `1px solid ${t.isDark ? "rgba(217,176,95,0.24)" : "rgba(182,138,53,0.16)"}`,
      color: filled ? "#fff" : GOLD,
    }}
  >
    {children}
  </span>
);

const AccordionCard = ({ title, eyebrow, icon, open, onToggle, children, t }) => (
  <div
    className="overflow-hidden rounded-2xl"
    style={{
      background: t.cardBg,
      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE8DF"}`,
      boxShadow: t.isDark ? "0 14px 34px rgba(0,0,0,0.25)" : "0 12px 28px rgba(15,23,42,0.04)",
    }}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
      style={{ color: t.text }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <IconBadge filled t={t}>{icon}</IconBadge>
        <div className="min-w-0">
          <h3 className="font-serif text-[18px] font-medium leading-snug sm:text-xl">{title}</h3>
          {eyebrow && (
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
              {eyebrow}
            </p>
          )}
        </div>
      </div>
      <span style={{ color: GOLD }}>
        <ChevronIcon open={open} />
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="px-4 pb-5 pt-4 sm:px-5" style={{ borderTop: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#EFECE5"}` }}>
        {children}
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, value, label, detail, t }) => (
  <div
    className="rounded-2xl px-3 py-4 text-center"
    style={{
      background: t.cardBg,
      border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE8DF"}`,
      boxShadow: t.isDark ? "0 10px 26px rgba(0,0,0,0.2)" : "0 12px 24px rgba(15,23,42,0.05)",
    }}
  >
    <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg" style={{ color: GOLD, background: t.isDark ? "rgba(182,138,53,0.12)" : "#FBF3E4" }}>
      {icon}
    </div>
    <p className="font-serif text-2xl leading-none" style={{ color: t.text }}>
      {value}
    </p>
    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
      {label}
    </p>
    {detail && (
      <p className="mt-1 text-[10px] font-semibold" style={{ color: t.textMuted }}>
        {detail}
      </p>
    )}
  </div>
);

const iconMap = {
  reviews: "review",
  review: "review",
  communities: "building",
  building: "building",
  period: "calendar",
  calendar: "calendar",
};

const getSentimentColor = (item) => {
  return item.color || CONSTRUCTIVE;
};

/* ── Animated sentiment bar ── */
const SentimentBar = ({ item, t }) => {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  const color = getSentimentColor(item);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(item.percent); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [item.percent]);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-4"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.035)" : "#FFFEFC",
        border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE8DF"}`,
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
          <span className="font-medium" style={{ color: t.text }}>{item.label}</span>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ border: `1px solid ${color}40`, color }}>
          {item.percent}%
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "#EFECE5" }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: color }} />
      </div>
      <p className="mt-3 text-sm italic leading-6" style={{ color: t.textSecondary }}>{item.themes}</p>
    </div>
  );
};

/* ── Quote card ── */
const QuoteCard = ({ quote, accentColor, t }) => {
  const [source, date] = String(quote.source || "").split(", ");

  return (
    <div
      className="relative overflow-hidden rounded-2xl py-4 pl-4 pr-10"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.035)" : "#FFFEFC",
        border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE8DF"}`,
        borderLeft: `3px solid ${accentColor}`,
      }}
    >
      <p className="text-sm italic leading-6" style={{ color: t.textSecondary }}>
        &quot;{quote.text}&quot;
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold" style={{ color: t.textMuted }}>
        <span style={{ color: GOLD }}>{source}</span>
        {date && <span className="h-1 w-1 rounded-full" style={{ background: t.textMuted }} />}
        {date && <span>{date}</span>}
      </div>
      <span className="absolute right-4 top-4 font-serif text-4xl leading-none opacity-30" style={{ color: accentColor }}>
        &quot;
      </span>
    </div>
  );
};

const QuoteGroup = ({ label, quotes, color, t }) => (
  <div>
    <div className="mb-3 flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
        {label}
      </p>
    </div>
    <div className="space-y-3">
      {(quotes || []).map((q, i) => (
        <QuoteCard key={i} quote={q} accentColor={color} t={t} />
      ))}
    </div>
  </div>
);

const PatternCard = ({ row, index, t }) => {
  const icons = ["clock", "wallet", "sun", "home"];

  return (
    <div
      className="flex gap-3 rounded-2xl p-4"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.035)" : "#FFFEFC",
        border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE8DF"}`,
      }}
    >
      <IconBadge t={t} className="h-9 w-9">
        <Icon name={icons[index] || "search"} size={16} />
      </IconBadge>
      <div>
        <p className="text-sm font-semibold leading-5" style={{ color: t.text }}>
          {row[0]}
        </p>
        <p className="mt-1 text-xs leading-6" style={{ color: t.textSecondary }}>
          {row[1]}
        </p>
      </div>
    </div>
  );
};

const FutureCard = ({ item, t }) => {
  const [title, description] = String(item).split(" — ");

  return (
    <div
      className="flex gap-3 rounded-2xl p-4"
      style={{
        background: t.isDark ? "rgba(255,255,255,0.035)" : "#FFFEFC",
        border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE8DF"}`,
      }}
    >
      <IconBadge t={t} className="h-9 w-9">
        <Icon name="spark" size={16} />
      </IconBadge>
      <div>
        <p className="text-sm font-semibold leading-5" style={{ color: t.text }}>
          {title}
        </p>
        {description && (
          <p className="mt-1 text-xs leading-6" style={{ color: t.textSecondary }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

/* ── Main Component ── */
const ReviewsSection = ({ data }) => {
  const { t } = useTheme();
  const [openAccordions, setOpenAccordions] = useState({
    methodology: true,
    sentiment: true,
    quotes: true,
    patterns: true,
    future: true,
  });

  const sentiment = data.sentiment || {};
  const quotes = data.quotes || {};
  const pattern = data.pattern_analysis || {};
  const future = data.future_reviews || {};
  const headerTitle = data.title || "";
  const headerHighlight = data.title_highlight || "";
  const titleParts = headerHighlight ? headerTitle.split(headerHighlight) : [headerTitle];
  const reviewStats = data.stats || [];
  const methodologyCommunities = data.methodology_communities || [];
  const quoteGroups = data.quote_groups || [];

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="reviews" className="px-2 py-8 sm:px-6 lg:px-8 lg:py-12" style={{ background: t.bgAlt }}>
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mx-auto max-w-xl font-serif text-[28px] font-medium leading-tight sm:text-4xl" style={{ color: t.text }}>
            {headerHighlight && titleParts.length > 1 ? (
              <>
                {titleParts[0]}
                <span className="italic" style={{ color: GOLD }}>
                  {headerHighlight}
                </span>
                {titleParts.slice(1).join(headerHighlight)}
              </>
            ) : (
              headerTitle
            )}
            {data.subtitle && <span className="block text-[22px] sm:text-3xl">{data.subtitle}</span>}
          </h2>
          {data.intro && (
            <p className="mx-auto mt-4 max-w-sm text-sm leading-6" style={{ color: t.textSecondary }}>
              {data.intro}
            </p>
          )}
        </div>

        {reviewStats.length > 0 && (
          <div className="mb-6 grid grid-cols-3 gap-3">
            {reviewStats.map((stat, index) => (
              <StatCard
                key={`${stat.label}-${index}`}
                icon={<Icon name={iconMap[stat.icon] || stat.icon || "review"} size={17} />}
                value={stat.value}
                label={stat.label}
                detail={stat.detail}
                t={t}
              />
            ))}
          </div>
        )}

        <div className="space-y-4">
          <AccordionCard
            title={data.methodology_title}
            eyebrow={data.methodology_eyebrow}
            icon={<Icon name="clipboard" />}
            open={openAccordions.methodology}
            onToggle={() => toggleAccordion("methodology")}
            t={t}
          >
            <p className="text-sm leading-7" style={{ color: t.textSecondary }}>
              {data.methodology}
            </p>
            {methodologyCommunities.length > 0 && (
              <div className="mt-5 space-y-3">
                {methodologyCommunities.map((community, index) => (
                <div
                  key={community.title || community.name}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.035)" : "#FFFEFC",
                    border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "#ECE8DF"}`,
                  }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold" style={{ background: t.isDark ? "rgba(182,138,53,0.14)" : "#F8EFD9", color: GOLD }}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: t.text }}>{community.title || community.name}</p>
                    <p className="text-xs" style={{ color: t.textMuted }}>{community.description}</p>
                  </div>
                </div>
                ))}
              </div>
            )}
            {data.methodology_sources && (
              <div className="mt-5 border-l-2 p-4" style={{ borderColor: GOLD, background: t.isDark ? "rgba(182,138,53,0.08)" : "#FBF8F1" }}>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{data.methodology_sources_title}</p>
                <p className="text-xs leading-6" style={{ color: t.textSecondary }}>
                  {data.methodology_sources}
                </p>
              </div>
            )}
          </AccordionCard>

          <AccordionCard
            title={sentiment.title}
            eyebrow={sentiment.eyebrow}
            icon={<Icon name="chart" />}
            open={openAccordions.sentiment}
            onToggle={() => toggleAccordion("sentiment")}
            t={t}
          >
            {sentiment.intro && (
              <p className="mb-5 text-sm italic leading-6" style={{ color: t.textSecondary }}>
                {sentiment.intro}
              </p>
            )}
            <div className="space-y-4">
              {(sentiment.items || []).map((item, i) => (
                <SentimentBar key={i} item={item} t={t} />
              ))}
            </div>
            <div className="mt-5 rounded-xl px-4 py-3" style={{ background: t.isDark ? "rgba(182,138,53,0.08)" : "#FBF8F1" }}>
              <p className="text-xs italic leading-6" style={{ color: t.textMuted }}>{sentiment.source_label}: {sentiment.source}</p>
            </div>
          </AccordionCard>

          <AccordionCard
            title={quotes.title}
            eyebrow={quotes.eyebrow}
            icon={<Icon name="quote" />}
            open={openAccordions.quotes}
            onToggle={() => toggleAccordion("quotes")}
            t={t}
          >
            {quotes.intro && (
              <p className="mb-5 text-sm leading-6" style={{ color: t.textSecondary }}>
                {quotes.intro}
              </p>
            )}
            <div className="space-y-6">
              {quoteGroups.map((group) => (
                <QuoteGroup key={group.key} label={group.label} quotes={quotes[group.key]} color={group.color} t={t} />
              ))}
            </div>
          </AccordionCard>

          <AccordionCard
            title={pattern.title}
            icon={<Icon name="search" />}
            open={openAccordions.patterns}
            onToggle={() => toggleAccordion("patterns")}
            t={t}
          >
            <div className="space-y-3">
              {(pattern.rows || []).map((row, i) => (
                <PatternCard key={i} row={row} index={i} t={t} />
              ))}
            </div>
          </AccordionCard>

          <AccordionCard
            title={future.title}
            eyebrow={future.eyebrow}
            icon={<Icon name="megaphone" />}
            open={openAccordions.future}
            onToggle={() => toggleAccordion("future")}
            t={t}
          >
            {future.intro && (
              <p className="mb-5 text-sm leading-6" style={{ color: t.textSecondary }}>
                {future.intro}
              </p>
            )}
            <div className="space-y-3">
              {(future.items || []).map((item, i) => (
                <FutureCard key={i} item={item} t={t} />
              ))}
            </div>
            {data.transparency_note && (
              <div className="mt-5 border-l-2 p-4" style={{ borderColor: GOLD, background: t.isDark ? "rgba(182,138,53,0.08)" : "#FBF8F1" }}>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{data.transparency_title}</p>
                <p className="text-xs leading-6" style={{ color: t.textSecondary }}>
                  {data.transparency_note}
                </p>
              </div>
            )}
          </AccordionCard>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
