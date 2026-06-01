"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

        setIsDark(prefersDark);
        setMounted(true);
    }, []);

    // Update DOM and localStorage when theme changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [isDark, mounted]);

    const toggleTheme = () => setIsDark(!isDark);

    const value = useMemo(() => ({ isDark, toggleTheme, mounted }), [isDark, mounted]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
