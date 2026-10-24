describe('Expense - Update', () => {
  it('updates an expense date', () => {
    const description = `Update expense ${Date.now()}`;
    cy.intercept('GET', '**/api/expenses').as('getExpenses');
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.intercept('POST', '**/api/expenses').as('createExpense');
    cy.intercept('PUT', '**/api/expenses').as('updateExpense');
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
    cy.get('input[formcontrolname="amount"]').type('200');
    cy.get('input[formcontrolname="date"]').type('10/10/2025');
    cy.contains('button', 'Save').click();
    cy.wait('@createExpense');
    cy.get('table').contains('10/10/2025').click();

    cy.get('input[formcontrolname="date"]').clear().type('11/11/2025');
    cy.contains('button', 'Save').click();
    cy.wait('@updateExpense').its('response.statusCode').should('eq', 200);
    cy.get('table').should('contain.text', '11/11/2025');

    cy.get('table').contains('11/11/2025').click();
    cy.get('input[formcontrolname="description"]').should('have.value', description);
    cy.contains('button', 'Delete').click();
    cy.wait('@deleteExpense').its('response.body').should('eq', 1);
  });
});
