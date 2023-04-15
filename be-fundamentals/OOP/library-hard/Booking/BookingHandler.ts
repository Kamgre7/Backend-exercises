import { IBooking } from './Booking';

export interface IBookingHandler {
  setIsNotActive(booking: IBooking): void;
  setReturnDate(booking: IBooking): void;
  setBooksAreReturned(booking: IBooking, bookIds: string[]): void;
  checkIfAllBooksReturned(booking: IBooking): boolean;
  checkIfBookingActiveOrThrow(booking: IBooking): void;
  verifyTheBooksToBeReturned(booking: IBooking, bookIds: string[]): void;
  checkIfBookingIncludeBooks(booking: IBooking, bookIds: string[]): void;
  checkIfBooksAreActive(booking: IBooking, bookIds: string[]): void;
}

export class BookingHandler implements IBookingHandler {
  setIsNotActive(booking: IBooking): void {
    booking.setIsNotActive();
  }

  setReturnDate(booking: IBooking): void {
    booking.returnedAt = new Date();
  }

  setBooksAreReturned(booking: IBooking, bookIds: string[]): void {
    this.checkIfBooksAreActive(booking, bookIds);
    booking.setBooksAreReturned(bookIds);
  }

  checkIfAllBooksReturned(booking: IBooking): boolean {
    return booking.checkIfAllBooksReturned();
  }

  checkIfBookingActiveOrThrow(booking: IBooking): void {
    if (!booking.isActive) {
      throw new Error('Booking is already not active');
    }
  }

  verifyTheBooksToBeReturned(booking: IBooking, bookIds: string[]): void {
    this.checkIfBookingIncludeBooks(booking, bookIds);
    this.checkIfBooksAreActive(booking, bookIds);
  }

  checkIfBookingIncludeBooks(booking: IBooking, bookIds: string[]): void {
    const bookingIncludeBooks = bookIds.every((id) => booking.books.has(id));

    if (!bookingIncludeBooks) {
      throw new Error('Books are not from booking');
    }
  }

  checkIfBooksAreActive(booking: IBooking, bookIds: string[]): void {
    const booksAreActive = bookIds.every(
      (id) => booking.books.get(id).isRented
    );

    if (!booksAreActive) {
      throw new Error('Cannot return books which are returned');
    }
  }
}
