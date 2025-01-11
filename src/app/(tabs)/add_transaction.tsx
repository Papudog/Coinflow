import React, { useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { theme } from "@/src/constants/theme";
import CategoriesModal from "@/src/components/categories/categories_modal";
import TransactionInput from "@/src/components/transactions/ui/transaction_input";
import { FontAwesome } from "@expo/vector-icons";
import TransactionSwitch from "@/src/components/transactions/ui/transaction_switch";
import { useCategory } from "@/src/context/category_context";
import { useUser } from "@/src/providers/user_provider";
import { Transaction } from "@/src/models/transactions";
import { addTransaction } from "@/src/services/transaction-service";
import { TRANSACTION_GET_FAILED, TRANSACTION_SUCCESS } from "@/src/constants/supabase";
import { useTransaction } from "@/src/context/transaction_context";

interface TransactionBody extends Transaction { }

export default function AddTransaction(): React.JSX.Element {
  // Modal state
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Form states
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  // Context
  const { setCategory, category } = useCategory();
  const { typeSwitch, setLastTransaction } = useTransaction();
  const { uuid } = useUser();

  // OnInit
  useEffect((): void => {
    statesHandler();
  }, []);

  // Functions
  const onSubmit = async (): Promise<void> => {
    try {
      if (category === null || amount === 0 || note === "") return;
      const category_id: number = category.id!;
      const numericAmount: number = Number(amount);

      const transaction: Transaction = await addTransaction({
        type: typeSwitch,
        amount: numericAmount,
        note,
        category_id,
        profile_id: uuid
      });

      setLastTransaction(transaction);
      statesHandler();
      ToastAndroid.show(TRANSACTION_SUCCESS, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(TRANSACTION_GET_FAILED, ToastAndroid.SHORT);
    }
  };

  const statesHandler = (): void => {
    setAmount(0);
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
          <TransactionSwitch />
        </View>

        {/* Form */}
        <View style={{ marginVertical: 20, gap: 20 }}>
          <TransactionInput<number>
            value={amount}
            setValue={setAmount}
            placeholder="Amount"
            keyBoardType="numeric"
          >
            <FontAwesome name="dollar" size={16} color={theme.light} />
          </TransactionInput>

          <TransactionInput<string>
            value={note}
            setValue={setNote}
            placeholder="Note"
          >
            <FontAwesome name="pencil" size={16} color={theme.light} />
          </TransactionInput>

          <View>
            <TransactionInput<string>
              value={category?.name ?? ""}
              placeholder="Category"
            >
              <FontAwesome name="bars" size={16} color={theme.light} />
            </TransactionInput>
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
