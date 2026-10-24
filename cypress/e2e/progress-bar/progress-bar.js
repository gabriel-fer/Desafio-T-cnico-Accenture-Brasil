
import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

import ProgressBarPage from '../../pages/progress-bar/progress-bar.page';

Given('que acesso a página Progress Bar', () => {
  ProgressBarPage.visit();
});

When('inicio a barra de progresso', () => {
  ProgressBarPage.start();
});


When('paro a barra antes de atingir 25%', () => {
  cy.get('#progressBar .progress-bar')
    .should(($bar) => {
      expect(Number($bar.attr('aria-valuenow')))
        .to.be.at.least(24);
    })
    .then(() => {
      ProgressBarPage.stop();
    });

  cy.get('#progressBar .progress-bar')
    .should('have.attr', 'aria-valuenow', '24');
});


Then('o valor da barra deve ser menor ou igual a 25%', () => {
  ProgressBarPage.assertValueAtMost(25);
});

When('aguardo a barra atingir 100%', () => {
  ProgressBarPage.waitUntilComplete();
});

Then('a barra deve apresentar 100%', () => {
  ProgressBarPage.assertValue(100);
});

When('reinicio a barra de progresso', () => {
  ProgressBarPage.restart();
});

Then('a barra deve retornar a zero', () => {
  ProgressBarPage.assertValue(0);
});
