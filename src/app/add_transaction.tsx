import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { theme } from "../constants/theme";
import { router } from "expo-router";

export default function AddTransaction(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <View>
          <Text style={{ ...styles.text, fontSize: 24, marginVertical: 20 }}>
            Add a transaction
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/dashboard")}
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.dark,
  },
  containerWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  text: {
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
  text_tertiary: {
    color: theme.tertiary,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
