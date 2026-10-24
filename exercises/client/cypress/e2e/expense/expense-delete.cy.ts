describe('Expense - Delete', () => {
  it('deletes an expense', () => {
    const description = `Delete expense ${Date.now()}`;
    cy.intercept('GET', '**/api/expenses').as('getExpenses');
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.intercept('POST', '**/api/expenses').as('createExpense');
    cy.intercept('DELETE', '**/api/expenses/*').as('deleteExpense');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Expenses').click();
    cy.wait('@getExpenses');
    cy.wait('@getEmployees');
    cy.get('.add-expense-btn').click();
    cy.get('mat-select[formcontrolname="employeeId"]').click();
    cy.get('mat-option').contains('Abdul Wasay').click();
    cy.get('mat-select[formcontrolname="categoryId"]').click();
    cy.get('mat-option').contains('Travel').click();
    cy.get('input[formcontrolname="description"]').type(description);
    cy.get('input[formcontrolname="amount"]').type('50');
    cy.get('input[formcontrolname="date"]').type('12/12/2025');
    cy.contains('button', 'Save').click();
    cy.wait('@createExpense');
    cy.get('table').contains('12/12/2025').click();
    cy.get('input[formcontrolname="description"]').should('have.value', description);
    cy.contains('button', 'Delete').click();

    cy.wait('@deleteExpense').its('response.body').should('eq', 1);
    cy.get('table').should('not.contain.text', description);
  });
});
