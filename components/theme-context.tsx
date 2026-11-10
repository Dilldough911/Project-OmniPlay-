import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  inputBorder: string;
  text: string;
  secondaryText: string;
  mutedText: string;
  accent: string;
  chipBackground: string;
  chipText: string;
  selectedBackground: string;
  selectedBorder: string;
  ratingBackground: string;
  ratingText: string;
  divider: string;
  favoriteActiveBackground: string;
  favoriteActiveBorder: string;
};

const themes: Record<Theme, ThemeColors> = {
  dark: {
    background: "#05070A",
    surface: "#0F172A",
    surfaceAlt: "#111827",
    border: "#1E293B",
    inputBorder: "#1E3A5F",
    text: "#F8FAFC",
    secondaryText: "#CBD5E1",
    mutedText: "#94A3B8",
    accent: "#7DD3FC",
    chipBackground: "#082F49",
    chipText: "#7DD3FC",
    selectedBackground: "#172554",
    selectedBorder: "#3B82F6",
    ratingBackground: "#292313",
    ratingText: "#FDE68A",
    divider: "#263449",
    favoriteActiveBackground: "#3F1726",
    favoriteActiveBorder: "#BE1238",
  },
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F5F9",
    border: "#CBD5E1",
    inputBorder: "#94A3B8",
    text: "#0F172A",
    secondaryText: "#475569",
    mutedText: "#64748B",
    accent: "#0369A1",
    chipBackground: "#E0F2FE",
    chipText: "#075985",
    selectedBackground: "#DBEAFE",
    selectedBorder: "#2563EB",
    ratingBackground: "#FEF3C7",
    ratingText: "#92400E",
    divider: "#E2E8F0",
    favoriteActiveBackground: "#FFE4E6",
    favoriteActiveBorder: "#E11D48",
  },
};

type ThemeContextValue = {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  const value: ThemeContextValue = {
    theme,
    colors: themes[theme],
    toggleTheme: () =>
      setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark")),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within ThemeProvider.");
  }

  return context;
}
