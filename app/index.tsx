import { Image } from "expo-image";
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
        <Text style={styles.subtitle}>
          Cari game berdasarkan nama atau genre.
        </Text>

        <TextInput
          accessibilityLabel="Cari game"
          onChangeText={setSearchText}
          placeholder="Cari game atau developer"
          placeholderTextColor="#94A3B8"
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
                <Text style={styles.gameInfo}>{game.developer}</Text>
                <View style={styles.gameDetails}>
                  <Text style={styles.gameGenre}>{game.genre}</Text>
                  <Text numberOfLines={1} style={styles.gameRating}>
                    Rating {game.rating}
                  </Text>
                </View>
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
  gameCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderColor: "#1E3A5F",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  gameImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: "#111827",
  },
  gameContent: {
    flex: 1,
    minWidth: 0,
  },
  gameTitle: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "bold",
  },
  gameInfo: {
    color: "#CBD5E1",
    marginTop: 5,
  },
  gameDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  gameGenre: {
    color: "#38BDF8",
    fontWeight: "bold",
  },
  gameRating: {
    color: "#CBD5E1",
    flexShrink: 1,
    textAlign: "right",
  },
  emptyMessage: {
    color: "#CBD5E1",
    paddingVertical: 16,
  },
});
