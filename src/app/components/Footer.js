"use client";
import { useTheme } from "./context/ThemeContext";

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  properties: [
    { label: "Off-Plan", href: "#" },
    { label: "Ready Properties", href: "#" },
    { label: "Luxury Villas", href: "#" },
    { label: "Apartments", href: "#" },
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

const Footer = () => {
  const { t } = useTheme();

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
              {["X", "In", "IG", "YT"].map((icon) => (
                <a key={icon} href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-200 hover:text-[#B68A35]" style={{ border: `1px solid ${t.cardBorder}`, color: t.textMuted }}>
                  {icon}
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
