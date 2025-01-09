import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";
import Animated, { FadeInLeft } from "react-native-reanimated";
import PieGraph from "./pie_graph";

export default function ExpenseSection(): React.JSX.Element {
  return (
    <Animated.View entering={FadeInLeft.delay(400).duration(400).springify()}>
      <View style={styles.expenseContainer}>
        {/* Expense Section */}
        <View style={styles.expenseWrapper}>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ ...styles.text_tertiary, fontSize: 24 }}>
                My expenses
              </Text>
              <Text style={{ ...styles.text, fontSize: 12 }}>
                Weekly summary
              </Text>
            </View>
            <Text style={{ ...styles.text, fontSize: 22 }}>
              $ 1400.<Text style={{ fontSize: 18 }}>00</Text>
            </Text>
          </View>
          {/* Pie Graph */}
          <PieGraph />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  expenseContainer: {
    borderBottomColor: theme.high_medium,
    backgroundColor: theme.dark,
    width: "100%",
    marginVertical: 10,
  },
  expenseWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
