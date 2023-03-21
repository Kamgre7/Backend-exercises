import { v4 as uuid } from 'uuid';

export type BookingDetails = {
  userId: string;
  bookId: string;
};

export interface IBooking extends BookingDetails {
  id: string;
  isActive: boolean;
  bookedAt: Date;
  returnedAt: Date;
  setIsNotActive(): void;
  setReturnedDate(): void;
  getBookedDate(): Date;
  getReturnedDate(): Date;
}

export class Booking implements IBooking {
  userId: string;
  bookId: string;
  isActive: boolean = true;
  bookedAt: Date = new Date();
  returnedAt: Date;

  constructor(bookingDetails: BookingDetails, public readonly id = uuid()) {
    const { bookId, userId } = bookingDetails;

    this.verifyId(userId, bookId);

    this.bookId = bookId;
    this.userId = userId;
  }

  setIsNotActive(): void {
    this.isActive = false;
  }

  setReturnedDate(): void {
    this.returnedAt = new Date();
  }

  getBookedDate(): Date {
    return this.bookedAt;
  }

  getReturnedDate(): Date {
    if (!this.returnedAt) {
      throw new Error('Book is not returned');
    }

    return this.returnedAt;
  }

  private verifyId(userId: string, bookId: string): void {
    if (userId.length !== 36 || bookId.length !== 36) {
      throw new Error('Invalid id');
    }
  }
}
