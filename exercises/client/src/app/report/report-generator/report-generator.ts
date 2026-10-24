import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Employee } from '@app/employee/employee';
import { EmployeeService } from '@app/employee/employee.service';
import { Expense } from '@app/expense/expense';
import { ExpenseService } from '@app/expense/expense.service';
import { Report } from '@app/report/report';
import { ReportService } from '@app/report/report.service';

@Component({
  selector: 'app-report-generator',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './report-generator.html',
  styleUrl: './report-generator.scss'
})
export class ReportGenerator implements OnInit, OnDestroy {
  constructor(
    protected employeeService: EmployeeService,
    protected expenseService: ExpenseService,
    protected reportService: ReportService
  ) {}

  readonly employees = signal<Employee[]>([]);
  readonly employeeExpenses = signal<Expense[]>([]);
  readonly reportCreatedMessage = signal('');
  readonly tableColumns = ['date', 'description', 'amount'];
  readonly reportTable = new MatTableDataSource<Expense>();
  readonly reportForm = new FormGroup({
    employeeId: new FormControl(0, { nonNullable: true }),
    expenseId: new FormControl(0, { nonNullable: true })
  });

  private expensesRequest?: Subscription;

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: (employees: Employee[]) => this.employees.set(employees),
      error: (error: Error) => console.error(error)
    });
  }

  ngOnDestroy(): void {
    this.expensesRequest?.unsubscribe();
  }

  selectedEmployeeId(): number {
    return this.reportForm.controls.employeeId.value;
  }

  selectedExpenseId(): number {
    return this.reportForm.controls.expenseId.value;
  }

  onEmployeeSelectionChange(selection: MatSelectChange): void {
    const employeeId = Number(selection.value);
    this.reportForm.controls.employeeId.setValue(employeeId);
    this.reportForm.controls.expenseId.setValue(0);
    this.reportTable.data = [];
    this.employeeExpenses.set([]);
    this.reportCreatedMessage.set('');
    this.expensesRequest?.unsubscribe();

    if (employeeId <= 0) {
      return;
    }

    this.expensesRequest = this.expenseService.getAllById(employeeId).subscribe({
      next: (expenses: Expense[]) => this.employeeExpenses.set(expenses),
      error: (error: Error) => console.error(error)
    });
  }

  expenseAlreadyAdded(): boolean {
    return this.reportTable.data.some((expense) => expense.id === this.selectedExpenseId());
  }

  reportTotal(): number {
    return this.reportTable.data.reduce((total, expense) => total + expense.amount, 0);
  }

  addExpense(): void {
    const selectedExpense = this.employeeExpenses().find(
      (expense) => expense.id === this.selectedExpenseId()
    );
    if (selectedExpense && !this.expenseAlreadyAdded()) {
      this.reportTable.data = [...this.reportTable.data, selectedExpense];
    }
  }

  removeExpense(): void {
    this.reportTable.data = this.reportTable.data.filter(
      (expense) => expense.id !== this.selectedExpenseId()
    );
  }

  expenseDate(date: string): Date | null {
    const [year, month, day] = date.split('-').map(Number);
    return year && month && day ? new Date(year, month - 1, day) : null;
  }

  saveReport(): void {
    if (this.selectedEmployeeId() <= 0 || this.reportTable.data.length === 0) {
      return;
    }

    const report: Report = {
      id: 0,
      employeeId: this.selectedEmployeeId(),
      items: this.reportTable.data.map((expense) => ({
        id: 0,
        reportId: 0,
        expenseId: expense.id
      })),
      date: ''
    };

    this.reportService.create(report).subscribe({
      next: (createdReport: Report) => {
        const reportId = createdReport.id ?? createdReport.ID;
        if (reportId === undefined) {
          console.error('The report response did not include an ID.', createdReport);
          return;
        }

        this.reportForm.reset({ employeeId: 0, expenseId: 0 });
        this.reportTable.data = [];
        this.employeeExpenses.set([]);
        this.reportCreatedMessage.set(
          `Report #${reportId} created at ${createdReport.date}`
        );
      },
      error: (error: Error) => console.error(error)
    });
  }
}
