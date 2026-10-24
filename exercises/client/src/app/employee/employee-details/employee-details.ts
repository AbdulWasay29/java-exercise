import { Component, InputSignal, OnInit, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatError, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../employee';
import { EMPLOYEE_DEFAULT } from '../../constants';
import { ValidatePhone } from '../../validators/phone.validator';

@Component({
  selector: 'app-employee-details',
  imports: [ReactiveFormsModule, MatButtonModule, MatError, MatFormFieldModule, MatInputModule, MatLabel],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.scss'
})
export class EmployeeDetails implements OnInit {
  employee: InputSignal<Employee> = input<Employee>(EMPLOYEE_DEFAULT);
  saved = output<Employee>();
  closed = output<void>();
  deleted = output<number>();

  employeeForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, ValidatePhone] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  });

  ngOnInit(): void {
    this.employeeForm.setValue(this.employee());
  }

  save(): void {
    this.saved.emit(this.employeeForm.getRawValue());
  }
}
