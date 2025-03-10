export interface Expense {
  id?: string;
  uid: string; // ID del usuario
  description: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  recurrence?: string

}
