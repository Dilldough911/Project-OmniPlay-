/**
 * ============================================================================
 * SERVICE PENGAMBILAN DATA EXTERNAL API
 * Tugas Pekan Demo:
 * 1. Mengambil data dari External API dan memasukkannya ke Object menggunakan Interface.
 * 2. Menggunakan Custom & Pre-built Async Function.
 * 3. Menggunakan fungsi .then(), .resolve(), dan .reject().
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// [SYARAT 1]: Interface untuk struktur data API & Object Game
// ----------------------------------------------------------------------------

/**
 * Interface untuk memetakan format data mentah langsung dari External API FreeToGame
 */
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

/**
 * Interface utama untuk Object Game yang digunakan di seluruh komponen UI aplikasi
 */
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

// URL External API publik gratis untuk katalog game
const EXTERNAL_API_URL = "https://www.freetogame.com/api/games";

// ----------------------------------------------------------------------------
// [SYARAT 2 & 3]: Fungsi Mengambil Data Menggunakan Promise, .then(),
// .resolve(), dan .reject(), serta Pre-built Async Function (fetch)
// ----------------------------------------------------------------------------

/**
 * Mengambil data dari External API menggunakan konstruktor Promise dengan
 * method resolve(), reject(), serta rantai .then()
 * 
 * @returns Promise<IGame[]>
 */
export function fetchGamesWithPromise(): Promise<IGame[]> {
  return new Promise<IGame[]>((resolve, reject) => {
    // PRE-BUILT ASYNC FUNCTION: fetch() bawaan runtime JavaScript / React Native
    fetch(EXTERNAL_API_URL)
      // Menggunakan .then() pertama: Validasi respons HTTP dan parse JSON
      .then((response: Response) => {
        if (!response.ok) {
          // [SYARAT 3]: Pemanggilan reject() saat terjadi kegagalan HTTP
          reject(
            new Error(
              `HTTP Error! Gagal menghubungi server dengan status: ${response.status}`,
            ),
          );
          return null;
        }
        return response.json();
      })
      // Menggunakan .then() kedua: Memasukkan data ke dalam Object menggunakan Interface
      .then((rawGames: IGameApiResponse[] | null) => {
        if (!rawGames) return;

        // [SYARAT 1]: Transformasi data API ke dalam Array of Object ber-Interface IGame
        const mappedGames: IGame[] = rawGames.slice(0, 30).map((item) => {
          // Menghitung rating deterministik (4.0 - 5.0) berdasarkan ID game
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

        // [SYARAT 3]: Pemanggilan resolve() saat data berhasil diproses
        resolve(mappedGames);
      })
      // Penanganan error jaringan / parsing
      .catch((error: Error) => {
        // [SYARAT 3]: Pemanggilan reject() saat terjadi exception / network error
        reject(
          new Error(
            error.message ||
              "Terjadi kesalahan saat memproses data dari External API.",
          ),
        );
      });
  });
}

// ----------------------------------------------------------------------------
// [SYARAT 2]: Custom Async Function
// ----------------------------------------------------------------------------

/**
 * Custom Async Function yang memanggil fungsi berbasis Promise
 * Memenuhi syarat: "Menggunakan Custom & Pre-built Async Function"
 * 
 * @returns Promise<IGame[]>
 */
export async function fetchGamesCustomAsync(): Promise<IGame[]> {
  try {
    // Memanggil fungsi fetch yang mengembalikan Promise
    const games = await fetchGamesWithPromise();

    // Contoh penggunaan Promise.resolve() eksplisit
    return Promise.resolve(games);
  } catch (error) {
    // Contoh penggunaan Promise.reject() eksplisit
    return Promise.reject(error);
  }
}
