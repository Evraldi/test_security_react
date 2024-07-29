describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.wait(1000);
  });

  it('should display built-in validation error for invalid email', () => {
    cy.get('input[type="email"]').type('invalid-email');
    cy.wait(1000);

    cy.get('form').submit();
    cy.wait(1000);

    cy.get('input[type="email"]').then(($input) => {
  
      const validationMessage = $input[0].validationMessage;
      expect(validationMessage).to.include('Please include an \'@\'');
    });
  });

  it('should submit the form successfully with valid inputs', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: { message: 'Registration successful' }
    }).as('registerUser');

    cy.get('input[type="email"]').type('testaaaa@example.commmm');
    cy.wait(1000);
    cy.get('input[type="text"]').type('validnaaameaa');
    cy.wait(1000);
    cy.get('input[type="password"]').type('ValidPass123!');
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    cy.wait('@registerUser').its('response.statusCode').should('eq', 200);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registration successful');
    });
  });

  it('should display error message on registration failure', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400,
      body: { msg: 'Registration failed' }
    }).as('registerUserFail');

    cy.get('input[type="email"]').type('test@example.com');
    cy.wait(1000);
    cy.get('input[type="text"]').type('validname');
    cy.wait(1000);
    cy.get('input[type="password"]').type('ValidPass123!');
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    cy.wait('@registerUserFail').its('response.statusCode').should('eq', 400);
    cy.get('p').should('contain', 'Registration failed: Registration failed');
  });
});
