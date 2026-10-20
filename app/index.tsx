import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../components/favorites-context";

type Genre =
  | "Semua"
  | "RPG"
  | "Action"
  | "Sandbox"
  | "Adventure"
  | "MOBA"
  | "Battle Royale"
  | "FPS"
  | "Balapan"
  | "Olahraga"
  | "Strategi"
  | "Puzzle"
  | "Simulasi"
  | "Horor";
//test clone
type Game = {
  title: string;
  developer: string;
  genre: Exclude<Genre, "Semua">;
  rating: number;
  image: string | number;
};

const games: Game[] = [
  {
    title: "Genshin Impact",
    developer: "HoYoverse",
    genre: "RPG",
    rating: 4.8,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/5c/e2/13/5ce21317-a08a-24ac-cc5f-2b25a4d71fa6/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg",
  },
  {
    title: "Honkai: Star Rail",
    developer: "HoYoverse",
    genre: "RPG",
    rating: 4.7,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fd/65/dc/fd65dc18-c4b6-7b64-8266-a423f3f113e0/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Zenless Zone Zero",
    developer: "HoYoverse",
    genre: "Action",
    rating: 4.6,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2d/4a/fb/2d4afb82-bdb9-cc80-b5b7-d1d7f515b2ae/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg",
  },
  {
    title: "Roblox",
    developer: "Roblox Corporation",
    genre: "Sandbox",
    rating: 4.5,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/35/3e/ff/353eff73-c6d3-9aff-4ba5-a0a6e3afa563/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Punishing: Gray Raven",
    developer: "Kuro Games",
    genre: "Action",
    rating: 4.7,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4f/07/44/4f074499-c049-e0ff-68b1-8029a874f20e/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg",
  },
  {
    title: "Wuthering Waves",
    developer: "Kuro Games",
    genre: "Adventure",
    rating: 4.6,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/07/06/3f/07063f40-1a99-bb82-4a2c-cafa1e145d1d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Minecraft",
    developer: "Mojang Studios",
    genre: "Sandbox",
    rating: 4.9,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3b/b7/24/3bb724be-0244-933a-af48-ad2195689877/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Stardew Valley",
    developer: "ConcernedApe",
    genre: "Adventure",
    rating: 4.9,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/0e/df/12/0edf1230-3f6e-fbb3-7f72-f2aa844d100a/AppIcons-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Mobile Legends: Bang Bang",
    developer: "MOONTON",
    genre: "MOBA",
    rating: 4.6,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/78/e1/77/78e177f1-e174-dfe5-bbd9-f4f2988d9b89/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "PUBG Mobile",
    developer: "Level Infinite",
    genre: "Battle Royale",
    rating: 4.5,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/98/24/6d9824dd-f75f-9bd6-221e-33324fedecb2/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Call of Duty: Mobile",
    developer: "Activision",
    genre: "FPS",
    rating: 4.6,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/bc/66/35/bc6635d9-68f4-6ab5-969f-92e034a50cfa/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Asphalt 9: Legends",
    developer: "Gameloft",
    genre: "Balapan",
    rating: 4.7,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/ee/8c/50ee8cac-b86d-1b2a-4b4a-ee49b85de53b/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg",
  },
  {
    title: "EA SPORTS FC Mobile",
    developer: "Electronic Arts",
    genre: "Olahraga",
    rating: 4.5,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/41/d1/84/41d18457-ec03-6812-f0a7-8a83686c6009/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Clash of Clans",
    developer: "Supercell",
    genre: "Strategi",
    rating: 4.8,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ca/3a/33/ca3a3391-1dfe-a6c9-3701-97cc86f45241/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Candy Crush Saga",
    developer: "King",
    genre: "Puzzle",
    rating: 4.7,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/72/83/04/728304ea-32e2-1979-e845-e5f25dd731f6/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  },
  {
    title: "The Sims FreePlay",
    developer: "Electronic Arts",
    genre: "Simulasi",
    rating: 4.4,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/74/80/02/74800225-d2dc-1911-188e-2f00364835a7/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg",
  },
  {
    title: "Identity V",
    developer: "NetEase Games",
    genre: "Horor",
    rating: 4.5,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9b/f0/3b/9bf03bac-78e6-694a-abd6-1e3248958d16/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  },
];

const genres: Genre[] = [
  "Semua",
  "RPG",
  "Action",
  "Sandbox",
  "Adventure",
  "MOBA",
  "Battle Royale",
  "FPS",
  "Balapan",
  "Olahraga",
  "Strategi",
  "Puzzle",
  "Simulasi",
  "Horor",
];

export default function HomeScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Semua");
  const [showFavorites, setShowFavorites] = useState(false);

  const search = searchText.trim().toLowerCase();
  const filteredGames = games.filter((game) => {
    const matchesGenre =
      selectedGenre === "Semua" || game.genre === selectedGenre;
    const matchesFavorites = !showFavorites || favorites.includes(game.title);
    const matchesSearch =
      game.title.toLowerCase().includes(search) ||
      game.developer.toLowerCase().includes(search);

    return matchesGenre && matchesFavorites && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {showFavorites ? "Game Favorit" : "Daftar Game"}
        </Text>
        <Text style={styles.subtitle}>
          Temukan game dan saring daftar sesuai yang ingin kamu lihat.
        </Text>

        <Text style={styles.filterLabel}>Pilih daftar</Text>
        <View style={styles.listMode}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: !showFavorites }}
            onPress={() => setShowFavorites(false)}
            style={[
              styles.listModeButton,
              !showFavorites && styles.selectedListModeButton,
            ]}
          >
            <Text
              style={[
                styles.listModeText,
                !showFavorites && styles.selectedListModeText,
              ]}
            >
              Semua game
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: showFavorites }}
            onPress={() => setShowFavorites(true)}
            style={[
              styles.listModeButton,
              showFavorites && styles.selectedListModeButton,
            ]}
          >
            <Text
              style={[
                styles.listModeText,
                showFavorites && styles.selectedListModeText,
              ]}
            >
              ♡ Favorit ({favorites.length})
            </Text>
          </Pressable>
        </View>

        <TextInput
          accessibilityLabel="Cari game"
          onChangeText={setSearchText}
          placeholder="Cari game atau developer"
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          value={searchText}
        />

        <Text style={styles.filterLabel}>Filter berdasarkan genre</Text>
        <View style={styles.genreList}>
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;

            return (
              <Pressable
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
        </View>

        <Text style={styles.sectionTitle}>
          {showFavorites ? "Game favorit" : "Daftar game"} ·{" "}
          {selectedGenre === "Semua" ? "Semua genre" : selectedGenre} ·{" "}
          {filteredGames.length} game
        </Text>

        {filteredGames.length > 0 ? (
          <View style={styles.gameGrid}>
            {filteredGames.map((game) => (
              <Pressable
                accessibilityHint="Buka informasi lengkap game"
                accessibilityLabel={`Lihat detail ${game.title}`}
                accessibilityRole="button"
                key={game.title}
                onPress={() =>
                  router.push({
                    pathname: "/game-detail",
                    params: {
                      title: game.title,
                      developer: game.developer,
                      genre: game.genre,
                      rating: String(game.rating),
                      image: String(game.image),
                    },
                  })
                }
                style={styles.gameCard}
              >
                <Image
                  accessibilityLabel={`Gambar ${game.title}`}
                  contentFit="contain"
                  source={game.image}
                  style={styles.gameImage}
                  transition={200}
                />
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
                    <Text
                      accessibilityLabel={`Rating ${game.rating} dari 5`}
                      style={styles.gameRating}
                    >
                      ★ {game.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyMessage}>
            {showFavorites && favorites.length === 0
              ? "Belum ada game favorit. Buka detail game lalu tekan Simpan ke favorit."
              : "Game tidak ditemukan."}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#05070A",
  },
  container: {
    padding: 20,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#CBD5E1",
    marginTop: 6,
    marginBottom: 20,
  },
  filterLabel: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 9,
  },
  listMode: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  listModeButton: {
    backgroundColor: "#0F172A",
    borderColor: "#1E3A5F",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectedListModeButton: {
    backgroundColor: "#172554",
    borderColor: "#3B82F6",
  },
  listModeText: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "600",
  },
  selectedListModeText: {
    color: "#FFFFFF",
  },
  searchInput: {
    backgroundColor: "#0F172A",
    borderColor: "#1E3A5F",
    borderRadius: 10,
    borderWidth: 1,
    color: "#F8FAFC",
    padding: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genreList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 22,
  },
  genreButton: {
    backgroundColor: "#0F172A",
    borderColor: "#1E3A5F",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedGenreButton: {
    backgroundColor: "#2563EB",
    borderColor: "#3B82F6",
  },
  genreText: {
    color: "#CBD5E1",
  },
  selectedGenreText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  gameGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gameCard: {
    width: "46%",
    backgroundColor: "#0F172A",
    borderColor: "#1E293B",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
  },
  gameImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#111827",
  },
  gameContent: {
    padding: 10,
  },
  gameTitle: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 18,
    minHeight: 36,
  },
  gameInfo: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 3,
  },
  gameDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  gameGenre: {
    color: "#7DD3FC",
    fontWeight: "bold",
    backgroundColor: "#082F49",
    borderRadius: 7,
    overflow: "hidden",
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexShrink: 1,
  },
  gameRating: {
    color: "#FDE68A",
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyMessage: {
    color: "#CBD5E1",
    paddingVertical: 16,
  },
});
