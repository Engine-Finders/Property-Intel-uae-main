"use client";
import { useTheme } from "./context/ThemeContext";
import { Facebook, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  resources: [
    { label: "Market Reports", href: "#" },
    { label: "Investment Guide", href: "#" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Disclaimer", href: "#" },
  ],
};

const XIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M18.9 2H22l-6.8 7.8L23.3 22h-6.5l-5.1-7.1L5.5 22H2.4l7.3-8.4L1 2h6.7l4.6 6.4L18.9 2Zm-1.1 18h1.7L6.6 4h-1.8l13 16Z"
      fill={color}
    />
  </svg>
);

const TikTokIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M15.6 2c.4 3 2.5 5.4 5.4 5.7v3.2c-1.8.1-3.5-.5-4.9-1.6v7.3c0 4-3.2 7.2-7.2 7.2S1.7 19.6 1.7 15.6s3.2-7.2 7.2-7.2c.4 0 .8 0 1.2.1v3.4c-.4-.1-.8-.2-1.2-.2-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8 3.8-1.7 3.8-3.8V2h2.9Z"
      fill={color}
    />
  </svg>
);

const Footer = () => {
  const { t } = useTheme();
  const iconColor = t.isDark ? "rgba(255,255,255,0.82)" : "rgba(15,23,42,0.82)";

  return (
    <footer style={{ background: t.isDark ? "#232528" : "#f1f5f9", borderTop: `1px solid ${t.cardBorder}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <span className="font-bold text-xl tracking-tight" style={{ color: "#B68A35" }}>Property Experts</span>
            <p className="text-sm mt-3 max-w-xs leading-relaxed" style={{ color: t.textMuted }}>
              Your trusted partner for premium real estate investments in the UAE. Data-driven insights, expert guidance.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { label: "Facebook", href: "https://www.facebook.com/propertyinteluae/", Icon: Facebook },
                { label: "Instagram", href: "https://www.instagram.com/propertyinteluae/", Icon: Instagram },
                { label: "X", href: "https://x.com/propertyintelae", Icon: XIcon },
                { label: "YouTube", href: "https://www.youtube.com/@PropertyIntelUAE", Icon: Youtube },
                { label: "TikTok", href: "https://www.tiktok.com/@propertyinteluae", Icon: TikTokIcon },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:opacity-90"
                  style={{ border: `1px solid ${t.cardBorder}`, color: t.textMuted }}
                >
                  {Icon === XIcon || Icon === TikTokIcon ? (
                    <Icon size={18} color={iconColor} />
                  ) : (
                    <Icon size={18} color={iconColor} strokeWidth={1.8} />
                  )}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: t.text }}>{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm transition-colors duration-200 hover:text-[#B68A35]" style={{ color: t.textMuted }}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: t.text }}>Social</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Facebook", href: "https://www.facebook.com/propertyinteluae/" },
                { label: "Instagram", href: "https://www.instagram.com/propertyinteluae/" },
                { label: "X (Twitter)", href: "https://x.com/propertyintelae" },
                { label: "YouTube", href: "https://www.youtube.com/@PropertyIntelUAE" },
                { label: "TikTok", href: "https://www.tiktok.com/@propertyinteluae" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-[#B68A35]"
                    style={{ color: t.textMuted }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
          <p className="text-xs" style={{ color: t.textMuted }}>© {new Date().getFullYear()} Property Experts UAE. All rights reserved.</p>
          <p className="text-xs" style={{ color: t.textMuted }}>Regulated by Dubai Land Department · RERA certified</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
