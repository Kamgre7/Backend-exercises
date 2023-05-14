import {
  Book,
  IBook,
} from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import {
  Booking,
  BookingDetails,
  IBooking,
} from '../../../../be-fundamentals/OOP/library-hard/Booking/Booking';
import {
  BookingHandler,
  IBookingHandler,
} from '../../../../be-fundamentals/OOP/library-hard/Booking/BookingHandler';
import {
  IUser,
  User,
} from '../../../../be-fundamentals/OOP/library-hard/User/User';
import {
  hpBookDetails,
  johnUserEmail,
  lotrBookDetails,
} from '../utils/constants';

describe('BookingHandler', () => {
  let harryPotter: IBook;
  let lordOfTheRings: IBook;
  let john: IUser;
  let bookingHandler: IBookingHandler;
  let johnBookingDetails: BookingDetails;
  let johnBooking: IBooking;

  beforeAll(() => {
    bookingHandler = new BookingHandler();
  });

  beforeEach(() => {
    john = new User(johnUserEmail);

    harryPotter = new Book({ ...hpBookDetails });

    lordOfTheRings = new Book({ ...lotrBookDetails });

    johnBookingDetails = {
      bookIds: [harryPotter.id, lordOfTheRings.id],
      userId: john.id,
    };

    johnBooking = new Booking(johnBookingDetails);
  });

  it('Should be a instance of BookingHandler', () => {
    expect(bookingHandler).toBeInstanceOf(BookingHandler);
  });

  it('Should return book', () => {
    const bookBookingInfo = johnBooking.books.get(harryPotter.id);

    expect(bookBookingInfo.isRented).toBeTruthy();

    bookingHandler.returnBooks(johnBooking, [harryPotter.id]);

    expect(bookBookingInfo.isRented).toBeFalsy();
  });

  it('Should return false - books are not returned', () => {
    expect(bookingHandler.checkIfAllBooksReturned(johnBooking)).toBeFalsy();
  });

  it('Should set booking isActive value - false ', () => {
    johnBooking.books.get(harryPotter.id).isRented = false;
    johnBooking.books.get(lordOfTheRings.id).isRented = false;

    bookingHandler.deactivateBooking(johnBooking);

    expect(johnBooking.isActive).toBeFalsy();
  });

  it('Should return booking returned date', () => {
    expect(johnBooking.getReturnDate()).toStrictEqual(johnBooking.returnedAt);
  });

  describe('Should throw error when', () => {
    it('Should throw error when some books are not returned when trying to change booking status - isActive to false', () => {
      expect(() => {
        bookingHandler.deactivateBooking(johnBooking);
      }).toThrow();
    });

    it('Should throw error when trying to change the status to inactive when is already inactive', () => {
      johnBooking.books.get(harryPotter.id).isRented = false;
      johnBooking.books.get(lordOfTheRings.id).isRented = false;
      johnBooking.isActive = false;

      expect(() => {
        bookingHandler.deactivateBooking(johnBooking);
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
      johnBooking.books.get(harryPotter.id).isRented = false;

      expect(() => {
        bookingHandler.returnBooks(johnBooking, [harryPotter.id]);
      }).toThrow();
    });
  });
});
