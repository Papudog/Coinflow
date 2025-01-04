import { theme } from "@/src/constants/theme";
import { useCategory } from "@/src/providers/category_provider";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SheetButton(): React.JSX.Element {
  const { color, name, isInputNotDisabled } = useCategory();

  return (
    <View
      style={
        isInputNotDisabled
          ? styles.buttonContainer
          : { ...styles.buttonContainer, backgroundColor: theme.high_medium }
      }
    >
      <TouchableOpacity
        disabled={!isInputNotDisabled}
        onPress={(): void => onSubmit(color, name)}
        style={styles.touchableButton}
      >
        <Text style={{ ...styles.text, color: theme.dark }}>
          {isInputNotDisabled ? "Save" : "Somo fields are required"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function onSubmit(color: string, name: string): void {
  console.log(color, name);
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.secondary,
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
