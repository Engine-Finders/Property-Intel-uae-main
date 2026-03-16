"use client";
import { useTheme } from "../context/ThemeContext";
import GrowthMap from "../sub-components/GrowthMap";

const GOLD = "#B68A35";

const GrowthMapSection = ({ data }) => {
  const { t } = useTheme();

  return (
    <section style={{ background: t.bg }} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header row: H2 left, badge right */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            style={{ color: t.text, lineHeight: 1.2 }}
          >
            {data.h2}
          </h2>
          <span
            style={{
              background: "rgba(182,138,53,0.08)",
              border: "1px solid rgba(182,138,53,0.25)",
              color: GOLD,
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 14px",
              borderRadius: 20,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              display: "inline-block",
              width: "fit-content",
            }}
          >
            Last Updated: {data.last_updated}
          </span>
        </div>

        {/* H3 */}
        <p
          className="text-sm sm:text-base text-center max-w-3xl mx-auto mb-6"
          style={{ color: t.textMuted, lineHeight: 1.7 }}
        >
          {data.h3}
        </p>

        {/* Trust Statement */}
        <div
          className="flex items-start gap-3 p-4 rounded-lg max-w-3xl mx-auto mb-10"
          style={{
            background: "rgba(182,138,53,0.04)",
            border: "1px solid rgba(182,138,53,0.12)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.7 }}>
            {data.trust_statement}
          </p>
        </div>

        {/* Map */}
        <div className="mb-12">
          <GrowthMap placeholderText={data.map_placeholder_text} />
        </div>

        {/* Footer */}
        <div className="text-center">
          <p
            className="text-xs sm:text-sm max-w-3xl mx-auto mb-8"
            style={{ color: t.textMuted, lineHeight: 1.7 }}
          >
            {data.footer.attribution}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <button
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: GOLD, color: "#fff" }}
            >
              {data.footer.primary_cta}
            </button>
            <button
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
              style={{
                background: "transparent",
                color: GOLD,
                border: `1px solid ${GOLD}`,
              }}
            >
              {data.footer.secondary_cta}
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs sm:text-sm max-w-2xl mx-auto" style={{ color: t.textMuted, opacity: 0.85, lineHeight: 1.6 }}>
            {data.footer.disclaimer.replace("{{date}}", data.last_updated)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default GrowthMapSection;
