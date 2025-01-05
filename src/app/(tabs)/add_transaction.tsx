import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { theme } from "@/src/constants/theme";
import { Category } from "@/src/models/categories";
import CategoriesModal from "@/src/components/categories/categories_modal";
import ExpenseInput from "@/src/components/expense/add/expense_input";
import { useCategory } from "@/src/context/category_context";
import { FontAwesome } from "@expo/vector-icons";
import Switch from "@/src/components/ui/switch";

export default function AddTransaction(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [note, setNote] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <View>
          <Text
            style={{
              ...styles.text,
              fontSize: 20,
              marginVertical: 10,
              alignSelf: "center",
            }}
          >
            Type of transaction
          </Text>

          <Switch />
        </View>

        <View style={{ marginVertical: 20, gap: 20 }}>
          <ExpenseInput
            value={amount}
            setValue={setAmount}
            placeholder="Amount"
          >
            <FontAwesome name="dollar" size={16} color={theme.light} />
          </ExpenseInput>

          <ExpenseInput value={name} setValue={setName} placeholder="Name">
            <FontAwesome name="paperclip" size={16} color={theme.light} />
          </ExpenseInput>

          <ExpenseInput value={note} setValue={setNote} placeholder="Note">
            <FontAwesome name="pencil" size={16} color={theme.light} />
          </ExpenseInput>

          <View>
            <ExpenseInput
              value={category}
              setValue={setCategory}
              placeholder="Category"
            >
              <FontAwesome name="bars" size={16} color={theme.light} />
            </ExpenseInput>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              style={styles.buttonModal}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ ...styles.text }}>Choose category</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              ...styles.buttonModal,
              backgroundColor: theme.primary,
              borderColor: theme.dark,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ ...styles.text }}>Add transaction</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <CategoriesModal setIsVisible={setIsVisible} isVisible={isVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
  },
  containerWrapper: {
    justifyContent: "center",
    padding: 40,
  },
  buttonModal: {
    backgroundColor: theme.high_medium,
    borderColor: theme.dark,
    borderWidth: 2,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
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
