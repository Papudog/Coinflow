import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps): React.JSX.Element {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
  },

  cardWrapper: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: theme.medium,
    overflow: "hidden",
  },
});
