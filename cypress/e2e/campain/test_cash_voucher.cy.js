import LoginPage from '../../pages/Auth/LoginPage';
import CreateCard from '../../pages/Cards/CreateCard';
import DeleteCard from '../../pages/Cards/DeleteCard';

const user = require('../../fixtures/loginData_loyi.json')[0];
const cardName = require('../../fixtures/cardname.json')[0];
// const userDataArray = require('../../fixtures/newCustomerData.json'); // keep entire array
const userData = require('../../fixtures/newCustomerData.json')[0];
const updateData = require('../../fixtures/updateCustomerData.json')[0];

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
    cy.contains(`${cardName.cardname} (Published)`).should('be.visible');


    //create Voucher offer discount
    cy.get('#mDashboard').click();
    cy.get('a[id="mDashboard"] span[class="nav-main-link-name"]').click();
    cy.get('a[id="mCampaign"] span[class="nav-main-link-name"]').click();
    cy.get('a[id="camp6"] span[class="nav-main-link-name"]').click();
    cy.get('#apply').click();
    cy.get('#reward_name').type('Test Cash Voucher');
    cy.get('button[type="submit"]').click();






    // Open newly customer
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
    cy.contains('Rewards & Vouchers').click();
    cy.get('button[onclick="addEdit_newReward_button(this,");"]').click();
    cy.get('div[class="block-content block-content-full text-right bg-light"] button[type="submit"]').click();
    let updatefullname = updateData.firstName + ' ' + updateData.lastName;
    cy.get('input[type="search"]').clear().type(updatefullname);
    cy.contains(updatefullname).should('be.visible');




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
    console.log('ok');
});
