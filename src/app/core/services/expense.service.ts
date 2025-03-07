import { Injectable, inject, WritableSignal, signal } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private firestore = inject(Firestore);
  private expensesCollection = collection(this.firestore, 'expenses');

  expenses: WritableSignal<Expense[]> = signal<Expense[]>([]);

  constructor() {
    this.loadExpenses();
  }

  private loadExpenses() {
    collectionData(this.expensesCollection, { idField: 'id' }).subscribe({
      next: (data) => this.expenses.set(data as Expense[]),
      error: (err) => console.error('Error al cargar gastos:', err),
    });
  }

  async addExpense(expense: Expense) {
    const docRef = await addDoc(this.expensesCollection, expense);
    await updateDoc(doc(this.firestore, `expenses/${docRef.id}`), { id: docRef.id });
  }

  async updateExpense(id: string, expense: Partial<Expense>) {
    const expenseDoc = doc(this.firestore, `expenses/${id}`);
    await updateDoc(expenseDoc, expense);
  }

  async deleteExpense(id: string) {
    const expenseDoc = doc(this.firestore, `expenses/${id}`);
    await deleteDoc(expenseDoc);
  }
}
