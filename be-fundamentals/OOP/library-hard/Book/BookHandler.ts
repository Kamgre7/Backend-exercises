import { DataValidator } from '../utils/DataValidator';
import { IBook } from './Book';
import { BookInformation } from './BookList';

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
    book.setTitle(newTitle);
  }

  setIsbn(book: IBook, newIsbn: string): void {
    book.setIsbn(newIsbn);
  }

  setQuantity(book: BookInformation, quantity: number): void {
    DataValidator.checkIfInteger(quantity);

    const sumQuantity = book.quantity + quantity;

    DataValidator.checkIfNotBelowZero(sumQuantity);

    book.quantity += quantity;
  }
}
