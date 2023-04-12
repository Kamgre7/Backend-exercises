import { BookDetails } from './Book';
import { BookHandler, IBookHandler } from './BookHandler';
import { BookingHandler, IBookingHandler } from './BookingHandler';
import { BookingList, IBookingList } from './BookingList';
import { BookList, IBookList } from './BookList';
import { IUser } from './User';
import { IUserHandler, UserHandler } from './UserHandler';
import { IUserList, UserInformation, UserList } from './UserList';

export interface ILibrary {
  bookList: IBookList;
  bookHandler: IBookHandler;
  userList: IUserList;
  userHandler: IUserHandler;
  bookingList: IBookingList;
  bookingHandler: IBookingHandler;
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
  rentBook(userId: string, booksId: string[]): string;
  returnBook(bookingId: string, booksId: string[]): void;
}

export class Library implements ILibrary {
  private static instance: Library;
  bookHandler: IBookHandler = new BookHandler();
  userHandler: IUserHandler = new UserHandler();
  bookingHandler: IBookingHandler = new BookingHandler();

  private constructor(
    public bookList = BookList.getInstance(),
    public userList = UserList.getInstance(),
    public bookingList = BookingList.getInstance()
  ) {}

  static getInstance(
    bookList?: IBookList,
    userList?: IUserList,
    bookingList?: IBookingList
  ): Library {
    if (!Library.instance) {
      Library.instance = new Library(bookList, userList, bookingList);
    }

    return Library.instance;
  }

  addBook(bookDetails: BookDetails, quantity: number): string {
    const bookId = this.bookList.findBookIdByIsbn(bookDetails.isbn);

    if (bookId !== null) {
      const book = this.bookList.findBookOrThrow(bookId);

      this.bookHandler.setQuantity(book, quantity);

      return bookId;
    }

    return this.bookList.addBook(bookDetails, quantity);
  }

  deleteBook(bookId: string): void {
    this.bookList.deleteBook(bookId);
  }

  setBookAuthor(bookId: string, newAuthor: string): void {
    const { book } = this.bookList.findBookOrThrow(bookId);

    this.bookHandler.setAuthor(book, newAuthor);
  }

  setBookTitle(bookId: string, newTitle: string): void {
    const { book } = this.bookList.findBookOrThrow(bookId);

    this.bookHandler.setTitle(book, newTitle);
  }

  setBookIsbn(bookId: string, newIsbn: string): void {
    const { book } = this.bookList.findBookOrThrow(bookId);

    this.bookHandler.setIsbn(book, newIsbn);
  }

  addUser(email: string): string {
    const userId = this.userList.findUserIdByEmail(email);

    if (userId !== null) {
      const { user } = this.userList.findUserOrThrow(userId);

      this.tryToActivateUserAccount(user);

      return userId;
    }

    return this.userList.addUser(email);
  }

  deleteUser(userId: string): void {
    this.userList.deleteUser(userId);
  }

  setUserEmail(userId: string, newEmail: string): void {
    const { user } = this.userList.findUserOrThrow(userId);

    this.userList.checkIfEmailAvailableOrThrow(newEmail);
    this.userHandler.updateEmail(user, newEmail);
  }

  blockUser(userId: string): void {
    const { user } = this.userList.findUserOrThrow(userId);

    this.userHandler.blockUser(user);
  }

  activateUser(userId: string): void {
    const user = this.userList.findUserOrThrow(userId);

    this.userHandler.activateUser(user);
  }

  rentBook(userId: string, booksId: string[]): string {
    const userInformation = this.userList.findUserOrThrow(userId);

    this.userHandler.checkIfUserNotDeletedOrThrow(userInformation);
    this.ifUserBlockedTryActivate(userInformation);

    const availableBooksId = this.bookList.findAvailableBooksById(booksId);

    const bookingId = this.bookingList.addBooking({
      booksId: availableBooksId,
      userId: userInformation.user.id,
    });

    this.changeBookQuantity(availableBooksId, -1);

    return bookingId;
  }

  returnBook(bookingId: string, booksId: string[]): void {
    const booking = this.bookingList.findBookingOrThrow(bookingId);

    this.bookingHandler.checkIfBookingActiveOrThrow(booking);

    const user = this.userList.findUserOrThrow(booking.userId);

    this.bookingHandler.verifyTheBooksToBeReturned(booking, booksId);

    this.bookingHandler.setBooksAreReturned(booking, booksId);

    this.changeBookQuantity(booksId, 1);

    if (this.bookingHandler.checkIfAllBooksReturned(booking)) {
      this.bookingHandler.setIsNotActive(booking);

      this.userHandler.calculatePenaltyPoints(user, booking.getBookDate());
      this.userHandler.checkIfBlockUser(user);
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

  private changeBookQuantity(booksId: string[], value: number): void {
    booksId.forEach((id) => {
      const book = this.bookList.findBookOrThrow(id);

      this.bookHandler.setQuantity(book, value);
    });
  }
}
