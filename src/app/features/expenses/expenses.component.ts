import { Component } from '@angular/core';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseModalComponent } from './components/expense-modal/expense-modal.component';
import SummaryComponent from './components/summary/summary.component';


@Component({
  selector: 'app-expenses',
  imports: [ExpenseListComponent, ExpenseModalComponent, SummaryComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export default class ExpensesComponent {


}
