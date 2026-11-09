import { Stack } from "expo-router";
import { AppThemeProvider } from "../components/app-theme-context";
import { FavoritesProvider } from "../components/favorites-context";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FavoritesProvider>
    </AppThemeProvider>
  );
}
