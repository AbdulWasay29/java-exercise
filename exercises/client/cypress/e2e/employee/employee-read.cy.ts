describe('Employee - Read', () => {
  it('shows Abdul Wasay in the employee list', () => {
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Employees').click();
    cy.wait('@getEmployees');

    cy.get('mat-list-item').should('have.length.at.least', 1);
    cy.get('mat-list-item').should('contain.text', '1 - Abdul, Wasay');
  });
});
