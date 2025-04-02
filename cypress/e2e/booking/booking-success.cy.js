describe('Booking Form - Success', () => {
    beforeEach(() => {
        // Need to be logged in to make a booking
        cy.request({
            method: 'POST',
            url: `https://stayawhileapi-l5rb.onrender.com/auth/login`,
            body: {
                email: 'davidhasselhoff@hotmail.com',
                password: 'Passord123'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            window.localStorage.setItem('token', response.body.token);
            window.localStorage.setItem('userId', response.body.user.id);
        });

        cy.visit('http://localhost:5173/cabin/67e69e63aeb6e4e034e5a660');
    });

    it('should allow a successful booking', () => {
        // Choose check in and out date
        cy.get('input[placeholder="Check in date"]').click().type('10/06/2025{enter}');
        cy.get('input[placeholder="Checkout date"]').click().type('15/06/2025{enter}');

        cy.get('button').contains('Book Now').click();

        // Verify toast success
        cy.get('.Toastify__toast').should('be.visible');
        cy.contains('Booking successful!').should('be.visible');
    });
});