"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { themes, type ThemeMode, type ThemeTokens } from "@/config/theme";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  tokens: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  tokens: themes.dark,
});

export function useTheme() {
  return useContext(ThemeContext);
}

/** Maps JS camelCase token keys to --theme-kebab CSS vars */
function toCSSVarName(key: string): string {
  return "--theme-" + key.replace(/([A-Z0-9])/g, "-$1").toLowerCase();
}

function applyThemeToDOM(mode: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);

  const tokens = themes[mode];
  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(toCSSVarName(key), value);
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    const initial = stored === "light" ? "light" : "dark";
    setTheme(initial);
    applyThemeToDOM(initial);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyThemeToDOM(next);
      return next;
    });
  }, []);

  // Prevent flash of wrong theme
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, tokens: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}
