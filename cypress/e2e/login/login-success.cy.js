describe('Login - Frontend Validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('should show validation errors for all invalid inputs', () => {
        cy.get('input[name="email"]').type('davidhasselhoff@hotmail.com'); // Valid mail
        cy.get('input[name="password"]').type('Passord123'); // Valid password

        cy.get('button[type="submit"]').click();
    });
});