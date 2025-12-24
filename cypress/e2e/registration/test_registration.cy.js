import RegisterPage from '../../pages/Auth/RegisterPage';

describe('Merchant Sign Up Happy Flow', () => {
  const users = require('../../fixtures/registrationData_loyi.json');

  users.forEach((user, index) => {
    it(`Merchant Sign Up Flow - User ${index + 1}`, () => {
      const registerPage = new RegisterPage();

      registerPage.goto();
      registerPage.fillRegistrationForm(user);
      registerPage.acceptTermsAndSubmit();

      // Optional: Add assertion after submission
      // cy.url().should('include', '/dashboard');
    });
  });
});
