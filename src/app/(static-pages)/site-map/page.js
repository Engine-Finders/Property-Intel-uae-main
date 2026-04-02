"use client";

import Link from "next/link";
import { useTheme } from "@/app/components/context/ThemeContext";

const sections = [
  {
    title: "Home",
    links: [{ label: "Home", href: "/" }],
  },
  {
    title: "Developers",
    links: [
      { label: "All developers", href: "/developer" },
      { label: "Emaar Properties (sample)", href: "/developer/emaar-properties" },
      { label: "Damac Properties (sample)", href: "/developer/damac-properties" },
      { label: "Nakheel (sample)", href: "/developer/nakheel" },
      { label: "Sobha Realty (sample)", href: "/developer/sobha-realty" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Projects index", href: "/projects" },
      { label: "Project detail (sample)", href: "/project" },
      { label: "Marina Heights (sample)", href: "/project/marina-heights" },
      { label: "Creek Vista (sample)", href: "/project/creek-vista" },
      { label: "Palm Residences (sample)", href: "/project/palm-residences" },
    ],
  },
  {
    title: "Completed projects",
    links: [
      { label: "Completed projects", href: "/completed-projects" },
      { label: "Legacy Tower (sample)", href: "/completed-projects/legacy-tower" },
      { label: "Harbour Point (sample)", href: "/completed-projects/harbour-point" },
      { label: "Skyline One (sample)", href: "/completed-projects/skyline-one" },
    ],
  },
];

export default function SiteMapPage() {
  const { t } = useTheme();

  return (
    <div className="min-h-screen" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <header className="mb-10 lg:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "#B68A35" }}>
            Navigation
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: t.text }}>
            Site map
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: t.textMuted }}>
            Quick links across the site. Some entries are placeholders and will connect to real pages as they go live.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl p-6 lg:p-7"
              style={{
                background: t.cardBg,
                border: `1px solid ${t.cardBorder}`,
              }}
            >
              <h2
                className="text-sm font-semibold uppercase tracking-wider pb-3 mb-4 border-b"
                style={{ color: t.text, borderColor: t.cardBorder }}
              >
                {section.title}
              </h2>
              <ul className="space-y-2.5">
                {section.links.map((item) => (
                  <li key={`${section.title}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors duration-200 hover:text-[#B68A35]"
                      style={{ color: t.textSecondary }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
