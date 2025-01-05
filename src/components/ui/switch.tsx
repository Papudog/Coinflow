import { theme } from "@/src/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Switch() {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchWrapper}>
        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          style={{
            ...styles.button,
            backgroundColor: isActive ? theme.medium : theme.primary,
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: isActive ? theme.primary : theme.dark,
            }}
          >
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          style={{
            ...styles.button,
            backgroundColor: !isActive ? theme.medium : theme.primary,
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: !isActive ? theme.primary : theme.dark,
            }}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: "100%",
    justifyContent: "center",
  },
  switchWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.medium,
    padding: 5,
    gap: 5,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});