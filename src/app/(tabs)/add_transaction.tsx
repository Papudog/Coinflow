import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { theme } from "@/src/constants/theme";
import CategoriesModal from "@/src/components/categories/categories_modal";
import ExpenseInput from "@/src/components/expense/add/expense_input";
import { FontAwesome } from "@expo/vector-icons";
import Switch from "@/src/components/ui/switch";
import { useCategory } from "@/src/context/category_context";

interface FormValues {
  type: string;
  amount: string;
  name: string;
  note: string;
  categoryName: string;
}

export default function AddTransaction(): React.JSX.Element {
  // Modal state
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { category } = useCategory();
  // Form states
  const [type, setType] = useState<string>("Expense");
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    setCategoryName(category?.name || "");
  }, [category]);

  // Functions
  const onSubmit = (): void => {
    const formValues: FormValues = {
      type,
      amount,
      name,
      note,
      categoryName,
    };

    console.log(formValues);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        {/* Heading */}
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

          <Switch value={type} setValue={setType} />
        </View>

        {/* Form */}
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
            <ExpenseInput value={categoryName} placeholder="Category">
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

          {/* Submit button */}
          <TouchableOpacity
            style={{
              ...styles.buttonModal,
              backgroundColor: theme.primary,
              borderColor: theme.dark,
            }}
            onPress={(): void => onSubmit()}
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

      {/* Hid modal */}
      <CategoriesModal setIsVisible={setIsVisible} isVisible={isVisible} />
    </View>
  );
}

function showData() {}

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
