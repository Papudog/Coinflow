import React from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import Card from "../ui/card";
import { theme } from "../../constants/theme";
import { StyleSheet } from "react-native";

export default function TransactionList(): React.JSX.Element {
  const transactions = [
    {
      id: 1,
      category: "🦐 Food",
      amount: 20,
      date: new Date(),
      color: "#93FCF8",
      type: "Expense",
    },
    {
      id: 2,
      category: "🏍️ Transport",
      amount: 10,
      date: new Date(),
      color: "#BDB2FA",
      type: "Expense",
    },
    {
      id: 3,
      category: "🦐 Food",
      amount: 20,
      date: new Date(),
      color: "#93FCF8",
      type: "Expense",
    },
    {
      id: 4,
      category: "🏍️ Transport",
      amount: 10,
      date: new Date(),
      color: "#BDB2FA",
      type: "Expense",
    },
    {
      id: 5,
      category: "🦐 Food",
      amount: 20,
      date: new Date(),
      color: "#93FCF8",
      type: "Expense",
    },
    {
      id: 6,
      category: "🏍️ Transport",
      amount: 10,
      date: new Date(),
      color: "#BDB2FA",
      type: "Expense",
    },
  ];

  const renderTransactions: ListRenderItem<any> = ({ item, index }) => {
    return (
      <Animated.View
        entering={FadeInLeft.delay((index + 1) * 400)
          .duration(400)
          .springify()}
        style={{ marginHorizontal: 5 }}
      >
        <Card>
          <View style={styles.transactionHeading}>
            <View style={styles.transactionHeadingContent}>
              <Text
                style={{
                  ...styles.text,
                  fontSize: 16,
                  color: item.color,
                }}
              >
                {item.category}
              </Text>
            </View>
          </View>

          <View style={styles.transactionBody}>
            <Text style={styles.text}>{item.date.toDateString()}</Text>
            <Text style={styles.text}>{item.amount}</Text>
          </View>
        </Card>
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={transactions}
      keyExtractor={(transactions) => transactions.id.toString()}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
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
    flexDirection: "row",
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
