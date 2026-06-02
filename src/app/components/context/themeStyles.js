"use client";

import { useMemo } from "react";
import { useTheme } from "./ThemeContext";

/** Canonical gold tokens (aligned with single-project HeroSection) */
export const GOLD = "#B68A35";
export const GOLD_BORDER = "rgba(182,138,53,0.18)";
export const GOLD_BG = "rgba(182,138,53,0.06)";
export const GOLD_BG_STRONG = "rgba(182,138,53,0.08)";
export const GOLD_TEXT_SOFT = "#e7d2a2";
export const PANEL_DARK_BG = "#25282d";
/** Elevated strip (tab bar, inputs) — lighter than page bg, not near-black */
export const SURFACE_ELEVATED = "#2a2d33";
export const DIVIDER_DARK = "rgba(255,255,255,0.08)";

const HERO_OVERLAY_LEFT =
  "linear-gradient(to right, #25282d 0%, #25282d 40%, rgba(37,40,45,0.9) 52%, rgba(37,40,45,0.42) 72%, transparent 100%)";

/**
 * Dark-mode inline styles shared across sections (project hero palette).
 * Returns null in light mode — keep light styling on Tailwind classes.
 */
export function getDarkStyles(t) {
  if (!t.isDark) return null;

  return {
    page: { background: t.bg, color: t.text },
    heroOverlayLeft: { background: HERO_OVERLAY_LEFT },
    panel: {
      background: PANEL_DARK_BG,
      borderColor: t.cardBorder,
      boxShadow: "0 14px 34px rgba(0,0,0,0.28)",
    },
    panelInner: {
      background: PANEL_DARK_BG,
      borderColor: t.cardBorder,
    },
    card: {
      background: PANEL_DARK_BG,
      borderColor: t.cardBorder,
      boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
    },
    goldTint: {
      background: "rgba(182,138,53,0.05)",
      border: `1px solid ${GOLD_BORDER}`,
      boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
    },
    verifyBanner: {
      background: GOLD_BG_STRONG,
      borderColor: GOLD_BORDER,
      color: t.textSecondary,
    },
    tabBar: { background: SURFACE_ELEVATED, borderColor: t.cardBorder },
    tabActive: { background: PANEL_DARK_BG, color: GOLD },
    tabInactive: { background: "transparent", color: t.textMuted },
    tabCountActive: {
      background: "rgba(182,138,53,0.92)",
      color: "#ffffff",
    },
    tabCountInactive: {
      background: "rgba(182,138,53,0.1)",
      border: `1px solid ${GOLD_BORDER}`,
      color: GOLD_TEXT_SOFT,
    },
    iconCircle: { background: "rgba(182,138,53,0.1)" },
    divider: { background: DIVIDER_DARK },
    dividerColor: DIVIDER_DARK,
    borderDivider: { borderColor: DIVIDER_DARK },
    text: { color: t.text },
    textSecondary: { color: t.textSecondary },
    textMuted: { color: t.textMuted },
    goldLink: { color: GOLD_TEXT_SOFT },
    excellentBadge: {
      background: "rgba(182,138,53,0.1)",
      borderColor: GOLD_BORDER,
      color: GOLD_TEXT_SOFT,
    },
    track: { background: DIVIDER_DARK },
    expertCard: { background: PANEL_DARK_BG, borderColor: t.cardBorder },
    expertIcon: { borderColor: t.cardBorder, color: t.textSecondary },
    statCard: { background: PANEL_DARK_BG, borderColor: t.cardBorder },
    surfaceAlt: { background: SURFACE_ELEVATED },
    inputSurface: {
      background: SURFACE_ELEVATED,
      borderColor: t.cardBorder,
      color: t.textMuted,
    },
    rowHover: { background: PANEL_DARK_BG },
  };
}

/** Section wrapper — works in light and dark */
export function sectionStyle(t) {
  return { background: t.bg, ...(t.isDark ? { color: t.text } : {}) };
}

/**
 * Light = Tailwind classes, dark = inline style object.
 * Spread onto JSX: <div {...themeProps(isDark, "bg-white", dark.panel)} />
 */
export function themeProps(isDark, lightClassName = "", darkStyle) {
  return {
    className: isDark ? "" : lightClassName,
    style: isDark && darkStyle ? darkStyle : undefined,
  };
}

/**
 * Same pattern for text nodes.
 * themeTextProps(isDark, "text-slate-900", dark.text)
 */
export function themeTextProps(isDark, lightClassName, darkStyle) {
  return themeProps(isDark, lightClassName, darkStyle);
}

/**
 * Preferred hook for sections migrating off hardcoded dark colors.
 *
 * @example
 * const { t, isDark, dark, section } = useThemeStyles();
 * <section style={section}>...</section>
 * <div {...themeProps(isDark, "bg-white border-gray-100", dark?.panel)} />
 */
export function useThemeStyles() {
  const { t, theme, toggleTheme } = useTheme();
  const dark = useMemo(() => getDarkStyles(t), [t]);

  return {
    t,
    theme,
    toggleTheme,
    isDark: t.isDark,
    dark,
    section: sectionStyle(t),
  };
}
