
import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

import SortablePage from '../../pages/sortable/sortable.page';

Given('que acesso a página Sortable', () => {
  SortablePage.visit();
});

When('organizo os elementos em ordem crescente', () => {
  SortablePage.sortAscending();
});

Then('os elementos devem estar em ordem crescente', () => {
  SortablePage.assertAscending();
});

When('organizo os elementos em ordem decrescente', () => {
  SortablePage.sortDescending();
});

Then('os elementos devem estar em ordem decrescente', () => {
  SortablePage.assertDescending();
});
