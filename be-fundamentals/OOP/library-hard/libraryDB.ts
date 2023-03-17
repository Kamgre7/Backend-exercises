import { Book } from './Book';
import { IBooking } from './Booking';
import { BookInformation, UserInformation } from './Library';
import { User } from './User';

const harryPotter = new Book({
  title: 'Harry Potter',
  author: 'J.K Rowling',
  isbn: '1234',
});

const lordOfTheRings = new Book({
  title: 'Lord Of The Rings',
  author: 'J.R.R Tolkien',
  isbn: '4321',
});

const user = new User('user@library.com');
const admin = new User('admin@library.com');

export const bookDB: Map<string, BookInformation> = new Map([
  [
    harryPotter.id,
    {
      book: harryPotter,
      isAvailable: true,
    },
  ],
  [
    lordOfTheRings.id,
    {
      book: lordOfTheRings,
      isAvailable: true,
    },
  ],
]);

export const userDB: Map<string, UserInformation> = new Map([
  [
    user.id,
    {
      user,
      borrowedBooks: new Map<string, IBooking>(),
      points: 0,
    },
  ],

  [
    admin.id,
    {
      user: admin,
      borrowedBooks: new Map<string, IBooking>(),
      points: 0,
    },
  ],
]);
