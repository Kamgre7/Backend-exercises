import { Book } from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import {
  Booking,
  BookingDetails,
} from '../../../../be-fundamentals/OOP/library-hard/Booking/Booking';
import { BookingHandler } from '../../../../be-fundamentals/OOP/library-hard/Booking/BookingHandler';
import { User } from '../../../../be-fundamentals/OOP/library-hard/User/User';

describe('BookingHandler', () => {
  let harryPotter: Book;
  let lordOfTheRings: Book;
  let john: User;
  let bookingHandler: BookingHandler;
  let johnBookingDetails: BookingDetails;
  let johnBooking: Booking;

  beforeAll(() => {
    bookingHandler = new BookingHandler();
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
  });

  it('Should be a instance of BookingHandler', () => {
    expect(bookingHandler).toBeInstanceOf(BookingHandler);
  });

  it('Should set a book is returned', () => {
    const bookBookingInfo = johnBooking.books.get(harryPotter.id);

    expect(bookBookingInfo.isRented).toBeTruthy();

    bookingHandler.returnBooks(johnBooking, [harryPotter.id]);

    expect(bookBookingInfo.isRented).toBeFalsy();
  });

  it('Should return false - books are not returned', () => {
    expect(bookingHandler.checkIfAllBooksReturned(johnBooking)).toBeFalsy();
  });

  it('Should set booking isActive value - false ', () => {
    bookingHandler.returnBooks(johnBooking, [
      harryPotter.id,
      lordOfTheRings.id,
    ]);

    bookingHandler.setIsNotActive(johnBooking);

    expect(johnBooking.isActive).toBeFalsy();
  });

  it('Should return booking returned date', () => {
    johnBooking.getReturnDate();
    expect(johnBooking.getReturnDate()).toStrictEqual(johnBooking.returnedAt);
  });

  describe('Should throw error when', () => {
    it('Should throw error when some books are not returned when trying to change booking status - isActive to false', () => {
      expect(() => {
        bookingHandler.setIsNotActive(johnBooking);
      }).toThrow();
    });

    it('Should throw error when trying to change the status to inactive when is already inactive', () => {
      bookingHandler.returnBooks(johnBooking, [
        harryPotter.id,
        lordOfTheRings.id,
      ]);

      bookingHandler.setIsNotActive(johnBooking);

      expect(() => {
        bookingHandler.setIsNotActive(johnBooking);
      }).toThrow();
    });

    it('Should throw error when returned book is not from booking', () => {
      expect(() => {
        bookingHandler.checkIfBookingIncludeBooks(johnBooking, [
          harryPotter.id,
          '123456',
        ]);
      }).toThrow();
    });

    it('Should throw error when trying to return returned book', () => {
      bookingHandler.returnBooks(johnBooking, [harryPotter.id]);

      expect(() => {
        bookingHandler.returnBooks(johnBooking, [harryPotter.id]);
      }).toThrow();
    });
  });
});
