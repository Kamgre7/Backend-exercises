import { Book } from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import {
  Booking,
  BookingDetails,
  IBooking,
} from '../../../../be-fundamentals/OOP/library-hard/Booking/Booking';
import { BookingList } from '../../../../be-fundamentals/OOP/library-hard/Booking/BookingList';
import { User } from '../../../../be-fundamentals/OOP/library-hard/User/User';

describe('BookingList', () => {
  let harryPotter: Book;
  let lordOfTheRings: Book;
  let john: User;
  let bookingList: BookingList;
  let bookings: Map<string, IBooking>;
  let johnBookingDetails: BookingDetails;
  let johnBooking: Booking;

  beforeAll(() => {
    bookingList = BookingList.getInstance(bookings);
  });

  beforeEach(() => {
    john = new User('john@example.com');

    harryPotter = new Book({
      title: 'Harry Potter',
      author: 'J.K Rowling',
      isbn: '1234',
    });

    lordOfTheRings = new Book({
      title: 'Lord Of The Rings',
      author: 'J.R.R Tolkien',
      isbn: '4321',
    });

    johnBookingDetails = {
      bookIds: [harryPotter.id, lordOfTheRings.id],
      userId: john.id,
    };

    johnBooking = new Booking(johnBookingDetails);

    bookings = new Map<string, IBooking>([[johnBooking.id, johnBooking]]);

    bookingList.bookings = bookings;
  });

  it('Should be instance of BookingList', () => {
    expect(bookingList).toBeInstanceOf(BookingList);
  });

  it('Should return already created userList instance, after trying to create a new instance of UserList', () => {
    const secondBookingList = BookingList.getInstance();

    expect(bookingList).toStrictEqual(secondBookingList);
  });

  it('Should add a new booking', () => {
    const bookingDetails = {
      userId: john.id,
      bookIds: [harryPotter.id],
    };

    const booking = new Booking(bookingDetails);
    const bookingId = bookingList.addBooking(booking);

    expect(bookingList.bookings.has(bookingId)).toBeTruthy();
  });

  it('Should find a booking by ID and return it', () => {
    const booking = bookingList.findBookingByIdOrThrow(johnBooking.id);

    expect(booking).toStrictEqual(johnBooking);
  });

  describe('Should throw error when', () => {
    it('Should throw error when booking not found', () => {
      expect(() => {
        bookingList.findBookingByIdOrThrow('12345');
      }).toThrow();
    });
  });
});
