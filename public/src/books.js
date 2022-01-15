const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  const result = authors.find((author) => author.id === id);
  return result;
}

function findBookById(books, id) {
  const result = books.find((book) => book.id === id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = [];
  const availableBooks = [];

  books.forEach((book) => {
    if (book.borrows.every((borrow) => borrow.returned)) {
      availableBooks.push(book);
    }
    else {
      checkedOutBooks.push(book);
    }
  });

  const result = [checkedOutBooks, availableBooks];
  return result;
}

function getBorrowersForBook(book, accounts) {
  const result = [];

  book.borrows.forEach((borrow) => {
    const returnedStatus = {returned: borrow.returned}
    const account = accounts.find((account) => account.id === borrow.id);
    const accountWithReturn = {...account, ...returnedStatus};

    if (result.length < 10) result.push(accountWithReturn);
  });

  return result;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
