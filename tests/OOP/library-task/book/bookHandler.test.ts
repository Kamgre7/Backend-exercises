import {
  Book,
  IBook,
} from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import { BookHandler } from '../../../../be-fundamentals/OOP/library-hard/Book/BookHandler';
import { BookInformation } from '../../../../be-fundamentals/OOP/library-hard/Book/BookList';
import { hpBookDetails } from '../utils/constants';

describe('BookHandler', () => {
  let bookHandler: BookHandler;
  let harryPotter: IBook;
  let hpInformation: BookInformation;

  beforeAll(() => {
    bookHandler = new BookHandler();
  });

  beforeEach(() => {
    harryPotter = new Book({ ...hpBookDetails });

    hpInformation = {
      book: harryPotter,
      quantity: 10,
    };
  });

  it('Should be a instance of BookHandler', () => {
    expect(bookHandler).toBeInstanceOf(BookHandler);
  });

  it('Should set book author', () => {
    bookHandler.setAuthor(harryPotter, 'unknown');

    expect(harryPotter.author).toBe('unknown');
  });

  it('Should set book title', () => {
    bookHandler.setTitle(harryPotter, 'The Witcher');

    expect(harryPotter.title).toBe('The Witcher');
  });

  it('Should set book isbn number', () => {
    bookHandler.setIsbn(harryPotter, 'QWE123');

    expect(harryPotter.isbn).toBe('QWE123');
  });

  it('Should update book quantity by given number', () => {
    hpInformation.quantity = 10;

    bookHandler.setQuantity(hpInformation, 5);

    expect(hpInformation.quantity).toEqual(15);
  });

  describe('Should throw error when', () => {
    it('Should throw error when updating book with empty author', () => {
      expect(() => {
        bookHandler.setAuthor(harryPotter, '');
      }).toThrow();
    });

    it('Should throw error when updating book with empty title', () => {
      expect(() => {
        bookHandler.setTitle(harryPotter, '');
      }).toThrow();
    });

    it('Should throw error when updating book with empty isbn number', () => {
      expect(() => {
        bookHandler.setIsbn(harryPotter, '');
      }).toThrow();
    });

    it('Should throw error when updating book quantity and quantity is not integer number', () => {
      expect(() => {
        bookHandler.setQuantity(hpInformation, 7.42);
      }).toThrow();
    });

    it('Should throw error when updating book quantity and quantity is below or equal zero', () => {
      hpInformation.quantity = 10;

      expect(() => {
        bookHandler.setQuantity(hpInformation, -100);
      }).toThrow();
    });
  });
});
