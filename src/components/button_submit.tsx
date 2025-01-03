import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonSubmitProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function ButtonSubmit({
  onPress,
  disabled,
  children,
}: ButtonSubmitProps): React.JSX.Element {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={disabled}
        style={styles.touchableButton}
        onPress={onPress}
      >
        {children}
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
  },
  touchableButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
