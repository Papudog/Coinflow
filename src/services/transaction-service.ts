import { supabase } from "@/lib/supabase";
import { Transaction } from "../models/transactions";
import { TRANSACTION_FAILED, TRANSACTIONS } from "../constants/supabase";

export async function addTransaction(transaction: Transaction): Promise<void> {
  const { amount, type, note, category_id, profile_id } = transaction

  const { error } = await supabase
    .from(TRANSACTIONS)
    .insert({ amount, type, note, category_id, profile_id });

  if (error) throw new Error("Failed to save transaction.");
}

export async function fetchTransactions(): Promise<Transaction[]> {

  const { data, error } = await supabase.from(TRANSACTIONS).select("*");

  if (error) {
    console.error(error)
    throw new Error(TRANSACTION_FAILED)
  };

  return data as Transaction[];
}