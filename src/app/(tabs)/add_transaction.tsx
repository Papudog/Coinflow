import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { theme } from "@/src/constants/theme";
import CategoriesModal from "@/src/components/categories/categories_modal";
import ExpenseInput from "@/src/components/expense/add/expense_input";
import { FontAwesome } from "@expo/vector-icons";
import Switch from "@/src/components/ui/switch";
import { useCategory } from "@/src/context/category_context";
import { useUser } from "@/src/providers/user_provider";
import { Transaction } from "@/src/models/transactions";
import { supabase } from "@/lib/supabase";
import { addTransaction } from "@/src/services/transaction-service";
import { TRANSACTION_FAILED, TRANSACTION_SUCCESS } from "@/src/constants/supabase";

interface TransactionBody extends Transaction { }
type TransactionType = "Expense" | "Income";

export default function AddTransaction(): React.JSX.Element {
  // Modal state
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Form states
  const [type, setType] = useState<TransactionType>("Expense");
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const setAmountState = useCallback((value: string): void => {
    if (!isNaN(Number(value)))
      setAmount(value);

  }, [setAmount]);

  // Context
  const { setCategory, category } = useCategory();
  const { uuid } = useUser();

  // OnInit
  useEffect((): void => {
    statesHandler();
  }, []);

  // Functions
  const onSubmit = async (): Promise<void> => {
    try {
      if (category === null || amount === "" || note === "") return;
      const category_id: number = category.id!;
      const numericAmount: number = Number(amount);

      await addTransaction({
        type,
        amount: numericAmount,
        note,
        category_id,
        profile_id: uuid
      });

      statesHandler();
      ToastAndroid.show(TRANSACTION_SUCCESS, ToastAndroid.SHORT);

    } catch (error) {
      ToastAndroid.show(TRANSACTION_FAILED, ToastAndroid.SHORT);
    }
  };

  const statesHandler = (): void => {
    setAmount("");
    setNote("");
    setCategory(null);
  };

  // Element
  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        {/* Heading */}
        <View>
          <Text style={{ ...styles.text, fontSize: 20, marginVertical: 10, alignSelf: "center" }}>
            Type of transaction
          </Text>

          <Switch value={type} setValue={setType} />
        </View>

        {/* Form */}
        <View style={{ marginVertical: 20, gap: 20 }}>
          <ExpenseInput
            value={amount}
            setValue={setAmountState}
            placeholder="Amount"
            keyBoardType="numeric"
          >
            <FontAwesome name="dollar" size={16} color={theme.light} />
          </ExpenseInput>

          <ExpenseInput value={note} setValue={setNote} placeholder="Note">
            <FontAwesome name="pencil" size={16} color={theme.light} />
          </ExpenseInput>

          <View>
            <ExpenseInput value={category?.name ?? ""} placeholder="Category">
              <FontAwesome name="bars" size={16} color={theme.light} />
            </ExpenseInput>
            <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.buttonModal}>
              <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ ...styles.text }}>Choose category</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Submit button */}
          <TouchableOpacity
            style={{ ...styles.buttonModal, backgroundColor: theme.primary, borderColor: theme.dark }}
            onPress={(): Promise<void> => onSubmit()}
          >
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
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


async function createTransaction(props: TransactionBody): Promise<void> {
  const { amount, type, note, category_id, profile_id } = props;
  try {
    const { error, status } = await supabase
      .from("transactions")
      .insert({ amount, type, note, category_id, profile_id });
  } catch (error) {
    console.error("Error creating transaction: ", error);
  }
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
