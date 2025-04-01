describe('Booking Form - Failure', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/cabin/67e69e63aeb6e4e034e5a660'); // For a specific cabin
    });

    it('should show error message if dates are missing', () => {
        // Book without choosing date
        cy.get('button').contains('Book Now').click();

        cy.get('.Toastify__toast').should('be.visible');
    });
});
