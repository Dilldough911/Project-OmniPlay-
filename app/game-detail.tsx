import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme, type AppColors } from "../components/app-theme-context";
import { useFavorites } from "../components/favorites-context";
import { ThemeToggle } from "../components/theme-toggle";

const genreDescriptions: Record<string, string> = {
  RPG: "Jelajahi dunia game, kembangkan karakter, dan ikuti perjalanan ceritanya.",
  Action: "Uji refleks dan kemampuanmu dalam pertarungan yang seru.",
  Sandbox: "Bangun, berkreasi, dan jelajahi dunia dengan caramu sendiri.",
  Adventure: "Temukan lokasi baru dan ikuti petualangan penuh tantangan.",
  MOBA: "Bekerja sama dengan tim untuk menguasai arena dan meraih kemenangan.",
  "Battle Royale": "Bertahan hingga akhir dan jadilah pemain terakhir yang menang.",
  FPS: "Masuki pertempuran tembak-menembak dengan sudut pandang orang pertama.",
  Balapan: "Paculah kendaraan dan tantang lawan untuk mencapai garis finis.",
  Olahraga: "Bawa keseruan pertandingan olahraga ke dalam genggamanmu.",
  Strategi: "Susun taktik dan kelola sumber daya untuk mengalahkan lawan.",
  Puzzle: "Asah logika dengan memecahkan tantangan dan teka-teki.",
  Simulasi: "Rasakan pengalaman mengelola dan menjalani kehidupan virtual.",
  Horor: "Hadapi suasana mencekam dan tantangan yang penuh kejutan.",
};

export default function GameDetailScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { theme, colors } = useAppTheme();
  const styles = createStyles(colors);
  const { title, developer, genre, rating: ratingParam, image } =
    useLocalSearchParams<{
      title: string;
      developer: string;
      genre: string;
      rating: string;
      image: string;
    }>();
  const gameTitle = title ?? "";
  const favorite = isFavorite(gameTitle);
  const rating = Number(ratingParam);
  const hasGameDetails =
    Boolean(title && developer && genre && image) &&
    Number.isFinite(rating) &&
    rating > 0 &&
    rating <= 5;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/")
            }
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>‹  Kembali ke daftar game</Text>
          </Pressable>
          <ThemeToggle />
        </View>

        {hasGameDetails ? (
          <>
            <View style={styles.heroCard}>
              <Image
                accessibilityLabel={`Gambar ${title}`}
                contentFit="contain"
                source={{ uri: image }}
                style={styles.gameImage}
                transition={200}
              />
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.developer}>{developer}</Text>
              <View style={styles.badges}>
                <Text style={styles.genreBadge}>{genre}</Text>
                <Text style={styles.ratingBadge}>★ {rating.toFixed(1)} / 5</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>Tentang game</Text>
              <Text style={styles.description}>
                {genreDescriptions[genre] ??
                  "Temukan keseruan dan pengalaman bermain game ini."}
              </Text>
              <View style={styles.divider} />
              <Text style={styles.metaLabel}>Developer</Text>
              <Text style={styles.metaValue}>{developer}</Text>
              <Text style={styles.metaLabel}>Genre</Text>
              <Text style={styles.metaValue}>{genre}</Text>
              <Text style={styles.metaLabel}>Rating</Text>
              <Text style={styles.metaValue}>★ {rating.toFixed(1)} dari 5</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: favorite }}
              onPress={() => toggleFavorite(gameTitle)}
              style={[
                styles.favoriteButton,
                favorite && styles.favoriteButtonActive,
              ]}
            >
              <Text style={styles.favoriteButtonText}>
                {favorite ? "♥  Tersimpan di favorit" : "♡  Simpan ke favorit"}
              </Text>
            </Pressable>
            <Text style={styles.favoriteHint}>
              {favorite
                ? "Tekan lagi untuk menghapus dari favorit."
                : "Simpan game yang ingin kamu mainkan nanti."}
            </Text>
          </>
        ) : (
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Game tidak ditemukan</Text>
            <Text style={styles.description}>
              Informasi game ini tidak tersedia. Kembali ke daftar untuk memilih
              game lainnya.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 18,
    paddingVertical: 8,
    flexShrink: 1,
  },
  backButtonText: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: "600",
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  heroCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  gameImage: {
    width: 176,
    height: 176,
    borderRadius: 22,
    backgroundColor: colors.imageBackground,
    marginBottom: 18,
  },
  title: {
    color: colors.text,
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  developer: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },
  badges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
  },
  genreBadge: {
    overflow: "hidden",
    backgroundColor: colors.genreBackground,
    borderRadius: 10,
    color: colors.genreText,
    fontSize: 13,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  ratingBadge: {
    overflow: "hidden",
    backgroundColor: colors.ratingBackground,
    borderRadius: 10,
    color: colors.ratingText,
    fontSize: 13,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 16,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 10,
  },
  metaValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 3,
  },
  favoriteButton: {
    alignItems: "center",
    backgroundColor: colors.favoriteSurface,
    borderColor: colors.favoriteBorder,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 18,
    padding: 15,
  },
  favoriteButtonActive: {
    backgroundColor: colors.favoriteActiveSurface,
    borderColor: colors.favoriteActiveBorder,
  },
  favoriteButtonText: {
    color: colors.selectedText,
    fontSize: 15,
    fontWeight: "bold",
  },
  favoriteHint: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 9,
    textAlign: "center",
  },
});
