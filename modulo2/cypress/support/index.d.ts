declare namespace Cypress {
    interface Chainable<Subject> {
        /* Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })*/
        getByTestId(selector: any): Chainable<any>
        addToCart(mode: any): Chainable<any>
  }
}