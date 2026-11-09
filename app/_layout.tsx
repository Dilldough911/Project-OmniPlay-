import { Stack } from "expo-router";
import { AppThemeProvider } from "../components/app-theme-context";
import { FavoritesProvider } from "../components/favorites-context";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="game-detail"
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </FavoritesProvider>
    </AppThemeProvider>
  );
}
