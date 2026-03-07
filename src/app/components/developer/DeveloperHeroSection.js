"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ExternalLink, ArrowRight, ShieldCheck, Building2, Home, Clock, BarChart3, CheckCircle2, Search } from "lucide-react";
import Image from "next/image";

const statIcons = [CheckCircle2, Building2, Home, BarChart3, Clock, ShieldCheck];

const DeveloperHeroSection = ({ data }) => {
  const { t } = useTheme();
  const hero = data.hero_section;
  const [showSources, setShowSources] = useState(false);

  // Combine trust + performance into 6 tabs
  const tabs = [
    { label: "RERA Status", value: hero.trust_verification.items[0].value, icon: 0 },
    { label: "Years Active", value: "29 Years", sub: "Founded in 1997", icon: 1 },
    { label: "Units Delivered", value: "123,500+", sub: "Globally as of Nov 2025", icon: 2 },
    { label: "Projects Launched", value: "351", sub: "293 completed + 58 under construction", icon: 3 },
    { label: "Avg. Project Delay (Last 5)", value: "3-6 Months", icon: 4 },
    { label: "PropertyIntel Trust Score", value: "9.0 / 10", sub: "Verified by PropertyIntel Research • 21 February 2026", icon: 5, highlight: true },
  ];

  return (
    <section style={{ background: t.bg }} className="pb-6 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center pt-6 pb-6 lg:pt-8 lg:pb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: t.text }}>
            {hero.title}
          </h2>
          <p className="mt-2 text-sm lg:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: t.textSecondary }}>
            {hero.subtitle}
          </p>
        </div>

        {/* Image with logo */}
        <div className="relative">
          {/* Logo - centered on top border */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden shadow-lg" style={{ border: `3px solid ${t.bg}` }}>
              <Image src="/developer/emaar-logo.png" width={64} height={64} alt="Emaar Properties Logo" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Mobile: heading overlay on image */}
          <div className="block lg:hidden relative">
            <div className="rounded-xl overflow-hidden">
              <div className="relative h-[280px] sm:h-[340px]">
                <Image
                  src="/projects/villa-render-1.jpg"
                  alt="Dubai skyline - Emaar Properties portfolio"
                  fill
                  className="object-cover"
                  loading="eager"
                  sizes="100vw"
                />

                {/* Gradient overlay for text readability on mobile */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Desktop: clean landscape image */}
          <div className="hidden lg:block relative rounded-xl overflow-hidden h-[380px] xl:h-[420px]">
            <Image
              src="/projects/villa-render-1.jpg"
              alt="Dubai skyline - Emaar Properties portfolio"
              fill
              className="object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Stat Tabs - 3 per row on desktop, 2 per row on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {tabs.map((tab, i) => {
            const Icon = statIcons[tab.icon];
            return (
              <div
                key={i}
                className="rounded-xl p-4 flex items-start gap-3 transition-all"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.cardBorder}`,
                }}
              >
                <span className="shrink-0 mt-0.5">
                  <Icon size={20} color={tab.highlight ? "#B68A35" : t.textMuted} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{tab.label}</p>
                  <p className="text-base lg:text-lg font-bold mt-0.5" style={{ color: tab.highlight ? "#B68A35" : t.text }}>
                    {tab.value}
                  </p>
                  {tab.sub && (
                    <p className="text-[10px] lg:text-xs mt-0.5 leading-snug" style={{ color: t.textMuted }}>{tab.sub}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Two action buttons below last row of tabs - desktop only */}
        <div className="hidden lg:grid grid-cols-2 gap-4 mt-6">
          <button className="px-6 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2" style={{ background: "#B68A35", color: "#fff" }}>
            Explore Emaar Projects
          </button>
          <button className="px-6 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2" style={{ background: "#286CFF", color: "#fff" }}>
            View Payment Plans
          </button>
        </div>

        {/* Sources & CTA row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          {/* Sources Accordion */}
          <div className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <button
              onClick={() => setShowSources(!showSources)}
              className="w-full flex items-center gap-3 p-4 text-left"
            >
              <Search size={18} color="#B68A35" />
              <div className="flex-1">
                <span className="text-sm font-bold" style={{ color: t.text }}>{hero.sources.heading}</span>
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
                {hero.sources.items.map((src, i) => (
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

          {/* CTA Card */}
          <div className="rounded-xl p-5 flex flex-col justify-center" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <h3 className="text-lg font-bold mb-1" style={{ color: t.text }}>{hero.cta.heading}</h3>
            <p className="text-xs mb-4" style={{ color: t.textMuted }}>Speak to a Licensed Expert About Emaar</p>
            <button
              className="w-full px-6 py-3 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2 transition-colors"
              style={{ background: "#286CFF" }}
            >
              Connect with an Expert
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Full-width expert CTA below sources on mobile */}
        <div className="block lg:hidden mt-4 space-y-3">
          <button className="w-full px-6 py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2" style={{ background: "#B68A35", color: "#fff" }}>
            Explore Emaar Projects
          </button>
          <button className="w-full px-6 py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2" style={{ background: "#286CFF", color: "#fff" }}>
            View Payment Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeveloperHeroSection;