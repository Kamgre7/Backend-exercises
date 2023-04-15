import { Book } from '../../../be-fundamentals/OOP/library-hard/Book/Book';
import {
  Booking,
  BookingDetails,
  IBooking,
} from '../../../be-fundamentals/OOP/library-hard/Booking/Booking';
import {
  BookInformation,
  BookList,
} from '../../../be-fundamentals/OOP/library-hard/Book/BookList';
import { Library } from '../../../be-fundamentals/OOP/library-hard/Library';
import { User } from '../../../be-fundamentals/OOP/library-hard/User/User';
import {
  UserInformation,
  UserList,
} from '../../../be-fundamentals/OOP/library-hard/User/UserList';
import { BookingList } from '../../../be-fundamentals/OOP/library-hard/Booking/BookingList';
import { BookHandler } from '../../../be-fundamentals/OOP/library-hard/Book/BookHandler';
import { UserHandler } from '../../../be-fundamentals/OOP/library-hard/User/UserHandler';
import { BookingHandler } from '../../../be-fundamentals/OOP/library-hard/Booking/BookingHandler';

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
let kateBookingDetails: BookingDetails;
let johnBookingDetails: BookingDetails;
let kateBooking: Booking;
let johnBooking: Booking;

let library: Library;

beforeAll(() => {
  bookList = BookList.getInstance(books);
  userList = UserList.getInstance(users);
  bookingList = BookingList.getInstance(bookings);

  library = Library.getInstance(
    new BookHandler(),
    new UserHandler(),
    new BookingHandler(),
    bookList,
    userList,
    bookingList
  );
});

beforeEach(() => {
  kate = new User('kate@example.com');

  kateInformation = {
    user: kate,
    penaltyPoints: 0,
  };

  john = new User('john@example.com');

  johnInformation = {
    user: john,
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

  kateBookingDetails = {
    bookIds: [harryPotter.id, lordOfTheRings.id],
    userId: kate.id,
  };

  johnBookingDetails = {
    bookIds: [lordOfTheRings.id],
    userId: john.id,
  };

  kateBooking = new Booking(kateBookingDetails);
  johnBooking = new Booking(johnBookingDetails);

  bookings = new Map([
    [kateBooking.id, kateBooking],
    [johnBooking.id, johnBooking],
  ]);

  userList.users = users;
  bookList.books = books;
  bookingList.bookings = bookings;
});

describe('Library', () => {
  it('Should be instance of Library', () => {
    expect(library).toBeInstanceOf(Library);
  });

  it('Should return already created library instance, after trying to create a new instance of Library', () => {
    const secondLibrary = Library.getInstance(
      new BookHandler(),
      new UserHandler(),
      new BookingHandler()
    );

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

      expect(bookList.books.has(newBookId)).toBeTruthy();
    });

    it('Should increase book quantity when book is already in library from 5 t0 10', () => {
      const bookDetails = {
        author: 'unknown',
        title: 'Train',
        isbn: 'ABV1',
      };

      const newBookId = library.addBook(bookDetails, 5);
      library.addBook(bookDetails, 5);

      const book = bookList.books.get(newBookId);

      expect(book.quantity).toEqual(10);
    });

    it('Should soft delete book from bookList', () => {
      const bookInformation = bookList.books.get(hpInformation.book.id);

      expect(bookInformation.book.deletedAt).toBeUndefined();

      library.deleteBook(hpInformation.book.id);

      expect(bookInformation.book.deletedAt).toBeDefined();
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

      expect(userList.users.has(newUserId)).toBeTruthy();
    });

    it('Should soft delete a user', () => {
      expect(kate.deletedAt).toBeUndefined();

      library.deleteUser(kate.id);

      expect(kate.deletedAt).toBeDefined();
    });

    it('Should reactive soft deleted user if user want register again this same email', () => {
      const userId = library.addUser('reactive@example.com');
      const userInformation = userList.users.get(userId);

      library.deleteUser(userId);
      expect(userInformation.user.deletedAt).toBeDefined();

      library.addUser('reactive@example.com');
      expect(userInformation.user.deletedAt).toBeNull();
    });

    it('Should set a user email', () => {
      library.setUserEmail(john.id, 'newEmail@example.com');

      expect(john.email).toStrictEqual('newEmail@example.com');
    });

    it('Should block a user', () => {
      expect(johnInformation.user.blockedAt).toBeUndefined();

      library.blockUser(john.id);

      expect(johnInformation.user.blockedAt).toBeDefined();
    });

    it('Should activate blocked user', () => {
      library.blockUser(john.id);
      johnInformation.user.blockedAt = new Date('2022-02-02');

      expect(johnInformation.user.blockedAt).toBeDefined();

      library.activateUser(john.id);

      expect(johnInformation.user.blockedAt).toBeNull();
    });
  });

  describe('Booking management', () => {
    it('Should add a new booking and decrease book quantity by one', () => {
      expect(hpInformation.quantity).toBe(10);

      const newBookingId = library.rentBook(john.id, [harryPotter.id]);

      expect(hpInformation.quantity).toBe(9);
      expect(bookingList.bookings.has(newBookingId)).toBeTruthy();
    });

    it('Should return books, increase books quantity by one, and change booking status - isActive - false', () => {
      expect(hpInformation.quantity).toBe(10);
      expect(lotrInformation.quantity).toBe(5);

      library.returnBook(kateBooking.id, [harryPotter.id, lordOfTheRings.id]);

      expect(hpInformation.quantity).toBe(11);
      expect(lotrInformation.quantity).toBe(6);

      expect(kateBooking.isActive).toBeFalsy();
    });
  });

  describe('Should throw errors when', () => {
    describe('Book throwing error', () => {
      it('Should throw error when creating book with empty title', () => {
        expect(() => {
          library.addBook(
            {
              title: '',
              author: 'Test',
              isbn: 'BC432',
            },
            5
          );
        }).toThrow();
      });

      it('Should throw error when creating book with empty author', () => {
        expect(() => {
          library.addBook(
            {
              title: 'Test',
              author: '',
              isbn: 'BC432',
            },
            5
          );
        }).toThrow();
      });

      it('Should throw error when creating book with empty isbn number', () => {
        expect(() => {
          library.addBook(
            {
              title: 'Test',
              author: 'Test',
              isbn: '',
            },
            5
          );
        }).toThrow();
      });

      it('Should throw error when creating book with quantity equal or bellow zero', () => {
        expect(() => {
          library.addBook(
            {
              title: 'Test',
              author: 'Test',
              isbn: '',
            },
            -5
          );
        }).toThrow();
      });

      it('Should throw error when trying delete deleted book', () => {
        harryPotter.deletedAt = new Date();

        expect(() => {
          library.deleteBook(harryPotter.id);
        }).toThrow();
      });

      it('Should throw error when updating book with empty author', () => {
        expect(() => {
          library.setBookAuthor(harryPotter.id, '');
        }).toThrow();
      });

      it('Should throw error when updating book with empty title', () => {
        expect(() => {
          library.setBookTitle(harryPotter.id, '');
        }).toThrow();
      });

      it('Should throw error when updating book with empty isbn number', () => {
        expect(() => {
          library.setBookIsbn(harryPotter.id, '');
        }).toThrow();
      });
    });

    describe('User throwing error', () => {
      it('Should throw error when creating user with  empty email', () => {
        expect(() => {
          library.addUser('');
        }).toThrow();
      });

      it('Should throw error when email is only whitespace string', () => {
        expect(() => {
          library.addUser('                 ');
        }).toThrow();
      });

      it('Should throw error when email not include @', () => {
        expect(() => {
          library.addUser('user.com');
        }).toThrow();
      });

      it('Should throw error when try to delete deleted user', () => {
        library.deleteUser(john.id);

        expect(() => {
          library.deleteUser(john.id);
        }).toThrow();
      });

      it('Should throw error when trying activate not blocked user', () => {
        expect(() => {
          library.activateUser(john.id);
        });
      });

      it('Should throw error when user is not blocked', () => {
        expect(() => {
          library.blockUser(john.id);
        });
      });

      it('Should throw error when user cannot be reactivated - is active', () => {
        expect(() => {
          library.activateUser(john.id);
        });
      });
    });
  });
});
