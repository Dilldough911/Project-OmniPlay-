import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AppThemeProvider, useAppTheme } from "../components/app-theme-context";
import { FavoritesProvider } from "../components/favorites-context";
import { AuthProvider, useAuth } from "../context/auth-context";

/**
 * Codelab 4: Penjaga Gerbang (AuthContext & Tata Letak Akar yang Dilindungi)
 * Menggunakan useSegments() dan useAuth() untuk perlindungan rute dinamis tanpa flicker.
 */
function NavigationGuard() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { colors } = useAppTheme();

  useEffect(() => {
    // RULE 1: Jika masih loading -> jangan melakukan redirect
    if (isLoading) return;

    // Periksa apakah rute saat ini berada dalam grup auth
    const segmentList = segments as string[];
    const inAuthGroup = segmentList[0] === "(auth)";

    if (!session && !inAuthGroup) {
      // RULE 2 & RULE 4:
      // - Jika belum login dan mencoba mengakses area aplikasi -> arahkan ke /(auth)/login
      // - Jika logout -> kembali ke /(auth)/login
      router.replace("/(auth)/login" as any);
    } else if (session && inAuthGroup) {
      // RULE 3: Jika sudah login tetapi berada di halaman login -> arahkan ke area aplikasi
      router.replace("/(tabs)" as any);
    }
  }, [session, segments, isLoading, router]);

  // Perisai Pemuatan yang Lancar:
  // Tampilkan tactical loading indicator selama token didekripsi dari keystore hardware
  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors?.background || "#05070A" },
        ]}
      >
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>Memeriksa Kredensial Lapangan...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="game-detail"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <NavigationGuard />
        </FavoritesProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  loadingText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
