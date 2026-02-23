"use client";
import { useState } from "react";
import { useTheme } from "./context/ThemeContext";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Properties", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Market Insights", href: "#" },
  { label: "Contact", href: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme, t } = useTheme();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ background: t.navBg, borderBottom: `1px solid ${t.navBorder}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2 cursor-pointer">
            <span className="font-bold text-xl lg:text-2xl tracking-tight" style={{ color: "#B68A35" }}>
              Property Experts
            </span>
            <span className="text-xs font-medium uppercase tracking-widest hidden sm:inline" style={{ color: t.isDark ? "rgba(255,255,255,0.6)" : "#94a3b8" }}>
              UAE
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#B68A35] cursor-pointer"
                style={{ color: t.isDark ? "rgba(255,255,255,0.7)" : "#64748b" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0" }}
              aria-label="Toggle theme"
            >
              {t.isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <a
              href="#"
              className="px-5 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors duration-200 hover:opacity-90 cursor-pointer"
              style={{ background: "#B68A35" }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0" }}
              aria-label="Toggle theme"
            >
              {t.isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B68A35" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col items-center justify-center w-10 h-10 gap-1.5 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: t.text }} />
              <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} style={{ background: t.text }} />
              <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: t.text }} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-4 pb-6 pt-2 space-y-1" style={{ background: t.isDark ? "#232528" : "#ffffff", borderTop: `1px solid ${t.navBorder}` }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 hover:text-[#B68A35] cursor-pointer"
              style={{ color: t.isDark ? "rgba(255,255,255,0.8)" : "#475569" }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#"
              className="block w-full text-center px-5 py-3 text-sm font-semibold rounded-lg text-white transition-colors duration-200 hover:opacity-90 cursor-pointer"
              style={{ background: "#B68A35" }}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
