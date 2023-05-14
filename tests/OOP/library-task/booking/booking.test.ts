import {
  Book,
  IBook,
} from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import {
  Booking,
  IBooking,
} from '../../../../be-fundamentals/OOP/library-hard/Booking/Booking';
import {
  IUser,
  User,
} from '../../../../be-fundamentals/OOP/library-hard/User/User';
import {
  hpBookDetails,
  johnUserEmail,
  witcherBookDetails,
} from '../utils/constants';

describe('Booking', () => {
  let booking: IBooking;
  let user: IUser;
  let hpBook: IBook;
  let witcherBook: IBook;

  beforeEach(() => {
    user = new User(johnUserEmail);

    hpBook = new Book({ ...hpBookDetails });

    witcherBook = new Book({ ...witcherBookDetails });

    booking = new Booking({
      bookIds: [hpBook.id, witcherBook.id],
      userId: user.id,
    });
  });

  it('Should be instance of Booking class', () => {
    expect(booking).toBeInstanceOf(Booking);
  });

  it('Should have default value of isActive - true', () => {
    expect(booking.isActive).toBeTruthy();
  });

  it('Should have default value of returnedAt - null', () => {
    expect(booking.returnedAt).toBeNull();
  });

  it('Should return book', () => {
    const hpBookBookingInfo = booking.books.get(hpBook.id);

    expect(hpBookBookingInfo.isRented).toBeTruthy();

    booking.returnBooks([hpBook.id]);

    expect(hpBookBookingInfo.isRented).toBeFalsy();
  });

  it('Should return false - all books are not returned', () => {
    booking.returnBooks([hpBook.id]);
    expect(booking.checkIfAllBooksReturned()).toBeFalsy();
  });

  it('Should set booking isActive value - false ', () => {
    booking.books.get(hpBook.id).isRented = false;
    booking.books.get(witcherBook.id).isRented = false;

    booking.deactivate();
    expect(booking.isActive).toBeFalsy();
  });

  it('Should return booking returned date', () => {
    expect(booking.getReturnDate()).toStrictEqual(booking.returnedAt);
  });

  describe('Should throw error when', () => {
    it('Should throw error when user ID is not uuid', () => {
      expect(() => {
        new Booking({
          userId: '1234',
          bookIds: [hpBook.id],
        });
      }).toThrow();
    });

    it('Should throw error when book ID is not uuid', () => {
      expect(() => {
        new Booking({
          userId: user.id,
          bookIds: ['12345'],
        });
      }).toThrow();
    });

    it('Should throw error when some books are not returned when trying to change booking status - isActive to false', () => {
      expect(() => {
        booking.deactivate();
      }).toThrow();
    });
  });
});
