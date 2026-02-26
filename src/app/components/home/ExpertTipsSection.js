"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ChevronIcon = ({ open }) => (
  <svg
    className="shrink-0 transition-transform duration-300"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const TipCard = ({ tip, index, t }) => (
  <div className="rounded-lg p-4 lg:p-5 mb-4" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
    <div className="flex gap-3 items-start mb-3">
      <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: "#B68A3520", color: "#B68A35" }}>{index}</span>
      <h4 className="text-sm font-bold leading-snug" style={{ color: t.text }}>{tip.title}</h4>
    </div>
    {tip.paragraphs.map((p, i) => (
      <p key={i} className="text-xs leading-relaxed mb-2" style={{ color: t.textSecondary }}>{p}</p>
    ))}
    {tip.table && (
      <div className="mt-3 rounded-lg overflow-hidden" style={{ border: `1px solid ${t.cardBorder}` }}>
        {tip.table.rows.map((row, i) => (
          <div key={i} className={`flex justify-between px-3 py-2 text-xs ${i < tip.table.rows.length - 1 ? "border-b" : ""}`} style={{ borderColor: t.cardBorder, background: i === tip.table.rows.length - 1 ? (t.isDark ? "rgba(182,138,53,0.1)" : "rgba(182,138,53,0.06)") : "transparent" }}>
            <span style={{ color: t.textMuted }}>{row[0]}</span>
            <span className="font-semibold text-right" style={{ color: i === tip.table.rows.length - 1 ? "#B68A35" : t.text }}>{row[1]}</span>
          </div>
        ))}
        {tip.table.source && <p className="text-[10px] italic px-3 py-1.5" style={{ color: t.textMuted }}>Source: {tip.table.source}</p>}
      </div>
    )}
    {tip.red_flag && (
      <div className="mt-3 rounded-lg p-3" style={{ background: t.isDark ? "rgba(239,68,68,0.08)" : "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <p className="text-xs leading-relaxed" style={{ color: t.isDark ? "#fca5a5" : "#b91c1c" }}>
          <strong>🚩 Red Flag:</strong> {tip.red_flag}
        </p>
      </div>
    )}
    <div className="mt-3 rounded-lg p-3" style={{ background: t.isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.05)", border: "1px solid rgba(182,138,53,0.2)" }}>
      <p className="text-xs leading-relaxed" style={{ color: t.isDark ? "#fcd34d" : "#92400e" }}>
        <strong>✅ Action:</strong> {tip.action}
      </p>
    </div>
  </div>
);

const MobileCards = ({ headers, rows, t }) => (
  <div className="space-y-3">
    {rows.map((row, i) => (
      <div key={i} className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
        {headers.map((h, j) => (
          <div key={j} className={`flex justify-between py-1.5 ${j < headers.length - 1 ? "border-b" : ""}`} style={{ borderColor: t.cardBorder }}>
            <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>{h}</span>
            <span className="text-[11px] font-semibold text-right max-w-[60%]" style={{ color: t.text }}>{row[j]}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const DesktopTable = ({ headers, rows, t }) => (
  <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${t.cardBorder}` }}>
    <table className="w-full text-xs">
      <thead>
        <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
          {headers.map((h, i) => (
            <th key={i} className="text-left px-4 py-3 font-semibold" style={{ color: t.textMuted, borderBottom: `1px solid ${t.cardBorder}` }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${t.cardBorder}` : "none" }}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3" style={{ color: j === 0 ? t.text : t.textSecondary, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ExpertTipsSection = ({ data }) => {
  const { t } = useTheme();
  const [open, setOpen] = useState(false);

  const scam = data.scam_red_flags || {};
  const regulatory = data.regulatory || {};

  return (
    <section id="expert-tips" className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto">
        {/* Accordion Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 rounded-xl p-5 lg:p-7 text-left transition-all"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3" style={{ background: "#B68A3520", color: "#B68A35" }}>
              {data.badge}
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: t.text }}>{data.title}</h2>
            <p className="text-sm" style={{ color: t.textMuted }}>{data.subtitle}</p>
          </div>
          <span style={{ color: t.textMuted }}>
            <ChevronIcon open={open} />
          </span>
        </button>

        {/* Accordion Content */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: open ? "5000px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div className="pt-6 space-y-6">
            {/* Tips */}
            <div>
              <h3 className="text-base font-bold mb-4" style={{ color: t.text }}>{data.tips_title}</h3>
              {(data.tips || []).map((tip, i) => (
                <TipCard key={i} tip={tip} index={i + 1} t={t} />
              ))}
            </div>

            {/* Scam Red Flags */}
            <div className="rounded-xl p-5 lg:p-7" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
                <span>🚩</span> {scam.title}
              </h3>
              <div className="block lg:hidden">
                <MobileCards headers={scam.headers || []} rows={scam.rows || []} t={t} />
              </div>
              <div className="hidden lg:block">
                <DesktopTable headers={scam.headers || []} rows={scam.rows || []} t={t} />
              </div>
            </div>

            {/* Regulatory */}
            <div className="rounded-xl p-5 lg:p-7" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              <h3 className="text-base font-bold mb-2" style={{ color: t.text }}>{regulatory.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>{regulatory.intro}</p>
              <ul className="space-y-3 mb-4">
                {(regulatory.items || []).map((item, i) => (
                  <li key={i} className="flex gap-2 items-start text-xs leading-relaxed" style={{ color: t.textSecondary }}>
                    <span className="shrink-0 mt-0.5" style={{ color: "#B68A35" }}>→</span>
                    <span><strong style={{ color: t.text }}>{item.label}</strong> — {item.desc}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-lg p-3" style={{ background: t.isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.05)", border: "1px solid rgba(182,138,53,0.2)" }}>
                <p className="text-xs leading-relaxed" style={{ color: t.isDark ? "#fcd34d" : "#92400e" }}>
                  <strong>✅ Action:</strong> {regulatory.action}
                </p>
              </div>
            </div>

            {/* Final Word */}
            <div className="rounded-xl p-5 lg:p-7" style={{ background: t.isDark ? "rgba(182,138,53,0.08)" : "rgba(182,138,53,0.05)", border: "1px solid rgba(182,138,53,0.25)" }}>
              <h3 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: t.text }}>
                <span>⚖️</span> {data.final_word.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{data.final_word.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertTipsSection;
