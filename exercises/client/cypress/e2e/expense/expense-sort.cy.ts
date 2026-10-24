const expenses = [
  { id: 2, employeeId: 6, categoryId: 'TRAV', description: 'Third date', date: '2023-04-15', amount: 20 },
  { id: 3, employeeId: 1, categoryId: 'MEAL', description: 'First date', date: '2023-04-13', amount: 30 },
  { id: 1, employeeId: 3, categoryId: 'PARK', description: 'Last date', date: '2023-05-19', amount: 10 }
];

describe('Expense table sorting', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/expenses', { body: expenses }).as('getExpenses');
    cy.intercept('GET', '**/api/employees', {
      body: [
        { id: 1, firstName: 'Taylor', lastName: 'Jones' },
        { id: 3, firstName: 'Jordan', lastName: 'Lee' },
        { id: 6, firstName: 'Abdul', lastName: 'Wasay' }
      ]
    }).as('getEmployees');
    cy.visit('/');
    cy.get('button[aria-haspopup="menu"]').click();
    cy.contains('a', 'Expenses').click();
    cy.wait('@getExpenses');
    cy.wait('@getEmployees');
  });

  it('sorts by expense ID', () => {
    cy.contains('th', 'Expense ID').click();
    cy.get('td.mat-column-id').should(($cells) => {
      expect([...$cells].map((cell) => cell.textContent?.trim())).to.deep.equal(['3', '2', '1']);
    });

    cy.contains('th', 'Expense ID').click();
    cy.get('td.mat-column-id').should(($cells) => {
      expect([...$cells].map((cell) => cell.textContent?.trim())).to.deep.equal(['1', '2', '3']);
    });
  });

  it('sorts by employee ID', () => {
    cy.contains('th', 'Employee').click();
    cy.get('td.mat-column-employeeId').should(($cells) => {
      expect([...$cells].map((cell) => cell.textContent?.trim())).to.deep.equal([
        '[#1] Jones',
        '[#3] Lee',
        '[#6] Wasay'
      ]);
    });
  });

  it('sorts by date', () => {
    cy.contains('th', 'Date').click();
    cy.get('td.mat-column-date').should(($cells) => {
      expect([...$cells].map((cell) => cell.textContent?.trim())).to.deep.equal([
        '04/13/2023',
        '04/15/2023',
        '05/19/2023'
      ]);
    });
  });
});
