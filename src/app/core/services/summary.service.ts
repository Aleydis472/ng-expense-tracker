import { Injectable, inject, effect, signal, WritableSignal, computed } from '@angular/core';
import { ExpenseFacade } from '../facades/expense.facade';
import { CurrencyFacade } from '../facades/currency.facade';
import { Expense } from '../models/expense.model';
import { ChartData } from 'chart.js';
import { CATEGORY_COLORS } from '../constants/categories';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private expenseFacade = inject(ExpenseFacade);
  private currencyFacade = inject(CurrencyFacade);
  expenses: WritableSignal<Expense[]> = this.expenseFacade.expenses;
  selectedCurrency = this.currencyFacade.selectedCurrency; //  Moneda seleccionada globalmente
  convertedAmounts: WritableSignal<{ [id: string]: number }> = signal({}); //  Cache de conversiones

  constructor() {
    effect(() => {
     this.selectedCurrency();
      this.convertAllExpenses(); //  Se ejecuta cuando cambia la moneda seleccionada
    });
  }

  totalMonthlyExpense = computed(() =>
    this.getCurrentMonthExpenses().reduce((sum, exp) => sum + this.getConvertedAmount(exp), 0)
  );

  categoryTotals = computed(() => {
    const totals: { [category: string]: number } = {};
    this.getCurrentMonthExpenses().forEach(exp => {
      const convertedAmount = this.getConvertedAmount(exp);
      totals[exp.category] = (totals[exp.category] || 0) + convertedAmount;
    });
    return totals;
  });

  chartData = computed<ChartData<'pie', number[], string>>(() => {
    const categories = Object.keys(this.categoryTotals());
    const amounts = Object.values(this.categoryTotals());

    if (categories.length === 0) {
      return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    }

    return {
      labels: categories,
      datasets: [{ data: amounts, backgroundColor: categories.map(cat => CATEGORY_COLORS[cat] || '#999999') }],
    };
  });



  /**
   *  Convierte todos los gastos a la moneda seleccionada
   */
  async convertAllExpenses() {
    const expenses = this.expenses();
    const conversions: { [id: string]: number } = {};

    for (let expense of expenses) {
      conversions[expense.id!] = this.currencyFacade.convertToUserCurrency(
        expense.amount,
        expense.currency,
        this.selectedCurrency()
      );
    }
    this.convertedAmounts.set(conversions);
  }

  /**
   *  Obtiene el monto convertido en la moneda seleccionada
   */
  getConvertedAmount(expense: Expense): number {
    return this.convertedAmounts()[expense.id!] ?? expense.amount;
  }

  /**
   *  Obtiene los gastos del mes actual
   */
  private getCurrentMonthExpenses(): Expense[] {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return this.expenses().filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  }
}





