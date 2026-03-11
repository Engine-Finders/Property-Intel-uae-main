"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ExternalLink, Search, CheckCircle2, Building2, Home, BarChart3, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import StarRating from "../sub-components/StarRating";

// Placeholder icons (replace with real DLD/RERA icons later)
const DldIconPlaceholder = () => (
  <span className="inline-flex w-5 h-5 rounded items-center justify-center text-[9px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" title="DLD">DLD</span>
);
const ReraIconPlaceholder = () => (
  <span className="inline-flex w-5 h-5 rounded items-center justify-center text-[9px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" title="RERA">RERA</span>
);

const H1_HEADING = "Emaar Properties - Projects, Payment Plans & Reviews (2026)";
const H1_PARAGRAPH = "Explore Emaar's complete portfolio: 200+ projects across Dubai. Compare payment plans, check delivery history, and read verified resident reviews.";

const statIcons = [CheckCircle2, Building2, Home, BarChart3, Clock, ShieldCheck];

const DeveloperHeroSection = ({ data }) => {
  const { t } = useTheme();
  const hero = data?.hero_section || {};
  const [showSources, setShowSources] = useState(false);

  const tabs = [
    {
      stacked: [
        { label: "DLD", value: "Registered", iconPlaceholder: DldIconPlaceholder },
        { label: "RERA", value: "Approved", iconPlaceholder: ReraIconPlaceholder },
      ],
    },
    { label: "Years Active", value: "29 Years", sub: "Founded in 1997", icon: 1 },
    { label: "Units Delivered", value: "123,500+", sub: "Globally as of Nov 2025", icon: 2 },
    { label: "Projects Launched", value: "351", sub: "293 completed + 58 under construction", icon: 3 },
    { label: "Avg. Project Delay (Last 5)", value: "3-6 Months", icon: 4 },
    { label: "PropertyIntel Trust Score", value: "9.0 / 10", sub: "Verified by PropertyIntel Research • 21 February 2026", icon: 5, highlight: true, stars: 4.5 },
  ];

  const contact = {
    phone: "tel:+971600000000",
    email: "mailto:expert@example.com",
    whatsapp: "https://wa.me/971600000000",
  };

  return (
    <section style={{ background: t.bg }} className="pb-6 lg:pb-10 overflow-x-hidden">
      {/* MOBILE: Full-width hero (outside container) — hero-mobile.webp */}
      <div className="lg:hidden relative" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <div className="relative w-full min-h-[400px] sm:min-h-[440px]">
          <Image
            src="/developer/hero-mobile.webp"
            alt="Emaar Properties"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-[134px] text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">{H1_HEADING}</h1>
            <p className="text-sm text-white/90 mt-2 max-w-md leading-relaxed">{H1_PARAGRAPH}</p>
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-lg mt-4 flex-shrink-0" style={{ border: "3px solid rgba(255,255,255,0.3)" }}>
              <Image src="/developer/emaar-logo.png" width={64} height={64} alt="Emaar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${t.bg}, transparent)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="hidden lg:block relative mt-[34px]">
          {/* Desktop: Logo half on image, half outside — top center */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden shadow-lg" style={{ border: `3px solid ${t.bg}` }}>
              <Image src="/developer/emaar-logo.png" width={80} height={80} alt="Emaar Properties Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden h-[440px] xl:h-[500px]">
            <Image
              src="/projects/villa-render-1.jpg"
              alt="Emaar Properties portfolio"
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-start pt-4 xl:pt-18 p-8 xl:p-10"
            >
              <h1 className="text-3xl xl:text-4xl font-bold text-white drop-shadow-lg max-w-3xl">{H1_HEADING}</h1>
              <p className="text-base xl:text-lg text-white/95 mt-3 max-w-2xl leading-relaxed">{H1_PARAGRAPH}</p>
            </div>
          </div>
          <div className="mt-6 text-left">
            <h2 className="text-lg xl:text-xl font-bold" style={{ color: t.text }}>{hero.title}</h2>
            <p className="mt-1 text-sm" style={{ color: t.textSecondary }}>{hero.subtitle}</p>
          </div>
        </div>

        {/* Trust metrics — 2-col mobile (sub hidden on mobile), 3-col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-2 lg:mt-8">
          {tabs.map((tab, i) => {
            if (tab.stacked) {
              return (
                <div
                  key={i}
                  className="rounded-xl p-4 flex flex-col gap-3"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                  }}
                >
                  {tab.stacked.map((item, j) => {
                    const PlaceholderIcon = item.iconPlaceholder;
                    return (
                    <div key={j} className="flex items-center gap-3">
                      <span className="shrink-0">
                        <PlaceholderIcon />
                      </span>
                      <div className="min-w-0 flex items-baseline gap-2 flex-wrap">
                        <p className="text-[10px] lg:text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{item.label}</p>
                        <p className="text-xs lg:text-base xl:text-lg font-bold" style={{ color: t.text }}>{item.value}</p>
                      </div>
                    </div>
                    );
                  })}
                </div>
              );
            }
            const Icon = tab.iconPlaceholder ? null : statIcons[tab.icon];
            const IconPlaceholder = tab.iconPlaceholder;
            return (
              <div
                key={i}
                className="rounded-xl p-4 flex items-start gap-3"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.cardBorder}`,
                }}
              >
                <span className="shrink-0 mt-0.5">
                  {IconPlaceholder ? <IconPlaceholder /> : Icon && <Icon size={20} color={tab.highlight ? "#B68A35" : t.textMuted} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{tab.label}</p>
                  <div className={`flex items-center gap-2 mt-0.5 ${tab.stars ? "flex-wrap" : ""}`}>
                    <p className="text-base lg:text-lg font-bold" style={{ color: tab.highlight ? "#B68A35" : t.text }}>
                      {tab.value}
                    </p>
                    {tab.stars != null && (
                      <span className={tab.stars ? "hidden lg:inline-flex lg:ml-auto" : ""}>
                        <StarRating rating={tab.stars} size={18} />
                      </span>
                    )}
                  </div>
                  {tab.stars != null && (
                    <span className="lg:hidden mt-1 inline-flex">
                      <StarRating rating={tab.stars} size={16} />
                    </span>
                  )}
                  {tab.sub && (
                    <p className="hidden sm:block text-[10px] lg:text-xs mt-0.5 leading-snug" style={{ color: t.textMuted }}>{tab.sub}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom row: Left = CTA (text left, 3 CTAs right); Right = Sources. items-start so CTA box doesn't stretch when sources expand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 items-start">
          <div className="rounded-xl p-5 flex flex-row flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="min-w-0">
              <h3 className="text-lg font-bold mb-1" style={{ color: t.text }}>Not Sure Where to Start?</h3>
              <p className="text-xs" style={{ color: t.textMuted }}>Speak to a Licensed Emaar Expert</p>
            </div>
            <div className="flex flex-shrink-0 gap-1.5 sm:gap-2">
              <a
                href={contact.phone}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: "rgb(182, 139, 53)", color: "#fff" }}
                title="Call"
              >
                <Image src="/telephone.webp" alt="Call" width={20} height={20} className="object-contain w-5 h-5 sm:w-[26px] sm:h-[26px]" />
                <span className="text-xs sm:text-sm font-medium">Call</span>
              </a>
              <a
                href={contact.email}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: "rgb(182, 139, 53)", color: "#fff" }}
                title="Email"
              >
                <Image src="/email.webp" alt="Email" width={20} height={20} className="object-contain w-5 h-5 sm:w-[26px] sm:h-[26px]" />
                <span className="text-xs sm:text-sm font-medium">Email</span>
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: "rgb(182, 139, 53)", color: "#fff" }}
                title="WhatsApp"
              >
                <Image src="/whatsapp.webp" alt="WhatsApp" width={20} height={20} className="object-contain w-5 h-5 sm:w-[26px] sm:h-[26px]" />
                <span className="text-xs sm:text-sm font-medium">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <button
              onClick={() => setShowSources(!showSources)}
              className="w-full flex items-center gap-3 p-4 text-left"
            >
              <Search size={18} color="#B68A35" />
              <div className="flex-1">
                <span className="text-sm font-bold" style={{ color: t.text }}>{hero.sources?.heading || "Sources & Methodology"}</span>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: t.textMuted }}>
                  Verified by PropertyIntel and official sources, including the Dubai Land Department and Emaar Press Releases.
                </p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-transform duration-300 ${showSources ? "rotate-180" : ""}`}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${showSources ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-4 pb-4 space-y-2">
                {(hero.sources?.items || []).map((src, i) => (
                  <div key={i} className="rounded-lg p-3 flex items-start justify-between gap-3" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold" style={{ color: "#B68A35" }}>{src.stat}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: t.textSecondary }}>{src.source}</p>
                    </div>
                    {src.url ? (
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="shrink-0 mt-0.5">
                        <ExternalLink size={14} color={t.textMuted} />
                      </a>
                    ) : (
                      <span className="text-xs shrink-0" style={{ color: t.textMuted }}>–</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperHeroSection;
