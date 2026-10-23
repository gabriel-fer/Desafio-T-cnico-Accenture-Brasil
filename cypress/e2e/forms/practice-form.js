
import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

import HomePage from '../../pages/home.page';
import PracticeFormPage from '../../pages/forms/practice-form.page';

Given('que acesso o site DemoQA', () => {
  HomePage.visit();
});

When('abro a página Practice Form', () => {
  HomePage.openPracticeForm();
});

Then('o formulário deve ser exibido', () => {
  HomePage.assertPracticeFormOpened();
});

Given('que acesso a página Practice Form', () => {
  PracticeFormPage.visit();
});

When('preencho o formulário com dados válidos', () => {
  cy.fixture('form-data.json').then((data) => {
    PracticeFormPage.fillFirstName(data.firstName);
    PracticeFormPage.fillLastName(data.lastName);
    PracticeFormPage.fillEmail(data.email);
    PracticeFormPage.selectGender();
    PracticeFormPage.fillPhone(data.phone);
    PracticeFormPage.fillBirthDate(data.birthDate);
    PracticeFormPage.selectSubject(data.subject);
    PracticeFormPage.selectHobby();
    PracticeFormPage.uploadFile(data.filePath);
    PracticeFormPage.fillAddress(data.address);
    PracticeFormPage.selectState(data.state);
    PracticeFormPage.selectCity(data.city);
  });
});

When('envio o formulário', () => {
  PracticeFormPage.submit();
});

Then('devo visualizar a confirmação do envio', () => {
  PracticeFormPage.assertConfirmation();
});

Then('os dados enviados devem estar corretos', () => {
  cy.fixture('form-data.json').then((data) => {
    PracticeFormPage.assertSubmittedData(
      `${data.firstName} ${data.lastName}`,
      data.email,
      data.fileName
    );
  });
});

When('fecho o popup', () => {
  PracticeFormPage.closeConfirmation();
});

Then('o popup não deve mais ser exibido', () => {
  PracticeFormPage.assertConfirmationClosed();
});
