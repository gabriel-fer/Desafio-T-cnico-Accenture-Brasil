import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

import BookStoreApiPage from '../../pages/api/book-store-api.page';

let apiData;

Given('que preparo credenciais exclusivas para a API Book Store', () => {
  apiData = {
    credentials: BookStoreApiPage.generateCredentials(),
  };
});

When('crio o usuário pela API', () => {
  BookStoreApiPage.createUser(apiData.credentials).then((response) => {
    expect(response.status).to.equal(201);
    expect(response.body.username).to.equal(apiData.credentials.userName);
    expect(response.body.userID).to.be.a('string').and.not.be.empty;

    apiData.userId = response.body.userID;
  });
});

When('gero um token de acesso para esse usuário', () => {
  BookStoreApiPage.generateToken(apiData.credentials).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.token).to.be.a('string').and.not.be.empty;
    expect(response.body.status).to.equal('Success');

    apiData.token = response.body.token;
  });
});

When('confirmo que o usuário está autorizado pela API', () => {
  BookStoreApiPage.checkAuthorization(apiData.credentials).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.equal(true);
  });
});

When('consulto os livros disponíveis pela API', () => {
  BookStoreApiPage.getBooks().then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.books).to.be.an('array').that.is.not.empty;

    apiData.availableBooks = response.body.books;
  });
});

When('seleciono dois livros disponíveis', () => {
  expect(apiData.availableBooks).to.have.length.at.least(2);

  apiData.selectedBooks = apiData.availableBooks.slice(0, 2);
  expect(apiData.selectedBooks).to.have.length(2);
  apiData.isbns = apiData.selectedBooks.map(({ isbn }) => isbn);
  expect(apiData.isbns.every(Boolean)).to.equal(true);
});

When('alugo os livros selecionados para esse usuário pela API', () => {
  BookStoreApiPage.addBooks(
    apiData.userId,
    apiData.token,
    apiData.isbns
  ).then((response) => {
    expect(response.status).to.equal(201);
    expect(response.body.books).to.be.an('array');

    const rentedIsbns = response.body.books.map(({ isbn }) => isbn);
    expect(rentedIsbns).to.include.members(apiData.isbns);
  });
});

Then('os detalhes do usuário devem conter os livros alugados', () => {
  BookStoreApiPage.getUser(apiData.userId, apiData.token).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal(apiData.credentials.userName);
    expect(response.body.books).to.be.an('array');

    const userBookIsbns = response.body.books.map(({ isbn }) => isbn);
    expect(userBookIsbns).to.include.members(apiData.isbns);
  });
});
