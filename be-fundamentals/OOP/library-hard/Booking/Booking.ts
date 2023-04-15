import { v4 as uuid, validate } from 'uuid';

export type BookingDetails = {
  userId: string;
  bookIds: string[];
};

export type BookRentInformation = {
  isRented: boolean;
  returnedAt: Date;
};

export interface IBooking {
  id: string;
  userId: string;
  books: Map<string, BookRentInformation>;
  isActive: boolean;
  createdAt: Date;
  returnedAt: Date | null;
  setIsNotActive(): void;
  setBooksAreReturned(bookIds: string[]): void;
  checkIfAllBooksReturned(): boolean;
  getBookingDate(): Date;
  getReturnDate(): Date;
}

export class Booking implements IBooking {
  readonly userId: string;
  books: Map<string, BookRentInformation> = new Map<
    string,
    BookRentInformation
  >();
  isActive: boolean = true;
  createdAt: Date = new Date();
  returnedAt: Date;

  constructor(bookingDetails: BookingDetails, public readonly id = uuid()) {
    const { userId, bookIds } = bookingDetails;

    this.verifyId(userId, bookIds);

    this.userId = userId;
    this.setBookingList(bookIds);
  }

  setIsNotActive(): void {
    if (!this.checkIfAllBooksReturned()) {
      throw new Error('Some books are not returned yet');
    }

    this.isActive = false;
    this.returnedAt = new Date();
  }

  getBookingDate(): Date {
    return this.createdAt;
  }

  getReturnDate(): Date {
    return this.returnedAt;
  }

  setBooksAreReturned(bookIds: string[]): void {
    bookIds.forEach((id) => {
      const book = this.books.get(id);

      if (book.isRented) {
        book.isRented = false;
        book.returnedAt = new Date();
      }
    });
  }

  checkIfAllBooksReturned(): boolean {
    return [...this.books].every(
      ([id, bookRentInformation]) => bookRentInformation.isRented === false
    );
  }

  private setBookingList(bookIds: string[]): void {
    bookIds.forEach((id) => {
      this.books.set(id, { isRented: true, returnedAt: null });
    });
  }

  private verifyId(userId: string, bookIds: string[]): void {
    if (!validate(userId)) {
      throw new Error('Invalid user id');
    }

    const isValidBookIds = bookIds.every((id) => validate(id));

    if (!isValidBookIds) {
      throw new Error('Invalid book id');
    }
  }
}
