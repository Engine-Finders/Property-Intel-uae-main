
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const slides = ["/projects/villa-render-1.jpg", "/projects/villa-render-2.jpg", "/projects/villa-render-3.jpg"];


const HeroSection = ({ data }) => {
  const { t } = useTheme();
  const hero = data.hero_section;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showInfra, setShowInfra] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section style={{ background: t.bg }} className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Image Slider */}
        <div className="relative w-full lg:w-[55%] h-[40vh] lg:h-[75vh] overflow-hidden">
          {slides.map((src, i) => (
            <Image
              width={1200}
              height={800}
              key={i}
              src={src}
              alt={data.slide_labels[i]}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button onClick={prevSlide} aria-label="Previous slide" className="w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center text-white transition-colors" style={{ background: "rgba(35,37,40,0.6)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Go to slide ${i + 1}`} className="rounded-full transition-all" style={{ width: i === currentSlide ? 24 : 10, height: 10, background: i === currentSlide ? "#B68A35" : "rgba(255,255,255,0.4)" }} />
            ))}
            <button onClick={nextSlide} aria-label="Next slide" className="w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center text-white transition-colors" style={{ background: "rgba(35,37,40,0.6)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          <div className="hidden lg:block absolute inset-y-0 right-0 w-24" style={{ background: `linear-gradient(to left, ${t.bg}, transparent)` }} />
        </div>

        {/* Right: Data Card */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 py-10 lg:px-12 lg:py-16">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight" style={{ color: t.text }}>{data.name}</h1>
          <h2 className="mt-2 text-sm lg:text-base font-medium tracking-wide uppercase" style={{ color: "#B68A35" }}>{hero.subtitle}</h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {hero.status_badges.map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: badge.color === "gold" ? "rgba(182,138,53,0.15)" : "rgba(16,185,129,0.15)", color: badge.color === "gold" ? "#B68A35" : "#10b981", border: `1px solid ${badge.color === "gold" ? "rgba(182,138,53,0.3)" : "rgba(16,185,129,0.3)"}` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: badge.color === "gold" ? "#fbbf24" : "#34d399" }} />
                {badge.label}
              </span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: "Starting Price", value: hero.data_grid.starting_price, color: "#B68A35" },
              { label: "Price / Sqft", value: hero.data_grid.price_per_sqft, color: t.text },
              { label: "Yield Forecast", value: hero.data_grid.yield_forecast, color: "#10b981" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{item.label}</p>
                <p className="mt-1 text-2xl lg:text-3xl font-bold" style={{ color: item.color }}>{item.value}</p>
              </div>
            ))}
            <div className="rounded-xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>Handover</p>
              <div className="mt-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                <span className="text-2xl lg:text-3xl font-bold" style={{ color: t.text }}>{hero.data_grid.handover}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-6 py-3.5 rounded-lg font-semibold text-sm text-white transition-colors focus:outline-none" style={{ background: "#286CFF" }}>{hero.cta_primary}</button>
            <button className="flex-1 px-6 py-3.5 rounded-lg font-semibold text-sm transition-colors focus:outline-none" style={{ color: "#B68A35", border: "1px solid rgba(182,138,53,0.4)" }}>{hero.cta_secondary}</button>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="max-w-7xl mx-auto px-6 py-6 lg:py-10">
        {hero.overview_paragraphs.map((paragraph, i) => (
          <p key={i} className={`${i > 0 ? "mt-6" : ""} text-base lg:text-lg leading-relaxed`} style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}

        <div className="mt-10 p-6 lg:p-8 rounded-2xl" style={{ border: "1px solid rgba(182,138,53,0.2)", background: "rgba(182,138,53,0.05)" }}>
          <h3 className="text-lg lg:text-xl font-bold mb-4" style={{ color: "#B68A35" }}>Data-Led Hook</h3>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: hero.data_led_hook }} />
        </div>

        <div className="mt-16">
          <h3 className="text-xl lg:text-2xl font-bold mb-8" style={{ color: t.text }}>Key Facts at a Glance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hero.key_facts.map((fact, i) => (
              <div key={i} className="rounded-xl p-5 transition-colors" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{fact.label}</p>
                <p className="mt-2 text-lg font-bold" style={{ color: t.text }}>{fact.value}</p>
                <p className="mt-1 text-xs" style={{ color: t.textMuted }}>{fact.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Accordion */}
        <div className="mt-16">
          <button onClick={() => setShowInfra(!showInfra)} className="w-full flex items-center justify-between p-5 rounded-xl transition-colors group" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="text-lg font-semibold" style={{ color: t.text }}>Future Infrastructure & Economic Development</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${showInfra ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${showInfra ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
            <div className="space-y-3">
              {hero.infrastructure_items.map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                  <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left transition-colors">
                    <span className="text-sm font-medium pr-4" style={{ color: t.text }}>{item.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-transform duration-300 ${openAccordion === i ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openAccordion === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-4 pb-4 text-sm leading-relaxed" style={{ color: t.textSecondary }}>{item.content}</p>
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