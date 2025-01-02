import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { theme } from "@/constants/theme";

export default function Card(): React.JSX.Element {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 400,
  },
  cardWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: theme.medium,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
});
