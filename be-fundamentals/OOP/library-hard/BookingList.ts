import { Booking, BookingDetails, IBooking } from './Booking';
import { bookingDB } from './libraryDB';

export interface IBookingList {
  bookings: Map<string, IBooking>;
  addBooking(bookingDetails: BookingDetails): string;
  findBooking(bookingId: string): IBooking;
  getBookedDate(bookingId: string): Date;
  getReturnedDate(bookingId: string): Date;
  setBookingIsNotActive(bookingId: string): void;
  setBookingReturned(bookingId: string): void;
}

export class BookingList implements IBookingList {
  private static instance: BookingList;

  private constructor(public bookings = bookingDB) {}

  static getInstance(bookings?: Map<string, IBooking>): BookingList {
    if (!BookingList.instance) {
      BookingList.instance = this.getInstance(bookings);
    }

    return BookingList.instance;
  }

  addBooking(bookingDetails: BookingDetails): string {
    const booking = new Booking({
      userId: bookingDetails.userId,
      bookId: bookingDetails.bookId,
    });

    this.bookings.set(booking.id, booking);

    return booking.id;
  }

  setBookingReturned(bookingId: string): void {
    const booking = this.findBooking(bookingId);

    booking.setReturnedDate();
    booking.setIsNotActive();
  }

  setBookingIsNotActive(bookingId: string): void {
    const booking = this.findBooking(bookingId);
    booking.setIsNotActive();
  }

  getBookedDate(bookingId: string): Date {
    const booking = this.findBooking(bookingId);

    return booking.getBookedDate();
  }

  getReturnedDate(bookingId: string): Date {
    const booking = this.findBooking(bookingId);

    return booking.getReturnedDate();
  }

  findBooking(bookingId: string): IBooking {
    if (!this.bookings.has(bookingId)) {
      throw new Error('Booking not found');
    }

    return this.bookings.get(bookingId);
  }
}
