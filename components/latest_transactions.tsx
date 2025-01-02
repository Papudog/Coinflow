import React from "react";
import Card from "./card";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";

export default function LatestTransactions(): React.JSX.Element {
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

  return (
    <View style={styles.transactionsContainer}>
      <View style={styles.transactionsWrapper}>
        <FlatList
          data={transactions}
          keyExtractor={(transactions) => transactions.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 5 }}>
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
                    <View style={styles.transactionType}>
                      <View>
                        <FontAwesome
                          name="caret-down"
                          size={20}
                          color={
                            item.type === "Expense"
                              ? theme.danger
                              : theme.success
                          }
                        />
                      </View>
                      <Text
                        style={{
                          ...styles.text,
                          color:
                            item.type === "Expense"
                              ? theme.danger
                              : theme.success,
                        }}
                      >
                        {item.type}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.transactionBody}>
                  <Text style={styles.text}>{item.date.toDateString()}</Text>
                  <Text style={styles.text}>{item.amount}</Text>
                </View>
              </Card>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionsContainer: {
    // marginTop: 20,
    width: "100%",
    height: 400,
  },
  transactionsWrapper: {
    flexDirection: "column",
  },
  transactionHeading: {
    borderBottomColor: theme.high_medium,
    borderBottomWidth: 2,
    backgroundColor: theme.dark,
    paddingVertical: 2,
    paddingHorizontal: 10,
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
