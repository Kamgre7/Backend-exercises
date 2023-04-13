import { DataValidator } from '../utils/DataValidator';
import { bookDB } from '../utils/libraryDB';
import { Book, BookDetails, IBook } from './Book';

export type BookInformation = {
  book: IBook;
  quantity: number;
};

export interface IBookList {
  books: Map<string, BookInformation>;
  addBook(bookDetails: BookDetails, quantity: number): string;
  deleteBook(bookId: string): void;
  findBookByIsbn(isbn: string): BookInformation;
  findBookByIdOrThrow(bookId: string): BookInformation;
  findBookById(bookId: string): BookInformation | null;
  findAvailableBooksById(bookIds: string[]): string[];
}

export class BookList implements IBookList {
  private static instance: BookList;

  private constructor(public books: Map<string, BookInformation>) {}

  static getInstance(books: Map<string, BookInformation> = bookDB): BookList {
    if (!BookList.instance) {
      BookList.instance = new BookList(books);
    }

    return BookList.instance;
  }

  addBook(bookDetails: BookDetails, quantity: number): string {
    DataValidator.checkIfNotEqualOrBelowZero(quantity);

    const book = new Book(bookDetails);

    this.books.set(book.id, {
      book,
      quantity,
    });

    return book.id;
  }

  deleteBook(bookId: string): void {
    const { book } = this.findBookByIdOrThrow(bookId);

    book.deletedAt = new Date();
    book.updatedAt = new Date();
  }

  findAvailableBooksById(bookIds: string[]): string[] {
    const availableBooksId = bookIds.filter((id) => {
      const bookInformation = this.findBookById(id);

      return bookInformation === null ||
        bookInformation.quantity < 1 ||
        bookInformation.book.deletedAt
        ? false
        : true;
    });

    return availableBooksId;
  }

  findBookByIdOrThrow(bookId: string): BookInformation {
    const bookInformation = this.books.get(bookId);

    if (bookInformation === undefined || bookInformation.book.deletedAt) {
      throw new Error('Book not found');
    }

    return bookInformation;
  }

  findBookById(bookId: string): BookInformation | null {
    return this.books.get(bookId) ?? null;
  }

  findBookByIsbn(isbn: string): BookInformation | null {
    const book = [...this.books].find(
      ([id, bookInformation]) => bookInformation.book.isbn === isbn
    );

    return book ? book[1] : null;
  }
}
