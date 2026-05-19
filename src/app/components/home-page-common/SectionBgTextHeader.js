"use client";

/** Description on image overlay (all sections using this header) */
const SUBTITLE_ON_IMAGE_LIGHT = "#17181a";
const SUBTITLE_ON_IMAGE_DARK = "#dde2ed";

/**
 * Section header: full-bleed background image, left-aligned title + description,
 * white "smoke" gradient behind text (no card/border). Use for mobile section intros.
 */
const SectionBgTextHeader = ({
  title,
  subtitle,
  subtitleHtml,
  description,
  imageSrc = "/projects/villa-render-2.jpg",
  t,
  meta,
  className = "",
  contentClassName = "max-w-[min(100%,22rem)]",
  headingClassName = "font-serif text-[32px] font-semibold leading-[1.05]",
  subtitleClassName = "mt-4 text-sm leading-[20px]",
  minHeight = 280,
  imagePosition = "center",
}) => {
  const subtitleColor = t?.isDark ? SUBTITLE_ON_IMAGE_DARK : SUBTITLE_ON_IMAGE_LIGHT;

  const smokeOverlay = t?.isDark
    ? [
        "linear-gradient(105deg, rgba(30,32,36,0.96) 0%, rgba(30,32,36,0.88) 28%, rgba(30,32,36,0.55) 48%, rgba(30,32,36,0.2) 68%, transparent 86%)",
        "linear-gradient(to top, rgba(30,32,36,0.72) 0%, rgba(30,32,36,0.28) 38%, transparent 62%)",
      ].join(", ")
    : [
        "linear-gradient(105deg, rgba(255,255,255,0.96) 0%, rgba(255,253,250,0.9) 30%, rgba(255,255,255,0.62) 50%, rgba(255,255,255,0.28) 68%, transparent 88%)",
        "linear-gradient(to top, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.35) 42%, transparent 65%)",
      ].join(", ");

  return (
    <header
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundPosition: imagePosition,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: smokeOverlay }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-[inherit] flex-col justify-end px-4 py-9 sm:px-5 sm:py-10">
        {meta ? <div className="mb-4">{meta}</div> : null}
        <div className={`text-left ${contentClassName}`}>
          <h2 className={headingClassName} style={{ color: t?.text }}>
            {title}
          </h2>
          {description ? (
            <div className={subtitleClassName} style={{ color: subtitleColor }}>
              {description}
            </div>
          ) : subtitleHtml ? (
            <p
              className={subtitleClassName}
              style={{ color: subtitleColor }}
              dangerouslySetInnerHTML={{ __html: subtitleHtml }}
            />
          ) : subtitle ? (
            <p className={subtitleClassName} style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default SectionBgTextHeader;
