
class PracticeFormPage {
  visit() {
    cy.visit('/automation-practice-form');
  }

  fillFirstName(name) {
    cy.get('#firstName').type(name);
  }

  fillLastName(lastName) {
    cy.get('#lastName').type(lastName);
  }

  fillEmail(email) {
    cy.get('#userEmail').type(email);
  }

  selectGender() {
    cy.get('#gender-radio-1')
      .check({ force: true });
  }

  fillPhone(phone) {
    cy.get('#userNumber').type(phone);
  }

  
fillBirthDate(date) {
  const [day, month, year] = date.split(' ');

  const months = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
  };

  cy.get('#dateOfBirthInput').click();

  cy.get('.react-datepicker__month-select')
    .select(months[month]);

  cy.get('.react-datepicker__year-select')
    .select(year);

  cy.get(
    `.react-datepicker__day--0${day.padStart(2, '0')}:not(.react-datepicker__day--outside-month)`
  )
    .click();
}

  selectSubject(subject) {
    cy.get('#subjectsInput')
    .should('be.visible')
    .type(subject);

  cy.get('#subjectsInput')
    .should('be.visible')
    .type('{enter}');
  }

  selectHobby() {
    cy.get('#hobbies-checkbox-1')
      .check({ force: true });
  }

  uploadFile(filePath) {
    cy.get('#uploadPicture').selectFile(filePath);
  }

  fillAddress(address) {
    cy.get('#currentAddress').type(address);
  }

  selectState(state) {
    cy.get('#state').click();
    cy.contains('[id^="react-select-3-option-"]', state)
      .click();
  }

  selectCity(city) {
    cy.get('#city').click();
    cy.contains('[id^="react-select-4-option-"]', city)
      .click();
  }

  submit() {
    cy.get('#submit').click();
  }

  assertConfirmation() {
    cy.get('#example-modal-sizes-title-lg')
      .should('be.visible')
      .and('contain', 'Thanks for submitting the form');
  }

  assertSubmittedData(name, email, fileName) {
    cy.get('.table-responsive')
      .should('contain', name)
      .and('contain', email)
      .and('contain', fileName);
  }

  closeConfirmation() {
  cy.get('.modal-backdrop')
    .click({ force: true, position: 'topLeft' });

  cy.get('.modal-content').should('not.exist');
 }

  assertConfirmationClosed() {
  cy.get('.modal-content').should('not.exist');
  }
}

export default new PracticeFormPage();
