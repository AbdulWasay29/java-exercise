const productId = `cypress-${Date.now()}`;
const productName = `Cypress Product ${Date.now()}`;
const updatedProductName = `${productName} Updated`;

const product = {
  id: productId,
  vendorId: 4,
  name: productName,
  cost: 12.5,
  msrp: 19.99,
  rop: 5,
  eoq: 10,
  qoh: 20,
  qoo: 2
};

describe('Product - CRUD', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/products').as('getProducts');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Products').click();
    cy.wait('@getProducts');
  });

  it('reads the product list', () => {
    cy.get('table').should('contain.text', 'Abdul Wasay Product');
  });

  it('creates a product', () => {
    cy.intercept('POST', '**/api/products').as('createProduct');
    cy.get('.add-product-btn').click();
    cy.get('input[formcontrolname="id"]').type(product.id);
    cy.get('mat-select[formcontrolname="vendorId"]').click();
    cy.get('mat-option').contains('Abdul Wasay').click();
    cy.get('input[formcontrolname="name"]').type(product.name);
    cy.get('input[formcontrolname="cost"]').type(product.cost.toString());
    cy.get('input[formcontrolname="msrp"]').type(product.msrp.toString());
    cy.get('mat-expansion-panel-header').contains('Inventory Information').click();
    cy.get('input[formcontrolname="rop"]').type(product.rop.toString());
    cy.get('input[formcontrolname="eoq"]').type(product.eoq.toString());
    cy.get('input[formcontrolname="qoh"]').type(product.qoh.toString());
    cy.get('input[formcontrolname="qoo"]').type(product.qoo.toString());
    cy.contains('button', 'Save').click();

    cy.wait('@createProduct').its('response.statusCode').should('eq', 200);
    cy.get('table').should('contain.text', product.name);
  });

  it('updates a product', () => {
    cy.request('POST', 'http://localhost:8080/api/products', product);
    cy.contains('tr', product.id).click();
    cy.get('input[formcontrolname="name"]').clear().type(updatedProductName);
    cy.contains('button', 'Save').click();

    cy.get('table').should('contain.text', updatedProductName);
    cy.request('DELETE', `http://localhost:8080/api/products/${product.id}`);
  });

  it('deletes a product', () => {
    cy.request('POST', 'http://localhost:8080/api/products', product);
    cy.intercept('GET', '**/api/products').as('refreshProducts');
    cy.reload();
    cy.wait('@refreshProducts');
    cy.intercept('DELETE', `**/api/products/${product.id}`).as('deleteProduct');
    cy.contains('tr', product.id).click();
    cy.contains('button', 'Delete').click();

    cy.wait('@deleteProduct').its('response.body').should('eq', 1);
    cy.get('table').should('not.contain.text', product.id);
  });
});
