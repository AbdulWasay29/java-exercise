import { Component, InputSignal, OnInit, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../employee';
import { EMPLOYEE_DEFAULT } from '../../constants';

@Component({
  selector: 'app-employee-details',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.scss'
})
export class EmployeeDetails implements OnInit {
  employee: InputSignal<Employee> = input<Employee>(EMPLOYEE_DEFAULT);
  saved = output<Employee>();
  closed = output<void>();

  employeeForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    title: new FormControl('', { nonNullable: true }),
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true })
  });

  ngOnInit(): void {
    this.employeeForm.setValue(this.employee());
  }

  save(): void {
    this.saved.emit(this.employeeForm.getRawValue());
  }
}
