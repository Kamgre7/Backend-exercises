import { Booking, BookingDetails, IBooking } from './Booking';
import { bookingDB } from './libraryDB';

export interface IBookingList {
  bookings: Map<string, IBooking>;
  addBooking(bookingDetails: BookingDetails): string;
  findBookingOrThrow(bookingId: string): IBooking;
}

export class BookingList implements IBookingList {
  private static instance: BookingList;

  private constructor(public bookings = bookingDB) {}

  static getInstance(bookings?: Map<string, IBooking>): BookingList {
    if (!BookingList.instance) {
      BookingList.instance = new BookingList(bookings);
    }

    return BookingList.instance;
  }

  addBooking(bookingDetails: BookingDetails): string {
    const booking = new Booking({
      userId: bookingDetails.userId,
      booksId: bookingDetails.booksId,
    });

    this.bookings.set(booking.id, booking);

    return booking.id;
  }

  findBookingOrThrow(bookingId: string): IBooking {
    if (!this.bookings.has(bookingId)) {
      throw new Error('Booking not found');
    }

    return this.bookings.get(bookingId);
  }
}
