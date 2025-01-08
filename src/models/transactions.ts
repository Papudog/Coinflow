enum TransactionStatus {
  'Inactive' = 0,
  'Active ' = 1,
  'Updated' = 2,
}

export interface Transaction {
  id?: number;
  profile_id: string;
  category_id: number;
  amount: number;
  type: 'Income' | 'Expense';
  note?: string;
  status?: TransactionStatus;
  created_at?: Date;
  updated_at?: Date;
}