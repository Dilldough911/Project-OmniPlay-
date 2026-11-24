import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  deleteAuthToken,
  getAuthToken,
  saveAuthToken,
} from "../lib/secureStorage";

export default function SecureVaultDemo() {
  const [inputToken, setInputToken] = useState("");
  const [vaultValue, setVaultValue] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Platform info
  const platformLabel =
    Platform.OS === "web"
      ? "Web Browser (localStorage)"
      : `${Platform.OS.toUpperCase()} (expo-secure-store Keychain/KeyStore)`;

  // Load existing token on mount
  useEffect(() => {
    handleLoadToken(true);
  }, []);

  const handleSaveToken = async () => {
    const trimmed = inputToken.trim();
    if (!trimmed) {
      setStatusMessage("Mohon masukkan token lisensi hero.");
      return;
    }
    setIsLoading(true);
    try {
      await saveAuthToken(trimmed);
      setVaultValue(trimmed);
      setStatusMessage("Token saved to SecureStore!");
      setInputToken("");
    } catch (error) {
      setStatusMessage(
        `Gagal menyimpan token: ${error instanceof Error ? error.message : "Error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadToken = async (silent = false) => {
    setIsLoading(true);
    try {
      const stored = await getAuthToken();
      setVaultValue(stored);
      if (!silent) {
        if (stored) {
          setStatusMessage("Token loaded from SecureStore.");
        } else {
          setStatusMessage("No token found in storage.");
        }
      }
    } catch (error) {
      setStatusMessage(
        `Gagal memuat token: ${error instanceof Error ? error.message : "Error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleWipeToken = async () => {
    setIsLoading(true);
    try {
      await deleteAuthToken();
      setVaultValue(null);
      setStatusMessage("Token wiped from storage.");
    } catch (error) {
      setStatusMessage(
        `Gagal menghapus token: ${error instanceof Error ? error.message : "Error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={24} color="#38BDF8" />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Encrypted Vault Demo</Text>
          <View style={styles.platformBadge}>
            <Text style={styles.platformText}>Platform: {platformLabel}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.helperText}>
        Codelab 1: Hardware-backed Encrypted Credential Vault
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Hero License Token..."
        placeholderTextColor="#64748B"
        value={inputToken}
        onChangeText={setInputToken}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.saveButton]}
          onPress={handleSaveToken}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#0F172A" />
          ) : (
            <Text style={styles.saveButtonText}>Save Token</Text>
          )}
        </Pressable>

        <Pressable
          style={[styles.button, styles.loadButton]}
          onPress={() => handleLoadToken(false)}
          disabled={isLoading}
        >
          <Text style={styles.loadButtonText}>Load Token</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.wipeButton]}
          onPress={handleWipeToken}
          disabled={isLoading}
        >
          <Text style={styles.wipeButtonText}>Wipe Token</Text>
        </Pressable>
      </View>

      {statusMessage ? (
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>{statusMessage}</Text>
        </View>
      ) : null}

      <View style={styles.vaultValueBox}>
        <Text style={styles.vaultLabel}>VAULT VALUE:</Text>
        <Text style={styles.vaultValue}>
          {vaultValue ? vaultValue : "(Kosong / Tidak Ada Token)"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
    marginVertical: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "700",
  },
  platformBadge: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  platformText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "600",
  },
  helperText: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#1E293B",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#F8FAFC",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 12,
  },
  actions: {
    gap: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#38BDF8",
  },
  saveButtonText: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 13,
  },
  loadButton: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
  },
  loadButtonText: {
    color: "#F8FAFC",
    fontWeight: "600",
    fontSize: 13,
  },
  wipeButton: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.4)",
  },
  wipeButtonText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 13,
  },
  statusBox: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#1E293B",
    borderRadius: 8,
    alignItems: "center",
  },
  statusText: {
    color: "#38BDF8",
    fontSize: 12,
    fontStyle: "italic",
  },
  vaultValueBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#05070A",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  vaultLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  vaultValue: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});
