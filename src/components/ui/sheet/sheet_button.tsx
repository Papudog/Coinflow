import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SheetButton(): React.JSX.Element {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.touchableButton}>
        <Text style={{ ...styles.text, color: theme.dark }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.primary,
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
  },
  touchableButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
