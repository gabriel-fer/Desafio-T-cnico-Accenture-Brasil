
class WebTablesPage {
  openWebTables() {
    cy.visit('/webtables');

    cy.url().should('include', '/webtables');

    cy.get('#addNewRecordButton', { timeout: 15000 })
      .should('be.visible');
  }

  openRegistrationForm() {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').should('be.visible');
  }

  fillRegistrationForm(data) {
    cy.get('#firstName').clear().type(data.firstName);
    cy.get('#lastName').clear().type(data.lastName);
    cy.get('#userEmail').clear().type(data.email);
    cy.get('#age').clear().type(String(data.age));
    cy.get('#salary').clear().type(String(data.salary));
    cy.get('#department').clear().type(data.department);
  }

  submitRegistration() {
    cy.get('#submit').click();

    cy.get('#firstName').should('not.exist');
  }

  createRecord(data) {
    this.openRegistrationForm();
    this.fillRegistrationForm(data);
    this.submitRegistration();
  }

  findRow(email) {
    return cy.contains('td', email)
      .should('be.visible')
      .parent('tr');
  }

  assertRecordExists(data) {
    this.findRow(data.email)
      .should('contain', data.firstName)
      .and('contain', data.lastName)
      .and('contain', data.department);
  }

  editRecord(oldEmail, updatedData) {
    this.findRow(oldEmail)
      .find('[title="Edit"]')
      .click();

    this.fillRegistrationForm(updatedData);
    this.submitRegistration();
  }

  deleteRecord(email) {
    this.findRow(email)
      .find('[title="Delete"]')
      .click();
  }

  assertRecordDoesNotExist(email) {
    cy.contains('td', email)
      .should('not.exist');
  }

  setRowsPerPage(count) {
    cy.get('select').then(($selects) => {
      const selector = [...$selects].find((select) =>
        [...select.options].some(
          (option) => option.value === String(count)
        )
      );

      expect(selector, `Select com opção ${count}`).to.exist;

      cy.get('select')
        .filter((_, element) => element === selector)
        .select(String(count));
    });
  }

  generateRecord(index) {
    const uniqueId = `${Date.now()}-${index}`;

    return {
      firstName: `Teste${index}`,
      lastName: `QA${index}`,
      email: `qa.${uniqueId}@example.com`,
      age: 20 + (index % 30),
      salary: 2000 + (index * 100),
      department: `QA-${index}`,
    };
  }
}

export default new WebTablesPage();
