import LatestTransactions from "@/components/latest_transactions";
import PieGraph from "@/components/pie_chart";
import { theme } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";

export default function Dashboard(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity style={styles.buttonFilter}>
            <FontAwesome name="bars" size={16} color={theme.secondary} />
            <Text
              style={{ ...styles.text, fontSize: 16, color: theme.secondary }}
            >
              Categories
            </Text>
          </TouchableOpacity>
        </View>

        <PieGraph />

        <Animated.View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 20,
          }}
          entering={FadeInLeft.delay(600).duration(600).springify()}
        >
          <View style={{ width: "50%" }}>
            <Text style={{ ...styles.text_tertiary, fontSize: 24 }}>
              Transactions
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonFilter}>
            <FontAwesome name="plus" size={16} color={theme.secondary} />
            <Text
              style={{ ...styles.text, fontSize: 16, color: theme.secondary }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </Animated.View>

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
