import Card from "@/components/pie_chart";
import { theme } from "@/constants/theme";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Dashboard(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWrapper}>
        <Text style={styles.nameApp}>Dashboard</Text>
        <Card />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
  },
  containerWrapper: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  nameApp: {
    color: theme.primary,
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
