
class ProgressBarPage {
  visit() {
    cy.visit('/progress-bar');

    cy.get('#startStopButton').should('be.visible');
    cy.get('#progressBar').should('be.visible');
  }

  start() {
    cy.get('#startStopButton')
      .should('contain', 'Start')
      .click();
  }

  stop() {
    cy.get('#startStopButton')
      .should('contain', 'Stop')
      .click();
  }

  getValue() {
    return cy.get('#progressBar .progress-bar')
      .invoke('attr', 'aria-valuenow')
      .then(Number);
  }

  waitUntilComplete() {
    cy.get('#progressBar .progress-bar', { timeout: 30000 })
      .should('have.attr', 'aria-valuenow', '100');

    cy.get('#resetButton').should('be.visible');

    // Aguarda a aplicação estabilizar após atingir 100%
    cy.wait(1000);
  }

  restart() {
    cy.get('#resetButton')
      .should('be.visible')
      .click();

    cy.get('#startStopButton')
      .should('be.visible')
      .and('contain', 'Start');
  }

  assertValueAtMost(limit) {
    this.getValue().then((value) => {
      expect(value).to.be.at.most(limit);
    });
  }

  assertValue(expected) {
    this.getValue().should('equal', expected);
  }
}

export default new ProgressBarPage();
