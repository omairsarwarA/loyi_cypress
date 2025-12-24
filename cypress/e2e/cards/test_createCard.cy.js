import LoginPage from '../../pages/Auth/LoginPage';
import CreateCard from '../../pages/Cards/CreateCard';
import DeleteCard from '../../pages/Cards/DeleteCard';


const user = require('../../fixtures/loginData_loyi.json')[0];
const cardName = require('../../fixtures/cardname.json')[0];

describe('Create Card Flow', () => {
  it('should create a new card', () => {
    const loginPage = new LoginPage();
    const cardCreation = new CreateCard();
    const deleteCard = new DeleteCard();


    loginPage.goto();
    loginPage.login(user.email, user.password);
    // Navigate and create card
    cardCreation.clickNewCardButton();
    cardCreation.fillCardNameField(cardName.cardname); // Replace with dynamic value if needed
    cardCreation.clickSaveButton();
    cy.get('#mStampCards').click();

    // Optional: Assert card was created
    cy.contains(cardName.cardname).should('exist');

    cy.contains(`${cardName.cardname} (Published)`)
      .parents('#main-container > :nth-child(2) > :nth-child(2)') // ya parent container class
      .find('#dropdown-default-primary')
      .click();
      
    deleteCard.clickdeleteCardLink();
    deleteCard.clickConfirmDeleteButton();
    deleteCard.messagedisplay();


  });
});
