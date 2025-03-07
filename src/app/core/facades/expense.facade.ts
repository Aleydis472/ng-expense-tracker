import { Injectable, WritableSignal, inject } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFacade {
  private expenseService = inject(ExpenseService);
  expenses: WritableSignal<Expense[]> = this.expenseService.expenses;

  async addExpense(expense: Expense) {
    await this.expenseService.addExpense(expense);
  }

  async updateExpense(id: string, expense: Partial<Expense>) {
    await this.expenseService.updateExpense(id, expense);
  }

  async deleteExpense(id: string) {
    await this.expenseService.deleteExpense(id);
  }


}
