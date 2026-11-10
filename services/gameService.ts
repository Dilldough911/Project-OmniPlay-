export interface IGameApiResponse {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface IGame {
  id: string;
  title: string;
  developer: string;
  genre: string;
  rating: number;
  image: string;
  storeUrl: string;
  description: string;
  platform?: string;
  releaseDate?: string;
  publisher?: string;
  size?: string;
  downloads?: string;
}

const EXTERNAL_API_URL = "https://www.freetogame.com/api/games";

export function fetchGamesWithPromise(): Promise<IGame[]> {
  return new Promise<IGame[]>((resolve, reject) => {
    fetch(EXTERNAL_API_URL)
      .then((response: Response) => {
        if (!response.ok) {
          reject(
            new Error(
              `HTTP Error! Gagal menghubungi server dengan status: ${response.status}`,
            ),
          );
          return null;
        }
        return response.json();
      })
      .then((rawGames: IGameApiResponse[] | null) => {
        if (!rawGames) return;

        const mappedGames: IGame[] = rawGames.slice(0, 30).map((item) => {
          const calculatedRating = Number(
            (4.0 + (item.id % 10) * 0.1).toFixed(1),
          );

          const gameObject: IGame = {
            id: String(item.id),
            title: item.title,
            developer: item.developer || item.publisher || "Studio Game",
            genre: item.genre || "Action",
            rating: calculatedRating,
            image: item.thumbnail,
            storeUrl: item.game_url,
            description: item.short_description,
            platform: item.platform,
            releaseDate: item.release_date,
            publisher: item.publisher,
          };

          return gameObject;
        });

        resolve(mappedGames);
      })
      .catch((error: Error) => {
        reject(
          new Error(
            error.message ||
              "Terjadi kesalahan saat memproses data dari External API.",
          ),
        );
      });
  });
}

export async function fetchGamesCustomAsync(): Promise<IGame[]> {
  try {
    const games = await fetchGamesWithPromise();

    return Promise.resolve(games);
  } catch (error) {
    return Promise.reject(error);
  }
}
