import { Book } from '../../../../be-fundamentals/OOP/library-hard/Book/Book';

let book: Book;

beforeEach(() => {
  book = new Book({
    title: 'Harry Potter',
    author: 'J.K Rowling',
    isbn: '1234',
  });
});

describe('Book', () => {
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

  it('Should have default value of deletedAt - undefined', () => {
    expect(book.deletedAt).toBeUndefined();
  });

  describe('Should throw error when', () => {
    it('Should throw error when creating book with empty title', () => {
      expect(() => {
        new Book({
          title: '',
          author: 'Test',
          isbn: '1234',
        });
      }).toThrow();
    });

    it('Should throw error when creating book with empty author', () => {
      expect(() => {
        new Book({
          title: 'Test',
          author: '',
          isbn: '1234',
        });
      }).toThrow();
    });

    it('Should throw error when creating book with empty isbn number', () => {
      expect(() => {
        new Book({
          title: 'Title',
          author: 'Test',
          isbn: '',
        });
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
