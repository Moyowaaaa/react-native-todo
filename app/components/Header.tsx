import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Moyowa's Todos</Text>
      <FontAwesome6 name="sticky-note" size={24} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 20,
    textAlign: "center",
    backgroundColor: "#151515",
    display: "flex",
    alignItems: "center",
    // flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    gap: 32,
  },

  headerText: {
    color: "white",
  },
});

export default Header;
