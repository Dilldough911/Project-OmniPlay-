import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const DEFAULT_TOKEN_KEY = "hiro_user_token";

/**
 * Storage adapter abstraction that uses expo-secure-store (Keychain on iOS, Keystore on Android)
 * with a fallback for web environments so development doesn't break.
 */
export async function secureSetItem(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("Web localStorage setItem failed:", e);
    }
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

export async function secureGetItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("Web localStorage getItem failed:", e);
    }
    return null;
  }
  return await SecureStore.getItemAsync(key);
}

export async function secureDeleteItem(key: string): Promise<void> {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn("Web localStorage deleteItem failed:", e);
    }
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

/**
 * Modul 4 Codelab 1: Brankas Terenkripsi (Penyimpanan Token Persisten)
 * 1. Simpan token rahasia ke brankas terenkripsi
 */
export async function saveAuthToken(
  token: string,
  key = DEFAULT_TOKEN_KEY,
): Promise<void> {
  await secureSetItem(key, token);
}

/**
 * 2. Ambil token dari brankas terenkripsi saat aplikasi dibuka
 */
export async function getAuthToken(
  key = DEFAULT_TOKEN_KEY,
): Promise<string | null> {
  return await secureGetItem(key);
}

/**
 * 3. Hapus token saat logout
 */
export async function deleteAuthToken(key = DEFAULT_TOKEN_KEY): Promise<void> {
  await secureDeleteItem(key);
}
