import { BookDetails } from './Book';
import { BookingList, IBookingList } from './BookingList';
import { BookList, IBookList } from './BookList';
import { DataValidator } from './DataValidator';
import { IUserList, UserList } from './UserList';
import { BOOKING_TIME, DAY_IN_MILLISECONDS, MONTH_IN_DAYS } from './utils';

export interface ILibrary {
  bookList: IBookList;
  userList: IUserList;
  bookingList: IBookingList;
  addBook(bookDetails: BookDetails, quantity: number): string;
  deleteBook(bookId: string): void;
  setBookAuthor(bookId: string, newAuthor: string): void;
  setBookTitle(bookId: string, newTitle: string): void;
  setBookIsbn(bookId: string, newIsbn: string): void;
  setBookQuantity(bookId: string, quantity: number): void;
  addUser(email: string): string;
  setUserEmail(userId: string, newEmail: string): void;
  blockUser(userId: string): void;
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
    const duplicatedBookId = this.bookList.findBookIdByIsbn(bookDetails.isbn);

    return duplicatedBookId !== null
      ? this.setBookQuantity(duplicatedBookId, quantity)
      : this.bookList.addBook(bookDetails, quantity);
  }

  deleteBook(bookId: string): void {
    return this.bookList.deleteBook(bookId);
  }

  setBookAuthor(bookId: string, newAuthor: string): void {
    const { book } = this.bookList.findBookOrThrow(bookId);

    book.setAuthor(newAuthor);
  }

  setBookTitle(bookId: string, newTitle: string): void {
    const { book } = this.bookList.findBookOrThrow(bookId);

    book.setTitle(newTitle);
  }

  setBookIsbn(bookId: string, newIsbn: string): void {
    const { book } = this.bookList.findBookOrThrow(bookId);

    book.setIsbn(newIsbn);
  }

  setBookQuantity(bookId: string, quantity: number): string {
    DataValidator.checkIfNotEqualOrBelowZero(quantity);

    const book = this.bookList.findBookOrThrow(bookId);
    book.quantity += quantity;

    return book.book.id;
  }

  addUser(email: string): string {
    return this.userList.addUser(email);
  }

  setUserEmail(userId: string, newEmail: string): void {
    const { user } = this.userList.findUserOrThrow(userId);

    user.setEmail(newEmail);
  }

  blockUser(userId: string): void {
    const user = this.userList.findUserOrThrow(userId);

    user.isActive = false;
    user.user.blockedAt = new Date();
  }

  activateUser(userId: string): void {
    const user = this.userList.findUserOrThrow(userId);
    const currentDate = new Date();
    const daysUserBlocked = this.countDays(user.user.blockedAt, currentDate);

    if (!(daysUserBlocked > MONTH_IN_DAYS)) {
      throw new Error(
        `User cannot be activated. To activate ${
          MONTH_IN_DAYS - daysUserBlocked
        } days left`
      );
    }

    user.isActive = true;
    user.penaltyPoints = 0;
    user.user.blockedAt = null;
  }

  rentBook(bookId: string, userId: string): string {
    const book = this.bookList.findBookOrThrow(bookId);
    const user = this.userList.findUserOrThrow(userId);

    if (book.quantity < 1) {
      throw new Error('Book not available');
    }

    if (!user.isActive || user.penaltyPoints >= 10) {
      this.activateUser(user.user.id);
    }

    const bookingId = this.bookingList.addBooking({
      bookId: book.book.id,
      userId: user.user.id,
    });

    book.quantity -= 1;

    return bookingId;
  }

  returnBook(bookingId: string): void {
    const booking = this.bookingList.findBooking(bookingId);
    const user = this.userList.findUserOrThrow(booking.userId);
    const book = this.bookList.findBookOrThrow(booking.bookId);

    if (!booking.isActive) {
      return;
      // throw new Error('Book already returned');
    }

    const currentDate = new Date();
    const bookingDaysPassed = this.countDays(
      booking.getBookDate(),
      currentDate
    );

    if (bookingDaysPassed > BOOKING_TIME) {
      user.penaltyPoints += bookingDaysPassed - BOOKING_TIME;
    }

    if (user.penaltyPoints >= 10) {
      this.blockUser(user.user.id);
    }

    book.quantity += 1;
    booking.setIsNotActive();
    booking.setReturnDate();
  }

  private countDays(from: Date, to: Date): number {
    const dayFrom = from.getTime();
    const dayTo = to.getTime();

    const differenceInDays = (dayTo - dayFrom) / DAY_IN_MILLISECONDS;

    return Math.floor(differenceInDays);
  }
}
