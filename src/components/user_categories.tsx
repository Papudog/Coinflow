import { theme } from "@/src/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FlatList, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import ModalCategories from "./modal_categories";

export default function UserCategories(): React.JSX.Element {
  const [modalVisible, setModalVisible] = React.useState(false);

  const data = [
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
      category: "🍿 Entertainment",
      amount: 20,
      date: new Date(),
      color: "#93FCF8",
      type: "Expense",
    },
    {
      id: 4,
      category: "🎉 Party",
      amount: 10,
      date: new Date(),
      color: "#BDB2FA",
      type: "Expense",
    },
  ];

  return (
    <Animated.View
      entering={FadeInLeft.delay(600).duration(600).springify()}
      style={{ marginBottom: 20 }}
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
            Categories
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...styles.buttonFilter,
            borderWidth: 0,
            backgroundColor: "transparent",
          }}
          onPress={(): void => setModalVisible(true)}
        >
          <FontAwesome name="plus" size={16} color={theme.secondary} />
          <Text
            style={{ ...styles.text, fontSize: 14, color: theme.secondary }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(data) => data.id.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              ...styles.buttonFilter,
              borderColor: item.color,
              marginHorizontal: 3,
            }}
          >
            <View>
              <Text style={{ ...styles.text, color: item.color, fontSize: 14 }}>
                {item.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <ModalCategories
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
});