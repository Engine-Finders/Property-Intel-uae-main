"use client";
import { useTheme } from "../context/ThemeContext";

const GOLD = "#B68A35";

const HowWeHelpHome = ({ data }) => {
  const { t } = useTheme();

  return (
    <section className="py-6 md:py-8" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: t.text }}>
            {data.h2}
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto" style={{ color: t.textSecondary }}>
            {data.h3}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(data.cards || []).map((card, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
            >
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold mb-4"
                style={{
                  color: "#1f2937",
                  background: t.isDark ? "rgba(182,138,53,0.85)" : "rgba(182,138,53,0.45)",
                }}
              >
                {card.step}
              </span>

              <div className="flex flex-col items-center text-center">
                {/* Icon placeholder (user will provide icon source later) */}
                <div
                  className="w-10 h-10 mb-3"
                  style={{
                    border: `1px dashed ${t.isDark ? "#4b5563" : "#cbd5e1"}`,
                    background: t.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                  }}
                />
                <h3 className="text-lg font-bold mb-2" style={{ color: t.text }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: t.textSecondary }}>
                  {card.description}
                </p>
                <p className="text-sm leading-relaxed font-medium" style={{ color: GOLD }}>
                  {card.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelpHome;
