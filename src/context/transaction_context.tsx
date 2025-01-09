import { createContext, useContext } from "react";
import { Transaction, TransactionType } from "../models/transactions";

interface TransactionContextProps {
  transactions: Transaction[];
  transaction: Transaction | null;
  typeSwitch: TransactionType;
  setTransactions: (transactions: Transaction[]) => void;
  setTransaction: (transaction: Transaction | null) => void;
  setTypeSwitch: (typeSwitch: TransactionType) => void;
}

export const TransactionContext = createContext<TransactionContextProps>({
  transactions: [],
  transaction: null,
  typeSwitch: "Expense",
  setTransactions: () => { },
  setTransaction: () => { },
  setTypeSwitch: () => { }
});


export const useTransaction = (): TransactionContextProps =>
  useContext(TransactionContext);