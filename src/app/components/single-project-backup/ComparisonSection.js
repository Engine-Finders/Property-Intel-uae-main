"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

/* ── Expandable Card wrapper ── */
const Expandable = ({ title, icon, open, onToggle, children, t }) => (
  <div className="rounded-xl overflow-hidden mb-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
    <button onClick={onToggle} className="w-full flex items-center justify-between p-5 lg:p-7 text-left">
      <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: t.text }}>
        {icon && (
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: "#B68A3520", color: "#B68A35" }}>{icon}</span>
        )}
        {title}
      </h3>
      <span className="text-xs transition-transform duration-300" style={{ color: t.textMuted, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
    </button>
    {open && <div className="px-5 lg:px-7 pb-5 lg:pb-7">{children}</div>}
  </div>
);

/* ── Mobile card view for wide tables ── */
const MobileCards = ({ headers, rows, t }) => (
  <div className="space-y-3">
    {rows.map((row, i) => (
      <div key={i} className="rounded-lg p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
        {headers.map((h, j) => (
          <div key={j} className={`flex justify-between py-1.5 ${j < headers.length - 1 ? "border-b" : ""}`} style={{ borderColor: t.cardBorder }}>
            <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>{h}</span>
            <span className="text-[11px] font-semibold text-right max-w-[55%]" style={{ color: t.text }}>{row[j]}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

/* ── Desktop scrollable table ── */
const DesktopTable = ({ headers, rows, t }) => (
  <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${t.cardBorder}` }}>
    <table className="w-full text-xs">
      <thead>
        <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
          {headers.map((h, i) => (
            <th key={i} className="text-left px-4 py-3 font-semibold whitespace-nowrap" style={{ color: t.textMuted, borderBottom: `1px solid ${t.cardBorder}` }}>{h}</th>
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

/* ── Winner row card ── */
const WinnerCard = ({ item, t }) => {
  const isSerro = item.winner.toLowerCase().includes("serro");
  const accentColor = isSerro ? "#B68A35" : "#3B82F6";

  return (
    <div className="rounded-lg p-4 mb-3" style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "#f8fafc", border: `1px solid ${t.cardBorder}`, borderLeft: `3px solid ${accentColor}` }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-sm">{item.emoji}</span>
        <span className="text-xs font-bold" style={{ color: t.text }}>{item.category}</span>
        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: accentColor + "15", color: accentColor }}>{item.winner}</span>
      </div>
      <p className="text-[11px] leading-relaxed" style={{ color: t.textSecondary }}>{item.rationale}</p>
    </div>
  );
};

/* ── Main Component ── */
const ComparisonSection = ({ data }) => {
  const { t } = useTheme();
  const [openPanel, setOpenPanel] = useState(null);
  const toggle = (key) => setOpenPanel((prev) => (prev === key ? null : key));

  const comp = data.competitor_table || {};
  const winners = data.winner_table || {};
  const verdict = data.verdict || {};

  return (
    <section id="comparison" className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ background: t.bg }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4" style={{ background: "#B68A3520", color: "#B68A35" }}>
            {data.badge}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: t.text }}>{data.title}</h2>
          <p className="text-xs leading-relaxed max-w-3xl" style={{ color: t.textSecondary }}>{data.intro}</p>
        </div>

        {/* Competitor Comparison Table — expandable */}
        <Expandable title="Direct Competitor Analysis" icon="⚔️" open={openPanel === "comp"} onToggle={() => toggle("comp")} t={t}>
          <div className="block lg:hidden">
            <MobileCards headers={comp.headers || []} rows={comp.rows || []} t={t} />
          </div>
          <div className="hidden lg:block">
            <DesktopTable headers={comp.headers || []} rows={comp.rows || []} t={t} />
          </div>
          {comp.source && <p className="text-[10px] mt-3 italic" style={{ color: t.textMuted }}>Sources: {comp.source}</p>}
        </Expandable>

        {/* Winner Summary — expandable */}
        <Expandable title={winners.title || "Who Wins"} icon="🏆" open={openPanel === "winners"} onToggle={() => toggle("winners")} t={t}>
          {(winners.rows || []).map((item, i) => (
            <WinnerCard key={i} item={item} t={t} />
          ))}
        </Expandable>

        {/* Strategic Verdict — always visible */}
        <div className="rounded-xl p-5 lg:p-7" style={{ background: "linear-gradient(135deg, rgba(182,138,53,0.1), rgba(182,138,53,0.03))", border: "1px solid rgba(182,138,53,0.25)" }}>
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#B68A35" }}>
            <span>⚡</span> {verdict.title}
          </h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: t.textSecondary }}>{verdict.intro}</p>
          <ul className="space-y-2 mb-4">
            {(verdict.points || []).map((p, i) => (
              <li key={i} className="flex gap-2 items-start text-xs leading-relaxed" style={{ color: t.textSecondary }}>
                <span className="shrink-0 mt-0.5" style={{ color: "#B68A35" }}>→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed italic" style={{ color: t.textMuted }}>{verdict.closing}</p>
        </div>

        {/* CTA — after Strategic Verdict */}
        {data.cta && (
          <div className="mt-6 flex flex-col items-start gap-2">
            <a
              href={data.cta.href || "#"}
              className="px-6 py-3.5 rounded-lg font-semibold text-sm text-white transition-colors hover:opacity-90 inline-block"
              style={{ background: "#B68A35" }}
            >
              {data.cta.button_text}
            </a>
            {data.cta.subtext && (
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: t.textMuted }}>{data.cta.subtext}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonSection;
