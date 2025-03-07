import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { ExpenseFacade } from '../../../../core/facades/expense.facade';
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { CATEGORIES, CATEGORY_COLORS } from '../../../../core/constants/categories';
import { CurrencyFacade } from '../../../../core/facades/currency.facade';
import { Expense } from '../../../../core/models/expense.model';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alerts } from '../../../../core/utils/alerts';
import { CURRENCIES } from '../../../../core/constants/currencies';
import { CurrencyService } from '../../../../core/services/currency.service';

declare const $: any;
@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, DatePipe, FormsModule, CurrencyPipe],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})

export class ExpenseListComponent {
  private expenseFacade = inject(ExpenseFacade);
  private currencyFacade = inject(CurrencyFacade);
  private currencyService = inject(CurrencyService);
  spinner = inject(NgxSpinnerService);

  expenses: WritableSignal<Expense[]> = this.expenseFacade.expenses; //  Signal proveniente de ExpenseFacade
  categories = CATEGORIES.map(c => c.name);
  selectedCategory = signal(''); //  Categoría seleccionada
  selectedCurrency = signal('COP'); //  Moneda seleccionada globalmente
  currencies = CURRENCIES;
  exchangeRates: WritableSignal<{ [key: string]: number }> = this.currencyService.exchangeRates; //  Tasas en caché

  constructor() {
    effect(() => {
      this.selectedCurrency();
    });
  }


  async ngOnInit() {
    await this.currencyService.loadExchangeRates(); //  Carga las tasas solo si es necesario
  }

  /**
   *  Filtra los gastos según la categoría seleccionada
   */
  getFilteredExpenses(): Expense[] {
    return this.selectedCategory()
      ? this.expenses().filter(expense => expense.category === this.selectedCategory())
      : this.expenses();
  }

  /**
   * Convierte un monto en la moneda seleccionada sin llamar a la API
   */
  convertAmount(expense: Expense): number {
    const converted = this.currencyFacade.convertToUserCurrency(
      expense.amount,
      expense.currency,
      this.selectedCurrency()
    );
    return converted;
  }

  getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category] || '#000000';
  }

  async deleteExpense(id?: string) {
    Alerts.show({
      title: '¿Estás seguro?',
      html: 'Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        if (id) {
          await this.expenseFacade.deleteExpense(id);
        }
        this.spinner.hide();
        Alerts.show({
          title: '¡Confirmado!',
          html: 'Has eliminado el registro.',
          icon: 'success'
        });
      }
    });
  }

  /**
   *  Cambia la moneda globalmente y actualiza la vista sin llamadas a la API
   */
  changeCurrency(event: Event) {
    const target = event.target as HTMLSelectElement | null; //  Permite que target sea `null`
    if (!target) return; //  Si es `null`, simplemente se detiene
    this.selectedCurrency.set(target.value);
    this.currencyFacade.setSelectedCurrency(target.value);
  }

  openAddExpenseModal() {
    $('#expenseModal').modal('show');
  }
}
