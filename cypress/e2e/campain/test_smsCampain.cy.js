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
    cy.get('#other_form_answers > table > tbody > tr:nth-child(8) > td > div > label').click({force: true});
    cy.get('#other_form_answers > table > tbody > tr:nth-child(7) > td > div > label').click({force: true});
    cy.get('#save_other_questions_button').click();
    cy.get('i[class="fas fa-arrow-circle-right"]').click();
    let updatefullname = updateData.firstName + ' ' + updateData.lastName;
    cy.get('input[type="search"]').clear().type(updatefullname);

    cy.contains(updatefullname).should('be.visible');

    //campain creation
    cy.get('a[id="mCampaign"] span[class="nav-main-link-name"]').click();
    cy.get('a[id="camp2"] span[class="nav-main-link-name"]').click();
    cy.get('#apply').click();
    cy.get('#mlist_name').type('Test Marketing List');
    cy.get('button[type="submit"]').click();
    // cy.get('.bg-white > tr > :nth-child(1)').contains(usersAdded).should('be.equal', usersAdded);

    //sms campain creation
    cy.get('a[id="mDashboard"] span[class="nav-main-link-name"]').click();
    cy.get('a[id="mCampaign"] span[class="nav-main-link-name"]').click();
    cy.get('a[id="camp1"] span[class="nav-main-link-name"]').click();
    cy.get('.fas.fa-sms').click();
    // cy.get('[href="https://sandbox.loyicard.com/en/campaigns/sms/new"] > .fas').click({ force: true });
    cy.get('#select2-message_template-container').click({ force: true });
    // cy.contains('Welcome Message').click({ force: true });
    cy.get('#message_copy').type('This is a test SMS campaign message.');
    cy.get('#send_campaign_btn').click();
    cy.get('.btn.btn-hero-warning.text-black-75.mx-1.mb-2.mt-1.w-100').click();
    cy.get('.swal2-confirm').click();



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
