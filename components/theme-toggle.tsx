import { Pressable, StyleSheet, Text } from "react-native";
import { useAppTheme } from "./app-theme-context";

export function ThemeToggle() {
  const { theme, colors, toggleTheme } = useAppTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Pressable
      accessibilityHint={`Ubah ke mode ${nextTheme === "dark" ? "gelap" : "terang"}`}
      accessibilityLabel={`Aktifkan mode ${nextTheme === "dark" ? "gelap" : "terang"}`}
      accessibilityRole="button"
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          backgroundColor: colors.surfaceAlt,
          borderColor: colors.surfaceAltBorder,
        },
      ]}
    >
      <Text style={[styles.label, { color: colors.text }]}>
        {theme === "dark" ? "☀ Terang" : "☾ Gelap"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
});
