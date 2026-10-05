import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Dark Gaming Theme
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38bdf8",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  filterButtonActive: {
    backgroundColor: "#38bdf8",
    borderColor: "#38bdf8",
  },
  filterText: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#0f172a",
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
    elevation: 4,
    shadowColor: "#000",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f8fafc",
    flex: 1,
  },
  genreBadge: {
    backgroundColor: "#334155",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  genreText: {
    color: "#38bdf8",
    fontSize: 12,
    fontWeight: "bold",
  },
  developerText: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    color: "#fbbf24",
    fontSize: 14,
    fontWeight: "bold",
  },
});
