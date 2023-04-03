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
  createNewBook(bookDetails: BookDetails, quantity: number): string;
  restockBookQuantity(bookId: string, quantity: number): void;
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
    DataValidator.checkIfInteger(quantity);

    const duplicatedBookId = this.findBookIdByIsbn(bookDetails.isbn);

    if (duplicatedBookId !== null) {
      this.restockBookQuantity(duplicatedBookId, quantity);

      return duplicatedBookId;
    }

    return this.createNewBook(bookDetails, quantity);
  }

  createNewBook(bookDetails: BookDetails, quantity: number): string {
    const book = new Book(bookDetails);

    this.books.set(book.id, {
      book,
      quantity,
    });

    return book.id;
  }

  deleteBook(bookId: string): void {
    const { book } = this.findBookOrThrow(bookId);

    book.deletedAt = new Date();
    book.updatedAt = new Date();
  }

  findBookOrThrow(bookId: string): BookInformation {
    if (!this.books.has(bookId)) {
      throw new Error('Book not found');
    }

    return this.books.get(bookId);
  }

  findBookIdByIsbn(isbn: string): string {
    const book = [...this.books].find(
      ([id, bookInformation]) => bookInformation.book.isbn === isbn
    );

    return book ? book[0] : null;
  }

  restockBookQuantity(bookId: string, quantity: number): void {
    DataValidator.checkIfNotEqualOrBelowZero(quantity);

    const book = this.findBookOrThrow(bookId);
    book.quantity += quantity;
  }
}
