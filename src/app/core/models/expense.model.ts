export interface Expense {
  id?: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  recurrence?: string

}
