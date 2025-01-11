import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { TransactionContext } from "../context/transaction_context";
import { Transaction, TransactionType } from "../models/transactions";
import { ToastAndroid } from "react-native";
import { fetchTransactions } from "../services/transaction-service";

export default function TransactionProvider({ children }: PropsWithChildren): React.JSX.Element {
  // States
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [typeSwitch, setTypeSwitch] = useState<TransactionType>("Expense");

  // Init
  useEffect((): void => {
    const getTransactions = async (): Promise<void> => {
      try {
        const data: Transaction[] = await fetchTransactions();
        if (data.length === 0)
          ToastAndroid.show("No transactions found", ToastAndroid.SHORT);
        else
          setTransactionsData(data);
      } catch (error) {
        ToastAndroid.show("Failed to fetch transactions", ToastAndroid.SHORT);
      }
    }
    getTransactions();
  }, [lastTransaction]);

  // Computed
  const filteredTransactions: Transaction[] = useMemo(() => {
    return transactionsData.filter((transaction: Transaction) => transaction.type === typeSwitch)
  }, [typeSwitch, transactionsData]);

  return (
    <TransactionContext.Provider value={{
      setLastTransaction,
      transactions: filteredTransactions,
      typeSwitch,
      setTypeSwitch
    }}>
      {children}
    </TransactionContext.Provider>
  )
}