import {
  Book,
  BookDetails,
  IBook,
} from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import {
  BookInformation,
  BookList,
  IBookList,
} from '../../../../be-fundamentals/OOP/library-hard/Book/BookList';
import { bookData, hpBookDetails, lotrBookDetails } from '../utils/constants';

describe('BookList', () => {
  let bookList: IBookList;
  let books: Map<string, BookInformation>;
  let bookDetails: BookDetails;
  let harryPotter: IBook;
  let lordOfTheRings: IBook;
  let hpInformation: BookInformation;
  let lotrInformation: BookInformation;

  beforeAll(() => {
    bookList = BookList.getInstance(books);
  });

  beforeEach(() => {
    harryPotter = new Book({ ...hpBookDetails });

    hpInformation = {
      book: harryPotter,
      quantity: 10,
    };

    lordOfTheRings = new Book({ ...lotrBookDetails });

    lotrInformation = {
      book: lordOfTheRings,
      quantity: 5,
    };

    books = new Map([
      [harryPotter.id, hpInformation],
      [lordOfTheRings.id, lotrInformation],
    ]);

    bookDetails = { ...bookData };

    bookList.books = books;
  });

  it('Should be instance of BookList', () => {
    expect(bookList).toBeInstanceOf(BookList);
  });

  it('Should return already created userList instance, after trying to create a new instance of UserList', () => {
    const secondBookList = BookList.getInstance();

    expect(bookList).toStrictEqual(secondBookList);
  });

  it('Should add a book', () => {
    const book = new Book(bookDetails);

    bookList.addBook(book, 5);

    expect(bookList.books.has(book.id)).toBeTruthy();
  });

  it('Should soft delete a book', () => {
    expect(hpInformation.book.deletedAt).toBeNull();

    bookList.deleteBook(hpInformation.book.id);

    expect(hpInformation.book.deletedAt).toBeInstanceOf(Date);
  });

  it('Should find a book using bookId and return it', () => {
    const book = bookList.findBookByIdOrThrow(hpInformation.book.id);

    expect(hpInformation).toStrictEqual(book);
  });

  it('Should find a book return it using isbn number', () => {
    const bookInformation = bookList.findBookByIsbn(hpInformation.book.isbn);

    expect(bookInformation).toStrictEqual(hpInformation);
  });

  it('Should return array of available book IDs, when: book quantity > 1, book not deleted and book exists', () => {
    const booksId = [harryPotter.id, lordOfTheRings.id, '1234', '4321'];

    expect(bookList.findAvailableBooksById(booksId)).toStrictEqual([
      harryPotter.id,
      lordOfTheRings.id,
    ]);
  });

  describe('It should throw error when', () => {
    it('Should throw error when adding book with quantity < 1', () => {
      const book = new Book(bookDetails);

      expect(() => {
        bookList.addBook(book, 0);
      }).toThrow();
    });

    it('Should throw error when book is not found', () => {
      expect(() => {
        bookList.findBookByIdOrThrow('1234');
      }).toThrow();
    });
  });
});
