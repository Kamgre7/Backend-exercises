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
  findBook(bookId: string): BookInformation;
  setBookAuthor(bookId: string, newAuthor: string): void;
  setBookTitle(bookId: string, newTitle: string): void;
  setBookIsbn(bookId: string, newIsbn: string): void;
  setBookQuantity(bookId: string, quantity: number): void;
  increaseBookQuantityByOne(bookId: string): void;
  decreaseBookQuantityByOne(bookId: string): void;
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
    const book = this.findBook(bookId);

    this.books.delete(book.book.id);
  }

  setBookAuthor(bookId: string, newAuthor: string): void {
    const book = this.findBook(bookId);

    book.book.setAuthor(newAuthor);
  }

  setBookTitle(bookId: string, newTitle: string): void {
    const book = this.findBook(bookId);

    book.book.setTitle(newTitle);
  }

  setBookIsbn(bookId: string, newIsbn: string): void {
    const book = this.findBook(bookId);

    book.book.setIsbn(newIsbn);
  }

  findBook(bookId: string): BookInformation {
    if (!this.books.has(bookId)) {
      throw new Error('User not found');
    }

    return this.books.get(bookId);
  }

  increaseBookQuantityByOne(bookId: string): void {
    const book = this.findBook(bookId);

    book.quantity += 1;
  }

  decreaseBookQuantityByOne(bookId: string): void {
    const book = this.findBook(bookId);

    book.quantity -= 1;
  }

  setBookQuantity(bookId: string, quantity: number): void {
    this.checkIfNotEqualOrBelowZero(quantity);

    const book = this.findBook(bookId);
    book.quantity = quantity;
  }

  private checkIfNotEqualOrBelowZero(quantity: number) {
    if (quantity <= 0) {
      throw new Error(`Cannot set quantity value less than 1`);
    }
  }
}
