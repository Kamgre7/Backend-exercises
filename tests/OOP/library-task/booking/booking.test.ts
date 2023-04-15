import { Book } from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import { Booking } from '../../../../be-fundamentals/OOP/library-hard/Booking/Booking';
import { User } from '../../../../be-fundamentals/OOP/library-hard/User/User';

let booking: Booking;
let user: User;
let hpBook: Book;
let witcherBook: Book;

beforeEach(() => {
  user = new User('user@email.com');

  hpBook = new Book({
    title: 'Harry Potter',
    author: 'J.K Rowling',
    isbn: '1234',
  });

  witcherBook = new Book({
    title: 'The Witcher',
    author: 'A. Sapkowski',
    isbn: 'BYS321',
  });

  booking = new Booking({
    bookIds: [hpBook.id, witcherBook.id],
    userId: user.id,
  });
});

describe('Booking', () => {
  it('Should be instance of Booking class', () => {
    expect(booking).toBeInstanceOf(Booking);
  });

  it('Should have default value of isActive - true', () => {
    expect(booking.isActive).toBeTruthy();
  });

  it('Should have default value of returnedAt - undefined', () => {
    expect(booking.returnedAt).toBeUndefined();
  });

  it('Should set book is returned', () => {
    booking.returnBooks([hpBook.id]);
    const hpBookBookingInfo = booking.books.get(hpBook.id);
    const witherBookBookingInfo = booking.books.get(witcherBook.id);

    expect(hpBookBookingInfo.isRented).toBeFalsy();
    expect(witherBookBookingInfo.isRented).toBeTruthy();
  });

  it('Should return false - books are not returned', () => {
    expect(booking.checkIfAllBooksReturned()).toBeFalsy();
  });

  it('Should set booking isActive value - false ', () => {
    booking.returnBooks([hpBook.id, witcherBook.id]);
    booking.setIsNotActive();

    expect(booking.isActive).toBeFalsy();
  });

  it('Should return booking returned date', () => {
    booking.getReturnDate();
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
        booking.setIsNotActive();
      }).toThrow();
    });
  });
});
