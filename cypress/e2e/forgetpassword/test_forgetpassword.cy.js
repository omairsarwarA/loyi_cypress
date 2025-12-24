import ForgotPasswordPage from '../../pages/ForgetPassword/ForgotPasswordPage';

describe('Forget Password Happy Flow', () => {
  beforeEach(() => {
    cy.fixture('forgetpasswordEmail').as('users');
  });

  it('Forget Password - Multiple Users', function () {
    this.users.forEach((user, index) => {
      cy.log(`Running test for User ${index + 1}`);

      const forgotPasswordPage = new ForgotPasswordPage();
      forgotPasswordPage.goto();
      forgotPasswordPage.resetPasswordFlow(user);
    });
  });
});
