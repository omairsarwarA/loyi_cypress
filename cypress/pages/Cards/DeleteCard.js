class DeleteCard {
  actionButton() {
    return cy.get('button').contains('Action', { matchCase: true });
  }

  deleteCardLink() {
    return cy.contains('a', 'Delete Card');
  }

  clickdeleteCardLink() {
    this.deleteCardLink().click({ force: true });
  }

  clickConfirmDeleteButton() {
    cy.contains('button', 'Delete').click({ force: true });
  }

  verifyCardDeleted(cardName) {
    cy.contains(cardName).should('not.exist');
  }
  messagedisplay() {
    return cy.get('[data-notify="message"]').should('be.visible');
  }
}

export default DeleteCard;
