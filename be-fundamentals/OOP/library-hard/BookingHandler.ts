import { IBooking } from './Booking';

export interface IBookingHandler {
  setIsNotActive(booking: IBooking): void;
  setReturnDate(booking: IBooking, date?: string): void;
  setBooksAreReturned(booking: IBooking, booksId: string[]): void;
  checkIfAllBooksReturned(booking: IBooking): boolean;
  checkIfBookingActiveOrThrow(booking: IBooking): void;
  verifyTheBooksToBeReturned(booking: IBooking, booksId: string[]): void;
  checkIfBookingIncludeBooks(booking: IBooking, booksId: string[]): void;
  checkIfBooksAreActive(booking: IBooking, booksId: string[]): void;
}

export class BookingHandler implements IBookingHandler {
  setIsNotActive(booking: IBooking): void {
    booking.setIsNotActive();
  }

  setReturnDate(booking: IBooking, date?: string): void {
    booking.setReturnDate(date);
  }

  setBooksAreReturned(booking: IBooking, booksId: string[]): void {
    this.checkIfBooksAreActive(booking, booksId);
    booking.setBooksAreReturned(booksId);
  }

  checkIfAllBooksReturned(booking: IBooking): boolean {
    return booking.checkIfAllBooksReturned();
  }

  checkIfBookingActiveOrThrow(booking: IBooking): void {
    if (!booking.isActive) {
      throw new Error('Booking is already not active');
    }
  }

  verifyTheBooksToBeReturned(booking: IBooking, booksId: string[]): void {
    this.checkIfBookingIncludeBooks(booking, booksId);
    this.checkIfBooksAreActive(booking, booksId);
  }

  checkIfBookingIncludeBooks(booking: IBooking, booksId: string[]): void {
    const bookingIncludeBooks = booksId.every((id) => booking.books.has(id));

    if (!bookingIncludeBooks) {
      throw new Error('Books are not from booking');
    }
  }

  checkIfBooksAreActive(booking: IBooking, booksId: string[]): void {
    const boosAreActive = booksId.every((id) => booking.books.get(id).isActive);

    if (!boosAreActive) {
      throw new Error('Cannot return books which are returned');
    }
  }
}
