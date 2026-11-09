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
import { games, genres, type Game, type Genre } from "../../data/games";

export type SortOption =
  | "default"
  | "rating-desc"
  | "rating-asc"
  | "name-asc"
  | "name-desc";

const sortOptions: { id: SortOption; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "default", label: "Rekomendasi", icon: "sparkles-outline" },
  { id: "rating-desc", label: "Rating Tertinggi", icon: "star" },
  { id: "rating-asc", label: "Rating Terendah", icon: "star-outline" },
  { id: "name-asc", label: "Nama (A–Z)", icon: "arrow-down-outline" },
  { id: "name-desc", label: "Nama (Z–A)", icon: "arrow-up-outline" },
];

export default function ExploreScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { theme, colors } = useAppTheme();
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Semua");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const styles = createStyles(colors);

  const filteredAndSortedGames = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    // 1. Filter
    const filtered = games.filter((game) => {
      const matchesGenre =
        selectedGenre === "Semua" || game.genre === selectedGenre;
      const matchesSearch =
        game.title.toLowerCase().includes(search) ||
        game.developer.toLowerCase().includes(search);

      return matchesGenre && matchesSearch;
    });

    // 2. Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "default":
      default:
        // Tetap sesuai urutan kurasi default
        break;
    }

    return sorted;
  }, [searchText, selectedGenre, sortBy]);

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
            <Text style={styles.title}>OmniPlay</Text>
            <Text style={styles.subtitle}>Jelajahi dan temukan game terbaik</Text>
          </View>
          <ThemeToggle />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            accessibilityLabel="Cari game"
            onChangeText={setSearchText}
            placeholder="Cari game atau developer..."
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
                name="close-circle"
                size={18}
                color={colors.textMuted}
              />
            </Pressable>
          )}
        </View>

        {/* Fitur Urutkan (Sort) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.filterLabel}>Urutkan Berdasarkan</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortContainer}
        >
          {sortOptions.map((opt) => {
            const isSelected = sortBy === opt.id;
            return (
              <Pressable
                key={opt.id}
                accessibilityRole="button"
                onPress={() => setSortBy(opt.id)}
                style={[
                  styles.sortButton,
                  isSelected && styles.selectedSortButton,
                ]}
              >
                <Ionicons
                  name={opt.icon}
                  size={14}
                  color={isSelected ? colors.selectedText : colors.textSecondary}
                  style={styles.sortIcon}
                />
                <Text
                  style={[
                    styles.sortText,
                    isSelected && styles.selectedSortText,
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Filter Genre */}
        <View style={styles.sectionHeader}>
          <Text style={styles.filterLabel}>Filter Kategori Genre</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreScrollContainer}
        >
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <Pressable
                key={genre}
                accessibilityRole="button"
                onPress={() => setSelectedGenre(genre)}
                style={[
                  styles.genreButton,
                  isSelected && styles.selectedGenreButton,
                ]}
              >
                <Text
                  style={[
                    styles.genreText,
                    isSelected && styles.selectedGenreText,
                  ]}
                >
                  {genre}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Hasil & Hitungan Game */}
        <View style={styles.resultsInfoRow}>
          <Text style={styles.sectionTitle}>
            {selectedGenre === "Semua" ? "Semua Genre" : selectedGenre}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredAndSortedGames.length} game ditemukan
          </Text>
        </View>

        {/* Grid Game Card */}
        {filteredAndSortedGames.length > 0 ? (
          <View style={styles.gameGrid}>
            {filteredAndSortedGames.map((game) => {
              const favorite = isFavorite(game.title);

              return (
                <Pressable
                  key={game.id}
                  accessibilityHint="Buka informasi lengkap game"
                  accessibilityLabel={`Lihat detail ${game.title}`}
                  accessibilityRole="button"
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
                        size: game.size,
                        downloads: game.downloads,
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
                      accessibilityLabel={
                        favorite
                          ? `Hapus ${game.title} dari favorit`
                          : `Tambahkan ${game.title} ke favorit`
                      }
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavorite(game.title);
                      }}
                      style={[
                        styles.quickFavoriteButton,
                        favorite && styles.quickFavoriteButtonActive,
                      ]}
                    >
                      <Ionicons
                        name={favorite ? "heart" : "heart-outline"}
                        size={17}
                        color={favorite ? "#EF4444" : "#FFFFFF"}
                      />
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
                        <Ionicons name="star" size={11} color={colors.ratingText} />
                        <Text style={styles.gameRating}>
                          {game.rating.toFixed(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={52}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>Game tidak ditemukan</Text>
            <Text style={styles.emptySubtitle}>
              Coba gunakan kata kunci lain atau ubah pilihan filter genre.
            </Text>
            {(searchText.length > 0 || selectedGenre !== "Semua") && (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setSearchText("");
                  setSelectedGenre("Semua");
                  setSortBy("default");
                }}
                style={styles.resetFilterButton}
              >
                <Text style={styles.resetFilterText}>Reset Filter</Text>
              </Pressable>
            )}
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
      marginBottom: 16,
    },
    headerTextGroup: {
      flex: 1,
    },
    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "800",
      letterSpacing: -0.5,
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
      marginBottom: 18,
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
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    filterLabel: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },
    sortContainer: {
      gap: 8,
      paddingBottom: 16,
    },
    sortButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      borderColor: colors.surfaceAltBorder,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 13,
      paddingVertical: 8,
    },
    selectedSortButton: {
      backgroundColor: colors.accent,
      borderColor: colors.accentBorder,
    },
    sortIcon: {
      marginRight: 5,
    },
    sortText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "600",
    },
    selectedSortText: {
      color: colors.selectedText,
      fontWeight: "700",
    },
    genreScrollContainer: {
      gap: 8,
      paddingBottom: 18,
    },
    genreButton: {
      backgroundColor: colors.surfaceAlt,
      borderColor: colors.surfaceAltBorder,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 7,
    },
    selectedGenreButton: {
      backgroundColor: colors.accentSurface,
      borderColor: colors.accentBorder,
    },
    genreText: {
      color: colors.textSecondary,
      fontSize: 13,
      fontWeight: "500",
    },
    selectedGenreText: {
      color: colors.accentText,
      fontWeight: "700",
    },
    resultsInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      marginTop: 2,
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
      backgroundColor: "rgba(0,0,0,0.55)",
      borderRadius: 20,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    quickFavoriteButtonActive: {
      backgroundColor: "rgba(0,0,0,0.75)",
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
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 48,
      gap: 8,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "700",
      marginTop: 8,
    },
    emptySubtitle: {
      color: colors.textSecondary,
      fontSize: 13,
      textAlign: "center",
      paddingHorizontal: 24,
    },
    resetFilterButton: {
      marginTop: 12,
      backgroundColor: colors.accentSurface,
      borderColor: colors.accentBorder,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    resetFilterText: {
      color: colors.accentText,
      fontSize: 13,
      fontWeight: "700",
    },
  });
