class LoginPage {
  // Locators
  emailInput() {
    return cy.get('#email');
  }

  passwordInput() {
    return cy.get('#password');
  }

  loginButton() {
    return cy.get('.btn-block');
  }

  dashboardHeader() {
    return cy.get('h1.font-size-h2.mb-2');
  }

  logoutButton() {
    return cy.get('#mLogout');
  }

  // Actions
  goto() {
    cy.visit('https://sandbox.loyicard.com/en/login');
  }

  login(email, password) {
    this.emailInput().clear().type(email);
    this.passwordInput().clear().type(password);
    this.loginButton().click();
  }

  assertDashboardVisible() {
    this.dashboardHeader().should('be.visible');
  }

  logout() {
    this.logoutButton().click();
  }

  assertLoginButtonVisible() {
    this.loginButton().contains('Login').should('be.visible');
  }

  loginAndLogout(user) {
    this.login(user.email, user.password);
    this.assertDashboardVisible();
    this.logout();
    this.assertLoginButtonVisible();
  }
}

export default LoginPage;
