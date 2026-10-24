import { Routes } from '@angular/router';
import { Home } from '@app/home/home';
import { EmployeeHome } from '@app/employee/employee-home/employee-home';

export const routes: Routes = [
  { path: '', component: Home, },

  // TODO: Replace Home for EmployeeHome component once its created
  { path: '', component: Home, },
   { path: 'employees', component: EmployeeHome }
];