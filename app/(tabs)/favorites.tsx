import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme, type AppColors } from "../../components/app-theme-context";
import { useFavorites } from "../../components/favorites-context";
import { ThemeToggle } from "../../components/theme-toggle";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, favoriteItems, toggleFavorite } = useFavorites();
  const { theme, colors } = useAppTheme();
  const [searchText, setSearchText] = useState("");

  const styles = createStyles(colors);

  const filteredFavorites = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    return favoriteItems.filter((game) => {
      if (!search) return true;
      return (
        game.title.toLowerCase().includes(search) ||
        game.developer.toLowerCase().includes(search) ||
        game.genre.toLowerCase().includes(search)
      );
    });
  }, [favoriteItems, searchText]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextGroup}>
            <View style={styles.titleBadgeRow}>
              <Text style={styles.title}>Game Favorit</Text>
              {favorites.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{favorites.length}</Text>
                </View>
              )}
            </View>
            <Text style={styles.subtitle}>
              Koleksi game pilihan yang kamu simpan
            </Text>
          </View>
          <ThemeToggle />
        </View>

        {favorites.length > 0 ? (
          <>
            {/* Search Input for Favorites */}
            <View style={styles.searchContainer}>
              <Ionicons
                color={colors.textMuted}
                name="search-outline"
                size={20}
                style={styles.searchIcon}
              />
              <TextInput
                accessibilityLabel="Cari di favorit"
                onChangeText={setSearchText}
                placeholder="Cari dalam koleksi favorit..."
                placeholderTextColor={colors.textMuted}
                style={styles.searchInput}
                value={searchText}
              />
              {searchText.length > 0 && (
                <Pressable
                  accessibilityLabel="Hapus pencarian"
                  onPress={() => setSearchText("")}
                  style={styles.clearSearchButton}
                >
                  <Ionicons
                    color={colors.textMuted}
                    name="close-circle"
                    size={18}
                  />
                </Pressable>
              )}
            </View>

            {/* Results count */}
            <View style={styles.resultsInfoRow}>
              <Text style={styles.sectionTitle}>Daftar Tersimpan</Text>
              <Text style={styles.resultsCount}>
                {filteredFavorites.length} game
              </Text>
            </View>

            {filteredFavorites.length > 0 ? (
              <View style={styles.gameGrid}>
                {filteredFavorites.map((game) => (
                  <Pressable
                    accessibilityHint="Buka informasi lengkap game"
                    accessibilityLabel={`Lihat detail ${game.title}`}
                    accessibilityRole="button"
                    key={game.id}
                    onPress={() =>
                      router.push({
                        pathname: "/game-detail",
                        params: {
                          id: game.id,
                          title: game.title,
                          developer: game.developer,
                          genre: game.genre,
                          rating: String(game.rating),
                          image: game.image,
                          storeUrl: game.storeUrl,
                          description: game.description,
                          platform: game.platform || "",
                          releaseDate: game.releaseDate || "",
                        },
                      })
                    }
                    style={styles.gameCard}
                  >
                    <View style={styles.imageWrapper}>
                      <Image
                        accessibilityLabel={`Gambar ${game.title}`}
                        contentFit="cover"
                        source={game.image}
                        style={styles.gameImage}
                        transition={200}
                      />
                      <Pressable
                        accessibilityLabel={`Hapus ${game.title} dari favorit`}
                        onPress={(e) => {
                          e.stopPropagation();
                          toggleFavorite(game);
                        }}
                        style={styles.quickFavoriteButton}
                      >
                        <Ionicons color="#EF4444" name="heart" size={17} />
                      </Pressable>
                    </View>

                    <View style={styles.gameContent}>
                      <Text numberOfLines={2} style={styles.gameTitle}>
                        {game.title}
                      </Text>
                      <Text numberOfLines={1} style={styles.gameInfo}>
                        {game.developer}
                      </Text>
                      <View style={styles.gameDetails}>
                        <Text numberOfLines={1} style={styles.gameGenre}>
                          {game.genre}
                        </Text>
                        <View style={styles.ratingBadge}>
                          <Ionicons
                            color={colors.ratingText}
                            name="star"
                            size={11}
                          />
                          <Text style={styles.gameRating}>
                            {game.rating.toFixed(1)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : (
              <View style={styles.emptySearchContainer}>
                <Ionicons
                  color={colors.textMuted}
                  name="search-outline"
                  size={42}
                />
                <Text style={styles.emptyTitle}>Tidak ditemukan</Text>
                <Text style={styles.emptySubtitle}>
                  Tidak ada game favorit yang cocok dengan kata kunci &quot;{searchText}&quot;.
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons color={colors.accent} name="heart-outline" size={48} />
            </View>
            <Text style={styles.emptyStateTitle}>Belum Ada Game Favorit</Text>
            <Text style={styles.emptyStateText}>
              Kamu belum menyimpan game apa pun. Jelajahi katalog game seru kami di tab Jelajah dan tekan ikon hati untuk menyimpannya di sini.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/(tabs)")}
              style={styles.exploreButton}
            >
              <Ionicons
                color={colors.selectedText}
                name="game-controller-outline"
                size={18}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.exploreButtonText}>Jelajahi Game</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 18,
      paddingBottom: 28,
    },
    headerRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 18,
    },
    headerTextGroup: {
      flex: 1,
    },
    titleBadgeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "800",
      letterSpacing: -0.5,
    },
    badge: {
      backgroundColor: "#EF4444",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
    },
    badgeText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "800",
    },
    subtitle: {
      color: colors.textSecondary,
      marginTop: 3,
      fontSize: 13,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      borderColor: colors.surfaceAltBorder,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      paddingVertical: 11,
      fontSize: 14,
    },
    clearSearchButton: {
      padding: 4,
    },
    resultsInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
    },
    resultsCount: {
      color: colors.textMuted,
      fontSize: 12,
    },
    gameGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 12,
    },
    gameCard: {
      width: "48%",
      backgroundColor: colors.surface,
      borderColor: colors.surfaceBorder,
      borderRadius: 16,
      borderWidth: 1,
      overflow: "hidden",
    },
    imageWrapper: {
      position: "relative",
      width: "100%",
      aspectRatio: 1,
      backgroundColor: colors.imageBackground,
    },
    gameImage: {
      width: "100%",
      height: "100%",
    },
    quickFavoriteButton: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "rgba(0,0,0,0.75)",
      borderRadius: 20,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    gameContent: {
      padding: 10,
    },
    gameTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "700",
      lineHeight: 18,
      minHeight: 36,
    },
    gameInfo: {
      color: colors.textSecondary,
      fontSize: 12,
      marginTop: 3,
    },
    gameDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      gap: 6,
    },
    gameGenre: {
      color: colors.genreText,
      fontWeight: "700",
      backgroundColor: colors.genreBackground,
      borderRadius: 6,
      overflow: "hidden",
      fontSize: 10,
      paddingHorizontal: 7,
      paddingVertical: 3,
      flexShrink: 1,
    },
    ratingBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.ratingBackground,
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 3,
      gap: 3,
    },
    gameRating: {
      color: colors.ratingText,
      fontWeight: "700",
      fontSize: 11,
    },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 64,
      paddingHorizontal: 24,
    },
    emptyIconCircle: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.surfaceAltBorder,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18,
    },
    emptyStateTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 8,
      textAlign: "center",
    },
    emptyStateText: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
      textAlign: "center",
      marginBottom: 24,
    },
    exploreButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.accent,
      borderRadius: 14,
      paddingHorizontal: 24,
      paddingVertical: 13,
    },
    exploreButtonText: {
      color: colors.selectedText,
      fontSize: 15,
      fontWeight: "700",
    },
    emptySearchContainer: {
      alignItems: "center",
      paddingVertical: 40,
      gap: 8,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
    },
    emptySubtitle: {
      color: colors.textSecondary,
      fontSize: 13,
      textAlign: "center",
    },
  });
