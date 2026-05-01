"use client";

const GOLD = "#B68A35";

const SectionImageHeader = ({
  primary,
  accent,
  title,
  subtitle,
  subtitleHtml,
  t,
  className = "",
}) => (
  <div
    className={`relative overflow-hidden rounded-t-[28px] border ${className}`}
    style={{
      borderColor: t.cardBorder,
      background: t.isDark ? t.cardBg : "#fffdfa",
      minHeight: 285,
    }}
  >
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/projects/villa-render-2.jpg')" }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0"
      style={{
        background: t.isDark
          ? "linear-gradient(90deg, #25282d 0%, #25282d 44%, rgba(37,40,45,0.92) 56%, rgba(37,40,45,0.52) 72%, rgba(37,40,45,0.12) 88%, transparent 100%)"
          : "linear-gradient(90deg, #fffdfa 0%, #fffdfa 42%, rgba(255,253,250,0.5) 64%, transparent 84%)",
      }}
      aria-hidden="true"
    />
    <div className="relative z-10 max-w-[590px] px-8 py-12">
      <h2 className="text-[3rem] font-semibold leading-[1.05]" style={{ color: t.text }}>
        {title || primary}
        {accent && (
          <span className="block" style={{ color: GOLD }}>
            {accent}
          </span>
        )}
      </h2>
      {subtitleHtml ? (
        <p className="mt-5 text-base leading-7" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: subtitleHtml }} />
      ) : subtitle ? (
        <p className="mt-5 text-base leading-7" style={{ color: t.textSecondary }}>
          {subtitle}
        </p>
      ) : null}
      <span className="mt-5 block h-px w-20" style={{ background: GOLD }} />
    </div>
  </div>
);

export default SectionImageHeader;
