
function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  borrowedBooks = 0;
  
  books.forEach((book) => {
    if (book.borrows.some((borrow) => !borrow.returned)) borrowedBooks++;
  });

  return borrowedBooks;
}

function getMostCommonGenres(books) {
  const allGenres = [];
  const reducedGenres = books.reduce((result, book) =>  {
    result[book.title] = book.genre;
    return result;
  }, {});
  
  books.forEach((book) => {
    const currentGenre = book.genre;

    if (allGenres.some((genre) => genre.name === currentGenre)) {
      let foundGenre = allGenres.find((genre) => genre.name == currentGenre)
      foundGenre.count++;
    }
    else {
      allGenres.push({name: currentGenre, count: 1})
    }
  });
  
  const mostCommon = orderArray(allGenres);
  return mostCommon;
}

function getMostPopularBooks(books) {
  const allBooks = [];

  books.forEach((book) => {
    let borrowCount = 0;
    book.borrows.forEach((borrow) => borrowCount++);

    allBooks.push({name: book.title, count: borrowCount});
  });
  
  const mostPopular = orderArray(allBooks);
  return mostPopular;
}

function getMostPopularAuthors(books, authors) {
  const allAuthors = [];
  const authorNames = authors.map((author) => `${author.name.first} ${author.name.last}`)

  books.forEach((book) => {
    const currentAuthorObject = authors.find((author) => author.id === book.authorId);
    let authorName;

    for (author in authorNames) {
      const currentAuthor = authorNames[author];
      if (currentAuthor.includes(currentAuthorObject.name.first)) authorName = currentAuthor;
    }

    if (!(allAuthors.some((author) => author.name === authorName))) {
      allAuthors.push({name: authorName, count: 0});
    }
    const foundAuthor = allAuthors.find((author) => author.name === authorName);
    book.borrows.forEach((borrow) => foundAuthor.count++);
  });

  const mostPopular = orderArray(allAuthors);
  return mostPopular;
}

//helper fuction
function orderArray(array) {
  array.sort((itemA, itemB) => itemA.count > itemB.count ? -1 : 1)
  const newArray = array.slice(0, 5);
  return newArray;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
