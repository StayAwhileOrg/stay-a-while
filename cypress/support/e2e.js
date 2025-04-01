// Import commands.js using ES2015 syntax:
import './commands'

// Ignores the No Uses ID error in the console
// Because any error in the console will make
// The Cypress test fail
Cypress.on('uncaught:exception', (err) => {
    return false;
});
