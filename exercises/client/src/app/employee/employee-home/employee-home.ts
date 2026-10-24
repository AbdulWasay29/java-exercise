import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeDetails } from '../employee-details/employee-details';
import { EMPLOYEE_DEFAULT } from '../../constants';

@Component({
  selector: 'app-employee-home',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTooltipModule, EmployeeDetails],
  templateUrl: './employee-home.html',
  styleUrl: './employee-home.scss'
})
export class EmployeeHome implements OnInit {
  employees = signal<Employee[]>([]);
  employeeInDetail = signal<Employee>(EMPLOYEE_DEFAULT);
  newEmployee = signal(false);

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.employeeService.getEmployees().subscribe({
      next: (payload: Employee[]) => this.employees.set(payload),
      error: (error: Error) => console.error(error),
      complete: () => this.selectEmployee(EMPLOYEE_DEFAULT)
    });
  }

  selectEmployee(employee: Employee): void {
    this.employeeInDetail.set(employee);
    this.newEmployee.set(false);
  }

  hasEmployeeSelected(): boolean {
    return this.employeeInDetail().id > 0 || this.newEmployee();
  }

  addNewEmployee(): void {
    this.employeeInDetail.set(EMPLOYEE_DEFAULT);
    this.newEmployee.set(true);
  }

  saveEmployee(employee: Employee): void {
    if (this.newEmployee()) {
      this.createEmployee(employee);
    } else {
      this.updateEmployee(employee);
    }
  }

  updateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }

  createEmployee(employee: Employee): void {
    this.employeeService.createEmployee(employee).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (deletedCount: number) => console.log(`${deletedCount} deleted`),
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }
}