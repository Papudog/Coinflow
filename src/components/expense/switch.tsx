import { TRANSACTION_GET_FAILED } from "@/src/constants/supabase";
import { theme } from "@/src/constants/theme";
import { useTransaction } from "@/src/context/transaction_context";
import { Transaction } from "@/src/models/transactions";
import { fetchTransactionsByType } from "@/src/services/transaction-service";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";


export default function Switch(): React.JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { typeSwitch, setTypeSwitch, setTransactions } = useTransaction();

  useEffect((): void => {
    !isActive ? setTypeSwitch("Income") : setTypeSwitch("Expense");
    getTransactionsById();
  }, [isActive]);

  const getTransactionsById = async (): Promise<void> => {
    try {
      const data: Transaction[] = await fetchTransactionsByType(typeSwitch);
      setTransactions(data);
    } catch (error) {
      ToastAndroid.show(TRANSACTION_GET_FAILED, ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchWrapper}>
        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          style={{ ...styles.button, backgroundColor: isActive ? theme.medium : theme.primary }}>
          <Text style={{ ...styles.text, color: isActive ? theme.primary : theme.dark }}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          style={{ ...styles.button, backgroundColor: !isActive ? theme.medium : theme.primary, }}>
          <Text style={{ ...styles.text, color: !isActive ? theme.primary : theme.dark }}>
            Income
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: "100%",
    justifyContent: "center",
  },
  switchWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.medium,
    padding: 5,
    gap: 5,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
