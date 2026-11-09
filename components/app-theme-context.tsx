import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AppTheme = "dark" | "light";

export type AppColors = {
  background: string;
  surface: string;
  surfaceBorder: string;
  surfaceAlt: string;
  surfaceAltBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentBorder: string;
  accentSurface: string;
  accentText: string;
  selectedText: string;
  imageBackground: string;
  genreBackground: string;
  genreText: string;
  ratingBackground: string;
  ratingText: string;
  divider: string;
  favoriteSurface: string;
  favoriteBorder: string;
  favoriteActiveSurface: string;
  favoriteActiveBorder: string;
};

const colorsByTheme: Record<AppTheme, AppColors> = {
  dark: {
    background: "#05070A",
    surface: "#0F172A",
    surfaceBorder: "#1E293B",
    surfaceAlt: "#0F172A",
    surfaceAltBorder: "#1E3A5F",
    text: "#F8FAFC",
    textSecondary: "#CBD5E1",
    textMuted: "#94A3B8",
    accent: "#7DD3FC",
    accentBorder: "#3B82F6",
    accentSurface: "#172554",
    accentText: "#7DD3FC",
    selectedText: "#FFFFFF",
    imageBackground: "#111827",
    genreBackground: "#082F49",
    genreText: "#7DD3FC",
    ratingBackground: "#292313",
    ratingText: "#FDE68A",
    divider: "#263449",
    favoriteSurface: "#172554",
    favoriteBorder: "#2563EB",
    favoriteActiveSurface: "#3F1726",
    favoriteActiveBorder: "#BE123C",
  },
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceBorder: "#E2E8F0",
    surfaceAlt: "#F1F5F9",
    surfaceAltBorder: "#CBD5E1",
    text: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#64748B",
    accent: "#1D4ED8",
    accentBorder: "#60A5FA",
    accentSurface: "#2563EB",
    accentText: "#1D4ED8",
    selectedText: "#FFFFFF",
    imageBackground: "#E2E8F0",
    genreBackground: "#DBEAFE",
    genreText: "#1D4ED8",
    ratingBackground: "#FEF3C7",
    ratingText: "#92400E",
    divider: "#E2E8F0",
    favoriteSurface: "#1D4ED8",
    favoriteBorder: "#1D4ED8",
    favoriteActiveSurface: "#BE123C",
    favoriteActiveBorder: "#BE123C",
  },
};

type AppThemeContextValue = {
  theme: AppTheme;
  colors: AppColors;
  toggleTheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>("dark");
  const value = useMemo<AppThemeContextValue>(
    () => ({
      theme,
      colors: colorsByTheme[theme],
      toggleTheme: () =>
        setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider.");
  }

  return context;
}
