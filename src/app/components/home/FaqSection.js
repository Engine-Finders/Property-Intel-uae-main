"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ChevronIcon = ({ open }) => (
  <svg
    className="shrink-0 transition-transform duration-300"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FaqItem = ({ faq, isOpen, onToggle, t }) => (
  <div className="border-b" style={{ borderColor: t.cardBorder }}>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-3 py-4 text-left"
    >
      <span className="text-sm font-semibold leading-snug" style={{ color: t.text }}>{faq.question}</span>
      <span style={{ color: t.textMuted }}><ChevronIcon open={isOpen} /></span>
    </button>
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? "600px" : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div className="pb-4 space-y-2">
        {faq.answer.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{p}</p>
        ))}
        {faq.list && (
          <ul className="space-y-1.5 mt-2">
            {faq.list.map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-sm leading-relaxed" style={{ color: t.textSecondary }}>
                <span className="shrink-0 mt-0.5" style={{ color: "#B68A35" }}>→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

const FaqSection = ({ data }) => {
  const { t } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ background: t.bgAlt }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4" style={{ background: "#B68A3520", color: "#B68A35" }}>
            {data.badge}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: t.text }}>{data.title}</h2>
          <p className="text-xs leading-relaxed max-w-3xl" style={{ color: t.textMuted }}>{data.note}</p>
        </div>

        {/* FAQ Accordions */}
        <div className="rounded-xl p-5 lg:p-7" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
          {(data.items || []).map((faq, i) => (
            <FaqItem key={i} faq={faq} isOpen={openIndex === i} onToggle={() => toggle(i)} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
