import React from "react";
import Card from "./card";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";

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
    <Animated.View
      entering={FadeInLeft.delay(600).duration(600).springify()}
      style={{ marginVertical: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ ...styles.text_tertiary, fontSize: 24 }}>
            Transactions
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...styles.buttonFilter,
            borderWidth: 0,
            backgroundColor: "transparent",
          }}
        >
          <FontAwesome name="plus" size={16} color={theme.secondary} />
          <Text
            style={{ ...styles.text, fontSize: 16, color: theme.secondary }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(transactions) => transactions.id.toString()}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInLeft.delay((index + 1) * 400)
              .duration(400)
              .springify()}
            style={{ marginVertical: 5 }}
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
                  <View style={styles.transactionType}>
                    <View>
                      <FontAwesome
                        name="caret-down"
                        size={20}
                        color={
                          item.type === "Expense" ? theme.danger : theme.success
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
          </Animated.View>
        )}
      />
    </Animated.View>
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
