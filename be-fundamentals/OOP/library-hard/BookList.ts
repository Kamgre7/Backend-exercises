import { Book, BookDetails, IBook } from './Book';
import { DataValidator } from './DataValidator';
import { bookDB } from './libraryDB';

export type BookInformation = {
  book: IBook;
  quantity: number;
};

export interface IBookList {
  books: Map<string, BookInformation>;
  addBook(bookDetails: BookDetails, quantity: number): string;
  deleteBook(bookId: string): void;
  findBookIdByIsbn(isbn: string): string;
  findBookOrThrow(bookId: string): BookInformation;
}

export class BookList implements IBookList {
  private static instance: BookList;

  private constructor(public books = bookDB) {}

  static getInstance(books?: Map<string, BookInformation>): BookList {
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
    const { book } = this.findBookOrThrow(bookId);

    this.books.delete(book.id);
  }

  findBookOrThrow(bookId: string): BookInformation {
    if (!this.books.has(bookId)) {
      throw new Error('Book not found');
    }

    return this.books.get(bookId);
  }

  findBookIdByIsbn(isbn: string): string {
    const bookAlreadyCreated = [...this.books].find(
      ([id, bookInformation]) => bookInformation.book.isbn === isbn
    );

    return bookAlreadyCreated ? bookAlreadyCreated[0] : null;
  }
}
