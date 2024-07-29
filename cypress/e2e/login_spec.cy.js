describe('Login Page Tests', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('should display the login form', () => {
      cy.get('form').should('be.visible');
    });
  
    it('should allow a user to login with valid credentials', () => {
      cy.intercept('POST', 'api/auth/login', { statusCode: 200 }).as('loginRequest');
      
      cy.get('input[name="email"]').type('untuktest@gmail.com');
      cy.get('input[name="password"]').type('Untuktest@gmail.com');
      cy.get('button[type="submit"]').click();
      
      cy.wait(1000);
  
      cy.wait('@loginRequest').then((interception) => {
        assert.equal(interception.response.statusCode, 200, 'Login request should succeed');
      });
    });
  
    it('should show an error message for invalid credentials', () => {
      cy.intercept('POST', 'api/auth/login', { 
        statusCode: 401, 
        body: { message: 'Invalid username or password' } 
      }).as('loginRequest');
      
      cy.get('input[name="email"]').type('wronguser@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      cy.wait(1000);
      
      cy.wait('@loginRequest').then(() => {
        cy.get('p').should('contain', 'Invalid username or password');
      });
    });
  });
  