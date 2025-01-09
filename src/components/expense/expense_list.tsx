import React, { useEffect } from "react";
import { FlatList, ListRenderItem, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import Card from "../ui/card";
import { theme } from "../../constants/theme";
import { StyleSheet } from "react-native";
import { Transaction } from "@/src/models/transactions";
import { fetchTransactions } from "@/src/services/transaction-service";
import { TRANSACTION_GET_FAILED } from "@/src/constants/supabase";
import { useTransaction } from "@/src/context/transaction_context";

export default function TransactionList(): React.JSX.Element {
  // Context
  const { transactions } = useTransaction();

  const TypeText = (item: Transaction): React.JSX.Element => {
    if (item.type === 'Expense')
      return (
        <Text style={styles.text}>
          <Text style={{ color: theme.danger }}>- </Text>
          {`${item.amount} $`}
        </Text>
      )
    else
      return (
        <Text style={styles.text}>
          <Text style={{ color: theme.success }}>+ </Text>
          {`${item.amount} $`}
        </Text>
      )

  }

  const renderTransactions: ListRenderItem<Transaction> = ({ item, index }) => {
    return (
      <Animated.View entering={FadeInLeft.delay((index + 1) * 400)
        .duration(400)
        .springify()}
        style={{ marginVertical: 5 }}
      >
        <TouchableOpacity>
          <Card>
            <View style={styles.transactionHeading}>
              <View style={styles.transactionHeadingContent}>
                <Text style={{
                  ...styles.text, fontSize: 16,
                  color: item.categories?.color ?
                    item.categories?.color :
                    theme.light
                }}>
                  {item.categories?.name ?? ''}
                </Text>
              </View>
            </View>

            <View style={styles.transactionBody}>
              <Text style={styles.text}>{item.note}</Text>
              <TypeText {...item} />
            </View>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={transactions}
      keyExtractor={(transactions) => transactions.id!.toString()}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={renderTransactions}
    />
  );
}
const styles = StyleSheet.create({
  transactionHeading: {
    borderBottomColor: theme.high_medium,
    borderBottomWidth: 2,
    backgroundColor: theme.dark,
    paddingVertical: 2,
    paddingHorizontal: 10,
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
  transactionHeadingContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionBody: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
  },
  transactionType: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
