import LoginPage from '../../pages/Auth/LoginPage';

describe('Sign In Happy Flow', () => {
  const users = require('../../fixtures/loginData_loyi.json');

  users.forEach((user, index) => {
    it(`Login test for user ${index + 1}`, () => {
      const loginPage = new LoginPage();

      loginPage.goto();
      loginPage.loginAndLogout(user);
    });
  });
});
