import LoginPage from '../../pages/Auth/LoginPage';
import CreateCard from '../../pages/Cards/CreateCard';
import DeleteCard from '../../pages/Cards/DeleteCard';

const user = require('../../fixtures/loginData_loyi.json')[0];
const cardName = require('../../fixtures/cardname.json')[0];
const userDataArray = require('../../fixtures/newCustomerData.json'); // keep entire array

describe('In App Customer Creation', () => {
    it('should create a card and add multiple customers', () => {
        // Login
        const loginPage = new LoginPage();
        loginPage.goto();
        loginPage.login(user.email, user.password);

        // Create Card
        const cardCreation = new CreateCard();
        cardCreation.clickNewCardButton();
        cardCreation.fillCardNameField(cardName.cardname);
        cardCreation.clickSaveButton();
        cy.get('#mStampCards').click();

        // Open newly created card
        cy.contains(`${cardName.cardname} (Published)`).should('be.visible');
        cy.get('#mDashboard').click();
        cy.get('.sorting_1 > .js-tooltip-enabled').click();

        // Loop through all users in JSON
        // let usersAdded = 0;

        userDataArray.forEach((userData) => {
            cy.contains('button', 'New Customer').click();
            cy.wait(1000);

            cy.contains('label', 'First Name')
                .invoke('attr', 'for')
                .then((id) => {
                    cy.get(`#${id}`).clear().type(userData.firstName);
                });
            cy.contains('label', 'Last Name')
                .invoke('attr', 'for')
                .then((id) => {
                    cy.get(`#${id}`).clear().type(userData.lastName);
                });
            cy.contains('label', 'Email')
                .invoke('attr', 'for')
                .then((id) => {
                    cy.get(`#${id}`).clear().type(userData.email);
                });
            cy.contains('label', 'Phone')
                .invoke('attr', 'for')
                .then((id) => {
                    cy.get(`#${id}`).clear().type(userData.phone);
                });

            cy.get('#language_id').select(userData.language);
            cy.get('textarea[name="notes"]').clear().type(userData.notes);

            cy.contains('Send card via Email').click();
            cy.get('#submit-customer-btn').click();
            cy.wait(2000);
            cy.get('[data-notify="message"]').should('be.visible');
            // usersAdded = index + 1;

        });

        //campain creation
        cy.get('a[id="mCampaign"] span[class="nav-main-link-name"]').click();
        cy.get('a[id="camp2"] span[class="nav-main-link-name"]').click();
        cy.get('#apply').click();
        cy.get('#mlist_name').type('Test Marketing List');
        cy.get('button[type="submit"]').click();
        // cy.get('.bg-white > tr > :nth-child(1)').contains(usersAdded).should('be.equal', usersAdded);


        // Delete Card
        const deleteCard = new DeleteCard();
        cy.get('#mStampCards').click();
        cy.contains(cardName.cardname).should('exist');
        cy.contains(`${cardName.cardname} (Published)`)
            .parents('#main-container > :nth-child(2) > :nth-child(2)')
            .find('#dropdown-default-primary')
            .click();
        deleteCard.clickdeleteCardLink();
        deleteCard.clickConfirmDeleteButton();
        deleteCard.messagedisplay();
    });
});
