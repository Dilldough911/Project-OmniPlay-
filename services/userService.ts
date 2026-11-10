/**
 * ============================================================================
 * SERVICE PENGAMBILAN DATA EXTERNAL API: USERS
 * Mengambil data pengguna dari JSONPlaceholder API:
 * https://jsonplaceholder.typicode.com/users
 *
 * 1. Interface untuk memetakan respon API & Object Pengguna.
 * 2. Menggunakan Custom & Pre-built Async Function (fetch).
 * 3. Menggunakan konstruktor Promise dengan .then(), .resolve(), dan .reject().
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// [SYARAT 1]: Interface untuk struktur data API & Object Pengguna
// ----------------------------------------------------------------------------

/**
 * Interface untuk memetakan data mentah langsung dari External API JSONPlaceholder
 */
export interface IUserApiResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

/**
 * Interface utama untuk Object Pengguna yang digunakan di komponen React
 */
export interface IUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
  companyName?: string;
  city?: string;
}

// URL External API publik JSONPlaceholder untuk pengguna
const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

// ----------------------------------------------------------------------------
// [SYARAT 2 & 3]: Fungsi Mengambil Data Menggunakan Promise, .then(),
// .resolve(), dan .reject(), serta Pre-built Async Function (fetch)
// ----------------------------------------------------------------------------

/**
 * Mengambil data pengguna dari External API menggunakan konstruktor Promise dengan
 * method resolve(), reject(), serta rantai .then()
 *
 * @returns Promise<IUser[]>
 */
export function fetchUsersWithPromise(): Promise<IUser[]> {
  return new Promise<IUser[]>((resolve, reject) => {
    // PRE-BUILT ASYNC FUNCTION: fetch() bawaan JavaScript / React Native
    fetch(USERS_API_URL)
      // Menggunakan .then() pertama: Validasi respons HTTP dan parse JSON
      .then((response: Response) => {
        if (!response.ok) {
          // [SYARAT 3]: Pemanggilan reject() saat terjadi kegagalan HTTP
          reject(
            new Error(
              `HTTP Error! Gagal mengambil data pengguna dengan status: ${response.status}`,
            ),
          );
          return null;
        }
        return response.json();
      })
      // Menggunakan .then() kedua: Memasukkan data ke dalam Object menggunakan Interface IUser
      .then((rawUsers: IUserApiResponse[] | null) => {
        if (!rawUsers) return;

        // [SYARAT 1]: Transformasi data API ke dalam Array of Object ber-Interface IUser
        const mappedUsers: IUser[] = rawUsers.map((item) => {
          const userObject: IUser = {
            id: item.id,
            name: item.name,
            email: item.email.toLowerCase(),
            username: item.username,
            phone: item.phone,
            website: item.website,
            companyName: item.company?.name || "Perusahaan Umum",
            city: item.address?.city || "Kota Tidak Diketahui",
          };

          return userObject;
        });

        // [SYARAT 3]: Pemanggilan resolve() saat data berhasil diproses
        resolve(mappedUsers);
      })
      // Penanganan error jaringan / parsing
      .catch((error: Error) => {
        // [SYARAT 3]: Pemanggilan reject() saat terjadi exception / network error
        reject(
          new Error(
            error.message ||
              "Terjadi kesalahan saat menghubungi API pengguna JSONPlaceholder.",
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
 * @returns Promise<IUser[]>
 */
export async function fetchUsersCustomAsync(): Promise<IUser[]> {
  try {
    // Memanggil fungsi fetch yang mengembalikan Promise
    const users = await fetchUsersWithPromise();

    // Contoh penggunaan Promise.resolve() eksplisit
    return Promise.resolve(users);
  } catch (error) {
    // Contoh penggunaan Promise.reject() eksplisit
    return Promise.reject(error);
  }
}
