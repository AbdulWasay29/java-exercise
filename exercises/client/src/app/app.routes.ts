import { Routes } from '@angular/router';
import { Home } from '@app/home/home';
import { EmployeeHome } from '@app/employee/employee-home/employee-home';
import { ExpenseHome } from '@app/expense/expense-home/expense-home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'employees', component: EmployeeHome },
  { path: 'expenses', component: ExpenseHome }
];