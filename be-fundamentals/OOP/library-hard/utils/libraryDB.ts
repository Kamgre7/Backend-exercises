import { Book } from '../Book/Book';
import { BookInformation } from '../Book/BookList';
import { Booking, IBooking } from '../Booking/Booking';
import { User } from '../User/User';
import { UserInformation } from '../User/UserList';

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

const harryPotterBooking = new Booking({
  bookIds: [harryPotter.id],
  userId: user.id,
});

export const bookDB: Map<string, BookInformation> = new Map([
  [
    harryPotter.id,
    {
      book: harryPotter,
      quantity: 10,
    },
  ],
  [
    lordOfTheRings.id,
    {
      book: lordOfTheRings,
      quantity: 5,
    },
  ],
]);

export const userDB: Map<string, UserInformation> = new Map([
  [
    user.id,
    {
      user,
      penaltyPoints: 0,
      isActive: true,
    },
  ],

  [
    admin.id,
    {
      user: admin,
      penaltyPoints: 0,
      isActive: true,
    },
  ],
]);

export const bookingDB: Map<string, IBooking> = new Map([
  [harryPotterBooking.id, harryPotterBooking],
]);
