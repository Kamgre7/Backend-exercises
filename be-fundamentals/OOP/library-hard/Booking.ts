import { v4 as uuid, validate } from 'uuid';
import { currentDate, dateFormatRegex } from './utils';

export type BookingDetails = {
  userId: string;
  booksId: string[];
};

export type BookActive = {
  isActive: boolean;
  returnedAt: Date;
};

export interface IBooking {
  id: string;
  userId: string;
  books: Map<string, BookActive>;
  isActive: boolean;
  createdAt: Date;
  returnedAt: Date;
  setIsNotActive(): void;
  setReturnDate(date?: string): void;
  setBooksAreReturned(booksId: string[]): void;
  checkIfAllBooksReturned(): boolean;
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
    if (this.checkIfAllBooksReturned()) {
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

  setBooksAreReturned(booksId: string[]): void {
    booksId.forEach((id) => {
      const book = this.books.get(id);

      if (book.isActive) {
        book.isActive = false;
        book.returnedAt = new Date();
      }
    });
  }

  checkIfAllBooksReturned(): boolean {
    return [...this.books].every(
      ([id, bookActive]) => bookActive.isActive === false
    );
  }

  private setBookList(bookIdList: string[]): void {
    bookIdList.forEach((id) => {
      this.books.set(id, { isActive: true, returnedAt: null });
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
    return new Date(date) <= currentDate();
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
