import { Book } from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import {
  BookInformation,
  BookList,
} from '../../../../be-fundamentals/OOP/library-hard/Book/BookList';

let bookList: BookList;
let books: Map<string, BookInformation>;
let harryPotter: Book;
let lordOfTheRings: Book;
let hpInformation: BookInformation;
let lotrInformation: BookInformation;

beforeAll(() => {
  bookList = BookList.getInstance(books);
});

beforeEach(() => {
  harryPotter = new Book({
    title: 'Harry Potter',
    author: 'J.K Rowling',
    isbn: '1234',
  });

  hpInformation = {
    book: harryPotter,
    quantity: 10,
  };

  lordOfTheRings = new Book({
    title: 'Lord Of The Rings',
    author: 'J.R.R Tolkien',
    isbn: '4321',
  });

  lotrInformation = {
    book: lordOfTheRings,
    quantity: 5,
  };

  books = new Map([
    [harryPotter.id, hpInformation],
    [lordOfTheRings.id, lotrInformation],
  ]);

  bookList.books = books;
});

describe('BookList', () => {
  it('Should be instance of BookList', () => {
    expect(bookList).toBeInstanceOf(BookList);
  });

  it('Should return already created userList instance, after trying to create a new instance of UserList', () => {
    const secondBookList = BookList.getInstance();

    expect(bookList).toStrictEqual(secondBookList);
  });

  it('Should add a book', () => {
    const bookDetails = {
      author: 'unknown',
      isbn: '1234',
      title: 'example',
    };

    const bookId = bookList.addBook(bookDetails, 5);

    expect(bookList.books.has(bookId)).toBeTruthy();
  });

  it('Should soft delete a book', () => {
    expect(hpInformation.book.deletedAt).toBeUndefined();

    bookList.deleteBook(hpInformation.book.id);

    expect(hpInformation.book.deletedAt).toBeDefined();
  });

  it('Should find a book using bookId and return it', () => {
    const book = bookList.findBookByIdOrThrow(hpInformation.book.id);

    expect(hpInformation).toStrictEqual(book);
  });

  it('Should find a book return it using isbn number', () => {
    const bookInformation = bookList.findBookByIsbn(hpInformation.book.isbn);

    expect(bookInformation).toStrictEqual(hpInformation);
  });

  it('Should return array of available book IDs, when book quantity > 1, book not deleted and book exists', () => {
    const booksId = [harryPotter.id, lordOfTheRings.id, '1234', '4321'];

    expect(bookList.findAvailableBooksById(booksId)).toStrictEqual([
      harryPotter.id,
      lordOfTheRings.id,
    ]);
  });

  describe('It should throw error when', () => {
    it('Should throw error when adding book with quantity < 1', () => {
      const bookDetails = {
        title: 'Example',
        author: 'Test',
        isbn: '1234',
      };

      expect(() => {
        bookList.addBook(bookDetails, 0);
      }).toThrow();
    });

    it('Should throw error when adding book with empty title', () => {
      const bookDetails = {
        title: '',
        author: 'Test',
        isbn: '1234',
      };

      expect(() => {
        bookList.addBook(bookDetails, 5);
      }).toThrow();
    });

    it('Should throw error when adding book with empty author', () => {
      const bookDetails = {
        title: 'example',
        author: '',
        isbn: '1234',
      };

      expect(() => {
        bookList.addBook(bookDetails, 5);
      }).toThrow();
    });

    it('Should throw error when adding book with empty isbn number', () => {
      const bookDetails = {
        title: 'Example',
        author: 'Test',
        isbn: '',
      };

      expect(() => {
        bookList.addBook(bookDetails, 5);
      }).toThrow();
    });

    it('Should throw error when book is not found', () => {
      expect(() => {
        bookList.findBookByIdOrThrow('1234');
      }).toThrow();
    });
  });
});
