import { BookDetails } from './Book';
import { BookingList, IBookingList } from './BookingList';
import { BookList, IBookList } from './BookList';
import { IUserList, UserList } from './UserList';
import { BOOKING_TIME, DAY_IN_MILLISECONDS, MONTH_IN_DAYS } from './utils';

export interface ILibrary {
  bookList: IBookList;
  userList: IUserList;
  bookingList: IBookingList;
  addBook(bookDetails: BookDetails, quantity: number): string;
  deleteBook(bookId: string): void;
  setBookQuantity(bookId: string, quantity: number): void;
  addUser(email: string): string;
  setUserEmail(userId: string, newEmail: string): void;
  activateUser(userId: string): void;
  rentBook(bookId: string, userId: string): string;
  returnBook(bookingId: string, userId: string): void;
}

export class Library implements ILibrary {
  private static instance: Library;

  private constructor(
    public bookList = BookList.getInstance(),
    public userList = UserList.getInstance(),
    public bookingList = BookingList.getInstance()
  ) {}

  static getInstance(
    bookList?: BookList,
    userList?: UserList,
    bookingList?: BookingList
  ): Library {
    if (!Library.instance) {
      Library.instance = new Library(bookList, userList, bookingList);
    }

    return Library.instance;
  }

  addBook(bookDetails: BookDetails, quantity: number): string {
    return this.bookList.addBook(bookDetails, quantity);
  }

  deleteBook(bookId: string): void {
    return this.bookList.deleteBook(bookId);
  }

  setBookQuantity(bookId: string, quantity: number): void {
    return this.bookList.setBookQuantity(bookId, quantity);
  }

  addUser(email: string): string {
    return this.userList.addUser(email);
  }

  setUserEmail(userId: string, newEmail: string): void {
    return this.userList.setUserEmail(userId, newEmail);
  }

  rentBook(bookId: string, userId: string): string {
    const book = this.bookList.findBook(bookId);
    const user = this.userList.findUser(userId);

    if (book.quantity < 1) {
      throw new Error('Book not available');
    }

    if (!user.isActive || user.penaltyPoints >= 10) {
      throw new Error('User cannot rent a book');
    }

    const bookingId = this.bookingList.addBooking({
      bookId: book.book.id,
      userId: user.user.id,
    });

    this.bookList.decreaseBookQuantityByOne(book.book.id);

    return bookingId;
  }

  returnBook(bookingId: string, userId: string): void {
    const booking = this.bookingList.findBooking(bookingId);
    const user = this.userList.findUser(userId);
    const book = this.bookList.findBook(booking.bookId);

    if (!booking.isActive) {
      throw new Error('Book already returned');
    }

    const currentDate = new Date();
    const bookingDays = this.countDays(booking.getBookedDate(), currentDate);

    if (bookingDays > BOOKING_TIME) {
      user.penaltyPoints = bookingDays - BOOKING_TIME;
    }

    if (user.penaltyPoints >= 10) {
      this.userList.blockUser(user.user.id);
    }

    this.bookList.increaseBookQuantityByOne(book.book.id);
    this.bookingList.setBookingReturned(booking.id);
  }

  activateUser(userId: string): void {
    const user = this.userList.findUser(userId);
    const currentDate = new Date();
    const daysUserBlocked = this.countDays(user.user.blockedAt, currentDate);

    if (!(daysUserBlocked > MONTH_IN_DAYS)) {
      throw new Error(
        `User cannot be activated. To activate ${
          MONTH_IN_DAYS - daysUserBlocked
        } left`
      );
    }

    this.userList.activateUser(user.user.id);
  }

  private countDays(from: Date, to: Date): number {
    const dayFrom = from.getTime();
    const dayTo = to.getTime();

    const differenceInDays = (dayTo - dayFrom) / DAY_IN_MILLISECONDS;

    return Math.floor(differenceInDays);
  }
}
