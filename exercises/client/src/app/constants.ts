import { Employee } from '@app/employee/employee';
import { Expense } from '@app/expense/expense';

export const EMPLOYEE_DEFAULT: Employee = {
  id: 0,
  title: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: ''
};

export const EXPENSE_DEFAULT: Expense = {
  id: 0,
  employeeId: 0,
  categoryId: '',
  description: '',
  date: '',
  amount: 0
};
