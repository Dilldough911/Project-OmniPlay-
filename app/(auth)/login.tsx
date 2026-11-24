import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth-context";
import { isSupabaseConfigured } from "../../lib/supabase";

export default function LoginScreen() {
  // Available State sesuai Codelab 3 PSD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callsign, setCallsign] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Status & Feedback State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { signIn, signUp } = useAuth();

  // --------------------------------------------------------------------------
  // Codelab 3: Perekrutan Pahlawan (handleAuth Engine)
  // --------------------------------------------------------------------------
  const handleAuth = async () => {
    // 1. Validasi UX & Input Sanitasi (.trim())
    const cleanEmail = email.trim();
    const cleanPassword = password;
    const cleanCallsign = callsign.trim();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail || !cleanPassword) {
      setErrorMessage("Email dan kata sandi wajib diisi!");
      return;
    }

    if (isRegistering && !cleanCallsign) {
      setErrorMessage("Tactical Callsign wajib diisi untuk rekrutmen baru!");
      return;
    }

    if (cleanPassword.length < 6) {
      setErrorMessage("Kata sandi minimal harus terdiri dari 6 karakter!");
      return;
    }

    // UX Status Pemuatan: cegah multiple submission
    setIsLoading(true);

    try {
      if (isRegistering) {
        // Mode Registrasi: SignUp dengan metadata callsign
        const { error } = await signUp(cleanEmail, cleanPassword, cleanCallsign);

        if (error) {
          setErrorMessage(error.message);
        } else {
          setSuccessMessage(
            "Perekrutan berhasil! Jika email confirmation aktif, cek inbox Anda atau langsung masuk jika dinonaktifkan.",
          );
          // Alihkan form ke mode masuk
          setIsRegistering(false);
        }
      } else {
        // Mode Masuk: SignIn dengan email dan password
        const { error } = await signIn(cleanEmail, cleanPassword);

        if (error) {
          // Tangani error dari Supabase tanpa membuat aplikasi crash
          if (
            error.message.includes("Invalid login credentials") ||
            error.message.includes("invalid_credentials")
          ) {
            setErrorMessage("Kredensial login tidak valid. Periksa email & kata sandi.");
          } else {
            setErrorMessage(error.message);
          }
        } else {
          // Berhasil diotentikasi. Route Protection Guard di _layout.tsx
          // akan secara otomatis mengarahkan ke Command Center / (tabs)
        }
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan saat otentikasi.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Badge */}
          <View style={styles.tagBadge}>
            <Ionicons name="shield-half-outline" size={14} color="#38BDF8" />
            <Text style={styles.tagText}>
              CODELAB 3: AUTHENTICATION
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.mainTitle}>
            {isRegistering ? "Hero Recruitment" : "Command HQ Sign In"}
          </Text>
          <Text style={styles.subTitle}>
            {isRegistering
              ? "Enlist as a new tactical hero and gain access to the Command Center."
              : "Enter your verified credentials to access the tactical mission board."}
          </Text>

          {/* Config Warning jika Supabase URL masih placeholder */}
          {!isSupabaseConfigured && (
            <View style={styles.configNotice}>
              <Ionicons name="information-circle-outline" size={18} color="#F59E0B" />
              <Text style={styles.configNoticeText}>
                Project menggunakan kredensial .env. Pastikan memasukkan URL & Anon Key dari Dashboard Supabase Anda.
              </Text>
            </View>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={18} color="#EF4444" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Success Banner */}
          {successMessage && (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#10B981" />
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          )}

          {/* Input Form Fields */}
          <View style={styles.formGroup}>
            {/* Field Callsign hanya muncul saat mode pendaftaran */}
            {isRegistering && (
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>TACTICAL CALLSIGN</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. ShadowRunner"
                  placeholderTextColor="#64748B"
                  value={callsign}
                  onChangeText={setCallsign}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            )}

            {/* Field Email dengan keyboardType dan sanitasi */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>OPERATIVE EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="operative@hero.hq"
                placeholderTextColor="#64748B"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            {/* Field Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>ACCESS PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Min. 6 characters..."
                placeholderTextColor="#64748B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Tombol Aksi Utama */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              isLoading && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#05070A" />
                <Text style={styles.actionButtonText}>Memproses Otentikasi...</Text>
              </View>
            ) : (
              <Text style={styles.actionButtonText}>
                {isRegistering ? "Enlist as Hero" : "Authenticate & Enter HQ"}
              </Text>
            )}
          </Pressable>

          {/* Toggle Mode Masuk / Daftar */}
          <Pressable
            style={styles.toggleButton}
            onPress={() => {
              setIsRegistering(!isRegistering);
              setErrorMessage(null);
              setSuccessMessage(null);
            }}
            disabled={isLoading}
          >
            <Text style={styles.toggleText}>
              {isRegistering ? (
                <>
                  Sudah memiliki kredensial?{" "}
                  <Text style={styles.toggleHighlight}>Masuk di sini</Text>
                </>
              ) : (
                <>
                  Butuh kredensial lapangan?{" "}
                  <Text style={styles.toggleHighlight}>Daftar di sini</Text>
                </>
              )}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#05070A",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "center",
  },
  tagBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    gap: 6,
    marginBottom: 16,
  },
  tagText: {
    color: "#38BDF8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  mainTitle: {
    color: "#F8FAFC",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  subTitle: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  configNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  configNoticeText: {
    color: "#F59E0B",
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.35)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.35)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  successText: {
    color: "#10B981",
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  formGroup: {
    gap: 16,
    marginBottom: 24,
  },
  fieldContainer: {
    gap: 6,
  },
  fieldLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#F8FAFC",
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  actionButtonText: {
    color: "#05070A",
    fontSize: 15,
    fontWeight: "700",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  toggleButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
  },
  toggleText: {
    color: "#94A3B8",
    fontSize: 13,
  },
  toggleHighlight: {
    color: "#38BDF8",
    fontWeight: "700",
  },
});
