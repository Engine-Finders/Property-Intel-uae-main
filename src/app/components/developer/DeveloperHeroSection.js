"use client";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { ShieldCheck, BarChart3, FileText, ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";

const slideImages = ["/projects/villa-render-1.jpg", "/projects/villa-render-2.jpg", "/projects/villa-render-3.jpg"];

const DeveloperHeroSection = ({ data }) => {
  const { t } = useTheme();
  const hero = data.hero_section;
  const projects = hero.projects_slider;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSources, setShowSources] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentProject = projects[currentSlide];

  return (
    <section style={{ background: t.bg }} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight" style={{ color: t.text }}>
          Emaar Properties - Projects, Payment Plans & Reviews (2026)
        </h1>
        <p className="mt-3 text-sm lg:text-base leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>
          Explore Emaar&apos;s complete portfolio: 200+ projects across Dubai. Compare payment plans, check delivery history, and read verified resident reviews.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* Left: Content */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-6 py-10 lg:px-12 lg:py-16 order-2 lg:order-1">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight leading-tight" style={{ color: t.text }}>
            {hero.title}
          </h2>
          <p className="mt-3 text-sm lg:text-base leading-relaxed" style={{ color: t.textSecondary }}>
            {hero.subtitle}
          </p>

          {/* Trust & Verification + Quick Performance Stats side by side */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trust & Verification */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={20} color="#B68A35" />
                <h3 className="text-lg font-bold" style={{ color: t.text }}>{hero.trust_verification.heading}</h3>
              </div>
              <div className="space-y-2.5">
                {hero.trust_verification.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg p-3" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#B68A35" }} />
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>{item.label}</span>
                      <p className="text-sm font-medium mt-0.5" style={{ color: t.text }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Performance Stats */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={20} color="#10b981" />
                <h3 className="text-lg font-bold" style={{ color: t.text }}>{hero.performance_stats.heading}</h3>
              </div>
              <div className="space-y-3">
                {hero.performance_stats.items.map((item, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                    <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{item.label}</p>
                    <p className="mt-1 text-xl font-bold" style={{ color: i === 2 ? "#10b981" : t.text }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sources Accordion */}
          <div className="mt-8">
            <button
              onClick={() => setShowSources(!showSources)}
              className="w-full flex items-center justify-between p-4 rounded-xl transition-colors"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
            >
              <div className="flex items-center gap-2">
                <FileText size={18} color="#B68A35" />
                <span className="text-sm font-semibold" style={{ color: t.text }}>{hero.sources.heading}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${showSources ? "rotate-180" : ""}`}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${showSources ? "max-h-[1200px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
              <p className="text-xs mb-3 px-1" style={{ color: t.textMuted }}>{hero.sources.description}</p>
              <div className="space-y-2">
                {hero.sources.items.map((src, i) => (
                  <div key={i} className="rounded-lg p-3 flex items-start justify-between gap-3" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
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

          {/* CTA */}
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-3" style={{ color: t.text }}>{hero.cta.heading}</h3>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2 transition-colors" style={{ background: "#286CFF" }}>
              {hero.cta.text}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right: Projects Slider */}
        <div className="w-full lg:w-[50%] order-1 lg:order-2 relative">
          <div className="relative h-[50vh] lg:h-[75vh] overflow-hidden">
            {projects.map((project, i) => (
              <Image
                height={720}
                width={1280}
                key={i}
                src={slideImages[project.image_index]}
                alt={project.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
            {/* Gradient overlay left for blending */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-24" style={{ background: `linear-gradient(to right, ${t.bg}, transparent)` }} />
            {/* Bottom overlay for card */}
            <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }} />
          </div>

          {/* Project Info Card (overlaid at bottom) */}
          <div className="absolute bottom-0 inset-x-0 p-6 lg:p-8">
            <div className="rounded-xl p-5 backdrop-blur-sm" style={{ background: t.isDark ? "rgba(35,37,40,0.4)" : "rgba(255,255,255,0.45)", border: `1px solid ${t.cardBorder}` }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(182,138,53,0.15)", color: "#B68A35" }}>
                  {currentProject.type}
                </span>
              </div>
              <h4 className="text-lg font-bold" style={{ color: t.isDark ? "#fff" : "#1e293b" }}>{currentProject.name}</h4>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: t.isDark ? "#c0c7d6" : "#475569" }}>{currentProject.description}</p>
              <p className="mt-2 text-xl font-bold" style={{ color: "#B68A35" }}>{currentProject.price}</p>

              <div className="mt-4 flex gap-3">
                <button className="flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold text-white transition-colors" style={{ background: "#286CFF" }}>
                  Project Details
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors" style={{ color: "#B68A35", border: "1px solid rgba(182,138,53,0.4)" }}>
                  Contact Expert
                </button>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button onClick={prevSlide} aria-label="Previous project" className="w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center text-white transition-colors" style={{ background: "rgba(35,37,40,0.6)" }}>
                <ChevronLeft size={18} />
              </button>
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className="rounded-full transition-all"
                  style={{ width: i === currentSlide ? 24 : 10, height: 10, background: i === currentSlide ? "#B68A35" : "rgba(255,255,255,0.4)" }}
                />
              ))}
              <button onClick={nextSlide} aria-label="Next project" className="w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center text-white transition-colors" style={{ background: "rgba(35,37,40,0.6)" }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperHeroSection;
