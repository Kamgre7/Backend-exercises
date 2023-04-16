import { bookingDB } from '../utils/libraryDB';
import { IBooking } from './Booking';

export interface IBookingList {
  bookings: Map<string, IBooking>;
  addBooking(booking: IBooking): string;
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

  addBooking(booking: IBooking): string {
    this.bookings.set(booking.id, booking);

    return booking.id;
  }

  findBookingByIdOrThrow(bookingId: string): IBooking {
    const booking = this.bookings.get(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    return booking;
  }
}
