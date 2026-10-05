import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type GenreType = "Semua" | "RPG" | "Action" | "Sandbox" | "Adventure";
type TabType = "Jelajahi" | "Favorit";

interface GameItem {
  id: string;
  title: string;
  genre: Exclude<GenreType, "Semua">;
  developer: string;
  rating: number;
  year: number;
  description: string;
  artwork: string;
  artworkColor: string;
  accentColor: string;
}

const GAMES_DATA: GameItem[] = [
  {
    id: "1",
    title: "Genshin Impact",
    genre: "RPG",
    developer: "HoYoverse",
    rating: 4.8,
    year: 2020,
    description:
      "Jelajahi dunia Teyvat yang luas, temukan rahasia setiap wilayah, dan bangun tim petualang dengan kekuatan elemen.",
    artwork: "🏔️",
    artworkColor: "#283c54",
    accentColor: "#8fd8bc",
  },
  {
    id: "2",
    title: "Honkai: Star Rail",
    genre: "RPG",
    developer: "HoYoverse",
    rating: 4.7,
    year: 2023,
    description:
      "Naik Astral Express dan jelajahi galaksi dalam petualangan RPG turn-based penuh karakter dan cerita.",
    artwork: "🚀",
    artworkColor: "#373251",
    accentColor: "#c5a9ff",
  },
  {
    id: "3",
    title: "Zenless Zone Zero",
    genre: "Action",
    developer: "HoYoverse",
    rating: 4.6,
    year: 2024,
    description:
      "Masuki New Eridu, kota terakhir yang bertahan, dan hadapi Hollow bersama para Agent pilihanmu.",
    artwork: "🌃",
    artworkColor: "#493450",
    accentColor: "#ff9b73",
  },
  {
    id: "4",
    title: "Roblox",
    genre: "Sandbox",
    developer: "Roblox Corporation",
    rating: 4.5,
    year: 2006,
    description:
      "Temukan jutaan pengalaman buatan komunitas, bermain bersama teman, atau ciptakan dunia versimu sendiri.",
    artwork: "🧱",
    artworkColor: "#3f3036",
    accentColor: "#ff7373",
  },
  {
    id: "5",
    title: "Punishing: Gray Raven",
    genre: "Action",
    developer: "Kuro Games",
    rating: 4.7,
    year: 2019,
    description:
      "Pimpin pasukan Construct dalam pertarungan action cepat untuk merebut kembali Bumi dari ancaman mesin.",
    artwork: "⚔️",
    artworkColor: "#253b4b",
    accentColor: "#78cfff",
  },
  {
    id: "6",
    title: "Wuthering Waves",
    genre: "Adventure",
    developer: "Kuro Games",
    rating: 4.6,
    year: 2024,
    description:
      "Bangkit sebagai Rover dan jelajahi dunia pasca-apokaliptik dengan pertarungan dinamis serta kebebasan bergerak.",
    artwork: "🌊",
    artworkColor: "#263f4b",
    accentColor: "#79d9d1",
  },
  {
    id: "7",
    title: "Minecraft",
    genre: "Sandbox",
    developer: "Mojang Studios",
    rating: 4.9,
    year: 2011,
    description:
      "Bangun apa pun yang bisa kamu bayangkan, bertahan hidup, dan berpetualang di dunia blok yang tak terbatas.",
    artwork: "🌲",
    artworkColor: "#344539",
    accentColor: "#9cdb83",
  },
  {
    id: "8",
    title: "Stardew Valley",
    genre: "Adventure",
    developer: "ConcernedApe",
    rating: 4.9,
    year: 2016,
    description:
      "Mulai hidup baru di desa yang tenang: rawat kebun, kenali warga, dan temukan cerita di balik Stardew Valley.",
    artwork: "🌻",
    artworkColor: "#514333",
    accentColor: "#ffd37c",
  },
];

const GENRES: GenreType[] = [
  "Semua",
  "RPG",
  "Action",
  "Sandbox",
  "Adventure",
];

export default function Index() {
  const [selectedGenre, setSelectedGenre] = useState<GenreType>("Semua");
  const [activeTab, setActiveTab] = useState<TabType>("Jelajahi");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>(["1", "7"]);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

  const filteredGames = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return GAMES_DATA.filter((game) => {
      const matchesGenre =
        selectedGenre === "Semua" || game.genre === selectedGenre;
      const matchesTab =
        activeTab === "Jelajahi" || favoriteIds.includes(game.id);
      const matchesSearch =
        normalizedQuery.length === 0 ||
        `${game.title} ${game.developer} ${game.genre}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesGenre && matchesTab && matchesSearch;
    });
  }, [activeTab, favoriteIds, searchQuery, selectedGenre]);

  const toggleFavorite = (gameId: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(gameId)
        ? currentIds.filter((id) => id !== gameId)
        : [...currentIds, gameId],
    );
  };

  const renderGameCard = (game: GameItem) => {
    const isFavorite = favoriteIds.includes(game.id);

    return (
      <Pressable
        key={game.id}
        accessibilityRole="button"
        accessibilityLabel={`Lihat detail ${game.title}`}
        onPress={() => setSelectedGame(game)}
        style={({ pressed }) => [styles.gameCard, pressed && styles.pressed]}
      >
        <View style={[styles.artwork, { backgroundColor: game.artworkColor }]}>
          <View
            style={[
              styles.artworkOrb,
              { backgroundColor: `${game.accentColor}24` },
            ]}
          />
          <Text style={styles.artworkEmoji}>{game.artwork}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite
                ? `Hapus ${game.title} dari favorit`
                : `Tambahkan ${game.title} ke favorit`
            }
            hitSlop={8}
            onPress={(event) => {
              event.stopPropagation();
              toggleFavorite(game.id);
            }}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={19}
              color={isFavorite ? "#ff6b81" : "#f4f4f5"}
            />
          </Pressable>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={12} color="#ffd166" />
            <Text style={styles.ratingPillText}>{game.rating}</Text>
          </View>
        </View>

        <View style={styles.gameInfo}>
          <Text numberOfLines={1} style={styles.gameTitle}>
            {game.title}
          </Text>
          <Text numberOfLines={1} style={styles.developerText}>
            {game.developer}
          </Text>
          <View style={styles.gameMeta}>
            <Text style={styles.genreLabel}>{game.genre}</Text>
            <Text style={styles.yearText}>{game.year}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>TEMUKAN PETUALANGANMU</Text>
              <Text style={styles.brand}>
                Omni<Text style={styles.brandAccent}>Play</Text>
              </Text>
            </View>
            <View style={styles.profileMark}>
              <Ionicons name="game-controller" size={21} color="#b7a0ff" />
            </View>
          </View>

          <Text style={styles.greeting}>Semua game favoritmu,</Text>
          <Text style={styles.greetingSecond}>di satu tempat.</Text>
          <Text style={styles.intro}>
            Cari inspirasi untuk petualangan berikutnya.
          </Text>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#85869a" />
            <TextInput
              accessibilityLabel="Cari game"
              onChangeText={setSearchQuery}
              placeholder="Cari game atau developer..."
              placeholderTextColor="#77798b"
              returnKeyType="search"
              style={styles.searchInput}
              value={searchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Hapus pencarian"
                onPress={() => setSearchQuery("")}
                hitSlop={8}
              >
                <Ionicons name="close-circle" size={19} color="#85869a" />
              </Pressable>
            )}
          </View>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>Pilihan editor</Text>
              <Text style={styles.sectionSubtitle}>
                Favorit komunitas minggu ini
              </Text>
            </View>
            <View style={styles.editorBadge}>
              <Ionicons name="sparkles" size={13} color="#c0aaff" />
              <Text style={styles.editorBadgeText}>PILIHAN</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Lihat detail Genshin Impact"
            onPress={() => setSelectedGame(GAMES_DATA[0])}
            style={({ pressed }) => [
              styles.featuredCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.featuredGlow} />
            <View style={styles.featuredCopy}>
              <Text style={styles.featuredOverline}>DUNIA YANG MENANTI</Text>
              <Text style={styles.featuredTitle}>Genshin{"\n"}Impact</Text>
              <Text style={styles.featuredDescription}>
                Mulai perjalananmu di Teyvat
              </Text>
              <View style={styles.featuredAction}>
                <Text style={styles.featuredActionText}>Lihat game</Text>
                <Ionicons name="arrow-forward" size={15} color="#171323" />
              </View>
            </View>
            <Text style={styles.featuredArt}>🏔️</Text>
            <View style={styles.featuredRating}>
              <Ionicons name="star" size={13} color="#ffd166" />
              <Text style={styles.featuredRatingText}>4.8</Text>
            </View>
          </Pressable>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                {activeTab === "Favorit" ? "Favoritmu" : "Jelajahi game"}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {filteredGames.length} game untuk dimainkan
              </Text>
            </View>
            <Ionicons name="options-outline" size={20} color="#88899c" />
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={styles.genreList}
            showsHorizontalScrollIndicator={false}
          >
            {GENRES.map((genre) => {
              const isSelected = selectedGenre === genre;

              return (
                <Pressable
                  key={genre}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedGenre(genre)}
                  style={[
                    styles.genreChip,
                    isSelected && styles.genreChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.genreChipText,
                      isSelected && styles.genreChipTextActive,
                    ]}
                  >
                    {genre}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {filteredGames.length > 0 ? (
            <View style={styles.gameGrid}>
              {filteredGames.map(renderGameCard)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name={activeTab === "Favorit" ? "heart-outline" : "search"}
                  size={25}
                  color="#b7a0ff"
                />
              </View>
              <Text style={styles.emptyTitle}>Belum ada game di sini</Text>
              <Text style={styles.emptyDescription}>
                {activeTab === "Favorit"
                  ? "Simpan game dengan menekan ikon hati."
                  : "Coba kata kunci atau genre yang berbeda."}
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.tabBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: activeTab === "Jelajahi" }}
            onPress={() => setActiveTab("Jelajahi")}
            style={styles.tabItem}
          >
            <Ionicons
              name={activeTab === "Jelajahi" ? "compass" : "compass-outline"}
              size={21}
              color={activeTab === "Jelajahi" ? "#b7a0ff" : "#77798b"}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === "Jelajahi" && styles.tabLabelActive,
              ]}
            >
              Jelajahi
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: activeTab === "Favorit" }}
            onPress={() => setActiveTab("Favorit")}
            style={styles.tabItem}
          >
            <View>
              <Ionicons
                name={activeTab === "Favorit" ? "heart" : "heart-outline"}
                size={21}
                color={activeTab === "Favorit" ? "#b7a0ff" : "#77798b"}
              />
              {favoriteIds.length > 0 && (
                <View style={styles.favoriteCount}>
                  <Text style={styles.favoriteCountText}>
                    {favoriteIds.length}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.tabLabel,
                activeTab === "Favorit" && styles.tabLabelActive,
              ]}
            >
              Favorit
            </Text>
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="slide"
        onRequestClose={() => setSelectedGame(null)}
        transparent
        visible={selectedGame !== null}
      >
        {selectedGame && (
          <View style={styles.modalBackdrop}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tutup detail game"
              onPress={() => setSelectedGame(null)}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.detailSheet}>
              <View style={styles.sheetHandle} />
              <View
                style={[
                  styles.detailArtwork,
                  { backgroundColor: selectedGame.artworkColor },
                ]}
              >
                <View
                  style={[
                    styles.detailArtworkOrb,
                    { backgroundColor: `${selectedGame.accentColor}24` },
                  ]}
                />
                <Text style={styles.detailEmoji}>{selectedGame.artwork}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    favoriteIds.includes(selectedGame.id)
                      ? "Hapus dari favorit"
                      : "Tambahkan ke favorit"
                  }
                  onPress={() => toggleFavorite(selectedGame.id)}
                  style={styles.detailFavoriteButton}
                >
                  <Ionicons
                    name={
                      favoriteIds.includes(selectedGame.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={21}
                    color={
                      favoriteIds.includes(selectedGame.id)
                        ? "#ff6b81"
                        : "#f4f4f5"
                    }
                  />
                </Pressable>
              </View>
              <View style={styles.detailTitleRow}>
                <View style={styles.detailTitleCopy}>
                  <Text style={styles.detailTitle}>{selectedGame.title}</Text>
                  <Text style={styles.detailDeveloper}>
                    {selectedGame.developer}
                  </Text>
                </View>
                <View style={styles.detailRating}>
                  <Ionicons name="star" size={15} color="#ffd166" />
                  <Text style={styles.detailRatingText}>
                    {selectedGame.rating}
                  </Text>
                </View>
              </View>
              <View style={styles.detailMeta}>
                <Text style={styles.detailMetaPill}>{selectedGame.genre}</Text>
                <Text style={styles.detailMetaPill}>{selectedGame.year}</Text>
              </View>
              <Text style={styles.detailDescription}>
                {selectedGame.description}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setSelectedGame(null)}
                style={styles.doneButton}
              >
                <Text style={styles.doneButtonText}>Selesai</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#101018",
  },
  container: {
    flex: 1,
    backgroundColor: "#101018",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 25,
  },
  eyebrow: {
    color: "#89899d",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 3,
  },
  brand: {
    color: "#f6f3ff",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  brandAccent: {
    color: "#b7a0ff",
  },
  profileMark: {
    height: 42,
    width: 42,
    borderRadius: 15,
    backgroundColor: "#211d30",
    borderWidth: 1,
    borderColor: "#342c48",
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    color: "#f3f2f8",
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  greetingSecond: {
    color: "#b7a0ff",
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  intro: {
    color: "#9292a4",
    fontSize: 13,
    marginTop: 7,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 49,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#1b1b25",
    borderWidth: 1,
    borderColor: "#292934",
    marginBottom: 26,
  },
  searchInput: {
    flex: 1,
    color: "#f4f2fa",
    fontSize: 13,
    paddingVertical: 0,
    paddingHorizontal: 11,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#f3f2f8",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    color: "#858596",
    fontSize: 11,
    marginTop: 4,
  },
  editorBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#262033",
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  editorBadgeText: {
    color: "#c0aaff",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  featuredCard: {
    height: 176,
    overflow: "hidden",
    borderRadius: 21,
    marginBottom: 27,
    backgroundColor: "#2e2940",
    borderWidth: 1,
    borderColor: "#453c59",
    padding: 18,
    justifyContent: "center",
  },
  featuredGlow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "#65518a",
    opacity: 0.28,
    right: -31,
    top: -20,
  },
  featuredCopy: {
    zIndex: 1,
    alignItems: "flex-start",
  },
  featuredOverline: {
    color: "#c7b9e7",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 25,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  featuredDescription: {
    color: "#d0c8df",
    fontSize: 10,
    marginTop: 6,
    marginBottom: 10,
  },
  featuredAction: {
    height: 29,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#c3adff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  featuredActionText: {
    color: "#171323",
    fontSize: 10,
    fontWeight: "800",
  },
  featuredArt: {
    position: "absolute",
    right: 10,
    top: 34,
    fontSize: 98,
    opacity: 0.88,
  },
  featuredRating: {
    position: "absolute",
    top: 13,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#191722bd",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 9,
  },
  featuredRatingText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  genreList: {
    gap: 8,
    paddingBottom: 15,
  },
  genreChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#1b1b25",
    borderWidth: 1,
    borderColor: "#2b2b37",
  },
  genreChipActive: {
    backgroundColor: "#b7a0ff",
    borderColor: "#b7a0ff",
  },
  genreChipText: {
    color: "#a2a1b1",
    fontSize: 11,
    fontWeight: "600",
  },
  genreChipTextActive: {
    color: "#1a1723",
    fontWeight: "800",
  },
  gameGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 13,
    paddingBottom: 16,
  },
  gameCard: {
    width: "48.2%",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#1b1b25",
    borderWidth: 1,
    borderColor: "#292934",
  },
  pressed: {
    opacity: 0.82,
  },
  artwork: {
    height: 124,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  artworkOrb: {
    position: "absolute",
    width: 126,
    height: 126,
    borderRadius: 63,
    right: -13,
    top: 20,
  },
  artworkEmoji: {
    fontSize: 61,
  },
  favoriteButton: {
    position: "absolute",
    top: 9,
    right: 9,
    height: 31,
    width: 31,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171721bd",
  },
  ratingPill: {
    position: "absolute",
    left: 9,
    bottom: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#171721d9",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingPillText: {
    color: "#f6f3ff",
    fontSize: 10,
    fontWeight: "700",
  },
  gameInfo: {
    paddingHorizontal: 11,
    paddingTop: 10,
    paddingBottom: 11,
  },
  gameTitle: {
    color: "#f2f0f7",
    fontSize: 12,
    fontWeight: "700",
  },
  developerText: {
    color: "#858596",
    fontSize: 10,
    marginTop: 3,
  },
  gameMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
  },
  genreLabel: {
    color: "#c2adff",
    fontSize: 9,
    fontWeight: "700",
  },
  yearText: {
    color: "#858596",
    fontSize: 9,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 39,
    marginBottom: 15,
    borderRadius: 17,
    backgroundColor: "#1b1b25",
    borderWidth: 1,
    borderColor: "#292934",
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#292338",
    marginBottom: 12,
  },
  emptyTitle: {
    color: "#f3f2f8",
    fontSize: 14,
    fontWeight: "700",
  },
  emptyDescription: {
    color: "#9292a4",
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 17,
  },
  tabBar: {
    height: 66,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#17171f",
    borderTopWidth: 1,
    borderTopColor: "#292934",
    paddingBottom: 4,
  },
  tabItem: {
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    color: "#77798b",
    fontSize: 9,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: "#c6b3ff",
  },
  favoriteCount: {
    position: "absolute",
    top: -4,
    right: -8,
    minWidth: 14,
    height: 14,
    paddingHorizontal: 3,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9b80ed",
  },
  favoriteCountText: {
    color: "#171323",
    fontSize: 8,
    fontWeight: "800",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000099",
  },
  detailSheet: {
    backgroundColor: "#191921",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 1,
    borderColor: "#34313f",
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 28,
  },
  sheetHandle: {
    width: 35,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    backgroundColor: "#575664",
    marginBottom: 15,
  },
  detailArtwork: {
    height: 158,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  detailArtworkOrb: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    right: -12,
    top: 30,
  },
  detailEmoji: {
    fontSize: 83,
  },
  detailFavoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    height: 38,
    width: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171721bd",
  },
  detailTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 17,
  },
  detailTitleCopy: {
    flex: 1,
    marginRight: 12,
  },
  detailTitle: {
    color: "#f3f2f8",
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  detailDeveloper: {
    color: "#9292a4",
    fontSize: 12,
    marginTop: 4,
  },
  detailRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#292338",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },
  detailRatingText: {
    color: "#f3f2f8",
    fontSize: 12,
    fontWeight: "700",
  },
  detailMeta: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  detailMetaPill: {
    color: "#c2adff",
    backgroundColor: "#292338",
    borderRadius: 9,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 10,
    fontWeight: "700",
  },
  detailDescription: {
    color: "#b0afbd",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 16,
  },
  doneButton: {
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    marginTop: 19,
    backgroundColor: "#b7a0ff",
  },
  doneButtonText: {
    color: "#1a1723",
    fontSize: 13,
    fontWeight: "800",
  },
});
