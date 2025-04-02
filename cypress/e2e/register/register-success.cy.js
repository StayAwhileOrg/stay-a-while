describe('Go to register page', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', () => false);
        cy.visit('http://localhost:5173/register');

        // Mock API-response
        cy.intercept('POST', 'https://stayawhileapi-l5rb.onrender.com/auth/register', {
            statusCode: 201,
            body: { message: 'User registered successfully (mocked response)' }
        }).as('registerRequest');
    });

    it('should fill out the form and test submission without real registration', () => {
        cy.get('input[name="firstName"]').type('David').should('have.value', 'David');
        cy.get('input[name="lastName"]').type('Hasselhoff').should('have.value', 'Hasselhoff');
        cy.get('input[name="email"]').type('davidhasselhoff@hotmail.com').should('have.value', 'davidhasselhoff@hotmail.com');
        cy.get('input[name="phone"]').type('94239393').should('have.value', '94239393');
        cy.get('input[name="imgUrl"]').type('https://i.imghippo.com/files/QfGt4917aI.webp').should('have.value', 'https://i.imghippo.com/files/QfGt4917aI.webp');
        cy.get('input[name="bio"]').type('Liker å kode!').should('have.value', 'Liker å kode!');
        cy.get('input[name="password"]').type('Passord123').should('have.value', 'Passord123');

        cy.get('button[type="submit"]').click();

        cy.wait('@registerRequest').its('response.statusCode').should('eq', 201);
    });
});
