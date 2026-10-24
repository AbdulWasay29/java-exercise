describe('Employee - Create', () => {
  it('creates an employee', () => {
    const firstName = `Cypress${Date.now()}`;
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.intercept('POST', '**/api/employees').as('createEmployee');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Employees').click();
    cy.wait('@getEmployees');
    cy.get('.add-employee-btn').click();

    cy.get('input[formcontrolname="title"]').type('Mr.');
    cy.get('input[formcontrolname="firstName"]').type(firstName);
    cy.get('input[formcontrolname="lastName"]').type('Cypress');
    cy.get('input[formcontrolname="phone"]').type('(555)555-1234');
    cy.get('input[formcontrolname="email"]').type('cypress@example.com');
    cy.contains('button', 'Save').click();

    cy.wait('@createEmployee').its('response.statusCode').should('eq', 200);
    cy.get('mat-list').should('contain.text', firstName);

    cy.intercept('DELETE', '**/api/employees/*').as('deleteCreatedEmployee');
    cy.get('mat-list').contains(firstName).click();
    cy.contains('button', 'Delete').click();
    cy.wait('@deleteCreatedEmployee').its('response.body').should('eq', 1);
  });
});
