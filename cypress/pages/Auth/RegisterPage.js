class RegisterPage {
  // Locators
  firstNameInput() {
    return cy.get('#first_name');
  }

  lastNameInput() {
    return cy.get('#last_name');
  }

  emailInput() {
    return cy.get('#email');
  }

  passwordInput() {
    return cy.get('#password');
  }

  phoneInput() {
    return cy.get('#phone');
  }

  companyInput() {
    return cy.get('#company');
  }

  termsCheckbox() {
    return cy.get('.custom-control-label');
  }

  submitButton() {
    return cy.contains('button', 'Register');
  }

  // Actions
  goto() {
    cy.visit('https://sandbox.loyicard.com/en/register');
  }

  fillRegistrationForm(user) {
    this.firstNameInput().clear().type(user.firstName);
    this.lastNameInput().clear().type(user.lastName);
    this.emailInput().clear().type(user.email);
    this.passwordInput().clear().type(user.password);
    this.phoneInput().clear().type(user.phone);
    this.companyInput().clear().type(user.company);
  }

  acceptTermsAndSubmit() {
    this.termsCheckbox().click({ multiple: true , force: true });
    // Avoid fixed waits; Cypress automatically retries commands
    this.submitButton().click({ force: true });
  }
}

export default RegisterPage;
