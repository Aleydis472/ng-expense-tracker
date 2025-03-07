import { Expense } from '../models/expense.model';

export class RecurringExpenseDecorator implements Expense {
  constructor(private baseExpense: Expense, private recurrency: string) { }

  get id(): string | undefined {
    return this.baseExpense.id;
  }

  get description(): string {
    return this.baseExpense.description; // 🔥 NO modificamos la descripción
  }

  get amount(): number {
    return this.baseExpense.amount;
  }

  get currency(): string {
    return this.baseExpense.currency;
  }

  get category(): string {
    return this.baseExpense.category;
  }

  get date(): string {
    return this.baseExpense.date;
  }

  get recurrence(): string {
    return this.recurrency; // 🔥 Ahora el Decorator agrega la recurrencia sin modificar el objeto original
  }


  toPlainObject(): Expense {
    const expenseData: any = {
      description: this.baseExpense.description,
      amount: this.baseExpense.amount,
      currency: this.baseExpense.currency,
      category: this.baseExpense.category,
      date: this.baseExpense.date,
      recurrence: this.recurrence // 🔥 Se añade la recurrencia al objeto
    };

    if (this.baseExpense.id) {
      expenseData.id = this.baseExpense.id; // 🔥 Solo se agrega si `id` tiene un valor
    }

    return expenseData;
  }
}
