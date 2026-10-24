const employees = [
  { id: 6, title: 'Mr.', firstName: 'Abdul', lastName: 'Wasay', phone: '555-5555', email: 'student@example.com' }
];

const expenses = [
  { id: 1, employeeId: 6, categoryId: 'TRAV', description: 'Bus to Fanshawe', date: '2025-09-21', amount: 50 },
  { id: 2, employeeId: 6, categoryId: 'MEAL', description: 'Lunch', date: '2025-09-22', amount: 25 }
];

describe('Report Generator', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/employees', { body: employees }).as('getEmployees');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Generator').click();
    cy.wait('@getEmployees');
  });

  it('loads expenses, adds and removes them, then creates a report', () => {
    cy.intercept('GET', '**/api/expenses/6', { body: expenses }).as('getEmployeeExpenses');
    cy.intercept('POST', '**/api/reports', {
      statusCode: 200,
      body: {
        ID: 15,
        employeeId: 6,
        items: [
          { id: 1, reportId: 15, expenseId: 1 },
          { id: 2, reportId: 15, expenseId: 2 }
        ],
        date: '2026-10-24@10:00:00'
      }
    }).as('createReport');

    cy.get('mat-select[formcontrolname="employeeId"]').click();
    cy.get('mat-option').contains('Abdul Wasay').click();
    cy.wait('@getEmployeeExpenses');
    cy.get('mat-select[formcontrolname="expenseId"]').click();
    cy.get('mat-option').contains('Bus to Fanshawe').click();
    cy.contains('button', 'Add').click();
    cy.get('table').should('contain.text', 'Bus to Fansha').and('contain.text', '$50.00');

    cy.get('mat-select[formcontrolname="expenseId"]').click();
    cy.get('mat-option').contains('Lunch').click();
    cy.contains('button', 'Add').click();
    cy.get('table').should('contain.text', '$75.00');

    cy.contains('button', 'Remove').click();
    cy.get('table').should('not.contain.text', 'Lunch').and('contain.text', '$50.00');
    cy.contains('button', 'Add').click();
    cy.contains('button', 'Save Report').click();

    cy.wait('@createReport').then(({ request, response }) => {
      expect(request.body.employeeId).to.equal(6);
      expect(request.body.items.map((item: { expenseId: number }) => item.expenseId)).to.deep.equal([1, 2]);
      expect(response?.statusCode).to.equal(200);
    });
    cy.contains('Report #15 created at 2026-10-24@10:00:00').should('be.visible');
    cy.get('table').should('not.exist');
  });

  it('shows an empty state when the selected employee has no expenses', () => {
    cy.intercept('GET', '**/api/expenses/6', { body: [] }).as('getEmployeeExpenses');
    cy.get('mat-select[formcontrolname="employeeId"]').click();
    cy.get('mat-option').contains('Abdul Wasay').click();
    cy.wait('@getEmployeeExpenses');

    cy.contains('No Expenses').should('be.visible');
    cy.get('mat-select[formcontrolname="expenseId"]').should('not.exist');
  });
});
