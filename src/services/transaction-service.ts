import { supabase } from "@/lib/supabase";
import { Transaction } from "../models/transactions";
import { TRANSACTION_GET_FAILED, TRANSACTION_POST_FAILED, TRANSACTIONS } from "../constants/supabase";

export async function addTransaction(transaction: Transaction): Promise<Transaction> {
  const { amount, type, note, category_id, profile_id } = transaction

  const { data, error } = await supabase
    .from(TRANSACTIONS)
    .insert({ amount, type, note, category_id, profile_id })
    .select("*, categories(*)")
    .single();

  if (error) throw new Error(TRANSACTION_POST_FAILED);

  return data as Transaction;
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from(TRANSACTIONS)
    .select("*, categories(*)")
  // .order("created_at", { ascending: false });

  if (error) throw new Error(TRANSACTION_GET_FAILED)

  return data ?? [];
}
