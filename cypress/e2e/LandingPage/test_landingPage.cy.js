import LoginPage from '../../pages/Auth/LoginPage';
import CreateCard from '../../pages/Cards/CreateCard';
import DeleteCard from '../../pages/Cards/DeleteCard';


const user = require('../../fixtures/loginData_loyi.json')[0];
const cardName = require('../../fixtures/cardname.json')[0];
const userData = require('../../fixtures/newCustomerData.json')[0];
const updateData = require('../../fixtures/updateCustomerData.json')[0];


// function generateRandomString() {
//   return Math.random().toString(36).substring(2, 7);
// }

describe('In App Customer Update', () => {
    it('update customer data', () => {
        // const randomCardName = generateRandomString();

        // Login
        const loginPage = new LoginPage();
        loginPage.goto();
        loginPage.login(user.email, user.password);

        // Create Card
        const cardCreation = new CreateCard();
        cardCreation.clickNewCardButton();
        cardCreation.fillCardNameField(cardName.cardname); // Replace with dynamic value if needed
        cardCreation.clickSaveButton();
        cy.get('#mStampCards').click();
        cy.contains(cardName.cardname).should('exist');

        cy.contains(`${cardName.cardname} (Published)`)
            .parents('#main-container > :nth-child(2) > :nth-child(2)') // ya parent container class
            .find('#dropdown-default-primary')
            .click();

        cy.get('.far.fa-address-card.cardmenu-icon').click();
        cy.get('#card__form_title').clear().type('Comapany LLC');
        cy.get('#card__form_header_text').clear().type('Welcome to our loyalty program!');
        cy.get('div[id="form-design"] input[name="save_only"]').click();



        // delete Card

        const deleteCard = new DeleteCard();

        cy.get('#mStampCards').click();

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