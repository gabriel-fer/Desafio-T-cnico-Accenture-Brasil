
class SortablePage {
  visit() {
    cy.visit('/sortable');

    cy.get('#demo-tab-list')
      .should('be.visible')
      .click();

    cy.get('#demo-tabpane-list .list-group-item')
      .should('have.length', 6);
  }

  getItems() {
    return cy.get('#demo-tabpane-list .list-group-item');
  }

  getItemTexts() {
    return this.getItems().then(($items) =>
      [...$items].map((item) => item.innerText.trim())
    );
  }

  sortToOrder(expectedOrder) {
    expectedOrder.forEach((text, targetIndex) => {
      this.getItems().then(($items) => {
        const currentIndex = [...$items].findIndex(
          (item) => item.innerText.trim() === text
        );

        if (currentIndex !== targetIndex) {
          cy.get('#demo-tabpane-list .list-group-item')
            .eq(currentIndex)
            .drag(
              `#demo-tabpane-list .list-group-item:nth-child(${targetIndex + 1})`
            );
        }
      });
    });
  }

  sortAscending() {
    this.sortToOrder([
      'One', 'Two', 'Three', 'Four', 'Five', 'Six',
    ]);
  }

  sortDescending() {
    this.sortToOrder([
      'Six', 'Five', 'Four', 'Three', 'Two', 'One',
    ]);
  }

  assertAscending() {
    this.getItemTexts().then((actualOrder) => {
      expect(actualOrder).to.deep.equal([
        'One', 'Two', 'Three', 'Four', 'Five', 'Six',
      ]);
    });
  }

  assertDescending() {
    this.getItemTexts().then((actualOrder) => {
      expect(actualOrder).to.deep.equal([
        'Six', 'Five', 'Four', 'Three', 'Two', 'One',
      ]);
    });
  }
}

export default new SortablePage();
