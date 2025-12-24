class ForgotPasswordPage {
  elements = {
    emailInput: () => cy.get('#email'),
    submitButton: () => cy.get('.btn-block'),
    notificationMessage: () => cy.get('[data-notify="message"]')
  };

  goto() {
    cy.visit('https://sandbox.loyicard.com/en/forgot-password');
  }

  requestPasswordReset(email) {
    this.elements.emailInput().clear().type(email);
    this.elements.submitButton().click();
  }

  assertSuccessMessageVisible() {
    this.elements.notificationMessage()
      .should('be.visible')
      .and('contain.text', 'An account recovery link has been sent to your email.');
  }

  resetPasswordFlow(user) {
    this.requestPasswordReset(user.email);
    this.assertSuccessMessageVisible();
  }
}

export default ForgotPasswordPage;
