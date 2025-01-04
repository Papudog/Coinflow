import { theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ExpenseCardProps {
  borderColor: string;
  children: React.ReactNode;
}

export default function ExpenseCard({
  borderColor,
  children,
}: ExpenseCardProps): React.JSX.Element {
  return (
    <View style={{ ...styles.cardContainer, borderColor }}>
      <View style={styles.cardWrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.medium,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: theme.high_medium,
    borderStyle: "solid",
    borderWidth: 3,
  },
  cardWrapper: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
