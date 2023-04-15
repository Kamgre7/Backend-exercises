import { bookingDB } from '../utils/libraryDB';
import { Booking, BookingDetails, IBooking } from './Booking';

export interface IBookingList {
  bookings: Map<string, IBooking>;
  addBooking(bookingDetails: BookingDetails): string;
  findBookingByIdOrThrow(bookingId: string): IBooking;
}

export class BookingList implements IBookingList {
  private static instance: BookingList;

  private constructor(public bookings: Map<string, IBooking>) {}

  static getInstance(bookings: Map<string, IBooking> = bookingDB): BookingList {
    if (!BookingList.instance) {
      BookingList.instance = new BookingList(bookings);
    }

    return BookingList.instance;
  }

  addBooking(bookingDetails: BookingDetails): string {
    const booking = new Booking({
      userId: bookingDetails.userId,
      bookIds: bookingDetails.bookIds,
    });

    this.bookings.set(booking.id, booking);

    return booking.id;
  }

  findBookingByIdOrThrow(bookingId: string): IBooking {
    const booking = this.bookings.get(bookingId);

    if (booking === undefined) {
      throw new Error('Booking not found');
    }

    return booking;
  }
}
