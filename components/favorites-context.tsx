import { createContext, useContext, useState, type ReactNode } from "react";
import { fallbackGames } from "../data/games";
import type { IGame } from "../services/gameService";

type FavoritesContextValue = {
  favorites: string[];
  favoriteItems: IGame[];
  isFavorite: (title: string) => boolean;
  toggleFavorite: (game: IGame | string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteItems, setFavoriteItems] = useState<IGame[]>([]);

  const favorites = favoriteItems.map((item) => item.title);

  const isFavorite = (title: string) => {
    return favorites.includes(title);
  };

  const toggleFavorite = (gameOrTitle: IGame | string) => {
    const title =
      typeof gameOrTitle === "string" ? gameOrTitle : gameOrTitle.title;
    const exists = favorites.includes(title);

    if (exists) {
      setFavoriteItems((current) => current.filter((g) => g.title !== title));
    } else {
      let gameToAdd: IGame;
      if (typeof gameOrTitle === "object") {
        gameToAdd = gameOrTitle;
      } else {
        const found = fallbackGames.find((g) => g.title === gameOrTitle);
        gameToAdd = found || {
          id: String(Date.now()),
          title: gameOrTitle,
          developer: "Unknown",
          genre: "Game",
          rating: 4.5,
          image: "https://via.placeholder.com/512",
          storeUrl: "",
          description: "Game tersimpan di koleksi favorit.",
        };
      }
      setFavoriteItems((current) => [...current, gameToAdd]);
    }
  };

  const value: FavoritesContextValue = {
    favorites,
    favoriteItems,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider.");
  }

  return context;
}
