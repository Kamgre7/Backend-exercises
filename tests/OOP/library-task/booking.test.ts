import { Book } from '../../../be-fundamentals/OOP/library-hard/Book';
import { Booking } from '../../../be-fundamentals/OOP/library-hard/Booking';
import { User } from '../../../be-fundamentals/OOP/library-hard/User';

let booking: Booking;
let user: User;
let book: Book;

beforeEach(() => {
  user = new User('user@email.com');

  book = new Book({
    title: 'Harry Potter',
    author: 'J.K Rowling',
    isbn: '1234',
  });

  booking = new Booking({
    bookId: book.id,
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

  it('Should set isActive value - false ', () => {
    booking.setIsNotActive();

    expect(booking.isActive).toBeFalsy();
  });

  it('Should set returnAt date - 2022/05/28', () => {
    booking.createdAt = new Date('2022/05/20');
    booking.setReturnDate('2022/05/28');

    expect(booking.returnAt).toStrictEqual(new Date('2022/05/28'));
  });

  it('Should set returnAt date - current date', () => {
    booking.setReturnDate();

    expect(booking.returnAt).toStrictEqual(new Date());
  });

  it('Should return booking return date', () => {
    booking.setReturnDate();
    expect(booking.getReturnDate()).toStrictEqual(booking.returnAt);
  });

  describe('Should throw error when', () => {
    it('Should throw error when user ID is not uuid', () => {
      expect(() => {
        new Booking({
          userId: '1234',
          bookId: book.id,
        });
      }).toThrow();
    });

    it('Should throw error when book ID is not uuid', () => {
      expect(() => {
        new Booking({
          userId: '1234',
          bookId: book.id,
        });
      }).toThrow();
    });
  });
});
