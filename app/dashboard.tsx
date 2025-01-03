import LatestTransactions from "@/components/latest_transactions";
import PieGraph from "@/components/pie_chart";
import UserCategories from "@/components/user_categories";
import { theme } from "@/constants/theme";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";

export default function Dashboard(): React.JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerWrapper}>
        <Animated.View
          entering={FadeInLeft.delay(400).duration(400).springify()}
          style={styles.nameApp}
        >
          <Image
            source={require("@/assets/images/bud_logo.png")}
            style={{ width: 40, height: 32 }}
          />
          <Text
            style={{
              ...styles.text,
              fontFamily: "Outfit-Bold",
              fontSize: 32,
            }}
          >
            Coinflow
          </Text>
        </Animated.View>
        <UserCategories />
        <PieGraph />
        <LatestTransactions />
      </View>
    </ScrollView>
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
  buttonFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(131, 208, 255, 0.1)",
    borderColor: theme.secondary,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
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
