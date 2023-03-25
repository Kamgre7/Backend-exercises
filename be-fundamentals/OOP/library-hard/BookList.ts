import { Book, BookDetails, IBook } from './Book';
import { bookDB } from './libraryDB';

export type BookInformation = {
  book: IBook;
  quantity: number;
};

export interface IBookList {
  books: Map<string, BookInformation>;
  addBook(bookDetails: BookDetails, quantity: number): string;
  deleteBook(bookId: string): void;
  findBookOrThrow(bookId: string): BookInformation;
}

export class BookList implements IBookList {
  private static instance: BookList;

  private constructor(public books = bookDB) {}

  static getInstance(books?: Map<string, BookInformation>): BookList {
    if (!BookList.instance) {
      BookList.instance = this.getInstance(books);
    }

    return BookList.instance;
  }

  addBook(bookDetails: BookDetails, quantity: number): string {
    this.checkIfNotEqualOrBelowZero(quantity);

    const book = new Book(bookDetails);

    this.books.set(book.id, {
      book,
      quantity,
    });

    return book.id;
  }

  deleteBook(bookId: string): void {
    const { book } = this.findBookOrThrow(bookId);

    this.books.delete(book.id);
  }

  findBookOrThrow(bookId: string): BookInformation {
    if (!this.books.has(bookId)) {
      throw new Error('User not found');
    }

    return this.books.get(bookId);
  }

  private checkIfNotEqualOrBelowZero(quantity: number) {
    if (quantity <= 0) {
      throw new Error(`Cannot set quantity value less than 1`);
    }
  }
}
