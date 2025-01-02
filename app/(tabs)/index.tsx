import LatestTransactions from "@/components/latest_transactions";
import PieGraph from "@/components/pie_chart";
import { theme } from "@/constants/theme";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Dashboard(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWrapper}>
        <View style={styles.nameApp}>
          <Image
            source={require("@/assets/images/bud_logo.png")}
            style={{ width: 40, height: 32 }}
          />
          <Text
            style={{ color: theme.light, fontSize: 32, fontWeight: "bold" }}
          >
            Coinflow
          </Text>
        </View>
        <PieGraph />
        <LatestTransactions />
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
  },
});
