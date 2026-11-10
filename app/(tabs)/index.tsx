import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
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
import { fallbackGames } from "../../data/games";
import {
  fetchGamesCustomAsync,
  type IGame,
} from "../../services/gameService";

export type SortOption =
  | "default"
  | "rating-desc"
  | "rating-asc"
  | "name-asc"
  | "name-desc";

const sortOptions: {
  id: SortOption;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
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

  // State Pengambilan Data
  const [gamesList, setGamesList] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFromApi, setIsFromApi] = useState(false);

  // State Filter & Sort
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("Semua");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const styles = createStyles(colors);

  // --------------------------------------------------------------------------
  // [SYARAT 2 & 3]: Pengambilan Data Menggunakan Custom Async Function & .then()
  // --------------------------------------------------------------------------
  const loadGamesData = (resetLoading = false) => {
    if (resetLoading) {
      setLoading(true);
      setErrorMessage(null);
    }

    // Memanggil Custom Async Function yang mengembalikan Promise
    // Dan menggunakan rantai .then() serta .catch() sesuai kriteria tugas
    fetchGamesCustomAsync()
      .then((data: IGame[]) => {
        // [OPSI 2]: Menggabungkan 17 game pilihan lokal di daftar atas + katalog dari External API
        const combinedGames: IGame[] = [
          ...fallbackGames,
          ...data.filter(
            (apiGame) =>
              !fallbackGames.some(
                (fg) => fg.title.toLowerCase() === apiGame.title.toLowerCase(),
              ),
          ),
        ];
        // [SYARAT 1]: Data tersimpan dalam State bertipe Interface IGame[]
        setGamesList(combinedGames);
        setIsFromApi(true);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error: Error) => {
        console.warn("Gagal memuat dari API, menggunakan data lokal:", error.message);
        // Fallback ke 17 game lokal jika koneksi terputus
        setGamesList(fallbackGames);
        setIsFromApi(false);
        setErrorMessage(
          "Koneksi API eksternal gagal. Menggunakan data cadangan lokal (17 Game).",
        );
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadGamesData(false);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadGamesData(true);
  };

  // Ekstraksi daftar genre dinamis dari data game
  const dynamicGenres = useMemo(() => {
    const unique = Array.from(new Set(gamesList.map((g) => g.genre)));
    return ["Semua", ...unique];
  }, [gamesList]);

  // Filter & Urutkan Data
  const filteredAndSortedGames = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    const filtered = gamesList.filter((game) => {
      const matchesGenre =
        selectedGenre === "Semua" || game.genre === selectedGenre;
      const matchesSearch =
        game.title.toLowerCase().includes(search) ||
        game.developer.toLowerCase().includes(search);

      return matchesGenre && matchesSearch;
    });

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
        break;
    }

    return sorted;
  }, [gamesList, searchText, selectedGenre, sortBy]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            colors={[colors.accent]}
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor={colors.accent}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.title}>OmniPlay</Text>
            <Text style={styles.subtitle}>
              Jelajahi game pilihan & katalog External API
            </Text>
          </View>
          <ThemeToggle />
        </View>

        {/* Status Indikator Sumber Data (API vs Offline) */}
        <View style={styles.apiStatusBadge}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isFromApi ? "#10B981" : "#F59E0B" },
            ]}
          />
          <Text style={styles.apiStatusText}>
            {isFromApi
              ? "Katalog: 17 Game Pilihan + External API (Live)"
              : "Mode Cadangan Lokal (17 Game Pilihan)"}
          </Text>
        </View>

        {errorMessage && (
          <View style={styles.warningBox}>
            <Ionicons name="warning-outline" size={16} color="#F59E0B" />
            <Text style={styles.warningText}>{errorMessage}</Text>
          </View>
        )}

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
            placeholder="Cari judul game atau pengembang..."
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
          contentContainerStyle={styles.sortContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {sortOptions.map((opt) => {
            const isSelected = sortBy === opt.id;
            return (
              <Pressable
                accessibilityRole="button"
                key={opt.id}
                onPress={() => setSortBy(opt.id)}
                style={[
                  styles.sortButton,
                  isSelected && styles.selectedSortButton,
                ]}
              >
                <Ionicons
                  color={isSelected ? colors.selectedText : colors.textSecondary}
                  name={opt.icon}
                  size={14}
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
          <Text style={styles.filterLabel}>Kategori Genre</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.genreScrollContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {dynamicGenres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <Pressable
                accessibilityRole="button"
                key={genre}
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

        {/* Ringkasan Hasil */}
        <View style={styles.resultsInfoRow}>
          <Text style={styles.sectionTitle}>
            {selectedGenre === "Semua" ? "Semua Genre" : selectedGenre}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredAndSortedGames.length} game ditemukan
          </Text>
        </View>

        {/* Loading Spinner */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.accent} size="large" />
            <Text style={styles.loadingText}>
              Mengambil data dari External API...
            </Text>
          </View>
        ) : filteredAndSortedGames.length > 0 ? (
          /* Grid Game */
          <View style={styles.gameGrid}>
            {filteredAndSortedGames.map((game) => {
              const favorite = isFavorite(game.title);

              return (
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
                        size: game.size || "",
                        downloads: game.downloads || "",
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
                        color={favorite ? "#EF4444" : "#FFFFFF"}
                        name={favorite ? "heart" : "heart-outline"}
                        size={17}
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
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              color={colors.textMuted}
              name="search-outline"
              size={52}
            />
            <Text style={styles.emptyTitle}>Game tidak ditemukan</Text>
            <Text style={styles.emptySubtitle}>
              Coba gunakan kata kunci lain atau ubah pilihan kategori genre.
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
      marginBottom: 12,
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
      marginTop: 2,
      fontSize: 13,
    },
    apiStatusBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 16,
      marginBottom: 14,
      gap: 6,
    },
    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    apiStatusText: {
      color: colors.textSecondary,
      fontSize: 11,
      fontWeight: "600",
    },
    warningBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(245, 158, 11, 0.12)",
      borderColor: "rgba(245, 158, 11, 0.3)",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 14,
      gap: 8,
    },
    warningText: {
      color: "#F59E0B",
      fontSize: 12,
      flex: 1,
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
    loadingContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
      gap: 12,
    },
    loadingText: {
      color: colors.textSecondary,
      fontSize: 13,
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
