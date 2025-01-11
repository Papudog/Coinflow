import { createContext, useContext } from "react";
import { Transaction, TransactionType } from "../models/transactions";

interface TransactionContextProps {
  transactions: Transaction[];
  typeSwitch: TransactionType;
  setTypeSwitch: (typeSwitch: TransactionType) => void;
  setLastTransaction: (transaction: Transaction) => void;
}

export const TransactionContext = createContext<TransactionContextProps>({
  transactions: [],
  typeSwitch: "Expense",
  setTypeSwitch: () => { },
  setLastTransaction: () => { }
});


export const useTransaction = (): TransactionContextProps =>
  useContext(TransactionContext);