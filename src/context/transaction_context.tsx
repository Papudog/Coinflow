import { createContext, useContext } from "react";
import { Transaction, TransactionType } from "../models/transactions";

interface TransactionContextProps {
  transactions: Transaction[];
  transactionsByType: Transaction[];
  typeSwitch: TransactionType;
  setTypeSwitch: (typeSwitch: TransactionType) => void;
  setLastTransaction: (transaction: Transaction) => void;
}

export const TransactionContext = createContext<TransactionContextProps>({
  transactions: [],
  typeSwitch: "Expense",
  transactionsByType: [],
  setTypeSwitch: () => { },
  setLastTransaction: () => { }
});


export const useTransaction = (): TransactionContextProps =>
  useContext(TransactionContext);