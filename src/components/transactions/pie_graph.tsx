import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/constants/theme";
import { PieChart } from "react-native-gifted-charts";
import React, { useCallback, useEffect, useState } from "react";
import { useTransaction } from "@/src/context/transaction_context";
import { Transaction } from "@/src/models/transactions";

type CategoryReduce = { [key: number]: number };
interface PieData {
  value: number;
  name: string | undefined;
  color: string | undefined;
  type: string | undefined;
  focused: boolean;
}

export default function PieGraph(): React.JSX.Element {
  const { transactions, typeSwitch } = useTransaction();
  const [selectedValue, setSelectedValue] = useState<PieData | null>(null);

  const addCategoryAmount = transactions.reduce(
    (acc: CategoryReduce, transaction: Transaction) => {
      const { category_id, amount } = transaction
      acc[category_id] = 0;

      acc[category_id] += amount;
      return acc;
    }, {});

  const pieData: PieData[] = transactions
    .map((transaction: Transaction) => ({
      value: addCategoryAmount[transaction.category_id!],
      name: transaction.categories?.name,
      color: transaction.categories?.color,
      type: transaction.type,
      focused: true
    }))
    .filter((transaction) => transaction.type === typeSwitch)
    .sort((a, b) => b.value - a.value);

  useEffect(() => {
    setSelectedValue(null)
  }, [typeSwitch])


  return (
    <View style={{ flex: 1 }}>
      <PieChart
        data={pieData}
        donut
        showGradient
        sectionAutoFocus
        focusOnPress={true}
        radius={70}
        semiCircle={true}
        innerRadius={55}
        innerCircleColor={theme.dark}
        centerLabelComponent={(): React.JSX.Element => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ ...styles.text, fontSize: 10 }}>{pieData[0].name}</Text>
            <Text style={{ ...styles.text, fontSize: 18 }}>{`$ ${pieData[0].value}`}</Text>
          </View>
        )}
      // onPress={(data: PieData) => setSelectedValue(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    borderBottomColor: theme.high_medium,
    backgroundColor: theme.dark,
    flex: 1,
    marginVertical: 10,
  },
  chartWrapper: {
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
