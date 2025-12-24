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

        // Open newly created card
        cy.contains(`${cardName.cardname} (Published)`).should('be.visible');
        cy.get('#mDashboard').click();
        cy.get('.sorting_1 > .js-tooltip-enabled').click();

        cy.contains('button', 'New Customer').click();
        cy.wait(2000);


        cy.contains('label', 'First Name')
            .invoke('attr', 'for')
            .then((id) => {
                cy.get(`#${id}`).type(userData.firstName)
            });
        cy.contains('label', 'Last Name')
            .invoke('attr', 'for')
            .then((id) => {
                cy.get(`#${id}`).type(userData.lastName)
            });
        cy.contains('label', 'Email')
            .invoke('attr', 'for')
            .then((id) => {
                cy.get(`#${id}`).type(userData.email);
            });
        cy.contains('label', 'Phone')
            .invoke('attr', 'for')
            .then((id) => {
                cy.get(`#${id}`).type(userData.phone)
            });

        cy.get('#language_id').select(userData.language);
        cy.get('textarea[name="notes"]').type(userData.notes);

        cy.contains('Send card via Email').click();
        // cy.contains('The customer must confirm').click();
        cy.get('#submit-customer-btn').click();
        cy.wait(2000);
        cy.get('[data-notify="message"]').should('be.visible');

        // update Customer
        let fullname = userData.firstName + ' ' + userData.lastName;
        cy.get('input[type="search"]').clear().type(fullname);
        cy.wait(2000);
        cy.contains(fullname).should('be.visible').click();
        cy.get('#edit_other_questions_button').click();
        cy.get(`input[value=${userData.firstName}]`).clear().type(updateData.firstName);
        cy.get(`input[value=${userData.lastName}]`).clear().type(updateData.lastName);
        cy.get('#save_other_questions_button').click();
        cy.get('i[class="fas fa-arrow-circle-right"]').click();
        let updatefullname = updateData.firstName + ' ' + updateData.lastName;
        cy.get('input[type="search"]').clear().type(updatefullname);

        cy.contains(updatefullname).should('be.visible');


        // Delete Card
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
