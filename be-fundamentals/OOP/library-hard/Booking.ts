import { v4 as uuid, validate } from 'uuid';
import { dateFormatRegex } from './utils';

export type BookingDetails = {
  userId: string;
  booksId: string[];
};

export type BookActive = {
  isActive: boolean;
};

export interface IBooking {
  id: string;
  books: Map<string, BookActive>;
  isActive: boolean;
  createdAt: Date;
  returnedAt: Date;
  setIsNotActive(): void;
  setReturnDate(date?: string): void;
  setBookIsReturned(booksId: string[]): void;
  getBookDate(): Date;
  getReturnDate(): Date;
}

export class Booking implements IBooking {
  readonly userId: string;
  books: Map<string, BookActive>;
  isActive: boolean = true;
  createdAt: Date = new Date();
  returnedAt: Date;

  constructor(bookingDetails: BookingDetails, public readonly id = uuid()) {
    const { userId, booksId } = bookingDetails;

    this.verifyId(userId, booksId);

    this.userId = userId;
    this.setBookList(booksId);
  }

  setIsNotActive(): void {
    const isAllBooksReturned = [...this.books].every(
      ([id, bookActive]) => bookActive.isActive === false
    );

    if (isAllBooksReturned) {
      this.isActive = false;
      this.setReturnDate();
    }

    throw new Error('Some books are not returned yet');
  }

  setReturnDate(date?: string): void {
    this.returnedAt = this.checkIfValidDate(date) ? new Date(date) : new Date();
  }

  getBookDate(): Date {
    return this.createdAt;
  }

  getReturnDate(): Date {
    return this.returnedAt;
  }

  setBookIsReturned(booksId: string[]): void {
    booksId.forEach((bookId) => {
      const book = this.books.get(bookId);

      if (book.isActive) {
        book.isActive = false;
      }
    });
  }

  private setBookList(bookIdList: string[]): void {
    bookIdList.forEach((id) => {
      this.books.set(id, { isActive: true });
    });
  }

  private checkIfValidDate(date: string): boolean {
    return (
      dateFormatRegex.test(date) &&
      this.dateEarlierOrEqualCurrentDate(date) &&
      this.dateLaterThanCreatedAt(date)
    );
  }

  private dateEarlierOrEqualCurrentDate(date: string): boolean {
    return new Date(date) <= new Date();
  }

  private dateLaterThanCreatedAt(date: string): boolean {
    return new Date(date) > this.createdAt;
  }

  private verifyId(userId: string, booksId: string[]): void {
    if (!validate(userId)) {
      throw new Error('Invalid user id');
    }

    const isValidBooksId = booksId.every((id) => validate(id));

    if (!isValidBooksId) {
      throw new Error('Invalid book id');
    }
  }
}
