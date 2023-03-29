import { Book } from '../../../be-fundamentals/OOP/library-hard/Book';
import {
  Booking,
  BookingDetails,
  IBooking,
} from '../../../be-fundamentals/OOP/library-hard/Booking';
import { BookingList } from '../../../be-fundamentals/OOP/library-hard/BookingList';
import { User } from '../../../be-fundamentals/OOP/library-hard/User';

let harryPotter: Book;
let lordOfTheRings: Book;
let john: User;
let kate: User;
let bookingList: BookingList;
let bookings: Map<string, IBooking>;
let hpBookingDetails: BookingDetails;
let lotrBookingDetails: BookingDetails;
let hpBookingInformation: Booking;
let lotrBookingInformation: Booking;

beforeAll(() => {
  bookingList = BookingList.getInstance(bookings);
});

beforeEach(() => {
  kate = new User('kate@example.com');
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

  hpBookingDetails = {
    bookId: harryPotter.id,
    userId: kate.id,
  };

  lotrBookingDetails = {
    bookId: lordOfTheRings.id,
    userId: john.id,
  };

  hpBookingInformation = new Booking(hpBookingDetails);
  lotrBookingInformation = new Booking(lotrBookingDetails);

  bookings = new Map([
    [hpBookingInformation.id, hpBookingInformation],
    [lotrBookingInformation.id, lotrBookingInformation],
  ]);

  bookingList.bookings = bookings;
});

describe('BookingList', () => {
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
      bookId: harryPotter.id,
    };

    const newBookingId = bookingList.addBooking(bookingDetails);

    expect(bookingList.bookings.has(newBookingId)).toBeTruthy();
  });

  it('Should find a booking by ID and return it', () => {
    const booking = bookingList.findBooking(hpBookingInformation.id);

    expect(booking).toStrictEqual(hpBookingInformation);
  });

  describe('Should throw error when', () => {
    it('Should throw error when booking not found', () => {
      expect(() => {
        bookingList.findBooking('12345');
      }).toThrow();
    });

    it('Should throw error when creating booking with  wrong user ID', () => {
      expect(() => {
        bookingList.addBooking({
          userId: '1234',
          bookId: harryPotter.id,
        });
      }).toThrow();
    });

    it('Should throw error when creating booking with  wrong book ID', () => {
      expect(() => {
        new Booking({
          userId: john.id,
          bookId: '4321',
        });
      }).toThrow();
    });
  });
});
