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

type Genre = "Semua" | "RPG" | "Action" | "Sandbox" | "Adventure";

type Game = {
  title: string;
  developer: string;
  genre: Exclude<Genre, "Semua">;
  rating: number;
};

const games: Game[] = [
  {
    title: "Genshin Impact",
    developer: "HoYoverse",
    genre: "RPG",
    rating: 4.8,
  },
  {
    title: "Honkai: Star Rail",
    developer: "HoYoverse",
    genre: "RPG",
    rating: 4.7,
  },
  {
    title: "Zenless Zone Zero",
    developer: "HoYoverse",
    genre: "Action",
    rating: 4.6,
  },
  {
    title: "Roblox",
    developer: "Roblox Corporation",
    genre: "Sandbox",
    rating: 4.5,
  },
  {
    title: "Punishing: Gray Raven",
    developer: "Kuro Games",
    genre: "Action",
    rating: 4.7,
  },
  {
    title: "Wuthering Waves",
    developer: "Kuro Games",
    genre: "Adventure",
    rating: 4.6,
  },
  {
    title: "Minecraft",
    developer: "Mojang Studios",
    genre: "Sandbox",
    rating: 4.9,
  },
  {
    title: "Stardew Valley",
    developer: "ConcernedApe",
    genre: "Adventure",
    rating: 4.9,
  },
];

const genres: Genre[] = ["Semua", "RPG", "Action", "Sandbox", "Adventure"];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Semua");

  const search = searchText.trim().toLowerCase();
  const filteredGames = games.filter((game) => {
    const matchesGenre =
      selectedGenre === "Semua" || game.genre === selectedGenre;
    const matchesSearch =
      game.title.toLowerCase().includes(search) ||
      game.developer.toLowerCase().includes(search);

    return matchesGenre && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Daftar Game</Text>
        <Text style={styles.subtitle}>Cari game berdasarkan nama atau genre.</Text>

        <TextInput
          accessibilityLabel="Cari game"
          onChangeText={setSearchText}
          placeholder="Cari game atau developer"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchText}
        />

        <Text style={styles.sectionTitle}>Pilih genre</Text>
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
          Game ditemukan: {filteredGames.length}
        </Text>

        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <View key={game.title} style={styles.gameCard}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameInfo}>{game.developer}</Text>
              <View style={styles.gameDetails}>
                <Text style={styles.gameGenre}>{game.genre}</Text>
                <Text style={styles.gameInfo}>Rating {game.rating}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessage}>Game tidak ditemukan.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#101018",
  },
  container: {
    padding: 20,
  },
  title: {
    color: "#f3f2f8",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    marginTop: 6,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#1b1b25",
    borderColor: "#343440",
    borderRadius: 10,
    borderWidth: 1,
    color: "#fff",
    padding: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#f3f2f8",
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
    backgroundColor: "#1b1b25",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedGenreButton: {
    backgroundColor: "#b7a0ff",
  },
  genreText: {
    color: "#ddd",
  },
  selectedGenreText: {
    color: "#171323",
    fontWeight: "bold",
  },
  gameCard: {
    backgroundColor: "#1b1b25",
    borderColor: "#343440",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  gameTitle: {
    color: "#f3f2f8",
    fontSize: 16,
    fontWeight: "bold",
  },
  gameInfo: {
    color: "#aaa",
    marginTop: 5,
  },
  gameDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  gameGenre: {
    color: "#b7a0ff",
    fontWeight: "bold",
  },
  emptyMessage: {
    color: "#aaa",
    paddingVertical: 16,
  },
});
