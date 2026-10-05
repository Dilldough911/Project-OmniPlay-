import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons
          name="information-circle"
          size={50}
          color="#2563eb"
          style={styles.iconCenter}
        />
        <Text style={styles.title}>Hello World</Text>

        <TextInput placeholder="Evo wthas up gess.." style={styles.input} />

        <Pressable
          style={styles.button}
          onPress={() => alert("Button Clicked!")}
        >
          <Ionicons name="hand-left" size={20} color="white" />
          <Text style={styles.buttonText}>Click Me</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 20,
    width: "100%",
    alignItems: "stretch",
  },
  iconCenter: {
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#1e3a8a",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
