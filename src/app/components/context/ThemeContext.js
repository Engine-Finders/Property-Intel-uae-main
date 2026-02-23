"use client";
import { createContext, useContext, useState, useEffect } from "react";

const darkColors = {
  bg: "#232528",
  bgAlt: "#1a1c1f",
  text: "#ffffff",
  textSecondary: "#c0c7d6",
  textMuted: "#6b7a99",
  cardBg: "rgba(255,255,255,0.05)",
  cardBorder: "#2a2d33",
  navBg: "rgba(35,37,40,0.95)",
  navBorder: "#2a2d33",
  isDark: true,
};

const lightColors = {
  bg: "#F8FAFC",
  bgAlt: "#f1f5f9",
  text: "#1e293b",
  textSecondary: "#475569",
  textMuted: "#64748b",
  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
  navBg: "rgba(255,255,255,0.95)",
  navBorder: "#e2e8f0",
  isDark: false,
};

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  t: darkColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const t = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, t }}>
      {children}
    </ThemeContext.Provider>
  );
};
