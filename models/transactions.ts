export interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  type: 'income' | 'expense';
  note: string;
  created_at: Date;
  updated_at: Date;
}