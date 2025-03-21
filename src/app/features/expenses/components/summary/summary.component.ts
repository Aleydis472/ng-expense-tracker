import { Component, computed, effect, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { SummaryService } from '../../../../core/services/summary.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartData } from 'chart.js';
import { ExpenseService } from '../../../../core/services/expense.service';

@Component({
  selector: 'app-summary',
  imports: [CommonModule, CurrencyPipe, BaseChartDirective],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export default class SummaryComponent {
  private summaryService = inject(SummaryService);
  private expenseService = inject(ExpenseService);
  private spinner = inject(NgxSpinnerService);

  totalMonthlyExpense: Signal<number> = this.summaryService.totalMonthlyExpense;
  chartData: Signal<ChartData<'pie', number[], string>> = this.summaryService.chartData;
  isLoading = computed(() => this.expenseService.loading());
  selectedCurrency = this.summaryService.selectedCurrency;


  constructor() {
    effect(() => {
      if (this.isLoading()) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

}
