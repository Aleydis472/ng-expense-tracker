import { inject, Injectable, Signal } from '@angular/core';
import { Firestore, collection, query, where, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { signal, WritableSignal } from '@angular/core';
import { AuthService } from './auth.service';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  isLoading = signal<boolean>(true); // Agregamos un estado de carga
  expenses: WritableSignal<Expense[]> = signal<Expense[]>([]);

  constructor() {
    this.loadExpenses();
  }

  private loadExpenses() {
    this.isLoading.set(true); // Inicia la carga
    const user = this.authService.getUser();
    if (!user) return; // Si no hay usuario autenticado, no carga gastos

    const userExpensesQuery = query(
      collection(this.firestore, 'expenses'),
      where('uid', '==', user.uid) // Filtramos por usuario autenticado
    );

    collectionData(userExpensesQuery, { idField: 'id' }).subscribe({
      next: (data) => {
        this.expenses.set(data as Expense[]),
          this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar gastos:', err);
        this.isLoading.set(false); // Asegurar que se oculta el loading en caso de error
      }

    });
  }

  async addExpense(expense: Expense) {
    const user = this.authService.getUser();
    if (!user) return;

    const newExpense = { ...expense, uid: user.uid }; // Agregamos el uid del usuario
    const docRef = await addDoc(collection(this.firestore, 'expenses'), newExpense);
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

  get loading(): Signal<boolean> {
    return this.isLoading;
  }
}
