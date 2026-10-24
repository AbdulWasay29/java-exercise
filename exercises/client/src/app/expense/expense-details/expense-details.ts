import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '@app/employee/employee';
import { EXPENSE_DEFAULT } from '@app/constants';
import { Expense } from '@app/expense/expense';

@Component({
  selector: 'app-expense-details',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './expense-details.html',
  styleUrl: './expense-details.scss'
})
export class ExpenseDetails implements OnInit {
  expense = input<Expense>(EXPENSE_DEFAULT);
  employees = input<Employee[]>([]);
  saved = output<Expense>();
  deleted = output<number>();
  closed = output<void>();

  expenseForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    employeeId: new FormControl(0, { nonNullable: true, validators: [Validators.min(1)] }),
    categoryId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl<Date | null>(null, { validators: [Validators.required] }),
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)]
    })
  });

  ngOnInit(): void {
    this.expenseForm.setValue({
      id: this.expense().id,
      employeeId: this.expense().employeeId,
      categoryId: this.expense().categoryId,
      description: this.expense().description,
      date: this.parseLocalDate(this.expense().date),
      amount: this.expense().amount || null
    });
  }

  save(): void {
    const value = this.expenseForm.getRawValue();
    if (!value.date || value.amount === null) {
      return;
    }

    this.saved.emit({
      id: value.id,
      employeeId: value.employeeId,
      categoryId: value.categoryId,
      description: value.description,
      date: this.formatLocalDate(value.date),
      amount: value.amount
    });
  }

  private parseLocalDate(date: string): Date | null {
    const [year, month, day] = date.split('-').map(Number);
    return year && month && day ? new Date(year, month - 1, day) : null;
  }

  private formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
