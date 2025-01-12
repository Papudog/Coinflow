import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/constants/theme";
import { PieChart } from "react-native-gifted-charts";
import React, { useEffect, useMemo, useState } from "react";
import { useTransaction } from "@/src/context/transaction_context";
import { Transaction } from "@/src/models/transactions";

interface PieData {
  value: number;
  name: string | undefined;
  color: string | undefined;
  type: string | undefined;
}

export default function PieGraph(): React.JSX.Element {
  const { transactions, typeSwitch } = useTransaction();
  const [selectedValue, setSelectedValue] = useState<PieData | null>(null);

  const addCategoryAmount: Record<string, number> =
    useMemo(() => {
      return transactions
        .filter((transaction: Transaction) => transaction.type === typeSwitch)
        .reduce((acc: { [key: string]: number }, transaction: Transaction) => {
          const { category_id, amount, type } = transaction
          const catTypeKey: string = `${category_id}-${type}`;

          if (!acc[catTypeKey]) acc[catTypeKey] = 0;

          acc[catTypeKey] += amount;
          return acc;
        }, {}); // {"1-Expense": 40, "1-Income": 10}
    }, [transactions, typeSwitch])

  const pieData: PieData[] = useMemo(() => {
    const uniqueCategories: Set<string> = new Set<string>();

    return transactions
      .filter((transaction: Transaction) => {
        const { category_id, type } = transaction
        const catTypeKey: string = `${category_id}-${type}`;

        if (uniqueCategories.has(catTypeKey)) return false;

        uniqueCategories.add(catTypeKey);
        return true;
      })
      .map((transaction: Transaction) => {
        const { category_id, type } = transaction;
        const catTypeKey: string = `${category_id}-${type}`;

        return {
          value: addCategoryAmount[catTypeKey],
          name: transaction.categories?.name,
          color: transaction.categories?.color,
          type: transaction.type,
        }
      })
      .filter((transaction) => transaction.type === typeSwitch)
      .sort((a, b) => b.value - a.value);
  }, [transactions, typeSwitch, addCategoryAmount])

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
            <Text style={{ ...styles.text, fontSize: 10 }}>{selectedValue?.name ?? '='}</Text>
            <Text style={{ ...styles.text, fontSize: 18 }}>{`$ ${selectedValue?.value ?? ''}`}</Text>
          </View>
        )}
        onPress={(data: PieData) => setSelectedValue(data)}
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
