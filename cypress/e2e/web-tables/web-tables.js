
import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

import WebTablesPage from '../../pages/web-tables/web-tables.page';
import HomePage from '../../pages/home.page';

let record;
let updatedRecord;
let records = [];

Given('que acesso a página Web Tables', () => {
  HomePage.visit();
  WebTablesPage.openWebTables();
});

When('cadastro um novo registro', () => {
  record = WebTablesPage.generateRecord(1);
  WebTablesPage.createRecord(record);
});

Then('o registro deve aparecer na tabela', () => {
  WebTablesPage.assertRecordExists(record);
});

Given('que existe um registro para edição', () => {
  HomePage.visit();
  WebTablesPage.openWebTables();

  record = WebTablesPage.generateRecord(2);
  WebTablesPage.createRecord(record);
  WebTablesPage.assertRecordExists(record);
});

When('altero os dados desse registro', () => {
  updatedRecord = {
    ...record,
    firstName: 'NomeEditado',
    lastName: 'SobrenomeEditado',
    department: 'QA-Atualizado',
  };

  WebTablesPage.editRecord(record.email, updatedRecord);
});

Then('os dados atualizados devem aparecer na tabela', () => {
  WebTablesPage.assertRecordExists(updatedRecord);
});

Given('que existe um registro para exclusão', () => {
  HomePage.visit();
  WebTablesPage.openWebTables();

  record = WebTablesPage.generateRecord(3);
  WebTablesPage.createRecord(record);
  WebTablesPage.assertRecordExists(record);
});

When('excluo esse registro', () => {
  WebTablesPage.deleteRecord(record.email);
});

Then('o registro não deve aparecer na tabela', () => {
  WebTablesPage.assertRecordDoesNotExist(record.email);
});

When('cadastro {int} registros com dados dinâmicos', (quantidade) => {
  records = Array.from(
    { length: quantidade },
    (_, index) => WebTablesPage.generateRecord(index + 10)
  );

  records.forEach((item) => {
    WebTablesPage.createRecord(item);
  });

  WebTablesPage.setRowsPerPage(20);
});

Then('os 12 registros devem aparecer na tabela', () => {
  records.forEach((item) => {
    WebTablesPage.assertRecordExists(item);
  });
});

When('excluo todos os 12 registros criados', () => {
  records.forEach((item) => {
    WebTablesPage.deleteRecord(item.email);
  });
});

Then('nenhum dos registros criados deve permanecer na tabela', () => {
  records.forEach((item) => {
    WebTablesPage.assertRecordDoesNotExist(item.email);
  });
});
