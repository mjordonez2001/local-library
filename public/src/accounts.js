const { findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((userA, userB) => userA.name.last < userB.name.last ? -1 : 1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  numberOfBorrows = 0;

  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === id) numberOfBorrows++;
    });
  });

  return numberOfBorrows;
}


function getBooksPossessedByAccount(account, books, authors) {
  const id = account.id;
  const borrowedBooks = [];

  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === id && !borrow.returned) {
        const author = authors.find((author) => author.id === book.authorId);
        const bookUpdated = {...book, author}

        borrowedBooks.push(bookUpdated);
      } 
    });
  });

  return borrowedBooks;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};


