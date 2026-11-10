import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme, type AppColors } from "../../components/app-theme-context";
import { ThemeToggle } from "../../components/theme-toggle";
import {
  fetchUsersCustomAsync,
  type IUser,
} from "../../services/userService";

// Palet warna acak deterministik untuk avatar inisial
const avatarColors = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
  "#06B6D4",
  "#6366F1",
];

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getAvatarColor(id: number): string {
  return avatarColors[id % avatarColors.length];
}

export default function UsersScreen() {
  const { theme, colors } = useAppTheme();
  const styles = createStyles(colors);

  // State Pengambilan Data
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State Pencarian
  const [searchText, setSearchText] = useState("");

  // --------------------------------------------------------------------------
  // [SYARAT 2 & 3]: Pengambilan Data Menggunakan Custom Async Function & .then()
  // --------------------------------------------------------------------------
  const loadUsersData = (resetLoading = false) => {
    if (resetLoading) {
      setLoading(true);
      setErrorMessage(null);
    }

    // Memanggil Custom Async Function yang mengembalikan Promise
    fetchUsersCustomAsync()
      .then((data: IUser[]) => {
        // [SYARAT 1]: Data tersimpan dalam State bertipe Interface IUser[]
        setUsersList(data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error: Error) => {
        console.warn("Gagal memuat pengguna dari API:", error.message);
        setErrorMessage(
          "Gagal memuat data pengguna dari JSONPlaceholder. Periksa koneksi internet Anda.",
        );
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsersData(false);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadUsersData(true);
  };

  // Filter Pengguna berdasarkan Nama atau Email
  const filteredUsers = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    if (!search) return usersList;

    return usersList.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search),
    );
  }, [usersList, searchText]);

  // Aksi interaktif untuk mengirim email
  const handleEmailPress = async (email: string) => {
    const mailtoUrl = `mailto:${email}`;
    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (supported) {
        await Linking.openURL(mailtoUrl);
      } else {
        Alert.alert("Alamat Email", email);
      }
    } catch {
      Alert.alert("Alamat Email", email);
    }
  };

  // Aksi interaktif untuk menelepon
  const handlePhonePress = async (phone?: string) => {
    if (!phone) return;
    const telUrl = `tel:${phone}`;
    try {
      const supported = await Linking.canOpenURL(telUrl);
      if (supported) {
        await Linking.openURL(telUrl);
      } else {
        Alert.alert("Nomor Telepon", phone);
      }
    } catch {
      Alert.alert("Nomor Telepon", phone);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            colors={[colors.accent]}
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor={colors.accent}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.title}>Data Pengguna</Text>
            <Text style={styles.subtitle}>
              External API: jsonplaceholder.typicode.com
            </Text>
          </View>
          <ThemeToggle />
        </View>

        {/* Status Indikator Sumber Data */}
        <View style={styles.apiStatusBadge}>
          <View style={[styles.statusDot, { backgroundColor: "#10B981" }]} />
          <Text style={styles.apiStatusText}>
            External API: JSONPlaceholder (Live Online)
          </Text>
        </View>

        {/* Kotak Peringatan Error jika Gagal */}
        {errorMessage && (
          <View style={styles.warningBox}>
            <Ionicons name="warning-outline" size={18} color="#F59E0B" />
            <Text style={styles.warningText}>{errorMessage}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => loadUsersData(true)}
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>Coba Lagi</Text>
            </Pressable>
          </View>
        )}

        {/* Kolom Pencarian */}
        <View style={styles.searchContainer}>
          <Ionicons
            color={colors.textMuted}
            name="search-outline"
            size={20}
            style={styles.searchIcon}
          />
          <TextInput
            accessibilityLabel="Cari pengguna berdasarkan nama atau email"
            onChangeText={setSearchText}
            placeholder="Cari nama atau email pengguna..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            value={searchText}
          />
          {searchText.length > 0 && (
            <Pressable
              accessibilityLabel="Hapus pencarian"
              onPress={() => setSearchText("")}
              style={styles.clearSearchButton}
            >
              <Ionicons
                color={colors.textMuted}
                name="close-circle"
                size={18}
              />
            </Pressable>
          )}
        </View>

        {/* Ringkasan Hasil */}
        <View style={styles.resultsInfoRow}>
          <Text style={styles.sectionTitle}>Daftar Pengguna Aktif</Text>
          <Text style={styles.resultsCount}>
            {filteredUsers.length} pengguna
          </Text>
        </View>

        {/* Konten Utama */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.accent} size="large" />
            <Text style={styles.loadingText}>
              Mengambil data nama & email dari External API...
            </Text>
          </View>
        ) : filteredUsers.length > 0 ? (
          /* Daftar Pengguna dalam Komponen React Card */
          <View style={styles.usersListContainer}>
            {filteredUsers.map((user) => (
              <View key={user.id} style={styles.userCard}>
                {/* Header Kartu: Avatar & Nama */}
                <View style={styles.userCardHeader}>
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: getAvatarColor(user.id) },
                    ]}
                  >
                    <Text style={styles.avatarText}>
                      {getInitials(user.name)}
                    </Text>
                  </View>

                  <View style={styles.userMainInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userUsername}>@{user.username}</Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                {/* Bagian Email Pengguna (Fokus Utama Tugas) */}
                <Pressable
                  accessibilityHint="Tekan untuk mengirim email ke pengguna ini"
                  accessibilityLabel={`Kirim email ke ${user.email}`}
                  accessibilityRole="button"
                  onPress={() => handleEmailPress(user.email)}
                  style={styles.infoRowClickable}
                >
                  <View style={styles.iconBadge}>
                    <Ionicons
                      color={colors.accent}
                      name="mail-outline"
                      size={16}
                    />
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoFieldLabel}>EMAIL PENGGUNA</Text>
                    <Text style={styles.infoFieldValueEmail}>{user.email}</Text>
                  </View>
                  <Ionicons
                    color={colors.accent}
                    name="open-outline"
                    size={14}
                  />
                </Pressable>

                {/* Bagian Telepon (Opsional Tambahan) */}
                {user.phone && (
                  <Pressable
                    accessibilityHint="Tekan untuk menghubungi nomor ini"
                    accessibilityLabel={`Hubungi ${user.phone}`}
                    accessibilityRole="button"
                    onPress={() => handlePhonePress(user.phone)}
                    style={styles.infoRowClickable}
                  >
                    <View style={styles.iconBadge}>
                      <Ionicons
                        color={colors.textSecondary}
                        name="call-outline"
                        size={15}
                      />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoFieldLabel}>TELEPON</Text>
                      <Text style={styles.infoFieldValue}>{user.phone}</Text>
                    </View>
                  </Pressable>
                )}

                {/* Metadata Tambahan: Perusahaan & Kota */}
                <View style={styles.metaRow}>
                  {user.companyName && (
                    <View style={styles.metaBadge}>
                      <Ionicons
                        color={colors.textSecondary}
                        name="business-outline"
                        size={12}
                      />
                      <Text
                        numberOfLines={1}
                        style={styles.metaBadgeText}
                      >
                        {user.companyName}
                      </Text>
                    </View>
                  )}
                  {user.city && (
                    <View style={styles.metaBadge}>
                      <Ionicons
                        color={colors.textSecondary}
                        name="location-outline"
                        size={12}
                      />
                      <Text style={styles.metaBadgeText}>{user.city}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              color={colors.textMuted}
              name="person-remove-outline"
              size={52}
            />
            <Text style={styles.emptyTitle}>Pengguna Tidak Ditemukan</Text>
            <Text style={styles.emptySubtitle}>
              Tidak ada pengguna dengan nama atau email &quot;{searchText}&quot;.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSearchText("")}
              style={styles.clearFilterButton}
            >
              <Text style={styles.clearFilterText}>Hapus Pencarian</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 28,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      marginBottom: 10,
    },
    headerTextGroup: {
      flex: 1,
    },
    title: {
      color: colors.text,
      fontSize: 26,
      fontWeight: "800",
      letterSpacing: 0.2,
    },
    subtitle: {
      color: colors.textSecondary,
      marginTop: 2,
      fontSize: 13,
    },
    apiStatusBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      borderColor: colors.surfaceBorder,
      borderWidth: 1,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 16,
      marginBottom: 14,
      gap: 6,
    },
    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    apiStatusText: {
      color: colors.textSecondary,
      fontSize: 11,
      fontWeight: "600",
    },
    warningBox: {
      backgroundColor: "rgba(245, 158, 11, 0.12)",
      borderColor: "rgba(245, 158, 11, 0.3)",
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
      gap: 8,
    },
    warningText: {
      color: "#F59E0B",
      fontSize: 13,
      lineHeight: 18,
    },
    retryButton: {
      alignSelf: "flex-start",
      backgroundColor: "#F59E0B",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      marginTop: 4,
    },
    retryButtonText: {
      color: "#000000",
      fontWeight: "700",
      fontSize: 12,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.surfaceBorder,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 44,
      color: colors.text,
      fontSize: 14,
    },
    clearSearchButton: {
      padding: 4,
    },
    resultsInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      marginTop: 2,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
    },
    resultsCount: {
      color: colors.textMuted,
      fontSize: 12,
    },
    loadingContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
      gap: 12,
    },
    loadingText: {
      color: colors.textSecondary,
      fontSize: 13,
      textAlign: "center",
    },
    usersListContainer: {
      gap: 12,
    },
    userCard: {
      backgroundColor: colors.surface,
      borderColor: colors.surfaceBorder,
      borderWidth: 1,
      borderRadius: 14,
      padding: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    userCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    avatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "800",
    },
    userMainInfo: {
      flex: 1,
    },
    userName: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 2,
    },
    userUsername: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: "500",
    },
    cardDivider: {
      height: 1,
      backgroundColor: colors.divider,
      marginVertical: 12,
    },
    infoRowClickable: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 6,
    },
    iconBadge: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: colors.surfaceAlt,
      alignItems: "center",
      justifyContent: "center",
    },
    infoTextContainer: {
      flex: 1,
    },
    infoFieldLabel: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 0.5,
      marginBottom: 1,
    },
    infoFieldValueEmail: {
      color: colors.accent,
      fontSize: 13,
      fontWeight: "600",
    },
    infoFieldValue: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "500",
    },
    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.divider,
    },
    metaBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      borderColor: colors.surfaceBorder,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      gap: 4,
      maxWidth: "50%",
    },
    metaBadgeText: {
      color: colors.textSecondary,
      fontSize: 11,
      fontWeight: "500",
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 50,
      paddingHorizontal: 20,
      gap: 8,
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
      marginTop: 8,
    },
    emptySubtitle: {
      color: colors.textMuted,
      fontSize: 13,
      textAlign: "center",
      lineHeight: 18,
    },
    clearFilterButton: {
      marginTop: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.accent,
      borderRadius: 8,
    },
    clearFilterText: {
      color: colors.selectedText,
      fontSize: 12,
      fontWeight: "600",
    },
  });
