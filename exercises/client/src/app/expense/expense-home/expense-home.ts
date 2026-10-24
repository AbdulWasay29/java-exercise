import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortHeader, MatSortModule, Sort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Employee } from '@app/employee/employee';
import { EmployeeService } from '@app/employee/employee.service';
import { EXPENSE_DEFAULT } from '@app/constants';
import { Expense } from '@app/expense/expense';
import { ExpenseService } from '@app/expense/expense.service';
import { ExpenseDetails } from '@app/expense/expense-details/expense-details';

@Component({
  selector: 'app-expense-home',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSortHeader,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    ExpenseDetails
  ],
  templateUrl: './expense-home.html',
  styleUrl: './expense-home.scss'
})
export class ExpenseHome implements OnInit {
  readonly tableColumns = ['id', 'employeeId', 'date'];
  readonly expensesTable = new MatTableDataSource<Expense>();
  readonly employees = signal<Employee[]>([]);
  readonly expenseInDetail = signal<Expense>(EXPENSE_DEFAULT);
  readonly newExpense = signal(false);

  constructor(
    public expenseService: ExpenseService,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loadExpenses();
    this.loadEmployees();
    this.expenseInDetail.set(EXPENSE_DEFAULT);
    this.newExpense.set(false);
  }

  loadExpenses(): void {
    this.expenseService.getAll().subscribe({
      next: (expenses: Expense[]) => this.expensesTable.data = expenses,
      error: (error: Error) => console.error(error)
    });
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (employees: Employee[]) => this.employees.set(employees),
      error: (error: Error) => console.error(error)
    });
  }

  employeeOfId(employeeId: number): Employee | undefined {
    return this.employees().find((employee) => employee.id === employeeId);
  }

  sortExpenses(sort: Sort): void {
    if (!sort.direction) {
      return;
    }

    const columnToSortingFunction = {
      id: (a: Expense, b: Expense) => sort.direction === 'asc' ? a.id - b.id : b.id - a.id,
      employeeId: (a: Expense, b: Expense) =>
        sort.direction === 'asc' ? a.employeeId - b.employeeId : b.employeeId - a.employeeId,
      date: (a: Expense, b: Expense) =>
        sort.direction === 'asc'
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date)
    };

    if (sort.active !== 'id' && sort.active !== 'employeeId' && sort.active !== 'date') {
      return;
    }

    this.expensesTable.data = [...this.expensesTable.data].sort(columnToSortingFunction[sort.active]);
  }

  expenseDate(date: string): Date | null {
    const [year, month, day] = date.split('-').map(Number);
    return year && month && day ? new Date(year, month - 1, day) : null;
  }

  selectExpense(expense: Expense): void {
    this.expenseInDetail.set(expense);
    this.newExpense.set(false);
  }

  hasSelectedExpense(): boolean {
    return this.expenseInDetail().id > 0 || this.newExpense();
  }

  addNewExpense(): void {
    this.expenseInDetail.set(EXPENSE_DEFAULT);
    this.newExpense.set(true);
  }

  saveExpense(expense: Expense): void {
    if (this.newExpense()) {
      this.createExpense(expense);
    } else {
      this.updateExpense(expense);
    }
  }

  updateExpense(expense: Expense): void {
    this.expenseService.update(expense).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }

  createExpense(expense: Expense): void {
    this.expenseService.create(expense).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }

  deleteExpense(id: number): void {
    this.expenseService.delete(id).subscribe({
      next: (deletedCount: number) => console.log(`${deletedCount} deleted`),
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }
}
