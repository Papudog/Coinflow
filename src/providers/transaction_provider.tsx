import React, { PropsWithChildren } from "react";
import { TransactionContext } from "../context/transaction_context";
import { Transaction, TransactionType } from "../models/transactions";

export default function TransactionProvider({ children }: PropsWithChildren): React.JSX.Element {

  // States
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [transaction, setTransaction] = React.useState<Transaction | null>(null);
  const [typeSwitch, setTypeSwitch] = React.useState<TransactionType>("Expense");

  return (
    <TransactionContext.Provider value={{
      transactions,
      transaction,
      typeSwitch,
      setTransactions,
      setTransaction,
      setTypeSwitch
    }}>
      {children}
    </TransactionContext.Provider>
  )
}