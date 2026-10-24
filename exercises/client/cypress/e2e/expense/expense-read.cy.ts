describe('Expense - Read', () => {
  it('shows an expense associated with Abdul Wasay', () => {
    cy.intercept('GET', '**/api/expenses').as('getExpenses');
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Expenses').click();
    cy.wait('@getExpenses');
    cy.wait('@getEmployees');

    cy.get('table').should('contain.text', 'Wasay');
  });
});
