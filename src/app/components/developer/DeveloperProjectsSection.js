"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { MapPin, Calendar, Clock, Home, ChevronLeft, ChevronRight, ExternalLink, Download, FileText } from "lucide-react";
import Image from "next/image";

const slideImages = ["/projects/villa-render-1.jpg", "/projects/villa-render-2.jpg", "/projects/villa-render-3.jpg"];


const statusColors = {
  gold: { bg: "rgba(182,138,53,0.25)", text: "#996515", border: "rgba(182,138,53,0.5)", dot: "#d4a017" },
  green: { bg: "rgba(16,185,129,0.25)", text: "#047857", border: "rgba(16,185,129,0.5)", dot: "#059669" },
  blue: { bg: "rgba(59,130,246,0.25)", text: "#1d4ed8", border: "rgba(59,130,246,0.5)", dot: "#2563eb" },
  red: { bg: "rgba(239,68,68,0.25)", text: "#b91c1c", border: "rgba(239,68,68,0.5)", dot: "#dc2626" },
  gray: { bg: "rgba(107,114,128,0.3)", text: "#374151", border: "rgba(107,114,128,0.5)", dot: "#4b5563" },
};

const DeveloperProjectsSection = ({ data }) => {
  const { t } = useTheme();
  const section = data.projects_section;
  const projects = section.projects;
  const [current, setCurrent] = useState(0);
  const [expandedSources, setExpandedSources] = useState(null);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % projects.length);
      setExpandedSources(null);
    }, 5000);
  }, [projects.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % projects.length);
    setExpandedSources(null);
    resetTimer();
  }, [projects.length, resetTimer]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
    setExpandedSources(null);
    resetTimer();
  }, [projects.length, resetTimer]);

  const goTo = (i) => {
    setCurrent(i);
    setExpandedSources(null);
    resetTimer();
  };

  const [visibleCount, setVisibleCount] = useState(typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3);

  useEffect(() => {
    const onResize = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < visibleCount; i++) {
      indices.push((current + i) % projects.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  const renderCard = (project, idx) => {
    const sc = statusColors[project.status_color] || statusColors.gold;
    const isExpanded = expandedSources === idx;

    return (
      <div
        key={project.id + "-" + idx}
        className="rounded-2xl overflow-hidden flex flex-col min-w-0"
        style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
      >
        {/* Image */}
       <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
  <Image
    src={slideImages[project.image_index]}
    alt={project.name}
    fill
    className="object-cover"
    loading="lazy"
    sizes="(max-width: 640px) 100vw, 50vw"
  />

  <div className="absolute top-3 left-3">
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm"
      style={{ background: sc.bg, color: sc.text, border: `1.5px solid ${sc.border}` }}
    >
      <span
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ background: sc.dot }}
      />
      {project.status}
    </span>
  </div>
</div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={12} color="#B68A35" />
            <span className="text-[10px] font-medium" style={{ color: t.textMuted }}>{project.location}</span>
          </div>
          <h3 className="text-base font-bold" style={{ color: t.text }}>{project.name}</h3>

          {/* Data Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg p-2.5" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
              <p className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>Starting Price</p>
              <p className="mt-0.5 text-sm font-bold" style={{ color: "#B68A35" }}>{project.starting_price}</p>
            </div>
            <div className="rounded-lg p-2.5" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
              <p className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>Payment Plan</p>
              <p className="mt-0.5 text-xs font-bold" style={{ color: t.text }}>{project.payment_plan}</p>
            </div>
            <div className="rounded-lg p-2.5" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
              <div className="flex items-center gap-1">
                <Calendar size={10} color={t.textMuted} />
                <p className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>Handover</p>
              </div>
              <p className="mt-0.5 text-xs font-bold" style={{ color: t.text }}>{project.handover}</p>
            </div>
            <div className="rounded-lg p-2.5" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
              <div className="flex items-center gap-1">
                <Clock size={10} color={t.textMuted} />
                <p className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>Countdown</p>
              </div>
              <p className="mt-0.5 text-xs font-bold" style={{ color: "#10b981" }}>{project.countdown}</p>
            </div>
          </div>

          {/* Unit Mix */}
          <div className="mt-3 flex items-center gap-2 rounded-lg p-2.5" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}>
            <Home size={12} color="#B68A35" />
            <div>
              <p className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: t.textMuted }}>Unit Mix</p>
              <p className="text-[11px] font-medium" style={{ color: t.text }}>{project.unit_mix}</p>
            </div>
          </div>

          {/* Sources accordion */}
          <button
            onClick={() => setExpandedSources(isExpanded ? null : idx)}
            className="mt-3 w-full flex items-center justify-between p-2.5 rounded-lg transition-colors"
            style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${t.cardBorder}` }}
          >
            <div className="flex items-center gap-1.5">
              <FileText size={12} color="#B68A35" />
              <span className="text-[10px] font-semibold" style={{ color: t.text }}>Source Verification</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-400 ${isExpanded ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
            <div className="space-y-1">
              {project.sources.map((src, i) => (
                <div key={i} className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5" style={{ background: t.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)", border: `1px solid ${t.cardBorder}` }}>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold" style={{ color: "#B68A35" }}>{src.label}: </span>
                    <span className="text-[9px]" style={{ color: t.textSecondary }}>{src.source}</span>
                  </div>
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
                      <ExternalLink size={10} color={t.textMuted} />
                    </a>
                  ) : null}
                </div>
              ))}
              <p className="text-[9px] px-1 pt-1" style={{ color: t.textMuted }}>Last Verified: {project.last_verified}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 space-y-2">
            <button className="w-full px-3 py-2.5 rounded-lg font-semibold text-xs text-white flex items-center justify-center gap-1.5 transition-colors" style={{ background: "#286CFF" }}>
              <Download size={13} />
              Download Brochure
            </button>
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex gap-1.5">
                <a
                  href="tel:+971600000000"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ background: "rgb(182, 139, 53)", color: "#fff" }}
                  title="Call"
                >
                  <Image src="/telephone.webp" alt="Call" width={16} height={16} className="object-contain" />
                  <span className="text-[10px] font-medium">Call</span>
                </a>
                <a
                  href="mailto:expert@example.com"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ background: "rgb(182, 139, 53)", color: "#fff" }}
                  title="Email"
                >
                  <Image src="/email.webp" alt="Email" width={16} height={16} className="object-contain" />
                  <span className="text-[10px] font-medium">Email</span>
                </a>
                <a
                  href="https://wa.me/971600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg transition-opacity hover:opacity-90"
                  style={{ background: "rgb(182, 139, 53)", color: "#fff" }}
                  title="WhatsApp"
                >
                  <Image src="/whatsapp.webp" alt="WhatsApp" width={16} height={16} className="object-contain" />
                  <span className="text-[10px] font-medium">WhatsApp</span>
                </a>
              </div>
              <p className="text-[10px]" style={{ color: t.textMuted }}>Call | Email | WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section style={{ background: t.bg }} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight" style={{ color: t.text }}>
          {section.title}
        </h2>
        <p className="mt-3 text-sm lg:text-base leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>
          {section.subtitle}
        </p>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold" style={{ color: t.textMuted }}>
              {current + 1} / {projects.length}
            </span>
            <div className="flex gap-1 ml-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className="rounded-full transition-all"
                  style={{
                    width: i === current ? 20 : 8,
                    height: 8,
                    background: i === current ? "#B68A35" : (t.isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"),
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} aria-label="Previous project" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <ChevronLeft size={18} color={t.textMuted} />
            </button>
            <button onClick={next} aria-label="Next project" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <ChevronRight size={18} color={t.textMuted} />
            </button>
          </div>
        </div>

        {/* Cards - 3 visible */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleIndices.map((idx) => renderCard(projects[idx], idx))}
        </div>

        {/* CTA */}
        {(section.cta || section.expert_cta) && (
          <div className="mt-6 mb-6">
            <a
              href={section.cta?.href || "#"}
              className="inline-block rounded-xl px-6 py-3 font-semibold text-sm sm:text-base transition-opacity hover:opacity-95"
              style={{ background: "#B68A35", color: "#fff" }}
            >
              {section.cta?.button_text || section.expert_cta?.heading || "Get Expert Advice on Emaar Projects"}
            </a>
            <p className="mt-2 text-xs sm:text-sm" style={{ color: t.textSecondary }}>
              {section.cta?.subtext || section.expert_cta?.subtext || "Speak with a licensed specialist to compare projects and find the right fit for your investment goals."}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-4 text-[10px] leading-relaxed" style={{ color: t.textMuted }}>
          {section.disclaimer}
        </p>
      </div>
    </section>
  );
};

export default DeveloperProjectsSection;