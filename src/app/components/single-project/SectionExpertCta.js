"use client";

const GOLD = "#B68A35";

const DEFAULT_ACTIONS = [
  { label: "WhatsApp", subtext: "Chat instantly", type: "whatsapp", href: "#" },
  { label: "Call Us", subtext: "Speak directly", type: "phone", href: "#" },
  { label: "Email Us", subtext: "We'll get back", type: "email", href: "#" },
];

const ContactIcon = ({ type }) => {
  if (type === "whatsapp") {
    return (
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21l1.4-4.4A8.7 8.7 0 1 1 7.7 20L3 21Z" />
        <path d="M8.8 8.9c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3 0 .5.5 1 1.3 1.8 2.3 2.3.2.1.4.1.5-.1l.5-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .5-.2 1-.6 1.3-.5.4-1.1.5-1.8.3-3.4-.9-5.8-3.3-6.7-6.7-.2-.7-.1-1.3.2-1.8.2-.3.5-.6.8-.8Z" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }

  return (
    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
};

const ExpertBadgeIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21a7 7 0 0 1 14 0" />
    <path d="M18 8h2" />
    <path d="M4 8h2" />
  </svg>
);

const SectionExpertCta = ({ cta, t, className = "" }) => {
  if (!cta) return null;

  const actions = Array.isArray(cta.actions) && cta.actions.length > 0 ? cta.actions : DEFAULT_ACTIONS;

  return (
    <div
      className={`rounded-[22px] border px-5 py-6 lg:px-6 lg:py-4 ${className}`}
      style={{
        background: t.isDark ? "rgba(255,255,255,0.03)" : "#fffdf9",
        borderColor: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(182,138,53,0.12)",
        boxShadow: t.isDark ? "0 12px 30px rgba(0,0,0,0.22)" : "0 12px 30px rgba(15,23,42,0.04)",
      }}
    >
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:items-center lg:gap-0">
        <div className="flex items-center justify-center gap-4 border-b pb-5 text-center lg:justify-start lg:border-b-0 lg:pb-0 lg:pr-6 lg:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" style={{ background: "linear-gradient(180deg, #C99432 0%, #AE7A22 100%)" }}>
            <ExpertBadgeIcon />
          </span>
          <span className="text-left">
            <span className="block text-xl font-semibold leading-tight" style={{ color: t.text }}>
              {cta.heading}
            </span>
            <span className="mt-2 block text-sm leading-snug lg:mt-1 lg:leading-relaxed" style={{ color: t.textSecondary }}>
              {cta.subtext}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x lg:contents" style={{ borderColor: t.cardBorder }}>
          {actions.map((action, index) => (
            <a
              key={`${action.label}-${index}`}
              href={action.href || "#"}
              className="px-2 text-center transition-opacity hover:opacity-80 lg:flex lg:items-center lg:gap-3 lg:border-l lg:px-5 lg:text-left"
              style={{ borderColor: t.cardBorder }}
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border lg:mx-0 lg:shrink-0" style={{ borderColor: "rgba(182,138,53,0.28)", color: GOLD }}>
                <ContactIcon type={action.type} />
              </span>
              <span className="mt-3 block text-center lg:mt-0 lg:min-w-0 lg:text-left">
                <span className="block text-sm font-semibold leading-tight" style={{ color: t.text }}>
                  {action.label}
                </span>
                <span className="mt-1 block text-xs leading-tight" style={{ color: t.textSecondary }}>
                  {action.subtext}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionExpertCta;
