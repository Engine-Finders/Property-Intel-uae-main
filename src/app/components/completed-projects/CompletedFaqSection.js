"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";
const GOLD_BG = "rgba(182,138,53,0.10)";
const GOLD_BORDER = "rgba(182,138,53,0.25)";

const ChevronIcon = ({ open }) => (
  <svg
    className="shrink-0 transition-transform duration-300"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FaqItem = ({ faq, isOpen, onToggle, t }) => (
  <div className="border-b last:border-b-0" style={{ borderColor: t.cardBorder }}>
    <button onClick={onToggle} className="w-full flex items-center justify-between gap-3 py-4 text-left">
      <span className="text-sm font-semibold leading-snug" style={{ color: t.text }}>
        {faq.question}
      </span>
      <span style={{ color: t.textMuted }}>
        <ChevronIcon open={isOpen} />
      </span>
    </button>
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? "2600px" : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div className="pb-4 space-y-2">
        {(faq.answer || []).map((p, i) => (
          <p key={i} className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>
            {p}
          </p>
        ))}
        {faq.list && (
          <ul className="space-y-1.5 mt-2">
            {faq.list.map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-sm leading-relaxed" style={{ color: t.textSecondary }}>
                <span className="shrink-0 mt-0.5" style={{ color: GOLD }}>
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {faq.table && (
          <div className="rounded-lg overflow-x-auto mt-2" style={{ border: `1px solid ${t.cardBorder}` }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: "640px" }}>
              <thead>
                <tr style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
                  {(faq.table.headers || []).map((header, i) => (
                    <th
                      key={i}
                      style={{
                        color: t.textMuted,
                        textAlign: "left",
                        padding: "10px 12px",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(faq.table.rows || []).map((row, ri) => (
                  <tr
                    key={ri}
                    style={{
                      background:
                        ri % 2 === 0
                          ? t.isDark
                            ? "rgba(255,255,255,0.02)"
                            : "#ffffff"
                          : t.isDark
                            ? "rgba(255,255,255,0.04)"
                            : "#f8fafc",
                      borderTop: `1px solid ${t.isDark ? "#1e2028" : "#e2e8f0"}`,
                    }}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: "10px 12px",
                          fontSize: "12px",
                          color: ci === 0 ? t.text : t.textSecondary,
                          fontWeight: ci === 0 ? 600 : 400,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {faq.note && (
          <p className="text-[10px] italic mt-2" style={{ color: t.textMuted }}>
            {faq.note}
          </p>
        )}
      </div>
    </div>
  </div>
);

const CompletedFaqSection = ({ data }) => {
  const { t } = useTheme();
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: t.text }}>
          {data.h2}
        </h2>

        <div className="rounded-xl p-4 mb-8" style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
          <span style={{ color: GOLD }} className="text-xs font-bold block mb-1.5">
            📋 Source Transparency
          </span>
          <p style={{ color: t.textSecondary }} className="text-[11px] leading-relaxed">
            {data.source_transparency}
          </p>
        </div>

        {(data.groups || []).map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <h3 className="text-lg font-bold mb-3" style={{ color: t.text }}>
              {group.h3}
            </h3>
            <div className="rounded-xl p-5 lg:p-6" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
              {(group.items || []).map((faq, itemIndex) => {
                const itemKey = `${groupIndex}-${itemIndex}`;
                return (
                  <FaqItem
                    key={itemKey}
                    faq={faq}
                    isOpen={openKey === itemKey}
                    onToggle={() => toggle(itemKey)}
                    t={t}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {data.cta && (
          <div
            className="rounded-xl p-5 sm:p-6 mb-8"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
          >
            <h4 className="text-base sm:text-lg font-bold mb-4" style={{ color: t.text }}>
              {data.cta.h4}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <button
                  className="rounded-xl px-4 py-3 text-left transition-all hover:scale-[1.01] inline-flex"
                  style={{ background: GOLD, color: "#ffffff" }}
                >
                  <span className="text-xs font-bold block">{data.cta.primary.button}</span>
                </button>
                <p className="text-[10px] leading-relaxed mt-2 px-1" style={{ color: t.textSecondary }}>
                  {data.cta.primary.subtext}
                </p>
              </div>
              <div>
                <button
                  className="rounded-xl px-4 py-3 text-left transition-all hover:scale-[1.01] inline-flex"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.06)" : "#ffffff",
                    border: `1px solid ${GOLD_BORDER}`,
                    color: t.text,
                  }}
                >
                  <span className="text-xs font-bold block" style={{ color: GOLD }}>
                    {data.cta.secondary.button}
                  </span>
                </button>
                <p className="text-[10px] leading-relaxed mt-2 px-1" style={{ color: t.textSecondary }}>
                  {data.cta.secondary.subtext}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-xl p-4" style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${t.cardBorder}` }}>
          <p className="text-[10px] leading-relaxed" style={{ color: t.textMuted }}>
            {data.cta?.disclaimer || data.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompletedFaqSection;
