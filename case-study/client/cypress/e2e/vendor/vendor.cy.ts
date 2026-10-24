const vendorName = `Cypress Vendor ${Date.now()}`;
const updatedVendorName = `${vendorName} Updated`;

describe('Vendor - CRUD', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/vendors').as('getVendors');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Vendors').click();
    cy.wait('@getVendors');
  });

  it('reads the vendor list and shows Abdul Wasay', () => {
    cy.get('mat-list').should('contain.text', 'Abdul Wasay');
  });

  it('creates a vendor', () => {
    cy.intercept('POST', '**/api/vendors').as('createVendor');
    cy.get('.add-vendor-btn').click();

    cy.get('input[formcontrolname="name"]').type(vendorName);
    cy.get('input[formcontrolname="address"]').type('100 Cypress Street');
    cy.get('input[formcontrolname="city"]').type('London');
    cy.get('input[formcontrolname="province"]').type('ON');
    cy.get('input[formcontrolname="postalCode"]').type('N1N-1N1');
    cy.get('input[formcontrolname="phone"]').type('(555)555-1234');
    cy.get('input[formcontrolname="type"]').type('Trusted');
    cy.get('input[formcontrolname="email"]').type('cypress@example.com');
    cy.contains('button', 'Save').click();

    cy.wait('@createVendor').its('response.statusCode').should('eq', 200);
    cy.contains(vendorName).should('be.visible');
  });

  it('updates the created vendor', () => {
    cy.intercept('PUT', '**/api/vendors').as('updateVendor');
    cy.contains(vendorName).click();
    cy.get('input[formcontrolname="name"]').clear().type(updatedVendorName);
    cy.contains('button', 'Save').click();

    cy.wait('@updateVendor').its('response.statusCode').should('eq', 200);
    cy.contains(updatedVendorName).should('be.visible');
  });

  it('deletes the updated vendor', () => {
    cy.intercept('DELETE', '**/api/vendors/*').as('deleteVendor');
    cy.contains(updatedVendorName).click();
    cy.contains('button', 'Delete').click();

    cy.wait('@deleteVendor').its('response.body').should('eq', 1);
    cy.contains(updatedVendorName).should('not.exist');
  });
});
