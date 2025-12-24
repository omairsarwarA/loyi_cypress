class CreateCard {
  // Locators
  clickOnMyCard() {
    return cy.contains('My Cards', { matchCase: true });
  }

  newCardButton() {
    return cy.get('button').contains('New Card', { matchCase: true });
  }

  cardNameField() {
    return cy.get('#card__card_name'); 
    // You can adjust selector if needed
  }

  saveButton() {
    return cy.get('button').contains('Save', { matchCase: true });
  }

  // Actions
  clickNewCardButton() {
    this.clickOnMyCard().click();
    this.newCardButton().click();
  }

  fillCardNameField(value) {
    this.cardNameField().clear().type(value);
  }

  clickSaveButton() {
    this.saveButton().click();
  }
}

export default CreateCard;
