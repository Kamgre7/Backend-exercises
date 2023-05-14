import {
  Book,
  BookDetails,
  IBook,
} from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import { bookData, hpBookDetails } from '../utils/constants';

describe('Book', () => {
  let book: IBook;
  let bookDetails: BookDetails;

  beforeEach(() => {
    book = new Book({ ...hpBookDetails });

    bookDetails = { ...bookData };
  });

  it('Should be instance of Book class', () => {
    expect(book).toBeInstanceOf(Book);
  });

  it('Should change the author', () => {
    book.setAuthor('J.R.R Tolkien');

    expect(book.author).toBe('J.R.R Tolkien');
  });

  it('Should change the title', () => {
    book.setTitle('Lord Of The Rings');

    expect(book.title).toBe('Lord Of The Rings');
  });

  it('Should change the isbn', () => {
    book.setIsbn('4321');

    expect(book.isbn).toBe('4321');
  });

  it('Should have default value of deletedAt - null', () => {
    expect(book.deletedAt).toBeNull();
  });

  describe('Should throw error when', () => {
    it('Should throw error when creating book with empty title', () => {
      bookDetails.title = '';

      expect(() => {
        new Book(bookDetails);
      }).toThrow();
    });

    it('Should throw error when creating book with empty author', () => {
      bookDetails.author = '';

      expect(() => {
        new Book(bookDetails);
      }).toThrow();
    });

    it('Should throw error when creating book with empty isbn number', () => {
      bookDetails.isbn = '';

      expect(() => {
        new Book(bookDetails);
      }).toThrow();
    });

    it('Should throw error when updating book with empty author', () => {
      expect(() => {
        book.setAuthor('');
      }).toThrow();
    });

    it('Should throw error when updating book with empty title', () => {
      expect(() => {
        book.setTitle('');
      }).toThrow();
    });

    it('Should throw error when updating book with empty isbn number', () => {
      expect(() => {
        book.setIsbn('');
      }).toThrow();
    });
  });
});
