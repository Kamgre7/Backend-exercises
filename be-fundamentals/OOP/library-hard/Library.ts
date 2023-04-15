import { Book, BookDetails } from './Book/Book';
import { BookHandler, IBookHandler } from './Book/BookHandler';
import { BookingHandler, IBookingHandler } from './Booking/BookingHandler';
import { BookingList, IBookingList } from './Booking/BookingList';
import { BookList, IBookList } from './Book/BookList';
import { bookDB, bookingDB, userDB } from './utils/libraryDB';
import { IUser, User } from './User/User';
import { IUserHandler, UserHandler } from './User/UserHandler';
import { IUserList, UserInformation, UserList } from './User/UserList';
import { Booking, IBooking } from './Booking/Booking';

export interface ILibrary {
  addBook(bookDetails: BookDetails, quantity: number): string;
  deleteBook(bookId: string): void;
  setBookAuthor(bookId: string, newAuthor: string): void;
  setBookTitle(bookId: string, newTitle: string): void;
  setBookIsbn(bookId: string, newIsbn: string): void;
  addUser(email: string): string;
  deleteUser(userId: string): void;
  setUserEmail(userId: string, newEmail: string): void;
  blockUser(userId: string): void;
  activateUser(userId: string): void;
  rentBook(userId: string, bookIds: string[]): string;
  returnBook(bookingId: string, bookIds: string[]): void;
}

export class Library implements ILibrary {
  private static instance: Library;

  private constructor(
    private readonly bookHandler: IBookHandler,
    private readonly userHandler: IUserHandler,
    private readonly bookingHandler: IBookingHandler,
    private readonly bookList: IBookList,
    private readonly userList: IUserList,
    private readonly bookingList: IBookingList
  ) {}

  static getInstance(
    bookHandler: IBookHandler,
    userHandler: IUserHandler,
    bookingHandler: IBookingHandler,
    bookList: IBookList = BookList.getInstance(),
    userList: IUserList = UserList.getInstance(),
    bookingList: IBookingList = BookingList.getInstance()
  ): Library {
    if (!Library.instance) {
      Library.instance = new Library(
        bookHandler,
        userHandler,
        bookingHandler,
        bookList,
        userList,
        bookingList
      );
    }

    return Library.instance;
  }

  addBook(bookDetails: BookDetails, quantity: number): string {
    const bookInformation = this.bookList.findBookByIsbn(bookDetails.isbn);

    if (bookInformation) {
      this.bookHandler.setQuantity(bookInformation, quantity);

      return bookInformation.book.id;
    }

    const book = new Book(bookDetails);

    return this.bookList.addBook(book, quantity);
  }

  deleteBook(bookId: string): void {
    this.bookList.deleteBook(bookId);
  }

  setBookAuthor(bookId: string, newAuthor: string): void {
    const { book } = this.bookList.findBookByIdOrThrow(bookId);

    this.bookHandler.setAuthor(book, newAuthor);
  }

  setBookTitle(bookId: string, newTitle: string): void {
    const { book } = this.bookList.findBookByIdOrThrow(bookId);

    this.bookHandler.setTitle(book, newTitle);
  }

  setBookIsbn(bookId: string, newIsbn: string): void {
    const { book } = this.bookList.findBookByIdOrThrow(bookId);

    this.bookHandler.setIsbn(book, newIsbn);
  }

  addUser(email: string): string {
    const userInformation = this.userList.findUserByEmail(email);

    if (userInformation) {
      this.tryToActivateUserAccount(userInformation.user);

      return userInformation.user.id;
    }

    const user = new User(email);

    return this.userList.addUser(user);
  }

  deleteUser(userId: string): void {
    this.userList.deleteUser(userId);
  }

  setUserEmail(userId: string, newEmail: string): void {
    const { user } = this.userList.findUserByIdOrThrow(userId);

    this.userList.checkIfEmailAvailableOrThrow(newEmail);
    this.userHandler.updateEmail(user, newEmail);
  }

  blockUser(userId: string): void {
    const { user } = this.userList.findUserByIdOrThrow(userId);

    this.userHandler.blockUser(user);
  }

  activateUser(userId: string): void {
    const userInformation = this.userList.findUserByIdOrThrow(userId);

    this.userHandler.activateUser(userInformation);
  }

  rentBook(userId: string, bookIds: string[]): string {
    const userInformation = this.userList.findUserByIdOrThrow(userId);

    this.ifUserBlockedTryActivate(userInformation);

    const availableBookIds = this.bookList.findAvailableBooksById(bookIds);

    const booking = new Booking({
      bookIds: availableBookIds,
      userId: userInformation.user.id,
    });

    this.bookingList.addBooking(booking);

    this.changeBookQuantity(availableBookIds, -1);

    return booking.id;
  }

  returnBook(bookingId: string, bookIds: string[]): void {
    const booking = this.bookingList.findBookingByIdOrThrow(bookingId);

    this.bookingHandler.checkIfBookingActiveOrThrow(booking);

    const userInformation = this.userList.findUserByIdOrThrow(booking.userId);

    this.bookingHandler.verifyBooksToBeReturned(booking, bookIds);

    this.bookingHandler.returnBooks(booking, bookIds);

    this.changeBookQuantity(bookIds, 1);

    this.calculateAndAddPenaltyPoints(userInformation, booking, bookIds);

    this.userHandler.checkIfBlockUser(userInformation);

    if (this.bookingHandler.checkIfAllBooksReturned(booking)) {
      this.bookingHandler.setIsNotActive(booking);
    }
  }

  private tryToActivateUserAccount(user: IUser): void {
    this.userHandler.checkIfUserCanBeReactivated(user);
    this.userHandler.reactiveDeletedUser(user);
  }

  private ifUserBlockedTryActivate(user: UserInformation) {
    if (user.user.blockedAt || user.penaltyPoints >= 10) {
      this.activateUser(user.user.id);
    }
  }

  private changeBookQuantity(bookIds: string[], value: number): void {
    bookIds.forEach((id) => {
      const book = this.bookList.findBookByIdOrThrow(id);

      this.bookHandler.setQuantity(book, value);
    });
  }

  private calculateAndAddPenaltyPoints(
    userInformation: UserInformation,
    booking: IBooking,
    bookIds: string[]
  ) {
    bookIds.forEach((bookId) => {
      const bookingBookReturnedDate = booking.books.get(bookId).returnedAt;

      const penaltyPointsToAdd = this.userHandler.calculatePenaltyPoints(
        bookingBookReturnedDate
      );

      if (penaltyPointsToAdd > 0) {
        this.userHandler.setUserPenaltyPoints(
          userInformation,
          penaltyPointsToAdd
        );
      }
    });
  }
}

const library = Library.getInstance(
  new BookHandler(),
  new UserHandler(),
  new BookingHandler(),
  BookList.getInstance(bookDB),
  UserList.getInstance(userDB),
  BookingList.getInstance(bookingDB)
);
