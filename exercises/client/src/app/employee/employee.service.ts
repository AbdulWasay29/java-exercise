import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Employee } from './employee';

interface EmployeeApiResponse extends Omit<Employee, 'id'> {
  id?: number;
  ID?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<EmployeeApiResponse[]>('http://localhost:8080/api/employees').pipe(
      map((employees) => employees.map((employee) => this.toEmployee(employee)))
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const { id, ...employeeFields } = employee;
    return this.http.put<EmployeeApiResponse>('http://localhost:8080/api/employees', {
      ...employeeFields,
      ID: id
    }).pipe(map((response) => this.toEmployee(response)));
  }

  private toEmployee(employee: EmployeeApiResponse): Employee {
    const id = employee.id ?? employee.ID;
    if (id === undefined) {
      throw new Error('Employee API response did not include an ID.');
    }

    return {
      id,
      title: employee.title,
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.phone,
      email: employee.email
    };
  }
}