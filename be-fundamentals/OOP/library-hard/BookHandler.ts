import { IBook } from './Book';
import { BookInformation } from './BookList';
import { DataValidator } from './DataValidator';

export interface IBookHandler {
  setAuthor(book: IBook, newAuthor: string): void;
  setTitle(book: IBook, newTitle: string): void;
  setIsbn(book: IBook, newIsbn: string): void;
  setQuantity(book: BookInformation, quantity: number): void;
}

export class BookHandler implements IBookHandler {
  setAuthor(book: IBook, newAuthor: string): void {
    book.setAuthor(newAuthor);
  }

  setTitle(book: IBook, newTitle: string): void {
    book.setAuthor(newTitle);
  }

  setIsbn(book: IBook, newIsbn: string): void {
    book.setAuthor(newIsbn);
  }

  setQuantity(book: BookInformation, quantity: number): void {
    DataValidator.checkIfNotEqualOrBelowZero(quantity);

    book.quantity += quantity;
  }
}
