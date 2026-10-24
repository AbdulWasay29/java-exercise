import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule} from '@angular/material/list';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeDetails } from '../employee-details/employee-details';
import { EMPLOYEE_DEFAULT } from '../../constants';

@Component({
  selector: 'app-employee-home',
  imports: [MatCardModule, MatListModule, EmployeeDetails],
  templateUrl: './employee-home.html',
  styleUrl: './employee-home.scss'
})
export class EmployeeHome implements OnInit {
  employees = signal<Employee[]>([]);
  employeeInDetail = signal<Employee>(EMPLOYEE_DEFAULT);

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
  }

  hasEmployeeSelected(): boolean {
    return this.employeeInDetail().id > 0;
  }

  updateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }
}