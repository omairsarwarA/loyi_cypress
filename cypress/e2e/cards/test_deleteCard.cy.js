import LoginPage from '../../pages/Auth/LoginPage';
import DeleteCard from '../../pages/Cards/DeleteCard';
import CreateCard from '../../pages/Cards/CreateCard';

const user = require('../../fixtures/loginData_loyi.json')[0];
const cardName = require('../../fixtures/cardname.json')[0];


describe('Delete Card Flow', () => {
  it('should delete an existing card', () => {
    const loginPage = new LoginPage();
    const cardCreation = new CreateCard();
    const deleteCard = new DeleteCard();


    loginPage.goto();
    loginPage.login(user.email, user.password);
    cy.get('#mStampCards').click();

    // Optional: Assert card was created
    cy.contains(cardName.cardname).should('exist');


    cy.contains(`${cardName.cardname} (Published)`)
      .parents('#main-container > :nth-child(2) > :nth-child(2)') // ya parent container class
      .find('#dropdown-default-primary')
      .click();


    // Wait for Action button to be visible and click
    // deleteCard.actionButton().should('be.visible').click({ force: true });
    // deleteCard.deleteCardLink().should('be.visible');
    deleteCard.clickdeleteCardLink();
    deleteCard.clickConfirmDeleteButton();
    deleteCard.messagedisplay();
    // Optional: Assert card is deleted
    // cy.contains('My New Card').should('not.exist');
  });
});
