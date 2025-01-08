import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import Card from "../ui/card";
import { theme } from "../../constants/theme";
import { StyleSheet } from "react-native";
import { Transaction } from "@/src/models/transactions";
import { fetchTransactions } from "@/src/services/transaction-service";
import { TRANSACTION_FAILED } from "@/src/constants/supabase";

export default function TransactionList(): React.JSX.Element {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions();
  }, [])

  const getTransactions = async (): Promise<void> => {
    try {
      const data: Transaction[] = await fetchTransactions();
      setTransactions(data);
    } catch (error) {
      ToastAndroid.show(TRANSACTION_FAILED, ToastAndroid.SHORT);
    }
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
                <Text style={{ ...styles.text, fontSize: 16, }}>
                  {item.category_id}
                </Text>
              </View>
            </View>

            <View style={styles.transactionBody}>
              <Text style={styles.text}>{item.amount}</Text>
              <Text style={styles.text}>{new Date(item.created_at!).toDateString()}</Text>
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
