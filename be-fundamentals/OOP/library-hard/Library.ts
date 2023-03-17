import { Book, BookDetails, IBook } from './Book';
import { Booking, IBooking } from './Booking';
import { bookDB, userDB } from './libraryDB';
import { IUser, User } from './User';

export type BookInformation = {
  book: IBook;
  isAvailable: boolean;
};

export type UserInformation = {
  user: IUser;
  borrowedBooks: Map<string, IBooking>;
  points: number;
};

export interface ILibrary {
  books: Map<string, BookInformation>;
  users: Map<string, UserInformation>;
  addBook(bookDetails: BookDetails): string;
  deleteBook(bookId: string): void;
  rentBook(bookId: string, userId: string): void;
  returnBook(bookId: string, userId: string): void;
  addUser(email: string): string;
  findUser(userId: string): UserInformation;
  findBook(bookId: string): BookInformation;
}

export class Library implements ILibrary {
  books: Map<string, BookInformation>;
  users: Map<string, UserInformation>;

  constructor(books = bookDB, users = userDB) {}

  addBook(bookDetails: BookDetails): string {
    const newBook = new Book(bookDetails);

    return newBook.id;
  }

  deleteBook(bookId: string): void {
    const book = this.findBook(bookId);

    this.checkBookToRemove(book);

    this.books.delete(book.book.id);
  }

  rentBook(bookId: string, userId: string): void {
    const book = this.findBook(bookId);
    const user = this.findUser(userId);

    if (!this.isAvailable(book)) {
      throw new Error('Book not available');
    }

    const reservation = new Booking(book.book.id);

    user.borrowedBooks.set(book.book.id, reservation);
    book.isAvailable = false;
  }

  returnBook(bookId: string, userId: string): void {
    const book = this.findBook(bookId);
    const user = this.findUser(userId);

    if (!user.borrowedBooks.has(bookId)) {
      throw new Error('Book not found');
    }

    book.isAvailable = true;
    user.borrowedBooks.delete(bookId);
  }

  addUser(email: string): string {
    const newUser = new User(email);

    this.users.set(newUser.id, {
      user: newUser,
      borrowedBooks: new Map(),
      points: 0,
    });

    return newUser.id;
  }

  findUser(userId: string): UserInformation {
    if (!this.users.has(userId)) {
      throw new Error('User not found');
    }

    return this.users.get(userId);
  }

  findBook(bookId: string): BookInformation {
    if (!this.books.has(bookId)) {
      throw new Error('User not found');
    }

    return this.books.get(bookId);
  }

  private checkBookToRemove(book: BookInformation): void {
    if (!this.isAvailable(book)) {
      throw new Error('Cannot remove borrowed book!');
    }
  }

  private isAvailable(book: BookInformation): boolean {
    return book.isAvailable ? true : false;
  }
}
