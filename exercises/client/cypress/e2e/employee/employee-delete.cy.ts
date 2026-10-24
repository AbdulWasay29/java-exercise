describe('Employee - Delete', () => {
  it('deletes an employee', () => {
    const firstName = `Delete${Date.now()}`;
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.intercept('POST', '**/api/employees').as('createEmployee');
    cy.intercept('DELETE', '**/api/employees/*').as('deleteEmployee');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Employees').click();
    cy.wait('@getEmployees');
    cy.get('.add-employee-btn').click();

    cy.get('input[formcontrolname="title"]').type('Mr.');
    cy.get('input[formcontrolname="firstName"]').type(firstName);
    cy.get('input[formcontrolname="lastName"]').type('Cypress');
    cy.get('input[formcontrolname="phone"]').type('(555)555-1234');
    cy.get('input[formcontrolname="email"]').type('delete@example.com');
    cy.contains('button', 'Save').click();
    cy.wait('@createEmployee');
    cy.get('mat-list').contains(firstName).click();
    cy.contains('button', 'Delete').click();

    cy.wait('@deleteEmployee').its('response.body').should('eq', 1);
    cy.get('mat-list').should('not.contain.text', firstName);
  });
});
