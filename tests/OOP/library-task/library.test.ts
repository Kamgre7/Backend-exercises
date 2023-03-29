import { Book } from '../../../be-fundamentals/OOP/library-hard/Book';
import {
  Booking,
  BookingDetails,
  IBooking,
} from '../../../be-fundamentals/OOP/library-hard/Booking';
import { BookingList } from '../../../be-fundamentals/OOP/library-hard/BookingList';
import {
  BookInformation,
  BookList,
} from '../../../be-fundamentals/OOP/library-hard/BookList';
import { Library } from '../../../be-fundamentals/OOP/library-hard/Library';
import { User } from '../../../be-fundamentals/OOP/library-hard/User';
import {
  UserInformation,
  UserList,
} from '../../../be-fundamentals/OOP/library-hard/UserList';

let john: User;
let kate: User;
let userList: UserList;
let users: Map<string, UserInformation>;
let kateInformation: UserInformation;
let johnInformation: UserInformation;

let harryPotter: Book;
let lordOfTheRings: Book;
let bookList: BookList;
let books: Map<string, BookInformation>;
let hpInformation: BookInformation;
let lotrInformation: BookInformation;

let bookingList: BookingList;
let bookings: Map<string, IBooking>;
let hpBookingDetails: BookingDetails;
let lotrBookingDetails: BookingDetails;
let hpBookingInformation: Booking;
let lotrBookingInformation: Booking;

let library: Library;

beforeAll(() => {
  bookList = BookList.getInstance(books);
  userList = UserList.getInstance(users);
  bookingList = BookingList.getInstance(bookings);

  library = Library.getInstance(bookList, userList, bookingList);
});

beforeEach(() => {
  kate = new User('kate@example.com');

  kateInformation = {
    user: kate,
    isActive: true,
    penaltyPoints: 0,
  };

  john = new User('john@example.com');

  johnInformation = {
    user: john,
    isActive: true,
    penaltyPoints: 0,
  };

  users = new Map([
    [kate.id, kateInformation],
    [john.id, johnInformation],
  ]);

  harryPotter = new Book({
    title: 'Harry Potter',
    author: 'J.K Rowling',
    isbn: '1234',
  });

  hpInformation = {
    book: harryPotter,
    quantity: 10,
  };

  lordOfTheRings = new Book({
    title: 'Lord Of The Rings',
    author: 'J.R.R Tolkien',
    isbn: '4321',
  });

  lotrInformation = {
    book: lordOfTheRings,
    quantity: 5,
  };

  books = new Map([
    [harryPotter.id, hpInformation],
    [lordOfTheRings.id, lotrInformation],
  ]);

  hpBookingDetails = {
    bookId: harryPotter.id,
    userId: kate.id,
  };

  lotrBookingDetails = {
    bookId: lordOfTheRings.id,
    userId: john.id,
  };

  hpBookingInformation = new Booking(hpBookingDetails);
  lotrBookingInformation = new Booking(lotrBookingDetails);

  bookings = new Map([
    [hpBookingInformation.id, hpBookingInformation],
    [lotrBookingInformation.id, lotrBookingInformation],
  ]);

  userList.users = users;
  bookList.books = books;
  bookingList.bookings = bookings;

  library.bookList = bookList;
  library.bookingList = bookingList;
  library.userList = userList;
});

describe('Library', () => {
  it('Should be instance of Library', () => {
    expect(library).toBeInstanceOf(Library);
  });

  it('Should return already created library instance, after trying to create a new instance of Library', () => {
    const secondLibrary = Library.getInstance();

    expect(library).toStrictEqual(secondLibrary);
  });

  describe('Book management', () => {
    it('Should add book to bookList', () => {
      const bookDetails = {
        author: 'unknown',
        title: 'Train',
        isbn: 'ABV1',
      };

      const newBookId = library.addBook(bookDetails, 5);

      expect(library.bookList.books.has(newBookId)).toBeTruthy();
    });

    it('Should increase book quantity when book is already in library', () => {
      const bookDetails = {
        author: 'unknown',
        title: 'Train',
        isbn: 'ABV1',
      };

      const newBookId = library.addBook(bookDetails, 5);
      const secondNewBookId = library.addBook(bookDetails, 5);
      const book = library.bookList.books.get(newBookId);

      expect(book).toHaveProperty('quantity', 10);
    });

    it('Should delete book from bookList', () => {
      expect(library.bookList.books.has(hpInformation.book.id)).toBeTruthy();

      library.deleteBook(hpInformation.book.id);

      expect(library.bookList.books.has(hpInformation.book.id)).toBeFalsy();
    });

    it('Should set a book author', () => {
      library.setBookAuthor(harryPotter.id, 'Unknown');

      expect(harryPotter.author).toBe('Unknown');
    });

    it('Should set a book title', () => {
      library.setBookTitle(harryPotter.id, 'The wither');

      expect(harryPotter.title).toBe('The wither');
    });

    it('Should set a book isbn number', () => {
      library.setBookIsbn(harryPotter.id, 'XYZ13');

      expect(harryPotter.isbn).toBe('XYZ13');
    });
  });

  describe('User management', () => {
    it('Should add a new user', () => {
      const newUserId = library.addUser('user@example.com');

      expect(library.userList.users.has(newUserId)).toBeTruthy();
    });

    it('Should set a user email', () => {
      library.setUserEmail(john.id, 'newEmail@example.com');

      expect(john.email).toStrictEqual('newEmail@example.com');
    });

    it('Should block a user', () => {
      expect(johnInformation.isActive).toBeTruthy();

      library.blockUser(john.id);

      expect(johnInformation.isActive).toBeFalsy();
    });

    it('Should activate a user', () => {
      library.blockUser(john.id);

      expect(johnInformation.isActive).toBeFalsy();

      johnInformation.user.blockedAt = new Date('2022-02-02');
      library.activateUser(john.id);

      expect(johnInformation.isActive).toBeTruthy();
    });
  });

  describe('Booking management', () => {
    it('Should add a new booking and decrease book quantity by one', () => {
      expect(hpInformation.quantity).toBe(10);

      const newBookingId = library.rentBook(harryPotter.id, john.id);

      expect(hpInformation.quantity).toBe(9);
      expect(library.bookingList.bookings.has(newBookingId)).toBeTruthy();
    });

    it('Should return a book, increase book quantity by one', () => {
      expect(hpInformation.quantity).toBe(10);
      expect(hpBookingInformation.isActive).toBeTruthy();

      library.returnBook(hpBookingInformation.id);

      expect(hpInformation.quantity).toBe(11);
      expect(hpBookingInformation.isActive).toBeFalsy();
    });
  });
});
