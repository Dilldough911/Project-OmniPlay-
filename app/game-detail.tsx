import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme, type AppColors } from "../components/app-theme-context";
import { useFavorites } from "../components/favorites-context";
import { ThemeToggle } from "../components/theme-toggle";
import { fallbackGames } from "../data/games";
import type { IGame } from "../services/gameService";

export default function GameDetailScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { theme, colors } = useAppTheme();
  const styles = createStyles(colors);

  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    developer?: string;
    genre?: string;
    rating?: string;
    image?: string;
    storeUrl?: string;
    description?: string;
    platform?: string;
    releaseDate?: string;
    size?: string;
    downloads?: string;
  }>();

  const foundGame = fallbackGames.find(
    (g) =>
      (params.id && g.id === params.id) ||
      (params.title && g.title.toLowerCase() === params.title.toLowerCase()),
  );

  const title = foundGame?.title ?? params.title ?? "";
  const developer =
    foundGame?.developer ?? params.developer ?? "Unknown Developer";
  const genre = foundGame?.genre ?? params.genre ?? "Game";
  const rating = foundGame?.rating ?? Number(params.rating) ?? 4.5;
  const image = foundGame?.image ?? params.image ?? "";
  const storeUrl = foundGame?.storeUrl ?? params.storeUrl ?? "";
  const description =
    foundGame?.description ??
    params.description ??
    "Temukan keseruan dan pengalaman bermain game ini.";
  const platform = foundGame?.platform ?? params.platform ?? "PC / Mobile";
  const releaseDate =
    foundGame?.releaseDate ?? params.releaseDate ?? "Tersedia";
  const size = foundGame?.size ?? params.size ?? "";
  const downloads = foundGame?.downloads ?? params.downloads ?? "";

  const currentGameObject: IGame = {
    id:
      foundGame?.id ??
      params.id ??
      (title
        ? `game-${title.toLowerCase().replace(/\s+/g, "-")}`
        : "game-detail"),
    title,
    developer,
    genre,
    rating,
    image,
    storeUrl,
    description,
    platform,
    releaseDate,
    size,
    downloads,
  };

  const favorite = isFavorite(title);

  const handleOpenStore = async () => {
    if (!storeUrl) {
      Alert.alert(
        "Info",
        "Tautan unduhan/store untuk game ini belum tersedia.",
      );
      return;
    }
    try {
      await Linking.openURL(storeUrl);
    } catch {
      Alert.alert(
        "Gagal Membuka Tautan",
        "Tidak dapat membuka tautan store di perangkat ini.",
      );
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: `Rekomendasi Game: ${title}`,
        message: `🎮 Rekomendasi Game Keren: ${title}\n👨‍💻 Pengembang: ${developer}\n🏷️ Genre: ${genre}\n⭐ Rating: ${rating.toFixed(1)} / 5\n\n🔗 Kunjungi / Mainkan di sini:\n${storeUrl}`,
      });
    } catch {
      Alert.alert(
        "Gagal Membagikan",
        "Terjadi kendala saat mencoba membagikan game.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Bar */}
        <View style={styles.headerRow}>
          <Pressable
            accessibilityHint="Kembali ke halaman sebelumnya"
            accessibilityLabel="Kembali"
            accessibilityRole="button"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/(tabs)")
            }
            style={styles.backButton}
          >
            <Ionicons color={colors.accent} name="chevron-back" size={20} />
            <Text style={styles.backButtonText}>Kembali</Text>
          </Pressable>
          <ThemeToggle />
        </View>

        {title ? (
          <>
            {/* Hero Card */}
            <View style={styles.heroCard}>
              <Image
                accessibilityLabel={`Gambar ${title}`}
                contentFit="cover"
                source={image}
                style={styles.gameImage}
                transition={200}
              />
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.developer}>{developer}</Text>

              {/* Badges Info */}
              <View style={styles.badgesRow}>
                <View style={styles.genreBadge}>
                  <Text style={styles.genreBadgeText}>{genre}</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons color={colors.ratingText} name="star" size={13} />
                  <Text style={styles.ratingBadgeText}>
                    {rating.toFixed(1)} / 5
                  </Text>
                </View>
                <View style={styles.metaBadge}>
                  <Ionicons
                    color={colors.textSecondary}
                    name="hardware-chip-outline"
                    size={13}
                  />
                  <Text style={styles.metaBadgeText}>{platform}</Text>
                </View>
              </View>
            </View>

            {/* Panel Aksi Interaktif */}
            <View style={styles.actionPanel}>
              {/* Tombol Utama: Buka di Store / Mainkan */}
              <Pressable
                accessibilityLabel="Buka atau unduh game"
                accessibilityRole="button"
                onPress={handleOpenStore}
                style={styles.primaryActionButton}
              >
                <Ionicons
                  color={colors.selectedText}
                  name="open-outline"
                  size={20}
                  style={styles.buttonIcon}
                />
                <Text style={styles.primaryActionButtonText}>
                  Mainkan / Buka di Store
                </Text>
              </Pressable>

              {/* Dua Tombol Aksi: Bagikan & Simpan ke Favorit */}
              <View style={styles.secondaryActionsRow}>
                <Pressable
                  accessibilityLabel="Bagikan game ke teman"
                  accessibilityRole="button"
                  onPress={handleShare}
                  style={styles.secondaryActionButton}
                >
                  <Ionicons
                    color={colors.accent}
                    name="share-social-outline"
                    size={18}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.secondaryActionButtonText}>Bagikan</Text>
                </Pressable>

                <Pressable
                  accessibilityLabel={
                    favorite
                      ? "Hapus game dari daftar favorit"
                      : "Simpan game ke daftar favorit"
                  }
                  accessibilityRole="button"
                  accessibilityState={{ selected: favorite }}
                  onPress={() => toggleFavorite(currentGameObject)}
                  style={[
                    styles.secondaryActionButton,
                    favorite && styles.favoriteActiveButton,
                  ]}
                >
                  <Ionicons
                    color={favorite ? "#EF4444" : colors.accent}
                    name={favorite ? "heart" : "heart-outline"}
                    size={18}
                    style={styles.buttonIcon}
                  />
                  <Text
                    style={[
                      styles.secondaryActionButtonText,
                      favorite && styles.favoriteActiveText,
                    ]}
                  >
                    {favorite ? "Tersimpan" : "Favorit"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Tentang Game */}
            <View style={styles.infoCard}>
              <View style={styles.cardHeaderRow}>
                <Ionicons
                  color={colors.accent}
                  name="information-circle-outline"
                  size={20}
                />
                <Text style={styles.sectionTitle}>Tentang Game</Text>
              </View>
              <Text style={styles.description}>{description}</Text>
            </View>

            {/* Detail Spesifikasi Game */}
            <View style={styles.infoCard}>
              <View style={styles.cardHeaderRow}>
                <Ionicons
                  color={colors.accent}
                  name="layers-outline"
                  size={20}
                />
                <Text style={styles.sectionTitle}>Informasi Lengkap</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Pengembang (Developer)</Text>
                <Text style={styles.infoValue}>{developer}</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Kategori / Genre</Text>
                <Text style={styles.infoValue}>{genre}</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Platform</Text>
                <Text style={styles.infoValue}>{platform}</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tanggal Rilis</Text>
                <Text style={styles.infoValue}>{releaseDate}</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rating Komunitas</Text>
                <Text style={styles.infoValue}>
                  ★ {rating.toFixed(1)} dari 5.0
                </Text>
              </View>
              {size ? (
                <>
                  <View style={styles.divider} />
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ukuran Download</Text>
                    <Text style={styles.infoValue}>{size}</Text>
                  </View>
                </>
              ) : null}
              {downloads ? (
                <>
                  <View style={styles.divider} />
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total Unduhan</Text>
                    <Text style={styles.infoValue}>{downloads}</Text>
                  </View>
                </>
              ) : null}
            </View>
          </>
        ) : (
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Game Tidak Ditemukan</Text>
            <Text style={styles.description}>
              Informasi game ini tidak tersedia. Silakan kembali ke katalog
              untuk melihat game lain.
            </Text>
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
      paddingBottom: 36,
    },
    headerRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.surfaceAltBorder,
    },
    backButtonText: {
      color: colors.accent,
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 4,
    },
    heroCard: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.surfaceBorder,
      borderRadius: 22,
      borderWidth: 1,
      padding: 22,
    },
    gameImage: {
      width: 140,
      height: 140,
      borderRadius: 24,
      backgroundColor: colors.imageBackground,
      marginBottom: 16,
    },
    title: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "800",
      textAlign: "center",
    },
    developer: {
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: 4,
      fontWeight: "500",
    },
    badgesRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      marginTop: 16,
    },
    genreBadge: {
      backgroundColor: colors.genreBackground,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    genreBadgeText: {
      color: colors.genreText,
      fontSize: 12,
      fontWeight: "700",
    },
    ratingBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.ratingBackground,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      gap: 4,
    },
    ratingBadgeText: {
      color: colors.ratingText,
      fontSize: 12,
      fontWeight: "700",
    },
    metaBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      borderColor: colors.surfaceAltBorder,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      gap: 4,
    },
    metaBadgeText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "600",
    },
    actionPanel: {
      marginTop: 16,
      gap: 10,
    },
    primaryActionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accent,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 20,
    },
    primaryActionButtonText: {
      color: colors.selectedText,
      fontSize: 15,
      fontWeight: "700",
    },
    secondaryActionsRow: {
      flexDirection: "row",
      gap: 10,
    },
    secondaryActionButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderColor: colors.surfaceBorder,
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 12,
    },
    secondaryActionButtonText: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "700",
    },
    favoriteActiveButton: {
      borderColor: "#EF4444",
      backgroundColor: colors.surfaceAlt,
    },
    favoriteActiveText: {
      color: "#EF4444",
    },
    buttonIcon: {
      marginRight: 6,
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderColor: colors.surfaceBorder,
      borderRadius: 18,
      borderWidth: 1,
      marginTop: 16,
      padding: 18,
    },
    cardHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
    },
    description: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    infoLabel: {
      color: colors.textMuted,
      fontSize: 13,
    },
    infoValue: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "600",
      textAlign: "right",
    },
    divider: {
      height: 1,
      backgroundColor: colors.divider,
    },
  });
