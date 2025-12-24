// Custom command for login
Cypress.Commands.add('login_loyi', (email, password) => {
  cy.visit('https://sandbox.loyicard.com/en/login')
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('.btn-block').click()
})