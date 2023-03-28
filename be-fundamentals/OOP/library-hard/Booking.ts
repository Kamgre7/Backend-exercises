import { v4 as uuid, validate } from 'uuid';
import { dateFormatRegex } from './utils';

export type BookingDetails = {
  userId: string;
  bookId: string;
};

export interface IBooking extends BookingDetails {
  id: string;
  isActive: boolean;
  createdAt: Date;
  returnAt: Date;
  setIsNotActive(): void;
  setReturnDate(date?: string): void;
  getBookDate(): Date;
  getReturnDate(): Date;
}

export class Booking implements IBooking {
  readonly userId: string;
  readonly bookId: string;
  isActive: boolean = true;
  createdAt: Date = new Date();
  returnAt: Date;

  constructor(bookingDetails: BookingDetails, public readonly id = uuid()) {
    const { bookId, userId } = bookingDetails;

    this.verifyId(userId, bookId);

    this.bookId = bookId;
    this.userId = userId;
  }

  setIsNotActive(): void {
    this.isActive = false;
  }

  setReturnDate(date?: string): void {
    this.returnAt =
      dateFormatRegex.test(date) &&
      new Date(date) <= new Date() &&
      new Date(date) > this.createdAt
        ? new Date(date)
        : new Date();
  }

  getBookDate(): Date {
    return this.createdAt;
  }

  getReturnDate(): Date {
    return this.returnAt;
  }

  private verifyId(userId: string, bookId: string): void {
    if (!validate(userId) || !validate(bookId)) {
      throw new Error('Invalid id');
    }
  }
}
