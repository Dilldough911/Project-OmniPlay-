import { Stack } from "expo-router";
import { FavoritesProvider } from "../components/favorites-context";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </FavoritesProvider>
  );
}
