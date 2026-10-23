
import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

import BrowserWindowsPage from '../../pages/browser-windows/browser-windows.page';

Given('que acesso o site DemoQA', () => {
  BrowserWindowsPage.visitHome();
});

When('acesso a opção Browser Windows', () => {
  BrowserWindowsPage.openBrowserWindows();
});

When('clico no botão New Window', () => {
  BrowserWindowsPage.clickNewWindow();
});

Then('uma nova janela deve ser solicitada', () => {
  BrowserWindowsPage.assertNewWindowRequested();
});

Then(
  'a página aberta deve exibir a mensagem {string}',
  (message) => {
    BrowserWindowsPage.assertSamplePage(message);
  }
);

When('finalizo a validação da nova janela', () => {
  // A navegação de teste será encerrada no próximo passo.
});

Then('devo retornar à página Browser Windows', () => {
  BrowserWindowsPage.returnToBrowserWindows();
});
