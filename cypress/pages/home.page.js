
class HomePage {
  visit() {
    cy.visit('/');
  }

  openPracticeForm() {
    cy.contains('h5', 'Forms').click();
    cy.contains('Practice Form').click();
  }

  assertPracticeFormOpened() {
    cy.url().should(
      'include',
      '/automation-practice-form'
    );
    cy.get('#firstName').should('be.visible');
  }
}

export default new HomePage();
