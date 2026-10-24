describe('Expense required validation', () => {
  it('requires employee, category, description, amount, and date for a new expense', () => {
    cy.intercept('GET', '**/api/expenses').as('getExpenses');
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Expenses').click();
    cy.wait('@getExpenses');
    cy.wait('@getEmployees');
    cy.get('.add-expense-btn').click();

    cy.get('mat-select[formcontrolname="employeeId"]').focus().blur();
    cy.get('mat-select[formcontrolname="categoryId"]').focus().blur();
    cy.get('input[formcontrolname="description"]').focus().blur();
    cy.get('input[formcontrolname="amount"]').focus().blur();
    cy.get('input[formcontrolname="date"]').focus().blur();

    cy.contains('Employee is required').should('be.visible');
    cy.contains('Category is required').should('be.visible');
    cy.contains('Description is required').should('be.visible');
    cy.contains('Amount is required').should('be.visible');
    cy.contains('Date is required').should('be.visible');
    cy.contains('button', 'Save').should('be.disabled');
  });
});
