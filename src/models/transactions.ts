import { Category } from "./categories";

enum TransactionStatus {
  'Inactive' = 0,
  'Active ' = 1,
  'Updated' = 2,
}

export type TransactionType = "Expense" | "Income";

export interface Transaction {
  id?: number;
  profile_id: string;
  category_id: number;
  amount: number;
  type: TransactionType;
  note?: string;
  status?: TransactionStatus;
  created_at?: Date;
  updated_at?: Date;
  categories?: Category
}