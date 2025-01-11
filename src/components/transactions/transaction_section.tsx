import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";
import Animated, { FadeInLeft } from "react-native-reanimated";
import PieGraph from "./pie_graph";
import TransactionSwitch from "./ui/transaction_switch";
import TransactionList from "./transaction_list";
import { useTransaction } from "@/src/context/transaction_context";
import { Transaction } from "@/src/models/transactions";
import { useMemo } from "react";

export default function TransactionSection(): React.JSX.Element {
  const { transactions, typeSwitch } = useTransaction();

  const totalTransactions: string = useMemo(() => {
    const sum: number = transactions
      .filter((transaction: Transaction) => transaction.type === typeSwitch)
      .reduce((acc: number, transaction: Transaction) => {
        return acc + transaction.amount
      }, 0)

    return sum.toString()
  }, [transactions, typeSwitch])

  return (
    <Animated.View entering={FadeInLeft.delay(400).duration(400).springify()}>
      {/* Expense Section */}
      <View style={styles.expenseContainer}>
        <View style={styles.expenseWrapper}>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ ...styles.text_tertiary, fontSize: 24 }}>
                {`My ${typeSwitch === "Expense" ? "expenses" : "incomes"}`}
              </Text>
              <Text style={{ ...styles.text, fontSize: 12 }}>
                Summary
              </Text>
            </View>
            <Text style={{ ...styles.text, fontSize: 22 }}>
              $ {`${totalTransactions.split(".")[0]}`}
              <Text style={{ ...styles.text, fontSize: 16 }}>
                {`${totalTransactions.split(".")[1] ? "." + totalTransactions.split(".")[1] : ".00"}`}
              </Text>
            </Text>
          </View>
          {/* Pie Graph */}
          <PieGraph />
        </View>
        <View>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <TransactionSwitch />
          </View>
          <View>
            <Text style={{ ...styles.text_tertiary, fontSize: 22 }}>
              Recent transactions
            </Text>
            <TransactionList />
          </View>
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
