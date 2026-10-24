describe('Employee - Update', () => {
  it('updates an employee', () => {
    const firstName = `Update${Date.now()}`;
    const updatedFirstName = `${firstName}Changed`;
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.intercept('POST', '**/api/employees').as('createEmployee');
    cy.intercept('PUT', '**/api/employees').as('updateEmployee');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Employees').click();
    cy.wait('@getEmployees');
    cy.get('.add-employee-btn').click();

    cy.get('input[formcontrolname="title"]').type('Mr.');
    cy.get('input[formcontrolname="firstName"]').type(firstName);
    cy.get('input[formcontrolname="lastName"]').type('Cypress');
    cy.get('input[formcontrolname="phone"]').type('(555)555-1234');
    cy.get('input[formcontrolname="email"]').type('update@example.com');
    cy.intercept('DELETE', '**/api/employees/*').as('deleteUpdatedEmployee');
    cy.contains('button', 'Save').click();
    cy.wait('@createEmployee');
    cy.get('mat-list').contains(firstName).click();

    cy.get('input[formcontrolname="firstName"]').clear().type(updatedFirstName);
    cy.contains('button', 'Save').click();
    cy.wait('@updateEmployee').its('response.statusCode').should('eq', 200);
    cy.get('mat-list').should('contain.text', updatedFirstName);

    cy.get('mat-list').contains(updatedFirstName).click();
    cy.contains('button', 'Delete').click();
    cy.wait('@deleteUpdatedEmployee').its('response.body').should('eq', 1);
  });
});
