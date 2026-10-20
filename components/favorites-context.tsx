import { createContext, useContext, useState, type ReactNode } from "react";

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (title: string) => boolean;
  toggleFavorite: (title: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const value: FavoritesContextValue = {
    favorites,
    isFavorite: (title) => favorites.includes(title),
    toggleFavorite: (title) => {
      setFavorites((currentFavorites) =>
        currentFavorites.includes(title)
          ? currentFavorites.filter((favorite) => favorite !== title)
          : [...currentFavorites, title],
      );
    },
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
