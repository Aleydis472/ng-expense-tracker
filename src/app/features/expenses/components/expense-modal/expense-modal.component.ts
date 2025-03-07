import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseFacade } from '../../../../core/facades/expense.facade';
import { CommonModule } from '@angular/common';
import { RecurringExpenseDecorator } from '../../../../core/decorators/recurring-expense.decorator';
import { CATEGORIES } from '../../../../core/constants/categories';
import { RECURRENCE_TYPES } from '../../../../core/constants/recurrence-options';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alerts } from '../../../../core/utils/alerts';
import { CURRENCIES } from '../../../../core/constants/currencies';
declare const $: any;

@Component({
  selector: 'app-expense-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-modal.component.html',
  styleUrl: './expense-modal.component.scss'
})
export class ExpenseModalComponent implements OnInit {
  private expenseFacade = inject(ExpenseFacade);
  private spinner = inject(NgxSpinnerService);
  private fb = inject(FormBuilder);
  expenseForm!: FormGroup;
  recurrenceOptionList = RECURRENCE_TYPES;
  categorieList = CATEGORIES;
  userCurrency = 'COP';
  currencies = CURRENCIES; // Monedas disponibles

  ngOnInit() {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      currency: ['COP', Validators.required],
      recurrence: [''],
    });
  }

  async addExpense() {
    this.spinner.show();
    if (this.expenseForm.valid) {
      let expense = this.expenseForm.value;
      if (expense.recurrence) {
        const decoratedExpense = new RecurringExpenseDecorator(expense, expense.recurrence);
        expense = decoratedExpense.toPlainObject(); //  Convertirlo a objeto antes de guardar
      }
      this.expenseFacade.addExpense(expense);
      this.resetForm();
      this.spinner.hide();
      Alerts.show({ title: 'Gasto creado', html: 'Se guardó la reserva correctamente.', icon: 'success' });

      $('#expenseModal').modal('hide');
    } else {
      Alerts.show({ title: 'ERROR', html: 'Campos obligatorios.', icon: 'error' })
      this.spinner.hide();
    }
  }

  private resetForm() {
    this.expenseForm.reset();
    this.expenseForm.patchValue({ currency: 'COP', recurrence: '' }); // Restablecer valores por defecto

  }
}
