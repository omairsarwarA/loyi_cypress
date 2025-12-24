import LoginPage from '../../pages/Auth/LoginPage';
import CreateCard from '../../pages/Cards/CreateCard';
import DeleteCard from '../../pages/Cards/DeleteCard';

const user = require('../../fixtures/loginData_loyi.json')[0];
const cardName = require('../../fixtures/cardname.json')[0];


describe('Stamp Mark', () => {
    it('Stamp Mark', () => {
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
                cy.get(`#${id}`).type('Umair')
            });
        cy.contains('label', 'Last Name')
            .invoke('attr', 'for')
            .then((id) => {
                cy.get(`#${id}`).type('ansari')
            });
        cy.contains('label', 'Email')
            .invoke('attr', 'for')
            .then((id) => {
                cy.get(`#${id}`).type('testuser1@yopmail.com')
            });
        cy.contains('label', 'Phone')
            .invoke('attr', 'for')
            .then((id) => {
                cy.get(`#${id}`).type('+34660099515')
            });

        cy.get('#language_id').select('gRK3lme2');
        cy.get('textarea[name="notes"]').type('testing ok');

        cy.contains('Send card via Email').click();
        // cy.contains('The customer must confirm').click();
        cy.get('#submit-customer-btn').click();
        cy.wait(2000);
        cy.get('[data-notify="message"]').should('be.visible');

        // Search User
        cy.get('input[type="search"]').clear().type('Umair');
        cy.wait(2000);
        cy.contains('Umair').should('be.visible').click();
        cy.get('a[href="#a-stamp"]').click();
        cy.wait(2000);
        let initialBalance = '1';
        cy.get('input[value="0"][name="stamps"]').click().clear().type(initialBalance);
        cy.get('div[class="form-group text-right"] button[type="submit"]').click();

        let balance;
        cy.get('input.current_stamps_balance')
            .invoke('val')
            .then((value) => {
                balance = value
                cy.log(balance)
            });
        cy.get('input.current_stamps_balance')
            .should('have.value', initialBalance);



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