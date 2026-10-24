class BookStoreApiPage {
  generateCredentials() {
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

    return {
      userName: `qa${uniqueId}`,
      password: 'Qa!12345',
    };
  }

  createUser(credentials) {
    return cy.request('POST', '/Account/v1/User', credentials);
  }

  generateToken(credentials) {
    return cy.request('POST', '/Account/v1/GenerateToken', credentials);
  }

  checkAuthorization(credentials) {
    return cy.request('POST', '/Account/v1/Authorized', credentials);
  }

  getBooks() {
    return cy.request('GET', '/BookStore/v1/Books');
  }

  addBooks(userId, token, isbns) {
    return cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        userId,
        collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
      },
    });
  }

  getUser(userId, token) {
    return cy.request({
      method: 'GET',
      url: `/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new BookStoreApiPage();
