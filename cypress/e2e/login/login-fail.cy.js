describe('Login - Frontend Validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('should show validation errors for all invalid inputs', () => {
        cy.get('input[name="email"]').type('davidemail.com'); // Invalid email

        cy.get('button[type="submit"]').click();

        // Check the error validation messages
        cy.get('p.text-red-500').should('contain', 'Invalid email');
        cy.get('p.text-red-500').should('contain', 'Password is required');

        cy.url().should('include', '/login');
    });
});