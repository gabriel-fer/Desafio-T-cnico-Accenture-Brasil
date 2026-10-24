
class BrowserWindowsPage {
  openBrowserWindows() {
    cy.contains('h5', 'Alerts, Frame & Windows').click();
    cy.contains('.element-list li', 'Browser Windows').click();
  }

  clickNewWindow() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('#windowButton').click();
  }

  assertNewWindowRequested() {
    cy.get('@windowOpen').should('have.been.called');
  }

  assertSamplePage(message) {
    cy.get('@windowOpen').then((stub) => {
      const openedUrl = stub.firstCall.args[0];

      const sampleUrl = new URL(
        openedUrl,
        'https://demoqa.com'
      ).href;

      cy.visit(sampleUrl);
    });

    cy.get('#sampleHeading')
      .should('be.visible')
      .and('have.text', message);
  }

  returnToBrowserWindows() {
    cy.visit('/browser-windows');
    cy.get('#windowButton').should('be.visible');
  }
}

export default new BrowserWindowsPage();
