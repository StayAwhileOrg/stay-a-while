describe('Register - Frontend Validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/register');
    });

    it('should show validation errors for all invalid inputs', () => {
        cy.get('input[name="email"]').type('davidemail.com'); // Invalid email
        cy.get('input[name="imgUrl"]').type('invalidurl.jpg'); // Invalid URL
        cy.get('input[name="phone"]').type('123456789'); // Invalid numnber // 12345678 is already in use

        cy.get('button[type="submit"]').click();

        // Check the error validation messages
        cy.get('p.text-red-500').should('contain', 'Invalid email');
        cy.get('p.text-red-500').should('contain', 'Enter a valid image URL (png, jpg, jpeg, gif, webp)');
        cy.get('p.text-red-500').should('contain', 'Password is required');
        cy.get('p.text-red-500').should('contain', 'Invalid phone number');

        cy.url().should('include', '/register');
    });
});

